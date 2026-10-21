$root = Split-Path $MyInvocation.MyCommand.Path -Parent | Split-Path -Parent

$files = Get-ChildItem -Path $root -Recurse -Include "*.tsx","*.ts" |
    Where-Object { $_.FullName -notmatch "node_modules|\.next|\.git" }

$totalReplaced = 0
$utf8 = [System.Text.Encoding]::UTF8

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, $utf8)

    if (-not $content) { continue }

    $original = $content

    # Replace standalone TrustGrid not part of code identifiers (TrustGridForm, TrustGridFormProps, etc.)
    $content = [regex]::Replace($content, '\bTrustGrid\b(?!(Form|Props|Activities|_))', 'TRUSTGRID.AI')

    # Replace all-caps TRUSTGRID not already followed by .AI
    $content = [regex]::Replace($content, '\bTRUSTGRID\b(?!\.AI)', 'TRUSTGRID.AI')

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8)
        $totalReplaced++
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host ""
Write-Host "Total files updated: $totalReplaced"
