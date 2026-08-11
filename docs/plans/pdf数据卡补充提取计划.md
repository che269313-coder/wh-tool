# PDF 数据卡补充提取计划：默认装备 + 名称别名

**Feature:** 用 `docs/未分类数据卡pdf/` 中的阵营 PDF 补齐现有数据卡的三类信息：
1. 单位默认装备（没有导入军表时计算器启用的武器）
2. 单位名称别名（军表导入时按 PDF 名称匹配数据卡）
3. 分遣队名称别名（军表导入时按 PDF 名称匹配分遣队）

**Goal:** 除帝皇禁军、星际战士、死亡守卫（已有默认装备）外，其余 19 个有 PDF 的阵营全部补齐；灰骑士无 PDF，跳过并记录。不修改现有技能代码；单位技能多名称本次不做。

**Constraints:** 当前主分支有其他 AI 在修复 BUG。本任务只做规划与提取，**不得修改任何已存在项目文件**；提取结果写入全新目录 `docs/未分类数据卡pdf/提取结果/`，合入由后续步骤（另一个 AI 改完后执行）。

---

## 执行状态（2026-08-11 更新）

**提取完成**：19 个阵营全部产出提取 JSON 至 `docs/未分类数据卡pdf/提取结果/<factionId>.json`（19 个文件，共 708 条单位记录：675 匹配 + 33 明确标记 unmatched）。

| 阵营 | 提取方式 | 匹配单位 | unmatched | 说明 |
| --- | --- | --- | --- | --- |
| necrons 太空死灵 | 文本 | 59 | 1（宏墓要塞，10e 独有） | 23 issues 记录数值分歧 |
| leagues-of-votann 沃坦联盟 | 文本 | 21 | 0 | 19 issues 记录族徽类非武器 |
| chaos-knights 混沌骑士 | 文本 | 20 | 0 | 0 issues |
| thousand-sons 千子 | 文本 | 34 | 0 | 8 个 11e 新单位不在 PDF |
| chaos-daemons 混沌恶魔 | 文本 | 50 | 0 | 14 个 11e 新单位不在 PDF |
| agents-of-imperium 帝国特勤 | 文本 | 15 | 2（卡拉马佐夫/艾森霍恩） | 无分遣队页 |
| imperial-knights 帝国骑士 | 文本 | 12 | 0 | 剔除 10 个混沌骑士卡 |
| tau-empire 钛帝国 | 文本 | 61 | 1 | 修复 XV9 危机战斗服错配 |
| drukhari 黑暗灵族 | 文本 | 24 | 0 | 修复 畸人→怪诞造物 |
| aeldari 艾达灵族 | 文本 | 69 | 24（10e 独有单位） | 修复 天行者司战/影痕幽冥骑士 |
| orks 欧克兽人 | OCR | 52 | 0 | 老湿腐水印清洗 |
| world-eaters 吞世者 | OCR | 30 | 0 | 30 单位全部匹配 |
| genestealer-cults 基因窃取者教派 | OCR | 24 | 0 | DavidZ 版 |
| adepta-sororitas 修女会 | OCR | 29 | 0 | DavidZ 版 |
| adeptus-mechanicus 机械修会 | OCR | 26 | 0 | 老湿腐版 |
| tyranids 泰伦虫族 | OCR | 31 | 0 | 孢子雷无武器档 |
| astra-militarum 星界军 | OCR | 50 | 0 | 84 页大阵营 |
| chaos-space-marines 混沌星际战士 | OCR | 46 | 5（跨阵营盟友单位） | 修复跨阵营误匹配 |
| emperors-children 帝皇之子 | OCR | 22 | 0 | 老湿腐版 |

**合计产物**：381 条 unitAliases（PDF 名 → 数据卡规范名）、24 条 detachmentAliases（PDF 分遣队名 → 规范名）、650+ 单位默认装备（`defaultEquipment` + `isDefaultWeapons`，全部映射到数据卡 weapons[].name 规范名）。

**新增工具**：
- `tools/pdf_text_pages.py` — 文本层 PDF 逐页转 UTF-8 文本
- `tools/ocr_pdf_pages.py` — 扫描 PDF 渲染 + EasyOCR（chi_sim+eng）
- `tools/apply-pdf-extraction.mjs` — 合入脚本（dry-run 已通过，未执行写入）

**待合入步骤**（等另一个 AI 合并完 BUG 修复后执行）：
```powershell
node tools/apply-pdf-extraction.mjs        # 更新数据卡 JSON / factions.js / detachments/*.js
node tools/generate-calculator-catalog.mjs # 重新生成 catalogs
node tools/validate-datasheets.mjs
node tools/validate-rules.mjs
node tools/validate-detachments.mjs
node tools/validate-40k-app.mjs
node tools/army-list-aliases.test.mjs
```

---

## 背景与数据流

```
docs/data/<队伍>/<队伍>-结构化数据卡.json   ← 现有数据卡（网站 API 转换或 PDF 提取）
docs/data/<队伍>/<队伍>-网站原始数据-简体.json ← 网站原始数据（is_default 字段）
docs/未分类数据卡pdf/*.pdf                  ← 社区中文 PDF（10版/11版混用）
        │  提取（本任务，并行 subagent）
        ▼
docs/未分类数据卡pdf/提取结果/<factionId>.json  ← 提取产物（新文件）
        │  后续合入（等另一个 AI 合并完主分支后执行）
        ▼
docs/data/<队伍>/<队伍>-结构化数据卡.json   ← 更新 unit.defaultEquipment / weapons.isDefault
docs/rules/factions.js                    ← 更新 unitAliases（PDF 名称 → 规范名）
docs/rules/detachments/<factionId>.js      ← 更新 aliases（PDF 分遣队名 → 规范名）
docs/catalogs/<factionId>.js               ← 由 generate-calculator-catalog.mjs 重新生成
```

### 运行时如何使用这些字段（合入语义）

- `unit.defaultEquipment`：`docs/app.js` `enabledCalculatorWeapons()` 在**未导入军表**时，用 `weaponMatchesEquipmentText(weapon, defaultEquipment)` 做**子串包含**匹配，决定启用哪些武器。因此默认装备字符串**必须使用数据卡 weapons[].name 中的规范武器名**，不能直接用 PDF 原文名。
- 单位名称匹配：`findStructuredCalculatorCard()` 匹配 `card.name / unit.name / englishName`；`factions.js` 的 `unitAliases` 提供“军表名 → 规范名”映射（`resolveUnitName` + `unitNameCandidates`）。
- 分遣队匹配：`resolver.matchDetachments()` 对 `detachment.aliases || [name, englishName]` 做归一化子串匹配。网站阵营的分遣队文件目前**没有 aliases 字段**，需补上 PDF 名。

### 已验证的 PDF 结构（供 subagent 参考）

| PDF 类型 | 阵营示例 | 默认装备线索 | 提取方式 |
| --- | --- | --- | --- |
| 双子星版 CODEX | 千子 V1.13、沃坦 V1.02、混沌骑士 V1.02 | `单位装备` 行 | pdfplumber 文本 |
| kasa 版 | 混沌恶魔 0.95.3 | `默认装备` 行 | pdfplumber 文本 |
| 帝国特勤/骑士、黑豆芽 | agents-of-imperium、imperial-knights、drukhari | `武器装备选项 单位构成` 段中的 `X装备有：…` | pdfplumber 文本 |
| 老湿腐/DavidZ 版 | 兽人、星界军、修女会、机械修会、泰伦、混沌SM、吞世者、基因窃取者、帝皇之子 | 扫描图，无文字层 | EasyOCR（`tools/ocr_pdf_pages.py`） |

PDF 每页首 3 行通常是版本更新水印（`V1.00 更新codex内容…` 等），提取时丢弃；老湿腐版页面有水印字符（老、湿、腐、战、群等）混入 OCR 文本，需清洗（参考 `docs/app.js` 的 `cleanPdfWatermarkText` 思路）。

---

## 提取产物 Schema

每阵营一个 JSON：`docs/未分类数据卡pdf/提取结果/<factionId>.json`

```jsonc
{
  "faction": "千子",
  "factionId": "thousand-sons",
  "pdfFile": "千子军团CODEX-双子星版 V1.13.pdf",
  "extractionMethod": "text",            // "text" | "ocr"
  "dataCardFile": "docs/data/千子/千子-结构化数据卡.json",
  "units": [
    {
      "pdfName": "阿里曼",               // PDF 中的单位名（原样）
      "cardName": "阿里曼",              // 数据卡规范名（匹配到的）
      "matchConfidence": "exact",       // exact | fuzzy | unmatched
      "matchBasis": "english-name",     // english-name | stats | chinese-similarity | name-equality
      "pdfDefaultEquipment": "地狱火爆弹手枪；篡变冲击波；阿里曼的黑杖",   // PDF 原文
      "defaultEquipment": "业火手枪；阿里曼黑杖；蜕变冲击",               // 规范武器名（数据卡 weapons[].name），';' 分隔；无默认装备则为 ""
      "isDefaultWeapons": ["业火手枪", "阿里曼黑杖", "蜕变冲击"],          // 应为默认的规范武器名
      "pdfPage": 21,
      "notes": ""
    }
  ],
  "detachments": [
    {
      "pdfName": "至尊教会",             // PDF 中的分遣队名
      "detachmentName": "至尊巫会",      // 数据中的规范分遣队名（registry）
      "matchBasis": "rule-name",        // rule-name | english-name | chinese-similarity | unmatched
      "confidence": "high",             // high | medium | unmatched
      "pdfPage": 2,
      "notes": ""
    }
  ],
  "unitAliases": { "骑乘奸奇魔盘的高阶巫师": "乘坐奸奇魔碟的高阶巫师" },   // 仅 pdfName != cardName 时收录
  "detachmentAliases": { "至尊教会": "至尊巫会" },
  "issues": [ "…需要人工复核的条目…" ]
}
```

合入脚本后续读取该文件：
- `units[].defaultEquipment` → 覆盖数据卡 `unit.defaultEquipment`；`isDefaultWeapons` → 对应武器 `isDefault: true`（其余 `isDefault: false`）。
- `unitAliases` → 追加进 `docs/rules/factions.js` 对应阵营的 `unitAliases`。
- `detachmentAliases` → 追加进 `docs/rules/detachments/<factionId>.js` 对应分遣队的 `aliases`。

---

## Subagent 任务分配

**文本 PDF（pdfplumber，快）**

| Agent | 阵营 | PDF |
| --- | --- | --- |
| A1 | necrons 太空死灵、leagues-of-votann 沃坦联盟、chaos-knights 混沌骑士 | 10版太空死灵奥法之星版2.5.pdf；沃坦联盟CODEX-双子星版 V1.02.pdf；混沌骑士CODEX-双子星版 V1.02.pdf |
| A2 | thousand-sons 千子、chaos-daemons 混沌恶魔、agents-of-imperium 帝国特勤 | 千子军团CODEX-双子星版 V1.13.pdf；混沌恶魔10E中文kasa0.95.3.pdf；帝国特勤中文 (1).pdf |
| A3 | imperial-knights 帝国骑士、tau-empire 钛帝国、drukhari 黑暗灵族、aeldari 艾达灵族 | 帝国骑士-C.pdf；钛帝国十版CODEX-20250604.pdf；黑豆芽.pdf；艾达灵族10版中文 1.13.pdf |

**OCR PDF（EasyOCR，慢；每页约 20 秒，先跑 `tools/ocr_pdf_pages.py` 再解析）**

| Agent | 阵营 | PDF | 页数 |
| --- | --- | --- | --- |
| A4 | orks 欧克兽人、world-eaters 吞世者、genestealer-cults 基因窃取者教派 | 兽人10版中文老湿腐版1.09.pdf；吞世者10版中文DavidZ版1.01.pdf；基因窃取者10版中文DavidZ版1.04.pdf | 69/49/50 |
| A5 | adepta-sororitas 修女会、adeptus-mechanicus 机械修会、tyranids 泰伦虫族 | 战斗修女10版中文DavidZ版1.05.pdf；机械修会10版中文老湿腐版1.1.pdf；泰伦虫族10版中文老湿腐版1.11.pdf | 51/45/49 |
| A6 | astra-militarum 星界军、chaos-space-marines 混沌星际战士、emperors-children 帝皇之子 | 星界军10版中文老湿腐版1.27.pdf；混沌星际战士10版中文老湿腐版1.1.pdf；帝皇之子10版中文老湿腐版1.01.pdf | 84/80/41 |

跳过：帝皇禁军、星际战士、死亡守卫（已有默认装备）。灰骑士（无 PDF）。

---

## Subagent 工作流程（每个 agent 内部）

1. **定位数据卡页**：OCR/文本遍历 PDF，单位卡从“人物/步兵/载具/野兽”等分类页开始；每张卡第一行是单位名（常含英文名，如 `BLUE HORRORS`）。
2. **解析每张卡**：
   - 单位名（中文 + 英文若存在）
   - `单位装备 / 默认装备 / X装备有：…` 行 → 默认装备原文
   - 武器列表（武器名 + A/S/AP/D，用于与数据卡武器映射核对）
   - 属性 M/T/Sv/W/Ld/OC（用于与数据卡核对同一单位）
3. **读取数据卡**：`docs/data/<队伍>/<队伍>-结构化数据卡.json`（或 `-全部数据卡.json`），构建 `cardName → {englishName, unit stats, weapons[]}` 索引。
4. **匹配单位**：优先英文名（PDF 有英文名时最可靠）→ 其次属性 M/T/Sv/W/Ld/OC 全同 → 最后中文相似（去空格/括号后归一化）。找不到的记 `unmatched` 进 `issues`。
5. **映射默认装备**：把 PDF 默认装备原文逐项映射到数据卡 `weapons[].name`（优先英文名 → 武器属性 A/S/AP/D 全同 → 中文相似）。映射不上的项目写入 `notes`/`issues`，不臆造。
6. **解析分遣队**：PDF 中 `团策/分遣队规则` 段，分遣队名通常为段落标题（如 `至尊教会`），团策名（如 `同教巫术`）用于与 registry `rule.name` 对应；对照 `docs/rules/detachments/<factionId>.js` 中每个分遣队的 `name/englishName/rule.name` 找规范名。只按名字匹配不上的按规则文本/英文名匹配；仍不匹配 → `unmatched`。
7. **写出产物**：`docs/未分类数据卡pdf/提取结果/<factionId>.json`（UTF-8，缩进 2）。**只创建该新文件**，禁止改动任何其他文件。
8. **自检**：产物中 `units` 数量 ≈ 数据卡 `cards` 数量；每个 PDF 单位都有记录（匹配或 unmatched）；`unitAliases`/`detachmentAliases` 只收录名称确实不同的；数值与原文核对至少抽样 5 个单位。

## 质量要求

- 水印与版本更新行（`V1.00 更新…`、`该规则为…自用版本`）必须丢弃。
- OCR 误读（如 `装备`→`装各`、数字 `8`↔`B`）通过英文名/属性交叉核对纠正。
- 拿不准的匹配一律 `confidence: "medium"` 或 `unmatched` 并写进 `issues`，绝不静默猜。
- 默认装备里**出现次数**（如 `2x`）记录在 `notes`，不拼进规范名串（数据卡 weapons 已含 count）。
- 每个 agent 完成后输出：各阵营 `units` 匹配数 / unmatched 数、`issues` 摘要、产物文件路径。

## 合入步骤（后续，不在本任务执行）

1. 等另一个 AI 合并完 BUG 修复后，运行 `node tools/apply-pdf-extraction.mjs`（待编写，读取 `提取结果/*.json` 更新数据卡 JSON、factions.js、detachments/*.js）。
2. 重新生成 catalogs：`node tools/generate-calculator-catalog.mjs`。
3. 跑门禁：`node tools/validate-datasheets.mjs`、`node tools/validate-rules.mjs`、`node tools/validate-detachments.mjs`、`node tools/validate-40k-app.mjs`、`node tools/army-list-aliases.test.mjs`。
4. 用 PDF 名称造一份军表样例，验证导入不再报“未匹配”。
