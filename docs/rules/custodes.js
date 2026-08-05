/*
 * 帝皇禁军的数据卡规则。
 *
 * 这里刻意只存放规则文字、分类和机器可读的效果描述；骰子引擎不直接
 * 依赖任何阵营或单位名称。新增阵营 / 分遣队时，按同一结构增加数据即可。
 */
(function (root) {
  const supported = "已纳入本次计算";
  const displayOnly = "已显示，暂不改变本次骰子";
  const common = (id, text, effect) => ({ id: `custodes-${id}`, name: String(text).split(/[：:。]/)[0], text, status: effect ? supported : displayOnly, effect });
  const unit = (name, rules) => [name, rules];

  const factionRules = [
    common("martial-katah", "禁军武艺：近战阶段中，选择启用连击 1 或致命一击。", { type: "martial-katah" }),
  ];

  const unitRules = Object.fromEntries([
    unit("图拉真元帅", [
      common("trajan-core", "核心：领袖、深入打击、不知疼痛 5+。", { type: "fnp", threshold: 5 }),
      common("trajan-master", "禁军元帅：图拉真所率领单位中的模型忽略对其武器技能、弹道技能、命中骰的任何或全部修正。", { type: "ignore-hit-modifiers", requiresJoined: true }),
      { id: "custodes-trajan-time-lock", name: "时间枷锁", text: "每场游戏一次，战斗阶段开始时选择：守望者战斧攻击次数变为 12；或该模型获得 2+ 无敌。", status: supported, controls: [{ id: "mode", type: "select", label: "本次选择", options: [["none", "不启用"], ["axe", "守望者战斧攻击次数变为 12"], ["invulnerable", "获得 2+ 无敌"]] }], effect: { type: "time-lock" } },
    ]),
    unit("瓦雷利安连长", [
      common("valerian-core", "核心：领袖、深入打击、不知疼痛 6+。", { type: "fnp", threshold: 6 }),
      common("valerian-laurels", "狮门桂冠：瓦雷利安所率领单位受到的近战攻击，其护甲穿透属性降低 1。", { type: "incoming-ap", value: -1, phase: "melee", requiresJoined: true }),
      common("valerian-champion", "狮门英杰：每场游戏一次，在一次命中、造伤或豁免掷骰后，可以将该骰改为未修正的 6。"),
    ]),
    unit("盾卫连长", [
      common("shield-captain-core", "核心：领袖、深入打击。"),
      { id: "custodes-martial-master", name: "武艺大师", text: "每场游戏一次，当该模型所率领单位被选中进行战斗时，该单位可在该阶段同时受两种禁军武艺效果影响。", status: supported, controls: [{ id: "secondKatah", type: "select", label: "第二种禁军武艺", options: [["none", "不启用"], ["sustained", "连击 1"], ["lethal", "致命一击"]] }], effect: { type: "second-martial-katah", requiresJoined: true, phase: "melee" } },
      common("shield-captain-strategy", "战略大师：每战斗轮一次，该模型所率领单位使用一次战略时可减少 1CP。"),
    ]),
    unit("剑锋冠军", [
      common("blade-champion-core", "核心：领袖、深入打击。"),
      common("blade-champion-charge", "迅捷冲锋：该模型所在单位进行冲锋掷骰时可以重掷。"),
      common("blade-champion-perfection", "武艺至臻：该模型所在单位突进后仍可冲锋。"),
      common("blade-champion-stances", "剑锋姿态：宝库之剑的斩首、疾风、炫光为互斥武器配置；请在武器栏选择其中一种。"),
    ]),
    unit("终结者盾卫连长", [
      common("allarus-captain-core", "核心：领袖、深入打击、不知疼痛 5+。", { type: "fnp", threshold: 5 }),
      { id: "custodes-allarus-captain-armour", name: "金甲护体", text: "每场游戏一次，在任一阶段开始时，分配给该模型的攻击伤害特性变为 1，直到该阶段结束。", status: supported, controls: [{ id: "enabled", type: "checkbox", label: "本次使分配给该模型的伤害变为 1" }], effect: { type: "damage-override", value: 1 } },
      common("allarus-captain-strategy", "战略大师：每战斗轮一次，该模型所率领单位使用一次战略时可减少 1CP。"),
    ]),
    unit("摩托盾卫连长", [
      common("bike-captain-core", "核心：领袖、禁军武艺。"),
      common("bike-captain-advance", "席卷推进：该模型所在单位完成战斗后，可作出后撤或常规移动。"),
      common("bike-captain-strategy", "战略大师：每战斗轮一次，该模型所率领单位使用一次战略时可减少 1CP。"),
    ]),
    unit("禁军盾卫", [
      { id: "custodes-guard-stance", name: "坚守阵地", text: "该单位攻击时重掷造伤骰结果为 1；若该单位位于己方控制的目标标记范围内，则改为重掷全部造伤骰。", status: supported, controls: [{ id: "onObjective", type: "checkbox", label: "该单位位于己方控制的目标标记范围内" }], effect: { type: "guard-wound-reroll" } },
      { id: "custodes-guard-volley", name: "枪林弹雨", text: "每场游戏一次，该单位完成射击后可以再次射击。", status: supported, controls: [{ id: "enabled", type: "checkbox", label: "本次额外进行一次射击" }], effect: { type: "repeat-ranged" } },
    ]),
    unit("阿拉鲁斯终结者", [
      common("allarus-core", "核心：深入打击、不知疼痛 4+。", { type: "fnp", threshold: 4 }),
      { id: "custodes-allarus-slayer", name: "暴君杀手", text: "该单位攻击角色、怪物或载具单位时，可以重掷造伤骰。", status: supported, controls: [{ id: "targetElite", type: "checkbox", label: "目标是角色、怪物或载具" }], effect: { type: "elite-wound-reroll" } },
      common("allarus-golden-light", "自金光降下：在己方移动阶段结束时，该单位可进入战略预备队。"),
    ]),
    unit("禁军守望者", [
      { id: "custodes-wardens-will", name: "坚定意志", text: "当角色模型率领该单位时，若一次攻击的力量高于该单位韧性，则该攻击的造伤骰 -1。", status: supported, effect: { type: "high-strength-wound-minus", requiresJoined: true } },
      { id: "custodes-wardens-fortress", name: "人形要塞", text: "每场游戏一次，在任一阶段开始时，该单位获得不知疼痛 4+，直到该阶段结束。", status: supported, controls: [{ id: "enabled", type: "checkbox", label: "本次获得不知疼痛 4+" }], effect: { type: "fnp", threshold: 4 } },
    ]),
    unit("晨鹰摩托队", [
      common("vertus-katah", "阵营技能：禁军武艺。", { type: "martial-katah" }),
      common("vertus-turbo", "涡轮加速：该单位完成突进后可造成致命伤害。"),
    ]),
    unit("神圣蔑视者无畏机甲", [
      common("contemptor-banner", "倒下的旗帜：该模型首次被摧毁时，不触发致命破坏；阶段结束时可在 2+ 后以 D6 伤口重返战场。"),
    ]),
    unit("神圣兰德掠袭者坦克", [
      common("land-raider-assault", "突击载具：该单位中的模型登载后，即使该运输载具本回合曾作出常规移动，也可冲锋。"),
      common("land-raider-damaged", "重度受损：该模型剩余 1-5 伤口时，命中骰 -1。", { type: "damaged-hit-minus", threshold: 5 }),
    ]),
    unit("灭魔教团百夫长", [
      common("centura-leader", "核心：领袖。该模型率领单位移动属性 +2，且突进与冲锋骰 +2。"),
      { id: "custodes-centura-deep", name: "深沉之女", text: "该模型拥有不知疼痛 3+，但仅能用于抵抗灵能攻击或致命伤害。", status: supported, controls: [{ id: "psychic", type: "checkbox", label: "来袭攻击具有灵能关键词" }], effect: { type: "deep-daughter" } },
      common("centura-execution", "处决协议：每场游戏一次，可对一个敌方灵能者单位施加战斗震慑。"),
    ]),
    unit("艾雷雅", [
      common("aleya-leader", "核心：领袖。"),
      { id: "custodes-aleya-deep", name: "深沉之女", text: "该模型拥有不知疼痛 3+，但仅能用于抵抗灵能攻击或致命伤害。", status: supported, controls: [{ id: "psychic", type: "checkbox", label: "来袭攻击具有灵能关键词" }], effect: { type: "deep-daughter" } },
      { id: "custodes-aleya-soul", name: "坚韧灵魂", text: "当该模型率领的单位低于初始兵力时，命中骰 +1；低于半员时，造伤骰 +1。", status: supported, effect: { type: "under-strength-bonuses", requiresJoined: true } },
      common("aleya-insight", "战术洞察：该模型所率领单位获得先攻。"),
    ]),
    unit("控诉者", [
      { id: "custodes-prosecutors-purge", name: "净化审判", text: "该单位攻击灵能者单位时，其武器获得精准与毁灭性伤口。", status: supported, controls: [{ id: "targetPsychic", type: "checkbox", label: "目标是灵能者单位" }], effect: { type: "anti-psyker-weapons" } },
      { id: "custodes-prosecutors-deep", name: "深沉之女", text: "该模型拥有不知疼痛 3+，但仅能用于抵抗灵能攻击或致命伤害。", status: supported, controls: [{ id: "psychic", type: "checkbox", label: "来袭攻击具有灵能关键词" }], effect: { type: "deep-daughter" } },
    ]),
    unit("戒卫者", [
      { id: "custodes-vigilators-parry", name: "迅捷格挡", text: "针对该单位的近战攻击，命中骰 -1。", status: supported, effect: { type: "incoming-melee-hit-minus" } },
      { id: "custodes-vigilators-deep", name: "深沉之女", text: "该模型拥有不知疼痛 3+，但仅能用于抵抗灵能攻击或致命伤害。", status: supported, controls: [{ id: "psychic", type: "checkbox", label: "来袭攻击具有灵能关键词" }], effect: { type: "deep-daughter" } },
    ]),
    unit("警戒者", [
      { id: "custodes-vigilators-parry", name: "迅捷格挡", text: "针对该单位的近战攻击，命中骰 -1。", status: supported, effect: { type: "incoming-melee-hit-minus" } },
      { id: "custodes-vigilators-deep", name: "深沉之女", text: "该模型拥有不知疼痛 3+，但仅能用于抵抗灵能攻击或致命伤害。", status: supported, controls: [{ id: "psychic", type: "checkbox", label: "来袭攻击具有灵能关键词" }], effect: { type: "deep-daughter" } },
    ]),
    unit("猎巫者", [
      { id: "custodes-witchseekers-deep", name: "深沉之女", text: "该模型拥有不知疼痛 3+，但仅能用于抵抗灵能攻击或致命伤害。", status: supported, controls: [{ id: "psychic", type: "checkbox", label: "来袭攻击具有灵能关键词" }], effect: { type: "deep-daughter" } },
      common("witchseekers-flames", "利刃烈焰：敌方单位被该单位的猎巫喷火器命中后，需要进行战斗震慑测试。"),
    ]),
    unit("灭魔教团犀牛装甲车", [
      { id: "custodes-rhino-deep", name: "深沉之女", text: "该模型拥有不知疼痛 3+，但仅能用于抵抗灵能攻击或致命伤害。", status: supported, controls: [{ id: "psychic", type: "checkbox", label: "来袭攻击具有灵能关键词" }], effect: { type: "deep-daughter" } },
      common("rhino-repair", "自行修理：己方指挥阶段结束时，该模型回复 1 点失去的伤口。"),
    ]),
    unit("神鸟反重力坦克", [
      common("grav-tank-hover", "悬浮：该模型可悬浮移动。"),
      common("grav-tank-fire", "高级火力：针对特定目标类型时可获得额外武器效果；需要目标类型与完整数据卡条件后再结算。"),
    ]),
  ]);

  root.WarhammerCustodesRules = { factionRules, unitRules };
})(typeof globalThis === "undefined" ? this : globalThis);
