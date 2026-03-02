# Setting PATH for Proxy
export https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897 all_proxy=socks5://127.0.0.1:7897
alias proxy="export HTTPS_PROXY=$https_proxy"


# Setting PATH for Java
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-25.jdk/Contents/Home
export JAVA8_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export JAVA11_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
export JAVA17_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home

alias jdk="export JAVA_HOME=$JAVA_HOME"
alias jdk8="export JAVA_HOME=$JAVA8_HOME"
alias jdk11="export JAVA_HOME=$JAVA11_HOME"
alias jdk17="export JAVA_HOME=$JAVA17_HOME"


# Setting PATH for Maven
export M2_HOME=/Users/admin/Soft/apache-maven
export PATH="${M2_HOME}/bin:${PATH}"


# Google cloud
export GOOGLE_CLOUD_PROJECT="crafty-centaur-243306"


# Setting PATH for Python 3
# The original version is saved in .zprofile.pysave
export PATH="/Library/Frameworks/Python.framework/Versions/3.14/bin:${PATH}"
alias python="/Library/Frameworks/Python.framework/Versions/3.14/bin/python3"
alias pip="/Library/Frameworks/Python.framework/Versions/3.14/bin/pip3"

setopt no_nomatch
