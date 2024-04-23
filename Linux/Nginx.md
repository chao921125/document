# RHEL /usr/local
```shell
wget -i -c http://nginx.org/download/nginx-1.24.0.tar.gz
tar -zxvf nginx-1.24.0.tar.gz -C /usr/local/nginx

# 执行命令 考虑到后续安装ssl证书 添加两个模块
./configure --with-http_stub_status_module --with-http_ssl_module
make && make install
```
