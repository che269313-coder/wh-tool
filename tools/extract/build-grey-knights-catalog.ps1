param(
    [string]$InputFile = (Join-Path $PSScriptRoot '..\..\docs\data\灰骑士\灰骑士-网站原始数据-简体.json'),
    [string]$OutputFile = (Join-Path $PSScriptRoot '..\..\docs\data\灰骑士\灰骑士-结构化数据卡.json')
)

$api = Get-Content -Raw -Encoding UTF8 -LiteralPath $InputFile | ConvertFrom-Json

function Get-Number([object]$value) {
    if ($null -eq $value) { return $null }
    $match = [regex]::Match([string]$value, '-?\d+')
    if ($match.Success) { return [int]$match.Value }
    return $value
}

function Get-EquipmentName([object]$entry) {
    if ($null -eq $entry.weapon) { return $null }
    if ($entry.weapon.name_zh) { return [string]$entry.weapon.name_zh }
    return [string]$entry.weapon.name
}

$cards = @()
$index = 0
foreach ($entry in @($api.units)) {
    $index++
    $u = $entry.unit
    $defaultEntries = @($entry.weapons | Where-Object { $_.is_default -eq $true })
    $defaultItems = @($defaultEntries | ForEach-Object {
        [ordered]@{
            name = (Get-EquipmentName $_)
            count = $_.count
            weaponId = $_.weapon.id
        }
    })
    $defaultEquipment = @($defaultItems | ForEach-Object {
        if ($_.count -and [int]$_.count -gt 1) { "$($_.name) ×$($_.count)" } else { [string]$_.name }
    }) -join '，'

    $models = 1
    $firstComposition = @($entry.compositions)[0]
    if ($firstComposition -and @($firstComposition.models).Count -gt 0) {
        $models = (@($firstComposition.models | ForEach-Object { if ($_.min) { [int]$_.min } else { 1 } }) | Measure-Object -Sum).Sum
    }

    $normalizedWeapons = @($entry.weapons | ForEach-Object {
        $w = $_.weapon
        $weaponType = if ($w.is_ranged) { 'ranged' } else { 'melee' }
        $weaponName = if ($w.name_zh) { $w.name_zh } else { $w.name }
        [ordered]@{
            name = $weaponName
            nameEn = $w.name
            id = $w.id
            profileName = $w.profile_name_zh
            type = $weaponType
            range = $w.range_
            attacks = $w.attacks
            skill = $w.ws_bs
            strength = Get-Number $w.strength
            ap = Get-Number $w.ap
            damage = $w.damage
            abilities = @($w.ability_keywords_zh)
            abilitiesEn = @($w.ability_keywords)
            count = $_.count
            isDefault = [bool]$_.is_default
            defaultSelection = [bool]$_.is_default
            source = $w
        }
    })

    $unit = [ordered]@{
        id = $u.id
        name = $u.name_zh
        nameEn = $u.name
        movement = Get-Number $u.movement
        toughness = Get-Number $u.toughness
        save = Get-Number $u.save
        invulnerableSave = Get-Number $u.invuln_save
        woundsPerModel = Get-Number $u.wounds
        models = $models
        leadership = $u.leadership
        objectiveControl = Get-Number $u.oc
        abilities = @($entry.abilities)
        activeAbilities = @($entry.abilities | Where-Object { $_.kind -eq 'unique' -or $_.kind -eq 'faction' })
        defaultEquipment = $defaultEquipment
        defaultEquipmentItems = $defaultItems
        leader = [ordered]@{
            leads = @($entry.leads)
            leaderEffect = $u.leader_effect_zh
        }
        wargear_options = @($entry.wargear_options)
        composition = @($entry.compositions)
        keywords = @($u.keywords)
        factionKeywords = @($u.faction_keywords)
        conditionalKeywords = @($entry.conditional_keywords)
        sourceUnit = $u
    }

    $cards += [ordered]@{
        id = "grey-knights.profile.$('{0:D2}' -f $index)"
        name = $u.name_zh
        source = [ordered]@{
            file = '灰骑士-网站原始数据-简体.json'
            unitId = $u.id
            extraction = 'Mapped from simplified faction-full API response; sourceData preserves the complete unit object.'
        }
        unit = $unit
        weapons = $normalizedWeapons
        wargear_options = @($entry.wargear_options)
        composition = @($entry.compositions)
        leader = $unit.leader
        abilities = @($entry.abilities)
        keywords = @($u.keywords)
        factionKeywords = @($u.faction_keywords)
        sourceData = $entry
    }
}

$result = [ordered]@{
    faction = '灰骑士'
    slug = 'grey-knights'
    kind = 'datasheet-cards'
    schemaVersion = 1
    source = '灰骑士-网站原始数据-简体.json'
    sourceUrl = 'https://40k11e-backend.aiinpocket.com/api/faction-full?slug=grey-knights'
    description = '由简体网站 API 数据映射；每张卡保留完整 sourceData，并提供模板兼容的规范化字段。'
    cards = $cards
}

$result | ConvertTo-Json -Depth 100 | Set-Content -Encoding UTF8 -LiteralPath $OutputFile
