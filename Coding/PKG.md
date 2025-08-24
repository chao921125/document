```shell
# 本地调试
npm pack
npm install ../pkg.tgz

# 多模型调试

"dependencies": {
  "vue3-svg-deco": "workspace:*"
}
"dependencies": {
  "vue3-svg-deco": "file:../vue3-svg-deco"
}
npm install


# node http-server 启动服务器
http-server -p 8080
```
