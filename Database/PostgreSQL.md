# https://postgresapp.com/downloads.html

```shell
# Homebrew
# 安装 PostgreSQL
brew install postgresql

# 启动服务
brew services start postgresql

# 或手动启动
pg_ctl -D /usr/local/var/postgres start
# Linux/官方安装包：默认创建一个名为 postgres 的超级管理员。
# Homebrew/macOS：initdb 默认创建一个与当前系统用户名同名的超级管理员。

# 直接运行 psql，默认使用当前系统用户名（huangchao）连接
psql -d postgres
#-- 创建 postgres 用户并设置为超级管理员，同时设置密码
CREATE ROLE postgres SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD '你的密码';
   
   
# Homebrew: brew uninstall + rm -rf 数据目录。
# Postgres.app: 删除 App + 删除 ~/Library/Application Support/Postgres。
# EnterpriseDB: 运行卸载脚本 + 删除 /Library/PostgreSQL。
```