/* Generated source-text rule package for chaos-space-marines. */
(function (root) {
  root["WarhammerWebsiteRules_chaos_space_marines"] = {
  "factionRules": [
    {
      "id": "chaos-space-marines.army-rule",
      "name": "黑暗契约",
      "englishName": "Dark Pacts",
      "text": "你军队中具有此能力的单位每次被选中射击或战斗时，可缔结黑暗契约。先进行领导力测试；失败则承受 D3 致命伤。然后为其武器选一个能力直到阶段结束：\n\n■ 致命一击\n■ 连击 1",
      "category": "faction",
      "status": "计算支持（满足原文条件时勾选）",
      "controls": [
        {
          "id": "pact",
          "type": "select",
          "label": "本阶段缔结的黑暗契约",
          "options": [
            [
              "none",
              "不缔结"
            ],
            [
              "lethal",
              "致命一击"
            ],
            [
              "sustained",
              "连击 1"
            ]
          ]
        }
      ],
      "effects": [
        {
          "type": "lethal-hits",
          "selection": {
            "controlId": "pact",
            "equals": "lethal"
          }
        },
        {
          "type": "sustained-hits",
          "value": 1,
          "selection": {
            "controlId": "pact",
            "equals": "sustained"
          }
        }
      ],
      "source": {
        "englishName": "Dark Pacts",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "大掠夺者阿巴顿": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-warmaster",
        "name": "混沌战帅",
        "text": "在你的指挥阶段，选择一个战帅能力。直到你的下一个指挥阶段开始，此模型拥有该能力。\n\n**憎恨典范（光环）：** 当一个友方 **异端阿斯塔特(Heretic Astartes)** 单位（**受咒(Damned)** 单位除外）在此模型 6\" 内时，该单位中每当一个模型进行一次攻击，你可以重掷命中掷骰。\n\n**混沌至尊印记（光环）：** 当一个友方 **异端阿斯塔特 步兵(Heretic Astartes Infantry)** 或 **异端阿斯塔特 骑乘(Heretic Astartes Mounted)** 单位（**受咒(Damned)** 单位除外）在此模型 6\" 内时，该单位中的模型具有 4+ 无敌豁免。\n\n**叛军军团领主（光环）：** 当一个友方 **异端阿斯塔特(Heretic Astartes)** 单位（**受咒(Damned)** 单位除外）在此模型 6\" 内时，你可以为该单位重掷领导力测试与战斗震撼测试。",
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
          },
          {
            "type": "hit-reroll",
            "mode": "failed"
          }
        ],
        "source": {
          "englishName": "Warmaster",
          "kind": "unique"
        }
      },
      {
        "id": "unique-dark-destiny",
        "name": "黑暗命途",
        "text": "此单位每次进行黑暗契约且该测试未失败时，若该测试结果为 7+，获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Destiny",
          "kind": "unique"
        }
      },
      {
        "id": "unique-supreme-commander",
        "name": "最高统帅",
        "text": "若此模型在你的军队中,则它必须是你的统帅(Warlord)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Supreme Commander",
          "kind": "unique"
        }
      }
    ],
    "诅咒教徒": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "不知疼痛6+，斥候6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "fnp",
            "threshold": 6
          }
        ],
        "source": {
          "englishName": "Feel No Pain 6+, Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-howling-horde",
        "name": "嚎叫狂徒",
        "text": "敌方单位射击后，如果此单位有一个或以上模型因该些攻击而被摧毁，此单位可进行兽群移动。如欲进行兽群移动，掷一个 D6：此单位可移动距离达该结果英寸，但此单位必须完成该移动时尽可能靠近最近的敌方单位（不包含 **飞行器(Aircraft)**）。如此进行时，那些模型可在该敌方单位的交战范围内移动。当此单位受到战斗震撼时，不可进行兽群移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Howling Horde",
          "kind": "unique"
        }
      }
    ],
    "混沌摩托骑兵": [
      {
        "id": "unique-rapid-assault",
        "name": "迅捷突击",
        "text": "此单位中的模型每次进行近战攻击时，若此单位本回合进行了冲锋移动，改善该攻击的力量特性 +1。",
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
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Rapid Assault",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chaos-icon",
        "name": "混沌圣旗",
        "text": "持有者所在的单位每次为 Dark Pacts 能力进行领导力检定时，你可以重掷该检定。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chaos Icon",
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
        "name": "突击载具",
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
        "name": "运载",
        "text": "该模型能够搭载 12 个 HERETIC ASTARTES INFANTRY 模型 (不含 OBLITERATOR 和跳跃包模型)。每个附身者、残杀者和终结者模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "混沌领主": [
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
        "id": "unique-lord-of-chaos",
        "name": "混沌领主",
        "text": "每战斗回合一次，你军队中具此能力的一个单位可在被策略以为目标时使用它。若此单位使用，减少该策略使用的 CP 花费 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of Chaos",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chance-for-glory",
        "name": "争抢荣誉",
        "text": "每场战斗一次，在战斗阶段开始时，此模型可使用此能力。若如此，直到阶段结束，此模型装备的近战武器的力量、攻击次数、护甲穿透及伤害特性各提升 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chance for Glory",
          "kind": "unique"
        }
      }
    ],
    "终结者领主": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-lord-of-chaos",
        "name": "混沌领主",
        "text": "每战斗回合一次，你军队中具此能力的一个单位可在被策略以为目标时使用它。若此单位使用，减少该策略使用的 CP 花费 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of Chaos",
          "kind": "unique"
        }
      },
      {
        "id": "unique-formidably-resilient",
        "name": "可怕坚韧",
        "text": "每次一次攻击被分配给此模型时，将该攻击的伤害特性减半。",
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
            "type": "damage-halving"
          }
        ],
        "source": {
          "englishName": "Formidably Resilient",
          "kind": "unique"
        }
      }
    ],
    "跳跃背包混沌领主": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-lord-of-chaos",
        "name": "混沌领主",
        "text": "每战斗回合一次，你军队中具此能力的一个单位可在被策略以为目标时使用它。若此单位使用，减少该策略使用的 CP 花费 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of Chaos",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cruel-hunter",
        "name": "残酷猎手",
        "text": "当此模型领导一个单位时，每当该单位进行贴近或巩固移动时，该单位中的每个模型可移动最多6\"，而非最多3\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cruel Hunter",
          "kind": "unique"
        }
      }
    ],
    "歼灭者型猎食者坦克": [
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
        "id": "unique-annihilator",
        "name": "歼灭者",
        "text": "每次此模型发动的远程攻击分配给 **凶兽(Monster)** 或 **载具(Vehicle)** 模型时，你可以重掷伤害掷骰。",
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
            "type": "damage-reroll",
            "mode": "failed",
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Annihilator",
          "kind": "unique"
        }
      }
    ],
    "破坏者型猎食者坦克": [
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
        "id": "unique-destructor",
        "name": "破坏者",
        "text": "每当此模型进行的远程攻击以敌方**步兵(Infantry)**单位为目标时，将该攻击的护甲穿透特性改善 1。",
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
        ],
        "source": {
          "englishName": "Destructor",
          "kind": "unique"
        }
      }
    ],
    "犀牛装甲车": [
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
        "id": "unique-self-repair",
        "name": "自行修理",
        "text": "在你的指挥阶段开始时，此模型恢复 1 点已失伤害。",
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
        "text": "该模型能够搭载 12 个 HERETIC ASTARTES INFANTRY 模型。该模型不能运输终结者、跳跃包、残杀者、泯灭者或附身者模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "混沌魔物": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "不知疼痛5+",
        "status": "通用核心技能，规则全文见《核心规则》",
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
        "id": "unique-mind-breaking-mutations",
        "name": "破心变异",
        "text": "当敌军单位（**载具(Vehicle)** 单位除外）在距此单位 3\" 内时，减少该敌军单位中模型的目标控制特性 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Mind-breaking Mutations",
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
        "id": "unique-despoilers",
        "name": "黑暗劫掠",
        "text": "此单位每次进行黑暗契约时，直到阶段结束，此单位中每个模型发动攻击时，你可重掷命中掷骰。",
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
          "englishName": "Despoilers",
          "kind": "unique"
        }
      }
    ],
    "混沌维护者突击炮": [
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
        "id": "unique-siege-shield",
        "name": "攻城盾",
        "text": "此模型用其摧毁炮进行远距攻击时，可在距其交战范围内的敌方单位内进行射击（前提是没有其他友方单位也在该敌方单位的交战范围内）。此外，此模型进行远距攻击时，不会因在一个或多个敌方单位的交战范围内而受命中掷骰惩罚。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Siege Shield",
          "kind": "unique"
        }
      }
    ],
    "神选战士": [
      {
        "id": "unique-chosen-marauders",
        "name": "神选战士",
        "text": "此单位在前进或后撤的回合中可进行射击并宣布冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chosen Marauders",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chaos-icon",
        "name": "混沌圣旗",
        "text": "持有者所在的单位每次为 Dark Pacts 能力进行领导力检定时，你可以重掷该检定。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chaos Icon",
          "kind": "unique"
        }
      }
    ],
    "邪教徒纵火者": [
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
        "id": "unique-fiery-faith",
        "name": "炙热信仰",
        "text": "当此模型领导一个单位时，你可为该单位进行的领导力测试重掷。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fiery Faith",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cursed-flames",
        "name": "诅咒火焰",
        "text": "在你的射击阶段中，此模型射击后，选择一个被这些攻击命中的敌方**步兵(Infantry)**单位。该单位必须进行士气动摇测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cursed Flames",
          "kind": "unique"
        }
      }
    ],
    "邪教徒": [
      {
        "id": "unique-for-the-dark-gods",
        "name": "为了黑暗诸神",
        "text": "在你的指挥阶段结束时，若此单位位于你控制的目标标记的射程内，该目标标记将保持在你的控制下，直到你的对手在某一阶段结束时对该目标标记的控制级别高于你为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "For the Dark Gods",
          "kind": "unique"
        }
      }
    ],
    "赛佛": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "独行特工",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Lone Operative",
          "kind": "core"
        }
      },
      {
        "id": "unique-agent-of-discord",
        "name": "混乱特使【光环】",
        "text": "每次你的对手用策略以他们军队中的一个单位为目标时，如果该单位在此模型 12\" 内，将该策略使用的 CP 花费增加 1CP（这不与任何其他会增加该策略 CP 花费的规则可累积）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Agent of Discord",
          "kind": "unique"
        }
      },
      {
        "id": "unique-guns-blazing",
        "name": "枪斗术",
        "text": "每回合一次，在你的对手的射击阶段中，当敌方单位进行指向此模型 3\" 范围内的友军 **异端阿斯塔特(Heretic Astartes)** 单位的远距攻击时，该敌方单位射击完后，此模型可如同你的射击阶段般射击，但其射击时必须只指向该敌方单位，且仅能在该敌方单位为合法目标时如此做。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Guns Blazing",
          "kind": "unique"
        }
      }
    ],
    "黑暗使徒": [
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
        "id": "unique-dark-zealotry",
        "name": "黑暗狂热",
        "text": "此单位正率领一个单位且其中包含 **黑暗使徒** 模型时，该单位中模型的每次近战攻击时，加1至致伤掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Zealotry",
          "kind": "unique"
        }
      },
      {
        "id": "unique-demagogue",
        "name": "聒噪鼓动",
        "text": "每场战斗一次，在任何阶段开始时，你可以选择一个友方 **异端阿斯塔特(Heretic Astartes)** 单位，该单位处于战斗震撼状态且在此单位的 **黑暗使徒** 模型的12\"内。该单位不再处于战斗震撼状态。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Demagogue",
          "kind": "unique"
        }
      },
      {
        "id": "unique-malign-sacrifice",
        "name": "恶毒祭献",
        "text": "在战斗阶段开始时，如果此单位含有一个或多个黑暗门徒模型，你可以选择其中一个模型和一个在此单位交战范围内的敌方单位，然后掷一次 D6：成功 2-5 时，该敌方单位承受 1 点灵能伤害；成功 6 时，该敌方单位承受 D3 点灵能伤害。该黑暗门徒模型随后被摧毁。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Malign Sacrifice",
          "kind": "unique"
        }
      }
    ],
    "被诅咒者": [
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
        "id": "unique-faithful-flock",
        "name": "狂热信众",
        "text": "当此单位正在带领另一支单位且内含**教派煽动者**模型时，该单位中的模型拥有 5+ 无敌豁免。",
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
          "englishName": "Faithful Flock",
          "kind": "unique"
        }
      },
      {
        "id": "unique-dark-ritual",
        "name": "黑暗仪式",
        "text": "每场战斗一次，在你的指挥阶段，若此单位包含 **教派煽动者** 模型，它可使用此能力。若它如此做，直到回合结束，此单位可在前进后的回合中宣言冲锋，且此单位中的模型每次发动攻击时，增加1到命中掷骰与增加1到致伤掷骰。",
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
        ],
        "source": {
          "englishName": "Dark Ritual",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chaos-icon",
        "name": "混沌圣旗",
        "text": "持有者所在的单位每次为 Dark Pacts 能力进行领导力检定时，你可以重掷该检定。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chaos Icon",
          "kind": "unique"
        }
      }
    ],
    "污染者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-scuttling-walker",
        "name": "多足机甲",
        "text": "此单位每次进行「正常移动」、「冲锋移动」或「后撤移动」时，可以穿过模型（**巨型(Titanic)**模型除外）与地形特征。如此移动时，可在敌方模型的交战距离内移动，但不能在敌方模型的交战距离内结束移动，且任何「绝望逃脱」测试自动通过。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scuttling Walker",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonforge",
        "name": "恶魔熔炉",
        "text": "每次此单位进行黑暗契约时，直到阶段结束，此模型每次进行攻击时，重掷致伤掷骰为 1。此外，每场战斗一次，当此单位进行黑暗契约时，在进行相应的领导力测试之前，你可宣告其将过度驱动其恶魔铸炉。如果执行：\n\n■ 如果相应的领导力测试失败，此模型改为承受 3 点灵能伤害，而非 D3 灵能伤害。\n■ 直到阶段结束，此模型每次进行攻击时，可重掷致伤掷骰。",
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
        ],
        "source": {
          "englishName": "Daemonforge",
          "kind": "unique"
        }
      }
    ],
    "法比乌斯拜尔": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "不知疼痛5+，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "fnp",
            "threshold": 5
          }
        ],
        "source": {
          "englishName": "Feel No Pain 5+, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-enhanced-warriors",
        "name": "强化战士",
        "text": "若此单位在战斗开始时依附到某个单位，则直到战斗结束，将该单位中护卫模型所配备近战武器的力量特性 +1，并将该单位中护卫模型的韧性特性 +1。",
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
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Enhanced Warriors",
          "kind": "unique"
        }
      },
      {
        "id": "unique-surgeon-acolyte",
        "name": "手术侍僧",
        "text": "每回合一次，当攻击被分配到此单位的模型时，如果此单位包含 **法比乌斯·拜尔**，你可以将该攻击的伤害特性改为 0。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Surgeon Acolyte",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chirurgeon",
        "name": "手术机械臂",
        "text": "第一次此单位的**法比乌斯·拜尔**模型被摧毁时，在阶段结束时，掷一个 D6：掷出 2+，在被摧毁位置附近将其重新放置在战场上，尽可能接近但不在任何敌方模型的接战距离内，伤口恢复满值。若该模型被摧毁时附属于一个单位，它必须重新设置为附属于该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chirurgeon",
          "kind": "unique"
        }
      }
    ],
    "恶角野兽人": [
      {
        "id": "unique-bestial-raiders",
        "name": "兽化劫掠者",
        "text": "若此单位在游戏开始时位于战略预备队中，则可在你的第一、第二或第三个移动阶段的增援步骤中设置，无视任何任务规则。若此单位在战略预备队中，为了在战场上设置此单位的目的，将当前战斗回合数视为比实际高一。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bestial Raiders",
          "kind": "unique"
        }
      }
    ],
    "铸造魔": [
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
        "id": "unique-daemonic-ordnance",
        "name": "魔化重炮",
        "text": "每当此模型被选择进行射击时，可使用此能力。若进行此操作，直到该阶段结束，其远程武器获得 **[毁灭性创伤]** 和 **[危险]** 特性。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Ordnance",
          "kind": "unique"
        }
      }
    ],
    "夺星者哈肯": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-head-taker",
        "name": "夺颅冲锋",
        "text": "当此模型领导一个单位时，每当此模型的单位完成一次冲锋移动时，选择一个在此模型的单位交战范围内的敌方单位，并为此模型的单位中在该敌方单位交战范围内的每个模型掷一个 D6：每个 4+ 上，该敌方单位受到 1 点灵能伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Head Taker",
          "kind": "unique"
        }
      },
      {
        "id": "unique-herald-of-the-apocalypse",
        "name": "毁灭先锋【光环】",
        "text": "当敌方单位在此模型 6\" 以内时，在对手指挥阶段的战斗震撼步骤中，如果该敌方单位低于其起始兵力，它必须进行战斗震撼测试。此能力不能导致一个单位在同一阶段进行两次战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Herald of the Apocalypse",
          "kind": "unique"
        }
      }
    ],
    "浩劫": [
      {
        "id": "unique-stabilisation-talons",
        "name": "稳定爪",
        "text": "此单位中的模型每次使用远程武器发动攻击时，可无视命中掷骰的任何或全部修正值，以及该武器弹道技能特性的任何或全部修正值。",
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
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Stabilisation Talons",
          "kind": "unique"
        }
      }
    ],
    "地狱兽": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1",
          "kind": "core"
        }
      },
      {
        "id": "unique-dark-ascension",
        "name": "暗黑晋升【光环】",
        "text": "当一个友军 **异端阿斯塔特(Heretic Astartes)** 单位在此模型 6\" 范围内时，每当该单位进行黑暗契约时，直到该阶段结束，该单位模型配备的武器获得该契约所赋予的两项能力（而非只有一项）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Ascension",
          "kind": "unique"
        }
      },
      {
        "id": "unique-devoted-to-destruction",
        "name": "沉迷毁灭",
        "text": "若此模型除近战武器外还配备2把近战武器，将这2把武器的攻击次数特性加上2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Devoted to Destruction",
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
        "name": "空中猎食者",
        "text": "每次此模型进行攻击，目标为能 **飞行(Fly)** 的单位时，加 1 到命中掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Airborne Predator",
          "kind": "unique"
        }
      }
    ],
    "阿斯塔特叛军恶魔亲王": [
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
        "id": "unique-dark-blessing",
        "name": "黑暗祝福【光环】",
        "text": "当一个友军 **异端阿斯塔特(Heretic Astartes)步兵(Infantry)** 单位在此模型 6\" 内时，每次远程攻击被分配给该单位中的一个模型，该模型对该攻击获得掩护收益。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Blessing",
          "kind": "unique"
        }
      },
      {
        "id": "unique-ascended-daemon",
        "name": "升魔冠军",
        "text": "此模型每次进行射击或战斗时，在解决这些攻击的过程中，可重掷一次命中掷骰，并可重掷一次致伤掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ascended Daemon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-lord-of-chaos",
        "name": "混沌领主",
        "text": "当此模型在一个或多个友军 **异端阿斯塔特(Heretic Astartes)步兵(Infantry)** 单位的 3\" 内时，此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of Chaos",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-allegiance",
        "name": "恶魔契约",
        "text": "当你选择将此模型纳入军队时,你必须选择下列关键字之一。至战斗结束,此模型拥有该关键字以及下列为该关键字所载的属性修正: ■ 恐虐(Khorne):此模型地狱锻造武器的力量(S)属性 +2。 ■ 奸奇(Tzeentch):此模型地狱火炮的攻击(A)属性 +3。 ■ 纳垢(Nurgle):此模型耐受(T)属性 +1。 ■ 色孽(Slaanesh):此模型移动(M)属性 +2\"。",
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
            "value": 2
          }
        ],
        "source": {
          "englishName": "Daemonic Allegiance",
          "kind": "unique"
        }
      }
    ],
    "阿斯塔特叛军带翼恶魔亲王": [
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
        "id": "unique-daemonic-destruction",
        "name": "毁天灭地",
        "text": "此模型每次结束冲锋移动时，在其交战范围内选择一个敌方单位，并为该模型每个剩余伤害值掷一次D6：每掷出4+，该敌方单位承受1点致命伤（最多6点致命伤）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Destruction",
          "kind": "unique"
        }
      },
      {
        "id": "unique-flying-horror",
        "name": "天降恐怖",
        "text": "此模型每次结束一次正常或推进移动时，选择一个在该移动中被其经过的敌方单位。该单位必须进行战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flying Horror",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-allegiance",
        "name": "恶魔契约",
        "text": "当你选择将此模型纳入军队时,你必须选择下列关键字之一。至战斗结束,此模型拥有该关键字以及下列为该关键字所载的属性修正: ■ 恐虐(Khorne):此模型地狱锻造武器的力量(S)属性 +2。 ■ 奸奇(Tzeentch):此模型地狱火炮的攻击(A)属性 +3。 ■ 纳垢(Nurgle):此模型耐受(T)属性 +1。 ■ 色孽(Slaanesh):此模型移动(M)属性 +2\"。",
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
            "value": 2
          }
        ],
        "source": {
          "englishName": "Daemonic Allegiance",
          "kind": "unique"
        }
      }
    ],
    "黑心休伦": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，不知疼痛5+，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "fnp",
            "threshold": 5
          }
        ],
        "source": {
          "englishName": "Deep Strike, Feel No Pain 5+, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-lord-of-badab",
        "name": "巴达布暴君",
        "text": "当友方**异端阿斯塔特(Heretic Astartes)步兵(Infantry)**单位（不包括战栗单位和**受诅咒**单位）在此模型 6\" 内时，在该单位模型的目标控制特性值上加 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of Badab",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hamadrya-s-knowledge",
        "name": "使魔之力【灵能】",
        "text": "每战斗回合一次，当敌方单位在距此模型所在单位 8\" 内结束正常移动、前进或后撤时，若此模型所在单位不在一个或多个敌方单位的交战范围内，则可进行距离最多为 D3+3\" 的正常移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hamadrya’s Knowledge",
          "kind": "unique"
        }
      }
    ],
    "恐虐颅骨之王": [
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
        "id": "unique-plough-through-the-enemy",
        "name": "碾过敌群",
        "text": "在战斗阶段，在此模型完成其攻击后，若此模型本阶段摧毁了一个或多个敌方单位，在此模型6\"内的每个敌方单位必须进行战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Plough Through the Enemy",
          "kind": "unique"
        }
      }
    ],
    "克拉维克·莫恩": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-headlong-destruction",
        "name": "莽撞毁灭",
        "text": "此单位中每个模型对最近的合格敌方单位发动攻击时，将该攻击的护甲穿透特性提升 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Headlong Destruction",
          "kind": "unique"
        }
      },
      {
        "id": "unique-architect-of-ruin",
        "name": "毁灭缔造者",
        "text": "在战役开始时，从你的对手的军队中选择一个单位作为此模型的宿敌。此模型每次对其宿敌发动攻击时，你可重掷致伤掷骰。此模型的宿敌被摧毁时，你可从对手的军队中选择一个新单位作为其宿敌。",
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
          "englishName": "Architect of Ruin",
          "kind": "unique"
        }
      }
    ],
    "军团战士": [
      {
        "id": "unique-veterans-of-the-long-war",
        "name": "长久战争老兵",
        "text": "每次此单位中的模型以近战攻击锁定敌方单位时，重掷致伤掷骰1。若该敌方单位在目标标记范围内，你可以重掷该致伤掷骰。",
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
          "englishName": "Veterans of the Long War",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chaos-icon",
        "name": "混沌圣旗",
        "text": "持有者所在的单位每次为 Dark Pacts 能力进行领导力检定时，你可以重掷该检定。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chaos Icon",
          "kind": "unique"
        }
      }
    ],
    "魔机统领": [
      {
        "id": "unique-corrupt-machine-spirits",
        "name": "腐化机魂",
        "text": "在你的射击阶段开始时，选择距此模型 12\" 内的一个可见敌方 **载具(Vehicle)** 单位，掷一个 D6：掷骰结果为 2-3，该敌方单位承受 D3 灵能伤害；掷骰结果为 4-5，该敌方单位承受 3 灵能伤害；掷骰结果为 6，该敌方单位承受 D3+3 灵能伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Corrupt Machine Spirits",
          "kind": "unique"
        }
      },
      {
        "id": "unique-spirit-thief",
        "name": "机魂大盗",
        "text": "在你的射击阶段开始时，选择一个可见的敌方**载具(Vehicle)**单位。直到该阶段结束，每当友军 **异端阿斯塔特(Heretic Astartes)** 模型进行以该单位为目标的攻击时，重掷一次致伤掷骰 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Spirit Thief",
          "kind": "unique"
        }
      }
    ],
    "枭首魔将": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "辅助",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Support",
          "kind": "core"
        }
      },
      {
        "id": "unique-warp-sighted-butcher",
        "name": "灵视屠夫",
        "text": "此模型领导一个单位时，该单位中每个模型每次进行近战攻击目标位于低于其起始兵力的单位时，可重掷命中掷骰。若该单位 低于半数，则可重掷致伤掷骰。",
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
            "mode": "failed",
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          },
          {
            "type": "wound-reroll",
            "mode": "failed",
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Warp-sighted Butcher",
          "kind": "unique"
        }
      },
      {
        "id": "unique-trophy-taker",
        "name": "斩首战功",
        "text": "此模型每次摧毁一个敌军**角色(Character)**模型时，你获得1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Trophy Taker",
          "kind": "unique"
        }
      }
    ],
    "附魔大师": [
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
        "id": "unique-daemonkin",
        "name": "魔裔【灵能】",
        "text": "当此模型领导单位时，为该单位的前进与冲锋掷骰加上 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonkin",
          "kind": "unique"
        }
      },
      {
        "id": "unique-sacrificial-dagger",
        "name": "祭献匕首",
        "text": "每个阶段一次，当此模型被选择进行射击或战斗时，其可使用此能力。若其如此做，此模型的单位承受 1 点净伤害，直到该阶段结束，此模型每次进行灵能攻击时，命中掷骰加 1 且致伤掷骰加 1。",
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
          },
          {
            "type": "wound-modifier",
            "value": 1
          }
        ],
        "source": {
          "englishName": "Sacrificial Dagger",
          "kind": "unique"
        }
      }
    ],
    "大漩涡之主": [
      {
        "id": "unique-choice-samples",
        "name": "精选样本",
        "text": "当此单位的盖里昂·屍体宗师在战场上时，在你的指挥阶段，选择以下之一：你可将1个被摧毁的模型（**角色(Character)** 模型除外）返回此单位，或，若一个或多个 **异端阿斯塔特(Heretic Astartes)步兵(Infantry)** 单位来自你的军队、兵力低于初始配置且在此单位3\"内，你获得1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Choice Samples",
          "kind": "unique"
        }
      },
      {
        "id": "unique-fleet-command",
        "name": "舰队指挥",
        "text": "双方玩家都部署完军队后，若此单位在战场上（或它所乘坐的任何 **运输工具(Transport)** 在战场上），选择你的军队中最多三个 **异端阿斯塔特(Heretic Astartes)** 单位并重新部署它们。这样做时，你可以将这些单位部署在战略预备队中，不受战略预备队已有单位数的限制。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fleet Command",
          "kind": "unique"
        }
      },
      {
        "id": "unique-plunder",
        "name": "劫掠",
        "text": "每场战斗一次，此单位结束常规移动后，可选择距离它 12\" 内一个可见的敌方单位并掷一枚 D6：结果为 2+，该敌方单位承受 D3+1 点鲜血伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Plunder",
          "kind": "unique"
        }
      },
      {
        "id": "unique-masters-of-the-maelstrom",
        "name": "漩涡之主",
        "text": "在宣告战斗编成步骤开始时,此单位可加入下列其一单位。此后至战斗结束,此单位视为该单位的一部分,且该单位的起始兵力(Starting Strength)随之增加。 ■ CHOSEN ■ LEGIONARIES ■ RED CORSAIRS RAIDERS 此单位不能加入已附加(Attached)单位,且只有 HURON BLACKHEART 能加入此单位所加入的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Masters of the Maelstrom",
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
        "id": "unique-siege-crawler",
        "name": "攻城机械",
        "text": "你可以忽视对此模型的移动特性及其前进与冲锋掷骰的任何或所有修正。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Siege Crawler",
          "kind": "unique"
        }
      }
    ],
    "残杀者": [
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
        "id": "unique-crushing-charge",
        "name": "粉碎冲锋",
        "text": "你可重掷此单位进行的冲锋掷骰，且每次此单位进行冲锋移动时，选择一个敌方单位，并为此单位中在该单位交战范围内的每个模型掷一次D6：每次结果4+，该敌方单位承受D3点道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Crushing Charge",
          "kind": "unique"
        }
      }
    ],
    "复仇之爪": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "隐蔽",
        "status": "通用核心技能，规则全文见《核心规则》",
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
        "id": "unique-visions-of-suffering",
        "name": "苦难预兆【灵能】",
        "text": "此单位中的模型每次对低于其起始兵力的敌方单位进行攻击时，命中掷骰 +1。若该敌方单位为低于半数，致伤掷骰亦 +1。",
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
          },
          {
            "type": "wound-modifier",
            "value": 1
          }
        ],
        "source": {
          "englishName": "Visions of Suffering",
          "kind": "unique"
        }
      },
      {
        "id": "unique-voice-eater",
        "name": "噬声器",
        "text": "当敌方单位（不含 **怪兽(Monster)** 与 **载具(Vehicle)**）位于持有者所在的单位的接战范围内时，无法以计谋指定其为目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Voice Eater",
          "kind": "unique"
        }
      }
    ],
    "黑石魔冠": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-malevolent-locus",
        "name": "恶意枢纽",
        "text": "友方 **异端阿斯塔特(Heretic Astartes)** 单位在此 **防御工事(Fortification)** 9\" 范围内时，改善该单位的「领导力」特性 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Malevolent Locus",
          "kind": "unique"
        }
      },
      {
        "id": "unique-malign-cover",
        "name": "恶意掩护",
        "text": "远程攻击分配到某个模型时，若该模型因为此 **防御工事(Fortification)** 而不能被攻击单位中的每个模型完全看见，该模型在该攻击中获得掩护益处。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Malign Cover",
          "kind": "unique"
        }
      },
      {
        "id": "unique-fortification",
        "name": "防御工事",
        "text": "当敌方单位仅在你的军队中一个或多个 **防御工事(Fortification)** 的交战范围内时：\n\n■ 该单位仍可被选为远程攻击的目标，但每次进行此类攻击时，除非该攻击是用手枪进行，否则从命中掷骰减 1。\n■ 该单位中的模型在战斗震撼时后撤时无需进行绝望逃脱测试，除非它们在此过程中会越过敌方模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fortification",
          "kind": "unique"
        }
      }
    ],
    "泯灭者": [
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
        "id": "unique-warp-rift-firepower",
        "name": "裂空火力",
        "text": "每场战斗一次，在射击阶段中，此单位可以使用此能力。如果它这样做了，直到该阶段结束，此单位模型配备的远程武器获得 **[曲射]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warp Rift Firepower",
          "kind": "unique"
        }
      }
    ],
    "附魔战士": [
      {
        "id": "unique-unholy-bloodshed",
        "name": "不洁血脉",
        "text": "每场战斗一次，当此单位进行黑暗契约时，直到本阶段结束，此单位内的模型装备的武器具有 **[毁灭性创伤]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unholy Bloodshed",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chaos-icon",
        "name": "混沌圣旗",
        "text": "持有者所在的单位每次为 Dark Pacts 能力进行领导力检定时，你可以重掷该检定。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chaos Icon",
          "kind": "unique"
        }
      }
    ],
    "猛禽": [
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
        "id": "unique-fearsome",
        "name": "恐怖【光环】",
        "text": "当敌方单位在此单位 6\" 内时，每次该敌方单位进行战斗震撼或领导力测试时，从结果中减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fearsome",
          "kind": "unique"
        }
      },
      {
        "id": "unique-terrifying-assault",
        "name": "惊惧突袭",
        "text": "在战斗阶段开始时，位于具此能力的一个或多个单位的交战范围内的每个敌方单位必须进行战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Terrifying Assault",
          "kind": "unique"
        }
      }
    ],
    "红海盗劫掠者": [
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
        "id": "unique-trophy-takers",
        "name": "战利品收集者",
        "text": "此单位首次击毁一个敌方单位后，直到战斗结束，在此单位未处于战斗震撼时，此单位中模型的目标控制特征 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Trophy Takers",
          "kind": "unique"
        }
      }
    ],
    "红海盗掠夺连长": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "渗透，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Infiltrators, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-brutal-raider",
        "name": "残暴袭击者",
        "text": "此模型的单位每次结束冲锋移动时，直到回合结束，此模型装备的近战武器力量加 1，并改善这些武器的护甲穿透特性 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Brutal Raider",
          "kind": "unique"
        }
      },
      {
        "id": "unique-raider-s-due",
        "name": "袭击者的应得",
        "text": "每次此单位宣告冲锋且目标为一个或多个位于一个或多个目标标记范围内的单位时，你可以重掷冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Raider’s Due",
          "kind": "unique"
        }
      }
    ],
    "巫师": [
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
        "id": "unique-prescience",
        "name": "预知危险【灵能】",
        "text": "此模型率领某单位时，每次对该单位发动攻击时，从命中掷骰中减1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Prescience",
          "kind": "unique"
        }
      },
      {
        "id": "unique-gift-of-chaos",
        "name": "混沌赠礼【灵能】",
        "text": "每次此模型被选定进行射击或近战时，解决其攻击后，选择一个被其一次或多次攻击命中且具有 **[灵能]** 能力的敌方单位。该单位必须进行领导测试：若测试失败，该单位承受D3点直伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Gift of Chaos",
          "kind": "unique"
        }
      }
    ],
    "终结者巫师": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-warptime",
        "name": "扭曲时空【灵能】",
        "text": "当此模型率领一个单位时，你可重掷该单位的前进和冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warptime",
          "kind": "unique"
        }
      },
      {
        "id": "unique-death-hex",
        "name": "死亡诅咒【灵能】",
        "text": "在你的射击阶段开始时，一个具有此能力的 **灵能者(Psyker)** 可以使用它。若其如此，选择一个位于该 **灵能者(Psyker)** 12\"内且可见的敌方单位，并掷一个D6：掷出1，该 **灵能者(Psyker)** 的单位承受D3点道德伤害；掷出2+，直到你的下一个移动阶段开始，每次攻击瞄准该敌方单位时，改善该攻击的护甲穿透特性1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Death Hex",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chaos-familiar",
        "name": "灵能使魔",
        "text": "每场战斗一次，当一次攻击被分配给持有者时，你可以将其伤害(D)特性改为 0。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chaos Familiar",
          "kind": "unique"
        }
      }
    ],
    "叛军执法者": [
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
        "id": "unique-brutal-example",
        "name": "野蛮榜样",
        "text": "每战斗回合一次，当此单位领导一个单位且包含一个 **叛逆执法者** 模型时，你可以使用 0CP 代价针对该单位使用「守望射击」策略，且即便你本回合已针对你军队的另一个单位使用过该策略，仍可如此进行。每次你使用此能力时，该单位中一个护卫模型被消灭。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Brutal Example",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mutated-bodyguard",
        "name": "变异护卫",
        "text": "当此单位包含背叛巨魔模型时，此单位中的 **角色(Character)** 模型具有不觉疼痛4+ 能力。",
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
            "threshold": 4
          }
        ],
        "source": {
          "englishName": "Mutated Bodyguard",
          "kind": "unique"
        }
      }
    ],
    "叛变卫队": [
      {
        "id": "unique-twisted-defence-force",
        "name": "叛变卫军",
        "text": "此单位位于目标标记的范围内时，每次远程攻击以此单位为目标，此单位中的模型对该攻击拥有掩护庇护。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Twisted Defence Force",
          "kind": "unique"
        }
      }
    ],
    "瓦什托尔": [
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
        "id": "unique-unholy-mechanisms",
        "name": "不洁机魂【光环】",
        "text": "当友方 **恶魔(Daemon)载具(Vehicle)** 单位在此模型 6\" 内时，将该单位中模型配备的武器的力量特性加上 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unholy Mechanisms",
          "kind": "unique"
        }
      },
      {
        "id": "unique-reorder-reality",
        "name": "重组现实",
        "text": "每次此模型18\"内的敌方单位瞄准此模型时，从命中掷骰扣除1，且直到此阶段结束，该敌方单位的远程武器具有 **[危险]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Reorder Reality",
          "kind": "unique"
        }
      },
      {
        "id": "unique-indentured-daemon-engines",
        "name": "契约恶魔引擎",
        "text": "当此模型位于一个或多个友方**恶魔(Daemon)载具(Vehicle)**单位的 3\" 范围内时，此模型具有独行者能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Indentured Daemon Engines",
          "kind": "unique"
        }
      }
    ],
    "剧毒爬行者": [
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
        "id": "unique-soul-eater",
        "name": "灵魂吞噬",
        "text": "在战斗阶段结束时，若此模型在此阶段进行的一次或多次攻击摧毁了一个或多个敌方单位，直到战斗结束，将此模型武器的「攻击次数」特征增加 1。",
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
            "value": 1
          }
        ],
        "source": {
          "englishName": "Soul Eater",
          "kind": "unique"
        }
      }
    ],
    "次元铁匠": [
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
        "id": "unique-warpsmith",
        "name": "次元铁匠",
        "text": "此模型位于 1 个或多个友方 **异端阿斯塔特(Heretic Astartes)载具(Vehicle)** 单位 3\" 范围内时，此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warpsmith",
          "kind": "unique"
        }
      },
      {
        "id": "unique-master-of-mechanisms",
        "name": "机械主宰",
        "text": "在你的指挥阶段，选择位于此模型 3\" 内的一个友方 **异端阿斯塔特(Heretic Astartes)载具(Vehicle)** 模型。该 **载具(Vehicle)** 模型恢复最多 D3 点失去的伤，并且直到你的下一个指挥阶段开始前，该 **载具(Vehicle)** 每次发动攻击时，命中掷骰加 1。每个模型每指挥阶段只能被此能力选择一次。",
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
        ],
        "source": {
          "englishName": "Master of Mechanisms",
          "kind": "unique"
        }
      },
      {
        "id": "unique-enrage-machine-spirits",
        "name": "机魂暴走",
        "text": "在你的移动阶段结束时，选择此模型 12\" 内的一个敌方 **载具(Vehicle)** 单位。该单位必须进行战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Enrage Machine Spirits",
          "kind": "unique"
        }
      }
    ],
    "次元爪": [
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
        "id": "unique-warp-strike",
        "name": "次元突袭",
        "text": "在战斗阶段结束时，若此单位本阶段摧毁了1个或以上敌方单位，且不在1个或以上敌方单位的交战范围内，则可将此单位从战场移除并放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warp Strike",
          "kind": "unique"
        }
      }
    ],
    "地狱之爪": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
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
        "text": "此模型每次完成一次正常移动后，你可以选择在该移动过程中被此模型穿过的一个敌方单位，并掷骰六个D6：每个3+，该单位承受1点心灵伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bomb Rack",
          "kind": "unique"
        }
      }
    ],
    "术士（纳垢轿辇）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可附加至以下单位：\n■ 瘟疫海军陆战队",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-gift-of-poxes-psychic",
        "name": "瘟疫之赐（灵能）",
        "text": "此模型统领单位时，该单位中的模型配备的武器具有 [连击 1] 能力。",
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
          }
        ],
        "source": {
          "englishName": "Gift of Poxes (Psychic)",
          "kind": "unique"
        }
      },
      {
        "id": "unique-feculent-despair-aura-psychic",
        "name": "腐败绝望（光环、灵能）",
        "text": "当敌方单位在此模型 6\" 内时，每次该单位进行战斗震撼测试时，从该测试中减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Feculent Despair (Aura, Psychic)",
          "kind": "unique"
        }
      }
    ],
    "叛军欧格林暴徒 [Legends]": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-ogryn-combat-stimms",
        "name": "欧格伦战斗兴奋剂",
        "text": "此单位内每个被近战攻击摧毁的模型，若该模型本阶段尚未战斗过，掷一次 D6。成功 4+，不将其移除出场；该被摧毁的模型可在攻击模型单位完成其攻击后进行战斗，之后被移除出场。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ogryn Combat Stimms",
          "kind": "unique"
        }
      }
    ],
    "突变鼠害": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约，痛苦无感",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts, Feel No Pain",
          "kind": "core"
        }
      },
      {
        "id": "unique-mischief-makers-aura",
        "name": "恶作剧大师（光环）",
        "text": "当敌方单位（不包括怪物和载具）在此单位 6\" 内时，该单位中的每个模型每次进行近战攻击时，对命中掷骰-1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Mischief Makers (Aura)",
          "kind": "unique"
        }
      }
    ],
    "至尊勇士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可以附加至以下单位：\n■ 选民\n■ 军团兵\n\n你可以将此模型附加至上述单位之一，即使已有另一个角色模型已附加至该单位（一个单位不能有两个褫夺者冠军附加至它）。如果你这样做，且该护卫单位被摧毁，附加至该单位的领袖单位变成独立单位，具有其原始起始兵力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-dark-champion",
        "name": "黑暗冠军",
        "text": "当此模型领导一个单位时，该单位中的每个模型每次发动攻击时，命中掷骰+1。",
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
          "englishName": "Dark Champion",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aspire-to-glory",
        "name": "渴求荣耀",
        "text": "此单位每次进行黑暗契约时，直到该阶段结束，此模型所装备武器的力量特征+D3。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aspire to Glory",
          "kind": "unique"
        }
      }
    ],
    "持枪邪教徒暴民 [Legends]": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-for-the-dark-gods",
        "name": "为了黑暗诸神",
        "text": "在你的指挥阶段结束时，若此单位在你控制的目标标记范围内，该目标标记保持在你的控制下，即使你在其范围内无模型，直到对手在任一回合的开始或结束时控制它。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "For the Dark Gods",
          "kind": "unique"
        }
      }
    ],
    "大型疫病无人机": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-dark-pacts",
        "name": "黑暗契约",
        "text": "阵营能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hovering-death",
        "name": "盘旋死神",
        "text": "此模型在进行了后撤的回合仍可射击和宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hovering Death",
          "kind": "unique"
        }
      }
    ],
    "地狱之刃": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-invulnerable-save",
        "name": "无敌豁免",
        "text": "此模型具有5+无敌豁免。",
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
    "惧爪空降舱": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-dark-pacts",
        "name": "黑暗契约",
        "text": "阵营能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "unique"
        }
      },
      {
        "id": "unique-dreadclaw-assault",
        "name": "惧爪突击",
        "text": "必须在增援中开始但不计入增援限制。可在第一、第二或第三移动阶段到达。登下的单位设置距敌方模型超过 9\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dreadclaw Assault",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输",
        "text": "12 个异端阿斯塔特步兵模型。跳跃背包/被附身者/终结者计为 2 个位置；地狱残暴者计为 3 个。可以改为运输 1 个地狱劈裂者或无畏机甲。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "术士（奸奇飞盘）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可以依附至下列单位：\n- 红宗秘仪护卫兵",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-flames-of-change-psychic",
        "name": "变化之焰（灵能）",
        "text": "此模型领导一个单位时，该单位中的模型装备的远程武器具有 [IGNORES COVER] 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flames of Change (Psychic)",
          "kind": "unique"
        }
      },
      {
        "id": "unique-altered-reality-psychic",
        "name": "变异现实（灵能）",
        "text": "每战斗回合一次，在为此模型掷命中掷骰、致伤掷骰或豁免掷骰后，你可以将该掷骰的结果改为 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Altered Reality (Psychic)",
          "kind": "unique"
        }
      }
    ],
    "阿兰尼斯·扎坎": [
      {
        "id": "unique-献祭匕首",
        "name": "献祭匕首",
        "text": "（每个单位，每个阶段限一次）在该单位**被选择进行攻击**时，您可以使用本技能。若使用：\n■ 该单位受到 1 处**致命伤**。\n■ 该单位的灵能攻击拥有：\n■ **命中掷骰** +1。\n■ **致伤掷骰** +1。",
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
          },
          {
            "type": "wound-modifier",
            "value": 1
          }
        ],
        "source": {
          "englishName": "献祭匕首",
          "kind": "unique"
        }
      },
      {
        "id": "unique-魔裔-灵能",
        "name": "魔裔（灵能）",
        "text": "在该单位中存在护卫模型时，该单位进行的**突进掷骰**和**冲锋掷骰** +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "魔裔（灵能）",
          "kind": "unique"
        }
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **扎坎魔裔军团战士**\n■ **扎坎魔裔附魔战士**",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "unique"
        }
      }
    ],
    "术士（机车）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可被配置到下列单位：\n- 混沌骑兵",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-prescience-psychic",
        "name": "预知（灵能）",
        "text": "此模型统领单位时，每次攻击指向该单位，命中掷骰 -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Prescience (Psychic)",
          "kind": "unique"
        }
      },
      {
        "id": "unique-unholy-power",
        "name": "邪能",
        "text": "此单位进行黑暗契约时，至阶段结束前，此模型每次进行灵能攻击时，致伤掷骰加 1。",
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
          "englishName": "Unholy Power",
          "kind": "unique"
        }
      }
    ],
    "叛军执法官 [Legends]": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-brutal-example",
        "name": "野蛮榜样",
        "text": "当此模型领导一个单位时，可用 0 指令点对该单位使用「疯狂之勇」策略，且即使你的军队中另一单位已在本阶段被该策略选中也可进行。每次使用此能力时，该单位中的一个护卫模型被摧毁。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Brutal Example",
          "kind": "unique"
        }
      },
      {
        "id": "unique-enforcer",
        "name": "执法者",
        "text": "此模型所属单位可在后撤的同一回合中宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Enforcer",
          "kind": "unique"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可附属于下列单位：\n■ 叛徒守卫队\n■ 叛徒重型武器队",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
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
      }
    ],
    "叛军重武器小队 [Legends]": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-covering-fire",
        "name": "掩护射击",
        "text": "每当以「火力压制」策略对此单位进行目标指定时，在解决该策略期间，命中在未修正的命中掷骰 5+ 时成功。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Covering Fire",
          "kind": "unique"
        }
      }
    ],
    "盖勒疫感染者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约，痛苦无感",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts, Feel No Pain",
          "kind": "core"
        }
      },
      {
        "id": "unique-fearsome-aura",
        "name": "可怖（光环）",
        "text": "敌方单位在此单位 6\" 范围内时，该敌方单位进行战斗震撼或领导力测试时，从结果减去 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fearsome (Aura)",
          "kind": "unique"
        }
      }
    ],
    "混沌领主（机车）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-invulnerable-save",
        "name": "无敌豁免",
        "text": "此模型具有4+无敌豁免。",
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
          "englishName": "Invulnerable Save",
          "kind": "unique"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可以依附至下列单位：\n■ 混沌骑士",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-swift-assault",
        "name": "迅捷突击",
        "text": "此模型率领单位时，该单位中模型所配备的远程武器具有 [ASSAULT] 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Swift Assault",
          "kind": "unique"
        }
      }
    ],
    "毁灭者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命毁灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "D3 Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-dark-pacts",
        "name": "黑暗契约",
        "text": "阵营能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "unique"
        }
      },
      {
        "id": "unique-infernal-regeneration",
        "name": "炼狱再生",
        "text": "此模型首次被摧毁时，移除它而无需进行致命破灭。阶段结束时，掷一个 D6：结果为 2+ 时，将其重新设置在尽可能靠近被摧毁位置的地方，且不在交战范围内，并具有 D6 伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infernal Regeneration",
          "kind": "unique"
        }
      },
      {
        "id": "unique-damaged",
        "name": "受损",
        "text": "剩余 1-4 伤：命中掷骰 -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Damaged",
          "kind": "unique"
        }
      }
    ],
    "混沌领主（奸奇飞盘）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-invulnerable-save",
        "name": "无敌豁免",
        "text": "此模型具有 4+ 无敌豁免。",
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
          "englishName": "Invulnerable Save",
          "kind": "unique"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可被配置到下列单位：\n■ 精选者\n■ 军团兵\n■ 符纹战士",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-lord-of-fate",
        "name": "命运之主",
        "text": "当此模型领导一个单位时，该单位中的模型对心灵伤害拥有不觉疼痛5+ 能力。",
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
        ],
        "source": {
          "englishName": "Lord of Fate",
          "kind": "unique"
        }
      }
    ],
    "流亡灵能者 [Legends]": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可被附加至下列单位：\n■ 受诅教徒\n■ 教徒暴民\n■ 负电邪教徒 [Legends]",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-cursed-wardings-psychic",
        "name": "诅咒守护（灵能）",
        "text": "当此模型率领一个单位时，该单位中的模型针对灵能攻击具有 4+ 不觉疼痛能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cursed Wardings (Psychic)",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychic-barrier-psychic",
        "name": "灵能屏障（灵能）",
        "text": "在你对手的射击阶段开始时，你可掷一次 D6：结果为 1，此灵能者单位受到 D3 点灵魂伤害；结果为 2+，直到阶段结束，此灵能者单位内的模型具有 4+ 无懈豁免。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Psychic Barrier (Psychic)",
          "kind": "unique"
        }
      }
    ],
    "叛军瘟疫欧格林 [Legends]": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约，痛苦无感",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts, Feel No Pain",
          "kind": "core"
        }
      },
      {
        "id": "unique-wall-of-muscle",
        "name": "肌肉之墙",
        "text": "每次攻击分配给此单位中的一个模型时，从该攻击的伤害特征中减 1。",
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
          "englishName": "Wall of Muscle",
          "kind": "unique"
        }
      }
    ],
    "叛军欧格林驯兽师 [Legends]": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-beastmaster",
        "name": "驯兽师",
        "text": "当此单位包含一个欧格林兽群主宰模型时，可为此单位重掷冲锋掷骰，且此单位内每个混沌撕裂犬模型发动攻击时，重掷 1 的命中掷骰。",
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
          "englishName": "Beastmaster",
          "kind": "unique"
        }
      }
    ],
    "负电邪教徒 [Legends]": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约，痛苦无感",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts, Feel No Pain",
          "kind": "core"
        }
      },
      {
        "id": "unique-invulnerable-save",
        "name": "无敌豁免",
        "text": "此单位中的模型拥有 5+ 豁免。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Invulnerable Save",
          "kind": "unique"
        }
      },
      {
        "id": "unique-voltagheist-field",
        "name": "电灵力场",
        "text": "此单位每次结束冲锋移动时，选择一个在其交战范围内的敌方单位，并为此单位中的每个模型掷一次 D6：每有 1 个 4+，该敌方单位承受 1 点道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Voltagheist Field",
          "kind": "unique"
        }
      },
      {
        "id": "unique-servants-of-the-abyss",
        "name": "深渊仆从",
        "text": "若你的军队中具有领袖能力的单位可附加到一个 教徒暴民，则它可改为附加到此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Servants of the Abyss",
          "kind": "unique"
        }
      }
    ],
    "血腥屠杀者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命毁灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "D3 Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-dark-pacts",
        "name": "黑暗契约",
        "text": "阵营能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "unique"
        }
      },
      {
        "id": "unique-scuttling-gait",
        "name": "蛇行步态",
        "text": "前进时，改为增加 6\" 移动而非掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scuttling Gait",
          "kind": "unique"
        }
      }
    ],
    "混沌领主（纳垢轿辇）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-invulnerable-save",
        "name": "无敌豁免",
        "text": "此模型具有4+无敌豁免。",
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
          "englishName": "Invulnerable Save",
          "kind": "unique"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可被附加至下列单位：\n■ 精英战士\n■ 军团战士\n■ 瘟疫战士",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-revolting-regeneration",
        "name": "恶心再生",
        "text": "在你的指挥阶段开始时，此模型恢复最多 D3 点失去的伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Revolting Regeneration",
          "kind": "unique"
        }
      }
    ],
    "混沌雷鹰炮艇": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命毁灭，悬浮",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "D6+2 Deadly Demise D6+2, Hover",
          "kind": "core"
        }
      },
      {
        "id": "unique-dark-pacts",
        "name": "黑暗契约",
        "text": "单位可以订立 [LETHAL HITS] 或 [SUSTAINED HITS 1] 的契约，但必须先通过领导力测试，否则遭受 D3 致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "unique"
        }
      },
      {
        "id": "unique-thunderhawk-cluster-bombs",
        "name": "雷鹰集束炸弹",
        "text": "每次持有者完成常规移动时，可以选择它在该移动期间通过的一个敌方单位，并掷 6D6：每个结果为 3+ 时，该单位受到 1 点战斗伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Thunderhawk Cluster Bombs",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aerial-assault",
        "name": "空中突击",
        "text": "拥有深入打击的单位在正常移动后下船时，仍然符合冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aerial Assault",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输",
        "text": "30 个异端阿斯塔特步兵或骑乘模型。跳跃背包、着魔者和终结者模型占用 2 个空间；灭绝者占用 3 个；骑乘模型占用 4 个。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "混沌领主（色孽战驹）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-invulnerable-save",
        "name": "无敌豁免",
        "text": "此模型具有 4+ 无敌豁免。",
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
          "englishName": "Invulnerable Save",
          "kind": "unique"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可附着于以下单位：\n■ 混沌机车兵",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-cut-off-their-escape",
        "name": "断其退路",
        "text": "敌方单位（不含怪物和载具）在此模型所属单位的交战范围内被选择后撤时，该敌方单位的模型必须进行绝望逃脱测试，如同其单位被战斗震撼一样。此时，若该敌方单位同时被其他方式战斗震撼，从该单位的每次绝望逃脱测试中减去 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cut Off Their Escape",
          "kind": "unique"
        }
      }
    ],
    "混沌领主（钢牛）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-invulnerable-save",
        "name": "无敌豁免",
        "text": "此模型具有 4+ 无敌豁免。",
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
          "englishName": "Invulnerable Save",
          "kind": "unique"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可被配置到下列单位：\n■ 混沌骑兵\n■ 恐虐狂战士",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-bloody-stampede",
        "name": "血腥践踏",
        "text": "此模型所属单位每次完成冲锋移动时，选择一个在此模型交战范围内的敌方单位并掷 1D6：结果为 2-3 时，该敌方单位承受 1 点心灵伤害；结果为 4-5 时，该敌方单位承受 D3 点心灵伤害；结果为 6 时，该敌方单位承受 D3+3 点心灵伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bloody Stampede",
          "kind": "unique"
        }
      }
    ],
    "混沌迪摩斯掠食者 [Legends]": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "unique-armoured-spearhead",
        "name": "装甲先锋",
        "text": "此模型每次对敌方单位发动攻击时，可重掷命中掷骰 1，且若该单位在你未控制的目标标记物范围内时，可改为重掷命中掷骰。",
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
          "englishName": "Armoured Spearhead",
          "kind": "unique"
        }
      }
    ],
    "术士（色孽战驹）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "黑暗契约",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Dark Pacts",
          "kind": "core"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "此模型可以附属于以下单位：\n- 混沌机车骑兵",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      },
      {
        "id": "unique-infernal-speed",
        "name": "地狱速度",
        "text": "当此模型领导一个单位时，将该单位中的模型的移动特性改为14\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infernal Speed",
          "kind": "unique"
        }
      },
      {
        "id": "unique-dark-favour-psychic",
        "name": "黑暗恩宠（灵能）",
        "text": "此模型统领单位时，该单位中的模型具有 4+ 无敌豁免。",
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
          "englishName": "Dark Favour (Psychic)",
          "kind": "unique"
        }
      }
    ],
    "扎坎魔裔军团战士": [
      {
        "id": "unique-战斗小队",
        "name": "战斗小队",
        "text": "在宣布战斗编队步骤开始时，您可以将该单位分成两个独立的单位，每一个单位中包含五个模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "战斗小队",
          "kind": "unique"
        }
      },
      {
        "id": "unique-混沌圣像",
        "name": "混沌圣像",
        "text": "在该单位进行一次黑暗契约时，该单位可以重掷**领导力掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "混沌圣像",
          "kind": "unique"
        }
      },
      {
        "id": "unique-万古长战老兵",
        "name": "万古长战老兵",
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
          "englishName": "万古长战老兵",
          "kind": "unique"
        }
      }
    ],
    "扎坎魔裔附魔战士": [
      {
        "id": "unique-混沌圣像",
        "name": "混沌圣像",
        "text": "在该单位进行一次黑暗契约时，该单位可以重掷**领导力掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "混沌圣像",
          "kind": "unique"
        }
      },
      {
        "id": "unique-亵渎杀戮",
        "name": "亵渎杀戮",
        "text": "（每个单位，每场战斗限一次）在该单位进行一次黑暗契约时，您可以使用本技能。若使用，该单位的攻击拥有**[毁灭伤害]**。",
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
            "type": "devastating-wounds"
          }
        ],
        "source": {
          "englishName": "亵渎杀戮",
          "kind": "unique"
        }
      }
    ],
    "扎坎魔裔混沌教众": [
      {
        "id": "unique-以黑暗诸神之名",
        "name": "以黑暗诸神之名",
        "text": "在您的指挥阶段结束时，如果该单位控制一个**目标**，那个**目标**被**占领**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "以黑暗诸神之名",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
