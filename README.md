# 战术助手 · GitHub Pages 试用包

这是手机端 Warhammer 40,000 对局助手的静态版，适合直接发布到 GitHub Pages。

## 最快发布

1. 解压本压缩包，在 GitHub 新建一个仓库。
2. 把解压后的 `docs` 文件夹完整上传到仓库根目录。
3. 打开仓库的 **Settings → Pages**。
4. 选择 **Deploy from a branch → main → /docs → Save**。
5. 等待发布完成，用手机打开 GitHub Pages 地址。

注意：GitHub 网页端不能直接把 ZIP 当作网站发布，需要先解压再上传文件。也可以用电脑执行：

```bash
git clone 你的仓库地址
cp -r docs/. 你的仓库目录/docs/
git add .
git commit -m "publish tactical assistant"
git push
```

## 页面功能

- 手机端对局、资料库、规则计算器和设置页。
- 计算器和资料库默认在浏览器本地运行。
- 军表、数据卡、规则书导入后保存在当前手机浏览器的 IndexedDB 中。
- 文本资料可作为 AI 上下文；PDF 会先保存，当前版本尚未做页面内 PDF 检索。
- DeepSeek 可以在设置页直接调用，也可以使用 `worker/` 中的 Cloudflare Worker 代理。
- 外部 Wathammer 校验接口通过 Worker 代理接入，地址格式为 `/api/wathammer-round`。

## DeepSeek 设置

在页面的“设置”中选择直接调用或 Worker 代理，并填写模型和地址。默认模型为 `deepseek-v4-flash`。

如果直接调用遇到浏览器 CORS 错误，部署 `worker/pages-proxy.js`，然后填写：

- AI 地址：`https://你的-worker.workers.dev/api/chat`
- 计算器地址：`https://你的-worker.workers.dev/api/wathammer-round`

API Key 不写入本压缩包，也不会写入 GitHub 文件；页面只有在你主动保存时才会保存到当前浏览器。

## 当前计算示例

默认示例仍是神鸟、盾卫和冲击者突击艇。可以在“规则计算器”的高级场景配置中直接替换 `weaponGroups` 和 `defenderGroups` JSON。
