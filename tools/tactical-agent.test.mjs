import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (relativePath) => fs.readFileSync(new URL(relativePath, root), "utf8");

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, String(value)),
  };
}

test("tactical agent is independent from the calculator and remembers the latest scenario", async () => {
  assert.ok(fs.existsSync(new URL("docs/assistant/constitution.js", root)), "constitution should be a standalone module");
  assert.ok(fs.existsSync(new URL("docs/assistant/corpus.js", root)), "curated scenario corpus should be a standalone module");
  assert.ok(fs.existsSync(new URL("docs/assistant/tactical-agent.js", root)), "agent runtime should be a standalone module");

  const storage = createStorage();
  const context = vm.createContext({ console, localStorage: storage });
  context.globalThis = context;
  vm.runInContext(read("docs/assistant/corpus.js"), context);
  vm.runInContext(read("docs/assistant/constitution.js"), context);
  vm.runInContext(read("docs/assistant/tactical-agent.js"), context);

  let callCount = 0;
  const agent = context.WarhammerTacticalAgent.create({
    storage,
    buildContext: async () => ({ battle: "测试军表", library: "测试资料" }),
    request: async (messages) => {
      callCount += 1;
      if (callCount === 1) return {
        tool_calls: [{ id: "calc-1", function: { name: "calculate_combat", arguments: JSON.stringify({ attacker: "瘟疫战士", defender: "图拉真元帅", attackMode: "ranged", context: {} }) } }],
      };
      assert.equal(messages.at(-1).role, "tool");
      return { content: "已使用本地规则引擎完成模拟。" };
    },
    tools: [{ type: "function", function: { name: "calculate_combat", parameters: { type: "object" } } }],
    executeTool: async (call) => {
      assert.equal(call.function.name, "calculate_combat");
      return { ok: true, attacker: { name: "瘟疫战士" }, defender: { name: "图拉真元帅" }, attackMode: "ranged", context: {}, averageDamage: 2.5, killProbability: 10 };
    },
  });

  assert.match(context.WarhammerTacticalConstitution.systemPrompt, /calculate_combat/);
  assert.match(context.WarhammerTacticalConstitution.systemPrompt, /分别计算 ranged 和 melee/);
  assert.match(context.WarhammerTacticalConstitution.fewShotExamples, /瘟疫战士/);
  assert.equal(await agent.answer("瘟疫战士远程攻击图拉真"), "已使用本地规则引擎完成模拟。");
  assert.deepEqual(JSON.parse(JSON.stringify(agent.getMemory().lastScenario)), { attacker: "瘟疫战士", defender: "图拉真元帅", attackMode: "ranged", context: {} });
  assert.equal(agent.getMemory().messages.length, 2);
});

test("tactical agent keeps bounded local memory and does not persist tool payloads", () => {
  const storage = createStorage();
  const context = vm.createContext({ console, localStorage: storage });
  context.globalThis = context;
  vm.runInContext(read("docs/assistant/corpus.js"), context);
  vm.runInContext(read("docs/assistant/constitution.js"), context);
  vm.runInContext(read("docs/assistant/tactical-agent.js"), context);
  const agent = context.WarhammerTacticalAgent.create({ storage, memoryLimit: 3, buildContext: async () => ({}), request: async () => ({ content: "ok" }), tools: [], executeTool: async () => ({}) });
  agent.remember("user", "一");
  agent.remember("assistant", "二");
  agent.remember("user", "三");
  agent.remember("assistant", "四");
  assert.deepEqual([...agent.getMemory().messages.map((message) => message.content)], ["二", "三", "四"]);
  assert.equal(JSON.stringify(agent.getMemory()).includes("tool_call_id"), false);
});

test("common explicit shooting scenario bypasses model discretion and calls the calculator", async () => {
  const storage = createStorage();
  const context = vm.createContext({ console, localStorage: storage });
  context.globalThis = context;
  vm.runInContext(read("docs/assistant/corpus.js"), context);
  vm.runInContext(read("docs/assistant/constitution.js"), context);
  vm.runInContext(read("docs/assistant/tactical-agent.js"), context);
  const route = context.WarhammerTacticalCorpus.route("禁军盾卫射击星际战士终结者，算平均伤害", null);
  assert.deepEqual(JSON.parse(JSON.stringify(route)), {
    name: "calculate_combat",
    arguments: { attacker: "禁军盾卫", defender: "终结者小队", attackMode: "ranged", context: {} },
  });

  let modelRequested = false;
  const agent = context.WarhammerTacticalAgent.create({
    storage,
    routeQuestion: context.WarhammerTacticalCorpus.route,
    request: async () => { modelRequested = true; return { content: "模型不应参与这条确定性路径" }; },
    tools: [],
    buildContext: async () => ({}),
    executeTool: async () => ({ ok: true, attacker: { name: "禁军盾卫" }, defender: { name: "终结者小队" }, attackMode: "ranged", context: {}, averageDamage: 3.25, killProbability: 12.5 }),
    formatToolResult: (_route, result) => `平均伤害 ${result.averageDamage}`,
  });
  assert.equal(await agent.answer("禁军盾卫射击星际战士终结者，算平均伤害"), "平均伤害 3.25");
  assert.equal(modelRequested, false);
});

test("an unspecified damage request calculates both attack modes without asking the model", async () => {
  const storage = createStorage();
  const context = vm.createContext({ console, localStorage: storage });
  context.globalThis = context;
  vm.runInContext(read("docs/assistant/corpus.js"), context);
  vm.runInContext(read("docs/assistant/constitution.js"), context);
  vm.runInContext(read("docs/assistant/tactical-agent.js"), context);

  const question = "禁军盾卫攻击星际战士终结者，算一轮伤害";
  const route = context.WarhammerTacticalCorpus.route(question, null);
  assert.deepEqual(JSON.parse(JSON.stringify(route)), {
    intent: "combat-summary",
    toolCalls: [
      { name: "calculate_combat", arguments: { attacker: "禁军盾卫", defender: "终结者小队", attackMode: "melee", context: {} } },
      { name: "calculate_combat", arguments: { attacker: "禁军盾卫", defender: "终结者小队", attackMode: "ranged", context: {} } },
    ],
  });

  let modelRequested = false;
  const calls = [];
  const agent = context.WarhammerTacticalAgent.create({
    storage,
    routeQuestion: context.WarhammerTacticalCorpus.route,
    request: async () => { modelRequested = true; return { content: "不应调用模型" }; },
    executeTool: async (call) => {
      calls.push(call.function.name);
      const args = JSON.parse(call.function.arguments);
      return { ok: true, attacker: { name: args.attacker }, defender: { name: args.defender }, attackMode: args.attackMode, context: {}, averageDamage: args.attackMode === "ranged" ? 1.5 : 8, killProbability: 0 };
    },
    formatToolResult: (_route, results) => `已比较 ${results.length} 种攻击方式`,
  });
  assert.equal(await agent.answer(question), "已比较 2 种攻击方式");
  assert.deepEqual(calls, ["calculate_combat", "calculate_combat"]);
  assert.equal(modelRequested, false);
});

test("short attack-mode follow-up reuses the previous scenario locally", async () => {
  const storage = createStorage();
  const context = vm.createContext({ console, localStorage: storage });
  context.globalThis = context;
  vm.runInContext(read("docs/assistant/corpus.js"), context);
  const route = context.WarhammerTacticalCorpus.route("近战呢", {
    lastScenario: { attacker: "禁军盾卫", defender: "终结者小队", attackMode: "ranged", context: {} },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(route)), {
    name: "calculate_combat",
    arguments: { attacker: "禁军盾卫", defender: "终结者小队", attackMode: "melee", context: {} },
  });
});

test("model tool-loop exhaustion returns a user-facing fallback instead of an internal limit message", async () => {
  const storage = createStorage();
  const context = vm.createContext({ console, localStorage: storage });
  context.globalThis = context;
  vm.runInContext(read("docs/assistant/tactical-agent.js"), context);
  const agent = context.WarhammerTacticalAgent.create({
    storage,
    buildContext: async () => ({}),
    request: async () => ({ tool_calls: [{ id: "repeat", function: { name: "find_units", arguments: "{}" } }] }),
    executeTool: async () => ({ ok: false, error: "not found" }),
  });
  const reply = await agent.answer("帮我算伤害");
  assert.match(reply, /未能把工具返回整理成可用答案/);
  assert.doesNotMatch(reply, /调用次数达到上限/);
});
