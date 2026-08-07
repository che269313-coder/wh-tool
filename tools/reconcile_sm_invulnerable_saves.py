"""
Reconcile space marine datasheet invulnerable saves from the PDF text layer.

Root cause of the Lysander bug: the extracted abilities text lost the base
"特殊保护：本模型拥有4+特殊保护" line, so the invulnerable-save parser
matched the first "X+特殊保护" occurrence (金刚不破's 2+) and wrote 2.

This script restores the unconditional "特殊保护：本模型拥有X+特殊保护"
line (PDF wording) into unit.abilities and unit.invulnerableSave.
Conditional saves (风暴盾 / 折射力场 / 对抗近战攻击时) are left untouched.
"""
import json
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

import fitz

ROOT = r"C:\Users\che26\Desktop\wh-tool"
PDF = r"C:\Users\che26\Desktop\wh-tool-pdfs\星际战士\星际战士11版中文1.0.pdf"
JSON_PATH = ROOT + r"\docs\data\星际战士\星际战士-全部数据卡.json"

WATERMARK = re.compile(r"老湿腐战锤群\s*\d+\s*$")
UNCONDITIONAL = re.compile(r"特殊保护[：:]\s*本模型拥有([2-6])\+\s*特殊保护")
HAS_OWNING = re.compile(r"本模型拥有([2-6])\+\s*特殊保护")


def page_text(page):
    text = page.get_text()
    text = WATERMARK.sub("", text)
    return text.replace("\u3000", " ").replace("|", "")


def main():
    pdf = fitz.open(PDF)
    cards = json.load(open(JSON_PATH, encoding="utf-8"))
    changed = []
    for card in cards["cards"]:
        page_no = card.get("page")
        unit = card.get("unit")
        if not isinstance(page_no, int) or not unit or page_no < 47:
            continue
        if page_no > pdf.page_count:
            continue
        text = page_text(pdf[page_no - 1])
        match = UNCONDITIONAL.search(text)
        if not match:
            continue
        save_value = int(match.group(1))
        abilities = unit.get("abilities") or ""
        before = dict(unit)
        if not HAS_OWNING.search(abilities):
            prefix = f"特殊保护：本模型拥有{save_value}+特殊保护 ⚫ "
            unit["abilities"] = prefix + abilities.strip()
        if unit.get("invulnerableSave") != save_value:
            unit["invulnerableSave"] = save_value
        if before != unit:
            changed.append((page_no, card.get("name"), before.get("invulnerableSave"), unit.get("invulnerableSave"), unit.get("abilities", "")[:40]))

    json.dump(cards, open(JSON_PATH, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"updated {len(changed)} cards:")
    for page_no, name, old, new, head in changed:
        print(f"  p{page_no:>3} {name[:16]:<16} invuln {old} -> {new} | abilities: {head}...")


if __name__ == "__main__":
    main()
