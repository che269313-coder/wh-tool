/* Generated source-text rule package for adeptus-mechanicus. */
(function (root) {
  root["WarhammerWebsiteRules_adeptus_mechanicus"] = {
  "factionRules": [
    {
      "id": "adeptus-mechanicus.army-rule",
      "name": "机神律令",
      "englishName": "Doctrina Imperatives",
      "text": "每战斗回合开始时，挑一个教义法令，该回合内对你军队中具有此能力的所有单位生效。\n\n守卫者条令\n\n■ 该单位中模型装备的远程武器拥有**重型(Heavy)**技能。\n■ 该单位中模型装备的远程武器的射击技巧属性提升 1。\n■ 每当该单位受到近战攻击时，如果该单位拥有战线关键词，并且／或者位于一个或更多己方机械修会战线单位的 6\" 内，那麽那次攻击的命中掷骰结果减少 1 点。\n\n征服者条令\n\n■ 该单位中模型装备的远程武器拥有**突击(Assault)**技能。\n■ 该单位中模型装备的近战武器的械斗技巧属性提升 1。\n■ 每当该单位中的一个模型进行攻击时，如果该单位拥有战线关键词，并且／或者位于一个或更多己方机械修会战线单位的 6\" 内，那麽那次攻击的护甲穿透属性提升 1。",
      "category": "faction",
      "status": "计算支持（满足原文条件时勾选）",
      "controls": [
        {
          "id": "doctrine",
          "type": "select",
          "label": "当前教义与战线条件",
          "options": [
            [
              "none",
              "不启用"
            ],
            [
              "protector",
              "守卫者条令"
            ],
            [
              "protectorBattleline",
              "守卫者条令，且为战线/邻近战线"
            ],
            [
              "conqueror",
              "征服者条令"
            ],
            [
              "conquerorBattleline",
              "征服者条令，且为战线/邻近战线"
            ]
          ]
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1,
          "phase": "ranged",
          "selection": {
            "controlId": "doctrine",
            "equals": "protector"
          }
        },
        {
          "type": "hit-modifier",
          "value": 1,
          "phase": "ranged",
          "selection": {
            "controlId": "doctrine",
            "equals": "protectorBattleline"
          }
        },
        {
          "type": "incoming-hit-minus",
          "value": 1,
          "phase": "melee",
          "selection": {
            "controlId": "doctrine",
            "equals": "protectorBattleline"
          }
        },
        {
          "type": "hit-modifier",
          "value": 1,
          "phase": "melee",
          "selection": {
            "controlId": "doctrine",
            "equals": "conqueror"
          }
        },
        {
          "type": "hit-modifier",
          "value": 1,
          "phase": "melee",
          "selection": {
            "controlId": "doctrine",
            "equals": "conquerorBattleline"
          }
        },
        {
          "type": "weapon-ap-modifier",
          "value": 1,
          "selection": {
            "controlId": "doctrine",
            "equals": "conquerorBattleline"
          }
        }
      ],
      "source": {
        "englishName": "Doctrina Imperatives",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "操控师斯坎德": [
      {
        "id": "unique-守护神圣造物-每个单位-每场战斗限一次",
        "name": "守护神圣造物（每个单位，每场战斗限一次）",
        "text": "在任意阶段开始时，您可以使用该技能。若使用，在该阶段结束前该单位拥有 4+ **无敌豁免(InSv)**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "守护神圣造物（每个单位，每场战斗限一次）",
          "kind": "unique"
        }
      },
      {
        "id": "unique-机械指引-每个单位-每回合限一次",
        "name": "机械指引（每个单位，每回合限一次）",
        "text": "在一个位于该模型 12\" 内且对其可见的己方**净化军团德尔塔-9 号**单位**被选择进行攻击时**，您可以使用本技能。若使用，那麽那个单位可以重掷攻击的**致伤掷骰**。",
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
          "englishName": "机械指引（每个单位，每回合限一次）",
          "kind": "unique"
        }
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **净化军团护教军先锋**",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "unique"
        }
      }
    ],
    "始祖鸟燧火轰炸机": [
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
        "id": "unique-bomb-rack",
        "name": "炸弹投放",
        "text": "每次此模型结束一次正常移动时，你可选择它在该移动过程中穿过的一个敌方单位，并掷六个 D6：每个 4+，该单位承受 1 点道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bomb Rack",
          "kind": "unique"
        }
      },
      {
        "id": "unique-command-uplink",
        "name": "指挥链路",
        "text": "每次你选择持有者所在的单位作为计谋的目标时，掷一个 D6：结果为 5+ 时，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Command Uplink",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chaff-launcher",
        "name": "干扰箔发射器",
        "text": "持有者具有 **烟幕(Smoke)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chaff Launcher",
          "kind": "unique"
        }
      }
    ],
    "始祖鸟层云猛禽": [
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
        "id": "unique-strafing-run",
        "name": "对地扫射",
        "text": "此模型每次对不能 **飞行(Fly)** 的单位发动远程攻击时，命中掷骰 +1。",
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
          "englishName": "Strafing Run",
          "kind": "unique"
        }
      },
      {
        "id": "unique-command-uplink",
        "name": "指挥链路",
        "text": "每次你选择持有者所在的单位作为计谋的目标时，掷一个 D6：结果为 5+ 时，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Command Uplink",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chaff-launcher",
        "name": "干扰箔发射器",
        "text": "持有者具有 **烟幕(Smoke)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chaff Launcher",
          "kind": "unique"
        }
      }
    ],
    "始祖鸟矢量飞梭": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3，深入打击，悬浮",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3, Deep Strike, Hover",
          "kind": "core"
        }
      },
      {
        "id": "unique-aerial-deployment",
        "name": "空降投送",
        "text": "如果此模型以悬停模式开始游戏并在战略预备队中，它可以在增援步骤的第一、第二或第三个移动阶段部署，不受任何任务规则限制。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aerial Deployment",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 11 个 SKITARII INFANTRY 或 TECH-PRIEST INFANTRY 模型。该模型不能运输跳跃包、KATAPHRON 或西多尼亚斯卡特罗射手模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      },
      {
        "id": "unique-command-uplink",
        "name": "指挥链路",
        "text": "每次你选择持有者所在的单位作为计谋的目标时，掷一个 D6：结果为 5+ 时，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Command Uplink",
          "kind": "unique"
        }
      },
      {
        "id": "unique-chaff-launcher",
        "name": "干扰箔发射器",
        "text": "持有者具有 **烟幕(Smoke)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chaff Launcher",
          "kind": "unique"
        }
      }
    ],
    "贝利撒留考尔": [
      {
        "id": "unique-canticles-of-the-omnissiah",
        "name": "万机神圣礼",
        "text": "在你的指挥阶段开始时，选择「万能者圣歌」一节中的一项能力。直到你下次指挥阶段开始为止，此模型具有该能力。\n\n**机械复仇祈唤（光环）：** 在你的指挥阶段开始时，从你对手的军队中选择一个单位。直到你下一个指挥阶段开始时，该敌方单位是你的「机械复仇」目标。每当一个友方 **机械教(Adeptus Mechanicus)** 单位中的模型进行一次以你的「机械复仇」目标为对象的攻击时，你可以重掷命中掷骰。\n\n**纪律真言：** 此模型具有 **战线(Battleline)** 关键字，并具有以下能力：\n\n**二进祈勇（光环）：** 当一个友方 **机械教(Adeptus Mechanicus)** 单位在此模型 6\" 内时，该单位中模型的目标控制特性 +1，且每当你为该单位进行一次战斗震撼或领导力测试时，该测试 +1。\n\n**遮蔽圣诗（光环）：** 当一个友方 **机械教(Adeptus Mechanicus)** 单位在此模型 6\" 内时，该单位具有「潜行(Stealth)」能力。",
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
          "englishName": "Canticles of the Omnissiah",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mechanicus-bodyguard",
        "name": "机械教护卫",
        "text": "当此模型在 3\" 内有一个或多个友方 **机械修会(Adeptus Mechanicus)** 单位时，此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Mechanicus Bodyguard",
          "kind": "unique"
        }
      },
      {
        "id": "unique-self-repair-mechanisms",
        "name": "自我修复机制",
        "text": "在你的指挥阶段开始时，此模型恢复最多 D3 点已失伤口。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Self-repair Mechanisms",
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
    "雷鸣宗电僧": [
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
        "id": "unique-electro-shock",
        "name": "麻痹电击",
        "text": "在你的射击阶段，此单位射击后，选择一个敌方单位（除了 **凶兽(Monster)** 和 **载具(Vehicle)**）被这些攻击命中。直到你对手下一个回合结束，该敌方单位处于震撼状态。当一个单位震撼时，从其移动特性中减少 2\"，并从为其进行的前进和冲锋掷骰中减少 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Electro-shock",
          "kind": "unique"
        }
      }
    ],
    "智控数据技师": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Support",
          "kind": "core"
        }
      },
      {
        "id": "unique-battle-protocols",
        "name": "战斗程序",
        "text": "在战斗开始时，若此模型领导一个 **卡斯特兰机甲** 单位，该单位进入「保护协议」（见下文）。在你的指挥阶段，若此模型领导一个 **卡斯特兰机甲** 单位，可为该单位选择下列其中一个协议进入。单位进入协议后，会一直保持该协议直到进入其他协议。\n\n■ **防御协议：****卡斯特兰机甲** 模型的远距离武器攻击次数特性+2。\n■ **征服协议：****卡斯特兰机甲** 模型的近战武器攻击次数特性+2。\n■ **保护协议：****卡斯特兰机甲** 模型的韧性特性+1。",
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
          "englishName": "Battle Protocols",
          "kind": "unique"
        }
      }
    ],
    "法身宗电僧": [
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
        "id": "unique-electro-infusion",
        "name": "雷电护体",
        "text": "当一个 **角色(Character)** 模型率领该单位时，每当一次攻击针对该单位时，致伤掷骰视为减 1。",
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
        ],
        "source": {
          "englishName": "Electro-infusion",
          "kind": "unique"
        }
      }
    ],
    "哈斯塔利歼灭者": [
      {
        "id": "unique-broad-spectrum-targeting-augurs",
        "name": "宽谱目标增强仪",
        "text": "此单位中的模型每次用毁灭射器进行攻击时，若该攻击目标是一支单位（**凶兽(Monster)**和**载具(Vehicle)**单位除外），则该攻击拥有 **[连击 1]** 能力。",
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
          "englishName": "Broad‑spectrum Targeting Augurs",
          "kind": "unique"
        }
      }
    ],
    "哈斯塔利燧发枪手": [
      {
        "id": "unique-monocular-targeting-helms",
        "name": "单眼瞄准头盔",
        "text": "此单位中的模型每次用中子聚变枪对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位发动攻击时，该攻击具有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Monocular Targeting Helms",
          "kind": "unique"
        }
      }
    ],
    "巴利斯塔铁骑兵": [
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
        "id": "unique-elevated-strider",
        "name": "灵活机动",
        "text": "此单位在其后撤或前进的回合中有资格进行射击，并且你可重掷此单位中的模型进行的绝望逃脱测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Elevated Strider",
          "kind": "unique"
        }
      },
      {
        "id": "unique-broad-spectrum-data-tether",
        "name": "广域数据链",
        "text": "每次你选择此单位作为策略的目标时，掷一次 D6：5+ 时，你获得 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Broad Spectrum Data-tether",
          "kind": "unique"
        }
      }
    ],
    "卡斯特兰机器人": [
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
        "id": "unique-robotic-bodyguard",
        "name": "机器保镖",
        "text": "当 **机械教数据铸匠** 模型领导此单位时，该模型具有 4+ 不觉疼痛能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Robotic Bodyguard",
          "kind": "unique"
        }
      },
      {
        "id": "unique-repulsor-grid",
        "name": "反射力场",
        "text": "每当一次远程攻击分配给此单位中的一个 **卡斯特兰机器人** 模型时，在未修正的豁免掷骰为 6 时，进行该攻击的单位在完成其攻击后承受 1 点净伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Repulsor Grid",
          "kind": "unique"
        }
      }
    ],
    "武装奴工突破者": [
      {
        "id": "unique-breaching-command",
        "name": "突破命令",
        "text": "此单位中的每个模型每次进行攻击时，重掷命中掷骰为 1。当此单位位于一个或更多友方 **机械修会(Adeptus Mechanicus)战线(Battleline)** 单位 6\" 内时，你可改为重掷命中掷骰。",
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
          "englishName": "Breaching Command",
          "kind": "unique"
        }
      }
    ],
    "武装奴工毁灭者": [
      {
        "id": "unique-sentinel-directives",
        "name": "哨戒指令",
        "text": "每当你以「火力监视」策略指定此单位为目标时，在解决该策略时，未修正的命中掷骰为 5+ 时才视为命中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Sentinel Directives",
          "kind": "unique"
        }
      }
    ],
    "沙丘爬行者机甲": [
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
        "id": "unique-scuttling-walker",
        "name": "四足爬行",
        "text": "此模型进行正常移动、推进或后撤移动时，可穿过友方 **怪兽** 和 **载具(Vehicle)** 模型及高度4\"或以下的地形特征区域。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scuttling Walker",
          "kind": "unique"
        }
      },
      {
        "id": "unique-emanatus-force-field",
        "name": "力场投射",
        "text": "在友方 **机械修会(Adeptus Mechanicus)战线(Battleline)** 模型完全位于此模型 6\" 内时，该 **战线(Battleline)** 模型对远距攻击拥有 4+ 不死豁免。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Emanatus Force Field",
          "kind": "unique"
        }
      },
      {
        "id": "unique-broad-spectrum-data-tether",
        "name": "宽频资料连结",
        "text": "持有者失去 **烟幕(Smoke)** 关键字，但每当你以计谋指定持有者为目标时，掷一颗 D6：掷出 5+ 时，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Broad spectrum data-tether",
          "kind": "unique"
        }
      }
    ],
    "翼龙军天猎兵": [
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
        "id": "unique-ride-the-thermals",
        "name": "热流驭手",
        "text": "在你的射击阶段中，此单位射击后，如果它不在一个或多个敌方单位的交战距离内，它可以执行以下其中一项：\n\n■ 进行最多6\"的正常移动。\n■ 进行最多12\"的正常移动，前提是此单位中的每个模型都完全在一个或多个友方 **机械修会(Adeptus Mechanicus)战线(Battleline)** 单位6\"范围内结束该移动。\n\n无论哪种情况，如果执行此项，直到回合结束，此单位不符合宣布冲锋的条件。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ride the Thermals",
          "kind": "unique"
        }
      }
    ],
    "翼龙军净炎兵": [
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
        "id": "unique-searing-conflagration",
        "name": "炙热焚焰",
        "text": "此单位中的模型每次使用磷火枪进行攻击，若目标为在目标标志物范围内的敌方单位，可重掷致伤掷骰结果为 1。若此单位也在 1 个或多个友方 **机械修会(Adeptus Mechanicus)战线(Battleline)** 单位的 6\" 内，则每次此类攻击的目标为此类单位时，你可改为重掷致伤掷骰。",
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
          "englishName": "Searing Conflagration",
          "kind": "unique"
        }
      }
    ],
    "瑟贝利游骑兵": [
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
        "id": "unique-tactica-obliqua",
        "name": "战术机动",
        "text": "每回合一次，当敌方单位在此单位9\"内结束正常、前进或后撤移动时，若此单位不在一个或多个敌方单位的交战范围内，其可执行下列其中之一：\n\n■ 进行最多D6\"的正常移动。\n■ 进行最多6\"的正常移动，但此单位中的每个模型必须在该移动结束时完全位于一个或多个友军 **机械修会(Adeptus Mechanicus)战线(Battleline)** 单位的6\"内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Tactica Obliqua",
          "kind": "unique"
        }
      },
      {
        "id": "unique-enhanced-data-tether",
        "name": "强化资料连结",
        "text": "每次你选择持有者所在的单位作为计谋的目标时，掷一个 D6：结果为 5+ 时，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Enhanced data-tether",
          "kind": "unique"
        }
      }
    ],
    "瑟贝利硫火犬": [
      {
        "id": "unique-line-breakers",
        "name": "冲锋陷阵",
        "text": "此单位每次结束冲锋移动时，选择一个位于其交战范围内的敌方单位，并为此单位中位于该敌方单位交战范围内的每个模型掷一次 D6，若此单位的冲锋移动开始于 6\" 内一个或多个友方 **机械修会(Adeptus Mechanicus)战线(Battleline)** 单位则加 2。每个 4+，该敌方单位受 1 点生命伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Line-breakers",
          "kind": "unique"
        }
      }
    ],
    "奴工战斗队": [
      {
        "id": "unique-network-override",
        "name": "网络超控",
        "text": "当此单位包含一个或多个 **技术祭司** 模型时，此单位为：\n\n■ 在前进的回合中可进行行动。\n■ 在开始进行行动的回合中可进行射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Network Override",
          "kind": "unique"
        }
      }
    ],
    "西卡利安渗透者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "渗透，隐蔽",
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
        "id": "unique-voices-in-the-code",
        "name": "代码之声",
        "text": "在战斗阶段开始时，每个在具有此能力的一个或多个单位接战距离内的敌方单位必须进行一次战栗检定。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Voices in the Code",
          "kind": "unique"
        }
      },
      {
        "id": "unique-neurostatic-interference",
        "name": "精神干扰【光环】",
        "text": "当敌军单位在此单位 6\" 范围内时，每次为该单位进行战斗震撼或领导力测试时，从该测试中扣除 1。当此单位在一个或多个友方 **机械修会(Adeptus Mechanicus)战线(Battleline)单位** 6\" 范围内时，改为从该测试中扣除 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Neurostatic Interference",
          "kind": "unique"
        }
      }
    ],
    "西卡利安铁锈追踪者": [
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
        "id": "unique-optimised-gait",
        "name": "优化机动",
        "text": "于此单位的前进及冲锋掷骰上加1。若此单位在距离一个或多个友方 **机械修会(Adeptus Mechanicus)战线(Battleline)** 单位6\"内，改为于此单位的前进及冲锋掷骰上加2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Optimised Gait",
          "kind": "unique"
        }
      }
    ],
    "护教军元帅": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Support",
          "kind": "core"
        }
      },
      {
        "id": "unique-control-edict",
        "name": "控制节点",
        "text": "当此模型领导一个单位时，每次该单位中的一个模型发动攻击，你可重掷命中掷骰。",
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
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Control Edict",
          "kind": "unique"
        }
      },
      {
        "id": "unique-servo-skull-uplink",
        "name": "伺服颅骨数据链",
        "text": "每场战斗一次，在任何阶段开始时，你可选择 1个友方 **斯基塔瑞** 单位，其处于战斗震撼状态且在此模型 6\" 范围内。该单位不再处于战斗震撼状态。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Servo-skull Uplink",
          "kind": "unique"
        }
      }
    ],
    "护教军游猎兵": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "斥候6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-objective-scouted",
        "name": "目标肃清",
        "text": "在你的指挥阶段结束时，若此单位在你控制的目标标记范围内，该目标标记将保持在你的控制下，直到你的对手在某个阶段结束时对该目标标记的控制等级大于你的控制等级为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Objective Scouted",
          "kind": "unique"
        }
      },
      {
        "id": "unique-enhanced-data-tether",
        "name": "强化资料连结",
        "text": "每次你选择持有者所在的单位作为计谋的目标时，掷一个 D6：结果为 5+ 时，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Enhanced data-tether",
          "kind": "unique"
        }
      },
      {
        "id": "unique-omnispex",
        "name": "全视镜",
        "text": "持有者所在的单位中模型所配备的远程武器拥有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Omnispex",
          "kind": "unique"
        }
      }
    ],
    "护教军先锋兵": [
      {
        "id": "unique-rad-saturation",
        "name": "辐射污染",
        "text": "当敌方单位（不含 **载具(Vehicle)** 单位）在此单位 3\" 范围内时，将该单位中模型的「目标控制」特性减少 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rad-saturation",
          "kind": "unique"
        }
      },
      {
        "id": "unique-enhanced-data-tether",
        "name": "强化资料连结",
        "text": "每次你选择持有者所在的单位作为计谋的目标时，掷一个 D6：结果为 5+ 时，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Enhanced data-tether",
          "kind": "unique"
        }
      },
      {
        "id": "unique-omnispex",
        "name": "全视镜",
        "text": "持有者所在的单位中模型所配备的远程武器拥有 **[无视掩体]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Omnispex",
          "kind": "unique"
        }
      }
    ],
    "天蝎座粉碎者坦克": [
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
        "id": "unique-broad-spectrum-data-tether",
        "name": "广域数据链",
        "text": "每当你选择此模型作为策略的目标时，掷一颗 D6：以 5+ 成功，你获得 1 指令点数。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Broad Spectrum Data-tether",
          "kind": "unique"
        }
      },
      {
        "id": "unique-blistering-salvoes",
        "name": "爆裂齐射",
        "text": "每当此模型用拜尔罗斯能量炮对 **步兵(Infantry)** 单位进行攻击时，对命中掷骰加1。每当此模型用铁融炮对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位进行攻击时，对命中掷骰加1。",
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
          "englishName": "Blistering Salvoes",
          "kind": "unique"
        }
      }
    ],
    "天蝎座沙丘行者运输船": [
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
        "id": "unique-broad-spectrum-data-tether",
        "name": "广域数据链",
        "text": "每当你选择此模型作为策略的目标时，掷一颗 D6：以 5+ 成功，你获得 1 指令点数。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Broad Spectrum Data-tether",
          "kind": "unique"
        }
      },
      {
        "id": "unique-fire-support",
        "name": "火力支援",
        "text": "在你的射击阶段，此模型进行过射击后，选择一个在此阶段内受到它至少一次命中的敌方单位。直到本阶段结束，每次本回合从此 **运输工具(Transport)** 中下船的友方模型对该敌方单位进行攻击时，你可以重掷致伤掷骰。",
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
        "name": "运载",
        "text": "该模型能够搭载 12 个机械修会步兵模型。该模型不能运输 JUMP PACK, KATAPHRON 或西多尼亚斯卡特罗射手模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "装备辐射长管枪的西多尼亚龙骑兵": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1，隐蔽",
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
        "id": "unique-focused-hunters",
        "name": "专注猎手",
        "text": "在战斗开始时，从你对手的军队中选择一个单位。直到战斗结束为止，此单位中的每个模型每次对该单位发动攻击时，可重掷命中掷骰。",
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
          "englishName": "Focused Hunters",
          "kind": "unique"
        }
      },
      {
        "id": "unique-broad-spectrum-data-tether",
        "name": "广域数据链",
        "text": "每次你选择此单位作为策略的目标时，掷一次 D6：5+ 时，你获得 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Broad Spectrum Data-tether",
          "kind": "unique"
        }
      }
    ],
    "西多尼亚枪骑兵": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1，隐蔽",
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
        "id": "unique-dynamic-efficiency",
        "name": "灵活机动",
        "text": "此单位在前进或后撤的回合内有资格宣告冲锋，且可对此单位内的模型进行的绝望逃脱检定重掷。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dynamic Efficiency",
          "kind": "unique"
        }
      },
      {
        "id": "unique-broad-spectrum-data-tether",
        "name": "广域数据链",
        "text": "每次你选择此单位作为策略的目标时，掷一次 D6：5+ 时，你获得 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Broad Spectrum Data-tether",
          "kind": "unique"
        }
      }
    ],
    "西多尼安哨兵": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "独行特工，隐蔽",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Lone Operative, Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-dread-snipers",
        "name": "无情狙击",
        "text": "在你的射击阶段，此模型射击后，选择一个被该次攻击中的一个或多个命中的敌方单位。该单位必须进行战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dread Snipers",
          "kind": "unique"
        }
      },
      {
        "id": "unique-achillan-eye",
        "name": "分析弱点",
        "text": "此模型每次用镭射枪对 **步兵(Infantry)** 单位发动攻击时，可重掷致伤掷骰。此模型每次用Skatros超铀考古枪对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位发动攻击时，可重掷致伤掷骰。",
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
          "englishName": "Achillan Eye",
          "kind": "unique"
        }
      },
      {
        "id": "unique-sydonian-sentinel",
        "name": "孤胆哨兵",
        "text": "此模型不能作为你的统帅(Warlord)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Sydonian Sentinel",
          "kind": "unique"
        }
      }
    ],
    "科技考古学家": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "领袖",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Support",
          "kind": "core"
        }
      },
      {
        "id": "unique-seekers-of-divine-arcana",
        "name": "神圣奥秘追寻者",
        "text": "当此模型率领一个单位时，将该单位中的模型的目标控制特性增加 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Seekers of Divine Arcana",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cogitative-instincts",
        "name": "认知本能",
        "text": "以增援身分在战场上部署的敌方单位无法在此模型水平 12\" 内部署。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cogitative Instincts",
          "kind": "unique"
        }
      }
    ],
    "机械主教": [
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
        "id": "unique-lord-of-the-machine-cult",
        "name": "统御之主",
        "text": "当此模型领导一个单位时，该单位中的模型具有不觉疼痛5+ 能力。若该单位具有**电能牧师**关键字，该单位中的模型则改为具有不觉疼痛4+ 能力。",
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
          "englishName": "Lord of the Machine Cult",
          "kind": "unique"
        }
      },
      {
        "id": "unique-dataspike",
        "name": "数据尖刺",
        "text": "在战斗阶段开始时，你可选择一个敌方**载具(Vehicle)**单位在此模型的单位的交战范围内，并掷一个 D6：若为 4+，该敌方单位承受 D6 点道德伤害，且至该阶段结束止，该敌方单位配备的近战武器的武器技能特性恶化 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dataspike",
          "kind": "unique"
        }
      }
    ],
    "工造修士": [
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
        "id": "unique-enginseer",
        "name": "工程师",
        "text": "当此模型在一个或多个友方 **机械修会(Adeptus Mechanicus)载具(Vehicle)** 单位的3\"范围内时，除非它正率领某个单位，此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Enginseer",
          "kind": "unique"
        }
      },
      {
        "id": "unique-omnissiah-s-blessing",
        "name": "万机神祝福",
        "text": "在你的指挥阶段，选择一个友方 **机械修会(Adeptus Mechanicus)** 模型，距离此模型 3\" 内。该模型回复最多 D3 个失去的伤口，如果它是 **载具(Vehicle)** 模型，直到你的下一个指挥阶段开始，该模型具有不觉疼痛 5+ 能力。每个模型每个指挥阶段只能为此能力选择一次",
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
        ],
        "source": {
          "englishName": "Omnissiah’s Blessing",
          "kind": "unique"
        }
      },
      {
        "id": "unique-vengeance-for-the-omnissiah",
        "name": "为万机神复仇",
        "text": "如果友方**机械修会(Adeptus Mechanicus)载具(Vehicle)**模型在此模型 12\" 内被摧毁，直到战役结束为止，此模型的万机之斧攻击次数特征为 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Vengeance for the Omnissiah",
          "kind": "unique"
        }
      }
    ],
    "控电神甫": [
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
        "id": "unique-galvanic-field",
        "name": "银河之力",
        "text": "当此模型领导一支单位时，该单位中模型装备的武器具有 **[LETHAL HITS]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Galvanic Field",
          "kind": "unique"
        }
      },
      {
        "id": "unique-defend-the-divine-work",
        "name": "守卫神圣工程",
        "text": "每场战斗一次，在任何阶段开始时，此模型可使用此能力。若如此做，至本阶段结束，此模型单位内的模型具有 4+ 防御豁免。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Defend the Divine Work",
          "kind": "unique"
        }
      }
    ],
    "图莉娅·古尔德": [
      {
        "id": "unique-rod-of-the-war-forge",
        "name": "战铸之杖",
        "text": "在你的指挥阶段，选择战争圣像章节中的一个能力。直到你的下一个指挥阶段开始，此模型具有该能力。\n\n**狂热奉献：** 你可以选择此模型 6\" 内一个友方 **机械教战士(Skitarii)** 或 **图莉雅・古尔德(Thulia Ghuld)** 单位；直到你下一个指挥阶段开始，该单位在进行了前进的回合中仍符合射击与宣告冲锋的资格。\n\n**应变战术：** 你可以选择此模型 6\" 内一个友方 **机械教战士(Skitarii)** 或 **图莉雅・古尔德(Thulia Ghuld)** 单位；直到你下一个指挥阶段开始，该单位在进行了后撤的回合中仍符合射击与宣告冲锋的资格。\n\n**火星之火：** 你可以选择此模型 6\" 内一个友方 **机械教战士(Skitarii)** 或 **图莉雅・古尔德(Thulia Ghuld)** 单位；直到你下一个指挥阶段开始，该单位的「征服者指令(Conqueror Imperative)」与「保护者指令(Protector Imperative)」皆为启用状态。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rod of the War Forge",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mechanicus-bodyguard",
        "name": "机械教护卫",
        "text": "当此模型在 3\" 内有一个或多个友方 **机械修会(Adeptus Mechanicus)** 单位时，此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Mechanicus Bodyguard",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cybernetic-augmentation",
        "name": "机械强化",
        "text": "此模型可穿过地形特征，但无法以移动结束于墙壁、地板等内部。此模型可在废墟的任何楼层设置或结束移动，但若该楼层不是地面层，则只有在其底座未于该楼层超伸时才能如此进行。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cybernetic Augmentation",
          "kind": "unique"
        }
      },
      {
        "id": "unique-secutor-of-olympus",
        "name": "奥林帕斯之猎杀者",
        "text": "在你的射击阶段开始时，选择一个距离此模型 12\" 内的敌方 **载具(Vehicle)** 单位并掷一个 D6：在 2+ 时，该敌方单位承受 D3+1 点道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Secutor of Olympus",
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
    "塞库塔里·轻盾兵": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "机神律令",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Doctrina Imperatives",
          "kind": "core"
        }
      },
      {
        "id": "unique-blind-barrage",
        "name": "致盲弹幕",
        "text": "在你的射击阶段，此单位射击后，选择一个被该次攻击击中的敌方步兵单位。直到你的下一个回合开始，当此单位在战场上时，该敌方单位被致盲。当一个单位被致盲时，该单位中的每个模型每次发动攻击时，从命中掷骰中扣除1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blind Barrage",
          "kind": "unique"
        }
      },
      {
        "id": "unique-secutarii",
        "name": "塞库塔里",
        "text": "若你军队中的领袖模型可附着于斥候旅队单位，则可改为附着于此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Secutarii",
          "kind": "unique"
        }
      }
    ],
    "泰拉克斯型白蚁钻地车": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3，深入打击，机神律令",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3, Deep Strike, Doctrina Imperatives",
          "kind": "core"
        }
      },
      {
        "id": "unique-termite-assault",
        "name": "白蚁突击",
        "text": "此模型必须在增援中开始战斗，但它及其内部载运的任何单位不计入你可开始战斗时的增援单位最大限制。此模型可在你第一、二或三个移动阶段的增援步骤中被设置在战场上，不受任何任务规则限制。此模型内部载运的任何单位可在其被设置在战场上后下车，若如此，他们必须被设置在距离所有敌方模型 9\" 以上的地方。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Termite Assault",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输",
        "text": "此模型的运输容量为 12 个机械教步兵模型。不能运输跳跃背包或卡特芬模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      },
      {
        "id": "unique-damaged-1-5-wounds-remaining",
        "name": "受损：剩余 1-5 伤",
        "text": "此模型剩余伤害为 1-5 时，此模型每次进行攻击时，从命中掷骰减去 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Damaged: 1-5 wounds remaining",
          "kind": "unique"
        }
      }
    ],
    "战仆": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "机神律令",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Doctrina Imperatives",
          "kind": "core"
        }
      },
      {
        "id": "unique-mindlock",
        "name": "心智锁链",
        "text": "当工程祭司模型率领此单位时，增加此单位中伺服机械模型所装备之远程武器和近战武器的命中技巧和武器技巧特性各 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Mindlock",
          "kind": "unique"
        }
      },
      {
        "id": "unique-servitor-retinue",
        "name": "战仆扈从",
        "text": "在宣告战斗阵型步骤的开始时，此单位可加入你的军队中由一个科技祭司工程师模型领导的另一个单位（一个单位最多只能加入一个护卫单位）。若如此，直到战斗结束，此单位中的每个模型都计为该护卫单位的一部分，且该护卫单位的起始兵力相应增加。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Servitor Retinue",
          "kind": "unique"
        }
      }
    ],
    "塞库塔里·重装步兵": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "机神律令",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Doctrina Imperatives",
          "kind": "core"
        }
      },
      {
        "id": "unique-titan-guard",
        "name": "泰坦守卫",
        "text": "你可以用英勇干预策略以 0 指令点数指向此单位，且即使你在本阶段已经用该策略指向不同单位也可以如此做。进行此操作时，若战场上有一个或多个友方钛神战斗单位，你可以重掷随后的冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Titan Guard",
          "kind": "unique"
        }
      },
      {
        "id": "unique-secutarii",
        "name": "塞库塔里",
        "text": "若你的军队中具有领袖能力的模型可附着到机械教前锋队，则它可改为附着到此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Secutarii",
          "kind": "unique"
        }
      }
    ],
    "净化军团塞波利斯硫磺猎手": [
      {
        "id": "unique-压制火力",
        "name": "压制火力",
        "text": "在您的射击阶段中，在该单位完成射击后，您可以选择一个被那些攻击命中的敌方单位。若选择，直到下个己方回合开始前，那个敌方单位被**压制**：\n■ 在一个单位被**压制**时，那个单位：\n■ **M** -2\"。\n■ **冲锋掷骰**结果 -2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "压制火力",
          "kind": "unique"
        }
      }
    ],
    "净化军团佩莱克斯净化者": [
      {
        "id": "unique-灼热之火",
        "name": "灼热之火",
        "text": "在该单位使用磷光火炬进行的攻击以一个位于**目标**范围内的单位为目标时：\n■ 攻击可以重掷结果为 1 的**致伤掷骰**。\n■ 或者：如果该单位位于一个己方**机械修会战线**单位的 6\" 内，您可以重掷**致伤掷骰**。",
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
          "englishName": "灼热之火",
          "kind": "unique"
        }
      }
    ],
    "净化军团护教军先锋": [
      {
        "id": "unique-欧姆尼偏光器",
        "name": "欧姆尼偏光器",
        "text": "该单位的远程攻击拥有**[无视掩体]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "欧姆尼偏光器",
          "kind": "unique"
        }
      },
      {
        "id": "unique-饱和辐射-光环",
        "name": "饱和辐射（光环）",
        "text": "在一个敌方单位（**载具**单位除外）位于该单位的 3\" 内时，那个敌方单位拥有 -1 **OC**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "饱和辐射（光环）",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
