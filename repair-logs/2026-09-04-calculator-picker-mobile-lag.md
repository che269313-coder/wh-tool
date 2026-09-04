# 2026-09-04 · 修复：计算页选单位在手机端（GitHub Pages）卡顿数秒

> 分类：性能 / 移动端网络链路。本地 file:// 与桌面端不受影响，故此前未暴露。

## 现象

计算页选择单位时，手机访问 GitHub Pages 部署版要等几秒才能"选上"；
本地打开正常。点击后菜单不关闭、选中不生效，纯等待。

## 根因

选中走 `app.js` 的 `handleCalculatorPickerOption`，凡候选带阵营 ID 就
`await ensureFactionRuntimeLoaded(...)`——**在点击处理里同步等待全部阵营资源加载完**，
期间 UI 完全阻塞。加载链路（`docs/rules/faction-runtime-loader.js`）有四个问题叠加：

| # | 问题 | 代价（蜂窝网络 RTT≈250–500ms） |
| --- | --- | --- |
| 1 | rules 脚本用 `reduce` 链**串行**加载（2 个 rules + 1 个 detachment） | 3 次串行往返 ≈ 0.8–1.5s |
| 2 | catalog JSON 用 `fetch(..., { cache: "no-cache" })` 强制复验，且 URL 不带版本号 | 复访仍多付 1 次 RTT |
| 3 | 桌面端靠 `pointerover` 悬停预取掩盖加载；**手机没有 hover**，点击后才开始加载 | 全部延迟暴露给用户 |
| 4 | GitHub Pages 默认 `max-age=600`，无 Service Worker 兜底 | 隔 10 分钟复访重新验证全部资源 |

带宽不是主因：catalog JSON 经 GitHub Pages gzip 后仅 23–95KB（实测压缩率约 8%），
传输 0.1–0.5s；**主导因素是串行 RTT 链**。合计首次选中约 1.5–3.5s（4G），
弱网 3–6s，与体感吻合。

## 修复方案

| 文件 | 变更 |
| --- | --- |
| `docs/rules/faction-runtime-loader.js` | ① 脚本链 `reduce` 串行 → `Promise.all` 并行（`async=false` 注入仍保持执行顺序，省 2 个 RTT）；② catalog fetch 加 `versionedPath()`（带构建版本号）并去掉 `no-cache`——内容变化必然改变版本号与 URL，靠版本失效代替强制复验 |
| `docs/app.js` `handleCalculatorPickerOption` | **乐观选中**：点击立即落 key、收菜单、渲染并提示"已选择单位"，阵营运行时转后台补载；完成后清该槽位草稿并重渲染详情（用户正在其他输入框打字时只刷详情区，避免打断输入）；加载失败时 toast 提示并回滚该槽位 key（仅当用户未改动时） |
| `docs/app.js` `#runCalc` 处理器 | 同步 → async：开算前统一 `await` 所选阵营运行时就绪（已加载瞬时返回），并重建 `data` 为空的草稿（水合前按空数据建的）；数据完整的草稿保留，不丢用户手动调整 |
| `docs/app.js` 预取补充 | ① `refreshCalculatorPickerMenu`：输入过滤（query 非空）后预取前 3 个不同候选阵营；② 新增 `pointerdown` 预取监听——触屏没有 hover，pointerdown 在 click 前触发，为点击争取加载提前量 |
| `tools/catalog-lazy-loading.test.mjs` | 断言锚点同步：catalog fetch 改为断言 URL 带 `?v=` 且 cache 非 `no-cache`；注册来源断言改 `assert.match(/^catalogs\/.../)`（mock fetch 现返回带版本号的 URL） |

随后执行 `node tools/generate-build-version.mjs` 重打部署版本戳
（新版本 `data-6f3c983f79bf`），`node tools/build-data.mjs --check` 53 项测试全过。

## 效果预估

- 感知延迟（点击 → 看到选中）：1.5–3.5s → **<0.1s**（加载转后台）。
- 后台数据就绪时长：并行 + 预取后首次约 0.6–1.5s；复访接近 0（版本号缓存）。
- 前提约束：首次访问某阵营的 ~25–95KB 传输与解析无法消除，只能藏进后台——
  乐观选中是核心修复，其余为锦上添花。

## 陷阱记录

- `getCalculatorDraft` 按 key 复用缓存草稿（`app.js` ~907 行）：后台水合完成后
  **必须手动置空该槽位草稿**再重渲染，否则空数据草稿会一直被复用。
- 乐观选中引入"选中了但数据未就绪"窗口：`#runCalc` 必须兜底等待，否则模拟
  会拿空单位数据算出无意义结果且无任何报错。
- 修测试时发现 `build-data.mjs --check` 与单独 `node --test` 结果曾不一致
  （check 未纳入该测试文件的最新断言），以两者都跑为准。
