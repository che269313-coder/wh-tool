import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const args = new Map();
for (let i = 2; i < process.argv.length; i += 2) args.set(process.argv[i].replace(/^--/, ""), process.argv[i + 1]);

const slug = args.get("slug");
const faction = args.get("name");
if (!slug || !faction) throw new Error("用法：node tools/convert-faction-api.mjs --slug <slug> --name <简体队伍名>");

const dir = path.join(root, "docs", "data", faction);
const rawPath = path.join(dir, `${faction}-网站原始数据-简体.json`);
const outputPath = path.join(dir, `${faction}-结构化数据卡.json`);
const markdownPath = path.join(dir, `${faction}-数据卡-可检索.md`);
const sourceNotePath = path.join(dir, "来源说明.md");
const detachmentRawPath = path.join(dir, "分遣队规则-11版原始文本.txt");
const detachmentMarkdownPath = path.join(dir, "分遣队规则-可检索.md");
const readJson = (file) => {
  let text = fs.readFileSync(file, "utf8");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  return JSON.parse(text);
};
const raw = readJson(rawPath);
const originalRaw = readJson(path.join(dir, `${faction}-网站原始数据.json`));
if (raw?.faction?.slug && raw.faction.slug !== slug) throw new Error(`slug 不匹配：${raw.faction.slug} !== ${slug}`);
if (!Array.isArray(raw.units)) throw new Error("API 响应缺少 units 数组");

const numberOrText = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(String(value).replace(/[+\"]$/g, ""));
  return Number.isFinite(n) ? n : value;
};
const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const unique = (items) => [...new Set(items.map(clean).filter(Boolean))];
const unitById = new Map(raw.units.map((entry) => [entry.unit?.id, entry.unit]));
const unitName = (unit) => unit?.name_zh || unit?.name || "未命名单位";
const weaponName = (weapon) => weapon?.name_zh || weapon?.profile_name_zh || weapon?.name || "未命名武器";
const isWargearAbility = (ability) => String(ability?.kind || "").toLowerCase() === "wargear";
const abilityEntries = (entry) => (entry.abilities || []).filter((ability) => !isWargearAbility(ability));
const profileSlug = (value) => String(value || "model")
  .normalize("NFKD").replace(/[’']/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "model";

function toModelProfiles(models = [], unit = {}) {
  if (models.length < 2) return [];
  const fixedOne = models.map((model, index) => ({ model, index }))
    .filter(({ model }) => Number(model.min) === 1 && Number(model.max) === 1);
  const namedChampion = fixedOne.find(({ model }) => /boss|nob|sergeant|champion|justicar|exarch|alpha|leader|shas['’]?ui|sybarite|acolyte/i.test(model.model_name || ""));
  const championIndex = namedChampion?.index ?? (unit.has_champion && fixedOne.length === 1 ? fixedOne[0].index : -1);
  const remainingIndex = models.map((model, index) => ({ model, index }))
    .filter(({ index }) => index !== championIndex)
    .sort((left, right) => Number(right.model.max || right.model.min || 0) - Number(left.model.max || left.model.min || 0))[0]?.index ?? -1;
  return models.map((model, index) => {
    const champion = index === championIndex;
    const remaining = index === remainingIndex;
    const name = model.model_name_zh || model.model_name || "普通模型";
    return {
      id: champion ? "champion" : remaining ? "trooper" : `model-${profileSlug(model.model_name || name)}`,
      name,
      englishName: model.model_name || "",
      role: champion ? "队长/首领" : "普通队员",
      ...(champion ? { count: 1 } : remaining ? { remaining: true } : Number(model.min) === Number(model.max) ? { count: Number(model.min) } : {}),
      min: model.min,
      max: model.max,
    };
  });
}

function defaultWeaponNames(entry) {
  const byEnglish = new Map((entry.weapons || []).map(({ weapon }) => [weapon?.name, weapon]));
  const defaults = (entry.weapons || []).filter((item) => item.is_default).map((item) => item.weapon);
  const optionDefaults = (entry.wargear_options || []).flatMap((gear) => (gear.schema_json?.options || [])
    .filter((option) => option.default)
    .map((option) => byEnglish.get(option.item_name))
    .filter(Boolean));
  return [...new Map([...defaults, ...optionDefaults].map((weapon) => [weapon.id || weapon.name, weapon])).values()];
}

function toWeapon(item) {
  const weapon = item.weapon || item;
  return {
    id: weapon.id || `${weapon.name}-${weapon.profile_name || "profile"}`,
    name: weaponName(weapon),
    englishName: weapon.name || weapon.profile_name || "",
    type: weapon.is_ranged ? "ranged" : "melee",
    range: weapon.is_ranged ? (weapon.range_ || "") : undefined,
    attacks: weapon.attacks ?? "",
    skill: weapon.ws_bs ?? "",
    strength: numberOrText(weapon.strength),
    ap: numberOrText(weapon.ap),
    damage: weapon.damage ?? "",
    abilities: [...(weapon.ability_keywords_zh || [])],
    abilitiesEn: [...(weapon.ability_keywords || [])],
    count: Number(item.count || 1),
    isDefault: Boolean(item.is_default),
  };
}

function toAbility(ability, index) {
  return {
    id: `${ability.kind || "unit"}.${ability.name || index}`.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, ""),
    name: ability.name_zh || ability.name || `技能 ${index + 1}`,
    englishName: ability.name || "",
    category: ability.kind || "unit",
    text: ability.text_zh || "",
    status: "仅供查阅",
  };
}

function toCard(entry, index) {
  const unit = entry.unit || {};
  const weapons = (entry.weapons || []).map(toWeapon);
  const defaults = defaultWeaponNames(entry);
  const defaultEquipment = defaults.length
    ? defaults.map(weaponName).join("；")
    : weapons.length
      ? "（源站未标明默认装备，需复核）"
      : "无（源站未提供武器档）";
  const composition = entry.compositions?.[0];
  const modelProfiles = toModelProfiles(composition?.models || [], unit).map((profile) => ({ ...profile, defaultEquipment }));
  const leaderText = unit.leader_effect_zh || "";
  const leaderTargets = (entry.leads || []).map((id) => unitById.get(id)).filter(Boolean).map(unitName);
  const card = {
    id: `${slug}.${unit.id || index}`,
    name: unitName(unit),
    englishName: unit.name || "",
    page: null,
    source: { file: `${faction}-网站原始数据.json`, record: index + 1, extraction: "faction-full API; raw fields preserved" },
    unit: {
      name: unitName(unit),
      movement: numberOrText(String(unit.movement || "").replace(/\"$/, "")),
      toughness: numberOrText(unit.toughness),
      save: numberOrText(unit.save),
      invulnerableSave: numberOrText(unit.invuln_save),
      woundsPerModel: numberOrText(unit.wounds),
      leadership: unit.leadership || "",
      objectiveControl: numberOrText(unit.oc),
      models: composition?.models?.reduce((sum, model) => sum + Number(model.min || 0), 0) || 1,
      defaultEquipment,
      abilities: abilityEntries(entry).map((ability) => ability.name_zh || ability.name).filter(Boolean).join("；"),
      activeAbilities: "",
    },
    composition: composition ? {
      minModels: composition.models?.reduce((sum, model) => sum + Number(model.min || 0), 0) || 1,
      maxModels: composition.models?.reduce((sum, model) => sum + Number(model.max || 0), 0) || 1,
      text: composition.label_zh || composition.label || "",
      points: composition.points ?? null,
    } : { text: "" },
    ...(modelProfiles.length ? { modelProfiles } : {}),
    weapons,
    wargearOptions: (entry.wargear_options || []).map((gear) => ({
      text: gear.instruction_zh || gear.instruction || "",
      options: gear.schema_json?.options || [],
      choices: gear.choices_json || null,
      caps: gear.caps_json || null,
    })),
    abilities: abilityEntries(entry).map(toAbility),
    keywords: unique(unit.keywords || []),
    factionKeywords: unique([...(unit.faction_keywords || []), raw.faction?.name_zh || faction]),
    leader: leaderText || leaderTargets.length ? { canLead: leaderTargets, text: leaderText } : undefined,
    extraction: {
      rawText: [unit.damaged_text_zh, ...abilityEntries(entry).map((ability) => ability.text_zh), ...(entry.wargear_options || []).map((gear) => gear.instruction_zh)].filter(Boolean).join("\n"),
      confidence: "high",
      needsReview: false,
    },
    verification: `来源：https://40k11e-backend.aiinpocket.com/api/faction-full?slug=${slug}；第 11 版网站 API 原始记录 ${index + 1}。默认装备由 API 的 is_default / Default Wargear 字段映射。`,
  };
  return card;
}

const cards = raw.units.map(toCard);
const seenNames = new Set();
for (const card of cards) {
  if (seenNames.has(card.name)) {
    const uniqueName = `${card.name}（${card.englishName}）`;
    card.name = uniqueName;
    card.unit.name = uniqueName;
  }
  seenNames.add(card.name);
}
const missingDefaults = cards.filter((card) => card.weapons.length > 0 && card.unit.defaultEquipment.startsWith("（源站未标明" )).map((card) => card.name);
const output = {
  faction,
  englishName: raw.faction?.name || "",
  kind: "datasheet-profiles",
  schemaVersion: 1,
  source: { file: `${faction}-网站原始数据.json`, url: `https://40k11e-backend.aiinpocket.com/api/faction-full?slug=${slug}`, language: "繁体中文（原始）/简体中文（脚本转换）" },
  cards,
  extraction: { units: raw.units.length, detachments: raw.detachments?.length || 0, missingDefaults },
};
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8");

const md = [`# ${faction} 数据卡`, "", `来源：${output.source.url}`, `单位数：${cards.length}`, `分遣队数：${raw.detachments?.length || 0}`, `默认装备缺失：${missingDefaults.length}`, "", "## 单位索引", "", "| # | 单位 | 英文名 | 默认装备 | 武器档数 |", "|---:|---|---|---|---:|"];
cards.forEach((card, index) => md.push(`| ${index + 1} | ${card.name} | ${card.englishName} | ${card.unit.defaultEquipment || "（源站未标明，需复核）"} | ${card.weapons.length} |`));
for (const card of cards) {
  md.push("", `## ${card.name}`, "", `- 英文名：${card.englishName}`, `- 属性：M ${card.unit.movement}；T ${card.unit.toughness}；Sv ${card.unit.save}；W ${card.unit.woundsPerModel}；Ld ${card.unit.leadership}；OC ${card.unit.objectiveControl}`, `- 默认装备：${card.unit.defaultEquipment || "（源站未标明，需复核）"}`, `- 关键词：${[...(card.factionKeywords || []), ...(card.keywords || [])].join("、")}`, "", "### 武器", "", "| 武器 | 类型 | A | 命中 | S | AP | D | 能力 |", "|---|---|---:|---|---:|---:|---|---|");
  card.weapons.forEach((weapon) => md.push(`| ${weapon.name} | ${weapon.type} | ${weapon.attacks} | ${weapon.skill} | ${weapon.strength} | ${weapon.ap} | ${weapon.damage} | ${(weapon.abilities || []).join("、")} |`));
  if (card.abilities?.length) { md.push("", "### 技能", ""); card.abilities.forEach((ability) => md.push(`- **${ability.name}**：${ability.text}`)); }
  if (card.wargearOptions?.length) { md.push("", "### 装备选项", ""); card.wargearOptions.forEach((gear) => md.push(`- ${gear.text}`)); }
}
fs.writeFileSync(markdownPath, md.join("\n") + "\n", "utf8");
fs.writeFileSync(detachmentRawPath, JSON.stringify(originalRaw.detachments || [], null, 2) + "\n", "utf8");
const detachmentMarkdown = [`# ${faction} 分遣队规则`, "", `来源：https://40k11e-backend.aiinpocket.com/api/faction-full?slug=${slug}`, ""];
(raw.detachments || []).forEach((entry, index) => {
  const detachment = entry.detachment || {};
  detachmentMarkdown.push(`## ${index + 1}. ${detachment.name_zh || detachment.name || "未命名分遣队"}`, "", `- 英文名：${detachment.name || ""}`, `- DP：${detachment.detachment_points ?? ""}`, `- 分遣队规则：${detachment.rule_name_zh || detachment.rule_name || ""}`, "", detachment.rule_text_zh || "", "");
  for (const ability of entry.abilities || []) {
    const type = ability.kind === "stratagem" ? "计谋" : ability.kind === "enhancement" ? "增强" : ability.kind || "规则";
    detachmentMarkdown.push(`### ${type}：${ability.name_zh || ability.name || "未命名"}`, "", ability.when_text_zh || "", ability.effect_text_zh || ability.text_zh || "", "");
  }
});
fs.writeFileSync(detachmentMarkdownPath, detachmentMarkdown.join("\n"), "utf8");
fs.writeFileSync(sourceNotePath, [
  `# ${faction} 来源说明`, "",
  `- 来源接口：https://40k11e-backend.aiinpocket.com/api/faction-full?slug=${slug}`,
  `- 抓取日期：${new Date().toISOString().slice(0, 10)}`,
  `- 顶层键：${Object.keys(raw).join("、")}`,
  `- 单位数量：${raw.units.length}`,
  `- 分遣队数量：${raw.detachments?.length || 0}`,
  `- 繁体原始文件：${faction}-网站原始数据.json（直接保存 API 响应）`,
  `- 简体文件：${faction}-网站原始数据-简体.json（由 tools/ConvertTo-SimplifiedChinese.ps1 生成）`,
  `- 结构化文件：${faction}-结构化数据卡.json（由 tools/convert-faction-api.mjs 生成）`,
  `- 分遣队原始文本：分遣队规则-11版原始文本.txt（由繁体 API 原始记录序列化归档）`,
  `- 分遣队可检索文本：分遣队规则-可检索.md`,
  "- 备注：默认装备优先取 API 的 is_default 和 Default Wargear；源站无武器档的防御工事/孢子等单位明确标注“无（源站未提供武器档）”，不伪造武器。",
  "",
].join("\n"), "utf8");
console.log(JSON.stringify({ faction, units: cards.length, detachments: raw.detachments?.length || 0, missingDefaults, outputPath, markdownPath, sourceNotePath, detachmentRawPath, detachmentMarkdownPath }));
