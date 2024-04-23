# RHEL /usr/local
```shell
# 安装 tcl
# http://prdownloads.sourceforge.net/tcl/tcl8.6.14-src.tar.gz
wget -i -c http://prdownloads.sourceforge.net/tcl/tcl8.6.14-src.tar.gz
tar -zxvf tcl8.6.14-src.tar.gz
cd tcl.8.6.14/unix
./configure
make && make install
ln /usr/local/bin/tclsh8.6 /usr/bin/tclsh

wget -i -c http://download.redis.io/releases/redis-7.2.4.tar.gz
tar -zxvf redis-7.2.4.tar.gz -C /usr/local/redis
cd redis-7.2.4
make
make test
sudo make distclean
sudo make install
```