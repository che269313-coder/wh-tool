# 项目架构

本项目的计算核心、界面/AI、阵营数据彼此隔离。计算行为只由稳定规则 ID、effect schema 和战斗 payload 驱动；界面与 AI 只能组装输入、展示结果，不能按中文技能名改写计算。阵营数据通过确定性构建进入部署目录，任何人工裁决都必须可追溯、可重放。

## 边界

```text
本地来源证据/API 快照
        ↓
data/factions/<id>/package.json   ← 人工只在这里维护来源政策、别名和裁决
        ↓ tools/build-data.mjs
docs/rules/factions.js + docs/aliases/index.js + docs/catalogs/*
        ↓
UI / AI adapter → resolver + payload schema → engine.js
```

- `docs/` 是浏览器部署目录。标记为 generated 的文件不得手改。
- `data/factions/<id>/package.json` 是一个阵营唯一的维护入口；运行时注册、来源、别名、覆盖层不再散落在多个目录。
- `data/global/aliases.json` 只保存跨阵营术语与全局武器别名。
- `sources/pdfs/` 保存本地 PDF 与逐页原文证据，整体忽略 Git；它不是运行时数据源，也不能直接覆盖生成物。
- `tools/extract/` 只做获取、OCR、格式转换；`tools/build-data.mjs` 是唯一受支持的数据构建入口。

## 阵营数据包

每个 `package.json` 包含六类信息：

1. `definition`：阵营稳定 ID、显示名、运行时包和源输入路径；不保存单位别名。
2. `sourcePolicy`：字段冲突的统一裁决规则。
3. `sources`：来源类型、版本、用途、输入或证据位置。英文来源只能锚定身份 ID。
4. `aliases`：单位、武器、分遣队、数字版单位的阵营作用域别名。
5. `overrides`：人工裁决。路径必须使用稳定选择器，例如 `cards[id=...].modelProfiles[id=...]`，禁止数组位置。
6. `conflicts`：多源冲突账本。每项记录候选值、字段政策、胜出来源和对应覆盖路径。

显示名、规则文本和模型属性的来源优先级固定为：

```text
11 版简中 PDF > 10 版简中 PDF > 40k11e-backend 繁中数据
```

旧译名不得删除，必须转为别名。英文 40k.app 只提供稳定身份；找不到身份时使用暂译 ID 并进入复核，不得用英文源覆盖中文数值。`sourcePolicy` 不是说明性元数据：构建会检查每个冲突的胜出来源是否符合字段优先级、值是否由同一条 override 实现、旧名是否保留为别名。所有 PDF override 都必须进入冲突账本；缺少裁决或绕开账本都会让构建失败。

PDF/OCR 文本只是证据。提取结果即使看似完整，也不能自动写入规范数据；应先对照 PDF 原文或已有可检索文本，再把结论写成带 `source`、`rationale`、`adjudicatedBy` 的 alias/override。这样重新提取 PDF 只会增加证据，不会破坏已裁决的数据。

## 构建与门禁

```powershell
node tools/build-data.mjs --check
```

固定顺序为：预检私有源输入 → 校验冲突账本 → 生成阵营注册表 → 生成别名索引 → 生成标准 catalog → 推导模型武器集 → 应用人工覆盖 → 校验。调用单个中间脚本只用于开发诊断，不作为交付流程。

原始 API 快照和授权 PDF 证据不进入 Git。干净克隆可以直接使用已提交的 `docs/catalogs/*.json` 部署和运行；需要重建数据时，必须先把维护者的私有源快照恢复到各数据包 `sources[].inputPath` 指定的 `docs/data/` 路径，并把 PDF/原文证据恢复到 `sources/pdfs/`。预检会逐阵营列出缺失输入，不允许用旧生成物冒充成功重建。

门禁至少保证：

- 23 个运行时阵营各有且只有一个数据包；
- 所有覆盖路径使用稳定 ID/键，未命中数量必须为 0；
- 每项已知多源冲突都有唯一裁决，且裁决符合 `displayName`、`rules` 或 `profiles` 的来源优先级；
- catalog JSON、脚本回退包和轻量搜索索引同步；
- 单阵营变更不能修改其他阵营的行为；
- PDF 规范名仍能通过所有旧译名、英文名和军表名检索；
- 单位与分遣队别名只由生成索引注册一次，查询始终携带阵营 ID；
- `engine.js`、resolver 和 UI 不按具体阵营名或技能显示名分支。

## 修改规则

- 名称、别名、来源冲突：修改对应阵营 `package.json`。
- 原始 API/PDF 提取错误：先修 `tools/extract/` 或源输入，再通过覆盖层保留确有必要的人工裁决。
- 生成器缺少通用能力：修改构建工具并先增加失败测试；不要直接编辑 catalog。
- 新战斗语义：扩展公共 effect/payload schema，经 resolver 进入 engine；不能在阵营文件或 UI 写专用捷径。
- 历史讨论、实施流水和已关闭 bug 不保存在当前树；Git 历史与回归测试承担追溯职责。
