# Web服务框架
|                                                                       |
|-----------------------------------------------------------------------|
| [awesome-python](https://github.com/vinta/awesome-python)             |
| [awesome-python](https://github.com/donnemartin/system-design-primer) |

|                                                  |
|--------------------------------------------------|
| [Django](https://github.com/django/django)       |
| [FastAPI](https://github.com/tiangolo/fastapi)   |
| [Flask](https://github.com/pallets/flask)        |
| [Scrapy](https://github.com/scrapy/scrapy)       |
| [Sanic](https://github.com/sanic-org/sanic)      |
| [Tornado](https://github.com/tornadoweb/tornado) |

| 包管理                                   |
|---------------------------------------|
| [uv](https://github.com/astral-sh/uv) |


```shell
# upgrade pip
pip3 install --upgrade pip

# config list
mkdir .pip
touch pip.conf

[global]
index-url = https://pypi.org/simple
[install]
trusted-host = https://pypi.org

# 绕过证书
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org setuptools
```
