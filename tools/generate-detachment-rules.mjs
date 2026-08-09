import fs from "node:fs";
import path from "node:path";
import { parseDetachmentFile } from "./lib/parse-detachments.mjs";

const root = path.resolve(import.meta.dirname, "..");
const inputs = [
  { factionId: "adeptus-custodes", file: "docs/data/帝皇禁军/分遣队规则-11版原始文本.txt" },
  { factionId: "space-marines", file: "docs/data/星际战士/分遣队规则-11版原始文本.txt" },
  { factionId: "death-guard", file: "docs/data/死亡守卫/分遣队规则-11版原始文本.txt" },
];
const factionArgument = process.argv.find((argument) => argument.startsWith("--faction="))?.split("=")[1];
const selectedInputs = factionArgument ? inputs.filter((input) => input.factionId === factionArgument) : inputs;
if (!selectedInputs.length) throw new Error(`未知阵营：${factionArgument}`);

const restrictionTraits = Object.freeze({
  "Anathema Psykana": ["巫咒", "沉默圣殿", "灭魔教团", "anathema psykana"],
  Ancient: ["旗手", "ancient"],
  "Biologus Putrifier": ["生物腐化者", "生化腐化者", "biologus putrifier"],
  "Blade Champion": ["剑锋冠军", "利刃勇士", "blade champion"],
  Captain: ["连长", "captain"],
  "Contagion Engines": ["传瘟机械", "contagion engines"],
  Gravis: ["重装", "重装型", "gravis"],
  "Great Unclean One": ["大不净者", "巨型不洁者", "great unclean one"],
  Helbrute: ["地狱兽", "helbrute"],
  Infantry: ["步兵", "infantry"],
  "Lord of Poxes": ["痘疹领主", "lord of poxes"],
  "Lord of Virulence": ["病毒领主", "毒性领主", "lord of virulence"],
  "Malignant Plaguecaster": ["恶瘟投放者", "恶性瘟疫术士", "malignant plaguecaster"],
  Mounted: ["骑乘", "摩托", "mounted"],
  "Myphitic Blight-haulers": ["恶臭疫病引擎", "myphitic blight-hauler", "myphitic blight-haulers"],
  "Noxious Blightbringer": ["剧毒疫病使者", "丧钟使者", "毒害枯疫使者", "noxious blightbringer"],
  Phobos: ["恐惧型", "佛波斯", "先锋军", "phobos"],
  "Plague Marines": ["瘟疫战士", "plague marines"],
  "Plague Surgeon": ["瘟疫军医", "瘟疫外科医师", "plague surgeon"],
  Psyker: ["灵能者", "智库", "psyker"],
  "Shield-Captain": ["盾卫连长", "护盾连长", "shield-captain", "shield captain"],
  Speeder: ["速攻艇", "speeder"],
  Tacticus: ["战术装", "tacticus"],
  Techmarine: ["技术军士", "techmarine"],
  Terminator: ["终结者", "terminator"],
  Vehicle: ["载具", "vehicle"],
  Walker: ["机甲", "walker"],
});

function enhancementEligibility(entry) {
  const tokens = String(entry.restriction || "").split(",").map((token) => token.trim()).filter(Boolean);
  if (!tokens.length) return null;
  const groups = tokens.map((token) => restrictionTraits[token] || [token]);
  const requiresAll = entry.restriction === "Infantry, Phobos";
  const eligibility = requiresAll ? { all: groups } : { any: groups };
  if (/终结者模型除外/.test(String(entry.effectText || entry.text || ""))) eligibility.exclude = [restrictionTraits.Terminator];
  return eligibility;
}

const enabledControl = Object.freeze({ id: "enabled", type: "checkbox", label: "本次满足目标、时机与范围条件，应用此效果" });
const selected = Object.freeze({ controlId: "enabled", equals: true });
const checkboxMapping = (effects, label = enabledControl.label) => ({
  controls: [{ ...enabledControl, label }],
  effects: effects.map((effect) => ({ ...effect, selection: { controlId: "enabled", equals: true } })),
  status: "可选效果：勾选后计入骰子",
});

function explicitCalculatorMapping(entry) {
  switch (entry.id) {
    case "adeptus-custodes.detachment.lions-of-the-emperor.enhancement.fierce-conqueror":
      return checkboxMapping([{ type: "attack-modifier", value: 2, phase: "melee" }], "持有者 6 英寸内有至少 5 个敌方模型（近战 A+2）");
    case "adeptus-custodes.detachment.lions-of-the-emperor.enhancement.admonimortis":
      return checkboxMapping([{ type: "weapon-strength-modifier", value: 3, phase: "melee" }, { type: "weapon-ap-modifier", value: 1, phase: "melee" }, { type: "damage-modifier", value: 1, phase: "melee" }]);
    case "adeptus-custodes.detachment.solar-spearhead.rule":
      return {
        controls: [{ id: "vehicleState", type: "select", label: "当前帝皇禁军载具状态", options: [["none", "不适用"], ["under", "低于起始兵力"], ["belowHalf", "低于半数兵力"]] }],
        effects: [
          { type: "hit-reroll", mode: "ones", selection: { controlId: "vehicleState", equals: "under" } },
          { type: "hit-reroll", mode: "ones", selection: { controlId: "vehicleState", equals: "belowHalf" } },
          { type: "wound-reroll", mode: "ones", selection: { controlId: "vehicleState", equals: "belowHalf" } },
        ],
        status: "可选效果：按载具当前兵力计入骰子",
      };
    case "adeptus-custodes.detachment.null-maiden-vigil.enhancement.raptor-blade":
      return {
        controls: [{ id: "bonus", type: "select", label: "猛禽之刃加值", options: [["none", "不启用"], ["base", "通常：A/S/D +1"], ["enhanced", "与战斗震慑灵能者交战：A/S/D +2"]] }],
        effects: [1, 2].flatMap((value) => [
          { type: "attack-modifier", value, phase: "melee", selection: { controlId: "bonus", equals: value === 1 ? "base" : "enhanced" } },
          { type: "weapon-strength-modifier", value, phase: "melee", selection: { controlId: "bonus", equals: value === 1 ? "base" : "enhanced" } },
          { type: "damage-modifier", value, phase: "melee", selection: { controlId: "bonus", equals: value === 1 ? "base" : "enhanced" } },
        ]),
        status: "可选效果：按目标状态计入骰子",
      };
    case "adeptus-custodes.detachment.null-maiden-vigil.enhancement.enhanced-voidsheen-cloak":
    case "space-marines.detachment.firestorm-assault-force.enhancement.adamantine-mantle":
      return {
        controls: [{ id: "damageMode", type: "select", label: "本次来袭攻击的伤害处理", options: [["none", "不启用"], ["reduce", "通常伤害 -1"], ["override", "满足特殊武器/攻击条件：伤害改为 1"]] }],
        effects: [
          { type: "incoming-damage-modifier", value: -1, selection: { controlId: "damageMode", equals: "reduce" } },
          { type: "damage-override", value: 1, selection: { controlId: "damageMode", equals: "override" } },
        ],
        status: "可选效果：按来袭攻击类型计入骰子",
      };
    case "adeptus-custodes.detachment.shield-host.stratagem.avenge-the-fallen":
      return {
        controls: [{ id: "unitState", type: "select", label: "单位当前兵力", options: [["none", "不启用"], ["under", "低于起始兵力：近战 A+1"], ["belowHalf", "低于半数兵力：近战 A+2"]] }],
        effects: [
          { type: "attack-modifier", value: 1, phase: "melee", selection: { controlId: "unitState", equals: "under" } },
          { type: "attack-modifier", value: 2, phase: "melee", selection: { controlId: "unitState", equals: "belowHalf" } },
        ],
        status: "可选效果：按单位当前兵力计入骰子",
      };
    case "adeptus-custodes.detachment.shield-host.enhancement.from-the-hall-of-armouries":
      return checkboxMapping([{ type: "weapon-strength-modifier", value: 1, phase: "melee" }, { type: "damage-modifier", value: 1, phase: "melee" }]);
    case "adeptus-custodes.detachment.talons-of-the-emperor.rule":
      return {
        controls: [
          { id: "custodesNearSisters", type: "checkbox", label: "帝皇禁军在沉默圣殿 6 英寸内（对致命伤 FNP 5+）" },
          { id: "sistersNearCustodes", type: "checkbox", label: "沉默圣殿在帝皇禁军 6 英寸内（命中 +1）" },
        ],
        effects: [
          { type: "fnp-mortal", threshold: 5, selection: { controlId: "custodesNearSisters", equals: true } },
          { type: "hit-modifier", value: 1, selection: { controlId: "sistersNearCustodes", equals: true } },
        ],
        status: "可选效果：按单位类型和光环位置计入；灵能攻击 FNP 仍按原文查阅",
      };
    case "adeptus-custodes.detachment.auric-champions.enhancement.veiled-blade":
      return checkboxMapping([{ type: "attack-modifier", value: 2, phase: "melee" }]);
    case "space-marines.detachment.armoured-speartip.stratagem.purgation-doctrine":
      return {
        controls: [{ id: "enabled", type: "checkbox", label: "本次对目标单位使用肃清条令（命中 +1）" }, { id: "disembarked", type: "checkbox", label: "本回合从重型运输工具脱离（致伤再 +1）" }],
        effects: [{ type: "hit-modifier", value: 1, phase: "ranged", selection: { controlId: "enabled", equals: true } }, { type: "wound-modifier", value: 1, phase: "ranged", selection: { controlId: "disembarked", equals: true } }],
        status: "可选效果：按脱离状态计入骰子",
      };
    case "space-marines.detachment.blade-of-ultramar.enhancement.oath-of-macragge":
      return {
        controls: [{ id: "bonus", type: "select", label: "马库拉格之誓加值", options: [["none", "不启用"], ["base", "通常：近战 A/S +1"], ["assault", "突击条令：近战 A/S +2"]] }],
        effects: [1, 2].flatMap((value) => [{ type: "attack-modifier", value, phase: "melee", selection: { controlId: "bonus", equals: value === 1 ? "base" : "assault" } }, { type: "weapon-strength-modifier", value, phase: "melee", selection: { controlId: "bonus", equals: value === 1 ? "base" : "assault" } }]),
        status: "可选效果：按战斗条令计入骰子",
      };
    case "space-marines.detachment.reclamation-force.rule":
      return checkboxMapping([{ type: "weapon-ap-modifier", value: 1, phase: "melee" }, { type: "incoming-wound-when-strength-gt", value: -1 }], "当前攻击/防守单位满足目标点范围条件");
    case "space-marines.detachment.vengeance-host.stratagem.falling-star-assault":
      return checkboxMapping([{ type: "weapon-strength-modifier", value: 1, phase: "melee" }]);
    default:
      return null;
  }
}

function effectPhase(text) {
  const ranged = /远程攻击|远程武器|射击阶段|进行射击/.test(text);
  const melee = /近战攻击|近战武器|近战阶段|进行近战|选择战斗/.test(text);
  return ranged && !melee ? "ranged" : melee && !ranged ? "melee" : undefined;
}

function calculatorMapping(entry) {
  const explicit = explicitCalculatorMapping(entry);
  if (explicit) return explicit;
  const text = String(entry.effectText || entry.text || "").replace(/\s+/g, " ");
  const phase = effectPhase(text);
  const effects = [];
  const add = (effect) => effects.push({ ...effect, ...(phase && !effect.phase ? { phase } : {}), selection: selected });
  const incoming = /攻击以(?:你的|该|己方|目标)单位为目标|针对该单位进行的攻击|攻击被分配给|攻击分配给|遭受攻击|受到攻击/.test(text);

  if (/选择/.test(text) && /\[致命一击\]/.test(text) && /\[连击\s*1\]/.test(text)) {
    const canChooseBoth = /同时获得|同时具有|同时拥有/.test(text);
    const control = { id: "keywordChoice", type: "select", label: "本次获得的武器能力", options: [["none", "不启用"], ["lethal", "致命一击"], ["sustained", "连击 1"], ...(canChooseBoth ? [["both", "致命一击 + 连击 1"]] : [])] };
    return {
      controls: [control],
      effects: [
        { type: "lethal-hits", ...(phase ? { phase } : {}), selection: { controlId: "keywordChoice", equals: "lethal" } },
        { type: "sustained-hits", value: 1, ...(phase ? { phase } : {}), selection: { controlId: "keywordChoice", equals: "sustained" } },
        ...(canChooseBoth ? [
          { type: "lethal-hits", ...(phase ? { phase } : {}), selection: { controlId: "keywordChoice", equals: "both" } },
          { type: "sustained-hits", value: 1, ...(phase ? { phase } : {}), selection: { controlId: "keywordChoice", equals: "both" } },
        ] : []),
      ],
      status: "可选效果：选择后计入骰子",
    };
  }

  if (entry.id === "adeptus-custodes.detachment.shield-host.rule") {
    return {
      controls: [{ id: "katahChoice", type: "select", label: "本战斗轮武艺精通", options: [["none", "不启用"], ["critical", "近战 5+ 暴击"], ["ap", "近战 AP +1"]] }],
      effects: [
        { type: "hit-critical-threshold", value: 5, phase: "melee", selection: { controlId: "katahChoice", equals: "critical" } },
        { type: "weapon-ap-modifier", value: 1, phase: "melee", selection: { controlId: "katahChoice", equals: "ap" } },
      ],
      status: "可选效果：选择后计入骰子",
    };
  }

  if (entry.id === "space-marines.detachment.librarius-conclave.rule") {
    return {
      controls: [{ id: "discipline", type: "select", label: "本战斗轮灵能学派", options: [["none", "不启用"], ["divination", "预知：命中/致伤重掷 1"], ["pyromancy", "烈焰：12英寸内远程 AP +1"], ["telepathy", "感应：忽略命中修正"]] }],
      effects: [
        { type: "hit-reroll", mode: "ones", selection: { controlId: "discipline", equals: "divination" } },
        { type: "wound-reroll", mode: "ones", selection: { controlId: "discipline", equals: "divination" } },
        { type: "weapon-ap-modifier", value: 1, phase: "ranged", selection: { controlId: "discipline", equals: "pyromancy" } },
        { type: "ignore-hit-modifiers", selection: { controlId: "discipline", equals: "telepathy" } },
      ],
      status: "可选效果：选择后计入骰子",
    };
  }

  if (entry.id === "space-marines.detachment.librarius-conclave.enhancement.volley") {
    return {
      controls: [
        { id: "enabled", type: "checkbox", label: "本次应用齐射的致命一击" },
        { id: "pyromancy", type: "checkbox", label: "当前单位同时拥有烈焰学派（额外获得连击 1）" },
      ],
      effects: [
        { type: "lethal-hits", phase: "ranged", selection: { controlId: "enabled", equals: true } },
        { type: "sustained-hits", value: 1, phase: "ranged", selection: { controlId: "pyromancy", equals: true } },
      ],
      status: "可选效果：按学派状态计入骰子",
    };
  }

  const conditionalWoundGt = /攻击的\s*S\s*属性大[於于].*\s*T\s*属性.*致伤掷骰结果\s*-1|力量属性大[於于].*韧性属性.*致伤掷骰.*减少\s*1|力量.*大[於于].*韧性.*致伤掷骰.*-1/.test(text);
  if (conditionalWoundGt) add({ type: "incoming-wound-when-strength-gt", value: -1 });
  if (/AP\s*属性弱化\s*1|护甲穿透\s*-1|攻击AP减弱1|穿透效果减少\s*1/.test(text) && incoming) add({ type: "incoming-ap", value: -1 });
  if (/攻击的伤害(?:属性|特性|值)?\s*-1|伤害(?:属性|特性|值)减少\s*1/.test(text) && incoming && !/改为\s*1/.test(text)) add({ type: "incoming-damage-modifier", value: -1 });
  if (/伤害(?:属性|特性|值).*改为\s*1/.test(text) && incoming) add({ type: "damage-override", value: 1 });

  const rerollBoth = /重掷(?:一次)?命中掷骰(?:与|和|、)(?:一次)?(?:致伤|造伤)掷骰|重掷命中骰(?:与|和|、)(?:致伤|造伤)骰/.test(text);
  if (rerollBoth) {
    add({ type: "hit-reroll", mode: "failed" });
    add({ type: "wound-reroll", mode: "failed" });
  }
  if (/重掷结果为\s*1\s*的命中/.test(text)) add({ type: "hit-reroll", mode: "ones" });
  else if (/重掷(?:一次)?命中掷骰|重掷命中骰/.test(text)) add({ type: "hit-reroll", mode: "failed" });
  if (/重掷结果为\s*1\s*的(?:致伤|造伤)/.test(text)) add({ type: "wound-reroll", mode: "ones" });
  else if (/重掷(?:一次)?(?:致伤|造伤)掷骰|重掷(?:致伤|造伤)骰/.test(text)) add({ type: "wound-reroll", mode: "failed" });
  if (/重掷伤害掷骰|重掷(?:一次)?伤害骰/.test(text)) add({ type: "damage-reroll" });

  if (!incoming && /命中掷骰(?:结果)?\s*\+1|命中掷骰与(?:致伤|造伤)掷骰结果各\s*\+1/.test(text)) add({ type: "hit-modifier", value: 1 });
  if (incoming && /命中掷骰(?:结果)?\s*-1/.test(text)) add({ type: "incoming-hit-minus", value: 1 });
  if (!incoming && /(?:致伤|造伤)掷骰(?:结果)?\s*\+1|命中掷骰与(?:致伤|造伤)掷骰结果各\s*\+1/.test(text)) add({ type: "wound-modifier", value: 1 });
  if (incoming && !conditionalWoundGt && /(?:致伤|造伤)掷骰(?:结果)?\s*-1/.test(text)) add({ type: "incoming-wound-minus", value: 1 });

  if (/未修正(?:的)?命中掷骰\s*5\+\s*视为关键命中/.test(text)) add({ type: "hit-critical-threshold", value: 5 });
  if (!/选择\s*\[?致命一击/.test(text) && /\[致命一击\]/.test(text)) add({ type: "lethal-hits" });
  if (!/选择\s*\[?连击/.test(text) && /\[连击\s*1\]/.test(text)) add({ type: "sustained-hits", value: 1 });
  if (/\[毁灭伤害\]/.test(text)) add({ type: "devastating-wounds" });

  if (/近战武器[^。；]*(?:力量|S)[^。；]*\+3|近战武器的力量属性\s*\+3/.test(text)) add({ type: "weapon-strength-modifier", value: 3, phase: "melee" });
  else if (/(?:近战武器|近战攻击)[^。；]*(?:力量|S)[^。；]*\+2/.test(text)) add({ type: "weapon-strength-modifier", value: 2, phase: "melee" });
  else if (/(?:武器|攻击)[^。；]*(?:力量|S)[^。；]*\+1|(?:力量|S)(?:属性|特性)?\s*\+1/.test(text)) add({ type: "weapon-strength-modifier", value: 1 });
  const attackBonus = text.match(/(?:近战武器|近战攻击)[^。；]*(?:攻击次数|攻击属性|攻击特性)\s*\+(\d)|近战攻击拥有\s*\+(\d)\s*A|攻击、力量与伤害属性各\s*\+(\d)/);
  if (attackBonus) add({ type: "attack-modifier", value: Number(attackBonus[1] || attackBonus[2] || attackBonus[3]), phase: "melee" });
  if (!incoming && /(?:护甲穿透(?:属性|特性)?|\bAP\b)[^。；]*(?:\+1|提升\s*1|增强\s*1)/.test(text)) add({ type: "weapon-ap-modifier", value: 1 });
  if (!incoming && /(?:武器|攻击)[^。；]*伤害(?:属性|特性|值)?\s*\+1|攻击、力量与伤害属性各\s*\+1/.test(text) && !/[「“][^」”]+[」”]武器/.test(text)) add({ type: "damage-modifier", value: 1 });

  const fnp = text.match(/不(?:知|觉)疼痛\s*(\d)\+/);
  if (fnp) add({ type: "fnp", threshold: Number(fnp[1]) });

  const unique = effects.filter((effect, index) => effects.findIndex((candidate) => JSON.stringify(candidate) === JSON.stringify(effect)) === index);
  if (!unique.length) return null;
  return { controls: [enabledControl], effects: unique, status: "可选效果：勾选后计入骰子" };
}

function addCalculatorMappings(catalog) {
  Object.values(catalog).flat().forEach((detachment) => {
    [detachment.rule, ...detachment.stratagems, ...detachment.enhancements].forEach((entry) => {
      if (entry.type === "enhancement") {
        const text = String(entry.effectText || entry.text || "");
        entry.effectScope = /所在单位|领导(?:着|一个)?单位|所领导的单位|该单位中模型|(?:针对|对)该单位[^。；]*攻击|该单位的(?:远程|近战)?攻击|该单位模型的攻击/.test(text) ? "unit" : "owner";
        const eligibility = enhancementEligibility(entry);
        if (eligibility) entry.eligibility = eligibility;
      }
      const mapping = calculatorMapping(entry);
      if (mapping) Object.assign(entry, mapping);
    });
  });
  return catalog;
}

const catalog = addCalculatorMappings(Object.fromEntries(selectedInputs.map(({ factionId, file }) => [
  factionId,
  parseDetachmentFile(path.join(root, file), { factionId, sourcePath: file }),
]))) ;

const outputDir = path.join(root, "docs", "rules", "detachments");
fs.mkdirSync(outputDir, { recursive: true });
const outputPaths = [];
Object.entries(catalog).forEach(([factionId, detachments]) => {
  const output = `/* Generated by tools/generate-detachment-rules.mjs. Do not edit by hand. */\n(function (root) {\n  const registry = root.WarhammerDetachmentRegistry;\n  if (!registry) throw new Error("detachment-registry.js must load before faction detachment packages");\n  registry.register(${JSON.stringify(factionId)}, ${JSON.stringify(detachments, null, 2)});\n})(typeof globalThis === "undefined" ? this : globalThis);\n`;
  const outputPath = path.join(outputDir, `${factionId}.js`);
  fs.writeFileSync(outputPath, output, "utf8");
  outputPaths.push(outputPath);
});
const translated = Object.values(catalog).flat().flatMap((detachment) => [detachment, ...detachment.stratagems, ...detachment.enhancements])
  .filter((item) => item.identityStatus === "translated-needs-review");
const reviewPath = path.join(root, "docs", "audit", factionArgument ? `detachment-id-review-${factionArgument}.md` : "detachment-id-review.md");
const review = [
  "# 分遣队稳定 ID 暂译复核清单",
  "",
  "> 下列条目在项目提供的 11 版分遣队源文件中没有英文标题。生成器使用项目暂译构造稳定 slug；运行时只使用 ID/语义类型，中文显示名不会决定行为。后续在 40k.app 或官方英文资料找到一一对应名称时，只更新 `englishName`/审计状态；已发布 ID 应保留为兼容别名，不能静默更换存档键。",
  "",
  `共 ${translated.length} 条待英文来源复核。`,
  "",
  "| 阵营 | 类型 | 中文名 | 项目暂译 | 稳定 ID |",
  "| --- | --- | --- | --- | --- |",
  ...translated.map((item) => {
    const factionId = item.factionId || String(item.detachmentId || "").split(".detachment.")[0];
    const type = item.type === "stratagem" ? "计谋" : item.type === "enhancement" ? "增强" : "分遣队";
    return `| ${factionId} | ${type} | ${String(item.name).replace(/\|/g, "\\|")} | ${String(item.englishName).replace(/\|/g, "\\|")} | \`${item.id}\` |`;
  }),
  "",
].join("\n");
fs.writeFileSync(reviewPath, review, "utf8");
console.log(`Generated ${Object.values(catalog).flat().length} detachments -> ${outputPaths.map((outputPath) => path.relative(root, outputPath)).join(", ")}; ${translated.length} translated identities -> ${path.relative(root, reviewPath)}`);
