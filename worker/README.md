# DeepSeek Worker 代理

在 Cloudflare Workers 中创建一个 Worker，把 `pages-proxy.js` 作为入口，并设置：

```text
DEEPSEEK_API_KEY = 你的密钥
```

如果用 Wrangler：

```bash
wrangler secret put DEEPSEEK_API_KEY
wrangler deploy
```

然后把：

- `https://你的-worker.workers.dev/api/chat` 填入网页的 AI 地址；
- `https://你的-worker.workers.dev/api/wathammer-round` 填入网页的外部计算器代理地址。

计算器代理只转发 JSON 到 wathammer 的 `/simulate-round`，不保存对局数据。
