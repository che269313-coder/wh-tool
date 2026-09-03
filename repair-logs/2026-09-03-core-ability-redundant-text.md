# 2026-09-03 · 修复：通用核心技能冗余描述回流部署规则包（BUG 1）

> 分类：通用词冗余描述。同类记录见同目录其他文件；本文件只覆盖本 BUG。

## 现象

计算页"单位技能"区域，任何具有"深入打击""领袖""不知疼痛"等 11 版通用核心技能的单位，
都会跟随一整段《核心规则》原文（领袖约 1000 字）。修复过禁军、星际战士、死亡守卫后，
其余阵营反复出现"漏网之鱼"。

## 根因（关键）

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

## 修复方案

| 文件 | 变更 |
| --- | --- |
| `tools/lib/core-ability-normalizer.mjs`（新增） | `normalizeCoreAbilityRules`：core 且无 controls 的条目按单位合并为一条 `core-bundle`（name "核心技能"，text 仅技能名清单，effects 汇总保留，englishName 保留清单）；带 controls 的 core 条目单独保留但清空 text；`auditCoreAbilityText`：text 超 60 字判违规 |
| `tools/generate-website-rules.mjs` | unitRules 构建后接入 `normalizeCoreAbilityRules` |
| `tools/audit-core-ability-text.mjs`（新增门禁） | vm 加载全部 23 个已部署规则包（含 4 个独立维护阵营，先加载 `*-identities.js` 与 `identity.js`），任何超长 core 条目即 exit 1；已挂入 `build-data.mjs --check` |
| `tools/build-data.mjs` | `--check` 阶段新增 audit-core-ability-text 与 core-ability-normalizer 单测 |
| `docs/app.js` | `calculatorRuleMarkup` 对空 text 不再渲染 `<p>` |
| `tools/faction-rules-coverage.test.mjs` | FNP / Stealth 断言改为锚定 core 束（`source.kind === "core"` + text 名单匹配 / englishName 清单 includes） |
| `tools/core-ability-normalizer.test.mjs`（新增） | 合并、效果保留、去重、审计四项单测 |

## 效果

- `大掠夺者阿巴顿`：核心技能 = "深入打击，领袖"（与禁军风格一致）；专属技能（混沌战帅等）正文不受影响；
- 计算效果零丢失：不知疼痛 → `fnp`，潜行 → `incoming-hit-minus(ranged)` 均保留在束的 effects 中；
- 23 个规则包审计通过；faction-rules-coverage 8/8 通过；validate-rules / validate-architecture 通过。

## 架构启示（后续分析关注点）

1. **"证据层可以冗余，展示层必须收敛"**：catalogs 保留全文是证据要求；部署层对通用规则只应存引用/名清单。
2. **同类风险点**：任何"从数据层照抄文本到展示层"的生成器（`generate-orks-rules.mjs`、独立阵营文件）都应有对应审计；目前 core 审计已覆盖全部 23 个规则包。
3. **门禁是唯一可靠的防线**：手工修复部署产物必然被下次构建回滚，修复必须落在生成器 + 门禁上。
4. `docs/rules/factions/*.js` 等部署文件是生成物，**禁止手改**；目录层 `data/factions/<id>/package.json` 才是维护入口。

## 复验命令

```bash
node tools/audit-core-ability-text.mjs        # 核心技能全文门禁
node tools/generate-website-rules.mjs         # 重新生成 19 个阵营规则包
node --test tools/faction-rules-coverage.test.mjs tools/core-ability-normalizer.test.mjs
node tools/build-data.mjs --check             # 全量构建门禁（含以上所有）
```
