import assert from "node:assert/strict";
import test from "node:test";
import { auditCoreAbilityText, normalizeCoreAbilityRules } from "./lib/core-ability-normalizer.mjs";

test("core abilities merge into one short-name bundle per unit", () => {
  const rules = normalizeCoreAbilityRules([
    {
      id: "core-deep-strike",
      name: "深入打击",
      text: "在宣示战斗编队阶段……（超长规则全文）",
      status: "已结构化，当前仅供查阅",
      effects: [],
      source: { englishName: "Deep Strike", kind: "core" },
    },
    {
      id: "core-leader",
      name: "领袖",
      text: "部分角色单位的资料表上列有领袖……（超长规则全文）",
      status: "已结构化，当前仅供查阅",
      effects: [],
      source: { englishName: "Leader", kind: "core" },
    },
    {
      id: "unique-warmaster",
      name: "混沌战帅",
      text: "在你的指挥阶段……",
      effects: [],
      source: { englishName: "Warmaster", kind: "unique" },
    },
  ]);
  assert.equal(rules.length, 2);
  const bundle = rules[0];
  assert.equal(bundle.id, "core-bundle");
  assert.equal(bundle.name, "核心技能");
  assert.equal(bundle.text, "深入打击，领袖");
  assert.equal(bundle.source.englishName, "Deep Strike, Leader");
  assert.ok(bundle.text.length < 60, "bundle text must stay short");
  assert.equal(rules[1].source.kind, "unique", "non-core rules are untouched");
});

test("core bundle keeps calculator effects", () => {
  const rules = normalizeCoreAbilityRules([
    {
      id: "core-fnp-5",
      name: "不知疼痛 5+",
      text: "超长全文……",
      effects: [{ type: "fnp", threshold: 5 }],
      source: { englishName: "Feel No Pain 5+", kind: "core" },
    },
  ]);
  assert.deepEqual(rules[0].effects, [{ type: "fnp", threshold: 5 }]);
});

test("duplicate core abilities are deduped in the bundle", () => {
  const rules = normalizeCoreAbilityRules([
    { id: "core-deep-strike", name: "深入打击", text: "A", effects: [], source: { englishName: "Deep Strike", kind: "core" } },
    { id: "core-deep-strike-2", name: "深入打击", text: "A", effects: [], source: { englishName: "Deep Strike", kind: "core" } },
  ]);
  assert.equal(rules.length, 1);
  assert.equal(rules[0].text, "深入打击");
});

test("audit flags long core text but accepts name lists", () => {
  assert.deepEqual(
    auditCoreAbilityText({
      单位: [{ id: "core-bundle", name: "核心技能", text: "深入打击，领袖", source: { englishName: "", kind: "core" } }],
    }),
    [],
  );
  const offenders = auditCoreAbilityText({
    单位: [{ id: "core-deep-strike", name: "深入打击", text: "全".repeat(80), source: { englishName: "Deep Strike", kind: "core" } }],
  });
  assert.equal(offenders.length, 1);
  assert.match(offenders[0], /深入打击/);
});
