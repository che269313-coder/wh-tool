import fs from "node:fs";
import path from "node:path";

const translatedDetachmentNames = Object.freeze({
  "亡者之势": "March of the Fallen",
  "寂静猎手": "Silent Hunters",
  "雷灭锤击": "Thunderous Annihilation",
  "崔斯蒂安的鎏金之刃": "Tristian's Gilded Blades",
  "智库密会": "Librarius Conclave",
  "行动资源": "Operational Assets",
  "迅电特遣队": "Fulguris Task Force",
  "复仇大军": "Vengeance Host",
  "突击分队": "Strike Force",
  "传瘟机械": "Plague Machines",
  "吹蝇军": "Blowfly Host",
  "腐坏楷模": "Paragons of Decay",
  "蛆虫领主": "Lords of Maggots",
});

const translatedEntryNames = Object.freeze({
  "完美造物": "Flawless Creation", "势如破竹": "Unstoppable Momentum", "优先消除": "Priority Elimination",
  "亡者专精": "Mastery of the Fallen", "耀金棺柩": "Auric Sarcophagus", "暗影审判": "Judgement from the Shadows",
  "同步烈焰": "Synchronized Flame", "死歌剑影": "Blades of the Death Song", "包围猎手": "Encircling Huntress",
  "驱灵手雷": "Psyk-out Grenades", "坚定意志": "Unwavering Resolve", "电子驱邪弹雨": "Psyk-out Grenade Barrage",
  "释放雄狮": "Unleash the Lions", "高效进攻": "Efficient Assault", "记忆封存神龛暗号": "Memoriam Shrine Cipher",
  "鎏金长矛": "Gilded Spear", "不可逃避的怒火": "Inescapable Fury", "所向披靡": "Irresistible Advance",
  "怒火同道": "Companion in Fury", "粉碎性冲锋": "Crushing Charge", "齐射": "Volley",
  "时光回廊": "Temporal Corridor", "迷惑": "Misdirection", "迅捷": "Celerity", "先见": "Foresight",
  "影中出击": "Strike from the Shadows", "隐匿位置": "Concealed Position", "灵活行动": "Flexible Operations",
  "突袭战术": "Ambush Tactics", "帷幕力场": "Shrouding Field", "闪避反应": "Evasive Reaction",
  "反重力推进": "Anti-grav Thrust", "数据连接卜测": "Data-link Divination", "幸运吊饰": "Lucky Charm",
  "稳定尾翼": "Stabilizing Fins", "坠星猛攻": "Falling Star Assault", "无所畏惧": "Know No Fear",
  "区域净化": "Zone Clearance", "复仇天使": "Angel of Vengeance", "欧克蛮人灾星": "Ork Bane",
  "无息攻势": "Relentless Assault", "恐怖冲锋": "Terrifying Charge", "斩首打击": "Decapitating Strike",
  "战线老兵": "Battleline Veteran", "剑术大师": "Swordmaster", "血锈洪流": "Blood-rust Torrent",
  "全新介体": "Fresh Vector", "腐魂爆发": "Soul-rot Eruption", "寄生收割": "Parasitic Harvest",
  "穿刺世界之疮": "Piercing the World's Wound", "虫群之眼": "Eye of the Swarm", "鸣叫恐惧": "Chittering Terror",
  "恶心发作": "Nauseating Fit", "密集虫群": "Dense Swarm", "瘟疫烟幕": "Plague Smokescreen",
  "地区感染": "Localized Infection", "加剧阵痛": "Aggravated Agony", "同时感染": "Concurrent Infection",
  "回覆虫群": "Restorative Swarm", "回复虫群": "Restorative Swarm", "混合瘟疫宿主": "Mixed Plague Host",
  "不可阻挡的行刑者": "Unstoppable Executioner", "呕吐弹幕": "Vomit Barrage", "恶心恐惧": "Nauseating Dread",
  "遮盖烟幕": "Obscuring Smog", "大肆再生": "Rampant Regeneration",
});

export function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[’‘]/g, "'")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanText(value) {
  return String(value || "")
    .replace(/\*\*/g, "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

function parseNamedHeader(line) {
  const match = line.match(/^(.+?)\s*\((.+)\)\s*$/);
  if (!match) return { name: line.trim(), englishName: "" };
  const name = match[1].trim();
  const candidate = match[2].replace(/（升级）/g, "").trim();
  return { name, englishName: /[A-Za-z]/.test(candidate) ? candidate : "" };
}

function captureField(block, field, nextFields) {
  const end = nextFields.length ? `^\\s*(?:${nextFields.join("|")}):|(?![\\s\\S])` : `(?![\\s\\S])`;
  const pattern = new RegExp(`^\\s*${field}:\\s*([\\s\\S]*?)(?=${end})`, "m");
  return cleanText(block.match(pattern)?.[1] || "");
}

function parseEntries(block, type, detachmentId, idPrefix) {
  const entries = [];
  const pattern = /^  (\d+)\. (.+)\n([\s\S]*?)(?=^  \d+\. |(?![\s\S]))/gm;
  let match;
  while ((match = pattern.exec(block))) {
    const ordinal = Number(match[1]);
    const header = parseNamedHeader(match[2].trim());
    const body = match[3];
    const translatedEnglishName = header.englishName || translatedEntryNames[header.name.replace(/（升级）/g, "").trim()] || "";
    const semanticSlug = slugify(translatedEnglishName);
    const entryId = `${idPrefix}.${type}.${semanticSlug || `unresolved-${ordinal}`}`;
    const common = {
      id: entryId,
      detachmentId,
      type,
      ordinal,
      name: header.name,
      englishName: translatedEnglishName,
      sourceEnglishName: header.englishName,
      identityStatus: header.englishName ? "official" : (translatedEnglishName ? "translated-needs-review" : "unresolved"),
      text: cleanText(body),
      effects: [],
      controls: [],
      status: "仅供查阅",
    };
    if (type === "stratagem") {
      entries.push({
        ...common,
        cp: Number(body.match(/CP:\s*(\d+)/)?.[1] || 0),
        timing: captureField(body, "时机", ["目标", "效果", "限制"]),
        target: captureField(body, "目标", ["效果", "限制"]),
        effectText: captureField(body, "效果", ["限制"]),
        restriction: captureField(body, "限制", []),
      });
    } else {
      entries.push({
        ...common,
        points: Number(body.match(/点数:\s*(\d+)/)?.[1] || 0),
        effectText: captureField(body, "效果", ["限制"]),
        restriction: captureField(body, "限制", []),
      });
    }
  }
  return entries;
}

export function parseDetachmentSource(source, { factionId, sourcePath }) {
  const normalized = String(source || "").replace(/\r/g, "");
  const chunks = normalized.split(/^-{20,}\s*$/m).slice(1);
  return chunks.map((chunk) => {
    const headerMatch = chunk.match(/^\s*分遣队 #(\d+)\s*:\s*(.+)$/m);
    if (!headerMatch) return null;
    const ordinal = Number(headerMatch[1]);
    const named = parseNamedHeader(headerMatch[2].trim());
    const translatedEnglishName = named.englishName || translatedDetachmentNames[named.name] || "";
    const detachmentSlug = slugify(translatedEnglishName) || `detachment-${ordinal}`;
    const id = `${factionId}.detachment.${detachmentSlug}`;
    const dp = Number(chunk.match(/^DP 消费:\s*(\d+)/m)?.[1] || 0);
    const ruleName = chunk.match(/^分遣队规则:\s*(.+)$/m)?.[1]?.trim() || "分遣队规则";
    const ruleText = cleanText(chunk.match(/^规则说明:\s*([\s\S]*?)(?=^  (?:计谋 \(Stratagems\)|强化 \(Enhancements\)):)/m)?.[1] || "");
    const stratagemBlock = chunk.match(/^  计谋 \(Stratagems\):[ \t]*\n([\s\S]*?)(?=^  强化 \(Enhancements\):|(?![\s\S]))/m)?.[1] || "";
    const enhancementBlock = chunk.match(/^  强化 \(Enhancements\):[ \t]*\n([\s\S]*)$/m)?.[1] || "";
    const ruleId = `${id}.rule`;
    return {
      id,
      factionId,
      ordinal,
      name: named.name,
      englishName: translatedEnglishName,
      sourceEnglishName: named.englishName,
      identityStatus: named.englishName ? "official" : (translatedEnglishName ? "translated-needs-review" : "source-ordinal"),
      aliases: [...new Set([named.name, named.englishName, translatedEnglishName].filter(Boolean))],
      dp,
      source: { path: sourcePath, detachmentNumber: ordinal },
      rule: {
        id: ruleId,
        detachmentId: id,
        type: "detachment-rule",
        name: ruleName,
        text: ruleText,
        effects: [],
        controls: [],
        status: "仅供查阅",
      },
      stratagems: parseEntries(stratagemBlock, "stratagem", id, id),
      enhancements: parseEntries(enhancementBlock, "enhancement", id, id),
    };
  }).filter(Boolean);
}

export function parseDetachmentFile(filename, options) {
  return parseDetachmentSource(fs.readFileSync(filename, "utf8"), {
    ...options,
    sourcePath: options.sourcePath || path.basename(filename),
  });
}
