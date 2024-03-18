# CenterOS 7 /usr/local
```shell
# 查看并清理
node -v
npm cache clean -f
npm install -g n

wget https://nodejs.org/dist/latest-v16.x/node-v16.20.2-linux-x64.tar.gz
tar -zxvf node-v16.20.2-linux-x64.tar.gz -C /usr/local/nodejs

mv * ../
ln -s /usr/local/nodejs/bin/node /usr/local/bin/node
ln -s /usr/local/nodejs/bin/npm /usr/local/bin/npm
```
