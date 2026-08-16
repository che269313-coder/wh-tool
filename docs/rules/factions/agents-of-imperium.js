/* Generated source-text rule package for agents-of-imperium. */
(function (root) {
  root["WarhammerWebsiteRules_agents_of_imperium"] = {
  "factionRules": [
    {
      "id": "agents-of-imperium.army-rule",
      "name": "派遣特工",
      "englishName": "Assigned Agents",
      "text": "若你的军队阵营为 **帝国特勤(Agents of the Imperium)**，则在「选择分遣队规则」步骤中，你可如常选择本出版物中的可用分遣队之一。\n\n若你的军队阵营并非 **帝国特勤(Agents of the Imperium)**，但军队中每个模型都具有 **帝国(Imperium)** 关键字，你可在军队中纳入 **帝国特勤(Agents of the Imperium)** 单位，即使它们不具有你在「选择军队阵营」步骤中所选的阵营关键字。此时，你可在军队中纳入的 **帝国特勤(Agents of the Imperium)** 单位的最大数量取决于战斗规模，如下所示。\n\n-\n\n请注意，你可如常在此类军队中纳入 **帝国特勤(Agents of the Imperium)专用运输工具(Dedicated Transport)** 单位，但每个单位必须在战斗开始时内部搭乘一个或多个单位，否则无法为该战斗部署，并将在首个战斗回合期间视为已被摧毁。",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": [],
      "source": {
        "englishName": "Assigned Agents",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "天鹰杀戮小队": [
      {
        "id": "unique-death-to-the-alien",
        "name": "诛杀异类",
        "text": "每次此单位内的模型发动攻击时，重掷命中掷骰为 1。若该次攻击的目标不具有 **帝国(Imperium)** 或 **混沌(Chaos)** 关键字，你可以改为重掷命中掷骰。",
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
          }
        ],
        "source": {
          "englishName": "Death to the Alien",
          "kind": "unique"
        }
      },
      {
        "id": "unique-kill-team",
        "name": "杀戮小队",
        "text": "每当一次攻击以此单位为目标时，如果该单位包含具有不同韧性特性的模型，直到该攻击单位完成其攻击为止，确定该攻击是否成功致伤时，应使用该单位中多数模型的韧性特性。如果有两个或以上韧性特性并列为多数，则使用最高的数值。\n\n为了确定此单位中哪些模型可以登乘在**运输工具(Transport)**内，Gravis 老兵模型占用 2 个模型的空间，但在其他方面可以登乘其单位可以登乘的任何**运输工具(Transport)**内，即使其他单位中的类似模型具有**重甲**关键字也是如此。\n\n**设计师补注：** *尽管上述规则的抽象概念导致某些模型的行为与其他单位中的类似模型不同，但其设计旨在最大限度地减少复杂的运输规则。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Kill Team",
          "kind": "unique"
        }
      },
      {
        "id": "unique-astartes-shield",
        "name": "阿斯塔特之盾",
        "text": "持有者拥有 4+ 无敌豁免(InSv)。",
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
        ],
        "source": {
          "englishName": "Astartes shield",
          "kind": "unique"
        }
      }
    ],
    "卡里杜斯刺客": [
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
        "id": "core-infiltrators",
        "name": "渗透者",
        "text": "在部署期间，如果一个单位中的每个模型都具有此能力，那麽当你部署它时，它可以部署在战场上任何距离敌军部署区和所有敌军模型超过 8\" 的地点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infiltrators",
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
        "id": "unique-acrobatic-escape",
        "name": "变形药剂",
        "text": "在战斗阶段结束时，若此模型处于一个或多个敌方单位的交战范围内，它可以进行一次后撤移动，最多可移动 D6\"。此外，在你对手回合结束时，若此模型未在一个或多个敌方单位的 3\" 内，你可以将它从战场上移除，然后在你下一个移动阶段的增援步骤中，将它设置到战场上任何距离所有敌方模型超过 8\" 的位置。若战斗结束时此模型不在战场上，则其被摧毁。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Acrobatic Escape",
          "kind": "unique"
        }
      },
      {
        "id": "unique-reign-of-confusion",
        "name": "统御混乱",
        "text": "每回合限一次，在对手针对一个其军队中位于该模型 12\" 内的单位使用一个计谋时，该模型可以使用本技能。若使用，那次计谋的 CP 消耗提升 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Reign of Confusion",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shadow-assignment",
        "name": "暗影任务",
        "text": "此模型不能被选为你的统帅(Warlord)。若你的军队阵营为 AGENTS OF THE IMPERIUM,则在宣告战斗编成步骤中,你可将此模型替换为另一个 OFFICIO ASSASSINORUM 模型,但新模型的总点数不得超过被替换模型的点数。你的军队不能包含相同模型的复本(亦即依此规则替换后,你的军队中 VINDICARE Assassin、CULEXUS ASSASSIN、EVERSOR ASSASSIN、CALLIDUS ASSASSIN 各不得超过 1 个)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shadow Assignment",
          "kind": "unique"
        }
      }
    ],
    "黑星渡鸦": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭",
        "text": "某些模型的能力中列有「致命毁灭 x」。当此类模型被摧毁时，在将其移出场景前掷 1D6（若此模型为 **运输工具(Transport)**，在任何搭载模型下车前掷骰）。掷出 6 时，该模型 6\" 内每个单位承受「x」表示的灵能伤害数量（若此数字为随机数字，对每个 6\" 内的单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "core-hover",
        "name": "悬停",
        "text": "某些 **飞行器(Aircraft)** 模型的能力中列有「悬停」。当你被指示宣告战斗队形时，在做任何其他事之前，你必须先宣告你的军队中哪些拥有此能力的模型将处于悬停模式。如果模型处于悬停模式，则直到战役结束，其移动特征改为 20\"，它失去 **飞行器(Aircraft)** 关键字且失去所有与作为 **飞行器(Aircraft)** 模型相关联的规则。处于悬停模式的模型不会在战役开始时进入预备队，但你可以选择按照正常规则将它们放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hover",
          "kind": "core"
        }
      },
      {
        "id": "core-stealth",
        "name": "隐秘",
        "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-blackstar-cluster-launcher",
        "name": "黑星集束发射器",
        "text": "此模型每次完成一次正常移动后，你可选择它在该移动中越过的敌方单位，掷六个 D6：每个 5+，该单位受 1 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blackstar Cluster Launcher",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 12 个死亡守望步兵模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      },
      {
        "id": "unique-infernum-halo-launcher",
        "name": "炼狱光环发射器",
        "text": "持有者具有 **烟幕(Smoke)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infernum Halo-launcher",
          "kind": "unique"
        }
      },
      {
        "id": "unique-auspex-array",
        "name": "侦测阵列",
        "text": "持有者装备的远程武器拥有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Auspex Array",
          "kind": "unique"
        }
      }
    ],
    "丘里克斯刺客": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣告战阵步骤中，若此单位内的每个模型都具有此能力，则可将其放入预备队而非在战场上部署。如果你这样做，在你其中一个移动阶段的增援步骤中，可以在距离所有敌方模型水平距离超过8\"的战场任何位置部署此单位。\n\n若具有深入打击能力的单位从战略预备队抵达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来部署该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "除非为隶属单位的一部分（见部署能力章节中的领袖），此单位只有在攻击模型距离在 12\" 内时，才能被选为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lone Operative",
          "kind": "core"
        }
      },
      {
        "id": "core-stealth",
        "name": "隐秘",
        "text": "若此单位的所有模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减少 1。",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-etheric-emergence",
        "name": "乙太浮现",
        "text": "在你的移动阶段中，当此模型使用深入打击能力设置于战场时，可进行乙太浮现。若如此进行，此模型可在战场上距所有敌方单位 6\" 以上的任何位置设置，但直到回合结束，不符合宣布冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Etheric Emergence",
          "kind": "unique"
        }
      },
      {
        "id": "unique-abomination",
        "name": "可怕憎物",
        "text": "此模型对灵能攻击具有不觉疼痛2+ 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Abomination",
          "kind": "unique"
        }
      },
      {
        "id": "unique-soulless-horror",
        "name": "灵魂之恐惧",
        "text": "每场战斗一次，在任何指挥阶段开始时，此模型可以使用此能力。若其如此做，距此模型 9\" 内的每个敌方单位必须进行战斗-惊恐测试，从该测试中扣除 1（若该单位为 **灵能者(Psyker)**，则扣除 2）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Soulless Horror",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shadow-assignment",
        "name": "暗影任务",
        "text": "此模型不能被选为你的统帅(Warlord)。若你的军队阵营为 AGENTS OF THE IMPERIUM,则在宣告战斗编成步骤中,你可将此模型替换为另一个 OFFICIO ASSASSINORUM 模型,但新模型的总点数不得超过被替换模型的点数。你的军队不能包含相同模型的复本(亦即依此规则替换后,你的军队中 VINDICARE Assassin、CULEXUS ASSASSIN、EVERSOR ASSASSIN、CALLIDUS ASSASSIN 各不得超过 1 个)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shadow Assignment",
          "kind": "unique"
        }
      }
    ],
    "死亡守望杀戮小队": [
      {
        "id": "unique-death-to-the-alien",
        "name": "诛杀异类",
        "text": "每次此单位内的模型发动攻击时，重掷命中掷骰为 1。若该次攻击的目标不具有 **帝国(Imperium)** 或 **混沌(Chaos)** 关键字，你可以改为重掷命中掷骰。",
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
          }
        ],
        "source": {
          "englishName": "Death to the Alien",
          "kind": "unique"
        }
      },
      {
        "id": "unique-astartes-shield",
        "name": "阿斯塔特之盾",
        "text": "持有者拥有 4+ 无敌豁免(InSv)。",
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
        ],
        "source": {
          "englishName": "Astartes shield",
          "kind": "unique"
        }
      }
    ],
    "艾弗森刺客": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "某些模型在其能力中列有「致命破灭 x」。当这样的模型被摧毁时，在将其移出游戏前掷一次 D6（如果这样的模型是**运输工具(Transport)**，则在任何搭乘的模型下车前掷骰）。掷骰结果为 6 时，该模型 6\" 范围内的每支单位承受数量由「x」表示的致命伤（如果这是随机数字，则为 6\" 范围内的每支单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
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
        "id": "core-scouts-9",
        "name": "斥候 9\"",
        "text": "某些单位在其能力中列有「侦察x\"」。若单位中的每个模型都具备此能力，那麽在第一战斗回合开始时、第一轮开始前，该单位可进行一次高达x\"的正常移动，如同在你的移动阶段一样，该单位所乘载的任何**专用运输工具(Dedicated Transport)**模型亦可如此（前提是只有具备此能力的模型乘载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须在终结位置距离所有敌方模型横向超过9\"。如果双方玩家都有可执行此操作的单位，先手玩家优先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 9\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-frenzon",
        "name": "狂暴药剂",
        "text": "此模型在前进的回合中可进行射击并宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Frenzon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-overkill",
        "name": "过度杀戮",
        "text": "每场战斗一次，在你的移动阶段中，此模型可在进行常规移动前使用此能力。若如此做，直到该回合结束，将 6\" 加至此模型的移动特性，并将 3 加至此模型近战武器的攻击次数特性。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Overkill",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shadow-assignment",
        "name": "暗影任务",
        "text": "此模型不能被选为你的统帅(Warlord)。若你的军队阵营为 AGENTS OF THE IMPERIUM,则在宣告战斗编成步骤中,你可将此模型替换为另一个 OFFICIO ASSASSINORUM 模型,但新模型的总点数不得超过被替换模型的点数。你的军队不能包含相同模型的复本(亦即依此规则替换后,你的军队中 VINDICARE Assassin、CULEXUS ASSASSIN、EVERSOR ASSASSIN、CALLIDUS ASSASSIN 各不得超过 1 个)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shadow Assignment",
          "kind": "unique"
        }
      }
    ],
    "强征小队": [
      {
        "id": "unique-imperial-law",
        "name": "帝国法则",
        "text": "在战役开始时，从你对手的军队中选择一个单位。每次此单位中的模型进行针对该单位的攻击时，该攻击拥有 **[致命一击]** 和 **[精准]** 能力。",
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
          "englishName": "Imperial Law",
          "kind": "unique"
        }
      },
      {
        "id": "unique-nuncio-acquila",
        "name": "信使之鹰",
        "text": "每场战斗一次，在任意指挥阶段开始时，你可以选择一个位于持有者 6\" 内的目标标记。所有位于该目标标记范围内的敌方单位（不含 **怪兽(Monster)** 与 **载具(Vehicle)**）必须进行一次战斗震慑检定。每个目标标记每回合只能被此能力指定一次。\n\n*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Nuncio-acquila",
          "kind": "unique"
        }
      },
      {
        "id": "unique-arbites-medi-kit",
        "name": "裁决官医疗包",
        "text": "在你的指挥阶段开始时，若持有者所在的单位低于其起始兵力，你可以将至多 D3 个被摧毁的 Exaction Vigilants 返回此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Arbites Medi-kit",
          "kind": "unique"
        }
      },
      {
        "id": "unique-soulguilt-scanner",
        "name": "愧魂扫描仪",
        "text": "持有者所在的单位中模型所配备的远程武器拥有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Soulguilt Scanner",
          "kind": "unique"
        }
      }
    ],
    "灰骑士终结者小队": [
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
        "id": "unique-hammerhand",
        "name": "鎚手术",
        "text": "此单位中的每个模型进行冲锋移动时，直到回合结束，该单位中模型配备的近战武器具有 **[致命一击]** 能力。",
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
            "type": "lethal-hits",
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Hammerhand",
          "kind": "unique"
        }
      },
      {
        "id": "unique-rites-of-teleportation",
        "name": "传送仪式",
        "text": "若在宣告战斗编成步骤中有一个或多个 INQUISITOR 单位附加于此单位,则那些单位中的模型具有深入打击(Deep Strike)能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rites of Teleportation",
          "kind": "unique"
        }
      },
      {
        "id": "unique-ancient-s-banner",
        "name": "先辈旗帜",
        "text": "持有者所在的单位中的模型其目标控制(OC)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ancient’s Banner",
          "kind": "unique"
        }
      },
      {
        "id": "unique-narthecium",
        "name": "医疗器",
        "text": "在你的指挥阶段，你可以将 1 个被消灭的模型（不包括 **角色(Character)**）返回到持有者所在的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Narthecium",
          "kind": "unique"
        }
      }
    ],
    "帝国海军跳帮者": [
      {
        "id": "unique-breaching-team",
        "name": "突破小队",
        "text": "此单位中的每个模型发动攻击时，重掷 1 的致伤掷骰。若该攻击的目标是位于你不控制的目标标志物范围内的敌方单位，你可重掷致伤掷骰。",
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
            "mode": "failed"
          }
        ],
        "source": {
          "englishName": "Breaching Team",
          "kind": "unique"
        }
      },
      {
        "id": "unique-gheistskull",
        "name": "幽灵骷髅",
        "text": "每场战斗一次，当你选择此单位作为手榴弹策略的目标时，你可以以距此单位可见且在 18\" 内、不在你的军队中任何单位的交战范围内的一个敌方单位为目标，而非距此单位 8\" 内的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Gheistskull",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cat-unit",
        "name": "CAT装置",
        "text": "每场战斗一次，当此单位被选中进行射击时，直到该阶段结束，此单位中模型所配备的远程武器获得 **[无视掩体]** 能力。\n\n***设计师注记**：在此单位旁放置一个「幽灵头骨」令牌和一个「猫咪单位」令牌，一旦相关能力被使用就移除该令牌。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "CAT Unit",
          "kind": "unique"
        }
      },
      {
        "id": "unique-endurant-shield",
        "name": "坚忍者盾牌",
        "text": "持有者拥有 4+ 无敌豁免(InSv)。",
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
        ],
        "source": {
          "englishName": "Endurant Shield",
          "kind": "unique"
        }
      }
    ],
    "帝国犀牛装甲车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
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
        "name": "射击甲板2",
        "text": "某些 **运输工具(Transport)** 模型的能力栏中列有「射击甲板 x」。每当选择此类模型在射击阶段进行射击时，你可以选择至多「x」个位于其中的已搭乘模型，其单位在此阶段尚未进行过射击。然后，对于每个选定的已搭乘模型，你可以选择该已搭乘模型配备的一件远程武器（不包括具有 **[ONE SHOT]** 能力的武器）。在该 **运输工具(Transport)** 模型完成所有攻击前，它视为除其他武器外，还配备了你所选择的所有武器。直到阶段结束，那些选定的模型所属单位无法进行射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Firing Deck 2",
          "kind": "core"
        }
      },
      {
        "id": "unique-self-repair",
        "name": "自我修复",
        "text": "在你的指挥阶段开始时，该模型恢复 1 点已失伤口。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Self Repair",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 12 个帝国特勤步兵模型。该模型不能运输终结者或 OFFICIO ASSASSINORUM 模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "审判官": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些**角色(Character)**单位在资料表上列有「领袖」。此类**角色(Character)**单位称为领袖，它们可以带领的单位——称为护卫单位——列在其资料表上。在「宣布战斗阵型」步骤期间，对于你的军队中的每个领袖，如果你的军队还包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在整场战斗期间附着到该护卫单位，并据称领导该单位。每个护卫单位最多只能附着一个领袖。\n\n当护卫单位包含领袖时，它被称为附着单位，除了在单位被摧毁时触发的规则外，对于所有规则目的，它都被视为一个单位。每当攻击针对附着单位时，直到攻击单位解决了其所有攻击为止，你必须使用该单位中护卫模型的韧性特征，即使该单位中的领袖具有不同的韧性特征。每当攻击成功对附着单位造成伤害时，该攻击无法分配给该单位中的**角色(Character)**模型，即使该**角色(Character)**模型已失去一个或多个伤口或已在本阶段分配了攻击。一旦附着单位中最后一个护卫模型被摧毁，针对该单位已进行但尚未分配的任何攻击随后可以分配给该单位中的**角色(Character)**模型。\n\n每当护卫单位中的最后一个模型被摧毁时，作为该附着单位一部分的每个**角色(Character)**单位不再是附着单位的一部分。它成为一个单独的单位，拥有其原始起始兵力。如果这是攻击的结果发生的，它们在攻击单位解决了其所有攻击后成为单独的单位。\n\n每当附着到护卫单位的**角色(Character)**单位中的最后一个模型被摧毁，并且没有另一个**角色(Character)**单位附着时，该附着单位的护卫单位不再是附着单位的一部分。它成为一个单独的单位，拥有其原始起始兵力。如果这是攻击的结果发生的，它们在攻击单位解决了其所有攻击后成为单独的单位。\n\n每当摧毁构成附着单位的一部分的单位时，除非该单位在其自身的资料表上具有这些关键字，否则它不具有组成该附着单位的任何其他单位的关键字，用于任何会在该单位被摧毁时触发的规则目的。\n\n***范例：**如果你只摧毁了构成附着单位的护卫单位，你就没有摧毁**角色(Character)**单位。如果你只摧毁了构成附着单位的**角色(Character)**单位，或者摧毁了整个附着单位，你就摧毁了一个**角色(Character)**单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-authority-of-the-inquisition",
        "name": "审判庭权力",
        "text": "此模型领导一支单位时，它可以登上其护卫单位可登上的任何 **运输工具(Transport)** 工具。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Authority of the Inquisition",
          "kind": "unique"
        }
      },
      {
        "id": "unique-power-of-the-rosette",
        "name": "审判徽之力",
        "text": "每次你用策略针对此模型的单位时，掷一个 D6：在 3+ 上，你获得 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Power of the Rosette",
          "kind": "unique"
        }
      },
      {
        "id": "unique-blessed-wardings",
        "name": "祝福守护",
        "text": "当持有者正在带领一个单位时，该单位中的模型具有 6+ 无敌豁免(InSv)。",
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
            "value": 6,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Blessed Wardings",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychic-gifts",
        "name": "灵能潜力",
        "text": "持有者拥有 **灵能者(Psyker)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Psychic Gifts",
          "kind": "unique"
        }
      }
    ],
    "审判官克提兹": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的数据表上列有「领袖」。此类 **角色(Character)** 单位称为领袖，它们可以率领的单位（称为其护卫单位）列在其数据表上。在宣告战阵编制步骤中，对于你军队中的每位领袖，如果你的军队中也包含该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将附着到该护卫单位，整场战役中保持不变，并被称为率领该单位。每个护卫单位只能附着一位领袖。\n\n护卫单位包含领袖时，称为附着单位，除了单位被摧毁时触发的规则外，它在所有规则用途上视为一个单位。每次攻击以附着单位为目标时，在该攻击单位完成所有攻击之前，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性亦然。每次攻击对附着单位成功造成伤害时，该次攻击不能分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已损失一个或多个伤口，或已在此阶段分配攻击亦然。一旦附着单位中最后的护卫模型被摧毁，针对该单位尚未分配的任何攻击便可分配给该单位中的 **角色(Character)** 模型。\n\n护卫单位中最后的模型被摧毁时，作为附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它成为一个单独的单位，具有原始的起始兵力。如果因攻击而发生此情况，则在该攻击单位完成所有攻击后，它们成为单独的单位。\n\n附着到护卫单位的 **角色(Character)** 单位中最后的模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该附着单位的护卫单位不再是附着单位的一部分。它成为一个单独的单位，具有原始的起始兵力。如果因攻击而发生此情况，则在该攻击单位完成所有攻击后，它们成为单独的单位。\n\n附着单位一部分的单位被摧毁时，它没有组成该附着单位的任何其他单位的关键字（除非其自身数据表上有这些关键字），用于触发该单位被摧毁时的任何规则。\n\n***示例：** 如果你只摧毁是附着单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁是附着单位一部分的 **角色(Character)** 单位，或摧毁整个附着单位，你就摧毁了一个 **角色(Character)** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-authority-of-the-inquisition",
        "name": "审判庭权力",
        "text": "此模型领导一支单位时，它可以登上其护卫单位可登上的任何 **运输工具(Transport)** 工具。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Authority of the Inquisition",
          "kind": "unique"
        }
      },
      {
        "id": "unique-malefic-wardings",
        "name": "邪恶防卫",
        "text": "此模型领导一个单位时，该单位内的模型具有 6+ 无敌豁免，以及针对灵能攻击和 **恶魔(Daemon)** 模型进行的攻击具有 4+ 无敌豁免。",
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
            "value": 6,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Malefic Wardings",
          "kind": "unique"
        }
      },
      {
        "id": "unique-spy-network",
        "name": "间谍网络",
        "text": "每次你的对手因能力获得 CP 时，掷 1D6：在 2+ 上，你也获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Spy Network",
          "kind": "unique"
        }
      },
      {
        "id": "unique-glovodan-psyber-eagle",
        "name": "格洛沃丹灵能鹰",
        "text": "在你的指挥阶段，你可选择持有者 18\" 内的一个敌方单位。直到你的下一个指挥阶段开始时，该单位无法拥有掩体增益。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Glovodan Psyber‐eagle",
          "kind": "unique"
        }
      }
    ],
    "审判领主奇莉亚·德拉克瑟斯": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领导」。这类 **角色(Character)** 单位被称为领导者，其资料表上会列出他们能领导的单位──称为其护卫单位。在宣布战斗编制阶段，对于你军队中的每个领导者，如果你的军队也包含该领导者的一个或多个护卫单位，你可以选择其中一个护卫单位。该领导者随后将附着在该护卫单位上，持续整场战斗，且据称正在领导该单位。每个护卫单位只能有一个领导者附着在其上。\n\n当护卫单位包含一个领导者时，它被称为附着单位，除了规则在单位被摧毁时触发的情况外，它在所有规则目的上都被视为一个单位。每次攻击针对附着单位时，直到攻击单位解决完所有攻击，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领导者具有不同的韧性特性。每次攻击成功对附着单位造成伤害时，该攻击不能分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已损失一个或多个伤口，或在本阶段已经分配了攻击。一旦附着单位中最后一个护卫模型被摧毁，任何对该单位进行的尚未分配的攻击都可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位中的最后一个模型被摧毁时，作为附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它成为一个单独的单位，具有其原始起始强度。如果这是攻击的结果而发生，它们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位中的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该附着单位的护卫单位不再是附着单位的一部分。它成为一个单独的单位，具有其原始起始强度。如果这是攻击的结果而发生，它们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次构成附着单位一部分的单位被摧毁时，它不具有构成该附着单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），用于任何在该单位被摧毁时会被触发的规则。\n\n***例示：** 如果你只摧毁了作为附着单位一部分的护卫单位，你并未摧毁一个 **角色(Character)** 单位。如果你只摧毁了作为附着单位一部分的 **角色(Character)** 单位，或者你摧毁了整个附着单位，你已摧毁了一个 **角色(Character)** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-authority-of-the-inquisition",
        "name": "审判庭权力",
        "text": "此模型领导一支单位时，它可以登上其护卫单位可登上的任何 **运输工具(Transport)** 工具。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Authority of the Inquisition",
          "kind": "unique"
        }
      },
      {
        "id": "unique-xenos-hunter",
        "name": "异形猎手",
        "text": "当此模型领导一个单位时，该单位中的模型每次对不具有 **帝国(Imperium)** 或 **混沌(Chaos)** 关键词的敌方单位发动攻击时，命中掷骰加 1。",
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
        ],
        "source": {
          "englishName": "Xenos Hunter",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychic-veil",
        "name": "灵能面纱",
        "text": "在你的指挥阶段，此 **灵能者(Psyker)** 可使用此能力。若如此做，掷 1D6：结果为 1 时，此 **灵能者(Psyker)** 的单位受到 D3 重伤；结果为 2+，直到你下一个指挥阶段开始，此 **灵能者(Psyker)** 的单位只有在攻击模型在 18\" 内时，才能被选择作为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Psychic Veil",
          "kind": "unique"
        }
      }
    ],
    "审判官格雷法克斯": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料卡上列有「领袖」。这些 **角色(Character)** 单位被称为领袖，他们能带领的单位（称为他们的护卫单位）列在其资料卡上。在宣布战斗编成步骤中，对于你军队中的每个领袖，如果你的军队还包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖随后将附着到该护卫单位，并在整个战斗期间领导该单位。每个护卫单位只能有一个领袖附着于其上。\n\n当护卫单位包含领袖时，它被称为附着单位，除了触发单位被摧毁时的规则外，在所有规则目的上都被视为单一单位。每当攻击以附着单位为目标时，直到攻击单位完成其所有攻击，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性。每当攻击对附着单位成功造成伤口时，该攻击不能配置给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已损失一个或多个伤口或已在此阶段分配了攻击。一旦附着单位中的最后一个护卫模型被摧毁，针对该单位尚未分配的任何攻击随后可以分配给该单位中的 **角色(Character)** 模型。\n\n每当护卫单位中的最后一个模型被摧毁时，作为该附着单位一部分的每个 **角色(Character)** 单位不再是附着单位的一部分。它变成一个独立单位，具有其原始起始兵力。如果这发生在攻击的结果中，他们在攻击单位完成其所有攻击后成为独立单位。\n\n每当附着于护卫单位的 **角色(Character)** 单位中的最后一个模型被摧毁，且没有附着其他 **角色(Character)** 单位时，该附着单位的护卫单位不再是附着单位的一部分。它变成一个独立单位，具有其原始起始兵力。如果这发生在攻击的结果中，他们在攻击单位完成其所有攻击后成为独立单位。\n\n每当附着单位的一部分的单位被摧毁时，除非它在自己的资料卡上具有这些关键字，否则它不具有构成该附着单位的任何其他单位的关键字，以便于任何会在该单位被摧毁时触发的规则。\n\n***例：如果你只摧毁了作为附着单位一部分的护卫单位，你没有摧毁 **CHARACTER** 单位。如果你只摧毁了作为附着单位一部分的 **CHARACTER** 单位，或者你摧毁了整个附着单位，你摧毁了一个 **CHARACTER** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-authority-of-the-inquisition",
        "name": "审判庭权力",
        "text": "此模型领导一支单位时，它可以登上其护卫单位可登上的任何 **运输工具(Transport)** 工具。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Authority of the Inquisition",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psyoculum",
        "name": "灵能目镜",
        "text": "当此模型领导一个单位时，该单位中模型配备的远程武器具有 **[反灵能者 4+]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Psyoculum",
          "kind": "unique"
        }
      },
      {
        "id": "unique-no-mercy",
        "name": "无处可逃",
        "text": "当此模型率领一个单位时，该单位中的每个模型每次对低于半数的单位发动攻击时，命中掷骰加 1。",
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
        ],
        "source": {
          "englishName": "No Mercy",
          "kind": "unique"
        }
      }
    ],
    "审判官克罗伊尔": [
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
        "id": "core-scouts-6",
        "name": "侦察6\"",
        "text": "某些单位的能力栏中列有「斥候x\"」。若单位中每个模型都具有此能力，则在第一战斗回合开始时，在第一回合开始前，它可以进行一次常规移动，距离最多x\"，如同此为你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型亦可执行此动作，只要该单位在该**专用运输工具(Dedicated Transport)**模型内登载（条件是仅具有此能力的模型登载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须结束该移动时，距离所有敌军模型水平距离超过9\"。若双方玩家都有可执行此动作的单位，则进行第一回合的玩家先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-on-my-signal-fire",
        "name": "听我号令，开火！",
        "text": "此单位射击后，你可选择一个被这些攻击击中的敌方单位。直到该阶段结束，你军队中每个 **帝国特勤(Agents of the Imperium)** 或 **帝国(Imperium)步兵(Infantry)战线(Battleline)** 模型对该敌方单位发动攻击时，可重掷命中掷骰。",
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
          }
        ],
        "source": {
          "englishName": "On My Signal, Fire!",
          "kind": "unique"
        }
      },
      {
        "id": "unique-tox-cycler",
        "name": "毒素循环器",
        "text": "在你的射击阶段中，此单位开火后，若此模型以其金达里毒液回圈枪命中，至战斗结束止，将该武器的力量和伤害特性各加2（伤害特性最多为6）。",
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
            "value": 2,
            "phase": "ranged"
          },
          {
            "type": "damage-modifier",
            "value": 2,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Tox‑cycler",
          "kind": "unique"
        }
      }
    ],
    "审判官亲信": [
      {
        "id": "unique-loyal-henchmen",
        "name": "侍仆",
        "text": "当 **审判官** 模型领导此单位时，每次攻击此单位，从致伤掷骰中扣除1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Loyal Henchmen",
          "kind": "unique"
        }
      },
      {
        "id": "unique-inquisitorial-henchmen",
        "name": "审判庭扈从",
        "text": "若你的军队阵营并非 AGENTS OF THE IMPERIUM,则你军队中每纳入一个 INQUISITOR 单位,便可纳入一个 INQUISITORIAL AGENTS 单位,且该单位不计入你军队可纳入的 RETINUE 单位数量(见 Assigned Agents)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Inquisitorial Henchmen",
          "kind": "unique"
        }
      },
      {
        "id": "unique-tome-skull",
        "name": "典籍之颅",
        "text": "此单位每装备一个典籍骷髅(Tome-skull)，每场战斗即可一次，于任何阶段开始时，你可以选择一个陷入战斗震慑且位于此单位 6\" 内的友军 **帝国密探(Agents of the Imperium)** 单位，或一个位于此单位 6\" 内的敌方单位。若你选择友军单位，该单位不再陷入战斗震慑。若你选择敌方单位，其必须进行一次战斗震慑检定。\n\n*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Tome‐skull",
          "kind": "unique"
        }
      }
    ],
    "审判庭奇美拉装甲车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
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
        "name": "射击甲板2",
        "text": "某些 **运输工具(Transport)** 模型的能力栏中列有「射击甲板 x」。每当选择此类模型在射击阶段进行射击时，你可以选择至多「x」个位于其中的已搭乘模型，其单位在此阶段尚未进行过射击。然后，对于每个选定的已搭乘模型，你可以选择该已搭乘模型配备的一件远程武器（不包括具有 **[ONE SHOT]** 能力的武器）。在该 **运输工具(Transport)** 模型完成所有攻击前，它视为除其他武器外，还配备了你所选择的所有武器。直到阶段结束，那些选定的模型所属单位无法进行射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Firing Deck 2",
          "kind": "core"
        }
      },
      {
        "id": "unique-rapid-deployment",
        "name": "快速部署",
        "text": "单位可在此 **运输工具(Transport)** 已推进后从其中下车。进行下车的单位视为该阶段进行了正常移动，且不能在同一回合宣布冲锋，但可以其他方式正常行动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rapid Deployment",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 13 个审判官步兵和 INQUISITORIAL AGENT 模型。该模型不能运输终结者模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "国教牧师": [
      {
        "id": "core-support",
        "name": "辅助",
        "text": "在战斗开始前的召集军队步骤中，己方军队中每存在一个 **领袖** 和 **辅助** 单位，您便可以选择该单位可以领导的一个己方 **护卫** 单位。该单位将在战斗中领导被选择的 **护卫** 单位并与其组成一个 **联合** 单位。\n\n除非另有明确规定，每个 **护卫** 单位只能与一个 **领袖** 单位和一个 **辅助** 单位组成 **联合** 单位。\n\n参见联合单位（19）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Support",
          "kind": "core"
        }
      },
      {
        "id": "unique-holy-hatred",
        "name": "圣洁仇恨",
        "text": "当该模型领导一个单位时，该单位中的模型配备的近战武器具有**[连击 1]**能力。",
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
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Holy Hatred",
          "kind": "unique"
        }
      },
      {
        "id": "unique-zealot",
        "name": "狂热者",
        "text": "每场战斗一次，在战斗阶段，此模型可使用此能力。如其使用，至该阶段结束前，将此模型配备的近战武器的攻击次数和力量特性提升 3。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Zealot",
          "kind": "unique"
        }
      }
    ],
    "导航员": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "部分**角色(Character)**单位的数据表上列有「领袖」。这些**角色(Character)**单位被称为领袖，他们能率领的单位（称为其护卫单位）列在其数据表上。在宣告战阵编成步骤中，对于你军队中的每位领袖，如果你的军队也包含该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在整场战斗中附着于该护卫单位，并被称为率领该单位。每个护卫单位只能有一位领袖附着于其上。\n\n当护卫单位包含一位领袖时，该单位被称为附着单位，除了当单位被摧毁时触发的规则外，在所有规则目的中都被视为单一单位。每次攻击目标为附着单位时，在攻击单位解决所有攻击之前，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖有不同的韧性特性。每次攻击成功伤害附着单位时，该攻击不能分配给该单位中的**角色(Character)**模型，即使该**角色(Character)**模型已失去一个或多个伤点，或在本阶段已有攻击分配给它。一旦附着单位中最后一个护卫模型被摧毁，针对该单位的任何尚未分配的攻击随后可分配给该单位中的**角色(Character)**模型。\n\n每次护卫单位中最后一个模型被摧毁时，作为该附着单位一部分的每个**角色(Character)**单位不再是附着单位的一部分。它变成一个独立单位，具有其原始起始兵力。如果这是因攻击而发生，它们在攻击单位解决所有攻击后才变成独立单位。\n\n每次附着于护卫单位的**角色(Character)**单位中最后一个模型被摧毁，且没有另一个**角色(Character)**单位附着时，该附着单位的护卫单位不再是附着单位的一部分。它变成一个独立单位，具有其原始起始兵力。如果这是因攻击而发生，它们在攻击单位解决所有攻击后才变成独立单位。\n\n每次作为附着单位一部分的单位被摧毁时，除非该单位在其自身数据表上有这些关键词，否则该单位不具有组成该附着单位的任何其他单位的关键词，这适用于任何会在该单位被摧毁时触发的规则。\n\n***例子：如果你只摧毁作为附着单位一部分的护卫单位，你并未摧毁**角色**单位。如果你只摧毁作为附着单位一部分的**角色**单位，或如果你摧毁整个附着单位，你已摧毁一个**角色**单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-gaze-into-the-empyrean",
        "name": "凝视亚空间",
        "text": "敌方单位不能在此模型12\"范围内设置为增援部队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Gaze into the Empyrean ",
          "kind": "unique"
        }
      },
      {
        "id": "unique-third-eye",
        "name": "第三眼",
        "text": "在你的射击阶段开始时，选择此模型12\"范围内且对其可见的一个敌方单位。该单位必须进行战斗震撼测试，若该单位是 **步兵(Infantry)** 单位则从结果中减去2。若测试失败，该敌方单位受到3个道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Third Eye",
          "kind": "unique"
        }
      }
    ],
    "行商团队": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够统率的单位（被称为其护卫单位）列在其资料表上。在宣告战斗阵型步骤中，对于军队中的每个领袖，如果军队中也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在整场战役期间附着于该护卫单位，并被称为统率该单位。每个护卫单位只能附着一个领袖。\n\n当护卫单位包含领袖时，该单位被称为附着单位，并在规则用途上被视为单一单位，除了当单位被摧毁时触发的规则外。每次攻击以附着单位为目标时，直到攻击单位完成全部攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功对附着单位造成伤口时，该攻击不能分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已经损失一个或多个伤口，或在本阶段已经分配了攻击。一旦附着单位中最后一个护卫模型被摧毁，针对该单位但尚未分配的任何攻击就可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位中的最后一个模型被摧毁时，作为该附着单位一部分的每个 **角色(Character)** 单位将不再是附着单位的一部分。它将成为一个独立单位，具有其原始起始兵力。如果这是因攻击而发生，则在攻击单位完成全部攻击后，它们将成为独立单位。\n\n每次附着于护卫单位的 **角色(Character)** 单位中的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该附着单位的护卫单位将不再是附着单位的一部分。它将成为一个独立单位，具有其原始起始兵力。如果这是因攻击而发生，则在攻击单位完成全部攻击后，它们将成为独立单位。\n\n每次附着单位的一个单位被摧毁时，除非它自己的资料表上具有这些关键词，否则在任何因单位被摧毁而触发的规则用途上，它不具有构成该附着单位的任何其他单位的关键词。\n\n***例子：** 如果你只摧毁了附着单位的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了附着单位的 **角色(Character)** 单位，或者你摧毁了整个附着单位，你就摧毁了一个 **角色(Character)** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-backroom-deals",
        "name": "幕后交易",
        "text": "如果你的军队包含一个或多个具有此能力的单位，在宣布战阵步骤中，选择其中一个单位。当被选择的单位领导一个单位时，该单位中的模型具有渗透者能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Backroom Deals",
          "kind": "unique"
        }
      },
      {
        "id": "unique-warrant-of-trade",
        "name": "贸易许可",
        "text": "若你的军队包含一个或多个具有此能力的单位，在双方玩家部署完军队后，从你的军队中选择最多 D3 个 **帝国(Imperium)战线(Battleline)** 单位并重新部署它们。如此行动时，可将这些单位部署在战略预备队中，不受已在战略预备队中的单位数量限制。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warrant of Trade",
          "kind": "unique"
        }
      },
      {
        "id": "unique-healing-serum",
        "name": "治疗药剂",
        "text": "在你的指挥阶段开始时，若持有者所在的单位低于其起始兵力，你可将至多 D3 个被摧毁的模型（不含 **角色(Character)**）归还至持有者所在的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Healing serum",
          "kind": "unique"
        }
      }
    ],
    "净化者": [
      {
        "id": "core-scouts-6",
        "name": "侦察6\"",
        "text": "某些单位的能力栏中列有「斥候x\"」。若单位中每个模型都具有此能力，则在第一战斗回合开始时，在第一回合开始前，它可以进行一次常规移动，距离最多x\"，如同此为你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型亦可执行此动作，只要该单位在该**专用运输工具(Dedicated Transport)**模型内登载（条件是仅具有此能力的模型登载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须结束该移动时，距离所有敌军模型水平距离超过9\"。若双方玩家都有可执行此动作的单位，则进行第一回合的玩家先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-ministorum-sermon",
        "name": "教会布道",
        "text": "此单位包含 **教会牧师** 时，此单位中的模型每次进行近战攻击，将致伤掷骰增加 1。",
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
            "value": 1,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Ministorum Sermon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cherub",
        "name": "圣童侍从",
        "text": "每场战斗一次，你可用0指令点对此单位使用Command 重掷策略，并可这样做，即使你在此阶段已对另一个单位使用过该策略。\n\n**设计者备注**：*在该单位旁放置一个圣童侍从 token，在使用过此能力后移除它。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cherub",
          "kind": "unique"
        }
      },
      {
        "id": "unique-simulacrum-imperialis",
        "name": "帝国圣像拟像",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Simulacrum Imperialis",
          "kind": "unique"
        }
      },
      {
        "id": "unique-salvationist-medikit",
        "name": "救赎者医疗包",
        "text": "在你的指挥阶段，若持有者在战场上，你可以将至多 D3 个被消灭的模型（不含 **角色(Character)** 模型）放回此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Salvationist Medikit",
          "kind": "unique"
        }
      }
    ],
    "战斗修女献祭者装甲车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "部分模型的能力栏列有「致命破灭 x」。当此类模型被消灭时，在将其从游戏中移除前掷一次 D6（若此模型为 **运输工具(Transport)单位**，应在乘客下车前掷骰）。掷出 6 时，该模型 6\" 内的每个单位受到「x」所代表数量的致命伤（若此数量为随机值，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-purge-and-cleanse",
        "name": "净化与清洗",
        "text": "每当此模型射击后，选择被该次攻击之一或多次命中的敌方单位。直到该阶段结束，该敌方单位无法获得掩护优势。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Purge and Cleanse",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 6 个 ORDO HERETICUS INFANTRY 模型。At the start of the Declare Battle Formations step、you can select one 战斗修女小队 from your army。If you do、that 单位 is split into two 单位、每个 containing as equal a number of 模型 as possible (when splitting a 单位 in this way、make a note of which 模型 form 每个 of the two new 单位)。One of these 单位 must start the battle embarked within this 运输工具;the other can start the battle embarked within another 运输工具、或 it can be deployed as a separate 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "战斗修女小队": [
      {
        "id": "unique-defenders-of-the-faith",
        "name": "信仰守护者",
        "text": "在你的指挥阶段结束时，若此单位在你控制的目标记号的范围内，该目标记号将保持在你的控制下，直到你的对手对该目标记号的控制等级在阶段结束时大于你的控制等级为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Defenders of the Faith",
          "kind": "unique"
        }
      },
      {
        "id": "unique-incensor-cherub",
        "name": "焚香小天使",
        "text": "每场战斗一次，可用指令重掷策略指定此单位，费用 0CP，且即使你在本阶段已用该策略指定另一支单位，仍可如此做。\n\n***设计者备注**：在此单位旁放置 1 个香炉天使令牌，使用此能力后移除。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Incensor Cherub",
          "kind": "unique"
        }
      },
      {
        "id": "unique-simulacrum-imperialis",
        "name": "帝国圣像拟像",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Simulacrum Imperialis",
          "kind": "unique"
        }
      }
    ],
    "冲覆者小队": [
      {
        "id": "unique-dedication-to-duty",
        "name": "忠于职守",
        "text": "每当此单位中的模型被近战攻击摧毁且该模型在此阶段未曾交战时，掷一次 D6：结果为 4+，不将其移出游戏。已摧毁的模型可在攻击模型的单位完成攻击后交战，然后被移出游戏。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dedication to Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-nuncio-acquila",
        "name": "信使之鹰",
        "text": "每场战斗一次，在任意指挥阶段开始时，你可以选择一个位于持有者 6\" 内的目标标记。所有位于该目标标记范围内的敌方单位（不含 **怪兽(Monster)** 与 **载具(Vehicle)**）必须进行一次战斗震慑检定。每个目标标记每回合只能被此能力指定一次。\n\n*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Nuncio-acquila",
          "kind": "unique"
        }
      }
    ],
    "守望连长阿尔忒弥斯": [
      {
        "id": "core-feel-no-pain-6",
        "name": "不觉疼痛6+",
        "text": "某些模型具有「不觉疼痛 x+」能力。此模型每次承受伤害并即将失去一个创伤时（包括因灵能伤害失去的创伤），掷一次D6：如果结果大于等于「x」所标示的数字，该创伤被忽视且不会失去。若一个模型具有多个「不觉疼痛」能力，每次该模型承受伤害并即将失去创伤时，你只能使用其中一个能力。",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "fnp",
            "threshold": 6
          }
        ],
        "source": {
          "englishName": "Feel No Pain 6+",
          "kind": "core"
        }
      },
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些**角色(Character)**单位的士兵簿上列有「领导者」。这些**角色(Character)**单位称为领导者，他们可以领导的单位（称为他们的护卫单位）列在他们的士兵簿上。在「宣告战斗编队」步骤中，对于你的军队中的每位领导者，如果你的军队也包括该领导者的一个或多个护卫单位，你可以选择其中一个护卫单位。该领导者随后将在整场战斗期间附着到该护卫单位，并称为领导该单位。每个护卫单位只能附着一个领导者。\n\n当护卫单位包含一个领导者时，它被称为附着单位，除了在摧毁单位时触发的规则外，在所有规则目的上都被视为一个单位。每次攻击以附着单位为目标时，在攻击单位完成所有攻击之前，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领导者具有不同的韧性特性。每次攻击成功对附着单位造成伤口时，该攻击不能分配给该单位中的**角色(Character)**模型，即使该**角色(Character)**模型已失去一个或多个伤口或在本阶段已分配攻击。一旦附着单位中最后一个护卫模型被摧毁，尚未分配的对该单位的任何攻击随后可以分配给该单位中的**角色(Character)**模型。\n\n每次护卫单位中的最后一个模型被摧毁时，作为该附着单位一部分的每个**角色(Character)**单位不再是附着单位的一部分。它成为一个单独的单位，具有其原始初始兵力。如果这是由于攻击发生的，他们在攻击单位解决所有攻击后成为单独的单位。\n\n每次附着到护卫单位的**角色(Character)**单位中的最后一个模型被摧毁，并且没有另一个**角色(Character)**单位附着时，该附着单位的护卫单位不再是附着单位的一部分。它成为一个单独的单位，具有其原始初始兵力。如果这是由于攻击发生的，他们在攻击单位解决所有攻击后成为单独的单位。\n\n每次摧毁属于附着单位的单位时，除非它在自己的士兵簿上拥有这些关键词，否则它不具有构成该附着单位的任何其他单位的关键词，以用于任何将在摧毁该单位时触发的规则。\n\n***例子：**如果你只摧毁了属于附着单位的护卫单位，你就没有摧毁**角色(Character)**单位。如果你只摧毁了属于附着单位的**角色(Character)**单位，或者如果你摧毁了整个附着单位，你就摧毁了一个**角色(Character)**单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-tactical-instinct",
        "name": "战术直觉",
        "text": "此模型领导一支单位时，该单位中的模型所配备的武器具有 **[致命一击]** 能力。",
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
          "englishName": "Tactical Instinct",
          "kind": "unique"
        }
      },
      {
        "id": "unique-unstoppable-champion",
        "name": "不可阻挡的勇士",
        "text": "此模型首次被摧毁时，在阶段结束时掷 1D6。结果为 2+，将此模型在其被摧毁位置的尽可能近处重新设置于战场上，不位于任何敌方单位的交战范围内，剩余 1 伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unstoppable Champion",
          "kind": "unique"
        }
      }
    ],
    "守望堡主": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "一些 **角色(Character)** 单位在其资料表上列有「领导者」。这样的 **角色(Character)** 单位被称为领导者，他们能够带领的单位（称为他们的卫队单位）列于他们的资料表上。在宣告战阵编成阶段中，对于你的军队中的每个领导者，若你的军队中也包含该领导者的一个或多个卫队单位，你可选择其中一个卫队单位。该领导者将于战斗期间依附于该卫队单位，称为带领该单位。每个卫队单位只能有一个领导者依附于其上。\\当卫队单位包含领导者时，它被称为依附单位，并且除了当单位被摧毁时触发的规则外，为了所有规则目的，它被视为单一单位。每次攻击对依附单位进行时，直到该攻击单位完成其所有攻击为止，你必须使用该单位内卫队模型的韧性特征，即使该单位中的领导者具有不同的韧性特征。每次攻击对依附单位成功造成伤口时，该攻击不能被分配至该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已经失去一个或多个伤口或已经在此阶段被分配过攻击。只要依附单位中的最后一个卫队模型被摧毁，对该单位尚未被分配的任何攻击便可被分配至该单位中的 **角色(Character)** 模型。\\每次卫队单位中的最后一个模型被摧毁时，属于该依附单位的每个 **角色(Character)** 单位不再是依附单位的一部分。它成为一个单独的单位，具有其原始起始兵力。若这是攻击的结果，则它们在该攻击单位完成其所有攻击后成为单独的单位。\\每次依附于卫队单位的 **角色(Character)** 单位中的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位依附时，该依附单位的卫队单位不再是依附单位的一部分。它成为一个单独的单位，具有其原始起始兵力。若这是攻击的结果，则它们在该攻击单位完成其所有攻击后成为单独的单位。\\每次属于依附单位的一个单位被摧毁时，除非它在自身资料表上拥有这些关键字，否则对于任何在该单位被摧毁时触发的规则目的，它不具有组成该依附单位的任何其他单位的关键字。\\***例：** 若你只摧毁属于依附单位的卫队单位，你并未摧毁 **角色(Character)** 单位。若你只摧毁属于依附单位的 **角色(Character)** 单位，或若你摧毁整个依附单位，你已摧毁一个 **角色(Character)** 单位。*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-strategic-knowledge",
        "name": "战略素养",
        "text": "当此模型带领一个单位时，该单位在前进或后撤的回合中有资格射击并宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Strategic Knowledge",
          "kind": "unique"
        }
      },
      {
        "id": "unique-rites-of-battle",
        "name": "战斗仪式",
        "text": "每战斗回合一次，你军队中具有此能力的一个单位可在被目标指定为策略使用时使用此能力。若此单位使用，将该策略使用的指令点花费减少1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rites of Battle",
          "kind": "unique"
        }
      }
    ],
    "警戒者小队": [
      {
        "id": "unique-merciless-judgement",
        "name": "无情审判",
        "text": "此单位中的每个模型每次对低于半数的敌方单位发动远程攻击时，于致伤掷骰上加 1。",
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
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Merciless Judgement",
          "kind": "unique"
        }
      },
      {
        "id": "unique-nuncio-acquila",
        "name": "信使之鹰",
        "text": "每场战斗一次，在任意指挥阶段开始时，你可以选择一个位于持有者 6\" 内的目标标记。所有位于该目标标记范围内的敌方单位（不含 **怪兽(Monster)** 与 **载具(Vehicle)**）必须进行一次战斗震慑检定。每个目标标记每回合只能被此能力指定一次。\n\n*",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Nuncio-acquila",
          "kind": "unique"
        }
      }
    ],
    "文迪卡刺客": [
      {
        "id": "core-infiltrators",
        "name": "渗透者",
        "text": "部署期间，若此单位中的每个模型都具有此能力，则当你部署它时，它可以被部署在战场上距敌方部署区和所有敌方模型都超过 8\" 水平距离的任何位置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infiltrators",
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
        "id": "core-stealth",
        "name": "隐秘",
        "text": "若此单位内每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰减 1。",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-dead-shot",
        "name": "精准射手",
        "text": "此模型每次进行远程攻击时，在为该攻击选择目标时，可无视独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dead‐shot",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shieldbreaker",
        "name": "碎盾者枪弹",
        "text": "每场战斗一次，选择此模型绝命步枪的目标时，可发射护盾破裂者弹药。若如此做，至本阶段结束，此模型每次用该武器进行攻击时，对致伤掷骰加 1，且成功的致伤掷骰视为 Critical 致伤。",
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
        ],
        "source": {
          "englishName": "Shieldbreaker",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shadow-assignment",
        "name": "暗影任务",
        "text": "此模型不能被选为你的统帅(Warlord)。若你的军队阵营为 AGENTS OF THE IMPERIUM,则在宣告战斗编成步骤中,你可将此模型替换为另一个 OFFICIO ASSASSINORUM 模型,但新模型的总点数不得超过被替换模型的点数。你的军队不能包含相同模型的复本(亦即依此规则替换后,你的军队中 VINDICARE Assassin、CULEXUS ASSASSIN、EVERSOR ASSASSIN、CALLIDUS ASSASSIN 各不得超过 1 个)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shadow Assignment",
          "kind": "unique"
        }
      }
    ],
    "武装船兵": [
      {
        "id": "unique-masters-of-close-confines",
        "name": "近距离战斗专家",
        "text": "每当此单位中的一个模型进行针对最近合格目标的远程攻击时，该攻击具备 **[致命一击]** 能力。",
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
            "type": "lethal-hits",
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Masters of Close Confines",
          "kind": "unique"
        }
      }
    ],
    "牧师特根": [
      {
        "id": "unique-狂信徒-每个单位-每场战斗限一次",
        "name": "狂信徒（每个单位，每场战斗限一次）",
        "text": "当该单位**被选择进行近战**时，您可以使用该技能。若使用，该模型的近战攻击拥有 +3 **A** 和 **S**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "狂信徒（每个单位，每场战斗限一次）",
          "kind": "unique"
        }
      },
      {
        "id": "unique-神圣憎恶",
        "name": "神圣憎恶",
        "text": "如果该单位是一个联合单位，该单位的近战攻击拥有**[连击 1]**。",
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
            "value": 1,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "神圣憎恶",
          "kind": "unique"
        }
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **审判官之手审判庭特勤**",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "unique"
        }
      }
    ],
    "审判官之手警戒者小队": [
      {
        "id": "unique-天鹰使节",
        "name": "天鹰使节",
        "text": "在指挥阶段开始时，您可以使用本技能。若使用，选择一个位于该模型 6\" 内，且在本回合中没有被本技能选择过的**目标**。位于那个**目标**范围内的敌方单位（**凶兽／载具**单位除外）必须进行一次**战斗震慑掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "天鹰使节",
          "kind": "unique"
        }
      },
      {
        "id": "unique-无情审判",
        "name": "无情审判",
        "text": "该单位对**低于半数兵力**的单位进行的远程攻击的**致伤掷骰** +1。",
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
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "无情审判",
          "kind": "unique"
        }
      }
    ],
    "审判官之手艾弗森刺客": [
      {
        "id": "unique-过度杀伤-每个单位-每场战斗限一次",
        "name": "过度杀伤（每个单位，每场战斗限一次）",
        "text": "在该单位**被选择进行攻击**时，您可以使用本技能。若使用，该单位的近战攻击拥有 -4 **AP**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "过度杀伤（每个单位，每场战斗限一次）",
          "kind": "unique"
        }
      }
    ],
    "审判官之手审判庭特勤": [
      {
        "id": "unique-典籍之颅-每个单位-每场战斗限一次",
        "name": "典籍之颅（每个单位，每场战斗限一次）",
        "text": "在任意阶段开始时，您可以选择一个位于该单位 6\" 内的**处于战斗震慑状态**的己方**帝国特勤**单位，或者一个位于该单位 6\" 内的敌方单位。若您选择己方单位，那麽那个单位不再处于**战斗震慑状态**。如果您选择了一个敌方单位，那麽那个单位必须进行一次 **战斗震慑掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "典籍之颅（每个单位，每场战斗限一次）",
          "kind": "unique"
        }
      },
      {
        "id": "unique-忠于事业",
        "name": "忠于事业",
        "text": "在一个敌方单位将该单位选为目标时，如果该单位位于一个**目标**的范围内，那麽针对该单位进行的攻击的**致伤掷骰** -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "忠于事业",
          "kind": "unique"
        }
      }
    ],
    "审判官之手警戒者小队（审判官之手警戒者小队）": [
      {
        "id": "unique-无情审判",
        "name": "无情审判",
        "text": "该单位对**低于半数兵力**的单位进行的远程攻击的**致伤掷骰** +1。",
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
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "无情审判",
          "kind": "unique"
        }
      },
      {
        "id": "unique-天鹰使节",
        "name": "天鹰使节",
        "text": "在指挥阶段开始时，您可以使用本技能。若使用，选择一个位于该模型 6\" 内，且在本回合中没有被本技能选择过的**目标**。位于那个**目标**范围内的敌方单位（**凶兽／载具**单位除外）必须进行一次**战斗震慑掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "天鹰使节",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
