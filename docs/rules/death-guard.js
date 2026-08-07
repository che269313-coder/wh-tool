/* Generated from docs/data/死亡守卫/死亡守卫-全部数据卡.json. Raw ability text is preserved; rerun tools/generate-death-guard-rules.mjs after data changes. */
(function (root) {
  const factionRules = [
  {
    "id": "death-guard-nurgles-gift",
    "name": "纳垢赐福",
    "text": "纳垢赐福（光环）：当敌方单位处于感染范围内时，该敌方单位模型的韧性值T-1；该单位额外受到以下一种瘟疫的影响（三选一）：头骨痉挛：模型进行近战攻击时命中结果-1；颤骨瘟疫：模型的保护值SV-1；烂魂伤风：模型的移动、领导和目标控制属性各-1。",
    "status": "计算支持（T-1与头骨痉挛/颤骨瘟疫会计入伤害计算；烂魂伤风仅显示）",
    "controls": [
      {
        "id": "enabled",
        "type": "checkbox",
        "label": "目标受到纳垢赐福（感染范围内）"
      },
      {
        "id": "plague",
        "type": "select",
        "label": "额外瘟疫（三选一）",
        "options": [
          [
            "none",
            "不选择"
          ],
          [
            "skullsquirm",
            "头骨痉挛：近战命中 -1"
          ],
          [
            "rattlejoint",
            "颤骨瘟疫：保护值 SV -1"
          ],
          [
            "scabrous",
            "烂魂伤风：移动/领导/OC -1"
          ]
        ]
      }
    ],
    "effects": [
      {
        "type": "target-toughness-modifier",
        "value": -1
      },
      {
        "type": "target-melee-hit-minus",
        "value": -1,
        "requiresPlague": "skullsquirm"
      },
      {
        "type": "target-save-modifier",
        "value": 1,
        "requiresPlague": "rattlejoint"
      }
    ],
    "source": {
      "file": "死亡守卫-分遣队规则-可检索.md"
    }
  }
];
  const unitRules = {
  "莫塔里安": [
    {
      "id": "death-guard-p23-0",
      "name": "核心技能",
      "text": "致命破灭D6，深入打击，不知疼痛5+",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "fnp",
          "threshold": 5
        }
      ],
      "source": {
        "page": 23,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 23,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p23-1",
      "name": "死亡守卫之主",
      "text": "死亡守卫之主：每个回合一次，该模型可以选 择使用以下一项能力。 ▪ 【疫病侵蚀】当敌方单位在距离莫塔里安6寸内 的一个友方死亡守卫单位9寸内结束普通移动、 加速或撤退移动时，若该死亡守卫单位未处于任 意敌方的近战范围，则其可进行5寸的正常移动 ▪ 【死亡恩赐】在近战阶段，当莫塔里安6寸内的 一个友方死亡守卫单位被选为攻击目标时，该单 位可以使用此技能。在该阶段结束前，若该死亡 守卫单位中的模型在未进行过攻击的情况下被近 战消灭，可为每个被消灭的模型骰D6测试，结 果为2+则这些被消灭的模型在进行攻击的敌方 单位完成攻击后，可以进行反击后再移除 ▪ 【恶名反击】在敌方射击阶段，当莫塔里安6寸 内的一个友方死亡守卫单位被某个敌方单位宣布 为射击目标后，莫塔里安可以使用该能力。在那 个敌方单位完成射击后，被射击的死亡守卫单位 可立即对该敌方单位进行反击射击，需按照正常 的射击要求执行",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 23,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 23,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p23-2",
      "name": "瘟疫之巢",
      "text": "瘟疫之巢：在你的移动阶段结束后，为每个该 模型6寸内的敌方单位骰D6，被【感染】的 敌方单位该测试结果+1。结果为3+则对应的 敌方单位承受D3致命伤。",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 23,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 23,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p23-3",
      "name": "严重损伤",
      "text": "严重损伤：当此模型 W剩余1-6时，攻击命 中结果-1",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 6
        }
      ],
      "source": {
        "page": 23,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 23,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "泰弗斯": [
    {
      "id": "death-guard-p25-0",
      "name": "核心技能",
      "text": "深入打击，领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 25,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 25,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p25-1",
      "name": "毁灭虫群",
      "text": "毁灭虫群: 当此模型领导单位时，每次以该单 位为目标的近战攻击命中投掷结果-1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 25,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 25,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p25-2",
      "name": "噬体瘟疫（灵能）",
      "text": "噬体瘟疫（灵能）: 在乙方射击阶段，您可以 选择一个位于该模型18寸内且对齐可见的敌 方单位（拥有【独行特工】能力，不属于联合 单位，并且位于该模型12寸外的单位除外）， 掷1D6： ▪ 1：此灵能者所在单位受到D3点致命伤害 ▪ 2-5：目标单位受到D6点致命伤害 ▪ 6：目标单位受到D3+3点致命伤害",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 25,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 25,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "纳垢恶魔亲王": [
    {
      "id": "death-guard-p26-0",
      "name": "核心技能",
      "text": "致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 26,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 26,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p26-1",
      "name": "死亡守卫捍卫者",
      "text": "死亡守卫捍卫者：此模型3寸内有友方死亡守卫 步兵单位时，获得【独行特工】能力",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 26,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 26,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p26-2",
      "name": "狂热战略家",
      "text": "狂热战略家: 每个战斗轮次一次，你军队内一个拥 有此能力的模型可以宣布使用。当此模型12寸内 的一个友方死亡守卫单位使用战略技能时，减少 该技能1CP消耗",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 26,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 26,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p26-3",
      "name": "瘟疫瘴气（光环）",
      "text": "瘟疫瘴气（光环）: 该模型6寸内的友方死亡守 卫单位被远程攻击时，视为拥有掩体加成",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 26,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 26,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "有翼纳垢恶魔亲王": [
    {
      "id": "death-guard-p27-0",
      "name": "核心技能",
      "text": "致命破灭D3，深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 27,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 27,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p27-1",
      "name": "恐怖之貌",
      "text": "恐怖之貌: 此模型完成冲锋后，选择接战范围 内的一个敌方单位，其需进行结果-1的士气测 试",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 27,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 27,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p27-2",
      "name": "衰弱瘴气（光环）",
      "text": "衰弱瘴气（光环）: 该模型5寸内非凶兽/载具 的敌方单位撤退时需进行【绝望逃脱测试】。 若该单位已士气崩溃，绝望逃脱测试结果-1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 27,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 27,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "疫病领主": [
    {
      "id": "death-guard-p28-0",
      "name": "核心技能",
      "text": "深入打击，领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 28,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 28,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p28-1",
      "name": "疾病媒介",
      "text": "疾病媒介: 此模型领导单位时，该单位内的模 型所装备的近战武器获得【连击1】与【骑枪】 能力",
      "status": "计算支持（满足条件时自动计入）",
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
        "page": 28,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 28,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p28-2",
      "name": "邪秽韧体",
      "text": "邪秽韧体: 此模型首次被摧毁时，在该阶段结 束后掷1D6，2+则将其重新部署至战场原位置 附近（不与敌方接战），并保留3点W值。每 场战斗限一次",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 28,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 28,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "病毒领主": [
    {
      "id": "death-guard-p29-0",
      "name": "核心技能",
      "text": "深入打击，领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 29,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 29,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p29-1",
      "name": "剧毒光环",
      "text": "剧毒光环: 此模型领导单位时，该单位远程攻 击可重掷造伤骰",
      "status": "计算支持（满足条件时自动计入）",
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
        "page": 29,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 29,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p29-2",
      "name": "腐败轰炸",
      "text": "腐败轰炸: 你的射击阶段开始时，选择该模型 30寸内可见的一个敌方单位。本阶段内，友方 死亡守卫模型远程攻击该单位时，可重掷命中 1（若用爆炸武器射击，则可重掷所有命中骰）",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "space-hit-reroll",
          "mode": "failed",
          "phase": "ranged"
        }
      ],
      "source": {
        "page": 29,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 29,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "痘疹领主": [
    {
      "id": "death-guard-p30-0",
      "name": "核心技能",
      "text": "领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 30,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 30,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p30-1",
      "name": "疫病馈赠",
      "text": "疫病馈赠: 此模型的【感染】范围增加3寸",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 30,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 30,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p30-2",
      "name": "疾病帷幕",
      "text": "疾病帷幕: 此模型领导单位时，该单位无法被 18寸外的远程攻击选为目标",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 30,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 30,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "恶瘟投放者": [
    {
      "id": "death-guard-p31-0",
      "name": "核心技能",
      "text": "领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 31,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 31,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p31-1",
      "name": "传染馈赠（灵能）",
      "text": "传染馈赠（灵能）: 此模型领导单位时，该单 位内的模型攻击受【感染】敌方单位时获得【连 击1】",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "targetInfected",
          "type": "checkbox",
          "label": "目标已感染"
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
          "requiresTargetInfected": true,
          "requiresJoined": true
        }
      ],
      "source": {
        "page": 31,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 31,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p31-2",
      "name": "疫毒余波（灵能）",
      "text": "疫毒余波（灵能）: 在你的射击阶段，本模型 射击后，选择一个被【瘟疫之风】命中过的敌 方步兵单位，该敌方单位内的模型移动属性 M-2，持续至对手下个回合结束",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 31,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 31,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "剧毒疫病使者": [
    {
      "id": "death-guard-p32-0",
      "name": "核心技能",
      "text": "领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 32,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 32,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p32-1",
      "name": "病态活力",
      "text": "病态活力：此模型领导单位时，该单位内的模 型移动属性M+1，且可重掷加速与冲锋骰",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 32,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 32,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p32-2",
      "name": "苦难丧钟（光环）",
      "text": "苦难丧钟（光环）：敌方指挥阶段的士气测试 环节，该模型9寸内未满编的敌方单位需进行 士气测试，如果该敌方单位是灵能单位则测试 结果-1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 32,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 32,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "生物腐化者": [
    {
      "id": "death-guard-p33-0",
      "name": "核心技能",
      "text": "领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 33,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 33,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p33-1",
      "name": "腐化灌注",
      "text": "腐化灌注: 此模型领导单位时，该单位内的模 型所装备的武器获得【致命一击】，且未修正 的命中骰5+即为暴击命中",
      "status": "计算支持（满足条件时自动计入）",
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
        "page": 33,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 33,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p33-2",
      "name": "新疫萃取",
      "text": "新疫萃取: 该模型领导的单位首次通过近战消 灭敌方单位后，该模型OC值+6（持续到整场 战斗结束）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 33,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 33,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "恶臭病原体": [
    {
      "id": "death-guard-p34-0",
      "name": "核心技能",
      "text": "领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 34,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 34,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p34-1",
      "name": "致盲毒雾",
      "text": "致盲毒雾: 在近战阶段，你可以选择你军队中 的一个具有此能力的模型使用此能力。在该回 合结束前，其领导的单位获得【先攻】能力（每 场战斗每个具有此能力的模型限使用一次本能 力）",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 34,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 34,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p34-2",
      "name": "腐臭恶气",
      "text": "腐臭恶气: 敌方单位无法在该模型的9寸内开 始或结束加速移动",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 34,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 34,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "书记官": [
    {
      "id": "death-guard-p35-0",
      "name": "核心技能",
      "text": "领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 35,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 35,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p35-1",
      "name": "恶意计算",
      "text": "恶意计算: 此模型领导单位时，该单位内的模 型无视对攻击的命中骰与武器技能BS/WS的 修正",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 35,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 35,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p35-2",
      "name": "七重咒语",
      "text": "七重咒语: 在你的指挥阶段，此模型在场时掷 2D6，结果为7+则获得1CP",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 35,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 35,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "瘟疫军医": [
    {
      "id": "death-guard-p36-0",
      "name": "核心技能",
      "text": "领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 36,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 36,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p36-1",
      "name": "污染医典",
      "text": "污染医典: 在你的指挥阶段，如果该模型领导 一个单位，其可复活1个被摧毁的护卫单位模 型",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 36,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 36,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p36-2",
      "name": "感染激化",
      "text": "感染激化: 在近战阶段开始时，选择该模型接 战范围内的一个敌方单位。本阶段内，此模型 攻击该单位时命中5+触发暴击；若该敌方单 位低于其一半的初始数量，则4+触发暴击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 36,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 36,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "死亡守卫持像者": [
    {
      "id": "death-guard-p37-0",
      "name": "核心技能",
      "text": "领袖",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 37,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 37,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p37-1",
      "name": "污秽圣徽",
      "text": "污秽圣徽: 此模型领导单位时，该单位内模型 的OC值+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 37,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 37,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p37-2",
      "name": "疫病赐福圣徽",
      "text": "疫病赐福圣徽: 每场战斗一次，在任意阶段开 始时，选择该模型12寸内士气崩溃的友方死 亡守卫单位，立即解除其士气崩溃状态",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 37,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 37,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "瘟疫战士": [
    {
      "id": "death-guard-p38-0",
      "name": "纳垢赐福灌注",
      "text": "纳垢赐福灌注: 在你的射击阶段，选择一个被 此单位射击攻击命中过的敌方单位，其视为受 【感染】。【感染】持续到你的下个回合开始",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 38,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 38,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p38-1",
      "name": "绝望圣徽（光环）",
      "text": "绝望圣徽（光环）:在该徽记持有者 6寸内的 敌方单位领导力LD-1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 38,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 38,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "瘟疫行者": [
    {
      "id": "death-guard-p40-0",
      "name": "核心技能",
      "text": "渗透，不知疼痛5+",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "fnp",
          "threshold": 5
        }
      ],
      "source": {
        "page": 40,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 40,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p40-1",
      "name": "行走瘟疫诅咒",
      "text": "行走瘟疫诅咒: 此单位中的瘟疫行者通过攻击 （非凶兽/载具目标）每摧毁1个敌方模型，可 在该单位攻击结算后，复活1个被摧毁的瘟疫 行者模型。当泰丰斯领导该单位时，被泰丰斯 【噬体瘟疫】能力消灭的敌方模型视为瘟疫行 者击杀，可触发复活效果",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 40,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 40,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "腐毒领主终结者": [
    {
      "id": "death-guard-p41-0",
      "name": "核心技能",
      "text": "深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 41,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 41,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p41-1",
      "name": "炽烈连射",
      "text": "炽烈连射：若此单位的初始数量不低于5，或 有角色领导此单位。则每当此单位中的模型对 受【感染】单位进行远程攻击时，该攻击的力 量S与穿甲值AP各+1",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        },
        {
          "id": "targetInfected",
          "type": "checkbox",
          "label": "目标已感染"
        },
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "weapon-strength-modifier",
          "value": 1,
          "condition": "large-or-led",
          "requiresTargetInfected": true
        },
        {
          "type": "weapon-ap-modifier",
          "value": 1,
          "condition": "large-or-led",
          "requiresTargetInfected": true
        }
      ],
      "source": {
        "page": 41,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 41,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "死亡寿衣终结者": [
    {
      "id": "death-guard-p42-0",
      "name": "核心技能",
      "text": "深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 42,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 42,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p42-1",
      "name": "无声护卫",
      "text": "无声护卫:当有角色领导此单位时，该角色获得 “不知疼痛4+”",
      "status": "计算支持（满足条件时自动计入）",
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
        "page": 42,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 42,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p42-2",
      "name": "死亡降临",
      "text": "死亡降临: 在己方移动阶段，在该单位通过深 入打击部署时，可部署至任意受【感染】敌方 单位水平6寸外，以及所有其他敌方单位水平 9寸外的位置",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 42,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 42,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p42-3",
      "name": "绝望圣徽（光环）",
      "text": "绝望圣徽（光环）: 该模型6寸内的敌方单位 领导力LD-1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 42,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 42,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "纳垢混沌魔物": [
    {
      "id": "death-guard-p43-0",
      "name": "核心技能",
      "text": "致命破灭1，不知疼痛5+，斥候6",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "fnp",
          "threshold": 5
        }
      ],
      "source": {
        "page": 43,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 43,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p43-1",
      "name": "致命脓液",
      "text": "致命脓液: 当敌方单位对该单位内的模型分配 近战攻击并结算完成后，为每个攻击过的敌方 单位做测试（每个敌方单位每次最多进行6次 测试），每有一个4+的结果则对该敌方单位 造成1点致命伤害",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 43,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 43,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "恶臭肿胀机兵": [
    {
      "id": "death-guard-p44-0",
      "name": "核心技能",
      "text": "致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 44,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 44,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p44-1",
      "name": "悬停死亡",
      "text": "悬停死亡：此模型在撤退后仍可射击并宣告冲 锋",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 44,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 44,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "装备重型凋零榴弹炮的恶臭肿胀机兵": [
    {
      "id": "death-guard-p45-0",
      "name": "核心技能",
      "text": "致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 45,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 45,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p45-1",
      "name": "爆炸枯萎",
      "text": "爆炸枯萎：在你的射击阶段，每当此模型的攻 击消灭一个敌方单位时，在移除该单位最后一 个模型前，投掷D6（若该单位为受【感染】则 结果+1）。若结果为5+，该模型6寸内的所 有敌方单位将受【感染】，持续直至你的下个 回合开始",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 45,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 45,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "恶臭疫病引擎": [
    {
      "id": "death-guard-p46-0",
      "name": "核心技能",
      "text": "致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 46,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 46,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p46-1",
      "name": "坦克猎手（TankHunters）",
      "text": "坦克猎手（TankHunters）: 在你的射击阶段， 该模型攻击凶兽或载具时，命中与造伤骰结果 各+1",
      "status": "计算支持（满足条件时自动计入）",
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
          "value": 1,
          "requiresTargetMonsterVehicle": true
        },
        {
          "type": "wound-modifier",
          "value": 1,
          "requiresTargetMonsterVehicle": true
        }
      ],
      "source": {
        "page": 46,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 46,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "瘟爆履带战车": [
    {
      "id": "death-guard-p47-0",
      "name": "核心技能",
      "text": "致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 47,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 47,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p47-1",
      "name": "孢子冲击波",
      "text": "孢子冲击波：在你的射击阶段，每当为此模型 的瘟爆迫击炮选择目标时，为目标单位及目标 单位3寸内的所有其他敌方单位各投掷D6（若 被投掷单位受【感染】则结果+1）。结果为 6+时，被投掷单位将受孢子冲击；在对目标单 位的所有攻击结算后，每个受孢子冲击的单位 承受D3点致命伤害",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 47,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 47,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p47-2",
      "name": "严重损伤",
      "text": "严重损伤：当此模型W剩余1-4时，每次进行 攻击命中结果-1",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 47,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 47,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "地狱兽": [
    {
      "id": "death-guard-p48-0",
      "name": "核心技能",
      "text": "致命破灭1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 48,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 48,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p48-1",
      "name": "疫病恶意",
      "text": "疫病恶意：此模型攻击受【感染】的敌方单位 时，造伤结果+1",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "wound-modifier",
          "value": 1
        }
      ],
      "source": {
        "page": 48,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 48,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p48-2",
      "name": "溅沫狂怒",
      "text": "溅沫狂怒：若此模型除近战武器外只装备了两 把近战装备，则这两把近战装备的攻击次数 A+2",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "attack-modifier",
          "value": 2
        }
      ],
      "source": {
        "page": 48,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 48,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "混沌歼灭者型掠食者战车": [
    {
      "id": "death-guard-p50-0",
      "name": "核心技能",
      "text": "致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 50,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 50,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p50-1",
      "name": "金属吞噬感染",
      "text": "金属吞噬感染：在你的射击阶段，此模型完成 攻击后，选择一个被其攻击命中过的敌方凶兽 或载具单位。投掷D6（若该单位受【感染】 则结果+1）：结果为5+时，该敌方单位承受 D3点致命伤害",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 50,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 50,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p50-2",
      "name": "严重损伤",
      "text": "严重损伤：当此模型W剩余1-4时，每次进 行攻击命中结果-1",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 50,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 50,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "混沌破坏者型掠食者战车": [
    {
      "id": "death-guard-p51-0",
      "name": "核心技能",
      "text": "致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 51,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 51,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p51-1",
      "name": "腐蚀疫病之雨",
      "text": "腐蚀疫病之雨：在你的射击阶段，此模型完成 攻击后，选择一个被其攻击命中过的敌方单位 （凶兽与载具除外）。直至该阶段结束，每当 友方死亡守卫单位对该目标进行远程攻击时， 该攻击的装甲穿透值AP+1。同一敌方单位每 阶段仅能受此能力影响一次",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 51,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 51,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p51-2",
      "name": "严重损伤",
      "text": "严重损伤：当此模型W剩余 1-4时，每次进 行攻击命中结果-1",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 4
        }
      ],
      "source": {
        "page": 51,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 51,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "混沌犀牛战车": [
    {
      "id": "death-guard-p52-0",
      "name": "核心技能",
      "text": "致命破灭D3，火力平台2",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 52,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 52,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p52-1",
      "name": "火力支援",
      "text": "火力支援：在你的射击阶段，此模型完成射击 攻击后，选择一个被其攻击命中过的敌方单 位。直至该阶段结束，每当本回合从此运输单 位下车的友方模型对该敌方目标进行攻击时， 可重投造伤结果",
      "status": "计算支持（满足条件时自动计入）",
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
          "mode": "failed",
          "phase": "ranged"
        },
        {
          "type": "space-wound-reroll",
          "mode": "failed",
          "phase": "ranged"
        }
      ],
      "source": {
        "page": 52,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 52,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p52-2",
      "name": "运输载具",
      "text": "运输载具：此模型可运输12名死亡守卫步兵 模型，不可运输终结者单位",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 52,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 52,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "混沌兰德掠袭者战车": [
    {
      "id": "death-guard-p53-0",
      "name": "核心技能",
      "text": "致命破灭D6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 53,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 53,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p53-1",
      "name": "突击跳板",
      "text": "突击跳板：此模型完成常规移动后，其内乘坐 的单位在下车后仍可在本回合宣告冲锋",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 53,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 53,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p53-2",
      "name": "严重损伤",
      "text": "严重损伤：当此模型W剩余1-5时，每次进 行攻击命中结果-1",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 5
        }
      ],
      "source": {
        "page": 53,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 53,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p53-3",
      "name": "运输载具",
      "text": "运输载具：此模型可运输14名死亡守卫步兵 模型。每名终结者模型占据2个运输位",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 53,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 53,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "污染者": [
    {
      "id": "death-guard-p54-0",
      "name": "核心技能",
      "text": "致命破灭D6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 54,
        "source": {
          "file": "用户提供的最新污染者数据卡图片",
          "page": 54,
          "extraction": "image-manual-check"
        }
      }
    },
    {
      "id": "death-guard-p54-1",
      "name": "疾行机甲",
      "text": "疾行机甲：每当该单位进行常规移动、突进或后撤时，该单位可以穿过模型（巨型模型除外）和地形模型。当这样做时，该单位可以在敌方模型的交战范围内进行移动，但是不能在敌方模型的交战范围内结束移动，并且自动通过任何溃逃测试。",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 54,
        "source": {
          "file": "用户提供的最新污染者数据卡图片",
          "page": 54,
          "extraction": "image-manual-check"
        }
      }
    },
    {
      "id": "death-guard-p54-2",
      "name": "污秽轰炸",
      "text": "污秽轰炸：在你的射击阶段中，在该模型进行射击后，选择一个被那些攻击中一次或多次命中的敌方单位。在该阶段结束前，那个单位不能获得掩体加成。",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 54,
        "source": {
          "file": "用户提供的最新污染者数据卡图片",
          "page": 54,
          "extraction": "image-manual-check"
        }
      }
    },
    {
      "id": "death-guard-p54-3",
      "name": "受损",
      "text": "受损：剩余1-6点耐伤：当该模型剩余1-6点伤时，模型攻击的命中掷骰结果减1。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 6
        }
      ],
      "source": {
        "page": 54,
        "source": {
          "file": "用户提供的最新污染者数据卡图片",
          "page": 54,
          "extraction": "image-manual-check"
        }
      }
    }
  ],
  "瘴毒机": [
    {
      "id": "death-guard-p56-0",
      "name": "核心技能",
      "text": "致命破灭D3",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 56,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 56,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p56-1",
      "name": "腐败浓雾",
      "text": "腐败浓雾：敌方通过增援部署的单位不可部署 在此模型12寸范围内",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 56,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 56,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p56-2",
      "name": "疫病掩体",
      "text": "疫病掩体：若攻击单位因本堡垒而无法完全观 察目标模型，则被攻击模型获得掩体加成",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 56,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 56,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p56-3",
      "name": "堡垒特性",
      "text": "堡垒特性：当敌方单位仅与本方堡垒接触时 ▪ 仍可被远程攻击，但非手枪类武器攻击命 中结果-1 ▪ 陷入战斗震撼时撤退无需【绝望逃脱测 试】（需穿越敌方单位的情况除外）",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "incoming-hit-minus",
          "value": 1,
          "phase": "ranged"
        }
      ],
      "source": {
        "page": 56,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 56,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "大不净者": [
    {
      "id": "death-guard-p57-0",
      "name": "阵营",
      "text": "阵营：腐朽契约",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 57,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 57,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p57-1",
      "name": "技能2",
      "text": "致命破灭D6，深入打击，不知疼痛6+",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "fnp",
          "threshold": 6
        }
      ],
      "source": {
        "page": 57,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 57,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p57-2",
      "name": "纳垢恶魔领主（光环）",
      "text": "纳垢恶魔领主（光环）：6寸内的友方瘟疫军 团单位模型，其韧性值T+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 57,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 57,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p57-3",
      "name": "纳垢之腐（灵能）",
      "text": "纳垢之腐（灵能）：在你的移动阶段结束时， 选择12寸内一个敌方单位，直到下个移动阶 段开始前，该单位陷入腐烂状态。腐烂单位模 型的韧性值T-1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 57,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 57,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p57-4",
      "name": "严重损伤",
      "text": "严重损伤：当此模型W剩余1-7点时，每次攻 击的命中结果-1",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 7
        }
      ],
      "source": {
        "page": 57,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 57,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "烂格斯": [
    {
      "id": "death-guard-p58-0",
      "name": "阵营",
      "text": "阵营：腐朽契约",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 58,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 58,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p58-1",
      "name": "技能2",
      "text": "致命破灭D6，深入打击，不知疼痛6+",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "fnp",
          "threshold": 6
        }
      ],
      "source": {
        "page": 58,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 58,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p58-2",
      "name": "剧毒赐福（灵能）",
      "text": "剧毒赐福（灵能）：战斗阶段开始时，选择该 模型24寸内可见的敌方单位。本阶段内，瘟 疫军团单位攻击该单位时伤害值D+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 58,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 58,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p58-3",
      "name": "纳垢洪流（光环）",
      "text": "纳垢洪流（光环）：该模型6寸内敌方单位移 动值M-2，目标控制值OC-1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 58,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 58,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p58-4",
      "name": "严重损伤",
      "text": "严重损伤：当此模型W剩余1-7时，每次攻击 命中结果-1",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "damaged-hit-minus",
          "threshold": 7
        }
      ],
      "source": {
        "page": 58,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 58,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "纳垢灵": [
    {
      "id": "death-guard-p59-0",
      "name": "阵营",
      "text": "阵营：腐朽契约",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 59,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 59,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p59-1",
      "name": "技能2",
      "text": "深入打击，渗透",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 59,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 59,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p59-2",
      "name": "恶作剧制造者",
      "text": "恶作剧制造者：每当一个与具备此能力的单位 处于交战距离内的敌方单位（泰坦级单位除外） 被选择攻击时，在该阶段剩余时间内，该敌方 单位模型的近战攻击命中结果-1",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "hit-modifier",
          "value": -1,
          "phase": "melee"
        },
        {
          "type": "incoming-hit-minus",
          "value": 1,
          "phase": "melee"
        }
      ],
      "source": {
        "page": 59,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 59,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "纳垢野兽": [
    {
      "id": "death-guard-p60-0",
      "name": "阵营",
      "text": "阵营：腐朽契约",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 60,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 60,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p60-1",
      "name": "技能2",
      "text": "致命破灭1，深入打击，斥候6",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 60,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 60,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p60-2",
      "name": "怪异再生",
      "text": "怪异再生：在每阶段结束时，若此单位中的模 型失去生命值但未被摧毁，则该模型恢复所有 已失去的生命值",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 60,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 60,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "负瘟者": [
    {
      "id": "death-guard-p61-0",
      "name": "阵营",
      "text": "阵营：腐朽契约",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 61,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 61,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p61-1",
      "name": "技能2",
      "text": "深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 61,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 61,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p61-2",
      "name": "感染爆发",
      "text": "感染爆发：在你的指挥阶段结束时，若此单位 处于你控制的目标点范围内，则该目标点保持 由你控制，直到对手在任意阶段结束时对该目 标点的控制等级超过你",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 61,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 61,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p61-3",
      "name": "恶魔图腾",
      "text": "恶魔图腾：装备此图腾的单位领导力LD变为 6+",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 61,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 61,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p61-4",
      "name": "混沌乐器",
      "text": "混沌乐器：装备此乐器的单位冲锋结果+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 61,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 61,
          "extraction": "visual-table-check"
        }
      }
    }
  ],
  "瘟疫蜂兵": [
    {
      "id": "death-guard-p62-0",
      "name": "阵营",
      "text": "阵营：腐朽契约",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 62,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 62,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p62-1",
      "name": "技能2",
      "text": "深入打击",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 62,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 62,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p62-2",
      "name": "死亡颅弹",
      "text": "死亡颅弹：在你的射击阶段，此单位完成攻击 后，选择一个被其攻击命中的敌方单位。直到 回合结束，友方瘟疫军团单位攻击该目标时， 可重掷造伤结果",
      "status": "计算支持（满足条件时自动计入）",
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
          "mode": "failed",
          "phase": "ranged"
        },
        {
          "type": "space-wound-reroll",
          "mode": "failed",
          "phase": "ranged"
        }
      ],
      "source": {
        "page": 62,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 62,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p62-3",
      "name": "恶魔图腾",
      "text": "恶魔图腾：装备此图腾的单位领导力LD变为 6+",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 62,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 62,
          "extraction": "visual-table-check"
        }
      }
    },
    {
      "id": "death-guard-p62-4",
      "name": "混沌乐器",
      "text": "混沌乐器：装备此乐器的单位冲锋结果+1",
      "status": "已显示，暂不改变本次骰子",
      "source": {
        "page": 62,
        "source": {
          "file": "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
          "page": 62,
          "extraction": "visual-table-check"
        }
      }
    }
  ]
};
  root.WarhammerDeathGuardRules = { factionRules, unitRules };
})(typeof globalThis === "undefined" ? this : globalThis);
