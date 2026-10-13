# Llama.cpp
[Doc](https://llama.app/docs/introduction)
```shell
# 安装
curl -LsSf https://llama.app/install.sh | sh
# 查看版本
llama cli --version
# 下载模型
llama cli -hf unsloth/gemma-4-E4B-it-GGUF:Q4_K_M
# 运行模型
llama cli -hf ggml-org/gemma-4-e4b-it-GGUF:Q4_0
llama cli -m my-model.gguf
# 运行 Web
llama serve -hf ggml-org/gemma-4-e4b-it-GGUF:Q4_0 -c 0
llama serve -m my-model.gguf -c 0

```
