"""Create page-bound Markdown indexes from the bundled Warhammer PDFs.

The output preserves page boundaries and table cells.  It is intentionally an
index for retrieval, not an authority for automatic numeric calculation.
"""

from pathlib import Path
import re

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data"


def clean(value):
    if value is None:
        return ""
    value = str(value).replace("|", "\\|")
    value = re.sub(r"\s*\n\s*", "<br>", value).strip()
    return value


def table_markdown(table):
    width = max((len(row) for row in table), default=0)
    rows = [[clean(cell) for cell in row] + [""] * (width - len(row)) for row in table]
    if not rows:
        return ""
    header = rows[0]
    return "\n".join([
        "| " + " | ".join(header) + " |",
        "| " + " | ".join(["---"] * width) + " |",
        *["| " + " | ".join(row) + " |" for row in rows[1:]],
    ])


def page_title(page, number):
    text = (page.extract_text() or "").strip()
    first = text.splitlines()[0].strip() if text else ""
    return first[:100] or f"第 {number} 页"


def write_index(source, output, pages, label):
    output.parent.mkdir(parents=True, exist_ok=True)
    blocks = [
        f"# {label}",
        "",
        f"来源：`{source.relative_to(DATA).as_posix()}`。",
        "",
        "> 此文件按原 PDF 页与表格单元格保存，用于检索和人工核对。数据卡数值在进入计算前仍应与原页或结构化 JSON 核对。",
        "",
    ]
    with pdfplumber.open(source) as pdf:
        for number in pages:
            page = pdf.pages[number - 1]
            blocks.extend([f"## 第 {number} 页：{page_title(page, number)}", ""])
            tables = page.extract_tables()
            if tables:
                for index, table in enumerate(tables, 1):
                    blocks.extend([f"### 表 {index}", "", table_markdown(table), ""])
            else:
                text = (page.extract_text() or "").strip()
                if text:
                    blocks.extend([text, ""])
                else:
                    blocks.extend(["> 该页为扫描图像；见同目录的 OCR 索引或原 PDF。", ""])
    output.write_text("\n".join(blocks), encoding="utf-8")


def find_pdf(folder, token):
    return next(path for path in (DATA / folder).glob("*.pdf") if token in path.name)


def main():
    core = find_pdf("规则书", "核心规则")
    quick = find_pdf("规则书", "分遣队速查")
    marines = find_pdf("星际战士", "星际战士")
    write_index(core, DATA / "规则书" / "核心规则-可检索.md", range(1, 89), "核心规则：逐页检索索引")
    write_index(quick, DATA / "规则书" / "分遣队速查-可检索.md", range(1, 11), "分遣队速查：逐页检索索引")
    write_index(marines, DATA / "星际战士" / "分遣队规则-可检索.md", range(1, 22), "星际战士：分遣队规则索引")
    write_index(marines, DATA / "星际战士" / "数据卡-可检索.md", range(22, 151), "星际战士：数据卡索引")


if __name__ == "__main__":
    main()
