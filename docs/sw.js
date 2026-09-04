/* Service worker: precaches the app shell and every faction runtime at idle. */
const BUILD_VERSION = "data-51a859c7825a";
const CACHE_NAME = `wh-tool-${BUILD_VERSION}`;
const VERSION_PARAM = `v=${encodeURIComponent(BUILD_VERSION)}`;

const APP_SHELL = [
  "./index.html",
  "./app.js",
  "./engine.js",
  "./calculator-catalog.js",
  "./aliases/index.js",
  "./styles.css",
  "./manifest.webmanifest",
];

function versionedPath(path) {
  const p = String(path || "").trim();
  if (!p) return "";
  return `${p}${p.includes("?") ? "&" : "?"}${VERSION_PARAM}`;
}

async function precacheUrls(urls) {
  const cache = await caches.open(CACHE_NAME);
  await Promise.allSettled(urls.map(async (url) => {
    try {
      await cache.add(new Request(url, { credentials: "same-origin" }));
    } catch {
      // 单个资源预缓存失败不阻塞其余资源，按需加载路径仍可正常回源。
    }
  }));
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    await precacheUrls(["./index.html", ...APP_SHELL.filter((p) => p !== "./index.html").map(versionedPath)]);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith("wh-tool-") && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

// 页面在空闲时段发来阵营运行时路径清单，SW 补上自己的构建版本号后逐个预缓存。
self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type !== "precache-factions" || !Array.isArray(data.paths)) return;
  event.waitUntil(precacheUrls(data.paths.map(versionedPath).filter(Boolean)));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.searchParams.has("v")) {
    // 带构建版本号的资源内容不可变：缓存优先，未命中回源后写入缓存。
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    })());
    return;
  }
  // 未带版本号的资源（index.html 等）可能随部署更新：网络优先，离线回缓存。
  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response.ok && request.mode !== "navigate") {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await caches.match(request);
      if (cached) return cached;
      throw error;
    }
  })());
});
