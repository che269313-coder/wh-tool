/* Generated source-text rule package for emperors-children. */
(function (root) {
  root["WarhammerWebsiteRules_emperors_children"] = {
  "factionRules": [
    {
      "id": "emperors-children.army-rule",
      "name": "寻求刺激者",
      "text": "寻求刺激者\n\n你军队中具有此能力的单位，即使在前进或后撤的回合仍可进行射击并宣告冲锋，但这麽做时须遵守下列限制：\n\n■ 不可选择回合开始时位于其交战范围内的单位作为目标。\n■ 不可选择本阶段中已被其他单位选为冲锋或攻击目标的单位作为目标。\n\n放纵契约\n\n招募军队时，除非另有明文允许，否则不可选放纵军团作为军队阵营。",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": []
    }
  ],
  "unitRules": {
    "混沌兰德掠袭者战车": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭",
        "text": "致命破灭D6",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-assault-ramp",
        "name": "突击斜板",
        "text": "此模型进行正常移动后，每次有单位下船，该单位在本回合内仍可宣言冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 14 个帝皇之子步兵模型。每个终结者和 FLAWLESS BLADE 模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "混沌犀牛战车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-firing-deck-2",
        "name": "射击甲板2",
        "text": "某些 **运输工具(Transport)** 模型的能力中列有「射击甲板 x」。每当这类模型在射击阶段被选中射击时，你可以选择最多 x 个搭乘其内的模型，其所属的单位本阶段尚未射击。然后，对于这些搭乘模型中的每一个，你可以选择该搭乘模型配备的一件远程武器（不包括具有 **[单发]** 能力的武器）。在那个 **运输工具(Transport)** 模型完成其所有攻击之前，它视为配备有所有你以此方式选择的武器，除其他武器外。直到阶段末，那些被选中的模型所属的单位不适格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-assault-vehicle",
        "name": "突击载具",
        "text": "此 **运输工具(Transport)** 前进后，单位可从中下车。如此下车的单位视为已进行常规移动，且该回合无法宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 12 个帝皇之子步兵模型 (不含终结者和 FLAWLESS BLADE 模型)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "混沌魔物": [
      {
        "id": "core-feel-no-pain-5",
        "name": "不觉疼痛5+",
        "text": "不觉疼痛5+",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "fnp",
            "threshold": 5
          }
        ]
      },
      {
        "id": "unique-scuttling-horrors",
        "name": "疾行恐怖",
        "text": "每回合一次，当敌方单位在距此单位 9\" 内结束一次正常、前进或后撤移动时，此单位可以进行一次至多 6\" 的正常移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "混沌终结者": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-lethal-obsession",
        "name": "致命执念",
        "text": "在你的射击阶段，每当此单位被选择射击时，若它进行一或多次远程攻击且所有攻击都锁定同一支敌方单位，则直到回合结束，每当此单位宣告冲锋时，若该敌方单位为冲锋目标之一，你可以重骰冲锋骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "魅魔": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-fights-first",
        "name": "先制攻击",
        "text": "拥有此能力的单位，若有资格战斗，且该单位中的所有模型都拥有此能力，则在先制攻击步骤中进行战斗。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-horrifying-beauty",
        "name": "骇人之美",
        "text": "在战斗阶段开始时，距离你的军队中一个或多个具有此能力的单位交战范围内的每个敌方单位必须进行战斗震撼测试，若该敌方单位低于半数，则结果减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-daemonic-icon",
        "name": "恶魔圣像",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "色孽恶魔亲王": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-lord-of-excess",
        "name": "放纵领主",
        "text": "当此模型位于一或多支友军 **色孽(Slaanesh)步兵(Infantry)** 单位 3\" 内时，此模型拥有「独行特工」能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
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
        ]
      },
      {
        "id": "unique-ecstatic-death",
        "name": "狂喜之死",
        "text": "若此模型被近战攻击摧毁，且本阶段尚未进行过战斗，掷一颗 D6：2+ 时，不将其移出战场。此模型可在攻击单位完成攻击后进行战斗，随后被移出战场。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "有翼色孽恶魔亲王": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-daemonic-destruction",
        "name": "恶魔毁灭",
        "text": "此模型每次结束冲锋移动时，在其交战范围内选择一个敌方单位，并为该模型每个剩余伤害值掷一次D6：每掷出4+，该敌方单位承受1点致命伤（最多6点致命伤）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-stimulated-by-pain",
        "name": "痛楚激励",
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
        ]
      }
    ],
    "欢愉魔": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-soporific-musk",
        "name": "麻醉香雾",
        "text": "敌军单位（**凶兽(Monster)**和**载具(Vehicle)**除外）位于你的军队中有此能力的一个或多个单位的交战范围内时，该敌军单位每次后撤时，其中的模型必须进行绝望逃脱测试。进行此测试时，若该敌军单位同时处于战动摇状态，则从每次绝望逃脱测试中减少1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "无暇剑魔": [
      {
        "id": "unique-daemonic-patrons",
        "name": "恶魔庇主",
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
        ]
      }
    ],
    "福格瑞姆": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭",
        "text": "致命破灭D6",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-daemonic-poisons",
        "name": "恶魔毒素",
        "text": "在你的射击阶段与战斗阶段，此模型完成攻击后，选择一支被其中一次或多次攻击命中的敌方单位。直到战斗结束，该敌方单位处于中毒状态。在每位玩家的指挥阶段开始时，为战场上每支中毒的敌方单位各掷一颗 D6：4+ 时，该敌方单位受到 D3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-daemon-primarch-of-slaanesh",
        "name": "色孽恶魔原体",
        "text": "在你对手的指挥阶段开始时，从「色孽恶魔原体」区段中选择一项能力（见下）。直到你对手下一个指挥阶段开始前，此模型拥有该能力。\n\n**惑人形貌：** 每当一个模型进行一次以此模型为目标的攻击时，命中掷骰 -1。\n\n**恶魔疾速：** 此模型具有「先制攻击(Fights First)」能力。\n\n**迷魂催眠（光环）：** 当一个敌方单位在此模型 6\" 内时，每当该单位被选择后撤时，它必须进行一次领导力测试。若该测试失败，该单位此阶段必须改为保持静止。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-serpentine",
        "name": "蛇行",
        "text": "每当此模型进行正常、前进或后撤移动时，它可以越过高度 4\" 或以下的地形区段。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-supreme-commander",
        "name": "最高统帅",
        "text": "若此模型在你的军队中,则它必须是你的统帅(Warlord)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "地狱魔龙": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-hover",
        "name": "悬停",
        "text": "部分 **飞行器(Aircraft)** 模型在其能力中列有「悬停」。当你被指示宣告战斗阵容时，首先必须宣告你的军队中哪些具有此能力的模型将处于悬停模式。若一个模型处于悬停模式，则直到战役结束，其移动特性变更为 20\"，失去 **飞行器(Aircraft)** 关键字，且失去所有与作为 **飞行器(Aircraft)** 模型相关的规则。处于悬停模式的模型不在增援中开始战役，但你可以选择按正常规则将其置入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-airborne-predator",
        "name": "空中猎手",
        "text": "每次此模型进行攻击，目标为能 **飞行(Fly)** 的单位时，加 1 到命中掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "破戒者": [
      {
        "id": "core-scouts-6",
        "name": "侦察6\"",
        "text": "某些单位的能力栏中列有「斥候x\"」。若单位中每个模型都具有此能力，则在第一战斗回合开始时，在第一回合开始前，它可以进行一次常规移动，距离最多x\"，如同此为你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型亦可执行此动作，只要该单位在该**专用运输工具(Dedicated Transport)**模型内登载（条件是仅具有此能力的模型登载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须结束该移动时，距离所有敌军模型水平距离超过9\"。若双方玩家都有可执行此动作的单位，则进行第一回合的玩家先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-excessive-assault",
        "name": "过度突击",
        "text": "每当此单位中的模型以近战攻击锁定敌方单位时，重骰结果为 1 的受伤骰。若该敌方单位位于目标标记范围内，则改为可以重骰该受伤骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-icon-of-excess",
        "name": "纵欲圣像",
        "text": "在你的射击阶段或近战阶段结束时，若持有者所在的单位于该阶段摧毁了一个或更多敌方单位，则持有者所在的单位进行一次领导力检定。若该检定通过，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "守密者": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭",
        "text": "致命破灭D6",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-daemon-lord-of-slaanesh",
        "name": "丝兰妮什恶魔领主",
        "text": "当有友军 **色孽(Slaanesh)恶魔军团(Legiones Daemonica)** 单位在此模型 6\" 内时，该单位中近战武器的护甲贯穿值提升 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-mesmerising-form",
        "name": "迷惑之姿",
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
        ]
      },
      {
        "id": "unique-shining-aegis",
        "name": "闪耀神盾",
        "text": "持有者的防护(Sv)特性为 3+。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "极乐领主": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
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
        ]
      },
      {
        "id": "unique-euphoric-strikes",
        "name": "狂喜打击",
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
        ]
      },
      {
        "id": "unique-lord-of-the-host",
        "name": "魔群之主",
        "text": "若此模型在宣告战斗编成步骤中附加于 EMPEROR’S CHILDREN BATTLELINE 单位,则此模型具有渗透(Infiltrators)与斥候6\"(Scouts 6\")能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "噪音领主": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-obsessive-annunciation",
        "name": "执念宣告",
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
        ]
      },
      {
        "id": "unique-doom-siren",
        "name": "末日尖啸",
        "text": "在你的射击阶段，此模型的单位射击后，选择一支被其中一次或多次攻击命中的敌方 **步兵(Infantry)** 单位并掷三颗 D6：每个 4+ 使该敌方单位受到 1 点致命伤。若敌方单位因此能力受到一或多点致命伤，则必须进行一次战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "不灭者卢修斯": [
      {
        "id": "core-feel-no-pain-5",
        "name": "不觉疼痛5+",
        "text": "不觉疼痛5+",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "fnp",
            "threshold": 5
          }
        ]
      },
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "独行特工",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-a-challenge-worthy-of-skill",
        "name": "值得技艺的挑战",
        "text": "每当此模型对 **角色、凶兽** 或 **机甲** 单位进行攻击时，你可以重骰命中骰，且可以重骰受伤骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-duellist-s-hubris",
        "name": "决斗者的傲慢",
        "text": "在战斗阶段开始时，若此模型未在领导单位，则直到本阶段结束，它拥有「先制攻击」能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "重拳恶魔": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-glutton-for-punishment",
        "name": "嗜罚者",
        "text": "每当此模型进行攻击时，若其当前力量低于起始兵力，命中骰 +1。若此模型同时低于半数兵力，则受伤骰亦 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "噪音战士": [
      {
        "id": "unique-terrifying-crescendo",
        "name": "骇人高潮",
        "text": "在你的射击阶段，此单位射击后，选择一支被其中一次或多次攻击命中的敌方单位。直到你下一个射击阶段开始前，每当为该敌方单位进行战斗震撼或领导力测试时，该测试 -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "寻觅者": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts-9",
        "name": "侦察9\"",
        "text": "某些单位在其能力中列有「侦察x\"」。若单位中的每个模型都具备此能力，那麽在第一战斗回合开始时、第一轮开始前，该单位可进行一次高达x\"的正常移动，如同在你的移动阶段一样，该单位所乘载的任何**专用运输工具(Dedicated Transport)**模型亦可如此（前提是只有具备此能力的模型乘载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须在终结位置距离所有敌方模型横向超过9\"。如果双方玩家都有可执行此操作的单位，先手玩家优先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-unholy-speed",
        "name": "毒光走位",
        "text": "你可重掷此单位进行的前进及冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-daemonic-icon",
        "name": "恶魔圣像",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "污染者": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭",
        "text": "致命破灭D6",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-scuttling-walker",
        "name": "疾行者",
        "text": "每次此单位进行普通、前进或后撤移动时，它可以穿过模型（不含 **泰坦** 模型）和地形特征。进行移动时，它可以在敌方模型的交战范围内移动，但该移动不能在敌方模型的交战范围内结束，且任何绝望逃脱检定自动通过。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-revel-in-desecration",
        "name": "沉醉亵渎",
        "text": "每当此模型对未低于半数兵力的敌方单位进行攻击时，命中骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "夏拉希·魔灾": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭",
        "text": "致命破灭D6",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-no-prey-can-evade",
        "name": "无猎物能逃脱",
        "text": "可重掷此模型进行的前进和冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-monarch-of-the-hunt",
        "name": "狩猎君王",
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
        ]
      }
    ],
    "巫师": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-warped-interference",
        "name": "扭曲干扰",
        "text": "当此模型在领导单位时，每当一次远程攻击锁定该单位时，其中的模型对该次攻击拥有掩护效益。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-wracking-agonies",
        "name": "折磨苦痛",
        "text": "在你的射击阶段，此模型射击后，选择一支被其「痛楚能量」的一或多次攻击命中的 **步兵(Infantry)** 单位。直到你下一回合开始前，该单位饱受折磨。当一支单位饱受折磨时，其移动特性 -2\"，且为其进行的冲锋骰 -2。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "施虐者": [
      {
        "id": "core-infiltrators",
        "name": "渗透",
        "text": "渗透",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-objective-defiled",
        "name": "目标亵渎",
        "text": "在你的指挥阶段结束时，若此单位位于你所控制的目标标记范围内，该目标标记持续由你控制，直到某阶段结束时你对手对该标记的控制等级高于你为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-icon-of-excess",
        "name": "纵欲圣像",
        "text": "在你的射击阶段或近战阶段结束时，若持有者所在的单位于该阶段摧毁了一个或更多敌方单位，则持有者所在的单位进行一次领导力检定。若该检定通过，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "冷酷利刃无暇剑魔": [
      {
        "id": "unique-恶魔助力",
        "name": "恶魔助力",
        "text": "在该单位**被选择进行近战**时，您可以使用本技能。若使用：\n■ 该单位的近战攻击可以在未修正掷骰结果为 3+ 时造成**暴击致伤**。\n■ 在该单位完成近战后，如果这些攻击没有**摧毁**一个敌方模型，那麽该单位中的一个模型**被摧毁**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
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
        ]
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **冷酷利刃破戒者**",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "冷酷利刃无暇剑魔（冷酷利刃无瑕剑魔）": [
      {
        "id": "unique-恶魔助力",
        "name": "恶魔助力",
        "text": "在该单位**被选择进行近战**时，您可以使用本技能。若使用：\n■ 该单位的近战攻击可以在未修正掷骰结果为 3+ 时造成**暴击致伤**。\n■ 在该单位完成近战后，如果这些攻击没有**摧毁**一个敌方模型，那麽该单位中的一个模型**被摧毁**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "冷酷利刃破戒者": [
      {
        "id": "unique-狂放徽记",
        "name": "狂放徽记",
        "text": "在您的射击阶段或者近战阶段结束时，如果该单位在阶段中摧毁了一个敌方单位，那麽该单位进行一次**领导力掷骰**：\n■ 若成功，您获得 1 **CP**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
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
        ]
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
