# GitHub Pages 静态前端

本目录就是可以发布到 GitHub Pages 的网站根目录。

在 GitHub 仓库设置中选择：

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`

页面本身不依赖 Node.js。`engine.js` 是本地规则计算引擎，`app.js` 负责手机界面、浏览器资料库和 AI/外部计算器调用。

资料文件只保存在当前浏览器本地，不会自动上传到 GitHub。请不要把 API Key、规则书 PDF 或个人资料提交到公开仓库。
