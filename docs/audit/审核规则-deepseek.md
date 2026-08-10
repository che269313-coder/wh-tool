# 审核规则 · DeepSeek 版（面向当前架构）

> 作者：deepseek-v4-flash（主审核员）
> 日期：2026-08-10
> 对象：`C:\Users\che26\Desktop\wh-tool`（main，HEAD e2baef7，含 25 阵营 / 24 分遣队 / 惰性加载）
> 目的：① 针对**当前架构与数据格局**定义审核规则；② 评估已有审核记录（`refactor-full-review.md`、`refactor-full-review-resolution.md`、`detachment-rules-quality-gate.md`）的覆盖盲区；③ 给出"是否重新大批量审核"的判断与方案。
> 本文不覆盖、不否定已有报告，只作为 DeepSeek 视角的独立规则文档。

---

## 一、当前架构与数据格局（审核基准）

### 1.1 分层（按 `docs/项目架构.md` + 代码实证）

```
docs/data/<阵营>/        原始数据（PDF 提取 / 40k11e API 转换 / 网站数据）
   └─ *.json + 可检索 .md + 原始 API 存档
docs/catalogs/<阵营>.js   计算器目录（API 转换产物，含 abilitiesEn/englishName/原始字段）
docs/rules/factions/<阵营>.js   单位规则（生成/手写）
docs/rules/detachments/<阵营>.js 分遣队规则 + 强化
docs/rules/{faction,detachment}-registry.js 注册表（稳定 id / 别名 / 标签）
docs/rules/{identity,*-identities}.js     稳定 ID ↔ 40k.app 英文名
docs/rules/{effect-schema,effects,resolver}.js 效果契约层
docs/rules/{payload-schema,combat-state}.js     载荷/状态折算
docs/rules/{keyword-dictionary,factions,faction-runtime-loader}.js 词条字典/阵营加载
docs/engine.js            骰子引擎（纯函数）
docs/app.js               装配 + UI（懒加载运行时）
```

### 1.2 数据源矩阵（审核的"对照源"不再只有 PDF）

| 数据源 | 阵营 | 风险特征 |
|---|---|---|
| PDF 文本层 | 星际战士/死亡守卫/帝皇禁军 | 水印/换行/表格错位（已多轮审计，历史 bug 清单完备） |
| 40k11e 后端 API | 欧克蛮族 等新阵营 | **转换管线质量未知**：英文名/abilitiesEn/关键词翻译、字段映射、记录完整性 |
| 网站规则生成 | 其余阵营（generate-website-rules.mjs） | 同上，且无原始 PDF 可对照，只能对照 API 存档/英文原文 |
| 用户提供 | 污染者 等 | 已知例外，人工裁定 |

### 1.3 规模

- 25 个阵营数据目录、25 个 factions 规则、24 个 detachments 规则、25 个 catalog 文件
- 引擎/契约层不变：34 种 effect.type、payload schema、keyword dictionary
- 新机制：effectScope(owner/unit)、分遣队强化、惰性运行时加载、稳定 ID 体系

### 1.4 初步抽查（欧克蛮族 catalog，用于必要性判断）

- `englishName` 出现损坏字符：`Psyko?gatler`、`Two?handed big choppa`（“?”为编码损坏，官方英文名不可信）
- 关键词中英混杂：`斗堡垒`（Battlewagon 错译）、`Frame`、`Mounted`、`Warboss`、`Beast Snagga` —— 会影响反X目标匹配与搜索
- abilities 状态普遍为"原文照录"（`status: 原文照录`），**尚未结构化**：Waaagh!、压制（Indiscriminate Detonations）、Cleave 1、5+无敌豁免(InSv) 等新机制是否进入效果契约未知
- 记录完整性：catalog 的 id 前缀不统一（`orks.entry.*`/`orks.bigboss.*`/`orks.bannernob.*`/`orks.wartrakk.*`），需要核对源存档记录数 vs catalog 条目数

**以上意味着：新阵营的"数据→catalog→规则"链路从未被系统审核过，这是当前最大的未知区。**

---

## 二、审核维度（面向新架构，7+3 组）

### A. 数据源转换链路（新，最高优先）

| 维度 | 对象 | 方法 | 对照源 |
|---|---|---|---|
| A1 API→catalog 转换 | `tools/convert-faction-api.mjs`、`extract-orks.mjs`、各 catalog 文件 | 字段映射逐项核对（unit/weapons/abilities/keywords/points/composition）；英文名与 abilitiesEn 的损坏与错译清单；源存档记录数 vs catalog 条目数 | `docs/data/<阵营>/*-网站原始数据.json` + 40k11e 接口 |
| A2 catalog→factions 规则生成 | `generate-orks-rules.mjs`、`generate-website-rules.mjs`、`docs/rules/factions/*.js` | 每个单位每条技能：原文 vs effects/status（沿用原技能审计方法）；"原文照录"但本应可计算的技能清单 | catalog abilities 原文 + 英文 abilitiesEn 交叉验证 |
| A3 分遣队规则 | `docs/rules/detachments/*.js`、`validate-detachments.mjs` | 分遣队规则/强化：原文 vs effects；effectScope(owner/unit) 语义；强化选择控件 | 网站分遣队数据 + 英文原文 |

### B. 契约层回归（原有维度延续）

| 维度 | 对象 | 重点 |
|---|---|---|
| B1 效果接线 | effect-schema vs effects.js vs app.js vs engine | 34 种 type 逐一核对消费点（上次发现 damage-reroll 漏接线/双计/相位门，均需复检新代码） |
| B2 payload/引擎 | payload-schema vs engine.js 默认值 vs app.js 装配 | 确定性 RNG 对比 main 行为；新字段（effectScope 折算、增强效果、owner 边界）是否进 payload |
| B3 词条字典 | keyword-dictionary.js vs 全阵营武器 abilities | **新词条**：Cleave 1、压制状态、InSv(5+无敌豁免)、Waaagh!、额外攻击 等是否入字典；词内空格/变体漏识别复检 |
| B4 身份/ID | identity.js + 各阵营 identities + 40k.app 缓存 | 新阵营 ID 与英文名映射、损坏英文名对 slug 的影响、official/translated 状态 |
| B5 运行时 | faction-runtime-loader.js、catalog-registry.js、惰性加载 | 只选某阵营时是否正确加载/不加载；军表含多阵营时的边界；localStorage 兼容 |

### C. 回归与功能（每次必做）

| 维度 | 内容 |
|---|---|
| C1 历史 bug 复查 | 水印/杂散数字/特殊保护污染/torrent/反X/多实现/漏实现/双计/相位门 —— 全部逐项确认未复现 |
| C2 旧阵营保持 | SM/DG/CU 上一轮 40 项修复逐项保持（已有 validate 断言，仍需抽查） |
| C3 外部对比 | 抽样 12-15 场景（含新词条 Cleave/压制/InSv 的近似实现）vs Wathammer |
| C4 功能行为 | 分遣队选择、强化装备、懒加载切换、直方图显示等 UI 流 |

---

## 三、已有审核记录的覆盖评估（另一个 AI 的报告）

`refactor-full-review-resolution.md` 的定位是**"确认+修复记录"**：它确认了 R1/R2/G1-G5 的修复并补了更多修复（通用 FNP、武艺大师、扭颅疫病、灵能头冠、weapon-attack-modifier、剑卫二选一、已感染光环、D1-D6 数据、阵营关键词、通用词条），并运行了 validate 全家桶。

**覆盖盲区（本文判定）：**

1. **新阵营链路零审核**：resolution 报告针对的是"重构 + 旧阵营数据"，对 25 个新阵营的 API→catalog→factions→detachments 链路没有逐单位审核。A1/A2/A3 维度全部未覆盖。
2. **转换质量未审**：欧克 catalog 的英文名损坏（`Psyko?gatler`）、错译关键词（`斗堡垒`）说明 A1 维度存在真实问题，resolution 未触及。
3. **新词条未覆盖**：Cleave/压制/InSv/Waaagh! 等新机制在 B3 维度无记录。
4. **懒加载运行时**（B5）无专门审核记录（虽有 catalog-lazy-loading.test.mjs 测试，但未审测试覆盖面）。
5. 校验器全绿**不能**证明正确性：validate-* 的断言是重构者自己写的，覆盖的是"已实现部分"；对"未实现但本应实现"（如 status=原文照录 的可计算技能）无感知 —— 这正是原 7 维度 subagent 人工审计的价值所在。

**结论：resolution 报告可信地确认了"重构没有破坏旧功能"，但没有回答"新功能/新数据是否正确"。**

---

## 四、是否需要重新大批量审核：判断

**需要，但不是全量重跑旧 7 维度。** 建议按风险分层：

| 优先级 | 范围 | 原因 |
|---|---|---|
| P0（建议立即） | A1+A2：25 个新阵营的 catalog 转换质量 + factions 规则生成质量（每阵营 1 个 subagent，或按 4-5 阵营/agent 分组） | 数据正确性的最大未知区；欧克已发现英文名损坏/错译 |
| P0 | B3：词条字典对新阵营全部武器词条的覆盖 | 新机制（Cleave/压制/InSv）直接决定骰子结果 |
| P1 | A3：分遣队规则与强化（已有 quality-gate 报告，复核其覆盖） | 新功能，直接影响对局 |
| P1 | B1/B2：契约层对新增字段（effectScope/增强）的接线回归 | 上次双计/相位门证明装配层易漏 |
| P2 | B4/B5/C4：身份/懒加载/UI 流 | 有测试与 gate，抽查即可 |
| P2 | C1-C3 回归 | 依赖 P0 结果；C3 仅引擎改动时必跑 |

**不建议**：对 SM/DG/CU 三个老阵营重新做全量 PDF 数据核对（已多轮审计，边际收益低；除非 P0 暴露契约层问题才回查）。

---

## 五、建议执行方案（若批准）

1. **P0-A1/A2**：例化 **6 个并行 subagent**，按阵营分组（欧克/机械修会/灵族/帝国卫队/混沌/泰伦 等 4-5 阵营一组），每组分两步：
   - 转换质量：源存档 JSON ↔ catalog 逐字段抽查（英文名损坏/错译/记录数）
   - 技能实现：每单位每条技能原文 vs effects/status，输出 ✅/⚠️/❌ 表（沿用既有模板）
2. **P0-B3**：1 个 subagent 全阵营武器词条枚举 vs keyword-dictionary 覆盖表（含新词条）
3. **P1**：detachments 1 个 subagent；契约接线 1 个 subagent（对照 resolution 新增字段）
4. 汇总输出单份报告（含 ❌ 清单分级），用户逐条审查后再修。

预计 subagent 数：**8-9 个**，全部只读。

---

## 六、附：审核规则速查（新阵营入伙模板）

新阵营合入前，P0 三件必须过：
1. `reconcile` 类对账：源存档 ↔ catalog 零字段级差异（英文名无损坏字符、记录数一致）
2. 技能覆盖率：无"本应可计算却原文照录"的技能（或清单已人工确认）
3. 词条字典：该阵营全部武器 abilities ⊆ 字典 ∪ 已登记"范围外"清单
