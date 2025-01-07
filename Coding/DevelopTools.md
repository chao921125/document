# Mac 系统必备安装
[Homebrew](https://brew.sh/)
```text
官方指令安装（科学上网）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
卸载：/bin/zsh -c "$(curl -fsSL https://raw.githubusercontent.com/HomebrewCN/raw/master/HomebrewUninstall.sh)"
如果安装失败，请执行
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
卸载：/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

# Java
[JDK 下载](https://www.oracle.com/cn/java/technologies/downloads/)
```text
Windows 环境下 请务必配置JDK的环境变量
请下载 LTS 版本，目前对应 21(21.0.3)，长期版本为 JDK8(8u411) 和 JDK11(11.0.23)
多版本jdk请在系统配置文件中设置即可
JAVA_HOME path
CALSSPATH .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;
Path      %JAVA_HOME%\bin
          %JAVA_HOME%\jre\bin
```
```shell
# ENV JDK MacOS 下多版本配置
export JAVA8_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export JAVA11_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
export JAVA17_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home
export JAVA_HOME=$JAVA_HOME
alias jdk8="export JAVA_HOME=$JAVA8_HOME"
alias jdk11="export JAVA_HOME=$JAVA11_HOME"
alias jdk17="export JAVA_HOME=$JAVA17_HOME"
alias jdk="export JAVA_HOME=$JAVA_HOME"
```

[MYSQL 下载](https://dev.mysql.com/downloads/mysql/) |
[MYSQL Windows 下载](https://dev.mysql.com/downloads/installer/) |
[MYSQL MacOS 下载](https://dev.mysql.com/downloads/mysql/)
```text
Mac 下mysql无法启动解决：
sudo chown -R mysql /usr/local/mysql/data
sudo /usr/local/mysql/support-files/mysql.server start
设置自启动
sudo launchctl load -w /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist
```

[Maven](https://maven.apache.org/)
[Gradle](https://gradle.org/)
```shell
export M2_HOME="/Users/admin/apache-maven"
PATH="${M2_HOME}/bin:${PATH}"
export PATH
```
```shell
brew install gradle
```

# JS
[pnpm 包管理 内含 node 版本管理，可以不用 nvm 等包管理器](https://www.pnpm.cn/installation/) |
[BunJS 下载](https://bun.sh/) |
[NodeJS 下载](https://nodejs.org/en/download/) |
[NodeJS多版本管理 nvm MacOS](https://github.com/nvm-sh/nvm/) [NodeJS多版本管理 nvm Windows](https://github.com/nvm-sh/nvm#install--update-script)
```shell
# 安装并使用 lts 最新长期支持版本或者指定的版本 --global or -g
pnpm env use --global lts
pnpm env use --global 18.0.0
# 安装指定的版本
pnpm env add --global lts 18 20.0.0
# 删除指定版本
pnpm env remove --global 14.0.0 16.0.0
# 查看本地安装列表
pnpm env list
# 查看远程可安装列表
pnpm env list --remote
```
```shell
# 安装并使用 npm-check-updates
pnpm add -g npm-check-updates
# 查看可升级包
ncu
# 更新
ncu -u
# 项目内使用
npx npm-check-updates
```
```text
使用nvm管理多版本nodejs（安装前请查看最新版本）
nvm安装 https://github.com/nvm-sh/nvm
Mac: （~/.zshrc）
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

Win: https://github.com/nvm-sh/nvm#install--update-script
Windows 请注意：安装的nvm路径可以随意，但后面的node路径请勿放系统盘
安装指定的NodeJS版本：nvm install x.x.x
卸载对应的NodeJS版本：nvm uninstall x.x.x
查看当前安装的版本：nvm ls
Windows安装完成后，请使用nvm ls查看后，然后使用nvm use x.x.x
MacOS安装完成后，请使用nvm ls查看后，然后使用nvm use x.x.x & nvm alias default x.x.x

且推荐使用pnpm安装包，减少本地磁盘的不必要占用
pnpm安装 https://www.pnpm.cn/installation
Mac：curl -fsSL https://get.pnpm.io/install.sh | sh -
Win：iwr https://get.pnpm.io/install.ps1 -useb | iex
```

# Python
[Python 下载](https://www.python.org/downloads/)
```text
不再建议安装Python 2.x 版本
```
```shell
# ENV Python
alias python=/Library/Frameworks/Python.framework/Versions/3.x/bin/python3.x
```

# 软件工具
[Git 下载](https://git-scm.com/) |
[Git 官方客户端](https://desktop.github.com/) |
[Git 其他三方客户端](https://git-scm.com/downloads/guis)
```text
Mac自己会集成到XCode中去，如果更新Git服务的话执行一下命令即可
Homebrew
Install homebrew if you don't already have it, then:
$ brew install git

MacPorts
Install MacPorts if you don't already have it, then:
$ sudo port install git
```

## 全能开发工具
[Visual Studio Code 简称VSCode 微软免费 强大 推荐 插件多了会很卡！！！](https://code.visualstudio.com/Download)
```text
VSCode 下载时请选择 System Installer
```

## Java
[IDEA 收费 但有免费的社区版](https://www.jetbrains.com/zh-cn/idea/) |
[Eclipse 老牌开发工具 免费](https://www.eclipse.org/ide/) |
[Netbeans 免费](https://netbeans.apache.org/)
```text
Jetbrains家族工具之一：IDEA
IDEA 收费 Ultimate
IDEA 社区版免费 Community Edition
```

## Web 前端
[Web Storm 收费](https://www.jetbrains.com/webstorm/)
```text
Jetbrains家族工具之一：Web Storm
```

## Python
[Pycharm 收费 但有免费的社区版](https://www.jetbrains.com/pycharm/)
```text
Jetbrains家族工具之一：Pycharm
Pycharm 收费 Professional
Pycharm 社区版免费 Community
```

## Data Base数据库连接
[Navicat Premium](https://www.navicat.com.cn/download/navicat-premium)
```text
破解方式请自行搜索，或关注公众号【CC NET】
https://gitlab.com/ajiajishu/navicat-keygen-16V
```

## 小程序 开发 请参考[小程序框架推荐](https://github.com/chao921125/vue-vite)
[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
[HbuilderX](https://www.dcloud.io/hbuilderx.html)
[]()

## APP 开发 请参考[APP框架推荐](https://github.com/chao921125/vue-vite)
[android studio](https://developer.android.google.cn/studio/)
[华为 ArkTS](https://developer.harmonyos.com/cn/develop/deveco-studio/#download)
[HbuilderX](https://www.dcloud.io/hbuilderx.html)
[]()
```shell
# ENV Flutter
export PATH="$PATH:/Users/huangchao/WorkSoft/flutter/bin"
```