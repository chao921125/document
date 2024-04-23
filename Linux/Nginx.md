# RHEL /usr/local
```shell
wget -i -c http://nginx.org/download/nginx-1.24.0.tar.gz
sudo mkdir /usr/local/nginx
tar -zxvf nginx-1.24.0.tar.gz -C /usr/local/nginx
cd /usr/local/nginx
mv * ../
# 执行命令 考虑到后续安装ssl证书 添加两个模块
./configure --with-http_stub_status_module --with-http_ssl_module
make && make install

# 添加服务
vi /etc/systemd/system/nginx.service
# 内容
[Unit]
Description=Nginx HTTP Server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
PrivateTmp=true

[Install]
WantedBy=multi-user.target

systemctl daemon-reload
# 启动 Nginx 服务
systemctl start nginx
# 设置开机自启动
systemctl enable nginx
# 取消开机自启动
systemctl disabled nginx
# 检查 Nginx 状态
systemctl status nginx
# 停止 Nginx 服务
systemctl stop nginx
# 重启 Nginx 服务
systemctl restart nginx
```
