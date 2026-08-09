import assert from "node:assert/strict";
import engine from "../docs/engine.js";

function deterministicRng(values) {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)];
}

const base = {
  simulations: 1,
  weaponGroups: [{ name: "瘟疫喷射拳套", modelCount: 1, attacks: "1", hit: "torrent", wound: 5, ap: 0, damage: "1", effects: {} }],
  defenderGroups: [{ name: "仲裁者", modelCount: 1, wounds: 2, save: 3, invulnerableSave: 0, effects: {} }],
};
const withoutAnti = engine.simulateRound(base, deterministicRng([0.5, 0])).averages.totalDamage;
const withAnti = engine.simulateRound({ ...base, weaponGroups: [{ ...base.weaponGroups[0], effects: { criticalWoundThreshold: 4 } }] }, deterministicRng([0.5, 0])).averages.totalDamage;
assert.equal(withoutAnti, 0, "反步兵未启用时，S3 对 T4 的5+造伤应失败");
assert.equal(withAnti, 1, "反步兵4+启用时，4点造伤骰应作为暴击造伤并造成伤害");
const halvedDamage = engine.simulateRound({
  ...base,
  weaponGroups: [{ ...base.weaponGroups[0], damage: "3" }],
  defenderGroups: [{ ...base.defenderGroups[0], save: 7, effects: { damageMultiplier: 0.5 } }],
}, deterministicRng([0.9, 0])).averages.totalDamage;
assert.equal(halvedDamage, 2, "永不屈服应将普通攻击的 D3 向上取整减半为 2");

const hazardous = engine.simulateRound({
  simulations: 1,
  weaponGroups: [{ name: "过载武器", modelCount: 2, attacks: "1", hit: "torrent", wound: 2, ap: 0, damage: "1", effects: { hazardousEnabled: true, hazardousDamage: 1 } }],
  defenderGroups: [{ name: "目标", modelCount: 1, wounds: 10, save: 7, effects: {} }],
}, deterministicRng([0.9, 0.9, 0.9, 0.9, 0.1, 0.5]));
assert.equal(hazardous.averages.hazardousTests, 2, "每件被选择的危险武器必须进行一次危险掷骰");
assert.equal(hazardous.averages.hazardousSelfDamage, 1, "危险掷骰1-2必须对进攻单位造成反噬伤害");
const hazardousAfterTargetDestroyed = engine.simulateRound({
  simulations: 1,
  weaponGroups: [
    { name: "先结算武器", modelCount: 1, attacks: "1", hit: "torrent", wound: 2, ap: 0, damage: "2", effects: {} },
    { name: "后结算危险武器", modelCount: 1, attacks: "1", hit: "torrent", wound: 2, ap: 0, damage: "1", effects: { hazardousEnabled: true, hazardousDamage: 1 } },
  ],
  defenderGroups: [{ name: "目标", modelCount: 1, wounds: 1, save: 7, effects: {} }],
}, deterministicRng([0.9, 0.9, 0.1]));
assert.equal(hazardousAfterTargetDestroyed.averages.hazardousTests, 1, "目标被先结算武器摧毁后，已选择的危险武器仍必须进行危险掷骰");

const precision = engine.simulateRound({
  simulations: 1,
  weaponGroups: [{ name: "精准武器", modelCount: 1, attacks: "1", hit: "torrent", wound: 2, ap: 0, damage: "2", effects: { precisionEnabled: true } }],
  defenderGroups: [
    { name: "护卫", modelCount: 1, wounds: 2, save: 7, allocationOrder: 1, isCharacter: false, effects: {} },
    { name: "角色", modelCount: 1, wounds: 2, save: 7, allocationOrder: 2, isCharacter: true, effects: {} },
  ],
}, deterministicRng([0.9, 0]));
assert.equal(precision.roundSummary.defenderGroups.find((group) => group.name === "角色").averageKills, 1, "精准武器必须能优先向联合单位中的角色分配伤害");
assert.equal(precision.roundSummary.defenderGroups.find((group) => group.name === "护卫").averageKills, 0, "精准攻击不应先分配给护卫");

const psychicFnp = engine.simulateRound({
  simulations: 1,
  weaponGroups: [{ name: "灵能武器", modelCount: 1, attacks: "1", hit: "torrent", wound: 2, ap: 0, damage: "1", effects: { psychicAttackEnabled: true } }],
  defenderGroups: [{ name: "灵能防护目标", modelCount: 1, wounds: 2, save: 7, effects: { feelNoPainPsychicEnabled: true, feelNoPainPsychicThreshold: 4 } }],
}, deterministicRng([0.9, 0, 0.5]));
assert.equal(psychicFnp.averages.totalDamage, 0, "标记为灵能攻击后必须触发仅对灵能攻击生效的不知疼痛");

const indirectFloor = (hit) => engine.simulateRound({
  simulations: 1,
  weaponGroups: [{ name: "曲射武器", modelCount: 1, attacks: "1", hit, wound: 2, ap: 0, damage: "1", effects: { minimumUnmodifiedHit: 4, hitModifierEnabled: true, hitModifierValue: -1 } }],
  defenderGroups: [{ name: "目标", modelCount: 1, wounds: 2, save: 7, effects: {} }],
}, deterministicRng([0.5, 0.9, 0])).averages.totalDamage;
assert.equal(indirectFloor(5), 0, "曲射的未修正4+下限不能覆盖武器自身较差的BS");
assert.equal(indirectFloor(3), 1, "曲射骰面同时满足未修正下限与受掩体劣化后的BS时必须命中");
console.log("战斗回归校验通过：反步兵4+会正确降低针对步兵的暴击造伤阈值。");
