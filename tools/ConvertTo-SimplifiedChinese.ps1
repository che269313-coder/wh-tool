# =============================================================================
# ConvertTo-SimplifiedChinese.ps1
# 繁体中文 -> 简体中文 转换工具（逐字转换，非翻译）
#
# 【用途】
#   将繁体中文文本转换为简体中文。适用于任何 AI / 脚本 / 手动调用，
#   可处理单个文件或整个目录。
#
# 【原理】
#   1. 第一层：.NET Framework 内置的 StrConv(SimplifiedChinese) 逐字转换
#      （Windows 自带 Microsoft.VisualBasic，无需安装任何依赖）。
#   2. 第二层：内置补充映射表（约 178 字），覆盖 StrConv 漏掉的常见繁体字
#      （如 後->后、於->于、處->处、裡->里、從->从 等）。
#   两层结合确保输出无繁体残留。
#
# 【依赖】
#   - Windows PowerShell 5.1 或 PowerShell 7+（Windows 平台）
#   - .NET Framework 4.x（系统自带）
#   无需安装任何第三方库。
#
# 【参数说明】
#   -Path        [必填] 输入文件路径或目录路径
#   -OutFile     [可选] 仅当 -Path 为文件时有效。输出文件路径。
#                        默认输出到输入文件同目录下 "<原名>_sc.txt"。
#   -OutDir      [可选] 仅当 -Path 为目录时有效。输出目录路径。
#                        默认在输入目录下创建 "simplified" 子目录。
#   -Recurse     [可选] 开关。目录模式下递归处理子目录。
#   -Overwrite   [可选] 开关。允许覆盖已存在的输出文件（默认跳过）。
#   -ShowReport  [可选] 开关。转换完成后输出每个文件的转换字数统计。
#
# 【示例】
#   # 转换单个文件，输出到同目录 test_sc.txt
#   .\ConvertTo-SimplifiedChinese.ps1 -Path "D:\docs\test.txt"
#
#   # 转换单个文件，指定输出路径
#   .\ConvertTo-SimplifiedChinese.ps1 -Path "a.txt" -OutFile "b.txt"
#
#   # 转换目录下所有 .txt 文件到简化目录（不递归）
#   .\ConvertTo-SimplifiedChinese.ps1 -Path "D:\docs"
#
#   # 递归转换目录，覆盖已有输出，显示统计
#   .\ConvertTo-SimplifiedChinese.ps1 -Path "D:\docs" -Recurse -Overwrite -ShowReport
#
# 【编码说明】
#   - 输入：自动按 UTF-8 读取（含/不含 BOM 均可）。
#   - 输出：统一写入 UTF-8 带 BOM（避免记事本/其他工具乱码）。
#   - 非文本文件（二进制）不会被处理。
#
# 【退出码】
#   0 = 成功（可能有文件被跳过）
#   1 = 参数错误或输入不存在
# =============================================================================

param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [string]$OutFile,

    [string]$OutDir,

    [switch]$Recurse,

    [switch]$Overwrite,

    [switch]$ShowReport
)

# ---------- 加载转换能力 ----------
Add-Type -AssemblyName "Microsoft.VisualBasic"

# ---------- 补充映射表（StrConv 漏转的常见繁体字） ----------
# 两行字符串一一对应：繁体串（第一行）与简体串（第二行）按索引配对。
$Script:TCChars = '後於處裏裡從徹慾隨們並兩這將讓隻餘為麼嚐唸築臺佔佈幹徵彙啓啟敘曆歷洩甦睏祕禦緻衆誡迴邨釐陞鑑鑒閉隸離鮮齊齒齡龍龜縈羈蠱襲覓觸議變謊贖輪轍轉邊邏鬱麵優儲儀億凍剛劃刪勁務動區協單報場夢奪奮奧嬌審層廳彈徑態憂憑戲據擇擔擊擁擬敗敵時會樣歲殘殺滅灑漢潛災無煙牽獎獲現環產當畫異發盡監蓋萬葉號衝複補裝誠語認誘誰調談請講識護譯責質贊贈辭選遺醫釋錯鍵鎖隊階隱雖難響顯體點黨'
$Script:SCChars = '后于处里里从彻欲随们并两这将让只余为么尝念筑台占布干征汇启启叙历历泄苏困秘御致众诫回村厘升鉴鉴闭隶离鲜齐齿龄龙龟萦羁蛊袭觅触议变谎赎轮辙转边逻郁面优储仪亿冻刚划删劲务动区协单报场梦夺奋奥娇审层厅弹径态忧凭戏据择担击拥拟败敌时会样岁残杀灭洒汉潜灾无烟牵奖获现环产当画异发尽监盖万叶号冲复补装诚语认诱谁调谈请讲识护译责质赞赠辞选遗医释错键锁队阶隐虽难响显体点党'

# 构建查找表：繁体字 -> 简体字
$Script:Map = @{}
for ($i = 0; $i -lt $Script:TCChars.Length; $i++) {
    $Script:Map[$Script:TCChars[$i]] = $Script:SCChars[$i]
}

# ---------- 核心转换函数 ----------
<#
.SYNOPSIS
    将一段文本中的繁体中文逐字转换为简体中文。
.DESCRIPTION
    对每个字符先尝试 StrConv 转换；若 StrConv 无变化，再查内置补充映射表。
    该函数为纯字符级映射，不涉及任何语义翻译。
    返回对象包含：
      - Text   : 转换后的文本
      - Count  : 实际被替换的字符数
.EXAMPLE
    $r = Convert-TextToSimplified -Text "帝皇禁軍的後衛"
    $r.Text   # 转换结果
    $r.Count  # 替换字数
#>
function Convert-TextToSimplified {
    param([string]$Text)

    if ([string]::IsNullOrEmpty($Text)) {
        return [pscustomobject]@{ Text = $Text; Count = 0 }
    }

    $sb = New-Object System.Text.StringBuilder
    $count = 0
    foreach ($ch in $Text.ToCharArray()) {
        $out = $ch
        # 第一层：StrConv 逐字转换
        $sc = [Microsoft.VisualBasic.Strings]::StrConv([string]$ch, [Microsoft.VisualBasic.VbStrConv]::SimplifiedChinese)
        if ($sc -ne [string]$ch) {
            $out = $sc
        }
        # 第二层：补充映射表兜底
        elseif ($Script:Map.ContainsKey($ch)) {
            $out = $Script:Map[$ch]
        }
        if ($out -ne [string]$ch) { $count++ }
        [void]$sb.Append($out)
    }
    return [pscustomobject]@{ Text = $sb.ToString(); Count = $count }
}

# ---------- 文件处理 ----------
<#
.SYNOPSIS
    转换单个文本文件，返回被转换的字符数。
#>
function Convert-File {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [switch]$OverwriteFlag
    )

    if (Test-Path -LiteralPath $OutputPath) {
        if (-not $OverwriteFlag) {
            Write-Host "SKIP (output exists): $OutputPath"
            return -1
        }
    }

    # 读取（UTF-8，兼容 BOM/无 BOM）
    $content = [System.IO.File]::ReadAllText($InputPath, [System.Text.Encoding]::UTF8)

    # 转换
    $result = Convert-TextToSimplified -Text $content

    # 写入 UTF-8 带 BOM
    [System.IO.File]::WriteAllText($OutputPath, $result.Text, (New-Object System.Text.UTF8Encoding($true)))
    return $result.Count
}

# ---------- 入口逻辑 ----------
if (-not (Test-Path -LiteralPath $Path)) {
    Write-Host "ERROR: Path not found: $Path" -ForegroundColor Red
    exit 1
}

$item = Get-Item -LiteralPath $Path

if ($item.PSIsContainer) {
    # ---- 目录模式 ----
    $outRoot = if ($OutDir) { $OutDir } else { Join-Path $item.FullName "simplified" }
    New-Item -ItemType Directory -Force -Path $outRoot | Out-Null

    $pattern = '*.txt'
    $files = Get-ChildItem -LiteralPath $item.FullName -Filter $pattern -File -Recurse:$Recurse
    Write-Host "Processing $($files.Count) file(s) from: $($item.FullName)"
    Write-Host "Output to: $outRoot"
    Write-Host ""

    $totalChanged = 0
    foreach ($f in $files) {
        $rel = $f.FullName.Substring($item.FullName.Length).TrimStart('\', '/')
        $outPath = Join-Path $outRoot $rel
        $outDir = Split-Path -Parent $outPath
        if (-not (Test-Path -LiteralPath $outDir)) {
            New-Item -ItemType Directory -Force -Path $outDir | Out-Null
        }
        $n = Convert-File -InputPath $f.FullName -OutputPath $outPath -OverwriteFlag:$Overwrite
        if ($n -ge 0) {
            $totalChanged += $n
            if ($ShowReport) { Write-Host "  $($f.Name): $n chars converted" }
        }
    }
    Write-Host ""
    Write-Host "Done. Total chars changed: $totalChanged"
}
else {
    # ---- 单文件模式 ----
    $outPath = if ($OutFile) { $OutFile } else {
        Join-Path $item.DirectoryName ($item.BaseName + '_sc' + $item.Extension)
    }
    $n = Convert-File -InputPath $item.FullName -OutputPath $outPath -OverwriteFlag:$Overwrite
    if ($n -ge 0) {
        Write-Host "Converted: $($item.FullName)"
        Write-Host "Output:    $outPath"
        Write-Host "Chars changed: $n"
    }
}

exit 0
