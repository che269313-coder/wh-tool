import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const generatedFactionDir = path.join(root, "docs", "rules", "detachments");
const generatedPaths = ["adeptus-custodes", "space-marines", "death-guard", "orks"].map((factionId) => path.join(generatedFactionDir, `${factionId}.js`));
assert(generatedPaths.every((filename) => fs.existsSync(filename)), "缺少按阵营生成的分遣队包");

if (generatedPaths.every((filename) => fs.existsSync(filename))) {
  const context = vm.createContext({ console });
  context.globalThis = context;
  const registryPath = path.join(root, "docs", "rules", "detachment-registry.js");
  vm.runInContext(fs.readFileSync(registryPath, "utf8"), context, { filename: registryPath });
  generatedPaths.forEach((filename) => vm.runInContext(fs.readFileSync(filename, "utf8"), context, { filename }));
  const catalog = context.WarhammerDetachmentRegistry?.list() || {};
  const expected = {
    "adeptus-custodes": { detachments: 10, stratagems: 48, enhancements: 32 },
    "space-marines": { detachments: 24, stratagems: 126, enhancements: 89 },
    "death-guard": { detachments: 10, stratagems: 48, enhancements: 32 },
    "orks": { detachments: 14, stratagems: 69, enhancements: 46 },
  };
  const all = [];
  Object.entries(expected).forEach(([factionId, counts]) => {
    const detachments = catalog[factionId] || [];
    assert(detachments.length === counts.detachments, `${factionId} 分遣队数量应为 ${counts.detachments}，实际为 ${detachments.length}`);
    assert(detachments.reduce((total, item) => total + item.stratagems.length, 0) === counts.stratagems, `${factionId} 计谋数量必须完整`);
    assert(detachments.reduce((total, item) => total + item.enhancements.length, 0) === counts.enhancements, `${factionId} 增强数量必须完整`);
    detachments.forEach((detachment) => {
      all.push(detachment);
      assert(detachment.id.startsWith(`${factionId}.detachment.`), `${detachment.name} 的稳定 ID 必须以阵营和 detachment scope 开头`);
      assert(detachment.name && detachment.rule?.name && detachment.rule?.text, `${detachment.id} 必须保留分遣队规则名称与完整文本`);
      assert(Array.isArray(detachment.stratagems) && Array.isArray(detachment.enhancements), `${detachment.id} 必须声明计谋与增强数组`);
      detachment.stratagems.forEach((rule) => assert(rule.detachmentId === detachment.id && rule.text && rule.effectText, `${rule.id || rule.name} 必须归属具体分遣队并保留效果文本`));
      detachment.enhancements.forEach((rule) => assert(rule.detachmentId === detachment.id && rule.text && rule.effectText && Number.isFinite(rule.points), `${rule.id || rule.name} 必须归属具体分遣队并保留点数/效果文本`));
      detachment.enhancements.forEach((rule) => assert(["owner", "unit"].includes(rule.effectScope), `${rule.id || rule.name} 必须声明增强作用于持有者还是所在单位`));
      detachment.enhancements.filter((rule) => rule.restriction).forEach((rule) => assert(rule.eligibility && (rule.eligibility.any?.length || rule.eligibility.all?.length), `${rule.id || rule.name} 的适用范围必须生成稳定 eligibility，不能只显示限制文字`));
    });
  });
  const ids = all.flatMap((detachment) => [detachment.id, detachment.rule.id, ...detachment.stratagems.map((rule) => rule.id), ...detachment.enhancements.map((rule) => rule.id)]);
  assert(new Set(ids).size === ids.length, "全部分遣队、规则、计谋和增强的稳定 ID 必须全局唯一");
  assert(!ids.some((id) => /\.(?:stratagem|enhancement)\.\d+$/.test(id)), "计谋和增强 ID 不得使用数组序号，缺官方英文名时必须使用已记录暂译 slug");
  assert(!all.flatMap((detachment) => [detachment, ...detachment.stratagems, ...detachment.enhancements]).some((item) => item.identityStatus === "unresolved"), "分遣队身份不得留下 unresolved 条目");

  for (const relative of ["rules/faction-registry.js", "rules/effect-schema.js", "rules/factions.js", "rules/effects.js", "rules/resolver.js"]) {
    const filename = path.join(root, "docs", relative);
    vm.runInContext(fs.readFileSync(filename, "utf8"), context, { filename });
  }
  const resolver = context.WarhammerRuleResolver;
  const allRules = Object.values(catalog).flat().flatMap((detachment) => [detachment.rule, ...detachment.stratagems, ...detachment.enhancements]);
  const schemaErrors = context.WarhammerEffectSchema.validateRules(allRules);
  assert(schemaErrors.length === 0, `分遣队效果必须全部符合公共 schema：${schemaErrors.join("；")}`);
  assert(typeof resolver?.detachmentsForFaction === "function", "resolver 必须提供通用 detachmentsForFaction API");
  assert(typeof resolver?.matchDetachments === "function", "resolver 必须提供支持多分遣队军表的 matchDetachments API");
  assert(typeof resolver?.matchEnhancement === "function", "resolver 必须通过所选分遣队匹配增强归属");
  if (resolver?.matchDetachments) {
    const custodes = resolver.matchDetachments("帝皇禁军", "雷灭锤击(黄),盾卫军团(红)(3DP)");
    const marines = resolver.matchDetachments("白色疤痕", "矛尖特遣队(蓝),智库密会(青)(3DP)");
    assert(custodes.map((item) => item.name).join("|") === "雷灭锤击|盾卫军团", "禁军导入必须保留同一军表的两个分遣队及源顺序");
    assert(marines.map((item) => item.name).join("|") === "矛尖特遣队|智库密会", "星际战士导入必须保留同一军表的两个分遣队及源顺序");
    const custodesIds = custodes.map((item) => item.id);
    assert(resolver.matchEnhancement("帝皇禁军", custodesIds, "全视仪；分数：5")?.name === "全视仪", "增强必须只在该军表已选分遣队中匹配");
    assert(resolver.matchEnhancement("帝皇禁军", [custodesIds[0]], "全视仪；分数：5") === null, "未启用的分遣队不得向单位泄漏增强");
    const none = resolver.resolveDetachments("帝皇禁军", [], {}, {});
    assert(none.attack.hitModifier === 0 && none.defend.incomingHitModifier === 0, "未选择分遣队时解析结果必须为空");
    const lionsId = "adeptus-custodes.detachment.lions-of-the-emperor";
    const lions = resolver.resolveUnitWithDetachments("帝皇禁军", "禁军盾卫", [lionsId], [], { [`${lionsId}.rule.enabled`]: true }, { phase: "melee" });
    assert(lions.attack.hitModifier === 1 && lions.attack.woundModifier === 1, "帝皇之狮的以寡敌众必须在玩家确认条件后同时提供命中/致伤 +1");
    const shieldId = "adeptus-custodes.detachment.shield-host";
    const shield = resolver.resolveUnitWithDetachments("帝皇禁军", "禁军盾卫", [shieldId], [], { [`${shieldId}.rule.katahChoice`]: "critical" }, { phase: "melee" });
    assert(shield.attack.hitCriticalThreshold === 5, "盾卫军团必须按稳定语义选项切换近战 5+ 暴击");
    const hunterId = "space-marines.detachment.spearpoint-task-force.enhancement.hunters-eye";
    const hunterRule = catalog["space-marines"].flatMap((item) => item.enhancements).find((item) => item.id === hunterId);
    assert(hunterRule?.effectScope === "unit", "猎手之眼必须作用于持有者所在单位，而不是只作用于人物武器");
    const hunter = resolver.resolveUnitWithDetachments("星际战士", "连长", ["space-marines.detachment.spearpoint-task-force"], [hunterId], { [`${hunterId}.enabled`]: true }, { phase: "ranged" });
    assert(hunter.attack.sustainedHits === 1, "猎手之眼分配给单位并启用后必须提供远程连击 1");
    const ownerId = "adeptus-custodes.detachment.lions-of-the-emperor.enhancement.admonimortis";
    const ownerRule = catalog["adeptus-custodes"].flatMap((item) => item.enhancements).find((item) => item.id === ownerId);
    assert(ownerRule?.effectScope === "owner", "持有者武器增强必须只作用于装备该增强的角色模型");
    const ownerA = resolver.resolveUnitWithEnhancements("帝皇禁军", "盾卫连长", ["adeptus-custodes.detachment.lions-of-the-emperor"], [ownerId], { [`${ownerId}.enabled`]: true }, { phase: "melee", enhancementScope: "owner" });
    const ownerB = resolver.resolveUnitWithEnhancements("帝皇禁军", "刃卫冠军", ["adeptus-custodes.detachment.lions-of-the-emperor"], [], { [`${ownerId}.enabled`]: true }, { phase: "melee", enhancementScope: "owner" });
    assert(ownerA.attack.strengthModifier === 3 && ownerB.attack.strengthModifier === 0, "角色 A 的持有者增强不得泄漏给联合单位中的角色 B");
    const resilientId = "death-guard.detachment.virulent-vectorium.stratagem.disgustingly-resilient";
    const resilient = resolver.resolveUnitWithDetachments("死亡守卫", "瘟疫战士", ["death-guard.detachment.virulent-vectorium"], [], { [`${resilientId}.enabled`]: true }, { phase: "ranged" });
    assert(resilient.defend.incomingDamageModifier === -1, "可憎韧性必须通过中立防守效果提供伤害 -1");
    const swarmId = "death-guard.detachment.paragons-of-decay.enhancement.restorative-swarm";
    const swarm = resolver.resolveUnitWithDetachments("死亡守卫", "瘟疫战士", ["death-guard.detachment.paragons-of-decay"], [swarmId], { [`${swarmId}.enabled`]: true }, { phase: "ranged" });
    assert(swarm.defend.incomingWoundWhenStrengthGreater === -1 && swarm.defend.incomingWoundModifier === 0, "回复虫群只应在 S>T 时提供致伤 -1，不能重复叠加成无条件 -1");
  }

  const rosterContextPath = path.join(root, "docs", "rules", "roster-context.js");
  assert(fs.existsSync(rosterContextPath), "缺少军表分遣队实例上下文模块");
  if (fs.existsSync(rosterContextPath)) {
    vm.runInContext(fs.readFileSync(rosterContextPath, "utf8"), context, { filename: rosterContextPath });
    const rosterContext = context.WarhammerRosterContext;
    const custodesList = [
      "测试禁军(2000分)",
      "帝皇禁军",
      "雷灭锤击(黄),盾卫军团(红)(3DP)",
      "盾卫连长(主将)(115分)",
      "强化：全视仪；分数：5",
    ].join("\n");
    const marineList = [
      "测试星际战士(2000分)",
      "白色疤痕",
      "矛尖特遣队(蓝),智库密会(青)(3DP)",
      "速不台可汗(主将)(90分)",
    ].join("\n");
    const custodesMetadata = rosterContext.parseMetadata("帝皇禁军", custodesList, resolver);
    const marineMetadata = rosterContext.parseMetadata("白色疤痕", marineList, resolver);
    assert(custodesMetadata.detachmentIds.length === 2 && custodesMetadata.dp === 3, "禁军军表必须导入两个分遣队并计算 3DP");
    assert(marineMetadata.detachmentIds.length === 2 && marineMetadata.dp === 3, "星际战士军表必须导入两个分遣队并计算 3DP");
    assert(rosterContext.matchEnhancement("帝皇禁军", custodesMetadata.detachmentIds, "全视仪；分数：5", resolver)?.id.includes("panoptispex"), "军表人物增强必须映射到稳定增强 ID");
    const left = rosterContext.sourceKey("attacker", "roster-a", "same-unit-id");
    const right = rosterContext.sourceKey("defender", "roster-b", "same-unit-id");
    assert(left !== right && left.includes("roster-a") && right.includes("roster-b"), "同阵营同名单位必须按军表实例与计算方隔离状态 key");
    assert(typeof rosterContext.enhancementTargets === "function", "军表上下文必须提供纯函数筛选可装备增强的角色");
    if (typeof rosterContext.enhancementTargets === "function") {
      const targets = rosterContext.enhancementTargets([
        { id: "captain-a", name: "角色 A", role: "领导", keywords: ["角色"] },
        { id: "captain-b", name: "角色 B", role: "角色", keywords: ["Character"] },
        { id: "bodyguard", name: "护卫", role: "护卫", keywords: ["步兵"] },
      ]);
      assert(targets.map((item) => item.id).join("|") === "captain-a|captain-b", "增强选择器只能保留角色，并允许联合单位中的多个角色分别选择");
      assert(typeof rosterContext.enhancementIdsForTarget === "function", "增强解析必须按角色实例 ID 取值，不能只按同名数据卡匹配");
      if (typeof rosterContext.enhancementIdsForTarget === "function") {
        const assignments = { "captain-a": "enhancement-a", "captain-b": "enhancement-b", bodyguard: "invalid" };
        assert(rosterContext.enhancementIdsForTarget(assignments, targets, "captain-a").join("|") === "enhancement-a", "同名角色 A 只能取得自己装备的增强");
        assert(rosterContext.enhancementIdsForTarget(assignments, targets, "captain-b").join("|") === "enhancement-b", "同名角色 B 只能取得自己装备的增强");
      }
      assert(typeof rosterContext.matchesEnhancementEligibility === "function", "军表上下文必须提供增强适用范围匹配器");
      if (typeof rosterContext.matchesEnhancementEligibility === "function") {
        const terminator = { id: "terminator", name: "终结者盾卫连长", role: "角色", keywords: ["人物", "终结者", "步兵"] };
        const normalCaptain = { id: "captain", name: "盾卫连长", role: "角色", keywords: ["人物", "步兵"] };
        assert(rosterContext.matchesEnhancementEligibility(terminator, { any: [["终结者", "terminator"]] }), "终结者角色必须能选择仅限终结者的增强");
        assert(!rosterContext.matchesEnhancementEligibility(normalCaptain, { any: [["终结者", "terminator"]] }), "非终结者角色不得选择仅限终结者的增强");
        assert(!rosterContext.matchesEnhancementEligibility(terminator, { any: [["灵能者", "psyker"]], exclude: [["终结者", "terminator"]] }), "排除终结者的灵能者增强不得提供给终结者角色");
        assert(rosterContext.matchesEnhancementEligibility({ ...normalCaptain, keywords: ["人物", "步兵", "Phobos"] }, { all: [["步兵", "infantry"], ["恐惧型", "phobos"]] }), "多重限制必须支持同时满足全部关键词");
      }
    }
  }

  const appSource = fs.readFileSync(path.join(root, "docs", "app.js"), "utf8");
  assert(/detachmentIds:\s*\[\]/.test(appSource), "未导入军表和独立数据卡必须默认不启用分遣队");
  assert(/WarhammerRosterContext\?\.parseMetadata/.test(appSource), "军表导入必须通过通用上下文模块识别分遣队");
  assert(/enhancementId/.test(appSource) && /matchEnhancement/.test(appSource), "导入的单位增强必须保存稳定 ID");
  assert(/rosterSide/.test(appSource) && /rosterId/.test(appSource), "计算器军表条目必须携带来源方与军表实例 ID");
  assert(/\["attacker", "defender"\]\.flatMap\(calculatorRosterOptions\)/.test(appSource), "每个计算侧的搜索都必须列出两份已导入军表，支持同阵营内战选取同名单位");
  assert(/sideLabel\(side\).*roster\.name/.test(appSource), "同名军表单位的搜索标签必须显示来源方与军表名");
  assert(/WarhammerRosterContext\?\.sourceKey/.test(appSource), "计算草稿必须按计算方、军表实例和单位 ID 生成隔离 key");
  assert(/candidate\.enhancementAssignments\[targetId\]/.test(appSource), "同一军表实例被多个计算行引用时，增强改动必须同步到该实例的全部草稿");
  assert(/data-calc-detachment/.test(appSource), "计算页必须提供分遣队多选控件");
  assert(/data-calc-enhancement/.test(appSource), "计算页必须提供单位增强分配控件");
  assert(/matchesEnhancementEligibility/.test(appSource), "增强下拉和计算入口必须按稳定适用范围过滤，而不是只显示 restriction 文本");
  assert(/WarhammerRosterContext\?\.enhancementTargets/.test(appSource), "增强选择器必须通过通用角色资格契约过滤，不能直接遍历护卫");
  assert(/<details class="calculator-detachments">/.test(appSource) && !/<details class="calculator-detachments" open>/.test(appSource), "分遣队区域必须默认折叠");
  assert(/detachmentDp/.test(appSource) && /DP/.test(appSource), "计算页必须显示已选分遣队 DP 合计");
  assert(/rulesForDetachments/.test(appSource), "计算页必须完整展示所选分遣队的规则、计谋和增强");
  assert(/resolveUnitWithDetachments/.test(appSource), "单位与增强效果必须通过通用组合解析入口进入计算器");
  assert(typeof context.WarhammerRuleResolver?.resolveUnitWithDetachments === "function", "resolver 必须提供单位+分遣队的单次组合归约，避免应用层按名称拼效果");
  assert(typeof context.WarhammerRuleResolver?.resolveUnitWithEnhancements === "function", "resolver 必须支持单位/增强与分遣队基础规则分开归约");
  assert(/resolvedUnitAndEnhancementEffects\(attackerDraft/.test(appSource) && /detachmentSharedEffects = resolvedDetachmentRuleEffects/.test(appSource), "联合单位必须只归约一次分遣队基础规则，不能按成员重复叠加");
  assert(/sourceSharedRuleEntries/.test(appSource) && /resolveUnitScoped\(/.test(appSource), "联合单位共享归约不得混入持有者增强，否则会把角色增强泄漏给护卫或其他角色");
  assert(/source\.parentId \|\| source\.id/.test(appSource), "角色增强必须按军表成员实例 ID 解析，不能只按单位名解析");
  const engineSource = fs.readFileSync(path.join(root, "docs", "engine.js"), "utf8");
  assert(/incomingDamageModifier/.test(engineSource) && /Math\.max\(1, amount \+/.test(engineSource), "伤害 -1 必须在掷出伤害后结算且不能把普通伤害降到 0");

  const indexSource = fs.readFileSync(path.join(root, "docs", "index.html"), "utf8");
  assert(/<details class="calculator-core-context">/.test(indexSource) && !/<details class="calculator-core-context" open>/.test(indexSource), "通用武器规则条件必须默认折叠");
  const runButtonIndex = indexSource.indexOf('id="runCalc"');
  const resultIndex = indexSource.indexOf('class="calculation-result"');
  const detailsIndex = indexSource.indexOf('id="calculatorDetails"');
  assert(runButtonIndex >= 0 && resultIndex > runButtonIndex && resultIndex < detailsIndex, "模拟结果必须紧跟 1,000 次模拟操作区，并位于长技能详情之前");

  for (const factionId of Object.keys(expected)) {
    assert(fs.existsSync(path.join(generatedFactionDir, `${factionId}.js`)), `分遣队生成物必须按阵营隔离：${factionId}.js`);
  }
  assert(!fs.existsSync(path.join(root, "docs", "rules", "detachments.js")), "不得保留会被单队更新整体改写的分遣队总文件");
  const generatorSource = fs.readFileSync(path.join(root, "tools", "generate-detachment-rules.mjs"), "utf8");
  assert(/--faction=/.test(generatorSource) && /selectedInputs/.test(generatorSource), "分遣队生成器必须支持只生成一个阵营");
  assert(["帝皇禁军", "星际战士", "死亡守卫", "欧克兽人"].every((name) => generatorSource.includes(`docs/data/${name}/分遣队规则-11版原始文本.txt`)), "生成器必须从各队资料目录读取分遣队原文");
}

if (failures.length) {
  console.error(`分遣队验证失败（${failures.length}）：`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("分遣队数据契约验证通过。");
}
