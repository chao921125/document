[//]: # (https://certbot.eff.org/instructions)
# Debian｜Ubuntu /usr/local
```shell
# 安装 snap
sudo apt-get install -y snapd

# 已经存在 删除
sudo apt-get remove certbot

# 继续
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo apt-get install certbot python3-certbot-nginx
# 这个一般不需要安装
sudo apt-get install certbot python2-certbot-nginx

ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx
ln -s /usr/local/nginx/conf/ /etc/nginx

# 在 nginx 启动的前提下执行命令，自动配置 nginx
sudo certbot --nginx
# 或者，手动配置 nginx
sudo certbot certonly --nginx

# 自动续订
sudo certbot renew --dry-run
sudo certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start" --dry-run

# 续订 certbot 的命令安装在以下位置之一：
# /etc/crontab/
# /etc/cron.*/*
# systemctl list-timers

# 系统自动更新证书
0 0 1 * * certbot renew
10 0 1 * * systemctl restart nginx

# 新证书安装
sudo certbot run --nginx
```

# RHEL /usr/local
```shell
# 安装 snap
sudo yum install epel-release

sudo yum install snapd

sudo systemctl enable --now snapd.socket

sudo ln -s /var/lib/snapd/snap /snap

# 重启系统确保 snap 安装
shutdown -r now

# 已经存在 删除
sudo yum remove certbot

# 继续
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo yum install certbot python3-certbot-nginx
sudo yum install certbot python2-certbot-nginx

ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx
ln -s /usr/local/nginx/conf/ /etc/nginx

# 在 nginx 启动的前提下执行命令，自动配置 nginx
sudo certbot --nginx
# 或者，手动配置 nginx
sudo certbot certonly --nginx

# 自动续订
sudo certbot renew --dry-run
sudo certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start" --dry-run

# 续订 certbot 的命令安装在以下位置之一：
# /etc/crontab/
# /etc/cron.*/*
# systemctl list-timers

# 系统自动更新证书
0 0 1 * * certbot renew
10 0 1 * * systemctl restart nginx

# 新证书安装
sudo certbot run --nginx
```
