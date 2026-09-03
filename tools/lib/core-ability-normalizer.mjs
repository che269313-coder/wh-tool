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

export function normalizeCoreAbilityRules(rules) {
  if (!Array.isArray(rules)) return rules;
  const kept = [];
  const coreNames = [];
  const coreEnglishNames = [];
  const coreEffects = [];
  let sawCore = false;
  for (const rule of rules) {
    if (rule?.source?.kind !== "core") {
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

/* 审计单个已加载的规则包：任何 core 条目（含束）text 超长即违规。返回违规描述列表。 */
export function auditCoreAbilityText(unitRules) {
  const offenders = [];
  for (const [unitName, rules] of Object.entries(unitRules || {})) {
    for (const rule of rules || []) {
      if (rule?.source?.kind !== "core") continue;
      if ((rule.text || "").length > MAX_CORE_TEXT_LENGTH) {
        offenders.push(`${unitName} · ${rule.name}（${(rule.text || "").length} 字）`);
      }
    }
  }
  return offenders;
}
