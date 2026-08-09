import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const rulesDir = path.join(root, "docs", "rules");
const auditDir = path.join(root, "docs", "audit");

const translatedNames = {
  "特殊保护": "Invulnerable Save",
  "核心特性": "Core Abilities",
  "核心技能": "Core Abilities",
  "【核心技能】": "Core Abilities",
  "技能2": "Faction Abilities",
  "技能 2": "Faction Abilities",
  "阵营": "Faction Ability",
  "严重损伤": "Seriously Damaged",
  "受损": "Seriously Damaged",
  "运输载具": "Transport",
  "暗影潜行": "Lone Operative",
  "战斗之仪": "Rites of Battle",
  "极限战士荣誉卫队": "Ultramarines Honour Guard",
  "永不屈服": "Never Yield",
  "空降突击": "Drop Pod Assault",
  "圣典权威": "Codex Authority",
  "极限战士卫队": "Ultramarines Bodyguard",
  "命运战甲": "Armour of Fate",
  "体形适中": "Primarch Physiology",
  "励志领袖": "Inspiring Leader",
  "战术大师": "Master Tactician",
  "地狱火头冠": "Hood of Hellfire",
  "预言大师【灵能】": "Master of Prescience",
  "舍生取义": "Selfless Sacrifice",
  "马库拉格冠军骑士": "Knight Champion of Macragge",
  "奇门战略【光环】": "Unorthodox Strategist",
  "舰队之主": "Master of the Fleet",
  "持续攻势": "Relentless Assault",
  "奥特拉马的荣耀": "Glory of Ultramar",
  "第二连队旗帜": "Second Company Banner",
  "战略指挥": "Strategic Command",
  "折射力场": "Refractor Field",
  "风暴盾": "Storm Shield",
  "坚毅典范": "Paragon of Fortitude",
  "金刚不破": "Indomitable",
  "激励人心": "Inspirational",
  "瞄准仪阵列": "Targeting Array",
  "攻城指挥官": "Siege Commander",
  "回火仪式": "Tempering Rite",
  "钢铁之父": "Iron Father",
  "铸造之主": "Master of the Forge",
  "莱恩誓言": "Oath of the Lion",
  "战至最后": "Fight to the Last",
  "暗影之主": "Master of Shadows",
  "鸦塔回响": "Echoes of the Ravenspire",
  "黑翼披风": "Blackwing Mantle",
  "责任传承": "Inherited Duty",
  "铸造之父": "Father of the Forge",
  "圣物追寻者": "Relic Seeker",
  "重拳出击": "Heavy Blow",
  "烈火之主": "Lord of Fire",
  "为了可汗": "For the Khan",
  "战利品收集者": "Trophy Taker",
  "巧高里斯之矛": "Spear of Chogoris",
  "历战骑手": "Veteran Rider",
  "冷酷演算": "Cold Calculation",
  "主脑逻辑引擎": "Mastermind Logic Engine",
  "雷霆冲撞": "Thunderous Impact",
  "常胜荣誉卫队": "Victrix Honour Guard",
  "马库拉格旗帜": "Banner of Macragge",
  "污秽圣徽": "Unclean Icon",
  "疫病赐福圣徽": "Blessed Icon of Disease",
  "纳垢赐福灌注": "Infused with the Blessings of Nurgle",
  "绝望圣徽（光环）": "Icon of Despair",
  "突击跳板": "Assault Ramp",
  "疾行机甲": "Scuttling Walker",
  "污秽轰炸": "Barrage of Filth",
  "腐败浓雾": "Putrescent Fog",
  "疫病掩体": "Diseased Cover",
  "堡垒特性": "Fortification",
  "纳垢恶魔领主（光环）": "Daemon Lord of Nurgle",
  "纳垢之腐（灵能）": "Nurgle's Rot",
  "剧毒赐福（灵能）": "Toxic Blessing",
  "纳垢洪流（光环）": "Deluge of Nurgle",
  "恶作剧制造者": "Mischief Makers",
  "怪异再生": "Grotesque Regeneration",
  "感染爆发": "Infectious Outbreak",
  "恶魔图腾": "Daemonic Icon",
  "混沌乐器": "Instrument of Chaos",
  "死亡颅弹": "Death's Head Bombs",
  "无声护卫": "Silent Bodyguard",
  "死亡降临": "Death Descends",
};

const genericNames = new Set(["特殊保护", "核心特性", "核心技能", "【核心技能】", "技能2", "技能 2", "阵营", "严重损伤", "受损", "运输载具", "暗影潜行"]);
const normalize = (value) => String(value || "").normalize("NFKD").replace(/[^a-z0-9]/gi, "").toLowerCase();
const slug = (value) => String(value || "").normalize("NFKD").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
const allRules = (catalog) => [...(catalog.factionRules || []), ...Object.values(catalog.unitRules || {}).flat()];

function loadRawCatalog(file, globalName) {
  const context = vm.createContext({});
  context.globalThis = context;
  vm.runInContext(fs.readFileSync(path.join(rulesDir, file), "utf8"), context, { filename: file });
  return context[globalName];
}

function officialUnits(factionId) {
  const cache = JSON.parse(fs.readFileSync(path.join(auditDir, `official-identities-${factionId}.json`), "utf8"));
  return new Map(cache.units.map((unit) => [normalize(unit.name), unit]));
}

function spaceMarineEnglishByPage() {
  const markdown = fs.readFileSync(path.join(root, "docs", "data", "星际战士", "数据卡-可检索.md"), "utf8");
  const result = new Map();
  for (const match of markdown.matchAll(/## 第\s*(\d+)\s*页[^\n]*\n([\s\S]*?)(?=\n## 第|$)/g)) {
    const cells = match[2].split(/\r?\n/).map((line) => line.split("|")[1]?.trim()).filter(Boolean);
    const englishName = cells[0];
    if (englishName) result.set(Number(match[1]), englishName.replaceAll("<br>", " ").replace(/\s+/g, " "));
  }
  return result;
}

const unitAliases = {
  "Captain in Gravis Armour": "Captain in Gravis Armour",
  "Outrider Squad": "Outrider Squad",
  "Death Guard Icon Bearer": "Icon Bearer",
  "Chaos Spawn of Nurgle": "Chaos Spawn",
  "FoetidBloat-droneWITHHEAVYBLIGHTLAUNCHER": "Foetid Bloat-Drone with Heavy Blight Launcher",
  "DeathGuardPredatorAnnihilator": "Chaos Predator Annihilator",
  "DeathGuardPredatorDestructor": "Chaos Predator Destructor",
};

const officialAbilityOverrides = {
  captainwithjumppack: { "天使之怒": "Angel’s Wrath", "战斗之仪": "Rites of Battle" },
  hammerfallbunker: { "防御工事": "Fortification", "陶钢掩体": "Ceramite Cover", "防御阵列": "Defensive Array" },
  droppod: { "空降突击": "Drop Pod Assault" },
  lieutenantwithcombiweapon: { "优先目标识别": "Priority Objective Identified", "幸存者": "Evade and Survive" },
  deathshroudterminators: { "死亡降临": "Death Approaches", "无声护卫": "Silent Bodyguard" },
};

function writeDefinitions({ factionId, catalog, unitEnglishNames, officialByName, factionDefinitions }) {
  const definitions = { ...factionDefinitions };
  const missing = new Set();
  for (const [unitName, rules] of Object.entries(catalog.unitRules || {})) {
    const firstPage = rules[0]?.source?.page;
    const rawUnitEnglishName = unitEnglishNames.get(unitName) || unitEnglishNames.get(firstPage);
    if (!rawUnitEnglishName) throw new Error(`${factionId}: missing English unit name for ${unitName}`);
    const aliasedName = unitAliases[rawUnitEnglishName] || rawUnitEnglishName;
    const officialUnit = officialByName.get(normalize(aliasedName));
    const scopeId = officialUnit?.slug || slug(aliasedName);
    const candidates = rules.filter((rule) => !genericNames.has(rule.name));
    const officialByChinese = { ...(officialAbilityOverrides[normalize(aliasedName)] || {}) };
    if (officialUnit && candidates.length === officialUnit.identities.length) {
      candidates.forEach((rule, index) => { if (!officialByChinese[rule.name]) officialByChinese[rule.name] = officialUnit.identities[index].englishName; });
    }
    for (const rule of rules) {
      const officialEnglish = officialByChinese[rule.name];
      const translatedEnglish = translatedNames[rule.name];
      const translatedMatch = translatedEnglish && officialUnit?.identities.find((identity) => slug(identity.englishName) === slug(translatedEnglish));
      const officialIdentity = (officialEnglish && officialUnit?.identities.find((identity) => identity.englishName === officialEnglish)) || translatedMatch;
      let englishName = officialIdentity?.englishName || translatedEnglish;
      let matchStatus = officialIdentity ? "official" : "translated";
      let sourceUrl = officialIdentity?.sourceUrl || "";
      if (!englishName) {
        missing.add(rule.name);
        continue;
      }
      definitions[rule.id] = {
        scopeId,
        englishName,
        matchStatus,
        ...(sourceUrl ? { sourceUrl } : {}),
        ...(matchStatus === "translated" ? { notes: "40k.app 当前页未找到对应条目；英文名为已接受翻译。" } : {}),
      };
    }
  }
  if (missing.size) throw new Error(`${factionId}: missing accepted translations:\n${[...missing].sort().join("\n")}`);
  if (Object.keys(definitions).length !== allRules(catalog).length) throw new Error(`${factionId}: identity definition count mismatch`);
  const globalName = factionId === "space-marines" ? "WarhammerSpaceMarineRuleIdentities" : "WarhammerDeathGuardRuleIdentities";
  const output = `/* Generated stable rule identities. Run tools/generate-faction-identities.mjs after source or 40k.app cache changes. */\n(function (root) {\n  const definitions = ${JSON.stringify(definitions, null, 2)};\n  const apply = (catalog) => root.WarhammerRuleIdentity.applyCatalog(catalog, {\n    factionId: ${JSON.stringify(factionId)},\n    definitions,\n    sourceBaseUrl: ${JSON.stringify(`https://www.40k.app/factions/${factionId}`)},\n  });\n  root.${globalName} = { definitions, apply };\n})(typeof globalThis === "undefined" ? this : globalThis);\n`;
  fs.writeFileSync(path.join(rulesDir, `${factionId}-identities.js`), output, "utf8");
  console.log(`generated ${Object.keys(definitions).length} ${factionId} stable identities`);
}

const smCatalog = loadRawCatalog("space-marines.js", "WarhammerSpaceMarineRules");
const smPages = spaceMarineEnglishByPage();
smPages.set("重装连长", "Captain in Gravis Armour");
smPages.set("先遣者摩托小队", "Outrider Squad");
writeDefinitions({
  factionId: "space-marines",
  catalog: smCatalog,
  unitEnglishNames: smPages,
  officialByName: officialUnits("space-marines"),
  factionDefinitions: {
    "space-marines.army.oath-of-moment": { scopeId: "army", englishName: "Oath of Moment", matchStatus: "official", sourceUrl: "https://www.40k.app/factions/space-marines/army-rules" },
  },
});

const dgCatalog = loadRawCatalog("death-guard.js", "WarhammerDeathGuardRules");
const dgData = JSON.parse(fs.readFileSync(path.join(root, "docs", "data", "死亡守卫", "死亡守卫-全部数据卡.json"), "utf8"));
const dgEnglish = new Map(dgData.cards.map((card) => [card.unit.name, card.englishName]));
writeDefinitions({
  factionId: "death-guard",
  catalog: dgCatalog,
  unitEnglishNames: dgEnglish,
  officialByName: officialUnits("death-guard"),
  factionDefinitions: {
    "death-guard-nurgles-gift": { scopeId: "army", englishName: "Nurgle's Gift", matchStatus: "official", sourceUrl: "https://www.40k.app/factions/death-guard/army-rules" },
  },
});
