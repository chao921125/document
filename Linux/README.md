# 下载 及 文档
## 服务器（免费）首选推荐
| 服务器 & 桌面                                         |                     |
|--------------------------------------------------|---------------------|
| [ubuntu](https://ubuntu.com/)                    | Debian              |
| [debian](https://www.debian.org/)                | Debian              |
| [mint](https://www.linuxmint.com/)               | Debian              |
|                                                  |                     |
| [centos stream](https://www.centos.org/)         | RHEL 上游分支更新频率 适中    |
| [fedora](https://fedoraproject.org/)             | RHEL 上游分支更新频率快      |
| [alma](https://almalinux.org/)                   | RHEL CenterOS 替代 社区 |
| [rocky](https://rockylinux.org/)                 | RHEL CenterOS 替代 企业 |
| [oracle](https://www.oracle.com/cn/linux/)       | RHEL                |
| [centos](https://www.centos.org/)                | RHEL 不再推荐使用         |
|                                                  |                     |
| [opensuse](https://www.opensuse.org/)            | Slackware           |
| [slackware](http://www.slackware.com/index.html) | Slackware           |
|                                                  |                     |
| [gentoo](https://www.gentoo.org/)                | Gentoo              |
|                                                  |                     |
| [arch](https://archlinux.org/)                   | Other               |

## 其他
[linux 社区](https://www.linux.org/pages/download/)
[最全系统下载](https://www.linux.org/pages/download/)
[Linux 知识网站](https://www.linuxcool.com/)

# 常用命令
mac下查看端口 nc -vz -w 2 116.14.73.138 3306

######
```shell
# Linux查看版本当前操作系统内核信息
uname -a
# Linux查看当前操作系统版本信息
cat /proc/version
cat /etc/redhat-release
# Linux查看cpu相关信息，包括型号、主频、内核信息等
cat /proc/cpuinfo
```

## 本地/服务器文件互传
```shell
# 下载
scp root@ip:/path /path/local
# 上传
scp /path/local root@ip:/path
scp /Users/huangchao/Downloads/jdk-8u401-linux-x64.rpm root@114.55.34.64:/usr/local/file
scp /Users/huangchao/Downloads/jdk-21_linux-x64_bin.rpm root@114.55.34.64:/usr/local/file
```

## 编辑文件
vi
vim

## 修改权限
chmod -R 777

## 切换root权限
sudo su -

# Debian｜Ubuntu 分支相关 基本的依赖 wget/openssl/rpm 建议装上，后续装服务的时候这些依赖不需要装了
# apt 安装后目录为
```text
下载的软件的存放位置：/var/cache/apt/archives
安装后软件的默认位置：/usr/share
可执行文件位置：/usr/bin
配置文件位置：/etc
lib文件位置：/usr/lib
```
```shell
sudo apt install -y wget
sudo apt install -y rpm
# 推荐使用 apt
sudo apt update
sudo apt -y upgrade
# 执行脚本请使用 apt-get
sudo apt-get update
sudo apt-get upgrade

# 安装 openssl
sudo apt install build-essential
sudo apt install -y libssl-dev
sudo apt install -y openssl gcc
sudo apt install -y zlib*
sudo apt install -y libreadline-dev

sudo apt install -y ca-certificates apt-transport-https software-properties-common lsb-release zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libffi-dev
# https://www.tcl.tk/software/tcltk/
```

## 防火墙设置：
```shell
# 安装防火墙
sudo apt install ufw

# 开启防火墙
sudo ufw enable
# 关闭防火墙
sudo ufw disable
# 开放端口
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3306/tcp
# 删除端口
sudo ufw delete allow 22/tcp
sudo ufw delete allow 80/tcp
sudo ufw delete allow 443/tcp
sudo ufw delete allow 3306/tcp
# 重启防火墙
sudo ufw reload
# 查看防火墙状态
sudo ufw status
sudo ufw status verbose
# 查看防火墙应用级
sudo ufw app list
# 查看监听的端口
sudo apt install -y net-tools
netstat -lnpt
sudo netstat -tunlp | grep 22
```

# RHEL 基本的依赖 yum/wget/openssl/rpm 建议装上，后续装服务的时候这些依赖不需要装了
```shell
netstat -tulpen
ss -ntl

sudo yum install -y wget
sudo yum install -y rpm
# 升级所有包同时也升级软件和系统内核
yum -y update
# 只升级所有包，不升级软件和系统内核
yum upgrade

# 安装 openssl
yum install -y openssl openssl-devel gcc gcc-c++
yum install -y zlib*
yum install -y readline-devel
# https://www.tcl.tk/software/tcltk/
```

## 防火墙设置：
启动服务名称：

RHEL 6 是 iptables；
RHEL 7 是 firewalld

启动服务命令：

RHEL 6 是 service；
RHEL 7 是 systemctl

```shell
# 设置防火墙
systemctl start firewalld.service
# 设置防火墙
systemctl stop firewalld.service && systemctl disable firewalled;
# 开放端口
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --zone=public --add-port=22/tcp --permanent
# 关闭端口
firewall-cmd --zone=public --remove-port=3306/tcp --permanent
# 配置立即生效
firewall-cmd --reload
# 查看防火墙所有开放的端口
firewall-cmd --zone=public --list-ports
# 查看防火墙状态
firewall-cmd --state
# 查看监听的端口
yum install -y net-tools
netstat -lnpt
```
