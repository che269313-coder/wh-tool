# 重构分支全量审核报告（codex/team-rule-decoupling）

- 审核日期: 2026-08-10
- 审核对象: `C:\Users\che26\Desktop\wh-tool-team-rule-decoupling`（分支 codex/team-rule-decoupling，基于 main 6c3b7c4，未合入）
- 审核方式: 8 个并行 subagent（只读，未修改任何项目文件）：
  1. 架构模块与契约审核
  2. 效果链路接线一致性审核
  3. 载荷 schema 与引擎一致性审核（含确定性 RNG 行为对比）
  4. 词条字典覆盖与外部计算器对比
  5. 星际战士数据卡 + 身份映射核对
  6. 死亡守卫/禁军数据卡 + 身份映射核对
  7. 星际战士技能实现核对
  8. 死亡守卫/禁军技能实现核对
- 基线: `validate-rules / validate-combat / validate-datasheets / validate-architecture / validate-40k-app` 全部 EXIT=0
- 详细分报告: 各 subagent 工作目录（临时目录 audit-refactor/）

---

## 总体结论

重构方向正确、契约大部分收敛（34 种效果类型全接线、schema/引擎 0 字段差异、0 行为差异、数据层零改动、上一轮修复 0 失效），**但发现 2 个重构引入的回归（阻断合入）**，另有 5 个重构未覆盖/新暴露的缺口建议修复后合入。

---

## 一、❌ 重构引入的回归（必须修复才能合入）

### R1. 单位级造伤修正双计（app.js:1264 + 1298）

`sharedJoinedRules.woundModifier` 已包含当前单位全部来源之和，每武器组结算时又加一遍 `sourceRules.woundModifier` → 单单位造伤 +1 被算成 +2，联合单位更大。

- 实测：坎托战团长·战至最后 + belowHalf，`resolveUnit` 得 1，装配公式得 **2**（main 为 1）；艾雷雅·坚毅灵魂 belowHalf 实测 main 造伤 3+、分支 2+
- 影响面（rules 中 8 处 wound-modifier）：战至最后、牧师·战斗之仪、高举旗帜、艾雷雅·坚毅灵魂、死亡守卫坦克猎手/疫病恶意等
- 为什么校验全绿：validate-* 只测 resolver 层单次值，不测 app.js 装配公式（校验盲区）
- 修复方向（供参考）：app.js:1298 去掉 `sourceRules.woundModifier` 项，或 sharedJoinedRules 只归约 requiresJoined 规则

### R2. 枪林弹雨相位门丢失（effects.js:65）

repeat-ranged 重构后未声明 `phase: "ranged"`，近战模式下勾选后近战武器组也被翻倍（实测 melee 下 repeatRanged=true）。

---

## 二、❌ 重构未覆盖 / 新暴露的缺口（建议修复后合入）

### G1. 先遣者摩托小队·雷霆冲撞 漏实现

原文"近战攻击且本回合冲锋后 S 和 D 都+1"直接影响骰子，却标记"已显示"无 effects。生成器 S+1 正则只匹配"近战武器S+1"，未覆盖"S和D都+1"。（该单位是上轮修复中刚纳入规则目录的单位，属新暴露）

### G2. 词条「毁灭伤 害」词内空格变体漏识别

肃卫老兵爆弹步枪 abilities 含词内空格变体，字典未覆盖 → 丢毁灭伤害。属历史 bug 类未闭合（上一轮"结 果/疼 痛"空格修复未覆盖词内）。

### G3. 身份生成器短路缺陷（generate-faction-identities.mjs）

`if (!englishName)` 的 slug 回退分支在译文名已命中时永不执行 →
- D1（阻断级）：deathshroud-terminators 官方能力 "Death Approaches" 与 JS 译文 "Death Descends" 名称+状态双不一致，官方条目从未映射；
- D2/D3：plague-marines "Infused…"、deathshroud "Silent Bodyguard" 缓存为 official、JS 标 translated。
- 重新运行生成器无法自愈，需先修生成器逻辑或手工补映射。

### G4. hit-critical-threshold 双写 attack/defend 两侧（存量，重构保留）

effects.js 中该 case 同时写 attack 与 defend 桶，app.js 消费 defend 侧 —— 当瘟疫军医·感染激化 / 生物腐化者·腐化灌注作为**防守方**且勾选控件时，敌方攻击者的暴击阈值被错误降到 5+/4+。方向错误（上一轮引入，本轮重构未改，建议随重构修复：改为仅 attack 侧或消费端区分方向）。

### G5. phase 限定丢失 ×6（历史 bug 类复现）

剧毒光环（近战也获造伤重投）、炽烈连射（近战武器也 S/AP+1）、坦克猎手（近战也命中/造伤+1）、感染激化（远程也按 5+/4+ 暴击）、净化处决（近战勾选也生效）、时间枷锁特殊保护项（远程模式 2++ 也生效）。均缺 phase 字段。

---

## 三、❌ 存量数据问题（非重构引入，建议独立排期）

| # | 位置 | 问题 |
|---|---|---|
| D1 | P90/91/92 等离子手枪 ×6 | AP 错（0/1 应为 -2/-3），旧审计漏报，直接改结算 |
| D2 | P96 地狱轰击者小队 | 武器表仅 2 条，PDF 共 6 条（5 缺 1 错配） |
| D3 | P80/P111/P137/P149 ×4 卡 | 近战武器整表缺失 |
| D4 | P47 / P64 / P150 / P132 | 残余水印"尽可战能"、尾部"2 5"、正文"2与5"、abilities 数字前缀"3" |
| D5 | P87 裁决士 | invulnerableSave=0 未修（近战限定型，需阶段条件豁免机制） |
| D6 | P53 奥特拉马守护者 | 凡人属性行未提取、折射力场推测值、装备空 |

---

## 四、⚠️ 存疑项汇总

**架构层**
- custodes-identities.js 手写 apply 与 identity.applyCatalog 重复实现；禁军不在身份生成器管线内，新增禁军规则不手改映射会运行时 throw（custodes.js:120 无 `?.` 兜底）
- resolver.isFaction 死导出；identity.audit 与审计生成器重复过滤；oath 规则 legacyIds 自引用（465 条中 1 条）；死样式 .calculator-oath-*
- 规划偏差：词典断言落在 validate-architecture 而非 validate-rules；validate-effects.mjs 未独立成文件
- 校验盲区：不测 app 装配公式（R1 漏网根因）、不测身份缓存一致性（G3 漏网根因）

**身份层**
- 禁军 4 条 official 无缓存证据/弯引号编码（trajan-core FNP5+、vertus-katah 武艺、valerian/centura 弯引号）
- 瓦雷利安连长缺「盾卫连长」关键词
- 神鸟反重力坦克：无规则/无身份/无缓存，PDF 不存在（已知例外）

**词条层**
- 洪流（torrent 官方译名）不在字典，靠 skill="torrent" 兜底；torrent 字典项为死代码（解析层不消费）
- 工具链仍存平行正则未迁移（生成器未消费词典，规划阶段 1 未完成）
- 速射/热熔/一次性/额外攻击 4 类词条双缺（main 也无 payload 字段，非回归）

**技能层（存量 ⚠️，非本次引入）**
- 剑卫特殊保护重投未接线、灵能头冠/地狱火头冠灵能限定过度应用 ×4、目标歼灭/烈火教典/先锋突击缺阶段限定、破坏者 AP 无 phase、哨兵协议可控件化未实现、长者智慧光环误用风险等

---

## 五、✅ 通过项（保持验证）

| 维度 | 结果 |
|---|---|
| payload-schema vs engine | 0 字段差异（34 武器 + 18 防御）；8 场景 × 16+ 均值，确定性 mulberry32 RNG 下 **MAX_ABS_DIFF=0**（含截断/特殊保护/torrent/连击+致命/反步兵/saveBonusVsDamage1/伤害重投） |
| 效果接线 | 34/34 type 全接线（schema ↔ effects.js ↔ app.js ↔ engine），damage-reroll 历史漏接线已修复 |
| 词条 vs 外部计算器 | 12/12 场景与 Wathammer 一致（\|Δ\|≤0.06）；反X N+ 映射修正（main 写错字段在连击1+反步兵4+下虚高 +39%，字典已修正并与外部一致） |
| 数据层 | SM/DG/CU JSON 与 main 分支 SHA-256 一致（零改动、零新错误） |
| 身份映射 | SM 101 / DG 36 / CU 19 三集合差集全 0；改名链路（百骑长/阿拉琉斯/警戒者/泰丰斯→泰弗斯）全链一致；SM 116 + DG 48 official 声明 100% 命中缓存；rule-id-review 数字与文件一致 |
| 上一轮修复项 | 失效 0（SM 20 项 + DG 15 项 + CU 5 项逐项确认保持） |
| 新 bug 报告 | agathon-melee-wound-reroll 已修复闭环（重拳出击 phase melee + requiresJoined，断言在案） |
| 校验器 | validate-rules / combat / datasheets / architecture / 40k-app 全部 EXIT=0 |
| 历史 bug | 水印（除 D4 残留）、杂散数字（除 D4）、特殊保护污染、关键词缺失、重复卡、torrent 未识别、反X未解析 大部分未复现 |

---

## 六、合入前检查清单

1. ☐ 修复 R1（woundModifier 双计）并补"载荷装配公式"回归断言（新增 validate-architecture 或 harness 测试 app 装配）
2. ☐ 修复 R2（repeat-ranged 补 phase: "ranged"）并补断言
3. ☐ 建议修复 G1（雷霆冲撞）/ G2（毁灭伤 害 变体）/ G3（身份生成器短路）
4. ☐ 建议随重构修复 G4（hit-critical-threshold 方向）、G5（6 处 phase）
5. ☐ 存量数据问题 D1-D6 单独排期（不阻塞合入，但与重构无冲突）
6. ☐ 合入后按 docs/审核机制.md 跑一次轻量审核（引擎改动必跑词条 vs 外部）

---

*本报告由 8 个并行审计 subagent 汇总，各维度详细表格见分报告；未修改重构分支任何文件。*
