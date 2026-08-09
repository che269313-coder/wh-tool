# 分遣队规则实现 Quality Gate

检查日期：2026-08-09
实施计划：`docs/plans/detachment-rules-implementation-plan.md`

## 愿景覆盖

| 原始需求 | 状态 | 证据 |
| --- | --- | --- |
| 帝皇禁军、星际战士、死亡守卫分遣队先接入 | 通过 | 10 / 24 / 10，共 44 个分遣队；222 条计谋、153 个增强均进入生成目录 |
| 未导入军表时默认不开启 | 通过 | 独立数据卡草稿初始化 `detachmentIds: []` |
| 导入军表后预设分遣队与人物增强 | 通过 | `roster-context.js` 解析军表头；单位保存稳定 `enhancementId`；两份示例军表均回归为 2 个分遣队、3DP |
| 玩家可换分遣队、重分配增强 | 通过 | 计算页零/多选分遣队、DP 合计和单位增强选择器；变更同步到同一军表实例的全部计算草稿 |
| 同阵营内战、同名单位不串状态 | 通过 | 搜索框同时列出两份军表并标明来源；草稿键包含计算方、军表实例 ID、单位 ID |
| 分遣队规则不同也不能按名称耦合 | 通过 | 核心层无三阵营名/分遣队名；行为只读取稳定 ID、controls、effect.type |
| 完整规则可查阅，能准确计算的 buff 才进骰子 | 通过 | 全部 419 个规则项保留原文；140 个规则项声明 192 个公共 effects；其余显示为仅供查阅 |
| 联合单位不重复叠加 | 通过 | 分遣队/计谋只归约一次；增强用 `effectScope: owner|unit` 分层；静态门禁检查装配入口 |
| 增强只能分配给角色 | 通过 | 护卫不生成增强槽；多个角色按军表成员 ID 分别取值，同名角色也不会共享持有者增强 |
| 分遣队与结果区排版 | 通过 | 分遣队外层默认折叠；模拟结果与分布图紧跟 1,000 次模拟按钮并位于长规则详情之前 |
| 单队资料与生成物隔离 | 通过 | 三队原文归入各自资料目录；三个分遣队包物理分离，`--faction=space-marines` 哈希验证未改写另外两队 |
| 缺英文标题可暂译并集中复核 | 通过 | 341 个源文件英文身份、78 个暂译身份、0 个 unresolved；无数组序号 ID；清单见 `detachment-id-review.md` |
| 后来者能按文档添加新队伍 | 通过 | `项目架构.md`、`资料提取.md`、`审核机制.md`、`README.md` 明确分遣队单队生成、隔离、TDD 与回归流程 |

## 验证证据

以下命令在 `C:\Users\che26\Desktop\wh-tool-team-rule-decoupling` 本次实际执行并返回 0：

- `node tools/generate-detachment-rules.mjs`，并用 `--faction=space-marines` 及 SHA-256 前后比较确认单队生成不会改写帝皇禁军或死亡守卫。
- `node tools/validate-datasheets.mjs`
- `node tools/validate-rules.mjs`
- `node tools/validate-detachments.mjs`
- `node tools/validate-combat.mjs`
- `node tools/validate-architecture.mjs`
- `node tools/validate-40k-app.mjs`
- `docs/app.js` 与 `docs/engine.js` 执行 `node --check`。
- 核心文件阵营/分遣队名称扫描无命中；`git diff --check` 无错误；根目录媒体/PDF/设计文件扫描无命中。

## 前端与设计稿

- `designs/**/*.pen`：无匹配设计稿，因此没有设计稿对照基线。
- 已添加响应式布局规则，窄屏下分遣队与增强控件退化为单列。
- 在当前 worktree 的 `http://127.0.0.1:4177/` 实际打开计算页：结果区位于按钮下方；分遣队 `open` 属性为空；“禁军盾卫”启用分遣队后增强选择器数量为 0，“盾卫连长”为 1；控制台错误为 0。

## Git 状态

按用户要求，本轮没有 stage、commit、push 或创建 PR。远端状态未改变。
