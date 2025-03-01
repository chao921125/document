# 利用 Python 压缩、精简、转换字体格式
```shell
# 下载安装 python 3.6+
# --- 安装 fonttools brotli
pip install fonttools brotli
# 创建压缩的字体文件 characters.txt，内容是需要的字符空格和换行无需在意
# 将 ttf 或者 otf 文件复制到一个目录中，最好将 characters.txt 一同放到一起
# --- 压缩、精简、转换字体文件，默认格式字体文件的格式
pyftsubset ./inputFont.ttf  --text-file=./characters.txt
# --- 如果想要指定的格式请加参数 --flavor=woff
pyftsubset ./inputFont.ttf  --text-file=./characters.txt --flavor=woff

# --- 合并字体
fonttools merge inputFont1.ttf inputFont2.ttf -o outputFont.ttf
# --- 提取字体子集
fonttools subset inputFont.ttf --unicodes="U+0020-U+007E" --output-file=outputFont.ttf
```
###### 使用 fonttools [脚本](../Python/font.py)执行转换
```shell
from fontTools.ttLib import TTFont

# 加载 TTF 文件
font = TTFont('inputFont.ttf')

# 设置 flavor 为 WOFF
font.flavor = 'woff'

# 保存为 WOFF 文件
font.save('outputFont.woff')
```
```shell
# 下载安装 python 3.6+
# --- 安装 ttx
pip install ttx
# --- 转换字体文件，默认格式字体文件的格式
ttx -o outputFont.ttf inputFont.ttf
```