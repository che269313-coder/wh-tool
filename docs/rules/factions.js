/* Source-of-truth manifests for the currently installed faction packages. */
(function (root) {
  const registry = root.WarhammerFactionRegistry;
  if (!registry) throw new Error("faction-registry.js must load before factions.js");

  registry.register({
    id: "adeptus-custodes",
    name: "帝皇禁军",
    englishName: "Adeptus Custodes",
    aliases: ["禁军", "Adeptus Custodes"],
    rulesGlobal: "WarhammerCustodesRules",
    data: {
      catalog: "data/帝皇禁军/帝皇禁军-结构化数据卡.json",
      datasheet: "data/帝皇禁军/数据卡-OCR-可检索.md",
      detachmentSource: "data/帝皇禁军/分遣队规则-11版原始文本.txt",
    },
    library: [
      { path: "data/帝皇禁军/数据卡-OCR-可检索.md", kind: "datasheet" },
      { path: "data/帝皇禁军/帝皇禁军-结构化数据卡.json", kind: "datasheet" },
    ],
    unitTags: {
      "adeptus-custodes.martial-katah": {
        default: true,
        excludeUnits: ["灭魔教团百骑长", "艾雷雅", "控诉者", "警戒者", "猎巫者", "灭魔教团犀牛装甲车"],
      },
    },
    unitAliases: {
      "盾卫连长(主将)": "盾卫连长",
      "阿拉鲁斯终结者": "阿拉琉斯终结者",
      "灭魔教团百夫长": "灭魔教团百骑长",
      "戒卫者": "警戒者",
    },
  });

  registry.register({
    id: "space-marines",
    name: "星际战士",
    englishName: "Space Marines",
    aliases: ["阿斯塔特修会", "白色疤痕", "Space Marines", "Adeptus Astartes"],
    rulesGlobal: "WarhammerSpaceMarineRules",
    data: {
      catalog: "data/星际战士/星际战士-全部数据卡.json",
      datasheet: "data/星际战士/数据卡-可检索.md",
      detachment: "data/星际战士/分遣队规则-可检索.md",
      detachmentSource: "data/星际战士/分遣队规则-11版原始文本.txt",
    },
    library: [
      { path: "data/星际战士/分遣队规则-可检索.md", kind: "detachment" },
      { path: "data/星际战士/数据卡-可检索.md", kind: "datasheet" },
      { path: "data/星际战士/星际战士-全部数据卡.json", kind: "datasheet" },
    ],
    digitalUnitAliases: { 65: ["连长"], 119: ["先遣者摩托小队"] },
    unitAliases: { "苏博登可汗(主将)": "速不台可汗" },
  });

  registry.register({
    id: "death-guard",
    name: "死亡守卫",
    englishName: "Death Guard",
    aliases: ["Death Guard", "瘟疫军团"],
    rulesGlobal: "WarhammerDeathGuardRules",
    data: {
      catalog: "data/死亡守卫/死亡守卫-全部数据卡.json",
      datasheet: "data/死亡守卫/死亡守卫-数据卡-可检索.md",
      detachment: "data/死亡守卫/死亡守卫-分遣队规则-可检索.md",
      supplement: "data/死亡守卫/死亡守卫-分数表-可检索.md",
      detachmentSource: "data/死亡守卫/分遣队规则-11版原始文本.txt",
    },
    library: [
      { path: "data/死亡守卫/死亡守卫-分遣队规则-可检索.md", kind: "detachment" },
      { path: "data/死亡守卫/死亡守卫-数据卡-可检索.md", kind: "datasheet" },
      { path: "data/死亡守卫/死亡守卫-分数表-可检索.md", kind: "supplement" },
      { path: "data/死亡守卫/死亡守卫-全部数据卡.json", kind: "datasheet" },
    ],
    unitAliases: {
      "带翼恶魔亲王": "有翼纳垢恶魔亲王",
      "死亡守卫带翼恶魔亲王": "有翼纳垢恶魔亲王",
      "恶疾使者": "恶瘟投放者",
      "凋败记账官": "书记官",
      "病毒精练者": "生物腐化者",
      "死亡守卫旗手": "死亡守卫持像者",
      "死亡守卫恶魔亲王": "纳垢恶魔亲王",
      "瘟疫散播者": "恶臭病原体",
      "烈毒领主": "病毒领主",
      "丧钟使者": "剧毒疫病使者",
      "泰丰斯": "泰弗斯",
      "死亡守卫犀牛装甲车": "混沌犀牛战车",
      "凋零引擎": "恶臭疫病引擎",
      "瘟疫行尸": "瘟疫行者",
      "凋零霸主终结者": "腐毒领主终结者",
      "死亡守卫混沌卵": "纳垢混沌魔物",
      "死亡守卫地狱兽": "地狱兽",
      "死亡守卫兰德掠袭者": "混沌兰德掠袭者战车",
      "死亡守卫歼灭者型猎食者坦克": "混沌歼灭者型掠食者战车",
      "死亡守卫破坏者型猎食者坦克": "混沌破坏者型掠食者战车",
      "瘟疫机蜂": "恶臭肿胀机兵",
      "装备重型瘟疫榴弹炮的瘟疫机蜂": "装备重型凋零榴弹炮的恶臭肿胀机兵",
      "剧毒坩埚": "瘴毒机",
    },
  });
})(typeof globalThis === "undefined" ? this : globalThis);
