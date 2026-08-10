# Faction Runtime Lazy Loading Implementation Plan

**Feature:** 阵营运行时数据解耦与按需加载
**Goal:** 全局搜索只依赖轻量索引，数据卡、规则和分遣队按实际涉及的阵营独立加载。
**Acceptance Criteria:** 1. 首屏不再加载包含全部数据卡/规则/分遣队的聚合包；2. 全局单位搜索仍覆盖所有已注册阵营；3. 选择单位、查看军表单位或导入军表时只加载对应阵营；4. `file://` 仍可通过独立脚本包工作；5. 阵营资源路径由注册表统一声明；6. 校验不依赖用户军表 TXT；7. 现有战斗与规则回归保持通过，既有未提交数据问题单独报告。
**Architecture:** `WarhammerFactionRegistry` 是运行时资源清单的唯一真相源。生成器输出一个只含名称/阵营/页码的搜索索引，以及每阵营独立的数据卡、规则和分遣队脚本；应用通过共享加载器顺序加载所需阵营并将其数据注入既有计算器状态。
**Tech Stack:** 浏览器原生 JavaScript、动态 `<script>`、Node.js 生成器、Node test/VM 校验
**前端验证:** Yes — 使用自动化 DOM/VM 测试，并在本地 HTTP 页面复核搜索与选择流程。

---

## Finish Line

页面启动时只拥有全局搜索索引；任一时刻已加载的完整数据只来自用户当前选择、军表或详情所涉及的阵营。不会引入服务端、打包器或新的框架。

## Terminal Schema

```js
{
  id: "orks",
  data: { catalog: "data/欧克兽人/欧克兽人-全部数据卡.json" },
  runtime: {
    catalog: "catalogs/orks.js",
    rules: ["rules/orks-identities.js", "rules/orks.js"],
    detachment: "rules/detachments/orks.js"
  }
}

window.WARHAMMER_CALCULATOR_INDEX = [
  { factionId: "orks", faction: "欧克兽人", name: "战争头目", page: 1 }
];
```

### Task 1: 锁定按需加载契约

**Files:**
- Create: `tools/catalog-lazy-loading.test.mjs`
- Modify: `docs/rules/faction-registry.js`
- Modify: `docs/rules/factions.js`

1. 写失败测试，断言阵营定义具有独立 catalog/rules/detachment 运行时路径，聚合文件不再由首页引用。
2. 运行 `node --test tools/catalog-lazy-loading.test.mjs`，确认因当前单体架构失败。
3. 为注册表增加冻结的 `runtime` 契约，并为全部阵营声明资源路径。
4. 重跑测试确认契约通过。

### Task 2: 生成轻量索引和独立数据卡包

**Files:**
- Create: `docs/rules/catalog-registry.js`
- Create: `docs/catalogs/<faction-id>.js`
- Modify: `tools/generate-calculator-catalog.mjs`
- Modify: `docs/calculator-catalog.js`
- Modify: `tools/validate-datasheets.mjs`

1. 扩展失败测试：索引不得包含 `unit`/`weapons` 完整载荷，且每个阵营包可独立注册。
2. 让生成器从阵营注册表读取 catalog 路径，输出轻量索引和每阵营脚本。
3. 生成产物并验证索引覆盖全部卡片、单包内容与源 JSON 一致。

### Task 3: 拆分规则与分遣队聚合包

**Files:**
- Modify: `tools/generate-website-rules.mjs`
- Modify: `tools/generate-website-detachments.mjs`
- Create: `docs/rules/factions/<faction-id>.js`
- Create: `docs/rules/detachments/<faction-id>.js`
- Remove runtime references: `docs/rules/website-factions.js`, `docs/rules/detachments/website-factions.js`

1. 扩展测试，断言任一网站阵营包只注册自己的规则/分遣队。
2. 修改生成器逐阵营输出。
3. 运行生成器和 VM 校验，确认包之间没有交叉注册。

### Task 4: 应用层按需加载

**Files:**
- Modify: `docs/index.html`
- Modify: `docs/app.js`
- Test: `tools/catalog-lazy-loading.test.mjs`

1. 写失败测试：首屏仅加载核心注册表和搜索索引；请求一个阵营只执行该阵营脚本序列。
2. 实现脚本 Promise 缓存、阵营 catalog 水合、加载失败提示。
3. 将计算器选择、军表导入和单位详情改为先确保对应阵营已加载。
4. 删除首页所有阵营专属和聚合脚本标签。

### Task 5: 用户数据与项目校验解耦

**Files:**
- Modify: `tools/validate-detachments.mjs`
- Modify: `tools/validate-rules.mjs`（仅在需要适配独立包时）

1. 用内联最小军表夹具替代 `禁军军表.txt`/`白色疤痕军表.txt`。
2. 更新数据卡校验，使其直接读取源 JSON 或逐阵营包，不依赖单体 catalog。
3. 运行完整校验并区分本次回归与现有未提交数据问题。

### Task 6: 验收与体积审计

1. 运行 `node --check docs/app.js` 和全部 `tools/*.test.mjs`。
2. 运行架构、战斗、数据卡、分遣队、规则校验。
3. 统计首页脚本总字节、搜索索引字节、最大单阵营包字节。
4. 本地 HTTP 打开页面，验证跨阵营搜索、选择后加载、连续分遣队选择和军表导入。
