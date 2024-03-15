# CenterOS 7 /usr/local
```shell
# 查看默认版本
python --version
# 获取最新的版本 https://www.python.org/ftp/python/
wget https://www.python.org/ftp/python/3.9.9/Python-3.9.9.tgz
tar -zxvf Python-3.7.6.tgz -C /usr/local/python
# 进入解压目录 Python-3.9.9
./configure --prefix=/usr/local/python
# 编译安装
make && make install
# 建立软链接
ln -s /usr/local/python/bin/python3.9 /usr/bin/python3
ln -s /usr/local/python/bin/pip3.9 /usr/bin/pip3
# python3 --version
```
