from pathlib import Path
import json, re

app_path = Path('js/ui/app.js')
s = app_path.read_text()
old = '''    pendingUpgrades = []; appliedPackUpgrades = []; revealedPackCards = new Set(); boosterRulesFlipped = new Set(); boosterInspectIndex = null; boosterInspectFlipped = false; convertedPackCards = new Set(); boosterFocusIndex = 0; packFinalized = false; packStage = "sealed";\n    const setName = setCollections[activeBoosterSetId]?.displayName ?? activeBoosterSetId;\n    message = `${setName} pack ready. Tap the pack to rip it open.`;\n    saveProfile(profile); renderBoosters();'''
new = '''    pendingUpgrades = []; appliedPackUpgrades = []; revealedPackCards = new Set(lastPack.map((_, index) => index)); boosterRulesFlipped = new Set(); boosterInspectIndex = null; boosterInspectFlipped = false; convertedPackCards = new Set(); boosterFocusIndex = 0; packFinalized = false; packStage = "reveal";\n    const setName = setCollections[activeBoosterSetId]?.displayName ?? activeBoosterSetId;\n    message = `${setName} pack open — Card 1 of ${lastPack.length}.`;\n    saveProfile(profile); renderBoosters();\n    scheduleFocusedDuplicateConversion();\n    maybeCelebrateFocusedSuperstarPull(220);'''
if old not in s:
    raise SystemExit('processPack sealed-state block not found')
s = s.replace(old, new, 1)
app_path.write_text(s)

build_path = Path('build.json')
b = json.loads(build_path.read_text())
b['version'] = '1.1.128'
b['name'] = 'v1.1.128 — Direct Pack Reveal Recovery'
b['physicalIphoneSmoke'] = 'pending-v1.1.128'
build_path.write_text(json.dumps(b, indent=2) + '\n')

pkg_path = Path('package.json')
p = json.loads(pkg_path.read_text())
p['version'] = '1.1.128'
pkg_path.write_text(json.dumps(p, indent=2) + '\n')

# Cache-stamp all explicit release query strings across text assets.
for path in [Path('index.html'), *Path('js').rglob('*.js'), *Path('css').rglob('*.css')]:
    if not path.exists():
        continue
    text = path.read_text()
    text = re.sub(r'\?v=1\.1\.127\b', '?v=1.1.128', text)
    path.write_text(text)

print('Applied v1.1.128 direct pack reveal recovery')
