import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function rulesContext() {
  const context = vm.createContext({ console });
  context.globalThis = context;
  for (const file of ["rules/identity.js", "rules/faction-registry.js", "rules/effect-schema.js", "rules/effects.js", "rules/resolver.js"]) {
    vm.runInContext(read(path.join("docs", file)), context, { filename: file });
  }
  return context;
}

test("reroll effects record source contributions with mode", () => {
  const context = rulesContext();
  context.WarhammerTestFactionRules = {
    factionRules: [
      { id: "test-faction.army-rule", name: "阵营造伤重投", effects: [{ type: "wound-reroll", mode: "failed" }] },
    ],
    unitRules: {
      "测试单位": [
        { id: "test-faction.unit.hit-reroll", name: "命中重投1", effects: [{ type: "hit-reroll", mode: "ones" }] },
        { id: "test-faction.unit.damage-reroll", name: "伤害重投", effects: [{ type: "damage-reroll", mode: "failed" }] },
      ],
    },
  };
  context.WarhammerFactionRegistry.register({
    id: "test-faction", name: "测试阵营", rulesGlobal: "WarhammerTestFactionRules",
  });
  const factionResolution = context.WarhammerRuleResolver.resolveFaction("test-faction", {}, { unitName: "测试单位", phase: "ranged" });
  assert.equal(factionResolution.attack.woundReroll, "failed", "阵营级造伤重投必须进入归约结果");
  const woundGrant = factionResolution.attack.contributions.find((entry) => entry.field === "woundReroll");
  assert.ok(woundGrant, "阵营级造伤重投必须留下贡献记录");
  assert.equal(woundGrant.sourceId, "test-faction.army-rule");
  assert.equal(woundGrant.mode, "failed");

  const unitResolution = context.WarhammerRuleResolver.resolveUnit("test-faction", "测试单位", {}, { phase: "ranged" });
  assert.equal(unitResolution.attack.hitReroll, "ones");
  assert.equal(unitResolution.attack.damageReroll, true);
  assert.equal(unitResolution.attack.damageRerollMode, "failed", "伤害重投模式必须保留，不得丢失为布尔值");
});

test("UI and engine consume one reroll plan instead of re-deriving conditions", () => {
  const app = read("docs/app.js");
  assert.match(app, /function calculatorRerollPlan\(/);
  assert.match(app, /calculatorRerollPlan\(draft, sourceName, weapon, coreProfile\)/, "UI 骰面框必须消费重投计划");
  assert.match(app, /calculatorRerollPlan\(attackerDraft, source\.ruleName \|\| source\.name, weapon, coreProfile\)/, "引擎载荷必须消费同一重投计划");
  assert.match(app, /composeRerollSelection\(attackerDraft, rerollPlan\.hit/);
  assert.match(app, /composeRerollSelection\(attackerDraft, rerollPlan\.wound/);
  assert.doesNotMatch(app, /sourceRules\.woundReroll \|\| hasTwinLinked/, "旧的不对称显示条件必须消失");
  assert.doesNotMatch(app, /sourceRules\.hitReroll && hitThreshold > 0/);
  assert.doesNotMatch(app, /damageRerollType: "ones"/, "伤害重投不得硬编码为仅重投 1");
  assert.match(app, /damageRerollMode === "failed" \? "specific"/);
});

test("reroll phase follows the weapon type, not the global attack mode", () => {
  const app = read("docs/app.js");
  assert.match(app, /const phaseOverride = \{ phase: weapon\.type \}/);
  assert.match(app, /resolvedRuleEffects\(draft, sourceName, phaseOverride\)/);
  assert.match(app, /resolvedFactionEffects\(draft, \{ unitName: sourceName, \.\.\.phaseOverride \}\)/);
  assert.match(app, /resolveUnitScoped\(\s*faction, name, "unit"/, "联合单位共享重投必须进入计划");
  assert.match(app, /add\(resolvedFactionEffects\(draft, \{ unitName: sourceName, \.\.\.phaseOverride \}\), "faction"\)/, "阵营重投必须进入计划");
});

test("picker search precomputes haystacks and reuses DOM slots", () => {
  const app = read("docs/app.js");
  assert.match(app, /const pickerOptionHaystack = /);
  assert.match(app, /option\.haystack\?\.includes\(query\)/);
  assert.match(app, /query\.startsWith\(cached\.query\)/, "增量过滤：逐字变长的查询只筛上一轮结果");
  assert.match(app, /Array\.from\(\{ length: 60 \}/, "菜单使用固定 60 个槽位复用 DOM");
  assert.match(app, /pickerMenuSlots\.set\(menu, slots\)/);
  assert.match(app, /slot\.root\.hidden = false/);
});

test("manual and AI calculations share a persisted battle session", () => {
  const app = read("docs/app.js");
  assert.match(app, /BATTLE_SESSION_KEY/);
  assert.match(app, /function loadBattleSession\(/);
  assert.match(app, /function saveBattleSession\(/);
  assert.match(app, /const savedBattleSession = loadBattleSession\(\)/);
  assert.match(app, /combatContext: normalizeCombatContext\(savedBattleSession\?\.combatContext\)/);
  const saveHooks = (app.match(/scheduleBattleSessionSave\(\)/g) || []).length;
  assert.ok(saveHooks >= 7, "手动与 AI 的各条场景变更路径都必须触发会话保存（当前 " + saveHooks + " 处）");
  assert.match(app, /AI 计算与手动计算共享同一场景状态/);
});
