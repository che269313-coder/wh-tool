param(
    [string]$InputFile = (Join-Path $PSScriptRoot '..\..\docs\data\星界军\星界军-网站原始数据-简体.json'),
    [string]$OutputFile = (Join-Path $PSScriptRoot '..\..\docs\data\星界军\星界军-结构化数据卡.json'),
    [string]$AuditFile = (Join-Path $PSScriptRoot '..\..\docs\data\星界军\星界军-结构化数据卡审计.md')
)

$apiUrl = 'https://40k11e-backend.aiinpocket.com/api/faction-full?slug=astra-militarum'
$data = Get-Content -LiteralPath $InputFile -Raw -Encoding UTF8 | ConvertFrom-Json
$cards = New-Object System.Collections.Generic.List[object]
$missingDefault = New-Object System.Collections.Generic.List[string]
$missingWeapons = New-Object System.Collections.Generic.List[string]
$index = 0

foreach ($record in @($data.units)) {
    $index++
    $u = $record.unit
    $weapons = @($record.weapons)
    $defaults = @($weapons | Where-Object { $_.is_default -eq $true })
    $defaultItems = @($defaults | ForEach-Object {
        [ordered]@{
            name = if ($_.weapon.name_zh) { $_.weapon.name_zh } else { $_.weapon.profile_name_zh }
            nameEnglish = if ($_.weapon.profile_name) { $_.weapon.profile_name } else { $_.weapon.name }
            count = $_.count
            weaponId = $_.weapon.id
            isDefault = $true
        }
    })
    if ($defaultItems.Count -gt 0) {
        $defaultEquipment = ($defaultItems | ForEach-Object { "$( $_.count )×$( $_.name )" }) -join '；'
    } else {
        $defaultEquipment = 'API未明确默认装备'
        [void]$missingDefault.Add([string]$u.name_zh)
    }
    if ($weapons.Count -eq 0) { [void]$missingWeapons.Add([string]$u.name_zh) }

    $normalizedWeapons = @($weapons | ForEach-Object {
        $w = $_.weapon
        [ordered]@{
            name = if ($w.name_zh) { $w.name_zh } else { $w.profile_name_zh }
            nameEnglish = if ($w.profile_name) { $w.profile_name } else { $w.name }
            type = if ($w.is_ranged) { 'ranged' } else { 'melee' }
            range = $w.range_
            attacks = $w.attacks
            skill = $w.ws_bs
            strength = $w.strength
            ap = $w.ap
            damage = $w.damage
            abilities = @($w.ability_keywords_zh)
            abilityKeywords = [ordered]@{
                english = @($w.ability_keywords)
                simplifiedChinese = @($w.ability_keywords_zh)
            }
            count = $_.count
            isDefault = [bool]$_.is_default
            profileName = $w.profile_name_zh
            sourceWeaponId = $w.id
            sourceWeapon = $w
        }
    })

    $composition = @($record.compositions)
    $leader = [ordered]@{
        canLeadUnitIds = @($record.leads)
        effect = $u.leader_effect_zh
        isLeader = (@($record.leads).Count -gt 0) -or ($u.category -eq 'Character')
    }
    $unit = [ordered]@{
        name = $u.name_zh
        nameEnglish = $u.name
        movement = $u.movement
        toughness = $u.toughness
        save = $u.save
        invulnerableSave = $u.invuln_save
        woundsPerModel = $u.wounds
        models = if ($composition.Count -gt 0) { @($composition[0].models | ForEach-Object { $_.min }) -join '-' } else { $null }
        leadership = $u.leadership
        objectiveControl = $u.oc
        abilities = @($record.abilities)
        activeAbilities = @($record.abilities | Where-Object { $_.kind -notin @('core','faction') })
        defaultEquipment = $defaultEquipment
        defaultEquipmentItems = $defaultItems
        composition = $composition
        leader = $leader
        wargear_options = @($record.wargear_options)
        keywords = @($u.keywords)
        factionKeywords = @($u.faction_keywords)
    }
    $card = [ordered]@{
        id = "astra-militarum.profile.$('{0:D2}' -f $index)"
        name = $u.name_zh
        page = $null
        source = [ordered]@{
            file = '星界军-网站原始数据-简体.json'
            apiUrl = $apiUrl
            unitId = $u.id
            extraction = '由项目 API 简体原始数据脚本映射；完整原始单位记录保存在 sourceApiRecord'
        }
        unit = $unit
        weapons = $normalizedWeapons
        wargear_options = @($record.wargear_options)
        composition = $composition
        leader = $leader
        abilities = @($record.abilities)
        keywords = @($u.keywords)
        factionKeywords = @($u.faction_keywords)
        sourceApiRecord = $record
    }
    [void]$cards.Add($card)
}

$output = [ordered]@{
    faction = '星界军'
    kind = 'datasheet-profiles'
    schemaVersion = 1
    source = '星界军-网站原始数据-简体.json'
    sourceApiUrl = $apiUrl
    description = '由简体网站 API units 映射为可消费结构化数据卡；每张卡保留完整 sourceApiRecord。'
    cards = $cards
}
$json = $output | ConvertTo-Json -Depth 30
[System.IO.File]::WriteAllText($OutputFile, $json, (New-Object System.Text.UTF8Encoding($true)))

$audit = @(
    '# 星界军结构化数据卡审计说明',
    '',
    "- 输入：星界军-网站原始数据-简体.json",
    "- 输出：星界军-结构化数据卡.json",
    "- 映射单位数：$($cards.Count)",
    "- 默认装备缺失数：$($missingDefault.Count)",
    "- 武器档案缺失数：$($missingWeapons.Count)",
    '',
    '默认装备缺失单位（API 原文未提供默认武器）：',
    ($(if ($missingDefault.Count) { $missingDefault | ForEach-Object { "- $_" } } else { '- 无' })),
    '',
    '武器档案缺失单位（API 原文 weapons 为空）：',
    ($(if ($missingWeapons.Count) { $missingWeapons | ForEach-Object { "- $_" } } else { '- 无' })),
    '',
    '每张卡均保留 sourceApiRecord，包含 API 原始的 abilities、compositions、wargear_options、leads、keywords、faction_keywords 与完整武器对象；标准化武器字段包含 A/命中/S/AP/D/能力和 isDefault。'
) -join "`r`n"
[System.IO.File]::WriteAllText($AuditFile, $audit, (New-Object System.Text.UTF8Encoding($true)))

Write-Output "CARDS=$($cards.Count)"
Write-Output "MISSING_DEFAULT=$($missingDefault.Count)"
Write-Output "MISSING_WEAPONS=$($missingWeapons.Count)"
Write-Output ('MISSING_DEFAULT_NAMES=' + ($missingDefault -join '、'))
Write-Output ('MISSING_WEAPON_NAMES=' + ($missingWeapons -join '、'))
