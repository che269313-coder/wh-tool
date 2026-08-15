"""Render PDF pages and OCR them with EasyOCR (chi_sim+eng).

Usage:
    python tools/extract/ocr-pdf-pages.py <pdf-path> <start-page> <end-page> <outdir> [--dpi 200] [--reset]

Outputs <outdir>/page-<NNN>.txt for each page (1-based, inclusive range).
Chinese text is written to files as UTF-8. The console may show mojibake on
Windows; always read output files as UTF-8.
"""
import argparse
import os
import sys

import easyocr
import fitz


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf_path")
    ap.add_argument("start", type=int, help="first page (1-based, inclusive)")
    ap.add_argument("end", type=int, help="last page (1-based, inclusive)")
    ap.add_argument("outdir")
    ap.add_argument("--dpi", type=int, default=200)
    ap.add_argument("--reset", action="store_true")
    args = ap.parse_args()

    os.makedirs(args.outdir, exist_ok=True)
    reader = easyocr.Reader(["ch_sim", "en"], gpu=False, verbose=False)

    doc = fitz.open(args.pdf_path)
    for page_no in range(args.start, args.end + 1):
        out = os.path.join(args.outdir, f"page-{page_no:03d}.txt")
        if os.path.exists(out) and not args.reset:
            continue
        page = doc[page_no - 1]
        pix = page.get_pixmap(dpi=args.dpi)
        png = os.path.join(args.outdir, f"_page-{page_no:03d}.png")
        pix.save(png)
        lines = reader.readtext(png, detail=0, paragraph=False)
        with open(out, "w", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
        os.remove(png)
        print(f"page {page_no} ok", flush=True)


if __name__ == "__main__":
    sys.exit(main())
