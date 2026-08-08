"""One-time datasheet repairs from docs/audit/*.md findings (SM + Custodes).

Applies only the audited fixes; the 污染者 card (data source conflict) is
intentionally skipped. Idempotent enough to re-run.
"""
import json
import re
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SM_PATH = r'C:\Users\che26\Desktop\wh-tool\docs\data\星际战士\星际战士-全部数据卡.json'
CU_PATH = r'C:\Users\che26\Desktop\wh-tool\docs\data\帝皇禁军\帝皇禁军-结构化数据卡.json'

WATERMARK = '老湿腐战锤群'


def load(path):
    return json.load(open(path, encoding='utf-8'))


def save(path, data):
    json.dump(data, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)


# =====================================================================
# 星际战士
# =====================================================================
sm = load(SM_PATH)
by_page = {c.get('page'): c for c in sm['cards']}

w2_fixed = 0
w1_fixed = 0
for c in sm['cards']:
    unit = c.get('unit') or {}
    # W1: leading watermark char in defaultEquipment
    old = unit.get('defaultEquipment') or ''
    new = re.sub(r'^[' + WATERMARK + r']\s+', '', old)
    if new != old:
        w1_fixed += 1
        unit['defaultEquipment'] = new
    # W1: leading watermark char in weapon names
    for w in c.get('weapons', []):
        old_name = w.get('name') or ''
        new_name = re.sub(r'^[' + WATERMARK + r']\s+', '', old_name)
        if new_name != old_name:
            w1_fixed += 1
            w['name'] = new_name
        # W2: strip leading digit prefixes and collapse "速射 1"
        abilities = w.get('abilities') or []
        cleaned = []
        for a in abilities:
            a2 = re.sub(r'^(\d+\s+)+', '', a)
            a2 = re.sub(r'速射\s+(\d)', r'速射\1', a2)
            if a2 != a:
                w2_fixed += 1
            cleaned.append(a2)
        w['abilities'] = cleaned

# W9 targeted ability-text fixes
def fix_ability(page, old_frag, new_frag):
    unit = by_page[page]['unit']
    if old_frag in unit.get('abilities', ''):
        unit['abilities'] = unit['abilities'].replace(old_frag, new_frag)
        return True
    return False

fix_ability(47, '友群军', '友军')
fix_ability(47, '锤在这个阶段结束时', '在这个阶段结束时')
fix_ability(47, '使用战略技能 2 时少消耗1CP 5', '使用战略技能时少消耗1CP')
fix_ability(64, '将其置入战略预备队）。 2 5', '将其置入战略预备队）。')
fix_ability(119, '先遣者摩托手湿和士官', '先遣者摩托手和士官')
fix_ability(150, '撤退2与 5本模型', '撤退与本模型')

# W1: weapon name inner space (P132 加特 林)
for w in by_page[132].get('weapons', []):
    if '加特 林' in w.get('name', ''):
        w['name'] = w['name'].replace('加特 林', '加特林')
        w1_fixed += 1

# W3: restore swallowed invulnerable save lines
for page, line, invuln in [
    (94, '特殊保护：本单位模型拥有4+特殊保护', 4),
    (107, '特殊保护：本单位模型拥有4+特殊保护', 4),
    (108, '特殊保护：本单位模型拥有4+特殊保护', 4),
]:
    unit = by_page[page]['unit']
    abilities = unit.get('abilities') or ''
    if '特殊保护' not in abilities:
        unit['abilities'] = line + ' ⚫ ' + abilities
    if unit.get('invulnerableSave') != invuln:
        unit['invulnerableSave'] = invuln
# P87 裁决士: conditional melee-only invuln - restore text only (kept invuln 0)
unit87 = by_page[87]['unit']
if '特殊保护' not in (unit87.get('abilities') or ''):
    unit87['abilities'] = '特殊保护：本模型对抗近战攻击时拥有4+特殊保护 ⚫ ' + (unit87.get('abilities') or '')

# W4: add missing weapons
def add_weapons(page, weapons):
    existing = {w['name'] for w in by_page[page].get('weapons', [])}
    added = 0
    for w in weapons:
        if w['name'] not in existing:
            by_page[page].setdefault('weapons', []).append(w)
            added += 1
    return added

def plasma(bs):
    return [
        {"name": "等离子手枪（标准）", "selectionGroup": "等离子手枪", "type": "ranged", "attacks": "1", "skill": bs, "strength": 7, "ap": -2, "damage": "1", "abilities": ["手枪"]},
        {"name": "等离子手枪（过载）", "selectionGroup": "等离子手枪", "type": "ranged", "attacks": "1", "skill": bs, "strength": 8, "ap": -3, "damage": "2", "abilities": ["手枪，危险"]},
    ]

added = 0
added += add_weapons(65, plasma("2+"))
added += add_weapons(69, plasma("2+"))
added += add_weapons(80, plasma("3+"))
for page in (74, 76):
    added += add_weapons(page, [
        {"name": "惩击（巫火）", "selectionGroup": "惩击", "type": "ranged", "attacks": "d6", "skill": "3+", "strength": 5, "ap": -1, "damage": "d3", "abilities": ["灵能"]},
        {"name": "惩击（聚焦）", "selectionGroup": "惩击", "type": "ranged", "attacks": "d6", "skill": "3+", "strength": 6, "ap": -2, "damage": "d3", "abilities": ["毁灭伤害，灵能，危险"]},
    ])
added += add_weapons(92, [{"name": "雷霆锤", "type": "melee", "attacks": "3", "skill": "4+", "strength": 8, "ap": -2, "damage": "2", "abilities": ["毁灭伤害"]}])
added += add_weapons(121, [{"name": "不屈铁拳", "type": "melee", "attacks": "5", "skill": "3+", "strength": 14, "ap": -2, "damage": "3", "abilities": ["无"]}])

# W5: numeric fixes
for w in by_page[90]['weapons']:
    if w.get('name') == '阿斯塔特榴弹发射器（穿甲）':
        w['ap'] = -2
# P90 ungroup the three fake grenade-launcher forms back to standalone weapons
p90 = by_page[90]['weapons']
renames = {
    '阿斯塔特榴弹发射器（爆弹手枪）': ('爆弹手枪', 1, '3+', 4, 0, 1, ['手枪']),
    '阿斯塔特榴弹发射器（爆弹步枪）': ('爆弹步枪', 2, '3+', 4, -1, 1, ['突击，重型']),
    '阿斯塔特榴弹发射器（喷火手枪）': ('喷火手枪', 'd6', 'torrent', 3, 0, 1, ['手枪，喷射']),
}
for w in p90:
    if w.get('name') in renames:
        name, attacks, skill, strength, ap, damage, abilities = renames[w['name']]
        w.update({'name': name, 'selectionGroup': None, 'attacks': str(attacks), 'skill': skill,
                  'strength': strength, 'ap': ap, 'damage': str(damage), 'abilities': abilities})
for w in by_page[136]['weapons']:
    if w.get('name') == '烈火风暴炮':
        w['attacks'] = 'D6+3'

# W6: rename cards whose name is a PDF category header
sm_renames = {
    88: '连队英雄', 98: '重装仲裁者小队', 103: '渗透者小队', 107: '突击终结者小队',
    109: '战术小队', 119: '先遣者摩托小队', 121: '不屈型战术机甲', 126: '烈火炮台',
    134: '兰德掠袭者坦克', 143: '冰雹型风暴速攻艇', 150: '落锤堡',
}
for page, name in sm_renames.items():
    c = by_page[page]
    if c['name'] != name:
        c['name'] = name
        if c.get('unit'):
            c['unit']['name'] = name

# W7: model counts
by_page[53]['unit']['models'] = 6
by_page[109]['unit']['models'] = 10
by_page[114]['unit']['models'] = 3

# W8: P119 defaultEquipment rewrite per PDF
by_page[119]['unit']['defaultEquipment'] = '先遣者摩托手和士官装备重型爆弹手枪，双联爆弹步枪，阿斯塔特链锯剑；ATV突击车装备爆弹手枪，双联爆弹步枪，突击加特林，格斗武器'

# W10: drop placeholder cards
sm['cards'] = [c for c in sm['cards'] if c.get('page') not in (110, 113, 118)]

save(SM_PATH, sm)
print('SM: w2=%d w1=%d missing weapons added=%d, cards now=%d' % (
    w2_fixed, w1_fixed, added, len(sm['cards'])))

# =====================================================================
# 帝皇禁军
# =====================================================================
cu = load(CU_PATH)
by_name = {c['name']: c for c in cu['cards']}

# 属性: 图拉真 LD
trajann = next(c for c in cu['cards'] if c['name'] == '图拉真元帅')
if trajann['unit'].get('leadership') != '5+':
    trajann['unit']['leadership'] = '5+'

# 武器重命名
weapon_renames = {
    '剑锋冠军': {'宝库之剑（斩首）': '宝库之剑（斩兽）'},
    '终结者盾卫连长': {'强势榴弹发射器': '强弩榴弹发射器'},
    '阿拉鲁斯终结者': {'强势榴弹发射器': '强弩榴弹发射器'},
    '摩托盾卫连长': {'晨鹰风暴爆弹枪': '晨鹰飓风爆弹枪'},
    '晨鹰摩托队': {'晨鹰风暴爆弹枪': '晨鹰飓风爆弹枪'},
    '神圣蔑视者无畏机甲': {'可瑞斯斩击炮': '凯瑞斯突击炮'},
}
for unit_name, renames in weapon_renames.items():
    card = by_name.get(unit_name)
    if not card:
        continue
    for w in card.get('weapons', []):
        if w.get('name') in renames:
            w['name'] = renames[w['name']]

# 盾卫连长 热熔长矛 ranged A 2 -> 1
shield_cap = by_name['盾卫连长']
for w in shield_cap['weapons']:
    if w.get('name') == '热熔长矛' and w.get('type') == 'ranged':
        w['attacks'] = '1'

# 卡名重命名
card_renames = {'灭魔教团百夫长': '灭魔教团百骑长', '阿拉鲁斯终结者': '阿拉琉斯终结者'}
for old, new in card_renames.items():
    card = by_name.get(old)
    if card:
        card['name'] = new
        card['unit']['name'] = new
by_name = {c['name']: c for c in cu['cards']}

# 戒卫者 + 警戒者 合并为一张 (警戒者, page 30, models 4)
guardian = by_name.pop('戒卫者')
vigilator = by_name.pop('警戒者', None)
if guardian and vigilator:
    merged = guardian
    merged['name'] = '警戒者'
    merged['unit']['name'] = '警戒者'
    merged['page'] = 30
    merged['unit']['models'] = 4
    merged['unit']['save'] = 3
    merged['unit']['invulnerableSave'] = 0
    cu['cards'] = [c for c in cu['cards'] if c is not vigilator]
    by_name = {c['name']: c for c in cu['cards']}

# 关键词: PDF 每卡一行
sm_kw = {
    14: ['步兵', '人物', '传奇英雄', '帝国', '图拉真元帅'],
    15: ['步兵', '人物', '传奇英雄', '帝国', '瓦雷利安连长'],
    16: ['步兵', '人物', '帝国', '盾卫连长'],
    17: ['步兵', '人物', '帝国', '剑锋冠军'],
    18: ['步兵', '人物', '帝国', '终结者', '盾卫连长'],
    19: ['骑乘', '人物', '飞行', '帝国', '晨鹰摩托', '盾卫连长'],
    20: ['步兵', '战线', '帝国', '禁军盾卫'],
    21: ['步兵', '帝国', '终结者', '阿拉琉斯终结者'],
    22: ['步兵', '帝国', '禁军守望者'],
    23: ['骑乘', '飞行', '帝国', '晨鹰摩托队'],
    25: ['载具', '机甲', '帝国', '神圣蔑视者无畏机甲'],
    26: ['载具', '烟雾弹', '运输工具', '帝国', '神圣兰德掠袭者坦克'],
    27: ['步兵', '人物', '帝国', '灭魔教团', '百骑长'],
    28: ['步兵', '人物', '传奇英雄', '帝国', '灭魔教团', '艾蕾雅'],
    29: ['步兵', '帝国', '灭魔教团', '控诉者'],
    30: ['步兵', '帝国', '灭魔教团', '警戒者'],
    31: ['步兵', '帝国', '灭魔教团', '猎巫者'],
    32: ['载具', '运输工具', '专属运输', '烟雾弹', '帝国', '灭魔教团', '犀牛装甲车'],
}
for c in cu['cards']:
    page = c.get('page')
    if page in sm_kw:
        c['keywords'] = sm_kw[page]
    if 'factionKeywords' not in c or not c['factionKeywords']:
        c['factionKeywords'] = ['帝皇禁军']

# 能力/技能文本修复
ability_fixes = {
    '瓦雷利安连长': '领袖；深入打击；不知疼痛 6+；禁军武艺；黄金桂冠',
    '盾卫连长': '领袖；深入打击；禁军武艺；精熟战略；守护之盾',
    '剑锋冠军': '领袖；深入打击；禁军武艺；迅猛冲锋；武艺绝伦',
    '禁军盾卫': '深入打击；禁军武艺',
    '禁军守望者': '深入打击；禁军武艺；坚定意志',
    '晨鹰摩托队': '禁军武艺；炫光击杀',
    '神圣蔑视者无畏机甲': '致命破灭1；禁军武艺；不倒旗帜',
    '神圣兰德掠袭者坦克': '致命破灭D6；禁军武艺；突击载具；严重损伤',
    '灭魔教团百骑长': '领袖；斥候6；追踪本能；深渊之女；追杀殆尽',
    '艾雷雅': '领袖；斥候6；不知疼痛5+；战术洞察；深渊之女；坚毅灵魂',
    '控诉者': '净化处决；拥有精准和毁灭性伤口；深渊之女',
    '警戒者': '迅捷格挡；深渊之女',
    '猎巫者': '斥候6；制裁烈焰；深渊之女',
    '灭魔教团犀牛装甲车': '致命破灭D3；开火口2；自行修理；深渊之女',
}
active_fixes = {
    '禁军盾卫': '保持警戒；枪林弹雨；守护之盾；禁军鹰旗',
    '禁军守望者': '坚定意志；人形要塞；禁军鹰旗',
    '神圣蔑视者无畏机甲': '',
    '神圣兰德掠袭者坦克': '',
    '灭魔教团百骑长': '',
    '艾雷雅': '',
    '控诉者': '',
    '警戒者': '',
    '猎巫者': '制裁烈焰',
    '灭魔教团犀牛装甲车': '',
}
for name, abilities in ability_fixes.items():
    card = by_name.get(name)
    if card:
        card['unit']['abilities'] = abilities
for name, active in active_fixes.items():
    card = by_name.get(name)
    if card:
        card['unit']['activeAbilities'] = active

# torrent 猎巫喷火器 abilities 补 忽视掩体
for card in cu['cards']:
    for w in card.get('weapons', []):
        if w.get('name') == '猎巫喷火器':
            w['abilities'] = ['忽视掩体，喷射']

save(CU_PATH, cu)
print('CU: cards now=%d' % len(cu['cards']))
