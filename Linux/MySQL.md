# RHEL /usr/local
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
#yum list mysql*
# wget 安装
wget -i -c http://dev.mysql.com/get/mysql80-community-release-el7-11.noarch.rpm
rpm -ivh mysql80-community-release-el7-11.noarch.rpm
yum install -y mysql80-community-release-el7-11.noarch.rpm
yum install -y mysql-community-server

# 在 /etc/my.cnf 中添加 skip-grant-tables 临时免密码登录
plugin-load-add=validate_password.so
validate-password=FORCE_PLUS_PERMANENT
validate_password.policy=LOW
validate_password_policy=LOW
validate_password.length=1
validate_password_length=1

character-set-server=utf8mb4
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
```
