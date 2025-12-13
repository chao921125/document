#!/usr/bin/env python3
"""
专业版订阅转换脚本：生成紧凑格式 Clash 配置
完全兼容 Clash Verge Rev 和 Mihomo 核心
输出格式与示例文件完全一致
"""

import base64
import json
import re
import sys
import urllib.parse
from pathlib import Path
from typing import Dict, List, Optional, Any

import yaml

# ==================== 核心配置模板 ====================
CLASH_CONFIG = {
    "mixed-port": 7890,
    "allow-lan": True,
    "bind-address": "*",
    "mode": "rule",
    "log-level": "info",
    "external-controller": "127.0.0.1:9090",
    "dns": {
        "enable": True,
        "ipv6": False,
        "default-nameserver": ["223.5.5.5", "119.29.29.29", "114.114.114.114"],
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "use-hosts": True,
        "respect-rules": True,
        "proxy-server-nameserver": ["223.5.5.5", "119.29.29.29", "114.114.114.114"],
        "nameserver": ["223.5.5.5", "119.29.29.29", "114.114.114.114"],
        "fallback": ["1.1.1.1", "8.8.8.8"],
        "fallback-filter": {
            "geoip": True,
            "geoip-code": "CN",
            "geosite": ["gfw"],
            "ipcidr": ["240.0.0.0/4"],
            "domain": ["+.google.com", "+.facebook.com", "+.youtube.com"],
        },
    },
    "proxies": [],
    "proxy-groups": [],
    "rules": [],
}

# ==================== 协议解析器 ====================
def safe_base64_decode(data: str) -> Optional[str]:
    """安全的 Base64 解码"""
    if not data:
        return None
    data = data.replace("-", "+").replace("_", "/")
    missing_padding = len(data) % 4
    if missing_padding:
        data += "=" * (4 - missing_padding)
    try:
        return base64.b64decode(data).decode("utf-8")
    except:
        return data if "://" in data else None


def parse_ss_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 SS 链接"""
    try:
        uri = uri.replace("ss://", "")
        if "@" in uri:
            cipher_pass, server_part = uri.split("@", 1)
            if ":" not in cipher_pass:
                decoded = safe_base64_decode(cipher_pass)
                if not decoded or ":" not in decoded:
                    return None
                cipher, password = decoded.split(":", 1)
            else:
                cipher, password = cipher_pass.split(":", 1)
        else:
            return None

        if "#" in server_part:
            addr_port, name = server_part.split("#", 1)
            name = urllib.parse.unquote(name)
        else:
            addr_port, name = server_part, "SS节点"

        server, port = addr_port.rsplit(":", 1)

        return {
            "name": name,
            "type": "ss",
            "server": server,
            "port": int(port),
            "cipher": cipher,
            "password": password,
            "udp": True,
        }
    except Exception:
        return None


def parse_ssr_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 SSR 链接"""
    try:
        data = uri.replace("ssr://", "")
        decoded = safe_base64_decode(data)
        if not decoded:
            return None

        parts = decoded.split(":")
        if len(parts) < 6:
            return None

        server, port, protocol, cipher, obfs = parts[:5]
        password_b64 = ":".join(parts[5:])
        params = {}
        if "/?" in password_b64:
            password_b64, params_str = password_b64.split("/?", 1)
            params = dict(urllib.parse.parse_qsl(params_str))

        password = safe_base64_decode(password_b64)

        node = {
            "name": urllib.parse.unquote(params.get("remarks", "SSR节点")),
            "type": "ssr",
            "server": server,
            "port": int(port),
            "protocol": protocol,
            "cipher": cipher,
            "obfs": obfs,
            "password": password,
            "udp": True,
        }

        if "obfsparam" in params:
            node["obfs-param"] = safe_base64_decode(params["obfsparam"])
        if "protoparam" in params:
            node["protocol-param"] = safe_base64_decode(params["protoparam"])

        return node
    except Exception:
        return None


def parse_vmess_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 VMess 链接"""
    try:
        data = uri.replace("vmess://", "")
        decoded = safe_base64_decode(data)
        if not decoded:
            return None

        config = json.loads(decoded)

        node = {
            "name": config.get("ps", "VMess节点"),
            "type": "vmess",
            "server": config["add"],
            "port": int(config["port"]),
            "uuid": config["id"],
            "alterId": int(config.get("aid", 0)),
            "cipher": config.get("type", "auto"),
            "network": config.get("net", "tcp"),
            "tls": config.get("tls") == "tls",
            "udp": True,
        }

        if node["network"] == "ws":
            node["ws-opts"] = {"path": config.get("path", "/")}
            if config.get("host"):
                node["ws-opts"]["headers"] = {"Host": config["host"]}
        elif node["network"] == "h2":
            node["h2-opts"] = {"host": [config.get("host", "")], "path": config.get("path", "/")}

        return node
    except Exception:
        return None


def parse_trojan_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 Trojan 链接"""
    try:
        parsed = urllib.parse.urlparse(uri)
        name = urllib.parse.unquote(parsed.fragment) or "Trojan节点"

        node = {
            "name": name,
            "type": "trojan",
            "server": parsed.hostname,
            "port": parsed.port or 443,
            "password": parsed.username,
            "sni": parsed.hostname,
            "udp": True,
            "skip-cert-verify": False,
        }

        if parsed.query:
            params = dict(urllib.parse.parse_qsl(parsed.query))
            node["sni"] = params.get("sni", parsed.hostname)
            node["skip-cert-verify"] = params.get("allowInsecure") == "1"
            if "type" in params:
                node["network"] = params["type"]
                if node["network"] == "ws":
                    node["ws-opts"] = {"path": params.get("path", "/")}

        return node
    except Exception:
        return None


def parse_vless_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 VLESS 链接"""
    try:
        parsed = urllib.parse.urlparse(uri)
        name = urllib.parse.unquote(parsed.fragment) or "VLESS节点"

        node = {
            "name": name,
            "type": "vless",
            "server": parsed.hostname,
            "port": parsed.port or 443,
            "uuid": parsed.username,
            "alterId": 0,
            "cipher": "auto",
            "udp": True,
            "tls": True,
            "skip-cert-verify": False,
        }

        if parsed.query:
            params = dict(urllib.parse.parse_qsl(parsed.query))
            if "type" in params:
                node["network"] = params["type"]
            if "security" in params:
                node["tls"] = params["security"] == "tls"
            if "flow" in params:
                node["flow"] = params["flow"]
            if "sni" in params:
                node["servername"] = params["sni"]
            if "fp" in params:
                node["client-fingerprint"] = params["fp"]

            # REALITY 选项
            if "pbk" in params:
                node["reality-opts"] = {
                    "public-key": params["pbk"],
                    "short-id": params.get("sid", ""),
                }

        return node
    except Exception:
        return None


def parse_hysteria2_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 Hysteria2 链接"""
    try:
        parsed = urllib.parse.urlparse(uri)
        name = urllib.parse.unquote(parsed.fragment) or "Hy2节点"

        node = {
            "name": name,
            "type": "hysteria2",
            "server": parsed.hostname,
            "port": parsed.port or 443,
            "password": parsed.username,
            "sni": parsed.hostname,
            "skip-cert-verify": True,
            "up": 1000,
            "down": 1000,
        }

        if parsed.query:
            params = dict(urllib.parse.parse_qsl(parsed.query))
            if "sni" in params:
                node["sni"] = params["sni"]
            if "insecure" in params:
                node["skip-cert-verify"] = params["insecure"] == "1"
            if "up" in params:
                node["up"] = int(params["up"])
            if "down" in params:
                node["down"] = int(params["down"])
            if "ports" in params:
                node["ports"] = params["ports"]

        return node
    except Exception:
        return None


def build_proxy_groups(proxy_names: List[str]) -> List[Dict[str, Any]]:
    """构建代理组（匹配示例格式）"""
    if not proxy_names:
        return []

    return [
        {
            "name": "🔰 节点选择",
            "type": "select",
            "proxies": ["♻️ 自动选择", "🎯 全球直连"] + proxy_names,
        },
        {
            "name": "♻️ 自动选择",
            "type": "url-test",
            "proxies": proxy_names,
            "url": "http://www.gstatic.com/generate_204",
            "interval": 300,
        },
        {
            "name": "🌍 国外媒体",
            "type": "select",
            "proxies": ["🔰 节点选择", "♻️ 自动选择", "🎯 全球直连"] + proxy_names,
        },
        {
            "name": "🌏 国内媒体",
            "type": "select",
            "proxies": ["🎯 全球直连", "🔰 节点选择"] + proxy_names,
        },
        {
            "name": "Ⓜ️ 微软服务",
            "type": "select",
            "proxies": ["🎯 全球直连", "🔰 节点选择"] + proxy_names,
        },
        {
            "name": "📲 电报信息",
            "type": "select",
            "proxies": ["🔰 节点选择", "🎯 全球直连"] + proxy_names,
        },
        {
            "name": "🍎 苹果服务",
            "type": "select",
            "proxies": ["🔰 节点选择", "🎯 全球直连", "♻️ 自动选择"] + proxy_names,
        },
        {
            "name": "🎯 全球直连",
            "type": "select",
            "proxies": ["DIRECT"] + proxy_names,
        },
        {
            "name": "🛑 全球拦截",
            "type": "select",
            "proxies": ["REJECT", "DIRECT"] + proxy_names,
        },
        {
            "name": "🐟 漏网之鱼",
            "type": "select",
            "proxies": ["🔰 节点选择", "🎯 全球直连", "♻️ 自动选择"] + proxy_names,
        },
    ]


def get_default_rules() -> List[str]:
    """获取默认规则"""
    return [
        "DOMAIN-SUFFIX,local,🎯 全球直连",
        "IP-CIDR,127.0.0.0/8,🎯 全球直连,no-resolve",
        "IP-CIDR,172.16.0.0/12,🎯 全球直连,no-resolve",
        "IP-CIDR,192.168.0.0/16,🎯 全球直连,no-resolve",
        "IP-CIDR,10.0.0.0/8,🎯 全球直连,no-resolve",
        "IP-CIDR,17.0.0.0/8,🎯 全球直连,no-resolve",
        "IP-CIDR,100.64.0.0/10,🎯 全球直连,no-resolve",
        "IP-CIDR6,::1/128,🎯 全球直连,no-resolve",
        "IP-CIDR6,fc00::/7,🎯 全球直连,no-resolve",
        "IP-CIDR6,fe80::/10,🎯 全球直连,no-resolve",
        "IP-CIDR6,fd00::/8,🎯 全球直连,no-resolve",
        "GEOIP,CN,🎯 全球直连",
        "MATCH,🐟 漏网之鱼",
    ]


def compact_yaml_dump(data: Any) -> str:
    """生成紧凑格式的 YAML，与示例完全一致"""

    def represent_dict(dumper, data):
        # 将所有字典转换为紧凑的 flow style
        return dumper.represent_mapping("tag:yaml.org,2002:map", data, flow_style=True)

    def represent_list(dumper, data):
        # 列表使用 block style，每个元素一行
        return dumper.represent_sequence("tag:yaml.org,2002:seq", data, flow_style=False)

    yaml.add_representer(dict, represent_dict, Dumper=yaml.SafeDumper)
    yaml.add_representer(list, represent_list, Dumper=yaml.SafeDumper)

    # 生成 YAML，设置宽度避免换行
    return yaml.dump(
        data,
        allow_unicode=True,
        sort_keys=False,
        default_flow_style=False,
        indent=0,
        width=1000,
        Dumper=yaml.SafeDumper,
    )


def convert_to_clash(subscription_text: str) -> str:
    """转换订阅为 Clash 配置"""

    # 1. Base64 解码
    decoded = safe_base64_decode(subscription_text.strip())
    if not decoded:
        raise ValueError("无法解码 Base64 订阅内容")

    # 2. 分割节点
    node_uris = [line.strip() for line in decoded.split("\n") if line.strip()]
    print(f"📦 检测到 {len(node_uris)} 个节点链接", file=sys.stderr)

    # 3. 解析节点
    parsers = {
        "ss://": parse_ss_uri,
        "ssr://": parse_ssr_uri,
        "vmess://": parse_vmess_uri,
        "trojan://": parse_trojan_uri,
        "vless://": parse_vless_uri,
        "hysteria2://": parse_hysteria2_uri,
    }

    proxies = []
    failed_count = 0

    for i, uri in enumerate(node_uris, 1):
        parsed = None
        for prefix, parser in parsers.items():
            if uri.startswith(prefix):
                parsed = parser(uri)
                break

        if parsed:
            proxies.append(parsed)
        else:
            failed_count += 1
            print(f"⚠️ 节点 {i} 无法解析: {uri[:50]}...", file=sys.stderr)

    print(f"✅ 成功解析 {len(proxies)} 个节点，失败 {failed_count} 个", file=sys.stderr)

    if not proxies:
        raise ValueError("没有有效节点")

    # 4. 构建配置
    config = CLASH_CONFIG.copy()
    proxy_names = [p["name"] for p in proxies]

    config["proxies"] = proxies
    config["proxy-groups"] = build_proxy_groups(proxy_names)
    config["rules"] = get_default_rules()

    # 5. 生成紧凑格式 YAML
    return compact_yaml_dump(config)


def main():
    """命令行入口"""
    if len(sys.argv) != 3:
        print("使用方式: python convert.py <输入文件> <输出文件>", file=sys.stderr)
        print("示例: python convert.py subscription.txt clash.yaml", file=sys.stderr)
        sys.exit(1)

    input_file, output_file = Path(sys.argv[1]), Path(sys.argv[2])

    if not input_file.exists():
        print(f"错误: 输入文件 '{input_file}' 不存在", file=sys.stderr)
        sys.exit(1)

    try:
        # 读取订阅内容
        subscription_text = input_file.read_text(encoding="utf-8").strip()

        # 转换
        print("🚀 开始转换...", file=sys.stderr)
        clash_config = convert_to_clash(subscription_text)

        # 保存文件
        output_file.write_text(clash_config, encoding="utf-8")
        print(f"💾 配置已保存到: {output_file.absolute()}", file=sys.stderr)
        print(f"📄 节点数: {len(re.findall(r'^    -', clash_config, re.M))}", file=sys.stderr)

    except Exception as e:
        print(f"❌ 转换失败: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()