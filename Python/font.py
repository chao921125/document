from fontTools.ttLib import TTFont

# 加载 TTF 文件
font = TTFont("inputFont.ttf")

# 设置 flavor 为 WOFF
font.flavor = "woff"

# 保存为 WOFF 文件
font.save("outputFont.woff")