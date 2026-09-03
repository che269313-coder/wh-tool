# 2026-09-03 · 修复：校验断言锚定中文显示名导致集体漂移（BUG 2）

> 分类：断言锚定漂移（显示名做查找输入）。同日 BUG 1（通用词冗余描述）见
> [2026-09-03-core-ability-redundant-text.md](./2026-09-03-core-ability-redundant-text.md)。

## 现象

`tools/validate-rules.mjs` 报 4 条失败：野兽头目近战命中 +1、蛮兽之怒毁灭伤害、
更多火力远程重投、坦克猎手按目标加成。排查发现规则与计算效果实际都存在且正确。

## 根因

PDF 卡面显示名裁决（11 版简中 PDF，`data/global/pdf-display-names.json`）更新了欧克单位译名，
部署产物随之改名，但校验脚本仍按旧译名查 `unitRules`，查不到即失败：

| 旧名（脚本引用） | 新名（PDF 卡面裁决） | englishName（稳定锚点） |
| --- | --- | --- |
| 野兽头目 | 兽霸头目 | Beastboss |
| 大技师 | 大技霸 | Big Mek |
| 坦克破坏者 | 坦爆队 | Tank Huntas |

这不是孤立问题：ARCHITECTURE.md 的"身份、显示名与数据值"三层分离设计决定了中文译名
会随 PDF 裁决持续更新，而 `tools/validate-rules.mjs` 中约有 60 处断言把中文显示名当作
查找输入（`unitRules["中文名"]`、`resolve(..., "中文名")`、`rule.name === "中文名"`），
任何一次译名裁决都会让它们集体失败——**测试失败是假警报，掩盖真回归的风险反而更大**。

## 修复方案

### 1. 锚点辅助函数（tools/validate-rules.mjs 头部）

```js
const ruleById = (rulesGlobal, ruleId) => ...;                  // 全阵营按 id 查规则
const unitEntryByRuleId = (rulesGlobal, ruleId) => ...;         // 按规则 id 反查 { unitName, rules }
const unitEntryByEnglishName = (rulesGlobal, englishName) => ...; // 按 englishName 反查
const unitRuleById / unitRuleByEnglishName = ...;
```

- 单位显示名一律**动态推导**：先按稳定 id / englishName 反查单位条目，再用 `entry.unitName`
  传入 `resolve()`，显示名变化不再影响断言；
- 锚点丢失时断言立即失败并**输出丢失的 id/englishName**，提示核对稳定 ID，
  消除"查不到 → undefined → 断言空转通过"的假绿（"阿拉鲁斯终结者"空转就是反例，
  实为"阿拉琉斯终结者"同一 allarus-custodians 卡的异译，已统一锚定并加注释）。

### 2. 锚点改写统计（约 60 处）

- **禁军**：艾雷雅、禁军盾卫、图拉真、盾卫连长、控诉者、allarus-custodians 等，
  统一锚定 `adeptus-custodes.<unit>.<ability>` 稳定 ID；
- **星际战士**：约 40 处（连长系、莱山德、托尔、智库系、牧师系、各战斗小队与载具），
  全部改为 `space-marines.<unit>.<ability>` ID 锚定；
- **死亡守卫**：泰弗斯、腐毒领主、恶臭疫病引擎、纳垢灵、莫塔里安、污染者等，
  锚定 `death-guard.<unit>.<ability>`；
- **欧克**：改为 `unitEntryByEnglishName`（Beastboss / More Dakka / Tank Hunters），
  从根上免疫译名变化；
- 欧克旧名引用同步替换为新名（共 8 处）。

### 3. 改写模式示例

```js
// 旧：双重显示名锚定，改译名即碎
const lionOath = spaceMarineRules["坎托战团长"]?.find((rule) => rule.name === "莱恩誓言");
const lionOathEnabled = resolve("星际战士", "坎托战团长", {...});

// 新：稳定 ID 定位，单位名动态推导，显示名只出现在断言消息里
const kantorEntry = unitEntryByRuleId(context.WarhammerSpaceMarineRules, "space-marines.pedro-kantor.oath-of-the-lion");
const lionOath = unitRuleById(kantorEntry, "space-marines.pedro-kantor.oath-of-the-lion");
const lionOathEnabled = resolve("星际战士", kantorEntry.unitName, {...});
```

### 4. 显示名锚定的元门禁（防止回归）

新增 `tools/audit-assertion-anchors.mjs`，静态扫描 `tools/*.mjs`，拦截四类
"显示名做查找输入"的模式：

1. `对象["中文名"]`（按显示名索引规则目录）；
2. `resolveUnit/rulesForUnit/resolveFaction/resolve(..., "中文名", ...)`（第 2 参数显示名）；
3. `unitName: "中文名"`；
4. `.find(... .name === "中文名")`（按技能显示名查找规则）。

豁免机制：

- 行内注释 `// display-name-anchor: 原因`——显示名是被测对象（别名/裁决测试）或测试内合成夹具；
- `ALLOWED_FILES`——别名表与夹具测试文件（alias-registry / pdf-priority / apply-patches /
  reroll-plan / army-list-aliases / tactical-agent / data-packages / source-contract /
  validate-combat / validate-datasheets），这些文件中显示名即测试契约。

实现注意：正则需区分"字符串索引"（`foo["中文名"]`）与"数组字面量"（`["速射3"]`），
后者是词条词典的合法输入；裸 `resolve` 需负向后顾排除 `Dictionary.resolve`。

### 5. 门禁挂载

`build-data.mjs --check` 新增 `audit assertion anchors` 阶段。

## 验证（全绿）

```bash
node tools/validate-rules.mjs            # 规则回归校验通过
node tools/validate-architecture.mjs     # 架构契约校验通过
node tools/validate-datasheets.mjs       # 数据卡校验通过
node tools/audit-core-ability-text.mjs   # 23 个规则包通过
node tools/audit-assertion-anchors.mjs   # 锚点审计通过
node --test tools/faction-rules-coverage.test.mjs tools/core-ability-normalizer.test.mjs  # 12/12
```

## 架构启示（后续分析关注点）

1. **断言的输入必须是稳定身份，显示名只能是输出**。这条应作为项目测试规约写入
   架构文档，并在 code review / 门禁中检查。
2. **空转断言比没有断言更危险**：按不存在的 key 查找返回 undefined，`assert(x?.effects...)`
   会静默通过。辅助函数在锚点丢失时立即失败，消除了这一类假绿。
3. **可保留的显示名断言**（别名表、卡合并裁决）应集中在显式命名的测试区块，
   与行为断言物理隔离，避免误改。
4. 元门禁已落地（audit-assertion-anchors.mjs），新代码再犯会在构建期直接失败。
