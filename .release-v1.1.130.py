from pathlib import Path
import json

app_path = Path('js/ui/app.js')
s = app_path.read_text()
needle = '''function renderSafePackFlow() {\n  const root = $("#game");\n'''
replacement = '''function renderSafePackFlow() {\n  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);\n  const root = $("#game");\n'''
if needle not in s:
    raise SystemExit('renderSafePackFlow insertion point not found')
s = s.replace(needle, replacement, 1)
app_path.write_text(s)

pkg_path = Path('package.json')
pkg = json.loads(pkg_path.read_text())
pkg['version'] = '1.1.130'
pkg_path.write_text(json.dumps(pkg, indent=2) + '\n')

build_path = Path('build.json')
b = json.loads(build_path.read_text())
b['version'] = '1.1.130'
b['releasedAt'] = '2026-09-02'
b['name'] = 'v1.1.130 — Pack Renderer ReferenceError Fix'
b['physicalIphoneSmoke'] = 'pending-v1.1.130'
build_path.write_text(json.dumps(b, indent=2) + '\n')
print('Applied v1.1.130 pack renderer ReferenceError fix')
