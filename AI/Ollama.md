# Ollama 部署的本地模型
## 下载并启动 Ollama
```markdown
1、下载 Ollama

访问 [Ollama 下载页](https://ollama.com/download)，下载对应系统 Ollama 客户端。

2、运行 Ollama 下载模型，并与 Llama3.2 聊天（复制该命令，打开终端直接执行）

ollama run llama3.2

3、启动成功后，ollama 在本地 11434 端口启动了一个 API 服务，可通过 http://localhost:11434 访问。

如需运行其它模型，访问 Ollama Models 了解详情。
```

## 使用扩展或者其他 UI
## 在 Mac 上设置环境变量
```markdown
如果 Ollama 作为 macOS 应用程序运行，则应使用以下命令设置环境变量 launchctl：

1、通过调用 launchctl setenv 设置环境变量（复制该命令，打开终端直接执行）：

launchctl setenv OLLAMA_HOST "0.0.0.0"

2、重启 Ollama 应用程序。

3、如果以上步骤无效，可以使用以下方法：

问题是在 docker 内部，你应该连接到 host.docker.internal，才能访问 docker 的主机，所以将 localhost 替换为 host.docker.internal 服务就可以生效了：

http://host.docker.internal:11434
```
## 在 Linux 上设置环境变量
```markdown
如果 Ollama 作为 systemd 服务运行，应该使用 systemctl 设置环境变量：

1、通过调用 systemctl edit ollama.service 编辑 systemd 服务。这将打开一个编辑器。

2、对于每个环境变量，在 [Service] 部分下添加一行 Environment：

[Service]
Environment="OLLAMA_HOST=0.0.0.0"

3、保存并退出。

4、重载 systemd 并重启 Ollama：

systemctl daemon-reload
systemctl restart ollama
```
## 在 Windows 上设置环境变量
```markdown
在 Windows 上，Ollama 继承了你的用户和系统环境变量。

1、首先通过任务栏点击 Ollama 退出程序

2、从控制面板编辑系统环境变量

3、为你的用户账户编辑或新建变量，比如 OLLAMA_HOST、OLLAMA_MODELS 等。

4、点击 OK / 应用保存

5、在一个新的终端窗口运行 ollama
```
