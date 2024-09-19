```shell
# 检查 Nohup 版本
nohup --version

# 后台启动进程
#command：要执行的命令。
#Arg：一些参数，可以指定输出文件。
#&：让命令在后台执行，终端退出后命令仍旧执行。
nohup command [ Args ] [> output-file 2> error-file] [ & ]

# 后台启动进程，并输出端口号，请使用&命令末尾的符号
nohup command &

# 日志
cat nohup.out

# 日志，指定格式
nohup command > log.log >2&1 &

```