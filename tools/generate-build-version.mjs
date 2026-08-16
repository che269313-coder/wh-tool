import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSyncWithRetry } from "./fs-write.mjs";

const VERSION_PLACEHOLDER = "__BUILD_VERSION__";
const STARTUP_ASSETS = [
  "aliases/index.js",
  "rules/factions.js",
  "rules/faction-runtime-loader.js",
  "calculator-catalog.js",
  "app.js",
];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filename) : [filename];
  });
}

function normalizedVersionContent(relativePath, content) {
  if (relativePath === "docs/index.html") {
    return content.replace(/(\?v=)[^"']+/g, `$1${VERSION_PLACEHOLDER}`);
  }
  if (relativePath === "docs/rules/faction-runtime-loader.js") {
    return content.replace(/const BUILD_VERSION = "[^"]+"/, `const BUILD_VERSION = "${VERSION_PLACEHOLDER}"`);
  }
  return content;
}

export function buildInputPaths(root) {
  const docs = path.join(root, "docs");
  const paths = [
    path.join(docs, "index.html"),
    path.join(docs, "app.js"),
    path.join(docs, "aliases", "index.js"),
    path.join(docs, "calculator-catalog.js"),
    ...walk(path.join(docs, "catalogs")).filter((filename) => /\.(?:js|json)$/.test(filename)),
    ...walk(path.join(docs, "rules")).filter((filename) => filename.endsWith(".js")),
  ];
  return [...new Set(paths)].sort().map((filename) => path.relative(root, filename).replaceAll("\\", "/"));
}

export function computeBuildVersion(root, overrides = new Map()) {
  const hash = crypto.createHash("sha256");
  const inputs = buildInputPaths(root);
  for (const relativePath of inputs) {
    const content = overrides.has(relativePath)
      ? overrides.get(relativePath)
      : fs.readFileSync(path.join(root, relativePath), "utf8");
    hash.update(relativePath);
    hash.update("\0");
    hash.update(normalizedVersionContent(relativePath, String(content)));
    hash.update("\0");
  }
  return { version: `data-${hash.digest("hex").slice(0, 12)}`, inputs };
}

export function syncBuildVersion(root) {
  const { version, inputs } = computeBuildVersion(root);
  const indexPath = path.join(root, "docs", "index.html");
  let html = fs.readFileSync(indexPath, "utf8");
  for (const source of STARTUP_ASSETS) {
    const escaped = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    html = html.replace(new RegExp(`(<script src="${escaped})(?:\\?v=[^"]*)?("[^>]*>)`), `$1?v=${version}$2`);
  }
  writeFileSyncWithRetry(indexPath, html);

  const loaderPath = path.join(root, "docs", "rules", "faction-runtime-loader.js");
  const loader = fs.readFileSync(loaderPath, "utf8")
    .replace(/const BUILD_VERSION = "[^"]+"/, `const BUILD_VERSION = "${version}"`);
  writeFileSyncWithRetry(loaderPath, loader);

  const manifest = {
    schemaVersion: 1,
    version,
    algorithm: "sha256-12",
    inputCount: inputs.length,
  };
  writeFileSyncWithRetry(path.join(root, "docs", "build-version.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const root = path.resolve(import.meta.dirname, "..");
  const manifest = syncBuildVersion(root);
  console.log(`deploy build version generated: ${manifest.version} (${manifest.inputCount} inputs)`);
}
