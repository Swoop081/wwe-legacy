from pathlib import Path
import json, re

APP = Path('js/ui/app.js')
INDEX = Path('index.html')
BUILD = Path('build.json')
CSS = Path('css/v1.1.118-play-page-live-events-hero.css')

s = APP.read_text()
match = re.search(r'(  const firstPageCards = `\n)(.*?)(`;\n  const secondPageCards = `)', s, re.S)
if not match:
    raise SystemExit('firstPageCards block not found')
body = match.group(2)
lines = [line for line in body.splitlines() if line.strip()]
articles = {}
for line in lines:
    if 'id="play-live-event"' in line:
        articles['live'] = line
    elif 'id="play-exhibition"' in line:
        articles['exhibition'] = line
    elif 'id="play-kotr"' in line:
        articles['kotr'] = line
if set(articles) != {'live','exhibition','kotr'}:
    raise SystemExit(f'play page cards missing: {set(articles)}')
new_body = '\n'.join([articles['live'], articles['exhibition'], articles['kotr']])
s = s[:match.start(2)] + new_body + s[match.end(2):]
APP.write_text(s)

css = '''/* v1.1.118 — Live Events leads Play page one and the full iPhone viewport is used. */
@media (max-width:600px){
  .legacy-play-v3.play-menu-page-1{min-height:calc(100svh - 188px);height:calc(100svh - 188px);display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:8px;padding-bottom:4px;overflow:hidden}
  .play-menu-page-1 .legacy-play-heading{padding-block:4px 2px;margin:0}
  .play-menu-page-1 .legacy-play-heading h2{font-size:clamp(29px,8.2vw,38px);line-height:.92;margin:0}
  .play-menu-page-1 .legacy-play-heading p{margin:3px 0 0;font-size:12px}
  .play-menu-page-1 .legacy-mode-stack{display:grid;grid-template-rows:minmax(0,1.45fr) minmax(0,.78fr) minmax(0,.78fr);gap:7px;min-height:0}
  .play-menu-page-1 .legacy-mode-banner{min-height:0;height:100%;margin:0;border-radius:10px;overflow:hidden}
  .play-menu-page-1 #play-live-event .legacy-mode-superstar{width:49%;right:-1%;transform:scale(1.1);transform-origin:bottom right}
  .play-menu-page-1 #play-live-event .legacy-mode-copy{width:62%;padding:14px 8px 12px 14px}
  .play-menu-page-1 #play-live-event .mode-logo span,.play-menu-page-1 #play-live-event .mode-logo strong{font-size:clamp(35px,10.2vw,51px);line-height:.82}
  .play-menu-page-1 #play-live-event .legacy-mode-copy>b{font-size:13px;padding:10px 12px;margin-top:8px}
  .play-menu-page-1 :is(#play-exhibition,#play-kotr) .legacy-mode-superstar{width:35%;right:0}
  .play-menu-page-1 :is(#play-exhibition,#play-kotr) .legacy-mode-copy{width:71%;padding:8px 7px 7px 12px}
  .play-menu-page-1 :is(#play-exhibition,#play-kotr) .mode-logo span,.play-menu-page-1 :is(#play-exhibition,#play-kotr) .mode-logo strong{font-size:clamp(24px,7vw,33px);line-height:.84}
  .play-menu-page-1 :is(#play-exhibition,#play-kotr) .legacy-mode-copy em{font-size:9px}
  .play-menu-page-1 :is(#play-exhibition,#play-kotr) .legacy-mode-copy small{font-size:9px;line-height:1.05;margin-top:1px}
  .play-menu-page-1 :is(#play-exhibition,#play-kotr) .legacy-mode-copy>b{font-size:11px;padding:6px 9px;margin-top:4px}
  .play-menu-page-1 .play-mode-page-arrow{min-height:52px;height:52px;margin:0;padding:0 18px;border-radius:9px}
  .play-menu-page-1 .play-mode-page-arrow span{font-size:12px}
  .play-menu-page-1 .play-mode-page-arrow b{font-size:34px}
}
'''
CSS.write_text(css)

idx = INDEX.read_text()
link = '  <link rel="stylesheet" href="./css/v1.1.118-play-page-live-events-hero.css?v=1.1.118">\n'
if 'v1.1.118-play-page-live-events-hero.css' not in idx:
    anchor = '  <script>\n    (() => {'
    if anchor not in idx:
        raise SystemExit('index insertion anchor not found')
    idx = idx.replace(anchor, link + anchor, 1)
INDEX.write_text(idx)

build = json.loads(BUILD.read_text())
build['version'] = '1.1.118'
build['releasedAt'] = '2026-09-02'
build['name'] = 'v1.1.118 — Live Events Play Page Hero'
BUILD.write_text(json.dumps(build, indent=2) + '\n')

check = APP.read_text()
pos_live = check.index('id="play-live-event"', check.index('const firstPageCards'))
pos_ex = check.index('id="play-exhibition"', check.index('const firstPageCards'))
pos_kotr = check.index('id="play-kotr"', check.index('const firstPageCards'))
if not (pos_live < pos_ex < pos_kotr):
    raise SystemExit('Play page order verification failed')
print('v1.1.118 Play page direct fix prepared')
