# CSDN 去除关注博主

```JavaScript
var article_content=document.getElementById("article_content");
article_content.removeAttribute("style");

var follow_text=document.getElementsByClassName('follow-text')[0];
follow_text.parentElement.parentElement.removeChild(follow_text.parentElement);

var hide_article_box=document.getElementsByClassName(' hide-article-box')[0];
hide_article_box.parentElement.removeChild(hide_article_box);
```
# MacOS下卸载流氓软件之微信输入法
```Text
打开 finder，按住 sheft + command + G 输入：/Library/Input Methods 回车
打开 终端命令控制台，输入 ps -ef|grep WeType
找到后台进程，第二个数字就是微信键盘的进程号 执行： kill -9 进程号
```
