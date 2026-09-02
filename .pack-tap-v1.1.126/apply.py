from pathlib import Path

app = Path('js/ui/app.js')
s = app.read_text()
old = '''  const ripPackButton = $("#rip-pack");
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
  }
'''
new = '''  const ripPackButton = $("#rip-pack");
  const ripCaptureSurface = root.querySelector(".booster-pack-modal-body");
  if (ripPackButton && ripCaptureSurface && packStage === "sealed") {
    let ripGestureHandled = false;
    const handleRipGesture = event => {
      if (ripGestureHandled || packStage !== "sealed") return;
      if (event?.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
      if (event?.cancelable) event.preventDefault();
      ripGestureHandled = true;
      ripPackButton.classList.add("is-rip-pressed");
      requestAnimationFrame(() => ripOpenPack());
    };
    // v1.1.126 — the whole sealed-pack modal body owns the gesture at capture
    // phase. This avoids child artwork/layer hit-testing swallowing the tap on
    // iPhone Chrome/WebKit. Pointerdown gives immediate first-contact feedback.
    ripCaptureSurface.addEventListener("pointerdown", handleRipGesture, { capture: true, once: true });
    ripCaptureSurface.addEventListener("touchstart", handleRipGesture, { capture: true, passive: false, once: true });
    ripCaptureSurface.addEventListener("click", handleRipGesture, { capture: true, once: true });
    ripPackButton.addEventListener("keydown", handleRipGesture, { once: true });
  }
'''
if old not in s:
    raise SystemExit('v1.1.125 rip binding block not found')
s = s.replace(old, new, 1)
app.write_text(s)

css = Path('css/game.css')
c = css.read_text()
marker = '/* v1.1.126 — sealed pack full-surface tap ownership */'
if marker not in c:
    c += '''\n\n/* v1.1.126 — sealed pack full-surface tap ownership */
body.booster-modal-open .booster-pack-modal-body,
body.booster-modal-open .sealed-pack-stage{
  pointer-events:auto!important;
  touch-action:manipulation!important;
}
body.booster-modal-open .sealed-pack-stage{
  width:100%!important;
  cursor:pointer!important;
}
body.booster-modal-open .sealed-pack-button.is-rip-pressed{
  transform:scale(.985)!important;
  opacity:.72!important;
}
'''
css.write_text(c)
print('Applied v1.1.126 full-surface sealed-pack tap ownership')
