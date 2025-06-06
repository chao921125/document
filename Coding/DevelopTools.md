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

# Jetbrains 离线 Last 2025+
```shell
# 将 jar 放到指定位置后， 修改 x.vmoptions内容： -javaagent:*/ja-netfilter.jar
# 运行获取通用的 KEY 将生成的 key 放到 key.txt 文件中
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 >> key.txt
# 运行获取通用的 KEY
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31
# 运行获取指定的 KEY，例如：IntelliJ IDEA，对应的产品为首字母缩写，后面的 PC 请勿修改
java -jar ja-netfilter.jar -genkey -id=Me -user=Me -exp=2099-12-31 -products=II,PC
```
