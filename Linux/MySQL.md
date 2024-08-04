# Debian /usr/local
```shell
sudo apt install -y mysql-server

sudo /etc/init.d/mysql start

# 验证 mysql 是否正确安装
mysql --version

# 安全
sudo mysql_secure_installation

# 进入
sudo mysql
SELECT user,authentication_string,plugin,host FROM mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Admin123.';
FLUSH PRIVILEGES;

mysql -u root -p

# 允许远程
sudo ufw allow mysql
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
bind-address = 0.0.0.0

# 自启动 mysql 服务
sudo systemctl enable mysql
# 启动 mysql 服务
sudo systemctl start mysql
# 关闭 mysql 服务
sudo systemctl stop mysql
# 重启 mysql 服务
sudo systemctl restart mysql
# 查看状态
sudo systemctl status mysql
```

# RHEL /usr/local
```shell
# 检查是否已经安装 mysql
rpm -qa|grep -i mysql
# 删除
rpm -e --nodeps *
# 或者使用
yum list installed | grep mysql
yum remove mysql mysql-server mysql-libs compat-mysql
yum remove mysql-community-release

# 全量查找残留 mysql
whereis mysql
find / -name mysql
# 删除
rm -rf *

# 删除 my.cnf
rm -rf /etc/my.cnf

# 关闭启动，关闭自启动
chkconfig --list | grep -i mysql
chkconfig --del mysqld

# 安装 mysql
# [查看系统对应的安装文件](https://dev.mysql.com/downloads/repo/yum/)
# 检查 mysql 安装包
# yum list mysql*
# wget 安装
wget -i -c http://dev.mysql.com/get/mysql80-community-release-el7-11.noarch.rpm
rpm -ivh mysql80-community-release-el7-11.noarch.rpm
yum install -y mysql80-community-release-el7-11.noarch.rpm
yum install -y mysql-community-server


# 在 /etc/my.cnf 中添加 skip-grant-tables 临时免密码登录
[mysqld]
bind-address=0.0.0.0
# 默认
port=33306
# 程序安装目录
basedir=/usr/local/mysql/
pid-file=/usr/local/mysql/mysql.pid
# 多客户访问同一数据库，该选项默认开启
# symbolic-link=0
# 此目录被 MySQL用来保存临时文件
tmpdir=/usr/local/mysql/tmp/
# 打开时，和max_connections对比，取大数
# open_files_limit=65535
# 数据库目录
datadir=/usr/local/mysql/data/
log-error=/usr/local/mysql/logs/error.log
# 开启慢查询日志相关
slow_query_log=on
# 默认10秒
long_query_time=2
# 慢查询日志路径
slow_query_log_file=/usr/local/mysql/logs/slow_query.log
# 记录没有使用索引的sql
log-queries-not-using-indexes=1
# 该条配置需在[client]段同时配置
socket=/usr/local/mysql/mysql.sock
default_storage_engine=InnoDB
# InnoDB为独立表空间模式，每个数据库的每个表都会生成一个数据空间
innodb_file_per_table=on
# 生产中要改，建议为操作系统内存的70%-80%，需重启服务生效
# innodb_buffer_pool_size=4G
# 忽略主机名解析，提高访问速度（注意配置文件中使用主机名将不能解析）
# skip_name_resolve=on
# 忽略表单大小写
lower_case_table_names=1
# 设定默认字符为utf8mb4
character-set-server=utf8mb4

plugin-load-add=validate_password.so
validate-password=FORCE_PLUS_PERMANENT
validate_password_policy=LOW
validate_password_length=1
# validate_password.policy=LOW
# validate_password.length=1

default_authentication_plugin=mysql_native_password
lower_case_table_names=1
sql_mode=STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

# 启动如果报错 请安装一下 mariadb相关
yum install mariadb mariadb-server mariadb-embedded mariadb-libs mariadb-bench
systemctl start mariadb.service
# 启动
systemctl start mysqld.service
# 查看状态
systemctl status mysqld.service
# 初始化密码
grep "password is" /var/log/mysqld.log
# 登录
mysql -uroot -p
mysql -uroot -p -h127.0.0.1
# 设置密码，如果不允许设计弱密码，先设置强类型密码，再修改弱密码
alter user 'root'@'localhost' identified with mysql_native_password by 'Admin123.';
# 刷新权限
flush privileges;

# 修改弱类型密码操作步骤
# 5.x 版本
select @@validate_password_policy;
set global validate_password_policy=LOW;
set global validate_password_length=1;
# 8.x 版本
select @@validate_password.policy;
set global validate_password.policy=LOW;
set global validate_password.length=1;

show variables like 'validate_password%';
alter user 'root'@'localhost' identified with mysql_native_password by '123456';
flush privileges;

# 修改远程访问 如果提示 -A 那么后面加上 -A 即可
use mysql;
select host,user from user;
update user set host='%' where user='root';
flush privileges;
alter user 'root'@'%' identified with mysql_native_password by 'Admin123.';


# 将数据库迁移到指定目录
# 自启动 mysql 服务
systemctl enable mysqld.service
# 启动 mysql 服务
systemctl start mysqld.service
# 关闭 mysql 服务
systemctl stop mysqld.service
# 查看状态
systemctl status mysqld.service
# 临时关闭 selinux
setenforce 0
# 永久关闭 selinux
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config

cp -rf /var/lib/mysql /usr/local/mysql/data/mysql
# 在 /etc/my.cnf 
vim /etc/my.cnf
#datadir=/home/mysql
#socket=/home/mysql/mysql.sock

# 退出 mysql \q 或者 quit;

# mysql.sock

# 离线安装指定的最后版本 mysql-8.0.33-el7-x86_64.tar.gz
# 卸载 MariaDB 查看版本
rpm -qa|grep mariadb
# 卸载
rpm -e --nodeps 文件名
# 确认卸载
rpm -qa|grep mariadb
# 官网下载 Linux - Generic (x86, 64-bit)
# 创建MySQL目录
mkdir -p /usr/local/mysql/
cd /usr/local/mysql/
sudo mkdir -p data
sudo mkdir -p tmp
sudo mkdir -p logs
cd /usr/local/mysql/logs
vi error.log
chmod 777 error.log

# 创建用户组和用户
groupadd mysql && useradd -r -g mysql mysql

# 解压
# .tar.gz 后缀
tar -zxvf 文件名 -C 目录

# .tar.xz 后缀
tar -Jxvf 文件名 -C 目录

# 通过mv重命名

chown -R mysql:mysql /usr/local/mysql
# 初始化命令
cd /usr/local/mysql/bin
./mysqld --initialize --user=mysql --console
# 启动脚本放到开机初始化目录
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
# 将mysql登录命令创建软链接
ln -s /usr/local/mysql/bin/mysql/ /usr/bin/

service mysql start
service mysql restart
service mysql stop

find / -name 'mysqld.log' -type f -print
# mysql -uroot -p 命令登录MySQL了
vi /etc/profile
export PATH=$PATH:/usr/local/mysql/bin
source /etc/profile

mysql -uroot -p
```
