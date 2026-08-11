/* Generated source-text rule package for drukhari. */
(function (root) {
  root["WarhammerWebsiteRules_drukhari"] = {
  "factionRules": [
    {
      "id": "drukhari.army-rule",
      "name": "苦痛之力",
      "text": "苦痛能力\n\n所有暗黑灵族单位都带有「苦痛」标记能力，仅在单位被赋能时生效。你可花苦痛代币赋能单位。\n\n获得苦痛代币\n\n下列时机各获得 1 个苦痛代币：\n\n■ 你指挥阶段开始。\n■ 敌方单位被摧毁。\n■ 敌方单位战斗震慑测试失败。\n\n获得时放进苦痛代币池；花费时从池中扣除。\n\n赋能\n\n每个苦痛能力会注明何时可花代币赋能。赋能后该阶段内该单位被赋能、所有苦痛能力生效。赋能附着单位时，其中所有领袖／护卫单位的苦痛能力一并生效，不需另花代币。\n\n海盗与漂流艺人\n\n如果己方阵营是黑暗灵族，那麽您可以将丑角和灵族海盗单位纳入自己的军队中，就算这些单位没有黑暗灵族关键词。可以被纳入您军队中的丑角以及／或者灵族海盗单位的最大点数值限制将取决于您进行的战斗规模，具体如下：\n\n■ 入侵：最多 250 点\n■ 突击：最多 500 点\n■ 猛攻：最多 750 点\n\n被纳入己方军队中的丑角或者灵族海盗不能是您的统帅，并且不能获得强化。",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": []
    }
  ],
  "unitRules": {
    "执政官": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-hatred-eternal",
        "name": "永恒仇恨",
        "text": "在你的射击阶段或近战阶段，当你选择此单位进行射击或战斗时，你可以花费 1 个痛楚代币来强化该单位。当该单位被强化时，该单位内每个模型每次进行攻击时，你可以重掷命中掷骰。",
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
      },
      {
        "id": "unique-overlord",
        "name": "霸主",
        "text": "每场战斗一次，在任何阶段的开始，你可以选择一个友军 **黑暗灵族(Drukhari)** 单位，该单位处于战斗震慑状态，且距此模型 12\" 内。该单位不再是战斗震慑。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-devious-mastermind",
        "name": "狡猾策士",
        "text": "每战斗回合一次，你的军队中具有此能力的一个模型可在其所属单位被计谋指令针对时使用此能力。若使用，减少该次计谋指令使用的指令点成本1点。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-soul-trap",
        "name": "灵魂陷阱",
        "text": "为持有者近战武器的攻击次数(A)特性与力量(S)特性 +1。持有者第一次进行近战攻击摧毁一个敌方模型时，在持有者的所有攻击结算完毕后，直到战斗结束，再为持有者近战武器的攻击次数(A)特性与力量(S)特性额外 +1。",
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
            "value": 1,
            "phase": "melee"
          }
        ]
      },
      {
        "id": "unique-shadowfield",
        "name": "暗影力场",
        "text": "你不能重掷为持有者进行的无敌豁免掷骰。第一次为持有者进行的无敌豁免掷骰失败时，直到战斗结束，持有者不再具有无敌豁免。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "克洛诺斯": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭 1",
        "text": "致命破灭1",
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
        "id": "unique-pain-parasite",
        "name": "痛苦寄生虫",
        "text": "在你的射击阶段或近战阶段，当选择此单位进行射击或战斗时，可消耗 1 个痛苦标记以强化此单位。强化期间，此单位每次射击或战斗，在解决其攻击后，若因此摧毁了一个或多个敌方模型，此单位中的一个模型恢复最多 3 点失去的伤口（若此单位中的所有模型都具有起始兵力且此单位低于半数，则 1 个模型返还给此单位，具有 3 点伤口）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-pain-engine",
        "name": "痛苦引擎",
        "text": "每当你花费 1 个痛楚代币为距此单位 9\" 内的一个友军单位赋能时，掷一颗 D6，若此单位中的一个或多个模型未装备灵魂涡旋则加 1：以 5+ 成功，你获得 1 个痛楚代币。\n\n**设计者注记：** 你因赋能以外的原因花费的痛楚代币不会触发此能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "达扎尔": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-master-of-blades",
        "name": "刀剑大师",
        "text": "在近战阶段，当你选择此模型的单位进行战斗时，可花费 1 个苦痛标记使该单位获得授权。当该单位获得授权时，该单位中的每个模型每次进行近战攻击时，于致伤掷骰上+1。",
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
        ]
      },
      {
        "id": "unique-onslaught",
        "name": "猛攻",
        "text": "当此模型领导一个单位时，每次该单位中的模型进行跟进或重整移动时，可移动最多 6\" 而非最多 3\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-silent-executioner",
        "name": "沉默行刑者",
        "text": "每次此模型对一个低于其起始兵力的单位发动攻击时，可重掷命中掷骰。若该目标低于半数，也可重掷致伤掷骰。",
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
    "血伶人": [
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
        "id": "unique-fleshcraft",
        "name": "血肉雕刻",
        "text": "在你的指挥阶段，可花费 1 个痛楚筹码来强化此模型的单位。每当你这样做时，可将最多 D3+1 个已摧毁的护卫模型归还至该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-fear-incarnate",
        "name": "惧怕之身",
        "text": "敌方单位在此模型 6\" 内时，该单位内模型的领导力特性值降低 1。此外，在对手的指挥阶段战斗震慑步骤中，若该敌方单位人数低于起始人数，则必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-pain-adept",
        "name": "苦痛专家",
        "text": "在你的指挥阶段，若你的军队中具此能力的一个或多个模型在战场上，掷一次 D6：若结果为 4+，你获得 1 个苦痛记号。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "执政官之手": [
      {
        "id": "core-scouts-7",
        "name": "斥候7\"",
        "text": "斥候7\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-assassins-poisons",
        "name": "刺客之毒",
        "text": "在你的射击阶段或近战阶段，当你选择此单位进行射击或战斗时，你可以花费 1 个痛楚标记强化此单位。强化时，此单位中的模型配备的武器（冲锋手枪、爆破枪与黑暗矛枪除外）具有 **[致命一击]** 与 **[精准]** 能力。",
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
        "id": "unique-archon-s-will",
        "name": "执政官的意志",
        "text": "在第一战斗回合开始时，选择战场上的一个目标标记。直到战斗结束，当此单位在该目标标记的范围内时，除非此单位处于战斗震慑状态，否则此单位中的模型拥有 5+ 无效豁免和 3 的目标控制特性。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-archon-s-retinue",
        "name": "执政官随从",
        "text": "若此单位在宣告战斗编成步骤中有领袖单位附加,则该领袖单位获得斥候7\"(Scouts 7\")能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-kabalite-icon",
        "name": "卡巴尔圣像",
        "text": "当持有者所在的单位未陷入战斗震慑时，持有者的目标控制(OC)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-phantasm-grenade-launcher",
        "name": "幻影榴弹发射器",
        "text": "持有者所在的单位拥有 **烟幕(Smoke)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-stimm-needler",
        "name": "刺激针具",
        "text": "每回合一次，持有者所在的单位中的模型第一次防护掷骰失败时，将该攻击的伤害(D)特性改为 0。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "滑板暴徒": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-battlefield-butchery",
        "name": "战场屠杀",
        "text": "在近战阶段，当你选择此单位战斗时，你可以花费 1 个痛苦标记来强化此单位。被强化时，将此单位近战武器的攻击次数和力量特性加 1。",
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
            "value": 1,
            "phase": "melee"
          },
          {
            "type": "weapon-strength-modifier",
            "value": 1,
            "phase": "melee"
          }
        ]
      },
      {
        "id": "unique-skyboard-evasion",
        "name": "天板回避",
        "text": "每回合一次，当敌方单位在此单位 9\" 内结束一个正常、前进或后撤移动时，此单位可进行一次最多 D6\" 的正常移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-phantasm-grenade-launcher",
        "name": "幻影榴弹发射器",
        "text": "持有者所在的单位拥有 **烟幕(Smoke)** 与 **手榴弹(Grenades)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "梦魇剑客": [
      {
        "id": "unique-decapitating-strikes",
        "name": "斩首之击",
        "text": "在近战阶段，当你选择此单位进行战斗时，你可花费 1 个痛苦标记来强化此单位。强化期间，此单位中每个模型每次进行以 **[步兵]** 单位为目标的近战攻击时，该攻击具有 **[毁灭伤害]** 能力。",
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
        ]
      },
      {
        "id": "unique-tormentors",
        "name": "折磨者",
        "text": "在近战阶段开始时，每个位于此单位中一个或多个单位的交战范围内的敌方单位必须进行战斗震慑测试。此单位中的每个模型每次进行对战斗震慑单位的近战攻击时，于命中掷骰加 1。",
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
        ]
      },
      {
        "id": "unique-incubi-shrine-token",
        "name": "梦魇圣殿令牌",
        "text": "此单位每拥有一个煞星圣殿标记，每场战斗可进行一次：你可将此单位中一个煞刃官或煞星模型所进行的一次命中掷骰或一次致伤掷骰结果改为未经修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "阴谋团战士": [
      {
        "id": "unique-sadistic-raiders",
        "name": "虐待狂袭击者",
        "text": "在你的射击阶段或近战阶段，当你选择此单位进行射击或战斗时，你可花费 1 个痛楚指示物来强化此单位。被强化期间，此单位中的每个模型每次发动攻击时，重掷 1 的致伤掷骰。若目标在目标标记的范围内，你可改为重掷该致伤掷骰。",
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
        ]
      },
      {
        "id": "unique-cruel-enforcers",
        "name": "残酷执法者",
        "text": "在你的指挥阶段结束时，若此单位在你控制的目标标记范围内，该目标标记在你的控制下保持不变，直到你对手在某个阶段结束时对该目标标记的控制等级大于你的控制等级为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-phantasm-grenade-launcher",
        "name": "幻影榴弹发射器",
        "text": "持有者所在的单位拥有 **烟幕(Smoke)** 与 **手榴弹(Grenades)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-kabalite-icon",
        "name": "卡巴尔圣像",
        "text": "当持有者所在的单位未陷入战斗震慑时，持有者的目标控制(OC)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "玛莉斯女士": [
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
        "id": "unique-archon-of-the-poisoned-tongue",
        "name": "毒舌统领",
        "text": "在你的射击阶段或近战阶段中，当你选择此模型的单位进行射击或战斗时，可花费 1 个痛苦标记来强化该单位。若你如此做，选择下列其中一项能力：**[连击 1]**；**[致命一击]**。至本阶段结束为止，当该单位被强化时，该单位中模型所配备的武器具有所选能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-precognisant",
        "name": "预知者",
        "text": "若你的军队包含此模型，在双方玩家都完成部署后，从你的军队中选择最多三个 **黑暗灵族(Drukhari)** 单位并重新部署它们。进行此操作时，你可以将这些单位设置在战略预备队中，无论已有多少单位在战略预备队中。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-mind-like-a-steel-trap",
        "name": "思绪如钢铁陷阱",
        "text": "每次你的对手用战术对其军队中的一个单位进行瞄准时，若该单位在此模型 12\" 范围内，该次战术使用的成本增加 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "莉莉丝·海斯佩拉克斯": [
      {
        "id": "core-fights-first",
        "name": "先制攻击",
        "text": "拥有此能力的单位，若有资格战斗，且该单位中的所有模型都拥有此能力，则在先制攻击步骤中进行战斗。",
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
        "id": "unique-brides-of-death",
        "name": "死亡新娘",
        "text": "在近战阶段，当你选择此模型单位进行战斗时，你可花费 1 个痛苦标记来赋予该单位力量。当该单位被赋予力量时，该单位中的每个模型每次进行近战攻击时，将该攻击的力量和护甲穿透特性各提升 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-blur-of-blades",
        "name": "刃影迷踪",
        "text": "此模型领导一个单位时，该单位中的模型具有「先制攻击」能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-thrilling-spectacle",
        "name": "惊艳奇观",
        "text": "每场战斗一次，在近战阶段开始时，此模型可使用此能力。若其使用此能力，直到阶段结束，此模型拥有 3+ 无敌豁免，并将此模型装备的近战武器的攻击次数特性值改为 12。",
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
            "value": 3
          }
        ]
      }
    ],
    "曼德拉": [
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
        "id": "unique-fade-away",
        "name": "渐隐消散",
        "text": "在你的对手的近战阶段结束时，如果此单位不在一个或多个敌方单位的交战范围内，你可花费 1 个疼痛标记来强化此单位。每次你这样做时，将此单位从战场上移除并放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-shade-weavers",
        "name": "影纱编织者",
        "text": "除非进攻模型距此单位18\"以内，否则此单位无法被远程攻击锁定。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "掠袭者飞艇": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
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
        "id": "core-firing-deck-11",
        "name": "射击甲板11",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-splinter-racks",
        "name": "碎片架",
        "text": "在你的射击阶段，当你选择此模型射击时，你可以花费 1 痛苦标记来强化此模型。在强化时，若此模型内搭乘了一个或更多单位，此模型每次以具有 **[针对]** 能力的远程武器发动攻击时，可重掷命中掷骰。",
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
        "id": "unique-vanguard-of-the-dark-city",
        "name": "暗城先锋",
        "text": "在你的指挥阶段开始时，为此模型选择黑暗城市先锋区域中的一个能力（见下文）。直到你的下个指挥阶段开始，此模型具有该能力。\n\n**暗影天空之主：** 在你指挥阶段结束时，若此模型位于一个你控制的目标标记范围内，且有一个或多个 **暗影战士(Kabalite Warriors)** 单位搭载于其中，则该目标标记维持由你控制，直到在某阶段结束时你对手对该目标标记的控制等级高于你为止。\n\n**杀戮疾速：** 每当一个 **竞技女巫(Wyches)** 单位从此模型脱离时（紧急脱离除外），该 **竞技女巫(Wyches)** 单位中的模型必须完全设置于此模型 6\" 内。\n\n**屠戮幻象：** 当一个或多个 **苦难造物(Wracks)** 单位搭载于此模型内时，每有一个 **苦难造物(Wracks)** 模型搭载于此模型内，此模型的刃翼与链锁的攻击次数特性 +1。\n\n**亚空之帆：** 当一个或多个 **黑暗灵族(Drukhari)** 单位搭载于此模型内时，你可以重掷为此模型进行的前进与冲锋掷骰。",
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
        ]
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 11 个黑暗灵族步兵模型 (不含跳跃包模型)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "破坏者飞艇": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
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
        "id": "unique-agonising-suppression",
        "name": "折磨压制",
        "text": "在你的射击阶段，当你选择此模型进行射击时，可花费 1 个痛楚记号来强化此模型。受强化时，此模型射击后，选择被该些攻击命中一次或以上的敌方单位。直到你的下一个回合开始，该敌方单位处于压制状态。当单位处于压制状态时，该单位内每个模型每次发动攻击时，从命中掷骰减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-eradicate-the-foe",
        "name": "歼灭敌人",
        "text": "此模型每次对处于起始兵力的敌方单位发动攻击时，可重掷命中掷骰。",
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
    "刃翼战机": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
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
        "id": "unique-nowhere-to-run",
        "name": "无处可逃",
        "text": "在你的射击阶段中，当你选择此单位进行射击时，可花费 1 个痛苦标记来强化此单位。当被强化时，在此单位进行射击后，选择 1 个敌方单位（不包括 **凶兽(Monster)** 及 **载具(Vehicle)**）被该些攻击命中；至你的下一个回合开始为止，该敌方单位被钉制。当一支单位被钉制时，该单位的移动特性 -2，该单位的冲锋掷骰 -2。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-ground-attack-craft",
        "name": "对地攻击机",
        "text": "此单位中的每个模型每次进行远程攻击时，若目标为敌方单位（不包括能 **飞行(Fly)** 的单位），命中掷骰上 +1。",
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
    "劫掠者": [
      {
        "id": "unique-matchless-swiftness",
        "name": "无双迅捷",
        "text": "在你的移动阶段中，当你选择此单位进行前进时，可花费 1 痛楚标志使此单位强化。在强化期间，此单位每次前进时，不进行前进掷骰。反之，直到阶段结束，此单位中模型的移动特性 +8\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-eviscerating-fly-by",
        "name": "剖膛掠击",
        "text": "每次此单位结束一次正常或推进移动时，你可选择一个敌方单位（**凶兽(Monster)** 和 **载具(Vehicle)** 除外）在该移动中被其越过，为此单位中的每个模型掷一次D6：每个4+，该敌方单位承受1点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-cluster-caltrops",
        "name": "集束尖刺",
        "text": "每当你使用此单位的剖裂飞掠（Eviscerating Fly-by）能力掷骰造成伤口时，此单位中每个装备丛刺钉（cluster caltrops）的模型，你都可以重掷一颗 D6。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-grav-talon",
        "name": "重力利爪",
        "text": "持有者的近战武器其护甲穿透特性为 -2，并具有 **[致命一击]** 能力。",
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
        ]
      }
    ],
    "装备重型武器的天灾": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-winged-strike",
        "name": "翼击",
        "text": "在你的射击阶段中，当你选择此单位射击时，可消耗 1 个苦痛标记来强化此单位。受强化时，此单位中的每个模型每次进行远程攻击时，可重掷命中掷骰。",
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
        "id": "unique-airborne-evasion",
        "name": "空中回避",
        "text": "在你的射击阶段，此单位射击后，若它不在一个或多个敌方单位的交战范围内，它可以进行移动距离至多6\"的常规移动。若它这样做，直到本回合结束，此单位无法宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "装备毒晶卡宾枪的天灾": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-swooping-descent",
        "name": "俯冲下降",
        "text": "在你的移动阶段，可消耗1枚痛苦标记以强化此单位。强化时，此单位中的每个模型使用深入打击能力在战场上部署时，可于距所有敌方单位6\"以上的任意位置部署。如此部署时，若此单位在距1个或多个敌方单位9\"内部署，则至回合结束止，其不可宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-murderous-crossfire",
        "name": "凶残交火",
        "text": "此单位射击后，选择一个被这些攻击中的一次或多次命中的敌方单位。直到阶段结束，己方**黑暗灵族(Drukhari)**单位每次进行以该敌方单位为目标的远程攻击时，将该攻击的护甲穿透特性提高 1。同一个敌方单位每回合最多只能被此能力影响一次。",
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
    "血腥魔女": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-lithe-agility",
        "name": "灵活敏捷",
        "text": "在你的移动阶段当你选择此模型的单位前进时，或在你的冲锋阶段在你为此模型的单位进行冲锋掷骰前，可花费 1 个痛苦标记强化该单位。当该单位被强化时，可重掷为该单位进行的前进与冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-storm-of-blades",
        "name": "刀刃风暴",
        "text": "当此模型率领一个单位时，该单位中模型配备的近战武器具有 **[连击 1]** 能力。",
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
        "id": "unique-bloody-spectacle",
        "name": "血腥奇观",
        "text": "每次此模型发动针对 **角色(Character)** 单位的近战攻击时，你可以重掷命中掷骰，且你可以重掷致伤掷骰。每次此模型的单位摧毁一个 **角色(Character)** 模型时，你获得 1CP。",
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
    "塔洛斯": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭 1",
        "text": "致命破灭1",
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
        "id": "unique-mindless-killing-machines",
        "name": "无思杀戮机器",
        "text": "在近战阶段开始时，可花费 1 个痛苦标记强化此单位。强化期间，此单位中每个模型因近战攻击被摧毁时，若该模型在本阶段尚未战斗，则掷 1D6。掷骰结果为 2+，则不将其从游戏中移除；该被摧毁的模型可在发动攻击单位完成其攻击后战斗，然后从游戏中移除。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-devoted-to-pain",
        "name": "专注于痛苦",
        "text": "若此单位中的一个模型配备2把宏型手术刀，该武器具有**【双联】**能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-torture-device",
        "name": "折磨装置",
        "text": "每次此单位摧毁一个敌方单位时，你获得 1 个额外痛苦标记。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "毒液飞艇": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭 1",
        "text": "致命破灭1",
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
        "id": "core-firing-deck-6",
        "name": "射击甲板6",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
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
        "id": "unique-rapid-deployment",
        "name": "快速部署",
        "text": "在你的移动阶段，当你选择此模型进行前进时，你可花费1个痛苦标记来强化此模型。在强化期间，单位可在此模型进行前进后脱离。进行脱离的单位视为进行了正常移动，该阶段无法宣告冲锋，但在该回合的其余时间内可正常行动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-aerialists",
        "name": "空中特技师",
        "text": "在近战阶段结束时，如果此 **运输工具(Transport)** 内没有任何正在登舰的模型，可选择一个己方 **黑暗灵族(Drukhari)步兵(Infantry)** 单位，该单位有 6 个或更少的模型，且完全位于此 **运输工具(Transport)** 的 6\" 内（不能选择可 **飞行(Fly)** 的单位）。除非该单位在某个或多个敌军单位的交战范围内，否则它可登舰进入此 **运输工具(Transport)**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 6 个黑暗灵族步兵模型 (不含跳跃包模型)。Before the battle、at the start of the Declare Battle Formations step、you can select one KABALITE WARRIORS、执政官之手或巫灵单位 from your army that has not already been split。If you do、that 单位 is split into two 单位、每个 containing as equal a number of 模型 as possible (when splitting a 单位 in this way、make a note of which 模型 form 每个 of the two new 单位)。One of these 单位 must start the battle embarked within this 模型;the other can start the battle embarked within another 运输工具、或 it can be deployed as a separate 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "虚空鸦轰炸机": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭 D3",
        "text": "致命破灭D3",
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
        "id": "unique-nowhere-to-hide",
        "name": "无处可藏",
        "text": "在你的射击阶段，当你选择此单位进行射击时，可花费 1 痛苦标记以强化此单位。在强化期间，此单位射击后，选择一个被该些攻击命中的敌方单位。直到阶段结束，该敌方单位无法获得掩体增益。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-void-mine",
        "name": "虚空炸弹",
        "text": "在你对手的近战阶段结束时，选择此单位 24\" 内一个可见的敌方模型（**独行特工** 单位除外），接着为该模型 D6\" 内的每个敌方单位掷 1 枚 D6：每掷出 4+，该敌方单位受到 D6 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "凌虐者": [
      {
        "id": "unique-experimental-enhancements",
        "name": "实验性强化",
        "text": "在近战阶段中，当选择此单位进行战斗时，可花费1个痛苦标记来强化此单位。每次执行此操作时，从以下选项中选择一个以应用于此单位直到阶段结束：\n\n■ 此单位中非 **角色(Character)** 模型配备的近战武器攻击次数特性为3。\n■ 此单位中非 **角色(Character)** 模型配备的近战武器攻击次数特性为4，并拥有 **[危险]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-torturer-s-craft",
        "name": "折磨者技艺",
        "text": "在你的射击阶段和近战阶段中，此单位射击或战斗后，选择一个敌方单位（**载具(Vehicle)** 除外），该单位被上述攻击至少命中一次。该单位必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "巫灵": [
      {
        "id": "unique-acrobatic-gladiators",
        "name": "杂技角斗士",
        "text": "在你的冲锋阶段开始时，你可花费1个痛苦标记来赋予此单位强化。在受强化时，此单位在曾前进或后撤的回合中仍可宣布冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-no-escape",
        "name": "无从逃脱",
        "text": "敌方单位（**凶兽(Monster)**和**载具(Vehicle)**除外）每次在你的军队中具有此能力的单位的交战范围内后撤时，该敌方单位中的所有模型必须进行一次「狼狈逃亡」测试。进行时，若该敌方单位处于战斗震慑状态，则将每项测试减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "怪诞造物": [
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
        "id": "core-power-from-pain",
        "name": "苦痛之力",
        "text": "痛苦能力\n\n所有 **黑暗灵族(Drukhari)** 单位都具有痛苦能力，标记为「痛苦」。痛苦能力仅在单位被强化时才适用。若你的军队阵营为 **黑暗灵族(Drukhari)**，则可透过花费痛苦标记来强化你的军队中具有痛苦能力的单位（见下文）。\n\n**设计者注记：** 你也可以花费痛苦标记来启动其他特定规则中的额外效果，例如强化与战术。\n\n获得痛苦标记\n\n若你的军队阵营为 **黑暗灵族(Drukhari)**，则依下列方式获得痛苦标记：\n\n■ **1 个痛苦标记**于你的指挥阶段开始时。\n■ **1 个痛苦标记**每当敌方单位被摧毁时。\n■ **1 个痛苦标记**每当敌方单位未通过战斗震慑测试时。\n\n每次获得痛苦标记时，将其放在一旁──这是你的痛苦标记池。每次花费痛苦标记时，减少相同数量的痛苦标记池。\n\n通过痛苦赋能\n\n每个痛苦能力都会说明你何时可以花费痛苦标记来强化该单位。当你这麽做时，直到阶段结束，该单位被强化，所有它拥有的痛苦能力都生效。当联合单位被强化时，该单位中所有领袖与护卫单位的痛苦能力生效──你不需要花费额外痛苦标记来启动这些能力。\n\n**范例**：在你的冲锋阶段开始时，你花费 1 个痛苦标记来强化一个女巫单位。该单位被强化，所以其杂技角斗士能力生效直到阶段结束。一名蛇女领导该单位，所以其敏捷的身形能力也生效直到阶段结束（不需要额外痛苦标记来启动该能力）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-macro-steroids-pain",
        "name": "巨型类固醇（痛苦）",
        "text": "在近战阶段中，消耗 1 枚痛苦标记来强化。处于强化状态时，近战武器获得力量 8 与致命一击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-monstrous-hulks",
        "name": "巨型躯壳",
        "text": "无法登乘毒液运输舟；每个模型在其他黑暗灵族运输工具中占用 3 个运载位置。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-monstrous-charge",
        "name": "凶兽冲锋",
        "text": "此单位结束冲锋移动时，选择它交战范围内的一个敌方单位，然后为此单位中位于该敌方单位交战范围内的每一个模型掷一枚 D6：每当结果为 4+ 时，该敌方单位承受 D3 造成的伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "折磨巫会凌虐者": [
      {
        "id": "unique-折磨技艺",
        "name": "折磨技艺",
        "text": "在您的射击阶段或者在近战阶段中，在该单位完成攻击后，您可以选择一个被那些攻击命中的敌方单位（**载具**单位除外）。那个敌方单位进行一次**战斗震慑掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-实验性强化-痛苦",
        "name": "实验性强化（痛苦）",
        "text": "在近战阶段中，当该单位**被选择进行近战**时，您可以消耗 1 枚痛苦标识来强化本单位。若这麽做：\n■ 该单位的近战攻击（**角色**模型的攻击除外）拥有 3 **A**。\n■ 或者：该单位的近战攻击（**角色**模型的攻击除外）拥有：\n■ 4 **A**。\n■ **[危险]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "渡鸦突击战机": [
      {
        "id": "core-power-from-pain",
        "name": "苦痛之力",
        "text": "痛苦能力\n\n所有 **黑暗灵族(Drukhari)** 单位都具有痛苦能力，标记为「痛苦」。痛苦能力仅在单位被强化时才适用。若你的军队阵营为 **黑暗灵族(Drukhari)**，则可透过花费痛苦标记来强化你的军队中具有痛苦能力的单位（见下文）。\n\n**设计者注记：** 你也可以花费痛苦标记来启动其他特定规则中的额外效果，例如强化与战术。\n\n获得痛苦标记\n\n若你的军队阵营为 **黑暗灵族(Drukhari)**，则依下列方式获得痛苦标记：\n\n■ **1 个痛苦标记**于你的指挥阶段开始时。\n■ **1 个痛苦标记**每当敌方单位被摧毁时。\n■ **1 个痛苦标记**每当敌方单位未通过战斗震慑测试时。\n\n每次获得痛苦标记时，将其放在一旁──这是你的痛苦标记池。每次花费痛苦标记时，减少相同数量的痛苦标记池。\n\n通过痛苦赋能\n\n每个痛苦能力都会说明你何时可以花费痛苦标记来强化该单位。当你这麽做时，直到阶段结束，该单位被强化，所有它拥有的痛苦能力都生效。当联合单位被强化时，该单位中所有领袖与护卫单位的痛苦能力生效──你不需要花费额外痛苦标记来启动这些能力。\n\n**范例**：在你的冲锋阶段开始时，你花费 1 个痛苦标记来强化一个女巫单位。该单位被强化，所以其杂技角斗士能力生效直到阶段结束。一名蛇女领导该单位，所以其敏捷的身形能力也生效直到阶段结束（不需要额外痛苦标记来启动该能力）。",
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
        "id": "unique-ground-attack-craft",
        "name": "对地攻击机",
        "text": "此单位中的每个模型每次发动对敌方单位（不包括能够飞行的单位）的远距攻击时，对命中掷骰+1。",
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
        "id": "unique-shredding-fire-pain",
        "name": "撕裂火力（痛苦）",
        "text": "在你的射击阶段中，当你选择此单位射击时，可花费 1 苦痛代币以强化此单位。在强化期间，其远距武器的反甲特性+1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "塔坦鲁斯": [
      {
        "id": "core-fly",
        "name": "飞行",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-power-from-pain",
        "name": "苦痛之力",
        "text": "痛苦能力\n\n所有 **黑暗灵族(Drukhari)** 单位都具有痛苦能力，标记为「痛苦」。痛苦能力仅在单位被强化时才适用。若你的军队阵营为 **黑暗灵族(Drukhari)**，则可透过花费痛苦标记来强化你的军队中具有痛苦能力的单位（见下文）。\n\n**设计者注记：** 你也可以花费痛苦标记来启动其他特定规则中的额外效果，例如强化与战术。\n\n获得痛苦标记\n\n若你的军队阵营为 **黑暗灵族(Drukhari)**，则依下列方式获得痛苦标记：\n\n■ **1 个痛苦标记**于你的指挥阶段开始时。\n■ **1 个痛苦标记**每当敌方单位被摧毁时。\n■ **1 个痛苦标记**每当敌方单位未通过战斗震慑测试时。\n\n每次获得痛苦标记时，将其放在一旁──这是你的痛苦标记池。每次花费痛苦标记时，减少相同数量的痛苦标记池。\n\n通过痛苦赋能\n\n每个痛苦能力都会说明你何时可以花费痛苦标记来强化该单位。当你这麽做时，直到阶段结束，该单位被强化，所有它拥有的痛苦能力都生效。当联合单位被强化时，该单位中所有领袖与护卫单位的痛苦能力生效──你不需要花费额外痛苦标记来启动这些能力。\n\n**范例**：在你的冲锋阶段开始时，你花费 1 个痛苦标记来强化一个女巫单位。该单位被强化，所以其杂技角斗士能力生效直到阶段结束。一名蛇女领导该单位，所以其敏捷的身形能力也生效直到阶段结束（不需要额外痛苦标记来启动该能力）。",
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
        "id": "unique-engine-of-destruction-pain",
        "name": "毁灭引擎（痛苦）",
        "text": "在你的射击阶段，当你选择此模型射击时，你可以花费 1 个痛苦标记来强化此模型。强化期间，此模型的脉冲崩解器具有 [速射 8] 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-scything-charge",
        "name": "镰刃冲锋",
        "text": "此模型每次完成冲锋移动结束时，选择一个在其交战范围内的敌方单位并掷 1D6：掷出 2-3 时，该敌方单位承受 D3 点致命伤；掷出 4-5 时，该敌方单位承受 3 点致命伤；掷出 6 时，该敌方单位承受 D3+3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport-capacity",
        "name": "运载量",
        "text": "可运输16个黑暗灵族步兵模型。每个怪诞体占用3个空间。不能运输拥有飞行的模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "尤连·拉卡斯": [
      {
        "id": "core-feel-no-pain-4",
        "name": "不觉疼痛4+",
        "text": "不觉疼痛4+",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "fnp",
            "threshold": 4
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
        "id": "core-power-from-pain",
        "name": "苦痛之力",
        "text": "痛苦能力\n\n所有 **黑暗灵族(Drukhari)** 单位都具有痛苦能力，标记为「痛苦」。痛苦能力仅在单位被强化时才适用。若你的军队阵营为 **黑暗灵族(Drukhari)**，则可透过花费痛苦标记来强化你的军队中具有痛苦能力的单位（见下文）。\n\n**设计者注记：** 你也可以花费痛苦标记来启动其他特定规则中的额外效果，例如强化与战术。\n\n获得痛苦标记\n\n若你的军队阵营为 **黑暗灵族(Drukhari)**，则依下列方式获得痛苦标记：\n\n■ **1 个痛苦标记**于你的指挥阶段开始时。\n■ **1 个痛苦标记**每当敌方单位被摧毁时。\n■ **1 个痛苦标记**每当敌方单位未通过战斗震慑测试时。\n\n每次获得痛苦标记时，将其放在一旁──这是你的痛苦标记池。每次花费痛苦标记时，减少相同数量的痛苦标记池。\n\n通过痛苦赋能\n\n每个痛苦能力都会说明你何时可以花费痛苦标记来强化该单位。当你这麽做时，直到阶段结束，该单位被强化，所有它拥有的痛苦能力都生效。当联合单位被强化时，该单位中所有领袖与护卫单位的痛苦能力生效──你不需要花费额外痛苦标记来启动这些能力。\n\n**范例**：在你的冲锋阶段开始时，你花费 1 个痛苦标记来强化一个女巫单位。该单位被强化，所以其杂技角斗士能力生效直到阶段结束。一名蛇女领导该单位，所以其敏捷的身形能力也生效直到阶段结束（不需要额外痛苦标记来启动该能力）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-sculptor-of-torments-pain",
        "name": "折磨雕塑师（痛苦）",
        "text": "在近战阶段，花费 1 个痛苦标记来强化此单位。强化时，此单位中模型进行的近战攻击致伤掷骰获得 +1 修正。",
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
        ]
      },
      {
        "id": "unique-father-of-pain",
        "name": "苦痛之父",
        "text": "分配到此单位模型的 1 伤害攻击——那些模型对该攻击具有不觉疼痛4+ 能力。",
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
        "id": "unique-horrific-regeneration",
        "name": "恐怖再生",
        "text": "此模型首次被摧毁时，在阶段结束时掷 D6：2+ 时，以满伤复活。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "执政官的宫廷": [
      {
        "id": "core-power-from-pain",
        "name": "苦痛之力",
        "text": "痛苦能力\n\n所有 **黑暗灵族(Drukhari)** 单位都具有痛苦能力，标记为「痛苦」。痛苦能力仅在单位被强化时才适用。若你的军队阵营为 **黑暗灵族(Drukhari)**，则可透过花费痛苦标记来强化你的军队中具有痛苦能力的单位（见下文）。\n\n**设计者注记：** 你也可以花费痛苦标记来启动其他特定规则中的额外效果，例如强化与战术。\n\n获得痛苦标记\n\n若你的军队阵营为 **黑暗灵族(Drukhari)**，则依下列方式获得痛苦标记：\n\n■ **1 个痛苦标记**于你的指挥阶段开始时。\n■ **1 个痛苦标记**每当敌方单位被摧毁时。\n■ **1 个痛苦标记**每当敌方单位未通过战斗震慑测试时。\n\n每次获得痛苦标记时，将其放在一旁──这是你的痛苦标记池。每次花费痛苦标记时，减少相同数量的痛苦标记池。\n\n通过痛苦赋能\n\n每个痛苦能力都会说明你何时可以花费痛苦标记来强化该单位。当你这麽做时，直到阶段结束，该单位被强化，所有它拥有的痛苦能力都生效。当联合单位被强化时，该单位中所有领袖与护卫单位的痛苦能力生效──你不需要花费额外痛苦标记来启动这些能力。\n\n**范例**：在你的冲锋阶段开始时，你花费 1 个痛苦标记来强化一个女巫单位。该单位被强化，所以其杂技角斗士能力生效直到阶段结束。一名蛇女领导该单位，所以其敏捷的身形能力也生效直到阶段结束（不需要额外痛苦标记来启动该能力）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-court-of-the-archon",
        "name": "执政官的宫廷",
        "text": "当角色率领含有侍卫模型的单位时，该角色获得 4+ 不觉疼痛。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-court-effects-pain",
        "name": "宫廷效果（痛苦）",
        "text": "当强化时：拉玛亚活着：近战获得致命一击；美杜莎活着：远程获得无视掩体；西利瑟活着：-1 对该单位进行致伤掷骰；乌格活着：单位获得先制攻击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "驯兽师": [
      {
        "id": "core-scouts-9",
        "name": "斥候9\"",
        "text": "斥候9\"",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-power-from-pain",
        "name": "苦痛之力",
        "text": "痛苦能力\n\n所有 **黑暗灵族(Drukhari)** 单位都具有痛苦能力，标记为「痛苦」。痛苦能力仅在单位被强化时才适用。若你的军队阵营为 **黑暗灵族(Drukhari)**，则可透过花费痛苦标记来强化你的军队中具有痛苦能力的单位（见下文）。\n\n**设计者注记：** 你也可以花费痛苦标记来启动其他特定规则中的额外效果，例如强化与战术。\n\n获得痛苦标记\n\n若你的军队阵营为 **黑暗灵族(Drukhari)**，则依下列方式获得痛苦标记：\n\n■ **1 个痛苦标记**于你的指挥阶段开始时。\n■ **1 个痛苦标记**每当敌方单位被摧毁时。\n■ **1 个痛苦标记**每当敌方单位未通过战斗震慑测试时。\n\n每次获得痛苦标记时，将其放在一旁──这是你的痛苦标记池。每次花费痛苦标记时，减少相同数量的痛苦标记池。\n\n通过痛苦赋能\n\n每个痛苦能力都会说明你何时可以花费痛苦标记来强化该单位。当你这麽做时，直到阶段结束，该单位被强化，所有它拥有的痛苦能力都生效。当联合单位被强化时，该单位中所有领袖与护卫单位的痛苦能力生效──你不需要花费额外痛苦标记来启动这些能力。\n\n**范例**：在你的冲锋阶段开始时，你花费 1 个痛苦标记来强化一个女巫单位。该单位被强化，所以其杂技角斗士能力生效直到阶段结束。一名蛇女领导该单位，所以其敏捷的身形能力也生效直到阶段结束（不需要额外痛苦标记来启动该能力）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-goaded-savagery-pain",
        "name": "激怒野性（痛苦）",
        "text": "在近战阶段，消耗 1 枚痛苦标记来强化此单位。强化期间，若单位内包含兽主模型，野兽模型近战攻击的命中和致伤掷骰可重掷。",
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
            "phase": "melee"
          }
        ]
      },
      {
        "id": "unique-beastmaster",
        "name": "驯兽师",
        "text": "此单位包含野兽驯兽人模型时，可重掷该单位的冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "收割者": [
      {
        "id": "core-power-from-pain",
        "name": "苦痛之力",
        "text": "痛苦能力\n\n所有 **黑暗灵族(Drukhari)** 单位都具有痛苦能力，标记为「痛苦」。痛苦能力仅在单位被强化时才适用。若你的军队阵营为 **黑暗灵族(Drukhari)**，则可透过花费痛苦标记来强化你的军队中具有痛苦能力的单位（见下文）。\n\n**设计者注记：** 你也可以花费痛苦标记来启动其他特定规则中的额外效果，例如强化与战术。\n\n获得痛苦标记\n\n若你的军队阵营为 **黑暗灵族(Drukhari)**，则依下列方式获得痛苦标记：\n\n■ **1 个痛苦标记**于你的指挥阶段开始时。\n■ **1 个痛苦标记**每当敌方单位被摧毁时。\n■ **1 个痛苦标记**每当敌方单位未通过战斗震慑测试时。\n\n每次获得痛苦标记时，将其放在一旁──这是你的痛苦标记池。每次花费痛苦标记时，减少相同数量的痛苦标记池。\n\n通过痛苦赋能\n\n每个痛苦能力都会说明你何时可以花费痛苦标记来强化该单位。当你这麽做时，直到阶段结束，该单位被强化，所有它拥有的痛苦能力都生效。当联合单位被强化时，该单位中所有领袖与护卫单位的痛苦能力生效──你不需要花费额外痛苦标记来启动这些能力。\n\n**范例**：在你的冲锋阶段开始时，你花费 1 个痛苦标记来强化一个女巫单位。该单位被强化，所以其杂技角斗士能力生效直到阶段结束。一名蛇女领导该单位，所以其敏捷的身形能力也生效直到阶段结束（不需要额外痛苦标记来启动该能力）。",
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
        "id": "unique-eradicate-the-foe",
        "name": "歼灭敌人",
        "text": "此模型每次对处于起始兵力的敌方单位发动攻击时，可重掷结果为 1 的命中掷骰。若目标单位的起始兵力为 1，此能力仅在该单位拥有其初始伤害数时适用。",
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
        "id": "unique-electromagnetic-cascade-pain",
        "name": "电磁瀑流（痛苦）",
        "text": "在你的射击阶段，当你选择此模型射击时，可消耗1个痛苦标记以赋予此模型能力。当具有此能力时：每次此模型发动指定载具单位的远程攻击时，该攻击具有 [连击 2]；每次此模型发动指定非载具单位的远程攻击时，该攻击具有 [连击 1]。",
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
            "value": 2,
            "phase": "ranged"
          }
        ]
      }
    ],
    "折磨巫会塔洛斯": [
      {
        "id": "unique-自主杀戮机器-痛苦",
        "name": "自主杀戮机器（痛苦）",
        "text": "在近战阶段中，您可以消耗 1 枚痛苦标识来强化该单位。若强化，那麽当该单位中的模型**被摧毁**时，如果该单位还没有在本阶段**被选择进行近战**，那麽掷一枚 D6：若结果为 2+，不要将那个模型移出战场。在该单位完成近战后，或者在阶段结束时（以先发生者为准），将那个模型移出战场。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-折磨装置",
        "name": "折磨装置",
        "text": "在该单位摧毁了一个敌方单位后，您获得 1 个痛苦标识。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "折磨巫会克洛诺斯": [
      {
        "id": "unique-强化机械-痛苦",
        "name": "强化机械（痛苦）",
        "text": "在该单位被选择进行一次**常规／突进／后撤移动**时，您可以消耗 1 枚痛苦标识来强化本单位。若这麽做，该单位拥有 +2\" **M**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-痛苦机械-光环",
        "name": "痛苦机械（光环）",
        "text": "当一个己方单位位于该单位的 9\" 时，如果您使用 1 枚痛苦标识来强化那个己方单位，那麽掷一枚 D6，如果该单位中的一个模型没有灵魂旋涡武器，那麽掷骰结果 +1：\n■ 若结果为 5+，您获得 1 枚痛苦标识。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "萨特罗斯福·努尔": [
      {
        "id": "unique-痛苦大师",
        "name": "痛苦大师",
        "text": "在您的指挥阶段中，如果一个拥有本技能的模型位于战场，掷一枚 D6：\n■ 若结果为 4+，您获得 1 枚痛苦标识。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-恐惧化身-光环",
        "name": "恐惧化身（光环）",
        "text": "在一个敌方单位位于该模型的 6\" 内时：\n■ 那个敌方单位的 **Ld** -1。\n■ 在对手指挥阶段的战斗震慑步骤中，如果那个敌方单位低于**起始兵力**，那麽需要进行一次**战斗震慑掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-邪恶兵器-痛苦",
        "name": "邪恶兵器（痛苦）",
        "text": "在近战阶段中，在该单位**被选择进行近战**时，您可以消耗 1 点痛苦标识来强化该单位。若强化，该单位的攻击拥有 3 **D**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **折磨巫会凌虐者**",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "折磨巫会凌虐者（折磨巫会凌虐者）": [
      {
        "id": "unique-折磨技艺",
        "name": "折磨技艺",
        "text": "在您的射击阶段或者在近战阶段中，在该单位完成攻击后，您可以选择一个被那些攻击命中的敌方单位（**载具**单位除外）。那个敌方单位进行一次**战斗震慑掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-实验性强化-痛苦",
        "name": "实验性强化（痛苦）",
        "text": "在近战阶段中，当该单位**被选择进行近战**时，您可以消耗 1 枚痛苦标识来强化本单位。若这麽做：\n■ 该单位的近战攻击（**角色**模型的攻击除外）拥有 3 **A**。\n■ 或者：该单位的近战攻击（**角色**模型的攻击除外）拥有：\n■ 4 **A**。\n■ **[危险]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
