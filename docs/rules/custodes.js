/*
 * 帝皇禁军的数据卡规则。
 *
 * 这里刻意只存放规则文字、分类和机器可读的效果描述；骰子引擎不直接
 * 依赖任何阵营或单位名称。新增阵营 / 分遣队时，按同一结构增加数据即可。
 */
(function (root) {
  const supported = "计算支持（满足条件时自动结算）";
  const displayOnly = "已显示，暂不改变本次骰子";
  const common = (id, text, effect) => ({ id: `custodes-${id}`, name: String(text).split(/[：:。]/)[0], text, status: effect ? supported : displayOnly, effect });
  const unit = (name, rules) => [name, rules];

  const factionRules = [
    {
      id: "custodes-martial-katah",
      name: "禁军武艺",
      text: "禁军武艺：每次选择本单位近战攻击时，选择一种武艺生效：连击 1 或致命一击。",
      status: supported,
      appliesTo: { unitTag: "adeptus-custodes.martial-katah" },
      controls: [{ id: "stance", type: "select", label: "本次禁军武艺", options: [["none", "不启用"], ["sustained", "连击 1"], ["lethal", "致命一击"]] }],
      effects: [
        { type: "sustained-hits", value: 1, phase: "melee", selection: { controlId: "stance", equals: "sustained", fallback: "none" } },
        { type: "lethal-hits", phase: "melee", selection: { controlId: "stance", equals: "lethal", fallback: "none" } },
      ],
    },
  ];

  const unitRules = Object.fromEntries([
    unit("图拉真元帅", [
      common("trajan-core", "【核心技能】：领袖，深入打击，不知疼痛 5+", { type: "fnp", threshold: 5 }),
      common("trajan-master", "禁军元帅：本模型所领导的单位攻击时可以忽视任意或全部对本单位 BS、WS、命中结果的修正", { type: "ignore-hit-modifiers", requiresJoined: true }),
      { id: "custodes-trajan-time-lock", name: "时间枷锁", text: "时间枷锁：每场游戏一次，近战阶段开始时，你可以选择以下效果之一生效，持续本阶段：本模型的守望者战斧 A 变为 12；本模型获得 2+特殊保护", status: supported, controls: [{ id: "mode", type: "select", label: "本次选择", options: [["none", "不启用"], ["axe", "守望者战斧 A 变为 12"], ["invulnerable", "获得 2+特殊保护"]] }], effects: [{ type: "weapon-attack-override", weaponName: "守望者战斧", value: 12, phase: "melee", selection: { controlId: "mode", equals: "axe", fallback: "none" } }, { type: "invulnerable-save", value: 2, operation: "override", phase: "melee", selection: { controlId: "mode", equals: "invulnerable", fallback: "none" } }] },
    ]),
    unit("瓦雷利安连长", [
      common("valerian-core", "【核心技能】：领袖，深入打击，不知疼痛 6+", { type: "fnp", threshold: 6 }),
      common("valerian-laurels", "黄金桂冠：本模型所领导的单位，受到的近战攻击 AP 减弱 1 点", { type: "incoming-ap", value: -1, phase: "melee", requiresJoined: true }),
      common("valerian-champion", "狮门英杰：一次性技能，本模型投掷一颗命中、造伤、保护之后，可以将本次结果改为未修正的 6"),
    ]),
    unit("盾卫连长", [
      common("shield-captain-core", "【核心技能】：领袖，深入打击"),
      { id: "custodes-martial-master", name: "武艺大师", text: "武艺大师：每场游戏一次性，当本模型所在单位被选择进行近战攻击时，可以在本轮近战中同时生效两种武艺", status: supported, controls: [{ id: "secondKatah", type: "select", label: "第二种禁军武艺", options: [["none", "不启用"], ["sustained", "连击 1"], ["lethal", "致命一击"]] }], effects: [{ type: "sustained-hits", value: 1, phase: "melee", selection: { controlId: "secondKatah", equals: "sustained", fallback: "none" } }, { type: "lethal-hits", phase: "melee", selection: { controlId: "secondKatah", equals: "lethal", fallback: "none" } }] },
      common("shield-captain-strategy", "精熟战略：每个游戏大回合一次，全军中一个拥有此技能的模型所在的单位被使用一个战略技能时，CP 消耗减少 1 点"),
    ]),
    unit("剑锋冠军", [
      common("blade-champion-core", "【核心技能】：领袖，深入打击"),
      common("blade-champion-charge", "迅捷冲锋：本模型所领导的单位可以重投冲锋结果"),
      common("blade-champion-perfection", "武艺绝伦：一次性能力，本模型所在单位即使本回合进行过加速，依然是可冲锋单位"),
    ]),
    unit("终结者盾卫连长", [
      common("allarus-captain-core", "【核心技能】：领袖，深入打击"),
      { id: "custodes-allarus-captain-armour", name: "金光战甲", text: "金光战甲：每场游戏一次性，任意阶段开始时，可以使用本技能，分配给本模型的攻击 D 变为 1，持续到本阶段结束时", status: supported, controls: [{ id: "enabled", type: "checkbox", label: "本次使分配给该模型的攻击 D 变为 1" }], effect: { type: "damage-override", value: 1 } },
      common("allarus-captain-strategy", "精熟战略：每个游戏大回合一次，全军中一个拥有此技能的模型所在的单位被使用一个战略技能时，CP 消耗减少 1 点"),
    ]),
    unit("摩托盾卫连长", [
      common("bike-captain-core", "【核心技能】：领袖"),
      common("bike-captain-advance", "扫荡进军：每场游戏一次性，近战阶段结束时，如果本模型所在单位在本阶段中已经进行过近战，则：其接战范围内仍有至少一个敌方单位，则本单位可以进行撤退；其接战范围内没有敌方单位，则本单位可以进行一次标准移动"),
      common("bike-captain-strategy", "精熟战略：每个游戏大回合一次，全军中一个拥有此技能的模型所在的单位被使用一个战略技能时，CP 消耗减少 1 点"),
    ]),
    unit("禁军盾卫", [
      common("guard-core", "【核心技能】：深入打击"),
      { id: "custodes-guard-stance", name: "保持警戒", text: "保持警戒：本单位模型攻击时重投造伤结果中的 1，如果本单位位于你占领的目标点范围内，则可以重投造伤结果", status: supported, controls: [{ id: "onObjective", type: "checkbox", label: "本单位位于你占领的目标点范围内" }], effects: [{ type: "wound-reroll", mode: "ones", activation: "passive" }, { type: "wound-reroll", mode: "failed", selection: { controlId: "onObjective", equals: true } }] },
      { id: "custodes-guard-volley", name: "枪林弹雨", text: "枪林弹雨：一次性技能，你的射击阶段中，本单位射击之后可以再次射击", status: supported, controls: [{ id: "enabled", type: "checkbox", label: "本次额外进行一次射击" }], effect: { type: "repeat-ranged", phase: "ranged" } },
    ]),
    unit("阿拉琉斯终结者", [
      common("allarus-core", "【核心技能】：深入打击"),
      { id: "custodes-allarus-slayer", name: "暴君杀手", text: "暴君杀手：本单位模型攻击人物，巨兽或载具时，可以重投造伤结果", status: supported, controls: [{ id: "targetElite", type: "checkbox", label: "目标是人物、巨兽或载具" }], effects: [{ type: "wound-reroll", mode: "failed", selection: { controlId: "targetElite", equals: true } }] },
      common("allarus-golden-light", "自金光降下：一次性技能，在对手的回合结束时，如果本单位不在敌方接战范围内，则你可以将其移除出场放入战略预备队"),
    ]),
    unit("禁军守望者", [
      common("wardens-core", "【核心技能】：深入打击"),
      { id: "custodes-wardens-will", name: "坚定意志", text: "坚定意志：当人物领导本单位时，对本单位的攻击如果 S 大于本单位的 T 值，则造伤结果减 1", status: supported, controls: [{ id: "forceLeader", type: "checkbox", label: "强行按角色已领导本单位" }], effects: [{ type: "incoming-wound-when-strength-gt", value: -1, requiresJoined: true, activation: "passive" }] },
      { id: "custodes-wardens-fortress", name: "人形要塞", text: "人形要塞：一次性技能，在任意阶段开始时，本单位可以在本阶段中获得【不知疼痛 4+】技能", status: supported, controls: [{ id: "enabled", type: "checkbox", label: "本次获得【不知疼痛 4+】技能" }], effect: { type: "fnp", threshold: 4 } },
    ]),
    unit("晨鹰摩托队", [
      common("vertus-katah", "【阵营技能】：禁军武艺"),
      common("vertus-turbo", "涡轮加速：本单位加速时无需投掷而是本阶段中 M+6"),
      common("vertus-strike", "炫光击杀：一次性技能，本单位结束标准或加速移动后，你可以选择本次移动经过的一个敌方单位（不能是载具或巨兽单位），本单位每有一个模型就投一颗 D6，每个为 2+的结果就对那个敌方单位造成 2 点致命伤害"),
    ]),
    unit("神圣蔑视者无畏机甲", [
      common("contemptor-core", "【核心技能】：致命破灭 1"),
      common("contemptor-banner", "不倒旗帜：当本模型第一次被消灭时，不结算致命破灭技能，直接移除，在本阶段结束时投 D6，2+则将本模型尽可能接近原位置而放回战场，但不能进入敌方单位的接战范围内，这样复活时恢复 D6 点 W 值"),
    ]),
    unit("神圣兰德掠袭者坦克", [
      common("land-raider-core", "【核心技能】：致命破灭 D6"),
      common("land-raider-assault", "突击载具：本模型进行标准移动后，从中脱离的单位本回合依然可以发动冲锋"),
      common("land-raider-damaged", "严重损伤：本模型 W 值为 1-5 时，攻击命中结果-1", { type: "damaged-hit-minus", threshold: 5 }),
    ]),
    unit("灭魔教团百骑长", [
      common("centura-core", "【核心技能】：领袖，斥候 6"),
      common("centura-tracker", "追踪本能：本模型所领导的单位，其中的模型 M+2，加速和冲锋结果+2"),
      { id: "custodes-centura-deep", name: "深渊之女", text: "深渊之女：本模型在对抗【灵能】攻击和致命伤害时算作拥有【不知疼痛 3+】", status: supported, controls: [{ id: "psychic", semanticType: "incoming-psychic", type: "checkbox", label: "来袭攻击具有【灵能】关键词" }], effects: [{ type: "fnp-mortal", threshold: 3, activation: "passive" }, { type: "fnp", threshold: 3, operation: "override", selection: { controlId: "psychic", equals: true } }] },
      common("centura-execution", "追杀殆尽：每当本模型所在单位接战范围内的敌方单位（不能是巨兽和载具单位）进行撤退时必须进行一次绝望检定；如果本次敌方单位本身已经被震慑则这次测试结果再减 1"),
    ]),
    unit("艾雷雅", [
      common("aleya-core", "【核心技能】：领袖，斥候 6，不知疼痛 5+", { type: "fnp", threshold: 5 }),
      common("aleya-insight", "战术洞察：本模型所领导的单位，其中的模型获得【先攻】"),
      { id: "custodes-aleya-deep", name: "深渊之女", text: "深渊之女：本模型在对抗【灵能】攻击和致命伤害时算作拥有【不知疼痛 3+】", status: supported, controls: [{ id: "psychic", semanticType: "incoming-psychic", type: "checkbox", label: "来袭攻击具有【灵能】关键词" }], effects: [{ type: "fnp-mortal", threshold: 3, activation: "passive" }, { type: "fnp", threshold: 3, operation: "override", selection: { controlId: "psychic", equals: true } }] },
      { id: "custodes-aleya-soul", name: "坚毅灵魂", text: "坚毅灵魂：本模型所领导的单位如果低于起始数量，则攻击命中结果+1，如果低于半数则造伤结果也+1", status: supported, controls: [{ id: "forceLeader", type: "checkbox", label: "本次启用此技能" }, { id: "belowHalf", type: "checkbox", label: "按低于半数处理" }], effects: [{ type: "hit-modifier", value: 1, condition: "underStartingStrength", conditionOverrideControlId: "forceLeader", requiresJoined: true, activation: "passive" }, { type: "wound-modifier", value: 1, condition: "belowHalfStrength", conditionOverrideControlId: "belowHalf", requiresJoined: true, activation: "passive" }] },
    ]),
    unit("控诉者", [
      { id: "custodes-prosecutors-purge", name: "净化处决", text: "净化处决：本单位模型射击攻击灵能者单位时算作拥有【精准】和【毁灭伤害】技能", status: supported, controls: [{ id: "targetPsychic", type: "checkbox", label: "目标是灵能者单位" }], effects: [{ type: "devastating-wounds", phase: "ranged", selection: { controlId: "targetPsychic", equals: true } }] },
      { id: "custodes-prosecutors-deep", name: "深渊之女", text: "深渊之女：本模型在对抗【灵能】攻击和致命伤害时算作拥有【不知疼痛 3+】", status: supported, controls: [{ id: "psychic", semanticType: "incoming-psychic", type: "checkbox", label: "来袭攻击具有【灵能】关键词" }], effects: [{ type: "fnp-mortal", threshold: 3, activation: "passive" }, { type: "fnp", threshold: 3, operation: "override", selection: { controlId: "psychic", equals: true } }] },
    ]),
    unit("警戒者", [
      { id: "custodes-vigilators-parry", name: "迅捷格挡", text: "迅捷格挡：对本单位模型的近战攻击命中结果减 1", status: supported, effect: { type: "incoming-hit-minus", value: 1, phase: "melee" } },
      { id: "custodes-vigilators-deep", name: "深渊之女", text: "深渊之女：本模型在对抗【灵能】攻击和致命伤害时算作拥有【不知疼痛 3+】", status: supported, controls: [{ id: "psychic", semanticType: "incoming-psychic", type: "checkbox", label: "来袭攻击具有【灵能】关键词" }], effects: [{ type: "fnp-mortal", threshold: 3, activation: "passive" }, { type: "fnp", threshold: 3, operation: "override", selection: { controlId: "psychic", equals: true } }] },
    ]),
    unit("猎巫者", [
      common("witchseekers-core", "【核心技能】：斥候 6"),
      common("witchseekers-flames", "制裁烈焰：本单位射击后，选择被命中过的一个敌方单位，那个单位必须进行一次震慑测试"),
      { id: "custodes-witchseekers-deep", name: "深渊之女", text: "深渊之女：本模型在对抗【灵能】攻击和致命伤害时算作拥有【不知疼痛 3+】", status: supported, controls: [{ id: "psychic", semanticType: "incoming-psychic", type: "checkbox", label: "来袭攻击具有【灵能】关键词" }], effects: [{ type: "fnp-mortal", threshold: 3, activation: "passive" }, { type: "fnp", threshold: 3, operation: "override", selection: { controlId: "psychic", equals: true } }] },
    ]),
    unit("灭魔教团犀牛装甲车", [
      common("rhino-core", "【核心技能】：致命破灭 D3，开火口 2"),
      common("rhino-repair", "自行修理：在每个你的指挥阶段结束时，本模型恢复一点失去的 W 值"),
      { id: "custodes-rhino-deep", name: "深渊之女", text: "深渊之女：本模型在对抗【灵能】攻击和致命伤害时算作拥有【不知疼痛 3+】", status: supported, controls: [{ id: "psychic", semanticType: "incoming-psychic", type: "checkbox", label: "来袭攻击具有【灵能】关键词" }], effects: [{ type: "fnp-mortal", threshold: 3, activation: "passive" }, { type: "fnp", threshold: 3, operation: "override", selection: { controlId: "psychic", equals: true } }] },
    ]),
  ]);

  root.WarhammerCustodesRules = root.WarhammerCustodesRuleIdentities.apply({ factionRules, unitRules });
})(typeof globalThis === "undefined" ? this : globalThis);
