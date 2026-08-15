// Apply weaponNames to modelProfiles that lack it, so a profile does not
// inherit champion-only weapons from the card's full weapons list.
// Usage: node tools/apply-weaponnames.mjs <faction>... [--dry-run]
// Write-back re-serializes the whole registered data object (robust against
// duplicate profile ids across cards).
// 注意：`generate-calculator-catalog.mjs` 重新生成 catalog 会丢弃仅存在于
// catalog 中的 weaponNames，跑完生成器后需重跑本脚本补回。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const dryRun = process.argv.includes('--dry-run');
const requestedFactions = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const factions = requestedFactions.length ? requestedFactions : fs.readdirSync(path.join(root, "data", "factions"))
  .filter((factionId) => fs.existsSync(path.join(root, "data", "factions", factionId, "package.json")));
const dir = path.join(root, 'docs', 'catalogs');

const norm = (s) => String(s || '').replace(/[\s\u00a0·・,，。:：()（）\[\]【】"“”'"']/g, '').toLowerCase();

function splitEquip(eq) {
  return String(eq || '').split(/[；;，,、]/)
    .map((s) => s.replace(/^\d+\s*[xX×]\s*/, '').replace(/^\d+\s*个/, '').replace(/[（(].*?[）)]/g, '').trim())
    .filter((s) => s && !/无（源站未提供/.test(s));
}

function matchWeaponName(card, name) {
  const n = norm(name.replace(/[（(].*?[）)]/g, ''));
  if (!n) return null;
  const candidates = (card.weapons || []).map((w) => ({ w, cn: norm(String(w.name || '').replace(/[（(].*?[）)]/g, '').trim()) }))
    .filter((x) => x.cn);
  // 先精确匹配，再退化为子串匹配（避免「砍刀」误匹配到「大砍刀」）。
  for (const x of candidates) if (x.cn === n) return x.w.name;
  for (const x of candidates) if (x.cn.includes(n) || n.includes(x.cn)) return x.w.name;
  return null;
}

function optionChineseName(card, opt) {
  if (opt.name && opt.name !== '') return opt.name;
  if (opt.item_name) {
    const en = String(opt.item_name).toLowerCase();
    const w = (card.weapons || []).find((x) => String(x.englishName || '').toLowerCase() === en);
    if (w) return w.name;
  }
  return null;
}

function isLeaderProfile(p) {
  if (['champion', 'leader', 'sergeant'].includes(p.id)) return true;
  return /队长|首领|冠军|领导|leader|champion/i.test(String(p.role || ''));
}

function computeWeaponNames(card, profile) {
  const names = new Set();
  for (const n of splitEquip(profile.defaultEquipment)) {
    const m = matchWeaponName(card, n);
    if (m) names.add(m);
  }
  const leader = isLeaderProfile(profile);
  for (const wg of card.wargearOptions || []) {
    const caps = wg.caps || {};
    const restricted = Boolean(caps.restrictedTo) || caps.kind === 'leader';
    for (const opt of wg.options || []) {
      if (opt.default) continue;
      if (restricted !== leader) continue;
      const cn = optionChineseName(card, opt);
      if (cn) names.add(cn);
    }
  }
  return [...names].filter(Boolean);
}

let changed = 0;
let totalProfiles = 0;

for (const faction of factions) {
  const file = `${dir}/${faction}.js`;
  if (!fs.existsSync(file)) { console.log(`SKIP (no catalog): ${faction}`); continue; }
  const source = fs.readFileSync(file, 'utf8');

  let data = null;
  globalThis.WarhammerCalculatorCatalogRegistry = { register(n, d) { data = d; } };
  try { eval(source); } catch (e) { console.log(`EVAL FAIL ${faction}: ${e.message}`); continue; }
  if (!data || !Array.isArray(data.cards)) { console.log(`NO DATA ${faction}`); continue; }

  const cards = data.cards;
  const skipped = [];
  let factionCardsChanged = 0;
  let factionProfiles = 0;

  for (const card of cards) {
    const profiles = card.modelProfiles || [];
    if (profiles.length < 2) continue;
    let cardChanged = false;
    for (const p of profiles) {
      if (Array.isArray(p.weaponNames) && p.weaponNames.length) continue;
      if (splitEquip(p.defaultEquipment).length === 0) {
        skipped.push(`${card.name}::${p.id}`);
        continue;
      }
      const wn = computeWeaponNames(card, p);
      if (!wn.length) { skipped.push(`${card.name}::${p.id}(no-match)`); continue; }
      p.weaponNames = wn;
      factionProfiles++;
      cardChanged = true;
      console.log(`${faction} :: ${card.name} :: ${p.id} -> [${wn.join(', ')}]`);
    }
    if (cardChanged) factionCardsChanged++;
  }

  if (skipped.length) console.log(`  [SKIP empty-default/no-match] ${faction}: ${skipped.join(', ')}`);

  if (factionProfiles) {
    // Re-serialize the whole data object in place of the register(...) argument.
    const regIdx = source.indexOf('registry.register(');
    const openBrace = source.indexOf('{', regIdx);
    let depth = 0, close = -1;
    for (let i = openBrace; i < source.length; i++) {
      if (source[i] === '{') depth++;
      else if (source[i] === '}') { depth--; if (depth === 0) { close = i; break; } }
    }
    if (close < 0) { console.log(`SERIALIZE FAIL ${faction}`); continue; }
    const newSource = source.slice(0, openBrace) + JSON.stringify(data) + source.slice(close + 1);
    if (!dryRun) {
      fs.writeFileSync(file, newSource);
      // 同步写出 JSON 产物：fetch 优先路径与 file:// 脚本回退必须内容一致。
      const jsonFile = file.replace(/\.js$/, ".json");
      if (fs.existsSync(jsonFile)) fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2) + "\n");
    } else {
      console.log(`  [dry-run] ${faction} would write`);
    }
    changed += factionCardsChanged;
    totalProfiles += factionProfiles;
  }
}

console.log(`\nDONE: ${changed} cards, ${totalProfiles} profiles ${dryRun ? '(DRY RUN)' : '(APPLIED)'}`);
