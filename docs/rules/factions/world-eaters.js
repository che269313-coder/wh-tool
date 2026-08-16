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
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "某些模型的能力中列有「致命毁灭 x」。当此类模型被摧毁时，在将其移出场景前掷 1D6（若此模型为 **运输工具(Transport)**，在任何搭载模型下车前掷骰）。掷出 6 时，该模型 6\" 内每个单位承受「x」表示的灵能伤害数量（若此数字为随机数字，对每个 6\" 内的单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在「宣告战斗阵形」步骤中，如果单位中的每个模型都有此能力，可以将其置于预备队中，而不是在战场上展开。如此做的话，在你的某个移动阶段的「增援」步骤中，可以在战场上任何距离所有敌方模型超过8\"的水平距离处展开此单位。\n\n如果具有深入打击能力的单位从战略预备队出现，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力中的任何一种来展开该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
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
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣布战场阵型阶段，若此单位内的每个模型都具有此能力，你可以将其放入后备队（Reserve）而非放在战场上。若你这样做，在你的移动阶段其中一个增援步骤中，你可以将此单位放置在战场上的任何地点，该地点距离所有敌军模型都超过8\"水平距离。\n\n如果具有深入打击能力的单位来自战略后备队，则控制者可以选择将该单位按照战略后备队规则或使用深入打击能力来放置。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "于宣告战阵步骤时，若此单位中的每个模型都具有此能力，你可以将其设置在后备中，而非设置在战场上。若你如此做，在你的某个移动阶段的增援步骤中，你可以将此单位设置在战场上任何距离所有敌方模型水平距离超过8\"的位置。\n\n若具有深入打击能力的单位从战略预备队增援到场，控制该单位的玩家可以选择使用战略预备队规则或深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "某些模型能力栏中会列有「致命毁灭 x」。当这样的模型被摧毁时，在将其从战场移除前掷一颗 D6（如果该模型为 **运输工具(Transport)**，则在任何搭乘单位下车前掷骰）。若掷出 6，该模型周围 6\" 内的每个单位各承受「x」所示数量的灵能伤害（若此为随机数字，则对周围 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣言战阵形步骤中，如果一个单位中的每个模型都具备此能力，你可以将其放入预备队而不是在战场上部署。如果你这样做，在你移动阶段的增援步骤中，你可以在战场上任何距离所有敌方模型超过 8\" 的地方部署此单位。\n\n如果具备深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来部署该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
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
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "某些模型能力栏中会列有「致命毁灭 x」。当这样的模型被摧毁时，在将其从战场移除前掷一颗 D6（如果该模型为 **运输工具(Transport)**，则在任何搭乘单位下车前掷骰）。若掷出 6，该模型周围 6\" 内的每个单位各承受「x」所示数量的灵能伤害（若此为随机数字，则对周围 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "某些模型的能力上列有「致命破灭 x」。当此类模型被摧毁时，在将其移出游戏前掷一个 D6（若此模型为 **运输工具(Transport)**，则于任何乘载模型下车前掷骰）。在掷出 6 时，距离该模型 6\" 内的每个单位承受数量为「x」的道德创伤（若此为随机数值，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "某些模型的能力上列有「致命破灭 x」。当此类模型被摧毁时，在将其移出游戏前掷一个 D6（若此模型为 **运输工具(Transport)**，则于任何乘载模型下车前掷骰）。在掷出 6 时，距离该模型 6\" 内的每个单位承受数量为「x」的道德创伤（若此为随机数值，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "某些模型的能力上列有「致命破灭 x」。当此类模型被摧毁时，在将其移出游戏前掷一个 D6（若此模型为 **运输工具(Transport)**，则于任何乘载模型下车前掷骰）。在掷出 6 时，距离该模型 6\" 内的每个单位承受数量为「x」的道德创伤（若此为随机数值，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "core-firing-deck-2",
        "name": "开火口2",
        "text": "某些 **运输工具(Transport)** 模型的能力栏中列有「射击甲板 x」。每当选择此类模型在射击阶段进行射击时，你可以选择至多「x」个位于其中的已搭乘模型，其单位在此阶段尚未进行过射击。然后，对于每个选定的已搭乘模型，你可以选择该已搭乘模型配备的一件远程武器（不包括具有 **[ONE SHOT]** 能力的武器）。在该 **运输工具(Transport)** 模型完成所有攻击前，它视为除其他武器外，还配备了你所选择的所有武器。直到阶段结束，那些选定的模型所属单位无法进行射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Firing Deck 2",
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
        "id": "core-feel-no-pain-5",
        "name": "不知疼痛5+",
        "text": "部份模型能力中列有「不觉疼痛 x+」。此模型每次承受伤害并即将失去一个伤口时（包括因灵能伤害而失去的伤口），掷一个D6：若结果大于等于「x」所示的数字，该伤口则被忽略且不会失去。若一个模型具有多个不觉疼痛能力，你每次该模型承受伤害并即将失去一个伤口时，只能使用其中一个能力。",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "fnp",
            "threshold": 5
          }
        ],
        "source": {
          "englishName": "Feel No Pain 5+",
          "kind": "core"
        }
      },
      {
        "id": "core-scouts-8",
        "name": "斥候8",
        "text": "某些单位的能力中列有「斥候 x\"」。如果一个单位中的所有模型都具有此能力，那麽在第一战斗回合开始时，在第一回合开始之前，它可以进行一次普通移动，距离最多为 x\"，如同它是你的移动阶段一样——任何此类单位开始战斗时搭乘的 **专用运输工具(Dedicated Transport)** 模型也可以（前提是只有具有此能力的模型搭乘于该 **专用运输工具(Dedicated Transport)** 模型中）。使用此能力移动的单位必须结束该移动时距离所有敌军模型超过9\"。如果双方都有可以执行此操作的单位，进行第一回合的玩家先移动他们的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 8\"",
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
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在「宣告战斗阵型」步骤中，若一个单位中的每个模型都有此能力，你可将其放入后备而非放在战场上。若你如此做，你可在你的移动阶段「增援」步骤中，将此单位放置在战场上任何距离所有敌方模型超过8\"的位置。\n\n若一个具有「深入打击」能力的单位从战略预备队抵达，控制该单位的玩家可选择该单位是使用战略预备队规则或使用「深入打击」能力进行设置。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "某些模型的能力中列有「致命毁灭 x」。当该模型被摧毁时，在将其移出场地前掷一次 D6（若该模型为 **运输工具(Transport)**，则在任何登乘模型下车前掷骰）。若掷出 6，则该模型 6\" 范围内的每支敌军单位各受到「x」标示数量的致命伤（若此数值为随机，则须为 6\" 范围内的每支单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "部分模型的能力栏列有「致命破灭 x」。当此类模型被消灭时，在将其从游戏中移除前掷一次 D6（若此模型为 **运输工具(Transport)单位**，应在乘客下车前掷骰）。掷出 6 时，该模型 6\" 内的每个单位受到「x」所代表数量的致命伤（若此数量为随机值，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在「宣布战阵」阶段，如果一个单位中的每个模型都具有此能力，你可以将其设定在预备队中而不是在战场上设定。如果你这样做，在你的移动阶段之一的「增援」阶段中，你可以在战场上任何距离所有敌方模型横向超过8\"的地方设定此单位。\n\n如果具有「深入打击」能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用「深入打击」能力来设定该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
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
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "某些模型能力栏中会列有「致命毁灭 x」。当这样的模型被摧毁时，在将其从战场移除前掷一颗 D6（如果该模型为 **运输工具(Transport)**，则在任何搭乘单位下车前掷骰）。若掷出 6，该模型周围 6\" 内的每个单位各承受「x」所示数量的灵能伤害（若此为随机数字，则对周围 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-scouts-6",
        "name": "斥候6",
        "text": "部分单位的能力中会标注「斥候 x\"」。若一个单位中的所有模型都具有此能力，则在第一战斗回合开始时、第一轮开始前，该单位可进行一次普通移动，移动距离最多 x\"，如同你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型（该单位在开始战斗时已搭乘其内）也可以如此移动（前提是只有具有此能力的模型搭乘该**专用运输工具(Dedicated Transport)**模型）。使用此能力移动的单位必须以水平距离超过 9\" 结束该移动，远离所有敌方模型。若双方玩家都有可进行此操作的单位，率先执行首轮的玩家优先移动其单位。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在「宣布战斗队形」阶段，若此单位内的每个模型都拥有此能力，你可以将其放入预备队而非在战场上配置。若你如此做，在你其中一个「移动阶段」的「增援」步骤，你可以在距所有敌方模型水平距离超过8\"的战场任何位置配置此单位。\n\n若拥有「深入打击」能力的单位从「战略预备队」抵达，控制该单位的玩家可选择使用「战略预备队」规则或「深入打击」能力来配置该单位。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在「宣告战斗阵型」步骤中，若一个单位中的每个模型都有此能力，你可将其放入后备而非放在战场上。若你如此做，你可在你的移动阶段「增援」步骤中，将此单位放置在战场上任何距离所有敌方模型超过8\"的位置。\n\n若一个具有「深入打击」能力的单位从战略预备队抵达，控制该单位的玩家可选择该单位是使用战略预备队规则或使用「深入打击」能力进行设置。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "某些模型的能力栏中列有「致命破灭 x」。当此类模型被摧毁时，在将其移出游戏前掷一个 D6（如果该模型为 **运输工具(Transport)**，则在任何搭乘模型下车前掷骰）。掷出 6 时，该模型 6\" 内的每个单位承受 x 个由「致命破灭」标示的致命伤（如果是随机伤害，对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-infiltrators",
        "name": "渗透",
        "text": "部署期间，若此单位中的每个模型都具有此能力，则当你部署它时，它可以被部署在战场上距敌方部署区和所有敌方模型都超过 8\" 水平距离的任何位置。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-1",
        "name": "致命破灭D1",
        "text": "部分模型的能力中有「致命破灭 x」。当该模型被摧毁时，于将其移除出场前掷一次 D6（若该模型为 **运输工具(Transport)**，则于任何搭载模型下车前掷骰）。掷骰结果为 6 时，该模型 6\" 范围内的每支军队各承受「x」数量的致命伤（若数值为随机，则针对 6\" 范围内的每支军队分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "某些模型在其能力中列有「致命破灭 x」。当这样的模型被摧毁时，在将其移出游戏前掷一次 D6（如果这样的模型是**运输工具(Transport)**，则在任何搭乘的模型下车前掷骰）。掷骰结果为 6 时，该模型 6\" 范围内的每支单位承受数量由「x」表示的致命伤（如果这是随机数字，则为 6\" 范围内的每支单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "core-hover",
        "name": "悬浮",
        "text": "某些 **飞行器(Aircraft)** 模型的能力中列有「悬停」。当你被指示宣告战斗队形时，在做任何其他事之前，你必须先宣告你的军队中哪些拥有此能力的模型将处于悬停模式。如果模型处于悬停模式，则直到战役结束，其移动特征改为 20\"，它失去 **飞行器(Aircraft)** 关键字且失去所有与作为 **飞行器(Aircraft)** 模型相关联的规则。处于悬停模式的模型不会在战役开始时进入预备队，但你可以选择按照正常规则将它们放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hover",
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
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位在其资料表上列有「领导者」。这类 **角色(Character)** 单位被称为领导者，它们可以领导的单位（称为护卫单位）列在其资料表上。在「宣布战阵编成」步骤期间，对于军队中的每个领导者，如果军队还包括该领导者的一个或多个护卫单位，你可以选择其中一个护卫单位。该领导者将在战斗期间依附于该护卫单位，并被称为领导该单位。每个护卫单位只能有一个领导者依附于它。\n\n当护卫单位包含领导者时，它被称为附着单位，除了在单位被摧毁时触发的规则外，就所有规则目的而言，它被视为一个单位。每次攻击针对附着单位时，直到攻击单位已解决其所有攻击为止，你必须使用该单位中护卫模型的韧性特征，即使该单位中的领导者具有不同的韧性特征。每次攻击成功对附着单位造成伤害时，该攻击无法分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已有攻击分配给它。一旦附着单位中最后一个护卫模型被摧毁，针对该单位已尚未分配的任何攻击随后可分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位中的最后一个模型被摧毁时，作为该附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它变成一个独立单位，具有其原始起始数量。如果这发生于攻击结果，则在攻击单位已解决其所有攻击后，它们将变成独立单位。\n\n每次依附于护卫单位的 **角色(Character)** 单位中的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位依附时，该附着单位的护卫单位不再是附着单位的一部分。它变成一个独立单位，具有其原始起始数量。如果这发生于攻击结果，则在攻击单位已解决其所有攻击后，它们将变成独立单位。\n\n每次附着单位的一部分单位被摧毁时，除非该单位在其自身资料表上具有这些关键词，否则它对构成该附着单位的任何其他单位没有该关键词，以用于任何在该单位被摧毁时触发的规则。\n\n***示例：** 如果你只摧毁作为附着单位一部分的护卫单位，你并未摧毁 **角色(Character)** 单位。如果你只摧毁作为附着单位一部分的 **角色(Character)** 单位，或如果你摧毁整个附着单位，你已摧毁一个 **角色(Character)** 单位。*",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d6-2",
        "name": "致命破灭D6+2",
        "text": "部分模型的能力中列有「致命破灭 x」。当此类模型被摧毁时，在将其移出游戏前掷一次 D6（如该模型为 **运输工具(Transport)**，则在任何登舰模型下车前掷骰）。掷骰结果为 6 时，该模型 6\" 范围内的各个敌军单位各自承受「x」所表示数量的灵能伤害（如该数值为随机数，则对 6\" 范围内的各个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的数据表上列有「领袖」。此类 **角色(Character)** 单位被称为领袖，它们能够率领的单位（称为其护卫单位）列在其数据表上。在宣告战斗阵型步骤中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在整场战役中附属于该护卫单位，并被称为领导该单位。每个护卫单位最多只能有一个领袖附属。\n\n当护卫单位包含一个领袖时，它被称为附属单位，除了由单位被摧毁时触发的规则外，就所有规则目的而言，它被视为单一单位。每当一次攻击针对附属单位时，直到进攻单位已解决其所有攻击为止，你必须使用该单位中护卫模型的韧性特征，即使该单位中的领袖具有不同的韧性特征。每当一次攻击成功伤害附属单位时，该攻击不能配置到该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已损失一个或多个伤口，或该阶段已有攻击配置到它。一旦附属单位中的最后一个护卫模型被摧毁，任何尚未配置到该单位的攻击随后可配置到该单位中的 **角色(Character)** 模型。\n\n每当护卫单位中的最后一个模型被摧毁时，作为该附属单位的一部分的每个 **角色(Character)** 单位不再是附属单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这发生在一次攻击中，则在进攻单位解决其所有攻击后，它们变成单独的单位。\n\n每当附属于护卫单位的 **角色(Character)** 单位中的最后一个模型被摧毁，且没有另一个附属的 **角色(Character)** 单位时，该附属单位的护卫单位不再是附属单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这发生在一次攻击中，则在进攻单位解决其所有攻击后，它们变成单独的单位。\n\n每当构成附属单位的一个单位被摧毁时，除非该单位在其自身数据表上具有那些关键字，否则它不具有构成该附属单位的任何其他单位的关键字，用于在该单位被摧毁时触发的任何规则。\n\n***例子：** 如果你只摧毁了作为附属单位一部分的护卫单位，你没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为附属单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个附属单位，你摧毁了一个 **角色(Character)** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "于宣告战阵步骤时，若此单位中的每个模型都具有此能力，你可以将其设置在后备中，而非设置在战场上。若你如此做，在你的某个移动阶段的增援步骤中，你可以将此单位设置在战场上任何距离所有敌方模型水平距离超过8\"的位置。\n\n若具有深入打击能力的单位从战略预备队增援到场，控制该单位的玩家可以选择使用战略预备队规则或深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "core-scouts-6",
        "name": "斥候6",
        "text": "部分单位的能力中会标注「斥候 x\"」。若一个单位中的所有模型都具有此能力，则在第一战斗回合开始时、第一轮开始前，该单位可进行一次普通移动，移动距离最多 x\"，如同你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型（该单位在开始战斗时已搭乘其内）也可以如此移动（前提是只有具有此能力的模型搭乘该**专用运输工具(Dedicated Transport)**模型）。使用此能力移动的单位必须以水平距离超过 9\" 结束该移动，远离所有敌方模型。若双方玩家都有可进行此操作的单位，率先执行首轮的玩家优先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 6\"",
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
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的数据表上列有「领导者」。这类 **角色(Character)** 单位被称为领导者，牠们能带领的单位（称为随从单位）列在其数据表上。在宣告战阵步骤中，对于你军队中的每位领导者，如果你的军队也包含该领导者的一个或多个随从单位，你可以选择其中一个随从单位。该领导者将在整场战斗期间附着于该随从单位上，并被称为领导该单位。每个随从单位最多只能有一位领导者附着于其上。\n\n当随从单位包含一位领导者时，该单位被称为附着单位，除了单位被摧毁时触发的规则外，它在所有规则目的上都被视为单一单位。每当一次攻击以附着单位为目标时，直到发动攻击的单位已解决其所有攻击为止，你必须使用该单位中随从模型的韧性特性，即使该单位中的领导者有不同的韧性特性也是如此。每当一次攻击成功对附着单位造成伤害时，该攻击无法分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或更多伤口或已在此阶段分配过攻击。一旦附着单位中最后一个随从模型被摧毁，针对该单位尚未分配的任何攻击随后可被分配给该单位中的 **角色(Character)** 模型。\n\n每当随从单位中最后一个模型被摧毁时，该附着单位的每个 **角色(Character)** 单位都不再是附着单位的一部分。它成为一个独立单位，具有其原始起始兵力。如果这是由于攻击导致，则它们在发动攻击的单位解决其所有攻击之后才成为独立单位。\n\n每当附着于随从单位的 **角色(Character)** 单位中最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该附着单位的随从单位不再是附着单位的一部分。它成为一个独立单位，具有其原始起始兵力。如果这是由于攻击导致，则它们在发动攻击的单位解决其所有攻击之后才成为独立单位。\n\n每当附着单位的一部分单位被摧毁时，除非它在其自身数据表上具有这些关键字，否则它不具有构成该附着单位的任何其他单位的关键字，且适用于单位被摧毁时触发的任何规则。\n\n***例子：如果你只摧毁了作为附着单位一部分的随从单位，你还没有摧毁 **角色** 单位。如果你只摧毁了作为附着单位一部分的 **角色** 单位，或者如果你摧毁了整个附着单位，你已摧毁一个 **角色** 单位。*",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-leader",
        "name": "领袖",
        "text": "部分 **角色(Character)** 单位的资料表上列有「领袖」。这样的 **角色(Character)** 单位被称为领袖，它们能够领导的单位（称为护卫单位）会在其资料表上列出。在「宣布战斗阵容」步骤期间，对于你军队中的每个领袖，如果你的军队也包含一个或多个该领袖的护卫单位，你可以选择其中一个护卫单位。该领袖将在整场战斗期间附着于该护卫单位，并被称为领导该单位。每个护卫单位最多只能有一个领袖附着。\n\n当护卫单位包含领袖时，该单位被称为「附着单位」，除了触发单位被摧毁时的规则外，在所有规则用途上都被视为单一单位。每当攻击针对附着单位时，直到攻击单位结束其所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每当攻击对附着单位造成成功致伤时，该攻击不能配置给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配攻击。一旦附着单位中最后的护卫模型被摧毁，针对该单位的任何尚未分配的攻击可随后分配给该单位中的 **角色(Character)** 模型。\n\n每当护卫单位中的最后一个模型被摧毁时，作为该附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它成为一个独立单位，具有其原始初始兵力。如果这发生在攻击期间，攻击单位结束所有攻击后它们才成为独立单位。\n\n每当附着于护卫单位的 **角色(Character)** 单位中的最后一个模型被摧毁，且没有其他 **角色(Character)** 单位附着时，该附着单位的护卫单位不再是附着单位的一部分。它成为一个独立单位，具有其原始初始兵力。如果这发生在攻击期间，攻击单位结束所有攻击后它们才成为独立单位。\n\n每当组成附着单位的单位被摧毁时，除非它自身资料表上具有这些关键字，否则它不会具有组成该附着单位的任何其他单位的关键字，用于任何在该单位被摧毁时触发的规则。\n\n***范例：** 如果你只摧毁附着单位的护卫单位，你没有摧毁 **角色(Character)** 单位。如果你只摧毁附着单位的 **角色(Character)** 单位，或摧毁整个附着单位，你已摧毁一个 **角色(Character)** 单位。*",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "某些模型的能力栏中列有「致命破灭 x」。当此类模型被摧毁时，在将其移出游戏前掷一个 D6（如果该模型为 **运输工具(Transport)**，则在任何搭乘模型下车前掷骰）。掷出 6 时，该模型 6\" 内的每个单位承受 x 个由「致命破灭」标示的致命伤（如果是随机伤害，对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
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
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "部分模型的能力中列有「毁灭性决心 x」。当此类模型被摧毁时，在将其移出游戏前掷一次 D6（若此模型为 **运输工具(Transport)单位**，则在任何乘坐单位下车前掷骰）。掷骰结果为 6 时，距该模型 6\" 内的每个单位各承受「x」所表示数量的致命伤（若此为随机数字，则对 6\" 内的每个单位各自分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的数据卡上列有「领袖」。这些 **角色(Character)** 单位被称为领袖，它们能够领导的单位被称为其护卫单位，并在其数据卡上列出。在宣布战斗阵型阶段，对于你军队中的每位领袖，如果你的军队还包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战斗期间附着到该护卫单位上，并被称为领导该单位。每个护卫单位最多只能有一位领袖附着。\n\n当护卫单位包含一位领袖时，它被称为附着单位，除了被摧毁时触发的规则外，在所有规则目的上它被视为单一单位。每当攻击以附着单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特征，即使该单位中的领袖具有不同的韧性特征。每当攻击成功伤害附着单位时，该攻击不能分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在本阶段已经分配了攻击。当附着单位中最后一个护卫模型被摧毁后，针对该单位的任何尚未分配的攻击可以被分配给该单位中的 **角色(Character)** 模型。\n\n每当护卫单位中最后一个模型被摧毁时，作为该附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它变成一个独立单位，具有其原始起始兵力。如果这是因为一次攻击而发生的，它们在攻击单位解决完所有攻击后变成独立单位。\n\n每当附着到护卫单位的 **角色(Character)** 单位中最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该附着单位的护卫单位不再是附着单位的一部分。它变成一个独立单位，具有其原始起始兵力。如果这是因为一次攻击而发生的，它们在攻击单位解决完所有攻击后变成独立单位。\n\n每当作为附着单位一部分的单位被摧毁时，除非它在自己的数据卡上具有这些关键词，否则它不具有构成该附着单位的任何其他单位的关键词，用于任何在该单位被摧毁时触发的规则。\n\n***例：如果你只摧毁了作为附着单位一部分的护卫单位，你还没有摧毁一个 **角色** 单位。如果你只摧毁了作为附着单位一部分的 **角色** 单位，或者你摧毁了整个附着单位，你摧毁了一个 **角色** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
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
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "部分模型具有「致命破灭 x」能力。当此类模型被摧毁时，在将其从战场移除前掷一次 D6（若此模型为 **运输工具(Transport)**，则在任何已搭乘的模型下车前掷骰）。若结果为 6，则该模型 6\" 内的每个单位会受到「x」所标记数量的致命伤（若为随机数量，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣布战斗阵型步骤中，如果一个单位中的每个模型都具有此能力，你可以将其放入增援中，而非在战场上布置。如果你这样做，在你的一个移动阶段的增援步骤中，你可以在战场上的任何位置布置此单位，该位置距所有敌方模型在水平方向上超过 8\"。\n\n如果具有深入打击能力的单位来自战略预备队，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来布置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
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
        "id": "core-fly",
        "name": "飞行",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fly",
          "kind": "core"
        }
      },
      {
        "id": "core-aircraft",
        "name": "飞行器",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aircraft",
          "kind": "core"
        }
      },
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "部分模型具有「致命破灭 x」能力。当此类模型被摧毁时，在将其从战场移除前掷一次 D6（若此模型为 **运输工具(Transport)**，则在任何已搭乘的模型下车前掷骰）。若结果为 6，则该模型 6\" 内的每个单位会受到「x」所标记数量的致命伤（若为随机数量，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "core-blessings-of-khorne",
        "name": "恐虐赐福",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blessings of Khorne",
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
        "id": "core-fly",
        "name": "飞行",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fly",
          "kind": "core"
        }
      },
      {
        "id": "core-aircraft",
        "name": "飞行器",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aircraft",
          "kind": "core"
        }
      },
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "部分模型具有「致命破灭 x」能力。当此类模型被摧毁时，在将其从战场移除前掷一次 D6（若此模型为 **运输工具(Transport)**，则在任何已搭乘的模型下车前掷骰）。若结果为 6，则该模型 6\" 内的每个单位会受到「x」所标记数量的致命伤（若为随机数量，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "core-blessings-of-khorne",
        "name": "恐虐赐福",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blessings of Khorne",
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
