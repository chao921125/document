# RHEL /usr/local
```shell
# 查看并清理
node -v
npm cache clean -f
npm install -g n

wget https://nodejs.org/dist/latest-v16.x/node-v16.20.2-linux-x64.tar.gzsudo
mkdir /usr/local/nodejs
tar -zxvf node-v16.20.2-linux-x64.tar.gz -C /usr/local/nodejs
cd /usr/local/nodejs
mv * ../

# 设置环境变量 用户 bashrc 系统 profile
vi /etc/profile

# NODEJS
export NODE_HOME=/usr/local/nodejs
export NODE_PATH=${NODE_HOME}/bin
export PATH=$PATH:${NODE_PATH}

# 或者建立软连接
ln -s /usr/local/nodejs/bin/node /usr/bin/node
ln -s /usr/local/nodejs/bin/npm /usr/bin/npm

# 及时生效
source /etc/profile
```
