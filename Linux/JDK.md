# Debian｜Ubuntu /usr/local
```shell
# 检查系统是否已经存在 Java 环境
java -version

# 安装 JDK
sudo add-apt-repository ppa:linuxuprising/java
sudo apt-get update
sudo apt install oracle-java11-installer-local

# 设置默认
sudo update-alternatives --config java
# 设置环境变量 优先使用
sudo nano /etc/profile
# 次级使用
sudo nano /etc/environment

export JAVA_HOME="/usr/local/java/jdk1.8.0-x64"
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

# RHEL /usr/local
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
# 进入指定目录下 rpm 默认安装 /usr/local/java
rpm -ivh *.rpm
# 进入指定目录下 tar
tar -zxvf *.tar.*
mkdir /usr/local/java
mv /path/jdk* /usr/local/java

# 设置环境变量 用户 bashrc 系统 profile
vi /etc/profile

# JDK
export JAVA_HOME=/usr/local/java
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
