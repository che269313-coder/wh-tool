import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const context = vm.createContext({});
context.globalThis = context;
for (const file of ["custodes.js", "effects.js", "resolver.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "docs", "rules", file), "utf8"), context, { filename: file });
}

const resolve = context.WarhammerRuleResolver.resolveUnit;
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const guardDefault = resolve("帝皇禁军", "禁军盾卫", {}, { phase: "melee" });
assert(guardDefault.attack.woundReroll === "ones", "禁军盾卫默认必须重投造伤 1");

const guardOnObjective = resolve("帝皇禁军", "禁军盾卫", { "custodes-guard-stance.onObjective": true }, { phase: "melee" });
assert(guardOnObjective.attack.woundReroll === "failed", "禁军盾卫在己方目标点必须重投失败造伤");

const trajannAxe = resolve("帝皇禁军", "图拉真元帅", { "custodes-trajan-time-lock.mode": "axe" }, { phase: "melee" });
assert(trajannAxe.attack.weaponAttackOverride?.name === "守望者战斧" && trajannAxe.attack.weaponAttackOverride?.value === 12, "图拉真时间枷锁的战斧攻击次数必须为 12");

const aleyaForcedLeader = resolve("帝皇禁军", "艾雷雅", { "custodes-aleya-soul.forceLeader": true }, { phase: "melee", isJoined: false });
assert(aleyaForcedLeader.attack.hitModifier === 1, "艾雷雅强制按已领导单位时必须获得命中 +1");

const allarus = resolve("帝皇禁军", "阿拉鲁斯终结者", {}, { phase: "melee" });
const terminatorCaptain = resolve("帝皇禁军", "终结者盾卫连长", {}, { phase: "melee" });
assert(allarus.defend.feelNoPain === 0, "阿拉鲁斯终结者不能被错误赋予不知疼痛");
assert(terminatorCaptain.defend.feelNoPain === 0, "终结者盾卫连长不能被错误赋予不知疼痛");

if (failures.length) {
  console.error("规则回归校验失败：");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("规则回归校验通过：禁军重投、时间枷锁、强制领导和不知疼痛边界均符合预期。");
