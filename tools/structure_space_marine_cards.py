"""Convert the digital Space Marine PDF tables into calculator-ready JSON.

The source PDF has a clean text/table layer, unlike the scanned Custodes PDF.
This extractor keeps the existing card index and adds conservative structured
stats plus weapon rows.  Any non-numeric dynamic profile remains visible but
is deliberately omitted from automated dice input until a player edits it.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data"
CARD_NAME_OVERRIDES = {47: "罗伯特·基里曼"}


def find_file(pattern: str) -> Path:
    matches = list(DATA.rglob(pattern))
    if not matches:
        raise FileNotFoundError(pattern)
    return matches[0]


def text(value: object) -> str:
    return re.sub(r"\s+", " ", str(value or "").replace("\n", " ")).strip()


def compact(value: object) -> str:
    return re.sub(r"\s+", "", text(value))


def header_token(value: str) -> str:
    """Drop page/table fragments prefixed to PDF table headers (for example 1/AP)."""
    return re.sub(r"^(?:\d+/?)+", "", value)


def first_number(value: object, fallback: int = 0) -> int:
    match = re.search(r"\d+", text(value))
    return int(match.group()) if match else fallback


def last_number(value: object, fallback: int = 0) -> int:
    matches = re.findall(r"-?\d+", str(value or "").replace("−", "-"))
    return int(matches[-1]) if matches else fallback


def dice_expression(value: object) -> str:
    raw = str(value or "").lower().replace("Ｄ", "d").replace("＋", "+").replace("－", "-")
    raw = raw.replace("Ｄ", "d").replace("＋", "+").replace("－", "-")
    matches = re.findall(r"(?:\d*)d\d+(?:[+-]\d+)?|\d+", raw)
    return matches[-1] if matches else ""


def weapon_skill(value: object) -> str:
    raw = str(value or "")
    if re.search(r"自动命中|torrent", raw, re.I):
        return "torrent"
    matches = re.findall(r"\d+\+", raw)
    return matches[-1] if matches else text(value)


def column_index(row: list[object], predicate) -> int | None:
    for index, value in enumerate(row):
        if predicate(compact(value)):
            return index
    return None


def cells(row: list[object]) -> list[str]:
    return [text(cell) for cell in row]


def table_stats(table: list[list[object]]) -> tuple[dict, str]:
    for index, row in enumerate(table[:-1]):
        normalized = [compact(cell) for cell in row]
        positions = {
            "movement": column_index(row, lambda value: value == "M"),
            "toughness": column_index(row, lambda value: value == "T"),
            "save": column_index(row, lambda value: value == "SV" or value.startswith("SV/")),
            "woundsPerModel": column_index(row, lambda value: value == "W"),
            "leadership": column_index(row, lambda value: value == "LD"),
            "objectiveControl": column_index(row, lambda value: value == "OC"),
        }
        if any(positions[key] is None for key in ("movement", "toughness", "save", "woundsPerModel")):
            continue
        next_row = table[index + 1]

        def value_at(key: str, fallback: str = "") -> object:
            """PDF table cells sometimes put every stat value one column right."""
            position = positions[key]
            if position is None:
                return fallback
            for candidate in next_row[position : position + 4]:
                if text(candidate):
                    return candidate
            return fallback

        save_text = text(value_at("save"))
        save_values = [int(value) for value in re.findall(r"\d+", save_text)]
        unit = {
            "movement": first_number(value_at("movement"), 0),
            "toughness": first_number(value_at("toughness"), 0),
            "save": save_values[0] if save_values else 7,
            "woundsPerModel": first_number(value_at("woundsPerModel"), 1),
            "leadership": text(value_at("leadership")) or "7+",
            "objectiveControl": first_number(value_at("objectiveControl"), 0),
        }
        ability_text = ""
        for later in table[index + 2:]:
            content = " ".join(cells(later))
            if "射击武器" in content or "近战武器" in content:
                break
            if "技能" in content:
                ability_text = re.sub(r"^.*?技能\s*", "", content).strip()
                break
        invulnerable = re.search(r"(\d)\+\s*特殊保护", ability_text)
        unit["invulnerableSave"] = (
            int(invulnerable.group(1)) if invulnerable else (save_values[1] if len(save_values) > 1 else 0)
        )
        return unit, ability_text
    return {}, ""


def parse_weapon_rows(table: list[list[object]]) -> list[dict]:
    weapons: list[dict] = []
    current_type: str | None = None
    columns: dict[str, int] = {}
    profile_base = ""
    for row in table:
        row_text = " ".join(cells(row))
        # Rules text can mention “军表构成”; only a standalone table-section
        # header marks the end of the weapon table.
        section_cells = [compact(cell) for cell in row]
        if any(re.fullmatch(r"(?:[\d战群]*)军表构成", cell) for cell in section_cells) or any(
            re.fullmatch(r"(?:[\d战群]*)阵营构成", cell) for cell in section_cells
        ):
            break
        if "射击武器" in row_text:
            current_type = "ranged"
            columns = {}
            profile_base = ""
            continue
        if "近战武器" in row_text:
            current_type = "melee"
            columns = {}
            profile_base = ""
            continue
        if not current_type:
            continue
        if "武器名" in row_text and ("攻击范围" in row_text or "攻击范围".replace(" ", "") in row_text):
            columns = {
                "name": column_index(row, lambda value: header_token(value) == "武器名"),
                "attacks": column_index(row, lambda value: header_token(value) == "A"),
                "skill": column_index(row, lambda value: header_token(value) in {"BS", "WS"}),
                "strength": column_index(row, lambda value: header_token(value) == "S" or (header_token(value).endswith("S") and header_token(value) not in {"BS", "WS"})),
                "ap": column_index(row, lambda value: header_token(value) == "AP"),
                "damage": column_index(row, lambda value: header_token(value) == "D"),
                "abilities": column_index(row, lambda value: "武器技能" in header_token(value)),
            }
            if any(value is None for value in columns.values()):
                columns = {}
            continue
        if not columns:
            continue
        name = text(row[columns["name"]])
        is_choice_row = "选择以下属性" in row_text or "选择以下" in row_text
        # Wide vehicle tables place a profile heading/option one cell to the
        # right of the regular weapon-name column.
        if not name and (profile_base or is_choice_row):
            name = next((text(cell) for cell in row if text(cell)), "")
        attacks = dice_expression(row[columns["attacks"]])
        skill = text(row[columns["skill"]])
        strength = last_number(row[columns["strength"]], 0)
        ap_raw = row[columns["ap"]]
        damage = dice_expression(row[columns["damage"]])
        abilities_raw = text(row[columns["abilities"]])
        # Profile rows in a few wide vehicle tables are shifted one cell to
        # the right compared with the header.  Prefer that aligned set when
        # the ordinary columns cannot form a complete weapon profile.
        if profile_base and (not attacks or not damage or not strength):
            shifted = {key: columns[key] + 1 for key in ("attacks", "skill", "strength", "ap", "damage", "abilities")}
            shifted_attacks = dice_expression(row[shifted["attacks"]])
            shifted_strength = last_number(row[shifted["strength"]], 0)
            shifted_damage = dice_expression(row[shifted["damage"]])
            if shifted_attacks and shifted_strength and shifted_damage:
                attacks = shifted_attacks
                skill = text(row[shifted["skill"]])
                strength = shifted_strength
                ap_raw = row[shifted["ap"]]
                damage = shifted_damage
                abilities_raw = text(row[shifted["abilities"]])
        if not name:
            continue
        if not attacks or not damage or not strength:
            if is_choice_row:
                profile_base = name
            continue
        choice = bool(profile_base and name != profile_base)
        option_name = name.strip("（）()")
        weapon_name = f"{profile_base}（{option_name}）" if choice else name
        ability_parts = [part.strip() for part in re.split(r"[、；;]", abilities_raw) if part.strip() and not part.strip().isdigit()]
        weapons.append({
            "name": weapon_name,
            **({"selectionGroup": profile_base} if choice else {}),
            "type": current_type,
            "attacks": attacks,
            "skill": weapon_skill(skill),
            "strength": strength,
            "ap": last_number(ap_raw, 0),
            "damage": damage,
            "abilities": ability_parts,
        })
        if not choice:
            profile_base = ""
    return weapons


def composition_details(tables: list[list[list[object]]]) -> tuple[int, str]:
    for table in tables:
      for row in table:
        content = " ".join(cells(row))
        if "单位构成" not in content and "单位装备" not in content:
            continue
        if "单位构成" in content:
            content = re.split(r"整个单位|可以消耗|可消耗|可以增加|可增加|最多", content, maxsplit=1)[0]
            numbers = re.findall(r"(\d+|[一二三四五六七八九十]+)\s*(?:名|个)", content)
            values = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10}
            total = sum(int(value) if value.isdigit() else values.get(value, 0) for value in numbers)
            return max(1, total), ""
    return 1, ""


def equipment_text(tables: list[list[list[object]]]) -> str:
    for table in tables:
      for row in table:
        content = " ".join(cells(row))
        match = re.search(r"单位装备\s*(.+)", content)
        if match:
            return match.group(1).strip()
    return ""


def assign_parenthetical_selection_groups(weapons: list[dict]) -> None:
    """Profiles named like “公理（猛击）/公理（横扫）” are alternatives, not extra attacks."""
    grouped: dict[tuple[str, str], list[dict]] = {}
    for weapon in weapons:
        match = re.match(r"^(.+?)[（(][^）)]+[）)]$", weapon.get("name", ""))
        if match:
            grouped.setdefault((weapon.get("type", ""), match.group(1).strip()), []).append(weapon)
    for (_, base), profiles in grouped.items():
        if len(profiles) > 1:
            for weapon in profiles:
                weapon["selectionGroup"] = base


def main() -> None:
    catalog = find_file("星际战士-全部数据卡.json")
    pdf_path = find_file("星际战士11版中文1.0.pdf")
    payload = json.loads(catalog.read_text(encoding="utf-8"))
    structured = 0
    skipped: list[int] = []
    with pdfplumber.open(pdf_path) as pdf:
        for card in payload.get("cards", []):
            card.pop("unit", None)
            card.pop("weapons", None)
            card.pop("verification", None)
            page_number = card.get("page")
            if not isinstance(page_number, int) or page_number < 1 or page_number > len(pdf.pages):
                continue
            tables = pdf.pages[page_number - 1].extract_tables()
            if not tables:
                skipped.append(page_number)
                continue
            table = max(tables, key=lambda item: len(item) * max((len(row) for row in item), default=0))
            unit, abilities = table_stats(table)
            weapons = parse_weapon_rows(table)
            # Transport and fortification cards can have no weapons, and some
            # aircraft intentionally use “-” for M.  They are still valid
            # defensive targets, so only T and W are mandatory.
            if not unit or any(unit.get(key, 0) <= 0 for key in ("toughness", "woundsPerModel")):
                skipped.append(page_number)
                continue
            card["name"] = CARD_NAME_OVERRIDES.get(page_number, card["name"])
            models, _ = composition_details(tables)
            unit.update({
                "name": card["name"],
                "models": models,
                "abilities": abilities,
                "activeAbilities": "",
                "defaultEquipment": equipment_text(tables),
            })
            card["unit"] = unit
            assign_parenthetical_selection_groups(weapons)
            card["weapons"] = weapons
            card["verification"] = "由数字版 PDF 表格提取；动态数值或条件性规则需在计算器中确认。"
            structured += 1
    catalog.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"structured": structured, "skippedPages": skipped}, ensure_ascii=False))


if __name__ == "__main__":
    main()
