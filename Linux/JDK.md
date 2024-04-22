# Debian｜Ubuntu /usr/local
```shell
# 检查系统是否已经存在 Java 环境
java -version
sudo add-apt-repository ppa:linuxuprising/java

rpm -qa|grep [java][jdk][gcj]
# 删除
rpm -e --nodeps *
# 或者使用
yum list installed | grep [java][jdk]
yum remove "openjdk"

# 安装 JDK
# 进入指定目录下 rpm 默认安装 /usr/java
rpm -ivh *.rpm
# 进入指定目录下 tar
tar -zxvf *.tar.*
mkdir /usr/java
mv /path/jdk* /usr/java

# 设置默认
sudo update-alternatives --config java
# 设置环境变量
sudo nano /etc/environment

export JAVA_HOME="/usr/java/jdk1.8.0-x64"
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JAVA_HOME}/lib:$CLASSPATH
export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
export PATH=$PATH:${JAVA_PATH}

# 及时生效
source /etc/profile


# Open-JDK
# 查看可以安装的列表
yum search java | grep -i --color jdk
yum install -y java-1.8.0-openjdk*
```

# CenterOS /usr/local
```shell
# 检查系统是否已经存在 Java 环境
java -version
rpm -qa|grep [java][jdk][gcj]
# 删除
rpm -e --nodeps *
# 或者使用
yum list installed | grep [java][jdk]
yum remove "openjdk"

# 安装 JDK
# 进入指定目录下 rpm 默认安装 /usr/java
rpm -ivh *.rpm
# 进入指定目录下 tar
tar -zxvf *.tar.*
mkdir /usr/java
mv /path/jdk* /usr/java

# 设置环境变量
vi /etc/profile

export JAVA_HOME=/usr/java/jdk1.8.0-x64
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JAVA_HOME}/lib:$CLASSPATH
export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
export PATH=$PATH:${JAVA_PATH}

# 及时生效
source /etc/profile


# Open-JDK
# 查看可以安装的列表
yum search java | grep -i --color jdk
yum install -y java-1.8.0-openjdk*
```
