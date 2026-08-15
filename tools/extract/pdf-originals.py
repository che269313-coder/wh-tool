import fitz, os, json, re, sys
from pathlib import Path

ROOT = str(Path(__file__).resolve().parents[2])
OUT = os.path.join(ROOT, "sources", "pdfs")

factions = {
  "world-eaters": ("吞世者", "吞世者10版中文DavidZ版1.01.pdf"),
  "leagues-of-votann": ("沃坦联盟", "沃坦联盟CODEX-双子星版 V1.02.pdf"),
  "chaos-knights": ("混沌骑士", "混沌骑士CODEX-双子星版 V1.02.pdf"),
  "adeptus-mechanicus": ("机械修会", "机械修会10版中文老湿腐版1.1.pdf"),
  "grey-knights": ("灰骑士", None),
  "thousand-sons": ("千子", "千子军团CODEX-双子星版 V1.13.pdf"),
  "emperors-children": ("帝皇之子", "帝皇之子10版中文老湿腐版1.01.pdf"),
  "agents-of-imperium": ("帝国特勤", "帝国特勤中文 (1).pdf"),
  "tyranids": ("泰伦虫族", "泰伦虫族10版中文老湿腐版1.11.pdf"),
  "imperial-knights": ("帝国骑士", "帝国骑士-C.pdf"),
  "adepta-sororitas": ("修女会", "战斗修女10版中文DavidZ版1.05.pdf"),
  "genestealer-cults": ("基因窃取者教派", "基因窃取者10版中文DavidZ版1.04.pdf"),
  "drukhari": ("黑暗灵族", "黑豆芽.pdf"),
  "astra-militarum": ("星界军", "星界军10版中文老湿腐版1.27.pdf"),
  "chaos-daemons": ("混沌恶魔", "混沌恶魔10E中文kasa0.95.3.pdf"),
  "chaos-space-marines": ("混沌星际战士", "混沌星际战士10版中文老湿腐版1.1.pdf"),
  "necrons": ("太空死灵", "10版太空死灵奥法之星版2.5.pdf"),
  "tau-empire": ("钛帝国", "钛帝国十版CODEX-20250604.pdf"),
  "aeldari": ("艾达灵族", "艾达灵族10版中文 1.13.pdf"),
  "orks": ("欧克兽人", "兽人10版中文老湿腐版1.09.pdf"),
}
data_dir = os.path.join(ROOT, "docs", "data")
safe = lambda s: re.sub(r'[\\/:*?"<>|]', "_", s).strip()

def read_json(p):
    t = open(p, encoding="utf-8").read()
    if t.startswith("\ufeff"): t = t[1:]
    return json.loads(t)

report = []
for fid, (name, pdf_name) in factions.items():
    fdir = os.path.join(OUT, fid, "原文")
    os.makedirs(fdir, exist_ok=True)
    if fid == "grey-knights":
        for label, p in [("Codex-灰骑士10版中文v0.9", "Codex-灰骑士10版中文v0.9.pdf"), ("11版灰骑士简中", "11版灰骑士简中 (1).pdf")]:
            src = os.path.join(ROOT, "sources", "pdfs", "_originals", p)
            doc = fitz.open(src)
            text = ""
            for i, page in enumerate(doc, 1):
                text += "===== 第%d页 =====\n" % i + (page.get_text() or "") + "\n"
            with open(os.path.join(fdir, "全文-%s.txt" % label), "w", encoding="utf-8") as f:
                f.write(text)
            report.append("grey-knights 全文-%s.txt %d字符" % (label, len(text)))
            doc.close()
        continue
    src = os.path.join(ROOT, "sources", "pdfs", "_originals", pdf_name)
    doc = fitz.open(src)
    pages_text = [(page.get_text() or "") for page in doc]
    full = ""
    for i, t in enumerate(pages_text, 1):
        full += "===== 第%d页 =====\n" % i + t + "\n"
    with open(os.path.join(fdir, "全文.txt"), "w", encoding="utf-8") as f:
        f.write(full)
    candidates = []
    for fname in os.listdir(os.path.join(data_dir, name)):
        if fname.endswith(".json") and ("结构化数据卡" in fname or "全部数据卡" in fname):
            candidates.append(os.path.join(data_dir, name, fname))
    unit_names = []
    for cp in candidates:
        try:
            data = read_json(cp)
            for c in data.get("cards", []):
                if c.get("name"):
                    unit_names.append(str(c["name"]))
        except Exception as e:
            report.append(fid + " 数据读取异常 " + str(e)[:60])
    matched = 0
    for uname in sorted(set(unit_names)):
        found = None
        for idx, t in enumerate(pages_text, 1):
            if uname in t:
                found = idx
                break
        if not found:
            continue
        block = "===== 第%d页 =====\n" % found + pages_text[found - 1]
        if found < len(pages_text) and len(pages_text[found - 1].strip()) < 2600:
            block += "\n===== 第%d页 =====\n" % (found + 1) + pages_text[found]
        with open(os.path.join(fdir, "p%03d-%s.txt" % (found, safe(uname))), "w", encoding="utf-8") as f:
            f.write(block)
        matched += 1
    report.append("%s 全文 %d字符, 按名切分 %d/%d 单位" % (fid, len(full), matched, len(set(unit_names))))
    doc.close()

with open(os.path.join(OUT, "_提取还原报告.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(report))
print("done")
print("\n".join(report))
