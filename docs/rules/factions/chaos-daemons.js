/* Generated source-text rule package for chaos-daemons. */
(function (root) {
  root["WarhammerWebsiteRules_chaos_daemons"] = {
  "factionRules": [
    {
      "id": "chaos-daemons.army-rule",
      "name": "混沌之影",
      "englishName": "The Shadow of Chaos",
      "text": "战场下列区域算在你军队的混沌之影内：\n\n■ 你的部署区永远是。\n■ 任一阶段开始时，若你控制禁地内至少一半的目标标记，禁地该阶段视为在阴影内。\n■ 任一阶段开始时，若你控制对手部署区至少一半的目标标记，该区域该阶段视为在阴影内。\n\n恶魔显现\n\n你的单位位于混沌之影内进行战斗震慑测试时 +1；若测试通过，该单位一个模型回复最多 D3 点伤害（战线单位则改为回到最多 D3 个被摧毁的模型）。\n\n恶魔恐惧\n\n敌方单位若位于你军队的混沌之影内、或位于你军队嗜血狂魔／伟大不洁者／命运织者凯罗斯／纵欲之主／变化之王／罗提古斯／沙拉希·赫尔班恩／斯卡布兰德的 6\" 内，其战斗震慑测试 -1；若测试失败，再承受 D3 致命伤。",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": [],
      "source": {
        "englishName": "The Shadow of Chaos",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "纳垢兽": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭1，深入打击，斥候6",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1, Deep Strike, Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-grotesque-regeneration",
        "name": "骇人再生",
        "text": "在每个阶段结束时，若此单位中一个努格之兽模型已失去伤但未被摧毁，该模型恢复所有已失去的伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grotesque Regeneration",
          "kind": "unique"
        }
      }
    ],
    "比拉克": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击，隐秘",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike, Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-the-dark-master",
        "name": "黑暗主宰",
        "text": "此模型周围 6\" 内的战场区域在你的军队「混沌之影」范围内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "The Dark Master",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shadow-form-abilities",
        "name": "黑暗形态",
        "text": "在战斗回合开始时，选择一个暗影形态能力。直到战斗回合结束，此模型具有该能力。\n\n**暗影缠绕（光环、灵能）：** 当一个友方 **恶魔军团(Legiones Daemonica)** 单位或 **暗影军团(Shadow Legion)** 单位在此模型 6\" 内时，该单位仅在攻击模型位于 18\" 内时才能成为远程攻击的目标。\n\n**绝望阴霾（光环、灵能）：** 在你对手指挥阶段的「战斗震撼」步骤中，若一个低于其起始兵力的敌方单位在此模型 9\" 内，该单位必须进行一次战斗震撼测试。就此能力而言，若一个单位的起始兵力为 1，则当它失去一点或更多伤害时，即视为低于其起始兵力。此外，每当一个敌方单位在此模型 9\" 内未通过战斗震撼测试时，此模型恢复最多 D3 点已失去的伤害。\n\n**暗影之主（光环、灵能）：** 当一个友方 **恶魔军团(Legiones Daemonica)** 或 **暗影军团(Shadow Legion)** 单位在此模型 6\" 内时，该单位中每当一个模型进行一次攻击时，重掷掷出 1 的命中掷骰。",
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
        ],
        "source": {
          "englishName": "Shadow Form Abilities",
          "kind": "unique"
        }
      },
      {
        "id": "unique-supreme-commander",
        "name": "最高指挥官",
        "text": "若此模型在你的军队中,则它必须是你的统帅(Warlord)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Supreme Commander",
          "kind": "unique"
        }
      }
    ],
    "碾血者": [
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
        "id": "unique-brass-stampede",
        "name": "黄铜践踏",
        "text": "此单位每次结束一次冲锋移动时，选择一个在此单位交战范围内的敌方单位，并为此单位中的每个模型掷一次 D6：对于每次 4+，该敌方单位受到 D3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Brass Stampede",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "恶魔徽记",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Icon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Instrument of Chaos",
          "kind": "unique"
        }
      }
    ],
    "放血鬼": [
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
        "id": "unique-bane-of-cowards",
        "name": "懦夫梦魇",
        "text": "每当敌方单位（**凶兽(Monster)**和**载具(Vehicle)**除外）在你军队中具有此能力的一个或多个单位的交战距离内后退时，该敌方单位中的模型必须进行绝望逃亡检定。进行此检定时，如果该敌方单位也处于战斗震撼状态，则从每次这些绝望逃亡检定中减去 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bane of Cowards",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "恶魔徽记",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Icon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Instrument of Chaos",
          "kind": "unique"
        }
      }
    ],
    "鲜血之主": [
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
        "id": "unique-bloodmaster",
        "name": "鲜血主宰",
        "text": "当此模型领导一个单位时，该单位中每个模型进行攻击时，致伤掷骰加 1。",
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
        ],
        "source": {
          "englishName": "Bloodmaster",
          "kind": "unique"
        }
      },
      {
        "id": "unique-a-gory-path",
        "name": "荣耀之路",
        "text": "此模型所属单位每次巩固时，可以移动最多6\"而非最多3\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "A Gory Path",
          "kind": "unique"
        }
      }
    ],
    "嗜血狂魔": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-daemon-lord-of-khorne",
        "name": "恐虐魔王（光环）",
        "text": "友方 **恐虐(Khorne)恶魔军团(Legiones Daemonica)** 单位位于此模型6\"范围内时，该单位中模型的每次近战攻击时，加1至命中掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemon Lord of Khorne",
          "kind": "unique"
        }
      },
      {
        "id": "unique-greater-daemon-of-khorne",
        "name": "恐虐至高恶魔",
        "text": "当友方 **恐虐(Khorne)恶魔军团(Legiones Daemonica)** 单位位于此模型 6\" 内时，该单位在你的军队的混沌阴影中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Greater Daemon of Khorne",
          "kind": "unique"
        }
      },
      {
        "id": "unique-relentless-carnage",
        "name": "不息屠戮",
        "text": "在战斗阶段结束时，你可选择一个与此模型在交战范围内的敌方单位并掷 8D6：对于每个 4+，该敌方单位承受 1 点灵能伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Relentless Carnage",
          "kind": "unique"
        }
      }
    ],
    "蓝惧妖": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，渗透者",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Infiltrators",
          "kind": "core"
        }
      },
      {
        "id": "unique-split",
        "name": "分裂",
        "text": "此单位中 **蓝色恐怖** 模型每次被摧毁时，在攻击单位完成其攻击后，如此单位未被摧毁，为该模型掷 1D6。成功时，向此单位中添加 1 个 **硫磺恐怖** 模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Split",
          "kind": "unique"
        }
      },
      {
        "id": "unique-sullen-malevolence",
        "name": "阴郁恶意",
        "text": "当一个敌方单位在此单位 6\"内时，如果此单位包含一个或多个 **蓝色恐怖** 模型，该敌方单位中的模型的领导力特征恶化 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Sullen Malevolence",
          "kind": "unique"
        }
      },
      {
        "id": "unique-exploding-horrors",
        "name": "自爆妖灵",
        "text": "每次此单位被选择进行战斗时，可选择一个在其交战范围内的敌方单位，然后选择此单位中一个或多个 **硫磺恐怖** 模型。对于每个你选择的 **硫磺恐怖** 模型，掷一次 D6：结果为 4+，该模型被摧毁且该敌方单位承受 1 道道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Exploding Horrors",
          "kind": "unique"
        }
      }
    ],
    "燃烧战车": [
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
        "id": "unique-eldritch-flames",
        "name": "秘焰",
        "text": "在你的射击阶段中，此模型射击后，选择一个被这些攻击命中一次或多次的敌方单位。直到该阶段结束，该单位无法获得掩护的好处。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Eldritch Flames",
          "kind": "unique"
        }
      }
    ],
    "变化使": [
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
        "id": "unique-changecaster",
        "name": "变化使",
        "text": "当此模型领导一个单位时，该单位中的模型装备的远程武器具有 **[连击 1]** 能力。",
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
        ],
        "source": {
          "englishName": "Changecaster",
          "kind": "unique"
        }
      },
      {
        "id": "unique-storm-of-mutating-sorcery",
        "name": "变异灵能风暴",
        "text": "在你的射击阶段，此模型射击后，选择一个被这些攻击命中一次或多次的敌方 **步兵(Infantry)** 单位。该单位必须进行战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Storm of Mutating Sorcery",
          "kind": "unique"
        }
      }
    ],
    "扭曲魔镜": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖，先攻",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader, Fights First",
          "kind": "core"
        }
      },
      {
        "id": "unique-swallow-energy",
        "name": "吞噬能量",
        "text": "此模型领导一个单位时，该单位内的模型对致命伤和灵能攻击具有不觉疼痛4+ 能力。",
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
          "englishName": "Swallow Energy",
          "kind": "unique"
        }
      },
      {
        "id": "unique-horrible-fascination",
        "name": "恐怖迷恋",
        "text": "在你的对手射击阶段开始时，你的军队中具有此能力的一个 **灵能者(Psyker)** 模型可使用此能力。若此模型使用此能力，选择一个在该 **灵能者(Psyker)** 模型12\"内且可见的敌方单位，并掷一次D6：掷骰结果为1时，该 **灵能者(Psyker)** 模型造成D3点道德伤害；为2-5时，直到该阶段结束，该敌方单位中的每个模型每次进行攻击时，命中掷骰-1；为6时，该敌方单位在此阶段不合格进行射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Horrible Fascination",
          "kind": "unique"
        }
      }
    ],
    "魅魔": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，先攻",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Fights First",
          "kind": "core"
        }
      },
      {
        "id": "unique-horrifying-beauty",
        "name": "可怖美貌",
        "text": "在战斗阶段开始时，距离你的军队中一个或多个具有此能力的单位交战范围内的每个敌方单位必须进行战斗震撼测试，若该敌方单位低于半数，则结果减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Horrifying Beauty",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "恶魔徽记",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Icon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Instrument of Chaos",
          "kind": "unique"
        }
      }
    ],
    "混沌恶魔王子": [
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
        "id": "unique-daemonic-lord",
        "name": "恶魔领主",
        "text": "当此模型距离一个或以上友方**恶魔军团(Legiones Daemonica)步兵(Infantry)**单位3\"以内时，此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Lord",
          "kind": "unique"
        }
      },
      {
        "id": "unique-prince-of-darkness",
        "name": "黑暗王子",
        "text": "当友军 **恶魔军团(Legiones Daemonica)** 单位在此模型6\"内时，该单位中的模型具有隐蔽能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Prince of Darkness",
          "kind": "unique"
        }
      },
      {
        "id": "unique-unholy-vigour",
        "name": "不洁体魄",
        "text": "每场战斗一次，在任何阶段开始时，此模型可使用此能力。若如此，直到阶段结束，此模型具有 3+ 无敌豁免。",
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
        ],
        "source": {
          "englishName": "Unholy Vigour",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-allegiance",
        "name": "忠于混沌",
        "text": "当你选择将此模型纳入军队时,你必须为它选择下列关键字之一以获得: ■ 恐虐(Khorne) ■ 奸奇(Tzeentch) ■ 纳垢(Nurgle) ■ 色孽(Slaanesh)。你所选的关键字也会影响此模型的部分属性。恐虐恶魔亲王:若此模型具有恐虐(Khorne)关键字,其地狱锻造武器的力量(S)属性 +2。奸奇恶魔亲王:若此模型具有奸奇(Tzeentch)关键字,其地狱火炮的攻击(A)属性 +3。纳垢恶魔亲王:若此模型具有纳垢(Nurgle)关键字,其耐受(T)属性 +1。色孽恶魔亲王:若此模型具有色孽(Slaanesh)关键字,其移动(M)属性 +2\"。",
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
    "有翼混沌恶魔王子": [
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
        "id": "unique-malefic-destruction",
        "name": "大肆破坏",
        "text": "每场战斗一次，在战斗阶段开始时，此模型可使用此能力。如果使用，直到本阶段结束，将此模型的地狱锻武器的攻击次数特性加 3。",
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
          "englishName": "Malefic Destruction",
          "kind": "unique"
        }
      },
      {
        "id": "unique-harbinger-of-death",
        "name": "死亡使者",
        "text": "此模型每次被选中发动战斗时，选择下列其中一个能力。直到阶段结束，此模型的地狱锻造武器具有该能力：\n■ **[致命一击]**\n■ **[精准]**\n■ **[连击 1]**",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Harbinger of Death",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-allegiance",
        "name": "忠于混沌",
        "text": "当你选择将此模型纳入军队时,你必须为它选择下列关键字之一以获得: ■ 恐虐(Khorne) ■ 奸奇(Tzeentch) ■ 纳垢(Nurgle) ■ 色孽(Slaanesh)。你所选的关键字也会影响此模型的部分属性。恐虐恶魔亲王:若此模型具有恐虐(Khorne)关键字,其地狱锻造武器的力量(S)属性 +2。奸奇恶魔亲王:若此模型具有奸奇(Tzeentch)关键字,其地狱火炮的攻击(A)属性 +3。纳垢恶魔亲王:若此模型具有纳垢(Nurgle)关键字,其耐受(T)属性 +1。色孽恶魔亲王:若此模型具有色孽(Slaanesh)关键字,其移动(M)属性 +2\"。",
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
    "计患官艾皮德缪斯": [
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
        "id": "unique-blessed-by-the-plague-god",
        "name": "瘟疫之神的祝福",
        "text": "当此模型领导单位时，该单位中的模型具有 4+ 无敌豁免。",
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
            "value": 4,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Blessed by the Plague God",
          "kind": "unique"
        }
      },
      {
        "id": "unique-tally-of-pestilence",
        "name": "疫病账册",
        "text": "记录在战斗中由你军队的 **纳垢(Nurgle)恶魔军团(Legiones Daemonica)** 模型摧毁的敌方模型数。在你的指挥阶段开始时，若计数达7或以上，你获得1CP，计数重置为0。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Tally of Pestilence",
          "kind": "unique"
        }
      }
    ],
    "神尊火妖": [
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
        "id": "unique-blazing-warpfire",
        "name": "炽烈蛇火",
        "text": "当此模型领导一个单位时，该单位模型配备的远程武器获得 **[突击]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blazing Warpfire",
          "kind": "unique"
        }
      },
      {
        "id": "unique-flames-of-change",
        "name": "变化之焰",
        "text": "在你的射击阶段中，此模型射击后，选择被这些攻击命中的一个敌方单位（**凶兽(Monster)**和**载具(Vehicle)**除外），并掷一次 D6。成功值为 4+，直到你对手的下一回合结束时，该敌方单位着火。当单位着火时，从其移动特性中减去 2\"，并从为其进行的前进和冲锋掷骰中减去 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Flames of Change",
          "kind": "unique"
        }
      },
      {
        "id": "unique-manifestation-of-destruction",
        "name": "毁灭化身",
        "text": "此模型不能作为你的统帅(Warlord),也不能被赋予强化(Enhancement)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Manifestation of Destruction",
          "kind": "unique"
        }
      }
    ],
    "窥命者": [
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
        "id": "unique-fateskimmer",
        "name": "窥命者",
        "text": "当此模型统领一个单位时，该单位中的模型所配备的近战武器具有 **[致命一击]** 能力。",
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
          "englishName": "Fateskimmer",
          "kind": "unique"
        }
      },
      {
        "id": "unique-rider-of-the-immaterial-winds",
        "name": "驾驭亚空间之风",
        "text": "每场战斗一次，在你的对手回合结束时，若此模型的单位未在交战范围内任何敌方单位，你可从战场移除该单位并将其放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rider of the Immaterial Winds",
          "kind": "unique"
        }
      }
    ],
    "肮脏瘤口树": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "渗透者",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Infiltrators",
          "kind": "core"
        }
      },
      {
        "id": "unique-shroud-of-flies",
        "name": "苍蝇之幕",
        "text": "友军 **纳垢(Nurgle)恶魔军团(Legiones Daemonica)** 单位位于此 **防御工事(Fortification)** 6\" 范围内时，该单位中的模型具有隐蔽能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shroud of Flies",
          "kind": "unique"
        }
      },
      {
        "id": "unique-diseased-cover",
        "name": "瘟疫掩体",
        "text": "每当远程攻击分配给一个模型时，如果该模型因为此**防御工事(Fortification)**而对攻击方单位中的每个模型都不完全可见，则该模型对该攻击具有掩护优势。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Diseased Cover",
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
    "欢愉魔": [
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
        "id": "unique-soporific-musk",
        "name": "麻醉香雾",
        "text": "敌军单位（**凶兽(Monster)**和**载具(Vehicle)**除外）位于你的军队中有此能力的一个或多个单位的交战范围内时，该敌军单位每次后撤时，其中的模型必须进行绝望逃脱测试。进行此测试时，若该敌军单位同时处于战动摇状态，则从每次绝望逃脱测试中减少1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Soporific Musk",
          "kind": "unique"
        }
      }
    ],
    "火妖": [
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
        "id": "unique-bounding-leaps",
        "name": "腾跃袭击",
        "text": "此单位在进行后撤的回合内仍可进行射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bounding Leaps",
          "kind": "unique"
        }
      }
    ],
    "血猎犬": [
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
        "id": "unique-hunters-from-the-warp",
        "name": "次元猎手",
        "text": "在对手的回合结束时，若此单位未位于一个或多个敌方单位的交战范围内，你可将其从战场上移除，并放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hunters from the Warp",
          "kind": "unique"
        }
      },
      {
        "id": "unique-collar-of-khorne",
        "name": "恐虐项圈",
        "text": "持有者拥有对抗灵能攻击的不觉疼痛 3+ 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Collar of Khorne",
          "kind": "unique"
        }
      }
    ],
    "幻变之主": [
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
        "id": "unique-fluxmaster",
        "name": "幻变之主",
        "text": "当此模型领导一个单位时，每次对该单位进行攻击时，命中掷骰减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fluxmaster",
          "kind": "unique"
        }
      },
      {
        "id": "unique-altered-reality",
        "name": "改变现实",
        "text": "每战斗回合一次，在对此模型进行命中掷骰、致伤掷骰或豁免掷骰后，你可以将该掷骰结果改为未修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Altered Reality",
          "kind": "unique"
        }
      }
    ],
    "大不净者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击，不觉疼痛6+",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "fnp",
            "threshold": 6
          }
        ],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike, Feel No Pain 6+",
          "kind": "core"
        }
      },
      {
        "id": "unique-greater-daemon-of-nurgle",
        "name": "纳垢伟大恶魔",
        "text": "当有友军 **瘟疫军团(Plague Legions)恶魔(Daemon)** 单位在此模型 6\" 内时，该单位在你的军队的混沌之影范围内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Greater Daemon of Nurgle",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemon-lord-of-nurgle",
        "name": "纳垢之恶魔领主",
        "text": "当友军**纳鲁格军团恶魔**单位在此模型 6\" 内时，在该单位中的模型的韧性特性上加 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemon Lord of Nurgle",
          "kind": "unique"
        }
      },
      {
        "id": "unique-nurgle-s-rot",
        "name": "纳垢之腐",
        "text": "在你的移动阶段结束时，可选择距此模型 12\" 内的一个敌方单位。直到你下个移动阶段开始，将该单位中模型的韧性特性减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Nurgle’s Rot",
          "kind": "unique"
        }
      }
    ],
    "地狱剥皮机": [
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
        "id": "unique-cutting-down-the-foe",
        "name": "斩杀敌手",
        "text": "每次此单位中的模型发动近战攻击时，若此单位于本回合进行了冲锋移动，提升该攻击的力量和伤害特性各 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cutting Down the Foe",
          "kind": "unique"
        }
      }
    ],
    "园艺师史莱姆克斯": [
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
        "id": "unique-beast-handler",
        "name": "驭兽者",
        "text": "当此模型领导一个单位时，你可重掷该单位进行的冲锋掷骰。此外，每场战斗一次，你可以用「英勇介入」计谋以该单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做：\n■ 该次使用减少 1 指令点。\n■ 该次使用不会阻止本阶段该计谋用于其他单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Beast Handler",
          "kind": "unique"
        }
      },
      {
        "id": "unique-seed-the-garden-of-nurgle",
        "name": "播种纳垢花园",
        "text": "在你的移动阶段结束时，若此模型位于一个**区域地形**特征内，则直到战斗结束，该**区域地形**特征视为位于你的军队的混沌阴影内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Seed the Garden of Nurgle",
          "kind": "unique"
        }
      }
    ],
    "炼狱琴魔": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖，先攻",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader, Fights First",
          "kind": "core"
        }
      },
      {
        "id": "unique-harmonic-alignment",
        "name": "和音汇集",
        "text": "此模型领导单位时，在你的指挥阶段，可将 D3 个已摧毁的护卫模型返还给该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Harmonic Alignment",
          "kind": "unique"
        }
      },
      {
        "id": "unique-discordant-disruption",
        "name": "不和谐扰乱",
        "text": "当敌方 **灵能者(Psyker)** 单位在此模型 12\" 内时，该单位模型配备的灵能武器具有 **[危险]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Discordant Disruption",
          "kind": "unique"
        }
      }
    ],
    "凯洛斯织命者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-greater-daemon-of-tzeentch",
        "name": "更高级的特兹恩恶魔",
        "text": "当一个友方 **谋变军团恶魔** 单位在此模型 6\" 内时，该单位位于你的军队的混沌阴影中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Greater Daemon of Tzeentch",
          "kind": "unique"
        }
      },
      {
        "id": "unique-one-head-looks-forward",
        "name": "一头向前看",
        "text": "在你的指挥阶段结束时，若此模型在战场上，为此模型进行领导力测试；若测试成功，你获得1点指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "One Head Looks Forward",
          "kind": "unique"
        }
      },
      {
        "id": "unique-one-head-looks-back",
        "name": "一头看向过往",
        "text": "每当你的对手用策略来指定他们军队的单位时，如果该单位在此模型 12\" 内，将该策略使用的花费增加 1CP（这不会与任何其他会增加该策略 CP 花费的规则重叠）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "One Head Looks Back",
          "kind": "unique"
        }
      }
    ],
    "卡拉纳克": [
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
        "id": "unique-pack-leader",
        "name": "猎群首领",
        "text": "此模型领导单位时，可重掷为该单位进行的前进和冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Pack Leader",
          "kind": "unique"
        }
      },
      {
        "id": "unique-prey-of-the-blood-god",
        "name": "血神猎物",
        "text": "在第一战斗回合开始时，选择一个敌方单位作为此模型的猎物。此模型的单位中每个模型每次进行指向其猎物的近战攻击时，你可重掷致伤掷骰。每次此模型的猎物被摧毁时，选择一个新的敌方单位作为此模型的猎物。",
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
        ],
        "source": {
          "englishName": "Prey of the Blood God",
          "kind": "unique"
        }
      },
      {
        "id": "unique-brass-collar-of-bloody-vengeance",
        "name": "血腥复仇黄铜颈环",
        "text": "持有者对灵能攻击（Psychic Attacks）与致命伤具有不觉疼痛 3+ 能力。",
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
            "threshold": 3
          }
        ],
        "source": {
          "englishName": "Brass Collar of Bloody Vengeance",
          "kind": "unique"
        }
      }
    ],
    "守密者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-greater-daemon-of-slaanesh",
        "name": "莎兰妮丝大恶魔",
        "text": "当一个友方 **色孽(Slaanesh)恶魔军团(Legiones Daemonica)** 单位在此模型周围6\"内时，该单位在你的军队的混沌之影中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Greater Daemon of Slaanesh",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemon-lord-of-slaanesh",
        "name": "丝兰妮什恶魔领主",
        "text": "当有友军 **色孽(Slaanesh)恶魔军团(Legiones Daemonica)** 单位在此模型 6\" 内时，该单位中近战武器的护甲贯穿值提升 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemon Lord of Slaanesh",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mesmerising-form",
        "name": "曼妙身形",
        "text": "每次攻击以此模型为目标时，命中掷骰 -1。",
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
            "value": 1
          }
        ],
        "source": {
          "englishName": "Mesmerising Form",
          "kind": "unique"
        }
      },
      {
        "id": "unique-shining-aegis",
        "name": "闪耀神盾",
        "text": "持有者的防护(Sv)特性为 3+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shining Aegis",
          "kind": "unique"
        }
      }
    ],
    "变化魔君": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-greater-daemon-of-tzeentch",
        "name": "更高级的特兹恩恶魔",
        "text": "当一个友方 **谋变军团恶魔** 单位在此模型 6\" 内时，该单位位于你的军队的混沌阴影中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Greater Daemon of Tzeentch",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemon-lord-of-tzeentch",
        "name": "齐奥奇之恶魔领主",
        "text": "当一个友军 **奸奇(Tzeentch) 恶魔军团(Legiones Daemonica)** 单位在此模型的 6\" 内时，每当该单位中的模型发动远程攻击时，为该攻击的力量特性值加 1。",
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
          "englishName": "Daemon Lord of Tzeentch",
          "kind": "unique"
        }
      },
      {
        "id": "unique-master-of-magicks",
        "name": "魔法之主",
        "text": "在你的射击阶段，选择以下能力之一：**[无视掩体]**；**[致命一击]**；**[连击 D3]**。直到该阶段结束，此模型的变化闪电具有该能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Master of Magicks",
          "kind": "unique"
        }
      }
    ],
    "纳垢灵": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，渗透者",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Infiltrators",
          "kind": "core"
        }
      },
      {
        "id": "unique-mischief-makers",
        "name": "生性淘气",
        "text": "每当位于具此能力的一个或多个单位交战范围内的敌方单位（不含 **钜型** 单位）被选定进行战斗时，在阶段结束前，该敌方单位中每个模型发动的近战攻击命中掷骰-1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Mischief Makers",
          "kind": "unique"
        }
      }
    ],
    "粉惧妖": [
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
        "id": "unique-split",
        "name": "分裂",
        "text": "每次此单位中的 **PINK HORROR** 或 **BLUE HORROR** 模型被摧毁，在攻击单位完成其攻击后，若此单位未被摧毁，为该模型掷一个D6。在4+上，若其为 **PINK HORROR**，则在此单位中加入两个 **BLUE HORROR** 模型，若其为 **BLUE HORROR**，则加入一个 **BRIMSTONE HORROR** 模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Split",
          "kind": "unique"
        }
      },
      {
        "id": "unique-horrors-are-pink-horrors-are-blue-where-once-there-was-one-now-there-are-two",
        "name": "惧妖是粉。惧妖是蓝。原本为一，如今成双",
        "text": "若在任何时刻此单位不含任何粉色惧妖(PINK HORROR)模型,则此单位改用蓝色惧妖(BLUE HORRORS)资料卡。(设计师备注:当此单位含一个或多个粉色惧妖(PINK HORROR)模型时,蓝色惧妖(BLUE HORRORS)资料卡上的「愠怒恶意(Sullen Malevolence)」与「爆裂惧妖(Exploding Horrors)」能力不适用于此单位。)",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "HORRORS ARE PINK. HORRORS ARE BLUE. WHERE ONCE THERE WAS ONE, NOW THERE ARE TWO.",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "恶魔徽记",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Icon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Instrument of Chaos",
          "kind": "unique"
        }
      }
    ],
    "携疫者": [
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
        "id": "unique-infected-outbreak",
        "name": "感染爆发",
        "text": "在你的指挥阶段结束时，如果此单位在你控制的目标标记范围内，该目标标记保持在你的控制下，直到你对手在一个阶段结束时对该目标标记的控制等级大于你的等级。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infected Outbreak",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "恶魔徽记",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Icon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Instrument of Chaos",
          "kind": "unique"
        }
      }
    ],
    "瘟疫先蜂": [
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
        "id": "unique-death-s-heads",
        "name": "亡者之颅",
        "text": "在你的射击阶段，该单位射击后，选择一个被该次攻击命中一次或多次的敌方单位。直到轮合结束，每次友方**纳垢(Nurgle)恶魔军团(Legiones Daemonica)**单位进行指向该单位的攻击时，你可以重掷致伤掷骰。",
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
          "englishName": "Death’s Heads",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "恶魔徽记",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Icon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Instrument of Chaos",
          "kind": "unique"
        }
      }
    ],
    "携疱者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，不觉疼痛5+，领袖",
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
        "id": "unique-poxbringer",
        "name": "疱疹使者",
        "text": "此模型领导单位期间，该单位中每个模型发动攻击时，成功的未修正命中掷骰为 5+ 视为 Critical 命中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Poxbringer",
          "kind": "unique"
        }
      },
      {
        "id": "unique-feculent-despair",
        "name": "脓疱绝望",
        "text": "当敌方单位位于此模型 6\" 范围内时，每当该单位进行战斗震撼测试时，从该测试中扣除 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Feculent Despair",
          "kind": "unique"
        }
      }
    ],
    "乘鲜血王座的裂肉主宰": [
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
        "id": "unique-blood-throne",
        "name": "鲜血宝座",
        "text": "在战斗阶段开始时，选择在此模型18\"内且可见的一个敌方单位。直到阶段结束，每次友方**恐虐(Khorne)恶魔军团(Legiones Daemonica)**单位进行针对该单位的攻击时，将该攻击的力量、护甲穿透和伤害特性提升1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blood Throne",
          "kind": "unique"
        }
      },
      {
        "id": "unique-champion-slayer",
        "name": "冠军杀手",
        "text": "此模型每次对 **角色(Character)** 或 **凶兽(Monster)** 单位发动近战攻击时，可重掷致伤掷骰。此模型每次摧毁一个敌方 **角色(Character)** 或 **凶兽(Monster)** 单位时，此模型恢复最多 D6 点已失伤害。",
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
        ],
        "source": {
          "englishName": "Champion Slayer",
          "kind": "unique"
        }
      }
    ],
    "烂格斯": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击，不觉疼痛6+",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "fnp",
            "threshold": 6
          }
        ],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike, Feel No Pain 6+",
          "kind": "core"
        }
      },
      {
        "id": "unique-greater-daemon-of-nurgle",
        "name": "纳垢伟大恶魔",
        "text": "当有友军 **瘟疫军团(Plague Legions)恶魔(Daemon)** 单位在此模型 6\" 内时，该单位在你的军队的混沌之影范围内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Greater Daemon of Nurgle",
          "kind": "unique"
        }
      },
      {
        "id": "unique-virulent-blessing",
        "name": "恶毒祝福",
        "text": "在近战阶段开始时，可选择一个距此模型24\"内且可见的敌方单位。直至该阶段结束，每次 **混沌(Chaos)恶魔军团(Legiones Daemonica)** 模型的攻击被配置至该单位中的模型时，将该攻击的伤害特性+1。",
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
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Virulent Blessing",
          "kind": "unique"
        }
      },
      {
        "id": "unique-deluge-of-nurgle",
        "name": "纳垢之洪",
        "text": "当敌方单位位于此模型周围6\"内时，从该单位中的模型的移动特性减少2，并从该单位的目标控制特性减少1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deluge of Nurgle",
          "kind": "unique"
        }
      }
    ],
    "尖啸飞鲨": [
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
        "id": "unique-slashing-dive",
        "name": "俯冲割裂",
        "text": "在你的移动阶段中，此单位结束一次正常移动后，你可选择在该移动中被此单位越过的一个敌方单位，并为此单位中的每个模型掷一次D6：每掷出4+，该敌方单位承受1点灵能伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Slashing Dive",
          "kind": "unique"
        }
      }
    ],
    "寻觅者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，斥候9",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Scouts 9\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-unholy-speed",
        "name": "不洁之速",
        "text": "你可重掷此单位进行的前进及冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unholy Speed",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-icon",
        "name": "恶魔徽记",
        "text": "持有者所在的单位中的模型其领导力(Ld)特性为 6+。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Icon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-instrument-of-chaos",
        "name": "混沌乐器",
        "text": "为持有者所在的单位进行的冲锋掷骰 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Instrument of Chaos",
          "kind": "unique"
        }
      }
    ],
    "夏拉希魔灾": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-greater-daemon-of-slaanesh",
        "name": "莎兰妮丝大恶魔",
        "text": "当一个友方 **色孽(Slaanesh)恶魔军团(Legiones Daemonica)** 单位在此模型周围6\"内时，该单位在你的军队的混沌之影中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Greater Daemon of Slaanesh",
          "kind": "unique"
        }
      },
      {
        "id": "unique-no-prey-can-evade",
        "name": "无处可逃",
        "text": "可重掷此模型进行的前进和冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "No Prey Can Evade",
          "kind": "unique"
        }
      },
      {
        "id": "unique-monarch-of-the-hunt",
        "name": "狩猎之王",
        "text": "在首个战斗回合开始时，选择一个敌方单位作为此模型的猎物。此模型每次对其猎物发动近战攻击时，可重掷命中掷骰，并可重掷致伤掷骰。此模型的猎物被摧毁时，选择一个新的敌方单位作为此模型的猎物。",
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
        ],
        "source": {
          "englishName": "Monarch of the Hunt",
          "kind": "unique"
        }
      }
    ],
    "斯卡布兰德": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-greater-daemon-of-khorne",
        "name": "恐虐至高恶魔",
        "text": "当友方 **恐虐(Khorne)恶魔军团(Legiones Daemonica)** 单位位于此模型 6\" 内时，该单位在你的军队的混沌阴影中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Greater Daemon of Khorne",
          "kind": "unique"
        }
      },
      {
        "id": "unique-rage-embodied",
        "name": "怒火化身（光环）",
        "text": "当友军 **恐虐(Khorne)恶魔军团(Legiones Daemonica)** 单位距离此模型 6\" 以内时，将此单位中模型配备的近战武器的攻击次数特性增加 1。",
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
        ],
        "source": {
          "englishName": "Rage Embodied",
          "kind": "unique"
        }
      },
      {
        "id": "unique-murderlust",
        "name": "杀戮渴望",
        "text": "此单位在进行过前进的回合中符合宣告冲锋的条件。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Murderlust",
          "kind": "unique"
        }
      }
    ],
    "颅骨祭坛": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "渗透者",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Infiltrators",
          "kind": "core"
        }
      },
      {
        "id": "unique-shadow-of-khorne",
        "name": "恐虐之影",
        "text": "此 **防御要塞** 6\" 范围内的战场区域视为位于你的军队的混沌阴影内。此外，当友方 **恐虐(Khorne)恶魔军团(Legiones Daemonica)** 单位位于此 **防御要塞** 6\" 范围内时，每次对该单位进行战斗震撼测试时，可重掷该测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Shadow of Khorne",
          "kind": "unique"
        }
      },
      {
        "id": "unique-cover",
        "name": "掩体",
        "text": "每次一次远程攻击分配给一个模型时，若该模型因此 **防御工事(Fortification)** 而不完全对所有进攻单位中的模型可见，该模型对该攻击具有掩护效益。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cover",
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
    "颅骨炮": [
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
        "id": "unique-skulls-of-the-fallen",
        "name": "亡者的颅骨",
        "text": "在你的射击阶段，此模型射击后，选择一个被该次攻击中的一个或多个命中的敌方单位。该单位必须进行战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Skulls of the Fallen",
          "kind": "unique"
        }
      }
    ],
    "颅骨之主": [
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
        "id": "unique-skullmaster-s-fury",
        "name": "主宰之怒",
        "text": "此模型领导某单位时，每当该单位结束冲锋移动，直到回合结束，该单位中模型装备的 Juggernaut 刀角有 **[毁灭性创伤]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Skullmaster’s Fury",
          "kind": "unique"
        }
      },
      {
        "id": "unique-devastating-charge",
        "name": "毁灭冲锋",
        "text": "每次此模型的单位结束冲锋移动时，在交战范围内的各敌方单位必须进行战斗震撼检定。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Devastating Charge",
          "kind": "unique"
        }
      }
    ],
    "夺颅者": [
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
        "id": "unique-lord-of-decapitations",
        "name": "枭首统领",
        "text": "当此模型领导一个单位时，该单位中模型配备的近战武器具有 **[毁灭性创伤]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lord of Decapitations",
          "kind": "unique"
        }
      },
      {
        "id": "unique-skulls-for-khorne",
        "name": "颅归恐虐",
        "text": "此模型每次对 **角色(Character)** 单位发动攻击时，可重掷命中掷骰，可重掷致伤掷骰。此模型每次消灭一个敌方 **角色(Character)** 单位，获得 1 指令点。",
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
          "englishName": "Skulls for Khorne",
          "kind": "unique"
        }
      }
    ],
    "烂芋笛手": [
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
        "id": "unique-jolly-gutpipes",
        "name": "欢快笛声",
        "text": "当此模型领导一个单位时，该单位中的模型的移动特性加 1，你可以为该单位进行的前进掷骰重掷。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Jolly Gutpipes",
          "kind": "unique"
        }
      },
      {
        "id": "unique-disease-of-mirth",
        "name": "欢笑之疾",
        "text": "在战斗阶段开始时，距此模型 6\" 内的每个敌方单位（排除 **凶兽(Monster)** 和 **载具(Vehicle)**）必须进行战斗震撼检定。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Disease of Mirth",
          "kind": "unique"
        }
      }
    ],
    "磨魂者": [
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
        "id": "unique-scuttling-walker",
        "name": "迅捷机械",
        "text": "此模型每次进行常规移动或推进移动时，可如同它们不存在般越过友方 **凶兽(Monster)** 和 **载具(Vehicle)** 模型及高度为 4 英寸或以下的地形特征。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scuttling Walker",
          "kind": "unique"
        }
      },
      {
        "id": "unique-daemonic-allegiance",
        "name": "忠于混沌",
        "text": "当你选择将此模型纳入军队时,你必须选择下列关键字之一。至战斗结束,此模型拥有该关键字以及下列为该关键字所载的额外战备:恐虐(Khorne)—此模型额外配备:灼血洪流(torrent of burning blood);奸奇(Tzeentch)—此模型额外配备:次元凝视(warp gaze);纳垢(Nurgle)—此模型额外配备:浓痰轰击(phlegm bombardment);色孽(Slaanesh)—此模型额外配备:绝望尖啸(scream of despair)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Daemonic Allegiance",
          "kind": "unique"
        }
      }
    ],
    "坏疹记账官": [
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
        "id": "unique-keep-counting",
        "name": "接着数!",
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
        ],
        "source": {
          "englishName": "Keep Counting!",
          "kind": "unique"
        }
      },
      {
        "id": "unique-meet-your-quota",
        "name": "完成定额!",
        "text": "当此模型领导一个单位时，在该单位中的模型的目标控制特性加 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Meet Your Quota!",
          "kind": "unique"
        }
      }
    ],
    "希尔艾斯克": [
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
        "id": "unique-prince-of-slaanesh",
        "name": "色孽亲王",
        "text": "此模型领导一个单位时，该单位中每个模型每次发动近战攻击时，未修正的致伤掷骰掷出5+视为 Critical 致伤。",
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
            "type": "wound-critical-threshold",
            "value": 5,
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Prince of Slaanesh",
          "kind": "unique"
        }
      },
      {
        "id": "unique-delightful-agonies",
        "name": "宜人痛苦",
        "text": "此模型第一次被摧毁时，在该阶段末掷一次D6。掷骰结果为2+时，将此模型重新放置于战场上，尽可能靠近其被摧毁的位置，且不在任何敌方单位的交战范围内，并具有其全部伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Delightful Agonies",
          "kind": "unique"
        }
      }
    ],
    "蓝书吏": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，独行特工",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Lone Operative",
          "kind": "core"
        }
      },
      {
        "id": "unique-p-tarix-s-sorcerous-syphon",
        "name": "P'tarix 的诡秘虹吸",
        "text": "当敌方单位位于此模型 12\" 内时，该单位中的每个模型每次发动灵能攻击时，从致伤掷骰减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "P’tarix’s Sorcerous Syphon",
          "kind": "unique"
        }
      },
      {
        "id": "unique-xirat-p-s-sorcerous-barrages",
        "name": "西拉特普的黑魔炮火",
        "text": "在你的移动阶段结束时，针对距该模型 6\" 内的每个敌军单位掷一次 D6：掷出 2-3，该单位遭受 1 点凡人伤害；4-5，该单位遭受 D3 点凡人伤害；6，该单位遭受 D6 点凡人伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Xirat’p’s Sorcerous Barrages",
          "kind": "unique"
        }
      }
    ],
    "变化灵": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，独行特工，隐秘",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [
          {
            "type": "incoming-hit-minus",
            "value": 1,
            "phase": "ranged"
          }
        ],
        "source": {
          "englishName": "Deep Strike, Lone Operative, Stealth",
          "kind": "core"
        }
      },
      {
        "id": "unique-formless-horror",
        "name": "无形妖物",
        "text": "敌方单位每次希望选择此模型作为攻击目标时，必须首先进行战斗震撼测试。若测试失败，除了处于战斗震撼状态外，该敌方单位在此阶段无法针对此模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Formless Horror",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mischief-and-confusion",
        "name": "诡计与蛊惑",
        "text": "在你对手的射击阶段开始时，选择距此模型 12\" 内且此模型可见的一个敌方单位，并掷 1D6：结果为 2-5 时，直到该阶段结束，该敌方单位中的模型每次发动攻击时，从命中掷骰中扣除 1；结果为 6 时，该敌方单位在此阶段不得射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Mischief and Confusion",
          "kind": "unique"
        }
      }
    ],
    "色孽假面": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，先攻，独行特工",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Fights First, Lone Operative",
          "kind": "core"
        }
      },
      {
        "id": "unique-the-eternal-dance",
        "name": "无尽舞蹈",
        "text": "在战斗阶段开始时，选择此模型6\"内的一个敌方单位。直到该阶段结束：\n■ 每次友方 **色孽(Slaanesh)恶魔军团(Legiones Daemonica)** 模型对该敌方单位发动近战攻击时，于致伤掷骰上加1。\n■ 每次该敌方单位中的模型发动近战攻击时，从致伤掷骰上减1。",
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
          "englishName": "The Eternal Dance",
          "kind": "unique"
        }
      },
      {
        "id": "unique-dazzling-acrobatics",
        "name": "炫目腾跃",
        "text": "此模型在其前进或后撤的回合中有资格宣布冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Dazzling Acrobatics",
          "kind": "unique"
        }
      }
    ],
    "苦痛使者": [
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
        "id": "unique-tormentbringer",
        "name": "折磨使者",
        "text": "当友方 **色孽(Slaanesh)恶魔军团(Legiones Daemonica)** 单位位于此模型 6\" 内时，该单位中的近战武器具有 **[连击 1]** 能力。",
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
          "englishName": "Tormentbringer",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hysterical-frenzy",
        "name": "癫狂亢奋",
        "text": "此单位中每个模型被摧毁时，若该模型在本阶段未进行过战斗，则勿将其移除出场。已摧毁的模型在攻击单位完成其攻击后进行战斗，之后被移除出场。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hysterical Frenzy",
          "kind": "unique"
        }
      }
    ],
    "织幻者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖，先攻",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader, Fights First",
          "kind": "core"
        }
      },
      {
        "id": "unique-tranceweaver",
        "name": "织幻者",
        "text": "此单位中的模型每次发动攻击时，可重掷命中掷骰结果为 1。若该攻击的目标位于目标标记的范围内，则可改为重掷该命中掷骰。",
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
          "englishName": "Tranceweaver",
          "kind": "unique"
        }
      },
      {
        "id": "unique-symphony-of-pain",
        "name": "痛楚交响曲",
        "text": "在你的移动阶段结束时，你可选择一个战斗震撼且距此模型 12\" 内的敌军单位。直到回合结束，你的军队中每个 **色孽(Slaanesh)恶魔军团(Legiones Daemonica)** 模型每次对该敌军单位发动攻击时，你可重掷命中掷骰且可重掷致伤掷骰。",
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
          "englishName": "Symphony of Pain",
          "kind": "unique"
        }
      }
    ],
    "艾塔奥斯·劳·克瑞斯": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击，灵能者",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike, Psyker",
          "kind": "core"
        }
      },
      {
        "id": "unique-emissary-of-the-great-mutator-aura",
        "name": "大变者使者（光环）",
        "text": "当友军齐恩奇军团恶魔单位在此模型 6\" 范围内时，可为该单位重掷战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Emissary of the Great Mutator (Aura)",
          "kind": "unique"
        }
      },
      {
        "id": "unique-master-of-magicks-psychic",
        "name": "巫术之主（灵能）",
        "text": "在你的射击阶段，选择以下其中一项能力：[无视掩体]、[致命一击]、[连击 D3]。直至阶段结束，此模型的远程武器具有该能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Master of Magicks (Psychic)",
          "kind": "unique"
        }
      }
    ],
    "瘟疫骑手": [
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
        "id": "unique-grandfather-s-blessing",
        "name": "祖父赐福",
        "text": "若你的军队中具有领袖能力的模型可附加到 纳垢之兽 单位，则可附加到此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grandfather's Blessing",
          "kind": "unique"
        }
      },
      {
        "id": "unique-bounding-assault",
        "name": "蹦跃突击",
        "text": "此单位每次结束冲锋移动时，直至回合结束，此单位中模型配备的脓疮骑手瘟疫剑具有 [LANCE] 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bounding Assault",
          "kind": "unique"
        }
      }
    ],
    "斯卡贝斯拉斯·肿胀者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击，痛苦无感",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike, Feel No Pain",
          "kind": "core"
        }
      },
      {
        "id": "unique-emissary-of-the-plague-god-aura",
        "name": "瘟神使者（光环）",
        "text": "当友军纳粹女神军团恶魔单位在此模型 6\" 内时，可重掷该单位的战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Emissary of the Plague God (Aura)",
          "kind": "unique"
        }
      },
      {
        "id": "unique-nurgle-s-rot-psychic",
        "name": "纳垢之腐（灵能）",
        "text": "在你的移动阶段结束时，可选择距离此模型 12\" 内的一个敌方单位。直至你的下一个移动阶段开始时，该单位中模型的韧性特性减少 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Nurgle's Rot (Psychic)",
          "kind": "unique"
        }
      }
    ],
    "尖刺混沌兽": [
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
        "id": "unique-warp-spines",
        "name": "亚空间尖刺",
        "text": "此模型每次结束冲锋移动时，选择一个在其交战范围内的敌方单位并掷一个 D6：在 2-3 时，该敌方单位遭受 D3 致命伤；在 4-5 时，该敌方单位遭受 3 致命伤；在 6 时，该敌方单位遭受 D3+3 致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warp Spines",
          "kind": "unique"
        }
      }
    ],
    "猎行者战车": [
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
        "id": "unique-scythed-impact",
        "name": "镰刃冲击",
        "text": "此单位每次进行冲锋移动时，直到阶段结束，此单位中的模型装备的近战武器具有 [ANTI-INFANTRY 4+] 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scythed Impact",
          "kind": "unique"
        }
      }
    ],
    "色孽传令官骑骏马": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "深入打击，领袖，灵能者，斥候",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deep Strike, Leader, Psyker, Scouts",
          "kind": "core"
        }
      },
      {
        "id": "unique-lethal-caress",
        "name": "致命爱抚",
        "text": "此模型领导一个单位时，改善该单位中模型配备的近战武器的穿甲特性 +1。",
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
            "type": "weapon-ap-modifier",
            "value": 1,
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Lethal Caress",
          "kind": "unique"
        }
      },
      {
        "id": "unique-symphony-of-pain-psychic",
        "name": "痛苦交响（灵能）",
        "text": "在你的移动阶段结束时，你可以选择一个受震慑的敌方单位，该单位在此模型 12 英寸内。直至回合结束，你军队中的每个色孽恶魔军团模型每次对该敌方单位发动攻击时，你可以重掷命中掷骰和重掷致伤掷骰。",
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
          "englishName": "Symphony of Pain (Psychic)",
          "kind": "unique"
        }
      }
    ],
    "瘟疫蟾蜍": [
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
        "id": "unique-grandfather-s-blessing",
        "name": "祖父赐福",
        "text": "如果你军队中具有领导者能力的模型可附着于纳垢之兽单位，它可以附着于此单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grandfather's Blessing",
          "kind": "unique"
        }
      },
      {
        "id": "unique-pouncing-leap",
        "name": "扑击跳跃",
        "text": "可使用英勇干预战术以0CP指定此单位为目标，即使本阶段已在另一个单位上使用过该战术也可如此。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Pouncing Leap",
          "kind": "unique"
        }
      }
    ],
    "怒魔": [
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
        "id": "unique-prey-on-the-weak",
        "name": "猎杀弱者",
        "text": "此模型每次对战斗震撼敌方单位发动攻击时，致伤掷骰各加 1。",
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
          "englishName": "Prey on the Weak",
          "kind": "unique"
        }
      }
    ],
    "巨型混沌孳生物": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D3，深入打击，痛苦无感",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3, Deep Strike, Feel No Pain",
          "kind": "core"
        }
      },
      {
        "id": "unique-regenerating-monstrosity",
        "name": "再生怪兽",
        "text": "在每个玩家的指挥阶段开始时，此模型恢复最多 D3 个失去的伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Regenerating Monstrosity",
          "kind": "unique"
        }
      }
    ],
    "扎拉金奈尔": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击，先攻",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike, Fights First",
          "kind": "core"
        }
      },
      {
        "id": "unique-emissary-of-the-prince-of-excess-aura",
        "name": "纵欲之主使者（光环）",
        "text": "当友军色孽恶魔军团单位在此模型 6\" 内时，你可重掷为该单位进行的战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Emissary of the Prince of Excess (Aura)",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mesmerising-form",
        "name": "曼妙身形",
        "text": "每次攻击针对此模型时，从命中掷骰中减去 1。",
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
            "value": 1
          }
        ],
        "source": {
          "englishName": "Mesmerising Form",
          "kind": "unique"
        }
      }
    ],
    "安格拉斯·无束者": [
      {
        "id": "core-bundle",
        "name": "核心技能",
        "text": "致命破灭D6，深入打击",
        "status": "通用核心技能，规则全文见《核心规则》",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6, Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-emissary-of-the-blood-god-aura",
        "name": "血神使者（光环）",
        "text": "当友方 **恐虐(Khorne)恶魔军团(Legiones Daemonica)** 单位在此模型6\"范围内时，你可以重掷为该单位进行的战斗震撼测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Emissary of the Blood God (Aura)",
          "kind": "unique"
        }
      },
      {
        "id": "unique-relentless-carnage",
        "name": "不息屠戮",
        "text": "在战斗阶段结束时，你可选择一个与此模型相接触的敌方单位并掷8个D6：每掷出一个4+，该敌方单位承受1点道德伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Relentless Carnage",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
