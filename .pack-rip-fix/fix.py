from pathlib import Path

p = Path('js/ui/app.js')
s = p.read_text()

old = 'function processPack(kind = "standard") {\n  try {\n    currentPackType = "standard";'
new = 'function processPack(kind = "standard") {\n  try {\n    screen = "boosters";\n    currentPackType = "standard";'
if old not in s:
    raise SystemExit('processPack marker not found')
s = s.replace(old, new, 1)

old = '  setTimeout(() => {\n    if (screen !== "boosters" || packStage !== "opening") return;\n    revealedPackCards = new Set(lastPack.map((_, index) => index));'
new = '  setTimeout(() => {\n    if (packStage !== "opening" || !lastPack?.length) return;\n    revealedPackCards = new Set(lastPack.map((_, index) => index));'
if old not in s:
    raise SystemExit('rip timeout guard marker not found')
s = s.replace(old, new, 1)

old = '    if (screen !== "boosters" || packStage !== "reveal" || lastPack?.[boosterFocusIndex] !== pull) return;'
new = '    if (packStage !== "reveal" || lastPack?.[boosterFocusIndex] !== pull) return;'
if old in s:
    s = s.replace(old, new, 1)

p.write_text(s)
