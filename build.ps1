# Builds dist/custom.css from src/*.css (in file-name order).
# Run: right click -> "Run with PowerShell", or: powershell -ExecutionPolicy Bypass -File build.ps1
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$out  = Join-Path $root "dist\custom.css"
$sb = New-Object System.Text.StringBuilder
[void]$sb.Append("/* KOTIGER custom CSS - built from src/, do not edit by hand */`n")
Get-ChildItem (Join-Path $root "src") -Filter *.css | Sort-Object Name | ForEach-Object {
  [void]$sb.Append("`n/* ===== $($_.Name) ===== */`n")
  [void]$sb.Append(([IO.File]::ReadAllText($_.FullName, [Text.Encoding]::UTF8)).TrimEnd() + "`n")
}
New-Item -ItemType Directory -Force (Split-Path $out) | Out-Null
[IO.File]::WriteAllText($out, $sb.ToString(), (New-Object System.Text.UTF8Encoding($false)))
Write-Host "OK: $out"
