# 服务器首选推荐
debian 官网：https://www.debian.org/ \
ubuntu 官网：https://ubuntu.com/ \
rocky 官网：https://rockylinux.org/ \
oracle 官网：https://www.oracle.com/cn/linux/ \
alma 官网：https://almalinux.org/
# 桌面首选推荐
ubuntu 官网：https://ubuntu.com/ \
fedora 官网：https://fedoraproject.org/
# 其他
linux 社区：https://www.linux.org/pages/download/

# Linux 知识网站
https://www.linuxcool.com/

# [最全系统下载](https://www.linux.org/pages/download/)

# 基本的依赖 yum/wget/openssl/rpm 建议装上，后续装服务的时候这些依赖不需要装了
```shell
# 安装 openssl
yum -y install openssl openssl-devel gcc openssl11 openssl11-devel
yum -y install zlib*
yum install readline-devel
# https://www.tcl.tk/software/tcltk/
```

# 常用命令
mac下查看端口 nc -vz -w 2 116.14.73.138 3306

## 修改权限
chmod -R 777

## 防火墙设置：
启动服务名称：

CenterOs 6 是 iptables；
CenterOs 7 是 firewalld

启动服务命令：

CenterOs 6 是 service；
CenterOs 7 是 systemctl

```shell
# 设置防火墙
systemctl start firewalld.service
# 设置防火墙
systemctl stop firewalld.service && systemctl disable firewalled;
# 开放端口
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
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

## 本地/服务器文件互传
```shell
# 下载
scp root@ip:/path /path/local
# 上传
scp /path/local root@ip:/path
scp /Users/huangchao/Downloads/jdk-8u401-linux-x64.rpm root@114.55.34.64:/usr/local/file
scp /Users/huangchao/Downloads/jdk-21_linux-x64_bin.rpm root@114.55.34.64:/usr/local/file
```

[//]: # (sourcecode /usr/local/src)
[//]: # (file /usr/local/file)
