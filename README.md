```shell
# 删除历史记录，并重新推送
git checkout --orphan latest_branch

git add -A

git commit -am "First Commit"

git branch -D master

git branch -m master

git push -f origin master
# 解决部分GitHub项目过大，无法下载问题

# 这个可以省略
git config --global http.postBuffer 524288000

git clone --depth=1 https://github.com/chao921125/knowledge.git

cd knowledge

git fetch --unshallow

git remote set-branches origin "*"

git fetch -v
```
# 推荐
### [github 项目趋势英文官网](https://github.com/trending)
### [github 项目趋势中文社区](https://www.githubs.cn/trending)
### [LLM OpenAI模型项目趋势](https://huggingface.co/spaces)
| 本项目收集资料目录                                 |
|-------------------------------------------|
| [🔥 Open AI 汇总 ChatGPT](./Document/AI.md) |
| [✈️ 开源项目 优秀推荐](./Document/Project.md)     |
| [WebGL 3D模型及游戏](./WebGL/README.md)        |
| [Web HTML5&CSS3&JS](./Document/Web.md)    |
| [VUE](./VUE/README.md)                    |
| [React](./React/README.md)                |
| [TS](./TS/README.md)                      |
| [Python](./Python/README.md)              |
| [NodeJS](./NodeJS/README.md)              |
| [Java](./Java/README.md)                  |
| [面试学习](./Interview/README.md)             |
| [知识汇总](./Knowledge/README.md)             |
| [开发环境](./Document/DevelopTools.md)        |
| [网站部署 SSL 托管](./Document/WebSite.md)      |
| [软件下载](./Document/System.md)              |
| [CSDN 去除广告及关闭关注博主代码](./Document/CSDN.md)  |
| [Markdown 语法](./Document/MarkDown.md)     |
| [Linux 下载及命令使用](./Linux/System.md)        |

# 各种网站推荐
[临时邮箱](https://www.linshi-email.com/) |
[临时邮箱](https://temp-mail.org/) |
[临时邮箱](https://www.guerrillamail.com/) \
[临时手短信](https://www.storytrain.info/) |
[临时手短信](https://yunduanxin.net/) |
[临时手短信](https://www.supercloudsms.com/zh/) |
[临时手短信](https://www.yunjiema.top/zh/) |
[临时手短信](https://www.yunduanxin.xyz/zh/) |
[临时手短信](https://www.free-sms-receive.com/zh/) |
[临时手短信](https://www.sms-receive-online.com/) \
[TYB字幕下载](https://addyoutube.com/) \
[电影、电视配乐](https://www.tunefind.com/)

# 目录说明
[算法学习 已迁移 点击跳转](https://github.com/chao921125/algorithm)
[Web基础学习 已迁移 点击跳转](https://github.com/chao921125/web)
[微软Playwright 谷歌Puppeteer 自动化测试 已迁移 点击跳转](https://github.com/chao921125/automation)
[WebGL 3D 已迁移 点击跳转](https://github.com/chao921125/web-gl)
```text
Web-Knowledge
├── Document                    针对前后端框架总结
├── Interview                   面试总结
├── Knowledge                   知识总结
└── TS                          ts知识总结
```
