(function registerTacticalCorpus(root) {
  "use strict";

  const UNIT_ALIASES = [
    { name: "禁军盾卫", aliases: ["禁军盾卫", "custodian guard"] },
    { name: "图拉真元帅", aliases: ["图拉真元帅", "图拉真", "trajann valoris", "trajann"] },
    { name: "终结者小队", aliases: ["星际战士终结者", "终结者小队", "terminator squad"] },
  ];

  function findUnitMentions(question) {
    const source = String(question || "").toLowerCase();
    return UNIT_ALIASES.map((unit) => ({ ...unit, index: Math.min(...unit.aliases.map((alias) => source.indexOf(alias.toLowerCase())).filter((index) => index >= 0)) }))
      .filter((unit) => Number.isFinite(unit.index))
      .sort((left, right) => left.index - right.index);
  }

  function detectAttackMode(question) {
    const source = String(question || "").toLowerCase();
    if (/远程|射击|开火|shoot|ranged/.test(source)) return "ranged";
    if (/近战|肉搏|挥刀|melee|fight/.test(source)) return "melee";
    return "";
  }

  function requestedCalculation(question) {
    return /平均伤害|伤害|击杀|概率|期望|算一下|计算|能杀|多少伤害|多少个/.test(String(question || ""));
  }

  function combatCall(attacker, defender, attackMode, context = {}) {
    return { name: "calculate_combat", arguments: { attacker, defender, attackMode, context } };
  }

  function isShortModeFollowUp(question) {
    return /^(远程|射击|开火|近战|肉搏|挥刀|shoot|ranged|melee|fight)(呢|吗|怎么样|如何|呢？|吗？)?[？?！!。.]?$/i.test(String(question || "").trim());
  }

  function route(question, memory = null) {
    const mentions = findUnitMentions(question);
    const attackMode = detectAttackMode(question);
    if (mentions.length >= 2 && attackMode && requestedCalculation(question)) {
      return combatCall(mentions[0].name, mentions[1].name, attackMode);
    }
    if (mentions.length >= 2 && !attackMode && requestedCalculation(question)) {
      return {
        intent: "combat-summary",
        toolCalls: [
          combatCall(mentions[0].name, mentions[1].name, "melee"),
          combatCall(mentions[0].name, mentions[1].name, "ranged"),
        ],
      };
    }
    if (isShortModeFollowUp(question) && memory?.lastScenario && attackMode) {
      return combatCall(memory.lastScenario.attacker, memory.lastScenario.defender, attackMode, memory.lastScenario.context || {});
    }
    if (/掩体|cover/.test(String(question || "")) && memory?.lastScenario) {
      return combatCall(memory.lastScenario.attacker, memory.lastScenario.defender, memory.lastScenario.attackMode, { ...(memory.lastScenario.context || {}), targetHasCover: true });
    }
    return null;
  }

  root.WarhammerTacticalCorpus = {
    version: 1,
    route,
    guidance: `领域语料（只用于理解术语和选择工具，不能替代结构化数据卡）：
- “瘟疫战士”“Plague Marines”是死亡守卫单位；“图拉真”“图拉真元帅”“Trajann Valoris”指图拉真元帅。遇到别名时优先 find_units 或当前军表。
- “远程攻击”“射击”“开火”表示 ranged；“近战”“肉搏”“挥刀”表示 melee。
- “半程”“半射程”只在用户明确说出时设 targetWithinHalfRange；“有掩体”设 targetHasCover；“冲锋过”设 attackerCharged。没有提到的条件不能假设。
- “平均伤害”“能杀几个”“击杀概率”“期望伤害”都是计算请求，必须调用 calculate_combat；“属性是多少”“有什么武器”“无敌豁免是多少”是数据卡读取请求，必须调用 get_unit_profile。`,
  };
})(typeof globalThis === "undefined" ? this : globalThis);
