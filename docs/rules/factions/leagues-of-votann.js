/* Generated source-text rule package for leagues-of-votann. */
(function (root) {
  root["WarhammerWebsiteRules_leagues_of_votann"] = {
  "factionRules": [
    {
      "id": "leagues-of-votann.army-rule",
      "name": "优先效率",
      "englishName": "Prioritised Efficiency",
      "text": "你军队中的窝特氏联盟单位具有两种能力之一：敌对获取或巩固接管，依你目前的收益点 (YP) 切换：\n\n■ 战斗开始时：敌对获取（直到下个指挥阶段）。\n■ 指挥阶段结束时 YP < 7：敌对获取。\n■ 指挥阶段结束时 YP ≥ 7：巩固接管。\n\n获得收益点\n\n每位玩家指挥阶段结束时，若你控制部署区内一个或多个目标标记则获 1 YP；第二回合起每满足下列条件再 +1 YP：\n\n■ 控制部署区外一个或多个目标标记。\n■ 控制部署区外两个或以上目标标记。\n■ 控制目标标记比对手多。\n\n你的回合中，以此方式获得的 YP 永远先于切换能力判定。花费 YP 时相应扣除（最低 0），不足则不能用该规则。\n\n敌对获取\n\n■ 对位于目标标记范围内的敌方单位攻击，命中 +1。\n■ 可重掷前进与冲锋掷骰。\n\n巩固接管\n\n■ 此单位若位于你控制的目标标记范围内，攻击敌方时命中 +1。\n■ 若此单位非载具、且对其攻击的力量大于本单位韧性，致伤 -1。",
      "category": "faction",
      "status": "计算支持（满足原文条件时勾选）",
      "controls": [
        {
          "id": "stance",
          "type": "select",
          "label": "当前收益能力及目标条件",
          "options": [
            [
              "none",
              "不启用"
            ],
            [
              "hostileAcquisition",
              "敌对获取：目标位于目标标记范围内"
            ],
            [
              "consolidatedTakeover",
              "巩固接管：本单位位于己方目标标记范围内"
            ]
          ]
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1,
          "selection": {
            "controlId": "stance",
            "equals": "hostileAcquisition"
          }
        },
        {
          "type": "hit-modifier",
          "value": 1,
          "selection": {
            "controlId": "stance",
            "equals": "consolidatedTakeover"
          }
        },
        {
          "type": "incoming-wound-when-strength-gt",
          "value": -1,
          "selection": {
            "controlId": "stance",
            "equals": "consolidatedTakeover"
          }
        }
      ],
      "source": {
        "englishName": "Prioritised Efficiency",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "秘械评估师": [
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
        "id": "unique-science-guild-support",
        "name": "科技工会支援",
        "text": "当此模型在一个或多个其他己方 **沃坦联盟(Leagues of Votann)步兵(Infantry)** 单位3\"内时（不含具有独行特工能力的单位），此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Science Guild Support",
          "kind": "unique"
        }
      },
      {
        "id": "unique-resource-transmutation",
        "name": "原子嬗变",
        "text": "每回合一次，在你的射击阶段，一个拥有此能力的模型在被选择进行射击时可以使用它。如果它这样做，你必须花费 1YP，直到阶段结束，该模型配备的远程武器具有 **[连击 1]** 能力，在该模型本阶段射击后，如果一个或多个敌方单位因这些攻击而被摧毁，你可以获得最多 2YP。",
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
          "englishName": "Resource Transmutation",
          "kind": "unique"
        }
      }
    ],
    "贝雷克·斯托恩布劳": [
      {
        "id": "core-feel-no-pain-4",
        "name": "不觉疼痛4+",
        "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "fnp",
            "threshold": 4
          }
        ],
        "source": {
          "englishName": "Feel No Pain 4+",
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
        "id": "unique-break-the-foe",
        "name": "破敌之击",
        "text": "此模型所属单位中的模型配备的近战武器具有 **[连击 1]** 能力",
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
          "englishName": "Break the Foe",
          "kind": "unique"
        }
      },
      {
        "id": "unique-relentless-avalanche",
        "name": "无情雪崩",
        "text": "你可以用「英勇介入」计谋以此单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做：\n■ 该次使用减少 1 指令点。\n■ 该次使用不会阻止本阶段该计谋用于其他单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Relentless Avalanche",
          "kind": "unique"
        }
      }
    ],
    "机锻协钢铁之主": [
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
        "id": "unique-br-khyr-guild-support",
        "name": "锻匠工会支援",
        "text": "当此单位在 1 个或多个己方 **沃坦联盟(Leagues of Votann)载具(Vehicle)** 或 **铁裔** 单位 3\" 内时，若此单位不是联合单位，它则具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Brôkhyr Guild Support",
          "kind": "unique"
        }
      },
      {
        "id": "unique-multispectral-visor",
        "name": "多频谱目镜",
        "text": "此单位内的每个模型每次进行远距攻击时，重掷一次致伤掷骰结果为 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Multispectral Visor",
          "kind": "unique"
        }
      },
      {
        "id": "unique-forgewrought-expertise",
        "name": "炉火匠艺",
        "text": "在你的移动阶段结束时，此单位可以修复位于距其3\"内的一个友军 **沃坦联盟(Leagues of Votann)载具(Vehicle)**、**外骨骼** 或 **铁族钢骑** 单位。该单位中的一个模型回复最多D3点失去的伤口，若此单位包含铁族助手模型，则改为回复最多3点失去的伤口。每个单位每轮只能被修复一次。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Forgewrought Expertise",
          "kind": "unique"
        }
      }
    ],
    "机锻协雷鸣枪手": [
      {
        "id": "unique-breaching-fire",
        "name": "火力突破",
        "text": "在你的射击阶段，在此单位射击后，选择一个被这些攻击命中一次或多次的敌方单位。直到你下一个射击阶段开始时，该敌方单位无法获得掩体增益。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Breaching Fire",
          "kind": "unique"
        }
      }
    ],
    "布里·艾吉尼尔森": [
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
        "name": "潜行",
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
        "id": "unique-grudge-fuelled-fortitude",
        "name": "怨恨坚韧",
        "text": "此模型首次被摧毁时，在阶段末，掷一次 D6：掷出 2+ 时，在其被摧毁的最接近位置重新放置此模型于战场上，且不在一个或多个敌方单位的交战范围内，伤口完整。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grudge‑fuelled Fortitude",
          "kind": "unique"
        }
      },
      {
        "id": "unique-unhinged-vengeance",
        "name": "失心复仇",
        "text": "在你对手的射击阶段中，每次敌方单位已射击，如果这个模型因这些攻击而失去一个或多个伤口，这个模型可以进行复仇移动。要这样做，掷一个 D6 并加上 2：它移动最多这个结果英寸的距离，但必须结束移动时尽可能靠近最近的敌方单位（不包括 **飞行器(Aircraft)**）。这样做时，它可以在敌方单位的交战范围内移动。当这个模型受到战斗震慑或位于一个或多个敌方单位的交战范围内时，它无法进行复仇移动，每个阶段只能进行一次复仇移动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Unhinged Vengeance",
          "kind": "unique"
        }
      }
    ],
    "深岩狂战士": [
      {
        "id": "core-feel-no-pain-4",
        "name": "不觉疼痛4+",
        "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "fnp",
            "threshold": 4
          }
        ],
        "source": {
          "englishName": "Feel No Pain 4+",
          "kind": "core"
        }
      },
      {
        "id": "unique-cyberstimms",
        "name": "生化注射剂",
        "text": "此单位中的每个模型在被近战攻击摧毁时，若该模型本阶段尚未战斗，掷一次 D6，若你的军队具有堡垒接管则在结果上 +1：4+ 时，不将其移出游戏。该被摧毁的模型可在攻击单位完成其攻击后进行战斗，然后被移出游戏。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Cyberstimms",
          "kind": "unique"
        }
      },
      {
        "id": "unique-subterranean-explosives",
        "name": "地下爆破",
        "text": "在你的射击阶段，此单位射击后，选择一个被鼹鼠榴弹发射器的一次或多次攻击命中的敌方单位（**凶兽(Monster)** 和 **载具(Vehicle)** 除外）。直到你下次射击阶段开始，该敌方单位不能以警戒射击计谋为目标。\n\n**设计者注记：** 我们建议在该敌方单位旁放置一枚鼹鼠榴弹标记以提醒。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Subterranean Explosives",
          "kind": "unique"
        }
      }
    ],
    "深岩撼地者": [
      {
        "id": "unique-destabilising-quakes",
        "name": "撼山动地",
        "text": "在你的射击阶段，此单位射击完后，选择1个被其使用震荡弹壳进行的一次或多次攻击击中的敌方单位。该单位必须进行战斗震慑测试，结果减1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Destabilising Quakes",
          "kind": "unique"
        }
      },
      {
        "id": "unique-geomantic-hunters",
        "name": "地脉猎手",
        "text": "每场战斗最多两次，在你的射击阶段，当此单位被选中射击时，它可以使用此能力。若它这样做，直到阶段结束，此单位中的模型每次以其破坏者重武器发动攻击时，可重掷致伤掷骰。\n\n**设计者注记：** 放置两个破坏者重武器标记在此单位旁，每次此单位使用此能力时移除一个。",
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
          "englishName": "Geomantic Hunters",
          "kind": "unique"
        }
      }
    ],
    "断角勇士": [
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
        "id": "unique-exemplar-of-the-einhyr",
        "name": "断角楷模",
        "text": "此模型领导一个单位时，为该单位进行的前进和冲锋掷骰各加 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Exemplar of the Einhyr",
          "kind": "unique"
        }
      },
      {
        "id": "unique-mass-driver-accelerators",
        "name": "质量加速器",
        "text": "此模型每次完成冲锋移动结束时，可选择一个在此模型交战范围内的敌方单位并掷一次 D6：结果为 2-5 时，该敌方单位受到 D3 点致命伤；结果为 6 时，该敌方单位受到 D3+3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Mass Driver Accelerators",
          "kind": "unique"
        }
      },
      {
        "id": "unique-teleport-crest",
        "name": "传送族徽",
        "text": "当持有者正在领导一个单位时，该单位中的模型拥有深入打击能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Teleport Crest",
          "kind": "unique"
        }
      },
      {
        "id": "unique-weavefield-crest",
        "name": "织能族徽",
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
          "englishName": "Weavefield Crest",
          "kind": "unique"
        }
      }
    ],
    "断角炉卫": [
      {
        "id": "unique-decisive-destruction",
        "name": "断誓毁灭",
        "text": "此单位中的模型每次对最近合格的目标发动远程攻击时，重掷结果为 1 的命中掷骰 的结果。",
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
          "englishName": "Decisive Destruction",
          "kind": "unique"
        }
      },
      {
        "id": "unique-teleport-crest",
        "name": "传送族徽",
        "text": "持有者所在的单位中模型拥有深入打击能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Teleport Crest",
          "kind": "unique"
        }
      },
      {
        "id": "unique-weavefield-crest",
        "name": "织能族徽",
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
          "englishName": "Weavefield crest",
          "kind": "unique"
        }
      }
    ],
    "格林尼尔贤者": [
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
        "id": "unique-fortify",
        "name": "先祖强固（灵能）",
        "text": "当此单位领导一个单位时，该单位中的模型具有不觉疼痛5+能力。",
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
          "englishName": "Fortify",
          "kind": "unique"
        }
      },
      {
        "id": "unique-grimnyr-s-regard",
        "name": "贤者凝视",
        "text": "每场战斗一次，在任意阶段开始时，你可选择一个己方 **沃坦联盟(Leagues of Votann)** 单位，该单位处于战斗震慑状态且在此单位的 **格林尼尔** 模型 12\" 范围内。该单位不再处于战斗震慑状态。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grimnyr’s Regard",
          "kind": "unique"
        }
      }
    ],
    "炉心战士": [
      {
        "id": "core-feel-no-pain-6",
        "name": "不觉疼痛6+",
        "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
        "status": "计算支持（被动效果自动计入）",
        "effects": [
          {
            "type": "fnp",
            "threshold": 6
          }
        ],
        "source": {
          "englishName": "Feel No Pain 6+",
          "kind": "core"
        }
      },
      {
        "id": "unique-luck-has-need-keeps-toil-earns",
        "name": "幸者得，需者持，劳者享",
        "text": "在你的指挥阶段结束时，若此单位位于你控制的目标标记的射程内，该目标标记将保持在你的控制下，直到你的对手在某一阶段结束时对该目标标记的控制级别高于你为止。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Luck Has. Need Keeps. Toil Earns.",
          "kind": "unique"
        }
      },
      {
        "id": "unique-panspectral-scanning",
        "name": "全光谱扫描",
        "text": "此单位中的模型每次进行远程攻击时，重掷命中掷骰结果为 1。",
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
          "englishName": "Panspectral Scanning",
          "kind": "unique"
        }
      },
      {
        "id": "unique-weavefield-crest",
        "name": "织能族徽",
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
          "englishName": "Weavefield crest",
          "kind": "unique"
        }
      }
    ],
    "赫卡顿陆行要塞": [
      {
        "id": "core-deadly-demise-d6",
        "name": "致命破灭 D6",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6",
          "kind": "core"
        }
      },
      {
        "id": "unique-multicog-targeting",
        "name": "COG靶向瞄准系统",
        "text": "每次此模型进行远程攻击时，可忽略对下列项目的任意或全部修正：该攻击的射击技巧特性；命中掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "MultiCOG Targeting",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输载具",
        "text": "该模型能够搭载 14 个沃坦联盟步兵模型。每个 EXOARMOUR、EXOFRAME 或 IRONKIN STEELJACKS 模型占用 2 个模型的空间。该模型不能运输 ARTILLERY 模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      },
      {
        "id": "unique-panspectral-scanner",
        "name": "全波段扫描仪",
        "text": "持有者所在的单位中的模型每次进行远程攻击时，重掷一次命中掷骰结果为 1 的掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Panspectral Scanner",
          "kind": "unique"
        }
      }
    ],
    "猎裔先锋": [
      {
        "id": "core-scouts-9",
        "name": "斥候9\"",
        "text": "某些单位的能力中列有「斥候x\"」。若单位中的每个模型都有此能力，则在首场战斗回合开始时、首轮开始前，它可以进行一次常规移动，距离不超过x\"，如同在你的移动阶段——任何此单位开战时已搭乘的 **专用运输工具(Dedicated Transport)** 模型也可以如此移动（前提是仅有具此能力的模型搭乘于该 **专用运输工具(Dedicated Transport)** 模型内）。使用此能力移动的单位，其移动必须终止于距离所有敌方模型9\"以上的位置。若双方都有能进行此动作的单位，进行首轮的玩家先移动他们的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 9\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-outflanking-mag-riders",
        "name": "飞骑迂回",
        "text": "在你的对手回合结束时，若此单位完全位于 1 个或多个战场边缘 9\" 内，且不位于 1 个或多个敌方单位的交战范围内，可将其移出战场并放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Outflanking Mag-Riders",
          "kind": "unique"
        }
      },
      {
        "id": "unique-rollbar-searchlight",
        "name": "路障探照灯",
        "text": "持有者所在的单位中的每个模型进行远程攻击时，你可以忽略命中掷骰的任何或所有调整值。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Rollbar Searchlight",
          "kind": "unique"
        }
      },
      {
        "id": "unique-panspectral-scanner",
        "name": "全波段扫描仪",
        "text": "持有者所在的单位中的模型每次进行远程攻击时，重掷一次命中掷骰结果为 1 的掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Panspectral Scanner",
          "kind": "unique"
        }
      },
      {
        "id": "unique-multiwave-comms-array",
        "name": "多频谱通讯阵列",
        "text": "每当你以计谋指定持有者所在的单位为目标时，掷一颗 D6：掷出 5+ 时，你获得 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Multiwave Comms Array",
          "kind": "unique"
        }
      }
    ],
    "猎裔尖兵": [
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
        "id": "unique-pragmatic-hunters",
        "name": "务实猎手",
        "text": "每回合一次，当一个敌方单位在距离此单位 9\" 内结束常规、推进或后撤移动时，它可以进行常规移动，最多移动 D6\"。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Pragmatic Hunters",
          "kind": "unique"
        }
      }
    ],
    "钢甲铁裔-射击型": [
      {
        "id": "unique-purge-response",
        "name": "清除！响应",
        "text": "每次你用「警戒射击」计谋以此单位为目标时，在解决该计谋时，未修正的命中掷骰为 5+ 时视为命中。若你的军队中的单位具有堡垒接管，则在解决该计谋时，未修正的命中掷骰为 4+ 时视为命中。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Purge Response",
          "kind": "unique"
        }
      },
      {
        "id": "unique-preymark-crest",
        "name": "狩首族徽",
        "text": "每当持有者所在的单位中的模型进行一次攻击，且该攻击指定一个位于一个或多个目标标记范围内的敌方单位为目标时，于致伤重击（Critical Wound）上，该次攻击具有 **[PRECISION]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Preymark Crest",
          "kind": "unique"
        }
      }
    ],
    "钢甲铁裔-格斗型": [
      {
        "id": "unique-merciless-eradication",
        "name": "清除！追击",
        "text": "敌方单位（**凶兽(Monster)** 和 **载具(Vehicle)** 除外）每次在此单位的交战范围内后撤时，该敌方单位的所有模型必须进行狼狈逃亡测试。如此进行时，若该敌方单位受战斗震慑，则该等测试减 1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Merciless Eradication",
          "kind": "unique"
        }
      },
      {
        "id": "unique-preymark-crest",
        "name": "狩首族徽",
        "text": "每当持有者所在的单位中的模型进行一次攻击，且该攻击指定一个位于一个或多个目标标记范围内的敌方单位为目标时，于致伤重击（Critical Wound）上，该次攻击具有 **[PRECISION]** 能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Preymark Crest",
          "kind": "unique"
        }
      }
    ],
    "战群统领": [
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
        "id": "unique-kindred-hero",
        "name": "氏族英豪",
        "text": "当此模型率领一个单位时，该单位中模型配备的武器具有 **[致命一击]** 能力。",
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
        ],
        "source": {
          "englishName": "Kindred Hero",
          "kind": "unique"
        }
      },
      {
        "id": "unique-seized-opportunity",
        "name": "誓夺先机",
        "text": "每阶段一次，你的军队中拥有此能力的一个模型可在其单位摧毁敌方单位时使用此能力。若其如此做，你获得1YP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Seized Opportunity",
          "kind": "unique"
        }
      },
      {
        "id": "unique-rampart-crest",
        "name": "盾垒族徽",
        "text": "当此模型正在领导一个单位时，该单位中的模型拥有 5+ 无敌豁免(InSv)。",
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
            "value": 5,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Rampart Crest",
          "kind": "unique"
        }
      },
      {
        "id": "unique-teleport-crest",
        "name": "传送族徽",
        "text": "当此模型正在带领一个单位时，该单位中的模型具有深入打击能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Teleport Crest",
          "kind": "unique"
        }
      }
    ],
    "摩羯座运载者战车": [
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
        "id": "core-firing-deck-5",
        "name": "射击甲板5",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Firing Deck 5",
          "kind": "core"
        }
      },
      {
        "id": "core-scouts-9",
        "name": "斥候9\"",
        "text": "某些单位的能力中列有「斥候x\"」。若单位中的每个模型都有此能力，则在首场战斗回合开始时、首轮开始前，它可以进行一次常规移动，距离不超过x\"，如同在你的移动阶段——任何此单位开战时已搭乘的 **专用运输工具(Dedicated Transport)** 模型也可以如此移动（前提是仅有具此能力的模型搭乘于该 **专用运输工具(Dedicated Transport)** 模型内）。使用此能力移动的单位，其移动必须终止于距离所有敌方模型9\"以上的位置。若双方都有能进行此动作的单位，进行首轮的玩家先移动他们的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 9\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-scanner-uplinks",
        "name": "链路扫描",
        "text": "在你的射击阶段，该模型射击后，选择一个敌方单位（**凶兽**和**载具(Vehicle)**除外）被该攻击命中。直到你的下一回合开始，该敌方单位被压制。当单位被压制时，每次该单位中的模型进行攻击时，从命中掷骰中-1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scanner Uplinks",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输载具",
        "text": "该模型能够搭载 5 个 HERNKYN YAEGIR 模型。At the start of the Declare Battle Formations step、you can select one HERNKYN YAEGIR 单位 from your army that has not been split。If you do、that 单位 is split into two 单位、每个 containing as equal a number of 模型 as possible (when splitting a 单位 in this way、make a note of which 模型 form 每个 of the two new 单位)。One of these 单位 must start the battle embarked within this 运输工具;the other can start the battle embarked within another 运输工具、或 it can be deployed as a separate 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      },
      {
        "id": "unique-smoke-launcher",
        "name": "烟幕发射器",
        "text": "持有者具有 **烟幕(Smoke)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Smoke Launcher",
          "kind": "unique"
        }
      }
    ],
    "摩羯座守护者战车": [
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
        "id": "core-scouts-9",
        "name": "斥候9\"",
        "text": "某些单位的能力中列有「斥候x\"」。若单位中的每个模型都有此能力，则在首场战斗回合开始时、首轮开始前，它可以进行一次常规移动，距离不超过x\"，如同在你的移动阶段——任何此单位开战时已搭乘的 **专用运输工具(Dedicated Transport)** 模型也可以如此移动（前提是仅有具此能力的模型搭乘于该 **专用运输工具(Dedicated Transport)** 模型内）。使用此能力移动的单位，其移动必须终止于距离所有敌方模型9\"以上的位置。若双方都有能进行此动作的单位，进行首轮的玩家先移动他们的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 9\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-opportunistic-manoeuvre",
        "name": "投机性机动",
        "text": "在你的射击阶段，此单位射击后，它可进行一次最多 D6\" 的标准移动。如果它这样做，直到回合结束，此单位不符合宣告冲锋的条件。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Opportunistic Manoeuvre",
          "kind": "unique"
        }
      },
      {
        "id": "unique-smoke-launcher",
        "name": "烟幕发射器",
        "text": "持有者具有 **烟幕(Smoke)** 关键字。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Smoke Launcher",
          "kind": "unique"
        }
      }
    ],
    "忆械战略家": [
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
        "id": "unique-computational-mastermind",
        "name": "数据主脑",
        "text": "在你的指挥阶段结束时，在你确定你的军队中的单位是否具有敌对获取或强化掌控前，对每个你控制且在其范围内有一个或多个拥有此能力的模型的目标标记，你可花费 1YP 或获得 1YP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Computational Mastermind",
          "kind": "unique"
        }
      },
      {
        "id": "unique-predictive-guidance",
        "name": "预测性引导",
        "text": "每战斗回合一次，当你以「警戒射击」或「英勇介入」计谋指定此单位为目标时，你可以使用此能力。若你如此做，该次使用减少 1 指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Predictive Guidance",
          "kind": "unique"
        }
      }
    ],
    "射手座半人马战车": [
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
        "id": "unique-blistering-advance",
        "name": "迅猛推进",
        "text": "单位可在此 **运输工具(Transport)** 前进后从其中脱离。进行此操作的单位视为在该阶段进行了一次常规移动，且不能在同一轮宣告冲锋，但可以其他方式在回合剩余时间内正常行动。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Blistering Advance",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输载具",
        "text": "该模型能够搭载 6 个沃坦联盟步兵模型。该模型不能运输 ARTILLERY, EXOARMOUR、EXOFRAME 或 IRONKIN STEELJACKS 模型。At the start of the Declare Battle Formations step、you can select one 炉心战士单位 from your army that has not been split。If you do、that 单位 is split into two 单位、每个 containing as equal a number of 模型 as possible (when splitting a 单位 in this way、make a note of which 模型 form 每个 of the two new 单位)。One of these 单位 must start the battle embarked within this 运输工具;the other can start the battle embarked within another 运输工具、或 it can be deployed as a separate 单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "天命者 乌萨尔": [
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
        "id": "unique-ancestral-fortune",
        "name": "先祖之幸",
        "text": "每回合一次，你可花费 1YP 将此模型的一个命中掷骰、一个致伤掷骰或一个豁免掷骰改为未修正的 6。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ancestral Fortune",
          "kind": "unique"
        }
      },
      {
        "id": "unique-grim-efficiency",
        "name": "冷酷效率",
        "text": "每战斗回合一次，当一个友军**沃坦联盟(Leagues of Votann)**单位在此模型 12\" 内被指定为计谋目标时，此模型可使用此能力。若其如此做，将该计谋的使用指令点数成本减少 1指令点。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Grim Efficiency",
          "kind": "unique"
        }
      },
      {
        "id": "unique-rampart-crest",
        "name": "盾垒族徽",
        "text": "当持有者正在领导一个单位时，该单位中的模型拥有 5+ 无敌豁免(InSv)。",
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
            "value": 5,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Rampart Crest",
          "kind": "unique"
        }
      }
    ],
    "弑敌壁垒断角炉卫": [
      {
        "id": "unique-坚决摧毁",
        "name": "坚决摧毁",
        "text": "该单位针对最近的有效目标进行的远程攻击可以重掷结果为 1 的**命中掷骰**。",
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
          "englishName": "坚决摧毁",
          "kind": "unique"
        }
      },
      {
        "id": "unique-织盾符冠",
        "name": "织盾符冠",
        "text": "该单位拥有 5+ **无敌豁免(InSv)**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "织盾符冠",
          "kind": "unique"
        }
      }
    ],
    "弑敌壁垒炉心战士": [
      {
        "id": "unique-织盾符冠",
        "name": "织盾符冠",
        "text": "该单位拥有 5+ **无敌豁免(InSv)**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "织盾符冠",
          "kind": "unique"
        }
      },
      {
        "id": "unique-全光谱扫描",
        "name": "全光谱扫描",
        "text": "该单位进行的远程攻击可以重掷结果为 1 的 **命中掷骰**。",
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
          "englishName": "全光谱扫描",
          "kind": "unique"
        }
      }
    ],
    "弑敌壁垒机锻匠雷霆炮手": [
      {
        "id": "unique-侵彻火力",
        "name": "侵彻火力",
        "text": "在您的射击阶段中，当该单位完成射击时，您可以选择一个被那些攻击命中的敌方单位。若选择，己方**沃坦联盟**单位对那个敌方单位进行的远程攻击拥有**[无视掩体]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "侵彻火力",
          "kind": "unique"
        }
      }
    ],
    "维恩·弑敌者": [
      {
        "id": "unique-织盾符冠",
        "name": "织盾符冠",
        "text": "该模型拥有 4+ **无敌豁免(InSv)**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "织盾符冠",
          "kind": "unique"
        }
      },
      {
        "id": "unique-快速射手",
        "name": "快速射手",
        "text": "该单位的远程攻击拥有**[突击]**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "快速射手",
          "kind": "unique"
        }
      },
      {
        "id": "unique-leader",
        "name": "领袖",
        "text": "该模型可以附加至以下单位：\n■ **弑敌壁垒断角炉卫**",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Leader",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
