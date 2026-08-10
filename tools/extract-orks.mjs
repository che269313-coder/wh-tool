import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(root, "docs", "data", "欧克兽人");
const sourceUrl = "https://40k11e-backend.aiinpocket.com/api/faction-full?slug=orks";

const write = (filename, content) => fs.writeFileSync(path.join(dataDir, filename), content, "utf8");
const clean = (value) => String(value ?? "").replace(/\r/g, "").trim();
const displayName = (value, fallback = "") => clean(value) || clean(fallback);
const slug = (value) => String(value || "")
  .normalize("NFKD")
  .replace(/[’‘']/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "") || "entry";
const numberOrText = (value) => {
  const text = clean(value).replace(/[”"]$/, "");
  const match = text.match(/^(\d+)(?:\+)?$/);
  return match ? Number(match[1]) : text;
};
const quoteRange = (value) => clean(value).replace(/\s*\"$/, "\"");
const datasheetAbilities = (unit) => (unit.abilities || []).filter((ability) => String(ability?.kind || "").toLowerCase() !== "wargear");
const unitId = (unit, index) => `orks.${slug(unit.unit.name)}.${String(unit.unit.id || index + 1).slice(0, 8)}`;
const weaponNameMap = (unit) => new Map((unit.weapons || []).map(({ weapon }) => {
  const key = clean(weapon.name).toLowerCase();
  return [key, displayName(weapon.profile_name_zh, displayName(weapon.name_zh, weapon.profile_name || weapon.name))];
}));

function weaponCard(entry, nameMap) {
  const weapon = entry.weapon || {};
  const name = displayName(weapon.profile_name_zh, displayName(weapon.name_zh, weapon.profile_name || weapon.name));
  const rawRange = clean(weapon.range_);
  const result = {
    id: weapon.id || `${slug(name)}-${weapon.is_ranged ? "ranged" : "melee"}`,
    name,
    englishName: displayName(weapon.profile_name, weapon.name),
    type: weapon.is_ranged ? "ranged" : "melee",
    range: rawRange && rawRange.toLowerCase() !== "melee" ? rawRange : undefined,
    attacks: clean(weapon.attacks),
    skill: clean(weapon.ws_bs),
    strength: numberOrText(weapon.strength),
    ap: numberOrText(weapon.ap),
    damage: clean(weapon.damage),
    abilities: (weapon.ability_keywords_zh || weapon.ability_keywords || []).map(clean).filter(Boolean),
    abilitiesEn: (weapon.ability_keywords || []).map(clean).filter(Boolean),
    isDefault: Boolean(entry.is_default),
    count: Number(entry.count || 1),
  };
  if (!result.range) delete result.range;
  return result;
}

function unitText(unit) {
  const abilityText = datasheetAbilities(unit).map((ability) => {
    const name = displayName(ability.name_zh, ability.name);
    return `${name}${ability.text_zh ? `：${clean(ability.text_zh)}` : ""}`;
  });
  const gearText = (unit.wargear_options || []).map((gear) => clean(gear.instruction_zh || gear.instruction)).filter(Boolean);
  return [...abilityText, ...gearText].join("\n");
}

function modelProfiles(unit, composition) {
  const models = composition?.models || [];
  if (models.length < 2) return undefined;
  const fixedOne = models.map((model, index) => ({ model, index }))
    .filter(({ model }) => Number(model.min) === 1 && Number(model.max) === 1);
  const namedChampion = fixedOne.find(({ model }) => /boss|nob|sergeant|champion|justicar|exarch|alpha|leader/i.test(model.model_name || ""));
  const championIndex = namedChampion?.index ?? (unit.unit.has_champion && fixedOne.length === 1 ? fixedOne[0].index : -1);
  const remainingIndex = models.map((model, index) => ({ model, index }))
    .filter(({ index }) => index !== championIndex)
    .sort((left, right) => Number(right.model.max || right.model.min || 0) - Number(left.model.max || left.model.min || 0))[0]?.index ?? -1;
  return models.map((model, index) => ({
    id: index === championIndex ? "champion" : index === remainingIndex ? "trooper" : `model-${slug(model.model_name)}`,
    name: displayName(model.model_name_zh, model.model_name),
    englishName: model.model_name || "",
    role: index === championIndex ? "队长" : "普通成员",
    min: model.min,
    max: model.max,
    ...(index === championIndex ? { count: 1 } : index === remainingIndex ? { remaining: true } : Number(model.min) === Number(model.max) ? { count: Number(model.min) } : {}),
  }));
}

function structuredCard(unit, index, faction, nameOverride = "") {
  const sourceUnit = unit.unit;
  const compositions = unit.compositions || [];
  const composition = compositions.find((item) => item.is_default) || compositions[0] || null;
  const modelCount = composition?.models?.reduce((sum, model) => sum + Number(model.min || 0), 0)
    || Number(unit.points?.[0]?.model_count || 1);
  const name = nameOverride || displayName(sourceUnit.name_zh, sourceUnit.name);
  const cardId = unitId(unit, index);
  const names = weaponNameMap(unit);
  const defaultEquipment = [...new Set((unit.wargear_options || [])
    .filter((gear) => gear.schema_json?.options?.some((option) => option.default))
    .flatMap((gear) => (gear.schema_json.options || [])
      .filter((option) => option.default)
      .map((option) => names.get(clean(option.item_name).toLowerCase()) || clean(option.item_name))))]
    .filter(Boolean)
    .join("，");
  const abilities = datasheetAbilities(unit).map((ability, abilityIndex) => ({
    id: `${cardId}.ability.${abilityIndex + 1}-${slug(ability.name)}`,
    name: displayName(ability.name_zh, ability.name),
    englishName: clean(ability.name),
    category: clean(ability.kind),
    text: clean(ability.text_zh || ability.text),
    status: "原文保留",
  }));
  const factionKeywords = [...new Set(["欧克兽人", ...(sourceUnit.faction_keywords || []).map(clean).filter(Boolean)])];
  const categoryKeywords = { Infantry: "步兵", Vehicle: "载具", Character: "角色", Monster: "凶兽", Beast: "凶兽", Walker: "机甲", Aircraft: "飞行", Transport: "运输工具" };
  const keywords = [...new Set([
    ...(sourceUnit.keywords || []).map((keyword) => categoryKeywords[keyword] || clean(keyword)).filter(Boolean),
    ...(sourceUnit.category ? [categoryKeywords[sourceUnit.category] || sourceUnit.category] : []),
    name,
  ])];
  const card = {
    id: cardId,
    name,
    englishName: clean(sourceUnit.name),
    source: { file: "欧克兽人-网站原始数据.json", record: index + 1, extraction: "11e backend JSON; raw fields preserved" },
    markdownSection: `欧克兽人-数据卡-可检索.md#${slug(name)}`,
    extraction: { rawText: unitText(unit), confidence: "high", needsReview: false },
    unit: {
      movement: numberOrText(sourceUnit.movement),
      toughness: numberOrText(sourceUnit.toughness),
      save: numberOrText(sourceUnit.save),
      invulnerableSave: numberOrText(sourceUnit.invuln_save || 0),
      woundsPerModel: numberOrText(sourceUnit.wounds),
      leadership: clean(sourceUnit.leadership),
      objectiveControl: numberOrText(sourceUnit.oc),
      name,
      models: modelCount,
      abilities: abilities.map((ability) => `${ability.name}${ability.text ? `：${ability.text}` : ""}`).join("；"),
      activeAbilities: "",
      defaultEquipment,
    },
    points: (unit.points || []).map((point) => ({ models: point.model_count, points: point.points })),
    composition: {
      text: compositions.map((item) => displayName(item.label_zh, item.label)).filter(Boolean).join("；"),
      options: compositions.map((item) => ({
        text: displayName(item.label_zh, item.label),
        points: item.points,
        models: (item.models || []).map((model) => ({ name: displayName(model.model_name_zh, model.model_name), min: model.min, max: model.max })),
      })),
    },
    modelProfiles: modelProfiles(unit, composition),
    keywords,
    factionKeywords,
    weapons: (unit.weapons || []).map((entry) => weaponCard(entry, names)),
    wargearOptions: (unit.wargear_options || []).map((gear) => ({
      text: clean(gear.instruction_zh || gear.instruction),
      textEn: clean(gear.instruction),
      options: (gear.schema_json?.options || []).map((option) => ({
        name: names.get(clean(option.item_name).toLowerCase()) || clean(option.item_name),
        nameEn: clean(option.item_name),
        itemType: clean(option.item_type),
        inputType: clean(option.input_type),
        default: Boolean(option.default),
      })),
      choices: gear.choices_json || null,
      caps: gear.caps_json || null,
    })),
    abilities,
    leader: sourceUnit.leader_effect_zh || (unit.leads || []).length ? {
      leadUnitIds: unit.leads || [],
      text: clean(sourceUnit.leader_effect_zh),
    } : undefined,
    damaged: sourceUnit.damaged_text_zh ? { desc: clean(sourceUnit.damaged_text_zh) } : null,
    verification: `来源：${sourceUrl}；第11版欧克兽人后端完整记录 ${index + 1}。中文字段由项目繁体转简体脚本逐字转换，英文/数值字段保留原始接口值。`,
  };
  if (!card.modelProfiles) delete card.modelProfiles;
  if (!card.leader) delete card.leader;
  return card;
}

function originalDatasheetMarkdown(raw) {
  const lines = [
    "# 欧克蠻人：第十一版網站資料卡索引",
    "",
    `来源：${sourceUrl}`,
    "",
    "> 此文件按网站后端返回记录保留，字段用于检索和人工核对；项目计算数值以结构化 JSON 为准。",
    "",
  ];
  raw.units.forEach((unit, index) => {
    const u = unit.unit;
    const name = displayName(u.name_zh, u.name);
    lines.push(`## ${index + 1}. ${name}（${u.name}）`, "", "| M | T | SV | ISV | W | LD | OC | 类别 |", "| --- | --- | --- | --- | --- | --- | --- | --- |", `| ${u.movement || ""} | ${u.toughness || ""} | ${u.save || ""} | ${u.invuln_save || ""} | ${u.wounds || ""} | ${u.leadership || ""} | ${u.oc || ""} | ${u.category || ""} |`, "", "### 编成与点数", "");
    for (const composition of unit.compositions || []) lines.push(`- ${displayName(composition.label_zh, composition.label)}：${composition.points ?? ""} 点`);
    lines.push("", "### 能力", "");
    for (const ability of unit.abilities || []) lines.push(`- **${displayName(ability.name_zh, ability.name)}**：${clean(ability.text_zh || ability.text)}`);
    lines.push("", "### 武器", "", "| 武器 | 类型 | 范围 | A | BS/WS | S | AP | D | 技能 |", "| --- | --- | --- | --- | --- | --- | --- | --- | --- |");
    for (const entry of unit.weapons || []) {
      const w = entry.weapon || {};
      lines.push(`| ${displayName(w.profile_name_zh, displayName(w.name_zh, w.profile_name || w.name))} | ${w.is_ranged ? "远程" : "近战"} | ${w.range_ || ""} | ${w.attacks || ""} | ${w.ws_bs || ""} | ${w.strength || ""} | ${w.ap || ""} | ${w.damage || ""} | ${(w.ability_keywords_zh || w.ability_keywords || []).join("，")} |`);
    }
    lines.push("", "### 装备选项", "");
    for (const gear of unit.wargear_options || []) lines.push(`- ${clean(gear.instruction_zh || gear.instruction)}`);
    lines.push("");
  });
  return lines.join("\n");
}

function originalUnitText(raw) {
  const lines = ["欧克蠻人 - 第十一版单位资料原始文本", `来源：${sourceUrl}`, ""];
  raw.units.forEach((unit, index) => {
    const u = unit.unit;
    lines.push(`============================================================`, `单位 #${index + 1}：${displayName(u.name_zh, u.name)} (${u.name})`, `属性：M ${u.movement} / T ${u.toughness} / SV ${u.save} / ISV ${u.invuln_save || "-"} / W ${u.wounds} / LD ${u.leadership} / OC ${u.oc}`, `关键词：${(u.keywords || []).join("，")}`, `阵营关键词：${(u.faction_keywords || []).join("，")}`);
    for (const composition of unit.compositions || []) lines.push(`单位构成/点数：${displayName(composition.label_zh, composition.label)} / ${composition.points ?? ""} 点`);
    for (const ability of unit.abilities || []) lines.push(`能力：${displayName(ability.name_zh, ability.name)}：${clean(ability.text_zh || ability.text)}`);
    for (const gear of unit.wargear_options || []) lines.push(`装备选项：${clean(gear.instruction_zh || gear.instruction)}`);
    lines.push("");
  });
  return lines.join("\n");
}

function detachmentHeader(detachment) {
  const d = detachment.detachment;
  const display = displayName(d.name_zh, d.name);
  const english = /[A-Za-z]/.test(d.name || "") && d.name !== d.name_zh ? ` (${d.name})` : "";
  return `${display}${english}`;
}

function entryHeader(entry) {
  const name = displayName(entry.name_zh, entry.name);
  const english = /[A-Za-z]/.test(entry.name || "") && entry.name !== entry.name_zh ? ` (${entry.name})` : "";
  return `${name}${english}`;
}

function originalDetachmentText(raw) {
  const lines = ["============================================================", "歐克蠻人 - 分遣隊完整規則 (第11版)", `来源：${sourceUrl}`, ""];
  raw.detachments.forEach((detachment, index) => {
    const d = detachment.detachment;
    const abilities = detachment.abilities || [];
    const stratagems = abilities.filter((entry) => entry.kind === "stratagem");
    const enhancements = abilities.filter((entry) => entry.kind === "enhancement");
    lines.push("------------------------------------------------------------", `分遣隊 #${index + 1} : ${detachmentHeader(detachment)}`, `DP 消費: ${d.detachment_points ?? 0}`, `分遣隊規則: ${displayName(d.rule_name_zh, d.rule_name)}`, `规则说明: ${clean(d.rule_text_zh || d.rule_text)}`, "", "  計謀 (Stratagems):");
    stratagems.forEach((entry, entryIndex) => {
      lines.push(`  ${entryIndex + 1}. ${entryHeader(entry)}`, `     CP: ${entry.cp_cost ?? 0}  階段: ${(entry.phases || []).join("、")}  類別:`, `      時機: ${clean(entry.when_text_zh)}`, `      目標: ${clean(entry.target_text_zh)}`, `      效果: ${clean(entry.effect_text_zh)}`, ...(entry.restriction_text_zh ? [`      限制: ${clean(entry.restriction_text_zh)}`] : []), "");
    });
    lines.push("  強化 (Enhancements):");
    enhancements.forEach((entry, entryIndex) => {
      lines.push(`  ${entryIndex + 1}. ${entryHeader(entry)}`, `      點數: ${entry.points_cost ?? 0}`, `      效果: ${clean(entry.effect_text_zh)}`, ...(entry.restriction_text_zh ? [`      限制: ${clean(entry.restriction_text_zh)}`] : []), "");
    });
  });
  return lines.join("\n");
}

function pointsMarkdown(raw) {
  const lines = ["# 欧克蠻人：第十一版分数表", "", `来源：${sourceUrl}`, "", "| 单位 | 英文名 | 编成 | 点数 |", "| --- | --- | --- | --- |"];
  for (const unit of raw.units) {
    const name = displayName(unit.unit.name_zh, unit.unit.name);
    const compositions = unit.compositions || [];
    (unit.points || []).forEach((point, index) => lines.push(`| ${name} | ${unit.unit.name} | ${displayName(compositions[index]?.label_zh, compositions[index]?.label) || `${point.model_count} 模型`} | ${point.points} |`));
  }
  return lines.join("\n") + "\n";
}

function structuredData(raw) {
  const baseNames = raw.units.map((unit) => displayName(unit.unit.name_zh, unit.unit.name));
  const nameCounts = new Map(baseNames.map((name) => [name, baseNames.filter((candidate) => candidate === name).length]));
  return {
    faction: "欧克兽人",
    kind: "datasheet-profiles",
    schemaVersion: 1,
    source: { file: "欧克兽人-网站原始数据.json", version: "第11版", language: "简体中文", url: sourceUrl },
    description: "欧克兽人第11版网站完整单位资料；保留网站原文、武器、编成、装备选项、能力和领队关系，数据卡正文来源为项目繁体转简体结果。",
    cards: raw.units.map((unit, index) => {
      const baseName = baseNames[index];
      const nameOverride = nameCounts.get(baseName) > 1 ? `${baseName}（${unit.unit.name}）` : baseName;
      return structuredCard(unit, index, raw.faction, nameOverride);
    }),
  };
}

async function fetchRaw() {
  fs.mkdirSync(dataDir, { recursive: true });
  const response = await fetch(sourceUrl, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  const raw = await response.json();
  if (!raw.faction || raw.faction.slug !== "orks" || raw.units?.length !== 99 || raw.detachments?.length !== 14) {
    throw new Error(`unexpected Orks payload: units=${raw.units?.length}, detachments=${raw.detachments?.length}`);
  }
  write("欧克兽人-网站原始数据.json", JSON.stringify(raw, null, 2) + "\n");
  write("数据卡-网站原始文本.txt", originalUnitText(raw));
  write("数据卡-可检索-繁体.md", originalDatasheetMarkdown(raw));
  write("分遣队规则-11版繁体原始文本.txt", originalDetachmentText(raw));
  write("欧克兽人-分数表-繁体可检索.md", pointsMarkdown(raw));
  console.log(`Fetched ${raw.units.length} units and ${raw.detachments.length} detachments from ${sourceUrl}`);
}

function buildStructured() {
  const filename = path.join(dataDir, "欧克兽人-网站原始数据-简体.json");
  const raw = JSON.parse(fs.readFileSync(filename, "utf8").replace(/^\uFEFF/, ""));
  const output = structuredData(raw);
  write("欧克兽人-全部数据卡.json", JSON.stringify(output, null, 2) + "\n");
  console.log(`Built ${output.cards.length} structured datasheets`);
}

const mode = process.argv[2] || "fetch";
if (mode === "fetch") await fetchRaw();
else if (mode === "build") buildStructured();
else throw new Error(`unknown mode: ${mode}`);
