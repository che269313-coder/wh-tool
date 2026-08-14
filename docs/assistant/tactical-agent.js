(function registerTacticalAgent(root) {
  "use strict";

  const DEFAULT_MEMORY_LIMIT = 12;
  const DEFAULT_STORAGE_KEY = "warhammer-tactical-assistant-agent-memory-v1";

  function safeJsonParse(value, fallback) {
    try { return JSON.parse(value); } catch { return fallback; }
  }

  function normalizeMemory(value) {
    const source = value && typeof value === "object" ? value : {};
    return {
      version: 1,
      messages: Array.isArray(source.messages)
        ? source.messages.filter((message) => ["user", "assistant"].includes(message?.role) && typeof message.content === "string")
        : [],
      lastScenario: source.lastScenario && typeof source.lastScenario === "object" ? source.lastScenario : null,
    };
  }

  function create(config = {}) {
    const storage = config.storage || root.localStorage;
    const storageKey = config.storageKey || DEFAULT_STORAGE_KEY;
    const memoryLimit = Math.max(1, Number(config.memoryLimit || DEFAULT_MEMORY_LIMIT));
    const constitution = config.constitution || root.WarhammerTacticalConstitution || { systemPrompt: "", fewShotExamples: "" };
    const tools = Array.isArray(config.tools) ? config.tools : [];
    const request = config.request;
    const executeTool = config.executeTool;
    const buildContext = config.buildContext || (async () => ({}));
    const routeQuestion = config.routeQuestion;
    const formatToolResult = config.formatToolResult;
    let memory = normalizeMemory(safeJsonParse(storage?.getItem?.(storageKey), null));

    function persist() {
      storage?.setItem?.(storageKey, JSON.stringify(memory));
    }

    function remember(role, content) {
      if (!["user", "assistant"].includes(role) || typeof content !== "string" || !content.trim()) return;
      memory.messages.push({ role, content: content.trim() });
      memory.messages = memory.messages.slice(-memoryLimit);
      persist();
    }

    function rememberScenario(toolName, result) {
      if (toolName !== "calculate_combat" || !result?.ok || !result.attacker?.name || !result.defender?.name) return;
      memory.lastScenario = {
        attacker: result.attacker.name,
        defender: result.defender.name,
        attackMode: result.attackMode,
        context: result.context || {},
      };
      persist();
    }

    function getMemory() {
      return JSON.parse(JSON.stringify(memory));
    }

    function clearMemory() {
      memory = { version: 1, messages: [], lastScenario: null };
      persist();
    }

    async function answer(question) {
      if (typeof request !== "function" || typeof executeTool !== "function") throw new Error("战术 Agent 尚未连接模型请求或工具执行器。");
      const routedTool = typeof routeQuestion === "function" ? routeQuestion(question, getMemory()) : null;
      const routedCalls = routedTool?.toolCalls || (routedTool?.name && routedTool.arguments ? [routedTool] : []);
      if (routedCalls.length && typeof formatToolResult === "function") {
        const results = [];
        for (const call of routedCalls) {
          const result = await executeTool({
            id: `routed-${Date.now()}-${results.length}`,
            function: { name: call.name, arguments: JSON.stringify(call.arguments) },
          });
          rememberScenario(call.name, result);
          results.push(result);
        }
        const reply = formatToolResult(routedTool, routedTool.toolCalls ? results : results[0]);
        remember("user", question);
        remember("assistant", reply);
        return reply;
      }
      const context = await buildContext(question, getMemory());
      const rememberedScenario = memory.lastScenario
        ? `\n最近计算场景（仅用于补全后续追问）：${JSON.stringify(memory.lastScenario)}`
        : "";
      const messages = [
        { role: "system", content: `${constitution.systemPrompt}\n\n${constitution.fewShotExamples}` },
        ...memory.messages,
        { role: "user", content: `${question}\n\n当前双方军表与伤口：\n${context.battle || "未建立军表"}\n\n本次选中的资料：${context.library || "暂无资料摘录"}${rememberedScenario}` },
      ];
      for (let step = 0; step < 4; step += 1) {
        const message = await request(messages, tools);
        if (!message) throw new Error("接口没有返回可显示的回答。");
        const toolCalls = Array.isArray(message.tool_calls) ? message.tool_calls : [];
        if (!toolCalls.length) {
          const reply = message.content || "模型没有给出可显示的回答。";
          remember("user", question);
          remember("assistant", reply);
          return reply;
        }
        messages.push({ role: "assistant", content: message.content || null, tool_calls: toolCalls });
        for (const toolCall of toolCalls) {
          const result = await executeTool(toolCall);
          rememberScenario(toolCall.function?.name, result);
          messages.push({ role: "tool", tool_call_id: toolCall.id, content: JSON.stringify(result) });
        }
      }
      const reply = "我未能把工具返回整理成可用答案。请换一种说法，或直接提供进攻单位、目标单位和想问的内容；例如“禁军盾卫打终结者，一轮伤害”。";
      remember("user", question);
      remember("assistant", reply);
      return reply;
    }

    return { answer, remember, getMemory, clearMemory };
  }

  root.WarhammerTacticalAgent = { create };
})(typeof globalThis === "undefined" ? this : globalThis);
