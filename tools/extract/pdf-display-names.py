"""Extract reviewable PDF unit-title decisions using stable English identities.

The extractor only accepts a title when it can tie the PDF page to a current
card through its official English name or through an existing faction-scoped
alias that occurs in the page title area. Ambiguous candidates fail instead of
being guessed. The output is an authored build input; rerunning this script is
an audit/review operation, not part of the browser runtime.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CHINESE = re.compile(r"[\u4e00-\u9fff]")
PAGE_SPLIT = re.compile(r"^=====\s*第\s*(\d+)\s*页\s*=====\s*$", re.MULTILINE)


def read_json(filename: Path) -> dict:
    return json.loads(filename.read_text(encoding="utf-8-sig"))


def normalized(value: str) -> str:
    return re.sub(r"[\s\u00a0]+", "", value).casefold().replace("’", "'").replace("‘", "'").replace("＇", "'")


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


def build_ledger() -> dict:
    decisions: dict[str, list[dict]] = {}
    ability_decisions: dict[str, list[dict]] = {}
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
        coverage[faction_id] = {
            "catalogCards": len(catalog.get("cards", [])),
            "matchedPdfTitles": matched,
            "differentDisplayNames": changed,
            "fallbackToLowerPrioritySource": len(catalog.get("cards", [])) - matched,
        }

    if ambiguities:
        raise RuntimeError("Ambiguous PDF title candidates:\n- " + "\n- ".join(ambiguities))

    return {
        "schemaVersion": 1,
        "policy": "11e-zh-pdf > 10e-zh-pdf > backend-zh-hant; unmatched cards retain the lower-priority source name",
        "units": decisions,
        "abilities": ability_decisions,
        "coverage": coverage,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, help="write the accepted candidate ledger to this path")
    args = parser.parse_args()
    payload = json.dumps(build_ledger(), ensure_ascii=False, indent=2) + "\n"
    if args.output:
        output = args.output if args.output.is_absolute() else ROOT / args.output
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(payload, encoding="utf-8")
        print(f"PDF display-name ledger written: {output.relative_to(ROOT)}")
    else:
        print(payload, end="")


if __name__ == "__main__":
    main()
