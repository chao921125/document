# Debian｜Ubuntu /usr/local

```shell
# 创建自启动
sudo vim /etc/systemd/system/myapp.service

```

```text
[Unit]
Description=My Java Application
After=network.target

[Service]
User=myapp
Group=myapp
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/java -Xms512m -Xmx1024m -jar /opt/myapp/app.jar --server.port=8080
SuccessExitStatus=143
Restart=on-failure
RestartSec=10

# 安全与资源限制（推荐）
LimitNOFILE=65536
NoNewPrivileges=true
ProtectSystem=full
PrivateTmp=true

[Install]
WantedBy=multi-user.target

```
