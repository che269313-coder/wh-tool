# GLM Worker 代理

在 Cloudflare Workers 中创建一个 Worker，把 `pages-proxy.js` 作为入口，并设置：

```text
GLM_API_KEY = 你的密钥
```

如果用 Wrangler：

```bash
wrangler secret put GLM_API_KEY
wrangler deploy
```

然后把：

- `https://你的-worker.workers.dev/api/chat` 填入网页的 AI 地址；
- `https://你的-worker.workers.dev/api/wathammer-round` 填入网页的外部计算器代理地址。

计算器代理只转发 JSON 到 wathammer 的 `/simulate-round`，不保存对局数据。

## AI 工具调用

`/api/chat` 会转发 OpenAI 兼容的 `tools` 和 `tool_choice` 字段，并保留工具调用所需的 `assistant` / `tool` 消息对。网页端据此可让模型调用以下本地能力：

- 查找当前军表或内置数据卡中的单位；
- 读取单位的结构化属性、武器和技能；
- 调用浏览器内的规则引擎完成 1,000 次战斗模拟。

因此 Worker 只代理模型请求，**不会接收或运行战斗计算**，也不会保存军表。请在网页“设置”中使用支持 OpenAI 兼容工具调用的模型，并填写 `https://你的-worker.workers.dev/api/chat`。`GLM_API_KEY` 必须通过 Worker Secret 配置，仓库不保存默认 Key。
