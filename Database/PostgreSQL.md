# https://postgresapp.com/downloads.html

```shell
在 macOS 上卸载 PostgreSQL 主要取决于你当初是如何安装它的。通常有三种常见的安装方式：Homebrew、Postgres.app 或者 EnterpriseDB 安装包。
请根据你的安装方式选择对应的卸载方法。
方法一：如果你是通过 Homebrew 安装的 (最常见)
这是开发者最常用的方式。请在终端中按顺序执行以下命令：
1. 停止 PostgreSQL 服务
brew services stop postgresql
# 或者如果你指定了版本，例如 postgresql@14：
# brew services stop postgresql@14
2. 卸载软件包
brew uninstall postgresql
# 或者指定版本：
# brew uninstall postgresql@14
3. 清理残留配置和数据 (重要步骤)
如果你需要彻底删除数据库数据，必须手动删除数据目录。
Apple Silicon (M1/M2/M3) Mac:rm -rf /opt/homebrew/var/postgres
rm -rf /opt/homebrew/var/log/postgresql*
Intel Mac:rm -rf /usr/local/var/postgres
rm -rf /usr/local/var/log/postgresql*
方法二：如果你使用的是 Postgres.app (图形化应用)
如果你使用的是这个独立的应用程序，卸载过程比较简单：
退出正在运行的 Postgres.app (在菜单栏点击大象图标，选择 Quit)。
打开 Finder，进入“应用程序”文件夹。
将 Postgres.app 拖到废纸篓。
彻底删除数据（如果你想清除所有数据库数据）：
在终端运行以下命令来删除默认的数据目录：rm -rf ~/Library/Application\ Support/Postgres
方法三：如果你是通过 EnterpriseDB 安装包安装的
如果你是从 PostgreSQL 官网下载的 .dmg 或 .pkg 安装包安装的，步骤如下：
1. 运行卸载程序
通常在 PostgreSQL 的安装目录中有卸载脚本。在终端运行：
# 通常路径如下，版本号根据你的实际情况调整
sudo /Library/PostgreSQL/14/uninstall-postgresql.app/Contents/MacOS/installbuilder.sh
(注意：如果不生效，可以尝试去 Finder 的 /Library/PostgreSQL/{版本号}/ 文件夹下双击运行 uninstall-postgresql.app)
2. 清理残留文件
安装包卸载后通常会留下配置文件，手动删除它们：
sudo rm -rf /Library/PostgreSQL
sudo rm -rf /etc/postgres-reg.ini
3. 删除用户和组 (可选)
EnterpriseDB 安装方式通常会创建一个 postgres 系统用户。卸载后这个用户可能还在。
打开“系统设置” -> “用户与群组”。
解锁，查看是否有 postgres 用户，如果有且不再需要，可以删除。
其他收尾工作
无论你用哪种方式，如果修改过 Shell 配置文件（如 .zshrc 或 .bash_profile），添加了 PostgreSQL 的环境变量（PATH），建议清理一下：
打开配置文件：nano ~/.zshrc (或 ~/.bash_profile)。
查找并删除类似如下的行：export PATH="/usr/local/pgsql/bin:$PATH"
# 或
export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"
保存并退出 (Ctrl+O, Enter, Ctrl+X)。
运行 source ~/.zshrc 使更改生效。
总结：
Homebrew: brew uninstall + rm -rf 数据目录。
Postgres.app: 删除 App + 删除 ~/Library/Application Support/Postgres。
EnterpriseDB: 运行卸载脚本 + 删除 /Library/PostgreSQL。
```