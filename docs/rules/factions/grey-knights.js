/* Generated source-text rule package for grey-knights. */
(function (root) {
  root["WarhammerWebsiteRules_grey_knights"] = {
  "factionRules": [
    {
      "id": "grey-knights.army-rule",
      "name": "无限之门",
      "englishName": "Gate of Infinity",
      "text": "对手战斗阶段结束时，你可从战场上选出若干全员具有此能力、且不在敌方交战范围内的单位（最多数量依战斗规模）：\n\n■ 侵袭：1 个\n■ 特遣队：2 个\n■ 全面进攻：3 个\n\n选出后从战场移除，置入战略预备队。",
      "category": "faction",
      "status": "已结构化，当前仅供查阅",
      "effects": [],
      "source": {
        "englishName": "Gate of Infinity",
        "kind": "faction"
      }
    }
  ],
  "unitRules": {
    "兄弟会连长": [
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
        "id": "unique-hammerhand",
        "name": "铁拳",
        "text": "此模型率领一个单位时，该单位中的模型所配备的近战武器具有 **[致命一击]** 能力。",
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
            "phase": "melee",
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Hammerhand",
          "kind": "unique"
        }
      },
      {
        "id": "unique-eye-of-judgement",
        "name": "判决之眼",
        "text": "此模型每次进行攻击时，可重掷致伤掷骰。",
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
          "englishName": "Eye of Judgement",
          "kind": "unique"
        }
      }
    ],
    "兄弟会勇士": [
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
        "id": "unique-clarion-of-haste",
        "name": "急速号角",
        "text": "当此模型领导一个单位时，该单位在前进的回合可以宣布冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Clarion of Haste",
          "kind": "unique"
        }
      },
      {
        "id": "unique-inspiring-exemplar",
        "name": "激励典范",
        "text": "每当此模型在近战阶段摧毁一个敌方 **角色(Character)** 模型时，你获得 1 指令点，且至战役结束，其内姆西斯力量武器的攻击次数特性加 1。",
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
          "englishName": "Inspiring Exemplar",
          "kind": "unique"
        }
      }
    ],
    "兄弟会教士": [
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
        "id": "unique-zealous-path",
        "name": "狂热之道",
        "text": "此模型领导单位期间，可重掷为该单位所进行的冲锋掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Zealous Path",
          "kind": "unique"
        }
      },
      {
        "id": "unique-litanies-of-sanctity",
        "name": "圣洁祷文",
        "text": "每战斗一次，在任何阶段开始时，你可以选择一个己方 **灰骑士(Grey Knights)** 单位，该单位陷入战斗震慑且在此模型 12\" 内。该单位不再陷入战斗震慑。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Litanies of Sanctity",
          "kind": "unique"
        }
      }
    ],
    "兄弟会智库员": [
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
        "id": "unique-sanctic-hood",
        "name": "圣洁护罩",
        "text": "当此模型率领一个单位时，该单位中的模型对灵能攻击具有不觉疼痛4+能力。",
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
          "englishName": "Sanctic Hood",
          "kind": "unique"
        }
      },
      {
        "id": "unique-haloed-in-soulfire",
        "name": "灵火光环",
        "text": "此模型领导一个单位时，该单位只能被距攻击模型 18\" 内的敌方单位选为攻击目标。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Haloed in Soulfire",
          "kind": "unique"
        }
      }
    ],
    "兄弟会科技战士": [
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
        "id": "unique-techmarine",
        "name": "技术军士",
        "text": "当此模型距一或多支己方**灰骑士(Grey Knights)载具(Vehicle)**单位 3\" 内时，此模型具有独行特工能力。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Techmarine",
          "kind": "unique"
        }
      },
      {
        "id": "unique-blessing-of-the-omnissiah",
        "name": "万机神祝福",
        "text": "在你的指挥阶段中，你可以选择一个距此模型 3\" 范围内的友军 **灰骑士(Grey Knights)载具(Vehicle)** 模型。该模型恢复最多 D3 点失去的伤口，并在你下一个指挥阶段开始时之前，每次该 **载具(Vehicle)** 模型进行攻击时，在命中掷骰上加 1。每个模型每回合只能被选择进行此能力一次。",
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
          "englishName": "Blessing of the Omnissiah",
          "kind": "unique"
        }
      },
      {
        "id": "unique-guardians-of-the-machine",
        "name": "机械守护",
        "text": "每次一个敌方单位以与你军队中一个或多个 **灰骑士(Grey Knights)载具(Vehicle)** 单位交战结束其冲锋移动，且在此单位 6\" 内时，你可以用「英勇介入」计谋以此单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做：\n■ 该次使用减少 1 指令点。\n■ 该次使用不会阻止本阶段该计谋用于其他单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Guardians of the Machine",
          "kind": "unique"
        }
      }
    ],
    "兄弟会终结者小队": [
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
        "id": "unique-force-edge",
        "name": "力量刃锋",
        "text": "此单位中的每个模型进行针对某个单位（不含 **凶兽(Monster)** 和 **载具(Vehicle)**）的近战攻击时，将该攻击的护甲穿透特性值提升1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Force Edge",
          "kind": "unique"
        }
      },
      {
        "id": "unique-ancient-s-banner",
        "name": "战团旗帜",
        "text": "持有者所在的单位中的模型其目标控制(OC)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ancient’s Banner",
          "kind": "unique"
        }
      },
      {
        "id": "unique-apothecary-s-narthecium",
        "name": "医疗装具",
        "text": "在你的指挥阶段，若持有者未被摧毁，你可将 1 个被摧毁的模型（不含 **角色(Character)**）归还至持有者所在的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Apothecary’s Narthecium",
          "kind": "unique"
        }
      }
    ],
    "克罗堡主": [
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
        "id": "unique-champion-of-the-order-of-purifiers",
        "name": "净化者军团的冠军",
        "text": "当此模型领导一个单位时，将该单位中模型配备的净化烈焰武器的攻击次数特性增加 1。",
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
            "type": "attack-modifier",
            "value": 1,
            "requiresJoined": true,
            "effectScope": "unit"
          }
        ],
        "source": {
          "englishName": "Champion of the Order of Purifiers",
          "kind": "unique"
        }
      },
      {
        "id": "unique-foesight",
        "name": "敌眼",
        "text": "此模型每次对 **角色(Character)** 单位发动攻击时，可重掷命中掷骰",
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
          "englishName": "Foesight",
          "kind": "unique"
        }
      }
    ],
    "大导师": [
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
        "id": "unique-warrior-strategist",
        "name": "战争策略家",
        "text": "每战斗回合一次，你军队中具有此能力的一个模型在其单位被指令点计谋针对时可使用此能力。若他如此做，减少该计谋该次使用的CP成本1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warrior Strategist",
          "kind": "unique"
        }
      },
      {
        "id": "unique-might-of-titan",
        "name": "泰坦之力",
        "text": "每场战斗一次，在近战阶段开始时，此模型可使用此能力。若如此，直到阶段结束，将此模型配备的近战武器的攻击次数和力量特性加 3。",
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
          },
          {
            "type": "weapon-strength-modifier",
            "value": 3,
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Might of Titan",
          "kind": "unique"
        }
      }
    ],
    "涅墨西斯骇骑机甲大导师": [
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
        "id": "unique-surge-of-wrath",
        "name": "怒火涌现",
        "text": "每次此模型进行以 **凶兽(Monster)** 或 **载具(Vehicle)** 单位为目标的近战攻击时，可重掷命中掷骰，可重掷致伤掷骰且可重掷伤害掷骰。",
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
          },
          {
            "type": "damage-reroll",
            "mode": "failed",
            "phase": "melee"
          }
        ],
        "source": {
          "englishName": "Surge of Wrath",
          "kind": "unique"
        }
      },
      {
        "id": "unique-warrior-strategist",
        "name": "战争策略家",
        "text": "每战斗回合一次，你的军队中一个具有此能力的模型可在其所在单位成为计谋目标时使用此能力。若如此，减少该计谋使用的 CP 代价 1CP。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Warrior Strategist",
          "kind": "unique"
        }
      }
    ],
    "沃尔达斯大导师": [
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
        "id": "unique-sanctuary",
        "name": "圣域",
        "text": "当此模型领导一个单位时，每次攻击指向该单位，命中掷骰减1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Sanctuary",
          "kind": "unique"
        }
      },
      {
        "id": "unique-hammer-aflame",
        "name": "炽焰之锤",
        "text": "此模型单位每次战斗时，你可以选择一个在此模型单位交战范围内的敌方单位，并掷 1 个 D6：掷出 2-3，该敌方单位受 1 点致命伤；掷出 4-5，该敌方单位受 D3 点致命伤；掷出 6，该敌方单位受 D3+3 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Hammer Aflame",
          "kind": "unique"
        }
      }
    ],
    "拦截者小队": [
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
        "id": "unique-personal-teleporters",
        "name": "个人传送器",
        "text": "在你的射击阶段，此单位射击后，若其不在一个或以上敌方单位的交战范围内，其可进行最多 6 英寸的常规移动，如同该为你的移动阶段。如其进行此移动，至该回合结束前，此单位不可宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Personal Teleporters",
          "kind": "unique"
        }
      }
    ],
    "兰德掠袭者战车": [
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
        "id": "unique-assault-ramp",
        "name": "突击跳板",
        "text": "此模型进行正常移动后，每次有单位脱离，该单位在本回合内仍可宣言冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Assault Ramp",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 12 个灰骑士步兵模型。每个终结者模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "十字军型兰德掠袭者战车": [
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
        "id": "unique-assault-ramp",
        "name": "突击跳板",
        "text": "此模型进行正常移动后，每次有单位脱离，该单位在本回合内仍可宣言冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Assault Ramp",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 16 个灰骑士步兵模型。每个终结者模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "救赎者型兰德掠袭者战车": [
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
        "id": "unique-assault-ramp",
        "name": "突击跳板",
        "text": "此模型进行正常移动后，每次有单位脱离，该单位在本回合内仍可宣言冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Assault Ramp",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 14 个灰骑士步兵模型。每个终结者模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "涅墨西斯骇骑机甲": [
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
        "id": "unique-indomitable-spirit",
        "name": "不屈精神",
        "text": "此模型在已经前进或后撤的回合内符合射击和宣布冲锋的资格。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Indomitable Spirit",
          "kind": "unique"
        }
      }
    ],
    "圣骑士小队": [
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
        "id": "unique-attuned-onslaught",
        "name": "调和猛攻",
        "text": "每次该单位进行冲锋移动时，直到回合结束，将该单位中**圣骑士小队**模型装备的近战武器的伤害特性值+1",
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
          "englishName": "Attuned Onslaught",
          "kind": "unique"
        }
      },
      {
        "id": "unique-ancient-s-banner",
        "name": "战团旗帜",
        "text": "持有者所在的单位中的模型其目标控制(OC)特性 +1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Ancient’s Banner",
          "kind": "unique"
        }
      },
      {
        "id": "unique-apothecary-s-narthecium",
        "name": "医疗装具",
        "text": "在你的指挥阶段，若持有者未被摧毁，你可将 1 个被摧毁的模型（不含 **角色(Character)**）归还至持有者所在的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Apothecary’s Narthecium",
          "kind": "unique"
        }
      }
    ],
    "洗罪小队": [
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
        "id": "unique-righteous-persecution",
        "name": "正义迫害",
        "text": "在你的射击阶段，此单位射击后，选择一个被该次攻击中的一个或多个命中的敌方单位（不包括 **凶兽(Monster)** 和 **载具(Vehicle)**）：直到你的下一回合开始，该敌方单位被钉死。单位被钉死期间，该单位的移动特性减少 2，为其进行的冲锋掷骰减少 2。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Righteous Persecution",
          "kind": "unique"
        }
      }
    ],
    "净化者小队": [
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
        "id": "unique-sanctity-of-purpose",
        "name": "神圣使命",
        "text": "此单位内每个模型每次发动攻击时，重掷结果为 1 的致伤掷骰 的结果。若目标在一个目标标记的范围内，你可改为重掷该致伤掷骰。",
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
          "englishName": "Sanctity of Purpose",
          "kind": "unique"
        }
      }
    ],
    "豪猪战车": [
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
        "id": "unique-fire-focus",
        "name": "火力聚焦",
        "text": "在你的射击阶段，此模型射击后，选择一个被该次攻击命中一次或多次的敌方单位。直到回合结束，每次从此 **运输工具(Transport)** 本回合脱离的己方模型对该敌方单位进行攻击时，将该攻击的护甲贯穿特性提升 1。同一敌方单位每回合只能被此能力影响一次。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Fire Focus",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 6 个灰骑士步兵模型。该模型不能运输终结者模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "灰骑士雷鹰炮艇": [
      {
        "id": "core-deadly-demise-d6-2",
        "name": "致命破灭 D6",
        "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Deadly Demise D6+2",
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
        "id": "unique-aerial-assault",
        "name": "空中突击",
        "text": "每次具有深入打击能力的单位在此模型进行正常移动后登陆时，该单位在本回合仍可宣告冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Aerial Assault",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 30 个灰骑士步兵模型。每个终结者模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      },
      {
        "id": "unique-thunderhawk-cluster-bombs",
        "name": "雷鹰集束炸弹",
        "text": "持有者每次结束正常移动时，你可以选择一个它在该次移动中越过的敌方单位，并掷六颗 D6：每出现 3+，该单位受到 1 点致命伤。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Thunderhawk Cluster Bombs",
          "kind": "unique"
        }
      }
    ],
    "犀牛战车": [
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
        "id": "core-firing-deck-2",
        "name": "火力平台2",
        "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Firing Deck 2",
          "kind": "core"
        }
      },
      {
        "id": "unique-truesilver-aegis",
        "name": "真银防线",
        "text": "当友军 **灰骑士(Grey Knights)** 单位完全位于此单位 6\" 范围内时，该单位中的模型对抗致命伤具有不觉疼痛 6+ 能力。",
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
          "englishName": "Truesilver Aegis",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 12 个灰骑士步兵模型。该模型不能运输终结者模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "打击小队": [
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
        "id": "core-scouts-6",
        "name": "斥候6\"",
        "text": "某些单位的能力中列有「斥候x\"」。若单位中的每个模型都有此能力，则在首场战斗回合开始时、首轮开始前，它可以进行一次常规移动，距离不超过x\"，如同在你的移动阶段——任何此单位开战时已搭乘的 **专用运输工具(Dedicated Transport)** 模型也可以如此移动（前提是仅有具此能力的模型搭乘于该 **专用运输工具(Dedicated Transport)** 模型内）。使用此能力移动的单位，其移动必须终止于距离所有敌方模型9\"以上的位置。若双方都有能进行此动作的单位，进行首轮的玩家先移动他们的单位。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Scouts 6\"",
          "kind": "core"
        }
      },
      {
        "id": "unique-sanctifying-ritual",
        "name": "圣化仪式",
        "text": "在你的指挥阶段结束时，若此单位在你控制的目标标记范围内，该目标标记仍在你的控制下，直到你对手在某一阶段结束时对该目标标记的控制度大于你的控制度。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Sanctifying Ritual",
          "kind": "unique"
        }
      }
    ],
    "风暴鹰拦截者战机": [
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
        "id": "unique-interceptor",
        "name": "截击机",
        "text": "每当此模型对能进行 **飞行(Fly)** 的单位发动远距攻击时，命中掷骰 +1。",
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
          "englishName": "Interceptor",
          "kind": "unique"
        }
      }
    ],
    "风暴鸦炮艇": [
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
        "id": "unique-armoured-resilience",
        "name": "装甲强固",
        "text": "此模型每次受到攻击分配时，从该攻击的伤害特性中减去1。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Armoured Resilience",
          "kind": "unique"
        }
      },
      {
        "id": "unique-transport",
        "name": "运输工具",
        "text": "该模型能够搭载 12 个灰骑士步兵模型和 1 GREY KNIGHTS VENERABLE DREADNOUGHT 模型。每个终结者模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Transport",
          "kind": "unique"
        }
      }
    ],
    "风暴爪炮艇": [
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
      }
    ],
    "神圣无畏机甲": [
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
        "id": "unique-guidance-of-the-ancients",
        "name": "古老者的指引",
        "text": "在你的射击阶段中，此单位射击后，选择一个被该次攻击中的一次或多次命中的敌方单位。至该阶段结束前，每次你的军队中的 **灰骑士(Grey Knights)** 模型对该单位发动攻击时，加1到命中掷骰。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Guidance of the Ancients",
          "kind": "unique"
        }
      }
    ],
    "兄弟连长 斯特恩": [
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
        "id": "unique-exemplar-of-the-silvered-host",
        "name": "银甲主军典范",
        "text": "此单位中的模型进行近战攻击每当造成暴击致伤时，目标承受 1 额外造成的伤害。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Exemplar of the Silvered Host",
          "kind": "unique"
        }
      },
      {
        "id": "unique-strands-of-fate-psychic",
        "name": "命运之线",
        "text": "此模型首次被摧毁时，在阶段结束时掷一个 D6：结果为 2+，则以全部伤口将其复位于原位置尽可能相近处，且不在任何敌方模型的交战范围内。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Strands of Fate (Psychic)",
          "kind": "unique"
        }
      }
    ],
    "克罗的净化者打击小队": [
      {
        "id": "unique-圣化仪式-灵能",
        "name": "圣化仪式（灵能）",
        "text": "在您的指挥阶段结束时，如果该单位控制一个**目标**，那个**目标**被**占领**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "圣化仪式（灵能）",
          "kind": "unique"
        }
      },
      {
        "id": "unique-战斗小队",
        "name": "战斗小队",
        "text": "在宣布战斗编队步骤开始时，您可以将该单位分成两个独立的单位，每一个单位中包含五个模型。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "战斗小队",
          "kind": "unique"
        }
      }
    ],
    "灰骑士圣物剃刀背运兵车": [
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
        "id": "core-gate-of-infinity",
        "name": "无限之门",
        "text": "若你的军队阵营为 **灰骑士(Grey Knights)**，则在你对手的近战阶段结束时，你可以从你的军队中选择数个单位（见下文）在战场上（不包括与一个或多个敌方单位相邻的单位），前提是这些单位中的每个模型都具有此能力。你能选择的单位数上限取决于战场规模（确切数量依官方战场规模表）。\n\n做出选择后，将这些单位从战场上移除，并将其放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Gate of Infinity",
          "kind": "core"
        }
      },
      {
        "id": "unique-fire-support",
        "name": "火力支援",
        "text": "在你的射击阶段，此模型射击后，选择其在本阶段命中一次或多次的一个敌方单位。直到阶段结束，每个本回合从此运输工具脱离的友军模型每次对该敌方单位进行攻击时，可重掷致伤掷骰。",
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
      }
    ],
    "卡多·德莱戈": [
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
        "id": "core-gate-of-infinity",
        "name": "无限之门",
        "text": "若你的军队阵营为 **灰骑士(Grey Knights)**，则在你对手的近战阶段结束时，你可以从你的军队中选择数个单位（见下文）在战场上（不包括与一个或多个敌方单位相邻的单位），前提是这些单位中的每个模型都具有此能力。你能选择的单位数上限取决于战场规模（确切数量依官方战场规模表）。\n\n做出选择后，将这些单位从战场上移除，并将其放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Gate of Infinity",
          "kind": "core"
        }
      },
      {
        "id": "unique-untouchable-purity",
        "name": "不可触碰之纯洁",
        "text": "此模型统领的单位中所有模型对致命伤具有不觉疼痛4+。",
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
          "englishName": "Untouchable Purity",
          "kind": "unique"
        }
      },
      {
        "id": "unique-one-with-the-warp-psychic",
        "name": "与亚空间合一",
        "text": "每场战斗一次，当此模型所属单位在深入打击部署的同一回合中宣告冲锋时，对冲锋掷骰+3。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "One With the Warp (Psychic)",
          "kind": "unique"
        }
      }
    ],
    "战仆": [
      {
        "id": "unique-mindlock",
        "name": "心智锁链",
        "text": "当一个兄弟会技术圣战士模型率领此单位时，改善此单位内侍僧模型配备的远程和近战武器的射击技巧和械斗技巧特性各 1。",
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
        "text": "在宣告战斗编队步骤开始时，此单位可以加入你的军队中由一个兄弟会技术圣师领导的另一个单位（一个单位不能有超过一个随从机器人单位加入它）。如果它这样做，直到战斗结束，此单位中的每个模型计为该护卫单位的一部分，且该护卫单位的起始兵力相应增加。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Servitor Retinue",
          "kind": "unique"
        }
      }
    ],
    "灰骑士无畏机甲": [
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
        "id": "core-gate-of-infinity",
        "name": "无限之门",
        "text": "若你的军队阵营为 **灰骑士(Grey Knights)**，则在你对手的近战阶段结束时，你可以从你的军队中选择数个单位（见下文）在战场上（不包括与一个或多个敌方单位相邻的单位），前提是这些单位中的每个模型都具有此能力。你能选择的单位数上限取决于战场规模（确切数量依官方战场规模表）。\n\n做出选择后，将这些单位从战场上移除，并将其放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Gate of Infinity",
          "kind": "core"
        }
      },
      {
        "id": "unique-wisdom-of-the-ancients-aura",
        "name": "古者智慧（光环）",
        "text": "当己方灰骑士步兵单位在此模型 6\" 内时，该单位中的每个模型每次发动攻击时，可重掷结果为 1 的命中掷骰 和重掷结果为 1 的致伤掷骰。",
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
          "englishName": "Wisdom of the Ancients (Aura)",
          "kind": "unique"
        }
      }
    ],
    "兰德掠夺者·驱魔型": [
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
        "id": "core-gate-of-infinity",
        "name": "无限之门",
        "text": "若你的军队阵营为 **灰骑士(Grey Knights)**，则在你对手的近战阶段结束时，你可以从你的军队中选择数个单位（见下文）在战场上（不包括与一个或多个敌方单位相邻的单位），前提是这些单位中的每个模型都具有此能力。你能选择的单位数上限取决于战场规模（确切数量依官方战场规模表）。\n\n做出选择后，将这些单位从战场上移除，并将其放入战略预备队。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Gate of Infinity",
          "kind": "core"
        }
      },
      {
        "id": "unique-land-raider-banisher",
        "name": "驱魔型地掠袭者",
        "text": "此模型具有 12 个灰骑士步兵模型的运输容量。每个终结者模型占用 2 个模型的空间。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Land Raider Banisher",
          "kind": "unique"
        }
      },
      {
        "id": "unique-assault-ramp",
        "name": "突击跳板",
        "text": "此模型进行正常移动后，每次有单位脱离，该单位在本回合内仍可宣言冲锋。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "Assault Ramp",
          "kind": "unique"
        }
      }
    ],
    "克罗的净化者神圣无畏机甲": [
      {
        "id": "unique-先贤引导-灵能",
        "name": "先贤引导（灵能）",
        "text": "在您的射击阶段中，当该单位完成射击时，您可以选择一个被那些远程攻击命中的敌方单位。若选择，己方**灰骑士**模型对那个敌方单位进行的远程攻击拥有 +1 **命中掷骰**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "先贤引导（灵能）",
          "kind": "unique"
        }
      }
    ],
    "克罗的净化者兄弟会终结者小队": [
      {
        "id": "unique-灵能利刃-灵能",
        "name": "灵能利刃（灵能）",
        "text": "该单位对一个单位（**凶兽／载具**单位除外）进行的近战攻击拥有 +1 **AP**。",
        "status": "已结构化，当前仅供查阅",
        "effects": [],
        "source": {
          "englishName": "灵能利刃（灵能）",
          "kind": "unique"
        }
      }
    ],
    "净化者克罗堡主": [
      {
        "id": "unique-宿敌洞察-灵能",
        "name": "宿敌洞察（灵能）",
        "text": "当该单位对**角色**单位进行攻击时，您可以重掷**命中掷骰**。",
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
          "englishName": "宿敌洞察（灵能）",
          "kind": "unique"
        }
      }
    ]
  }
};
})(typeof globalThis === 'undefined' ? this : globalThis);
