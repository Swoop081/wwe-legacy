from pathlib import Path

app = Path('js/ui/app.js')
css = Path('css/game.css')

s = app.read_text()
start = s.index('function renderStarterSummary(')
end = s.index('\nfunction renderStarter()', start)
new_fn = '''function renderStarterSummary(starterIds = profile?.starterIds ?? []) {
  setChrome({ hideTopbar: true });
  const root = $("#game");
  const ids = [...new Set((starterIds ?? []).filter(Boolean))].slice(0, 3);
  const [leadId, secondId, thirdId] = ids;
  const leadCard = leadId ? superstarPreviewCardMarkup(leadId, "starter-summary-superstar-card starter-summary-lead-card") : "";
  const pairCards = [secondId, thirdId].filter(Boolean).map(id => superstarPreviewCardMarkup(id, "starter-summary-superstar-card starter-summary-pair-card")).join("");
  root.innerHTML = `<section class="starter-roster-summary" aria-label="Here’s Your Starting Roster">
    <div class="starter-roster-brand"><img src="${assetUrl("assets/images/branding-wwe-legacy-reward-logo.png")}" alt="WWE Legacy"></div>
    <h1><span>HERE’S YOUR</span><span>STARTING ROSTER</span></h1>
    <div class="starter-roster-summary-cards"><div class="starter-roster-lead">${leadCard}</div><div class="starter-roster-pair">${pairCards}</div></div>
    <button id="starter-summary-continue" type="button" class="start-match">CONTINUE</button>
  </section>`;
  $("#starter-summary-continue")?.addEventListener("click", () => { screen = "menu"; message = ""; renderMainMenu(); });
}
'''
s = s[:start] + new_fn + s[end:]
app.write_text(s)

c = css.read_text()
marker = '/* v1.1.123 — Starter roster confirmation must be one complete iPhone screen */'
if marker not in c:
    raise SystemExit('v1.1.123 starter roster CSS marker not found')
start = c.index(marker)
# v1.1.123 block is at the end of game.css; replace it completely.
new_css = r'''/* v1.1.124 — starter roster 1+2 layout, one iPhone viewport */
body[data-screen="starter"]{overflow:hidden;overscroll-behavior:none}
.starter-roster-summary{box-sizing:border-box;width:100%;max-width:430px;height:100dvh;max-height:100dvh;min-height:0;margin:0 auto;padding:max(8px,env(safe-area-inset-top)) 10px max(6px,env(safe-area-inset-bottom));display:grid;grid-template-rows:auto auto minmax(0,1fr) auto;gap:4px;overflow:hidden;background:radial-gradient(circle at 50% 40%,rgba(46,196,255,.09),transparent 31%),radial-gradient(circle at 50% 68%,rgba(225,177,61,.08),transparent 43%),#05080d}
.starter-roster-brand{height:clamp(34px,5.2dvh,50px);display:flex;justify-content:center;align-items:center}
.starter-roster-brand img{display:block;max-height:100%;width:auto;max-width:160px;object-fit:contain}
.starter-roster-summary h1{margin:0;display:grid;justify-items:center;text-align:center;font-size:clamp(27px,8.2vw,38px);line-height:.88;letter-spacing:.02em}
.starter-roster-summary h1 span{display:block}
.starter-roster-summary-cards{min-height:0;width:100%;display:grid;grid-template-rows:minmax(0,1.08fr) minmax(0,.92fr);gap:4px;align-items:center}
.starter-roster-lead,.starter-roster-pair{min-height:0;height:100%;display:flex;justify-content:center;align-items:center}
.starter-roster-lead .starter-summary-superstar-card{display:block;height:min(29dvh,260px);width:auto;max-width:49vw;aspect-ratio:680/1000}
.starter-roster-pair{width:100%;gap:8px}
.starter-roster-pair .starter-summary-superstar-card{display:block;height:min(23.5dvh,212px);width:auto;max-width:46vw;aspect-ratio:680/1000}
.starter-roster-summary .start-match{width:100%;min-width:0;margin:0;min-height:44px;padding:10px 16px}
@media(max-height:760px){.starter-roster-summary{gap:3px;padding-top:max(5px,env(safe-area-inset-top));padding-bottom:max(4px,env(safe-area-inset-bottom))}.starter-roster-brand{height:30px}.starter-roster-summary h1{font-size:clamp(23px,7.2vw,31px)}.starter-roster-lead .starter-summary-superstar-card{height:min(25dvh,215px)}.starter-roster-pair .starter-summary-superstar-card{height:min(20.5dvh,178px)}.starter-roster-summary .start-match{min-height:40px;padding:8px 14px}}
'''
c = c[:start] + new_css + '\n'
css.write_text(c)
