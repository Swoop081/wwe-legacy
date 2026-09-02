from pathlib import Path

app_path = Path('js/ui/app.js')
css_path = Path('css/game.css')
app = app_path.read_text()

old_sig = '''function collectibleCardMarkup(card, { flipped = false, tier = null, foil = null, extraClass = "", footer = "", flipAttr = "", interactive = true, eagerArt = false, preferFinished = false, finishedAnimationShell = false } = {}) {'''
new_sig = '''function collectibleCardMarkup(card, { flipped = false, tier = null, foil = null, extraClass = "", footer = "", flipAttr = "", interactive = true, eagerArt = false, preferFinished = false, finishedAnimationShell = false, allowAnimation = true } = {}) {'''
if old_sig not in app:
    raise SystemExit('collectibleCardMarkup signature not found')
app = app.replace(old_sig, new_sig, 1)

old_anim = '''  const animatedSurface = animatedCardSurfaceMarkup(card);'''
new_anim = '''  const animatedSurface = allowAnimation ? animatedCardSurfaceMarkup(card) : "";'''
if old_anim not in app:
    raise SystemExit('animatedSurface line not found')
app = app.replace(old_anim, new_anim, 1)

old_rip = '''function ripOpenPack() {
  if (packStage !== "sealed" || !lastPack?.length) return;
  packStage = "opening";
  message = "RIPPING PACK…";
  document.querySelector(".sealed-pack-stage")?.classList.add("is-ripping");
  setTimeout(() => {
    if (packStage !== "opening" || !lastPack?.length) return;
    revealedPackCards = new Set(lastPack.map((_, index) => index));
    boosterFocusIndex = Math.max(0, Math.min(boosterFocusIndex, lastPack.length - 1));
    packStage = "reveal";
    message = "Pack open — all five cards are face up.";
    renderBoosters();
    scheduleFocusedDuplicateConversion();
    maybeCelebrateFocusedSuperstarPull(300);
  }, 420);
}'''
new_rip = '''function ripOpenPack() {
  if (packStage !== "sealed" || !lastPack?.length) return;
  // v1.1.124 — iPhone Safari stability: do not allocate a second animated pack
  // scene before mounting the first reveal card. The pack contents were already
  // generated and saved by processPack(), so this is presentation-only.
  revealedPackCards = new Set(lastPack.map((_, index) => index));
  boosterFocusIndex = Math.max(0, Math.min(boosterFocusIndex, lastPack.length - 1));
  packStage = "reveal";
  message = "Pack open — reveal all five cards.";
  renderBoosters();
  scheduleFocusedDuplicateConversion();
  maybeCelebrateFocusedSuperstarPull(220);
}'''
if old_rip not in app:
    raise SystemExit('ripOpenPack block not found')
app = app.replace(old_rip, new_rip, 1)

replacements = [
    ('collectibleCardMarkup(pull.card,{flipped:boosterInspectFlipped,tier:pull.tier,extraClass:"hud-superstar-modal-card deck-lab-inspect-card booster-inspect-card",flipAttr:\'data-flip-booster-inspect="1"\'})',
     'collectibleCardMarkup(pull.card,{flipped:boosterInspectFlipped,tier:pull.tier,extraClass:"hud-superstar-modal-card deck-lab-inspect-card booster-inspect-card",flipAttr:\'data-flip-booster-inspect="1"\',allowAnimation:false})'),
    ('collectibleCardMarkup(p.card,{flipped:false,tier:p.tier,interactive:false,extraClass:"pack-summary-ccg"})',
     'collectibleCardMarkup(p.card,{flipped:false,tier:p.tier,interactive:false,extraClass:"pack-summary-ccg",allowAnimation:false})'),
    ('collectibleCardMarkup(p.card,{flipped:false,tier:p.tier,extraClass:"booster-ccg",flipAttr:`data-booster-next="${boosterFocusIndex}"`})',
     'collectibleCardMarkup(p.card,{flipped:false,tier:p.tier,extraClass:"booster-ccg",flipAttr:`data-booster-next="${boosterFocusIndex}"`,allowAnimation:false})'),
]
for old, new in replacements:
    if old not in app:
        raise SystemExit(f'pack renderer target not found: {old[:80]}')
    app = app.replace(old, new, 1)

app_path.write_text(app)

css = css_path.read_text()
marker = '/* v1.1.124 — iPhone pack reveal stability */'
if marker not in css:
    css += '''\n\n/* v1.1.124 — iPhone pack reveal stability */
body.booster-modal-open .booster-reveal-atmosphere,
body.booster-modal-open .pack-rip-flash,
body.booster-modal-open .pack-rip-callout,
body.booster-modal-open .ccg-animated-card-surface,
body.booster-modal-open .ccg-animated-card-plate {
  display: none !important;
  animation: none !important;
}
body.booster-modal-open .single-card-reveal-stage,
body.booster-modal-open .booster-card-halo,
body.booster-modal-open .booster-flip-card,
body.booster-modal-open .ccg-card,
body.booster-modal-open .ccg-card-inner {
  animation: none !important;
  transition: none !important;
}
@media (max-width: 430px) {
  body.booster-modal-open .booster-pack-modal,
  body.booster-modal-open .booster-pack-modal-shell,
  body.booster-modal-open .booster-pack-modal-body {
    transform: none !important;
    filter: none !important;
    backdrop-filter: none !important;
  }
}
'''
css_path.write_text(css)

print('v1.1.124 pack crash hotfix applied')
