# 战术助手

一个面向 Warhammer 40,000 第 11 版对局的轻量级网页工具，帮助玩家整理军表、查阅规则，并估算一轮射击或近战攻击的伤害与击杀概率。

## 在线使用

- [打开在线版](https://che269313-coder.github.io/wh-tool/)
- [GitHub 仓库](https://github.com/che269313-coder/wh-tool)

如果首次打开仍显示旧版本，请等待 GitHub Pages 完成部署后刷新，或使用无痕窗口重新打开。

## 当前功能

- 手机端友好的对局面板：记录双方军表、单位、模型和当前伤口。
- 军表导入：支持 TXT、Markdown、JSON 和 PDF 文本提取。
- 数据卡浏览：查看单位属性、武器配置和技能原文。
- 关键词查阅：在数据卡和计算页面同时显示阵营关键词、单位关键词，方便核对武器特效目标。
- 规则计算器：选择进攻方、防御方和攻击类型，自动结算命中、造伤、豁免、伤害与击杀概率。
- 条件技能：支持按模型数量、是否低于半数、目标关键词和联合领袖状态自动应用修正，也可在计算页手动启用可选技能。
- 武器实时属性：技能生效后显示有效攻击次数、力量、命中/造伤重投面板和对应修正。
- 本地规则引擎：计算结果由确定性的规则引擎和蒙特卡洛模拟生成，不依赖 AI 猜骰子。
- 规则支持：帝皇禁军、星际战士、死亡守卫，以及核心规则和分遣队速查资料。
- 浏览器本地保存：军表和计算器设置保存在当前浏览器中，不会自动上传到仓库。

## 使用方式

1. 打开[在线版](https://che269313-coder.github.io/wh-tool/)。
2. 在“军表”页导入或粘贴双方军表。
3. 在“规则计算器”页选择进攻单位、防御目标和远程/近战模式。
4. 在数据卡中核对关键词、装备和技能；根据实际场景启用可选技能，运行本地模拟查看结果。

## 项目结构

```text
docs/
  index.html              网页入口
  app.js                  页面交互、军表导入和计算器组装
  engine.js               通用战斗模拟引擎
  rules/                  阵营规则、效果注册表和规则解析器
  data/                   规则书、数据卡和分遣队资料
  calculator-catalog.js   可直接打开网页时使用的结构化数据目录
tools/
  validate-*.mjs          规则、战斗和数据卡回归校验
  generate-*.mjs          从结构化数据生成规则目录和计算器目录
worker/
  pages-proxy.js          可选的 Cloudflare Worker 代理
```

## 本地预览

项目是静态网页，不需要构建工具。可以在仓库根目录运行：

```bash
python -m http.server 8080 --directory docs
```

然后访问 <http://localhost:8080>。

## 规则与计算说明

AI 只用于理解用户描述和整理上下文；命中、造伤、豁免、伤害和击杀概率由 `docs/engine.js` 与规则目录计算。技能原文会尽量保留，尚未结构化的规则会以说明形式展示，不会擅自改变骰子结果。

## 可选 AI 代理

如需在浏览器中调用 DeepSeek，可部署 `worker/pages-proxy.js`，再在设置页填写 Worker 地址。API Key 仅由用户在浏览器中主动配置，不写入项目文件。

## 开发校验

```bash
node tools/validate-rules.mjs
node tools/validate-combat.mjs
node tools/validate-datasheets.mjs
```

## License

MIT
