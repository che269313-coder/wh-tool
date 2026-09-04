/* 核心技能（通用规则）规范化。
 *
 * 深入打击、领袖、致命破灭、潜行等 11 版通用核心技能的规则全文收录在《核心规则》，
 * 不属于任何阵营数据。部署到浏览器的 unitRules 只应保留技能名清单；
 * 若把目录里的全文逐字带进每个单位，计算页就会出现大段重复解释（历史"漏网之鱼"问题）。
 *
 * normalizeCoreAbilityRules 的约定：
 * 1. source.kind === "core" 且无 controls 的条目 → 每个单位合并为一条"核心技能"束，
 *    text 只保留技能名清单，effects 汇总保留（不知疼痛、潜行等仍有计算意义）。
 * 2. 带 controls 的 core 条目（未来若出现）单独保留，但 text 清空，避免全文回流。
 * 3. 非 core 条目原样返回。
 */

const CORE_BUNDLE_ID = "core-bundle";
const CORE_BUNDLE_NAME = "核心技能";
const CORE_BUNDLE_STATUS = "通用核心技能，规则全文见《核心规则》";
export const MAX_CORE_TEXT_LENGTH = 60;

/* 通用核心技能的《核心规则》原文前缀签名。
 *
 * 数据层的 category/kind 标签并不可靠：历史上多次出现 core 条目被误标成
 * "unique" 而绕过规范化与审计（致命破灭回归、欧克兽人整包漏网）。
 * 因此除标签外，再按原文前缀兜底识别——凡正文以这些前缀开头的条目，
 * 无论 kind 是什么都按通用核心技能处理。签名应收录《核心规则》原文的
 * 稳定开头，而不是含具体数值的部分。
 */
export const GENERIC_CORE_TEXT_SIGNATURES = [
  ["致命破灭", "有些模型具有「致命破灭 x」的能力。"],
  ["领袖", "某些 **角色(Character)** 单位的资料表上列有「领袖」。"],
  ["深入打击", "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力"],
  ["不知疼痛", "某些模型的能力栏中列有「不觉疼痛x+」。"],
  ["斥候", "某些单位的能力栏中列有「斥候x"],
  ["射击甲板", "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。"],
];

export function matchGenericCoreText(text) {
  const value = String(text || "");
  for (const [name, prefix] of GENERIC_CORE_TEXT_SIGNATURES) {
    if (value.startsWith(prefix)) return name;
  }
  return "";
}

const isCoreLike = (rule) => rule?.source?.kind === "core" || !!matchGenericCoreText(rule?.text);

export function normalizeCoreAbilityRules(rules) {
  if (!Array.isArray(rules)) return rules;
  const kept = [];
  const coreNames = [];
  const coreEnglishNames = [];
  const coreEffects = [];
  let sawCore = false;
  for (const rule of rules) {
    if (!isCoreLike(rule)) {
      kept.push(rule);
      continue;
    }
    sawCore = true;
    if (rule.controls?.length) {
      kept.push({ ...rule, text: "" });
      continue;
    }
    if (!coreNames.includes(rule.name)) coreNames.push(rule.name);
    const englishName = rule.source?.englishName || "";
    if (englishName && !coreEnglishNames.includes(englishName)) coreEnglishNames.push(englishName);
    coreEffects.push(...(rule.effects || []));
  }
  if (!sawCore) return rules;
  if (!coreNames.length) return kept;
  return [
    {
      id: CORE_BUNDLE_ID,
      name: CORE_BUNDLE_NAME,
      text: coreNames.join("，"),
      status: CORE_BUNDLE_STATUS,
      effects: coreEffects,
      source: { englishName: coreEnglishNames.join(", "), kind: "core" },
    },
    ...kept,
  ];
}

/* 审计单个已加载的规则包：任何核心技能条目（source.kind === "core"，或正文命中
 * 通用核心规则原文签名——防止误标成 unique 的条目"漏网"）text 超长即违规。
 * 返回违规描述列表。 */
export function auditCoreAbilityText(unitRules) {
  const offenders = [];
  for (const [unitName, rules] of Object.entries(unitRules || {})) {
    for (const rule of rules || []) {
      const text = rule?.text || "";
      if (!isCoreLike(rule)) continue;
      if (text.length > MAX_CORE_TEXT_LENGTH) {
        offenders.push(`${unitName} · ${rule.name}（${text.length} 字）`);
      }
    }
  }
  return offenders;
}
