/* Generated source-text rule package for aeldari. */
(function (root) {
  root["WarhammerWebsiteRules_aeldari"] = {
  "factionRules": [
    {
      "id": "aeldari.army-rule",
      "name": "战斗专注",
      "englishName": "Battle Focus",
      "text": "若你的军队阵营为 **ASURYANI**，在每个战斗回合开始时，依战斗规模获得对应数量的战斗专注标记：\n\n■ 入侵（1000 分）：2 个\n■ 突击（2000 分）：4 个\n■ 猛攻（3000 分）：6 个\n\n每当下方「灵巧机动」所列的触发出现时，你可以花费 1 个战斗专注标记，使符合条件的单位执行该项灵巧机动。单位须具有此能力、且本阶段尚未执行过灵巧机动，才符合执行资格。除非另有说明，同一灵巧机动每阶段只能触发一次。战斗回合结束时，所有未花费的战斗专注标记即告失效。\n\n灵巧机动\n\n**疾风奔驰**\n\n[触发] 你军队中符合条件的单位被选择进行常规、突进或后撤移动时。此灵巧机动每阶段可触发多次（但每次须由不同单位执行）。\n\n[效果] 直到阶段结束，该单位中模型的移动特性 +2\"。\n\n**遁入阴影**\n\n[触发] 你军队中符合条件的单位被选择进行常规、突进或后撤移动、被部署到战场上、或宣告冲锋时。\n\n[效果] 直到回合结束，敌方单位不能使用「警戒射击」计谋对该单位射击。\n\n**星光引擎**\n\n[触发] 你军队中符合条件的 **载具(Vehicle)** 单位被选择进行突进移动时。\n\n[效果] 直到回合结束，该单位装备的远程武器具有 **[突击]** 能力。\n\n**突然袭击**\n\n[触发] 你军队中符合条件的单位被选择战斗时。\n\n[效果] 直到阶段结束，该单位中每个模型进行跟进或重整移动时，可移动最多 6\" 而非最多 3\"。\n\n**乘隙进击**\n\n[触发] 敌方单位结束一次后撤移动时。\n\n[效果] 你军队中一个符合条件、且在阶段开始时位于该敌方单位交战范围内的单位（**巨型(Titanic)** 除外），可进行一次最多 D6+1\" 的常规移动。\n\n**淡出视线**\n\n[触发] 在你对手的射击阶段中，敌方单位射击之后。\n\n[效果] 你军队中一个符合条件、且被该次射击的一次或多次攻击命中的单位（**巨型(Titanic)** 除外），可进行一次最多 D6+1\" 的常规移动。",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": [],
      "source": {
        "englishName": "Battle Focus",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "阿苏曼": [
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
        "id": "unique-tactical-acumen",
        "name": "战术智慧",
        "text": "此模型领导此单位时，在你的射击阶段，该单位射击后，可进行最多 6\" 的正常移动。若如此，直到回合结束，该单位不符合宣告冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Tactical Acumen",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hand-of-asuryan",
        "name": "阿苏焉之手",
        "text": "每场战斗一次，当此模型被选择射击时，可使用此能力。若使用，直到阶段结束前，其「双生暴雨」武器的伤害特性为 3 且具有 **[针对步兵 5+]** 和 **[毁灭伤害]** 能力。",
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
          "englishName": "Hand of Asuryan",
          "kind": "unique"
        }
      }
    ],
    "司战": [
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
        "id": "unique-superlative-strategist",
        "name": "战略大师",
        "text": "此模型领导单位时，可重掷为该单位进行的前进掷骰，以及可重掷该单位执行敏捷机动时进行的任何掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Superlative Strategist",
          "kind": "unique"
        }
      },
      {
        "id": "unique-path-of-command",
        "name": "指挥之道",
        "text": "每战斗回合一次，来自你的军队且具备此能力的一个模型可在其单位成为计谋目标时使用此能力。若如此，将该计谋使用的指令点数花费降低 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Path of Command",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aspect-training",
        "name": "相位战技",
        "text": "■ 当此模型带领 HOWLING BANSHEES 单位时,它具有先制攻击(Fights First)能力。 ■ 当此模型带领 STRIKING SCORPIONS 单位时,它具有渗透(Infiltrators)、斥候7\"(Scouts 7\")与潜行(Stealth)能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aspect Training",
          "kind": "unique"
        }
      }
    ],
    "翔空司战": [
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
        "id": "unique-indomitable-strength-of-will",
        "name": "不屈意志",
        "text": "当此模型领导一个单位时，每当你花费一个战斗专注代币使该单位执行敏捷机动时，掷一次 D6：于 3+ 时，你获得 1 个战斗专注代币。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Indomitable Strength of Will",
          "kind": "unique"
        }
      },
      {
        "id": "unique-path-of-command",
        "name": "指挥之道",
        "text": "每战斗回合一次，来自你的军队且具备此能力的一个模型可在其单位成为计谋目标时使用此能力。若如此，将该计谋使用的指令点数花费降低 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Path of Command",
          "kind": "unique"
        }
      }
    ],
    "凯恩化身": [
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
        "id": "unique-molten-form",
        "name": "熔岩身躯",
        "text": "每次分配攻击至此模型时，将该攻击的「伤害」特性减半。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Molten Form",
          "kind": "unique"
        }
      },
      {
        "id": "unique-the-bloody-handed",
        "name": "血手之神（光环）",
        "text": "当己方 **艾达灵族(Aeldari)** 单位在此模型 6\" 范围内时，为该单位进行的前进与冲锋掷骰加 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "The Bloody-Handed",
          "kind": "unique"
        }
      }
    ],
    "巴哈罗斯": [
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
        "id": "unique-cloudstrider",
        "name": "踏云者",
        "text": "此模型领导某个单位时，在你的对手的回合结束时，若该单位不在交战范围内，你可以将其从战场上移除并放入「战略预备队」。此外，此模型领导某个单位时，当该单位透过「深入打击」能力放置在战场上时，在你的移动阶段可以使用此能力。若这样做，该单位可以放置在战场上距离所有敌方模型超过 6\" 的任何位置，但直到该回合结束，其无法宣布冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cloudstrider",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cry-of-the-wind",
        "name": "暴风之嚎",
        "text": "每当此模型在战场上被设置时，直到回合结束，此模型每次发动远距攻击，成功的未修正命中掷骰视为暴击命中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cry of the Wind",
          "kind": "unique"
        }
      }
    ],
    "天空掠夺者海盗": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，斥候7",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Scouts 7\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-raid-and-run",
        "name": "袭击与撤离",
        "text": "在近战阶段结束时，若此单位在本阶段符合战斗资格，若此单位不在交战范围内任何敌方单位，它可进行最多 D3+3\" 的正常移动。否则，若此单位在本阶段符合战斗资格，此单位可进行最多 D3+3\" 的后撤移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Raid and Run",
          "kind": "unique"
        }
      }
    ],
    "虚空掠夺者海盗": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "斥候7",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Scouts 7\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-reavers-of-the-void",
        "name": "虚空掠夺者",
        "text": "此单位中的每个模型每次发动攻击时，重掷结果为 1 的命中掷骰。若该攻击的目标在一个目标标记的控制范围内，你可以改为重掷命中掷骰。",
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
          "englishName": "Reavers of the Void",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mistshield",
        "name": "迷雾护盾",
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
          "englishName": "Mistshield",
          "kind": "unique"
        }
      }
    ],
    "虚空创痕海盗": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "斥候7",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Scouts 7\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-piratical-raiders",
        "name": "劫掠海盗",
        "text": "在战斗开始时，从你的对手的军队中选择一个单位。此单位中的模型装备的武器在对该单位进行攻击时具有 **[致命一击]** 和 **[精准]** 能力。",
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
          "englishName": "Piratical Raiders",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mistshield",
        "name": "迷雾护盾",
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
          "englishName": "Mistshield",
          "kind": "unique"
        }
      },
      {
        "id": "unique-faolch",
        "name": "弗奥楚",
        "text": "持有者所在的单位中模型所配备的远程武器拥有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Faolchú",
          "kind": "unique"
        }
      },
      {
        "id": "unique-channeller-stones",
        "name": "引路石",
        "text": "每回合一次，持有者所在的单位第一次防护掷骰失败时，将该攻击的伤害(D)特性改为 0。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Channeller Stones",
          "kind": "unique"
        }
      }
    ],
    "猩红猎手": [
      {
        "id": "unique-skyhunter",
        "name": "苍穹猎手",
        "text": "此模型每次对能 **飞行(Fly)** 的单位发动远距攻击时，命中掷骰增加1，致伤掷骰增加1。",
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
          "englishName": "Skyhunter",
          "kind": "unique"
        }
      }
    ],
    "次元炮平台": [
      {
        "id": "unique-support-weapon",
        "name": "支援武器",
        "text": "每次攻击此模型所在的单位时，如果该单位包含一个或多个其他模型，直到该攻击解决为止，此模型的韧性特性为3。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Support Weapon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-structural-collapse",
        "name": "结构崩毁",
        "text": "每次此模型用其 次元炮发动攻击时，可重掷结果为 1 的伤害掷骰。若该攻击的目标为 **巨型(Titanic)** 单位，你可改为重掷伤害掷骰。",
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
            "mode": "ones"
          }
        ],
        "source": {
          "englishName": "Structural Collapse",
          "kind": "unique"
        }
      },
      {
        "id": "unique-support-artillery",
        "name": "支援火炮",
        "text": "在宣告战斗编成步骤开始时,此模型可加入你军队中一个 GUARDIAN DEFENDERS 单位(每个单位至多加入一个 SUPPORT WEAPON 模型)。此后至战斗结束,此模型视为该 GUARDIANS 单位的一部分,且该单位的起始兵力(Starting Strength)随之增加。此模型及其所加入的任何单位,均不能搭乘于运输工具(Transport)内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Support Artillery",
          "kind": "unique"
        }
      }
    ],
    "黑暗死神": [
      {
        "id": "unique-inescapable-accuracy",
        "name": "无处可逃",
        "text": "此单位内每个模型每次进行远程攻击时，你可以忽视对该次攻击的射击技巧特性及命中掷骰的任何或全部修正。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Inescapable Accuracy",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aspect-shrine-token",
        "name": "支派神龛指示物",
        "text": "此单位每拥有一个支派圣殿标记，每场战斗可进行一次：你可将此单位中一个模型（不含 **角色(Character)** 模型）所进行的一次命中掷骰或一次致伤掷骰结果改为未经修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aspect Shrine Token",
          "kind": "unique"
        }
      }
    ],
    "死亡小丑": [
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
        "id": "unique-death-is-not-enough",
        "name": "“死”犹未尽",
        "text": "在你的射击阶段，此模型射击后，选择一个被该次攻击命中的敌方单位（**凶兽(Monster)** 和 **载具(Vehicle)** 除外）。该敌方单位必须进行战斗震慑测试。若该次攻击中的一个或多个摧毁了该敌方单位中的一个模型，从该测试中扣1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Death is Not Enough",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cruel-amusement",
        "name": "残忍笑料",
        "text": "在你的射击阶段中，每次选择此模型进行射击时，选择下列能力之一。直到阶段结束，此模型的尖啸者加农炮具有该能力。\n■ **[无视掩体]**\n■ **[精准]**\n■ **[连击 3]**",
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
            "value": 3,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Cruel Amusement",
          "kind": "unique"
        }
      },
      {
        "id": "unique-flip-belt",
        "name": "空舞腰带",
        "text": "持有者所在的单位每次进行正常移动、突进移动、撤退或冲锋移动时，在判定持有者于该次移动可移动的总距离时，忽略任何垂直距离。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flip Belt",
          "kind": "unique"
        }
      },
      {
        "id": "unique-travelling-players",
        "name": "巡演伶人",
        "text": "除非另有说明,你的军队中不能包含超过一个此模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Travelling Players",
          "kind": "unique"
        }
      }
    ],
    "凶暴复仇者": [
      {
        "id": "unique-bladestorm",
        "name": "剑刃风暴",
        "text": "当此单位内的模型对半距离内的敌军单位进行攻击时，配备的远程武器具有 **[连击 1]** 能力。",
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
          "englishName": "Bladestorm",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aspect-shrine-token",
        "name": "支派神龛指示物",
        "text": "此单位每拥有一个支派圣殿标记，每场战斗可进行一次：你可将此单位中一个模型（不含 **角色(Character)** 模型）所进行的一次命中掷骰或一次致伤掷骰结果改为未经修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aspect Shrine Token",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shimmershield",
        "name": "微光护盾",
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
          "englishName": "Shimmershield",
          "kind": "unique"
        }
      }
    ],
    "埃尔德拉德· 乌斯兰": [
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
        "id": "unique-diviner-of-futures",
        "name": "预见未来",
        "text": "在你的指挥阶段开始时，如果此模型在战场上，你获得 1 点指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Diviner of Futures",
          "kind": "unique"
        }
      },
      {
        "id": "unique-doom",
        "name": "末日（灵能）",
        "text": "在你的移动阶段结束时，选择一个距此模型18\"范围内且此模型可见到的敌方单位。直到你的下个指挥阶段开始，每次己方 **艾达灵族(Aeldari)** 模型对该敌方单位进行攻击时，在致伤掷骰上+1。",
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
          "englishName": "Doom",
          "kind": "unique"
        }
      }
    ],
    "猎鹰坦克": [
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
        "id": "unique-fire-support",
        "name": "火力支援",
        "text": "在你的射击阶段中，此模型射击后，选择被这些攻击中的一个或多个击中的敌方单位。直到该回合结束，每当本轮从此**运输工具(Transport)**脱离的友军模型以该敌方单位为目标进行攻击时，你可重掷致伤掷骰。",
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
        ],
        "source": {
          "englishName": "Fire Support",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输载具",
        "text": "该模型能够搭载 6 个艾达灵族步兵模型。每个 WRAITH CONSTRUCT 模型占用 2 个模型的空间。该模型不能运输跳跃包模型或 YNNARI 模型 (不含 ASURYANI、伊芙蕾妮和维萨奇模型)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "大先知": [
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
        "id": "unique-branching-fates",
        "name": "分歧命运（灵能）",
        "text": "当此模型领导一个单位时，每个阶段一次，你可以更改由该单位中的模型（不包括 **支援武器(Support Weapon)** 模型）进行的一次命中掷骰、一次致伤掷骰或一次伤害掷骰的结果为未修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Branching Fates",
          "kind": "unique"
        }
      },
      {
        "id": "unique-guide",
        "name": "指引（灵能）",
        "text": "在你的移动阶段结束时，选择一个敌军单位，该单位距离此模型 18\" 以内且你的模型可以看见它。直到你的下一个指挥阶段开始时，友军 **艾达灵族(Aeldari)** 模型每次针对该敌军单位发动攻击时，命中掷骰+1。每个单位在每个回合内只能被选择一次。",
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
          "englishName": "Guide",
          "kind": "unique"
        }
      }
    ],
    "天行者大先知": [
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
        "id": "unique-branching-fates",
        "name": "分歧命运（灵能）",
        "text": "当此模型领导一个单位时，每个阶段一次，你可将该单位中的某个模型的一个命中掷骰、一个致伤掷骰或一个伤害掷骰的结果改为未修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Branching Fates",
          "kind": "unique"
        }
      },
      {
        "id": "unique-misfortune",
        "name": "厄运（灵能）",
        "text": "在你的移动阶段结束时，选择此模型 18\" 内且可见的一个敌方单位。直到你的下个指挥阶段开始，该单位每次模型发动攻击时，从致伤掷骰中减 1。每个单位每轮只能被选择一次进行此能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Misfortune",
          "kind": "unique"
        }
      }
    ],
    "烈焰火龙": [
      {
        "id": "unique-assured-destruction",
        "name": "灰飞烟灭",
        "text": "在你的射击阶段中，每当此单位的模型进行以**凶兽(Monster)**或**载具(Vehicle)**单位为目标的远程攻击时，你可以重掷命中掷骰，你可以重掷致伤掷骰，且你可以重掷伤害掷骰。",
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
            "mode": "failed",
            "phase": "ranged"
          },
          {
            "type": "damage-reroll",
            "mode": "failed",
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Assured Destruction",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aspect-shrine-token",
        "name": "支派神龛指示物",
        "text": "此单位每拥有一个支派圣殿标记，每场战斗可进行一次：你可将此单位中一个模型（不含 **角色(Character)** 模型）所进行的一次命中掷骰或一次致伤掷骰结果改为未经修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aspect Shrine Token",
          "kind": "unique"
        }
      }
    ],
    "炎晶坦克": [
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
        "id": "unique-crystal-matrix",
        "name": "炎晶阵列",
        "text": "每次此模型被选中射击时，你可重掷一次命中掷骰，并可在解决这些攻击时重掷一次致伤掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Crystal Matrix",
          "kind": "unique"
        }
      }
    ],
    "弗甘": [
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
        "id": "unique-burning-lance",
        "name": "燃烧之矛",
        "text": "当此模型领导一个单位时，该单位中的模型装备的热熔武器的射程特性加 6\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Burning Lance",
          "kind": "unique"
        }
      },
      {
        "id": "unique-unquenchable-resolve",
        "name": "战意难遏",
        "text": "此模型第一次被摧毁时，在阶段结束，掷一个 D6：在 2+ 上，将此模型在它被摧毁的位置尽可能接近处设置回战场上，且不在一个或多个敌方单位的交战范围内，且保持其全部伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unquenchable Resolve",
          "kind": "unique"
        }
      }
    ],
    "卫戍守护者": [
      {
        "id": "unique-fleet-of-foot",
        "name": "轻捷步伐",
        "text": "此单位可执行淡去后撤灵敏移动无须花费战斗专注标记。即使同阶段有其他单位已执行此移动，仍可执行，且执行此移动不会阻止同阶段其他单位执行相同的灵敏移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fleet of Foot",
          "kind": "unique"
        }
      },
      {
        "id": "unique-crewed-platform",
        "name": "人控平台",
        "text": "当此单位最后一个守卫者防守者模型被摧毁时，此单位中所有剩余的重型武器平台模型也被摧毁。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Crewed Platform",
          "kind": "unique"
        }
      }
    ],
    "铁杉幽冥战机": [
      {
        "id": "unique-mindshock-pod",
        "name": "精神冲击吊舱（光环，灵能）",
        "text": "敌方单位在此模型 9\" 范围内时，对该单位进行的战斗震慑及战斗震慑测试中减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Mindshock Pod",
          "kind": "unique"
        }
      }
    ],
    "狂嚎女妖": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "先攻",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Fights First",
          "kind": "core"
        }
      },
      {
        "id": "unique-acrobatic",
        "name": "身手矫健",
        "text": "此单位在已前进或后撤的回合内符合宣布冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Acrobatic",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aspect-shrine-token",
        "name": "支派神龛指示物",
        "text": "此单位每拥有一个支派圣殿标记，每场战斗可进行一次：你可将此单位中一个模型（不含 **角色(Character)** 模型）所进行的一次命中掷骰或一次致伤掷骰结果改为未经修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aspect Shrine Token",
          "kind": "unique"
        }
      }
    ],
    "贾因· 扎尔": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "先攻，领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Fights First, Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-whirling-death",
        "name": "死亡旋舞",
        "text": "此模型领导单位时，每次该单位前进时，不进行前进掷骰。反之，直到阶段结束为止，该单位内模型的移动特性提升 6\"，且该单位内每个模型进行推进移动时，忽略任何垂直距离，以决定该模型在该移动中能移动的总距离。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Whirling Death",
          "kind": "unique"
        }
      },
      {
        "id": "unique-storm-of-silence",
        "name": "寂静风暴",
        "text": "此模型每次对 **角色(Character)** 单位发动攻击时，可重掷致伤掷骰。",
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
          "englishName": "Storm of Silence",
          "kind": "unique"
        }
      }
    ],
    "卡尔塞斯": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖，斥候7",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Leader, Scouts 7\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-aethersense",
        "name": "乙太感知",
        "text": "敌方单位从增援放置到战场时，不能在此模型12\"内放置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aethersense",
          "kind": "unique"
        }
      },
      {
        "id": "unique-fury-of-the-void",
        "name": "虚空怒火",
        "text": "在你的射击阶段，此模型的单位射击后，选择一个被此模型的深渊恐惧射击命中一次或多次的敌方单位。直到回合结束，该单位处于裂痕状态。每当你的军队中的一个 **艾达灵族(Aeldari)** 模型对裂痕单位发动攻击时，将该攻击的力量特性增加 1。",
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
        ],
        "source": {
          "englishName": "Fury of the Void",
          "kind": "unique"
        }
      }
    ],
    "莱凯丝": [
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
        "id": "unique-empyric-ambush",
        "name": "以太伏击",
        "text": "此模型率领一个单位时，该单位在使用闪现跳跃能力的战斗回合中符合宣布冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Empyric Ambush",
          "kind": "unique"
        }
      },
      {
        "id": "unique-whispering-web",
        "name": "耳语之网",
        "text": "在你的射击阶段中，在此模型射击后，选择一个被该攻击之一或多次命中的敌方单位。直到回合结束，己方 **艾达灵族(Aeldari)** 模型每次对该单位进行攻击时，未修正的命中掷骰为 5+ 视为暴击命中。",
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
            "type": "hit-critical-threshold",
            "value": 5,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Whispering Web",
          "kind": "unique"
        }
      }
    ],
    "矛甘· 拉": [
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
        "id": "unique-harvester-of-souls",
        "name": "灵魂收割者",
        "text": "当此模型率领一个单位时，在你的射击阶段，选定该单位的攻击目标后，如果每次攻击都以同一个单位为目标，则为目标单位掷一次D6，并为距目标单位3\"内的每个其他敌方单位掷一次D6。掷骰结果为5+时，被掷骰的单位遭爆炸碎片击中；在该单位对目标单位的所有攻击结算完后，每个遭爆炸碎片击中的单位造成D3点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Harvester of Souls",
          "kind": "unique"
        }
      },
      {
        "id": "unique-face-of-death",
        "name": "死神面容",
        "text": "在你的射击阶段，此模型射击后，选择 1 个被此模型发动的 1 次或多次攻击命中的敌方单位。该敌方单位必须进行战斗震慑测试，结果减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Face of Death",
          "kind": "unique"
        }
      }
    ],
    "织夜者坦克": [
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
        "id": "unique-monofilament-web",
        "name": "单丝捕网",
        "text": "在你的射击阶段中，此模型射击后，若其以厄运编织者进行的任何攻击对敌方单位命中，则至你的下一个回合开始前，该敌方单位为「被钉制」状态。单位在被钉制时，该单位的移动特性值减 2，且为其进行的冲锋掷骰减 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Monofilament Web",
          "kind": "unique"
        }
      }
    ],
    "伊瑞尔亲王": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖，斥候7",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Leader, Scouts 7\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-piratical-hero",
        "name": "伊扬登英杰",
        "text": "当此模型领导一个单位时，该单位中每个模型的每次攻击都具有 **[连击 1]** 能力，并将命中掷骰加上 1。",
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
        ],
        "source": {
          "englishName": "Piratical Hero",
          "kind": "unique"
        }
      },
      {
        "id": "unique-prince-of-corsairs",
        "name": "海盗亲王",
        "text": "双方都完成军队部署后，若此单位在战场上（或其乘坐的任何 **运输工具(Transport)** 在战场上），选择你军队中最多三个 **艾达灵族(Aeldari)** 单位并重新部署它们。进行重新部署时，你可以将那些单位设定在战略预备队中，无论战略预备队中已有多少单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Prince of Corsairs",
          "kind": "unique"
        }
      }
    ],
    "游侠": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "渗透者，隐匿",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Infiltrators, Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-path-of-the-outcast",
        "name": "流放者之道",
        "text": "每回合一次，当敌方单位在此单位 9\" 范围内结束常规、前进或后撤移动时，它可以进行一次最多 D6\" 的常规移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Path of the Outcast",
          "kind": "unique"
        }
      }
    ],
    "织影炮平台": [
      {
        "id": "unique-support-weapon",
        "name": "支援武器",
        "text": "每次攻击此模型所在的单位时，如果该单位包含一个或多个其他模型，直到该攻击解决为止，此模型的韧性特性为3。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Support Weapon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-monofilament-snare",
        "name": "绞杀陷阱",
        "text": "在你的射击阶段，此模型射击后，选择 1 个被其影栖编织器的一次或多次攻击命中的敌方单位。直到你的下一回合开始，该敌方单位被困束。当单位被困束时，该单位每次进行常规移动、前进或后撤，对该单位中的每个模型掷 1D6：每个 1，该单位承受 1 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Monofilament Snare",
          "kind": "unique"
        }
      },
      {
        "id": "unique-support-artillery",
        "name": "支援火炮",
        "text": "在宣告战斗编成步骤开始时,此模型可加入你军队中一个 GUARDIAN DEFENDERS 单位(每个单位至多加入一个 SUPPORT WEAPON 模型)。此后至战斗结束,此模型视为该 GUARDIANS 单位的一部分,且该单位的起始兵力(Starting Strength)随之增加。此模型及其所加入的任何单位,均不能搭乘于运输工具(Transport)内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Support Artillery",
          "kind": "unique"
        }
      }
    ],
    "暗影先知": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖，隐匿",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Leader, Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-fog-of-dreams",
        "name": "梦境迷雾（灵能）",
        "text": "当此模型率领一个单位时，该单位只有在攻击模型在 18\" 内时才能成为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fog of Dreams",
          "kind": "unique"
        }
      },
      {
        "id": "unique-treacherous-illusion",
        "name": "危险错觉（灵能）",
        "text": "敌方模型以该模型单位作为目标的近战武器具有 **[危险]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Treacherous Illusion",
          "kind": "unique"
        }
      },
      {
        "id": "unique-travelling-players",
        "name": "巡演伶人",
        "text": "除非另有说明,你的军队中不能包含超过一个此模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Travelling Players",
          "kind": "unique"
        }
      },
      {
        "id": "unique-flip-belt",
        "name": "空舞腰带",
        "text": "持有者所在的单位每次进行正常移动、突进移动、撤退或冲锋移动时，在判定持有者于该次移动可移动的总距离时，忽略任何垂直距离。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flip Belt",
          "kind": "unique"
        }
      }
    ],
    "幻影泰坦": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6+6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+6",
          "kind": "core"
        }
      },
      {
        "id": "unique-titanic-advance",
        "name": "泰坦进击",
        "text": "此模型每次进行标准移动、前进或后撤移动时，可以无视高度4寸以下的模型（除了**巨型(Titanic)**模型外）和地形特征，将其视为不存在而移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Titanic Advance",
          "kind": "unique"
        }
      },
      {
        "id": "unique-towering-wraith-construct",
        "name": "高耸幽冥构造体",
        "text": "每次以计谋选中此模型时，你必须花费该计谋所述CP成本的三倍才能执行。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Towering Wraith Construct",
          "kind": "unique"
        }
      },
      {
        "id": "unique-flawless-poise",
        "name": "完美平衡",
        "text": "此模型在其后撤的回合中，有资格进行射击并宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flawless Poise",
          "kind": "unique"
        }
      }
    ],
    "闪矛": [
      {
        "id": "unique-extreme-mobility",
        "name": "极限机动",
        "text": "此单位每次进行正常、前进、后撤或冲锋移动时，在决定此单位中模型能进行的移动总距离时，忽略任何垂直距离。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Extreme Mobility",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shimmershield",
        "name": "微光护盾",
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
          "englishName": "Shimmershield",
          "kind": "unique"
        }
      }
    ],
    "帷幕奔行者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "斥候9，隐匿",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Scouts 9\", Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-target-acquisition",
        "name": "目标定位",
        "text": "在你的射击阶段，此单位射击后，选择被使用长枪进行的攻击命中一次或以上的敌方单位。直到本阶段结束，该敌方单位不能受掩体增益。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Target Acquisition",
          "kind": "unique"
        }
      }
    ],
    "织空者摩托": [
      {
        "id": "unique-acrobatic-grace",
        "name": "灵巧身法",
        "text": "每次攻击目标此单位时，从命中掷骰上减去 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Acrobatic Grace",
          "kind": "unique"
        }
      }
    ],
    "独角": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "先攻，独行特工，隐匿",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Fights First, Lone Operative, Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-blitz",
        "name": "闪击",
        "text": "每场战斗一次，在你的移动阶段内，在此模型进行常规移动前，它可使用此能力。当它这样做时，直到回合结束，将此模型的移动特性加 2D6\"，并将此模型的独舞者武器的攻击次数加 3。",
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
            "value": 3
          }
        ],
        "source": {
          "englishName": "Blitz",
          "kind": "unique"
        }
      },
      {
        "id": "unique-blur-of-movement",
        "name": "移行虚影",
        "text": "此模型可在进行过前进的战斗回合中宣布冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blur of Movement",
          "kind": "unique"
        }
      },
      {
        "id": "unique-flip-belt",
        "name": "空舞腰带",
        "text": "持有者所在的单位每次进行正常移动、突进移动、撤退或冲锋移动时，在判定持有者于该次移动可移动的总距离时，忽略任何垂直距离。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flip Belt",
          "kind": "unique"
        }
      },
      {
        "id": "unique-path-of-damnation",
        "name": "堕罚之路",
        "text": "此模型不能作为你的统帅(Warlord)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Path of Damnation",
          "kind": "unique"
        }
      }
    ],
    "幽魂泰坦": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭2D6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 2D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-titanic-advance",
        "name": "泰坦进击",
        "text": "此模型每次进行标准移动、前进或后撤移动时，可以无视高度4寸以下的模型（除了**巨型(Titanic)**模型外）和地形特征，将其视为不存在而移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Titanic Advance",
          "kind": "unique"
        }
      },
      {
        "id": "unique-towering-wraith-construct",
        "name": "高耸幽冥构造体",
        "text": "每当你用计谋指向此模型时，你必须花费双倍该计谋所述的指令点数才能进行。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Towering Wraith Construct",
          "kind": "unique"
        }
      },
      {
        "id": "unique-revenant-jet-pack",
        "name": "幽魂泰坦跳跃背包",
        "text": "此模型每次前进时，不为其进行前进掷骰。取而代之，直到阶段结束，此模型的移动特性 +8\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Revenant Jet Pack",
          "kind": "unique"
        }
      }
    ],
    "灵魂先知": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "隐匿",
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
        "id": "unique-spiritseer",
        "name": "灵魂先知",
        "text": "当此模型在一个或多个友军 **灵魂构造体** 单位3\"内时，此模型具有孤行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Spiritseer",
          "kind": "unique"
        }
      },
      {
        "id": "unique-spirit-mark",
        "name": "灵魂印记",
        "text": "每回合一次，在你的移动阶段，当此模型开始或结束移动时，选择距此模型 6\" 内的一个友军 **幽灵构造体** 单位（不含 **巨型(Titanic)** 单位），以及此模型能看见的一个敌方单位。直到你下一个移动阶段开始前，该友军单位中的模型装备的武器在以该敌方单位为目标时具有 **[连击 1]** 能力。",
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
          "englishName": "Spirit Mark",
          "kind": "unique"
        }
      },
      {
        "id": "unique-tears-of-isha",
        "name": "伊莎之泪（灵能）",
        "text": "在你的指挥阶段，选择位于此模型6\"内的一个友军 **鬼灵构造体** 单位。若该单位中有一个或多个模型被摧毁，你可以向该单位返回一个被摧毁的模型。否则，该单位中的一个模型回复最多D3点失去的伤口。每个单位每轮只能被选择进行此能力一次。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Tears of Isha",
          "kind": "unique"
        }
      }
    ],
    "星牙飞艇": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1，斥候7",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1, Scouts 7\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-hallucinogen-grenades",
        "name": "幻觉手榴弹",
        "text": "在你的对手射击阶段开始时，此单位可以使用此能力。如果该单位执行此操作，请从你的军队中选择一个能被此单位看见且在此单位 36\" 内的 **艾达灵族(Aeldari) 步兵(Infantry)**单位：直到阶段结束为止，该单位具有潜行能力。",
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
        ],
        "source": {
          "englishName": "Hallucinogen Grenades",
          "kind": "unique"
        }
      }
    ],
    "织星者飞艇": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1，火力平台6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1, Firing Deck 6",
          "kind": "core"
        }
      },
      {
        "id": "unique-rapid-embarkation",
        "name": "快速上车",
        "text": "在近战阶段结束时，如果此 **运输工具(Transport)** 内当前没有登载的模型，你可以选择一个友军 **丑角(Harlequins)步兵(Infantry)** 单位，其模型数量 6 个或更少，完全位于此 **运输工具(Transport)** 的 6\" 范围内。除非该单位在敌方单位的近战交战范围内，否则它可以在此 **运输工具(Transport)** 内登载。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rapid Embarkation",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输载具",
        "text": "该模型能够搭载 6 个 HARLEQUINS INFANTRY 模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "风暴守护者": [
      {
        "id": "unique-stormblades",
        "name": "风暴剑阵",
        "text": "在你的指挥阶段结束时，如果此单位在你控制的目标标记范围内，该目标标记将在你对手在某阶段结束时对该目标标记的控制级别大于你之前，仍在你的控制下。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Stormblades",
          "kind": "unique"
        }
      },
      {
        "id": "unique-crewed-platform",
        "name": "人控平台",
        "text": "当此单位中最后一个暴风守卫模型被摧毁时，此单位中任何剩余的蛇鳞平台模型也被摧毁。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Crewed Platform",
          "kind": "unique"
        }
      },
      {
        "id": "unique-serpent-shield",
        "name": "蛇鳞护盾",
        "text": "持有者所在的单位中的模型拥有 5+ 无敌豁免(InSv)。",
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
          "englishName": "Serpent shield",
          "kind": "unique"
        }
      }
    ],
    "突击蝎": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "渗透者，斥候7，隐匿",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Infiltrators, Scouts 7\", Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-mandiblasters",
        "name": "战蝎激光",
        "text": "每当此单位中的模型进行近战攻击时，若其在此回合进行了冲锋移动，未修正的命中掷骰为 5+ 时视为暴击命中。",
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
            "type": "hit-critical-threshold",
            "value": 5,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Mandiblasters",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aspect-shrine-token",
        "name": "支派神龛指示物",
        "text": "此单位每拥有一个支派圣殿标记，每场战斗可进行一次：你可将此单位中一个模型（不含 **角色(Character)** 模型）所进行的一次命中掷骰或一次致伤掷骰结果改为未经修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aspect Shrine Token",
          "kind": "unique"
        }
      }
    ],
    "翔鹰": [
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
        "id": "unique-grenade-pack-flyover",
        "name": "低空手雷包",
        "text": "每回合一次，在你的移动阶段，当此单位在战场上设置或完成正常、急进或后撤移动时，它可使用此能力。若如此做，选择距此单位8\"内且可见的一个敌方单位，并为此单位中的每个 **俯冲鹰** 模型掷一次D6：每次4+，该敌方单位承受1点致命伤（最多6点致命伤）。此单位每次使用此能力后，直到回合结束，你无法用榴弹计谋针对此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grenade Pack Flyover",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aspect-shrine-token",
        "name": "支派神龛指示物",
        "text": "此单位每拥有一个支派圣殿标记，每场战斗可进行一次：你可将此单位中一个模型（不含 **角色(Character)** 模型）所进行的一次命中掷骰或一次致伤掷骰结果改为未经修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aspect Shrine Token",
          "kind": "unique"
        }
      }
    ],
    "千面（维萨奇）": [
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
        "id": "unique-way-of-the-blade",
        "name": "利刃之道",
        "text": "当此模型率领一个单位时，该单位中的模型具有先制攻击能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Way of the Blade",
          "kind": "unique"
        }
      },
      {
        "id": "unique-yvraine-s-champion",
        "name": "伊芙蕾尼的冠军勇士",
        "text": "当此模型领导一个单位时，附属于该单位的其他 **角色(Character)** 模型具有不觉疼痛4+ 能力。",
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
        ],
        "source": {
          "englishName": "Yvraine’s Champion",
          "kind": "unique"
        }
      },
      {
        "id": "unique-servant-of-the-whispering-god",
        "name": "低语之神仆从",
        "text": "若你的军队包含 THE VISARCH,则不能包含任何史诗英雄(Epic Hero)单位(YNNARI 单位除外)。若你的军队包含任何史诗英雄(Epic Hero)单位(YNNARI 单位除外),则不能包含 THE VISARCH。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Servant of the Whispering God",
          "kind": "unique"
        }
      }
    ],
    "因卡恩-死神化身": [
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
        "id": "unique-inevitable-death",
        "name": "死无可避",
        "text": "每次对手的回合中最多一次，若此模型在战场上且另一个友军**艾达灵族(Aeldari)**单位被摧毁，在移除该单位中最后一个模型后，你可将此模型从战场上移除并尽可能靠近该被摧毁模型的位置重新布置，且不在一个或多个敌方单位的交战范围内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Inevitable Death",
          "kind": "unique"
        }
      },
      {
        "id": "unique-ethereal-form",
        "name": "死亡化形",
        "text": "每当此模型摧毁一个敌方单位时，它恢复最多 D3 点失去的伤口。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ethereal Form",
          "kind": "unique"
        }
      },
      {
        "id": "unique-avatar-of-the-whispering-god",
        "name": "低语之神化身",
        "text": "若你的军队包含 THE YNCARNE,则不能包含任何史诗英雄(Epic Hero)单位(YNNARI 单位除外)。若你的军队包含任何史诗英雄(Epic Hero)单位(YNNARI 单位除外),则不能包含 THE YNCARNE。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Avatar of The Whispering God",
          "kind": "unique"
        }
      }
    ],
    "丑角剧团": [
      {
        "id": "unique-dance-of-death",
        "name": "死亡之舞",
        "text": "近战阶段开始时，选择下列能力之一供此单位获得直到阶段结束：\n\n■ **英雄韵武：**此单位中的每个模型发动攻击时，重掷结果为 1 的命中掷骰。\n■ **恶棍末日：**此单位中的每个模型发动攻击时，致伤掷骰 +1。\n■ **诡诈优雅：**每次攻击以此单位为目标时，命中掷骰 -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dance of Death",
          "kind": "unique"
        }
      },
      {
        "id": "unique-flip-belt",
        "name": "空舞腰带",
        "text": "持有者所在的单位每次进行正常移动、突进移动、撤退或冲锋移动时，在判定持有者于该次移动可移动的总距离时，忽略任何垂直距离。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flip Belt",
          "kind": "unique"
        }
      }
    ],
    "剧团长": [
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
        "id": "unique-choreographer-of-war",
        "name": "战争编舞",
        "text": "此模型领导一个单位时，每次该单位中的模型进行跟进或重整移动，其可移动最多 6\" 而非最多 3\"。此外，若其终点尽可能靠近最近敌方单位，则无需将其终点设在最近敌方模型更靠近的位置。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Choreographer of War",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cegorach-s-favour",
        "name": "笑神恩惠",
        "text": "每次此模型发动近战攻击时，你可以重掷结果为 1 的命中掷骰，并将致伤掷骰加 1。",
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
          },
          {
            "type": "wound-reroll",
            "mode": "ones",
            "phase": "melee"
          },
          {
            "type": "hit-modifier",
            "value": 1,
            "phase": "melee"
          },
          {
            "type": "wound-modifier",
            "value": 1,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Cegorach’s Favour",
          "kind": "unique"
        }
      },
      {
        "id": "unique-travelling-players",
        "name": "巡演伶人",
        "text": "除非另有说明,你的军队中不能包含超过一个此模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Travelling Players",
          "kind": "unique"
        }
      },
      {
        "id": "unique-flip-belt",
        "name": "空舞腰带",
        "text": "持有者所在的单位每次进行正常移动、突进移动、撤退或冲锋移动时，在判定持有者于该次移动可移动的总距离时，忽略任何垂直距离。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flip Belt",
          "kind": "unique"
        }
      }
    ],
    "音波炮平台（震击炮平台）": [
      {
        "id": "unique-support-weapon",
        "name": "支援武器",
        "text": "每次攻击此模型所在的单位时，如果该单位包含一个或多个其他模型，直到该攻击解决为止，此模型的韧性特性为3。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Support Weapon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-sonic-destruction",
        "name": "声波毁灭",
        "text": "在你的射击阶段，此模型每次用其音波炮对敌方单位发动攻击时，每一个在此阶段也用其音波炮对同一敌方单位发动过一次或多次攻击的其他己方 **音波炮平台** 模型，将该攻击的力量、盔甲穿透与伤害特性 +1。",
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
            "type": "damage-modifier",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Sonic Destruction",
          "kind": "unique"
        }
      },
      {
        "id": "unique-support-artillery",
        "name": "支援火炮",
        "text": "在宣告战斗编成步骤开始时,此模型可加入你军队中一个 GUARDIAN DEFENDERS 单位(每个单位至多加入一个 SUPPORT WEAPON 模型)。此后至战斗结束,此模型视为该 GUARDIANS 单位的一部分,且该单位的起始兵力(Starting Strength)随之增加。此模型及其所加入的任何单位,均不能搭乘于运输工具(Transport)内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Support Artillery",
          "kind": "unique"
        }
      }
    ],
    "虚空编织者炮艇（织虚者飞艇）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1，隐匿",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Deadly Demise 1, Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-polychromatic-camouflage",
        "name": "幻彩匿踪",
        "text": "此单位仅能在进行远程攻击的模型距此单位 18\" 内时被选为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Polychromatic Camouflage",
          "kind": "unique"
        }
      }
    ],
    "蝮蛇飞艇": [
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
        "id": "unique-harassment-fire",
        "name": "袭扰火力",
        "text": "在你的射击阶段，此单位射击后，选择 1 个被该单位的一次或多次攻击命中的敌方单位。直到你的下一回合开始，该敌方单位被压制。当单位被压制时，该单位中的模型每次发动攻击时，命中掷骰减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Harassment Fire",
          "kind": "unique"
        }
      }
    ],
    "战争行者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "斥候9",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Scouts 9\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-crystalline-targeting",
        "name": "晶化锁定",
        "text": "在你的射击阶段中，此单位射击后，选择被这些攻击中的一个或多个击中的敌方单位。直到该阶段结束，每当友军 **艾达灵族(Aeldari)** 单位以该敌方单位为目标进行攻击时，将该攻击的护甲穿透特性改善 1。每个单位每轮只能为此能力选择一次。",
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
          "englishName": "Crystalline Targeting",
          "kind": "unique"
        }
      }
    ],
    "战巫": [
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
        "id": "unique-runes-of-fortune",
        "name": "幸运符文（灵能）",
        "text": "每当敌方单位宣告冲锋时，若一个或多个具有此能力的单位被选为该冲锋的目标，冲锋掷骰减2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Runes of Fortune",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychic-communion",
        "name": "灵能交感（灵能）",
        "text": "每当选择此模型射击时，直到该阶段结束，其毁灭咒术武器的攻击次数和力量特性各增加 1，因为在 6\" 内每有一个其他友军 **艾达灵族(Aeldari) 灵能者(Psyker)** 模型（最高增加 +2）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Psychic Communion",
          "kind": "unique"
        }
      }
    ],
    "战巫密会": [
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
        "id": "unique-protect",
        "name": "保护（灵能）",
        "text": "当 **先知** 模型率领此单位时，每次攻击目标为此单位，从致伤掷骰中减去 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Protect",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychic-communion",
        "name": "灵能交感（灵能）",
        "text": "此单位每次被选中射击时，针对此单位中每个 **巫术士** 模型，直到阶段结束为止，为该模型毁灭咒术武器的攻击次数与力量特性各加1，每个距该模型6\"以内的其他己方 **艾达灵族(Aeldari)灵能者(Psyker)** 模型（最多+2）。",
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
          },
          {
            "type": "weapon-strength-modifier",
            "value": 1
          }
        ],
        "source": {
          "englishName": "Psychic Communion",
          "kind": "unique"
        }
      }
    ],
    "天行者战巫": [
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
        "id": "unique-runes-of-battle",
        "name": "战斗符文（灵能）",
        "text": "此单位中的模型所配备的武器具有 [**无视掩体**] 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Runes of Battle",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychic-communion",
        "name": "灵能交感（灵能）",
        "text": "此单位每次被选中射击时，针对此单位中每个 **巫术士** 模型，直到阶段结束为止，为该模型毁灭者武器的攻击次数与力量特性各加1，每个距该模型6\"以内的其他己方 **艾达灵族(Aeldari)灵能者(Psyker)** 模型（最多+2）。",
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
          },
          {
            "type": "weapon-strength-modifier",
            "value": 1
          }
        ],
        "source": {
          "englishName": "Psychic Communion",
          "kind": "unique"
        }
      }
    ],
    "波蛇飞艇": [
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
        "id": "unique-wave-serpent-shield",
        "name": "波蛇护盾",
        "text": "每次远程攻击针对此模型时，若该攻击的力量特性大于此模型的韧性特性，从致伤掷骰中减少 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Wave Serpent Shield",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输载具",
        "text": "该模型能够搭载 12 个 ASURYANI INFANTRY 模型。每个 WRAITH CONSTRUCT 模型占用 2 个模型的空间。该模型不能运输跳跃包模型或 YNNARI 模型 (不含 ASURYANI、伊芙蕾妮和维萨奇模型)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "次元蜘蛛": [
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
        "id": "unique-flickerjump",
        "name": "闪跃",
        "text": "在你的移动阶段，每次此单位被选中进行正常移动时，它可以使用此能力。若其如此，直到回合结束，此单位无资格宣告冲锋，且此单位中的模型具有24\"的移动特性。每次此单位使用此能力时，在阶段结束时，为此单位中的每个模型掷一个D6：每掷出1，此单位承受1点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flickerjump",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aspect-shrine-token",
        "name": "支派神龛指示物",
        "text": "此单位每拥有一个支派圣殿标记，每场战斗可进行一次：你可将此单位中一个模型（不含 **角色(Character)** 模型）所进行的一次命中掷骰或一次致伤掷骰结果改为未经修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aspect Shrine Token",
          "kind": "unique"
        }
      }
    ],
    "御风者": [
      {
        "id": "unique-swift-demise",
        "name": "破灭疾风",
        "text": "此单位中的每个模型每次进行远程攻击时，重掷结果为 1 的命中掷骰。若该攻击的目标是最近的合格目标，则你可重掷命中掷骰。",
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
          "englishName": "Swift Demise",
          "kind": "unique"
        }
      }
    ],
    "幽冥之刃": [
      {
        "id": "unique-malevolent-souls",
        "name": "恶怨亡魂",
        "text": "每当此单位中的模型因近战攻击而被击毁时，若该模型在本阶段尚未战斗，掷一粒 D6。掷出 3+，不将其移除出场；该被击毁的模型可在发动攻击的单位完成其攻击后进行战斗，然后被移除出场。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Malevolent Souls",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychic-guidance",
        "name": "灵能引导",
        "text": "当该单位在距离 12\" 内有一个或多个己方 **艾达灵族(Aeldari)灵能者(Psyker)** 模型时，该单位中模型的领导力特性值为 6+，且该单位中的模型每次发动攻击时，命中掷骰 +1。",
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
          "englishName": "Psychic Guidance",
          "kind": "unique"
        }
      },
      {
        "id": "unique-forceshield",
        "name": "力场护盾",
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
          "englishName": "Forceshield",
          "kind": "unique"
        }
      }
    ],
    "幽冥护卫": [
      {
        "id": "unique-war-construct",
        "name": "战争构造体",
        "text": "此单位在后撤的回合中有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "War Construct",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychic-guidance",
        "name": "灵能引导",
        "text": "当该单位在距离 12\" 内有一个或多个己方 **艾达灵族(Aeldari)灵能者(Psyker)** 模型时，该单位中模型的领导力特性值为 6+，且该单位中的模型每次发动攻击时，命中掷骰 +1。",
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
          "englishName": "Psychic Guidance",
          "kind": "unique"
        }
      }
    ],
    "幽冥骑士": [
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
        "id": "unique-titanic-strides",
        "name": "阔步巨兽",
        "text": "此模型每次进行常规、前进或后撤移动时，可以穿过模型（**钛帝国(T'au Empire)**模型除外）和高度 4\" 或更少的地形区段。执行此操作时：\n\n■ 它可以在交战范围内移动经过敌方模型，但不能在交战范围内结束该移动。\n■ 它也可以穿过高度超过 4\" 的地形区段，但如果这样做，在它移动后，掷 1D6：结果为 1 时，此模型受到战斗震慑。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Titanic Strides",
          "kind": "unique"
        }
      },
      {
        "id": "unique-point-blank-devastation",
        "name": "近距毁灭",
        "text": "此模型每次用重型灵魂加农炮或日光炮对交战范围内一半范围内的敌方单位进行攻击时，可重掷决定攻击次数的骰子。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Point‐blank Devastation",
          "kind": "unique"
        }
      },
      {
        "id": "unique-scattershield",
        "name": "散射护盾",
        "text": "持有者具有 4+ 无敌豁免(InSv)，且每当一次攻击被分配给持有者时，该次攻击的伤害(D)特性 -1。",
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
          "englishName": "Scattershield",
          "kind": "unique"
        }
      }
    ],
    "装备巨型鬼灵长刀的幽冥骑士": [
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
        "id": "unique-titanic-agility",
        "name": "行动敏捷",
        "text": "此模型每次进行正常移动、前进或后撤移动时，可穿过模型与地形元素。如此进行时，可在敌方模型的交战范围内移动，但不能结束该移动在敌方模型的交战范围内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Titanic Agility",
          "kind": "unique"
        }
      },
      {
        "id": "unique-scattershield",
        "name": "散射护盾",
        "text": "持有者具有 4+ 无敌豁免(InSv)，且每当一次攻击被分配给持有者时，该次攻击的伤害(D)特性 -1。",
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
          "englishName": "Scattershield",
          "kind": "unique"
        }
      }
    ],
    "幽冥领主": [
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
        "id": "unique-psychic-guidance",
        "name": "灵能引导",
        "text": "当此模型在一个或多个己方 **艾达灵族(Aeldari)灵能者(Psyker)** 模型 12\" 范围内时，由此模型配备武器的射击技巧与械斗技巧特性提高 1，其领导力特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Psychic Guidance",
          "kind": "unique"
        }
      },
      {
        "id": "unique-fated-hero",
        "name": "宿命英雄",
        "text": "在战斗开始时，选择以下其中一个关键字：**步兵(Infantry)；凶兽(Monster)；骑乘(Mounted)；载具(Vehicle)**。此模型每次对拥有所选关键字的单位发动攻击时，重掷结果为 1 的命中掷骰，并重掷结果为 1 的致伤掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fated Hero",
          "kind": "unique"
        }
      }
    ],
    "死神军执政官": [
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
        "id": "unique-overlord",
        "name": "霸主",
        "text": "此模型领导单位期间，该单位中模型每次发动攻击时，重掷结果为 1 的致伤掷骰。该单位低于其起始兵力时，该单位中模型每次发动攻击时，可改为重掷致伤掷骰。",
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
            "type": "wound-reroll",
            "mode": "ones",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Overlord",
          "kind": "unique"
        }
      },
      {
        "id": "unique-reborn-mastermind",
        "name": "复生阴谋家",
        "text": "每战斗回合一次，你的军队中一个具有此能力的模型可在其所在单位成为计谋目标时使用此能力。若如此，减少该计谋使用的 CP 代价 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Reborn Mastermind",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shadow-field",
        "name": "暗影力场",
        "text": "你不能重掷为持有者进行的无敌豁免防护掷骰。当为持有者进行的无敌豁免防护掷骰首次失败时，直到战斗结束，持有者不再具有无敌豁免。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shadow Field",
          "kind": "unique"
        }
      }
    ],
    "死神军梦魇": [
      {
        "id": "unique-tormentors",
        "name": "笞魔",
        "text": "在近战阶段开始时，每个处于接触距离内的敌方单位，如果在一个或多个拥有此能力的单位接触距离内，必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Tormentors",
          "kind": "unique"
        }
      }
    ],
    "死神军阴谋团武士": [
      {
        "id": "unique-sadistic-raiders",
        "name": "残虐掠夺者",
        "text": "在你的指挥阶段结束时，若你控制的一个目标标记物在此单位（或它所搭乘的 **运输工具(Transport)单位**）的范围内，该目标标记物将保持在你的控制下，直到在某个阶段结束时你的对手对该目标标记物的控制度超过你为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Sadistic Raiders",
          "kind": "unique"
        }
      },
      {
        "id": "unique-phantasm-grenade-launcher",
        "name": "幻象榴弹发射器",
        "text": "持有者所在的单位拥有 **手榴弹(Grenades)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Phantasm grenade launcher",
          "kind": "unique"
        }
      }
    ],
    "死神军掠袭者飞艇": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3，深入打击，火力平台11",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3, Deep Strike, Firing Deck 11",
          "kind": "core"
        }
      },
      {
        "id": "unique-aethersails",
        "name": "以太航帆",
        "text": "此模型每次前进时，不对其进行前进掷骰。而是直到阶段结束，将此模型的移动特性增加 6\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aethersails",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输载具",
        "text": "该模型能够搭载下列单位中的 11 个模型:维萨奇、死神军执政官、死神军梦魇剑客、死神军阴谋团战士、死神军血腥魔女、死神军巫灵、伊芙蕾妮",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "死神军劫掠者": [
      {
        "id": "unique-eviscerating-fly-by",
        "name": "破腹飞行",
        "text": "每次该单位结束一次正常移动时，你可以选择一个敌方单位（不包括**凶兽(Monster)**和**载具(Vehicle)**单位）在该移动中被其移动通过。若你如此做，对该单位中每个模型掷一个 D6：每次 4+ 时，该敌方单位遭受 1 道致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Eviscerating Fly-by",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cluster-caltrops",
        "name": "铁蒺藜簇",
        "text": "每当你使用此单位的剖裂飞掠（Eviscerating Fly-by）能力掷骰造成伤口时，此单位中每个装备丛刺钉（cluster caltrops）的模型，你都可以重掷一颗 D6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cluster caltrops",
          "kind": "unique"
        }
      },
      {
        "id": "unique-grav-talon",
        "name": "重力利爪",
        "text": "持有者的近战武器拥有 **[骑枪]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grav-talon",
          "kind": "unique"
        }
      }
    ],
    "死神军魅魔（血腥魔女）": [
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
        "id": "unique-storm-of-blades",
        "name": "剑刃风暴",
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
        ],
        "source": {
          "englishName": "Storm of Blades",
          "kind": "unique"
        }
      },
      {
        "id": "unique-empowered-by-death",
        "name": "死亡授权",
        "text": "在近战阶段开始时，若此模型的单位低于其起始兵力，直到该阶段结束，该单位中的模型具有「先制攻击」能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Empowered by Death",
          "kind": "unique"
        }
      }
    ],
    "死神军毒灾飞艇（死神军毒液飞艇）": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1，深入打击，火力平台6，隐匿",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Deadly Demise 1, Deep Strike, Firing Deck 6, Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-lithe-embarkation",
        "name": "空中飞人",
        "text": "在近战阶段结束时，若此 **运输工具(Transport)** 内目前没有模型驻紮，你可选择一个己方 **伊那瑞步兵** 单位，该单位只包括列于此单位运输栏中的单位之模型，只含 6 个或更少模型，且完全位于此 **运输工具(Transport)** 的 6\" 内。除非该单位位于一个或多个敌方单位的交战范围内，否则可驻紮于此 **运输工具(Transport)**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lithe Embarkation",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输载具",
        "text": "该模型能够搭载下列单位中的 6 个模型:维萨奇、死神军执政官、死神军梦魇剑客、死神军阴谋团战士、死神军血腥魔女、死神军巫灵、伊芙蕾妮 Before the battle、at the start of the Declare Battle Formations step、you can select one 死神军阴谋团战士或死神军巫灵单位 from your army that has not already been split。If you do、that 单位 is split into two 单位、每个 containing as equal a number of 模型 as possible (when splitting a 单位 in this way、make a note of which 模型 form 每个 of the two new 单位)。One of these 单位 must start the battle embarked within this 运输工具;the other can start the battle embarked within another 运输工具、或 it can be deployed as a separate 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "死神军巫灵": [
      {
        "id": "unique-no-escape",
        "name": "无处可逃",
        "text": "每次敌军单位（**凶兽(Monster)** 和 **载具(Vehicle)** 除外）在与你军队中具有此能力的一个或多个单位的交战范围内被选择后撤时，该敌军单位中的模型必须进行狼狈逃亡测试，如同该单位被战斗震慑一样。进行时，如果该敌军单位也以其他方式被战斗震慑，减少每个这些狼狈逃亡测试 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "No Escape",
          "kind": "unique"
        }
      }
    ],
    "伊弗蕾妮": [
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
        "id": "unique-word-of-the-phoenix",
        "name": "凤凰真言（灵能）",
        "text": "当此模型领导一个单位时，在你的指挥阶段，掷一颗 D6：以 2+ 成功，D3+1 个被摧毁的护卫模型（排除 **支援武器(Support Weapon)** 模型）以其全满伤害值返回该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Word of the Phoenix",
          "kind": "unique"
        }
      },
      {
        "id": "unique-herald-of-ynnead",
        "name": "伊纳德先锋",
        "text": "**伊纳德使者**：在近战阶段开始时，选择一个在此模型交战范围内的敌方单位。直到该阶段结束，每次己方 **艾达灵族(Aeldari)** 模型对该单位发动攻击时，你可重掷结果为 1 的致伤掷骰。",
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
          "englishName": "Herald of Ynnead",
          "kind": "unique"
        }
      },
      {
        "id": "unique-servant-of-the-whispering-god",
        "name": "低语之神仆从",
        "text": "若你的军队包含 YVRAINE,则不能包含任何史诗英雄(Epic Hero)单位(YNNARI 单位除外)。若你的军队包含任何史诗英雄(Epic Hero)单位(YNNARI 单位除外),则不能包含 YVRAINE。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Servant of The Whispering God",
          "kind": "unique"
        }
      }
    ],
    "氏族之刃": [
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
        "id": "unique-blade-of-the-clans",
        "name": "氏族之刃",
        "text": "该单位的近战攻击拥有 **[连击 1]**。",
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
          "englishName": "Blade of the Clans",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cornered-prey",
        "name": "绝境困兽",
        "text": "当一个与该单位处于**交战状态**的敌方单位被选择进行一次**后撤移动**时，那个敌方单位必须使用**狼狈逃亡模式**。如果那个敌方单位处于**战斗震慑状态**，那些**危险掷骰**的结果减少 1 点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cornered Prey",
          "kind": "unique"
        }
      }
    ],
    "石歌者": [
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
        "id": "unique-elemental-ensnarement",
        "name": "元素束缚",
        "text": "在己方近战阶段结束时，如果该单位未处于**战斗震慑状态**，你可以使用此能力。若这麽做，掷一枚 D6：\n■ 结果为 1：该单位陷入**战斗震慑状态**。\n■ 选择一个位于该单位 18\" 内且**可见**的敌方 **凶兽(Monster)/载具(Vehicle)** 单位（**泰坦(Titanic)** 单位除外）。那个敌方单位陷入**受缚状态**直到你的下个回合开始：单位处于**受缚状态**时，其**移动(M)** 属性减少 2\"，且无法被**压制**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Elemental Ensnarement",
          "kind": "unique"
        }
      }
    ],
    "地脉潜行者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "独行特工，斥候9，隐匿",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Lone Operative, Scouts 9\", Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-panicked-quarry",
        "name": "惶骇猎物",
        "text": "在己方射击阶段中，当该单位完成射击后，选择一个被那些攻击命中的敌方单位（**凶兽(Monster)/载具(Vehicle)** 单位除外）。那个敌方单位进行一次**战斗震慑掷骰**，且那次**战斗震慑掷骰**的结果减少 1 点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Panicked Quarry",
          "kind": "unique"
        }
      },
      {
        "id": "unique-drakolithe-once-per-battle-per-token",
        "name": "矫龙（每场战斗，每个标记限一次）",
        "text": "当一个敌方单位在该单位 8\" 范围内结束一次移动时，如果该单位处于**非交战状态**，或那个敌方单位结束该次移动时与该单位处于**交战状态**，你可以使用此能力。若这麽做，掷一枚 D6：\n■ 结果为 3+：那个敌方单位受到 1 点**致命伤**。\n\n（该单位每装备 1 个矫龙，便在单位旁放置 1 枚矫龙标记；每次使用此能力时移除 1 枚矫龙标记。）",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Drakolithe (Once per battle, per token)",
          "kind": "unique"
        }
      }
    ],
    "龙骑士": [
      {
        "id": "unique-on-the-hunt",
        "name": "捕猎中",
        "text": "当该单位被选择进行一次**后撤移动**时，那次**后撤移动**不会使该单位失去**进行射击**与**宣布冲锋**的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "On the Hunt",
          "kind": "unique"
        }
      },
      {
        "id": "unique-agile-reach",
        "name": "矫捷远击",
        "text": "当该单位**被选择进行近战**时，该单位中处于**非交战状态**、且位于与该单位处于**交战状态**的敌方单位 3\" 范围内的模型，其装备的近战武器可以以那个敌方单位为目标进行攻击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Agile Reach",
          "kind": "unique"
        }
      },
      {
        "id": "unique-drakolithe-once-per-battle-per-token",
        "name": "矫龙（每场战斗，每个标记限一次）",
        "text": "当一个敌方单位在该单位 8\" 范围内结束一次移动时，如果该单位处于**非交战状态**，或那个敌方单位结束该次移动时与该单位处于**交战状态**，你可以使用此能力。若这麽做，掷一枚 D6：\n■ 结果为 3+：那个敌方单位受到 1 点**致命伤**。\n\n（该单位每装备 1 个矫龙，便在单位旁放置 1 枚矫龙标记；每次使用此能力时移除 1 枚矫龙标记。）",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Drakolithe (Once per battle, per token)",
          "kind": "unique"
        }
      }
    ],
    "凯格瑞尔的守护者凶暴复仇者": [
      {
        "id": "unique-支派神龛标识-每个单位-每场战斗限一次",
        "name": "支派神龛标识（每个单位，每场战斗限一次）",
        "text": "在该单位进行一次**命中掷骰**或者**致伤掷骰**时，您可以使用本技能。若使用，将其中一枚掷骰结果变为未修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "支派神龛标识（每个单位，每场战斗限一次）",
          "kind": "unique"
        }
      },
      {
        "id": "unique-利刃风暴",
        "name": "利刃风暴",
        "text": "该单位针对位于一半范围内的单位进行远程攻击时，攻击拥有**[连击 1]**。",
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
          "englishName": "利刃风暴",
          "kind": "unique"
        }
      },
      {
        "id": "unique-微光护盾",
        "name": "微光护盾",
        "text": "该模型拥有 4+ **无敌豁免(InSv)**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "微光护盾",
          "kind": "unique"
        }
      }
    ],
    "灵魂先知凯格瑞尔": [
      {
        "id": "unique-灵魂先知",
        "name": "灵魂先知",
        "text": "当该单位位于一个己方**幽冥构造体**单位 3\" 内时，该单位拥有**独行特工**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "灵魂先知",
          "kind": "unique"
        }
      },
      {
        "id": "unique-灵魂印记-灵能-每个单位-每回合限一次",
        "name": "灵魂印记（灵能）（每个单位，每回合限一次）",
        "text": "在该单位开始或结束一次移动时，您可以使用该技能。若使用，选择一个位于该模型 6\" 内的己方**幽冥构造体**单位（**巨型**单位除外）以及一个对该模型**可见**的敌方单位。直到下个己方移动阶段开始前，被选择的己方单位对那个敌方单位进行的攻击拥有**[连击 1]**。",
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
          "englishName": "灵魂印记（灵能）（每个单位，每回合限一次）",
          "kind": "unique"
        }
      },
      {
        "id": "unique-伊莎之泪-灵能",
        "name": "伊莎之泪（灵能）",
        "text": "在己方指挥阶段中，您可以选择一个位于该模型 6\" 内并且在本回合中还没有被本技能选择为目标的己方**幽冥构造体**单位。\n■ 如果那个单位拥有**被摧毁**的模型，那麽将一个**被摧毁**的模型返还至单位中。\n■ 或者：如果那个单位中没有**被摧毁**的模型，那麽单位中的一个模型**治疗** D3 处耐伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "伊莎之泪（灵能）",
          "kind": "unique"
        }
      }
    ],
    "凯格瑞尔的守护者幽冥之刃": [
      {
        "id": "unique-灵能指引",
        "name": "灵能指引",
        "text": "在该单位位于一个或更多己方**艾达灵族灵能者**模型的 12\" 内时：\n■ 该单位拥有 6+ **Ld**。\n■ 该单位攻击的**命中掷骰** +1。",
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
          "englishName": "灵能指引",
          "kind": "unique"
        }
      },
      {
        "id": "unique-力场护盾",
        "name": "力场护盾",
        "text": "该模型拥有 4+ **无敌豁免(InSv)**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "力场护盾",
          "kind": "unique"
        }
      },
      {
        "id": "unique-恶怨亡魂",
        "name": "恶怨亡魂",
        "text": "在您单位中的一个模型**被摧毁**时，如果该单位在本阶段中没有**被选择进行近战**，那麽掷一枚 D6：\n■ 若结果为 3+，不要将那个模型移出战场。在该单位完成近战后，或者在阶段结束时（以先发生者为准），将那个模型移出战场。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "恶怨亡魂",
          "kind": "unique"
        }
      }
    ],
    "凯格瑞尔的守护者凶暴复仇者（凯格瑞尔的守护者凶暴复仇者）": [
      {
        "id": "unique-支派神龛标识-每个单位-每场战斗限一次",
        "name": "支派神龛标识（每个单位，每场战斗限一次）",
        "text": "在该单位进行一次**命中掷骰**或者**致伤掷骰**时，您可以使用本技能。若使用，将其中一枚掷骰结果变为未修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "支派神龛标识（每个单位，每场战斗限一次）",
          "kind": "unique"
        }
      },
      {
        "id": "unique-利刃风暴",
        "name": "利刃风暴",
        "text": "该单位针对位于一半范围内的单位进行远程攻击时，攻击拥有**[连击 1]**。",
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
          "englishName": "利刃风暴",
          "kind": "unique"
        }
      },
      {
        "id": "unique-微光护盾",
        "name": "微光护盾",
        "text": "该模型拥有 4+ **无敌豁免(InSv)**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "微光护盾",
          "kind": "unique"
        }
      }
    ],
    "凯格瑞尔的守护者次元蜘蛛": [
      {
        "id": "unique-支派神龛标识",
        "name": "支派神龛标识",
        "text": "在该单位进行一次**命中掷骰**或者**致伤掷骰**时，您可以使用本技能。若使用，将其中一枚掷骰结果变为未修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "支派神龛标识",
          "kind": "unique"
        }
      },
      {
        "id": "unique-吞噬烈焰-每个单位-每场战斗限一次",
        "name": "吞噬烈焰（每个单位，每场战斗限一次）",
        "text": "在该单位**被选择进行射击**时，您可以使用本技能。若使用，该单位的远程攻击拥有**[针对步兵 3+]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "吞噬烈焰（每个单位，每场战斗限一次）",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
