const STORAGE_KEY = "warhammer-tactical-assistant-settings";
const DB_NAME = "warhammer-tactical-assistant-v1";
const DB_STORE = "library";
const BUILTIN_LIBRARY_FILES = [
  "data/11版核心规则简中.pdf",
  "data/帝皇禁军10版中文老湿腐版1.07.pdf",
  "data/分遣队速查表.pdf",
  "data/星际战士11版中文1.0.pdf",
];
const DEFAULT_SETTINGS = {
  mode: "direct",
  key: "",
  endpoint: "https://api.deepseek.com/chat/completions",
  model: "deepseek-v4-flash",
  calculatorEndpoint: "",
  rememberKey: false,
};

const state = {
  settings: loadSettings(),
  shootAgain: true,
  messages: [],
  roundPayload: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadSettings() {
  try {
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  const sessionValue = { ...settings };
  const persistedValue = { ...settings };
  if (!persistedValue.rememberKey) persistedValue.key = "";
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedValue));
  state.settings = { ...state.settings, ...sessionValue };
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function setView(viewName) {
  $$(".view").forEach((view) => view.classList.toggle("is-active", view.id === `view-${viewName}`));
  $$("[data-view]").forEach((button) => button.classList.toggle("is-active", button.dataset.view === viewName));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$('[data-view]').forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
$("#importShortcut").addEventListener("click", () => setView("library"));

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(DB_STORE, { keyPath: "id", autoIncrement: true });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getLibraryFiles() {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const request = db.transaction(DB_STORE, "readonly").objectStore(DB_STORE).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return [];
  }
}

async function addLibraryFile(file) {
  const isText = /text|json|markdown/.test(file.type) || /\.(txt|md|json)$/i.test(file.name);
  const content = isText ? await file.text() : "";
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(DB_STORE, "readwrite").objectStore(DB_STORE).add({
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      content,
      blob: file,
      createdAt: Date.now(),
    });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function importBuiltinLibraryFiles() {
  try {
    const existing = await getLibraryFiles();
    const existingNames = new Set(existing.map((file) => file.name));
    const imported = [];
    for (const path of BUILTIN_LIBRARY_FILES) {
      const name = path.split("/").pop();
      if (existingNames.has(name)) continue;
      try {
        const response = await fetch(path);
        if (!response.ok) continue;
        const blob = await response.blob();
        const file = new File([blob], name, { type: blob.type || "application/pdf" });
        await addLibraryFile(file);
        imported.push(name);
      } catch {
        // 本地 file:// 预览无法 fetch，跳过即可
      }
    }
    if (imported.length) {
      renderLibrary();
      showToast(`已默认导入 ${imported.length} 份规则资料`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function clearLibrary() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(DB_STORE, "readwrite").objectStore(DB_STORE).clear();
    request.onsuccess = resolve;
    request.onerror = () => reject(request.error);
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function renderLibrary() {
  const files = await getLibraryFiles();
  const list = $("#libraryList");
  if (!files.length) {
    list.innerHTML = '<div class="library-empty">还没有资料。把军表、数据卡或规则书导入这里。</div>';
    return;
  }
  list.innerHTML = files.map((file) => {
    const ext = file.name.split(".").pop()?.toUpperCase() || "FILE";
    const note = file.content ? "可作为 AI 上下文" : "已保存，待 PDF 解析";
    return `<div class="library-item"><span class="file-icon">${ext.slice(0, 4)}</span><div><strong>${escapeHtml(file.name)}</strong><small>${formatBytes(file.size)} · ${note}</small></div></div>`;
  }).join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

$("#libraryFiles").addEventListener("change", async (event) => {
  const files = [...event.target.files];
  if (!files.length) return;
  try {
    for (const file of files) await addLibraryFile(file);
    await renderLibrary();
    showToast(`已导入 ${files.length} 个资料文件`);
  } catch (error) {
    console.error(error);
    showToast("导入失败，请检查浏览器存储权限");
  }
  event.target.value = "";
});

$("#clearLibrary").addEventListener("click", async () => {
  if (!window.confirm("确定清空本机资料库吗？")) return;
  await clearLibrary();
  await renderLibrary();
  showToast("已清空本机资料库");
});

function woundTarget(strength, toughness) {
  if (strength >= toughness * 2) return 2;
  if (strength > toughness) return 3;
  if (strength === toughness) return 4;
  if (strength * 2 <= toughness) return 6;
  return 5;
}

function d6() { return Math.floor(Math.random() * 6) + 1; }
function rollDamage() { return d6() + 2; }

function fireWeapon({ shots, bs, strength, ap, damage, sustained = 0, lethal = false, twinLinked = false }, target) {
  let totalDamage = 0;
  const woundOn = woundTarget(strength, target.toughness);
  for (let i = 0; i < shots; i += 1) {
    const hitRoll = d6();
    if (hitRoll < bs) continue;
    const critical = hitRoll === 6;
    const hitCount = 1 + (critical ? sustained : 0);
    if (lethal && critical) {
      totalDamage += target.saveDamage(ap, damage);
      continue;
    }
    for (let hit = 0; hit < hitCount; hit += 1) {
      let woundRoll = d6();
      if (woundRoll < woundOn && twinLinked) woundRoll = d6();
      if (woundRoll < woundOn) continue;
      totalDamage += target.saveDamage(ap, damage);
    }
  }
  return totalDamage;
}

function simulateScenario(runs = 1000) {
  if (!window.WarhammerEngine) throw new Error("本地规则引擎未加载");
  const payload = { ...buildExternalRoundPayload(), simulations: runs };
  const result = window.WarhammerEngine.simulateRound(payload);
  const total = Number(result.total || runs) || runs;
  const averageDamage = window.WarhammerEngine.averageHistogram(result.totalDamage);
  const chance = result.kills.x.reduce((sum, value, index) => sum + (Number(value) > 0 ? Number(result.kills.y[index] || 0) : 0), 0) / total;
  return { chance, averageDamage, engine: result };
}

function emptyWeaponEffects(overrides = {}) {
  return {
    hitRerollFixedEnabled: false, hitRerollFixedAmount: 1, hitRerollFixedType: "ones", hitRerollFixedValues: [],
    hitRerollAllEnabled: false, hitRerollAllType: "ones", hitRerollAllValues: [], hitModifierEnabled: false, hitModifierValue: 0,
    hitCriticalEnabled: false, criticalHitThreshold: 6, woundRerollFixedEnabled: false, woundRerollFixedAmount: 1, woundRerollFixedType: "ones", woundRerollFixedValues: [],
    woundRerollAllEnabled: false, woundRerollAllType: "ones", woundRerollAllValues: [], woundModifierEnabled: false, woundModifierValue: 0,
    woundCriticalEnabled: false, criticalWoundThreshold: 6, sustainedHitsEnabled: false, sustainedHitsValue: "1", lethalHitsEnabled: false,
    devastatingWoundsEnabled: false, damageRerollEnabled: false, damageRerollType: "ones", damageRerollAmount: "1", damageRerollValues: [],
    criticalWoundApEnabled: false, criticalWoundApValue: 1, negatedWoundsEnabled: false, negatedWoundsCount: 1, ...overrides,
  };
}

function emptyDefenderEffects() {
  return {
    saveRerollFixedEnabled: false, saveRerollFixedAmount: 1, saveRerollFixedType: "ones", saveRerollFixedValues: [],
    saveRerollAllEnabled: false, saveRerollAllType: "ones", saveRerollAllValues: [], feelNoPainEnabled: false,
    feelNoPainThreshold: 6, feelNoPainMortalEnabled: false, feelNoPainMortalThreshold: 6, oneUseInvulnerableEnabled: false, oneUseInvulnerableSave: 2,
  };
}

function buildDefaultRoundPayload() {
  const weaponGroups = [
    { name: "神鸟·阿拉克努斯重型爆炎炮", modelCount: 1, attacks: "4", hit: 2, wound: 3, ap: 3, damage: "1d6+2", effects: emptyWeaponEffects({ woundRerollAllEnabled: true, woundRerollAllType: "failed", lethalHitsEnabled: true }) },
    { name: "神鸟·拉斯托姆型爆弹炮", modelCount: 1, attacks: "3", hit: 2, wound: 5, ap: 1, damage: "1", effects: emptyWeaponEffects({ sustainedHitsEnabled: true, sustainedHitsValue: "1" }) },
    { name: "盾卫·卫士之矛（第一轮）", modelCount: 3, attacks: "2", hit: 2, wound: 5, ap: 1, damage: "2", effects: emptyWeaponEffects() },
  ];
  if (state.shootAgain) weaponGroups.push({ name: "盾卫·卫士之矛（再次射击）", modelCount: 3, attacks: "2", hit: 2, wound: 5, ap: 1, damage: "2", effects: emptyWeaponEffects() });
  return {
    simulations: 1000,
    weaponGroups,
    defenderGroups: [{ name: "冲击者突击艇", modelCount: 1, wounds: 11, save: 3, invulnerableSave: 5, allocationOrder: 1, effects: emptyDefenderEffects() }],
  };
}

function buildExternalRoundPayload() {
  const payload = state.roundPayload
    ? JSON.parse(JSON.stringify(state.roundPayload))
    : buildDefaultRoundPayload();
  payload.simulations = 1000;
  return payload;
}

function renderScenarioJson() {
  const editor = $("#scenarioJson");
  if (!editor) return;
  editor.value = JSON.stringify(state.roundPayload || buildDefaultRoundPayload(), null, 2);
}

$("#loadScenarioJson")?.addEventListener("click", () => {
  try {
    const parsed = JSON.parse($("#scenarioJson").value);
    if (!Array.isArray(parsed.weaponGroups) || !Array.isArray(parsed.defenderGroups)) {
      throw new Error("必须包含 weaponGroups 和 defenderGroups 数组");
    }
    state.roundPayload = parsed;
    showToast("高级场景已载入");
  } catch (error) {
    showToast(`JSON 无法载入：${error.message}`);
  }
});

$("#resetScenarioJson")?.addEventListener("click", () => {
  state.roundPayload = null;
  renderScenarioJson();
  showToast("已恢复示例场景");
});

async function runExternalCalculator() {
  const endpoint = state.settings.calculatorEndpoint.trim();
  if (!endpoint) throw new Error("请先在设置中配置外部计算器代理地址");
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(buildExternalRoundPayload()) });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  const data = await response.json();
  const summary = data.roundSummary || {};
  const weapons = summary.weaponGroups || [];
  const defenders = summary.defenderGroups || [];
  const histogramAverage = (histogram) => {
    if (!histogram?.x?.length || !histogram?.y?.length) return null;
    const total = Number(histogram.total || data.total || histogram.y.reduce((sum, value) => sum + Number(value || 0), 0));
    return histogram.x.reduce((sum, value, index) => sum + Number(value) * Number(histogram.y[index] || 0), 0) / total;
  };
  const histogramKillChance = (histogram) => {
    if (!histogram?.x?.length || !histogram?.y?.length) return null;
    const total = Number(histogram.total || data.total || histogram.y.reduce((sum, value) => sum + Number(value || 0), 0));
    return histogram.x.reduce((sum, value, index) => sum + (Number(value) > 0 ? Number(histogram.y[index] || 0) : 0), 0) / total;
  };
  const averageDamage = histogramAverage(data.totalDamage) ?? weapons.reduce((sum, group) => sum + Number(group.averageDamage || 0), 0);
  const averageHits = histogramAverage(data.hit) ?? weapons.reduce((sum, group) => sum + Number(group.averageHits || 0), 0);
  const averageWounds = histogramAverage(data.wound) ?? weapons.reduce((sum, group) => sum + Number(group.averageWounds || 0), 0);
  const averageKills = histogramKillChance(data.kills) ?? defenders.reduce((sum, group) => sum + Number(group.averageKills || 0), 0);
  $("#externalChance").textContent = `${(averageKills * 100).toFixed(1)}%`;
  $("#externalDamage").textContent = averageDamage.toFixed(2);
  const local = state.localCalculation || simulateScenario(1000);
  const chanceDelta = (local.chance - averageKills) * 100;
  const damageDelta = local.averageDamage - averageDamage;
  $("#externalNote").textContent = `1000 次 · ${averageHits.toFixed(2)} 命中 · ${averageWounds.toFixed(2)} 造伤 · 本地偏差 ${chanceDelta >= 0 ? "+" : ""}${chanceDelta.toFixed(1)} 个百分点 / ${damageDelta >= 0 ? "+" : ""}${damageDelta.toFixed(2)} 伤害`;
  return { averageDamage, averageKills, chanceDelta, damageDelta };
}

function renderCalculation(result) {
  state.localCalculation = result;
  const chance = `${(result.chance * 100).toFixed(1)}%`;
  const damage = result.averageDamage.toFixed(2);
  $("#killChance").textContent = chance;
  $("#calcChance").textContent = chance;
  $("#averageDamage").textContent = damage;
  $("#calcDamage").textContent = damage;
  $("#killMeter").style.width = `${result.chance * 100}%`;
  $("#calcNote").textContent = state.shootAgain
    ? "已计入神鸟全部射击武器与盾卫再次射击；保持警戒未计入射击。"
    : "已计入神鸟全部射击武器；盾卫未开启一次性再次射击，保持警戒未计入射击。";
}

$("#shootAgain").addEventListener("change", (event) => {
  state.shootAgain = event.target.checked;
  showToast(state.shootAgain ? "已开启：盾卫再次射击" : "已关闭：盾卫再次射击");
});

$("#runCalc").addEventListener("click", () => {
  const button = $("#runCalc");
  button.disabled = true;
  button.textContent = "模拟中…";
  window.setTimeout(() => {
    renderCalculation(simulateScenario());
    button.disabled = false;
    button.textContent = "模拟 1,000 次";
    showToast("模拟完成");
  }, 30);
});

$("#runExternalCalc").addEventListener("click", async () => {
  const button = $("#runExternalCalc");
  button.disabled = true;
  button.textContent = "外部计算中…";
  try {
    await runExternalCalculator();
    showToast("外部基准计算完成");
  } catch (error) {
    console.error(error);
    $("#externalNote").textContent = error.message;
    showToast("外部计算失败");
  } finally {
    button.disabled = false;
    button.textContent = "外部基准计算";
  }
});

function loadSettingsForm() {
  $("#apiMode").value = state.settings.mode;
  $("#apiKey").value = state.settings.key || "";
  $("#apiEndpoint").value = state.settings.endpoint;
  $("#apiModel").value = state.settings.model;
  $("#calculatorEndpoint").value = state.settings.calculatorEndpoint;
  $("#rememberKey").checked = state.settings.rememberKey;
  updateEndpointHint();
}

function updateEndpointHint() {
  const mode = $("#apiMode").value;
  $("#apiEndpoint").placeholder = mode === "proxy" ? "https://你的-worker.example.workers.dev/api/chat" : "https://api.deepseek.com/chat/completions";
  $("#apiEndpoint").disabled = false;
}

$("#apiMode").addEventListener("change", updateEndpointHint);
$("#settingsForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveSettings({
    mode: $("#apiMode").value,
    key: $("#apiKey").value.trim(),
    endpoint: $("#apiEndpoint").value.trim(),
    model: $("#apiModel").value.trim() || "deepseek-v4-flash",
    calculatorEndpoint: $("#calculatorEndpoint").value.trim(),
    rememberKey: $("#rememberKey").checked,
  });
  $("#connectionStatus").textContent = state.settings.mode === "proxy" ? "代理待连接" : state.settings.key ? "AI 已配置" : "本地预览";
  $("#connectionStatus").classList.toggle("muted", !state.settings.key && state.settings.mode !== "proxy");
  showToast("连接设置已保存");
});

async function buildLibraryContext() {
  const files = await getLibraryFiles();
  return files.filter((file) => file.content).slice(0, 5).map((file) => `【${file.name}】\n${file.content.slice(0, 3500)}`).join("\n\n");
}

function localAssistantReply(text) {
  if (/射击|击杀|概率|伤害/.test(text)) return "当前是本地计算预览：我已按神鸟全部射击武器、盾卫一次性再次射击开启、保持警戒不计入射击来模拟。点击“计算”页可以重新跑 1,000 次。导入数据卡后，我会再把武器与规则来源接入。";
  if (/计谋|战略/.test(text)) return "我会从已导入的阵营规则与核心规则中筛选阶段、目标和限制；目前资料库还没有可检索的结构化条目。";
  return "这是本地预览模式。请在“设置”页配置 DeepSeek API Key，或填入 Worker 地址，我就能读取当前对局状态和已导入的文本资料。";
}

function appendMessage(role, text) {
  const container = $("#chatMessages");
  const item = document.createElement("div");
  item.className = `message ${role}`;
  item.innerHTML = role === "assistant" ? `<span class="avatar">⚔</span><p>${escapeHtml(text).replace(/\n/g, "<br />")}</p>` : `<p>${escapeHtml(text).replace(/\n/g, "<br />")}</p>`;
  container.appendChild(item);
  container.scrollTop = container.scrollHeight;
}

async function callAssistant(text) {
  const settings = state.settings;
  const context = await buildLibraryContext();
  const system = "你是战锤40,000对局助手。先依据用户导入的资料和当前对局状态理解诉求，再建议调用确定性的骰子计算器。不要臆造数据卡；缺资料时明确说缺什么。保持回答简洁，并提醒规则版本。";
  const messages = [
    { role: "system", content: system },
    ...state.messages.slice(-8),
    { role: "user", content: `${text}\n\n当前状态：神鸟 + 剑锋冠军联合禁军盾卫，对阵冲击者突击艇；枪林弹雨=${state.shootAgain ? "开启" : "关闭"}；保持警戒=仅近战。\n\n已导入资料摘录：${context || "暂无文本摘录"}` },
  ];
  if (settings.mode === "direct" && !settings.key) return localAssistantReply(text);
  const endpoint = settings.endpoint || (settings.mode === "direct" ? "https://api.deepseek.com/chat/completions" : "");
  if (!endpoint) return "请先在设置页填入 Worker 地址。";
  const headers = { "Content-Type": "application/json" };
  if (settings.mode === "direct") headers.Authorization = `Bearer ${settings.key}`;
  const payload = settings.mode === "proxy" ? { messages, model: settings.model } : { model: settings.model, messages, stream: false };
  const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || data.output?.[0]?.content?.[0]?.text || "接口没有返回可显示的回答。";
}

$("#chatForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = $("#chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  appendMessage("user", text);
  state.messages.push({ role: "user", content: text });
  const pending = "正在查资料并计算…";
  appendMessage("assistant", pending);
  const pendingNode = $("#chatMessages").lastElementChild;
  try {
    const reply = await callAssistant(text);
    pendingNode.querySelector("p").innerHTML = escapeHtml(reply).replace(/\n/g, "<br />");
    state.messages.push({ role: "assistant", content: reply });
    $("#connectionStatus").textContent = state.settings.mode === "proxy" || state.settings.key ? "AI 已连接" : "本地预览";
    $("#connectionStatus").classList.remove("muted");
  } catch (error) {
    console.error(error);
    pendingNode.querySelector("p").innerHTML = "调用失败：请检查 API 地址、Key 或浏览器跨域设置。若是 GitHub Pages 直接调用失败，请切换到 Worker 代理模式。";
    showToast("AI 调用失败");
  }
});

$$('.quick-prompts button').forEach((button) => button.addEventListener("click", () => {
  $("#chatInput").value = button.dataset.prompt;
  $("#chatInput").focus();
}));

loadSettingsForm();
renderLibrary();
importBuiltinLibraryFiles();
renderScenarioJson();
try {
  renderCalculation(simulateScenario(1000));
} catch {
  renderCalculation({ chance: 0.733, averageDamage: 11.05 });
}
