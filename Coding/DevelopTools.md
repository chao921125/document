# JET DEVELOPMENT TOOLS 许可证服务器
```shell
# 修改 Region 为 Not specified：Settings | Appearance & Behavior | System Settings | Language and Region
https://www.shodan.io/search?query=Location%3A+https%3A%2F%2Faccount.jetbrains.com%2Ffls-auth

http://137.125.248.1:8080
```

# 2024.3.3
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
