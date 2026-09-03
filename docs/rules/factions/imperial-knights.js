/* Generated source-text rule package for imperial-knights. */
(function (root) {
  root["WarhammerWebsiteRules_imperial_knights"] = {
  "factionRules": [
    {
      "id": "imperial-knights.army-rule",
      "name": "骑士守则",
      "englishName": "Code Chivalric",
      "text": "读取任务目标步骤结束时，为军队决定一份誓约，由一个义举与一个品德组成（各三选一，可直接挑或掷 D6 随机决定）。\n\n义举首次完成时誓约履行：军队变为荣耀直到战斗结束，并获得 2CP（若义举或品德为随机选择则得 3CP）。此 CP 不受核心规则「每回合最多 +1CP」限制。\n\n义举\n\n我们发誓打倒暴君……（D6：1-2）\n\n战斗开始时挑对手一个角色模型；该模型被摧毁的回合结束时完成。\n\n我们誓言收复领地……（D6：3-4）\n\n对手回合结束时你控制的目标标记比对手多即完成。\n\n我们保证将斩获丰厚……（D6：5-6）\n\n在战斗轮次结束时，如果在本战斗轮次中被摧毁的敌方单位大于当前的战斗轮次数，该伟业完成，即使被摧毁的单位随后又回到战场上（例如，在第一个战斗轮次中有两个被摧毁的敌方单位）。\n\n品德\n\n……我们的武勇已胜过众生。（D6：1-2）\n\n每次此模型射击或战斗时，可各重掷一次命中与一次致伤。\n\n……我们渴望迎接挑战。（D6：3-4）\n\n此模型移动 +2\"，推进／冲锋掷骰 +1。\n\n……然我们的遗产永不污浊。（D6：5-6）\n\n此模型目标控制 +2，领导力 +1。\n\n隶属\n\n某些帝国骑士有「隶属」能力。你的指挥阶段中，每个具有隶属能力的模型可选一个 12\" 内的友方护卫骑士（不可选已受隶属影响者），直到下个指挥阶段该护卫骑士受该能力影响。\n\n超重型步行机甲\n\n进行常规／推进／后撤移动时可穿过非泰坦级模型与 4\" 以下地形：\n\n■ 可进入敌人交战范围但不可结束于其中。\n■ 也可穿过 4\" 以上地形，但移动后掷一颗 D6，1 时惊骇。\n\n自由骑士\n\n若军队中所有模型皆有帝国关键字，即使派系不符，你仍可带一个泰坦级帝国骑士模型、或最多三个护卫骑士模型。这些模型不可担任统帅，也不可装备强化。",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": [],
      "source": {
        "englishName": "Code Chivalric",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "护卫侍从": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D3",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-suppression-protocols",
        "name": "压制协议",
        "text": "在你的射击阶段中，在此模型射击后，选择一个敌方单位（不包括 **凶兽(Monster)** 和 **载具(Vehicle)**）被使用阿尔玛迪格自动炮进行的一次或多次攻击命中。直到你的下一个回合开始，该敌方单位被压制。当一个单位被压制时，每次该单位中的一个模型进行攻击时，从命中掷骰中扣除 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Suppression Protocols",
          "kind": "unique"
        }
      }
    ],
    "牛头怪型阿卡斯托斯骑士": [
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
        "text": "此模型每次针对 **载具(Vehicle)** 发动攻击时，将该攻击的力量与伤害特征提升 1（如果该攻击针对 **防御工事(Fortification)**，则改为将力量与伤害特征提升 2）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Sunderer of Fortresses",
          "kind": "unique"
        }
      }
    ],
    "巨人王型阿卡斯托斯骑士": [
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
    "战刃侍从": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D3",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-impetuous-glory",
        "name": "先锋荣耀",
        "text": "此模型每次进行冲锋移动时，直到回合结束为止，将此模型割裂链刀（劈砍型态）的攻击次数特性加 1，并将此模型割裂链刀（挥扫型态）的攻击次数特性加 2。",
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
          "englishName": "Impetuous Glory",
          "kind": "unique"
        }
      }
    ],
    "狼王号": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-legendary-freeblade",
        "name": "传奇自由之刃",
        "text": "每回合一次，你可以以 0CP 的代价对此模型使用一个策略，即使你在同一阶段已经对另一个单位使用该策略也可以。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Legendary Freeblade",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chainbreaker",
        "name": "破链者",
        "text": "每场战斗一次，在任何阶段开始时，你可选择一个被战斗震撼且在此模型12\"内的友方 **帝国(Imperium)** 单位。该单位不再处于战斗震撼状态。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chainbreaker",
          "kind": "unique"
        }
      },
      {
        "id": "unique-using-sir-hekhtur",
        "name": "使用赫克托爵士",
        "text": "若你的 Canis Rex 模型被摧毁,则此模型视为从被摧毁的运输工具(Transport)下载具的模型,并必须进行一次紧急脱离移动(Emergency Disembarkation)。除核心计谋(Core Stratagems)外,赫克图爵士不能被选为你任何计谋的目标。在赫克图爵士也被摧毁之前,你的 Canis Rex 单位不视为已被摧毁。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Using Sir Hekhtur",
          "kind": "unique"
        }
      }
    ],
    "天命型侍从": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D3",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-protection-protocols",
        "name": "防护协议",
        "text": "你可以用「英勇介入」计谋以此单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做：\n■ 该次使用减少 1 指令点。\n■ 该次使用不会阻止本阶段该计谋用于其他单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Protection Protocols",
          "kind": "unique"
        }
      }
    ],
    "赫克图爵士": [
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
        "id": "unique-using-sir-hekhtur",
        "name": "使用赫克托爵士",
        "text": "若你的 Canis Rex 模型被摧毁,则此模型视为从被摧毁的运输工具(Transport)下载具的模型,并必须进行一次紧急脱离移动(Emergency Disembarkation)。除核心计谋(Core Stratagems)外,赫克图爵士不能被选为你任何计谋的目标。在赫克图爵士也被摧毁之前,你的 Canis Rex 单位不视为已被摧毁。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Using Sir Hekhtur",
          "kind": "unique"
        }
      }
    ],
    "堡主骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6+2",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-ion-aegis",
        "name": "离子庇护（光环）",
        "text": "当友方 **护卫骑士(Armiger)** 模型在此模型6\"范围内时，每次远程攻击以该模型为目标时，该模型在该攻击中获得掩护优势。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ion Aegis",
          "kind": "unique"
        }
      },
      {
        "id": "unique-titan-hunter",
        "name": "泰坦猎手",
        "text": "每当此模型进行的远程攻击分配给一个 **凶兽(Monster)** 或 **载具(Vehicle)** 模型时，你可以重掷伤害掷骰。",
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
          "englishName": "Titan Hunter",
          "kind": "unique"
        }
      }
    ],
    "远征骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-crusader-s-duty",
        "name": "远征职责（仆从）",
        "text": "当一个模型受此能力影响时，每次该模型进行远程攻击时，于命中掷骰加 1。",
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
          "englishName": "Crusader’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-punishing-salvoes",
        "name": "毁灭齐射",
        "text": "在你的移动阶段，如果此模型保持静止，直到回合结束，此模型装备的远程武器具有 **[连击 1]** 能力。",
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
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Punishing Salvoes",
          "kind": "unique"
        }
      }
    ],
    "护卫骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-defender-s-duty",
        "name": "防卫者的责任",
        "text": "当一个模型受此能力影响时，每次攻击被分配至该模型时，该攻击的伤害特性减1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Defender’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-selfless-protector",
        "name": "无私守护者",
        "text": "每次远程攻击分配给你的军队中的 **帝国骑士(Imperial Knights)** 模型时，若该模型因此骑士防卫者模型而对攻击单位中的每个模型都未完全可见，该模型具有掩护优势与对该攻击的 4+ 无敌豁免。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Selfless Protector",
          "kind": "unique"
        }
      }
    ],
    "黄泉型角蝰骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6+2",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-acheron-s-duty",
        "name": "阿克龙之责",
        "text": "当一个模型受此能力影响时，在战斗阶段开始时，所有在一个或多个具有此能力的单位的交战范围内的敌方单位必须进行战斗震撼测试，进行测试时从结果减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Acheron’s Duty",
          "kind": "unique"
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
      }
    ],
    "命运女神型角蝰骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6+2",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-atrapos-duty",
        "name": "阿特罗珀斯的职责",
        "text": "当模型受此能力影响时，每次该模型发动针对 **巨型(Titanic)** 或 **高耸** 模型的攻击时，你可以重掷命中掷骰，且你可以重掷致伤掷骰。",
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
        ],
        "source": {
          "englishName": "Atrapos’ Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-macro-extinction-protocols",
        "name": "巨擘灭绝协议",
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
      }
    ],
    "战驹骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-ram-jets",
        "name": "推进喷射",
        "text": "每次此单位被选择进行常规或推进移动时，直到阶段结束，此模型的移动特征加 D3\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ram Jets",
          "kind": "unique"
        }
      },
      {
        "id": "unique-thundercharge",
        "name": "雷霆冲击",
        "text": "若此模型配备雷霆震波矛和贝拉图斯收割者链锯，将此模型配备的近战武器的攻击次数特性增加 2。",
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
            "value": 2,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Thundercharge",
          "kind": "unique"
        }
      },
      {
        "id": "unique-saturation-fire",
        "name": "压制射击",
        "text": "此模型每次对在一个或多个目标标记物距离内的单位发动远程攻击时，该攻击具有**[无视掩体]**能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Saturation Fire",
          "kind": "unique"
        }
      }
    ],
    "游侠骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-errant-s-duty",
        "name": "游侠职责（仆从）",
        "text": "当模型受此能力影响时，你可重掷该模型的推进移动掷骰，且由该模型配备的远程武器具有 **[突击]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Errant’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aggressive-assault",
        "name": "侵略突袭",
        "text": "每当此模型进行射击攻击锁定最近的符合条件目标时，命中掷骰加1。",
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
          "englishName": "Aggressive Assault",
          "kind": "unique"
        }
      }
    ],
    "惩戒者型角蝰骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6+2",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-castigator-s-duty",
        "name": "惩罚者的职责",
        "text": "当一个模型受此能力影响时，其远程武器具有 **[连击 1]** 能力，且其远程武器的装甲穿透特性提升1。",
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
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Castigator’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-storm-of-bolts",
        "name": "弹雨风暴",
        "text": "在你的射击阶段，此模型射击后，选择一个单位（不包括 **凶兽(Monster)** 和 **载具(Vehicle)**）被这些攻击中的一次或多次命中。直到你的下一回合开始，此模型仍在战场上时，该敌方单位被压制。当一支单位被压制时，该单位中的每次攻击，命中掷骰减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Storm of Bolts",
          "kind": "unique"
        }
      }
    ],
    "枪骑兵型角蝰骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6+2",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-lancer-s-duty",
        "name": "矛兵的职责",
        "text": "当一个模型受到此能力影响时，它在已经前进的同一回合内符合宣布冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lancer’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shock-charge",
        "name": "震击冲锋",
        "text": "你可用0CP指令点使用「坦克冲撞」策略以此模型为目标，且即使你已在此阶段用该策略以不同单位为目标，你也可以这样做。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shock Charge",
          "kind": "unique"
        }
      }
    ],
    "勇武骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-gallant-s-duty",
        "name": "勇武职责（仆从）",
        "text": "当模型受此能力影响时，你可以重掷为该模型进行的冲锋掷骰，且该模型每次进行近战攻击时，你可以重掷命中掷骰。",
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
          }
        ],
        "source": {
          "englishName": "Gallant’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-martial-pride",
        "name": "骄傲武技",
        "text": "此单位每次进行巩固时，若你的单位能以进入一个或多个敌方单位的交战范围来结束该移动，则其中的模型可额外移动 3\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Martial Pride",
          "kind": "unique"
        }
      }
    ],
    "圣堂骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-paladin-s-duty",
        "name": "圣堂职责（仆从）",
        "text": "当模型受此能力影响时，由该模型配备的武器具有 **[LETHAL HITS]** 能力，由该模型配备的近战武器具有 **[LANCE]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Paladin’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-seasoned-noble",
        "name": "百战贵族",
        "text": "此模型每次以远程攻击对最近的合格目标发动攻击时，提升该攻击的护甲穿透特征 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Seasoned Noble",
          "kind": "unique"
        }
      }
    ],
    "教导骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-mentor",
        "name": "导师（仆从）",
        "text": "每当受此能力影响的模型进行以此模型的猎物为目标的攻击时，你可重掷致伤掷骰。",
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
          "englishName": "Mentor",
          "kind": "unique"
        }
      },
      {
        "id": "unique-exemplar-of-the-code",
        "name": "守则典范",
        "text": "在战斗开始时，从你的对手军队中选择一个单位为此模型的猎物。每次此模型对其猎物发动攻击时，可重掷致伤掷骰。每次此模型的猎物被摧毁时，可从你的对手军队中选择一个新的单位为其猎物。",
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
          "englishName": "Exemplar of the Code",
          "kind": "unique"
        }
      }
    ],
    "英勇骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6+2",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
          "kind": "core"
        }
      },
      {
        "id": "unique-ion-aegis",
        "name": "离子庇护（光环）",
        "text": "当友方 **护卫骑士(Armiger)** 模型在此模型6\"范围内时，每次远程攻击以该模型为目标时，该模型在该攻击中获得掩护优势。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ion Aegis",
          "kind": "unique"
        }
      },
      {
        "id": "unique-thundershock",
        "name": "烈焰风暴",
        "text": "在你的射击阶段，每当你选择此模型雷鸣线圈鱼叉的目标时，为目标单位掷一次D6，并为距目标单位6\"内的每个其他敌方单位掷一次D6。结果为4+时，被掷骰的单位遭弧形能量击中；解决完此模型对目标单位的所有攻击后，每个遭弧形能量击中的单位承受D3点道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Thundershock",
          "kind": "unique"
        }
      }
    ],
    "守望骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-warden-s-duty",
        "name": "守望职责（仆从）",
        "text": "当模型受到此能力影响时，该模型装备的武器具有 **[连击 1]** 能力，且该模型装备的远程武器具有 **[无视掩体]** 能力。",
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
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Warden’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-thin-their-ranks",
        "name": "击破阵线",
        "text": "此模型每次对敌方单位（**凶兽(Monster)**和**载具(Vehicle)**除外）发动远程攻击时，该攻击具有 **[毁灭性创伤]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Thin Their Ranks",
          "kind": "unique"
        }
      }
    ],
    "复仇女神型巡游骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-magaera-s-duty",
        "name": "玛格拉的职责",
        "text": "当一个模型受到此能力影响时，每当该模型对最近的合格目标发动远程攻击时，将该攻击的力量和护甲穿透特性提升 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Magaera’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-repair-auto-simulacra",
        "name": "自动修复拟机",
        "text": "在你的指挥阶段结束时，此模型恢复最多D3点已损失的伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Repair Auto-simulacra",
          "kind": "unique"
        }
      }
    ],
    "冥河型巡游骑士": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭 D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-styrix-s-duty",
        "name": "Styrix之职责",
        "text": "当模型受到此能力影响时，每次选择该模型射击或战斗时，在其完成所有攻击后，选择被这些攻击命中的一个敌方单位 - 该单位必须进行战斗震撼测试，进行测试时减去一。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Styrix’s Duty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-grav-pinned",
        "name": "重力钉扎",
        "text": "在你的射击阶段中，此模型射击后，如果敌军 **步兵(Infantry)** 单位被一次或多次用重力粉碎炮进行的攻击命中，直到你的对手下一个回合结束为止，该敌军单位处于重力钉扎状态。当单位处于重力钉扎状态时，减少该单位的移动特性 2，并减少该单位所进行的冲锋掷骰 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grav-pinned",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
