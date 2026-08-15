import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const dir = path.join(root, "docs", "data", "修女会");
const input = path.join(dir, "修女会-网站原始数据-简体.json");
const output = path.join(dir, "修女会-全部数据卡.json");
const sourceUrl = "https://40k11e-backend.aiinpocket.com/api/faction-full?slug=adepta-sororitas";
const raw = JSON.parse(fs.readFileSync(input, "utf8").replace(/^\uFEFF/, ""));

const clean = (v) => String(v ?? "").replace(/\r/g, "").trim();
const displayName = (v, fallback = "") => clean(v) || clean(fallback);
const slug = (v) => clean(v).normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "unit";
const numberOrText = (v) => /^-?\d+$/.test(clean(v)) ? Number(clean(v)) : clean(v);
const unique = (items) => [...new Map(items.filter(Boolean).map((x) => [JSON.stringify(x), x])).values()];
const categoryMap = { Infantry: "步兵", Vehicle: "载具", Character: "角色", Monster: "怪兽", Beast: "野兽", Walker: "机甲", Aircraft: "飞行", Transport: "运输工具" };

function weaponName(w) { return displayName(w.profile_name_zh, displayName(w.name_zh, w.profile_name || w.name)); }
function weaponEnglishName(w) { return displayName(w.profile_name, w.name); }
function weaponKey(w) { return `${clean(w.id)}|${weaponEnglishName(w).toLowerCase()}|${weaponName(w)}`; }

function defaultWeaponEntries(entry) {
  const byEnglish = new Map((entry.weapons || []).map((e) => [weaponEnglishName(e.weapon).toLowerCase(), e]));
  const byName = new Map((entry.weapons || []).map((e) => [weaponName(e.weapon).toLowerCase(), e]));
  const defaults = new Map();
  for (const e of entry.weapons || []) if (e.is_default) defaults.set(weaponKey(e.weapon), e);
  for (const gear of entry.wargear_options || []) for (const option of gear.schema_json?.options || []) {
    if (!option.default) continue;
    const match = byEnglish.get(clean(option.item_name).toLowerCase()) || byName.get(clean(option.item_name).toLowerCase());
    if (match) defaults.set(weaponKey(match.weapon), match);
  }
  return [...defaults.values()];
}

function normalizedWeapon(entry, isDefault) {
  const w = entry.weapon || {};
  const result = {
    id: w.id || `${slug(weaponName(w))}-${w.is_ranged ? "ranged" : "melee"}`,
    name: weaponName(w), englishName: weaponEnglishName(w), type: w.is_ranged ? "ranged" : "melee",
    range: clean(w.range_) && clean(w.range_).toLowerCase() !== "melee" ? clean(w.range_) : undefined,
    attacks: clean(w.attacks), skill: clean(w.ws_bs), strength: numberOrText(w.strength), ap: numberOrText(w.ap), damage: clean(w.damage),
    abilities: (w.ability_keywords_zh || w.ability_keywords || []).map(clean).filter(Boolean),
    abilitiesEn: (w.ability_keywords || []).map(clean).filter(Boolean), isDefault: Boolean(isDefault), count: Number(entry.count || 1), sourceWeapon: w,
  };
  if (!result.range) delete result.range;
  return result;
}

function normalizedComposition(c) {
  return { text: displayName(c.label_zh, c.label), englishText: clean(c.label), points: c.points ?? null, isDefault: Boolean(c.is_default),
    models: (c.models || []).map((m) => ({ name: displayName(m.model_name_zh, m.model_name), englishName: clean(m.model_name), min: m.min ?? null, max: m.max ?? null })), sourceComposition: c };
}

function normalizedWargear(g, entry) {
  const weaponMap = new Map((entry.weapons || []).map((e) => [weaponEnglishName(e.weapon).toLowerCase(), e]));
  return { text: clean(g.instruction_zh || g.instruction), textEn: clean(g.instruction),
    options: (g.schema_json?.options || []).map((o) => { const match = weaponMap.get(clean(o.item_name).toLowerCase()); return { name: match ? weaponName(match.weapon) : clean(o.item_name), nameEn: clean(o.item_name), itemType: clean(o.item_type), inputType: clean(o.input_type), default: Boolean(o.default) }; }),
    choices: g.choices_json ?? null, caps: g.caps_json ?? null, sourceWargear: g };
}

function makeCard(entry, index) {
  const u = entry.unit || {};
  const name = displayName(u.name_zh, u.name);
  const compositions = entry.compositions || [];
  const normalizedCompositions = compositions.map(normalizedComposition);
  const selectedComposition = normalizedCompositions.find((c) => c.isDefault) || normalizedCompositions[0] || null;
  const modelCount = selectedComposition?.models?.reduce((sum, m) => sum + Number(m.min || 0), 0) || Number(entry.points?.[0]?.model_count || 1);
  const defaults = defaultWeaponEntries(entry);
  const defaultItems = defaults.map((e) => ({ name: weaponName(e.weapon), englishName: weaponEnglishName(e.weapon), count: Number(e.count || 1), weaponId: e.weapon?.id || null }));
  const defaultEquipment = { text: defaultItems.map((x) => `${x.count > 1 ? `${x.count}×` : ""}${x.name}`).join("、"), items: defaultItems };
  const weapons = (entry.weapons || []).map((e) => normalizedWeapon(e, defaults.some((d) => weaponKey(d.weapon) === weaponKey(e.weapon))));
  const abilities = (entry.abilities || []).map((a, i) => ({ id: `${u.id || index + 1}.ability.${i + 1}`, name: displayName(a.name_zh, a.name), englishName: clean(a.name), kind: clean(a.kind), isAura: Boolean(a.is_aura), isPsychic: Boolean(a.is_psychic), text: clean(a.text_zh || a.text), textEn: clean(a.text), sourceAbility: a }));
  const factionKeywords = unique(["修女会", ...(u.faction_keywords || []).map(clean)]);
  const keywords = unique([...(u.keywords || []).map((k) => categoryMap[k] || clean(k)), ...(u.category ? [categoryMap[u.category] || clean(u.category)] : []), name]);
  const leader = (entry.leads?.length || u.leader_effect_zh) ? { leadUnitIds: entry.leads || [], text: clean(u.leader_effect_zh), sourceLeads: entry.leads || [] } : null;
  const card = {
    id: `adepta-sororitas.${slug(u.name)}.${String(u.id || index + 1).slice(0, 8)}`, name, englishName: clean(u.name),
    source: { url: sourceUrl, file: "修女会-网站原始数据-简体.json", record: index + 1, unitId: u.id || null, extraction: "11e backend JSON; source record preserved" },
    unit: { name, englishName: clean(u.name), movement: numberOrText(u.movement), toughness: numberOrText(u.toughness), save: numberOrText(u.save), invulnerableSave: numberOrText(u.invuln_save), woundsPerModel: numberOrText(u.wounds), leadership: clean(u.leadership), objectiveControl: numberOrText(u.oc), models: modelCount, abilities: abilities.map((a) => `${a.name}${a.text ? `：${a.text}` : ""}`).join("\n"), activeAbilities: "", defaultEquipment: defaultEquipment.text },
    points: (entry.points || []).map((p) => ({ models: p.model_count, points: p.points })), composition: selectedComposition, compositionOptions: normalizedCompositions, compositions,
    ...(selectedComposition?.models?.length > 1 ? { modelProfiles: selectedComposition.models.map((m, i) => ({ id: `model-${i + 1}`, name: m.name, englishName: m.englishName, min: m.min, max: m.max })) } : {}),
    defaultEquipment, weapons, wargear_options: entry.wargear_options || [], wargearOptions: (entry.wargear_options || []).map((g) => normalizedWargear(g, entry)), abilities, leader, keywords, factionKeywords, factionKeywordsSource: u.faction_keywords || [], sourceData: entry,
  };
  return card;
}

const cards = raw.units.map(makeCard);
const payload = { faction: "修女会", slug: "adepta-sororitas", kind: "datasheet-profiles", schemaVersion: 1,
  source: { url: sourceUrl, file: "修女会-网站原始数据-简体.json", language: "简体中文", units: cards.length, extraction: "由简体网站 API JSON 映射；每张卡保留 sourceData 原始记录" }, cards };
fs.writeFileSync(output, JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log(JSON.stringify({ output, units: cards.length, missingEquipment: cards.filter((c) => !c.unit.defaultEquipment).map((c) => c.name), missingWeapons: cards.filter((c) => !c.weapons.length).map((c) => c.name), weaponProfiles: cards.reduce((n, c) => n + c.weapons.length, 0) }, null, 2));
