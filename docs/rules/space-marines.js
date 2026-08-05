/* Generated from docs/data/星际战士/星际战士-全部数据卡.json. Raw ability text is preserved; update the source JSON and rerun tools/generate-space-marine-rules.mjs. */
(function (root) {
  const factionRules = [
  {
    "id": "space-marines-oath-of-moment",
    "name": "破敌重誓",
    "text": "破敌重誓：如果你的军队阵营是阿斯塔特修会，则在你的指挥阶段开始时，从对手的军队中选择一个单位，直到你的下个指挥阶段开始时为止，你的军队中拥有本能力的模型攻击那个敌方单位时可以重投命中结果。并且如果你使用的是本文中的分队，军队中的任意单位都不包含圣血天使，黑暗天使，死亡守望，太空野狼关键词之一，则对那个敌方单位的攻击造伤结果也+1",
    "status": "计算支持（命中重投和造伤加成由专用控件处理）",
    "source": {
      "file": "分遣队规则-可检索.md"
    }
  }
];
  const unitRules = {
  "罗伯特·基里曼": [
    {
      "id": "space-marines-p47-1",
      "name": "圣典权威",
      "text": "圣典权威：在你的指挥阶段开始时，选择以下效果之二对 本模型生效，持续到下个你的指挥阶段开始时 ◼ 十三军团原体【光环】：本模型6寸内的友军阿斯塔 特修会单位，可以重投震慑和领导力测试结果，并且 这些单位中的模型OC值+1 ◼ 战争之主：在你的指挥阶段开始时，为你的【破敌重 誓】技能选择目标后，再选择一个敌方单位，直到下 个你的指挥阶段开始时，如果破敌重誓技能的目标被 消灭了，则这个敌方单位将被视作破敌重誓技能的目 标，直到你选择新的目标 ◼ 超级战略：每个游戏大回合一次，你可以对本模型 12寸内的一个友军阿斯塔特修会单位使用战略技能 2 时少消耗1CP 5",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 47,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p47-2",
      "name": "极限战士卫队",
      "text": "极限战士卫队：如果本模型位于至少一个友群军阿斯塔特修 会步兵单位3寸内，则本模型获得【独行特工】技能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 47,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p47-3",
      "name": "命运战甲",
      "text": "命运战甲：当本模型第一次被消灭时，锤在这个阶段结束时 投D6，3+则他以6点W的状态复活，将其放置在尽可 战 能接近他的阵亡地点，但不能位于敌方单位接战范围内。",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 47,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p47-4",
      "name": "体形适中",
      "text": "体形适中：本模型可以如同步兵模型一样正常穿过地形， 登上更高楼层等等【总规则更正P10】",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 47,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "装备安提洛科斯装甲的卡尔加": [
    {
      "id": "space-marines-p48-0",
      "name": "核心特性",
      "text": "】：深入打击，领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 48,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p48-2",
      "name": "励志领袖",
      "text": "励志领袖：卡尔加所领导的单位在同回合中即使进行过加速 或撤退，也可以进行射击和冲锋",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 48,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p48-3",
      "name": "战术大师",
      "text": "战术大师：你的指挥阶段开始时，如果卡尔加是主将，并且 位于场上则你获得1点CP",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 48,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "首席智库底格里斯": [
    {
      "id": "space-marines-p49-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 49,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p49-2",
      "name": "地狱火头冠",
      "text": "地狱火头冠：本模型所领导的单位中模型对抗灵能攻击和致 命伤害时拥有【不知疼痛4+】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 4,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 49,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p49-3",
      "name": "预言大师【灵能】",
      "text": "预言大师【灵能】：本模型所领导的单位遭受攻击时，这些 攻击的命中结果-1，并且每个游戏大回合一次，你可以减 1CP消耗对本单位使用以下战略技能之一：反攻，警戒射 击，英勇介入",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "incoming-hit-minus",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 49,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "西卡留斯卫队长": [
    {
      "id": "space-marines-p50-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 50,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p50-2",
      "name": "舍生取义",
      "text": "舍生取义：你可以消耗0CP对本单位使用英勇介入战略技 能，即使本阶段已经被其他单位使用过可以",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 50,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p50-3",
      "name": "马库拉格冠军骑士",
      "text": "马库拉格冠军骑士：每回合一次，当敌方单位在本模型所在 单位9寸内结束标准移动，加速或撤退时，如果本单位未 处于敌方接战范围内，则可以进行一次至多6寸的标准移 动",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 50,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "文崔斯连长": [
    {
      "id": "space-marines-p51-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 51,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p51-2",
      "name": "奇门战略【光环】",
      "text": "奇门战略【光环】：如果对方使用的战略技能目标是本模型 12寸内的敌方单位，则这次战略技能的CP消耗增加1点 （不与其他增加CP消耗的能力累计）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 51,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p51-3",
      "name": "舰队之主",
      "text": "舰队之主：在宣布战斗阵容时，如果军队中包含本模型，则 选择友军中一个拥有福波斯护甲，战术护甲，重装护甲关键 词之一的阿斯塔特修会步兵单位，该单位获得【深入打击】 技能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 51,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "泰图斯连长": [
    {
      "id": "space-marines-p52-0",
      "name": "核心特性",
      "text": "】：领袖，不知疼痛5+",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 5
        }
      ],
      "source": {
        "page": 52,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p52-2",
      "name": "持续攻势",
      "text": "持续攻势：本模型所在单位的武器获得【连击1】。",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "sustained-hits",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 52,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p52-3",
      "name": "奥特拉马的荣耀",
      "text": "奥特拉马的荣耀：如果本模型被近战攻击消灭，但本阶段尚 未进行过近战攻击，则投D6，结果为2+就可以在攻击方 单位完成本轮攻击后，本模型立即进行一轮近战攻击，如果 本轮攻击消灭了至少一个敌方模型，则本模型不算做被消灭 并且回复D3点W值，如果没有满足如上条件则正常阵 亡。",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 52,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "奥特拉马守护者": [
    {
      "id": "space-marines-p53-0",
      "name": "核心特性",
      "text": "】：支援",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 53,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p53-2",
      "name": "第二连队旗帜",
      "text": "第二连队旗帜：如果本单位包含旗手加迪尔，则本单位 模型OC值+1，如果本单位还包含泰图斯连长，则本单 位模型的LD值也+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 53,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p53-3",
      "name": "战略指挥",
      "text": "战略指挥：双方玩家完成部署之后，如果本单位在场或 乘坐的运输工具在场，选择最多3个你的友军阿斯塔特 修会单位，将其重新部署，甚至可以忽视单位数量放入 战略预备队",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 53,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p53-4",
      "name": "折射力场",
      "text": "折射力场：装备者拥有5+特殊保护",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 5
        }
      ],
      "source": {
        "page": 53,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p53-5",
      "name": "风暴盾",
      "text": "风暴盾：装备者拥有4+特殊保护",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 4
        }
      ],
      "source": {
        "page": 53,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "莱山德连长": [
    {
      "id": "space-marines-p54-0",
      "name": "核心特性",
      "text": "】：领袖，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 54,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p54-2",
      "name": "坚毅典范",
      "text": "坚毅典范：对本模型所在单位的攻击S大于等于其T值 时，这些攻击的造伤结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "incoming-wound-when-strength-gte",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 54,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p54-3",
      "name": "金刚不破",
      "text": "金刚不破：一次性技能，任意阶段开始时，本模型可以获得 2+特殊保护，持续本阶段",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 2
        }
      ],
      "source": {
        "page": 54,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p54-4",
      "name": "激励人心",
      "text": "激励人心：如果军队中包含本模型，则你的终结者小队及终 结者突击小队中的非人物模型OC值在非震慑状态下变为2",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 54,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "托尔连长": [
    {
      "id": "space-marines-p55-0",
      "name": "特殊保护",
      "text": "特殊保护：本模型拥有4+特殊保护",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 4
        }
      ],
      "source": {
        "page": 55,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p55-1",
      "name": "【核心技能】",
      "text": "【核心技能】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 55,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p55-3",
      "name": "瞄准仪阵列",
      "text": "瞄准仪阵列：本模型所领导的单位，所装备的射击武器获 得【忽视掩体】技能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 55,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p55-4",
      "name": "攻城指挥官",
      "text": "攻城指挥官：本模型攻击巨兽，载具，工事单位时S， AP，D都增强2点",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 55,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "铁父费罗斯": [
    {
      "id": "space-marines-p56-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 56,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p56-2",
      "name": "回火仪式",
      "text": "回火仪式：本模型所领导的单位获得【不知疼痛5+】",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 5,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 56,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p56-3",
      "name": "钢铁之父",
      "text": "钢铁之父：如果本模型3寸内有至少一个友军阿斯塔特修 会载具单位，则本模型获得【独行特工】技能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 56,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p56-4",
      "name": "铸造之主",
      "text": "铸造之主：在你的指挥阶段中，你可以选择本模型3寸内 一个友军阿斯塔特修会载具模型，这个载具模型恢复3点 损失的W值，并且直到下个你的指挥阶段开始时，这个载 具模型攻击命中结果+1。每个模型在每回合中只能被此技 能（或机神祝福技能）选择一次",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1
        }
      ],
      "source": {
        "page": 56,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p56-5",
      "name": "激励人心",
      "text": "激励人心：如果军队中包含本模型，则你的重装仲裁者小 队中的非人物模型OC值在非震慑状态下变为3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 56,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "坎托战团长": [
    {
      "id": "space-marines-p57-0",
      "name": "核心特性",
      "text": "】：领袖，不知疼痛6+",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 6
        }
      ],
      "source": {
        "page": 57,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p57-2",
      "name": "莱恩誓言",
      "text": "莱恩誓言：一次性技能，任意玩家的指挥阶段开始时，可 以让本模型所在单位的武器A+1，持续本回合",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "attack-modifier",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 57,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p57-3",
      "name": "战至最后",
      "text": "战至最后：本模型所领导的单位，如果低于起始强度则攻 击命中结果+1，如果低于半数则造伤结果也+1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1,
          "condition": "underStartingStrength",
          "requiresJoined": true
        },
        {
          "type": "wound-modifier",
          "value": 1,
          "condition": "belowHalfStrength",
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 57,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p57-4",
      "name": "激励人心",
      "text": "激励人心：如果军队中包含本模型，则你的肃卫老兵小队 中的非人物模型OC值在非震慑状态下变为2",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 57,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "凯万史瑞克": [
    {
      "id": "space-marines-p58-0",
      "name": "核心特性",
      "text": "】：领袖，深入打击，独行特工，隐蔽",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 58,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p58-2",
      "name": "暗影之主",
      "text": "暗影之主：本模型所领导的单位不能被12寸外的敌方模 型选为射击目标",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 58,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p58-3",
      "name": "鸦塔回响",
      "text": "鸦塔回响：在对方回合结束时，如果本模型所在单位没有 处于敌方接战范围内，则可以将其移除并放入战略预备队",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 58,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p58-4",
      "name": "激励人心",
      "text": "激励人心：如果军队中包含本模型，则你的跳跃背包突击 仲裁者小队中的非人物模型OC值在非震慑状态下变为2",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 58,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "艾索·沙恩": [
    {
      "id": "space-marines-p59-0",
      "name": "核心特性",
      "text": "】：深入打击，独行特工，隐蔽",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 59,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p59-2",
      "name": "暗影之主",
      "text": "暗影之主：你的指挥阶段中，选择一个敌方单位，直到下 个你的指挥阶段开始时为止，上述敌方单位12寸内的友 军阿斯塔特修会单位可以重投冲锋测试，但如果可能则必 须冲锋那个敌方单位",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 59,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p59-3",
      "name": "黑翼披风",
      "text": "黑翼披风：你可以消耗0CP对本单位使用快速入场和英勇 介入战略技能，即使本阶段已经对其他单位使用过也一样",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 59,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p59-4",
      "name": "责任传承",
      "text": "责任传承：在宣布军队阵容时，如果你的军队同时包含艾 索·沙恩和凯万史瑞克，则本场战斗中凯万史瑞克失去独行 特工技能，并将战团长关键词替换为连长",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 59,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "伏尔甘·赫斯坦": [
    {
      "id": "space-marines-p60-0",
      "name": "核心特性",
      "text": "】：领袖，不知疼痛6+",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 6
        }
      ],
      "source": {
        "page": 60,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p60-2",
      "name": "铸造之父",
      "text": "铸造之父：在你的射击阶段中，选择本模型视线内24寸 中一个敌方单位，本阶段中，友军阿斯塔特修会模型对其 使用喷射或热熔武器射击攻击时可以重投造伤结果",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-wound-reroll",
          "mode": "failed"
        }
      ],
      "source": {
        "page": 60,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p60-3",
      "name": "圣物追寻者",
      "text": "圣物追寻者：本模型第一次被部署于战场时，选择一个目 标点，当本模型位于那个目标点范围内时，OC值变为 10，LD变为5+，并且获得【不知疼痛4+】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 4
        }
      ],
      "source": {
        "page": 60,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p60-4",
      "name": "激励人心",
      "text": "激励人心：如果军队中包含本模型，则你的焚狱者小队中 的非人物模型OC值在非震慑状态下变为2",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 60,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "阿加通连长": [
    {
      "id": "space-marines-p61-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 61,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p61-2",
      "name": "重拳出击",
      "text": "重拳出击：本模型所领导的单位近战攻击时可以重投造伤 结果",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "space-wound-reroll",
          "mode": "failed",
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 61,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p61-3",
      "name": "烈火之主",
      "text": "烈火之主：本模型接战范围内的敌方单位中的模型OC值 减半",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 61,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "阔萨罗可汗": [
    {
      "id": "space-marines-p62-0",
      "name": "特殊保护",
      "text": "特殊保护：本模型拥有4+特殊保护",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 4
        }
      ],
      "source": {
        "page": 62,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p62-1",
      "name": "【核心技能】",
      "text": "【核心技能】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 62,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p62-3",
      "name": "为了可汗",
      "text": "为了可汗：本模型所领导的单位所装备的射击武器获得 【突击】技能，近战武器获得【迅猛冲锋】技能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 62,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p62-4",
      "name": "战利品收集者",
      "text": "战利品收集者：每当本模型消灭一个敌方人物模型，你就 获得1CP",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 62,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p62-5",
      "name": "激励人心",
      "text": "激励人心：如果军队中包含本模型，则你的先遣者摩托小 队中的非人物模型OC值在非震慑状态下变为3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 62,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "速不台可汗": [
    {
      "id": "space-marines-p63-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 63,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p63-2",
      "name": "巧高里斯之矛",
      "text": "巧高里斯之矛：本模型所领导的单位可以在进行加 速和撤退的回合进行射击和冲锋，如果该单位已经 可以这样做，则改为本单位的加速和冲锋结果+1。",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 63,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p63-3",
      "name": "历战骑手",
      "text": "历战骑手：每当本模型所领导的单位进行标准移 动，加速，撤退或冲锋时，其中的模型可以水平穿 过地形。",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 63,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "卡诺克.瓦": [
    {
      "id": "space-marines-p64-0",
      "name": "核心特性",
      "text": "】：深入打击，领袖，不觉疼痛5+",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 64,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p64-2",
      "name": "冷酷演算",
      "text": "冷酷演算：每当该模型所在的单位以巨兽或载具为目标进 行攻击时拥有【致命一击】，每当该模型所在的单位以非 巨兽载具单位为目标进行攻击时拥有【连击1】。",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "sustained-hits",
          "value": 1
        },
        {
          "type": "lethal-hits"
        }
      ],
      "source": {
        "page": 64,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p64-3",
      "name": "主脑逻辑引擎",
      "text": "主脑逻辑引擎：在你宣布军表构成时，你可以选择军队中 的一个友军阿斯塔特修会步兵单位，在本场战斗中，那个 单位中的所有模型拥有【斥候6】，此外在双方玩家完成 部署后，你可以重新部署一个友军阿斯塔特修会单位， （可以无视战略预备队分数限制，将其置入战略预备 队）。 2 5",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 64,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "先锋军连长": [
    {
      "id": "space-marines-p67-0",
      "name": "核心特性",
      "text": "】：领袖，渗透，隐蔽",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 67,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p67-2",
      "name": "战斗之仪",
      "text": "战斗之仪：每个游戏大回合一次，你的军队中最多一个拥 有此技能的单位对自身所在单位使用一个战略技能时可以 减少1点CP消耗（本模型处于预备队中亦可生效）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 67,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p67-3",
      "name": "欺诈大师",
      "text": "欺诈大师：在双方玩家部署完军队后，如果你的军队中包 含拥有本技能的模型，则可以选择至多三个友军阿斯塔特 修会步兵单位，将他们重新部署，或放入战略预备队，可 以忽视战略预备队已有多少个单位",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 67,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "终结者连长": [
    {
      "id": "space-marines-p68-0",
      "name": "核心特性",
      "text": "】：领袖，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 68,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p68-2",
      "name": "战斗之仪",
      "text": "战斗之仪：每个游戏大回合一次，你的军队中最多一个拥 有此技能的单位对自身所在单位使用一个战略技能时可以 减少1点CP消耗（本模型处于预备队中亦可生效）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 68,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p68-3",
      "name": "无阻勇气",
      "text": "无阻勇气：本模型所在单位可以重投冲锋结果",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 68,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "跳跃背包连长": [
    {
      "id": "space-marines-p69-0",
      "name": "特殊保护",
      "text": "特殊保护：本模型拥有4+特殊保护",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 4
        }
      ],
      "source": {
        "page": 69,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p69-1",
      "name": "【核心技能】",
      "text": "【核心技能】：领袖，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 69,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p69-3",
      "name": "战斗之仪",
      "text": "战斗之仪：每个游戏大回合一次，你的军队中最多一个拥 有此技能的单位使用一个战略技能时可以减少1点CP消 耗（本模型处于预备队中亦可生效）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 69,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p69-4",
      "name": "天使之怒",
      "text": "天使之怒：本模型所领导的单位在结束冲锋移动之后，其 中的模型装备的近战武器S+1，持续到本回合结束时",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 69,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "副官": [
    {
      "id": "space-marines-p70-0",
      "name": "核心特性",
      "text": "】：支援",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 70,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p70-2",
      "name": "精准战术",
      "text": "精准战术：本模型所领导的单位，其中的模型装备的武器获 得【致命一击】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "lethal-hits",
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 70,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p70-3",
      "name": "优先目标",
      "text": "优先目标：本模型所在单位在进行过撤退的同回合中依然是 【可射击】和【可冲锋】单位",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 70,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "劫掠者副官": [
    {
      "id": "space-marines-p71-0",
      "name": "核心特性",
      "text": "】：支援，斥候6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 71,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p71-2",
      "name": "精准战术",
      "text": "精准战术：本模型所领导的单位，其中的模型装备的武器 获得【致命一击】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "lethal-hits",
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 71,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p71-3",
      "name": "极度恐惧",
      "text": "极度恐惧：本模型所领导的单位，其【恐怖部队】技能生 效范围提高3寸",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 71,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "先锋军副官": [
    {
      "id": "space-marines-p72-0",
      "name": "核心特性",
      "text": "】：支援，斥候6，深入打击，渗透",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 72,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p72-2",
      "name": "精准战术",
      "text": "精准战术：本模型所领导的单位，其中的模型装备的武器 获得【致命一击】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "lethal-hits",
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 72,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p72-3",
      "name": "一击脱离",
      "text": "一击脱离：在你的射击阶段中，如果本模型所在单位完成 射击时未处于敌方接战范围内，则可以进行一次最多6寸 的标准移动，但如果这样做了本回合就不是【可冲锋】单 位",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 72,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "装备复合武器的先锋军副官": [
    {
      "id": "space-marines-p73-0",
      "name": "核心特性",
      "text": "】：独行特工，渗透，隐蔽，不知疼痛5+",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 5
        }
      ],
      "source": {
        "page": 73,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p73-2",
      "name": "优先目标识别",
      "text": "优先目标识别：在第一个游戏大回合开始时，如果你的军 队包含任意个本能力拥有者，你可以将战场上最多一个目 标点定为【优先目标】，本场游戏中，如果拥有本能力的 模型在场，则友军阿斯塔特修会单位攻击位于【优先目 标】范围内的敌方单位时，重投为1的造伤结果",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-wound-reroll",
          "mode": "ones"
        }
      ],
      "source": {
        "page": 73,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p73-3",
      "name": "暗影潜行",
      "text": "暗影潜行：每回合一次，在一个敌方单位在本模型8寸内 结束移动时，如果本模型不处于任意敌方单位接战范围 内，则可以进行一次最多6寸的标准移动",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 73,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p73-4",
      "name": "幸存者",
      "text": "幸存者：本模型不得作为军队主将",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 73,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "智库": [
    {
      "id": "space-marines-p74-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 74,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p74-2",
      "name": "灵能头冠",
      "text": "灵能头冠：本模型所领导的单位，其中的模型遭到【灵 能】攻击时获得【不知疼痛4+】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 4,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 74,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p74-3",
      "name": "心灵壁垒【灵能】",
      "text": "心灵壁垒【灵能】：本模型所领导的单位，其中的模型拥 有4+特殊保护",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 4,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 74,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "先锋军智库": [
    {
      "id": "space-marines-p75-0",
      "name": "核心特性",
      "text": "】：领袖，渗透",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 75,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p75-2",
      "name": "灵能头冠",
      "text": "灵能头冠：本模型所领导的单位，其中的模型遭到【灵 能】攻击时获得【不知疼痛4+】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 4,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 75,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p75-3",
      "name": "暗影庇护【灵能】",
      "text": "暗影庇护【灵能】：本模型所领导的单位，其中的模型 拥有【隐蔽】技能，并且只能被其12寸内的模型选为射 击目标",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 75,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "终结者智库": [
    {
      "id": "space-marines-p76-0",
      "name": "核心特性",
      "text": "】：领袖，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 76,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p76-2",
      "name": "灵能头冠",
      "text": "灵能头冠：本模型所领导的单位，其中的模型遭到【灵 能】攻击时获得【不知疼痛4+】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 4,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 76,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p76-3",
      "name": "时间帷幕【灵能】",
      "text": "时间帷幕【灵能】：本模型所领导的单位，其中的模型所 装备的武器拥有【连击1】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "sustained-hits",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 76,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "牧师": [
    {
      "id": "space-marines-p77-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 77,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p77-2",
      "name": "憎恨祷言",
      "text": "憎恨祷言：本模型所领导单位中的模型近战攻击造伤结 果+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 77,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p77-3",
      "name": "精神领袖",
      "text": "精神领袖：每场游戏一次，在任意阶段开始时，你可以 选择本模型12寸内一个阿斯塔特修会友军单位，消除它 的【被震慑】状态",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 77,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "终结者牧师": [
    {
      "id": "space-marines-p78-0",
      "name": "核心特性",
      "text": "】：领袖，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 78,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p78-2",
      "name": "憎恨祷言",
      "text": "憎恨祷言：本模型所领导单位中的模型近战攻击造伤结果 +1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "wound-modifier",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 78,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p78-3",
      "name": "信仰护体",
      "text": "信仰护体：本模型所领导单位中的模型遭受致命伤害攻击 时拥有【不知疼痛4+】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "fnp",
          "threshold": 4,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 78,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "摩托牧师": [
    {
      "id": "space-marines-p79-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 79,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p79-2",
      "name": "憎恨祷言",
      "text": "憎恨祷言：本模型所领导单位中的模型近战攻击造伤结果 +1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "wound-modifier",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 79,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p79-3",
      "name": "烈火教典",
      "text": "烈火教典：每当本模型所在单位被选中进行射击时，你可 以选择本模型视线中12寸内一个敌方单位，本单位的射 击武器在本阶段对那个敌方单位攻击时获得【毁灭伤害】 技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "devastating-wounds",
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 79,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "跳跃背包牧师": [
    {
      "id": "space-marines-p80-0",
      "name": "核心特性",
      "text": "】：领袖，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 80,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p80-2",
      "name": "憎恨祷言",
      "text": "憎恨祷言：本模型所领导单位中的模型近战攻击造伤结果 +1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "wound-modifier",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 80,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p80-3",
      "name": "狂怒训诫",
      "text": "狂怒训诫：每当本模型所在单位被选中进行近战时，你可 以选择本模型所在单位接战范围内一个敌方单位，为其投 D6，结果为4-5则那个敌方单位遭受D3点致命伤害，如 果结果为6则改为遭受3点致命伤害",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 80,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "技术军士": [
    {
      "id": "space-marines-p81-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 81,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p81-2",
      "name": "技术军士",
      "text": "技术军士：如果本模型3寸内有至少一个友军阿斯塔特修 会载具单位，则本模型获得【独行特工】技能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 81,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p81-3",
      "name": "机神祝福",
      "text": "机神祝福：在你的指挥阶段中，你可以选择本模型3寸内 一个友军阿斯塔特修会载具模型，这个载具模型恢复D3 点损失的W值，并且直到下个你的指挥阶段开始时，这个 载具模型攻击命中结果+1。每个模型在每回合中只能被此 技能选择一次",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1
        }
      ],
      "source": {
        "page": 81,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p81-4",
      "name": "机神复仇",
      "text": "机神复仇：如果一个友军阿斯塔特修会载具模型在本模型 12寸内被消灭，则本模型的机神动力斧在本场游戏中A变 为7",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 81,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "药剂师": [
    {
      "id": "space-marines-p82-0",
      "name": "核心特性",
      "text": "】：支援",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 82,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p82-2",
      "name": "医疗工具",
      "text": "医疗工具：本模型所领导的单位在每个你的指挥阶段中， 可以复活一个被消灭的非人物模型",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 82,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p82-3",
      "name": "回收基因种子",
      "text": "回收基因种子：当本模型的保镖单位被消灭时，投D6， 2+则你获得1点CP",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 82,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "生物学药剂师": [
    {
      "id": "space-marines-p83-0",
      "name": "核心特性",
      "text": "】：支援",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 83,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p83-2",
      "name": "手术式精准",
      "text": "手术式精准：本模型所领导的单位所装备的武器获得【致 命一击】技能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 83,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p83-3",
      "name": "采集生物样本",
      "text": "采集生物样本：当本模型所在单位近战消灭一个敌方单位 时，本模型的OC值在本场游戏中永久提高到9",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 83,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "旗手": [
    {
      "id": "space-marines-p84-0",
      "name": "核心特性",
      "text": "】：支援",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 84,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p84-2",
      "name": "阿斯塔特旗帜",
      "text": "阿斯塔特旗帜：本模型所领导的单位，其中的模型OC值 提高1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 84,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p84-3",
      "name": "不休职责",
      "text": "不休职责：当本模型处于以下任意状态时，获得【不知疼 痛4+】技能： ◼ 位于一个目标点范围内 ◼ 位于战场中心6寸内",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 84,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "终结者旗手": [
    {
      "id": "space-marines-p85-0",
      "name": "核心特性",
      "text": "】：支援，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 85,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p85-2",
      "name": "阿斯塔特旗帜",
      "text": "阿斯塔特旗帜：本模型所领导的单位，其中的模型OC值 提高1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 85,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p85-3",
      "name": "高举旗帜",
      "text": "高举旗帜：本模型所领导的单位，如果低于起始模型数 量，则攻击命中结果+1，如果低于半数，则攻击造伤结果 也+1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1,
          "requiresJoined": true
        },
        {
          "type": "wound-modifier",
          "value": 1,
          "condition": "belowHalfStrength",
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 85,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "剑卫旗手": [
    {
      "id": "space-marines-p86-0",
      "name": "特殊保护",
      "text": "特殊保护：本模型拥有4+特殊保护",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 4
        }
      ],
      "source": {
        "page": 86,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p86-1",
      "name": "【核心技能】",
      "text": "【核心技能】：支援",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 86,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p86-3",
      "name": "阿斯塔特旗帜",
      "text": "阿斯塔特旗帜：本模型所领导的单位，其中的模型OC值 提高1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 86,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p86-4",
      "name": "英雄伟业",
      "text": "英雄伟业：一次性技能，当本单位被选中进行近战攻击 时，可以让本模型所在单位中的所有模型近战武器A+1， 持续本阶段",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "attack-modifier",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 86,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "裁决士": [
    {
      "id": "space-marines-p87-0",
      "name": "核心特性",
      "text": "】：领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 87,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p87-2",
      "name": "亡殆时计",
      "text": "亡殆时计：本模型所领导单位获得【先攻】技能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 87,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p87-3",
      "name": "无言怒火",
      "text": "无言怒火：每当本模型消灭一个敌方人物模型，本模型的 圣物处刑者巨剑就在本场游戏中A+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 87,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "战术护甲步兵": [
    {
      "id": "space-marines-p88-1",
      "name": "阿斯塔特旗帜",
      "text": "阿斯塔特旗帜：旗手所在的单位，其中的模型OC值提高 1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 88,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p88-2",
      "name": "指挥组",
      "text": "指挥组：如果有人物模型在领导本单位，则对本单位的攻 击造伤结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "incoming-wound-minus",
          "value": 1,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 88,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "常胜荣誉卫队": [
    {
      "id": "space-marines-p89-1",
      "name": "极限战士荣誉卫队",
      "text": "极限战士荣誉卫队：当连长或战团长领导本单位时，本单 位遭受的攻击造伤结果减1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 89,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p89-2",
      "name": "奥特拉马的荣耀",
      "text": "奥特拉马的荣耀：在对手的射击阶段，每当敌方单位射击 造成本单位任意模型阵亡时，如果本单位没有处于被震 慑，或位于敌方接战范围内，则可以进行一次最多D6寸 的特殊移动，这种移动甚至可以进入对方的接战范围，但 是必须尽可能靠近最近的敌方非飞行器单位，每个阶段最 多这样移动一次。",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 89,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p89-3",
      "name": "马库拉格旗帜",
      "text": "马库拉格旗帜：每场战斗一次，在近战阶段开始时，装备 者可以使用本技能，让本单位在本阶段中近战武器的S和 A都+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 89,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "仲裁者小队": [
    {
      "id": "space-marines-p90-1",
      "name": "目标确保",
      "text": "目标确保：如果在你的指挥阶段结束时，本单位位于某个 你占领的目标点范围内，则即使你在这个目标点范围内已 没有你的模型，也算作你占领此目标点，此效果持续到敌 方占领此目标点后，任意回合开始或结束时为止",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 90,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p90-2",
      "name": "目标歼灭",
      "text": "目标歼灭：每当本单位被选中进行射击时，只选择了一个 目标，就可以使用本技能，让本阶段中所装备的爆弹步枪 A+2",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 90,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "跳跃背包突击仲裁者小队": [
    {
      "id": "space-marines-p91-0",
      "name": "核心特性",
      "text": "】：深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 91,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p91-2",
      "name": "愤怒之锤",
      "text": "愤怒之锤：每当本单位结束冲锋移动时，选择其接战范围 内一个敌方单位，本单位每有一个【位于所选敌方单位接 站范围内】的模型就投一颗D6，每个为4+的结果都会让 该敌方单位遭受1点致命伤害",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 91,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "突击仲裁者小队": [
    {
      "id": "space-marines-p92-1",
      "name": "夺取目标",
      "text": "夺取目标：本单位模型在进行近战攻击时重投造伤结果中 的1，如果作为攻击目标的敌方单位位于目标点范围内， 则你可以对其重投造伤结果",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-wound-reroll",
          "mode": "ones"
        }
      ],
      "source": {
        "page": 92,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "焚狱者小队": [
    {
      "id": "space-marines-p93-1",
      "name": "焚烧灭尽",
      "text": "焚烧灭尽：在你的射击阶段中，当本单位射击完成后，你 可以选择被本单位焚焰枪所命中过的一个敌方步兵单位， 那个敌方单位必须以结果-1惩罚进行一次震慑测试",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 93,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "剑卫老兵小队": [
    {
      "id": "space-marines-p94-1",
      "name": "剑卫",
      "text": "剑卫：在近战阶段开始时，你可以选择以下之一在本阶段中 对本单位模型生效： ◼ 重投近战攻击命中结果中的1 ◼ 重投特殊保护投掷结果中的1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-hit-reroll",
          "mode": "ones"
        }
      ],
      "source": {
        "page": 94,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "肃卫老兵小队": [
    {
      "id": "space-marines-p95-0",
      "name": "核心特性",
      "text": "】：",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 95,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p95-1",
      "name": "老兵专注",
      "text": "老兵专注：本单位模型攻击你的【破敌重誓】技能目标 时，可以重投造伤结果",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-wound-reroll",
          "mode": "failed"
        }
      ],
      "source": {
        "page": 95,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "地狱轰击者小队": [
    {
      "id": "space-marines-p96-1",
      "name": "为了战团",
      "text": "为了战团：每当本单位模型因为被攻击或危险武器技能测 试失败而被消灭时（其他原因不触发本技能），投D6， 3+则暂不移除模型，而是在攻击者所在单位完成所有攻击 后，如同在你的射击阶段一样进行一轮射击攻击，完成攻 击后再移除，这样的攻击算作本回合进行过标准移动，也 不再计算武器的【危险】技能。这种攻击也属于“阶段外 规则”的应用情况【总规则注解P28】（译注：本技能并 没有说你可以在通常不能射击的情况例如近战中，进行射 击）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 96,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "寂灭者小队": [
    {
      "id": "space-marines-p97-1",
      "name": "光学瞄准器",
      "text": "光学瞄准器：如果本单位保持静止，则直到下个你的移动 阶段开始时，本单位模型的射击武器获得【忽视掩体】技 能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 97,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "重装护甲步兵": [
    {
      "id": "space-marines-p98-1",
      "name": "拒不屈服",
      "text": "拒不屈服：如果本单位位于你占领的目标点范围内，本单 位模型对抗破坏力（D）为1的攻击时，护甲保护投掷结 果+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 98,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "侵略者小队": [
    {
      "id": "space-marines-p99-1",
      "name": "近距离火力",
      "text": "近距离火力：如果本单位中模型的射击目标是当前最近的 可选目标，则本轮攻击中AP值增强1点",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 99,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "根除者小队": [
    {
      "id": "space-marines-p100-1",
      "name": "完全湮灭",
      "text": "完全湮灭：如果本单位模型的射击目标是巨兽或载具，则 可以重投命中，造伤，和破坏力投掷结果",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-hit-reroll",
          "mode": "failed"
        },
        {
          "type": "space-wound-reroll",
          "mode": "failed"
        }
      ],
      "source": {
        "page": 100,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "重爆弹根除者小队": [
    {
      "id": "space-marines-p101-1",
      "name": "覆盖爆破",
      "text": "覆盖爆破：在你的射击阶段，当本单位被选中进行射击 时，你可以选择其视线中一个非巨兽，非载具敌方单位， 本轮射击中本单位的重型爆弹枪攻击那个敌方单位时获得 【爆炸1】",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 101,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "拦截者小队": [
    {
      "id": "space-marines-p102-0",
      "name": "核心特性",
      "text": "】：深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 102,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p102-2",
      "name": "轨道降下",
      "text": "轨道降下：当本单位在你的移动阶段使用深入打击技能入 场时可以使用本技能，本单位可以部署于场上敌人单位水 平距离6寸外任意位置，但是这样做的同回合中本单位不 能进行冲锋",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 102,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "福波斯护甲步兵": [
    {
      "id": "space-marines-p103-0",
      "name": "核心特性",
      "text": "】：渗透",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 103,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p103-2",
      "name": "信号干扰",
      "text": "信号干扰：敌方单位作为援军入场时不能部署在本单位12 寸内",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 103,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "入侵者小队": [
    {
      "id": "space-marines-p104-0",
      "name": "核心特性",
      "text": "】：斥候6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 104,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p104-2",
      "name": "多重光谱阵列",
      "text": "多重光谱阵列：每当本单位射击完成后，你可以选择被本 单位命中过的一个敌方单位，本阶段中，阿斯塔特修会友 军单位攻击那个敌方单位时，命中结果+1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1
        }
      ],
      "source": {
        "page": 104,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "劫掠者小队": [
    {
      "id": "space-marines-p105-0",
      "name": "核心特性",
      "text": "】：斥候6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 105,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p105-2",
      "name": "恐怖突击",
      "text": "恐怖突击：在近战阶段开始时，位于任意数量本能力单位 接战范围内的敌方单位必须以结果-1惩罚进行一次震慑测 试",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 105,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p105-3",
      "name": "心理战部队",
      "text": "心理战部队：任意数量拥有本技能的单位3寸内的敌方单 位OC值-1（对巨兽和载具无效）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 105,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "歼灭者小队": [
    {
      "id": "space-marines-p106-0",
      "name": "【核心技能】",
      "text": "【核心技能】：渗透，隐蔽",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 106,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p106-2",
      "name": "掩护转移",
      "text": "掩护转移：在你的射击阶段中，每当本单位射击后，如果 本单位士官装备了煽动者爆弹卡宾枪，则本单位可以进行 一次标准移动，如果这样做本单位本回合就无法进行冲锋",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 106,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p106-3",
      "name": "标记目标",
      "text": "标记目标：如果本单位保持静止，则直到下个你的移动阶 段开始时，本单位模型的射击武器获得【毁灭伤害】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "devastating-wounds"
        }
      ],
      "source": {
        "page": 106,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "终结者小队": [
    {
      "id": "space-marines-p108-0",
      "name": "核心特性",
      "text": "】：深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 108,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p108-2",
      "name": "传送信标",
      "text": "传送信标：游戏开始时，你可以在除了敌方部署区的任意 位置放置一个传送信标指示物，整场游戏一次，你可以消 耗0CP对本单位使用【快速响应】战略技能（见总规 则），但这样做时必须将本单位模型部署于这个传送信标 指示物水平3寸内，敌方模型水平8寸外，之后移除这个 标记物",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 108,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p108-3",
      "name": "一连之怒",
      "text": "一连之怒：本单位模型攻击你的【破敌重誓】目标时命中 结果+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 108,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "侦查小队": [
    {
      "id": "space-marines-p111-0",
      "name": "核心特性",
      "text": "】：渗透，斥候6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 111,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p111-2",
      "name": "游击战术",
      "text": "游击战术：在对方回合结束时，如果本单位本单位在任 意敌人模型6寸外，则可以将其移除出战场，进入战略 预备队",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 111,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "破坏者小队": [
    {
      "id": "space-marines-p112-1",
      "name": "计算仪",
      "text": "计算仪：如果本单位保持静止，则直到下个你的移动阶段开 始时，本单位模型的射击武器获得【忽视掩体】技能",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 112,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p112-2",
      "name": "弹药天使",
      "text": "弹药天使：一次性技能，在为本单位一个模型投掷一颗命中 结果后，你可以选择将其改为未修正的6。（弹药天使的模 型是标记物，并不是你军队的一部分，使用后将其移除）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 112,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "百夫长突击小队": [
    {
      "id": "space-marines-p114-1",
      "name": "歼灭程序",
      "text": "歼灭程序：本单位模型的近战武器攻击巨兽，载具，或工 事单位时获得【连击2】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "sustained-hits",
          "value": 2
        }
      ],
      "source": {
        "page": 114,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "百夫长破坏小队": [
    {
      "id": "space-marines-p115-1",
      "name": "抽杀指令",
      "text": "抽杀指令：本单位模型的射击攻击可以重投命中结果中 的1，如果射击目标位于目标点范围内，则对其的攻击 改为重投命中结果",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-hit-reroll",
          "mode": "ones"
        }
      ],
      "source": {
        "page": 115,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "跳跃背包先锋老兵小队": [
    {
      "id": "space-marines-p116-0",
      "name": "核心特性",
      "text": "】：深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 116,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p116-2",
      "name": "先锋突击",
      "text": "先锋突击：本单位完成冲锋移动的同回合，本单位的近 战武器获得【致命一击】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "lethal-hits"
        }
      ],
      "source": {
        "page": 116,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "压制者小队": [
    {
      "id": "space-marines-p117-0",
      "name": "核心特性",
      "text": "】：深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 117,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p117-2",
      "name": "压制火力",
      "text": "压制火力：在你的射击阶段中，当本单位射击完成后， 你可以选择被本单位使用加速自动炮命中过的一个敌方 单位。直到下个你的回合开始时，只要本单位在场，那 个敌方单位就视为被压制状态：那个单位中的模型攻击 命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "incoming-hit-minus",
          "value": 1
        }
      ],
      "source": {
        "page": 117,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "ATV 突击车": [
    {
      "id": "space-marines-p120-1",
      "name": "护航车队",
      "text": "护航车队：每回合一次，在对手的射击阶段，当本模型6 寸内一个友军阿斯塔特骑乘单位被选为攻击目标时，本模 型可以使用本技能，当那个敌方单位完成本轮攻击后，本 模型可以如同你的射击阶段一样对那个敌方单位进行一轮 射击（如果对方对本模型而言是一个可选的射击目标）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 120,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "无畏机甲": [
    {
      "id": "space-marines-p122-0",
      "name": "核心特性",
      "text": "】：致命破灭1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 122,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p122-2",
      "name": "长者智慧【光环】",
      "text": "长者智慧【光环】：本模型6寸内的友军阿斯塔特步兵单 位，其中的模型攻击时可以重投命中结果中的1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-hit-reroll",
          "mode": "ones"
        }
      ],
      "source": {
        "page": 122,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "救赎者型无畏机甲": [
    {
      "id": "space-marines-p123-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 123,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p123-2",
      "name": "永恒职责",
      "text": "永恒职责：本分配给本模型的每下攻击破坏力降低1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 123,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p123-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 123,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "蛮兽型无畏机甲": [
    {
      "id": "space-marines-p124-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 124,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p124-2",
      "name": "蛮兽冲锋",
      "text": "蛮兽冲锋：每当本模型结束冲锋移动时，选择其接战范围 内一个敌方单位并为其投D6，2-3则该敌方单位遭受D3 点致命伤害，4-5则改为3点，6则改为D3+3点",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 124,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p124-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 124,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "射手型无畏机甲": [
    {
      "id": "space-marines-p125-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 125,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p125-2",
      "name": "射手轰炸",
      "text": "射手轰炸：本模型对没有低于半数的目标射击时可以重投 命中结果",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-hit-reroll",
          "mode": "failed"
        }
      ],
      "source": {
        "page": 125,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p125-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 125,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "旋风火箭炮": [
    {
      "id": "space-marines-p127-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 127,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p127-2",
      "name": "压制轰炸",
      "text": "压制轰炸：在你的射击阶段中，本模型射击后，如果本模 型的旋风复仇火箭命中过敌方步兵单位，那个敌方单位必 须进行一次震慑测试",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 127,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p127-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 127,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "破坏者型猎食者坦克": [
    {
      "id": "space-marines-p128-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 128,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p128-2",
      "name": "破坏者",
      "text": "破坏者：本模型射击步兵单位时AP增强1点",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 128,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p128-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 128,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "歼灭者型猎食者坦克": [
    {
      "id": "space-marines-p129-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 129,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p129-2",
      "name": "歼灭者",
      "text": "歼灭者：本模型的射击攻击被分配给巨兽或载具单位时， 你可以重投破坏力（D）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 129,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p129-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 129,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "维护者突击炮": [
    {
      "id": "space-marines-p130-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 130,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p130-2",
      "name": "攻城盾",
      "text": "攻城盾：当本模型使用破坏者加农炮攻击时，目标可以是 处于自身接战范围的敌方单位（但不能是处于其他友军单 位接战范围的敌方单位），并且本模型射击处于自身接战 范围的敌方单位时不因此遭受命中惩罚",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 130,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p130-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 130,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "枪骑兵型角斗者坦克": [
    {
      "id": "space-marines-p131-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 131,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p131-2",
      "name": "天鹰瞄准仪",
      "text": "天鹰瞄准仪：每当本模型被选择进行射击攻击时（也就是 每轮射击攻击中），你可以重投一颗命中结果，一颗造伤 结果，一颗破坏结果",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 131,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p131-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 131,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "死神型角斗者坦克": [
    {
      "id": "space-marines-p132-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 132,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p132-2",
      "name": "飞旋死神",
      "text": "飞旋死神：本模型的双联重型突击加特林攻击步兵单位时 额外获得【连击2】技能",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "sustained-hits",
          "value": 2
        }
      ],
      "source": {
        "page": 132,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p132-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 132,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "豪侠型角斗者坦克": [
    {
      "id": "space-marines-p133-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 133,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p133-2",
      "name": "优选目标",
      "text": "优选目标：本模型的双联激光爪攻击其可选目标中，最近 的巨兽或载具单位时命中结果+1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1
        }
      ],
      "source": {
        "page": 133,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p133-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-4时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 133,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "十字军型兰德掠袭者坦克": [
    {
      "id": "space-marines-p135-0",
      "name": "核心特性",
      "text": "】：致命破灭D6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 135,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p135-2",
      "name": "突击载具",
      "text": "突击载具：本模型进行标准移动后，从中脱离的单位本回 合依然可以发动冲锋",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 135,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p135-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-5时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 5
        }
      ],
      "source": {
        "page": 135,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "救赎者型兰德掠袭者坦克": [
    {
      "id": "space-marines-p136-0",
      "name": "核心特性",
      "text": "】：致命破灭D6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 136,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p136-2",
      "name": "突击载具",
      "text": "突击载具：本模型进行标准移动后，从中脱离的单位本回 合依然可以发动冲锋",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 136,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p136-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-5时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 5
        }
      ],
      "source": {
        "page": 136,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "反击者突击艇": [
    {
      "id": "space-marines-p137-0",
      "name": "核心特性",
      "text": "】：致命破灭D6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 137,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p137-2",
      "name": "紧急搭乘",
      "text": "紧急搭乘：每回合一次，在对手的冲锋阶段中，当一个敌 方单位选择了冲锋目标但进行冲锋移动之前，如果那个被 冲锋目标（也就是你的一个阿斯塔特修会单位）满足以下 要求则可以立即乘坐本模型，敌方冲锋单位可以重新选择 冲锋目标 ◼ 不位于任意敌方单位接战范围内 ◼ 全体模型位于本模型（反击者突击艇）的3寸内",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 137,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p137-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-5时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 5
        }
      ],
      "source": {
        "page": 137,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "处决者型反击者坦克": [
    {
      "id": "space-marines-p138-0",
      "name": "核心特性",
      "text": "】：致命破灭D6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 138,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p138-2",
      "name": "处决者",
      "text": "处决者：每当本模型攻击【低于半数】的目标时，命中结 果+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 138,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p138-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-5时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 5
        }
      ],
      "source": {
        "page": 138,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "犀牛装甲车": [
    {
      "id": "space-marines-p139-0",
      "name": "核心特性",
      "text": "】：致命破灭D3，开火口2",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 139,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p139-2",
      "name": "自行修理",
      "text": "自行修理：在每个你的指挥阶段结束时，本模型恢复一点 失去的W值",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 139,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "豪猪装甲车": [
    {
      "id": "space-marines-p140-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 140,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p140-2",
      "name": "火力支援",
      "text": "火力支援：在你的射击阶段中，当本模型射击完成后，你 可以选择被本模型命中过的一个敌方单位，本阶段中，本 回合中从本模型脱离的友军模型攻击那个敌方单位时，可 以重投造伤结果",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "space-hit-reroll",
          "mode": "failed"
        },
        {
          "type": "space-wound-reroll",
          "mode": "failed"
        }
      ],
      "source": {
        "page": 140,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "冲击者突击艇": [
    {
      "id": "space-marines-p141-0",
      "name": "核心特性",
      "text": "】：致命破灭D3，开火口6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 141,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p141-2",
      "name": "快速脱离",
      "text": "快速脱离：本模型即使本回合进行过加速，其乘客依然可 以脱离，这样脱离的单位算作进行过标准移动，但本回合 不能发动冲锋",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 141,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "空降仓": [
    {
      "id": "space-marines-p142-0",
      "name": "核心特性",
      "text": "】：致命破灭1，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 142,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p142-2",
      "name": "空降突击",
      "text": "空降突击： ◼ 本模型在游戏开始时必须放于预备队中，但本模型和 其中乘坐的单位都不算做预备队数量上限之列，本模 型可以在你的第1-3回合的援军入场子阶段中部署入 场，忽视任务限制 ◼ 本模型部署到场之后其中的单位必须立即脱离，并且 本模型及其脱离单位都要在任意敌人9寸外部署 ◼ 这样脱离的单位在本回合中依然可以发动冲锋，但此 后任意单位都不能再乘坐本模型",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 142,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "雷霆型风暴速攻艇": [
    {
      "id": "space-marines-p144-0",
      "name": "核心特性",
      "text": "】：致命破灭D3，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 144,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p144-2",
      "name": "雷霆轰炸",
      "text": "雷霆轰炸：当本模型射击完成后，你可以选择被本模型命 中过的一个敌方巨兽或载具单位，本阶段中，每当阿斯塔 特修会友军单位射击攻击那个敌方单位时，造伤结果+1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "wound-modifier",
          "value": 1
        }
      ],
      "source": {
        "page": 144,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "落锤型风暴速攻艇": [
    {
      "id": "space-marines-p145-0",
      "name": "核心特性",
      "text": "】：致命破灭D3，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 145,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p145-2",
      "name": "落锤打击",
      "text": "落锤打击：当本模型射击完成后，你可以选择被本模型命 中过的一个敌方单位，本阶段中，该单位失去【掩体效 果】",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 145,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "兰德速攻艇": [
    {
      "id": "space-marines-p146-0",
      "name": "核心特性",
      "text": "】：深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 146,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p146-2",
      "name": "闪避机动",
      "text": "闪避机动：你的射击阶段中本单位射击完毕后可以立即进 行一次最多6寸的标准移动，如果这样做了本回合中就不 能发动冲锋",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 146,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "风暴隼拦截机": [
    {
      "id": "space-marines-p147-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 147,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p147-2",
      "name": "拦截机",
      "text": "拦截机：每当本模型射击攻击飞行目标时，命中结果+1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1
        }
      ],
      "source": {
        "page": 147,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "风暴爪炮艇": [
    {
      "id": "space-marines-p148-0",
      "name": "核心特性",
      "text": "】：致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 148,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p148-2",
      "name": "对地扫射",
      "text": "对地扫射：每当本模型射击攻击没有飞行关键词的目标 时，命中结果+1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1
        }
      ],
      "source": {
        "page": 148,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ],
  "风暴鸦炮艇": [
    {
      "id": "space-marines-p149-0",
      "name": "核心特性",
      "text": "】：致命破灭D6，悬浮",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 149,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p149-2",
      "name": "坚韧装甲",
      "text": "坚韧装甲：被分配给本模型的攻击，破坏力-1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 149,
        "source": "星际战士11版中文1.0.pdf"
      }
    },
    {
      "id": "space-marines-p149-3",
      "name": "严重损伤",
      "text": "严重损伤：本模型W值为1-5时，攻击命中结果-1",
      "status": "计算支持（满足条件时自动结算）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 5
        }
      ],
      "source": {
        "page": 149,
        "source": "星际战士11版中文1.0.pdf"
      }
    }
  ]
};
  root.WarhammerSpaceMarineRules = { factionRules, unitRules };
})(typeof globalThis === "undefined" ? this : globalThis);
