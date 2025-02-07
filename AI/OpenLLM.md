# 接入 OpenLLM 部署的本地模型

使用 [OpenLLM](https://github.com/bentoml/OpenLLM), 你可以针对任何开源大型语言模型进行推理,部署到云端或本地,并构建强大的 AI 应用程序。
Dify 支持以本地部署的方式接入 OpenLLM 部署的大型语言模型的推理能力。

## 部署 OpenLLM 模型
### 开始部署

你可以通过以下方式部署：

```bash
docker run --rm -it -p 3333:3000 ghcr.io/bentoml/openllm start facebook/opt-1.3b --backend pt
```
> 注意：此处使用 facebook/opt-1.3b 模型仅作为示例，效果可能不佳，请根据实际情况选择合适的模型，更多模型请参考：[支持的模型列表](https://github.com/bentoml/OpenLLM#-supported-models)。


模型部署完毕，在 Dify 中使用接入模型

在 `设置 > 模型供应商 > OpenLLM` 中填入：

- 模型名称：`facebook/opt-1.3b`
- 服务器 URL：`http://<Machine_IP>:3333` 替换成你的机器 IP 地址
  "保存" 后即可在应用中使用该模型。

本说明仅作为快速接入的示例，如需使用 OpenLLM 更多特性和信息，请参考：[OpenLLM](https://github.com/bentoml/OpenLLM)