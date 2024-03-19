# CenterOS 7 /usr/local
```shell
# 安装 snap
sudo yum install epel-release

sudo yum install snapd

sudo systemctl enable --now snapd.socket

sudo ln -s /var/lib/snapd/snap /snap

# 重启系统确保 snap 安装
shutdown -r now

# 继续
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

# 在 nginx 启动的前提下执行命令，自动配置 nginx
sudo certbot --nginx
# 或者，手动配置 nginx
sudo certbot certonly --nginx

# 自动续订
sudo certbot renew --dry-run
# 续订 certbot 的命令安装在以下位置之一：
# /etc/crontab/
# /etc/cron.*/*
# systemctl list-timers
```
