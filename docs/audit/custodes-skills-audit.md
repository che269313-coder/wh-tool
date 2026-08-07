# 帝皇禁军技能审计报告(规则原文 vs 计算实现)

- 审计日期:2026-08-08
- 规则声明:`docs/rules/custodes.js`(人工编写)
- 效果注册表:`docs/rules/effects.js`
- 应用链路:`docs/rules/resolver.js` → `docs/app.js`(resolvedRuleEffects ~1103 行、buildSelectedRoundPayload ~1254 行)→ `docs/engine.js`
- 原文对照:`docs/data/帝皇禁军/数据卡-OCR-可检索.md`(OCR 版,数值处有 OCR 噪音,以语义为准)
- 只读审计,未修改任何项目文件。

## 结论汇总

| 指标 | 数量 |
|---|---|
| 单位总数 | 19 |
| 规则总数(单位规则) | 55 |
| 阵营规则(禁军武艺) | 1 |
| ✅ 一致 | 44(单位)+ 1(阵营) |
| ⚠️ 存疑 | 9 |
| ❌ 偏差 | 3 |

---

## 规则逐条核对表

图例:✅ 一致 / ⚠️ 存疑 / ❌ 偏差。status:支持=计算支持(满足条件时自动结算);显示=已显示,暂不改变本次骰子。

| # | 单位 | 规则 | 原文摘要 | status | 实现(effect) | 结论 | 说明 |
|---|---|---|---|---|---|---|---|
| 1 | 图拉真元帅 | 核心技能:领袖,深入打击,不知疼痛 5+ | 不知疼痛 5+(对所有伤害) | 支持 | fnp threshold 5 → feelNoPain=5 | ⚠️ | 非致命伤害 FNP 5+ 正确;但引擎将致命伤害单独走 feelNoPainMortal(engine.js:496-497),通用 fnp 不写入 feelNoPainMortal,致命伤害(毁灭性伤口)不享受 FNP 5+。此为引擎全局行为,非禁军特有;深渊之女则显式写了 feelNoPainMortal,可见该缺口已被意识到。 |
| 2 | 图拉真元帅 | 禁军元帅 | 攻击时可忽视任意或全部对 BS、WS、命中结果的修正 | 支持 | ignore-hit-modifiers → attack.ignoreHitModifiers,武器组仅丢弃防守方命中修正(app.js:1340) | ⚠️ | 只忽略对方来源的命中修正(迅捷格挡/防守方阵营修正);自身命中修正(如本单位其他规则带来的 ±1)仍生效。原文"任意或全部修正"包含自身修正,且无法做到"选择忽略其中一部分"。实际对禁军影响小,但严格比对有偏差。 |
| 3 | 图拉真元帅 | 时间枷锁 | 近战阶段开始时选一:战斧 A=12;或获得 2+特殊保护 | 支持 | time-lock;mode=axe 且 phase=melee → weaponAttackOverride{守望者战斧,12};mode=invulnerable → defend.invulnerableSave=2 | ✅ | 武器名"守望者战斧"与结构化数据卡(app.js:1335 按名匹配)一致,战斧 A 6→12;invulnerable 经 ruleInvulnerableSave(engine.js:323)取最优保护(2+)。一次性不强制(手动开关),可接受。 |
| 4 | 瓦雷利安连长 | 核心技能:领袖,深入打击,不知疼痛 6+ | 不知疼痛 6+ | 支持 | fnp threshold 6 | ⚠️ | 同 #1:致命伤害不覆盖 FNP 6+。 |
| 5 | 瓦雷利安连长 | 黄金桂冠 | 所领导单位受到的近战攻击 AP 减弱 1 | 支持 | incoming-ap, value -1, phase melee, requiresJoined | ✅ | 攻击方武器组 AP 计算含 defenderRuleEffects.incomingApModifier(app.js:1367),近战阶段限定正确。 |
| 6 | 瓦雷利安连长 | 狮门英杰 | 投一颗命中、造伤、保护之后,可将本次结果改为未修正 6 | 显示 | 无(displayOnly) | ❌ | 缺失实现。该技能直接改变命中/造伤/保护骰结果,属于"本应可计算却未实现"。引擎无"将单骰改为6"模式,无法近似为常驻修正;建议至少提供一次性手动"改为6"开关或标注为未实现。 |
| 7 | 盾卫连长 | 核心技能:领袖,深入打击 | — | 显示 | 无 | ✅ | 移动/领导类,与攻击骰无关。 |
| 8 | 盾卫连长 | 武艺大师 | 一次性,本单位近战时同时生效两种武艺 | 支持 | second-martial-katah, requiresJoined+phase melee;choice 并入 sharedJoinedRules.martialChoices → martialKatah 数组(app.js:1328) | ⚠️ | 逻辑本身正确(第二种武艺正确折算进 sustainedHitsEnabled/lethalHitsEnabled);但 requiresJoined 使单独部署的盾卫连长永远无法使用(原文"本模型所在单位"不含领导条件)。resolver.js:85 无 forceLeader 兜底控件。 |
| 9 | 盾卫连长 | 精熟战略 | 每大回合一次,战略技能 CP 减 1 | 显示 | 无 | ✅ | CP 消耗,非骰子。 |
| 10 | 剑锋冠军 | 核心技能:领袖,深入打击 | — | 显示 | 无 | ✅ | — |
| 11 | 剑锋冠军 | 迅捷冲锋 | 所领导单位可重投冲锋结果 | 显示 | 无 | ✅ | 冲锋移动阶段,非攻击骰。 |
| 12 | 剑锋冠军 | 武艺绝伦 | 一次性,加速后本回合仍可冲锋 | 显示 | 无 | ✅ | 移动/冲锋资格,非攻击骰。 |
| 13 | 终结者盾卫连长 | 核心技能:领袖,深入打击 | — | 显示 | 无 | ✅ | — |
| 14 | 终结者盾卫连长 | 金光战甲 | 一次性,阶段内分配给本模型的攻击 D 变为 1 | 支持 | damage-override value 1 → defend.damageOverride,engine.js:492 覆写伤害 | ✅ | checkbox 控件与原文对应。 |
| 15 | 终结者盾卫连长 | 精熟战略 | 同 #9 | 显示 | 无 | ✅ | — |
| 16 | 摩托盾卫连长 | 核心技能:领袖 | — | 显示 | 无 | ✅ | — |
| 17 | 摩托盾卫连长 | 扫荡进军 | 一次性,近战阶段结束后可撤退或标准移动 | 显示 | 无 | ✅ | 移动类。 |
| 18 | 摩托盾卫连长 | 精熟战略 | 同 #9 | 显示 | 无 | ✅ | — |
| 19 | 禁军盾卫 | 核心技能:深入打击 | — | 显示 | 无 | ✅ | — |
| 20 | 禁军盾卫 | 保持警戒 | 攻击时重投造伤 1;占目标点时重投造伤结果 | 支持 | guard-wound-reroll:woundReroll = onObjective ? failed : ones | ✅ | ones→engine 重投骰面1;failed→重投失败骰(UI 可改骰面,app.js:930-942);onObjective 手动勾选符合"位于你占领的目标点"。 |
| 21 | 禁军盾卫 | 枪林弹雨 | 一次性,射击后再次射击 | 支持 | repeat-ranged(phase=ranged)→ 全部远程武器组×2(app.js:1372) | ✅ | 双倍射击正确;一次性不强制,手动开关。 |
| 22 | 阿拉鲁斯终结者 | 核心技能:深入打击 | — | 显示 | 无 | ✅ | — |
| 23 | 阿拉鲁斯终结者 | 暴君杀手 | 攻击人物/巨兽/载具时重投造伤 | 支持 | elite-wound-reroll → woundReroll=failed(手动勾选 targetElite) | ⚠️ | 重投失败造伤本身正确;但"满足条件自动结算"名不副实——效果未声明 requiresTargetMonsterVehicle,app.js:1116 的自动判定不接线;且即使接线,关键词表(app.js:1112)只含凶兽/巨兽/载具,不含"人物",人物目标永远无法自动识别,只能手动勾选。 |
| 24 | 阿拉鲁斯终结者 | 自金光降下 | 一次性,对手回合结束时入战略预备队 | 显示 | 无 | ✅ | 部署类。 |
| 25 | 禁军守望者 | 核心技能:深入打击 | — | 显示 | 无 | ✅ | — |
| 26 | 禁军守望者 | 坚定意志 | 人物领导时,S>T 的攻击造伤结果 -1 | 支持 | high-strength-wound-minus → defend.incomingWoundWhenStrengthGreater = -1 | ❌ | 该 -1 永不生效:app.js:1342-1344 条件为 `S>=T ? GTE : (S>T ? Greater : 0)`,S>T 时命中第一分支取 GTE(=0),Greater 分支仅在 S<T 时才会评估且恒为假——incomingWoundWhenStrengthGreater 在整个链路(含显示函数 app.js:907-909)均不可达。属死代码。 |
| 27 | 禁军守望者 | 人形要塞 | 一次性,任意阶段开始时可获得 FNP 4+ | 支持 | fnp threshold 4(checkbox) | ✅ | 勾选后 FNP 4+ 自动计入。 |
| 28 | 晨鹰摩托队 | 阵营技能:禁军武艺 | — | 支持 | martial-katah(faction) | ✅ | 通过 isMartialKatahUnit + UI 选择折算(见 #57)。 |
| 29 | 晨鹰摩托队 | 涡轮加速 | 加速无需投掷,M+6 | 显示 | 无 | ✅ | 移动类。 |
| 30 | 晨鹰摩托队 | 炫光击杀 | 一次性,移动后每模型 D6,2+ 造成 2 点致命伤害 | 显示 | 无 | ⚠️ | 会造成伤害但未实现,status 为显示。非武器攻击链(移动触发),引擎无对应通道;按"本应可计算却未实现"严格判定可归 ❌,此处定为 ⚠️ 边界情形,建议后续单独提供伤害源。 |
| 31 | 神圣蔑视者无畏机甲 | 核心技能:致命破灭 1 | 死亡时 D1 致命伤害 | 显示 | 无 | ✅ | 死亡结算,非攻击骰。 |
| 32 | 神圣蔑视者无畏机甲 | 不倒旗帜 | 第一次被消灭时复活,D6 恢复 W | 显示 | 无 | ✅ | 复活机制,非攻击骰。 |
| 33 | 神圣兰德掠袭者坦克 | 核心技能:致命破灭 D6 | 死亡时 D6 致命伤害 | 显示 | 无 | ✅ | 死亡结算。 |
| 34 | 神圣兰德掠袭者坦克 | 突击载具 | 标准移动后脱离单位仍可冲锋 | 显示 | 无 | ✅ | 冲锋类。 |
| 35 | 神圣兰德掠袭者坦克 | 严重损伤 | W 1-5 时命中结果 -1 | 支持 | damaged-hit-minus threshold 5 → hitModifier-1 | ✅ | remainingWounds≤5 时自动 -1;依赖军表/输入提供剩余血量(未提供时默认 999 不触发,安全)。 |
| 36 | 灭魔教团百夫长 | 核心技能:领袖,斥候 6 | — | 显示 | 无 | ✅ | 移动/领导类。 |
| 37 | 灭魔教团百夫长 | 追踪本能 | 所领导单位 M+2,加速/冲锋 +2 | 显示 | 无 | ✅ | 移动类。 |
| 38 | 灭魔教团百夫长 | 深渊之女 | 对抗灵能攻击和致命伤害时 FNP 3+ | 支持 | deep-daughter:feelNoPainMortal=3(恒定);psychic 勾选时 feelNoPain=3 | ✅ | 致命伤害恒定 3+;灵能普通伤害经勾选生效。 |
| 39 | 灭魔教团百夫长 | 追杀殆尽 | 接战单位撤退须绝望检定 | 显示 | 无 | ✅ | 撤退检定,非攻击骰。 |
| 40 | 艾雷雅 | 核心技能:领袖,斥候 6,不知疼痛 5+ | — | 支持 | fnp threshold 5 | ⚠️ | 同 #1(致命伤害不覆盖)。 |
| 41 | 艾雷雅 | 战术洞察 | 所领导单位获得先攻 | 显示 | 无 | ✅ | 战斗顺序,非攻击骰。 |
| 42 | 艾雷雅 | 深渊之女 | 对抗灵能攻击和致命伤害时 FNP 3+ | 支持 | deep-daughter:feelNoPain=Math.max(feelNoPain,3) | ❌ | 艾雷雅基础 FNP 5+(#40)与深渊之女 3+ 经 Math.max 取更差值:Math.max(5,3)=5。对抗灵能普通伤害时实际按 5+ 结算,原文应为 3+。百夫长/控诉者/戒卫者/警戒者/猎巫者/犀牛无基础 FNP 不受影响;致命伤害路径(feelNoPainMortal=3)不受影响。 |
| 43 | 艾雷雅 | 坚毅灵魂 | 低于起始数量命中+1;低于半数造伤也+1 | 支持 | under-strength-bonuses:underStartingStrength→hit+1;belowHalf→wound+1 | ⚠️ | 数值与阶段判定正确;但控件标签"本次启用此技能"(forceLeader)未对应原文"本模型所领导的单位"条件,需手动勾选代理,单独部署时原规则本不生效却可通过勾选强行启用。 |
| 44 | 控诉者 | 净化处决 | 射击灵能者单位时视为拥有精准和毁灭伤害 | 支持 | anti-psyker-weapons:targetPsychic 勾选 → attack.devastating=true | ⚠️ | 毁灭伤害已实现;【精准】无任何实现(引擎无目标分配机制);且效果无 phase 限制,近战模式下勾选也会错误生效(原文限定射击)。 |
| 45 | 控诉者 | 深渊之女 | 同 #38 | 支持 | deep-daughter | ✅ | 无基础 FNP,3+ 正确。 |
| 46 | 戒卫者 | 迅捷格挡 | 对本单位模型的近战攻击命中 -1 | 支持 | incoming-melee-hit-minus(phase=melee)→ incomingHitModifier-1 | ✅ | 攻击方命中计算含 defenderRuleEffects.incomingHitModifier(app.js:1340)。 |
| 47 | 戒卫者 | 深渊之女 | 同 #38 | 支持 | deep-daughter | ✅ | — |
| 48 | 警戒者 | 迅捷格挡 | 同 #46 | 支持 | incoming-melee-hit-minus | ✅ | — |
| 49 | 警戒者 | 深渊之女 | 同 #38 | 支持 | deep-daughter | ✅ | — |
| 50 | 猎巫者 | 核心技能:斥候 6 | — | 显示 | 无 | ✅ | — |
| 51 | 猎巫者 | 制裁烈焰 | 射击后目标须震慑测试 | 显示 | 无 | ✅ | 震慑检定,非攻击骰。 |
| 52 | 猎巫者 | 深渊之女 | 同 #38 | 支持 | deep-daughter | ✅ | — |
| 53 | 灭魔教团犀牛装甲车 | 核心技能:致命破灭 D3,开火口 2 | — | 显示 | 无 | ✅ | 死亡结算/运输。 |
| 54 | 灭魔教团犀牛装甲车 | 自行修理 | 指挥阶段结束恢复 1 W | 显示 | 无 | ✅ | 回血,非攻击骰。 |
| 55 | 灭魔教团犀牛装甲车 | 深渊之女 | 同 #38 | 支持 | deep-daughter | ✅ | — |
| 56 | (阵营) | 禁军武艺 | 近战选择连击 1 或致命一击 | 支持 | martial-katah(factionRules)+ UI martialKatah 选择;weaponEffectsFromKeywords(app.js:2101-2114)sustainedHitsEnabled/lethalHitsEnabled 折算 | ✅ | 攻击方选择"连击 1"→ sustainedHitsEnabled(sustainedHitsValue="1");"致命一击"→ lethalHitsEnabled;仅近战模式(hasMartialKatah 检查 attackMode);anathema psykana 单位正确排除(isMartialKatahUnit)。武艺大师第二选择也经 martialChoices 并入。 |

---

## ❌ 偏差完整清单

### ❌1. 坚定意志(禁军守望者)—— 造伤 -1 永不生效(死代码)
- 原文: 坚定意志:当人物领导本单位时,对本单位的攻击如果 S 大于本单位的 T 值,则造伤结果减 1
- 声明: custodes.js:60 `{ type: "high-strength-wound-minus", requiresJoined: true }`
- 实现: effects.js:45 `defend.incomingWoundWhenStrengthGreater = -1`
- 链路缺陷: app.js:1342-1344(武器组)与 app.js:907-909(显示)均为:
  ```js
  const conditionalWoundModifier = effectiveStrength >= toughness
    ? defenderRuleEffects.incomingWoundWhenStrengthGreaterOrEqual   // S>T 时命中此分支 = 0
    : (effectiveStrength > toughness ? defenderRuleEffects.incomingWoundWhenStrengthGreater : 0);
  ```
  S>T 时取 GTE 分支(GTE=0);内层 Greater 分支仅在 S<T 时评估且恒为假 → `incomingWoundWhenStrengthGreater` 整个链路不可达,-1 永不生效。
- 修正方向: 条件应为 `S>T ? Greater : (S>=T ? GTE : 0)`(或直接 `S>T ? Greater : 0`,GTE 单独处理)。

### ❌2. 深渊之女(艾雷雅)—— 灵能攻击按 5+ 而非 3+ 结算
- 原文: 深渊之女:本模型在对抗【灵能】攻击和致命伤害时算作拥有【不知疼痛 3+】
- 声明: custodes.js:86 `{ type: "deep-daughter" }`(艾雷雅另有基础 FNP 5+,custodes.js:84)
- 实现: effects.js:48-51 `defend.feelNoPainMortal = Math.max(...,3); if (psychic) defend.feelNoPain = Math.max(feelNoPain, 3);`
- 缺陷: 艾雷雅基础 FNP 5+ 先写入 feelNoPain=5,深渊之女再用 Math.max(5,3)=5 取更差值 → 对抗灵能普通伤害时按 5+ 而非规则的 3+。同单位技能应覆盖基础技能(取更好值),此处取反。
- 受影响范围: 仅艾雷雅(其余 6 个深渊之女单位无基础 FNP);致命伤害路径(feelNoPainMortal=3)不受影响。

### ❌3. 狮门英杰(瓦雷利安连长)—— 影响骰子却未实现
- 原文: 狮门英杰:一次性技能,本模型投掷一颗命中、造伤、保护之后,可以将本次结果改为未修正的 6
- 声明: custodes.js:26,status=已显示,暂不改变本次骰子,无 effect
- 缺陷: 该技能直接影响命中/造伤/保护三枚骰子,属"本应可计算却未实现"。引擎无"单次将某骰改为 6"通道,全代码库无任何近似处理。
- 修正方向: 至少在计算器 UI 提供一次性开关并把该次对应骰设为 6(或按每模型一次近似),否则应明确标注未实现。

---

## ⚠️ 存疑清单(供人工复核)

| 规则 | 疑点 |
|---|---|
| 不知疼痛 5+/6+(图拉真/瓦雷利安/艾雷雅核心) | 引擎将致命伤害 FNP 分离(feelNoPainMortal),通用 fnp 效果不写该字段 → 致命伤害不享受 FNP。引擎全局行为,非禁军特有,但深渊之女显式处理了致命伤害,存在不一致。 |
| 禁军元帅(图拉真) | 只忽略防守方来源命中修正,自身修正仍生效;无法"选择忽略部分"。 |
| 武艺大师(盾卫连长) | requiresJoined 阻止单独部署时使用;原文无领导条件。 |
| 暴君杀手(阿拉鲁斯) | 自动判定未接线(未声明 requiresTargetMonsterVehicle,app.js:1116 不触发);关键词表不含"人物",人物目标永远需手动勾选。 |
| 炫光击杀(晨鹰摩托队) | 造成致命伤害但 status=显示未实现;非武器攻击链,严格按审计口径可归 ❌。 |
| 坚毅灵魂(艾雷雅) | forceLeader 控件标签"本次启用此技能"与原文"所领导的单位"条件不对应,单独部署时可强行启用。 |
| 净化处决(控诉者) | 精准未实现(引擎无分配机制);毁灭伤害无 phase 限制,近战模式下勾选会错误生效。 |

---

## 特别核查项(任务指定)结论

- 禁军武艺 → sustainedHitsEnabled/lethalHitsEnabled:✅ 正确折算(含武艺大师第二选择)。
- 时间枷锁:✅ 战斧 A=12(按武器名匹配)与 2+特殊保护均正确。
- 坚定意志(S>T 造伤-1):❌ 链路条件反转,-1 永不生效(见 ❌1)。
- 深渊之女(灵能+致命伤害 FNP 3+):⚠️ 致命伤害路径正确;艾雷雅因基础 FNP 5+ 被 Math.max 取反(见 ❌2)。
- 枪林弹雨:✅ 远程武器组整体×2。
- 暴君杀手:⚠️ 重投逻辑正确,但人物目标无自动判定,需手动勾选。

## 备注

- 规则总数 55 = 单位规则;另有 1 条阵营规则(禁军武艺)。
- 晨鹰摩托队在 unitRules 中自带 vertus-katah,与阵营 martial-katah 在 UI 上可能重复显示(纯展示重复,不影响骰子)。
- 一次性技能(时间枷锁/武艺大师/金光战甲/枪林弹雨/人形要塞等)均依赖手动开关模拟"每场一次",不做强制;人工审查时可接受。
