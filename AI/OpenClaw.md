https://github.com/Kilo-Org/kilocode

| Skills |
|--------|
|        |
1password: https://1password.com/zh-cn/(官方密码管理器)
apple-notes: https://github.com/angelespejo/apple-notes-cli(通过命令行管理 Apple Notes)
apple-reminders: https://github.com/steipete/remindctl(Apple 提醒事项的 CLI 工具)
bear-notes: https://github.com/tylerwince/grizzly(Bear 笔记的 CLI 交互工具)
blogwatcher: https://github.com/Hyaxia/blogwatcher(追踪博客更新文章的 Go CLI 工具)
blucli: https://github.com/joshfisidi/blucli(Bluesound/NAD BluOS 播放器的命令行控制工具)
camsnap: https://github.com/steipete/camsnap(从 RTSP/ONVIF 摄像头抓拍或监控的 CLI 工具)
clawhub: https://github.com/openclaw/clawhub(OpenClaw 生态系统的 Claude Skill 官方目录)
eightctl: https://github.com/steipete/eightctl(在终端里控制 Eight Sleep Pod 智能床)
gh-issues: https://cli.github.com/manual/gh_issue(GitHub 官方 CLI 中的 issue 管理子命令)
gifgrep: https://github.com/steipete/gifgrep(在终端里搜索并预览 GIF 动图的命令行工具)
gog: https://github.com/steipete/gogcli(在终端里管理 Google Workspace 服务如 Gmail、日历等的 CLI)
goplaces: https://github.com/steipete/goplaces(Google Places API 的现代 Go 语言 CLI 工具)
himalaya: https://github.com/pimalaya/himalaya(用 Rust 编写的终端电子邮件客户端及 IMAP 工具)
imsg: https://github.com/pangu25/imsg(让 AI Agent 能通过命令行收发 iMessage 的工具)
mcporter: https://github.com/surajS0106/mcporter(Model Context Protocol 的 TypeScript 运行时与 CLI 生成器)
model-usage: https://github.com/orgs/models/repositories(通常指 GitHub Models 的使用与限流监控，或相关 API 调用统计模块)
nano-pdf: https://github.com/Lynagile/Nano-PDF(使用自然语言和多模态 AI 编辑 PDF 文件的命令行工具)
obsidian: https://github.com/Yakitrak/notesmd-cli(无需打开应用，直接在终端与 Obsidian 库交互的 CLI)
openai-whisper: https://github.com/openai/whisper(OpenAI 开源的强大语音识别与转录系统)
openhue: https://github.com/openhue/openhue-cli(飞利浦 Hue 智能照明系统的开源命令行控制工具)
oracle: https://github.com/oracle/oci-cli(Oracle 云计算基础设施的官方命令行接口)
ordercli: https://github.com/steipete/ordercli(检查 Foodora 和 Deliveroo 外卖订单状态的命令行工具)
peekaboo: https://github.com/microsoft/Peekaboo(微软开源的基于掩码扩散模型的交互式视频生成工具)
sag: https://github.com/WiedenKennedyNYC/Internal-SAG(将帧目录转换为动画 SVG 的 CLI 工具，替代 GIF)
session-logs: https://github.com/orgs/copilot/settings/logs(通常指 GitHub Copilot 会话原生的日志系统或移动端会话记录)
songsee: https://github.com/keithmackay/songsee(将音频文件转化为酷炫频谱可视化图像的 Go 语言 CLI)
sonoscli: https://github.com/joshfisidi/sonoscli(发现和控制 Sonos 音响系统的现代 Go 语言 CLI)
summarize: https://github.com/hhi/summarize(通过 AI 总结网页、YouTube 视频或播客的命令行工具及浏览器插件)
things-mac: https://github.com/ossianhempel/things3-cli(强大的 Things 3 任务管理 CLI，支持读写本地数据库)
tmux: https://github.com/tmux/tmux(终端复用器，堪称 Linux/Unix 运维神器)
video-frames: https://github.com/n3r4zzurr0/video-frames(Node.js 库，用于从视频中按时间戳提取帧并转为 base64 图像)
wacli: https://www.npmjs.com/package/wacli(WhatsApp 的命令行工具，可通过 npm 安装使用)
xurl: https://www.npmjs.com/package/xurl(用于在命令行中快速发起各种 HTTP 请求的轻量级 CLI 工具)

# 卸载
## 标准卸载流程（所有系统通用第一步）
```shell
# 官方卸载指令
openclaw uninstall

# 强制删除全局npm包
npm rm -g openclaw
npm rm -g clawhub
npm rm -g moltbot
```

## MacOS 彻底卸载（清理launchd服务与残留目录）
```shell
# 停止并卸载网关服务
launchctl bootout gui/$UID/bot.molt.gateway
launchctl remove bot.molt.gateway

# 删除系统服务配置文件
rm -f ~/Library/LaunchAgents/bot.molt.gateway.plist
rm -f ~/Library/LaunchAgents/com.openclaw.*.plist
rm -f ~/Library/LaunchAgents/com.moltbot.*.plist

# 删除主配置目录
rm -rf ~/.openclaw
rm -rf ~/.clawdbot
rm -rf ~/.moltbot

# 删除工作区与技能缓存
rm -rf ~/OpenClaw
rm -rf ~/Clawdbot
rm -rf ~/Moltbot

# 清理日志与临时文件
rm -rf /tmp/openclaw*
rm -rf /tmp/claw*
rm -rf /tmp/molt*

# 验证是否卸载干净
which openclaw
which clawhub
```
## Linux 彻底卸载（清理systemd系统服务）
```shell
# 停止并禁用自启服务
systemctl --user stop openclaw-gateway.service
systemctl --user disable openclaw-gateway.service

# 删除服务文件
rm -f ~/.config/systemd/user/openclaw-gateway.service
rm -f ~/.config/systemd/user/moltbot.service

# 重新加载系统服务配置
systemctl --user daemon-reexec
systemctl --user daemon-reload

# 删除配置与数据目录
rm -rf ~/.openclaw
rm -rf ~/.clawdbot
rm -rf ~/.moltbot
rm -rf /opt/openclaw
rm -rf /opt/clawdbot

# 清理全局命令
rm -f /usr/local/bin/openclaw
rm -f /usr/local/bin/clawdbot
rm -f /usr/local/bin/moltbot
rm -f /usr/local/bin/clawhub

# 清理Docker容器与镜像（如使用容器部署）
docker stop openclaw
docker rm openclaw
docker rmi openclaw/openclaw:latest
docker system prune -af

# 验证卸载
which openclaw
systemctl --user list-unit-files | grep openclaw
```

## Windows11 彻底卸载（管理员权限清理计划任务）
以管理员身份打开 PowerShell 执行：
```shell
# 强制删除OpenClaw自启计划任务
schtasks /Delete /F /TN "OpenClaw Gateway"
schtasks /Delete /F /TN "Clawdbot Gateway"
schtasks /Delete /F /TN "Moltbot Gateway"

# 停止所有相关进程
taskkill /f /im node.exe
taskkill /f /im openclaw.exe
taskkill /f /im clawdbot.exe
taskkill /f /im moltbot.exe

# 删除主配置目录
Remove-Item -Force -Recurse "$env:USERPROFILE\.openclaw"
Remove-Item -Force -Recurse "$env:USERPROFILE\.clawdbot"
Remove-Item -Force -Recurse "$env:USERPROFILE\.moltbot"

# 删除工作区文件夹
Remove-Item -Force -Recurse "$env:USERPROFILE\OpenClaw"
Remove-Item -Force -Recurse "$env:USERPROFILE\Clawdbot"
Remove-Item -Force -Recurse "$env:USERPROFILE\Moltbot"

# 清理npm全局安装
npm rm -g openclaw
npm rm -g clawhub
npm rm -g moltbot

# 清理PATH中的残留命令
Remove-Item -Force "$env:APPDATA\npm\openclaw*"
Remove-Item -Force "$env:APPDATA\npm\claw*"
Remove-Item -Force "$env:APPDATA\npm\molt*"

# 清理Docker容器
docker stop openclaw
docker rm openclaw
docker rmi openclaw/openclaw:latest
docker system prune -af
```
## 阿里云ECS服务器彻底卸载OpenClaw
```shell
# 停止容器
docker stop openclaw
docker rm openclaw

# 删除镜像
docker rmi openclaw/openclaw:2026.3.15
docker system prune -af

# 删除挂载目录
rm -rf /opt/openclaw
rm -rf /opt/clawdbot

# 删除服务与配置
rm -rf ~/.openclaw
rm -rf /tmp/openclaw*

# 卸载npm全局包
npm rm -g openclaw clawhub
```
