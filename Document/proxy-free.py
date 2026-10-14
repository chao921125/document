#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
免费机场汇总抓取脚本
====================

数据源：https://ygpy.net/vpn/free.html （YGPY「一个朋友」- 免费机场收集）

流程：
  1. 抓取 free.html，解析其中的汇总表格（发布日期 / 机场名称 / 购买方式 / 套餐规格 / 续费支持）
  2. 按名称后面的锚点，回溯到对应的月度详情页，抓取该机场的：官网注册链接、优惠码
  3. 生成 Markdown（默认 proxy-free.md），「机场名称」直接可点击跳转到对应官网

用法：
    python3 proxy-free.py                      # 抓取并生成 proxy-free.md
    python3 proxy-free.py -o out.md            # 指定输出文件
    python3 proxy-free.py --html free.html     # 用本地 free.html 代替在线抓取（离线调试）
    python3 proxy-free.py --cache-dir cache    # 指定 HTML 缓存目录（默认 .ygpy-cache）
    python3 proxy-free.py --no-cache           # 不使用缓存
    python3 proxy-free.py --delay 1.0          # 每次请求之间的间隔秒数（默认 0.8）

仅依赖 Python 3 标准库（urllib / re / argparse / html）。
"""

import argparse
import html as html_lib
import os
import re
import sys
import time
import urllib.parse
import urllib.request

BASE = "https://ygpy.net"
INDEX_URL = BASE + "/vpn/free.html"
DEFAULT_OUT = "proxy-free.md"
DEFAULT_CACHE = ".ygpy-cache"

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

# 提取「网站」链接时需要排除的站点
EXCLUDE_HOSTS = ("ygpy.net", "ygpy.org", "t.me", "telegram", "imgur.com", "i.imgur.com")

# 「使用优惠劵 `xxx` 0 元购买…套餐。」整句片段
COUPON_SENTENCE_RE = re.compile(
    r"使用(?:优惠[劵券]|礼品卡)([\s\S]{0,300}?)(?:套餐|</p>)", re.S
)
CODE_RE = re.compile(r"<code[^>]*>(.*?)</code>", re.S)
TAG_RE = re.compile(r"<[^>]+>")


# --------------------------------------------------------------------------- #
# 基础工具
# --------------------------------------------------------------------------- #
def strip_tags(fragment: str) -> str:
    """去掉 HTML 标签、反转义实体、压缩空白，并清理零宽/变体选择符。"""
    txt = TAG_RE.sub("", fragment or "")
    txt = html_lib.unescape(txt)
    txt = txt.replace("\u200b", "").replace("\ufe0f", "").replace("\u200e", "")
    return re.sub(r"\s+", " ", txt).strip()


def unescape_attr(value: str) -> str:
    return html_lib.unescape(value or "").strip()


def fetch(url, cache_dir=None, timeout=30, retries=3, delay=0.8):
    """抓取 URL，可落盘缓存；失败重试。"""
    cache_path = None
    if cache_dir:
        os.makedirs(cache_dir, exist_ok=True)
        key = re.sub(r"[^A-Za-z0-9]+", "_", url).strip("_")[:140] + ".html"
        cache_path = os.path.join(cache_dir, key)
        if os.path.exists(cache_path) and os.path.getsize(cache_path) > 0:
            with open(cache_path, encoding="utf-8", errors="ignore") as fh:
                print("  [cache] %s" % url)
                return fh.read()

    last_err = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": UA,
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
                },
            )
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                page = resp.read().decode("utf-8", "ignore")
            if cache_path and page:
                with open(cache_path, "w", encoding="utf-8") as fh:
                    fh.write(page)
            print("  [get]   %s (%d bytes)" % (url, len(page)))
            return page
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            if attempt < retries - 1:
                time.sleep(delay * (attempt + 1))
    raise RuntimeError("抓取失败 %s -> %s" % (url, last_err))


def normalize_url(url: str) -> str:
    """把含中文的域名（IDN）转成 punycode，保证链接可点击。"""
    url = unescape_attr(url)
    try:
        parts = urllib.parse.urlsplit(url)
    except ValueError:
        return url
    host = parts.hostname
    if not host:
        return url
    host = urllib.parse.unquote(host)
    if any(ord(ch) > 127 for ch in host):
        try:
            host = host.encode("idna").decode("ascii")
        except Exception:  # noqa: BLE001
            pass
    netloc = host
    if parts.port:
        netloc += ":%d" % parts.port
    return urllib.parse.urlunsplit(
        (parts.scheme, netloc, parts.path, parts.query, parts.fragment)
    )


def domain_of(url: str) -> str:
    """取域名用于展示（punycode 域名还原成中文更好认）。"""
    try:
        host = urllib.parse.urlsplit(url).hostname or url
    except ValueError:
        return url
    host = host.lower()
    for prefix in ("www.", "app.", "web.", "my.", "user.", "portal.", "dash."):
        if host.startswith(prefix):
            host = host[len(prefix):]
            break
    if "xn--" in host:
        try:
            host = host.encode("ascii").decode("idna")
        except Exception:  # noqa: BLE001
            pass
    return host


# --------------------------------------------------------------------------- #
# 解析
# --------------------------------------------------------------------------- #
def parse_index(page: str):
    """解析 free.html 的汇总表，返回条目列表。"""
    body = page
    m = re.search(r"<tbody>(.*?)</tbody>", page, re.S)
    if m:
        body = m.group(1)

    items = []
    for tr in re.findall(r"<tr[^>]*>([\s\S]*?)</tr>", body, re.S):
        cells = re.findall(r"<td[^>]*>([\s\S]*?)</td>", tr, re.S)
        if len(cells) < 5:
            continue
        link = re.search(r"<a[^>]*href=\"([^\"]*)\"[^>]*>([\s\S]*?)</a>", cells[1], re.S)
        if not link:
            continue
        name = strip_tags(link.group(2))
        if not name:
            continue
        detail_url = urllib.parse.urljoin(INDEX_URL, unescape_attr(link.group(1)))
        items.append(
            {
                "date": strip_tags(cells[0]),
                "name": name,
                "detail_url": detail_url,
                "detail_anchor": urllib.parse.urlsplit(detail_url).fragment,
                "method": strip_tags(cells[2]),
                "quota": strip_tags(cells[3]),
                "renew": strip_tags(cells[4]),
            }
        )
    return items


def split_sections(page: str):
    """把详情页按 <h2 id=...> 切块，返回 {anchor: (标题, 片段HTML)}。"""
    marks = []
    for m in re.finditer(r"<h2[^>]*id=\"([^\"]+)\"[^>]*>([\s\S]*?)</h2>", page, re.S):
        title = re.sub(r"#+\s*$", "", strip_tags(m.group(2))).strip()
        marks.append((m.start(), m.group(1), title))
    sections = {}
    for idx, (pos, anchor, title) in enumerate(marks):
        end = marks[idx + 1][0] if idx + 1 < len(marks) else len(page)
        sections[anchor] = (title, page[pos:end])
    return sections


def extract_site(fragment: str):
    """从条目片段中提取官网注册链接。"""
    m = re.search(r"网站\s*[：:]\s*<a[^>]*href=\"([^\"]+)\"", fragment)
    if m:
        return normalize_url(m.group(1))
    for href in re.findall(r"href=\"([^\"]+)\"", fragment):
        candidate = unescape_attr(href)
        if not candidate.startswith("http"):
            continue
        host = urllib.parse.urlsplit(candidate).hostname or ""
        if any(bad in host for bad in EXCLUDE_HOSTS):
            continue
        return normalize_url(candidate)
    return ""


def extract_coupon(fragment: str):
    """从条目片段中提取优惠码（可能多个，用 ` / ` 连接）。"""
    codes = []
    for sentence in COUPON_SENTENCE_RE.findall(fragment):
        for code in CODE_RE.findall(sentence):
            code = strip_tags(code)
            if code and code not in codes:
                codes.append(code)
    if not codes:
        # 兜底：整段里出现的反引号代码
        for code in CODE_RE.findall(fragment):
            code = strip_tags(code)
            if code and code not in codes:
                codes.append(code)
    return " / ".join(codes)


def enrich(items, cache_dir, timeout, delay):
    """按详情页分组抓取，为每条补上 官网链接 / 优惠码 / 状态 / 发布时间。"""
    grouped = {}
    for it in items:
        grouped.setdefault(urllib.parse.urlsplit(it["detail_url"])._replace(fragment="").geturl(), []).append(it)

    for page_url, group in grouped.items():
        try:
            page = fetch(page_url, cache_dir=cache_dir, timeout=timeout, delay=delay)
        except Exception as exc:  # noqa: BLE001
            print("  !! %s" % exc, file=sys.stderr)
            continue
        sections = split_sections(page)
        for it in group:
            anchor = it["detail_anchor"]
            title, fragment = sections.get(anchor, ("", ""))
            if not fragment:
                # 锚点对不上时，退化为按名称匹配标题
                for sec_title, sec_html in sections.values():
                    if it["name"].split()[0] and it["name"].split()[0] in sec_title:
                        title, fragment = sec_title, sec_html
                        break
            it["site"] = extract_site(fragment) if fragment else ""
            it["coupon"] = extract_coupon(fragment) if fragment else ""
            it["status"] = next(
                (s for s in ("已失效", "维护中", "已关闭注册", "已关闭") if s in (title or "")), ""
            )
            m = re.search(r"发布于\s*[：:]\s*(\d{4}/\d{1,2}/\d{1,2})", fragment)
            it["published"] = m.group(1) if m else it["date"]
        time.sleep(delay)
    return items


# --------------------------------------------------------------------------- #
# 输出
# --------------------------------------------------------------------------- #
def cell(text: str) -> str:
    return (text or "-").replace("|", "\\|").strip() or "-"


def write_markdown(items, out_path, source_updated=""):
    lines = []
    lines.append("# 免费机场 / 免费代理 汇总")
    lines.append("")
    lines.append(
        "> 数据来源：[ygpy.net 免费机场收集](%s)　|　本文件由 `proxy-free.py` 自动抓取生成，"
        "**点击「机场名称」直接跳转对应官网注册链接**。" % INDEX_URL
    )
    lines.append(">")
    lines.append("> 抓取时间：%s%s" % (
        time.strftime("%Y-%m-%d %H:%M"),
        ("　|　源页面最后更新：%s" % source_updated) if source_updated else "",
    ))
    lines.append("")
    lines.append("| # | 机场名称 | 网站 | 购买方式 | 优惠码 | 套餐规格 | 发布日期 | 状态 |")
    lines.append("| --- | --- | --- | --- | --- | --- | --- | --- |")
    for idx, it in enumerate(items, 1):
        name = it["name"]
        site = it.get("site") or ""
        if site:
            name_cell = "[%s](%s)" % (name, site)
            site_cell = "[%s](%s)" % (domain_of(site), site)
        else:
            name_cell = name
            site_cell = "-"
        coupon = it.get("coupon") or ""
        coupon_cell = "`%s`" % coupon if coupon else "-"
        lines.append(
            "| %d | %s | %s | %s | %s | %s | %s | %s |"
            % (
                idx,
                cell(name_cell),
                cell(site_cell),
                cell(it.get("method")),
                cell(coupon_cell),
                cell(it.get("quota")),
                cell(it.get("published")),
                cell(it.get("status") or "可用"),
            )
        )
    lines.append("")
    lines.append("## 使用说明")
    lines.append("")
    lines.append("1. 点击「机场名称」进入官网，注册账号（链接里已带邀请码，注册即计入）。")
    lines.append("2. 需要优惠码的，在官网「个人中心 / 我的钱包 → 优惠券兑换」处输入表中的优惠码。")
    lines.append("3. 购买方式说明：**注册即送** 注册后套餐自动到账；**0 元购买** 直接下单 0 元套餐；"
                 "**使用优惠劵** 需先兑换优惠码；**使用礼品卡** 到「礼品卡兑换」处兑换。")
    lines.append("4. 部分机场限量发放或限时有效，优惠码失效属正常现象，请以官网为准。")
    lines.append("")
    lines.append("## 免责声明")
    lines.append("")
    lines.append("本文件仅为第三方信息的自动整理，不构成任何推荐；服务稳定性与合规性由各服务商负责，")
    lines.append("请在遵守当地法律法规的前提下自行判断使用。")
    lines.append("")
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    return out_path


# --------------------------------------------------------------------------- #
# 入口
# --------------------------------------------------------------------------- #
def main(argv=None):
    parser = argparse.ArgumentParser(description="抓取 ygpy.net 免费机场并生成 Markdown")
    parser.add_argument("-o", "--out", default=DEFAULT_OUT, help="输出 Markdown 文件（默认 %s）" % DEFAULT_OUT)
    parser.add_argument("--html", help="用本地 free.html 代替在线抓取（离线调试）")
    parser.add_argument("--cache-dir", default=DEFAULT_CACHE, help="HTML 缓存目录（默认 %s）" % DEFAULT_CACHE)
    parser.add_argument("--no-cache", action="store_true", help="不使用缓存，强制重新抓取")
    parser.add_argument("--timeout", type=float, default=30, help="单次请求超时秒数（默认 30）")
    parser.add_argument("--delay", type=float, default=0.8, help="请求间隔秒数（默认 0.8）")
    args = parser.parse_args(argv)

    cache_dir = None if args.no_cache else args.cache_dir

    if args.html:
        with open(args.html, encoding="utf-8", errors="ignore") as fh:
            index_page = fh.read()
        print("读取本地索引文件：%s" % args.html)
    else:
        print("抓取索引页：%s" % INDEX_URL)
        index_page = fetch(INDEX_URL, cache_dir=cache_dir, timeout=args.timeout, delay=args.delay)

    items = parse_index(index_page)
    if not items:
        print("未解析到任何条目，页面结构可能已变化。", file=sys.stderr)
        return 2
    print("解析到 %d 条机场记录，开始回溯详情页……" % len(items))

    updated = re.search(r"最后更新于\s*[：:]?\s*([0-9/]+,\s*[0-9:]+\s*[AP]M)", index_page)
    updated = updated.group(1) if updated else ""

    enrich(items, cache_dir=cache_dir, timeout=args.timeout, delay=args.delay)

    out = write_markdown(items, args.out, source_updated=updated)
    missing = [it["name"] for it in items if not it.get("site")]
    print("已生成：%s（%d 条）" % (out, len(items)))
    if missing:
        print("以下条目未自动找到官网链接，需手工确认：%s" % "、".join(missing), file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
