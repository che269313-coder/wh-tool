"""Dump per-page text of a text-layer PDF as UTF-8 files.

Usage:
    python tools/extract/pdf-text-pages.py <pdf-path> <start-page> <end-page> <outdir> [--reset]

Outputs <outdir>/page-<NNN>.txt for each page (1-based, inclusive).
Watermark/version lines (V1.00 ... etc.) are kept as-is; agents clean them.
"""
import argparse
import os
import sys

import pdfplumber


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf_path")
    ap.add_argument("start", type=int)
    ap.add_argument("end", type=int)
    ap.add_argument("outdir")
    ap.add_argument("--reset", action="store_true")
    args = ap.parse_args()

    os.makedirs(args.outdir, exist_ok=True)
    with pdfplumber.open(args.pdf_path) as pdf:
        for page_no in range(args.start, min(args.end, len(pdf.pages)) + 1):
            out = os.path.join(args.outdir, f"page-{page_no:03d}.txt")
            if os.path.exists(out) and not args.reset:
                continue
            text = pdf.pages[page_no - 1].extract_text() or ""
            with open(out, "w", encoding="utf-8") as f:
                f.write(text + "\n")
            print(f"page {page_no} ok", flush=True)


if __name__ == "__main__":
    sys.exit(main())
