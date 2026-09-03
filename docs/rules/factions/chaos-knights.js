/* Generated source-text rule package for chaos-knights. */
(function (root) {
  root["WarhammerWebsiteRules_chaos_knights"] = {
  "factionRules": [
    {
      "id": "chaos-knights.army-rule",
      "name": "恐惧先驱",
      "englishName": "Harbingers of Dread",
      "text": "你军队中具有此能力的每个单位获得启用中的恐惧能力。战斗开始时死亡恐惧即启用；之后每场第一、三、五战斗回合开始时，可选 1 个 1-6 号中的恐惧能力启用，或掷两颗 D6 随机决定两个。\n\n已启用的恐惧能力维持到战斗结束。同一能力不可选两次，随机重复者无额外效果。\n\n不适用 — 死亡恐惧（光环）\n\n敌方单位在此模型 9\" 内时，其领导力 -1。\n\n1 — 绝望（光环）\n\n敌方单位在此模型 9\" 内时，其领导力再 -1（与死亡恐惧叠加）。\n\n2 — 厄运\n\n此模型对惊骇目标的攻击致伤 +1。\n\n3 — 黑暗\n\n该模型拥有隐匿。\n\n4 — 惊愕（光环）\n\n对手指挥阶段的惊骇步骤中，每个位于此模型 9\" 内、低于起始编制的敌方单位须进行战斗震慑测试。\n\n5 — 谵妄（光环）\n\n敌方单位若位于此模型 9\" 内且编制低于一半，每次战斗震慑测试失败承受 D3 致命伤。\n\n6 — 统御\n\n此模型光环范围 +3\"。\n\n超重型步行机甲\n\n进行普通／推进／后撤移动时可穿过非泰坦级模型与 4\" 以下地形：\n\n■ 可进入敌人交战范围但不可结束于其中。\n■ 也可穿过 4\" 以上地形，但移动后掷一颗 D6，1 时惊骇。",
      "category": "faction",
      "status": "计算支持（满足原文条件时勾选）",
      "controls": [
        {
          "id": "doom",
          "type": "checkbox",
          "label": "启用厄运，且目标处于惊骇状态"
        },
        {
          "id": "darkness",
          "type": "checkbox",
          "label": "启用黑暗（本模型获得潜行）"
        }
      ],
      "effects": [
        {
          "type": "wound-modifier",
          "value": 1,
          "selection": {
            "controlId": "doom",
            "equals": true
          }
        },
        {
          "type": "incoming-hit-minus",
          "value": 1,
          "phase": "ranged",
          "selection": {
            "controlId": "darkness",
            "equals": true
          }
        }
      ],
      "source": {
        "englishName": "Harbingers of Dread",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "憎恶者骑士": [
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
        "id": "unique-vortex-terrors",
        "name": "恐惧漩涡（灵能）",
        "text": "在你的射击阶段开始时，选择一个位于此模型24\"内且此模型可见的敌方单位。该敌方单位必须进行一次战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Vortex Terrors",
          "kind": "unique"
        }
      },
      {
        "id": "unique-warp-storms",
        "name": "亚空间风暴（灵能）",
        "text": "在你的移动阶段结束时，为持有此能力的模型距 9\" 内的每一个敌方单位掷一次 D6：掷出 3+ 时，该敌方单位遭受 D3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warp Storms",
          "kind": "unique"
        }
      }
    ],
    "牛头怪骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 2D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-sunderer-of-fortresses",
        "name": "堡垒粉碎者",
        "text": "此模型每次对 **载具(Vehicle)** 发动攻击时，将该攻击的力量与伤害特性提升1（若该攻击对 **防御工事(Fortification)** 目标，改为将力量与伤害特性提升2）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Sunderer of Fortresses",
          "kind": "unique"
        }
      }
    ],
    "渎神者骑士": [
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
        "id": "unique-obsessive-ruthlessness",
        "name": "无情执着",
        "text": "每当此模型进行以 **凶兽(Monster)** 或 **载具(Vehicle)** 单位为目标的远程攻击时，该攻击具有 **[毁灭性创伤]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Obsessive Ruthlessness",
          "kind": "unique"
        }
      },
      {
        "id": "unique-taskmaster",
        "name": "残酷监工（光环）",
        "text": "友方 **战争猎犬** 模型在此模型 9\" 范围内时，该 **战争猎犬** 模型每次进行远程攻击时，可重掷命中掷骰 1。",
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
        ],
        "source": {
          "englishName": "Taskmaster",
          "kind": "unique"
        }
      }
    ],
    "巨人王骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 2D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-bastion-of-firepower",
        "name": "火力堡垒",
        "text": "此模型每次保持静止不动时，直到该回合结束，此模型配备的远程武器具有 **[致命一击]** 能力。",
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
          "englishName": "Bastion of Firepower",
          "kind": "unique"
        }
      }
    ],
    "黄泉骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-searing-flames",
        "name": "灼热烈焰",
        "text": "在你的射击阶段，在此模型射击后，选择一个被用 阿基隆火焰加农炮进行的一次或多次攻击命中的敌方单位。至本阶段结束止，该敌方单位无法受益于掩护。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Searing Flames",
          "kind": "unique"
        }
      },
      {
        "id": "unique-unrestrained-terror",
        "name": "不羁恐怖（光环）",
        "text": "友方 **战犬(War Dog)** 模型在距离此模型 6\" 内时，受此能力影响。在战斗阶段开始时，每个处于接触距离内的敌方单位（若在一个或多个受此能力影响的 **战犬(War Dog)** 单位接触距离内）必须进行战斗震撼检定。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unrestrained Terror",
          "kind": "unique"
        }
      }
    ],
    "掠夺者骑士": [
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
        "id": "unique-dread-dominion",
        "name": "恐惧领域（光环）",
        "text": "友军 **战犬(War Dog)** 模型位于此模型 9\" 范围内时，该 **战犬(War Dog)** 模型的领导力与目标控制特征提升 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dread Dominion",
          "kind": "unique"
        }
      },
      {
        "id": "unique-seething-hatred",
        "name": "沸腾仇恨",
        "text": "每次此单位被选择进行射击或战斗时，你可重掷一个命中掷骰，或在解决这些攻击时可重掷一个致伤掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Seething Hatred",
          "kind": "unique"
        }
      }
    ],
    "肆虐者骑士": [
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
        "id": "unique-bloodlust",
        "name": "嗜血",
        "text": "此模型每次进行冲锋移动时，直到回合结束，其近战武器具有 **[毁灭性创伤]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bloodlust",
          "kind": "unique"
        }
      },
      {
        "id": "unique-frenzied-rampage",
        "name": "狂暴肆虐（光环）",
        "text": "当友方 **战争猎犬** 模型在此模型9\"内时，该 **战争猎犬** 模型每次进行近战攻击时，重掷命中掷骰的1。",
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
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Frenzied Rampage",
          "kind": "unique"
        }
      }
    ],
    "命运女神骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-macro-extinction-protocols",
        "name": "灭绝协议",
        "text": "此模型每次对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位发动攻击时，命中掷骰 +1。若该目标为 **巨型** 或 **高耸**，致伤掷骰亦 +1。",
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
          "englishName": "Macro-extinction Protocols",
          "kind": "unique"
        }
      },
      {
        "id": "unique-consumed-with-hunger",
        "name": "饥饿渴望（光环）",
        "text": "当友军 **战犬(War Dog)** 模型位于此模型6\"内时，每次该 **战犬(War Dog)** 模型对 **巨型(Titanic)** 或 **高耸** 单位发动攻击时，你可以重掷命中掷骰。",
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
          "englishName": "Consumed with Hunger",
          "kind": "unique"
        }
      }
    ],
    "毁灭者骑士": [
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
        "id": "unique-methodical-destruction",
        "name": "系统性毁灭",
        "text": "在第一个战斗回合开始时，从你的对手的军队中选择一个单位为此模型的受害者。此模型每次对其受害者发动攻击时，可重掷致伤掷骰。每次此模型的受害者被摧毁时，选择一个新的敌方单位为此模型的受害者。",
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
          "englishName": "Methodical Destruction",
          "kind": "unique"
        }
      },
      {
        "id": "unique-close-range-killers",
        "name": "近距杀手（光环）",
        "text": "友军**战犬(War Dog)**模型在此模型9\"内时，该**战犬(War Dog)**模型每次对最近的符合条件目标发动攻击时，将该攻击的装甲穿透特征值+1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Close-range Killers",
          "kind": "unique"
        }
      }
    ],
    "惩戒者骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-storm-of-bolts",
        "name": "爆弹风暴",
        "text": "在你的射击阶段，此模型射击后，选择一个单位（不包括 **凶兽(Monster)** 和 **载具(Vehicle)**）被这些攻击中的一次或多次命中。直到你的下一回合开始，此模型仍在战场上时，该敌方单位被压制。当一支单位被压制时，该单位中的每次攻击，命中掷骰减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Storm of Bolts",
          "kind": "unique"
        }
      },
      {
        "id": "unique-offerings-for-the-dark-gods",
        "name": "献给黑暗诸神（光环）",
        "text": "当一个友方 **猎犬骑士** 模型在此模型6\"内时，该 **猎犬骑士** 模型装备的远距武器具有 **[连击 1]** 能力。",
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
          "englishName": "Offerings for the Dark Gods",
          "kind": "unique"
        }
      }
    ],
    "暴君骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-infernal-aegis",
        "name": "炼狱庇护（光环）",
        "text": "当一个友方 **战犬(War Dog)** 单位在此模型6\"范围内时，每次攻击该 **战犬(War Dog)** 单位时，其中的模型在该攻击中获得掩护优势。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infernal Aegis",
          "kind": "unique"
        }
      },
      {
        "id": "unique-bastion-of-corruption",
        "name": "腐化要塞",
        "text": "以援军身份在战场上部署的敌方单位无法在此模型12\"内部署。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bastion of Corruption",
          "kind": "unique"
        }
      }
    ],
    "枪骑兵骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-shock-charge",
        "name": "冲击冲锋",
        "text": "你可用0CP指令点使用「坦克冲撞」策略以此模型为目标，且即使你已在此阶段用该策略以不同单位为目标，你也可以这样做。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shock Charge",
          "kind": "unique"
        }
      },
      {
        "id": "unique-dark-fervour",
        "name": "黑暗狂热（光环）",
        "text": "当友军 **战犬(War Dog)** 模型在此模型 6\" 内时，该 **战犬(War Dog)** 模型配备的远程武器具有 **[突击]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dark Fervour",
          "kind": "unique"
        }
      }
    ],
    "复仇女神骑士": [
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
        "id": "unique-huntmaster",
        "name": "狩猎大师（光环）",
        "text": "当友军 **战犬(War Dog)** 模型在此模型 6\" 内时，该 **战犬(War Dog)** 模型配备的远程武器具有 **[ASSAULT]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Huntmaster",
          "kind": "unique"
        }
      },
      {
        "id": "unique-repair-auto-simulacra",
        "name": "自动修复模式",
        "text": "在你的指挥阶段结束时，此模型恢复最多D3点已损失的伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Repair Auto-simulacra",
          "kind": "unique"
        }
      }
    ],
    "战犬暴匪": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-brigand",
        "name": "暴匪",
        "text": "此模型每次对距离一个或多个目标标记范围内的单位发动远距攻击时，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Brigand",
          "kind": "unique"
        }
      }
    ],
    "冥河骑士": [
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
        "id": "unique-preysight",
        "name": "猎手视觉（光环）",
        "text": "当友军 **战犬(War Dog)** 模型在此模型 6\" 内时，该 **战犬(War Dog)** 模型配备的远程武器具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Preysight",
          "kind": "unique"
        }
      },
      {
        "id": "unique-grav-pinned",
        "name": "引力束缚",
        "text": "在你的射击阶段中，此模型射击后，如果敌军 **步兵(Infantry)** 单位被一次或多次用重力粉碎炮进行的攻击命中，直到你的对手下一个回合结束为止，该敌军单位处于重力钉扎状态。当单位处于重力钉扎状态时，减少该单位的移动特性 2，并减少该单位所进行的冲锋掷骰 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grav-pinned",
          "kind": "unique"
        }
      }
    ],
    "战犬处决者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-executioner",
        "name": "处决者",
        "text": "此模型每次对低于半数的单位发动攻击时，在命中掷骰上 +1。每次敌方单位因此模型的攻击而被摧毁时，在将该单位的最后一个模型移出战场之前，你对手军队中在其 3\" 内的其他每个单位必须进行战斗震撼测试。",
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
          "englishName": "Executioner",
          "kind": "unique"
        }
      }
    ],
    "战犬猎手": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-huntsman",
        "name": "猎手",
        "text": "每次此模型对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位发动攻击时，你可重掷致伤掷骰。",
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
          "englishName": "Huntsman",
          "kind": "unique"
        }
      }
    ],
    "战犬肉食者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-karnivore",
        "name": "肉食者",
        "text": "可重掷此单位进行的前进和冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Karnivore",
          "kind": "unique"
        }
      }
    ],
    "战犬追猎者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭，侦察6\"",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3, Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-stalker",
        "name": "追猎者",
        "text": "此模型每次对敌方单位发动攻击时，若你的对手军队中没有其他单位在该目标距 6\" 以内，则加 1 到致伤掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Stalker",
          "kind": "unique"
        }
      }
    ],
    "战犬天命者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-protection-protocols",
        "name": "保护协议",
        "text": "你可以用「英勇介入」计谋以此单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做：\n■ 该次使用减少 1 指令点。\n■ 该次使用不会阻止本阶段该计谋用于其他单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Protection Protocols",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
