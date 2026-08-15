const SUPPORTED = "计算支持（满足原文条件时勾选）";
const PASSIVE_SUPPORTED = "计算支持（被动效果自动计入）";
const DISPLAY_ONLY = "已结构化，当前仅供查阅";

const compact = (value) => String(value || "").replace(/\s+/g, " ").trim();
const phaseFor = (text) => {
  const value = String(text || "").replace(/\s+/g, "");
  const melee = /近战阶段|近战攻击|近战武器|格斗阶段/.test(value);
  const ranged = /射击阶段|远程攻击|远程武器|射击攻击/.test(value);
  return melee === ranged ? undefined : melee ? "melee" : "ranged";
};

const effectKey = (effect) => JSON.stringify(effect);

export function compileAbility(ability, { factionRule = false } = {}) {
  const name = compact(ability?.name);
  const text = compact(ability?.text);
  const category = String(ability?.category || "").toLowerCase();
  const source = `${name} ${text}`;
  const phase = phaseFor(source);
  const core = category === "core" || /^core[-.]/.test(String(ability?.id || ""));
  const leader = /(?:此|该|本)模型(?:正在|在)?(?:领导|率领|带领)(?:一个)?单位|(?:领导|率领|带领)(?:一个)?单位时/.test(source);
  const effects = [];
  const controls = [];
  const add = (effect, { phased = true, shared = leader } = {}) => {
    const next = {
      ...effect,
      ...(phased && phase && !effect.phase ? { phase } : {}),
      ...(shared ? { requiresJoined: true, effectScope: "unit" } : {}),
    };
    if (!effects.some((candidate) => effectKey(candidate) === effectKey(next))) effects.push(next);
  };

  const fnp = name.match(/不(?:知|觉)疼痛\s*([3-6])\s*\+/)
    || source.match(/(?:拥有|具有|获得)\s*\*{0,2}不(?:知|觉)疼痛\s*([3-6])\s*\+/);
  if (fnp) add({ type: "fnp", threshold: Number(fnp[1]) }, { phased: false, shared: leader });
  const grantsStealth = name === "潜行" || /(?:拥有|具有|获得)\s*\*{0,2}潜行(?:\*{0,2}|能力)/.test(source);
  if (grantsStealth) {
    add({ type: "incoming-hit-minus", value: 1, phase: "ranged" }, { phased: false, shared: leader });
  }

  const invulnerable = source.match(/(?:拥有|具有|获得|改为)\s*([2-6])\s*\+\s*(?:无敌豁免|特殊保护)/);
  if (invulnerable) add({ type: "invulnerable-save", value: Number(invulnerable[1]) }, { phased: false, shared: leader });

  if (/无视[^。；]{0,30}(?:命中掷骰|命中特性)[^。；]{0,20}修正/.test(source)) add({ type: "ignore-hit-modifiers" });

  const incomingHitMinus = /(?:每次|当)[^。；]{0,80}(?:攻击针对|攻击以|对此模型|对此单位)[^。；]{0,80}(?:命中掷骰)[^。；]{0,20}(?:减去|减|[-－])\s*1/.test(source);
  if (incomingHitMinus && !grantsStealth) add({ type: "incoming-hit-minus", value: 1 }, { shared: leader });

  if (/(?:攻击的力量|力量特性)大于(?:此|该)单位的韧性[^。；]{0,80}(?:致伤掷骰)[^。；]{0,20}(?:减去|减|[-－])\s*1/.test(source)) {
    add({ type: "incoming-wound-when-strength-gt", value: -1 }, { phased: false, shared: leader });
  } else if (/(?:攻击针对|攻击以|对此模型|对此单位)[^。；]{0,100}(?:致伤掷骰)[^。；]{0,20}(?:减去|减|[-－])\s*1/.test(source)) {
    add({ type: "incoming-wound-minus", value: 1 }, { shared: leader });
  }

  if (/(?:分配给|攻击针对|攻击以)[^。；]{0,100}(?:伤害特性|该攻击的伤害)[^。；]{0,20}(?:减去|减|[-－])\s*1/.test(source)) {
    add({ type: "incoming-damage-modifier", value: -1 }, { phased: false, shared: leader });
  }
  if (/(?:伤害特性|该攻击的伤害)[^。；]{0,30}(?:减半|除以\s*2)/.test(source)) add({ type: "damage-halving" }, { phased: false, shared: leader });

  const hitRerollOnes = /重(?:掷|投)[^。；]{0,35}(?:结果为\s*1|命中掷骰[^。；]{0,12}(?:(?:中的|为)\s*)?1)|重(?:掷|投)结果为\s*1[^。；]{0,20}命中/.test(source);
  const hitReroll = /重(?:掷|投)[^。；]{0,45}命中掷骰|命中掷骰[^。；]{0,45}重(?:掷|投)/.test(source);
  const singleHitReroll = /重(?:掷|投)(?:一次|一个)[^。；]{0,18}命中掷骰/.test(source);
  if (hitReroll && !singleHitReroll) add({ type: "hit-reroll", mode: hitRerollOnes ? "ones" : "failed" });

  const woundRerollOnes = /重(?:掷|投)[^。；]{0,35}(?:结果为\s*1|致伤掷骰[^。；]{0,12}(?:(?:中的|为)\s*)?1)|重(?:掷|投)结果为\s*1[^。；]{0,20}致伤/.test(source);
  const woundReroll = /重(?:掷|投)[^。；]{0,45}(?:致伤|造伤)掷骰|(?:致伤|造伤)掷骰[^。；]{0,45}重(?:掷|投)/.test(source);
  const singleWoundReroll = /重(?:掷|投)(?:一次|一个)[^。；]{0,18}(?:致伤|造伤)掷骰/.test(source);
  if (woundReroll && !singleWoundReroll) add({ type: "wound-reroll", mode: woundRerollOnes ? "ones" : "failed" });

  const damageRerollOnes = /重(?:掷|投)[^。；]{0,35}(?:结果为\s*1|伤害掷骰[^。；]{0,12}(?:(?:中的|为)\s*)?1)|重(?:掷|投)结果为\s*1[^。；]{0,20}伤害/.test(source);
  const damageReroll = /重(?:掷|投)[^。；]{0,45}(?:伤害掷骰|该攻击的伤害)|(?:伤害掷骰|该攻击的伤害)[^。；]{0,45}重(?:掷|投)/.test(source);
  const singleDamageReroll = /重(?:掷|投)(?:一次|一个)[^。；]{0,18}(?:伤害掷骰|伤害)/.test(source);
  if (damageReroll && !singleDamageReroll) add({ type: "damage-reroll", mode: damageRerollOnes ? "ones" : "failed" });

  if (!incomingHitMinus && /(?:命中掷骰|命中结果)[^。；]{0,18}(?:加|提高|\+)\s*1/.test(source)) add({ type: "hit-modifier", value: 1 });
  if (/(?:致伤掷骰|造伤结果)[^。；]{0,18}(?:加|提高|\+)\s*1/.test(source)) add({ type: "wound-modifier", value: 1 });

  const sustained = source.match(/\[\s*连击\s*(D3|[1-6])\s*\]/i);
  if (sustained) add({ type: "sustained-hits", value: /^d3$/i.test(sustained[1]) ? "d3" : Number(sustained[1]) });
  if (/\[\s*致命(?:一击|命中)\s*\]/.test(source)) add({ type: "lethal-hits" });
  if (/\[\s*毁灭(?:伤害|性伤口)\s*\]/.test(source)) add({ type: "devastating-wounds" });

  const hitCritical = source.match(/未修正的命中掷骰[^。；]{0,35}([2-5])\s*\+[^。；]{0,20}(?:暴击命中|视为暴击)/);
  if (hitCritical) add({ type: "hit-critical-threshold", value: Number(hitCritical[1]) });
  const woundCritical = source.match(/未修正的(?:(?:致伤|造伤)掷骰|受伤骰)[^。；]{0,35}([2-5])\s*\+[^。；]{0,20}(?:暴击致伤|视为暴击|Critical)/i);
  if (woundCritical) add({ type: "wound-critical-threshold", value: Number(woundCritical[1]) });

  if (/(?:护甲穿透|穿甲)(?:特性)?[^。；]{0,22}(?:提高|改善|改进|\+)\s*1/.test(source)) add({ type: "weapon-ap-modifier", value: 1 });
  const attackModifier = source.match(/(?:攻击次数|攻击特性|武器的攻击特性)[^。；]{0,18}(?:加|提高|\+)\s*(\d+)/);
  if (attackModifier) add({ type: "attack-modifier", value: Number(attackModifier[1]) });
  const strengthModifier = source.match(/(?:力量特性|武器的力量)[^。；]{0,18}(?:加|提高|\+)\s*(\d+)/);
  if (strengthModifier) add({ type: "weapon-strength-modifier", value: Number(strengthModifier[1]) });
  const damageModifier = source.match(/(?:伤害特性|武器的伤害)[^。；]{0,18}(?:加|提高|\+)\s*(\d+)/);
  if (damageModifier && !/分配给|攻击针对|攻击以/.test(source)) add({ type: "damage-modifier", value: Number(damageModifier[1]) });

  if (/(?:选择|挑选)(?:以下|下列|上述|其中)|以下(?:其中)?(?:一个|一项)|任选(?:一个|一项)|选择[^。；]{0,20}(?:能力|效果)之一/.test(source) && effects.length > 1) {
    return { effects: [], controls: [], status: DISPLAY_ONLY };
  }
  if (/(?:每有|每存在)[^。；]{0,80}(?:最高|至多)|(?:最高|至多)(?:增加|提升)?\s*\+?\d/.test(source)) {
    for (let index = effects.length - 1; index >= 0; index -= 1) {
      if (["attack-modifier", "weapon-strength-modifier", "damage-modifier", "weapon-ap-modifier"].includes(effects[index].type)) effects.splice(index, 1);
    }
  }

  if (!effects.length) return { effects: [], controls: [], status: DISPLAY_ONLY };
  const passiveCore = core && (Boolean(fnp) || grantsStealth);
  if (!passiveCore) controls.push({ id: "enabled", type: "checkbox", label: factionRule ? "本次启用此阵营规则" : "满足原文条件并启用此技能" });
  if (leader) controls.push({ id: "forceLeader", type: "checkbox", label: "数据卡模式下视为正在领导单位" });
  return { effects, controls, status: passiveCore ? PASSIVE_SUPPORTED : SUPPORTED };
}

const option = (id, label, options) => ({ id, type: "select", label, options });
const selectedEffect = (type, controlId, equals, extra = {}) => ({ type, ...extra, selection: { controlId, equals } });
const armyResult = (controls, effects) => ({ controls, effects, status: effects.length ? SUPPORTED : DISPLAY_ONLY });

// Army rules are deliberately compiled by exact rule identity. Their source
// text often contains mutually exclusive menus, examples and resource rules;
// feeding the whole paragraph through the unit-rule regexes can silently make
// incompatible effects active together.
export function compileFactionAbility(ability) {
  const name = compact(ability?.name);
  if (name === "巫师秘会") return armyResult([
    option("ritual", "本次结算的仪式效果", [
      ["none", "不启用可计算仪式"],
      ["fatedDoomOnes", "命运毁灭：重掷命中 1"],
      ["fatedDoomAll", "命运毁灭（测试 10+）：重掷全部命中"],
      ["twistFate1", "命运扭曲：穿甲 +1"],
      ["twistFate2", "命运扭曲（测试 12+）：穿甲 +2"],
    ]),
  ], [
    selectedEffect("hit-reroll", "ritual", "fatedDoomOnes", { mode: "ones", phase: "ranged" }),
    selectedEffect("hit-reroll", "ritual", "fatedDoomAll", { mode: "failed", phase: "ranged" }),
    selectedEffect("weapon-ap-modifier", "ritual", "twistFate1", { value: 1, phase: "ranged" }),
    selectedEffect("weapon-ap-modifier", "ritual", "twistFate2", { value: 2, phase: "ranged" }),
  ]);
  if (name === "号令之声") return armyResult([
    option("order", "当前单位受到的命令", [
      ["none", "无可计算命令"],
      ["fixBayonets", "装上刺刀！"],
      ["takeAim", "瞄准！"],
      ["frontRankFire", "前排，开火！后排，开火！"],
    ]),
  ], [
    selectedEffect("hit-modifier", "order", "fixBayonets", { value: 1, phase: "melee" }),
    selectedEffect("hit-modifier", "order", "takeAim", { value: 1, phase: "ranged" }),
    selectedEffect("rapid-fire-attack-modifier", "order", "frontRankFire", { value: 1, phase: "ranged" }),
  ]);
  if (name === "恐虐祝福") return armyResult([
    { id: "sustainedMelee", type: "checkbox", label: "启用武技卓越（近战连击 1；祝福合计最多两项）" },
    { id: "lethalMelee", type: "checkbox", label: "启用扭曲之刃（近战致命一击；祝福合计最多两项）" },
    { id: "devastatingInfantry", type: "checkbox", label: "启用断首斩击（对步兵近战毁灭伤害；祝福合计最多两项）" },
    { id: "targetInfantry", type: "checkbox", label: "目标具有步兵关键词" },
  ], [
    selectedEffect("sustained-hits", "sustainedMelee", true, { value: 1, phase: "melee" }),
    selectedEffect("lethal-hits", "lethalMelee", true, { phase: "melee" }),
    selectedEffect("devastating-wounds", "devastatingInfantry", true, { phase: "melee", requiresTargetInfantry: true }),
  ]);
  if (name === "黑暗契约") return armyResult([
    option("pact", "本阶段缔结的黑暗契约", [["none", "不缔结"], ["lethal", "致命一击"], ["sustained", "连击 1"]]),
  ], [
    selectedEffect("lethal-hits", "pact", "lethal"),
    selectedEffect("sustained-hits", "pact", "sustained", { value: 1 }),
  ]);
  if (name === "突触 / 亚空间阴影") return armyResult([
    { id: "inSynapse", type: "checkbox", label: "本单位位于己方突触范围内" },
  ], [selectedEffect("weapon-strength-modifier", "inSynapse", true, { value: 1, phase: "melee" })]);
  if (name === "为了上上善道") return armyResult([
    { id: "guided", type: "checkbox", label: "本单位是被指引单位且正攻击其标记单位" },
  ], [selectedEffect("hit-modifier", "guided", true, { value: 1, phase: "ranged" })]);
  if (name === "教义条令") return armyResult([
    option("doctrine", "当前教义与战线条件", [
      ["none", "不启用"],
      ["protector", "守卫者条令"],
      ["protectorBattleline", "守卫者条令，且为战线/邻近战线"],
      ["conqueror", "征服者条令"],
      ["conquerorBattleline", "征服者条令，且为战线/邻近战线"],
    ]),
  ], [
    selectedEffect("hit-modifier", "doctrine", "protector", { value: 1, phase: "ranged" }),
    selectedEffect("hit-modifier", "doctrine", "protectorBattleline", { value: 1, phase: "ranged" }),
    selectedEffect("incoming-hit-minus", "doctrine", "protectorBattleline", { value: 1, phase: "melee" }),
    selectedEffect("hit-modifier", "doctrine", "conqueror", { value: 1, phase: "melee" }),
    selectedEffect("hit-modifier", "doctrine", "conquerorBattleline", { value: 1, phase: "melee" }),
    selectedEffect("weapon-ap-modifier", "doctrine", "conquerorBattleline", { value: 1 }),
  ]);
  if (name === "效率为先") return armyResult([
    option("stance", "当前收益能力及目标条件", [
      ["none", "不启用"],
      ["hostileAcquisition", "敌对获取：目标位于目标标记范围内"],
      ["consolidatedTakeover", "巩固接管：本单位位于己方目标标记范围内"],
    ]),
  ], [
    selectedEffect("hit-modifier", "stance", "hostileAcquisition", { value: 1 }),
    selectedEffect("hit-modifier", "stance", "consolidatedTakeover", { value: 1 }),
    selectedEffect("incoming-wound-when-strength-gt", "stance", "consolidatedTakeover", { value: -1 }),
  ]);
  if (name === "恐惧使者") return armyResult([
    { id: "doom", type: "checkbox", label: "启用厄运，且目标处于惊骇状态" },
    { id: "darkness", type: "checkbox", label: "启用黑暗（本模型获得潜行）" },
  ], [
    selectedEffect("wound-modifier", "doom", true, { value: 1 }),
    selectedEffect("incoming-hit-minus", "darkness", true, { value: 1, phase: "ranged" }),
  ]);
  return armyResult([], []);
}

export const statuses = { SUPPORTED, PASSIVE_SUPPORTED, DISPLAY_ONLY };
