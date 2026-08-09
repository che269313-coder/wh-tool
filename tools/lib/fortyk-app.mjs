const slug = (value) => String(value || "")
  .normalize("NFKD")
  .replace(/[’']/g, "")
  .replace(/[^a-zA-Z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .toLowerCase();

function readBalancedObject(text, start) {
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') quoted = false;
      continue;
    }
    if (character === '"') quoted = true;
    else if (character === "{") depth += 1;
    else if (character === "}" && --depth === 0) return text.slice(start, index + 1);
  }
  return "";
}

export function extractDatasheet(html) {
  const chunks = [];
  for (const match of String(html || "").matchAll(/self\.__next_f\.push\((\[[\s\S]*?\])\)<\/script>/g)) {
    try {
      const payload = JSON.parse(match[1]);
      if (typeof payload[1] === "string") chunks.push(payload[1]);
    } catch {
      // Ignore non-JSON bootstrap chunks; datasheet payloads use JSON arrays.
    }
  }
  for (const chunk of chunks) {
    const marker = chunk.indexOf('"datasheet":');
    if (marker < 0) continue;
    const start = chunk.indexOf("{", marker);
    const objectText = readBalancedObject(chunk, start);
    if (!objectText) continue;
    try { return JSON.parse(objectText); } catch { /* try another chunk */ }
  }
  return null;
}

export function extractUnitLinks(html, factionSlug) {
  const prefix = `/factions/${factionSlug}/units/`;
  const result = [];
  const seen = new Set();
  for (const match of String(html || "").matchAll(/href=["']([^"']+)["']/g)) {
    if (!match[1].startsWith(prefix)) continue;
    const unitSlug = match[1].slice(prefix.length).split(/[/?#]/)[0];
    if (!unitSlug || seen.has(unitSlug)) continue;
    seen.add(unitSlug);
    result.push(unitSlug);
  }
  return result;
}

export function identityRows(factionSlug, sourceUrl, datasheet) {
  return (datasheet?.abilities || [])
    .filter((ability) => ability.abilityType === "datasheet")
    .map((ability) => ({
      id: `${slug(factionSlug)}.${slug(datasheet.slug || datasheet.name)}.${slug(ability.name)}`,
      factionId: slug(factionSlug),
      scopeId: slug(datasheet.slug || datasheet.name),
      unitEnglishName: datasheet.name,
      englishName: ability.name,
      matchStatus: "official",
      sourceUrl,
    }));
}
