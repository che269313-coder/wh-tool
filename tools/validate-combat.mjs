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
console.log("战斗回归校验通过：反步兵4+会正确降低针对步兵的暴击造伤阈值。");
