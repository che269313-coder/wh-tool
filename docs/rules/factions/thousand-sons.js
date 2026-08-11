/* Generated source-text rule package for thousand-sons. */
(function (root) {
  root["WarhammerWebsiteRules_thousand_sons"] = {
  "factionRules": [
    {
      "id": "thousand-sons.army-rule",
      "name": "巫师秘会",
      "text": "巫师秘会\n\n如果你的军队阵营是千子，你射击阶段开始时，你军队中一个或多个拥有此技能的模型可以尝试右侧列出的仪式。这麽做时，选择你军队中一个拥有此技能并且没有在该回合中尝试进行仪式的模型，再选择一个在该回合中没有被你军队中的模型尝试进行过的仪式；随后依下方流程为该模型进行灵能测试。\n\n灵能测试流程\n\n■ 掷 2D6（可选择「亚空间回响」改为掷 3D6）。\n■ 若掷出任何双数或三数，该模型的单位承受 D3 致命伤。\n■ 若该模型未被摧毁，所有骰子点数合计为灵能测试结果；若达到所尝试仪式的曲速消耗值，该仪式发动并结算其效果。\n\n仪式\n\n命运毁灭（灵能・曲速消耗值 5）\n\n选择一个位于进行仪式的模型 24\" 内且对其可见的敌方单位。阶段内，每当你军队中的千子或闪烁军团对该敌方单位进行攻击时，你可以重掷结果为 1 的命中掷骰。若该仪式的灵能测试结果为 10+，则你可以重掷所有命中掷骰。\n\n时间激涌（灵能・曲速消耗值 6）\n\n选择一个不位于一个或多个敌方单位交战范围内，同时位于进行仪式的模型 24\" 内且对其可见的友军千子或闪烁军团单位。该单位可以进行一次最多 D6\" 的常规移动。若该仪式的灵能测试结果为 10+，则该单位可以进行一次最多 6\" 的常规移动。在这两种情况中，在该回合结束前，该单位不能宣告冲锋。\n\n厄运之矢（灵能・曲速消耗值 7）\n\n选择施展者 24\" 内可见的一个敌方单位（不包括不属于附着单位、且不在施展者 12\" 内的独行特工单位）；该单位承受 D3 致命伤。若测试结果 11+，改为 D3+3。\n\n命运扭曲（灵能・曲速消耗值 9）\n\n选择一个位于进行仪式的模型 24\" 内且对其可见的敌方单位。阶段内，每当你军队中的千子或闪烁军团单位对该敌方单位进行攻击时，攻击的护甲穿透属性提升 1。若该仪式的灵能测试结果为 12+，则攻击的护甲穿透属性提升 2。\n\n秘法誓约\n\n招募军队时，除非另有明文允许，否则不可选闪烁军团作为军队阵营。",
      "category": "faction",
      "status": "计算支持（满足原文条件时勾选）",
      "controls": [
        {
          "id": "ritual",
          "type": "select",
          "label": "本次结算的仪式效果",
          "options": [
            [
              "none",
              "不启用可计算仪式"
            ],
            [
              "fatedDoomOnes",
              "命运毁灭：重掷命中 1"
            ],
            [
              "fatedDoomAll",
              "命运毁灭（测试 10+）：重掷全部命中"
            ],
            [
              "twistFate1",
              "命运扭曲：穿甲 +1"
            ],
            [
              "twistFate2",
              "命运扭曲（测试 12+）：穿甲 +2"
            ]
          ]
        }
      ],
      "effects": [
        {
          "type": "hit-reroll",
          "mode": "ones",
          "phase": "ranged",
          "selection": {
            "controlId": "ritual",
            "equals": "fatedDoomOnes"
          }
        },
        {
          "type": "hit-reroll",
          "mode": "failed",
          "phase": "ranged",
          "selection": {
            "controlId": "ritual",
            "equals": "fatedDoomAll"
          }
        },
        {
          "type": "weapon-ap-modifier",
          "value": 1,
          "phase": "ranged",
          "selection": {
            "controlId": "ritual",
            "equals": "twistFate1"
          }
        },
        {
          "type": "weapon-ap-modifier",
          "value": 2,
          "phase": "ranged",
          "selection": {
            "controlId": "ritual",
            "equals": "twistFate2"
          }
        }
      ]
    }
  ],
  "unitRules": {
    "阿里曼": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-scryer-of-fates",
        "name": "命运见者",
        "text": "若你的军队包含此模型，在双方都部署完军队后，你可选择你军队中最多3个 **千子(Thousand Sons)** 单位并重新部署它们。进行此操作时，你可将这些单位设置在战略预备队中（不论已有多少单位在战略预备队中）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-arch-sorcerer-of-tzeentch",
        "name": "千子术士",
        "text": "此模型每次尝试仪式时，将灵能测试结果加 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "蓝色惧妖": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-infiltrators",
        "name": "渗透",
        "text": "渗透",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-split",
        "name": "分裂",
        "text": "此单位中 **蓝色恐怖** 模型每次被摧毁时，在攻击单位完成其攻击后，如此单位未被摧毁，为该模型掷 1D6。成功时，向此单位中添加 1 个 **硫磺恐怖** 模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-sullen-malevolence",
        "name": "阴郁恶意",
        "text": "当一个敌方单位在此单位 6\"内时，如果此单位包含一个或多个 **蓝色恐怖** 模型，该敌方单位中的模型的领导力特征恶化 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-exploding-horrors",
        "name": "爆裂恐魔",
        "text": "每次此单位被选择进行战斗时，可选择一个在其交战范围内的敌方单位，然后选择此单位中一个或多个 **硫磺恐怖** 模型。对于每个你选择的 **硫磺恐怖** 模型，掷一次 D6：结果为 4+，该模型被摧毁且该敌方单位承受 1 道道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
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
        "text": "每当一个单位在此 **运输工具(Transport)单位** 进行常规移动后下车时，该单位在本回合内仍可宣布冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 14 个千子步兵模型。每个终结者模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "混沌歼灭者型掠食者战车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-ensorcelled-annihilation",
        "name": "秘术歼灭",
        "text": "此模型每次对被你的军队中的一个 **千子(Thousand Sons)灵能者(Psyker)** 模型在此阶段发动的一个或多个灵能攻击所命中的 **凶兽(Monster)** 或 **载具(Vehicle)** 单位发动远程攻击时（包括厄运闪电），可重掷命中掷骰，且可重掷伤害掷骰。",
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
        ]
      }
    ],
    "混沌破坏者型掠食者战车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-ensorcelled-destruction",
        "name": "秘术毁灭",
        "text": "每次此模型发动以一个单位（不含 **MONSTERS** 和 **VEHICLES**）为目标的远程攻击，若该单位在本阶段被来自你军队的一个或多个 **千子(Thousand Sons) 灵能者(Psyker)** 模型发动的灵能攻击命中（包括厄运仪式），改善该攻击的力量和护甲穿透特性各 +1。",
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
            "phase": "ranged"
          }
        ]
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
        "id": "unique-sorcerous-support",
        "name": "术法支援",
        "text": "在你的射击阶段，此模型射击后，选择一个被该些攻击命中一次或多次的敌方单位。至阶段结束前，从此 **运输工具(Transport)** 登陆的友方模型对该敌方单位发动的灵能攻击命中掷骰+1且致伤掷骰+1。",
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
          },
          {
            "type": "wound-modifier",
            "value": 1,
            "phase": "ranged"
          }
        ]
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 12 个千子步兵模型 (不含终结者模型)。",
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
        "id": "unique-regenerating-monstrosities",
        "name": "再生畸形",
        "text": "在每个玩家的指挥阶段开始时，此单位中的一个模型恢复最多 3 点已失伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "混沌维护者战车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-siege-shield",
        "name": "攻城护盾",
        "text": "此模型用其摧毁炮进行远距攻击时，可在距其交战范围内的敌方单位内进行射击（前提是没有其他友方单位也在该敌方单位的交战范围内）。此外，此模型进行远距攻击时，不会因在一个或多个敌方单位的交战范围内而受命中掷骰惩罚。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "奸奇恶魔亲王": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-servile-pawns",
        "name": "奴仆棋子",
        "text": "当此模型于一个或多个友军 **千子(Thousand Sons) 步兵(Infantry)** 单位 3\" 范围内时，此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-spirit-snare",
        "name": "灵魂陷阱",
        "text": "每次拥有「巫师秘社」能力的友军 **千子(Thousand Sons)灵能者(Psyker)** 模型在一或多个拥有此能力的模型 9\" 内被消灭时，选择其中一个拥有此能力的模型：直到战斗结束，每次该选定模型尝试仪式时，灵能测试结果 +1（最多 +2）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-glamour-of-tzeentch",
        "name": "千变之魅力",
        "text": "当友军 **千子(Thousand Sons)步兵(Infantry)** 单位在此模型 6\" 范围内时，该单位中的模型具有潜行能力。",
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
            "value": 1,
            "phase": "ranged"
          }
        ]
      }
    ],
    "有翼奸奇恶魔亲王": [
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
        "id": "unique-hunter-of-souls",
        "name": "灵魂猎手",
        "text": "每次此模型进行目标为 **角色(Character)** 单位的攻击时，重掷命中掷骰为 1，重掷致伤掷骰为 1（若该攻击目标为 **灵能者(Psyker)角色(Character)** 单位，则可重掷命中掷骰且可重掷致伤掷骰）。每次此模型摧毁一个 **角色(Character)** 单位时，此模型恢复至多 D3 失去的伤（若该 **角色(Character)** 单位是 **灵能者(Psyker)** 单位，此模型改为恢复至多 3 失去的伤）。",
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
            "mode": "ones"
          },
          {
            "type": "wound-reroll",
            "mode": "ones"
          }
        ]
      },
      {
        "id": "unique-aetherstride",
        "name": "灵能跨越",
        "text": "在你的移动阶段中，当此模型使用深入打击能力部署到战场上时，它可进行乙太漫步。若它如此做：\n■ 它可在距离所有敌方单位 6\" 以上的战场任何位置部署。\n■ 直到回合结束，其黑暗祝福具有 **[连击 D3]** 能力。\n■ 直到回合结束，它不符合宣告冲锋的资格。",
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
            "type": "sustained-hits",
            "value": "d3"
          }
        ]
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
        "id": "core-feel-no-pain-6",
        "name": "不觉疼痛6+",
        "text": "不觉疼痛6+",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "fnp",
            "threshold": 6
          }
        ]
      },
      {
        "id": "unique-scuttling-walker",
        "name": "疾行者",
        "text": "每次此单位进行普通、前进或后撤移动时，它可以穿过模型（不含 **泰坦** 模型）和地形特征。进行移动时，它可以在敌方模型的交战范围内移动，但该移动不能在敌方模型的交战范围内结束，且任何绝望逃脱检定自动通过。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-destroyer-of-futures",
        "name": "未来毁灭者",
        "text": "每次你用火力监视战术针对此单位时，在执行该战术时命中以未修正命中掷骰5+进行判定。对于每个在你的军队 **千子(Thousand Sons)灵能者(Psyker)** 单位9\"范围内的敌方单位之攻击，命中以未修正命中掷骰4+判定。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "高阶巫师": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-arcane-shield",
        "name": "秘法盾",
        "text": "当此模型领导一个单位时，该单位中的模型具有 4+ 无敌豁免。",
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
            "type": "invulnerable-save",
            "value": 4,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-rebind-rubricae",
        "name": "重新系缚红色贤者",
        "text": "在你的指挥阶段中，若此模型领导一个单位，你可掷一次 D6：结果为 1 时，该单位受到 D3 点属灵伤害；结果为 2-5 时，你可将 1 个已摧毁的护卫模型复原至该单位；结果为 6 时，你可将至多 2 个已摧毁的护卫模型复原至该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "乘坐奸奇魔碟的高阶巫师": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-illusions-of-tzeentch",
        "name": "青恩的幻象",
        "text": "当此模型率领一个单位时，该单位只能被距离 18\" 内的攻击模型选为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-binding-tendrils",
        "name": "綑绑触须",
        "text": "在你的射击阶段中，此模型射击后，选择一个敌方**步兵(Infantry)**单位，该单位被上述使用秘术火焰进行的攻击击中。直到你的下一轮开始，该单位被诱陷。当一个单位被诱陷时，将其移动特性减少 2\"，且对其进行的冲锋掷骰减少 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "火妖": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-bounding-leaps",
        "name": "跃动腾跳",
        "text": "此单位在进行后撤的回合内仍可进行射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "铸造恶魔": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-blazing-salvoes",
        "name": "炽烈齐射",
        "text": "在你的射击阶段中，此模型射击完成后，选择一个被该次攻击击中的敌方单位。直至你的下一回合开始时，该敌方单位处于压制状态。一个单位处于压制状态时，该单位中的每个模型每次进行攻击时，从命中掷骰减少1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "地狱兽": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭",
        "text": "致命破灭1",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-terrifying-assault",
        "name": "恐怖突击",
        "text": "在你的射击阶段和战斗阶段，此模型射击或战斗后，选择被该次攻击命中一次或更多次的敌方单位。该单位必须进行战斗震撼检定，如果该单位距离你的军队中一个或更多 **千子(Thousand Sons)灵能者(Psyker)** 单位 9\" 以内，则从该检定中减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-devoted-to-destruction",
        "name": "献身毁灭",
        "text": "若此模型除近战武器外还配备2把近战武器，将这2把武器的攻击次数特性加上2。",
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
        "id": "unique-flame-wreathed",
        "name": "火焰缠绕",
        "text": "此模型每次结束正常移动时，你可选择一个它在该移动期间经过的敌方单位。直到回合结束，该单位中的模型无法获得掩护的益处。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "炼狱之主": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-malefic-maelstrom",
        "name": "邪恶漩涡",
        "text": "当此模型领导一个单位时，该单位中的模型配备的武器具有 **[连击 1]** 能力。",
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
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-glimpse-of-eternity",
        "name": "永恒一瞥",
        "text": "每回合一次，你可以将为此模型进行的一个命中掷骰、一个致伤掷骰或一个豁免掷骰的结果改为未修正的6。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "凯洛斯·织命者": [
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
        "id": "unique-one-head-looks-forward",
        "name": "一头向前看",
        "text": "在你的指挥阶段结束时，若此模型在战场上，为此模型进行领导力测试；若测试成功，你获得1点指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-one-head-looks-back",
        "name": "一头眼向后看",
        "text": "每当你的对手用策略对他们军队中的一个单位发动时，若该单位在本模型 12\" 内，将该策略使用的成本增加 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "诡变领主": [
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
        "id": "unique-daemon-lord-of-tzeentch",
        "name": "齐奥奇之恶魔领主",
        "text": "友方 **闪烁军团(Scintillating Legions)** 单位在此模型 6\" 范围内时，该单位中的每个模型每次进行远程攻击时，该攻击的力量特性 +1。",
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
            "type": "weapon-strength-modifier",
            "value": 1,
            "phase": "ranged"
          }
        ]
      },
      {
        "id": "unique-master-of-magicks",
        "name": "魔法大师",
        "text": "在你的射击阶段，选择以下能力之一：**[无视掩体]**；**[致命一击]**；**[连击 D3]**。直到该阶段结束，此模型的变化闪电具有该能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "红魔马格努斯": [
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
        "id": "unique-unearthly-power",
        "name": "超凡之力",
        "text": "在战斗回合开始时，选择绯红之王部分中的一个能力。直到下一战斗回合开始，此模型具备该能力。\n\n**不可能形态（灵能）：** 每当一个攻击以此 **灵能者(Psyker)** 为对象时（灵能攻击除外），该攻击的伤害特性 -1。\n\n**特兹尼奇的背叛（灵能）：** 在你对手射击阶段开始时，选择此 **灵能者(Psyker)** 24\" 内一个敌方单位。直到此阶段结束，该单位中模型所装备的远程武器具有 **[危险(Hazardous)]** 能力。\n\n**时光流变（光环、灵能）：** 当一个友方 **千子军团(Thousand Sons)** 单位在此 **灵能者(Psyker)** 6\" 内时，该单位中模型的移动特性 +2\"。",
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
      },
      {
        "id": "unique-lord-of-the-planet-of-the-sorcerers",
        "name": "魔法星球之主",
        "text": "此模型每回合可尝试最多两个仪式而非一个，且每当此模型尝试一个仪式时，灵能测定结果+2。",
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
    "重拳恶魔": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-snarling-protector",
        "name": "愤怒守护者",
        "text": "你可以用「英勇介入」计谋以此单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做：\n■ 该次使用减少 1 指令点。\n■ 该次使用不会阻止本阶段该计谋用于其他单位。\n此外，每次此单位宣告冲锋时，若一个正在交战的友方 **灵能者(Psyker)** 单位在此单位 12\" 内，你可以使用本能力的此部分。若你如此做：\n■ 此单位可重掷该次冲锋掷骰。\n■ 此单位必须以与一个正和该友方灵能者单位交战的敌方单位交战，结束此次冲锋移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "变异旋涡兽": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭",
        "text": "致命破灭D6",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
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
        "id": "unique-mutating-vortex",
        "name": "变异漩涡",
        "text": "在你的移动阶段结束时，为距此模型6\"内的每个敌方单位掷一个D6：结果为2-3时，该单位承受1点致命伤；结果为4-5时，该单位承受D3点致命伤；结果为6时，该单位承受D6点致命伤。范围内的每个敌方单位随后必须进行战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-immaterial-flare",
        "name": "非物质闪光",
        "text": "当一个友方 **千子(Thousand Sons)灵能者(Psyker)** 模型位于此模型 6\" 内时，该模型每次咏唱亚空间时，灵能测试结果加 1。此不与其他灵能测试结果修正值叠加。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "粉色惧妖": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-split",
        "name": "分裂",
        "text": "每当此单位中的 **粉色恐魔** 或 **蓝色恐魔** 模型被摧毁时，在攻击单位完成攻击后，若此单位未被摧毁，为该模型掷一D6。结果为4+时，若该模型为 **粉色恐魔**，将两个 **蓝色恐魔** 模型加入此单位；若该模型为 **蓝色恐魔**，将一个 **硫磺恐魔** 模型加入此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-horrors-are-pink-horrors-are-blue-where-once-there-was-one-now-there-are-two",
        "name": "惧妖有粉有蓝,一化为二",
        "text": "若在任何时刻此单位不含任何粉色惧妖(PINK HORROR)模型,则此单位改用蓝色惧妖(BLUE HORRORS)资料卡。(设计师备注:当此单位含一个或多个粉色惧妖(PINK HORROR)模型时,蓝色惧妖(BLUE HORRORS)资料卡上的「愠怒恶意(Sullen Malevolence)」与「爆裂惧妖(Exploding Horrors)」能力不适用于此单位。)",
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
    "红字战士": [
      {
        "id": "unique-bringers-of-change",
        "name": "变化使者",
        "text": "此单位中的每个模型发动射击攻击时，重掷 1 的致伤掷骰。若该攻击指向位于你不控制的目标标志物范围内的单位，你可重掷致伤掷骰。",
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
          }
        ]
      },
      {
        "id": "unique-icon-of-flame",
        "name": "烈焰圣像",
        "text": "持有者所在的单位中模型（不含 **角色(Character)**）所装备的远程武器具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "圣甲虫终结者": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-rites-of-coalescence",
        "name": "合一仪式",
        "text": "若此单位含有一个或多个 **灵能者(Psyker)** 模型，则每次攻击以此单位为目标时，致伤掷骰 -1。",
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
            "type": "incoming-wound-minus",
            "value": 1
          }
        ]
      }
    ],
    "尖啸魔": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-slashing-dive",
        "name": "破空俯冲",
        "text": "在你的移动阶段中，此单位结束一次正常移动后，你可选择在该移动中被此单位越过的一个敌方单位，并为此单位中的每个模型掷一次D6：每掷出4+，该敌方单位承受1点灵能伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "塞克塔机器人": [
      {
        "id": "core-infiltrators",
        "name": "渗透",
        "text": "渗透",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-stealth",
        "name": "潜行",
        "text": "潜行",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ]
      },
      {
        "id": "unique-prophetic-sentinels",
        "name": "预言哨兵",
        "text": "每回合一次，当你以「警戒射击」或「英勇介入」计谋指定此单位为目标时，该次使用减少 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
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
        "id": "unique-empyric-guidance",
        "name": "亚空间引导",
        "text": "当此模型领导一支单位时，该单位中模型装备的武器具有 **[LETHAL HITS]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-twisted-sorceries",
        "name": "扭曲的邪术",
        "text": "每场战斗一次，在你的射击阶段或战斗阶段中，此模型可使用此能力。若其如此，直到阶段结束为止，将此模型装备之灵能武器的力量与攻击次数特性各提升 3。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "终结者护甲巫师": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-empyric-guidance",
        "name": "亚空间引导",
        "text": "当此模型领导一支单位时，该单位中模型装备的武器具有 **[LETHAL HITS]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-marked-by-fate",
        "name": "命运之印",
        "text": "在你的射击阶段开始时，选择此 **灵能者(Psyker)** 模型可见的一个敌方单位。至该阶段结束前，此单位中的模型每次对该敌方单位进行攻击时，命中掷骰上加 1。",
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
        ]
      }
    ],
    "奸角兽": [
      {
        "id": "core-scouts-6",
        "name": "侦察6\"",
        "text": "部分单位的能力中会标注「斥候 x\"」。若一个单位中的所有模型都具有此能力，则在第一战斗回合开始时、第一轮开始前，该单位可进行一次普通移动，移动距离最多 x\"，如同你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型（该单位在开始战斗时已搭乘其内）也可以如此移动（前提是只有具有此能力的模型搭乘该**专用运输工具(Dedicated Transport)**模型）。使用此能力移动的单位必须以水平距离超过 9\" 结束该移动，远离所有敌方模型。若双方玩家都有可进行此操作的单位，率先执行首轮的玩家优先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-ambushing-hunters",
        "name": "埋伏猎手",
        "text": "在你对手的回合结束时，如果此单位距离所有敌方单位在水平方向上超过 6\"，你可以从战场上移除此单位并将其放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-herd-banner",
        "name": "兽群旗帜",
        "text": "当持有者所在的单位在你控制的一个或多个目标标记范围内时，为持有者所在的单位中模型的领导力(Ld)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-brayhorn",
        "name": "嘶吼号角",
        "text": "你可以重掷为持有者所在的单位进行的突进掷骰与冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "奸角兽萨满": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-bestial-prophet",
        "name": "兽性先知",
        "text": "此模型领导一个单位时，该单位中每个模型发动的攻击在命中掷骰上+1。",
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
            "type": "hit-modifier",
            "value": 1,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-sacrificial-blessing",
        "name": "献祭祝福",
        "text": "当此模型领导一个单位时，在你的射击阶段和战斗阶段，每当该单位被选中进行射击或战斗时，此模型可使用此能力。若如此做，选择该单位中的一个护卫模型；该护卫模型被消灭，直到该阶段结束，将 D3 加入此模型所配备的灵能武器的攻击次数和力量特性。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "奸角兽开悟者": [
      {
        "id": "unique-prophesied-doom",
        "name": "预言之厄",
        "text": "每次此单位结束冲锋移动时，在与其接敌范围内选择一个敌军单位，然后对于该单位内在该敌军单位接敌范围内的每一个模型掷一个D6：每个4+的结果，该敌军单位承受1点道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "装备命运掌握者巨弓的奸角兽开悟者": [
      {
        "id": "unique-malign-trickery",
        "name": "恶意诡计",
        "text": "每回合一次，当敌军单位在此单位 9\" 范围内完成常规、前进或后撤移动时，若此单位不在一个或多个敌军单位的接触距离内，其可进行常规移动最多 D6\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "卡’斯卡克": [
      {
        "id": "unique-野兽先知",
        "name": "野兽先知",
        "text": "如果该单位是一个联合单位，那麽该单位的攻击拥有 **命中掷骰** +1。",
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
            "value": 1
          }
        ]
      },
      {
        "id": "unique-牺牲祝福",
        "name": "牺牲祝福",
        "text": "在您的射击阶段和近战阶段中，在该单位**被选择进行攻击**时，如果该单位中存在一个或更多护卫模型，那麽您可以使用本技能。若使用：\n■ 该单位中的一个护卫模型**被摧毁**。\n■ 该模型的攻击拥有 +D3 **A** 和 **S**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **扎多费恩的棱镜奸角兽开悟者**",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "术士（奸奇飞盘）": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-flames-of-change-psychic",
        "name": "变化之焰（灵能）",
        "text": "此模型率领单位时，该单位中模型所配备的远程武器具有 [无视掩体] 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-altered-reality-psychic",
        "name": "变异现实（灵能）",
        "text": "每战斗回合一次，在为此模型进行命中掷骰、致伤掷骰或豁免掷骰后，你可将该掷骰的结果改为 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "地狱之刃": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-interceptor",
        "name": "拦截者",
        "text": "每当此模型进行针对能 **飞行(Fly)** 的单位的远程攻击时，加 1 到命中掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "地狱之爪": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-warp-bombs",
        "name": "亚空炸弹",
        "text": "此模型每次完成一次正常移动后，你可以选择在该移动过程中被此模型穿过的一个敌方单位，并掷骰六个D6：每个3+，该单位承受1点心灵伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "混沌领主（奸奇飞盘）": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-lord-of-fate",
        "name": "命运之主",
        "text": "此模型统领一个单位时，该单位中的模型对造成的伤害具有不觉疼痛5+ 能力。",
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
            "type": "fnp",
            "threshold": 5
          }
        ]
      },
      {
        "id": "unique-lord-of-chaos",
        "name": "混沌领主",
        "text": "每战斗回合一次，当此模型所在单位成为策略目标时，将该次使用的指令点成本降低 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "灵魂吞噬者扎多费恩": [
      {
        "id": "unique-灵魂陷阱",
        "name": "灵魂陷阱",
        "text": "在一个拥有「巫师秘会」技能的己方**千子灵能者**模型**被摧毁**时，如果那个模型位于拥有本技能模型的 9\" 内，那麽您可以选择其中一个拥有本技能的模型。在被选择的模型尝试进行一次仪式时，其灵能测试结果 +1（最多 +2）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-奸奇凝视-光环-灵能",
        "name": "奸奇凝视（光环，灵能）",
        "text": "在一个己方**千子步兵**单位位于该模型的 6\" 内时，那个单位拥有**隐匿**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "扎多费恩的棱镜奸角兽开悟者": [
      {
        "id": "unique-末日预言",
        "name": "末日预言",
        "text": "当该单位结束一次**冲锋移动**时，您可以选择一个与该单位处于**交战状态**的敌方单位。为该单位中每个与那个敌方单位处于**交战状态**的模型掷一枚 D6：\n■ 若结果为 4+，那个敌方单位受到 1 处致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "扎多费恩的棱镜红字战士": [
      {
        "id": "unique-烈焰徽记",
        "name": "烈焰徽记",
        "text": "该单位的远程攻击（**角色**模型的攻击除外）拥有**[无视掩体]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-万变使者",
        "name": "万变使者",
        "text": "该单位的远程攻击：\n■ 可以重掷结果为 1 的**致伤掷骰**。\n■ 或者：如果攻击目标位于一个**目标**的范围内，则您可以重掷**致伤掷骰**。",
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
            "phase": "ranged"
          }
        ]
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
