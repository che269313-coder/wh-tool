"""Extract the Death Guard PDF into retrieval Markdown and calculator JSON.

The source is a digital PDF whose datasheet tables can span two pages.  This
extractor keeps page boundaries in Markdown, while the JSON parser carries the
weapon/metadata section across continuation pages before writing one card per
unit.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "死亡守卫"
PDF = next(DATA.glob("*.pdf"))
SOURCE_NAME = PDF.name


def text(value: object) -> str:
    if value is None:
        return ""
    value = str(value).replace("\r", "").strip()
    value = re.sub(r"[ \t]+", " ", value)
    return value


def cell_text(value: object) -> str:
    return text(value).replace("\n", " ")


def cells(row: list[object]) -> list[str]:
    return [text(value) for value in row]


def clean_bullets(value: str) -> str:
    return value.replace("\uf075", "⚫").replace("\uf06c", "▪")


def normalize_spaces(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def is_stat_header(row: list[object]) -> bool:
    values = {cell_text(value) for value in row}
    return {"M", "T", "SV/ISV", "W", "LD", "OC"}.issubset(values)


def first_nonempty(row: list[object]) -> str:
    return next((text(value) for value in row if text(value)), "")


def split_name(raw: str) -> tuple[str, str]:
    raw = normalize_spaces(raw.replace("\n", " "))
    match = re.search(r"[A-Za-z]", raw)
    if not match:
        return raw, ""
    return raw[: match.start()].strip(" -"), raw[match.start() :].strip()


def number(value: str, default: int = 0) -> int:
    match = re.search(r"\d+", value or "")
    return int(match.group()) if match else default


def parse_save(value: str) -> tuple[int, int]:
    saves = re.findall(r"(\d+)\+", value or "")
    return (int(saves[0]) if saves else 7, int(saves[1]) if len(saves) > 1 else 0)


def expression(value: str, default: str = "1") -> str:
    value = normalize_spaces(value)
    if not value or value in {"-", "—"}:
        return default
    return value


def split_abilities(value: str) -> list[str]:
    value = clean_bullets(normalize_spaces(value))
    return [part.strip() for part in re.split(r"[，,、;；]", value) if part.strip()]


def parse_weapon_name(raw: str) -> tuple[str, str | None]:
    raw = normalize_spaces(raw.replace("\n", " "))
    raw = re.sub(r"(?<=[\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])", "", raw)
    variants = ("普通模式", "过载模式", "重击", "横扫", "标准模式", "超载模式")
    for variant in variants:
        match = re.match(rf"^(.+?)(?:\s*[-·]\s*|\s+){re.escape(variant)}$", raw)
        if match:
            base = match.group(1).strip()
            return f"{base}（{variant}）", base
        match = re.match(rf"^(.+?){re.escape(variant)}$", raw)
        if match:
            base = match.group(1).strip(" -·")
            return f"{base}（{variant}）", base
    return raw, None


def parse_models(composition: str) -> int:
    lower = composition.replace("一", "1").replace("二", "2").replace("三", "3").replace("四", "4").replace("五", "5").replace("六", "6").replace("七", "7").replace("八", "8").replace("九", "9")
    matches = re.findall(r"(\d+)(?:\s*-\s*(\d+))?\s*(?:个|台|名)", lower)
    if not matches:
        return 1
    return max(1, sum(int(low) for low, _ in matches))


def rows_for_pages(pdf, start: int, end: int) -> list[list[str]]:
    rows: list[list[str]] = []
    for page_number in range(start, end + 1):
        for table in pdf.pages[page_number - 1].extract_tables() or []:
            rows.extend(cells(row) for row in table)
    return rows


def page_starts(pdf) -> list[int]:
    starts: list[int] = []
    for page_number in range(23, 63):
        tables = pdf.pages[page_number - 1].extract_tables() or []
        if any(is_stat_header(row) for table in tables for row in table[:6]):
            starts.append(page_number)
    return starts


def find_stats(rows: list[list[str]]) -> tuple[dict, int]:
    for index, row in enumerate(rows[:-1]):
        if not is_stat_header(row):
            continue
        positions = {key: row.index(key) for key in ("M", "T", "SV/ISV", "W", "LD", "OC")}
        values = rows[index + 1]
        value_at = lambda key: values[positions[key]] if positions[key] < len(values) else ""
        save, invulnerable = parse_save(value_at("SV/ISV"))
        movement_raw = value_at("M")
        movement = number(movement_raw, 0) if movement_raw not in {"-", "—"} else 0
        unit = {
            "movement": movement,
            "toughness": number(value_at("T")),
            "save": save,
            "invulnerableSave": invulnerable,
            "woundsPerModel": number(value_at("W"), 1),
            "leadership": value_at("LD") or "7+",
            "objectiveControl": number(value_at("OC")),
        }
        return unit, index
    raise ValueError("datasheet stat header not found")


def find_label_value(rows: list[list[str]], label: str) -> str:
    for row in rows:
        for index, value in enumerate(row):
            if value.strip() == label:
                rest = [part for part in row[index + 1 :] if part.strip()]
                return normalize_spaces(" ".join(rest))
    return ""


def find_abilities(rows: list[list[str]]) -> str:
    for row in rows:
        if row and row[0].strip() == "技能":
            return clean_bullets(normalize_spaces(" ".join(part for part in row[1:] if part.strip())))
    return ""


def parse_weapons(rows: list[list[str]]) -> list[dict]:
    weapons: list[dict] = []
    section: str | None = None
    columns: dict[str, int] = {}
    for row in rows:
        first = row[0].strip() if row else ""
        if first in {"射击武器", "射击武器 ", "远程武器"}:
            section, columns = "ranged", {}
            continue
        if first in {"近战武器", "近战武器 "}:
            section, columns = "melee", {}
            continue
        if first in {"军表构成", "升级选项", "关键词", "阵营关键词", "单位构成", "单位装备", "技能"}:
            section, columns = None, {}
            continue
        if not section:
            continue
        compact = [cell.strip() for cell in row]
        if "武器名" in compact and "A" in compact and ("BS" in compact or "WS" in compact):
            columns = {key: compact.index(value) for key, value in (("name", "武器名"), ("attacks", "A"), ("skill", "BS" if "BS" in compact else "WS"), ("strength", "S"), ("ap", "AP"), ("damage", "D"), ("abilities", "武器技能"))}
            continue
        if not columns or not row[columns["name"]].strip():
            continue
        if max(columns.values()) >= len(row) and len(row) >= 8:
            # A page break can drop the empty separator column used by the
            # previous table's header (for example Mortarion's melee table).
            columns = {"name": 0, "attacks": 2, "skill": 3, "strength": 4, "ap": 5, "damage": 6, "abilities": 7}
        try:
            raw_name = row[columns["name"]]
            raw_skill = row[columns["skill"]]
            raw_abilities = row[columns["abilities"]]
        except IndexError:
            continue
        attacks = expression(row[columns["attacks"]])
        damage = expression(row[columns["damage"]])
        strength = number(row[columns["strength"]])
        if not attacks or not strength:
            continue
        name, selection_group = parse_weapon_name(raw_name)
        abilities = split_abilities(raw_abilities)
        skill = normalize_spaces(raw_skill)
        if skill.upper() in {"N/A", "NA", "-"} and re.search(r"洪流|喷射|torrent", raw_abilities, re.I):
            skill = "torrent"
        if not skill:
            continue
        ap_match = re.search(r"-?\d+", row[columns["ap"]].replace("−", "-"))
        weapons.append({
            "name": name,
            **({"selectionGroup": selection_group} if selection_group else {}),
            "type": section,
            "attacks": attacks,
            "skill": skill,
            "strength": strength,
            "ap": int(ap_match.group()) if ap_match else 0,
            "damage": damage,
            "abilities": abilities,
        })
    return weapons


def table_markdown(table: list[list[object]]) -> str:
    width = max((len(row) for row in table), default=0)
    rows = [[cell_text(cell).replace("|", "\\|") for cell in row] + [""] * (width - len(row)) for row in table]
    if not rows:
        return ""
    return "\n".join(["| " + " | ".join(rows[0]) + " |", "| " + " | ".join(["---"] * width) + " |", *["| " + " | ".join(row) + " |" for row in rows[1:]]])


def write_index(pdf, output: Path, pages: range, title: str) -> None:
    blocks = [f"# {title}", "", f"来源：`{SOURCE_NAME}`。", "", "> 此文件按 PDF 页码和表格单元格保留，供检索和人工核对；计算数值以结构化 JSON 为准。", ""]
    for page_number in pages:
        page = pdf.pages[page_number - 1]
        blocks.extend([f"## 第 {page_number} 页", ""])
        for table_index, table in enumerate(page.extract_tables() or [], 1):
            blocks.extend([f"### 表 {table_index}", "", table_markdown(table), ""])
        if not page.extract_tables():
            blocks.extend([(page.extract_text() or "").strip(), ""])
    output.write_text("\n".join(blocks), encoding="utf-8")


def extract_cards(pdf, starts: list[int]) -> list[dict]:
    cards: list[dict] = []
    for index, start in enumerate(starts):
        end = starts[index + 1] - 1 if index + 1 < len(starts) else 62
        rows = rows_for_pages(pdf, start, end)
        unit, _ = find_stats(rows)
        title = rows[0][0] if rows and rows[0] else ""
        name, english_name = split_name(title)
        composition = find_label_value(rows, "单位构成")
        equipment = find_label_value(rows, "单位装备")
        keywords = find_label_value(rows, "关键词")
        ability_text = find_abilities(rows)
        card = {
            "page": start,
            "name": name,
            "englishName": english_name,
            "source": {"file": SOURCE_NAME, "page": start, "extraction": "visual-table-check"},
            "markdownSection": f"死亡守卫-数据卡-可检索.md#第-{start}-页",
            "extraction": {"rawText": ability_text, "confidence": "high", "needsReview": False},
            "unit": {
                **unit,
                "name": name,
                "models": parse_models(composition),
                "abilities": ability_text,
                "activeAbilities": "",
                "defaultEquipment": equipment,
            },
            "composition": {"text": composition},
            "keywords": [part.strip() for part in re.split(r"[，,、]", keywords) if part.strip()],
            "weapons": parse_weapons(rows),
            "wargearOptions": [{"text": find_label_value(rows, "升级选项")}] if find_label_value(rows, "升级选项") else [],
            "verification": "由数字版 PDF 表格提取并抽样人工核对；动态数值或条件性规则需在计算器中确认。",
        }
        cards.append(card)
    return cards


def main() -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    with pdfplumber.open(PDF) as pdf:
        starts = page_starts(pdf)
        write_index(pdf, DATA / "死亡守卫-分遣队规则-可检索.md", range(2, 23), "死亡守卫：分遣队规则索引")
        write_index(pdf, DATA / "死亡守卫-数据卡-可检索.md", range(23, 63), "死亡守卫：数据卡索引")
        write_index(pdf, DATA / "死亡守卫-分数表-可检索.md", range(63, 64), "死亡守卫：分数表索引")
        cards = extract_cards(pdf, starts)
    output = {
        "faction": "死亡守卫",
        "kind": "datasheet-profiles",
        "schemaVersion": 1,
        "source": {"file": SOURCE_NAME, "version": "v1.0.7.1", "language": "简体中文"},
        "description": "死亡守卫数据卡，按原 PDF 页码整理；技能原文保留在 unit.abilities，武器数值用于规则计算。",
        "cards": cards,
    }
    (DATA / "死亡守卫-全部数据卡.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"cards": len(cards), "pages": starts}, ensure_ascii=False))


if __name__ == "__main__":
    main()
