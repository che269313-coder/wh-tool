/* Generated source-text rule package for tau-empire. */
(function (root) {
  root["WarhammerWebsiteRules_tau_empire"] = {
  "factionRules": [
    {
      "id": "tau-empire.army-rule",
      "name": "为了上上善道",
      "text": "如果己方军队的阵营为钛帝国，在己方射击阶段开始时，你可以选择一个拥有本技能的己方单位，使其成为观测单位。\n\n在己方射击阶段中，为每一个可以进行射击且在该阶段没有被选中进行射击的观测单位（防御工事和处于战斗震慑状态的单位除外）选择一个对其可见的敌方单位，直到该阶段结束前，该敌方单位成为其标记单位。每个敌方单位在每个阶段中只能被选作标记单位一次。\n\n己方军队中拥有「为了上上善道」技能的单位（观测单位除外）在以标记单位为目标进行攻击时，成为被指引单位。直到该阶段结束前，每当己方军队中一个被指引单位中的模型（观测单位中的模型除外）以一个标记单位为目标进行攻击时：\n\n■ 射击技巧属性提升 1 点。\n■ 若标记该敌方单位的观测单位拥有标靶光关键字，该攻击获得无视掩体。",
      "category": "faction",
      "status": "计算支持（满足原文条件时勾选）",
      "controls": [
        {
          "id": "guided",
          "type": "checkbox",
          "label": "本单位是被指引单位且正攻击其标记单位"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1,
          "phase": "ranged",
          "selection": {
            "controlId": "guided",
            "equals": true
          }
        }
      ]
    }
  ],
  "unitRules": {
    "攻坚小队": [
      {
        "id": "unique-breach-and-clear",
        "name": "破袭扫荡",
        "text": "此单位中的模型每次对敌方单位发动远程攻击且该敌方单位在目标标记范围内时，可重掷致伤掷骰。",
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
        "id": "unique-ds8-support-turret",
        "name": "DS8 支援炮塔",
        "text": "在你的移动阶段，如果此单位静止不动，直到你的下一回合开始，其 Shas'ui 模型装备支援炮塔武器。\n\n**设计师说明**：在此单位旁放置一个支援炮塔令牌来提醒你。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-guardian-drone",
        "name": "守护无人机",
        "text": "每次有模型进行以持有者所在的单位为目标的远程攻击时，致伤掷骰 -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "舷炮战斗服": [
      {
        "id": "unique-advanced-armour",
        "name": "进阶装甲",
        "text": "此单位中的模型对致命伤具有不觉疼痛4+ 能力。",
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
        ]
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-missile-drone",
        "name": "飞弹无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-weapon-support-system",
        "name": "武器支援系统",
        "text": "持有者每次进行远程攻击时，你可以忽略命中掷骰的任何或所有修正。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "火刃首领": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-volley-fire",
        "name": "齐射",
        "text": "此模型领导一个单位时，在该单位中装备远距武器的模型的「攻击」特性加1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-crack-shot",
        "name": "精确射手",
        "text": "此模型每次进行远程攻击，在暴击致伤时，该攻击具有 -3 的护甲穿透特性。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "AX-1-0 虎鲨攻击机": [
      {
        "id": "core-deadly-demise-d6-2",
        "name": "致命破灭 D6",
        "text": "致命破灭D6+2",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-titan-hunter",
        "name": "泰坦猎手",
        "text": "此模型的双联重型轨道炮和搜寻飞弹在目标位于半距内时具有 **[反钛星 3+]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "指挥官远见": [
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
        "id": "unique-way-of-the-short-blade",
        "name": "短刀之道",
        "text": "当此模型率领一个单位时，该单位中的每个模型每次对位于 9\" 内的敌方单位发动攻击时，在致伤掷骰上加 1。",
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
            "type": "wound-modifier",
            "value": 1,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-puretide-s-teachings",
        "name": "纯潮之教",
        "text": "每战斗回合一次，你军队中的一个具有此能力的单位在成为战略卡使用目标时可使用此能力。若如此，减少该战略卡使用成本 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-independent-power",
        "name": "独立势力",
        "text": "若你的军队包含 COMMANDER FARSIGHT,则不能包含任何 ETHEREAL 单位。若你的军队包含任何 ETHEREAL 单位,则不能包含 COMMANDER FARSIGHT。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "冷星战斗服指挥官": [
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
        "id": "unique-coldstar-commander",
        "name": "冷星指挥官",
        "text": "当此模型领导一个单位时，该单位中的模型移动特性为 12\"，且该单位中的模型配备的远程武器具有 **[突击]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-weapon-support-system",
        "name": "武器支援系统",
        "text": "持有者每次进行远程攻击时，你可以忽略命中掷骰的任何或所有修正。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-generator",
        "name": "护盾产生器",
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
        ]
      },
      {
        "id": "unique-battlesuit-support-system",
        "name": "战斗装甲支援系统",
        "text": "持有者所在的单位在其撤退的回合中仍有资格射击，但如此做时，只有装备此战争装备的模型可以进行远程攻击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "执法者战斗服指挥官": [
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
        "id": "unique-enforcer-commander",
        "name": "执法者指挥官",
        "text": "当此模型领导一个单位时，每次远距离攻击指定该单位为目标时，恶化该攻击的护甲穿透特性 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-weapon-support-system",
        "name": "武器支援系统",
        "text": "持有者每次进行远程攻击时，你可以忽略命中掷骰的任何或所有修正。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-generator",
        "name": "护盾产生器",
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
        ]
      },
      {
        "id": "unique-battlesuit-support-system",
        "name": "战斗装甲支援系统",
        "text": "持有者所在的单位在其撤退的回合中仍有资格射击，但如此做时，只有装备此战争装备的模型可以进行远程攻击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "指挥官影阳": [
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
        "id": "unique-agile-combatant",
        "name": "敏捷战士",
        "text": "此模型在后撤的回合仍可在射击阶段射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-hero-of-the-empire",
        "name": "帝国英雄",
        "text": "当友军 **钛帝国(T'au Empire)** 单位在此模型 6\" 内时，该单位中的模型每次进行远程攻击时，重掷一次结果为 1 的命中掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-command-link-drone-aura",
        "name": "指挥链接无人机（光环）",
        "text": "当一个友军 **钛帝国(T'au Empire)** 单位位于持有者 6\" 内时，每次你选择该单位作为计谋的目标，掷一颗 D6：掷出 5+ 时，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-advanced-guardian-drone",
        "name": "进阶守护无人机",
        "text": "每次有远程攻击指定持有者为目标时，致伤掷骰 -1。",
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
    "危机炎刃战斗服": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-fireknife",
        "name": "火刃",
        "text": "此单位中的模型每次进行远程攻击，重掷结果为 1 的命中掷骰。若该攻击目标为一个处于满额兵力的单位，则可重掷命中掷骰。",
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
        "id": "unique-weapon-support-systems",
        "name": "武器支援系统",
        "text": "此单位中每个模型每次进行远程攻击时，你可无视命中掷骰的任何或全部修正。",
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
        ]
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "危机星镰战斗服": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-starscythe",
        "name": "星镰",
        "text": "此单位的每个模型每次进行远程攻击时（不包括以 **凶兽(Monster)** 和 **载具(Vehicle)** 为目标的攻击），将该攻击的护甲穿透特性提升1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-battlesuit-support-systems",
        "name": "战斗服支援系统",
        "text": "此单位在后撤的回合中有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "危机阳铸战斗服": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-sunforge",
        "name": "日锻",
        "text": "此单位中的模型每次对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位进行远程攻击时，可重掷致伤掷骰，亦可重掷伤害掷骰。",
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
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "暗行": [
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
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-structural-analyser",
        "name": "结构弱点分析",
        "text": "当此模型率领一支单位时，该单位中每个模型进行远程攻击时，致伤掷骰 +1。",
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
        ]
      },
      {
        "id": "unique-jammer-array",
        "name": "干扰阵列",
        "text": "从预备队设置在战场上的敌方单位不能在距离该模型12\"内设置。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "魔鬼鱼运输艇": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-rapid-deployment",
        "name": "快速部署",
        "text": "单位可在此 **运输工具(Transport)** 进行推进后脱离。这样做的单位视为在该阶段进行了一次常规移动，不能在同一回合宣告冲锋，但可在该回合剩余时间内正常行动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 12 个钛帝国步兵模型。该模型不能运输战斗服、克鲁特或胡蜂尖翼模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "以太": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-failure-is-not-an-option",
        "name": "失败不是选项",
        "text": "当此模型领导一个单位时，该单位中的模型具有不觉疼痛5+ 能力。",
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
        "id": "unique-coordinated-leadership",
        "name": "协调领导",
        "text": "在你的指挥阶段结束时，掷一次 D6：在结果为 4+ 时，你获得 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-hover-drone",
        "name": "悬浮无人机",
        "text": "持有者可 **飞行(Fly)**，且拥有 10\" 的移动(M)特性。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "火眼小队": [
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
        "id": "unique-precise-targeting",
        "name": "精准瞄准",
        "text": "此单位中每个模型每次对已发现的敌方单位发动攻击时，可重掷命中掷骰。",
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
        ]
      }
    ],
    "鬼船战斗服": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
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
        "id": "unique-stealth-drones",
        "name": "隐形无人机",
        "text": "每场战斗两次，在一次攻击被分配至此模型后，你可将该攻击的伤害特性改为 0。\n\n**设计者注记：**：在该单位旁放置两个潜行无人机记号，每使用一次此能力时移除一个。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-battlesuit-support-system",
        "name": "战斗装甲支援系统",
        "text": "持有者在其撤退的回合中仍有资格射击，但它会失去 **烟幕(Smoke)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "锤头鲨炮艇": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-armour-hunter",
        "name": "装甲猎手",
        "text": "此模型每次对 **凶兽(Monster)** 或 **载具(Vehicle)** 进行攻击时，命中掷骰+1。",
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
        "id": "unique-targeting-array",
        "name": "瞄准阵列",
        "text": "每当此模型被选中射击时，你可重掷一次命中掷骰，或在解决该等攻击时重掷一次致伤掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "克鲁特捕食者": [
      {
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
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
        "id": "unique-fieldcraft",
        "name": "战场机动",
        "text": "在你的指挥阶段结束时，如果此单位在你控制的目标标记范围内，该目标标记保持在你的控制之下，直到你的对手在任何阶段末的目标控制优势大于你的优势为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "克鲁特远猎者": [
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
        "id": "unique-bounty-hunters",
        "name": "赏金猎人",
        "text": "在战斗开始时，从对手的军队中选择一个单位。此单位中的每个模型每次对该单位进行攻击时，该攻击具有 **[致命一击]** 与 **[精准]** 能力。",
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
        "id": "unique-pech-ra",
        "name": "佩克拉",
        "text": "持有者所在的单位装备的远程武器具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "克鲁特血肉塑形者": [
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
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
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
        "id": "unique-ritual-butchery",
        "name": "血肉仪式",
        "text": "当此模型领导一个单位时，该单位中模型配备的近战武器具有 **[连击 1]** 能力。",
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
        ]
      },
      {
        "id": "unique-rites-of-feasting",
        "name": "献祭飨宴",
        "text": "此模型正在率领一个单位时，该单位中的模型具有不觉疼痛6+ 能力。如果该单位在近战阶段摧毁了一个或更多敌方单位，直到战斗结束，该单位中的模型改为具有不觉疼痛5+ 能力。",
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
            "threshold": 6,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      }
    ],
    "克鲁特猎犬": [
      {
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
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
        "id": "unique-loping-pounce",
        "name": "疾跃突袭",
        "text": "在你的指挥阶段开始时，若此单位在 6\" 内至少有一个己方**克鲁特(Kroot)步兵(Infantry)**单位，则直到回合结束，此单位在已进行「前进」的回合仍有资格宣布冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-hunting-hounds",
        "name": "猎犬本能",
        "text": "当此单位在距离一个或多个己方 **克鲁特(Kroot) 角色(Character)** 模型 12\" 以内时，此单位中模型的目标控制特性为 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "克鲁特独矛": [
      {
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "独行特工",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
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
        "id": "unique-advanced-scouting",
        "name": "先进侦察",
        "text": "每次此模型进行命中敌方单位的远程攻击时，至本回合结束，每次你军队中的另一个 **克鲁特(Kroot)** 模型进行针对该敌方单位的攻击时，你可重掷命中掷骰。",
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
      },
      {
        "id": "unique-fire-and-fade",
        "name": "射击后隐匿",
        "text": "在你的射击阶段中，此模型射击后，若其不在一个或多个敌方单位的交战范围内，它可进行一次高达 6\" 的常规移动。若其如此做，至本回合结束为止，此模型不符合宣告冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "狂暴克鲁特兽": [
      {
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-kroot-linebreakers",
        "name": "克鲁特冲线者",
        "text": "此单位每次结束冲锋移动时，选择一个在其交战范围内的敌方单位，然后为此单位内在该敌方单位交战范围内的每个模型掷一个 D6：每掷出 4+，该敌方单位承受 D3 点致命伤。如果一个或以上敌方模型因此致命伤而被摧毁，该敌方单位必须进行一次战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "克鲁特兽骑兵": [
      {
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-kroot-packmates",
        "name": "克鲁特同伴",
        "text": "每回合一次，在你对手的射击阶段，当己方**克鲁特步兵**单位在此单位6\"内被选为攻击目标时，你军队中具有此能力的一个单位可以使用它。若它这样做，在该敌方单位完成其攻击后，具有此能力的该单位可以像在你的射击阶段一样射击，但在解决这些攻击时，它只能针对该敌方单位射击(且仅当其为合法目标时)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "克鲁特踪迹塑形者": [
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
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
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
        "id": "unique-trail-finding",
        "name": "追踪向导",
        "text": "每回合一次，当敌方单位以正常移动、前进或后撤方式结束移动时距此模型的单位周围9\"内，若此模型的单位不在一个或多个敌方单位的交战范围内，其可进行最多D6\"的正常移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-kroot-ambush",
        "name": "克鲁特伏击",
        "text": "在双方都部署完军队后，你可重新部署此模型的单位和另一个己方 **克若特** 单位。在进行此操作时，该等单位中的任何一个都可放入战略预备队，无论已有多少单位在战略预备队中。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "克鲁特战争塑形者": [
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
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
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
        "id": "unique-war-leader",
        "name": "战争领袖",
        "text": "每战斗回合一次，你军队中具有此能力的一个单位在成为计谋的目标时可以使用此能力。若如此，减少该计谋该次使用的 CP 消耗 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-root-of-honour",
        "name": "荣耀之根",
        "text": "每场一次，在任何阶段开始时，可选择一个己方 **克鲁特** 单位，该单位已动摇且在此模型 12\" 内。该单位不再动摇。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "蝠鱝登陆舰": [
      {
        "id": "core-deadly-demise-3d6",
        "name": "致命破灭 3",
        "text": "致命破灭3D6",
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
        "id": "unique-aggressive-deployment",
        "name": "侵略部署",
        "text": "在你的射击阶段中，此模型射击后，选择一个被该次攻击中的一个或多个击中的敌方单位。直到此阶段结束前，每次从此 **运输工具(Transport)** 于本回合脱离的友军模型对该敌方单位发动攻击时，你可以重掷致伤掷骰。",
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
        "id": "unique-air-caste-colossus",
        "name": "空族巨像",
        "text": "每当你以计谋指定此模型为目标时，你必须花费三倍该计谋所述的指令点数成本才能进行。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载以下全部:■ 200 钛帝国步兵或 TACTICAL DRONE 模型\n■ 4 魔鬼鱼运输艇、天鳐炮艇或 HAMMERHEAD 模型\n■ 8 战斗服模型耐受值 9 或更低",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "探路者小队": [
      {
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-target-uploaded",
        "name": "目标已上传",
        "text": "此单位中的每个模型每次对其被观察目标发动攻击时，将该攻击的射击技术特性提升 1，且该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-pulse-accelerator-drone",
        "name": "脉冲加速无人机",
        "text": "为持有者所在的单位中模型所装备的脉冲卡宾枪的射程特性 +6\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-grav-inhibitor-drone",
        "name": "重力抑制无人机",
        "text": "每次有敌方单位选择持有者所在的单位作为冲锋目标时，冲锋掷骰 -2（此修正不与该冲锋掷骰的任何其他负面修正累加）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-recon-drone",
        "name": "侦察无人机",
        "text": "持有者装备 1 把无人机爆裂加农炮，且持有者所在的单位拥有渗透者能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "食人鱼战机": [
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
        "id": "unique-drone-harassment-tactics",
        "name": "无人机骚扰战术",
        "text": "在你的移动阶段结束时，选择距此单位 12\" 内的敌方单位；该敌方单位必须进行一次战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "剃刀鲨歼击机": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-ground-strike-fighter",
        "name": "对地打击机",
        "text": "此模型每次对无法 **飞行(Fly)** 的敌方单位进行远程攻击时，命中掷骰加 1。",
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
    "激流战斗服": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭 D6",
        "text": "致命破灭D6",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-battlesuit-support-system",
        "name": "战斗服支援系统",
        "text": "此模型在后撤的回合中仍可进行射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-nova-charge",
        "name": "新星充能",
        "text": "每场战斗一次，当此单位在你的射击阶段被选中射击时，选择此模型配备的一件远距武器。至该阶段结束为止，该武器具有 **[毁灭伤害]** 能力。",
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
            "phase": "ranged"
          }
        ]
      },
      {
        "id": "unique-weapon-support-system",
        "name": "武器支援系统",
        "text": "此模型每次进行远程攻击时，可以忽略命中掷骰的任何或全部修正。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-missile-drone",
        "name": "飞弹无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "天鳐炮艇": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-velocity-tracker",
        "name": "速度追踪器",
        "text": "此模型每次对能**飞行(Fly)**的敌方单位发动远程攻击时，可重掷命中掷骰。",
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
      },
      {
        "id": "unique-targeting-array",
        "name": "瞄准阵列",
        "text": "每当此模型被选中射击时，你可重掷一次命中掷骰，或在解决该等攻击时重掷一次致伤掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "隐形战斗服": [
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
        "id": "unique-forward-observers",
        "name": "前线侦察",
        "text": "每当此单位是观测单位时，至本阶段结束止，引导单位中的一个模型每次对其已发现的敌方单位进行远程攻击时，命中掷骰为 1 时重掷，致伤掷骰为 1 时重掷。",
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
          },
          {
            "type": "wound-reroll",
            "mode": "ones",
            "phase": "ranged"
          }
        ]
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-homing-beacon",
        "name": "归航信标",
        "text": "每场战斗一次，你可以花费 0CP 使用迅速入场计谋。目标必须部署于持有者所在的单位 3\" 内，且距离所有敌方单位超过 8\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "风暴潮": [
      {
        "id": "core-deadly-demise-d6-2",
        "name": "致命破灭 D6",
        "text": "致命破灭D6+2",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-heavy-walker",
        "name": "重型步行者",
        "text": "每次此模型进行正常、冲锋或后撤移动时，可以如同该地形不存在般越过模型（**巨型(Titanic)** 模型除外）和高度为4\"或更低的地形特征。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-support-system",
        "name": "支援系统",
        "text": "此模型每次进行远程攻击时，可以无视命中掷骰的任何或所有修正。",
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
        ]
      },
      {
        "id": "unique-titan-killer",
        "name": "泰坦杀手",
        "text": "此模型每次对 **泰坦** 或 **耸立** 单位进行射击攻击时，可重掷命中掷骰。",
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
    "突击小队": [
      {
        "id": "unique-suppression-volley",
        "name": "压制齐射",
        "text": "在你的射击阶段，在此单位射击后，选择一个被该射击击中的敌方 **步兵(Infantry)** 单位。直到你的下一回合开始，当此单位在战场上时，该敌方单位受到压制。当一个单位受到压制时，每次该单位中的模型进行攻击时，从命中掷骰减去 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-ds8-support-turret",
        "name": "DS8 支援炮塔",
        "text": "在你的移动阶段，如果此单位静止不动，直到你的下一回合开始，其 Shas'ui 模型装备支援炮塔武器。\n\n**设计师说明**：在此单位旁放置一个支援炮塔令牌来提醒你。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-marker-drone",
        "name": "标记无人机",
        "text": "持有者所在的单位具有 **标记光(Markerlight)** 关键字，且即使本回合突进过，也能作为另一个单位的观察员(单位)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-gun-drone",
        "name": "枪械无人机",
        "text": "持有者配备以下远程武器：",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-drone",
        "name": "护盾无人机",
        "text": "持有者的伤口(W)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-guardian-drone",
        "name": "守护无人机",
        "text": "每次有模型进行以持有者所在的单位为目标的远程攻击时，致伤掷骰 -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "太阳鲨轰炸机": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-pulse-bombs",
        "name": "脉冲炸弹",
        "text": "在你对手的近战阶段结束时，选择此单位 24\" 内一个可见的敌方单位（**独行特工** 单位除外），并为该单位掷 6 枚 D6：每掷出 4+，该单位受到 1 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "双枪": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts-8",
        "name": "斥候8\"",
        "text": "斥候8\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-exemplars-of-mont-ka",
        "name": "曼塔之楷模",
        "text": "每当此单位内的一个模型发动远距攻击且目标是距离最近的合法目标时，该攻击具有 **[连击 1]** 和 **[无视掩体]** 能力。",
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
        ]
      },
      {
        "id": "unique-neocapacitor-shields",
        "name": "新型电容护盾",
        "text": "在你的对手的冲锋阶段开始时，你可以选择一个敌方单位（不包括 **凶兽(Monster)** 和 **载具(Vehicle)** 单位）且于此单位 12\" 范围内。该单位必须进行战斗震慑测试，且直到回合结束，减少 1 从该单位进行的冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-retro-thrusters",
        "name": "后推喷射器",
        "text": "在近战阶段结束时，若此单位在此阶段符合战斗资格，此单位可以进行最多 6\" 的正常移动或后撤移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-mv15-gun-drone",
        "name": "MV15 枪械无人机",
        "text": "持有者装备 1 把双联脉冲爆破枪。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "潮汐壁垒无人机港": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-firing-deck-11",
        "name": "射击甲板11",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-droneport",
        "name": "无人机港",
        "text": "每次此 **防御工事(Fortification)** 被选中进行射击时，其无人机防卫者武器将对每个对此 **防御工事(Fortification)** 有资格的敌军单位进行目标标定并解决攻击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-fortification",
        "name": "防御工事",
        "text": "当敌方单位仅在你的军队中一个或多个 **防御工事(Fortification)** 的交战范围内时：\n\n■ 该单位仍可被选为远程攻击的目标，但每次进行此类攻击时，除非该攻击是用手枪进行，否则从命中掷骰减 1。\n■ 该单位中的模型在战斗震慑时后撤时无需进行狼狈逃亡测试，除非它们在此过程中会越过敌方模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-tidewall-cover",
        "name": "潮汐墙掩护",
        "text": "每次远程攻击分配给一个模型时，若该模型因此 **防御工事(Fortification)** 而不被攻击单位中的每个模型完全看见，该模型对该攻击获得掩体增益。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 11 个钛帝国步兵模型。该模型不能运输战斗服、克鲁特或胡蜂尖翼模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "潮汐壁垒炮台": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-firing-deck-11",
        "name": "射击甲板11",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-fortification",
        "name": "防御工事",
        "text": "当敌方单位仅在你的军队中一个或多个 **防御工事(Fortification)** 的交战范围内时：\n\n■ 该单位仍可被选为远程攻击的目标，但每次进行此类攻击时，除非该攻击是用手枪进行，否则从命中掷骰减 1。\n■ 该单位中的模型在战斗震慑时后撤时无需进行狼狈逃亡测试，除非它们在此过程中会越过敌方模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-tidewall-cover",
        "name": "潮汐墙掩护",
        "text": "每次远程攻击分配给一个模型时，若该模型因此 **防御工事(Fortification)** 而不被攻击单位中的每个模型完全看见，该模型对该攻击获得掩体增益。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 11 个钛帝国步兵模型。该模型不能运输战斗服、克鲁特或胡蜂尖翼模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "潮汐壁垒防线墙": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-firing-deck-20",
        "name": "射击甲板20",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-fortification",
        "name": "防御工事",
        "text": "当敌方单位仅在你的军队中一个或多个 **防御工事(Fortification)** 的交战范围内时：\n\n■ 该单位仍可被选为远程攻击的目标，但每次进行此类攻击时，除非该攻击是用手枪进行，否则从命中掷骰减 1。\n■ 该单位中的模型在战斗震慑时后撤时无需进行狼狈逃亡测试，除非它们在此过程中会越过敌方模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-tidewall-cover",
        "name": "潮汐墙掩护",
        "text": "每次远程攻击分配给一个模型时，若该模型因此 **防御工事(Fortification)** 而不被攻击单位中的每个模型完全看见，该模型对该攻击获得掩体增益。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-tidewall-defence-platform",
        "name": "潮汐墙防御平台",
        "text": "若配有潮墙防御平台，此 **防御要塞** 的伤特性为 15。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 11 个钛帝国步兵模型。该模型不能运输战斗服、克鲁特或胡蜂尖翼模型。若该模型配备 a Tidewall defence platform，则其运载量为 22 T’AU INFANTRY 模型(取代之)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "塔’乌纳至高机甲": [
      {
        "id": "core-deadly-demise-d6-3",
        "name": "致命破灭 D6",
        "text": "致命破灭D6+3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-coordinated-strike",
        "name": "协同打击",
        "text": "当此模型为导引单位时，每当它对其侦测单位发动攻击时，重掷结果为 1 的命中掷骰。",
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
        ]
      },
      {
        "id": "unique-super-heavy-walker",
        "name": "超重型步行机甲",
        "text": "此模型每次进行常规、前进或后撤移动时，可如同它们不存在般越过模型（**泰坦**模型除外）和高度4\"或更低的地形特征。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "胡蜂尖翼战士": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-airborne-agility",
        "name": "空中敏捷",
        "text": "在你对手的回合结束时，如果此单位不在一个或多个敌方单位的交战范围内，可将其从战场移除并置入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-oversight-drone",
        "name": "监察无人机",
        "text": "每场战斗一次，当持有者所在的单位被选择进行射击时，直到该阶段结束，此单位中模型所装备的远程武器具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "虎鲨战斗轰炸机": [
      {
        "id": "core-deadly-demise-d6-2",
        "name": "致命破灭 D6",
        "text": "致命破灭D6+2",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-strafing-run",
        "name": "低空扫射",
        "text": "在你的射击阶段，此模型射击后，选择一个被那些攻击命中且无法 **飞行(Fly)** 的敌方单位。该敌方单位必须进行一次战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport-bay",
        "name": "运输舱",
        "text": "持有者拥有 **运输工具(Transport)** 关键字，运输容量为 12 个 **战术无人机(Tactical Drone)** 模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "雷莫拉隐形无人机": [
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
        "id": "core-stealth-drones",
        "name": "隐形无人机",
        "text": "此单位具有潜行能力。",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ]
      }
    ],
    "欧恩瓦": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-grand-invocation",
        "name": "星灵感召",
        "text": "在你的指挥阶段，选择至多两个不同的星灵援引效果应用于此模型的单位和 12\" 内友善的钛帝国单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-of-the-ethereals",
        "name": "圣父护卫",
        "text": "此模型有 4+ 不觉疼痛。此模型被摧毁时，掷一枚 D6：如果掷出 2+，则在其被摧毁位置 1\" 内以满额伤的状态重新架起。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "TX42 比拉鱼": [
      {
        "id": "core-scouts",
        "name": "斥候",
        "text": "斥候",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "重型炮击无人机": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-for-the-greater-good-skirmisher",
        "name": "为了更高的善（散兵）",
        "text": "参见军队规则。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "大角拉克": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭 1",
        "text": "致命破灭1",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts",
        "name": "斥候",
        "text": "斥候",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-rampage",
        "name": "狂怒践踏",
        "text": "此模型冲锋后，选择 1\" 内的一个敌方步兵单位。为该单位内的每个模型掷一次 D6：成功 6+，造成 1 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "欧恩希": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shield-of-faith",
        "name": "信仰之盾",
        "text": "此模型进行近战攻击时，命中掷骰 4+ 总是成功，不受修正影响。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-invocation-of-the-ethereal",
        "name": "至高善感召",
        "text": "在你的指挥阶段，选择一个光环之道效果套用到此模型的单位及 6\" 内己方钛帝国单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "长击手": [
      {
        "id": "core-lethal-hits",
        "name": "致命一击",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-tank-killer",
        "name": "坦克杀手",
        "text": "此模型每次发动对载具或凶兽单位的远程攻击时，致伤掷骰各加 1。",
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
        ]
      },
      {
        "id": "unique-fire-coordination",
        "name": "火力协调",
        "text": "在你的射击阶段，选择一个距离 12\" 内的友军钛帝国载具单位——其远程攻击获得 +1 命中修正，直至该阶段结束。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "XV9 危机战斗服": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts",
        "name": "斥候",
        "text": "斥候",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts-2",
        "name": "斥候",
        "text": "斥候",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-prototype-weaponry",
        "name": "原型武器",
        "text": "每个射击阶段，为此单位中的远程武器选择 [连击 1] 或 [致命一击]。",
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
          },
          {
            "type": "lethal-hits",
            "phase": "ranged"
          }
        ]
      }
    ],
    "伊瓦拉战斗服": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-ion-accelerator-reactor",
        "name": "离子加速反应炉",
        "text": "在你的指挥阶段，此模型恢复 D3 损失的伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "虎鲸突击艇": [
      {
        "id": "unique-deadly-demise-d6",
        "name": "致命破灭 D6",
        "text": "致命破灭D6",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运输",
        "text": "此模型可运输至多 20 个钛帝国步兵模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "尔瓦那战斗服": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts",
        "name": "斥候",
        "text": "斥候",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-scouts-2",
        "name": "斥候",
        "text": "斥候",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "梭子鱼战机": [
      {
        "id": "unique-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-airborne-agility",
        "name": "空中敏捷",
        "text": "在对手的回合结束时，若不在任何敌方单位的交战范围内，可被移除并放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "远程感应塔": [
      {
        "id": "unique-sensor-array",
        "name": "感应阵列",
        "text": "此要塞配备标记光，可以是观察者单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "危机战斗服指挥官": [
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
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-crisis-commander",
        "name": "危机战斗服指挥官",
        "text": "当此模型领导一个单位时，该单位中的模型可重掷结果为 1 的命中掷骰。",
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
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      }
    ],
    "纳洛克骑兵": [
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
        "id": "core-scouts",
        "name": "斥候",
        "text": "斥候",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-loping-stride",
        "name": "大步前行",
        "text": "每次此单位前进时，不为它掷前进掷骰。替代地，直到阶段结束为止，将其移动特性加 6\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "无人哨塔炮座": [
      {
        "id": "unique-sentry-turret",
        "name": "哨塔",
        "text": "此防御工事无法移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "危机战斗服": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-guns-blazing",
        "name": "枪林弹雨",
        "text": "此单位即使本回合前进过，仍可射击，且命中掷骰不受惩罚。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "泰特拉侦察飞艇": [
      {
        "id": "core-scouts-9",
        "name": "斥候9\"",
        "text": "斥候9\"",
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
        "id": "unique-advanced-markerlight-array",
        "name": "高级标记光阵列",
        "text": "此单位的标记光攻击在命中成功时授予两枚标记光令牌。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "夏斯奥·鲁阿莱": [
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
        "id": "core-for-the-greater-good",
        "name": "为了更高的善",
        "text": "若你的军队阵营为 **钛帝国(T'au Empire)**，则在你的射击阶段开始时，你可以选择你军队中具有此能力的单位成为观察员单位。\n\n在你的射击阶段期间，对于你军队中每个尚未被选择在此阶段射击且符合射击资格的观察员单位（排除 **堡垒** 和陷入战斗困境的单位），选择一个可见的敌方单位标记为其标定单位，直到阶段结束。每个敌方单位每个阶段只能被标记为一个标定单位。\n\n你军队中具有「为了更高的善」能力的单位（排除观察员单位）在目标指向一个或多个标定单位时为引导单位。\n\n直到阶段结束，每次你军队中处于引导单位的模型对标定单位发动攻击时，改进该攻击的射击技巧特性 +1，且如果标定单位是由具有「标记光」关键字的观察员单位标记的，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-prototype-weapon-designer",
        "name": "原型武器设计师",
        "text": "此模型领导一个单位时，该单位中模型配备的远程武器获得 [连击 1]。",
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
      }
    ],
    "疾晓核心队探路者小队": [
      {
        "id": "unique-重力抑制无人机",
        "name": "重力抑制无人机",
        "text": "在一个敌方单位选择该单位为**冲锋目标**时，那次**冲锋掷骰**结果 -2。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-目标已上传",
        "name": "目标已上传",
        "text": "该单位针对一个其观测的单位进行的攻击拥有：\n■ +1 **BS**。\n■ **[无视掩体]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "疾晓核心队破袭小队": [
      {
        "id": "unique-攻坚和清除",
        "name": "攻坚和清除",
        "text": "当该单位对位于**目标**范围内的单位进行远程攻击时，您可以重掷**致伤掷骰**。",
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
      }
    ],
    "疾晓核心队魔鬼鱼运输艇": [
      {
        "id": "unique-快速脱离",
        "name": "快速脱离",
        "text": "在一个搭乘在该模型中的单位通过**迅速脱离／战术脱离**模式进行一次**脱离移动**时，那次移动的部署距离为 6\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-运输工具",
        "name": "运输工具",
        "text": "该模型能够搭载 12 个步兵模型。该模型不能运输战斗服、克鲁特或者胡蜂尖翼模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "云矛指挥官": [
      {
        "id": "unique-护盾无人机",
        "name": "护盾无人机",
        "text": "该模型拥有 +1 **W**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-武器支援系统",
        "name": "武器支援系统",
        "text": "该模型的远程攻击可以忽略对以下内容修正：\n■ **BS**。\n■ **命中掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
