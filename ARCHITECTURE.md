# 项目架构

本项目将数据来源、规则计算、UI 与 AI 适配严格分层。中文名称只用于展示和检索；计算核心只依赖稳定 ID、规则 effect schema 与战斗 payload，不得按某个中文译名分支。

## 数据边界

```text
授权 PDF / PDF 文本层 / API 快照（本地证据，不部署）
             │
             ├─ data/factions/<id>/package.json
             │    阵营定义、来源策略、别名、人工 override/transform/conflict
             │
             ├─ data/global/pdf-display-names.json
             │    PDF 卡面单位名、技能名与武器名裁决，绑定稳定 cardId / englishName / 证据页
             │
             └─ data/global/aliases.json
                  跨阵营通用术语与全局别名
                              │
                    tools/build-data.mjs
                              │
     docs/rules/factions.js + docs/aliases/index.js + docs/catalogs/* + docs/rules/*
                              │
                    docs/build-version.json
                              │
                  UI / AI adapter / resolver
                              │
                    payload schema / engine.js
```

- `docs/` 是浏览器部署目录。标记为 generated 的数据包不得手改。
- `data/factions/<id>/package.json` 是阵营级维护入口；同一阵营不得再维护第二份来源策略或别名表。
- `data/global/pdf-display-names.json` 是跨阵营 PDF 显示名裁决账本。它不保存规则数值，只保存稳定身份、规范显示名、兼容旧名和证据位置。
- `data/global/aliases.json` 只保存跨阵营术语或真正全局的别名，不能代替阵营作用域裁决。
- `sources/pdfs/` 与 `docs/data/` 是授权本地输入，整体忽略 Git；干净克隆可直接使用已提交的生成物，但不能伪装成完成了源数据重建。
- `tools/extract/` 只负责提取与候选生成；`tools/build-data.mjs` 是唯一受支持的完整构建入口。

## 身份、显示名与数据值

三个概念不可混用：

1. 身份由稳定 `cardId` 或官方英文 `englishName` 锚定。英文源只参与身份匹配，不覆盖中文数值或正文。
2. 中文显示名按来源策略裁决。旧译名、繁中名与英文名必须保留为阵营作用域别名。
3. 属性、武器和规则正文按各阵营 `sourcePolicy` 独立裁决，不能因为名称相同就做全局字符串替换。

默认优先级为：

```text
11 版简中 PDF > 10 版简中 PDF > 40k11e backend 繁中数据
```

单位卡面名通过 `cardId + englishName + PDF 页标题` 裁决；技能名通过 `factionId + englishName + 源技能名` 裁决。卡面单位名与模型成员名是两种身份，单位裁决不得传播到 `modelProfiles`；模型名只有在具备独立模型身份和 PDF 证据时才能改。相同中文词在不同英文身份、不同单位或不同阵营下可以有不同结果。找不到更高优先级证据时保留低优先级来源值，不猜译；同一身份出现多个可用高优先级候选时构建失败。
武器显示名属于 `sourcePolicy.profiles`：`ledger.weapons` 按 `cardId + englishName` 绑定，以 PDF 武器表行（射程 / A / WS|BS / S / AP / D）与后端武器数值的唯一匹配为证据；构建时 `adjudicateCatalog` 自动把结构化武器名、默认装备、模型武器集合与装备选项收敛到 PDF 名，并把卡内正文中 ≥3 字的后端武器术语随裁决替换（短词只收敛结构化字段，避免破坏复合词）。低优先级旧名自动进入 `aliases.weapons`，但当旧名仍是同阵营另一武器的现用名、或与其它裁决的显示名冲突时不得别名化；构建门禁确保每条已裁决武器在所属卡内不再残留后端名。


`tools/extract/pdf-display-names.py` 从 PDF 文本层和术语比对表生成可审查候选：单位名按卡面标题锚定，技能名按比对报告锚定，武器名按卡页区域内的武器表行（数值签名唯一匹配后端武器档案）锚定。只有在恢复的 PDF 原文中实际命中（`rawExtractVerified=true`）的候选才能进入强裁决账本；报告备注或未命中的推测必须回退到后端原值，除非以后增加带页码证据的人工裁决。候选进入 `data/global/pdf-display-names.json` 后才是构建输入；再次提取只用于复核，不得绕过账本直接改部署文件。

## 阵营数据包

每个 `package.json` 包含：

- `definition`：稳定阵营 ID、部署资源和本地源输入路径；
- `sourcePolicy` 与 `sources`：字段优先级、版本、用途和证据位置；
- `aliases`：阵营作用域单位、武器、分遣队和数字版别名；
- `overrides`：绑定稳定 ID/键的人工裁决，禁止数组位置选择器；
- `transforms`：受字段与作用域约束的重复术语转换；
- `conflicts`：已知多源冲突、胜出来源及实现它的 override/transform。

PDF 规范单位名会在生成别名索引时反转低优先级映射。例如源数据名、PDF 名和英文名都解析到 PDF 规范名；查询必须始终携带 `factionId`，避免“犀牛装甲车”等跨阵营同名串线。

## 构建与门禁

```powershell
node tools/build-data.mjs --check
```

固定顺序为：

```text
私有输入预检
→ 冲突账本校验
→ 阵营注册与别名索引
→ catalog 规范化及 PDF 显示名裁决
→ 从已裁决 catalog 生成规则包
→ 模型武器集合
→ 稳定 ID override/transform
→ 根据部署内容生成统一 hash 版本
→ 数据、回归与架构校验
```

门禁至少保证：

- 23 个运行时阵营各有且只有一个阵营数据包；
- PDF 单位名裁决全部命中当前稳定 `cardId`，旧名与英文名仍能检索；
- PDF 技能名按英文身份和阵营作用域应用，歧义不会借用其他单位的译名；
- 规则包直接消费已裁决 catalog，UI 直接显示规则包名称，不再经过全局术语二次改名；
- catalog JSON、脚本回退包、轻量搜索索引与 AI 结构化输出一致；
- 所有 override/transform 可重复执行且命中数不为零；
- 懒加载规则、分遣队、catalog 回退脚本以及全局别名/索引使用 `docs/build-version.json` 中由部署内容计算的同一 hash 版本；任一数据或规则变化都会换版本，避免部署缓存混用；
- UI、AI、resolver 与计算引擎不按具体阵营中文名或技能显示名写专用计算逻辑。

## 修改规则

- 新增或修正来源冲突：修改阵营包或全局 PDF 裁决账本，并提供稳定身份与证据。
- PDF/API 提取错误：先修 `tools/extract/` 或本地源输入，再重建；不要手改 generated catalog。
- 通用生成能力缺失：先增加失败测试，再修改生成器。
- 新战斗语义：扩展公共 effect/payload schema，经 resolver 进入 engine。
- 历史讨论、实施流水和已关闭 bug 不保存在当前树；由 Git 历史与回归测试承担追溯。
