/* Generated source-text rule package for tyranids. */
(function (root) {
  root["WarhammerWebsiteRules_tyranids"] = {
  "factionRules": [
    {
      "id": "tyranids.army-rule",
      "name": "节点生物",
      "englishName": "Synapse",
      "text": "突触\n\n如果您的军队阵营是泰伦虫族，当一个己方泰伦虫族单位位于一个或更多己方突触模型的 6\" 内时，那个泰伦虫族单位位于那个模型以及己方军队的突触范围内。当一个己方军队中的泰伦虫族单位位于己方军队的突触范围内时：\n\n■ 每当那个单位进行战斗震慑测试时，掷 3D6 而不是 2D6。\n■ 每当那个单位中的模型进行近战攻击时，那次攻击的力量属性提升 1 点。\n\n亚空间阴影\n\n如果您的军队阵营是泰伦虫族，那麽每场战斗限一次，在任意玩家的指挥阶段中，如果有一个或更多拥有该技能的己方单位位于战场，那麽您可以释放亚空间阴影。若这麽做，那麽战场上每一个敌方单位都必须进行一次战斗震慑测试。在进行这次战斗震慑测试时，如果一个敌方单位位于一个或更多己方突触单位的 6\" 内，那麽那个单位进行的那次测试的结果减少 1 点。",
      "category": "faction",
      "status": "计算支持（满足原文条件时勾选）",
      "controls": [
        {
          "id": "inSynapse",
          "type": "checkbox",
          "label": "本单位位于己方突触范围内"
        }
      ],
      "effects": [
        {
          "type": "weapon-strength-modifier",
          "value": 1,
          "phase": "melee",
          "selection": {
            "controlId": "inSynapse",
            "equals": true
          }
        }
      ],
      "source": {
        "englishName": "Synapse",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "掷弹虫": [
      {
        "id": "unique-disruption-bombardment",
        "name": "干扰轰炸",
        "text": "在你的射击阶段中，此单位射击后，选择被其中一次或多次攻击击中的一个敌方 **步兵(Infantry)** 单位。直到你对手的下一个回合结束前，该敌方单位处于混乱状态。当单位处于混乱状态时，从其移动特性减去 2，且为其进行的前进和冲锋掷骰减去 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Disruption Bombardment",
          "kind": "unique"
        }
      }
    ],
    "吐菌虫": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭 1",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1",
          "kind": "core"
        }
      },
      {
        "id": "unique-seed-spore-mines",
        "name": "孢子地雷播种",
        "text": "每轮一次，在你的射击阶段中，当该单位被选择进行射击时，具有此能力的一支单位可以改为使用此能力，而非使用其远程武器进行任何攻击。若该单位如此选择，你可以向你的军队中新增一支**孢子地雷**单位，并将其设置在距此单位 48\" 内且距所有敌方单位横向超过 8\" 的战场任何位置。该**孢子地雷**单位内含的模型数量等同于此单位中的模型数量。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Seed Spore Mines",
          "kind": "unique"
        }
      }
    ],
    "族群领主": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "core-scouts-8",
        "name": "斥候8",
        "text": "某些单位的能力中列有「斥候x\"」。若单位中的每个模型都有此能力，则在首场战斗回合开始时、首轮开始前，它可以进行一次常规移动，距离不超过x\"，如同在你的移动阶段——任何此单位开战时已搭乘的 **专用运输工具(Dedicated Transport)** 模型也可以如此移动（前提是仅有具此能力的模型搭乘于该 **专用运输工具(Dedicated Transport)** 模型内）。使用此能力移动的单位，其移动必须终止于距离所有敌方模型9\"以上的位置。若双方都有能进行此动作的单位，进行首轮的玩家先移动他们的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 8\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-vicious-insight",
        "name": "阴险洞察",
        "text": "当此模型领导一个单位时，该单位中的模型配备的武器具有 **[毁灭伤害]** 能力。",
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
            "type": "devastating-wounds",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Vicious Insight",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hypnotic-gaze",
        "name": "催眠凝视【灵能】",
        "text": "在近战阶段开始时，选择一个在此模型交战范围内的敌方单位。至该阶段结束为止，该单位中的每个模型每次发动攻击时，命中掷骰 -1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hypnotic Gaze",
          "kind": "unique"
        }
      }
    ],
    "刽子手": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭1",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1",
          "kind": "core"
        }
      },
      {
        "id": "unique-blistering-assault",
        "name": "怒火冲击",
        "text": "每当敌方单位被选择进行射击后，若此单位中有任何模型因该些攻击而丧失1个或以上的伤时，此单位可进行「刺激冲击」移动。若进行该移动，掷1个D6，并将结果加2：此单位中的每个模型可移动之距离（英寸）最多为该结果，但此单位必须完成该移动并尽可能靠近最近的敌方单位。进行移动时，这些模型可在敌方单位的交战范围内移动。每个单位每个阶段最多只能进行一次「刺激冲击」移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blistering Assault",
          "kind": "unique"
        }
      }
    ],
    "死亡跳跃者": [
      {
        "id": "core-fights-first",
        "name": "先攻",
        "text": "拥有此能力的单位，若有资格战斗，且该单位中的所有模型都拥有此能力，则在先制攻击步骤中进行战斗。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fights First",
          "kind": "core"
        }
      },
      {
        "id": "core-infiltrators",
        "name": "渗透",
        "text": "于部署时，若单位中的每个模型都具有此能力，则当你部署该单位时，可以将其部署在战场上的任何位置，该位置距敌军部署区域超过8\"，且距所有敌军模型超过8\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infiltrators",
          "kind": "core"
        }
      },
      {
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "除非此单位为联合单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lone Operative",
          "kind": "core"
        }
      },
      {
        "id": "core-stealth",
        "name": "隐蔽",
        "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
        "status": "计算支持（被动效果自动计入）",
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
        "id": "unique-feeder-tendrils",
        "name": "觅食触须",
        "text": "每次此模型摧毁一个敌方 **角色(Character)** 模型时，获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Feeder Tendrils",
          "kind": "unique"
        }
      },
      {
        "id": "unique-fear-of-the-unseen",
        "name": "未知恐怖【光环】",
        "text": "当敌方单位位于此模型 6\" 内时，恶化该单位中的模型的领导力特性 1。此外，在你的对手的指挥阶段的战斗震慑步骤中，若该敌方单位低于其起始兵力，它必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fear of the Unseen",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hunter-organism",
        "name": "猎手生物体",
        "text": "此模型不能作为你的统帅(Warlord)。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hunter Organism",
          "kind": "unique"
        }
      }
    ],
    "离子炮兽": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-symbiotic-targeting",
        "name": "生物体瞄准",
        "text": "在你的射击阶段中，此模型开火后，选择1个敌方单位被该些攻击命中一次或多次。直到该阶段结束为止，友军**泰伦虫族(Tyranids)**模型每次对该单位发动攻击时，可重掷命中掷骰结果为1。",
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
          "englishName": "Symbiotic Targeting",
          "kind": "unique"
        }
      }
    ],
    "石像鬼": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-winged-swarm",
        "name": "天空虫群",
        "text": "在你的射击阶段，在此单位射击后，如果它不在任何敌方单位的交战范围内，它可进行常规移动最多 6\"。若此单位进行，直到回合结束时，此单位无法宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Winged Swarm",
          "kind": "unique"
        }
      }
    ],
    "基因窃取者": [
      {
        "id": "core-scouts-8",
        "name": "斥候8",
        "text": "某些单位的能力中列有「斥候x\"」。若单位中的每个模型都有此能力，则在首场战斗回合开始时、首轮开始前，它可以进行一次常规移动，距离不超过x\"，如同在你的移动阶段——任何此单位开战时已搭乘的 **专用运输工具(Dedicated Transport)** 模型也可以如此移动（前提是仅有具此能力的模型搭乘于该 **专用运输工具(Dedicated Transport)** 模型内）。使用此能力移动的单位，其移动必须终止于距离所有敌方模型9\"以上的位置。若双方都有能进行此动作的单位，进行首轮的玩家先移动他们的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 8\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-vanguard-predator",
        "name": "伏击猎手",
        "text": "此单位中的每个模型发动攻击时，重掷结果为 1 的命中掷骰 的结果。若目标在一个或多个目标标记的范围内，亦重掷结果为 1 的致伤掷骰 的结果。",
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
          },
          {
            "type": "wound-reroll",
            "mode": "ones"
          }
        ],
        "source": {
          "englishName": "Vanguard Predator",
          "kind": "unique"
        }
      }
    ],
    "天妖": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-spore-mine-cysts",
        "name": "散布孢子雷",
        "text": "在你对手的近战阶段结束时，你可以进行以下其中一项：\n■ 选择此单位 24\" 内一个可见的敌方单位（**独行特工** 单位除外），并为该单位掷 6 枚 D6：每掷出 3+，该单位受到 1 点致命伤。\n■ 为你的军队新增一个 **孢子地雷(Spore Mines)** 单位（含 D3 个模型），并将其设置于此模型 6\" 内、且距所有敌方单位横向超过 8\" 的战场任一处。每回合最多只能为一个模型选择此选项。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Spore Mine Cysts",
          "kind": "unique"
        }
      }
    ],
    "巨噬兽": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-grisly-spectacle",
        "name": "骇人场景",
        "text": "此模型每次被选择进行战斗时，解决完其攻击后，如果该攻击摧毁了一个或多个敌方单位，此模型 6\" 范围内的每个敌方单位必须进行「战斗震慑」测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grisly Spectacle",
          "kind": "unique"
        }
      }
    ],
    "悍妪兽": [
      {
        "id": "core-deadly-demise-2d6",
        "name": "致命破灭 2",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 2D6",
          "kind": "core"
        }
      },
      {
        "id": "core-hover",
        "name": "悬停",
        "text": "部分 **飞行器(Aircraft)** 模型在其能力中列有「悬停」。当你被指示宣告战斗阵容时，首先必须宣告你的军队中哪些具有此能力的模型将处于悬停模式。若一个模型处于悬停模式，则直到战役结束，其移动特性变更为 20\"，失去 **飞行器(Aircraft)** 关键字，且失去所有与作为 **飞行器(Aircraft)** 模型相关的规则。处于悬停模式的模型不在增援中开始战役，但你可以选择按正常规则将其置入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hover",
          "kind": "core"
        }
      },
      {
        "id": "unique-frenzied-metabolism",
        "name": "狂暴代谢",
        "text": "此模型每次被选中射击时，可使用此能力。若如此做，直到该阶段结束，此模型每次发动攻击时，于致伤掷骰上加1。在解决这些攻击后，掷一次D6：若掷出2+，此模型承受D3点致命伤。",
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
          "englishName": "Frenzied Metabolism",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输能力",
        "text": "该模型能够搭载 20 个石像鬼模型和 1 有翼泰伦王虫模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "天巫": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-airborne-predator",
        "name": "空中掠食者",
        "text": "每次此模型进行指向具有 **飞行(Fly)** 能力的单位的远程攻击时，于命中掷骰中加 1。",
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
          "englishName": "Airborne Predator",
          "kind": "unique"
        }
      }
    ],
    "虫巢护卫": [
      {
        "id": "unique-defensive-stance",
        "name": "防御站位",
        "text": "每次你以《警戒射击》计谋指定此单位为目标时，在该计谋的结决中，以未修正的命中掷骰为 5+ 时视为命中；若此单位在你控制的目标标记范围内，则以未修正的命中掷骰为 4+ 时视为命中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Defensive Stance",
          "kind": "unique"
        }
      }
    ],
    "虫巢暴君": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-will-of-the-hive-mind",
        "name": "蜂巢心智意志",
        "text": "每战斗回合一次，你的军队中具有此能力的一个模型可在己方 **泰伦虫族(Tyranids)** 单位在距该模型 12\" 内被计谋目标时使用此能力。若其如此做，将该次计谋的 CP 消耗减少 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Will of the Hive Mind",
          "kind": "unique"
        }
      },
      {
        "id": "unique-onslaught",
        "name": "猛攻",
        "text": "友军**泰伦虫族(Tyranids)**单位在此模型6\"内时，该单位中模型配备的远程武器具有**[突击]**与**[致命一击]**能力。",
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
          "englishName": "Onslaught",
          "kind": "unique"
        }
      }
    ],
    "圣师兽": [
      {
        "id": "core-deadly-demise-2d6",
        "name": "致命破灭 2",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 2D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-apex-beast",
        "name": "巅峰之兽",
        "text": "此模型每次对 **战斗震慑** 状态下的单位发动攻击时，命中掷骰 +1。",
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
          "englishName": "Apex-beast",
          "kind": "unique"
        }
      },
      {
        "id": "unique-stalking-forward",
        "name": "缓步前行",
        "text": "每次此模型进行常规、前进或后撤移动时，它可越过高度 4\" 或以下的模型（**巨型(Titanic)**模型除外）和地形特征，如同它们不存在一样。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Stalking Forward",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输能力",
        "text": "该模型能够搭载 20 个泰伦虫族步兵模型。每个耐受值大于 1 的模型占用 3 个模型的空间。该模型不能搭载具有以下能力的模型:FLY。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "刀虫": [
      {
        "id": "unique-bounding-leap",
        "name": "跳跃腾挪",
        "text": "此单位在已进行快速前进的回合中仍可宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bounding Leap",
          "kind": "unique"
        }
      }
    ],
    "超适应蛇虫": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-alpha-invader",
        "name": "先锋入侵者",
        "text": "此单位内模型配备的武器拥有 **[连击 1]** 能力。",
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
          "englishName": "Alpha Invader",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hypersensory-array",
        "name": "超感官阵列",
        "text": "每战斗回合一次，你可以用「迅速入场」或「英勇介入」计谋以此单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做：\n■ 该次使用减少 1 指令点。\n■ 该次使用不会阻止本阶段该计谋用于其他单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hypersensory Array",
          "kind": "unique"
        }
      }
    ],
    "刀斧虫": [
      {
        "id": "core-fights-first",
        "name": "先攻",
        "text": "拥有此能力的单位，若有资格战斗，且该单位中的所有模型都拥有此能力，则在先制攻击步骤中进行战斗。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fights First",
          "kind": "core"
        }
      },
      {
        "id": "core-infiltrators",
        "name": "渗透",
        "text": "于部署时，若单位中的每个模型都具有此能力，则当你部署该单位时，可以将其部署在战场上的任何位置，该位置距敌军部署区域超过8\"，且距所有敌军模型超过8\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infiltrators",
          "kind": "core"
        }
      },
      {
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "除非此单位为联合单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lone Operative",
          "kind": "core"
        }
      },
      {
        "id": "core-stealth",
        "name": "隐蔽",
        "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
        "status": "计算支持（被动效果自动计入）",
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
        "id": "unique-feeder-tendrils",
        "name": "觅食触须",
        "text": "此模型每次摧毁一个敌方 **角色(Character)** 模型时，你获得 1 指令点数。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Feeder Tendrils",
          "kind": "unique"
        }
      },
      {
        "id": "unique-pheromone-trail",
        "name": "费洛蒙追踪",
        "text": "每战斗回合一次，你可用迅速入场计谋以 0CP 的代价以此能力为目标选择一个模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Pheromone Trail",
          "kind": "unique"
        }
      }
    ],
    "灵脑兽": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-encephalic-diffusion",
        "name": "灵能蔓延【光环，灵能】",
        "text": "当敌方单位位于此模型6\"内时，该单位中每个模型发动的攻击命中掷骰-1，且若该敌方单位低于半数，致伤掷骰亦-1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Encephalic Diffusion",
          "kind": "unique"
        }
      }
    ],
    "沙蟒": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-terror-from-the-deep",
        "name": "深渊恐怖",
        "text": "每次此模型使用深入打击能力在战场上部署时，为此模型 12\" 内的各敌方单位掷一次 D6：掷骰结果 2-4 时，该单位受 D3 点致命伤；掷骰结果 5+ 时，该单位受 3 点致命伤且必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Terror From The Deep",
          "kind": "unique"
        }
      }
    ],
    "黏液孢子": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-bio-minefield",
        "name": "生物地雷",
        "text": "敌方单位无法在此单位6\"范围内开始或结束推进移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bio-minefield",
          "kind": "unique"
        }
      },
      {
        "id": "unique-floating-death",
        "name": "漂浮死神",
        "text": "此单位或敌方单位每次完成移动时，对于此单位中在距离敌方单位 3\" 内的每个模型，选择一个敌方单位。该模型被摧毁，然后掷一次 D6：若掷出 2-5，该敌方单位受到 D3 点致命伤；若掷出 6，该敌方单位受到 D6 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Floating Death",
          "kind": "unique"
        }
      }
    ],
    "神经虫": [
      {
        "id": "unique-neurocytes",
        "name": "神经细胞",
        "text": "当此单位在己方 **泰伦虫族(Tyranids)** 单位（不包括 **神经独立体** 单位）的突触范围内时，它具有 **神经元统御** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Neurocytes",
          "kind": "unique"
        }
      }
    ],
    "神经利卡特": [
      {
        "id": "core-infiltrators",
        "name": "渗透",
        "text": "于部署时，若单位中的每个模型都具有此能力，则当你部署该单位时，可以将其部署在战场上的任何位置，该位置距敌军部署区域超过8\"，且距所有敌军模型超过8\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infiltrators",
          "kind": "core"
        }
      },
      {
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "除非此单位为联合单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lone Operative",
          "kind": "core"
        }
      },
      {
        "id": "core-stealth",
        "name": "隐蔽",
        "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
        "status": "计算支持（被动效果自动计入）",
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
        "id": "unique-feeder-tendrils",
        "name": "觅食触须",
        "text": "此模型每次摧毁一个敌方 **角色(Character)** 模型时，你获得 1 指令点数。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Feeder Tendrils",
          "kind": "unique"
        }
      },
      {
        "id": "unique-neural-disruption",
        "name": "精神扰乱",
        "text": "在你的指挥阶段，选择距此模型12\"以内的一个敌方单位。该单位必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Neural Disruption",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychological-saboteur",
        "name": "心灵破坏者【光环】",
        "text": "当敌方单位在此模型 12\" 范围内且该单位被战斗震慑时：\n■ 该单位中每个模型进行攻击时，从命中掷骰中减少 1。\n■ 每当己方 **泰伦虫族(Tyranids)** 模型进行针对该单位的攻击时，为致伤掷骰加上 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Psychological Saboteur",
          "kind": "unique"
        }
      }
    ],
    "脑虫暴君": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-node-lash",
        "name": "节点冲击【灵能】",
        "text": "当此模型领导一个单位时，该单位中的模型每次发动攻击时，命中掷骰 +1。若目标处于战斗震慑状态，亦致伤掷骰 +1。",
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
            "type": "hit-modifier",
            "value": 1,
            "requiresJoined": true,
            "effectScope": "unit"
          },
          {
            "type": "wound-modifier",
            "value": 1,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Node Lash",
          "kind": "unique"
        }
      },
      {
        "id": "unique-psychic-terror",
        "name": "灵能恐惧【灵能】",
        "text": "若你的军队中有一个或多个神经元统御者在战场上，当你释放亚空间阴影时，战场上每个敌方单位必须进行的战斗震慑测试减少 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Psychic Terror",
          "kind": "unique"
        }
      },
      {
        "id": "unique-neuroloids",
        "name": "节点中续",
        "text": "在你的指挥阶段，你可选择此单位模型18\"内最多两个己方 **泰伦虫族(Tyranids)** 单位。直到你下一个指挥阶段开始，所选单位始终视为在你的军队的突触范围内。\n\n**设计者注记：**：在每个被选中的单位旁放置一个神经菌核代币以提醒你。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Neuroloids",
          "kind": "unique"
        }
      }
    ],
    "诺恩同化者": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-singular-purpose",
        "name": "虫群使命",
        "text": "在第一个战斗回合开始时，选择以下之一：\n\n■ 选择一个敌方单位。直到战斗结束，此模型每次对该单位发动攻击时，可重掷命中掷骰且可重掷致伤掷骰。\n■ 选择一个目标标记。直到战斗结束，此模型在该目标标记的范围内时，具有「不觉疼痛5+」能力和「目标控制」特性值 15。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Singular Purpose",
          "kind": "unique"
        }
      },
      {
        "id": "unique-harpoon-barbs",
        "name": "毒刺倒钩",
        "text": "每回合一次，当敌方单位在此模型的交战范围内被选择后撤时，掷一次 D6：若为 2+，该单位承受 D6 道致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Harpoon Barbs",
          "kind": "unique"
        }
      }
    ],
    "诺恩使者": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-singular-purpose",
        "name": "虫群使命",
        "text": "在第一个战斗回合开始时，选择以下之一：\n\n■ 选择一个敌方单位。直到战斗结束，此模型每次对该单位发动攻击时，可重掷命中掷骰且可重掷致伤掷骰。\n■ 选择一个目标标记。直到战斗结束，此模型在该目标标记的范围内时，具有「不觉疼痛5+」能力和「目标控制」特性值 15。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Singular Purpose",
          "kind": "unique"
        }
      },
      {
        "id": "unique-unnatural-resilience",
        "name": "超能韧性",
        "text": "此模型对致命伤具有不觉疼痛4+ 能力。",
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
        ],
        "source": {
          "englishName": "Unnatural Resilience",
          "kind": "unique"
        }
      }
    ],
    "老独眼": [
      {
        "id": "core-feel-no-pain-5",
        "name": "不知疼痛5+",
        "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
        "status": "计算支持（被动效果自动计入）",
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
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-alpha-leader",
        "name": "头领生物",
        "text": "当此模型领导一个单位时，每当该单位内的一个模型发动攻击时，你可重掷命中掷骰。",
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
          "englishName": "Alpha Leader",
          "kind": "unique"
        }
      },
      {
        "id": "unique-unstoppable-monster",
        "name": "无阻巨兽",
        "text": "在每位玩家的指挥阶段开始时，此模型恢复最多 D3 点失去的伤口。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unstoppable Monster",
          "kind": "unique"
        }
      }
    ],
    "摩崔克斯寄生虫": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "core-lone-operative",
        "name": "独行特工",
        "text": "除非此单位为联合单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Lone Operative",
          "kind": "core"
        }
      },
      {
        "id": "core-stealth",
        "name": "隐蔽",
        "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
        "status": "计算支持（被动效果自动计入）",
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
        "id": "unique-parasitic-infection",
        "name": "寄生感染",
        "text": "每当一个 **步兵(Infantry)** 模型被此模型的带刺卵育器攻击摧毁时，此模型完成其攻击后，你可以将一个由 D3 个模型组成的新 **蚀虫群** 单位加入你的军队，并在此模型的 3\" 内设置。如果你这样做，该 **蚀虫群** 单位可在被摧毁模型所在单位的交战范围内设置（但不得在任何其他敌方单位的交战范围内）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Parasitic Infection",
          "kind": "unique"
        }
      },
      {
        "id": "unique-it-itches",
        "name": "奇痒难耐",
        "text": "在近战阶段开始时，选择一个在此模型接触范围内的敌方单位。该敌方单位必须进行战斗震慑测试。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "It Itches!",
          "kind": "unique"
        }
      }
    ],
    "噬灵虫": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭D1",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1",
          "kind": "core"
        }
      },
      {
        "id": "core-feel-no-pain-5",
        "name": "不知疼痛5+",
        "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
        "status": "计算支持（被动效果自动计入）",
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
        "id": "unique-bio-stimulus",
        "name": "生体催化【光环】",
        "text": "在你的射击阶段，此模型射击后，选择被该次攻击之一或多次命中的敌方单位。直到回合结束，每当己方 **泰伦虫族(Tyranids)** 单位发动针对该敌方单位的近战攻击时，将该攻击的护甲穿透特性提升1。同一敌方单位每轮仅能受此能力影响一次。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bio-stimulus",
          "kind": "unique"
        }
      },
      {
        "id": "unique-feeding-frenzy",
        "name": "狂热进食",
        "text": "此模型每次对低于其起始兵力的单位进行近战攻击时，对命中掷骰加 1。若该目标同时处于低于半数状态，还对致伤掷骰加 1。",
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
          },
          {
            "type": "wound-modifier",
            "value": 1,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Feeding Frenzy",
          "kind": "unique"
        }
      }
    ],
    "喷焰虫": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭1",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1",
          "kind": "core"
        }
      },
      {
        "id": "unique-burning-spray",
        "name": "燃烧喷溅",
        "text": "在你的射击阶段中，在此单位射击后，选择被该次攻击中的一次或多次命中的一个敌方单位。直到阶段结束，该敌方单位无法获得掩体增益。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Burning Spray",
          "kind": "unique"
        }
      }
    ],
    "蛇虫": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-death-from-below",
        "name": "地下死神",
        "text": "在你对手回合结束时，如果此单位不在一个或多个敌方单位的交战范围内，你可以将其从战场上移除并放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Death From Below",
          "kind": "unique"
        }
      }
    ],
    "撕裂虫群": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-chitinous-horrors",
        "name": "甲壳恐惧（光环）",
        "text": "当敌方单位在此单位的交战范围内时，将该敌方单位中的模型的目标控制特性减半。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chitinous Horrors",
          "kind": "unique"
        }
      }
    ],
    "尖啸杀手": [
      {
        "id": "core-deadly-demise-1",
        "name": "致命破灭1",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise 1",
          "kind": "core"
        }
      },
      {
        "id": "unique-death-scream",
        "name": "死亡尖啸",
        "text": "在你的射击阶段中，此模型射击后，选择一个被该攻击中的一次或多次命中的敌方单位。该单位必须进行战斗震慑测试，该测试减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Death Scream",
          "kind": "unique"
        }
      }
    ],
    "孢子雷": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-bio-minefield",
        "name": "生物地雷",
        "text": "敌方单位无法在此单位6\"范围内开始或结束推进移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Bio-minefield",
          "kind": "unique"
        }
      },
      {
        "id": "unique-floating-death",
        "name": "漂浮死神",
        "text": "此单位或敌方单位每次移动结束时，对此单位内位于1个或多个敌方单位3\"内的每个模型，选择其中一个敌方单位。此单位内的该模型被摧毁，随后掷1D6：得2-5，该敌方单位承受1点致命伤；得6，该敌方单位承受D3点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Floating Death",
          "kind": "unique"
        }
      }
    ],
    "孢囊要塞": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-seed-mucolids",
        "name": "发射孢子雷",
        "text": "每回合一次，在你的射击阶段中，当选择进行射击时，拥有此能力的一个单位可改用此能力，而非用其远程武器进行任何攻击。若如此，可将一个包含 1 个模型的新 **黏液孢子** 单位添加至你的军队，并在距此模型 18\" 内且距所有敌方单位水平距离超过 8\" 的任何地点将其设置在战场上。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Seed Mucolids",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hive-defences",
        "name": "虫巢防御",
        "text": "你可以 0CP 指令点数的花费对此模型使用掩盖射击计谋，且即使本回合已对另一个单位使用该计谋，仍可如此做。此模型每回合最多只能被该计谋目标化一次。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hive Defences",
          "kind": "unique"
        }
      }
    ],
    "枪虫": [
      {
        "id": "unique-skulking-horrors",
        "name": "鬼祟恐怖",
        "text": "每回合一次，当敌方单位在此单位9\"内结束正常、冲锋或后撤移动时，若此单位不在一个或多个敌方单位的交战范围内，此单位可进行D6\"的正常移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Skulking Horrors",
          "kind": "unique"
        }
      }
    ],
    "兵虫巢母": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-spawn-termagants",
        "name": "孵化虫群",
        "text": "在你的指挥阶段，你可选择一个距此模型 6\" 内的己方 **虫卵虫** 单位，并将最多 D3+3 个已摧毁的模型复原至该单位。一个 **虫卵虫** 单位每个阶段不能被此能力选择超过一次。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Spawn Termagants",
          "kind": "unique"
        }
      },
      {
        "id": "unique-brood-progenitor",
        "name": "虫群先祖",
        "text": "当友军 **虫群兽** 单位在此模型 6\" 范围内时，该单位中的模型配备的远程武器具有 **[致命一击]** 能力。",
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
          "englishName": "Brood Progenitor",
          "kind": "unique"
        }
      }
    ],
    "红色惧物": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-swallow-whole",
        "name": "整个吞食",
        "text": "此模型以其巨口进行的攻击，每次以步兵、骑乘或野兽单位为目标时，每次未经修正的成功伤害骰皆为暴击致伤。每当有步兵、骑乘或野兽模型因此模型巨口的攻击被摧毁时，此模型回复至多 D3+2 点已失去的伤口。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Swallow Whole",
          "kind": "unique"
        }
      },
      {
        "id": "unique-subterranean-hunter",
        "name": "地穴猎手",
        "text": "在近战阶段结束时，若此单位未处于任何敌方单位的交战范围内，你可将其从战场移除并置入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Subterranean Hunter",
          "kind": "unique"
        }
      },
      {
        "id": "unique-serpentine-fiend",
        "name": "蛇形恶魔",
        "text": "此模型可穿越地形特征移动，但不可在墙壁、地板等之内结束移动。此模型可于断垣残壁（RUINS）的任一楼层被部署或结束移动；若该楼层并非地面层，仅在其底座不悬空于该楼层边缘时才可如此。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Serpentine Fiend",
          "kind": "unique"
        }
      }
    ],
    "虫群霸主": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-hive-commander",
        "name": "蜂巢指挥官",
        "text": "在你的指挥阶段开始时，如果此模型在战场上，你获得 1 CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hive Commander",
          "kind": "unique"
        }
      },
      {
        "id": "unique-malign-presence",
        "name": "恶毒临在",
        "text": "每回合一次，当你的对手以计谋指定其军队中一个位于此模型 12\" 内的单位为目标时，你可以使用此能力。若你如此做，该次计谋使用的指令点花费增加 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Malign Presence",
          "kind": "unique"
        }
      },
      {
        "id": "unique-domination-of-the-hive-mind",
        "name": "虫群心灵统御",
        "text": "当一个友军 **泰伦虫族(Tyranids)** 单位在此模型 9\" 范围内时，该单位在你的军队突触范围内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Domination of the Hive Mind",
          "kind": "unique"
        }
      }
    ],
    "毒鞭兽": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "unique-grasping-tendrils",
        "name": "扼取触手",
        "text": "每次敌方单位（**泰坦**单位除外）于你的军队具有此能力的单位交战范围内被选择后撤时，你可掷一个D6：结果为3+，该敌方单位必须改为原地不动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grasping Tendrils",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hypertoxic-miasma",
        "name": "剧毒瘴气",
        "text": "在你的移动阶段结束时，对此模型 6 英寸内的每个敌方单位掷一个 D6：结果为 2-3，该单位承受 1 点致命伤；结果为 4-5，该单位承受 D3 点致命伤；结果为 6，该单位承受 D6 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hypertoxic Miasma",
          "kind": "unique"
        }
      }
    ],
    "掘蟒": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-subterranean-tunnels",
        "name": "地底隧道",
        "text": "在你的移动阶段，当此模型使用深入打击能力在战场上被建置时，它可以使用地下隧道。若它这样做，此模型可以在战场上任何距离所有敌方单位水平超过 6\" 的地点被建置，但直到回合结束，它不符合宣告冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Subterranean Tunnels",
          "kind": "unique"
        }
      }
    ],
    "装备抽击鞭的泰伦王虫": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-alpha-warrior",
        "name": "首领武士",
        "text": "此模型所在单位中的模型所配备的武器具有 **[连击 1]** 能力。",
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
          "englishName": "Alpha Warrior",
          "kind": "unique"
        }
      },
      {
        "id": "unique-aggressive-leader-beast",
        "name": "好战领袖兽",
        "text": "在你对手的射击阶段中，每次敌军单位进行射击后，如有任何该单位的模型因这些攻击而被摧毁，此单位可进行血躁冲动移动。进行此移动时，掷一枚 D6：此单位的模型移动至此掷骰数值的英寸数，但该单位必须以最接近最近敌军单位（不含 **飞行器(Aircraft)**）的方式结束移动。进行此移动时，这些模型可移动至敌军单位的交战范围内。该单位受到战斗震慑或位于一个或多个敌军单位的交战范围内时，无法进行血躁冲动移动，每个阶段最多只能进行一次此移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aggressive Leader‑beast",
          "kind": "unique"
        }
      }
    ],
    "装备近战活体武器的泰伦武士": [
      {
        "id": "unique-adaptive-instincts",
        "name": "适应性本能",
        "text": "在近战阶段开始时，选择下列其中一项：\n■ **侵略性命令**：直到阶段结束前，此单位中的每个模型每次发动攻击时，重掷结果为 1 的命中掷骰 的结果。\n■ **生物再生**：直到阶段结束前，此单位中的每个模型每次进行豁免掷骰时，重掷结果为 1 的豁免掷骰 的结果。",
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
          "englishName": "Adaptive Instincts",
          "kind": "unique"
        }
      }
    ],
    "生化喷吐泰伦武士": [
      {
        "id": "unique-adaptable-predators",
        "name": "适应性掠食者",
        "text": "此单位在后撤的战斗回合中可进行射击并宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Adaptable Predators",
          "kind": "unique"
        }
      }
    ],
    "孢子空投仓": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-aerial-seeding",
        "name": "空投降落",
        "text": "此模型必须在预备队中开始战斗，但它及其中任何乘坐的单位均不计入你可在战斗开始时放置的预备队单位数量上限。此模型可在你第一、第二或第三个移动阶段的增援步骤中被部署，无视任何任务规则。乘坐于此模型中的任何单位必须在此模型被部署于战场上后立即脱离，且必须被部署在距离所有敌方模型 9\" 以上的位置。此模型被部署于战场上后，没有单位可乘坐于其中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aerial Seeding",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输能力",
        "text": "该模型能够搭载 20 个泰伦虫族步兵模型、或 1 泰伦虫族凶兽模型耐受值 12 或更低。每个 Infantry 模型 with a Wounds characteristic of more than 1 占用 3 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "暴虐兽": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-resilient-organism",
        "name": "坚韧生物",
        "text": "每场战斗一次，当分配到此模型的攻击时，可将该攻击的伤害特性改为 0。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Resilient Organism",
          "kind": "unique"
        }
      }
    ],
    "暴君护卫": [
      {
        "id": "unique-guardian-organism",
        "name": "卫士生物体",
        "text": "当 **角色(Character)** 模型率领此单位时，该 **角色(Character)** 模型具有不觉疼痛5+ 能力。",
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
          "englishName": "Guardian Organism",
          "kind": "unique"
        }
      }
    ],
    "毒烟虫": [
      {
        "id": "core-stealth",
        "name": "隐蔽",
        "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
        "status": "计算支持（被动效果自动计入）",
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
        "id": "unique-foul-spores",
        "name": "恶毒孢子【光环】",
        "text": "当己方 **泰伦虫族(Tyranids)** 单位在此单位6\"内时，每次远程攻击以该单位为目标时，该单位中的模型对该攻击获得掩体增益。此外，当己方 **泰伦虫族(Tyranids)** 单位（**凶兽** 除外）在此单位6\"内时，该单位中的模型获得隐匿能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Foul Spores",
          "kind": "unique"
        }
      }
    ],
    "冯·瑞恩跃袭者": [
      {
        "id": "core-fights-first",
        "name": "先攻",
        "text": "拥有此能力的单位，若有资格战斗，且该单位中的所有模型都拥有此能力，则在先制攻击步骤中进行战斗。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fights First",
          "kind": "core"
        }
      },
      {
        "id": "core-infiltrators",
        "name": "渗透",
        "text": "于部署时，若单位中的每个模型都具有此能力，则当你部署该单位时，可以将其部署在战场上的任何位置，该位置距敌军部署区域超过8\"，且距所有敌军模型超过8\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Infiltrators",
          "kind": "core"
        }
      },
      {
        "id": "core-stealth",
        "name": "隐蔽",
        "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
        "status": "计算支持（被动效果自动计入）",
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
        "id": "unique-pouncing-leap",
        "name": "扑击跳跃",
        "text": "你可以用「英勇介入」计谋以此单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做：\n■ 该次使用减少 1 指令点。\n■ 该次使用不会阻止本阶段该计谋用于其他单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Pouncing Leap",
          "kind": "unique"
        }
      }
    ],
    "有翼虫巢暴君": [
      {
        "id": "core-deadly-demise-d3",
        "name": "致命破灭D3",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D3",
          "kind": "core"
        }
      },
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-will-of-the-hive-mind",
        "name": "蜂巢心智意志",
        "text": "每战斗回合一次，你的军队中具有此能力的一个模型可在己方 **泰伦虫族(Tyranids)** 单位在距该模型 12\" 内被计谋目标时使用此能力。若其如此做，将该次计谋的 CP 消耗减少 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Will of the Hive Mind",
          "kind": "unique"
        }
      },
      {
        "id": "unique-paroxysm",
        "name": "痉挛发作",
        "text": "在近战阶段开始时，你可以选择一个在此模型 12\" 内且可见的敌方单位，并掷一次 D6：结果为 1 时，此 **灵能者(Psyker)** 受到 D3 点致命伤；结果为 2+ 时，直到阶段结束，从该单位中模型配备的武器的攻击次数特性减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Paroxysm",
          "kind": "unique"
        }
      }
    ],
    "有翼泰伦王虫": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "unique-alpha-warrior",
        "name": "首领武士",
        "text": "当此模型领导一个单位时，该单位中的模型装备的武器具有**[连击1]**能力。",
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
          "englishName": "Alpha Warrior",
          "kind": "unique"
        }
      },
      {
        "id": "unique-death-blow",
        "name": "垂死挣扎",
        "text": "若此模型在近战攻击中被摧毁，且在此阶段还未战斗过，掷一个 D6：4 以上则不将其从战场上移除。被摧毁的模型可在攻击单位的所有攻击完成后进行战斗，然后从战场上移除。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Death Blow",
          "kind": "unique"
        }
      }
    ],
    "脑虫": [
      {
        "id": "unique-spirit-leech",
        "name": "吸魂凝视【光环，灵能】",
        "text": "当敌方单位位于此单位 6\" 内时，若此单位含有神经元体，则每次敌方单位失败战斗震慑测试时，该敌方单位受到 D3 次实伤，且此单位内一个模型恢复最多 D3 点已失伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Spirit Leech",
          "kind": "unique"
        }
      },
      {
        "id": "unique-warp-field",
        "name": "亚空间护盾【光环，灵能】",
        "text": "当己方 **泰伦虫族(Tyranids)** 单位在此单位6\"范围内时，该单位中的模型具有6+无敌豁免。",
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
            "value": 6
          }
        ],
        "source": {
          "englishName": "Warp Field",
          "kind": "unique"
        }
      }
    ],
    "天裂虫群": [
      {
        "id": "core-deep-strike",
        "name": "深入打击",
        "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。\n\n若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deep Strike",
          "kind": "core"
        }
      },
      {
        "id": "unique-chitinous-horrors",
        "name": "甲壳恐惧（光环）",
        "text": "敌方单位处于此能力单位的交战范围内时，该敌方单位中模型的目标控制特性减半。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Chitinous Horrors",
          "kind": "unique"
        }
      }
    ],
    "镰爪虫嗣": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-damaged-1-6-wounds-remaining",
        "name": "受损：剩余 1-6 伤",
        "text": "此模型剩余1-6伤口时，每次此模型发动攻击时，从命中掷骰中减去1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Damaged: 1-6 Wounds Remaining",
          "kind": "unique"
        }
      },
      {
        "id": "unique-irresistible-force",
        "name": "不可抗拒之力",
        "text": "此模型在后撤的回合中仍可宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Irresistible Force",
          "kind": "unique"
        }
      }
    ],
    "倒钩虫嗣": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-damaged-1-6-wounds-remaining",
        "name": "受损：剩余 1-6 伤",
        "text": "当此模型剩余 1-6 伤时，每次此模型发动攻击时，从命中掷骰中减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Damaged: 1-6 Wounds Remaining",
          "kind": "unique"
        }
      },
      {
        "id": "unique-overgrown-barbs",
        "name": "蔓生倒钩",
        "text": "在你的射击阶段，此模型射击后，选择一个被其中一次或多次攻击命中的敌方单位（铁巨人单位除外）。直到你的下一回合开始，在此模型在战场上时，该敌方单位受到压制。单位受到压制时，该单位内模型进行的每次攻击的命中掷骰减少 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Overgrown Barbs",
          "kind": "unique"
        }
      }
    ],
    "瓦尔登加斯特的虫群噬灵虫": [
      {
        "id": "unique-疯狂进食",
        "name": "疯狂进食",
        "text": "该模型的近战攻击：\n■ 以一个低于**起始兵力**的单位为目标时，**命中掷骰** +1。\n■ 以一个低于**半数兵力**的单位为目标时，**致伤掷骰** +1。",
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
          },
          {
            "type": "wound-modifier",
            "value": 1,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "疯狂进食",
          "kind": "unique"
        }
      },
      {
        "id": "unique-生物刺激-光环",
        "name": "生物刺激（光环）",
        "text": "当一个己方**泰伦虫族**单位位于该模型的 6\" 时，那个单位拥有**不觉疼痛 6+**。",
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
            "threshold": 6
          }
        ],
        "source": {
          "englishName": "生物刺激（光环）",
          "kind": "unique"
        }
      }
    ],
    "瘴气虫": [
      {
        "id": "core-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "core"
        }
      },
      {
        "id": "core-stealth",
        "name": "隐蔽",
        "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
        "status": "计算支持（被动效果自动计入）",
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
        "id": "core-synapse",
        "name": "节点生物",
        "text": "若你的军队阵营为 **泰伦虫族(Tyranids)**，当你军队中的 **泰伦虫族(Tyranids)** 单位距离一个或多个友军 **突触(Synapse)** 模型 6\" 内时，该 **泰伦虫族(Tyranids)** 单位被视为处于该模型的突触范围内，且处于你军队的突触范围内。当你军队中的 **泰伦虫族(Tyranids)** 单位处于你军队的突触范围内时：\n\n■ 每当该单位进行战斗震慑测试时，应使用 3D6 取代 2D6 进行该测试。\n■ 每当该单位中的模型进行近战攻击时，将该攻击的力量特性加 1。",
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
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Synapse",
          "kind": "core"
        }
      },
      {
        "id": "unique-enhanced-toxic-miasma",
        "name": "强化毒雾",
        "text": "此模型领导单位时，该单位腐臭孢子光环能力的范围增加至 9\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Enhanced Toxic Miasma",
          "kind": "unique"
        }
      },
      {
        "id": "unique-prey-adaptation",
        "name": "猎物适应",
        "text": "每次此模型的单位被选择进入战斗时，选择以下其中一项能力应用于该单位所有近战武器，直至阶段结束：[连击 1]、[骑枪]、[致命一击]。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Prey Adaptation",
          "kind": "unique"
        }
      },
      {
        "id": "leader-leader",
        "name": "领袖",
        "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。\n\n当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。\n\n每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。\n\n每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。\n\n**范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "leader"
        }
      }
    ],
    "双刃巨兽": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭D6",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-digestion-spine",
        "name": "消化骨刺",
        "text": "此模型每次战斗解决其攻击后，若因这些攻击而摧毁了一个或多个敌方模型（不含载具模型），此模型恢复至多 D3 点伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Digestion Spine",
          "kind": "unique"
        }
      }
    ],
    "瓦尔登加斯特的虫群掷弹虫": [
      {
        "id": "unique-干扰轰炸",
        "name": "干扰轰炸",
        "text": "在您的射击阶段中，在该单位完成射击后，您可以选择一个被那些攻击命中的敌方单位。若选择，直到下个己方回合开始前，那个敌方单位被**压制**：\n■ 在一个单位被**压制**时，那个单位：\n■ **M** -2\"。\n■ **突进掷骰**和**冲锋掷骰**结果 -2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "干扰轰炸",
          "kind": "unique"
        }
      }
    ],
    "瓦尔登加斯特的恐惧": [
      {
        "id": "unique-死亡打击",
        "name": "死亡打击",
        "text": "在近战阶段中，在该模型**被摧毁**时，如果该单位在本阶段中没有**被选择进行近战**，那麽掷一枚 D6：\n■ 若结果为 4+，不要将那个模型移出战场。在您的单位完成近战后，或者在阶段结束时（以先发生者为准），将那个模型移出战场。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "死亡打击",
          "kind": "unique"
        }
      },
      {
        "id": "unique-生物预备队-每个单位-每场战斗限一次",
        "name": "生物预备队（每个单位，每场战斗限一次）",
        "text": "在您的移动阶段开始或结束时，您可以使用本技能。若使用：\n■ 选择一个**不处于交战状态的**己方**瓦尔登加斯特的虫群枪虫**单位。那个单位**治疗** 2D6 处耐伤。\n■ 或者：选择一个**被摧毁的**己方**瓦尔登加斯特的虫群枪虫**单位。那个单位**治疗** 10 处耐伤，并将其放入**战略预备队**中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "生物预备队（每个单位，每场战斗限一次）",
          "kind": "unique"
        }
      }
    ],
    "瓦尔登加斯特的虫群枪虫": [
      {
        "id": "unique-鬼祟恐怖-每个单位-每个阶段限一次",
        "name": "鬼祟恐怖（每个单位，每个阶段限一次）",
        "text": "在您对手的移动阶段中，当一个敌方单位在该单位的 9\" 内结束移动时，如果该单位**不处于交战状态**，该单位可以进行一次最多 D6\" 的**常规移动**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "鬼祟恐怖（每个单位，每个阶段限一次）",
          "kind": "unique"
        }
      }
    ],
    "瓦尔登加斯特的虫群枪虫（瓦尔登加斯特的虫群枪虫）": [
      {
        "id": "unique-鬼祟恐怖-每个单位-每个阶段限一次",
        "name": "鬼祟恐怖（每个单位，每个阶段限一次）",
        "text": "在您对手的移动阶段中，当一个敌方单位在该单位 9\" 内结束移动时，若该单位**不处于交战状态**，该单位可以进行一次最多 D6\" 的**常规移动**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "鬼祟恐怖（每个单位，每个阶段限一次）",
          "kind": "unique"
        }
      }
    ],
    "瓦尔登加斯特的虫群冯·瑞恩跃袭者": [
      {
        "id": "unique-猛扑-每个单位-每回合限一次",
        "name": "猛扑（每个单位，每回合限一次）",
        "text": "您可以对该单位使用**英勇介入计谋**，无论您在本阶段中是否已经使用过本**计谋**。若使用：\n■ 那次计谋的使用消耗 0 CP。\n■ 那次使用不会阻止其他单位在本阶段中使用那个**计谋**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "猛扑（每个单位，每回合限一次）",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
