# JET DEVELOPMENT TOOLS 许可证服务器
```text
shodan search 'Location: https://account.jetbrains.com/fls-auth' --fields ip_str,port | awk  '{if($2==443){print "https://"$1}else{print "http://"$1":"$2}}'

https://www.shodan.io/search?query=Location%3A+https%3A%2F%2Faccount.jetbrains.com%2Ffls-auth

http://137.125.248.1:8080
```