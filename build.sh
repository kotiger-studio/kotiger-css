#!/usr/bin/env bash
# Same as build.ps1, for Linux/macOS (used by Claude).
cd "$(dirname "$0")"; mkdir -p dist
{ printf '/* KOTIGER custom CSS - built from src/, do not edit by hand */\n'
  for f in $(ls src/*.css | LC_ALL=C sort); do printf '\n/* ===== %s ===== */\n' "$(basename "$f")"; sed -e :a -e '/^\n*$/{$d;N;ba' -e '}' "$f"; done
} > dist/custom.css
echo "OK: dist/custom.css"
