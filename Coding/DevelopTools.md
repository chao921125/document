# Jetbrains 许可证服务器
###### 示例【可用】：http://137.125.248.1:8080
[fofa](https://fofa.info/result?qbase64=aGVhZGVyPSJodHRwczovL2FjY291bnQuamV0YnJhaW5zLmNvbS9mbHMtYXV0aCI%3D)
```text
https://fofa.info/
搜索关键词：header="https://account.jetbrains.com/fls-auth"
点击一个网址，然后搜索 302 复制对应的URL即可
```
[shodan](https://www.shodan.io/search?query=Location%3A+https%3A%2F%2Faccount.jetbrains.com%2Ffls-auth)
```text
https://www.shodan.io/
搜索关键词：Location: https://account.jetbrains.com/fls-auth
点击一个网址，然后搜索 302 复制对应的URL即可
```
[censys](https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=EXCLUDE&q=services.http.response.headers.location%3A+account.jetbrains.com%2Ffls-auth)
```text
https://search.censys.io/
搜索关键词：services.http.response.headers.location: account.jetbrains.com/fls-auth
点击一个网址，然后搜索 302 复制对应的URL即可
```

# Jetbrains 离线 2024.3.3
```shell
# 将 jar 放到指定位置后， 修改 x.vmoptions -javaagent:*/ja-netfilter.jar
# IntelliJ IDEA
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 -products=II,PC
# WebStorm
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 -products=WS,PC
# PyCharm
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 -products=PC,PC
# RustRover
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 -products=RR,PC
# PhpStorm
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 -products=PS,PC
# GoLand
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 -products=GL,PC
# RubyMine
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 -products=RM,PC
# DataGrip
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 -products=DG,PC
```
