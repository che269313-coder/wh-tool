/* Generate a page-bound OCR index for the scanned Custodes data cards. */
const fs = require("fs");
const path = require("path");
const { createWorker } = require("C:/Users/che26/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/tesseract.js");

const [startText, endText, mode = "append"] = process.argv.slice(2);
const start = Number(startText);
const end = Number(endText);
const root = path.resolve(__dirname, "..");
const imageFolder = path.join(process.env.TEMP, "wh-tool-custodes-pages");
const output = path.join(root, "docs", "data", "帝皇禁军", "数据卡-OCR-可检索.md");
const langPath = path.join(process.env.TEMP, "wh-tool-ocr-langs").replace(/\\/g, "/");

async function main() {
  if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) throw new Error("Usage: node ocr_custodes_cards.mjs <start-page> <end-page> [reset|append]");
  if (mode === "reset") {
    fs.writeFileSync(output, "# 帝皇禁军：数据卡 OCR 检索索引\n\n来源：`帝皇禁军10版中文老湿腐版1.07.pdf`。\n\n> 扫描版 PDF 的文字层为空；本文件由中文 OCR 逐页生成，保留页边界，适合定位单位与规则。表格列可能仍有 OCR 误读，任何 WS/BS、S、AP、D、W 等数值进入计算前必须对照原 PDF 或结构化 JSON。\n\n", "utf8");
  }
  const worker = await createWorker("chi_sim+eng", 1, { langPath, cacheMethod: "none", logger: () => {} });
  for (let page = start; page <= end; page += 1) {
    const image = path.join(imageFolder, `page-${String(page).padStart(2, "0")}.png`);
    const result = await worker.recognize(image);
    const title = result.data.text.trim().split(/\r?\n/).find((line) => line.trim()) || `第 ${page} 页`;
    fs.appendFileSync(output, `## 第 ${page} 页：${title}\n\n\`\`\`text\n${result.data.text.trim()}\n\`\`\`\n\n`, "utf8");
    console.log(`OCR page ${page}`);
  }
  try { await worker.terminate(); } catch { /* Worker shutdown is noisy on Windows; the written index is complete. */ }
}

main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1); });
