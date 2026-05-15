| 字段 | 类型 | 是否必填 | 描述 | 示例 |
| --- | --- | --- | --- | --- |
| name | string | ✅ | Skill唯一标识，也是斜杠命令名 | project-health |
| description | string | ✅ | 功能描述+触发关键词，决定自动触发 | Analyze project health... Use when... |
|argument-hint | string | ❌ | 参数提示，用于自动补全 | [directory] [--fix] [--open]|
| disable-model-invocation | boolean | ❌ | 是否禁用自动触发 | false |
| user-invocable | boolean | ❌ | 是否在/命令菜单中显示 | true |
| allowed-tools | string | ❌ | 预批准的工具白名单 | Read, Grep, Bash(git *) |
| model | string | ❌ | 使用的模型版本 | sonnet / haiku / opus |
| context | string | ❌ | 执行上下文模式 | fork（隔离）/ main（主上下文） |
| agent | string | ❌ | 子代理类型 | Explore / Plan / general-purpose |
| license | string | ❌ | 许可证信息 | Apache-2.0 |
| compatibility | string | ❌ | 环境与依赖说明 | Requires Python 3.8+ |
| metadata | object | ❌ | 自定义扩展元数据 | {"author": "team-a", "version": "1.2"} |
