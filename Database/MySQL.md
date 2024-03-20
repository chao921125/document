# 忘记密码操作步骤，如果没有忘记密码，点击跳转[重置密码](#重置密码)
```shell
# 关闭mysql，必须要关闭 mysql 服务，mac 和 win 不一样，大家自行搜索步骤
# 启一个终端
cd /usr/local/mysql/bin
sudo su # 回车之后输入电脑密码
./mysqld_safe --skip-grant-tables &
# 另启一个终端
mysql
use mysql
UPDATE user SET authentication_string='' where user='root';
flush privileges;
exit;
```
# 重置密码
```shell
# 启一个终端
cd /usr/local/mysql/bin/
mysql -uroot -p
use mysql
alter user 'root'@'localhost' identified by '你期望的新密码';
flush privileges;
exit;
# 测试
mysql -uroot -p
```