[//]: # (https://certbot.eff.org/instructions)

# 代码托管
| 源码                                                  |
|-----------------------------------------------------|
| [codefever](https://github.com/PGYER/codefever)     |

# SSL证书 免费及收费

### 一般来说国内的SSL需要实名认证，大家根据需要自行选择

## 无需自己操作，直接申请即可

阿里云（90天）、腾讯云、华为云、CloudFlare、滴滴云、百度云

## [90天]()
[FreeSSL 推荐](https://freessl.org/) |
[FreeSSL 推荐](https://freessl.cn/) |
[sslforfree](https://www.sslforfree.com/) |
[ssl](https://www.ssl.com/certificates/free/) |
[cloudflare](https://www.cloudflare.com/zh-cn/ssl/) |
[secure](https://secure.ssl.com/certificates/free/buy) |
[gogetssl](https://www.gogetssl.com/sslcerts/free-ssl/) |
[zerossl](https://zerossl.com/) |
[ohttps 支持自动部署](https://ohttps.com/) |
[mianfeissl](https://www.mianfeissl.com/) |
[来此加密](https://letsencrypt.osfipin.com/) |
[freesslcertificate](https://www.freesslcertificate.org/) |
[Comodo 超市](https://www.sslchaoshi.com/ssl/brand/5) |
[又拍云](https://www.upyun.com/products/ssl) |
[七牛云](https://www.qiniu.com/products/ssl) |
[青云SSL](https://www.qingcloud.com/pricing#/SSLCertificate) |
[chinaz](http://aq.chinaz.com/SSL) |
[奇安信 不推荐，相当繁琐](https://wangzhan.qianxin.com/) |

## [自己操作]()

[Let’s Encrypt](https://letsencrypt.org/) |
[certbot 推荐👍](https://certbot.eff.org/) |
[acme.sh](https://github.com/acmesh-official/acme.sh) |
[gethttpsforfree](https://gethttpsforfree.com/)

# 网站托管（免费）
[wordpress](https://wordpress.com/zh-cn/) |
[wix](https://www.wix.com/) |
[weebly](https://www.weebly.com/) |
[awardspace](https://www.awardspace.com/) |
[infinityfree](https://www.infinityfree.net/) |
[freehostia](https://www.freehostia.com/)

## 通过GitHub直接自动部署
[vercel 限额](https://vercel.com/) |
[netlify 限额](https://app.netlify.com/) |
[cloudflare 限额](https://dash.cloudflare.com/) |
[SurgeHandbook 限额](https://github.com/FlintyLemming/SurgeHandbook) |
软硬路由
https://www.lucky666.cn/

GoogleTranslateCheck
https://github.com/Ponderfly/GoogleTranslateIpCheck

# Debian｜Ubuntu /usr/local
```shell
# 安装 snap
sudo apt install -y snapd

# 已经存在 删除
sudo apt remove certbot

# 继续
sudo snap install core && sudo snap refresh core
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo apt install certbot python3-certbot-nginx
# 这个一般不需要安装
sudo apt install certbot python2-certbot-nginx

ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx
ln -s /usr/local/nginx/conf/ /etc/nginx

# 在 nginx 启动的前提下执行命令，自动配置 nginx
sudo certbot --nginx
# 或者，手动配置 nginx
sudo certbot certonly --nginx

# *** 直接插件管理 Nginx 用户
sudo apt install certbot python3-certbot-nginx -y
# *** 直接插件管理 Apache 用户
sudo apt install certbot python3-certbot-apache -y

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
sudo dnf install epel-release

sudo dnf install -y snapd

sudo systemctl enable --now snapd.socket

sudo ln -s /var/lib/snapd/snap /snap

# 重启系统确保 snap 安装
shutdown -r now

# 已经存在 删除
sudo dnf remove certbot

# 继续
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo dnf install -y certbot python3-certbot-nginx
sudo dnf install -y certbot python2-certbot-nginx

ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx
ln -s /usr/local/nginx/conf/ /etc/nginx

# 在 nginx 启动的前提下执行命令，自动配置 nginx
sudo certbot --nginx
# 或者，手动配置 nginx
sudo certbot certonly --nginx

# *** 直接插件管理
sudo dnf install epel-release -y
# CentOS 8 / Rocky Linux 8 使用 dnf
sudo dnf install epel-release -y
# *** 直接插件管理 Nginx 用户
sudo dnf install certbot python3-certbot-nginx -y
# *** 直接插件管理 Apache 用户
sudo dnf install certbot python3-certbot-apache -y

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
