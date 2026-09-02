from pathlib import Path

app = Path('js/ui/app.js')
s = app.read_text()
old = '  $("#rip-pack")?.addEventListener("click", ripOpenPack);'
new = '''  const ripPackButton = $("#rip-pack");
  if (ripPackButton) {
    let ripGestureHandled = false;
    const handleRipGesture = event => {
      if (event?.cancelable) event.preventDefault();
      if (ripGestureHandled || packStage !== "sealed") return;
      ripGestureHandled = true;
      ripOpenPack();
    };
    ripPackButton.addEventListener("pointerup", handleRipGesture);
    ripPackButton.addEventListener("touchend", handleRipGesture, { passive: false });
    ripPackButton.addEventListener("click", handleRipGesture);
  }'''
if old not in s:
    raise SystemExit('rip pack click wiring marker not found')
s = s.replace(old, new, 1)
app.write_text(s)

css = Path('css/game.css')
c = css.read_text()
marker = '/* v1.1.125 — iPhone Chrome sealed-pack interaction hardening */'
if marker not in c:
    c += '''\n\n/* v1.1.125 — iPhone Chrome sealed-pack interaction hardening */
body.booster-modal-open .sealed-pack-button{
  position:relative!important;
  z-index:30!important;
  pointer-events:auto!important;
  touch-action:manipulation!important;
  -webkit-tap-highlight-color:transparent!important;
  user-select:none!important;
  -webkit-user-select:none!important;
}
body.booster-modal-open .sealed-pack-button .physical-booster-pack,
body.booster-modal-open .sealed-pack-button .physical-booster-pack *,
body.booster-modal-open .sealed-pack-button>strong,
body.booster-modal-open .sealed-pack-button>small{
  pointer-events:none!important;
}
'''
css.write_text(c)
print('v1.1.125 pack tap hardening applied')
