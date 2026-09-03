/* Generated source-text rule package for world-eaters. */
(function (root) {
  root["WarhammerWebsiteRules_world_eaters"] = {
  "factionRules": [
    {
      "id": "world-eaters.army-rule",
      "name": "恐虐赐福",
      "englishName": "Blessings of Khorne",
      "text": "恐虐祝福\n\n每战斗回合开始时可进行祝福掷骰：掷八颗 D6，用结果启用最多两个祝福（见下方各祝福所需点数）。每场战斗回合每个祝福只能启用一次，未使用的骰子弃置。启用后该祝福对军队中所有具此能力单位生效到战斗回合结束。\n\n无拘的杀戮欲（任意对子）\n\n此单位获得 +1 冲锋掷骰。\n\n嗜血狂暴（对子 3+）\n\n堆叠或巩固移动可达 6\"。\n\n绝对屠杀（对子 4+）\n\n此单位模型若于本阶段尚未战斗、却被近战攻击摧毁，掷 D6；4+ 不立即移除，待攻击单位攻击结束后该模型可战斗再移除。\n\n武技卓越（三连 4+）\n\n近战武器获得连击 1。\n\n扭曲之刃（对子 5+）\n\n近战武器获得致命一击。\n\n断首斩击（三连 5+）\n\n对步兵单位的近战攻击获得毁灭伤害。\n\n鲜血誓约\n\n招募军队时，除非另有明文允许，否则不可选血腥军团作为军队阵营。",
      "category": "faction",
      "status": "计算支持（满足原文条件时勾选）",
      "controls": [
        {
          "id": "sustainedMelee",
          "type": "checkbox",
          "label": "启用武技卓越（近战连击 1；祝福合计最多两项）"
        },
        {
          "id": "lethalMelee",
          "type": "checkbox",
          "label": "启用扭曲之刃（近战致命一击；祝福合计最多两项）"
        },
        {
          "id": "devastatingInfantry",
          "type": "checkbox",
          "label": "启用断首斩击（对步兵近战毁灭伤害；祝福合计最多两项）"
        },
        {
          "id": "targetInfantry",
          "type": "checkbox",
          "label": "目标具有步兵关键词"
        }
      ],
      "effects": [
        {
          "type": "sustained-hits",
          "value": 1,
          "phase": "melee",
          "selection": {
            "controlId": "sustainedMelee",
            "equals": true
          }
        },
        {
          "type": "lethal-hits",
          "phase": "melee",
          "selection": {
            "controlId": "lethalMelee",
            "equals": true
          }
        },
        {
          "type": "devastating-wounds",
          "phase": "melee",
          "requiresTargetInfantry": true,
          "selection": {
            "controlId": "devastatingInfantry",
            "equals": true
          }
        }
      ],
      "source": {
        "englishName": "Blessings of Khorne",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "安格隆": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-reborn-in-blood",
        "name": "浴血重生",
        "text": "在战斗回合开始时，当你进行「血腥谕旨」掷骰时，如果此模型被摧毁，你可使用该掷骰中的三个 6 来使用此能力，而非启动该战斗回合开始时的任何「血腥谕旨」。若你如此做，此模型不再被摧毁，并在你下一个移动阶段的增援步骤中，使用其深入打击能力在战场上任意位置设置，剩余 8 点伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Reborn in Blood",
          "kind": "unique"
        }
      },
      {
        "id": "unique-wrathful-presence",
        "name": "怒火化身",
        "text": "在战斗回合开始时，选择一个愤怒存在能力。至下个战斗回合开始止，此模型具有该能力。\n\n**血神眷顾：** 每当你进行一次「血神谕旨(Blessings of Khorne)」掷骰时，若此模型在战场上，你可以重掷所掷 D6 中最多六颗。\n\n**压倒性愤怒（光环）：** 每当一个敌方单位在此模型 6\" 内被选择后撤时，该单位必须进行一次领导力测试。若该测试失败，该单位此阶段必须改为保持静止。\n\n**至极暴怒所驱（光环）：** 当一个友方 **噬世者(World Eaters)** 单位在此模型 6\" 内时，你可以无视对该单位移动特性的任何或全部修正值，以及对其前进与冲锋掷骰的任何或全部修正值；且该单位中每当一个模型进行一次近战攻击，你可以无视对该攻击武器技术特性的任何或全部修正值，以及/或对命中掷骰的任何或全部修正值。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "ignore-hit-modifiers",
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Wrathful Presence",
          "kind": "unique"
        }
      },
      {
        "id": "unique-supreme-commander",
        "name": "至高指挥官",
        "text": "若此模型在你的军队中,则它必须是你的统帅(Warlord)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Supreme Commander",
          "kind": "unique"
        }
      }
    ],
    "恐虐碾血者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-brass-stampede",
        "name": "铜蹄践踏",
        "text": "此单位每次结束一次冲锋移动时，选择一个在此单位交战范围内的敌方单位，并为此单位中的每个模型掷一次 D6：对于每次 4+，该敌方单位受到 D3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Brass Stampede",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "邪魔圣印",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Icon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Instrument of Chaos",
          "kind": "unique"
        }
      }
    ],
    "放血鬼": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-bane-of-cowards",
        "name": "懦夫之祸",
        "text": "每当敌方单位（**凶兽(Monster)**和**载具(Vehicle)**除外）在你军队中具有此能力的一个或多个单位的交战距离内后退时，该敌方单位中的模型必须进行绝望逃亡检定。进行此检定时，如果该敌方单位也处于战斗震撼状态，则从每次这些绝望逃亡检定中减去 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bane of Cowards",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "邪魔圣印",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Icon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Instrument of Chaos",
          "kind": "unique"
        }
      }
    ],
    "嗜血狂魔": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-daemon-lord-of-khorne",
        "name": "恐虐大魔",
        "text": "当友方 **血色军团** 单位在此模型6\"内时，该单位中的每个模型每次进行近战攻击时，命中掷骰+1。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "hit-modifier",
            "value": 1,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Daemon Lord of Khorne",
          "kind": "unique"
        }
      },
      {
        "id": "unique-relentless-carnage",
        "name": "无情屠戮",
        "text": "在战斗阶段结束时，你可选择一个与此模型在交战范围内的敌方单位并掷 8D6：对于每个 4+，该敌方单位承受 1 点灵能伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Relentless Carnage",
          "kind": "unique"
        }
      }
    ],
    "混沌兰德掠袭者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-assault-ramp",
        "name": "突击跳板",
        "text": "每次单位在此模型进行「正常移动」后从其中下车时，该单位在本回合仍可宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Assault Ramp",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 14 个吞世者步兵模型。每个附身者和终结者模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "混沌歼灭型掠食者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-blood-hungry-annihilator",
        "name": "歼灭炮火",
        "text": "此模型每次对距离 18\" 内的最近合法 **凶兽(Monster)** 或 **载具(Vehicle)** 目标发动远程攻击时，可重掷致伤掷骰，且可重掷伤害掷骰。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "wound-reroll",
            "mode": "failed",
            "phase": "ranged"
          },
          {
            "type": "damage-reroll",
            "mode": "failed",
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Blood-hungry Annihilator",
          "kind": "unique"
        }
      }
    ],
    "混沌破坏型掠食者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-punishing-suppression",
        "name": "破坏炮火",
        "text": "在你的射击阶段，此模型射击后，选择一个被该次攻击中的一次或多次命中的敌方单位（不包括 **凶兽(Monster)** 和 **载具(Vehicle)**）。直到你的下一回合开始时，该敌方单位处于压制状态。当一个单位处于压制状态时，该单位中每个模型每次进行攻击，从命中掷骰中减少 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Punishing Suppression",
          "kind": "unique"
        }
      }
    ],
    "混沌犀牛运兵车": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3，开火口2",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3, Firing Deck 2",
          "kind": "core"
        }
      },
      {
        "id": "unique-meet-any-challenge",
        "name": "迎接挑战",
        "text": "在你的对手的移动阶段，每次敌方单位在此模型的8\"内被设置或结束一次正常、前进或后撤移动时，船上的任何单位可以下船。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Meet Any Challenge",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 12 个吞世者步兵模型。该模型不能运输附身者或终结者模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "混沌卵": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "不知疼痛5+，斥候8",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "fnp",
            "threshold": 5
          }
        ],
        "source": {
          "englishName": "Feel No Pain 5+, Scouts 8\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-to-slake-its-rage",
        "name": "匍行骇物",
        "text": "此单位在其前进的回合内可宣布冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "To Slake its Rage",
          "kind": "unique"
        }
      }
    ],
    "混沌终结者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-bloody-fury",
        "name": "血腥狂怒",
        "text": "此单位每个模型每次对最近的敌方单位发动远程攻击时，可重掷命中掷骰。此单位每次宣布冲锋目标为最近的合适敌方单位时，可重掷冲锋掷骰。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "hit-reroll",
            "mode": "failed",
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Bloody Fury",
          "kind": "unique"
        }
      }
    ],
    "恐虐恶魔王子": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-lord-of-murder",
        "name": "嗜杀魔主",
        "text": "当此模型位于 1 个或多个友方 **吞世者(World Eaters)步兵(Infantry)** 单位 3\" 内时，此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of Murder",
          "kind": "unique"
        }
      },
      {
        "id": "unique-devastating-assault",
        "name": "毁灭突袭",
        "text": "此模型每次进行冲锋移动时，直到回合结束，其地狱锻造武器具有 **[毁灭性创伤]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Devastating Assault",
          "kind": "unique"
        }
      },
      {
        "id": "unique-direct-the-slaughter",
        "name": "指引屠夫",
        "text": "每战斗回合一次，你的军队中持有此能力的一个模型可在距该模型 12\" 内的友军 **吞世者(World Eaters)** 单位被目标为某项策略时使用此能力。若如此，该策略用法的指令点数成本减少 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Direct the Slaughter",
          "kind": "unique"
        }
      }
    ],
    "有翼恐虐恶魔亲王": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-bloodied-terror",
        "name": "浴血恐怖",
        "text": "在战斗阶段开始时，此模型交战范围内的每个敌方单位必须进行一次战斗震撼测试，若该敌方单位处于低于半数状态，则从该测试中扣除 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bloodied Terror",
          "kind": "unique"
        }
      },
      {
        "id": "unique-swooping-predator",
        "name": "滑翔掠食者",
        "text": "此模型每次结束常规移动时，可选择它在该移动期间跨越的一个敌方单位，并掷六次D6：对于每个4+，该敌方单位承受1点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Swooping Predator",
          "kind": "unique"
        }
      }
    ],
    "亵渎者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-scuttling-walker",
        "name": "爬行机甲",
        "text": "此单位每次进行「正常移动」、「冲锋移动」或「后撤移动」时，可以穿过模型（**巨型(Titanic)**模型除外）与地形特征。如此移动时，可在敌方模型的交战距离内移动，但不能在敌方模型的交战距离内结束移动，且任何「绝望逃脱」测试自动通过。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scuttling Walker",
          "kind": "unique"
        }
      },
      {
        "id": "unique-unleash-wrath",
        "name": "脱缰狂怒",
        "text": "在你对手的移动阶段结束时，你可以选择一个于此模型 12\" 内被设置到战场上的敌方单位；接着此模型可进行以下其中一项：\n■ 对该单位射击，但仅当其为合法目标时。\n■ 向该单位宣告冲锋；此模型必须以与你所选的该敌方单位交战，结束此次冲锋移动（注意即使此次冲锋成功，此模型本轮不获得任何冲锋加成）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unleash Wrath",
          "kind": "unique"
        }
      }
    ],
    "八缚屠夫": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "斥候6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-beacons-of-rage",
        "name": "怒火道标（光环）",
        "text": "当友方 **吞世者(World Eaters)** 单位在此单位 6\" 范围内时，该单位中每个模型进行近战攻击对上一支单位（不包括 **凶兽(Monster)** 及 **载具(Vehicle)**）时，命中掷骰 +1。若该攻击对上低于半数的单位（不包括 **凶兽(Monster)** 及 **载具(Vehicle)**）时，致伤掷骰亦 +1。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "hit-modifier",
            "value": 1,
            "phase": "melee"
          },
          {
            "type": "wound-modifier",
            "value": 1,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Beacons of Rage",
          "kind": "unique"
        }
      }
    ],
    "神尊八缚屠夫": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-rend-and-tear",
        "name": "撕裂殆尽",
        "text": "此单位内每个模型每次对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位进行近战攻击时，至该阶段结束前，将该次攻击的伤害特性提升 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rend and Tear",
          "kind": "unique"
        }
      }
    ],
    "觅血猎犬": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-hunters-from-the-warp",
        "name": "次元猎手",
        "text": "在对手的回合结束时，若此单位未位于一个或多个敌方单位的交战范围内，你可将其从战场上移除，并放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hunters from the Warp",
          "kind": "unique"
        }
      },
      {
        "id": "unique-collar-of-khorne",
        "name": "恐虐黄铜项圈",
        "text": "持有者拥有对抗灵能攻击的不觉疼痛 3+ 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Collar of Khorne",
          "kind": "unique"
        }
      }
    ],
    "煅炉魔": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-furious-onslaught",
        "name": "狂怒猛攻",
        "text": "每当此模型进行射击攻击锁定18\"内最近的符合条件目标时，可重掷命中掷骰。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "hit-reroll",
            "mode": "failed",
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Furious Onslaught",
          "kind": "unique"
        }
      }
    ],
    "洒血鬼教徒": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "渗透",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Infiltrators",
          "kind": "core"
        }
      },
      {
        "id": "unique-loping-speed",
        "name": "疾速奔袭",
        "text": "每回合一次，当一个敌方单位在此单位 9\" 范围内完成一次常规、前进或后撤移动时，若此单位不在一个或多个敌方单位的交战范围内，可进行一次距离不超过 D6\" 的常规移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Loping Speed",
          "kind": "unique"
        }
      }
    ],
    "地狱兽": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D1",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1",
          "kind": "core"
        }
      },
      {
        "id": "unique-devoted-to-destruction",
        "name": "献身毁灭",
        "text": "若本模型在近战武器外额外配备两件近战武器，则在该两件武器的攻击特征中加 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Devoted to Destruction",
          "kind": "unique"
        }
      },
      {
        "id": "unique-frenzy",
        "name": "浴血狂暴",
        "text": "在你对手的射击阶段和战斗阶段中，每当一个敌方单位以此模型为目标时，在该单位完成其攻击后，此模型可进行射击或战斗，但在解决这些攻击时，它只能以该敌方单位为目标（且仅限于其为合法目标时）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Frenzy",
          "kind": "unique"
        }
      }
    ],
    "地狱飞龙": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3，悬浮",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3, Hover",
          "kind": "core"
        }
      },
      {
        "id": "unique-airborne-predator",
        "name": "空中掠食者",
        "text": "每次此模型进行攻击，目标为能 **飞行(Fly)** 的单位时，加 1 到命中掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Airborne Predator",
          "kind": "unique"
        }
      }
    ],
    "豺狼邪教徒": [
      {
        "id": "unique-objective-ravaged",
        "name": "蹂躏目标点",
        "text": "在你的指挥阶段结束时，如果此单位在你控制的目标标志物范围内，该目标标志物保持在你的控制之下，直到你的对手对该目标标志物的控制等级在一个阶段结束时大于你的为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Objective Ravaged",
          "kind": "unique"
        }
      },
      {
        "id": "unique-icon-of-khorne",
        "name": "恐虐圣印",
        "text": "若持有者所在的单位包含一个或多个 Icons of Khorne，则持有者所在的单位每次摧毁一个敌方单位时，你获得 1 点 Bloodshed 点数。你每次进行 Blessings of Khorne 掷骰时，每拥有 1 点 Bloodshed 点数即额外掷一颗 D6，之后你所有的 Bloodshed 点数全部失去。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Icon of Khorne",
          "kind": "unique"
        }
      }
    ],
    "背叛者卡恩": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-legendary-killer",
        "name": "传奇屠夫",
        "text": "此模型率领单位期间，该单位每个模型进行近战攻击时，重掷命中掷骰 1 且重掷致伤掷骰 1。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          },
          {
            "id": "forceLeader",
            "type": "checkbox",
            "label": "数据卡模式下视为正在领导单位"
          }
        ],
        "effects": [
          {
            "type": "hit-reroll",
            "mode": "ones",
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          },
          {
            "type": "wound-reroll",
            "mode": "ones",
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Legendary Killer",
          "kind": "unique"
        }
      },
      {
        "id": "unique-the-betrayer",
        "name": "背叛者",
        "text": "在你的冲锋阶段结束时，若此模型领导一个单位且该单位不在一个或多个敌方单位的交战范围内，必须进行此模型的领导力测试。若测试失败，该单位中的一个护卫模型被摧毁。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "The Betrayer",
          "kind": "unique"
        }
      },
      {
        "id": "unique-berzerker-frenzy",
        "name": "狂暴盛怒",
        "text": "此模型首次被摧毁时，在阶段结束时，掷 1D6：结果为 2+ 时，以此模型被摧毁的位置为基准，尽可能接近地在战场上重新配置此模型，且不在任何敌方单位的交战范围内，剩余 3 点伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Berzerker Frenzy",
          "kind": "unique"
        }
      }
    ],
    "恐虐狂战士": [
      {
        "id": "unique-blood-surge",
        "name": "血涌",
        "text": "在你对手的射击阶段中，每次敌军单位进行射击后，如有任何该单位的模型因这些攻击而被摧毁，此单位可进行鲜血暴躁移动。进行此移动时，掷一枚 D6 并加 2：此单位的模型移动至此掷骰数值的英寸数，但该单位必须以最接近最近敌军单位（不含 **飞行器(Aircraft)**）的方式结束移动。进行此移动时，这些模型可移动至敌军单位的交战距离内。该单位在战栗或位于一个或多个敌军单位的交战距离内时，无法进行鲜血暴躁移动，每个阶段最多只能进行一次此移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blood Surge",
          "kind": "unique"
        }
      },
      {
        "id": "unique-icon-of-khorne",
        "name": "恐虐圣印",
        "text": "若持有者所在的单位包含一个或多个 Icons of Khorne，则持有者所在的单位每次摧毁一个敌方单位时，你获得 1 点 Bloodshed 点数。你每次进行 Blessings of Khorne 掷骰时，每拥有 1 点 Bloodshed 点数即额外掷一颗 D6，之后你所有的 Bloodshed 点数全部失去。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Icon of Khorne",
          "kind": "unique"
        }
      }
    ],
    "恐虐颅骨之主": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6+2",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-idol-of-blessed-blood",
        "name": "受祝鲜血圣像",
        "text": "在战斗回合开始时，如果此模型在战场上，当你进行「血腥谕旨」掷骰时，额外掷一个 D6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Idol of Blessed Blood",
          "kind": "unique"
        }
      },
      {
        "id": "unique-super-heavy-war-engine",
        "name": "超重型战争引擎",
        "text": "此模型每次进行常规移动、前进或后撤时，可穿过模型（不含 **泰坦** 模型）与高度 4\" 或以下的地形区段。进行此移动时可在敌方模型的交战范围内移动，但移动不能终止于敌方模型的交战范围内。它也可穿过高度超过 4\" 的地形区段，但若执行此操作，移动后掷 1D6：若结果为 1，此模型进入战斗震撼。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Super-heavy War Engine",
          "kind": "unique"
        }
      }
    ],
    "领主因维卡图斯": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖，深入打击，斥候6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Leader, Deep Strike, Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-fire-riders",
        "name": "踏火骑将",
        "text": "此模型领导一个单位时，该单位中的模型具有深入打击能力，且该单位中的每个模型每次进行常规、前进、后撤或冲锋移动时，可水平移动穿过模型和地形。进行常规、前进或后撤移动时，该单位中的模型可在敌方模型的交战范围内移动，但不能以交战范围内结束该移动，且任何绝望逃脱测试自动通过。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fire Riders",
          "kind": "unique"
        }
      },
      {
        "id": "unique-bloody-stampede",
        "name": "血腥践踏",
        "text": "此模型的单位每次完成冲锋移动后，选择与此模型交战范围内的敌方单位，掷一个 D6：2-3，该敌方单位受 1 点致命伤；4-5，该敌方单位受 D3 点致命伤；6，该敌方单位受 D3+3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bloody Stampede",
          "kind": "unique"
        }
      }
    ],
    "钢牛领主": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-aggressive-advance",
        "name": "侵攻行军",
        "text": "当此模型领导一个单位时，该单位中的模型具有 10\" 的移动特性，且该单位中的每个模型每次进行常规、前进、后撤或冲锋移动时，可水平穿过地形特征。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aggressive Advance",
          "kind": "unique"
        }
      },
      {
        "id": "unique-crush-all-who-stand-before-us",
        "name": "碾尽吾敌",
        "text": "此模型的单位每次被选定战斗时，你可使用此能力。在判定此单位中哪些模型有资格战斗时，其中任何距敌方模型 3\" 内的模型均有资格战斗。在解决那些攻击时，该等模型可目标其他在 3\" 内且在其单位的交战范围内的敌方单位之一。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Crush All Who Stand Before Us",
          "kind": "unique"
        }
      }
    ],
    "枭首魔将": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-forwards-for-blood",
        "name": "为了鲜血，进军！",
        "text": "当此模型带领一个单位时，你可以重掷为该单位进行的前进掷骰，且该单位每次进行鲜血激涌时，你可以重掷用来决定该单位模型移动距离的 D6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Forwards, for Blood!",
          "kind": "unique"
        }
      },
      {
        "id": "unique-a-worthy-skull",
        "name": "甄选颅骨",
        "text": "此模型每次对 **角色(Character)** 单位发动近战攻击时，你可重掷命中掷骰且你可重掷致伤掷骰。每次此模型所在单位摧毁一个 **角色(Character)** 模型时，你获得 1 CP。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "hit-reroll",
            "mode": "failed",
            "phase": "melee"
          },
          {
            "type": "wound-reroll",
            "mode": "failed",
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "A Worthy Skull",
          "kind": "unique"
        }
      }
    ],
    "重锤魔": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-the-scent-of-blood",
        "name": "嗜血饕欲",
        "text": "此模型每次宣告冲锋目标为一个或多个低于起始兵力的单位时，为冲锋掷骰加上 1。若该冲锋的一个或多个目标低于半数，则改为加上 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "The Scent of Blood",
          "kind": "unique"
        }
      },
      {
        "id": "unique-savage-exaltation",
        "name": "凶狞增幅",
        "text": "此模型每次进行近战攻击，若目标敌方单位的力量低于其起始兵力，则命中掷骰 +1；若目标敌方单位低于半数，则额外致伤掷骰 +1。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "hit-modifier",
            "value": 1,
            "phase": "melee"
          },
          {
            "type": "wound-modifier",
            "value": 1,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Savage Exaltation",
          "kind": "unique"
        }
      }
    ],
    "屠缚战狂": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-rage-eternal",
        "name": "永燃怒火",
        "text": "此模型领导一个单位时，在你的指挥阶段，可向该单位返还一个被摧毁的护卫模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rage Eternal",
          "kind": "unique"
        }
      },
      {
        "id": "unique-possessed-lord",
        "name": "附魔领主",
        "text": "每场战斗一次，在战斗阶段开始时，此模型可使用此能力。若其如此，直到该阶段结束，此模型配备的近战武器攻击特性加 3，且这些武器具有 **[毁灭性创伤]** 能力。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "attack-modifier",
            "value": 3,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Possessed Lord",
          "kind": "unique"
        }
      },
      {
        "id": "unique-lord-of-the-eightbound",
        "name": "八缚屠主",
        "text": "若此模型在宣告战斗编成步骤中附加于 WORLD EATERS POSSESSED 单位,则至战斗结束,此模型具有深入打击(Deep Strike)与斥候6\"(Scouts 6\")能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of the Eightbound",
          "kind": "unique"
        }
      }
    ],
    "斯卡布兰德": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-rage-embodied",
        "name": "盛怒化身",
        "text": "当友方 **血腥军团** 单位在此模型6\"范围内时，加1至该单位模型配备的近战武器的攻击次数特性。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rage Embodied",
          "kind": "unique"
        }
      },
      {
        "id": "unique-murderlust",
        "name": "嗜杀饥渴",
        "text": "此单位在进行过前进的回合中符合宣告冲锋的条件。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Murderlust",
          "kind": "unique"
        }
      }
    ],
    "地狱之刃": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "飞行，飞行器，致命破灭D3，恐虐赐福",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Fly, Aircraft, Deadly Demise D3, Blessings of Khorne",
          "kind": "core"
        }
      },
      {
        "id": "unique-invulnerable-save",
        "name": "无敌豁免",
        "text": "此模型具有 5+ 无敌豁免。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "invulnerable-save",
            "value": 5
          }
        ],
        "source": {
          "englishName": "Invulnerable Save",
          "kind": "unique"
        }
      },
      {
        "id": "unique-interceptor",
        "name": "拦截者",
        "text": "此模型每次对能 FLY 的单位进行远程攻击时，命中掷骰+1。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "hit-modifier",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Interceptor",
          "kind": "unique"
        }
      }
    ],
    "地狱之爪": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "飞行，飞行器，致命破灭D6，恐虐赐福",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Fly, Aircraft, Deadly Demise D6, Blessings of Khorne",
          "kind": "core"
        }
      },
      {
        "id": "unique-invulnerable-save",
        "name": "无敌豁免",
        "text": "此模型具有 5+ 无敌豁免。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "invulnerable-save",
            "value": 5
          }
        ],
        "source": {
          "englishName": "Invulnerable Save",
          "kind": "unique"
        }
      },
      {
        "id": "unique-bomb-rack",
        "name": "炸弹架",
        "text": "此模型每次结束常规移动时，你可以选择一个在该移动中被它穿过的敌方单位，掷六个 D6：每个 3+，该单位遭受 1 致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bomb Rack",
          "kind": "unique"
        }
      }
    ],
    "狂乱劫掠者恐虐狂战士": [
      {
        "id": "unique-恐虐徽记",
        "name": "恐虐徽记",
        "text": "在该单位摧毁了一个敌方单位时，您获得 1 点洒血点数。在进行一次**恐虐祝福掷骰**时：\n■ 为您拥有的每一点洒血点数掷额外一枚 D6。\n■ 随后，您失去自己所有的洒血点数。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "恐虐徽记",
          "kind": "unique"
        }
      },
      {
        "id": "unique-血涌-每个单位-每回合限一次",
        "name": "血涌（每个单位，每回合限一次）",
        "text": "在您对手的射击阶段中，当一个敌方单位进行射击后，如果该单位**不处于交战状态**，并且该单位的一个模型被那些攻击**摧毁**，该单位可以进行一次最多 D6\"+2 的**迸发移动**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "血涌（每个单位，每回合限一次）",
          "kind": "unique"
        }
      }
    ],
    "狂乱劫掠者行刑大师": [
      {
        "id": "unique-强者颅骨",
        "name": "强者颅骨",
        "text": "■ 该模型针对一个**角色**单位进行的近战攻击可以：\n■ 重掷**命中掷骰**。\n■ 重掷**致伤掷骰**。\n■ 在该单位摧毁一个**角色**模型时，您获得 1CP。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "hit-reroll",
            "mode": "failed",
            "phase": "melee"
          },
          {
            "type": "wound-reroll",
            "mode": "failed",
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "强者颅骨",
          "kind": "unique"
        }
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **狂乱劫掠者恐虐狂战士**",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "unique"
        }
      }
    ],
    "狂乱劫掠者裂伤者": [
      {
        "id": "unique-恐虐徽记",
        "name": "恐虐徽记",
        "text": "在该单位摧毁了一个敌方单位时，您获得 1 点洒血点数。在进行一次**恐虐祝福掷骰**时：\n■ 为您拥有的每一点洒血点数掷额外一枚 D6。\n■ 随后，您失去自己所有的洒血点数。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "恐虐徽记",
          "kind": "unique"
        }
      },
      {
        "id": "unique-毁灭目标",
        "name": "毁灭目标",
        "text": "在您的指挥阶段结束时，如果该单位控制一个**目标**，那个**目标**被**占领**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "毁灭目标",
          "kind": "unique"
        }
      }
    ],
    "沃拉克，狂乱劫掠者领主": [
      {
        "id": "unique-杀戮之主",
        "name": "杀戮之主",
        "text": "当该模型位于另一个己方**狂乱劫掠者步兵**单位 3\" 内时，该单位拥有**独行特工**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "杀戮之主",
          "kind": "unique"
        }
      },
      {
        "id": "unique-指引杀戮",
        "name": "指引杀戮",
        "text": "（每支军队，每个战斗轮次限一次）在一个位于该模型 12\" 内的己方**狂乱劫掠者**单位被选择成为**计谋**的目标时，您可以使用本技能。若使用，那次计谋的消耗 -1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "指引杀戮",
          "kind": "unique"
        }
      },
      {
        "id": "unique-毁灭突袭",
        "name": "毁灭突袭",
        "text": "如果该单位在该回合中进行过**冲锋移动**，该单位的近战攻击拥有**[毁灭伤害]**。",
        "status": "计算支持（满足原文条件时勾选）",
        "controls": [
          {
            "id": "enabled",
            "type": "checkbox",
            "label": "满足原文条件并启用此技能"
          }
        ],
        "effects": [
          {
            "type": "devastating-wounds",
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "毁灭突袭",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
