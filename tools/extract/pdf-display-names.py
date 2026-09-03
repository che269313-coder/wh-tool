"""Extract reviewable PDF display-name decisions using stable English identities.

The extractor only accepts a title when it can tie the PDF page to a current
card through its official English name or through an existing faction-scoped
alias that occurs in the page title area. Ambiguous candidates fail instead of
being guessed. The output is an authored build input; rerunning this script is
an audit/review operation, not part of the browser runtime.

Weapon names use the same discipline: a PDF weapon row is accepted only when
its full stat signature (section, range, A, WS/BS, S, AP, D) matches exactly
one backend weapon identity (englishName) inside the owning card's page
region. Rows that do not anchor uniquely are skipped, never guessed.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CHINESE = re.compile(r"[\u4e00-\u9fff]")
PAGE_SPLIT = re.compile(r"^=====\s*第\s*(\d+)\s*页\s*=====\s*$", re.MULTILINE)

WEAPON_SECTIONS = ("射击武器", "近战武器", "远程武器", "近身武器", "射击装备", "近战装备", "格斗武器")
WEAPON_SECTION_END = (
    "军表构成", "阵营关键词", "关键词", "单位构成", "单位装备", "升级选项",
    "核心技能", "特殊保护", "领袖", "能力详解", "装备选项", "受损",
)
WEAPON_HEADER_CELLS = {"武器名", "攻击范围", "射程", "范围", "A", "BS", "WS", "S", "AP", "D", "武器技能", "特效"}
TITLE_SHAPE = re.compile(r"^[\u4e00-\u9fff]*\s*[A-Z][A-Za-z'’\- ]*$")
GENERIC_WEAPON_NAMES = {"近战", "格斗", "格斗武器", "近战武器", "肉搏", "肉搏武器", "无", "武器"}
MODE_NAMES = {"横扫", "重击", "聚焦", "散射", "标准", "过热", "猛击", "扫击", "打击"}
FRAGMENT_NAMES = {"锯剑", "肢体"}


def english_title_match(line: str, english: str) -> bool:
    """Whole-word match so 'Boyz' never matches 'Stormboyz'."""
    if not english:
        return False
    pattern = re.compile(
        r"(?<![A-Za-z'’\-])" + re.escape(english) + r"(?![A-Za-z'’\-])",
        re.IGNORECASE,
    )
    return bool(pattern.search(line))
STAT_RANGE = re.compile(r"^(?:近战|近身|格斗|\d+[\"寸]?|[-—])$")
STAT_DICE = re.compile(r"^(?:\d+|D\d+(?:[+\-]\d+)?|2D\d+|\d+D\d+|[-—])$")
STAT_SKILL = re.compile(r"^(?:\d+\+|[-—])$")
STAT_STRENGTH = re.compile(r"^(?:\d+|U|用户|[-—])$")
STAT_AP = re.compile(r"^-?\d+$")
NAME_FORBIDDEN = re.compile(r"[：:。，,？！?；;（）()]|^[（(【\[⚫·>＞]|^\d+$|^[A-Za-z][A-Za-z'’\- ]*$")


def read_json(filename: Path) -> dict:
    return json.loads(filename.read_text(encoding="utf-8-sig"))


def normalized(value: str) -> str:
    return re.sub(r"[\s\u00a0]+", "", value).casefold().replace("’", "'").replace("‘", "'").replace("＇", "'")


def normalized_stat(value) -> str:
    if value is None:
        value = ""
    value = str(value).strip()
    value = re.sub(r"[\s\u00a0]", "", value).upper()
    value = value.replace('"', "").replace("“", "").replace("”", "").replace("寸", "")
    value = value.replace("\\", "-").replace("／", "/")
    value = value.replace("－", "-").replace("−", "-").replace("—", "-").replace("–", "-")
    return value


def evidence_pages(directory: Path) -> list[tuple[int, str, Path]]:
    pages: list[tuple[int, str, Path]] = []
    for filename in sorted(directory.glob("全文*.txt")):
        parts = PAGE_SPLIT.split(filename.read_text(encoding="utf-8-sig", errors="ignore"))
        for index in range(1, len(parts), 2):
            pages.append((int(parts[index]), parts[index + 1], filename))
    return pages


def unit_aliases_by_canonical(package: dict) -> dict[str, list[str]]:
    result: dict[str, list[str]] = {}
    for alias, entry in package.get("aliases", {}).get("units", {}).items():
        canonical = entry.get("canonical") if isinstance(entry, dict) else entry
        if canonical:
            result.setdefault(canonical, []).append(alias)
    return result


def unit_known_names(package: dict, name: str) -> tuple[str, ...]:
    """All package names that refer to the same unit identity as `name`."""
    units = package.get("aliases", {}).get("units", {})
    entry = units.get(name)
    canonical = entry.get("canonical") if isinstance(entry, dict) else entry
    known = [name]
    if canonical and canonical != name:
        known.append(canonical)
    for alias, other in units.items():
        other_canonical = other.get("canonical") if isinstance(other, dict) else other
        if other_canonical in {canonical, name} and alias not in known:
            known.append(alias)
    return tuple(known)


def clean_markdown_cell(value: str) -> str:
    value = re.sub(r"<br\s*/?>", " ", value, flags=re.IGNORECASE)
    value = re.sub(r"\*\*|`", "", value)
    return re.sub(r"\s+", " ", value).strip()


def clean_pdf_ability_name(value: str) -> str:
    value = re.sub(r"^(?:装备技能|装备)\s*[-：:]\s*", "", value)
    value = re.sub(r"（关键词）.*$", "", value)
    value = re.sub(r"（(?:装备[^）]*|仅[^）]*|只有[^）]*|含[^）]*|[^）]*描述内|[^）]*子选项)）.*$", "", value)
    return value.strip()


def comparison_reports(directory: Path) -> list[Path]:
    reports = sorted(directory.glob("*.md"))
    batches = [filename for filename in reports if re.search(r"-b\d+\.md$", filename.name)]
    return batches or reports


def ability_comparisons(faction_id: str, evidence_directory: Path, source_id: str) -> list[dict]:
    faction_directory = evidence_directory.parent
    raw_text = "\n".join(
        filename.read_text(encoding="utf-8-sig", errors="ignore")
        for filename in sorted(evidence_directory.glob("全文*.txt"))
    )
    normalized_raw_text = normalized(raw_text)
    rows: list[dict] = []

    for filename in comparison_reports(faction_directory):
        in_table = False
        last_unit = ""
        for line_number, line in enumerate(filename.read_text(encoding="utf-8-sig", errors="ignore").splitlines(), 1):
            if not line.startswith("|"):
                in_table = False
                continue
            cells = [clean_markdown_cell(cell) for cell in line.strip().strip("|").split("|")]
            if (
                len(cells) >= 5
                and "单位" in cells[0]
                and "PDF" in cells[1]
                and "网站" in cells[2]
                and "englishName" in cells[3]
            ):
                in_table = True
                last_unit = ""
                continue
            if not in_table or len(cells) < 5 or all(re.fullmatch(r"[-: ]+", cell or "-") for cell in cells):
                continue
            unit, pdf_name, source_name, english_name, verdict = cells[:5]
            if unit:
                last_unit = re.sub(r"（p\d+）.*$", "", unit).strip()
            display = clean_pdf_ability_name(pdf_name)
            if (
                not last_unit
                or not display
                or display == "—"
                or source_name in {"", "—"}
                or english_name in {"", "—"}
                or "无法确认" in verdict
                or display == source_name
            ):
                continue
            report_path = filename.relative_to(ROOT).as_posix()
            rows.append({
                "sourceName": source_name,
                "englishName": english_name,
                "display": display,
                "unit": last_unit,
                "evidence": f"{report_path}#L{line_number}",
                "rawExtractVerified": normalized(display) in normalized_raw_text,
            })

    grouped: dict[tuple[str, str, str], dict] = {}
    for row in rows:
        key = (row["sourceName"], row["englishName"], row["display"])
        entry = grouped.setdefault(key, {
            "sourceName": row["sourceName"],
            "englishName": row["englishName"],
            "display": row["display"],
            "sourceId": source_id,
            "units": [],
            "evidence": [],
            "rawExtractVerified": False,
        })
        if row["unit"] not in entry["units"]:
            entry["units"].append(row["unit"])
        if row["evidence"] not in entry["evidence"]:
            entry["evidence"].append(row["evidence"])
        entry["rawExtractVerified"] = entry["rawExtractVerified"] or row["rawExtractVerified"]

    # Comparison reports are review aids, not authoritative source text.  A
    # candidate only enters the strong ledger when its cleaned title is also
    # present in the restored PDF extract.  OCR misses remain a lower-priority
    # backend fallback until they receive separate page-level adjudication.
    verified = [entry for entry in grouped.values() if entry["rawExtractVerified"]]
    return sorted(verified, key=lambda entry: (
        normalized(entry["sourceName"]), normalized(entry["englishName"]), normalized(entry["display"])
    ))


def title_candidates(card: dict, pages: list[tuple[int, str, Path]], aliases: list[str]) -> list[dict]:
    current = str(card.get("name") or "").strip()
    english = str(card.get("englishName") or card.get("unit", {}).get("englishName") or "").strip()
    english_key = normalized(english) if english and not CHINESE.search(english) else ""
    known_names = [current, *aliases]
    candidates: list[dict] = []

    for page_number, page_text, filename in pages:
        lines = [line.strip() for line in page_text.splitlines() if line.strip()]

        if english_key:
            for line_index, line in enumerate(lines[:16]):
                if english_key not in normalized(line):
                    continue
                raw_key = line.casefold().replace("’", "'").replace("‘", "'")
                english_raw_key = english.casefold().replace("’", "'").replace("‘", "'")
                raw_position = raw_key.find(english_raw_key)
                same_line_prefix = line[:raw_position].strip(" :-—") if raw_position >= 0 else ""
                if same_line_prefix and CHINESE.search(same_line_prefix):
                    candidates.append({"display": same_line_prefix, "page": page_number, "file": filename, "method": "official-english-id"})
                    continue
                if normalized(line) != english_key:
                    continue
                preceding_title = next((
                    lines[index]
                    for index in range(line_index - 1, -1, -1)
                    if CHINESE.search(lines[index]) and not re.search(r"[A-Za-z]", lines[index])
                ), "")
                if preceding_title:
                    candidates.append({"display": preceding_title, "page": page_number, "file": filename, "method": "official-english-id"})

        for name in known_names:
            for line in lines[:8]:
                if line == name or (line.startswith(f"{name} ") and re.search(r"[A-Za-z]", line[len(name):])):
                    candidates.append({"display": name, "page": page_number, "file": filename, "method": "faction-alias"})

    unique = sorted({candidate["display"] for candidate in candidates})
    known = [candidate for candidate in unique if candidate in known_names]
    if len(known) == 1:
        unique = known
    return [next(candidate for candidate in candidates if candidate["display"] == display) for display in unique]


def card_title_pages(card: dict, pages: list[tuple[int, str, Path]], known_names: tuple[str, ...] = ()) -> set[tuple[int, Path]]:
    """Pages whose title area identifies this card; empty/multiple means ambiguous."""
    english = str(card.get("englishName") or card.get("unit", {}).get("englishName") or "").strip()
    english_key = normalized(english) if english and not CHINESE.search(english) else ""
    name = str(card.get("name") or "").strip()
    known = [name, *known_names]
    found: set[tuple[int, Path]] = set()

    def english_hits(lines: list[str]) -> list[int]:
        return [index for index, line in enumerate(lines) if english_key and english_title_match(line, english) and TITLE_SHAPE.match(line)]

    # Strongest anchor: the English title sits next to one of this card's own
    # Chinese names (same line or the neighbouring line).
    for page_number, page_text, filename in pages:
        lines = [line.strip() for line in page_text.splitlines() if line.strip()]
        for index in english_hits(lines):
            neighbours = lines[max(0, index - 1):index + 2]
            if any(neighbour in known for neighbour in neighbours):
                found.add((page_number, filename))
                break
    if not found and english_key:
        for page_number, page_text, filename in pages:
            lines = [line.strip() for line in page_text.splitlines() if line.strip()]
            if english_hits(lines):
                found.add((page_number, filename))
    if not found and name:
        for page_number, page_text, filename in pages:
            lines = [line.strip() for line in page_text.splitlines() if line.strip()]
            for line in lines[:8]:
                if line == name or (line.startswith(f"{name} ") and re.search(r"[A-Za-z]", line[len(name):])):
                    found.add((page_number, filename))
                    break
    return found


def card_page_text(page_number: int, filename: Path, pages: list[tuple[int, str, Path]]) -> str:
    for number, page_text, candidate in pages:
        if number == page_number and candidate == filename:
            return page_text
    return ""


def weapon_rows(lines: list[str]) -> list[dict]:
    """Parse (name, kind, stats) rows from 8-column weapon tables in text-layer order."""
    rows: list[dict] = []
    section = ""
    index = 0
    while index < len(lines):
        line = lines[index]
        if line in WEAPON_SECTIONS:
            section = "ranged" if line.startswith(("射击", "远程")) else "melee"
            index += 1
            continue
        if line in WEAPON_SECTION_END:
            section = ""
            index += 1
            continue
        if not section or line == "武器名" or line in WEAPON_HEADER_CELLS:
            index += 1
            continue
        if not CHINESE.search(line) or NAME_FORBIDDEN.search(line) or len(line) > 24:
            index += 1
            continue
        cells = lines[index:index + 8]
        if len(cells) < 8:
            break
        name, rng, attacks, skill, strength, ap, damage = cells[:7]
        rng_n, attacks_n, skill_n = normalized_stat(rng), normalized_stat(attacks), normalized_stat(skill)
        strength_n, ap_n, damage_n = normalized_stat(strength), normalized_stat(ap), normalized_stat(damage)
        if (
            STAT_RANGE.match(rng_n) and STAT_DICE.match(attacks_n) and STAT_SKILL.match(skill_n)
            and STAT_STRENGTH.match(strength_n) and STAT_AP.match(ap_n) and STAT_DICE.match(damage_n)
        ):
            rows.append({
                "name": name.strip(),
                "kind": section,
                "range": rng_n,
                "attacks": attacks_n,
                "skill": skill_n,
                "strength": strength_n,
                "ap": ap_n,
                "damage": damage_n,
            })
            index += 8
            continue
        index += 1
    return rows


def weapon_matches(row: dict, weapon: dict) -> bool:
    weapon_type = str(weapon.get("type") or "").strip()
    if weapon_type == "ranged":
        if row["kind"] != "ranged":
            return False
        expected_range = normalized_stat(weapon.get("range"))
        if not expected_range or expected_range in {"-", "—"}:
            return False
        if row["range"] != expected_range:
            return False
    else:
        if row["kind"] != "melee":
            return False
        expected_range = normalized_stat(weapon.get("range"))
        if expected_range and expected_range not in {"近战", "近身", "格斗", "-", "—"}:
            return False
        if row["range"] not in {"近战", "近身", "格斗", "-", "—"}:
            return False
    for field, row_field in (("attacks", "attacks"), ("skill", "skill"), ("strength", "strength"), ("damage", "damage")):
        if row[row_field] != normalized_stat(weapon.get(field)):
            return False
    row_ap = row["ap"]
    weapon_ap = normalized_stat(weapon.get("ap"))
    try:
        row_ap_int, weapon_ap_int = int(row_ap), int(weapon_ap)
    except ValueError:
        return row_ap == weapon_ap
    if weapon_ap_int < 0:
        # Some PDF text layers drop the minus sign from negative AP columns.
        return row_ap_int == weapon_ap_int or row_ap_int == -weapon_ap_int
    return row_ap_int == weapon_ap_int


def card_region(card: dict, page_lines: list[str], other_identity: list[tuple[str, str]]) -> list[str]:
    """Card page region bounded by neighbouring card titles.

    Some PDF layouts place the weapon tables before the unit title line, so
    the region extends backwards to the previous card title instead of
    starting at the card's own title.
    """
    english = str(card.get("englishName") or card.get("unit", {}).get("englishName") or "").strip()
    english_key = normalized(english) if english and not CHINESE.search(english) else ""
    name = str(card.get("name") or "").strip()
    identities = [(english, name)] + [(other_english, other_name) for other_english, other_name in other_identity if other_english or other_name]
    positions = []
    for index, line in enumerate(page_lines):
        for eng_name, cn_name in identities:
            if eng_name and english_title_match(line, eng_name) and TITLE_SHAPE.match(line):
                positions.append(index)
                break
            elif cn_name and line == cn_name:
                positions.append(index)
                break
    own_positions = [index for index, line in enumerate(page_lines) if (
        (english_key and english_title_match(line, english) and TITLE_SHAPE.match(line)) or (name and line == name)
    )]
    if not own_positions:
        return []
    start = own_positions[0]
    previous = max((position for position in positions if position < start and position not in own_positions), default=-1)
    next_position = min((position for position in positions if position > start and position not in own_positions), default=len(page_lines))
    region_start = previous + 1
    return page_lines[region_start:next_position]


def clean_row_name(value: str) -> str:
    """Strip profile/mode suffixes from a PDF weapon-row name."""
    value = re.sub(r"[【\[][^】\]]*[】\]]?\s*$", "", value).strip()
    value = re.sub(r"\s*[—–-]\s*.*$", "", value).strip()
    value = re.sub(r"[—–-](标准|过热|重击|横扫|猛击|快扫|巫火|巫术|灵能)\s*$", "", value).strip()
    return value


def card_weapon_decisions(card: dict, pages: list[tuple[int, str, Path]], cards: list[dict], package: dict, source_id: str) -> tuple[list[dict], dict]:
    known_names = unit_known_names(package, str(card.get("name") or ""))
    title_pages = card_title_pages(card, pages, known_names)
    if len(title_pages) != 1:
        return [], {"reason": "ambiguous-title-pages", "pages": len(title_pages)}
    page_number, filename = title_pages.pop()
    page_text = card_page_text(page_number, filename, pages)
    page_lines = [line.strip() for line in page_text.splitlines() if line.strip()]

    def has_weapon_table(lines: list[str]) -> bool:
        return any(line in WEAPON_SECTIONS for line in lines)

    if not has_weapon_table(page_lines):
        next_page = card_page_text(page_number + 1, filename, pages)
        if next_page:
            next_lines = [line.strip() for line in next_page.splitlines() if line.strip()]
            if has_weapon_table(next_lines):
                page_lines = next_lines
                page_number += 1
    other_identity = [
        (str(other.get("englishName") or other.get("unit", {}).get("englishName") or "").strip(), str(other.get("name") or "").strip())
        for other in cards if other.get("id") != card.get("id")
    ]
    rows = weapon_rows(card_region(card, page_lines, other_identity))
    if not rows:
        return [], {"reason": "no-weapon-rows", "pages": len(title_pages)}

    by_english: dict[str, dict] = {}
    for weapon in card.get("weapons", []):
        english_name = str(weapon.get("englishName") or "").strip()
        source_name = str(weapon.get("name") or "").strip()
        if not english_name or not source_name:
            continue
        group = by_english.setdefault(english_name, {"names": set(), "matched": False, "sourceNames": set()})
        group["sourceNames"].add(source_name)
        names = {clean_row_name(row["name"]) for row in rows if weapon_matches(row, weapon)}
        if names:
            group["matched"] = True
            group["names"].update(names)

    decisions: list[dict] = []
    stats = {"weaponEntries": len(card.get("weapons", [])), "unmatched": 0, "ambiguous": 0, "partial": 0}
    for english_name, group in sorted(by_english.items()):
        if not group["matched"] or not group["names"]:
            stats["unmatched"] += 1
            continue
        if len(group["names"]) != 1 or len(group["sourceNames"]) != 1:
            stats["ambiguous"] += 1
            continue
        pdf_name = clean_row_name(next(iter(group["names"])))
        source_name = next(iter(group["sourceNames"]))
        if not pdf_name or pdf_name == source_name:
            continue
        if (
            source_name in GENERIC_WEAPON_NAMES
            or pdf_name in GENERIC_WEAPON_NAMES
            or pdf_name in MODE_NAMES
            or pdf_name in FRAGMENT_NAMES
            or len(source_name) < 2
            or len(pdf_name) < 2
            or re.search(r"\d", pdf_name)
            or pdf_name.startswith("反")
        ):
            continue
        evidence_path = filename.relative_to(ROOT).as_posix()
        decisions.append({
            "cardId": card.get("id"),
            "englishName": english_name,
            "sourceName": source_name,
            "display": pdf_name,
            "aliases": [source_name],
            "sourceId": source_id,
            "evidence": f"{evidence_path}#page={page_number}",
            "rawExtractVerified": True,
            "adjudicatedBy": "pdf-weapon-table+stat-anchor",
        })
    return decisions, stats


def merge_preserved_aliases(existing_ledger: dict, faction_id: str, decisions: list[dict]) -> list[dict]:
    preserved: dict[tuple[str, str], list[str]] = {}
    for entry in existing_ledger.get("weapons", {}).get(faction_id, []):
        key = (entry.get("cardId"), entry.get("englishName"))
        preserved.setdefault(key, [])
        for alias in entry.get("aliases", []):
            if alias not in preserved[key]:
                preserved[key].append(alias)
    merged = []
    for decision in decisions:
        key = (decision.get("cardId"), decision.get("englishName"))
        for alias in preserved.get(key, []):
            if alias not in decision["aliases"]:
                decision["aliases"].append(alias)
        merged.append(decision)
    return merged


def build_ledger() -> dict:
    decisions: dict[str, list[dict]] = {}
    ability_decisions: dict[str, list[dict]] = {}
    weapon_decisions: dict[str, list[dict]] = {}
    coverage: dict[str, dict] = {}
    ambiguities: list[str] = []

    for package_path in sorted((ROOT / "data" / "factions").glob("*/package.json")):
        package = read_json(package_path)
        faction_id = package["definition"]["id"]
        source_catalog = package.get("definition", {}).get("data", {}).get("catalog", "")
        catalog_path = ROOT / "docs" / source_catalog
        pdf_source = next((
            source for source in package.get("sources", [])
            if source.get("kind") == "pdf-extract" and source.get("evidencePath")
        ), None)
        if not catalog_path.exists() or not pdf_source:
            continue

        evidence_directory = ROOT / pdf_source["evidencePath"]
        pages = evidence_pages(evidence_directory)
        catalog = read_json(catalog_path)
        current_name_owners = {
            card.get("name"): card.get("id")
            for card in catalog.get("cards", [])
            if card.get("name")
        }
        aliases_by_canonical = unit_aliases_by_canonical(package)
        matched = 0
        changed = 0
        faction_decisions: list[dict] = []
        faction_weapon_decisions: list[dict] = []
        weapon_coverage = {"decisions": 0, "unmatched": 0, "ambiguous": 0, "skippedCards": 0}

        for card in catalog.get("cards", []):
            candidates = title_candidates(card, pages, aliases_by_canonical.get(card.get("name"), []))
            if len(candidates) > 1:
                ambiguities.append(
                    f"{faction_id}/{card.get('id')}: "
                    + ", ".join(candidate["display"] for candidate in candidates)
                )
                continue
            if not candidates:
                continue
            candidate = candidates[0]
            current = str(card.get("name") or "")
            if (
                candidate["method"] == "faction-alias"
                and current_name_owners.get(candidate["display"]) not in {None, card.get("id")}
            ):
                # A legacy alias may itself be another live card's canonical
                # name. It cannot identify this card without an English-title
                # match (for example Battlewagon vs Deff Rolla Battle Fortress).
                continue
            matched += 1
            if candidate["display"] == current:
                continue
            changed += 1
            evidence_path = candidate["file"].relative_to(ROOT).as_posix()
            faction_decisions.append({
                "cardId": card.get("id"),
                "englishName": card.get("englishName") or card.get("unit", {}).get("englishName") or "",
                "display": candidate["display"],
                "aliases": [current],
                "sourceId": pdf_source.get("id", "pdf-extract"),
                "evidence": f"{evidence_path}#page={candidate['page']}",
                "adjudicatedBy": f"pdf-title+{candidate['method']}",
            })

        # Weapon-name extraction is anchored by stat signatures and the card
        # title area, independent of the unit display-name decisions above.
        for card in catalog.get("cards", []):
            if not card.get("weapons"):
                continue
            extracted_decisions, stats = card_weapon_decisions(
                card, pages, catalog.get("cards", []), package, pdf_source.get("id", "pdf-extract")
            )
            faction_weapon_decisions.extend(extracted_decisions)
            weapon_coverage["decisions"] += len(extracted_decisions)
            weapon_coverage["unmatched"] += stats.get("unmatched", 0)
            weapon_coverage["ambiguous"] += stats.get("ambiguous", 0)
            if stats.get("reason"):
                weapon_coverage["skippedCards"] += 1

        decisions[faction_id] = sorted(faction_decisions, key=lambda entry: entry["cardId"] or "")
        resulting_names = [
            next((entry["display"] for entry in faction_decisions if entry["cardId"] == card.get("id")), card.get("name"))
            for card in catalog.get("cards", [])
        ]
        duplicate_names = sorted({name for name in resulting_names if name and resulting_names.count(name) > 1})
        if duplicate_names:
            raise RuntimeError(f"{faction_id}: PDF decisions create duplicate unit names: {', '.join(duplicate_names)}")
        ability_decisions[faction_id] = ability_comparisons(
            faction_id,
            evidence_directory,
            pdf_source.get("id", "pdf-extract"),
        )
        weapon_decisions[faction_id] = sorted(faction_weapon_decisions, key=lambda entry: (
            entry["cardId"] or "", entry["englishName"], entry["display"]
        ))
        coverage[faction_id] = {
            "catalogCards": len(catalog.get("cards", [])),
            "matchedPdfTitles": matched,
            "differentDisplayNames": changed,
            "fallbackToLowerPrioritySource": len(catalog.get("cards", [])) - matched,
            "weaponDecisions": weapon_coverage["decisions"],
            "weaponEntriesUnmatched": weapon_coverage["unmatched"],
            "weaponEntriesAmbiguous": weapon_coverage["ambiguous"],
            "weaponCardsSkipped": weapon_coverage["skippedCards"],
        }

    if ambiguities:
        raise RuntimeError("Ambiguous PDF title candidates:\n- " + "\n- ".join(ambiguities))

    return {
        "schemaVersion": 1,
        "policy": "11e-zh-pdf > 10e-zh-pdf > backend-zh-hant; unmatched cards retain the lower-priority source name",
        "units": decisions,
        "abilities": ability_decisions,
        "weapons": weapon_decisions,
        "coverage": coverage,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, help="write the accepted candidate ledger to this path")
    args = parser.parse_args()
    payload = build_ledger()
    if args.output:
        output = args.output if args.output.is_absolute() else ROOT / args.output
        if output.exists():
            existing = read_json(output)
            for faction_id in payload["weapons"]:
                payload["weapons"][faction_id] = merge_preserved_aliases(
                    existing, faction_id, payload["weapons"][faction_id]
                )
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        display_path = output.relative_to(ROOT) if output.is_relative_to(ROOT) else output
        print(f"PDF display-name ledger written: {display_path}")
    else:
        print(json.dumps(payload, ensure_ascii=False, indent=2), end="")


if __name__ == "__main__":
    main()
