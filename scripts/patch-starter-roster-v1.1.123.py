from pathlib import Path

app = Path('js/ui/app.js')
s = app.read_text()
old = '<section class="starter-roster-summary" aria-label="Your Starting Roster"><h1>YOUR STARTING ROSTER</h1>'
new = '<section class="starter-roster-summary" aria-label="Here’s Your Starting Roster"><h1>HERE’S YOUR STARTING ROSTER</h1>'
if old not in s:
    raise SystemExit('starter summary heading marker not found')
s = s.replace(old, new, 1)
app.write_text(s)

css = Path('css/game.css')
c = css.read_text()
block = r'''

/* v1.1.123 — iPhone one-screen starting roster summary */
body[data-screen="starter-summary"]{
  overflow:hidden!important;
  overscroll-behavior:none!important;
}
body[data-screen="starter-summary"] #game{
  height:100dvh!important;
  min-height:100dvh!important;
  overflow:hidden!important;
}
.starter-roster-summary{
  box-sizing:border-box!important;
  width:min(100%,430px)!important;
  height:100dvh!important;
  min-height:0!important;
  max-height:100dvh!important;
  margin:0 auto!important;
  padding:max(42px,env(safe-area-inset-top)) 6px max(16px,env(safe-area-inset-bottom))!important;
  display:grid!important;
  grid-template-rows:auto minmax(0,1fr) 54px!important;
  gap:12px!important;
  align-items:center!important;
  overflow:hidden!important;
}
.starter-roster-summary h1{
  margin:0!important;
  padding:0 4px!important;
  text-align:center!important;
  font-size:clamp(29px,8.2vw,38px)!important;
  line-height:.96!important;
  letter-spacing:.025em!important;
  white-space:normal!important;
}
.starter-roster-summary-cards{
  width:100%!important;
  min-height:0!important;
  display:grid!important;
  grid-template-columns:repeat(3,minmax(0,1fr))!important;
  gap:4px!important;
  align-items:center!important;
  justify-items:center!important;
}
.starter-roster-summary-cards .starter-summary-superstar-card{
  width:min(31.7vw,136px)!important;
  max-width:136px!important;
  height:auto!important;
  aspect-ratio:680/1000!important;
}
.starter-roster-summary .start-match{
  box-sizing:border-box!important;
  width:100%!important;
  height:54px!important;
  min-height:54px!important;
  margin:0!important;
  padding:0 18px!important;
  font-size:16px!important;
}
@media(max-width:390px){
  .starter-roster-summary{padding-left:4px!important;padding-right:4px!important;gap:9px!important}
  .starter-roster-summary h1{font-size:29px!important}
  .starter-roster-summary-cards{gap:3px!important}
  .starter-roster-summary-cards .starter-summary-superstar-card{width:min(31.4vw,126px)!important}
}
'''
if '/* v1.1.123 — iPhone one-screen starting roster summary */' not in c:
    c += block
css.write_text(c)
