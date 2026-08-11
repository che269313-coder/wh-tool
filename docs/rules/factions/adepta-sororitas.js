/* Generated source-text rule package for adepta-sororitas. */
(function (root) {
  root["WarhammerWebsiteRules_adepta_sororitas"] = {
  "factionRules": [
    {
      "id": "adepta-sororitas.army-rule",
      "name": "信仰之举",
      "text": "你军队中具有此能力的单位，每阶段可执行一次信念之举，需用奇蹟骰。\n\n获得奇蹟骰\n\n如果您的军队阵营是修女会，那麽您便可以在以下时机获得 1 个奇蹟骰：\n\n■ 每个战斗轮次开始时。\n■ 每当一个己方军队中的修女会单位被摧毁时。\n\n当您获得一个奇蹟骰时，掷一枚 D6。本次掷骰的结果即是这个奇蹟骰的点数。该点数不能被改变或重掷，除非有某项规则明确说明可进行此类操作。将您的奇蹟骰收拢并放在一旁，这便是您的奇蹟骰池。\n\n执行信念之举\n\n掷骰前，若你的奇蹟骰池有骰，可以从池中挑一颗替代该次掷骰，视同掷出该点数（冲锋掷骰、战斗震慑测试等多骰掷骰只能替换一颗）。每颗奇蹟骰只能用一次，用完即从池中移除，其余未替换的骰子正常掷。\n\n可用奇蹟骰替换的掷骰类型：\n\n■ 前进、冲锋、战斗震慑测试\n■ 命中、致伤、伤害、豁免",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": []
    }
  ],
  "unitRules": {
    "阿斯垂德·瑟加和阿加瑟·多兰": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-auto-tapestry-of-the-emperor-s-judgement",
        "name": "帝皇审判之自动挂毯",
        "text": "当此模型领导一个单位且包含艾丝翠德·瑟加模型时，该单位中的模型配备的武器拥有 **[毁灭性创伤]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-recount-the-deeds-of-the-saints",
        "name": "记述圣者事蹟",
        "text": "当此单位率领一个单位且包含一个 Agathe Dolan 模型时，每当该单位摧毁一个敌方单位，你获得 1 奇蹟骰。当该 Agathe Dolan 模型被摧毁时，你获得 D3 奇蹟骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "鞭挞苦修者": [
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
        "id": "unique-extremis-trigger-word",
        "name": "极限触发词",
        "text": "此单位每次被选定进行战斗时，你可以选择启动其终极触发词。若你如此做，直到阶段结束，此单位中的模型装备的弧光链枷的攻击次数特征为 6，且具有 **[危险]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "战斗修女小队": [
      {
        "id": "unique-cherub",
        "name": "圣童侍从",
        "text": "一场战斗中一次，此单位执行「信念行动」后，你获得 1 个奇蹟骰。\n\n*",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-defenders-of-the-faith",
        "name": "信仰守护者",
        "text": "在你的指挥阶段结束时，若此单位在你控制的目标标记范围内，该目标标记仍在你的控制下，直到你对手在某一阶段结束时对该目标标记的控制度大于你的控制度。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-simulacrum-imperialis",
        "name": "帝国圣像拟像",
        "text": "在你的指挥阶段结束时，对于每个你控制、且其射程范围内有一个或多个来自你军队并具有此能力的单位的目标标记，掷一个 D6：结果为 4+ 时，你获得 1 颗数值等于该结果的奇蹟骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "大修女": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-sacred-command",
        "name": "神圣指挥",
        "text": "每战斗回合一次，你军队中具有此能力的一个单位在被目标为某策略时可使用它。若如此，将该策略的该次使用的CP成本减少1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-the-emperor-s-grace",
        "name": "帝皇恩典",
        "text": "每场战斗一次，在任何阶段开始时，此模型可使用此能力。若此模型使用此能力，则至本阶段结束前，此模型具有 2+ 无敌豁免掷骰。",
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
            "value": 2
          }
        ]
      },
      {
        "id": "unique-null-rod",
        "name": "虚无权杖",
        "text": "持有者所在的单位中的模型对致命伤与灵能攻击具有不觉疼痛 4+ 能力。",
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
        "id": "unique-rod-of-office",
        "name": "职权权杖",
        "text": "每当持有者所在的单位中的模型进行一次攻击时，重掷命中掷骰中的 1。",
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
      }
    ],
    "跳跃背包大修女": [
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
        "id": "unique-sacred-command",
        "name": "神圣指挥",
        "text": "每战斗回合一次，你军队中具有此能力的一个单位在被目标为某策略时可使用它。若如此，将该策略的该次使用的CP成本减少1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-divine-deliverance",
        "name": "圣洁天诛",
        "text": "每场战斗一次，在战斗阶段开始时，此模型可使用此能力。如果使用，直到阶段结束，此模型配备的近战武器攻击次数特征+3，且该等武器具有 **[毁灭性创伤]** 能力。",
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
            "value": 3,
            "phase": "melee"
          }
        ]
      }
    ],
    "惩戒者坦克": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-rites-of-castigation",
        "name": "惩戒仪式",
        "text": "在你的射击阶段，此模型开火后，选择一个被其中一次或多次攻击命中的敌方单位。直到本回合结束，每当一个友善的 **修女会(Adepta Sororitas)** 单位进行对该敌方单位的远程攻击时，将该攻击的护甲穿透特性提升 1。同一敌方单位每轮只能受此能力影响一次。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "洁天使隐伏者": [
      {
        "id": "unique-rituale-nullificatus",
        "name": "空化仪典",
        "text": "此单位中的模型具有「不觉疼痛4+」能力，可对抗灵能攻击与道德创伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-virtue-of-intolerance",
        "name": "不容异端之德",
        "text": "在战斗开始时，从对手军队中选择一个单位作为此单位的猎物。此单位中的模型每次发动以其猎物为目标的攻击时，该攻击具有 **[精确]** 能力且你可重掷命中掷骰。此能力即使此单位已搭乘 **运输工具(Transport)** 也可使用。",
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
        "id": "unique-simulacrum-imperialis",
        "name": "帝国圣像拟像",
        "text": "在你的指挥阶段结束时，对于每个你控制、且其射程范围内有一个或多个来自你军队并具有此能力的单位的目标标记，掷一个 D6：结果为 4+ 时，你获得 1 颗数值等于该结果的奇蹟骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-denuncia-oratory",
        "name": "宣判演说台",
        "text": "每当持有者所在的单位的猎物被消灭时，你可以从对手的军队中选择一个新单位作为其猎物。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "洁天使圣徒": [
      {
        "id": "unique-sworn-protectors",
        "name": "誓约守护者",
        "text": "当一个 **修女会(Adepta Sororitas)角色(Character)** 正领导此单位时，每次一个攻击以此单位为目标时，从致伤掷骰中减 1。",
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
    "恶魔驱逐者": [
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
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "独行特工",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-holy-judgement",
        "name": "神圣审判",
        "text": "在你的射击阶段开始时，选择距此单位的艾弗瑞尔·斯特恩模型 12\" 内且可见的 1 个敌方单位。该单位必须进行战斗震撼测试，如果该单位是**混沌(Chaos)**单位，则从结果扣除 2。如果测试失败，该敌方单位承受 3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-mysterious-saviours",
        "name": "神秘救世主",
        "text": "你可以用「英勇介入」计谋以此单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做：\n■ 该次使用减少 1 指令点。\n■ 该次使用不会阻止本阶段该计谋用于其他单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "书记修女": [
      {
        "id": "core-support",
        "name": "辅助",
        "text": "在战斗开始前的召集军队步骤中，己方军队中每存在一个 **领袖** 和 **辅助** 单位，您便可以选择该单位可以领导的一个己方 **护卫** 单位。该单位将在战斗中领导被选择的 **护卫** 单位并与其组成一个 **联合** 单位。\n\n除非另有明确规定，每个 **护卫** 单位只能与一个 **领袖** 单位和一个 **辅助** 单位组成 **联合** 单位。\n\n参见联合单位（19）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-laud-hailer",
        "name": "传道扩音器",
        "text": "每场战斗一次，在任何阶段开始时，你可选择1个友方 **修女会(Adepta Sororitas)** 单位，其处于战斗震撼状态且距此模型12\"以内。该单位不再处于战斗震撼状态。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-stirring-rhetoric",
        "name": "激励辞令",
        "text": "当此模型领导一个单位时，每次该单位进行「信念之举」时，该「信念之举」所使用的其中一个奇蹟骰的数值先改为 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "教条官": [
      {
        "id": "core-support",
        "name": "辅助",
        "text": "在战斗开始前的召集军队步骤中，己方军队中每存在一个 **领袖** 和 **辅助** 单位，您便可以选择该单位可以领导的一个己方 **护卫** 单位。该单位将在战斗中领导被选择的 **护卫** 单位并与其组成一个 **联合** 单位。\n\n除非另有明确规定，每个 **护卫** 单位只能与一个 **领袖** 单位和一个 **辅助** 单位组成 **联合** 单位。\n\n参见联合单位（19）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-executioner-of-heretics",
        "name": "行刑者",
        "text": "当敌方单位在此模型 6\" 内时，该单位中模型的领导力特性降低 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-unflinching-determination",
        "name": "坚定不移",
        "text": "当此模型率领一个单位时，该单位中模型的目标控制特性增加1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "御天使小队": [
      {
        "id": "core-scouts-6",
        "name": "侦察6\"",
        "text": "部分单位的能力中会标注「斥候 x\"」。若一个单位中的所有模型都具有此能力，则在第一战斗回合开始时、第一轮开始前，该单位可进行一次普通移动，移动距离最多 x\"，如同你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型（该单位在开始战斗时已搭乘其内）也可以如此移动（前提是只有具有此能力的模型搭乘该**专用运输工具(Dedicated Transport)**模型）。使用此能力移动的单位必须以水平距离超过 9\" 结束该移动，远离所有敌方模型。若双方玩家都有可进行此操作的单位，率先执行首轮的玩家优先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-cherub",
        "name": "圣童侍从",
        "text": "一场战斗中一次，此单位执行「信念行动」后，你获得 1 个奇蹟骰。\n\n*",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-righteous-awareness",
        "name": "神圣警觉",
        "text": "每回合一次，当敌方单位在此单位9\"内结束正常、前进或后撤移动时，若此单位不在一个或多个敌方单位的交战范围内，它可进行距离最多为D6\"的正常移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-holy-vanguard",
        "name": "神圣先锋",
        "text": "若此单位在宣告战斗编成步骤中有领袖单位附加,且此单位于战斗开始时搭乘于运输工具(Transport)内,则该领袖单位获得斥候6\"(Scouts 6\")能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-simulacrum-imperialis",
        "name": "帝国圣像拟像",
        "text": "在你的指挥阶段结束时，对于每个你控制、且其射程范围内有一个或多个来自你军队并具有此能力的单位的目标标记，掷一个 D6：结果为 4+ 时，你获得 1 颗数值等于该结果的奇蹟骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "驱魔人导弹车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-devastating-refrain",
        "name": "毁灭副歌",
        "text": "在你的射击阶段，该模型射击后，如果使用曲射武器的一次或多次攻击对敌方单位命中，该敌方单位必须进行战斗震撼测试。每当这类攻击摧毁具有致命破灭能力的敌方模型时，该模型的致命破灭能力在D6掷骰为5+时而非6时造成致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "医疗修女": [
      {
        "id": "core-support",
        "name": "辅助",
        "text": "在战斗开始前的召集军队步骤中，己方军队中每存在一个 **领袖** 和 **辅助** 单位，您便可以选择该单位可以领导的一个己方 **护卫** 单位。该单位将在战斗中领导被选择的 **护卫** 单位并与其组成一个 **联合** 单位。\n\n除非另有明确规定，每个 **护卫** 单位只能与一个 **领袖** 单位和一个 **辅助** 单位组成 **联合** 单位。\n\n参见联合单位（19）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-medicus-ministorum",
        "name": "圣部医务官",
        "text": "当此模型率领一支单位时，该单位内的模型获得不觉疼痛 5+ 能力。",
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
        "id": "unique-sacred-healing",
        "name": "神圣医疗",
        "text": "当此模型领导一个单位时，在你的指挥阶段，你可将最多 1 个被摧毁的模型（不包括 **角色(Character)** 模型）回复至该单位。若你愿意，你可先弃掉 1 个奇蹟骰子；若你这样做，你可改为将最多 D3+1 个被摧毁的模型（不包括 **角色(Character)** 模型）回复至该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "持像者": [
      {
        "id": "core-support",
        "name": "辅助",
        "text": "在战斗开始前的召集军队步骤中，己方军队中每存在一个 **领袖** 和 **辅助** 单位，您便可以选择该单位可以领导的一个己方 **护卫** 单位。该单位将在战斗中领导被选择的 **护卫** 单位并与其组成一个 **联合** 单位。\n\n除非另有明确规定，每个 **护卫** 单位只能与一个 **领袖** 单位和一个 **辅助** 单位组成 **联合** 单位。\n\n参见联合单位（19）。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-litany-of-deeds",
        "name": "英烈铭记",
        "text": "每当你的军队中一个 **修女会(Adepta Sororitas)** 单位或模型被摧毁时，如果该单位或模型在此模型 12\" 范围内被摧毁，你可以在将奇蹟骰的结果加入到奇蹟骰池之前重掷该奇蹟骰的结果。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-stanchion-of-holy-martyrs",
        "name": "圣殉标柱",
        "text": "当此模型领导一个单位时，该单位中的模型有 2+ 豁免(Sv)特性与 4+ 无敌豁免。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "献祭者装甲车": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-purge-and-cleanse",
        "name": "净化与清洗",
        "text": "在你的射击阶段中，此模型射击后，选择一个被该次或多次攻击命中的敌方单位。至阶段结束为止，该敌方单位无法获得掩护的好处。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 6 个修女会步兵模型。该模型不能运输跳跃包模型或凯旋之圣凯瑟琳。At the start of the Declare Battle Formations step、you can select one 战斗修女小队、御天使小队或见习修女小队 from your army。If you do、that 单位 is split into two 单位、每个 containing as equal a number of 模型 as possible (when splitting a 单位 in this way、make a note of which 模型 form 每个 of the two new 单位。If you are splitting a 单位 that has the Cherub ability、only one of the new 单位 can use that ability during the battle – make a note of which of the new 单位 this will be)。One of these 单位 must start the battle embarked within this TRANSPORT;the other can start the battle embarked within another TRANSPORT、或 it can be deployed as a separate 单位。’",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "茱妮丝·伊瑞塔": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭",
        "text": "致命破灭1",
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
        "id": "unique-the-pulpit-of-saint-holline-s-basilica",
        "name": "圣荷琳圣殿讲坛",
        "text": "当此模型领导一个单位时，每当攻击以该单位为目标时，从命中掷骰中减去 1。",
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
            "type": "incoming-hit-minus",
            "value": 1,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-fiery-conviction",
        "name": "热忱信念",
        "text": "若此模型在你的指挥阶段开始时于战场上，你可选择以下之一：\n\n• 弃置 1 奇蹟骰并获得 1 指令点。\n• 对此模型进行领导力测试；若该测试通过，获得 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "英特兰齐娅·弗雷娅": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭",
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
        "id": "unique-righteous-denunciation",
        "name": "正义斥责",
        "text": "在战斗阶段开始时，此模型 6\" 内的每个敌方单位都必须进行一次战斗震撼测试，该测试减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-judged-for-execution",
        "name": "判处死刑",
        "text": "在你的移动阶段结束时，你可选择一个距此模型18\"范围内且此模型可见到的敌方单位。直到你的下个指挥阶段开始，每次友方 **修女会(Adepta Sororitas)** 模型对该敌方单位进行攻击时，该攻击具有 **[致命一击]** 能力。",
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
      }
    ],
    "国教牧师": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-righteous-smiting",
        "name": "正义打击",
        "text": "当此模型领导一个单位时，该单位中每个模型进行近战攻击时，向致伤掷骰加1。",
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
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-zealot",
        "name": "狂热者",
        "text": "每场战斗一次，在战斗阶段，此模型可使用此能力。如其使用，至该阶段结束前，将此模型配备的近战武器的攻击次数和力量特性提升 3。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-holy-mission",
        "name": "神圣使命",
        "text": "若此模型在宣告战斗编成步骤中附加于 DOMINION SQUAD,则获得斥候6\"(Scouts 6\")能力。若此模型在宣告战斗编成步骤中附加于 SISTERS NOVITIATE SQUAD,则获得渗透(Infiltrators)能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "悔罪者机甲": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭",
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
        "id": "unique-anguish-of-the-unredeemed",
        "name": "未得救赎者的痛苦",
        "text": "此单位中的每个模型因近战攻击而被摧毁时，若该模型在此阶段未战斗过，掷一次D6。在2+时，不将其从游戏中移除；该被摧毁的模型可在发动攻击的单位完成其攻击后进行战斗，然后从游戏中移除。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-anchorite-sarcophagus",
        "name": "隐修者石棺",
        "text": "持有者的移动(M)特性为 7\"，防护(Sv)特性为 3+。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "莫雯·瓦尔": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭",
        "text": "致命破灭1",
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
        "id": "unique-abbess-sanctorum",
        "name": "圣女统帅",
        "text": "当此模型率领一支单位时，该单位中每个模型进行攻击时，可重掷命中掷骰，亦可重掷致伤掷骰。",
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
      },
      {
        "id": "unique-righteous-repugnance",
        "name": "圣女之正怒",
        "text": "每次选择此模型的单位射击或进行近战时，可舍弃 1 个奇蹟骰。如果如此做，直到该阶段结束为止，将菲德里斯与信仰之矛的攻击次数特征加 3。每次敌方单位被此模型摧毁时，获得 1 个奇蹟骰。",
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
        ]
      },
      {
        "id": "unique-supreme-commander",
        "name": "最高统帅",
        "text": "若此模型在你的军队中,则它必须是你的统帅(Warlord)。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "宫廷官": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-fury-of-the-righteous",
        "name": "正义之怒",
        "text": "此模型带领一个单位时，该单位内的模型装备的武器具有 **[致命一击]** 能力。",
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
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ]
      },
      {
        "id": "unique-rapturous-blows",
        "name": "狂喜打击",
        "text": "此单位每次被选中战斗时，你可弃置 1 个奇蹟骰。如果你这样做，直到阶段结束，此模型每次进行的近战攻击成功致伤时，该攻击的目标除受到正常伤害外，额外受到 1 点灵魂伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "楷模机甲": [
      {
        "id": "unique-righteous-paragons",
        "name": "正义帕拉吉翁",
        "text": "此单位中的每个模型每次对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位发动攻击时，命中掷骰+1，致伤掷骰+1。",
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
        ]
      }
    ],
    "忏悔者机甲": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭",
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
        "id": "unique-endless-suffering",
        "name": "无尽痛苦",
        "text": "此单位在进行了推进的回合可宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "忏悔修女小队": [
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
        "id": "unique-overseer-of-redemption",
        "name": "救赎监督者",
        "text": "此单位包含忏罪者上级模型时，修女忏罪者模型每次进行肉搏攻击，可重掷命中掷骰和可重掷致伤掷骰。",
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
    "仇天使小队": [
      {
        "id": "unique-cherubs",
        "name": "圣童侍从",
        "text": "每场对战中两次，此单位进行信仰之举后，你获得 1 枚奇蹟骰。\n\n***设计者备注：将两个圣童标记放在此单位旁边，每次使用此能力时移除一个。*",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-storm-of-retribution",
        "name": "报复风暴",
        "text": "每当此单位中的一个模型进行远程攻击时，重掷命中掷骰 1 和重掷致伤掷骰 1。如果此类攻击的目标是一个敌方单位，该单位在本战斗中摧毁过你军队中的一个或多个 **圣女骑士团** 单位，增加 1 到命中掷骰并增加 1 到致伤掷骰。",
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
          },
          {
            "type": "wound-reroll",
            "mode": "ones",
            "phase": "ranged"
          },
          {
            "type": "hit-modifier",
            "value": 1,
            "phase": "ranged"
          }
        ]
      }
    ],
    "圣塞莱斯汀": [
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
        "id": "unique-healing-tears",
        "name": "生命之泪",
        "text": "当此单位包含一个 Celestine 模型时，在你的指挥阶段，若此单位低于其起始兵力，则要麽一个被摧毁的 Geminae Superia 模型，要麽最多 D3 个其他护卫模型被恢复至此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-lifewards",
        "name": "生命护卫",
        "text": "此单位内含有 1 个或多个「天才姐妹」模型时，凯莱斯汀具有「不觉疼痛4+」能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-miraculous-intervention",
        "name": "神蹟干预",
        "text": "此单位的Celestine模型第一次被摧毁时，在该阶段结束时掷1D6。结果为2+时，将该Celestine模型重新放置于战场上，尽可能靠近其被摧毁的位置且不在任何敌方单位的交战范围内，并恢复其全部伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "净化者": [
      {
        "id": "core-scouts-6",
        "name": "侦察6\"",
        "text": "部分单位的能力中会标注「斥候 x\"」。若一个单位中的所有模型都具有此能力，则在第一战斗回合开始时、第一轮开始前，该单位可进行一次普通移动，移动距离最多 x\"，如同你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型（该单位在开始战斗时已搭乘其内）也可以如此移动（前提是只有具有此能力的模型搭乘该**专用运输工具(Dedicated Transport)**模型）。使用此能力移动的单位必须以水平距离超过 9\" 结束该移动，远离所有敌方模型。若双方玩家都有可进行此操作的单位，率先执行首轮的玩家优先移动其单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-ministorum-sermon",
        "name": "教会布道",
        "text": "当此单位包含一个 **圣部牧师** 时，此单位中模型配备的近战武器具有 **[连击 1]** 能力。",
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
        ]
      },
      {
        "id": "unique-cherub",
        "name": "圣童侍从",
        "text": "一场战斗中一次，此单位执行「信念行动」后，你获得 1 个奇蹟骰。\n\n*",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-simulacrum-imperialis",
        "name": "帝国圣像拟像",
        "text": "在你的指挥阶段结束时，对于每个你控制、且其射程范围内有一个或多个来自你军队并具有此能力的单位的目标标记，掷一个 D6：结果为 4+ 时，你获得 1 颗数值等于该结果的奇蹟骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-salvationist-medikit",
        "name": "救赎者医疗包",
        "text": "在你的指挥阶段，若持有者在战场上，你可以将至多 D3 个被消灭的模型（不含 **角色(Character)** 模型）放回此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "炽天使小队": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-angelic-ascent",
        "name": "天使飞昇",
        "text": "在你的射击阶段，此单位开火后，如果它不在任何敌方单位的交战距离内，可进行移动距离最多 6\" 的「正常移动」。如果如此移动，直到该回合结束为止，此单位无法宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "见习修女小队": [
      {
        "id": "core-infiltrators",
        "name": "渗透",
        "text": "渗透",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-impetuous-fervour",
        "name": "莽撞狂热",
        "text": "此单位中的每个模型每次发动攻击时，可重掷命中掷骰为 1。若该攻击的目标为敌方单位且在目标标记的范围内，则可改为重掷命中掷骰。",
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
        "id": "unique-sacred-banner",
        "name": "神圣旗帜",
        "text": "你可以重掷为持有者所在的单位进行的突进掷骰与冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-simulacrum-imperialis",
        "name": "帝国圣像拟像",
        "text": "在你的指挥阶段结束时，对于每个你控制、且其射程范围内有一个或多个来自你军队并具有此能力的单位的目标标记，掷一个 D6：结果为 4+ 时，你获得 1 颗数值等于该结果的奇蹟骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "修女会犀牛装甲车": [
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
        "id": "unique-self-repair",
        "name": "自我修复",
        "text": "在你的指挥阶段开始时，此模型恢复 1 点已失伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运载",
        "text": "该模型能够搭载 12 个修女会步兵模型。该模型不能运输跳跃包模型或 TRIUMPH OF SAINT KATHERINE.",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "凯旋之圣凯瑟琳": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "领袖",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-relics-of-the-matriarchs",
        "name": "圣母遗物",
        "text": "在战斗回合开始时，选择圣母遗物部分中的最多两个能力。直到下一战斗回合开始，此模型具备那些能力。\n\n**炽烈之心（光环）：** 当一个友方 **战斗修女(Adepta Sororitas)** 单位在此模型 6\" 内时，该单位的移动特性 +2\"，且为该单位进行的前进与冲锋掷骰 +1。\n\n**圣蔷薇香炉（光环）：** 当一个友方 **战斗修女(Adepta Sororitas)** 单位在此模型 6\" 内时，你可以为该单位重掷战斗震撼测试。\n\n**乌木圣杯拟像（光环）：** 当一个友方 **战斗修女(Adepta Sororitas)** 单位在此模型 6\" 内时，该单位每阶段可以进行至多两次信仰之举，而非仅一次。\n\n**银色裹布拟像（光环）：** 当一个友方 **战斗修女(Adepta Sororitas)** 单位在此模型 6\" 内时，该单位中每当一个模型进行一次远程攻击时，重掷掷出 1 的致伤掷骰。\n\n**英勇之心圣徽（光环）：** 当一个友方 **战斗修女(Adepta Sororitas)** 单位在此模型 6\" 内时，该单位中的模型具有「不觉疼痛 6+」能力。\n\n**血蔷薇花瓣（光环）：** 当一个友方 **战斗修女(Adepta Sororitas)** 单位在此模型 6\" 内时，该单位中模型装备的近战武器的护甲穿透特性提升 1。",
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
        "id": "unique-solemn-procession",
        "name": "庄严行列",
        "text": "每次你在战斗回合开始时获得1枚奇蹟骰子，若此模型在战场上，不要掷一个D6来决定该奇蹟骰子的数值；其数值为6。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "风天使小队": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "深入打击",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-embodied-prophecy",
        "name": "预言化身",
        "text": "此单位被选择进行战斗时，选择以下能力之一应用于此单位内模型配备的近战武器至该阶段结束：\n\n■ **[连击 1]**\n■ **[致命一击]**\n\n若此单位在该轮进行过冲锋移动，至该阶段结束时，改为选择上述两项能力都应用于此单位内模型配备的近战武器。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-sacred-banner",
        "name": "神圣旗帜",
        "text": "你可以重掷为持有者所在的单位进行的突进掷骰与冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "十字军战士": [
      {
        "id": "core-acts-of-faith",
        "name": "信念之举",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-spiritual-fortitude",
        "name": "灵魂坚毅",
        "text": "此单位中的模型对灵能攻击和致命伤具有 4+ 不觉疼痛能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-attached-unit",
        "name": "附着单位",
        "text": "如果你军队中的一个模型具有领导能力且可以附属于战斗修女小队，它可以改为附属于此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "圣地大修女阿达娅": [
      {
        "id": "unique-虚无权杖",
        "name": "虚无权杖",
        "text": "该单位拥有针对灵能攻击和**致命伤**的**不觉疼痛 4+**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-神圣指引-每个单位-每回合限一次",
        "name": "神圣指引（每个单位，每回合限一次）",
        "text": "在一个己方**圣地铁卫**单位**被选择进行攻击**时，您可以使用本技能。若使用，那个单位的攻击可以重掷**命中掷骰**。",
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
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **圣地铁卫战斗修女小队**\n■ **圣地铁卫洁天使圣徒**",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "战斗圣殿": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭",
        "text": "致命破灭D6",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-acts-of-faith",
        "name": "信念之举",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-consecrated-ground",
        "name": "圣化之地",
        "text": "当此工事设置时，其所有部分必须在另一部分的 1\" 内设置。友方战斗修女步兵模型可以在此工事的楼层部分上设置或结束任何移动类型。当你的军队中的战斗修女单位在此工事的 1\" 内时，该单位每个阶段可以执行一次额外信念之举。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-holy-cover",
        "name": "圣光掩护",
        "text": "每次远程攻击分配给一个模型时，若该模型因为此工事而不完全对攻击方单位中的每个模型可见，该模型在该攻击中获得掩护优势。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "镇压者运兵车": [
      {
        "id": "core-firing-deck-6",
        "name": "射击甲板6",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭",
        "text": "致命破灭D3",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "core-acts-of-faith",
        "name": "信念之举",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-transport",
        "name": "运输",
        "text": "此模型的运输容量为 12 个战斗修女步兵模型。不能运输跳跃背包模型或 Katherine 圣女的胜利。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-emergency-combat-embarkation",
        "name": "紧急战斗登载",
        "text": "每回合一次，在你对手的冲锋阶段中，敌方单位选择冲锋目标之后但在进行冲锋移动之前，你可选择你的军队中一个被选为该冲锋目标的战斗修女单位。若该单位不在任何敌方单位的交战范围内，且该单位内所有模型都在此运输工具的 3\" 内，则可登上此运输工具。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "天界圣战修女艾薇琳": [
      {
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "独行特工",
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
        "id": "core-acts-of-faith",
        "name": "信念之举",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-instrument-of-the-emperor-s-wrath",
        "name": "皇帝之怒的器物",
        "text": "每场战斗一次，在战斗阶段开始时，此模型可以使用此能力。如果这样做，直到该阶段结束，在此模型装备的近战武器的攻击特性上加 3，该武器具有 [DEVASTATING WOUNDS] 能力。",
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
            "value": 3,
            "phase": "melee"
          }
        ]
      },
      {
        "id": "unique-daemonbreaker",
        "name": "破魔者",
        "text": "此模型每次对恶魔单位发动攻击时，可重掷命中掷骰，可重掷致伤掷骰。",
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
    "死亡教派刺客": [
      {
        "id": "core-fights-first",
        "name": "先制攻击",
        "text": "拥有此能力的单位，若有资格战斗，且该单位中的所有模型都拥有此能力，则在先制攻击步骤中进行战斗。",
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
        "id": "core-acts-of-faith",
        "name": "信念之举",
        "text": "",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-death-cult",
        "name": "死亡邪教",
        "text": "此单位中的模型每次对角色单位发动攻击时，可重掷致伤掷骰。",
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
      }
    ],
    "圣地铁卫洁天使圣徒": [
      {
        "id": "unique-誓言卫士",
        "name": "誓言卫士",
        "text": "在一个敌方单位将该单位选为目标时，如果该单位拥有**修女会角色**关键词，那麽针对该单位进行的攻击的**致伤掷骰** -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "圣地铁卫鞭挞苦修者": [
      {
        "id": "unique-绝境口令",
        "name": "绝境口令",
        "text": "在该单位被选择进行近战时，您可以使用本技能。若使用：\n■ 该单位的鞭挞链枷武器拥有 6 **A**。\n■ 该单位的近战武器拥有**[危险]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ],
    "圣地铁卫战斗修女小队": [
      {
        "id": "unique-信仰卫士",
        "name": "信仰卫士",
        "text": "在您的指挥阶段结束时，如果该单位控制一个**目标**，那个**目标**被**占领**。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-智天使-每个单位-每场战斗限一次",
        "name": "智天使（每个单位，每场战斗限一次）",
        "text": "在该单位执行了一次信仰之举后，您可以使用本技能。若使用，您获得 1 枚奇蹟骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      },
      {
        "id": "unique-帝国圣像",
        "name": "帝国圣像",
        "text": "在您的指挥阶段结束时，每有一个被您控制的**目标**的范围内存在一个拥有本技能的己方单位，便掷一枚骰子：\n■ 若结果为 4+，您便获得 1 枚奇蹟骰，数值相当于那次掷骰的结果。",
        "status": "已结构化，当前仅供查阅",
        "effects": []
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
