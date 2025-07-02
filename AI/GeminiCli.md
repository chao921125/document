# 安装
[ Node.js ](https://nodejs.org/en/download)
[ Google Cloud Console ](https://console.cloud.google.com/welcome)
```shell
# 保证一个可以上网的环境，注册一个美国地区的 google 账号
# 安装 nodejs，版本最好 20.x+
# 建议使用 google 账号登录，配置好 google_project_id， api key 的次数很容易用完

# Mac/Linux 下配置或者直接在终端执行
export GOOGLE_CLOUD_PROJECT="xxx"

npx https://github.com/google-gemini/gemini-cli
# Or install it with:
npm install -g @google/gemini-cli
gemini
```