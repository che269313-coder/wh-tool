# 修复记录（架构分析参考资料）

> 本文件已迁移至 `repair-logs/` 目录，按日期归档；后续修复记录见同目录其他文件。

本文件记录影响部署产物的历史问题与修复方案，供后续架构分析参考。
原则：只记录"会复发或暴露架构薄弱点"的问题，不记录一次性数据勘误。

---

## 2026-09-03 · 问题一：通用核心技能全文回流到部署规则包

### 现象

计算页"单位技能"区域，任何具有"深入打击""领袖""不知疼痛"等 11 版通用核心技能的单位，
都会跟随一整段《核心规则》原文（领袖约 1000 字）。修复过禁军、星际战士、死亡守卫后，
其余阵营反复出现"漏网之鱼"。

### 根因（关键）

部署链路是生成式的，逐字复制目录数据里的技能全文：

```text
docs/catalogs/<faction>.json   （目录层，每个单位内嵌 core 技能全文 —— 正常，作为证据层）
        │
        ▼  tools/generate-website-rules.mjs   ← 问题所在：照抄 ability.text
docs/rules/factions/*.js       （部署层，unitRules 携带全文 —— 错误）
        │
        ▼  docs/rules/resolver.js → docs/app.js calculatorRuleMarkup
计算页 <p>{{ rule.text }}</p>  （用户看到大段解释）
```

- `category === "core"` 的技能是 11 版通用规则，全文属于《核心规则》，不属于任何阵营数据包；
- 禁军（`docs/rules/custodes.js`，手写）、星际战士 / 死亡守卫（独立生成器）此前被单独修过，
  但走 `generate-website-rules.mjs` 的 19 个阵营从未被规范化——**改部署文件不治本，
  每次重新构建即回滚**，这就是"修多次仍漏"的原因。
- 实测规模：20 个阵营目录共 1312 条 core 条目，其中 1082 条为长文本。

### 修复方案

| 文件 | 变更 |
| --- | --- |
| `tools/lib/core-ability-normalizer.mjs`（新增） | `normalizeCoreAbilityRules`：core 且无 controls 的条目按单位合并为一条 `core-bundle`（name "核心技能"，text 仅技能名清单，effects 汇总保留，englishName 保留清单）；带 controls 的 core 条目单独保留但清空 text；`auditCoreAbilityText`：text 超 60 字判违规 |
| `tools/generate-website-rules.mjs` | unitRules 构建后接入 `normalizeCoreAbilityRules` |
| `tools/audit-core-ability-text.mjs`（新增门禁） | vm 加载全部 23 个已部署规则包（含 4 个独立维护阵营，先加载 `*-identities.js` 与 `identity.js`），任何超长 core 条目即 exit 1；已挂入 `build-data.mjs --check` |
| `tools/build-data.mjs` | `--check` 阶段新增 audit-core-ability-text 与 core-ability-normalizer 单测 |
| `docs/app.js` | `calculatorRuleMarkup` 对空 text 不再渲染 `<p>` |
| `tools/faction-rules-coverage.test.mjs` | FNP / Stealth 断言改为锚定 core 束（`source.kind === "core"` + text 名单匹配 / englishName 清单 includes） |
| `tools/core-ability-normalizer.test.mjs`（新增） | 合并、效果保留、去重、审计四项单测 |

### 效果

- `大掠夺者阿巴顿`：核心技能 = "深入打击，领袖"（与禁军风格一致）；专属技能（混沌战帅等）正文不受影响；
- 计算效果零丢失：不知疼痛 → `fnp`，潜行 → `incoming-hit-minus(ranged)` 均保留在束的 effects 中；
- 23 个规则包审计通过；faction-rules-coverage 8/8 通过；validate-rules / validate-architecture 通过。

### 架构启示（后续分析关注点）

1. **"证据层可以冗余，展示层必须收敛"**：catalogs 保留全文是证据要求；部署层对通用规则只应存引用/名清单。
2. **同类风险点**：任何"从数据层照抄文本到展示层"的生成器（`generate-orks-rules.mjs`、独立阵营文件）都应有对应审计；目前 core 审计已覆盖全部 23 个规则包。
3. **门禁是唯一可靠的防线**：手工修复部署产物必然被下次构建回滚，修复必须落在生成器 + 门禁上。
4. `docs/rules/factions/*.js` 等部署文件是生成物，**禁止手改**；目录层 `data/factions/<id>/package.json` 才是维护入口。

---

## 2026-09-03 · 问题二：validate-rules 欧克兽人 4 条断言失败（陈旧单位名）

### 现象

`tools/validate-rules.mjs` 报 4 条失败：野兽头目近战命中 +1、蛮兽之怒毁灭伤害、
更多火力远程重投、坦克猎手按目标加成。规则与效果实际都存在且正确。

### 根因

PDF 卡面显示名裁决（11 版简中 PDF，`data/global/pdf-display-names.json`）更新了欧克单位译名，
部署产物随之改名，但校验脚本仍按旧译名查 `unitRules`，查不到即失败：

| 旧名（脚本引用） | 新名（PDF 卡面裁决） | englishName（稳定锚点） |
| --- | --- | --- |
| 野兽头目 | 兽霸头目 | Beastboss |
| 大技师 | 大技霸 | Big Mek |
| 坦克破坏者 | 坦爆队 | Tank Huntas |

### 修复

`tools/validate-rules.mjs` 中将上述三处中文单位名替换为新名（共 8 处引用）。
修复后 `node tools/validate-rules.mjs` 全量通过。

### 架构启示（重要）

**校验与测试断言必须锚定稳定身份（englishName / cardId / 规则 id），不得锚定中文显示名。**
中文译名会随 PDF 裁决更新而变化（这正是 ARCHITECTURE.md "身份、显示名与数据值"三层分离的设计意图）；
`orksUnitRule(单位名, englishName)` 这种双键查找在改名后必然漂移。
后续架构分析建议：为校验脚本增加"按 englishName 反查"的辅助函数，把中文显示名作为断言输出而非输入。

### 遗留观察

- 同一脚本中星际战士断言（连长、跳跃背包连长等）也使用中文单位名定位，目前因星际战士译名未变而通过，存在同样的漂移风险。

---

## 复验命令

```bash
node tools/audit-core-ability-text.mjs        # 核心技能全文门禁
node tools/generate-website-rules.mjs         # 重新生成 19 个阵营规则包
node --test tools/faction-rules-coverage.test.mjs tools/core-ability-normalizer.test.mjs
node tools/validate-rules.mjs                 # 规则回归（含欧克）
node tools/build-data.mjs --check             # 全量构建门禁（含以上所有）
```
