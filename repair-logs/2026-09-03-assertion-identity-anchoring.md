# 2026-09-03 · 校验断言锚点修复：中文显示名 → 稳定 ID / englishName

> 背景：同日早些时候完成了"通用核心技能全文回流"修复（见
> [2026-09-03-core-ability-text-and-orks-validation.md](./2026-09-03-core-ability-text-and-orks-validation.md)），
> 该修复过程暴露出第二类系统性问题——**校验与测试断言直接按中文显示名定位数据**。
> 本记录覆盖该问题的排查、修复与遗留观察。

## 问题定义

ARCHITECTURE.md 的"身份、显示名与数据值"三层分离设计要求：身份由稳定 `cardId` /
官方英文 `englishName` 锚定，中文显示名按来源策略裁决、会随 PDF 卡面名更新而变化。

但 `tools/validate-rules.mjs` 中存在大量**用中文显示名作为查找输入**的断言：

```js
// 反例：单位名和技能名都是中文显示名，任何一次译名裁决更新都会让断言失效
spaceMarineRules["阿加通连长"]?.find((rule) => rule.name === "重拳出击")
context.WarhammerOrksRules.unitRules["兽霸头目"]?.find((rule) => rule.source?.englishName === "Beastboss")
resolve("帝皇禁军", "图拉真元帅", ...)
```

欧克兽人改名事件（野兽头目→兽霸头目、大技师→大技霸、坦克破坏者→坦爆队）已经证明这类断言
会在每次显示名裁决后集体失败，而规则与计算效果本身完全正常——**测试失败是假警报，
掩盖真回归的风险反而更大**。

## 排查范围与分类

对 `tools/*.mjs` 全量扫描 `unitRules["中文"]`、`resolve(..., "中文")`、`rule.name === "中文"` 模式，
按"中文显示名在断言中的角色"分为三类：

| 分类 | 处理 | 说明 |
| --- | --- | --- |
| 显示名作为**查找输入**（行为/结构断言） | ✅ 全部改为稳定锚点 | ~60 处，本次修复主体 |
| 显示名作为**断言输出**（显示裁决测试） | ✅ 保留 | 如"跳跃背包连长的战斗之仪必须映射官方 ID"改为 `ruleById(id)?.name === "战斗之仪"`，方向反转为 id→名 |
| 显示名本身就是**被测对象**（别名/合并裁决测试） | ✅ 保留 | 别名表测试、警戒者/戒卫者合并测试、数据卡内容测试——显示名即被测契约 |

## 修复方案

### 1. 新增锚点辅助函数（tools/validate-rules.mjs 头部）

```js
const ruleById = (rulesGlobal, ruleId) => ...;                  // 全阵营按 id 查规则
const unitEntryByRuleId = (rulesGlobal, ruleId) => ...;         // 按规则 id 反查 { unitName, rules }
const unitEntryByEnglishName = (rulesGlobal, englishName) => ...; // 按 englishName 反查
const unitRuleById = (entry, ruleId) => ...;
const unitRuleByEnglishName = (entry, englishName) => ...;
```

- 单位显示名一律**动态推导**：先按稳定 id / englishName 反查单位条目，再用 `entry.unitName`
  传入 `resolve()`，显示名变化不再影响断言；
- 锚点丢失时断言立即失败并**输出丢失的 id/englishName**，提示核对稳定 ID，
  避免静默通过（此前"阿拉鲁斯终结者"单元名不存在导致断言空转通过就是反例）。

### 2. 锚点改写统计（约 60 处）

- **禁军**：艾雷雅、禁军盾卫、图拉真、盾卫连长、控诉者、allarus-custodians 等，
  统一锚定 `adeptus-custodes.<unit>.<ability>` 稳定 ID；
- **星际战士**：约 40 处（连长系、莱山德、托尔、智库系、牧师系、各战斗小队与载具），
  全部改为 `space-marines.<unit>.<ability>` ID 锚定；
- **死亡守卫**：泰弗斯、腐毒领主、恶臭疫病引擎、纳垢灵、莫塔里安、污染者等，
  锚定 `death-guard.<unit>.<ability>`；
- **欧克**：改为 `unitEntryByEnglishName`（Beastboss / More Dakka / Tank Hunters），
  从根上免疫译名变化；
- **历史怪癖修正**："阿拉鲁斯终结者 / 阿拉琉斯终结者"实为同一 allarus-custodians 卡的
  两种译名，旧断言里前者根本查不到数据（空转通过），现已统一锚定并加注释。

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

## 验证

```text
node tools/validate-rules.mjs        # 规则回归校验通过
node --test tools/faction-rules-coverage.test.mjs  # 8/8
node tools/audit-core-ability-text.mjs             # 23 个规则包通过
node tools/validate-architecture.mjs               # 架构契约通过
node tools/validate-datasheets.mjs                 # 数据卡通过
```

## 架构启示（后续分析关注点）

1. **断言的输入必须是稳定身份，显示名只能是输出**。这条应作为项目测试规约写入
   架构文档，并在 code review / 门禁中检查。
2. **空转断言比没有断言更危险**：按不存在的 key 查找返回 undefined，`assert(x?.effects...)`
   会静默通过。辅助函数在锚点丢失时立即失败，消除了这一类假绿。
3. **可保留的显示名断言**（别名表、卡合并裁决）应集中在显式命名的测试区块，
   与行为断言物理隔离，避免误改。
4. **未来可加一个元门禁**：静态扫描 tools/ 断言代码中的 `unitRules["中文"]` /
   `resolve(..., "中文")` 模式，防止新的显示名锚定回归（本次未实现，已列入观察）。

## 相关文件

- `tools/validate-rules.mjs`（主要改动，约 60 处锚点改写）
- `repair-logs/2026-09-03-core-ability-text-and-orks-validation.md`（同日首个问题，欧克改名的直接成因）
