# Debian｜Ubuntu /usr/local
```shell
# 安装 tcl https://tcl.tk/software/tcltk/
# http://prdownloads.sourceforge.net/tcl/tcl8.6.14-src.tar.gz
sudo apt full-upgrade
sudo apt install -y build-essential tcl

# http://download.redis.io/releases/
sudo apt install -y redis-server

# 修改配置 /key 查找指定的内容
vi /etc/redis/redis.conf
# 后台启动
daemonize yes
# 关闭保护模式
protected-mode no
# 允许您声明一个 init 系统来将 Redis 作为服务进行管理
supervised systemd
# 注释 绑定的是自己机器网卡的ip
bind 127.0.0.1
# 可以设置密码
requirepass 12345

sudo systemctl daemon-reload
# 启动 Nginx 服务
sudo systemctl start redis.service
# 设置开机自启动 默认自动启
sudo systemctl enable redis.service
# 取消开机自启动
sudo systemctl disabled redis
# 检查 Nginx 状态
sudo systemctl status redis
# 停止 Nginx 服务
sudo systemctl stop redis
# 重启 Nginx 服务
sudo systemctl restart redis.service

# 直接启动 不建议
./redis-server
```

# RHEL /usr/local
```shell
# 安装 tcl https://tcl.tk/software/tcltk/
# http://prdownloads.sourceforge.net/tcl/tcl8.6.14-src.tar.gz
wget -i -c http://prdownloads.sourceforge.net/tcl/tcl8.6.14-src.tar.gz
tar -zxvf tcl8.6.14-src.tar.gz
cd tcl.8.6.14/unix
./configure
make && make install
ln /usr/local/bin/tclsh8.6 /usr/bin/tclsh

# http://download.redis.io/releases/
wget -i -c http://download.redis.io/releases/redis-7.2.4.tar.gz
mkdir /usr/local/redis
tar -zxvf redis-7.2.4.tar.gz -C /usr/local/redis
cd /usr/local/redis
mv ./redis-7.2.4/* /usr/local/redis

# 修改配置 /key 查找指定的内容
vi redis.conf
# 后台启动
daemonize yes
# 关闭保护模式
protected-mode no
# 注释 绑定的是自己机器网卡的ip
# bind 127.0.0.1
# 可以设置密码
requirepass 12345

make
make test
# sudo make distclean
sudo make install PREFIX=/usr/local/redis

cd /usr/local/redis/bin
# 启动服务 直接启动

# 添加服务
vi /etc/systemd/system/redis.service
# 内容
[Unit]
Description=Redis Server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf
ExecReload=/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf
ExecStop=/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target

systemctl daemon-reload
# 启动 Nginx 服务
systemctl start redis.service
# 设置开机自启动
systemctl enable redis.service
# 取消开机自启动
systemctl disabled redis.service
# 检查 Nginx 状态
systemctl status redis.service
# 停止 Nginx 服务
systemctl stop redis.service
# 重启 Nginx 服务
systemctl restart redis.service

# 直接启动 不建议
./redis-server
```
