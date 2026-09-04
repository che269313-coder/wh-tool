# 2026-09-04 · 修复：致命破灭等通用核心技能全文再次回流（BUG 2）

> 分类：通用词冗余描述（2026-09-03 BUG 1 的回归）。本文件只覆盖本 BUG。

## 现象

用户报告「燃烧轰炸机」（兽人）的致命破灭 D3 仍带整段《核心规则》原文。排查发现不止一处：

| 部署文件 | 漏网规模 |
| --- | --- |
| `docs/rules/orks.js` | 43 条致命破灭全文 + **领袖 990 字全文 ×28** + 深入打击/不觉疼痛/斥候/开火口共 60+ 条 |
| `docs/rules/factions/tau-empire.js` | 5 条致命破灭全文 |

## 根因（两个，互相叠加）

1. **orks 生成器读错字段**：`欧克兽人-全部数据卡.json` 的能力用 `category` 标注类别
   （core 149 条 / faction 63 / unique 147），而 `generate-orks-rules.mjs` 写
   `kind: ability.kind || "unique"` —— 149 条 core 全被标成 unique；且该生成器
   **从未接入** `normalizeCoreAbilityRules`，core 全文照抄进部署层。
2. **钛帝国目录缺 category**：致命破灭条目无 category → 生成器标 unique，
   绕过只认 `kind === "core"` 的规范化器。
3. **门禁盲区**：`audit-core-ability-text` 只审计 `source.kind === "core"` 的条目，
   标签错了就全部放行 —— 与 BUG 1 同样的教训：**不能信任数据层的类别标签**。

## 修复方案（生成器 + 门禁，不手改部署产物）

| 文件 | 变更 |
| --- | --- |
| `tools/lib/core-ability-normalizer.mjs` | 新增 `GENERIC_CORE_TEXT_SIGNATURES`（致命破灭/领袖/深入打击/不知疼痛/斥候/射击甲板 六条《核心规则》原文前缀）与 `matchGenericCoreText`；`normalizeCoreAbilityRules` 与 `auditCoreAbilityText` 对 core 标签**或原文签名命中**的条目一律按通用核心技能处理 |
| `tools/generate-orks-rules.mjs` | ① kind 映射改为 `ability.category || ability.kind || "unique"`；② 接入 `normalizeCoreAbilityRules`；③ **束化放在 `adjudicateRuleCatalog`（PDF 术语重命名）之后**，否则束文本会固化后端旧名（射击甲板11）绕过 PDF 显示名裁决 |
| `docs/rules/identity.js` | `applyCatalog` 新增 `passthrough` 选项：合成条目（core-bundle）跳过身份注册 |
| `docs/rules/orks-identities.js` | passthrough 放行 `core-bundle`（束非来源数据、跨单位重复，注册会冲突） |
| `tools/pdf-priority.test.mjs` | ① 开火口11 断言改为检查名字+束文本；② "identity agreement" 断言束感知（HEAD 上就是挂的陈年断言，束的 englishName 是逗号清单） |
| `tools/orks-rules-regression.test.mjs` | Stealth 断言锚定 core 束（同 BUG 1 中 faction-rules-coverage 的改法） |
| `tools/core-ability-normalizer.test.mjs` | 新增 3 个单测：unique 误标致命破灭被束化、审计抓误标全文、阵营专属能力（正文提到致命破灭但不以原文开头）不受影响 |

## 陷阱记录

- 修复过程中曾用 `git stash` 验证旧版行为，命令被 SIGTERM 打断导致 `.git/refs` 目录
  与 pack 文件丢失（仓库损坏）。已通过 `git fetch origin` 恢复对象、从 reflog 重建
  `refs/heads/main`（d1c764b）。**教训：验证旧版用 `git worktree`，不要 stash 工作区。**
- orks 部署产物在 HEAD 上就与生成器脱节（WAAAGH! 等 PDF 术语是 `apply-patches.mjs`
  的 patch 层产物）；重新生成必须跟 `apply-patches`（build-data 流水线第 2 步），否则
  术语回退、回归测试失败。

## 效果

- 23 个规则包：通用规则全文残留 **0**，核心技能束 831 条；
- 燃烧轰炸机/闪电轰炸机等：`核心技能 = "致命破灭D3"`，专属技能（燃烧炸弹等）原文不受影响；
- FNP/潜行等计算效果全部保留在束的 effects 中；
- `build-data.mjs --check` 全量通过（53/53，含核心技能审计、断言锚点、架构校验）。

## 复验命令

```bash
node tools/audit-core-ability-text.mjs
node --test tools/core-ability-normalizer.test.mjs tools/faction-rules-coverage.test.mjs tools/orks-rules-regression.test.mjs tools/pdf-priority.test.mjs
node tools/build-data.mjs --check
```
