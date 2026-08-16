/* Generated source-text rule package for emperors-children. */
(function (root) {
  root["WarhammerWebsiteRules_emperors_children"] = {
  "factionRules": [
    {
      "id": "emperors-children.army-rule",
      "name": "嗜欲恶徒",
      "englishName": "Thrill Seekers",
      "text": "寻求刺激者\n\n你军队中具有此能力的单位，即使在前进或后撤的回合仍可进行射击并宣告冲锋，但这麽做时须遵守下列限制：\n\n■ 不可选择回合开始时位于其交战范围内的单位作为目标。\n■ 不可选择本阶段中已被其他单位选为冲锋或攻击目标的单位作为目标。\n\n放纵契约\n\n招募军队时，除非另有明文允许，否则不可选放纵军团作为军队阵营。",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": [],
      "source": {
        "englishName": "Thrill Seekers",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "混沌兰德掠袭者": [
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
        "id": "unique-assault-ramp",
        "name": "突击跳板",
        "text": "此模型进行正常移动后，每次有单位下船，该单位在本回合内仍可宣言冲锋。",
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
        "text": "该模型能够搭载 14 个帝皇之子步兵模型。每个终结者和 FLAWLESS BLADE 模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "犀牛运兵车": [
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
        "id": "core-firing-deck-2",
        "name": "开火口2",
        "text": "某些 **运输工具(Transport)** 模型的能力中列有「射击甲板 x」。每当这类模型在射击阶段被选中射击时，你可以选择最多 x 个搭乘其内的模型，其所属的单位本阶段尚未射击。然后，对于这些搭乘模型中的每一个，你可以选择该搭乘模型配备的一件远程武器（不包括具有 **[单发]** 能力的武器）。在那个 **运输工具(Transport)** 模型完成其所有攻击之前，它视为配备有所有你以此方式选择的武器，除其他武器外。直到阶段末，那些被选中的模型所属的单位不适格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Firing Deck 2",
          "kind": "core"
        }
      },
      {
        "id": "unique-assault-vehicle",
        "name": "突击载具",
        "text": "此 **运输工具(Transport)** 前进后，单位可从中下车。如此下车的单位视为已进行常规移动，且该回合无法宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Assault Vehicle",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 12 个帝皇之子步兵模型 (不含终结者和 FLAWLESS BLADE 模型)。",
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
        "text": "有些模型能力中列有「不觉疼痛 x+」。每当具有此能力的模型受到伤害并因此将失去一个伤值（包括因灵能伤害而失去的伤值）时，掷一次 D6：若结果大于或等于「x」所表示的数字，该伤值被无视且不会失去。若一个模型拥有多个不觉疼痛能力，每当该模型受到伤害并因此将失去一个伤值时，你只能使用其中一个能力。",
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
        "id": "unique-scuttling-horrors",
        "name": "疾行骇物",
        "text": "每回合一次，当敌方单位在距此单位 9\" 内结束一次正常、前进或后撤移动时，此单位可以进行一次至多 6\" 的正常移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scuttling Horrors",
          "kind": "unique"
        }
      }
    ],
    "混沌终结者": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战阵形步骤中，若此单位中的每个模型都具有此能力，你可改为将其置于预备中，而非在战场上设置。若你如此做，在你的移动阶段的增援步骤中，你可在战场上任何距离所有敌方模型水平距离超过8\"的位置设置此单位。\n\n若具有深入打击能力的单位从战略预备中投入，控制此单位的玩家可选择该单位使用战略预备规则设置，或使用深入打击能力设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-lethal-obsession",
        "name": "致命狂迷",
        "text": "在你的射击阶段，每当此单位被选择射击时，若它进行一或多次远程攻击且所有攻击都锁定同一支敌方单位，则直到回合结束，每当此单位宣告冲锋时，若该敌方单位为冲锋目标之一，你可以重骰冲锋骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lethal Obsession",
          "kind": "unique"
        }
      }
    ],
    "色孽魅魔": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战阵形步骤中，若此单位中的每个模型都具有此能力，你可改为将其置于预备中，而非在战场上设置。若你如此做，在你的移动阶段的增援步骤中，你可在战场上任何距离所有敌方模型水平距离超过8\"的位置设置此单位。\n\n若具有深入打击能力的单位从战略预备中投入，控制此单位的玩家可选择该单位使用战略预备规则设置，或使用深入打击能力设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "core-fights-first",
        "name": "先攻",
        "text": "拥有此能力的单位，若有资格战斗，且该单位中的所有模型都拥有此能力，则在先制攻击步骤中进行战斗。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fights First",
          "kind": "core"
        }
      },
      {
        "id": "unique-horrifying-beauty",
        "name": "可怖之美",
        "text": "在战斗阶段开始时，距离你的军队中一个或多个具有此能力的单位交战范围内的每个敌方单位必须进行战斗震撼测试，若该敌方单位低于半数，则结果减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Horrifying Beauty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "欲魔圣印",
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
    "色孽恶魔亲王": [
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
        "id": "unique-lord-of-excess",
        "name": "纵欲领主",
        "text": "当此模型位于一或多支友军 **色孽(Slaanesh)步兵(Infantry)** 单位 3\" 内时，此模型拥有「独行特工」能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of Excess",
          "kind": "unique"
        }
      },
      {
        "id": "unique-excessive-vigour",
        "name": "过度活力",
        "text": "当一支友军 **色孽(Slaanesh)** 单位位于此模型 6\" 内时，若该单位本回合进行过冲锋移动，则将该单位中模型所配备近战武器的护甲穿透特性改善 1。",
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
            "type": "weapon-ap-modifier",
            "value": 1,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Excessive Vigour",
          "kind": "unique"
        }
      },
      {
        "id": "unique-ecstatic-death",
        "name": "狂喜之死",
        "text": "若此模型被近战攻击摧毁，且本阶段尚未进行过战斗，掷一颗 D6：2+ 时，不将其移出战场。此模型可在攻击单位完成攻击后进行战斗，随后被移出战场。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ecstatic Death",
          "kind": "unique"
        }
      }
    ],
    "有翼色孽恶魔亲王": [
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
        "text": "在宣示战阵形步骤中，若此单位中的每个模型都具有此能力，你可改为将其置于预备中，而非在战场上设置。若你如此做，在你的移动阶段的增援步骤中，你可在战场上任何距离所有敌方模型水平距离超过8\"的位置设置此单位。\n\n若具有深入打击能力的单位从战略预备中投入，控制此单位的玩家可选择该单位使用战略预备规则设置，或使用深入打击能力设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-daemonic-destruction",
        "name": "毁灭魔能",
        "text": "此模型每次结束冲锋移动时，在其交战范围内选择一个敌方单位，并为该模型每个剩余伤害值掷一次D6：每掷出4+，该敌方单位承受1点致命伤（最多6点致命伤）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Destruction",
          "kind": "unique"
        }
      },
      {
        "id": "unique-stimulated-by-pain",
        "name": "痛觉刺激",
        "text": "每当一次攻击被分配给此模型时，将该次攻击的伤害特性 -1。",
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
            "type": "incoming-damage-modifier",
            "value": -1
          }
        ],
        "source": {
          "englishName": "Stimulated by Pain",
          "kind": "unique"
        }
      }
    ],
    "色孽狂兽": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战阵形步骤中，若此单位中的每个模型都具有此能力，你可改为将其置于预备中，而非在战场上设置。若你如此做，在你的移动阶段的增援步骤中，你可在战场上任何距离所有敌方模型水平距离超过8\"的位置设置此单位。\n\n若具有深入打击能力的单位从战略预备中投入，控制此单位的玩家可选择该单位使用战略预备规则设置，或使用深入打击能力设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-soporific-musk",
        "name": "催眠香瘴",
        "text": "敌军单位（**凶兽(Monster)**和**载具(Vehicle)**除外）位于你的军队中有此能力的一个或多个单位的交战范围内时，该敌军单位每次后撤时，其中的模型必须进行绝望逃脱测试。进行此测试时，若该敌军单位同时处于战动摇状态，则从每次绝望逃脱测试中减少1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Soporific Musk",
          "kind": "unique"
        }
      }
    ],
    "无瑕剑魔": [
      {
        "id": "unique-daemonic-patrons",
        "name": "邪魔恩主",
        "text": "每当此单位被选择进行战斗时，可以召唤恶魔庇主。若如此做，直到本阶段结束，每当此单位中的模型进行攻击时，未修正的受伤骰 3+ 即视为 Critical 致伤。在战斗阶段结束时，若此单位本阶段曾召唤恶魔庇主，且本阶段中此单位的攻击未摧毁任何敌方模型，则此单位中一个模型被摧毁。",
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
            "type": "wound-critical-threshold",
            "value": 3
          }
        ],
        "source": {
          "englishName": "Daemonic Patrons",
          "kind": "unique"
        }
      }
    ],
    "福格瑞姆，帝皇之子恶魔原体": [
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
        "text": "在宣示战阵形步骤中，若此单位中的每个模型都具有此能力，你可改为将其置于预备中，而非在战场上设置。若你如此做，在你的移动阶段的增援步骤中，你可在战场上任何距离所有敌方模型水平距离超过8\"的位置设置此单位。\n\n若具有深入打击能力的单位从战略预备中投入，控制此单位的玩家可选择该单位使用战略预备规则设置，或使用深入打击能力设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-daemonic-poisons",
        "name": "恶魔邪毒",
        "text": "在你的射击阶段与战斗阶段，此模型完成攻击后，选择一支被其中一次或多次攻击命中的敌方单位。直到战斗结束，该敌方单位处于中毒状态。在每位玩家的指挥阶段开始时，为战场上每支中毒的敌方单位各掷一颗 D6：4+ 时，该敌方单位受到 D3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Poisons",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemon-primarch-of-slaanesh",
        "name": "色孽恶魔原体",
        "text": "在你对手的指挥阶段开始时，从「色孽恶魔原体」区段中选择一项能力（见下）。直到你对手下一个指挥阶段开始前，此模型拥有该能力。\n\n**惑人形貌：** 每当一个模型进行一次以此模型为目标的攻击时，命中掷骰 -1。\n\n**恶魔疾速：** 此模型具有「先制攻击(Fights First)」能力。\n\n**迷魂催眠（光环）：** 当一个敌方单位在此模型 6\" 内时，每当该单位被选择后撤时，它必须进行一次领导力测试。若该测试失败，该单位此阶段必须改为保持静止。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemon Primarch of Slaanesh",
          "kind": "unique"
        }
      },
      {
        "id": "unique-serpentine",
        "name": "蛇行",
        "text": "每当此模型进行正常、前进或后撤移动时，它可以越过高度 4\" 或以下的地形区段。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Serpentine",
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
    "地狱飞龙": [
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
        "id": "core-hover",
        "name": "悬浮",
        "text": "部分 **飞行器(Aircraft)** 模型在其能力中列有「悬停」。当你被指示宣告战斗阵容时，首先必须宣告你的军队中哪些具有此能力的模型将处于悬停模式。若一个模型处于悬停模式，则直到战役结束，其移动特性变更为 20\"，失去 **飞行器(Aircraft)** 关键字，且失去所有与作为 **飞行器(Aircraft)** 模型相关的规则。处于悬停模式的模型不在增援中开始战役，但你可以选择按正常规则将其置入战略预备队。",
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
    "破戒者": [
      {
        "id": "core-scouts-6",
        "name": "斥候6",
        "text": "某些单位的能力栏中列有「斥候x\"」。若单位中每个模型都具有此能力，则在第一战斗回合开始时，在第一回合开始前，它可以进行一次常规移动，距离最多x\"，如同此为你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型亦可执行此动作，只要该单位在该**专用运输工具(Dedicated Transport)**模型内登载（条件是仅具有此能力的模型登载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须结束该移动时，距离所有敌军模型水平距离超过9\"。若双方玩家都有可执行此动作的单位，则进行第一回合的玩家先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-excessive-assault",
        "name": "纵欲突击",
        "text": "每当此单位中的模型以近战攻击锁定敌方单位时，重骰结果为 1 的受伤骰。若该敌方单位位于目标标记范围内，则改为可以重骰该受伤骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Excessive Assault",
          "kind": "unique"
        }
      },
      {
        "id": "unique-icon-of-excess",
        "name": "纵欲圣印",
        "text": "在你的射击阶段或近战阶段结束时，若持有者所在的单位于该阶段摧毁了一个或更多敌方单位，则持有者所在的单位进行一次领导力检定。若该检定通过，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Icon of Excess",
          "kind": "unique"
        }
      }
    ],
    "守密者": [
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
        "text": "在宣示战阵形步骤中，若此单位中的每个模型都具有此能力，你可改为将其置于预备中，而非在战场上设置。若你如此做，在你的移动阶段的增援步骤中，你可在战场上任何距离所有敌方模型水平距离超过8\"的位置设置此单位。\n\n若具有深入打击能力的单位从战略预备中投入，控制此单位的玩家可选择该单位使用战略预备规则设置，或使用深入打击能力设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-daemon-lord-of-slaanesh",
        "name": "色孽大魔(光环)",
        "text": "当有友军 **色孽(Slaanesh)恶魔军团(Legiones Daemonica)** 单位在此模型 6\" 内时，该单位中近战武器的护甲贯穿值提升 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemon Lord of Slaanesh",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mesmerising-form",
        "name": "迷人体态",
        "text": "每次攻击针对此模型时，从命中掷骰中减去 1。",
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
            "type": "incoming-hit-minus",
            "value": 1
          }
        ],
        "source": {
          "englishName": "Mesmerising Form",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shining-aegis",
        "name": "闪耀圣盾",
        "text": "持有者的防护(Sv)特性为 3+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shining Aegis",
          "kind": "unique"
        }
      }
    ],
    "极乐领主": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "部分 **角色(Character)** 单位在其数据卡上列有「领袖」。这样的 **角色(Character)** 单位被称为领袖，它们能领导的单位（称为其卫队单位）列在其数据卡上。在宣告战斗编队步骤中，对于你军队中的每位领袖，如果你的军队也包括该领袖的一个或多个卫队单位，你可以选择其中一个卫队单位。该领袖将在战斗期间附着到该卫队单位，并被称为领导该单位。每个卫队单位最多只能附着一位领袖。\n\n当卫队单位包含领袖时，它被称为附着单位，除了单位被摧毁时触发的规则外，在所有规则目的上被视为一个单位。每次攻击针对附着单位时，在攻击单位解决其所有攻击之前，你必须使用该单位中卫队模型的韧性特征，即使该单位中的领袖有不同的韧性特征。每次攻击成功对附着单位造成伤口时，该攻击不能分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已损失一个或多个伤口或已在本阶段分配了攻击。一旦附着单位中最后一个卫队模型被摧毁，任何已对该单位进行但尚未分配的攻击就可以分配给该单位中的 **角色(Character)** 模型。\n\n每次卫队单位中最后一个模型被摧毁时，作为该附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这是由于攻击而发生的，它们在攻击单位解决其所有攻击后变成单独的单位。\n\n每次附着到卫队单位的 **角色(Character)** 单位中最后一个模型被摧毁且没有其他附着的 **角色(Character)** 单位时，该附着单位的卫队单位不再是附着单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这是由于攻击而发生的，它们在攻击单位解决其所有攻击后变成单独的单位。\n\n每次摧毁作为附着单位一部分的单位时，除非它在自己的数据卡上具有这些关键字，否则它不具有组成该附着单位的任何其他单位的关键字，用于任何在单位被摧毁时触发的规则。\n\n***范例：如果你只摧毁作为附着单位一部分的卫队单位，你尚未摧毁 **CHARACTER** 单位。如果你只摧毁作为附着单位一部分的 **CHARACTER** 单位，或摧毁了整个附着单位，你已摧毁一个 **CHARACTER** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-perfectionists",
        "name": "完美主义者",
        "text": "当此模型在领导单位时，该单位中模型所配备的武器拥有 **[致命一击]** 能力。",
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
            "type": "lethal-hits",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Perfectionists",
          "kind": "unique"
        }
      },
      {
        "id": "unique-euphoric-strikes",
        "name": "狂笑突袭",
        "text": "每场战斗一次，在战斗阶段开始时，此模型可以使用此能力。若如此做，直到本阶段结束，此模型所配备近战武器的攻击次数特性 +3，并将那些武器的护甲穿透特性改善 1。",
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
            "type": "weapon-ap-modifier",
            "value": 1,
            "phase": "melee"
          },
          {
            "type": "attack-modifier",
            "value": 3,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Euphoric Strikes",
          "kind": "unique"
        }
      },
      {
        "id": "unique-lord-of-the-host",
        "name": "战帮之主",
        "text": "若此模型在宣告战斗编成步骤中附加于 EMPEROR’S CHILDREN BATTLELINE 单位,则此模型具有渗透(Infiltrators)与斥候6\"(Scouts 6\")能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of the Host",
          "kind": "unique"
        }
      }
    ],
    "爆音领主": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "部分 **角色(Character)** 单位在其数据卡上列有「领袖」。这样的 **角色(Character)** 单位被称为领袖，它们能领导的单位（称为其卫队单位）列在其数据卡上。在宣告战斗编队步骤中，对于你军队中的每位领袖，如果你的军队也包括该领袖的一个或多个卫队单位，你可以选择其中一个卫队单位。该领袖将在战斗期间附着到该卫队单位，并被称为领导该单位。每个卫队单位最多只能附着一位领袖。\n\n当卫队单位包含领袖时，它被称为附着单位，除了单位被摧毁时触发的规则外，在所有规则目的上被视为一个单位。每次攻击针对附着单位时，在攻击单位解决其所有攻击之前，你必须使用该单位中卫队模型的韧性特征，即使该单位中的领袖有不同的韧性特征。每次攻击成功对附着单位造成伤口时，该攻击不能分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已损失一个或多个伤口或已在本阶段分配了攻击。一旦附着单位中最后一个卫队模型被摧毁，任何已对该单位进行但尚未分配的攻击就可以分配给该单位中的 **角色(Character)** 模型。\n\n每次卫队单位中最后一个模型被摧毁时，作为该附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这是由于攻击而发生的，它们在攻击单位解决其所有攻击后变成单独的单位。\n\n每次附着到卫队单位的 **角色(Character)** 单位中最后一个模型被摧毁且没有其他附着的 **角色(Character)** 单位时，该附着单位的卫队单位不再是附着单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这是由于攻击而发生的，它们在攻击单位解决其所有攻击后变成单独的单位。\n\n每次摧毁作为附着单位一部分的单位时，除非它在自己的数据卡上具有这些关键字，否则它不具有组成该附着单位的任何其他单位的关键字，用于任何在单位被摧毁时触发的规则。\n\n***范例：如果你只摧毁作为附着单位一部分的卫队单位，你尚未摧毁 **CHARACTER** 单位。如果你只摧毁作为附着单位一部分的 **CHARACTER** 单位，或摧毁了整个附着单位，你已摧毁一个 **CHARACTER** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-obsessive-annunciation",
        "name": "强令宣告",
        "text": "当此模型在领导单位时，该单位中模型所配备的远程武器拥有 **[连击 1]** 能力。",
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
            "type": "sustained-hits",
            "value": 1,
            "phase": "ranged",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Obsessive Annunciation",
          "kind": "unique"
        }
      },
      {
        "id": "unique-doom-siren",
        "name": "毁灭汽笛",
        "text": "在你的射击阶段，此模型的单位射击后，选择一支被其中一次或多次攻击命中的敌方 **步兵(Infantry)** 单位并掷三颗 D6：每个 4+ 使该敌方单位受到 1 点致命伤。若敌方单位因此能力受到一或多点致命伤，则必须进行一次战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Doom Siren",
          "kind": "unique"
        }
      }
    ],
    "永恒者卢修斯": [
      {
        "id": "core-feel-no-pain-5",
        "name": "不知疼痛5+",
        "text": "有些模型能力中列有「不觉疼痛 x+」。每当具有此能力的模型受到伤害并因此将失去一个伤值（包括因灵能伤害而失去的伤值）时，掷一次 D6：若结果大于或等于「x」所表示的数字，该伤值被无视且不会失去。若一个模型拥有多个不觉疼痛能力，每当该模型受到伤害并因此将失去一个伤值时，你只能使用其中一个能力。",
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
        "id": "core-leader",
        "name": "领袖",
        "text": "部分 **角色(Character)** 单位在其数据卡上列有「领袖」。这样的 **角色(Character)** 单位被称为领袖，它们能领导的单位（称为其卫队单位）列在其数据卡上。在宣告战斗编队步骤中，对于你军队中的每位领袖，如果你的军队也包括该领袖的一个或多个卫队单位，你可以选择其中一个卫队单位。该领袖将在战斗期间附着到该卫队单位，并被称为领导该单位。每个卫队单位最多只能附着一位领袖。\n\n当卫队单位包含领袖时，它被称为附着单位，除了单位被摧毁时触发的规则外，在所有规则目的上被视为一个单位。每次攻击针对附着单位时，在攻击单位解决其所有攻击之前，你必须使用该单位中卫队模型的韧性特征，即使该单位中的领袖有不同的韧性特征。每次攻击成功对附着单位造成伤口时，该攻击不能分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已损失一个或多个伤口或已在本阶段分配了攻击。一旦附着单位中最后一个卫队模型被摧毁，任何已对该单位进行但尚未分配的攻击就可以分配给该单位中的 **角色(Character)** 模型。\n\n每次卫队单位中最后一个模型被摧毁时，作为该附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这是由于攻击而发生的，它们在攻击单位解决其所有攻击后变成单独的单位。\n\n每次附着到卫队单位的 **角色(Character)** 单位中最后一个模型被摧毁且没有其他附着的 **角色(Character)** 单位时，该附着单位的卫队单位不再是附着单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这是由于攻击而发生的，它们在攻击单位解决其所有攻击后变成单独的单位。\n\n每次摧毁作为附着单位一部分的单位时，除非它在自己的数据卡上具有这些关键字，否则它不具有组成该附着单位的任何其他单位的关键字，用于任何在单位被摧毁时触发的规则。\n\n***范例：如果你只摧毁作为附着单位一部分的卫队单位，你尚未摧毁 **CHARACTER** 单位。如果你只摧毁作为附着单位一部分的 **CHARACTER** 单位，或摧毁了整个附着单位，你已摧毁一个 **CHARACTER** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "除非此单位为附属单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lone Operative",
          "kind": "core"
        }
      },
      {
        "id": "unique-a-challenge-worthy-of-skill",
        "name": "堪试牛刀",
        "text": "每当此模型对 **角色、凶兽** 或 **机甲** 单位进行攻击时，你可以重骰命中骰，且可以重骰受伤骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "A Challenge Worthy of Skill",
          "kind": "unique"
        }
      },
      {
        "id": "unique-duellist-s-hubris",
        "name": "决斗者之傲",
        "text": "在战斗阶段开始时，若此模型未在领导单位，则直到本阶段结束，它拥有「先制攻击」能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Duellist’s Hubris",
          "kind": "unique"
        }
      }
    ],
    "重锤魔": [
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
        "id": "unique-glutton-for-punishment",
        "name": "降罚饕欲",
        "text": "每当此模型进行攻击时，若其当前力量低于起始兵力，命中骰 +1。若此模型同时低于半数兵力，则受伤骰亦 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Glutton for Punishment",
          "kind": "unique"
        }
      }
    ],
    "噪音战士": [
      {
        "id": "unique-terrifying-crescendo",
        "name": "悚惧强音",
        "text": "在你的射击阶段，此单位射击后，选择一支被其中一次或多次攻击命中的敌方单位。直到你下一个射击阶段开始前，每当为该敌方单位进行战斗震撼或领导力测试时，该测试 -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Terrifying Crescendo",
          "kind": "unique"
        }
      }
    ],
    "色孽寻觅者": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战阵形步骤中，若此单位中的每个模型都具有此能力，你可改为将其置于预备中，而非在战场上设置。若你如此做，在你的移动阶段的增援步骤中，你可在战场上任何距离所有敌方模型水平距离超过8\"的位置设置此单位。\n\n若具有深入打击能力的单位从战略预备中投入，控制此单位的玩家可选择该单位使用战略预备规则设置，或使用深入打击能力设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "core-scouts-9",
        "name": "斥候9",
        "text": "某些单位在其能力中列有「侦察x\"」。若单位中的每个模型都具备此能力，那麽在第一战斗回合开始时、第一轮开始前，该单位可进行一次高达x\"的正常移动，如同在你的移动阶段一样，该单位所乘载的任何**专用运输工具(Dedicated Transport)**模型亦可如此（前提是只有具备此能力的模型乘载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须在终结位置距离所有敌方模型横向超过9\"。如果双方玩家都有可执行此操作的单位，先手玩家优先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 9\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-unholy-speed",
        "name": "邪秽迅捷",
        "text": "你可重掷此单位进行的前进及冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unholy Speed",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "欲魔圣印",
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
    "污染者": [
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
        "id": "unique-scuttling-walker",
        "name": "疾行者",
        "text": "每次此单位进行普通、前进或后撤移动时，它可以穿过模型（不含 **泰坦** 模型）和地形特征。进行移动时，它可以在敌方模型的交战范围内移动，但该移动不能在敌方模型的交战范围内结束，且任何绝望逃脱检定自动通过。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scuttling Walker",
          "kind": "unique"
        }
      },
      {
        "id": "unique-revel-in-desecration",
        "name": "沉醉亵渎",
        "text": "每当此模型对未低于半数兵力的敌方单位进行攻击时，命中骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Revel in Desecration",
          "kind": "unique"
        }
      }
    ],
    "夏拉希.魔灾": [
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
        "text": "在宣示战阵形步骤中，若此单位中的每个模型都具有此能力，你可改为将其置于预备中，而非在战场上设置。若你如此做，在你的移动阶段的增援步骤中，你可在战场上任何距离所有敌方模型水平距离超过8\"的位置设置此单位。\n\n若具有深入打击能力的单位从战略预备中投入，控制此单位的玩家可选择该单位使用战略预备规则设置，或使用深入打击能力设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-no-prey-can-evade",
        "name": "无路可逃",
        "text": "可重掷此模型进行的前进和冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "No Prey Can Evade",
          "kind": "unique"
        }
      },
      {
        "id": "unique-monarch-of-the-hunt",
        "name": "狩猎魔君",
        "text": "在首个战斗回合开始时，选择一个敌方单位作为此模型的猎物。此模型每次对其猎物发动近战攻击时，可重掷命中掷骰，并可重掷致伤掷骰。此模型的猎物被摧毁时，选择一个新的敌方单位作为此模型的猎物。",
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
          "englishName": "Monarch of the Hunt",
          "kind": "unique"
        }
      }
    ],
    "混沌巫师": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "部分 **角色(Character)** 单位在其数据卡上列有「领袖」。这样的 **角色(Character)** 单位被称为领袖，它们能领导的单位（称为其卫队单位）列在其数据卡上。在宣告战斗编队步骤中，对于你军队中的每位领袖，如果你的军队也包括该领袖的一个或多个卫队单位，你可以选择其中一个卫队单位。该领袖将在战斗期间附着到该卫队单位，并被称为领导该单位。每个卫队单位最多只能附着一位领袖。\n\n当卫队单位包含领袖时，它被称为附着单位，除了单位被摧毁时触发的规则外，在所有规则目的上被视为一个单位。每次攻击针对附着单位时，在攻击单位解决其所有攻击之前，你必须使用该单位中卫队模型的韧性特征，即使该单位中的领袖有不同的韧性特征。每次攻击成功对附着单位造成伤口时，该攻击不能分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已损失一个或多个伤口或已在本阶段分配了攻击。一旦附着单位中最后一个卫队模型被摧毁，任何已对该单位进行但尚未分配的攻击就可以分配给该单位中的 **角色(Character)** 模型。\n\n每次卫队单位中最后一个模型被摧毁时，作为该附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这是由于攻击而发生的，它们在攻击单位解决其所有攻击后变成单独的单位。\n\n每次附着到卫队单位的 **角色(Character)** 单位中最后一个模型被摧毁且没有其他附着的 **角色(Character)** 单位时，该附着单位的卫队单位不再是附着单位的一部分。它变成一个单独的单位，具有其原始起始兵力。如果这是由于攻击而发生的，它们在攻击单位解决其所有攻击后变成单独的单位。\n\n每次摧毁作为附着单位一部分的单位时，除非它在自己的数据卡上具有这些关键字，否则它不具有组成该附着单位的任何其他单位的关键字，用于任何在单位被摧毁时触发的规则。\n\n***范例：如果你只摧毁作为附着单位一部分的卫队单位，你尚未摧毁 **CHARACTER** 单位。如果你只摧毁作为附着单位一部分的 **CHARACTER** 单位，或摧毁了整个附着单位，你已摧毁一个 **CHARACTER** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-warped-interference",
        "name": "邪能干涉（灵能）",
        "text": "当此模型在领导单位时，每当一次远程攻击锁定该单位时，其中的模型对该次攻击拥有掩护效益。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warped Interference",
          "kind": "unique"
        }
      },
      {
        "id": "unique-wracking-agonies",
        "name": "钻心痛楚（灵能）",
        "text": "在你的射击阶段，此模型射击后，选择一支被其「痛楚能量」的一或多次攻击命中的 **步兵(Infantry)** 单位。直到你下一回合开始前，该单位饱受折磨。当一支单位饱受折磨时，其移动特性 -2\"，且为其进行的冲锋骰 -2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Wracking Agonies",
          "kind": "unique"
        }
      }
    ],
    "施虐者": [
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
        "id": "unique-objective-defiled",
        "name": "亵渎目标",
        "text": "在你的指挥阶段结束时，若此单位位于你所控制的目标标记范围内，该目标标记持续由你控制，直到某阶段结束时你对手对该标记的控制等级高于你为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Objective Defiled",
          "kind": "unique"
        }
      },
      {
        "id": "unique-icon-of-excess",
        "name": "纵欲圣印",
        "text": "在你的射击阶段或近战阶段结束时，若持有者所在的单位于该阶段摧毁了一个或更多敌方单位，则持有者所在的单位进行一次领导力检定。若该检定通过，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Icon of Excess",
          "kind": "unique"
        }
      }
    ],
    "冷酷利刃无暇剑魔": [
      {
        "id": "unique-恶魔助力",
        "name": "恶魔助力",
        "text": "在该单位**被选择进行近战**时，您可以使用本技能。若使用：\n■ 该单位的近战攻击可以在未修正掷骰结果为 3+ 时造成**暴击致伤**。\n■ 在该单位完成近战后，如果这些攻击没有**摧毁**一个敌方模型，那麽该单位中的一个模型**被摧毁**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "恶魔助力",
          "kind": "unique"
        }
      }
    ],
    "卡伏拉尔，冷酷利刃领主": [
      {
        "id": "unique-无双杀手",
        "name": "无双杀手",
        "text": "该单位的攻击拥有**[致命一击]**。",
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
            "type": "lethal-hits"
          }
        ],
        "source": {
          "englishName": "无双杀手",
          "kind": "unique"
        }
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **冷酷利刃破戒者**",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "unique"
        }
      }
    ],
    "冷酷利刃无暇剑魔（冷酷利刃无瑕剑魔）": [
      {
        "id": "unique-恶魔助力",
        "name": "恶魔助力",
        "text": "在该单位**被选择进行近战**时，您可以使用本技能。若使用：\n■ 该单位的近战攻击可以在未修正掷骰结果为 3+ 时造成**暴击致伤**。\n■ 在该单位完成近战后，如果这些攻击没有**摧毁**一个敌方模型，那麽该单位中的一个模型**被摧毁**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "恶魔助力",
          "kind": "unique"
        }
      }
    ],
    "冷酷利刃破戒者": [
      {
        "id": "unique-狂放徽记",
        "name": "狂放徽记",
        "text": "在您的射击阶段或者近战阶段结束时，如果该单位在阶段中摧毁了一个敌方单位，那麽该单位进行一次**领导力掷骰**：\n■ 若成功，您获得 1 **CP**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "狂放徽记",
          "kind": "unique"
        }
      },
      {
        "id": "unique-极端突袭",
        "name": "极端突袭",
        "text": "该单位的近战攻击：\n■ 可以重掷结果为 1 的**致伤掷骰**。\n■ 或者：在对位于**目标**范围内的单位进行攻击时，可以重掷**致伤掷骰**。",
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
            "mode": "ones",
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "极端突袭",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
