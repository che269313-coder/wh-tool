/* Generated from docs/data/欧克兽人/欧克兽人-网站原始数据-简体.json. Regenerate with tools/generate-orks-rules.mjs. */
(function (root) {
  const factionRules = [
  {
    "id": "orks.army.waagh",
    "name": "瓦戈！",
    "text": "如果你的军队阵营是欧克兽人，每场战斗一次，在己方指挥阶段开始时可以发起瓦戈！。直到你的下一个指挥阶段开始前，具有此能力的单位即使本回合前进也可宣告冲锋；具有此能力的模型所装备的近战武器力量与攻击特性各 +1；具有此能力的模型获得 5+ 无敌豁免。",
    "status": "部分计算支持：勾选后计入近战武器力量 +1、近战攻击次数 +1 和 5+ 无敌豁免；前进后冲锋资格保留原文显示。",
    "controls": [
      {
        "id": "enabled",
        "type": "checkbox",
        "label": "本次战斗已发起瓦戈！"
      }
    ],
    "effects": [
      {
        "type": "weapon-strength-modifier",
        "value": 1,
        "phase": "melee",
        "selection": {
          "controlId": "enabled",
          "equals": true
        }
      },
      {
        "type": "attack-modifier",
        "value": 1,
        "phase": "melee",
        "selection": {
          "controlId": "enabled",
          "equals": true
        }
      },
      {
        "type": "invulnerable-save",
        "value": 5,
        "selection": {
          "controlId": "enabled",
          "equals": true
        }
      }
    ],
    "source": {
      "url": "https://40k.aiinpocket.com/faction/orks/",
      "file": "欧克兽人-网站原始数据.json"
    }
  }
];
  const unitRules = {
  "战斗堡垒": [
    {
      "id": "orks.battlewagon.ability-1",
      "name": "致命破灭 D6",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "Deadly Demise D6",
        "kind": "unique"
      }
    },
    {
      "id": "orks.battlewagon.ability-2",
      "name": "射击甲板11",
      "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "Firing Deck 11",
        "kind": "unique"
      }
    },
    {
      "id": "orks.battlewagon.ability-3",
      "name": "摇摇欲坠但结实",
      "text": "此模型每次分配攻击时，恶化该攻击的护甲穿透特性 1。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "incoming-ap",
          "value": 1
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "Ramshackle but Rugged",
        "kind": "unique"
      }
    },
    {
      "id": "orks.battlewagon.ability-4",
      "name": "运载",
      "text": "该模型能够搭载 22 个欧克蛮人步兵模型。若该模型配备 a killkannon，则其运载量为 12 欧克蛮人步兵模型。每个 MEGA ARMOUR 或跳跃包模型占用 2 个模型的空间。The 碎骨者·斯拉卡模型占用 4 个模型的空间。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "Transport",
        "kind": "unique"
      }
    },
    {
      "id": "orks.battlewagon.ability-5",
      "name": "装备选项",
      "text": "■ 此模型可配备以下其中之一： ? 1 把大炮 ? 1 把杀戮炮 ? 1 把滋滋枪",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.battlewagon.ability-6",
      "name": "装备选项",
      "text": "■ 此模型可以配备： ? 1 个 吼吼炮",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    },
    {
      "id": "orks.battlewagon.ability-7",
      "name": "装备选项",
      "text": "■ 此模型可配备最多 4 把大射枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "Wargear ability 3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.battlewagon.ability-8",
      "name": "装备选项",
      "text": "■ 此模型的履带和轮子可被替换为 1 部破坏滚筒。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "Wargear ability 4",
        "kind": "unique"
      }
    },
    {
      "id": "orks.battlewagon.ability-9",
      "name": "装备选项",
      "text": "■ 此模型可配备下列任一项： ? 1 个钢盔舱 ? 1 只掠夺爪 ? 1 条破坏球",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "Wargear ability 5",
        "kind": "unique"
      }
    },
    {
      "id": "orks.battlewagon.ability-10",
      "name": "硬壳装甲",
      "text": "为持有者的强韧(T)特性 +2，但其不再拥有射击甲板能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 1,
        "englishName": "’Ard Case",
        "kind": "unique"
      }
    }
  ],
  "野兽头目": [
    {
      "id": "orks.beastboss.ability-1",
      "name": "不觉疼痛6+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 2,
        "englishName": "Feel No Pain 6+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.beastboss.ability-2",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 2,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.beastboss.ability-3",
      "name": "猛兽老大",
      "text": "当此模型领导一个单位时，该单位中的每个模型每次进行近战攻击时，于命中掷骰上加1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "phase": "melee",
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 2,
        "englishName": "Beastboss",
        "kind": "unique"
      }
    },
    {
      "id": "orks.beastboss.ability-4",
      "name": "蛮兽之怒",
      "text": "此模型每次进行冲锋移动时，直到该回合结束，其配备的近战武器具有 **[毁灭伤害]** 能力。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "charged",
          "type": "checkbox",
          "label": "本单位本回合进行过冲锋移动"
        }
      ],
      "effects": [
        {
          "type": "devastating-wounds",
          "phase": "melee",
          "selection": {
            "controlId": "charged",
            "equals": true
          }
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 2,
        "englishName": "Ferocious Rage",
        "kind": "unique"
      }
    }
  ],
  "骑跳跳恐龙的野兽头目": [
    {
      "id": "orks.beastboss-on-squigosaur.ability-1",
      "name": "不觉疼痛5+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 3,
        "englishName": "Feel No Pain 5+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.beastboss-on-squigosaur.ability-2",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 3,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.beastboss-on-squigosaur.ability-3",
      "name": "雷霆踩踏",
      "text": "此模型领导一个单位时，为该单位进行的冲锋掷骰 +1。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 3,
        "englishName": "Thundering Stampede",
        "kind": "unique"
      }
    },
    {
      "id": "orks.beastboss-on-squigosaur.ability-4",
      "name": "专注猎手",
      "text": "你可以用「英勇介入」计谋以此单位为目标，且无视本阶段该计谋的其他使用次数。若你如此做： ■ 该次使用减少 1 指令点。 ■ 该次使用不会阻止本阶段该计谋用于其他单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 3,
        "englishName": "Single-minded Predator",
        "kind": "unique"
      }
    },
    {
      "id": "orks.beastboss-on-squigosaur.ability-5",
      "name": "装备选项",
      "text": "■ 此模型可配备 1 把重拳枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 3,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "豢兽师小子": [
    {
      "id": "orks.beast-snagga-boyz.ability-1",
      "name": "不觉疼痛6+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 4,
        "englishName": "Feel No Pain 6+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.beast-snagga-boyz.ability-2",
      "name": "猎兽者",
      "text": "此单位的每个模型每次对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位发动攻击时，可重掷命中掷骰。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        },
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-reroll",
          "mode": "failed",
          "requiresTargetMonsterVehicle": true
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 4,
        "englishName": "Monster Hunters",
        "kind": "unique"
      }
    },
    {
      "id": "orks.beast-snagga-boyz.ability-3",
      "name": "装备选项",
      "text": "■ 此单位每 10 个模型中，1 个蛮兽猎手的散弹枪和劈刀可替换为 1 把巨击枪和 1 把近战武器。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 4,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "大头头目碉堡": [
    {
      "id": "orks.biged-bossbunka.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 5,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.biged-bossbunka.ability-2",
      "name": "射击甲板11",
      "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 5,
        "englishName": "Firing Deck 11",
        "kind": "unique"
      }
    },
    {
      "id": "orks.biged-bossbunka.ability-3",
      "name": "破烂掩护",
      "text": "每当远程攻击分配给一个模型时，若该模型因此 **防御工事(Fortification)** 而不被攻击单位的每个模型完全看见，则该模型对该攻击获得掩体增益。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 5,
        "englishName": "Ramshackle Cover",
        "kind": "unique"
      }
    },
    {
      "id": "orks.biged-bossbunka.ability-4",
      "name": "呐喊杆",
      "text": "友军 **欧克蛮人(Orks)** 单位距此 **要塞** 6\" 内时，该单位内模型的领导力特性 +1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 5,
        "englishName": "Shoutin’ Pole",
        "kind": "unique"
      }
    },
    {
      "id": "orks.biged-bossbunka.ability-5",
      "name": "防御工事",
      "text": "当敌方单位仅在你的军队中一个或多个 **防御工事(Fortification)** 的交战范围内时： ■ 该单位仍可被选为远程攻击的目标，但每次进行此类攻击时，除非该攻击是用手枪进行，否则从命中掷骰减 1。 ■ 该单位中的模型在战斗震慑时后撤时无需进行狼狈逃亡测试，除非它们在此过程中会越过敌方模型。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "targetInFortificationRange",
          "type": "checkbox",
          "label": "目标满足防御工事交战范围条件"
        }
      ],
      "effects": [
        {
          "type": "incoming-hit-minus",
          "value": 1,
          "phase": "ranged",
          "selection": {
            "controlId": "targetInFortificationRange",
            "equals": true
          }
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 5,
        "englishName": "Fortification",
        "kind": "unique"
      }
    },
    {
      "id": "orks.biged-bossbunka.ability-6",
      "name": "运载",
      "text": "该模型能够搭载 11 个欧克蛮人步兵模型。每个 MEGA ARMOUR 或跳跃包模型占用 2 个模型的空间。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 5,
        "englishName": "Transport",
        "kind": "unique"
      }
    },
    {
      "id": "orks.biged-bossbunka.ability-7",
      "name": "装备选项",
      "text": "■ 此模型可配备最多 3 个额外的大射手枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 5,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "大技师": [
    {
      "id": "orks.big-mek.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 6,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek.ability-2",
      "name": "更多火力",
      "text": "当此模型率领一个单位时，该单位中的模型每次进行远程攻击时，命中掷骰为1时可重掷。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        },
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-reroll",
          "mode": "ones",
          "phase": "ranged",
          "requiresJoined": true
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 6,
        "englishName": "More Dakka",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek.ability-3",
      "name": "震荡推进器",
      "text": "你可重掷此模型所在单位进行的前进掷骰。此外，每次此模型所在单位进行常规、前进或后撤移动时，该单位中的模型可以穿过其他模型和地形特征。在这样做时，它们可以移动至交战范围内，但不能在交战范围内结束该移动，且任何狼狈逃亡检测会自动通过。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 6,
        "englishName": "Shokk-boosta",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek.ability-4",
      "name": "装备选项",
      "text": "■ 此模型的卡斯多姆巨型爆炸枪可替换为 1 拖拉机爆炸枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 6,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek.ability-5",
      "name": "装备选项",
      "text": "■ 此模型的能量爪可被替换为 1 把钻机。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 6,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    }
  ],
  "超重型护甲蛮人大技师": [
    {
      "id": "orks.big-mek-in-mega-armour.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 7,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-in-mega-armour.ability-2",
      "name": "更多火力",
      "text": "当此模型领导一个单位时，该单位中每个模型进行远距攻击时，重掷结果为 1 的命中掷骰。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "hit-reroll",
          "mode": "failed",
          "phase": "ranged",
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 7,
        "englishName": "More Dakka",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-in-mega-armour.ability-3",
      "name": "修好那个盔甲",
      "text": "此模型正领导一个单位时，在你的指挥阶段，你可将 1 个已摧毁的护卫模型复原至该单位。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 7,
        "englishName": "Fix Dat Armour Up",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-in-mega-armour.ability-4",
      "name": "装备选项",
      "text": "■ 此模型的kustom-mega blasta可被替换为以下之一： ? 1把旋锯 ? 1把火爆连射枪 ? 1把改装射击枪",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 7,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-in-mega-armour.ability-5",
      "name": "装备选项",
      "text": "■ 此模型可装备以下其中之一： ? 1 把传送炮 ? 1 个客制化力场",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 7,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-in-mega-armour.ability-6",
      "name": "装备选项",
      "text": "■ 此模型可配备1名小妖精技工。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 7,
        "englishName": "Wargear ability 3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-in-mega-armour.ability-7",
      "name": "葛切钦注油工",
      "text": "每场战斗一次，于你的移动阶段结束时，持有者所在的单位中的一个模型恢复 D3 点失去的伤口。 *",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 7,
        "englishName": "Grot Oiler",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-in-mega-armour.ability-8",
      "name": "客制力场",
      "text": "当持有者正在带领一个单位时，该单位中的模型对远程攻击具有 4+ 无敌豁免(InSv)。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "phase": "ranged",
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 7,
        "englishName": "Kustom Force Field",
        "kind": "unique"
      }
    }
  ],
  "装备震荡攻击炮的蛮人大技师": [
    {
      "id": "orks.big-mek-with-shokk-attack-gun.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 8,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-with-shokk-attack-gun.ability-2",
      "name": "更多火力",
      "text": "当此模型领导一个单位时，该单位中每个模型进行远距攻击时，重掷结果为 1 的命中掷骰。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "hit-reroll",
          "mode": "failed",
          "phase": "ranged",
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 8,
        "englishName": "More Dakka",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-with-shokk-attack-gun.ability-3",
      "name": "疯狂小鬼突击",
      "text": "在你的射击阶段中，此模型射击后，选择一个被该次攻击命中一次或多次的敌方单位；该单位必须进行战斗震慑测试。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 8,
        "englishName": "Deranged Snotling Assault",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-with-shokk-attack-gun.ability-4",
      "name": "装备选项",
      "text": "■ 此模型可配备 1 名地精助手。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 8,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-with-shokk-attack-gun.ability-5",
      "name": "葛切钦助手",
      "text": "每场战斗可进行一次，在掷骰决定持有者的冲击攻击炮进行多少次攻击后，你可重掷该骰。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 8,
        "englishName": "Grot Assistant",
        "kind": "unique"
      }
    }
  ],
  "闪电轰炸机": [
    {
      "id": "orks.blitza-bommer.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 9,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.blitza-bommer.ability-2",
      "name": "闪击轰炸",
      "text": "在你对手的近战阶段结束时，选择此单位 24\" 内一个可见的敌方单位（**独行特工** 单位除外），并为该单位掷 1 枚 D6：4+ 时，该单位受到 D6 点致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 9,
        "englishName": "Boom Bomb",
        "kind": "unique"
      }
    }
  ],
  "爆裂靓车": [
    {
      "id": "orks.boomdakka-snazzwagon.ability-1",
      "name": "致命破灭 1",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 10,
        "englishName": "Deadly Demise 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boomdakka-snazzwagon.ability-2",
      "name": "滚滚浓烟",
      "text": "当敌方单位（**凶兽(Monster)** 和 **载具(Vehicle)** 除外）在此模型 6\" 内时，该单位中的模型每次发动攻击时，命中掷骰减 1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        }
      ],
      "effects": [
        {
          "type": "incoming-hit-minus",
          "value": 1
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 10,
        "englishName": "Billowing Fumes",
        "kind": "unique"
      }
    }
  ],
  "鬼祟鼠头目": [
    {
      "id": "orks.boss-snikrot.ability-1",
      "name": "渗透",
      "text": "于部署时，若单位中的每个模型都具有此能力，则当你部署该单位时，可以将其部署在战场上的任何位置，该位置距敌军部署区域超过8\"，且距所有敌军模型超过8\"。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 11,
        "englishName": "Infiltrators",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boss-snikrot.ability-2",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 11,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boss-snikrot.ability-3",
      "name": "独行特工",
      "text": "除非此单位为联合单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 11,
        "englishName": "Lone Operative",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boss-snikrot.ability-4",
      "name": "潜行",
      "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 11,
        "englishName": "Stealth",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boss-snikrot.ability-5",
      "name": "红骷髅突击队",
      "text": "此单位对抗远程攻击时，其模型的护甲检定特性 +1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 11,
        "englishName": "Red Skull Kommandos",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boss-snikrot.ability-6",
      "name": "狡猾潜行者",
      "text": "每场战斗一次，在你的移动阶段，此模型的单位可不进行一般移动，而是从战场移除，并在战场上距所有敌方模型横向超过 9\" 的任何地点重新布署。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 11,
        "englishName": "Kunnin’ Infiltrator",
        "kind": "unique"
      }
    }
  ],
  "蛮人小子": [
    {
      "id": "orks.boyz.ability-1",
      "name": "抢好东西",
      "text": "在你的指挥阶段结束时，如果该单位在你控制的目标标记范围内，该目标标记保持在你的控制下，直到你对手在任一阶段结束时对该目标标记的控制度大于你的为止。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 12,
        "englishName": "Get Da Good Bitz",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boyz.ability-2",
      "name": "装备选项",
      "text": "■ 头目恶棍的大砍刀可被替换为 1 把力量爪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 12,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boyz.ability-3",
      "name": "装备选项",
      "text": "■ 大头目的大砍刀和火枪可替换为 1 件复合武器和 1 件近战武器。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 12,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boyz.ability-4",
      "name": "装备选项",
      "text": "■ 任意数量的兽人小子可各自将其黑颈枪和砍刀替换为 1 把射手枪和 1 把近战武器。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 12,
        "englishName": "Wargear ability 3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boyz.ability-5",
      "name": "装备选项",
      "text": "■ 此单位每 10 个模型中，1 个小子的砍刀和枪管可替换为下列其中之一： ? 1 门大枪和 1 件近战武器 ? 1 门火箭炮和 1 件近战武器",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 12,
        "englishName": "Wargear ability 4",
        "kind": "unique"
      }
    }
  ],
  "毁灭小子": [
    {
      "id": "orks.breaka-boyz.ability-1",
      "name": "猎首者",
      "text": "此单位每次宣布冲锋时，可重掷冲锋掷骰。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 13,
        "englishName": "Trophy Hunters",
        "kind": "unique"
      }
    },
    {
      "id": "orks.breaka-boyz.ability-2",
      "name": "炸弹虫",
      "text": "每场战斗一次，此单位每有一个炸弹松鼠，此单位结束一次正常移动后，可使用一个炸弹松鼠。若你如此做，选择一个敌方单位在 12\" 内且此单位可见，掷一个 D6：掷出 3+，该敌方单位承受 D3 点致命伤。 **设计者注记：** 在该单位旁边放置两个炸弹松鼠指示物，每次此单位使用此能力时移除一个。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 13,
        "englishName": "Bomb Squigs",
        "kind": "unique"
      }
    },
    {
      "id": "orks.breaka-boyz.ability-3",
      "name": "装备选项",
      "text": "■ 首领诺柏的粉碎锤可替换为 1 火箭手枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 13,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.breaka-boyz.ability-4",
      "name": "装备选项",
      "text": "■ 一个碎裂男孩的粉碎锤可替换为 1 关节破裂枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 13,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    },
    {
      "id": "orks.breaka-boyz.ability-5",
      "name": "装备选项",
      "text": "■ 一名碎骨少年的击碎锤可替换为 1 把坦克锤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 13,
        "englishName": "Wargear ability 3",
        "kind": "unique"
      }
    }
  ],
  "烈火轰炸机": [
    {
      "id": "orks.burna-bommer.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 14,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.burna-bommer.ability-2",
      "name": "烧烧轰炸",
      "text": "在你对手的近战阶段结束时，你可以选择此单位 24\" 内一个可见的敌方单位（**独行特工(Lone Operative)** 单位除外）： ■ 直到你的下一回合结束，友方 **欧克(Orks)** 单位以该敌方单位为目标的远程攻击具有 **[无视掩体]**。 ■ 为该敌方单位中每个模型掷 1 枚 D6：每掷出 6，该单位受到 1 点致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 14,
        "englishName": "Burna Bomb",
        "kind": "unique"
      }
    },
    {
      "id": "orks.burna-bommer.ability-3",
      "name": "装备选项",
      "text": "■ 此模型可配备 1 个 焦灭枪 飞弹架。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 14,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "喷火小子": [
    {
      "id": "orks.burna-boyz.ability-1",
      "name": "烧光一切",
      "text": "此单位中的每个模型每次用焚化枪对 6\" 范围内的敌方单位进行远程攻击时，可重掷结果为 1 的致伤掷骰。如果该攻击的目标同时在目标标记的范围内，你可改为重掷致伤掷骰。",
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
          "type": "wound-reroll",
          "mode": "failed",
          "phase": "ranged"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 15,
        "englishName": "Pyromaniaks",
        "kind": "unique"
      }
    },
    {
      "id": "orks.burna-boyz.ability-2",
      "name": "装备选项",
      "text": "■ 任意数量的机修工可各自将其大射击枪替换为下列其中一项： ? 1 改造超级炮 ? 1 火箭筒",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 15,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "蛮人战斗机": [
    {
      "id": "orks.dakkajet.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 16,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.dakkajet.ability-2",
      "name": "达卡风暴",
      "text": "每次此模型发动远距攻击时，每次成功的命中掷骰视为暴击命中。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 16,
        "englishName": "Dakkastorm",
        "kind": "unique"
      }
    },
    {
      "id": "orks.dakkajet.ability-3",
      "name": "装备选项",
      "text": "■ 此模型可配备 1 具额外的双重超级射枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 16,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "死亡无畏机甲": [
    {
      "id": "orks.deff-dread.ability-1",
      "name": "致命破灭 1",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 17,
        "englishName": "Deadly Demise 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deff-dread.ability-2",
      "name": "活塞驱动蛮力",
      "text": "每次此模型结束冲锋移动时，选择一个在其交战范围内的敌方单位并掷一个 D6：结果为 2-5 时，该敌方单位承受 D3 点致命伤；结果为 6 时，该敌方单位承受 D3+3 点致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 17,
        "englishName": "Piston-driven Brutality",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deff-dread.ability-3",
      "name": "装备选项",
      "text": "■ 此模型的巨型枪可各自替换为以下其中之一： ? 1把恐惧爪 ? 1门客制超级枪 ? 1具火箭炮 ? 1门烧烤炮",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 17,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deff-dread.ability-4",
      "name": "装备选项",
      "text": "■ 此模型的恐惧爪可各自被替换为下列其中之一： ? 1 门大口径枪 ? 1 门客制-超级爆裂炮 ? 1 门火箭炮 ? 1 门火焰炮",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 17,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    }
  ],
  "死亡杀手三轮战车": [
    {
      "id": "orks.deffkilla-wartrike.ability-1",
      "name": "致命破灭 1",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 18,
        "englishName": "Deadly Demise 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deffkilla-wartrike.ability-2",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 18,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deffkilla-wartrike.ability-3",
      "name": "飙车老大",
      "text": "当此模型率领一个单位时，该单位中的每个模型每次进行近战攻击时，命中掷骰加1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "phase": "melee",
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 18,
        "englishName": "Speedboss",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deffkilla-wartrike.ability-4",
      "name": "加油小鬼",
      "text": "此单位每次前进时，不掷前进掷骰。取而代之，在该阶段结束前，将该单位内模型的移动特性提高 6\"。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 18,
        "englishName": "Fuel-mixa Grot",
        "kind": "unique"
      }
    }
  ],
  "死亡直升机": [
    {
      "id": "orks.deffkoptas.ability-1",
      "name": "深入打击",
      "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。 若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 19,
        "englishName": "Deep Strike",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deffkoptas.ability-2",
      "name": "来自天空的死亡",
      "text": "此单位每次结束正常移动时，你可以选择在该移动期间其移动超过的一个敌方单位，并为此单位中的每个模型掷一次D6：每个4+，该敌方单位承受1点致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 19,
        "englishName": "Deff from Above",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deffkoptas.ability-3",
      "name": "装备选项",
      "text": "■ 每3个此单位中的模型，1架战斗直升机可以将其炮火火箭替换为1把客制巨型爆枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 19,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "怪枪小子": [
    {
      "id": "orks.flash-gitz.ability-1",
      "name": "爱炫耀的枪手",
      "text": "此单位中的每个模型每次用酱菜枪瞄准最接近的合格目标时，至本阶段结束，该武器的攻击次数特性变为 4。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 20,
        "englishName": "Gun-crazy Show-offs",
        "kind": "unique"
      }
    },
    {
      "id": "orks.flash-gitz.ability-2",
      "name": "装备选项",
      "text": "■ 此单位可配备 1 只弹药小鬼。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 20,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.flash-gitz.ability-3",
      "name": "弹药格雷特",
      "text": "每场战斗一次，当此单位被选择进行射击时，其可以使用此能力。若如此做，直到该阶段结束，此单位中的模型装备的远程武器具有 **[致命一击]** 能力。 *",
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
          "type": "lethal-hits",
          "phase": "ranged"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 20,
        "englishName": "Ammo Runt",
        "kind": "unique"
      }
    }
  ],
  "碎骨者·斯拉卡": [
    {
      "id": "orks.ghazghkull-thraka.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 21,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.ghazghkull-thraka.ability-2",
      "name": "大瓦戈！先知",
      "text": "此单位领导一个单位时，该单位中的模型每次进行近战攻击时，命中掷骰 +1，致伤掷骰 +1，若咻啊！对你的军队有效，未修正命中掷骰为 5+ 视为暴击命中。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "waaghActive",
          "type": "checkbox",
          "label": "瓦戈！对本军队处于启动状态"
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
          "phase": "melee",
          "selection": {
            "controlId": "waaghActive",
            "equals": true
          },
          "requiresJoined": true,
          "activation": "passive"
        },
        {
          "type": "wound-modifier",
          "value": 1,
          "phase": "melee",
          "selection": {
            "controlId": "waaghActive",
            "equals": true
          },
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 21,
        "englishName": "Prophet of Da Great Waaagh!",
        "kind": "unique"
      }
    },
    {
      "id": "orks.ghazghkull-thraka.ability-3",
      "name": "葛兹古尔的瓦戈！ 旗帜",
      "text": "当己方 **欧克蛮人(Orks)** 单位在马卡利12\"范围内时，如果你的军队的瓦戈！处于活跃状态，该单位中的模型配备的近战武器具有 **[致命一击]** 能力。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "lethal-hits",
          "phase": "melee"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 21,
        "englishName": "Ghazghkull’s Waaagh! Banner",
        "kind": "unique"
      }
    },
    {
      "id": "orks.ghazghkull-thraka.ability-4",
      "name": "最高统帅",
      "text": "若此单位在你的军队中,则其碎骨者·斯拉卡模型必须是你的统帅(Warlord)。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 21,
        "englishName": "Supreme Commander",
        "kind": "unique"
      }
    }
  ],
  "格克机甲": [
    {
      "id": "orks.gorkanaut.ability-1",
      "name": "致命破灭 D6",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 22,
        "englishName": "Deadly Demise D6",
        "kind": "unique"
      }
    },
    {
      "id": "orks.gorkanaut.ability-2",
      "name": "轰隆前进",
      "text": "此模型每次进行常规、前进或后撤移动时，可以越过敌方模型（**凶兽(Monster)**和 **载具(Vehicle)**除外）和高度 4\" 或更少的地形，如同它们不存在一样。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 22,
        "englishName": "Clankin’ Forward",
        "kind": "unique"
      }
    },
    {
      "id": "orks.gorkanaut.ability-3",
      "name": "大而猛",
      "text": "此模型每次进行近战攻击时，若咻啊！对你的军队有效，命中掷骰+1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "waaghActive",
          "type": "checkbox",
          "label": "瓦戈！对本军队处于启动状态"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1,
          "phase": "melee",
          "selection": {
            "controlId": "waaghActive",
            "equals": true
          }
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 22,
        "englishName": "Big an’ Stompy",
        "kind": "unique"
      }
    },
    {
      "id": "orks.gorkanaut.ability-4",
      "name": "运载",
      "text": "该模型能够搭载 12 个欧克蛮人步兵模型。每个 MEGA ARMOUR 或跳跃包模型占用 2 个模型的空间。该模型不能运输碎骨者·斯拉卡。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 22,
        "englishName": "Transport",
        "kind": "unique"
      }
    }
  ],
  "强巨史古革巨兽": [
    {
      "id": "orks.gargantuan-squiggoth.ability-1",
      "name": "致命破灭 2",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 23,
        "englishName": "Deadly Demise 2D6",
        "kind": "unique"
      }
    },
    {
      "id": "orks.gargantuan-squiggoth.ability-2",
      "name": "射击甲板20",
      "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 23,
        "englishName": "Firing Deck 20",
        "kind": "unique"
      }
    },
    {
      "id": "orks.gargantuan-squiggoth.ability-3",
      "name": "巨兽",
      "text": "每次此模型进行普通、推进或后撤移动时，它可以越过模型（**巨型(Titanic)** 模型除外）与高度4\"或以下的地形，如同它们不存在一样。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 23,
        "englishName": "Gargantuan",
        "kind": "unique"
      }
    },
    {
      "id": "orks.gargantuan-squiggoth.ability-4",
      "name": "移动堡垒",
      "text": "此模型进行远距离攻击时，敌方单位位于其交战范围内不会受命中掷骰减值。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 23,
        "englishName": "Walking Bastion",
        "kind": "unique"
      }
    },
    {
      "id": "orks.gargantuan-squiggoth.ability-5",
      "name": "运载",
      "text": "该模型能够搭载 20 个欧克蛮人步兵模型。每个 MEGA ARMOUR 或跳跃包模型占用 2 个模型的空间。碎骨者·斯拉卡占用 18 个模型的空间。若该模型配备 a supa-kannon，则其运载量为 15 欧克蛮人步兵模型。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 23,
        "englishName": "Transport",
        "kind": "unique"
      }
    },
    {
      "id": "orks.gargantuan-squiggoth.ability-6",
      "name": "装备选项",
      "text": "此模型可配备下列其一： ? 1 门炮 ? 1 门超级炮",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 23,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "屁精": [
    {
      "id": "orks.gretchin.ability-1",
      "name": "监工",
      "text": "每次攻击指向此单位时，如果其中包含一个或多个 葛切钦 模型，直到该攻击被解决为止，此单位中的 监工 模型的韧性特性为 2。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 24,
        "englishName": "Runtherd",
        "kind": "unique"
      }
    },
    {
      "id": "orks.gretchin.ability-2",
      "name": "偷窃搜刮",
      "text": "在你的移动阶段开始时，对于你控制且其范围内有你军队中具此能力的单位的每个目标标记（不包括战斗-震慑状态的单位），掷一次D6。若一次或多次掷骰结果为4+，你获得1CP。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 24,
        "englishName": "Thievin’ Scavengers",
        "kind": "unique"
      }
    }
  ],
  "狩猎战车": [
    {
      "id": "orks.hunta-rig.ability-1",
      "name": "致命破灭 D6",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 25,
        "englishName": "Deadly Demise D6",
        "kind": "unique"
      }
    },
    {
      "id": "orks.hunta-rig.ability-2",
      "name": "不觉疼痛6+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 25,
        "englishName": "Feel No Pain 6+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.hunta-rig.ability-3",
      "name": "射击甲板11",
      "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 25,
        "englishName": "Firing Deck 11",
        "kind": "unique"
      }
    },
    {
      "id": "orks.hunta-rig.ability-4",
      "name": "狩猎进行中",
      "text": "对于此 **运输工具(Transport)** 内搭乘的每个模型，将此模型的屠夫兽人小子武器的攻击次数特性加 1（最多加到 +6）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 25,
        "englishName": "On Da Hunt",
        "kind": "unique"
      }
    },
    {
      "id": "orks.hunta-rig.ability-5",
      "name": "运载",
      "text": "该模型能够搭载 21 个 BEAST SNAGGA INFANTRY 模型。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 25,
        "englishName": "Transport",
        "kind": "unique"
      }
    }
  ],
  "杀戮机甲": [
    {
      "id": "orks.killa-kans.ability-1",
      "name": "致命破灭 1",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 26,
        "englishName": "Deadly Demise 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.killa-kans.ability-2",
      "name": "狂射能量",
      "text": "每次选定此单位射击时，可掷一个 D6： ■ 结果为 1-2，此单位承受 D3 点致命伤。 ■ 结果为 3-4，直到阶段结束，此单位模型配备的远程武器力量特性 +1。 ■ 结果为 5-6，直到阶段结束，此单位模型配备的远程武器攻击次数特性 +1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "mode",
          "type": "select",
          "label": "本次选择",
          "options": [
            [
              "none",
              "不启用"
            ],
            [
              "strength",
              "远程武器力量 +1"
            ],
            [
              "attacks",
              "远程武器攻击次数 +1"
            ]
          ]
        }
      ],
      "effects": [
        {
          "type": "weapon-strength-modifier",
          "value": 1,
          "phase": "ranged",
          "selection": {
            "controlId": "mode",
            "equals": "strength"
          }
        },
        {
          "type": "attack-modifier",
          "value": 1,
          "phase": "ranged",
          "selection": {
            "controlId": "mode",
            "equals": "attacks"
          }
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 26,
        "englishName": "Shooty Power Trip",
        "kind": "unique"
      }
    },
    {
      "id": "orks.killa-kans.ability-3",
      "name": "装备选项",
      "text": "■ 每个杀戮罐的罐枪可替换为下列其中一项： ? 1 件兽咆炮 ? 1 件火箭炮 ? 1 件烧枪",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 26,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "杀戮战车（Kill Rig）": [
    {
      "id": "orks.kill-rig.ability-1",
      "name": "致命破灭 D6",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 27,
        "englishName": "Deadly Demise D6",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kill-rig.ability-2",
      "name": "不觉疼痛6+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 27,
        "englishName": "Feel No Pain 6+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kill-rig.ability-3",
      "name": "戈尔克之灵",
      "text": "在近战阶段开始时，你可选择此模型 12\" 内的一个己方 **欧克蛮人(Orks)** 单位并掷一颗 D6：若掷出 1，此模型承受 D3 点致命伤；若掷出 2-5，直到阶段结束，将该单位模型配备的近战武器的力量特性加 1；若掷出 6，直到阶段结束，将该单位模型配备的近战武器的力量特性加 1，且这些武器具有 **[致命一击]** 能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 27,
        "englishName": "Spirit of Gork",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kill-rig.ability-4",
      "name": "运载",
      "text": "该模型能够搭载 11 个 BEAST SNAGGA INFANTRY 模型。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 27,
        "englishName": "Transport",
        "kind": "unique"
      }
    }
  ],
  "特种兵": [
    {
      "id": "orks.kommandos.ability-1",
      "name": "渗透",
      "text": "于部署时，若单位中的每个模型都具有此能力，则当你部署该单位时，可以将其部署在战场上的任何位置，该位置距敌军部署区域超过8\"，且距所有敌军模型超过8\"。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Infiltrators",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-2",
      "name": "潜行",
      "text": "若此单位的每个模型都具有此能力，则每次对其进行远程攻击时，从该攻击的命中掷骰中减去 1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Stealth",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-3",
      "name": "狡猾的家伙们",
      "text": "敌方单位不能使用射击监视计谋对此单位射击。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Sneaky Gitz",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-4",
      "name": "巡逻小队",
      "text": "在宣告战斗编成步骤开始时,此单位可拆分为两个单位,每个各含五个模型。(以此方式拆分时,记下哪些模型构成这两个新单位之一。若你拆分的单位配备 1 只炸弹鱿或/与 1 只扰敌哥布林,则战斗中只有其中一个新单位能使用该能力——记下是哪一个新单位。)",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Patrol Squad",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-5",
      "name": "装备选项",
      "text": "■ 首领诺布的砍刀可替换为以下之一： ? 1 把大砍刀 ? 1 把动力爪",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-6",
      "name": "装备选项",
      "text": "■ 最多 2 个特种兵可各自将其枪与斩刀替换为 1 把客制化枪与 1 件近战武器。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-7",
      "name": "装备选项",
      "text": "■ 1 突击队员的猎枪和砍刀可用 1 破城锤替换。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Wargear ability 3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-8",
      "name": "装备选项",
      "text": "■ 1 名通常兵的枪和砍刀可被替换为 1 支火焰枪和 1 件近战武器。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Wargear ability 4",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-9",
      "name": "装备选项",
      "text": "■ 1 个突击队员的小枪和砍刀可替换为 1 个火箭发射器和 1 把近战武器。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Wargear ability 5",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-10",
      "name": "装备选项",
      "text": "■ 此单位可配备 1 颗炸弹蛊。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Wargear ability 6",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-11",
      "name": "装备选项",
      "text": "■ 此单位可配备 1 个分心小怪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Wargear ability 7",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-12",
      "name": "诱饵葛切钦",
      "text": "每场战斗一次，在你对手的射击阶段，于为此单位中的一个模型进行防护掷骰之前，它可以部署诱饵格罗（distraction grot）。若如此做，直到该阶段结束，此单位中的模型具有 5+ 无敌豁免(InSv)。 *",
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
          "type": "invulnerable-save",
          "value": 5,
          "phase": "ranged"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Distraction Grot",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kommandos.ability-13",
      "name": "炸弹史奎格",
      "text": "此单位每拥有一只炸弹鼠猪，每场战斗可进行一次：在此单位结束一次正常移动后，你可使用一次炸弹鼠猪。若如此做，选择此单位 12\" 内且其可见的一个敌方单位并掷一颗 D6：掷出 3+ 时，该敌方单位受到 D3 致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 28,
        "englishName": "Bomb Squig",
        "kind": "unique"
      }
    }
  ],
  "自制增压爆枪战车": [
    {
      "id": "orks.kustom-boosta-blasta.ability-1",
      "name": "致命破灭 1",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 29,
        "englishName": "Deadly Demise 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kustom-boosta-blasta.ability-2",
      "name": "铆钉哒哒",
      "text": "在你的射击阶段，此模型射击后，选择 1 个被此模型用铆钉炮发动的 1 次或多次攻击命中的敌方单位。直至你的下个回合开始为止，该敌方单位被压制。单位被压制时，该单位内每个模型每次发动远程攻击时，命中掷骰减 1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 29,
        "englishName": "Rivetin’ Dakka",
        "kind": "unique"
      }
    }
  ],
  "蛮人拾荒者": [
    {
      "id": "orks.lootas.ability-1",
      "name": "那是我们的！",
      "text": "此单位中每个模型进行远程攻击时，重掷结果为 1 的命中掷骰。若该攻击的目标在目标标记的范围内，可重掷命中掷骰。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "targetWithin9",
          "type": "checkbox",
          "label": "满足目标距离或目标标记条件"
        },
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-reroll",
          "mode": "ones",
          "phase": "ranged"
        },
        {
          "type": "hit-reroll",
          "mode": "failed",
          "phase": "ranged",
          "selection": {
            "controlId": "targetWithin9",
            "equals": true
          }
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 30,
        "englishName": "Dat’s Our Loot!",
        "kind": "unique"
      }
    },
    {
      "id": "orks.lootas.ability-2",
      "name": "装备选项",
      "text": "■ 任意数量的扳手工人可各自将其大炮替换为以下之一： ? 1 门克斯汀超级爆破枪 ? 1 门火箭炮",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 30,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "重甲强蛮人": [
    {
      "id": "orks.meganobz.ability-1",
      "name": "痛扁时刻",
      "text": "当「咻啊！」对你的军队活跃时，此单位中的模型具有不觉疼痛5+ 能力。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "fnp",
          "threshold": 5
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 31,
        "englishName": "Krumpin’ Time",
        "kind": "unique"
      }
    },
    {
      "id": "orks.meganobz.ability-2",
      "name": "装备选项",
      "text": "■ 任意数量的模型各可将其自订射击枪和强力爪替换为以下之一： ? 1把复合式武器和1个强力爪 ? 1把复合式武器和1把杀戮锯 ? 1把自订射击枪和1把杀戮锯 ? 1把杀戮锯和1个强力爪 ? 1把双联杀戮锯",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 31,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "喷气巨卡": [
    {
      "id": "orks.megatrakk-scrapjet.ability-1",
      "name": "致命破灭 1",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 32,
        "englishName": "Deadly Demise 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.megatrakk-scrapjet.ability-2",
      "name": "穿刺冲撞",
      "text": "此模型每次完成一次冲锋移动时，选择一个在其交战范围内的敌方单位并掷一个 D6：在 2-5 上，该敌方单位受到 D3 点致命伤；在 6 上，该敌方单位受到 3 点致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 32,
        "englishName": "Drill Through",
        "kind": "unique"
      }
    }
  ],
  "蛮人技师": [
    {
      "id": "orks.mek.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 33,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mek.ability-2",
      "name": "知道-知识",
      "text": "当此模型位于一个或多个友军 **欧克蛮人(Orks)载具(Vehicle)** 单位 3\" 范围内时，此模型具有独行特工能力。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 33,
        "englishName": "Know-wotz",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mek.ability-3",
      "name": "修修补补",
      "text": "在你的移动阶段结束时，你可以选择一个在此模型3\"范围内的己方 **欧克蛮人(Orks)载具(Vehicle)** 模型。该 **载具(Vehicle)** 模型回复最多D3点失去的伤口，并且直到你下个移动阶段开始为止，每次该 **载具(Vehicle)** 模型发动攻击时，命中掷骰+1。每个模型每回合只能被选择一次用于此能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 33,
        "englishName": "Mekaniak",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mek.ability-4",
      "name": "装备选项",
      "text": "■ 此模型的近战武器可被替换为 1 杀戮锯。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 33,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "技师炮": [
    {
      "id": "orks.mek-gunz.ability-1",
      "name": "啪！",
      "text": "每当此单位的模型发动远程攻击针对处于起始兵力的单位时（不包括 **凶兽(Monster)** 和 **载具(Vehicle)**），重掷结果为 1 的命中掷骰。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        }
      ],
      "effects": [
        {
          "type": "hit-reroll",
          "mode": "failed",
          "requiresTargetMonsterVehicle": true,
          "phase": "ranged"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 34,
        "englishName": "Splat!",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mek-gunz.ability-2",
      "name": "装备选项",
      "text": "■ 每个模型的碎岩枪可被替换为以下任意一项： ? 1 把泡沫发射枪 ? 1 把客制超级巨炮 ? 1 把牵引炮",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 34,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "摩克机甲": [
    {
      "id": "orks.morkanaut.ability-1",
      "name": "致命破灭 D6",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 35,
        "englishName": "Deadly Demise D6",
        "kind": "unique"
      }
    },
    {
      "id": "orks.morkanaut.ability-2",
      "name": "轰隆前进",
      "text": "此模型每次进行常规、前进或后撤移动时，可以越过敌方模型（**凶兽(Monster)**和 **载具(Vehicle)**除外）和高度 4\" 或更少的地形，如同它们不存在一样。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 35,
        "englishName": "Clankin’ Forward",
        "kind": "unique"
      }
    },
    {
      "id": "orks.morkanaut.ability-3",
      "name": "大而善射",
      "text": "此模型每次进行远距攻击时，若咻啊！对你的军队生效，命中掷骰 +1。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1,
          "phase": "ranged"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 35,
        "englishName": "Big an’ Shooty",
        "kind": "unique"
      }
    },
    {
      "id": "orks.morkanaut.ability-4",
      "name": "运载",
      "text": "该模型能够搭载 12 个欧克蛮人步兵模型 (不含碎骨者·斯拉卡)。每个 MEGA ARMOUR 或跳跃包模型占用 2 个模型的空间。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 35,
        "englishName": "Transport",
        "kind": "unique"
      }
    }
  ],
  "莫兹罗格·斯夸格巴德": [
    {
      "id": "orks.mozrog-skragbad.ability-1",
      "name": "不觉疼痛5+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 36,
        "englishName": "Feel No Pain 5+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mozrog-skragbad.ability-2",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 36,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mozrog-skragbad.ability-3",
      "name": "最后一杀",
      "text": "当此模型领导一个单位时，每次该单位中的一个模型被近战攻击消灭，若它在此阶段未曾战斗，掷一个D6：结果为4+时，不将其移除游戏外。被摧毁的模型可在攻击单位完成其攻击后进行战斗，然后被移除游戏外。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 36,
        "englishName": "One Last Kill",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mozrog-skragbad.ability-4",
      "name": "越大越痛",
      "text": "此模型每次对 **凶兽(Monster)** 或 **载具(Vehicle)** 单位发动近战攻击时，将该攻击的伤害特性加 1。此模型每次对 **巨型(Titanic)** 单位发动近战攻击时，改为将该攻击的伤害特性加 2。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        }
      ],
      "effects": [
        {
          "type": "damage-modifier",
          "value": 1,
          "requiresTargetMonsterVehicle": true,
          "phase": "melee"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 36,
        "englishName": "Da Bigger Dey Iz…",
        "kind": "unique"
      }
    }
  ],
  "强蛮人": [
    {
      "id": "orks.nobz.ability-1",
      "name": "头目的小子们",
      "text": "当 **战斧头** 模型率领此单位时，每次攻击以此单位为目标，若该攻击的力量特性大于此单位的韧性特性，从致伤掷骰减 1。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "incoming-wound-minus",
          "value": 1
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 37,
        "englishName": "Da Boss’ Ladz",
        "kind": "unique"
      }
    },
    {
      "id": "orks.nobz.ability-2",
      "name": "装备选项",
      "text": "■ 任意数量的模型各自可将其大砍刀替换为 1 把力量爪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 37,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.nobz.ability-3",
      "name": "装备选项",
      "text": "■ 任意数量的模型可各自将其 粗暴手枪 和 大砍刀 替换为 1 个组合武器和 1 个近战武器。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 37,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    },
    {
      "id": "orks.nobz.ability-4",
      "name": "装备选项",
      "text": "■ 每5个此单位中的模型，此单位可配备1个弹药小鬼。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 37,
        "englishName": "Wargear ability 3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.nobz.ability-5",
      "name": "弹药格雷特",
      "text": "此单位每拥有一个弹药侏儒，每场战斗可进行一次：当此单位被选择射击时，其可使用此能力。若如此做，直到该阶段结束，此单位中模型所装备的远程武器拥有 **[致命一击]** 能力。",
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
          "type": "lethal-hits",
          "phase": "ranged"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 37,
        "englishName": "Ammo Runt",
        "kind": "unique"
      }
    }
  ],
  "痛苦头目": [
    {
      "id": "orks.painboss.ability-1",
      "name": "不觉疼痛5+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 38,
        "englishName": "Feel No Pain 5+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboss.ability-2",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 38,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboss.ability-3",
      "name": "兽人医术",
      "text": "当此模型带领一个单位时，该单位中的模型具有不觉疼痛 5+ 能力。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 38,
        "englishName": "Dok’s Toolz",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboss.ability-4",
      "name": "锯骨术",
      "text": "在你的移动阶段结束时，选择一个距离此模型 3\" 内的己方 **豢兽师(Beast Snagga) 角色** 模型。该模型获得治疗并回复至多 3 点失去的伤口。每个模型每轮只能被治疗一次。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 38,
        "englishName": "Sawbonez",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboss.ability-5",
      "name": "装备选项",
      "text": "■ 此模型可以配备1个地精护士。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 38,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboss.ability-6",
      "name": "葛切钦勤务员",
      "text": "每场战斗一次，在你的指挥阶段，若持有者正在带领一个低于其起始兵力的单位，你可以将至多 D3 个被消灭的护卫（Bodyguard）模型放回该单位。 *",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 38,
        "englishName": "Grot Orderly",
        "kind": "unique"
      }
    }
  ],
  "痛苦小子": [
    {
      "id": "orks.painboy.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 39,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboy.ability-2",
      "name": "兽人医术",
      "text": "当此模型带领一个单位时，该单位中的模型具有不觉疼痛 5+ 能力。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 39,
        "englishName": "Dok’s Toolz",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboy.ability-3",
      "name": "站好别动，哀号一声",
      "text": "此模型每次以其「粗暴注射针」所进行的攻击对单位（**载具(Vehicle)** 单位除外）造成暴击致伤时，该单位遭受 D6 点致命伤。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 39,
        "englishName": "Hold Still and Say ‘Aargh!’",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboy.ability-4",
      "name": "装备选项",
      "text": "■ 此模型可配备 1 个地精侍从。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 39,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboy.ability-5",
      "name": "葛切钦勤务员",
      "text": "每场战斗一次，在你的指挥阶段，若持有者正在带领一个低于其起始兵力的单位，你可以将至多 D3 个被消灭的护卫（Bodyguard）模型放回该单位。 *",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 39,
        "englishName": "Grot Orderly",
        "kind": "unique"
      }
    }
  ],
  "跳跳越野战车": [
    {
      "id": "orks.rukkatrukk-squigbuggy.ability-1",
      "name": "致命破灭 1",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 40,
        "englishName": "Deadly Demise 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.rukkatrukk-squigbuggy.ability-2",
      "name": "嗡嗡小虫",
      "text": "在你的射击阶段，此模型射击后，选择一个被其中一或多个虫蛮发射器攻击命中的敌方单位（不含 **凶兽(Monster)** 和 **载具(Vehicle)**），并掷 1D6：4+ 时，直到你对手的下一回合结束，该敌方单位被阻碍。被阻碍的单位的移动特性 -2\"，其前进和冲锋掷骰 -2。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 40,
        "englishName": "Buzzer Squigs",
        "kind": "unique"
      }
    },
    {
      "id": "orks.rukkatrukk-squigbuggy.ability-3",
      "name": "虫虫地雷",
      "text": "每场战斗一次，在任何阶段开始时，选择距此模型 3\" 内的一个敌方单位并掷骰一个 D6：在 4+ 时，该敌方单位承受 D6 点致命伤。 **设计者注记：**：在该模型旁放置一个 虫虫地雷 代币，此能力被使用后移除。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 40,
        "englishName": "Squig Mine",
        "kind": "unique"
      }
    }
  ],
  "激波跃变跑车": [
    {
      "id": "orks.shokkjump-dragsta.ability-1",
      "name": "致命破灭 1",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 41,
        "englishName": "Deadly Demise 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.shokkjump-dragsta.ability-2",
      "name": "震跳隧道",
      "text": "此模型每次被选择前进时，你可将其从战场上移除，并改为将其放置到战场上任何位置，且该位置距所有敌方模型水平距离超过 9\"，而非进行推进移动（此模型仍视为在该回合进行过前进）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 41,
        "englishName": "Shokk Tunnel",
        "kind": "unique"
      }
    }
  ],
  "跳跳猪小子": [
    {
      "id": "orks.squighog-boyz.ability-1",
      "name": "不觉疼痛5+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 42,
        "englishName": "Feel No Pain 5+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.squighog-boyz.ability-2",
      "name": "疯狂奔驰",
      "text": "你可忽略对此单位移动特性的任何或所有修正，以及为此单位进行的前进与冲锋掷骰的修正。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 42,
        "englishName": "Wild Ride",
        "kind": "unique"
      }
    },
    {
      "id": "orks.squighog-boyz.ability-3",
      "name": "装备选项",
      "text": "■ 此单位每 4 个模型可配备 1 只炸弹地鼠。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 42,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.squighog-boyz.ability-4",
      "name": "炸弹史奎格",
      "text": "此单位每拥有一只炸弹鼠猪，每场战斗可进行一次：在此单位结束一次正常移动后，你可使用一次炸弹鼠猪。若如此做，选择此单位 12\" 内且其可见的一个敌方单位并掷一颗 D6：掷出 3+ 时，该敌方单位受到 D3 致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 42,
        "englishName": "Bomb Squig",
        "kind": "unique"
      }
    }
  ],
  "践踏巨机": [
    {
      "id": "orks.stompa.ability-1",
      "name": "致命破灭 2",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 43,
        "englishName": "Deadly Demise 2D6",
        "kind": "unique"
      }
    },
    {
      "id": "orks.stompa.ability-2",
      "name": "咻啊！雕像",
      "text": "己方 **欧克蛮人(Orks)** 单位在此模型 12\" 范围内期间，每次为该单位进行战斗震慑测试时，该测试 +1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 43,
        "englishName": "Waaagh! Effigy",
        "kind": "unique"
      }
    },
    {
      "id": "orks.stompa.ability-3",
      "name": "踏步前进",
      "text": "每次此模型进行常规、前进或后撤移动时，它可以越过模型（不包括**钜型**模型）和高度 4\" 以下的地形特征，视其不存在。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 43,
        "englishName": "Stompin’ Forward",
        "kind": "unique"
      }
    },
    {
      "id": "orks.stompa.ability-4",
      "name": "运载",
      "text": "该模型能够搭载 22 个欧克蛮人步兵模型。每个 MEGA ARMOUR 或跳跃包模型占用 2 个模型的空间。The 碎骨者·斯拉卡模型占用 4 个模型的空间。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 43,
        "englishName": "Transport",
        "kind": "unique"
      }
    }
  ],
  "风暴小子": [
    {
      "id": "orks.stormboyz.ability-1",
      "name": "深入打击",
      "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。 若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 44,
        "englishName": "Deep Strike",
        "kind": "unique"
      }
    },
    {
      "id": "orks.stormboyz.ability-2",
      "name": "全速前进",
      "text": "此单位在进行前进或后撤的回合中可宣布冲锋。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 44,
        "englishName": "Full Throttle",
        "kind": "unique"
      }
    },
    {
      "id": "orks.stormboyz.ability-3",
      "name": "装备选项",
      "text": "■ 头目诺布的斩刀可改为 1 个动力利爪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 44,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "坦克破坏者": [
    {
      "id": "orks.tankbustas.ability-1",
      "name": "坦克猎手",
      "text": "每当此单位中的模型以远程攻击目标 **凶兽(Monster)** 或 **载具(Vehicle)** 单位时，命中掷骰加 1，致伤掷骰加 1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        }
      ],
      "effects": [
        {
          "type": "hit-modifier",
          "value": 1,
          "phase": "ranged",
          "requiresTargetMonsterVehicle": true
        },
        {
          "type": "wound-modifier",
          "value": 1,
          "phase": "ranged",
          "requiresTargetMonsterVehicle": true
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 45,
        "englishName": "Tank Hunters",
        "kind": "unique"
      }
    },
    {
      "id": "orks.tankbustas.ability-2",
      "name": "炸弹虫",
      "text": "每场战斗一次，此单位每有一个炸弹松鼠，此单位结束一次正常移动后，可使用一个炸弹松鼠。若你如此做，选择一个敌方单位在 12\" 内且此单位可见，掷一个 D6：掷出 3+，该敌方单位承受 D3 点致命伤。 **设计者注记：** 在该单位旁边放置两个炸弹松鼠指示物，每次此单位使用此能力时移除一个。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 45,
        "englishName": "Bomb Squigs",
        "kind": "unique"
      }
    },
    {
      "id": "orks.tankbustas.ability-3",
      "name": "装备选项",
      "text": "■ 头目诺布的 1 把火箭手枪可替换为 1 把粉碎锤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 45,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.tankbustas.ability-4",
      "name": "装备选项",
      "text": "■ 1 名破坦克手可配备以下其中之一： ? 1 支脉冲火箭 ? 1 支额外的火箭炮",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 45,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    },
    {
      "id": "orks.tankbustas.ability-5",
      "name": "脉冲火箭",
      "text": "每场战斗一次，当持有者所在的单位于你的射击阶段被选择进行射击时，持有者可以使用其脉冲火箭(pulsa rokkit)。若如此做，直到该阶段结束，持有者所在的单位中的模型装备的远程武器其力量(S)特性与护甲穿透特性 +1。",
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
          "type": "weapon-strength-modifier",
          "value": 1,
          "phase": "ranged"
        },
        {
          "type": "weapon-ap-modifier",
          "value": 1,
          "phase": "ranged"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 45,
        "englishName": "Pulsa Rokkit",
        "kind": "unique"
      }
    }
  ],
  "蛮人卡车": [
    {
      "id": "orks.trukk.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 46,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.trukk.ability-2",
      "name": "射击甲板12",
      "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 46,
        "englishName": "Firing Deck 12",
        "kind": "unique"
      }
    },
    {
      "id": "orks.trukk.ability-3",
      "name": "葛切钦修理工",
      "text": "在你的指挥阶段开始时，此模型恢复 1 点失去的伤口。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 46,
        "englishName": "Grot Riggers",
        "kind": "unique"
      }
    },
    {
      "id": "orks.trukk.ability-4",
      "name": "运载",
      "text": "该模型能够搭载 12 个欧克蛮人步兵模型。每个 MEGA ARMOUR 模型占用 2 个模型的空间。该模型不能运输跳跃包或碎骨者·斯拉卡模型。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 46,
        "englishName": "Transport",
        "kind": "unique"
      }
    },
    {
      "id": "orks.trukk.ability-5",
      "name": "装备选项",
      "text": "■ 此模型可配备 1 件砸爆球。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 46,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    }
  ],
  "摩托小子": [
    {
      "id": "orks.warbikers.ability-1",
      "name": "射击飞掠",
      "text": "此单位中每个模型每次发动目标距9\"以内单位的远距攻击时，将该攻击的护甲穿透特性提升1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "targetWithin9",
          "type": "checkbox",
          "label": "满足目标距离或目标标记条件"
        }
      ],
      "effects": [
        {
          "type": "weapon-ap-modifier",
          "value": 1,
          "phase": "ranged",
          "selection": {
            "controlId": "targetWithin9",
            "equals": true
          }
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 47,
        "englishName": "Drive-by Dakka",
        "kind": "unique"
      }
    },
    {
      "id": "orks.warbikers.ability-2",
      "name": "装备选项",
      "text": "■ 每个战争机车骑士可配备下列之一： ? 1 支粗枪 ? 1 把砍刀",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 47,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.warbikers.ability-3",
      "name": "装备选项",
      "text": "■ 战车首领诺布可配备以下之一： ? 1 把枪 ? 1 把大砍刀 ? 1 把动力爪",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 47,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    }
  ],
  "战争头目": [
    {
      "id": "orks.warboss.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 48,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.warboss.ability-2",
      "name": "最大最坏",
      "text": "此模型领导单位时，该单位中的模型每次进行近战攻击时，命中掷骰 +1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "phase": "melee",
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 48,
        "englishName": "Might is Right",
        "kind": "unique"
      }
    },
    {
      "id": "orks.warboss.ability-3",
      "name": "最大也最猛",
      "text": "当咻啊！对你的军队启动时，此模型的近战武器的攻击次数特性增加 4。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "waaghActive",
          "type": "checkbox",
          "label": "瓦戈！对本军队处于启动状态"
        }
      ],
      "effects": [
        {
          "type": "attack-modifier",
          "value": 4,
          "phase": "melee",
          "selection": {
            "controlId": "waaghActive",
            "equals": true
          }
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 48,
        "englishName": "Da Biggest and da Best",
        "kind": "unique"
      }
    },
    {
      "id": "orks.warboss.ability-4",
      "name": "装备选项",
      "text": "■ 此模型的大刀可被替换为 1 动力爪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 48,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.warboss.ability-5",
      "name": "装备选项",
      "text": "■ 此模型可配备 1 只攻击史克万。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 48,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    }
  ],
  "超重型护甲战争头目": [
    {
      "id": "orks.warboss-in-mega-armour.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 49,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.warboss-in-mega-armour.ability-2",
      "name": "最大最坏",
      "text": "此模型领导单位时，该单位中的模型每次进行近战攻击时，命中掷骰 +1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "phase": "melee",
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 49,
        "englishName": "Might is Right",
        "kind": "unique"
      }
    },
    {
      "id": "orks.warboss-in-mega-armour.ability-3",
      "name": "极度残暴",
      "text": "当咻啊！对你的军队启动时，此模型的「巨大砍刀」伤害特性值为 3。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 49,
        "englishName": "Dead Brutal",
        "kind": "unique"
      }
    }
  ],
  "瓦兹达卡·古茨梅克": [
    {
      "id": "orks.wazdakka-gutsmek.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 50,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazdakka-gutsmek.ability-2",
      "name": "深入打击",
      "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。 若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 50,
        "englishName": "Deep Strike",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazdakka-gutsmek.ability-3",
      "name": "独行特工",
      "text": "除非此单位为联合单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 50,
        "englishName": "Lone Operative",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazdakka-gutsmek.ability-4",
      "name": "修理小虫",
      "text": "在你的指挥阶段开始时，此模型恢复最多 D3 点已失去的伤口。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 50,
        "englishName": "Fixit da Grot",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazdakka-gutsmek.ability-5",
      "name": "纵火火箭休克引擎",
      "text": "在你的指挥阶段，选择 纵火火箭休克引擎 部分中的一个能力。直到你下个指挥阶段开始，此模型具有该能力。 **涡轮引擎：** 此单位在进行了前进或后撤的回合中仍符合宣告冲锋的资格。 **休克攻击引擎：** 在你的指挥阶段，若此单位不位于一个或多个敌方单位的交战范围内，你可以将其移出战场并置入战略预备队。 **脉冲喷射：** 每当此单位前进时，不要为其进行前进掷骰。改为直到此阶段结束： ■ 此单位中模型的移动特性 +6\"。 ■ 此单位中的模型可以穿过模型与地形要素移动。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 50,
        "englishName": "Throttlerokkit Shokka Engine",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazdakka-gutsmek.ability-6",
      "name": "哇——！瓦兹达卡",
      "text": "若此模型为你的统帅(Warlord),则你军队中的 WARBIKER 单位具有 BATTLELINE 关键字。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 50,
        "englishName": "Waaagh! Wazdakka",
        "kind": "unique"
      }
    }
  ],
  "爆炸喷气战机": [
    {
      "id": "orks.wazbom-blastajet.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 51,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazbom-blastajet.ability-2",
      "name": "爆射机攻击",
      "text": "此模型每次对无法 **飞行(Fly)** 的单位进行远程攻击时，可重掷结果为 1 的命中掷骰。",
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
          "type": "hit-reroll",
          "mode": "failed",
          "phase": "ranged"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 51,
        "englishName": "Blastajet Attack Run",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazbom-blastajet.ability-3",
      "name": "装备选项",
      "text": "■ 此模型的双联瓦兹轰鸣超级加农炮可替换为 1 个双联传送点超级爆枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 51,
        "englishName": "Wargear ability",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazbom-blastajet.ability-4",
      "name": "装备选项",
      "text": "■ 此模型可配备 1 爆震喷射力场。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 51,
        "englishName": "Wargear ability 2",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazbom-blastajet.ability-5",
      "name": "装备选项",
      "text": "■ 此模型可配备 1 双联超级枪。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 51,
        "englishName": "Wargear ability 3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wazbom-blastajet.ability-6",
      "name": "爆破机力场",
      "text": "持有者拥有 4+ 无敌豁免(InSv)，但失去 **手榴弹(Grenades)** 关键字。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 4
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 51,
        "englishName": "Blastajet Force Field",
        "kind": "unique"
      }
    }
  ],
  "灵能小子": [
    {
      "id": "orks.weirdboy.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 52,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.weirdboy.ability-2",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 52,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.weirdboy.ability-3",
      "name": "瓦戈！能量",
      "text": "当此模型率领一个单位时，为此模型的「爆破槌」武器的力量和伤害特性各加上该单位每5个模型的数值（向下取整），但当该单位包含10个或更多模型时，该武器具有 **[危险]** 能力。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 52,
        "englishName": "Waaagh! Energy",
        "kind": "unique"
      }
    },
    {
      "id": "orks.weirdboy.ability-4",
      "name": "跳跃",
      "text": "每轮限定一次，在你的移动阶段结束时，你的军队中的一个**怪异小子**可以使用此能力。若它如此做，掷一个 D6：掷出 1 时，该**怪异小子**的单位遭受 D6 道致命伤；掷出 2+ 时，从战场移除该**怪异小子**的单位，并在距离所有敌方模型 8\" 以上的战场任何位置重新部署。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 52,
        "englishName": "Da Jump",
        "kind": "unique"
      }
    }
  ],
  "战争小子": [
    {
      "id": "orks.wurrboy.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 53,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wurrboy.ability-2",
      "name": "不觉疼痛6+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 53,
        "englishName": "Feel No Pain 6+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wurrboy.ability-3",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 53,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wurrboy.ability-4",
      "name": "不稳定预言者",
      "text": "当此模型领导一个单位时，此模型的獣眼枪武器的攻击次数特性每 5 个该单位中的模型增加 2（向下取整），但当该单位包含 10 个或以上的模型时，该武器具有 **[危险]** 能力。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "attack-modifier",
          "value": 2,
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 53,
        "englishName": "Unstable Oracle",
        "kind": "unique"
      }
    },
    {
      "id": "orks.wurrboy.ability-5",
      "name": "莫克的怒吼",
      "text": "在你对手的指挥阶段，可选择一个距此 **灵能者(Psyker)** 在 18\" 内且可见的敌方单位，并掷一次 D6：结果为 1 时，此 **灵能者(Psyker)** 的单位承受 D3 点致命伤；结果为 2+ 时，直到你对手的下一个指挥阶段开始，该敌方单位陷入困惑状态。当一个单位陷入困惑状态时，每次为其进行战斗震慑或战斗震慑测试时，该测试上-2。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 53,
        "englishName": "Roar of Mork",
        "kind": "unique"
      }
    }
  ],
  "佐德格罗德·沃茨纳加": [
    {
      "id": "orks.zodgrod-wortsnagga.ability-1",
      "name": "不觉疼痛6+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 54,
        "englishName": "Feel No Pain 6+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.zodgrod-wortsnagga.ability-2",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 54,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.zodgrod-wortsnagga.ability-3",
      "name": "超级小鬼训练",
      "text": "当此模型率领一个单位时： ■ 该单位内的模型具有斥候9\" 能力。 ■ 该单位内每个模型每次进行攻击时，命中掷骰加 1，致伤掷骰加 1。 ■ 每次攻击针对该单位时，致伤掷骰减 1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "requiresJoined": true,
          "activation": "passive"
        },
        {
          "type": "wound-modifier",
          "value": 1,
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 54,
        "englishName": "Super Runts",
        "kind": "unique"
      }
    },
    {
      "id": "orks.zodgrod-wortsnagga.ability-4",
      "name": "特殊剂量",
      "text": "当咻啊！对你的军队有效时，此单位中的模型移动特性加6\"。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 54,
        "englishName": "Special Dose",
        "kind": "unique"
      }
    }
  ],
  "船长巴德拉克": [
    {
      "id": "orks.kaptin-badrukk.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 55,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.kaptin-badrukk.ability-2",
      "name": "船长",
      "text": "此模型领导一个单位时，该单位中的模型每次发动远程攻击时，可重掷命中掷骰。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        },
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "hit-reroll",
          "mode": "failed",
          "phase": "ranged",
          "requiresJoined": true
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 55,
        "englishName": "Da Kaptin",
        "kind": "unique"
      }
    }
  ],
  "杀戮战车（Kill Tank）": [
    {
      "id": "orks.kill-tank.ability-1",
      "name": "致命破灭 D6",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 56,
        "englishName": "Deadly Demise D6+2",
        "kind": "unique"
      }
    }
  ],
  "战争头目（战机车）": [
    {
      "id": "orks.warboss-on-warbike.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 57,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.warboss-on-warbike.ability-2",
      "name": "战摩托老大",
      "text": "在率领一个单位时，加 1 到近战命中掷骰。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 57,
        "englishName": "Warbike Warboss",
        "kind": "unique"
      }
    }
  ],
  "红哥布的铁皮人": [
    {
      "id": "orks.da-red-gobbos-tinboy.ability-1",
      "name": "独行特工",
      "text": "除非此单位为联合单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 58,
        "englishName": "Lone Operative",
        "kind": "unique"
      }
    },
    {
      "id": "orks.da-red-gobbos-tinboy.ability-2",
      "name": "斥候",
      "text": "某些单位的能力栏中列有「斥候x\"」。若单位中每个模型都具有此能力，则在第一战斗回合开始时，在第一回合开始前，它可以进行一次常规移动，距离最多x\"，如同此为你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型亦可执行此动作，只要该单位在该**专用运输工具(Dedicated Transport)**模型内登载（条件是仅具有此能力的模型登载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须结束该移动时，距离所有敌军模型水平距离超过9\"。若双方玩家都有可执行此动作的单位，则进行第一回合的玩家先移动其单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 58,
        "englishName": "Scouts",
        "kind": "unique"
      }
    },
    {
      "id": "orks.da-red-gobbos-tinboy.ability-3",
      "name": "铁皮护卫",
      "text": "红妖王的护卫。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 58,
        "englishName": "Tinboy Guardian",
        "kind": "unique"
      }
    }
  ],
  "焦灼者越野车": [
    {
      "id": "orks.skorchas.ability-1",
      "name": "烟雾拖尾",
      "text": "对此单位的命中掷骰-1。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "incoming-hit-minus",
          "value": 1
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 59,
        "englishName": "Smoke Trails",
        "kind": "unique"
      }
    }
  ],
  "战履带车（Wartrakks）": [
    {
      "id": "orks.wartrakks.ability-1",
      "name": "履带车",
      "text": "复杂地形无移动减速。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 60,
        "englishName": "Trakk",
        "kind": "unique"
      }
    }
  ],
  "战斗越野车": [
    {
      "id": "orks.warbuggies.ability-1",
      "name": "改装飞车",
      "text": "前进掷骰 +2\"。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 61,
        "englishName": "Kustom Buggy",
        "kind": "unique"
      }
    }
  ],
  "持瓦！旗帜的头目": [
    {
      "id": "orks.nob-with-waaagh-banner.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 62,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.nob-with-waaagh-banner.ability-2",
      "name": "瓦戈！ 旗帜",
      "text": "率领单位时，近战命中掷骰+1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 62,
        "englishName": "Waaagh! Banner",
        "kind": "unique"
      }
    }
  ],
  "格洛特玛斯小子": [
    {
      "id": "orks.grotmas-gitz.ability-1",
      "name": "独行特工",
      "text": "除非此单位为联合单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 63,
        "englishName": "Lone Operative",
        "kind": "unique"
      }
    },
    {
      "id": "orks.grotmas-gitz.ability-2",
      "name": "不觉疼痛",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 63,
        "englishName": "Feel No Pain",
        "kind": "unique"
      }
    },
    {
      "id": "orks.grotmas-gitz.ability-3",
      "name": "斥候",
      "text": "某些单位的能力栏中列有「斥候x\"」。若单位中每个模型都具有此能力，则在第一战斗回合开始时，在第一回合开始前，它可以进行一次常规移动，距离最多x\"，如同此为你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型亦可执行此动作，只要该单位在该**专用运输工具(Dedicated Transport)**模型内登载（条件是仅具有此能力的模型登载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须结束该移动时，距离所有敌军模型水平距离超过9\"。若双方玩家都有可执行此动作的单位，则进行第一回合的玩家先移动其单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 63,
        "englishName": "Scouts",
        "kind": "unique"
      }
    },
    {
      "id": "orks.grotmas-gitz.ability-4",
      "name": "节庆乱斗",
      "text": "节庆欢乐凶兽变体。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 63,
        "englishName": "Festive Frenzy",
        "kind": "unique"
      }
    }
  ],
  "葛切钦炸弹发射车": [
    {
      "id": "orks.grot-bomm-launcha.ability-1",
      "name": "葛切钦炸弹",
      "text": "能够发射葛切钦炸弹。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 64,
        "englishName": "Grot Bomm",
        "kind": "unique"
      }
    }
  ],
  "技师德雷德步行机": [
    {
      "id": "orks.meka-dread.ability-1",
      "name": "步行者",
      "text": "步行者",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 65,
        "englishName": "Walker",
        "kind": "unique"
      }
    },
    {
      "id": "orks.meka-dread.ability-2",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 65,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.meka-dread.ability-3",
      "name": "改装力场",
      "text": "友军欧克载具在 6\" 内对远程攻击获得 5+ 无敌豁免。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 65,
        "englishName": "Kustom Force Field",
        "kind": "unique"
      }
    }
  ],
  "战斗轰炸机": [
    {
      "id": "orks.fighta-bommer.ability-1",
      "name": "飞行",
      "text": "飞行",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 66,
        "englishName": "Fly",
        "kind": "unique"
      }
    },
    {
      "id": "orks.fighta-bommer.ability-2",
      "name": "飞行器",
      "text": "飞行器",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 66,
        "englishName": "Aircraft",
        "kind": "unique"
      }
    },
    {
      "id": "orks.fighta-bommer.ability-3",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 66,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    }
  ],
  "葛切钦超级战车": [
    {
      "id": "orks.grot-mega-tank.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 67,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    }
  ],
  "巨虫兽": [
    {
      "id": "orks.squiggoth.ability-1",
      "name": "致命破灭 D6",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 68,
        "englishName": "Deadly Demise D6",
        "kind": "unique"
      }
    },
    {
      "id": "orks.squiggoth.ability-2",
      "name": "射击甲板10",
      "text": "某些 **运输工具(Transport)** 模型在其能力中列有「射击甲板 x」。每次在射击阶段选择此类模型射击时，你可选择最多「x」个搭乘其中且其单位本阶段尚未射击的搭乘模型。然后，对于每个选中的搭乘模型，你可选择该搭乘模型配备的一个远程武器（不包括具有 **[单发]** 能力的武器）。在该 **运输工具(Transport)** 模型解决其所有攻击前，它在计算时被视为额外配备你选择的所有武器。至本阶段结束，这些选中模型的单位没有资格射击。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 68,
        "englishName": "Firing Deck 10",
        "kind": "unique"
      }
    },
    {
      "id": "orks.squiggoth.ability-3",
      "name": "践踏",
      "text": "冲锋后，选择交战范围内的敌方，掷 D6（冲锋时+2）：4-5 = D3 点致命伤；6+ = 3 点致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 68,
        "englishName": "Trample",
        "kind": "unique"
      }
    },
    {
      "id": "orks.squiggoth.ability-4",
      "name": "射击平台",
      "text": "此模型背部载运的欧克步兵可以射击其武器。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 68,
        "englishName": "Howdah Gunz",
        "kind": "unique"
      }
    }
  ],
  "杀戮粉碎车": [
    {
      "id": "orks.kill-krusha.ability-1",
      "name": "致命破灭 D6",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 69,
        "englishName": "Deadly Demise D6",
        "kind": "unique"
      }
    }
  ],
  "死亡碾压战争堡垒": [
    {
      "id": "orks.deff-rolla-battle-fortress.ability-1",
      "name": "致命破灭 D6",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 70,
        "englishName": "Deadly Demise D6+2",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deff-rolla-battle-fortress.ability-2",
      "name": "运输",
      "text": "运输",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 70,
        "englishName": "Transport",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deff-rolla-battle-fortress.ability-3",
      "name": "死亡碾压器",
      "text": "此模型结束冲锋移动时造成 D6 点致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 70,
        "englishName": "Deff Rolla",
        "kind": "unique"
      }
    }
  ],
  "技师工坊": [
    {
      "id": "orks.mekboy-workshop.ability-1",
      "name": "工坊修理",
      "text": "指挥阶段：距离此内 3\" 的友军欧克载具恢复 D3 伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 71,
        "englishName": "Workshop Repairs",
        "kind": "unique"
      }
    }
  ],
  "超级德雷德步行机": [
    {
      "id": "orks.mega-dread.ability-1",
      "name": "步行者",
      "text": "步行者",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 72,
        "englishName": "Walker",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mega-dread.ability-2",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 72,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    }
  ],
  "加农战车": [
    {
      "id": "orks.kannonwagon.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 73,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    }
  ],
  "升降战车": [
    {
      "id": "orks.lifta-wagon.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 74,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.lifta-wagon.ability-2",
      "name": "升降射线",
      "text": "能够举起并放下敌方载具。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 74,
        "englishName": "Lifta Beam",
        "kind": "unique"
      }
    }
  ],
  "大履带车": [
    {
      "id": "orks.big-trakk.ability-1",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 75,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-trakk.ability-2",
      "name": "运输",
      "text": "运输",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 75,
        "englishName": "Transport",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-trakk.ability-3",
      "name": "运输",
      "text": "可运输12个兽人步兵模型。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 75,
        "englishName": "Transport 2",
        "kind": "unique"
      }
    }
  ],
  "疯狂医师格洛斯尼克": [
    {
      "id": "orks.mad-dok-grotsnik.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 76,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mad-dok-grotsnik.ability-2",
      "name": "不觉疼痛5+",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 76,
        "englishName": "Feel No Pain 5+",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mad-dok-grotsnik.ability-3",
      "name": "疯狂医师",
      "text": "当领导一个单位时，该单位中的模型具有不觉疼痛5+。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 76,
        "englishName": "Mad Dok",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mad-dok-grotsnik.ability-4",
      "name": "少一把手术刀也没差",
      "text": "领导时，此单位在后撤的战斗回合中可宣告冲锋。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 76,
        "englishName": "One Scalpel Short of a Medpack",
        "kind": "unique"
      }
    },
    {
      "id": "orks.mad-dok-grotsnik.ability-5",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 76,
        "englishName": "Leader 2",
        "kind": "unique"
      }
    }
  ],
  "奇诺克战斗旋翼机": [
    {
      "id": "orks.chinork-warkopta.ability-1",
      "name": "飞行",
      "text": "飞行",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 77,
        "englishName": "Fly",
        "kind": "unique"
      }
    },
    {
      "id": "orks.chinork-warkopta.ability-2",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 77,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    },
    {
      "id": "orks.chinork-warkopta.ability-3",
      "name": "运输",
      "text": "运输",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 77,
        "englishName": "Transport",
        "kind": "unique"
      }
    },
    {
      "id": "orks.chinork-warkopta.ability-4",
      "name": "深入打击",
      "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。 若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 77,
        "englishName": "Deep Strike",
        "kind": "unique"
      }
    },
    {
      "id": "orks.chinork-warkopta.ability-5",
      "name": "运输",
      "text": "可运输 12 个欧克步兵模型。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 77,
        "englishName": "Transport 2",
        "kind": "unique"
      }
    }
  ],
  "攻击战斗机": [
    {
      "id": "orks.attack-fighta.ability-1",
      "name": "飞行",
      "text": "飞行",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 78,
        "englishName": "Fly",
        "kind": "unique"
      }
    },
    {
      "id": "orks.attack-fighta.ability-2",
      "name": "飞行器",
      "text": "飞行器",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 78,
        "englishName": "Aircraft",
        "kind": "unique"
      }
    },
    {
      "id": "orks.attack-fighta.ability-3",
      "name": "致命破灭 D3",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 78,
        "englishName": "Deadly Demise D3",
        "kind": "unique"
      }
    }
  ],
  "大技师（改装力场产生器）": [
    {
      "id": "orks.big-mek-with-kustom-force-field.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 79,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-with-kustom-force-field.ability-2",
      "name": "改装力场",
      "text": "领导一个单位时，该单位中的模型对远程攻击具有 5+ 无敌豁免。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 5,
          "phase": "ranged",
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 79,
        "englishName": "Kustom Force Field",
        "kind": "unique"
      }
    }
  ],
  "大炮组": [
    {
      "id": "orks.big-gunz.ability-1",
      "name": "咻啊！",
      "text": "此单位的瓦戈！效果由欧克兽人阵营技能统一计算。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 80,
        "englishName": "Waaagh reference 80",
        "kind": "unique"
      }
    }
  ],
  "大技师（战机车）": [
    {
      "id": "orks.big-mek-on-warbike.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 81,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.big-mek-on-warbike.ability-2",
      "name": "改装力场",
      "text": "此模型率领单位期间，该单位内的模型对远程攻击有 5+ 无敌豁免。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "forceLeader",
          "type": "checkbox",
          "label": "数据卡模式下强行视为已领导单位"
        }
      ],
      "effects": [
        {
          "type": "invulnerable-save",
          "value": 5,
          "phase": "ranged",
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 81,
        "englishName": "Kustom Force Field",
        "kind": "unique"
      }
    }
  ],
  "葛切钦战车": [
    {
      "id": "orks.grot-tanks.ability-1",
      "name": "致命破灭 1",
      "text": "有些模型具有「致命破灭 x」的能力。当该模型被摧毁时，在将其移出战场前掷一次 D6（若该模型是**运输工具(Transport)**，则在任何乘载单位脱离前掷骰）。结果为 6 时，该模型 6\" 内的每个单位各承受数量为「x」的致命伤（若此数字是随机的，则对 6\" 内的每个单位分别掷骰）。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 82,
        "englishName": "Deadly Demise 1",
        "kind": "unique"
      }
    }
  ],
  "疼痛小子（战机车）": [
    {
      "id": "orks.painboy-on-warbike.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 83,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.painboy-on-warbike.ability-2",
      "name": "战摩托医生",
      "text": "在领导一个单位时，模型获得不觉疼痛5+。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
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
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 83,
        "englishName": "Bike Sawbones",
        "kind": "unique"
      }
    }
  ],
  "死亡旋翼机（大射击枪）": [
    {
      "id": "orks.deffkoptas-with-big-shootas.ability-1",
      "name": "飞行",
      "text": "飞行",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 84,
        "englishName": "Fly",
        "kind": "unique"
      }
    },
    {
      "id": "orks.deffkoptas-with-big-shootas.ability-2",
      "name": "深入打击",
      "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。 若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 84,
        "englishName": "Deep Strike",
        "kind": "unique"
      }
    }
  ],
  "头目们（战机车）": [
    {
      "id": "orks.nobz-on-warbikes.ability-1",
      "name": "凶恶飙车",
      "text": "近战武器力量+1。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "weapon-strength-modifier",
          "value": 1,
          "phase": "melee"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 85,
        "englishName": "Brutal Bikers",
        "kind": "unique"
      }
    }
  ],
  "红哥布的炸弹雪人": [
    {
      "id": "orks.da-red-gobbos-a-bomb-inable-snowman.ability-1",
      "name": "独行特工",
      "text": "除非此单位为联合单位的一部分（参见部署能力章节的领袖），否则此单位只有在攻击模型于12\"内才能被选为远程攻击的目标。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 86,
        "englishName": "Lone Operative",
        "kind": "unique"
      }
    },
    {
      "id": "orks.da-red-gobbos-a-bomb-inable-snowman.ability-2",
      "name": "斥候",
      "text": "某些单位的能力栏中列有「斥候x\"」。若单位中每个模型都具有此能力，则在第一战斗回合开始时，在第一回合开始前，它可以进行一次常规移动，距离最多x\"，如同此为你的移动阶段一样——**专用运输工具(Dedicated Transport)**模型亦可执行此动作，只要该单位在该**专用运输工具(Dedicated Transport)**模型内登载（条件是仅具有此能力的模型登载于该**专用运输工具(Dedicated Transport)**模型内）。使用此能力移动的单位必须结束该移动时，距离所有敌军模型水平距离超过9\"。若双方玩家都有可执行此动作的单位，则进行第一回合的玩家先移动其单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 86,
        "englishName": "Scouts",
        "kind": "unique"
      }
    },
    {
      "id": "orks.da-red-gobbos-a-bomb-inable-snowman.ability-3",
      "name": "雪球炸弹",
      "text": "射击时可造成 D3 点致命伤。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 86,
        "englishName": "Snowball Bombs",
        "kind": "unique"
      }
    }
  ],
  "红哥布": [
    {
      "id": "orks.da-red-gobbo.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 87,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.da-red-gobbo.ability-2",
      "name": "革命鼓动",
      "text": "领导葛切钦时，战斗震慑测试各加 1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 87,
        "englishName": "Revolutionary",
        "kind": "unique"
      }
    }
  ],
  "乌夫塔克·黑鹰": [
    {
      "id": "orks.ufthak-blackhawk.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 88,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.ufthak-blackhawk.ability-2",
      "name": "战利品猎手",
      "text": "当此模型领导一个单位时，对载具/凶兽的致伤掷骰 +1。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
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
          "requiresTargetMonsterVehicle": true,
          "requiresJoined": true,
          "activation": "passive"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 88,
        "englishName": "Loot Hunter",
        "kind": "unique"
      }
    }
  ],
  "老大札格斯特拉克": [
    {
      "id": "orks.boss-zagstruk.ability-1",
      "name": "领袖",
      "text": "某些 **角色(Character)** 单位的资料表上列有「领袖」。这类 **角色(Character)** 单位被称为领袖，他们能够领导的单位（称为他们的护卫单位）列在他们的资料表上。在宣告战斗编队阶段中，对于你军队中的每个领袖，如果你的军队也包括该领袖的一个或多个护卫单位，你可以选择其中一个护卫单位。该领袖将在战役期间附着到该护卫单位，并称为领导该单位。每个护卫单位最多只能有一个领袖附着到它。 当护卫单位包含领袖时，它被称为联合单位，除了在单位被摧毁时触发的规则外，在所有规则目的上都被视为单一单位。每次攻击以联合单位为目标时，直到攻击单位解决完所有攻击为止，你必须使用该单位中护卫模型的韧性特性，即使该单位中的领袖具有不同的韧性特性也是如此。每次攻击成功造成联合单位的伤口时，该攻击不能被分配给该单位中的 **角色(Character)** 模型，即使该 **角色(Character)** 模型已失去一个或多个伤口或在此阶段已分配了攻击。一旦联合单位中的最后一个护卫模型被摧毁，对该单位进行的任何尚未分配的攻击可以分配给该单位中的 **角色(Character)** 模型。 每次护卫单位的最后一个模型被摧毁时，作为联合单位一部分的每个 **角色(Character)** 单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次附着到护卫单位的 **角色(Character)** 单位的最后一个模型被摧毁，且没有另一个 **角色(Character)** 单位附着时，该联合单位的护卫单位不再是联合单位的一部分。它成为一个单独的单位，具有其原始起始兵力。如果这发生在攻击结果中，他们在攻击单位解决完所有攻击后成为单独的单位。 每次摧毁作为联合单位一部分的单位时，它不会获得组成该联合单位的任何其他单位的关键字（除非它在自己的资料表上具有这些关键字），以适用于在摧毁该单位时触发的任何规则。 **范例：** 如果你只摧毁了作为联合单位一部分的护卫单位，你就没有摧毁 **角色(Character)** 单位。如果你只摧毁了作为联合单位一部分的 **角色(Character)** 单位，或者如果你摧毁了整个联合单位，你就摧毁了一个 **角色(Character)** 单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 89,
        "englishName": "Leader",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boss-zagstruk.ability-2",
      "name": "深入打击",
      "text": "在宣示战斗编队阶段，若一个单位中的每个模型都具有此能力，你可以将其设置在预备队中，而非设置在战场上。若你如此做，在你移动阶段的增援步骤中，你可以在战场上任意地点设置此单位，该地点距离所有敌军模型的水平距离须超过8\"。 若一个具有深入打击能力的单位从战略预备队到达，控制该单位的玩家可以选择使用战略预备队规则或使用深入打击能力来设置该单位。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 89,
        "englishName": "Deep Strike",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boss-zagstruk.ability-3",
      "name": "不觉疼痛",
      "text": "某些模型的能力栏中列有「不觉疼痛x+」。每次具此能力的模型受到伤害并将失去一个伤口时（包括因致命伤而失去的伤口），掷一次D6：若结果大于或等于「x」所示的数字，该伤口被忽略且不失去。若一个模型拥有多个不觉疼痛能力，你每次该模型受到伤害并将失去伤口时只能使用其中一个能力。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 89,
        "englishName": "Feel No Pain",
        "kind": "unique"
      }
    },
    {
      "id": "orks.boss-zagstruk.ability-4",
      "name": "突进攻击",
      "text": "领导暴风小子时，冲锋掷骰各加 2。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 89,
        "englishName": "Vulcha's Boyz",
        "kind": "unique"
      }
    }
  ],
  "硬汉帮战争头目": [
    {
      "id": "orks.entry-05ce2343.ability-1",
      "name": "砸个稀巴烂",
      "text": "在近战阶段中，当该单位**被选择进行近战**时，该单位的近战攻击拥有： ■ **[致命一击]**。 ■ 或者：**[连击 1]**。",
      "status": "计算支持（满足条件时自动计入）",
      "controls": [
        {
          "id": "mode",
          "type": "select",
          "label": "本次选择",
          "options": [
            [
              "none",
              "不启用"
            ],
            [
              "lethal",
              "致命一击"
            ],
            [
              "sustained",
              "连击 1"
            ]
          ]
        },
        {
          "id": "enabled",
          "type": "checkbox",
          "label": "本次启用此技能"
        }
      ],
      "effects": [
        {
          "type": "lethal-hits",
          "phase": "melee",
          "selection": {
            "controlId": "mode",
            "equals": "lethal"
          }
        },
        {
          "type": "sustained-hits",
          "value": 1,
          "phase": "melee",
          "selection": {
            "controlId": "mode",
            "equals": "sustained"
          }
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 90,
        "englishName": "Source ability 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.entry-05ce2343.ability-2",
      "name": "领袖",
      "text": "该模型可以附加至以下单位： ■ **硬汉帮小子**",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 90,
        "englishName": "Leader",
        "kind": "unique"
      }
    }
  ],
  "硬汉帮灵能小子": [
    {
      "id": "orks.entry-c9184707.ability-1",
      "name": "摩克图腾（灵能）",
      "text": "在您的指挥阶段结束时，如果该单位控制一个**目标**，那个**目标**被**占领**。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 91,
        "englishName": "Source ability 1",
        "kind": "unique"
      }
    },
    {
      "id": "orks.entry-c9184707.ability-2",
      "name": "领袖",
      "text": "该模型可以附加至以下单位： ■ **硬汉帮小子**",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 91,
        "englishName": "Leader",
        "kind": "unique"
      }
    }
  ],
  "硬汉帮战斗卡车": [
    {
      "id": "orks.entry-1dae7fb7.ability-1",
      "name": "无差别引爆",
      "text": "在您的射击阶段中，在该单位完成射击后，选择一个被那些攻击命中的敌方单位。直到下一个己方回合开始前，那个单位**被压制**： ■ 在一个单位**被压制**时，那个单位的攻击的**命中掷骰** -1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 92,
        "englishName": "Source ability 1",
        "kind": "unique"
      }
    }
  ],
  "硬汉帮小子": [
    {
      "id": "orks.entry-d518b006.ability-1",
      "name": "抓住那块废料",
      "text": "在该单位处于**交战状态**时，该单位的 **OC** +1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 93,
        "englishName": "Source ability 1",
        "kind": "unique"
      }
    }
  ],
  "硬汉帮蛮人小子": [
    {
      "id": "orks.entry-b5191d5b.ability-1",
      "name": "抓住那块废料",
      "text": "在该单位处于**交战状态**时，该单位的 **OC** +1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 94,
        "englishName": "Source ability 1",
        "kind": "unique"
      }
    }
  ],
  "硬汉帮屁精": [
    {
      "id": "orks.entry-a699a617.ability-1",
      "name": "地精灾害（每个单位，每场战斗限一次）",
      "text": "在该单位**被摧毁**时，您可以使用本技能。若使用： ■ 将该单位放入**战略预备队**中，并且该单位中所有**被摧毁**的模型都被返还。该单位不再**被摧毁**。 ■ 该单位拥有**深入打击**。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 95,
        "englishName": "Source ability 1",
        "kind": "unique"
      }
    }
  ],
  "大头目": [
    {
      "id": "orks.bigboss.ability-1",
      "name": "敲爆脑袋",
      "text": "此单位的近战武器具有 **[连击 1]**。",
      "status": "计算支持（满足条件时自动计入）",
      "effects": [
        {
          "type": "sustained-hits",
          "value": 1,
          "phase": "melee"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 96,
        "englishName": "Breakin’ Heads",
        "kind": "unique"
      }
    },
    {
      "id": "orks.bigboss.ability-2",
      "name": "证明自己",
      "text": "此单位的**冲锋掷骰** +1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 96,
        "englishName": "Somethin’ to Prove",
        "kind": "unique"
      }
    }
  ],
  "执旗强蛮人": [
    {
      "id": "orks.bannernob.ability-1",
      "name": "瓦戈！旗帜",
      "text": "■ 此单位具有 5+ **无敌豁免(InSv)**。 ■ 当「咻啊！」对此单位活跃时，此单位的 **T** +1。",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 97,
        "englishName": "Waaagh! Banner",
        "kind": "unique"
      }
    }
  ],
  "突突大技甲": [
    {
      "id": "orks.big-mek-dakkarig.ability-1",
      "name": "达卡闪击",
      "text": "在你的射击阶段，当此单位进行攻击时，若其 **Blitzkannon** 以非 **凶兽(Monster)／载具(Vehicle)** 单位为目标，则该武器的 **A** +6。",
      "status": "已结构化，当前仅供查阅",
      "controls": [
        {
          "id": "targetMonsterVehicle",
          "type": "checkbox",
          "label": "目标为凶兽或载具"
        }
      ],
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 98,
        "englishName": "Dakkablitz",
        "kind": "unique"
      }
    }
  ],
  "战履带车（Wartrakk）": [
    {
      "id": "orks.wartrakk.ability-1",
      "name": "无差别引爆",
      "text": "在您的射击阶段中，在该单位结算完攻击后，选择一个被那些攻击命中一次或更多次的敌方单位。直到您的下一个指挥阶段开始前，那个敌方单位被**压制**。（在一个单位被**压制**时，那个单位的**命中掷骰** -1。）",
      "status": "已结构化，当前仅供查阅",
      "source": {
        "file": "欧克兽人-网站原始数据.json",
        "record": 99,
        "englishName": "Indiscriminate Detonations",
        "kind": "unique"
      }
    }
  ]
};
  const catalog = { factionRules, unitRules };
  root.WarhammerOrksRules = root.WarhammerOrksRuleIdentities?.apply(catalog) || catalog;
})(typeof globalThis === "undefined" ? this : globalThis);
