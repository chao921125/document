# Debian｜Ubuntu /usr/local
```shell
# 查看默认版本
python --version
python3 --version

sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
# 获取最新的版本 https://www.python.org/ftp/python/
sudo apt-get install -y python3
# 自行解压安装
wget https://www.python.org/ftp/python/3.12.3/Python-3.12.3.tgz
mkdir /usr/local/python
tar -zxvf Python-3.12.3.tgz -C /usr/local/python
cd /usr/local/python/Python-3.12.3
# 进入解压目录 Python-*
./configure --with-ssl --prefix=/usr/local/python
# 编译安装
sudo make && make install
```

# RHEL /usr/local
```shell
# 查看默认版本
python --version
# 获取最新的版本 https://www.python.org/ftp/python/
wget https://www.python.org/ftp/python/3.12.3/Python-3.12.3.tgz
mkdir /usr/local/python
tar -zxvf Python-3.12.3.tgz -C /usr/local/python
cd /usr/local/python/Python-3.12.3
# 进入解压目录 Python-*
./configure --prefix=/usr/local/python
# 编译安装
make && make install
# 建立软链接
ln -s /usr/local/python/bin/python3.9 /usr/bin/python3
ln -s /usr/local/python/bin/pip3.9 /usr/bin/pip3
# python3 --version
```
