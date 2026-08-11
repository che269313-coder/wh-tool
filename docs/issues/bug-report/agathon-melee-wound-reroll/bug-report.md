# Bug 诊断胶囊：重拳出击错误影响远程武器

| 栏位 | 内容 |
| --- | --- |
| 1. 现象 | “重拳出击”原文限定近战攻击；实际生成的 `wound-reroll` 没有阶段字段，远程攻击也获得造伤重投。 |
| 2. 证据 | `docs/rules/space-marines.js` 中阿加通连长规则缺少 `phase: "melee"`；生成器只识别“近战阶段”。 |
| 3. 根因 | `generate-space-marine-rules.mjs` 的 `add` 仅通过 `/近战阶段/` 推断阶段，没有覆盖“近战攻击/近战武器”等同义语义。 |
| 4. 诊断策略 | 在真实规则目录上分别以 melee/ranged context 调用 resolver，比较 `attack.woundReroll`。 |
| 5. 超时策略 | 若通用阶段推断导致其他规则回归，枚举生成结果差异并缩小到攻击类效果。 |
| 6. 预警策略 | 如果修复需要匹配单位名或技能名，说明方向错误，必须回到语义阶段推断。 |
| 7. 用户可见修正 | 阿加通连长领导单位的近战武器继续获得造伤重投，远程武器不再显示或结算该重投。 |
| 8. 验收 | `validate-rules.mjs` 断言规则含 `phase: "melee"`，melee 解析为 failed reroll，ranged 解析为 null；随后运行全部验证器。 |
