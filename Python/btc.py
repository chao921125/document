#!/usr/bin/env python3
"""
订阅转换脚本：Base64 → Clash 配置
支持协议：SS、SSR、VMess、Trojan、VLESS
"""

import base64
import json
import re
import sys
import urllib.parse
from pathlib import Path
from typing import Dict, List, Optional, Any

import yaml

# ==================== 配置常量 ====================
CLASH_TEMPLATE = {
    "mixed-port": 7890,
    "socks-port": 7891,
    "allow-lan": False,
    "mode": "rule",
    "log-level": "info",
    "ipv6": False,
    "external-controller": "127.0.0.1:9090",
    "dns": {
        "enable": True,
        "ipv6": False,
        "default-nameserver": ["223.5.5.5", "119.29.29.29"],
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "use-hosts": True,
        "nameserver": ["https://doh.pub/dns-query", "https://dns.alidns.com/dns-query"],
        "fallback": ["https://1.1.1.1/dns-query", "https://dns.google/dns-query"],
        "fallback-filter": {"geoip": True, "ipcidr": ["240.0.0.0/4"]},
    },
    "proxies": [],
    "proxy-groups": [
        {
            "name": "全球直连",
            "type": "select",
            "proxies": ["DIRECT"],
        },
        {
            "name": "自动选择",
            "type": "url-test",
            "proxies": [],
            "url": "http://www.gstatic.com/generate_204",
            "interval": 300,
            "tolerance": 50,
        },
        {
            "name": "故障转移",
            "type": "fallback",
            "proxies": [],
            "url": "http://www.gstatic.com/generate_204",
            "interval": 300,
        },
        {
            "name": "负载均衡",
            "type": "load-balance",
            "proxies": [],
            "url": "http://www.gstatic.com/generate_204",
            "interval": 300,
            "strategy": "consistent-hashing",
        },
    ],
    "rules": [
        "DOMAIN-SUFFIX,local,DIRECT",
        "IP-CIDR,127.0.0.0/8,DIRECT",
        "IP-CIDR,172.16.0.0/12,DIRECT",
        "IP-CIDR,192.168.0.0/16,DIRECT",
        "IP-CIDR,10.0.0.0/8,DIRECT",
        "GEOIP,CN,DIRECT",
        "MATCH,自动选择",
    ],
}


# ==================== 核心解码器 ====================
def safe_base64_decode(data: str) -> Optional[str]:
    """安全的 Base64 解码（处理 URL safe 和填充）"""
    if not data:
        return None

    # 替换 URL safe 字符
    data = data.replace("-", "+").replace("_", "/")

    # 自动填充
    missing_padding = len(data) % 4
    if missing_padding:
        data += "=" * (4 - missing_padding)

    try:
        decoded = base64.b64decode(data)
        return decoded.decode("utf-8")
    except Exception:
        try:
            # 尝试直接解码可能已经是明文的
            return data
        except:
            return None


# ==================== 协议解析器 ====================
def parse_ss_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 SS 链接"""
    try:
        # 移除前缀
        uri = uri.replace("ss://", "")

        # 处理 SIP002 格式
        if "@" in uri:
            # ss://cipher:pass@host:port#name
            cipher_pass, server_part = uri.split("@", 1)
            cipher, password = safe_base64_decode(cipher_pass).split(":", 1)
        else:
            # ss://base64(cipher:pass)@host:port#name
            encoded_part, server_part = uri.split("@", 1)
            decoded = safe_base64_decode(encoded_part)
            if ":" not in decoded:
                return None
            cipher, password = decoded.split(":", 1)

        # 解析服务器部分
        if "#" in server_part:
            addr_port, name = server_part.split("#", 1)
            name = urllib.parse.unquote(name)
        else:
            addr_port, name = server_part, "SS节点"

        if ":" not in addr_port:
            return None

        server, port = addr_port.rsplit(":", 1)

        return {
            "name": re.sub(r"[^\w\u4e00-\u9fa5\.\- ]", "", name)[:30],
            "type": "ss",
            "server": server,
            "port": int(port),
            "cipher": cipher,
            "password": password,
        }
    except Exception as e:
        print(f"❌ SS 解析失败: {str(e)[:50]}", file=sys.stderr)
        return None


def parse_ssr_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 SSR 链接"""
    try:
        # ssr://base64(host:port:protocol:method:obfs:password/?params)
        data = uri.replace("ssr://", "")
        decoded = safe_base64_decode(data)
        if not decoded:
            return None

        parts = decoded.split(":")
        if len(parts) < 6:
            return None

        server = parts[0]
        port = int(parts[1])
        protocol = parts[2]
        cipher = parts[3]
        obfs = parts[4]

        # 解析密码和参数
        password_params = ":".join(parts[5:])
        if "/?" in password_params:
            password_b64, params_str = password_params.split("/?", 1)
            password = safe_base64_decode(password_b64)
            params = dict(urllib.parse.parse_qsl(params_str))
        else:
            password = safe_base64_decode(password_params)
            params = {}

        node = {
            "name": urllib.parse.unquote(params.get("remarks", "SSR节点")),
            "type": "ssr",
            "server": server,
            "port": port,
            "protocol": protocol,
            "cipher": cipher,
            "obfs": obfs,
            "password": password,
        }

        # 添加可选参数
        if "obfsparam" in params:
            node["obfs-param"] = safe_base64_decode(params["obfsparam"])
        if "protoparam" in params:
            node["protocol-param"] = safe_base64_decode(params["protoparam"])

        node["name"] = re.sub(r"[^\w\u4e00-\u9fa5\.\- ]", "", node["name"])[:30]
        return node

    except Exception as e:
        print(f"❌ SSR 解析失败: {str(e)[:50]}", file=sys.stderr)
        return None


def parse_vmess_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 VMess 链接"""
    try:
        # vmess://base64({...})
        data = uri.replace("vmess://", "")
        decoded = safe_base64_decode(data)
        if not decoded:
            return None

        config = json.loads(decoded)

        node = {
            "name": re.sub(r"[^\w\u4e00-\u9fa5\.\- ]", "", config.get("ps", "VMess节点"))[:30],
            "type": "vmess",
            "server": config["add"],
            "port": int(config["port"]),
            "uuid": config["id"],
            "alterId": int(config.get("aid", 0)),
            "cipher": config.get("type", "auto"),
            "network": config.get("net", "tcp"),
            "tls": config.get("tls") == "tls",
        }

        # 传输层配置
        if node["network"] == "ws":
            node["ws-opts"] = {"path": config.get("path", "/")}
            if config.get("host"):
                node["ws-opts"]["headers"] = {"Host": config["host"]}
        elif node["network"] == "h2":
            node["h2-opts"] = {"host": [config.get("host", "")], "path": config.get("path", "/")}
        elif node["network"] == "grpc":
            node["grpc-opts"] = {"grpc-service-name": config.get("path", "")}

        return node

    except Exception as e:
        print(f"❌ VMess 解析失败: {str(e)[:50]}", file=sys.stderr)
        return None


def parse_trojan_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 Trojan 链接"""
    try:
        # trojan://password@server:port?params#name
        parsed = urllib.parse.urlparse(uri)
        name = urllib.parse.unquote(parsed.fragment) or "Trojan节点"

        node = {
            "name": re.sub(r"[^\w\u4e00-\u9fa5\.\- ]", "", name)[:30],
            "type": "trojan",
            "server": parsed.hostname,
            "port": parsed.port or 443,
            "password": parsed.username,
            "sni": parsed.hostname,
        }

        # 查询参数
        if parsed.query:
            params = dict(urllib.parse.parse_qsl(parsed.query))
            if "sni" in params:
                node["sni"] = params["sni"]
            if "allowInsecure" in params:
                node["skip-cert-verify"] = params["allowInsecure"] == "1"
            if "type" in params:
                node["network"] = params["type"]
                if node["network"] == "ws":
                    node["ws-opts"] = {"path": params.get("path", "/")}

        return node

    except Exception as e:
        print(f"❌ Trojan 解析失败: {str(e)[:50]}", file=sys.stderr)
        return None


def parse_vless_uri(uri: str) -> Optional[Dict[str, Any]]:
    """解析 VLESS 链接"""
    try:
        # vless://uuid@server:port?params#name
        parsed = urllib.parse.urlparse(uri)
        name = urllib.parse.unquote(parsed.fragment) or "VLESS节点"

        node = {
            "name": re.sub(r"[^\w\u4e00-\u9fa5\.\- ]", "", name)[:30],
            "type": "vless",
            "server": parsed.hostname,
            "port": parsed.port or 443,
            "uuid": parsed.username,
        }

        # 查询参数
        if parsed.query:
            params = dict(urllib.parse.parse_qsl(parsed.query))
            if "type" in params:
                node["network"] = params["type"]
            if "security" in params:
                node["tls"] = params["security"] == "tls"
                if node.get("tls"):
                    node["sni"] = params.get("sni", parsed.hostname)

        return node

    except Exception as e:
        print(f"❌ VLESS 解析失败: {str(e)[:50]}", file=sys.stderr)
        return None


# ==================== 主转换函数 ====================
def convert_to_clash(subscription_text: str) -> str:
    """将 Base64 订阅文本转换为 Clash 配置"""

    # 1. Base64 解码
    decoded = safe_base64_decode(subscription_text.strip())
    if not decoded:
        raise ValueError("无效的 Base64 订阅内容")

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
            print(f"⚠️ 节点 {i} 无法解析: {uri[:40]}...", file=sys.stderr)

    print(f"✅ 成功解析 {len(proxies)} 个节点，失败 {failed_count} 个", file=sys.stderr)

    if not proxies:
        raise ValueError("没有有效节点")

    # 4. 生成配置
    config = CLASH_TEMPLATE.copy()
    config["proxies"] = proxies

    # 更新代理组
    proxy_names = [p["name"] for p in proxies]
    config["proxy-groups"][1]["proxies"] = proxy_names  # 自动选择
    config["proxy-groups"][2]["proxies"] = proxy_names  # 故障转移
    config["proxy-groups"][3]["proxies"] = proxy_names  # 负载均衡

    # 5. 生成 YAML
    return yaml.dump(config, allow_unicode=True, sort_keys=False, indent=2)


# ==================== 命令行接口 ====================
def main():
    """命令行入口"""
    if len(sys.argv) != 3:
        print("使用方式: python convert.py <输入文件> <输出文件>", file=sys.stderr)
        print("示例: python convert.py subscription.txt clash.yaml", file=sys.stderr)
        sys.exit(1)

    input_file = Path(sys.argv[1])
    output_file = Path(sys.argv[2])

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

    except Exception as e:
        print(f"❌ 转换失败: {e}", file=sys.stderr)
        sys.exit(1)

# pip install pyyaml
# python btc.py subscription.txt clash.yaml
if __name__ == "__main__":
    main()
