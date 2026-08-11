/* Generated source-text rule package for genestealer-cults. */
(function (root) {
  root["WarhammerWebsiteRules_genestealer_cults"] = {
  "factionRules": [
    {
      "id": "genestealer-cults.army-rule",
      "name": "教派伏兵",
      "text": "如果你的军队阵营为基因窃取者教派，则你在战斗开始时将拥有一定的「复活点数」，其数值取决于战斗规模。\n\n■ 入侵：6 点复活点数\n■ 突击：10 点复活点数\n■ 猛攻：14 点复活点数\n\n每当己方军队的一个单位被摧毁时，如果该单位中的每个模型都拥有此技能，你可以基于其初始兵力花费一定的复活点数。详情参见下表。\n\n■ 畸变体：5 模型 → 4 复活点数；10 模型 → 8 复活点数\n■ 装备自动手枪的混血信徒、装备喷火手枪的混血信徒、混血变异兽：5 模型 → 2 复活点数；10 模型 → 4 复活点数\n■ 阿塔兰豺狼摩托手：5 模型 → 2 复活点数；10 模型 → 6 复活点数\n■ 混血新信徒：10 模型 → 3 复活点数；20 模型 → 6 复活点数\n■ 纯种基因窃取者：5 模型 → 2 复活点数；10 模型 → 6 复活点数\n\n如果你如此做：\n\n■ 将一个与被摧毁单位一模一样的单位加入你的军队，将其放入教派伏兵中，并且拥有初始兵力和全部的耐伤，模型拥有的任何 **单发(One Shot)** 武器被视为没有进行过射击。\n■ 将一个教派伏兵标识（详见下文）放置在战场上位于所有敌方单位水平 9\" 外的任意位置（如果没有合适的位置，则不放置该标识）。\n\n教派伏兵中的单位\n\n教派伏兵是一种战略预备队。其中的单位无法成为「迅速入场」计谋的目标，但可以如下文所述，通过教派伏兵标识部署进入战场，或者在后面的回合，通过战略预备队规则进行部署。在第三战斗轮次结束时，位于教派伏兵中的单位将被自动摧毁。\n\n教派伏兵标记\n\n使用直径为 32mm 的圆形标记作为教派伏兵标记。如果一个敌方单位（飞行器除外）在你放置的教派伏兵标识的 8\" 内完成任意移动，将该教派伏兵标识从战场上移除。在下个敌方移动阶段结束时，战场上每剩余一个教派伏兵标记，你便可以选择一个位于教派伏兵中的己方单位，并使其进行一次入场移动。在进行那次入场移动时，那个单位中至少一个模型在部署后必须与那个教派伏兵标记接触，并且单位中其他所有模型都必须完全位于那个教派伏兵标记的 3\" 内（那个标记将在之后被移出战场）。位于教派伏兵中的单位可以通过本规则在第一战斗轮次中进行一次入场移动。",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": []
    }
  ],
  "unitRules": {
    "畸变体": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
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
        "id": "unique-hulking-bodyguards",
        "name": "巨体护卫",
        "text": "**角色(Character)** 正率领此单位时，每当攻击以此单位为目标时，若该攻击的力量特性大于此单位的韧性特性，从致伤掷骰中减1。",
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
            "type": "incoming-wound-when-strength-gt",
            "value": -1
          }
        ]
      }
    ],
    "憎恶体": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
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
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-the-chosen-one",
        "name": "天选之子",
        "text": "当此模型领导一个单位时，每当该单位中的一个模型因近战攻击而被摧毁，且该模型在本阶段未战斗过时，掷一次 D6。结果为 4+ 时，不将被摧毁的模型移出游戏；该模型可在攻击方单位完成攻击后战斗，然后移出游戏。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-regenerating-gene-mass",
        "name": "再生基因组织",
        "text": "此模型首次被摧毁时，在阶段结束时掷 1D6。掷骰结果为 2+，则将此模型重新放置在战场上距其被摧毁位置尽可能近处，不在任何敌方单位的交战范围内，并恢复其全部伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "阿基里斯山地车": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭 1",
        "text": "致命破灭1",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts-9",
        "name": "斥候9\"",
        "text": "斥候9\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-crossfire",
        "name": "交叉火网",
        "text": "在你的射击阶段中，此单位射击后，选择 1 个被这些攻击中的 1 次或多次命中的敌军单位。直到回合结束，每次友军 **基因窃取者教派(Genestealer Cults)** 单位对该敌军单位发动攻击时，提升该攻击的护甲穿透特性 1。同一敌军单位每回合最多只能受此能力影响 1 次。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-flare-launcher",
        "name": "曳光弹发射器",
        "text": "持有者所在的单位拥有 **烟幕(Smoke)** 关键字，且你可以 0CP 对其使用烟幕屏障计谋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-survey-augur",
        "name": "勘测探测器",
        "text": "持有者所在的单位射击后，选择一个本阶段被持有者进行的一个或多个攻击命中的敌方单位。直到该阶段结束，每次友军 **GENESTEALER CULTS** 模型对该单位进行攻击时，该攻击拥有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-spotter",
        "name": "观测员",
        "text": "持有者的远程武器其弹道技巧(BS)特性为 3+。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "装备自动手枪的混血信徒": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-claimed-for-the-cult",
        "name": "为教派宣示",
        "text": "在你的指挥阶段开始时，对你控制的每个目标标记（其 6\" 范围内有一个或多个来自你的军队且具有此能力的单位）掷 1D6。若任何结果为 4+，获得 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-cult-icon",
        "name": "教派圣像",
        "text": "在你的指挥阶段，你可以将至多 D3 个被消灭的模型放回持有者所在的单位。若持有者所在的单位位于你所控制的目标标记的范围内，则你可以改为将至多 3 个被消灭的模型放回该单位。此能力不能用于放回隶属单位中被消灭的 **角色(Character)** 模型，且被放回的模型所装备的任何 **[ONE SHOT]** 武器，若在被消灭前已射击过，仍视为已射击过。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "装备喷火手枪的混血信徒": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-industrialised-destruction",
        "name": "工业化破坏",
        "text": "每次此单位中的模型进行攻击时，重掷结果为 1 的致伤掷骰。如果该攻击的目标是位于目标标记范围内的敌方单位，你可以重掷致伤掷骰。",
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
            "mode": "ones"
          }
        ]
      },
      {
        "id": "unique-cult-icon",
        "name": "教派圣像",
        "text": "在你的指挥阶段，你可以将至多 D3 个被消灭的模型放回持有者所在的单位。若持有者所在的单位位于你所控制的目标标记的范围内，则你可以改为将至多 3 个被消灭的模型放回该单位。此能力不能用于放回隶属单位中被消灭的 **角色(Character)** 模型，且被放回的模型所装备的任何 **[ONE SHOT]** 武器，若在被消灭前已射击过，仍视为已射击过。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "旗卫侍仆": [
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
        "id": "core-scouts-6",
        "name": "斥候6\"",
        "text": "斥候6\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-nexus-of-devotion",
        "name": "虔诚之枢",
        "text": "当该模型领导一个单位时，该单位中的模型拥有不觉疼痛 5+ 能力。如果该单位拥有**混血变种体**关键字，该单位中的模型改为拥有不觉疼痛 4+ 能力。",
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
            "type": "fnp",
            "threshold": 5,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-summon-the-cult",
        "name": "召唤教派",
        "text": "每场战斗一次，当你必须移除「教派伏击」标记，因为对手已经太靠近它时，若你的军队中有一个或多个此能力模型在战场上，你可以使用此能力。若你这样做，你不是移除该标记，而是可以将其放置在战场上任何位置，该位置距离你的军队中有此能力的模型12\"内，且水平距离超过8\"远离所有敌方单位（若此无法达成，此能力视为未被使用，该标记如常移除）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "阿塔兰豺狼摩托手": [
      {
        "id": "core-scouts-9",
        "name": "斥候9\"",
        "text": "斥候9\"",
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
        "id": "unique-outrider-gangs",
        "name": "巡狼帮派",
        "text": "每次你使用教派伏击能力重新在战场上部署此单位时，除了正常规则外，其所有模型必须完全在战场边缘 9\" 内部署，且至少其中一个模型必须接触你的其中一个教派伏击标记（该标记随后从战场上移除）。若无法做到，此单位无法重新部署。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-demolition-run",
        "name": "爆破冲锋",
        "text": "每回合一次，在你的移动阶段，当此单位结束一次普通、前进或后撤移动时，你可选择距此单位 6\" 内且对此单位可见的一个敌方单位，并为此单位中的每个 **阿塔兰豺狼摩托手(Atalan Jackals)** 模型掷一次 D6：每掷出 4+，该敌方单位承受 1 点致命伤（最多 6 点致命伤）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "赐灵者": [
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
        "id": "unique-bio-horror-disruption",
        "name": "生物恐怖破坏",
        "text": "此模型领导一个单位时，该单位中模型配备的远程武器具有 **[致命一击]** 能力。",
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
            "phase": "ranged",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-psionic-shield",
        "name": "心灵盾障",
        "text": "每场战斗一次，在任何阶段开始时，此模型可启用此能力。若启用，至本阶段结束为止，此模型具有4+无敌豁免。",
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
            "value": 4
          }
        ]
      }
    ],
    "生物噬变师": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-support",
        "name": "辅助",
        "text": "在战斗开始前的召集军队步骤中，己方军队中每存在一个 **领袖** 和 **辅助** 单位，您便可以选择该单位可以领导的一个己方 **护卫** 单位。该单位将在战斗中领导被选择的 **护卫** 单位并与其组成一个 **联合** 单位。\n\n除非另有明确规定，每个 **护卫** 单位只能与一个 **领袖** 单位和一个 **辅助** 单位组成 **联合** 单位。\n\n参见联合单位（19）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-twisted-science",
        "name": "扭曲科学",
        "text": "当该模型率领一个单位时，该单位中模型所配备的近战武器具有 **[致命一击]** 能力。",
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
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-biological-warfare",
        "name": "生化战术",
        "text": "每场战斗一次，当此单位被选中进行战斗时，此模型可使用此能力。若使用，则直到阶段结束为止，改善其注射器长矛的攻击次数及伤害特性各 3。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-alchemicus-familiar",
        "name": "炼金术魔宠",
        "text": "每场战斗一次，当持有者所在的单位被选择进行近战时，持有者可以使用其炼金术士魔仆（alchemicus familiar）。若如此做，直到该阶段结束，每当持有者所在的单位中的模型进行一次指定 **步兵(Infantry)** 单位为目标的攻击时，致伤掷骰 +1。",
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
            "type": "wound-modifier",
            "value": 1
          }
        ]
      }
    ],
    "传教员": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-support",
        "name": "辅助",
        "text": "在战斗开始前的召集军队步骤中，己方军队中每存在一个 **领袖** 和 **辅助** 单位，您便可以选择该单位可以领导的一个己方 **护卫** 单位。该单位将在战斗中领导被选择的 **护卫** 单位并与其组成一个 **联合** 单位。\n\n除非另有明确规定，每个 **护卫** 单位只能与一个 **领袖** 单位和一个 **辅助** 单位组成 **联合** 单位。\n\n参见联合单位（19）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-voice-of-new-truths",
        "name": "新真理之声",
        "text": "在你的指挥阶段，你的军队中具有此能力的一个模型可使用它。若使用，选择它 18\" 内的一个敌方单位；该敌方单位必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-scrambler-array",
        "name": "扰频阵列",
        "text": "作为增援设置在战场上的敌方单位不能在此模型 12\" 以内设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "歌利亚碎石车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-firing-deck-6",
        "name": "射击甲板6",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-grinding-line-breaker",
        "name": "辗压突破",
        "text": "敌方单位（不包括 **凶兽(Monster)** 和 **载具(Vehicle)**）在此模型的交战范围内后撤时，该敌方单位中的所有模型必须进行狼狈逃亡测试。进行测试时，如果该敌方单位已战斗震慑，从每次测试中减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 6 个基因窃取者教派步兵模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "歌利亚卡车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-firing-deck-6",
        "name": "射击甲板6",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-fire-support",
        "name": "火力支援",
        "text": "在你的射击阶段，此模型进行过射击后，选择一个在此阶段内受到它至少一次命中的敌方单位。直到本阶段结束，每次本回合从此 **运输工具(Transport)** 中脱离的己方模型对该敌方单位进行攻击时，你可以重掷致伤掷骰。",
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
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 12 个基因窃取者教派步兵模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "混血变异兽": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
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
        "id": "core-scouts-6",
        "name": "斥候6\"",
        "text": "斥候6\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-brood-surge",
        "name": "虫群涌动",
        "text": "每当一个敌方单位被选中进行射击时，在该单位射击后，若此单位的任何模型因这些攻击而被摧毁，此单位可进行一次虫群涌动移动。如此进行时，掷一个 D6：此单位可移动距离最多为结果的英寸数，但必须以尽可能靠近最近的敌方单位为终点（不包括 **飞行器(Aircraft)**）。如此进行时，这些模型可在该敌方单位的交战范围内移动。\n\n若在战斗开始时，此单位内没有模型装备手焰枪，则每当此单位进行虫群涌动移动时，它可移动最多 6\" 而非最多 D6\"。战斗震慑中的单位无法进行虫群涌动移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-cult-icon",
        "name": "教派圣像",
        "text": "在你的指挥阶段，你可以将至多 D3 个被消灭的模型放回持有者所在的单位。若持有者所在的单位位于你所控制的目标标记的范围内，则你可以改为将至多 3 个被消灭的模型放回该单位。此能力不能用于放回隶属单位中被消灭的 **角色(Character)** 模型，且被放回的模型所装备的任何 **[ONE SHOT]** 武器，若在被消灭前已射击过，仍视为已射击过。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "豺狼猎首": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts-9",
        "name": "斥候9\"",
        "text": "斥候9\"",
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
        "id": "unique-priority-target",
        "name": "优先目标",
        "text": "在你的射击阶段，在此模型的单位射击后，选择一个被一件或多件邪教狙击枪进行的攻击命中的敌方单位。至本阶段结束，每当一个己方 **基因窃取者教派(Genestealer Cults)** 模型对该敌方单位进行攻击时，重掷结果为 1 的命中掷骰。",
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
            "mode": "ones",
            "phase": "ranged"
          }
        ]
      },
      {
        "id": "unique-master-outrider",
        "name": "先锋领袖",
        "text": "在你的射击阶段，此模型的单位进行过射击后，若其不在任何敌方单位的接触距离内，该单位可进行一次距离最多6\"的正常移动，如同在你的移动阶段一样。若其如此做，直到本回合结束，该单位不符合宣告冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "杀戮兵器": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
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
        "id": "unique-heroic-fusillade",
        "name": "英雄连射",
        "text": "每回合一次，在你军队中具有此能力的一个模型进行射击后，你可选择一个 **步兵(Infantry)** 单位被其中一个或多个攻击命中。该单位必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-hypersensory-abilities",
        "name": "超感官能力",
        "text": "每回合一次，在你对手的移动阶段，当敌方单位在此模型8\"内结束正常、前进或后撤移动时，若此模型不在一个或多个敌方单位的交战范围内，它可以像在你的射击阶段一样对该单位射击，然后进行最多D6\"的正常移动(它不能在此移动中登上**运输工具(Transport)**)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "基卫": [
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
        "id": "core-support",
        "name": "辅助",
        "text": "在战斗开始前的召集军队步骤中，己方军队中每存在一个 **领袖** 和 **辅助** 单位，您便可以选择该单位可以领导的一个己方 **护卫** 单位。该单位将在战斗中领导被选择的 **护卫** 单位并与其组成一个 **联合** 单位。\n\n除非另有明确规定，每个 **护卫** 单位只能与一个 **领袖** 单位和一个 **辅助** 单位组成 **联合** 单位。\n\n参见联合单位（19）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-sudden-assault",
        "name": "迅捷突袭",
        "text": "当此模型率领一个单位时，该单位中的模型具有先制攻击能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-bodyguard",
        "name": "护卫",
        "text": "当此模型领导一个单位时，附着在该单位上的其他 **角色(Character)** 模型具有不觉疼痛 4+ 能力。",
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
            "type": "fnp",
            "threshold": 4,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      }
    ],
    "占星师": [
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
        "id": "unique-spiritual-leader",
        "name": "精神领袖",
        "text": "每场一次，在任何阶段开始时，可选择一个己方 **基因窃取者教派(Genestealer Cults)** 单位，该单位已动摇且在此模型 12\" 内。该单位不再动摇。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-mind-control",
        "name": "心灵控制",
        "text": "在你对手的射击阶段开始时，你军队中具有此能力的一个 **灵能者(Psyker)** 模型可使用它。若使用，选择距该 **灵能者(Psyker)** 模型18\"内的一个敌方单位并掷一次D6：若结果为1，该 **灵能者(Psyker)** 模型承受D3点致命伤；若为2-5，直到阶段结束，该敌方单位中的每个模型进行攻击时，命中掷骰-1；若为6，该敌方单位中的每个模型进行攻击时，命中掷骰-1且致伤掷骰-1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-psychic-familiar",
        "name": "灵能寄生",
        "text": "每场战斗一次，在你对手的射击阶段开始时，此模型可使用其灵能熟悉体。若它如此做，直到该阶段结束为止，将其心灵控制能力的射程加上 6\"。\n\n**设计者注记：** 在模型旁放置一个灵能熟悉体记号，此能力使用后移除该记号。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "混血新信徒": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-a-plan-generations-in-the-making",
        "name": "数代预谋",
        "text": "在你的指挥阶段结束时，如果此单位在你控制的目标标记范围内，该目标标记将保持受你控制，直到你的对手在某个阶段结束时对该目标标记的控制级别大于你的控制级别。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-cult-icon",
        "name": "教派圣像",
        "text": "在你的指挥阶段，你可以将至多 3 个被消灭的模型放回持有者所在的单位。若持有者所在的单位位于你所控制的目标标记的范围内，则你可以改为将至多 D3+3 个被消灭的模型放回该单位。此能力不能用于放回隶属单位中被消灭的 **角色(Character)** 模型，且被放回的模型所装备的任何 **[ONE SHOT]** 武器，若在被消灭前已射击过，仍视为已射击过。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "指挥使": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-support",
        "name": "辅助",
        "text": "在战斗开始前的召集军队步骤中，己方军队中每存在一个 **领袖** 和 **辅助** 单位，您便可以选择该单位可以领导的一个己方 **护卫** 单位。该单位将在战斗中领导被选择的 **护卫** 单位并与其组成一个 **联合** 单位。\n\n除非另有明确规定，每个 **护卫** 单位只能与一个 **领袖** 单位和一个 **辅助** 单位组成 **联合** 单位。\n\n参见联合单位（19）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-battlefield-analysis",
        "name": "战场分析",
        "text": "每战斗回合一次，你军队中具有此能力的一个模型可在其单位被计谋目标时使用此能力。若它这样做，将该计谋使用的 CP 成本减少 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-cult-infiltration",
        "name": "教派潜伏",
        "text": "在每位玩家的指挥阶段开始时，若此模型在战场上，你可选择一个位于战场上且本回合未移动过的你的教派伏击标记，并将其移动最多6\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "族长": [
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
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-might-from-beyond",
        "name": "彼界之力",
        "text": "此模型正在率领一个单位时，该单位中的模型所配备的近战武器具有 **[毁灭伤害]** 能力。",
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
            "type": "devastating-wounds",
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-cosmic-horror",
        "name": "宇宙恐怖",
        "text": "在近战阶段开始时，此模型 6\" 内的每个敌方单位必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-psychic-familiar",
        "name": "灵能寄生",
        "text": "每场战斗一次，在近战阶段开始时，此模型可使用其灵能寄生。若它如此做，直到该阶段结束，将其宇宙恐怖能力的范围增加 6\"。\n\n**设计师说明**：在模型旁放置一个灵能寄生令牌，使用此能力后移除它。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-supreme-commander",
        "name": "最高统帅",
        "text": "■ 你不能包含超过一个族长模型。■ 若此模型在你的军队中,则它必须是你的统帅(Warlord)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "领军": [
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
        "id": "unique-cult-demagogue",
        "name": "教派煽动者",
        "text": "此模型领导一支单位时，该单位中每个模型进行攻击时，可加1到命中掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-decoys-and-misdirection",
        "name": "伪装诱饵与误导",
        "text": "若你的军队包含一个或多个具有此能力的模型，在双方玩家部署完军队后，从你的军队中选择最多三个 **基因窃取者教派(Genestealer Cults)** 单位并重新部署它们。在如此做时，你可以将这些单位置于战略预备队中，无论已有多少单位在战略预备队中。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "纯种基因窃取者": [
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
        "id": "unique-swift-and-deadly",
        "name": "迅猛致命",
        "text": "此单位在其前进的回合中有资格宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "隐蔽破坏者": [
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
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "独行特工",
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
        "id": "unique-primed-and-ready",
        "name": "就绪待发",
        "text": "在你的射击阶段，可选择你的军队中一个拥有此能力的模型作为「手榴弹」计谋的目标，花费 0CP，前提是该模型本阶段尚未成为该计谋的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-planted-explosives",
        "name": "埋设炸弹",
        "text": "每场战斗一次，当一个敌方单位在此模型 8\" 内完成一个常规、前进或后撤移动时，此模型可以使用其 Reductus 地雷。若如此做，掷一次 D6：结果为 2+，该敌方单位承受 D3+3 点致命伤。每个战斗回合只有你的军队中一个拥有此能力的模型可以使用它。\n\n**设计者注记：**在模型旁放置一个 Reductus 地雷标记，当此能力被使用后移除它。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "圣裁者": [
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
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "独行特工",
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
        "id": "unique-creeping-shadow",
        "name": "悄行阴影",
        "text": "若此模型装备有邪教狙击步枪，每回合一次，当敌方单位在此模型9\"内完成常规、前进或后撤移动时，若此模型不在一个或多个敌方单位的交战范围内，其可进行一次最多6\"的常规移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-cloaked-assassin",
        "name": "披风刺客",
        "text": "若此模型装备有圣塔斯生物匕首，敌方单位无法使用警戒射击计谋对此模型射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-psychic-spoor",
        "name": "灵能追踪",
        "text": "在第一战斗回合开始时，选择一个敌方单位为此模型的猎物。此模型每次对其猎物发动攻击时，你可重掷命中掷骰，且你可重掷致伤掷骰。",
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
            "mode": "failed"
          },
          {
            "type": "wound-reroll",
            "mode": "failed"
          }
        ]
      }
    ],
    "飞升之爪混血变异兽": [
      {
        "id": "unique-族群宣言",
        "name": "族群宣言",
        "text": "在您的移动阶段结束时，如果该单位控制一个**目标**，那个**目标**被**占领**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "地壳碎岩钻机": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-tectonic-fragdrill",
        "name": "地壳碎岩钻机",
        "text": "己方基因窃取者步兵模型可在此堡垒的地板部分上被设置或结束任何类型的移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-underground-egress",
        "name": "地下逸出",
        "text": "你的教派伏击标记每次因敌方单位结束任何移动而在 9\" 内被移除时，你可改为移动该标记，使其完全在此防御建筑的 9\" 内，且距所有敌方单位水平距离超过 9\"（若不可能，则该标记如常被移除）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-manufactorum-cover",
        "name": "工厂掩护",
        "text": "每次远程攻击被分配给一个模型时，如果该模型由于此防御工事而对攻击单位中的每个模型不完全可见，该模型对该攻击获得掩体增益。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-fortification",
        "name": "防御工事",
        "text": "当敌方单位仅在你的军队中一个或多个 **防御工事(Fortification)** 的交战范围内时：\n\n■ 该单位仍可被选为远程攻击的目标，但每次进行此类攻击时，除非该攻击是用手枪进行，否则从命中掷骰减 1。\n■ 该单位中的模型在战斗震慑时后撤时无需进行狼狈逃亡测试，除非它们在此过程中会越过敌方模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "飞升之爪混血变异兽（飞升之爪混血变异兽）": [
      {
        "id": "unique-族群宣言",
        "name": "族群宣言",
        "text": "在您的移动阶段结束时，如果该单位控制一个**目标**，那个**目标**被**占领**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "莎努斯·达斯科维安": [
      {
        "id": "unique-首要目标",
        "name": "首要目标",
        "text": "在您的射击阶段中，当该单位完成射击时，您可以选择一个被教派狙击步枪攻击命中的敌方单位。己方**基因窃取者**单位对那个敌方单位进行的攻击可以重掷结果为 1 的**命中掷骰**。",
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
            "mode": "ones",
            "phase": "ranged"
          }
        ]
      },
      {
        "id": "unique-斥候大师",
        "name": "斥候大师",
        "text": "在您的射击阶段中，在该单位完成射击后，您可以使用本技能。若使用：\n■ 该单位可以进行一次最多 6\" 的**常规移动**。\n■ 直到回合结束前，该单位不能 **宣布冲锋**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **飞升之爪阿塔兰豺狼摩托手**",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "飞升之爪阿塔兰豺狼摩托手": [
      {
        "id": "unique-适应性战士",
        "name": "适应性战士",
        "text": "在该单位**被选择进行攻击**时，其攻击拥有：\n■ **[连击 1]**。\n■ 或者： **[致命一击]**。",
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
            "value": 1
          },
          {
            "type": "lethal-hits"
          }
        ]
      }
    ],
    "飞升之爪阿基里斯山地车": [
      {
        "id": "unique-测绘占卜仪",
        "name": "测绘占卜仪",
        "text": "在您的射击阶段中，当该单位完成射击时，选择一个被那些攻击命中的敌方单位。己方**基因窃取者**单位对那个敌方单位进行的远程攻击拥有**[无视掩体]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-交叉火力",
        "name": "交叉火力",
        "text": "在您的射击阶段中，当该单位进行射击后，您可以选择一个被那些攻击命中的，且在该回合中未被该技能选为目标的敌方单位。直到回合结束前，己方**基因窃取者教派**单位针对那个敌方单位进行的攻击拥有 +1 **AP**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
