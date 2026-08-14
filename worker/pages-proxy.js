const JSON_HEADERS = { "content-type": "application/json; charset=UTF-8" };

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = env.ALLOWED_ORIGIN || "*";
  const allowOrigin = allowed === "*" || allowed.split(",").map((item) => item.trim()).includes(origin) ? (allowed === "*" ? "*" : origin) : allowed;
  return {
    ...JSON_HEADERS,
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type, authorization",
    "access-control-max-age": "86400",
  };
}

function json(data, request, env, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(request, env) });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    const url = new URL(request.url);
    if (url.pathname === "/api/health") return json({ ok: true, service: "warhammer-tactical-assistant" }, request, env);
    if (url.pathname === "/api/wathammer-round" && request.method === "POST") {
      try {
        const body = await request.json();
        const upstream = await fetch("https://wathammer.com/simulate-round", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        const raw = await upstream.text();
        let payload;
        try {
          payload = JSON.parse(raw);
        } catch {
          payload = { error: `wathammer.com 返回了非 JSON 响应（HTTP ${upstream.status}）`, details: raw.slice(0, 300) };
        }
        return json(payload, request, env, upstream.status);
      } catch (error) {
        return json({ error: error instanceof Error ? error.message : "Invalid calculator request" }, request, env, 400);
      }
    }
    if (url.pathname !== "/api/chat" || request.method !== "POST") return json({ error: "Not found" }, request, env, 404);
    if (!env.DEEPSEEK_API_KEY) return json({ error: "DEEPSEEK_API_KEY is not configured" }, request, env, 500);
    try {
      const body = await request.json();
      const suppliedMessages = Array.isArray(body.messages) ? body.messages : [];
      // Tool exchanges need the original assistant tool_call plus its tool
      // result. Keep the system instruction while bounding the conversation.
      const system = suppliedMessages.find((message) => message?.role === "system");
      const conversation = suppliedMessages.filter((message) => message !== system).slice(-24);
      const messages = system ? [system, ...conversation] : conversation;
      if (!messages.length) return json({ error: "messages is required" }, request, env, 400);
      const upstream = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${env.DEEPSEEK_API_KEY}` },
        body: JSON.stringify({
          model: env.DEEPSEEK_MODEL || body.model || "deepseek-v4-flash",
          messages,
          tools: Array.isArray(body.tools) ? body.tools : undefined,
          tool_choice: body.tool_choice,
          stream: false,
        }),
      });
      const payload = await upstream.json();
      return json(payload, request, env, upstream.status);
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Invalid request" }, request, env, 400);
    }
  },
};
