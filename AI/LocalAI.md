# 接入 LocalAI 部署的本地模型

[LocalAI](https://github.com/go-skynet/LocalAI) 是一个本地推理框架，提供了 RESTFul API，与 OpenAI API 规范兼容。它允许你在消费级硬件上本地或者在自有服务器上运行 LLM（和其他模型），支持与 ggml 格式兼容的多种模型家族。不需要 GPU。
Dify 支持以本地部署的方式接入 LocalAI 部署的大型语言模型推理和 embedding 能力。

## 部署 LocalAI

### 使用前注意事项


如果确实需要直接使用容器的 IP 地址，以上步骤将帮助你获取到这一信息。

### 开始部署

可参考官方 [Getting Started](https://localai.io/basics/getting_started/) 进行部署，也可参考下方步骤进行快速接入：

（以下步骤来自 [LocalAI Data query example](https://github.com/go-skynet/LocalAI/blob/master/examples/langchain-chroma/README.md)）

1. 首先拉取 LocalAI 代码仓库，并进入指定目录

    ```bash
    $ git clone https://github.com/go-skynet/LocalAI
    $ cd LocalAI/examples/langchain-chroma
    ```

2. 下载范例 LLM 和 Embedding 模型

    ```bash
    $ wget https://huggingface.co/skeskinen/ggml/resolve/main/all-MiniLM-L6-v2/ggml-model-q4_0.bin -O models/bert
    $ wget https://gpt4all.io/models/ggml-gpt4all-j.bin -O models/ggml-gpt4all-j
    ```

   这里选用了较小且全平台兼容的两个模型，`ggml-gpt4all-j` 作为默认 LLM 模型，`all-MiniLM-L6-v2` 作为默认 Embedding 模型，方便在本地快速部署使用。

3. 配置 .env 文件

   ```shell
   $ mv .env.example .env
   ```

   NOTE：请确保 `.env` 中的 THREADS 变量值不超过你本机的 CPU 核心数。

4. 启动 LocalAI

   ```shell
   # start with docker-compose
   $ docker-compose up -d --build
   
   # tail the logs & wait until the build completes
   $ docker logs -f langchain-chroma-api-1
   7:16AM INF Starting LocalAI using 4 threads, with models path: /models
   7:16AM INF LocalAI version: v1.24.1 (9cc8d9086580bd2a96f5c96a6b873242879c70bc)
   
    ┌───────────────────────────────────────────────────┐ 
    │                   Fiber v2.48.0                   │ 
    │               http://127.0.0.1:8080               │ 
    │       (bound on host 0.0.0.0 and port 8080)       │ 
    │                                                   │ 
    │ Handlers ............ 55  Processes ........... 1 │ 
    │ Prefork ....... Disabled  PID ................ 14 │ 
    └───────────────────────────────────────────────────┘ 
   ```

   开放了本机 `http://127.0.0.1:8080` 作为 LocalAI 请求 API 的端点。

   并提供了两个模型，分别为：

    - LLM 模型：`ggml-gpt4all-j`

      对外访问名称：`gpt-3.5-turbo`（该名称可自定义，在 `models/gpt-3.5-turbo.yaml` 中配置。

    - Embedding 模型：`all-MiniLM-L6-v2`

      对外访问名称：`text-embedding-ada-002`（该名称可自定义，在 `models/embeddings.yaml` 中配置。
   >  使用 Dify Docker 部署方式的需要注意网络配置，确保 Dify 容器可以访问到 Xinference 的端点，Dify 容器内部无法访问到 localhost，需要使用宿主机 IP 地址。

5. LocalAI API 服务部署完毕，在 Dify 中使用接入模型

   在 `设置 > 模型供应商 > LocalAI` 中填入：

   模型 1：`ggml-gpt4all-j`

    - 模型类型：文本生成

    - 模型名称：`gpt-3.5-turbo`

    - 服务器 URL：http://127.0.0.1:8080

      若 Dify 为 docker 部署，请填入 host 域名：`http://<your-LocalAI-endpoint-domain>:8080`，可填写局域网 IP 地址，如：`http://192.168.1.100:8080`

   "保存" 后即可在应用中使用该模型。

   模型 2：`all-MiniLM-L6-v2`

    - 模型类型：Embeddings

    - 模型名称：`text-embedding-ada-002`

    - 服务器 URL：http://127.0.0.1:8080

      > 若 Dify 为 docker 部署，请填入 host 域名：`http://<your-LocalAI-endpoint-domain>:8080`，可填写局域网 IP 地址，如：`http://192.168.1.100:8080`

   "保存" 后即可在应用中使用该模型。

如需获取 LocalAI 更多信息，请参考：https://github.com/go-skynet/LocalAI