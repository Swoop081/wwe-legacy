from pathlib import Path

p = Path('js/ui/app.js')
s = p.read_text()

old_summary = '''  const compactSummaryThumbs = summaryLayout.map(({p,index,slot})=>summaryCard(p,index,slot)).join("");'''
new_summary = '''  const compactSummaryThumbs = packStage === "summary" ? summaryLayout.map(({p,index,slot})=>summaryCard(p,index,slot)).join("") : "";'''
if old_summary not in s:
    raise SystemExit('summary pre-render target not found')
s = s.replace(old_summary, new_summary, 1)

old_reveal = '''    const cardMarkup = converted
      ? upRewardTile(p,"reveal-up-reward",`data-booster-next="${boosterFocusIndex}"`)
      : `<div class="booster-flip-card single-pack-card is-revealed is-current rarity-${p.card.rarity} ${tierCssClass(p.tier)} ${converting?'duplicate-disintegrating':''}">
          ${collectibleCardMarkup(p.card,{flipped:false,tier:p.tier,extraClass:"booster-ccg",flipAttr:`data-booster-next="${boosterFocusIndex}"`,allowAnimation:false})}
          ${converting?`<div class="duplicate-conversion-overlay" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><strong>DUPLICATE</strong><span>CONVERTING TO UP</span></div>`:''}
        </div>`;'''
new_reveal = '''    const revealArt = finishedCardArtFor(p.card) || layeredCardArtFor(p.card) || artworkFor(p.card) || "";
    const revealArtMarkup = revealArt
      ? `<img class="booster-safe-reveal-art" src="${assetUrl(revealArt)}" alt="${p.card.name}" loading="eager" decoding="async">`
      : `<div class="booster-safe-reveal-fallback"><strong>${p.card.name}</strong><span>${String(p.card.kind || "CARD").toUpperCase()}</span></div>`;
    const cardMarkup = converted
      ? upRewardTile(p,"reveal-up-reward",`data-booster-next="${boosterFocusIndex}"`)
      : `<button type="button" class="booster-safe-reveal-card single-pack-card is-revealed is-current rarity-${p.card.rarity} ${tierCssClass(p.tier)} ${converting?'duplicate-disintegrating':''}" data-booster-next="${boosterFocusIndex}" aria-label="${p.card.name}. Tap for next card.">
          ${revealArtMarkup}
          <span class="booster-safe-reveal-name">${p.card.name}</span>
          ${converting?`<div class="duplicate-conversion-overlay" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><strong>DUPLICATE</strong><span>CONVERTING TO UP</span></div>`:''}
        </button>`;'''
if old_reveal not in s:
    raise SystemExit('reveal renderer target not found')
s = s.replace(old_reveal, new_reveal, 1)

p.write_text(s)

css = Path('css/game.css')
cs = css.read_text()
marker = '/* v1.1.127 — lightweight pack reveal renderer */'
if marker not in cs:
    cs += '''\n\n/* v1.1.127 — lightweight pack reveal renderer */\n.booster-safe-reveal-card{appearance:none;-webkit-appearance:none;border:0;background:transparent;color:#fff;padding:0;display:grid;grid-template-rows:minmax(0,1fr) auto;place-items:center;gap:8px;width:min(310px,74vw)!important;max-width:310px!important;height:auto!important;cursor:pointer;touch-action:manipulation}\n.booster-safe-reveal-art{display:block;width:100%;height:auto;max-height:68dvh;object-fit:contain;border-radius:14px;filter:drop-shadow(0 22px 32px rgba(0,0,0,.48));pointer-events:none}\n.booster-safe-reveal-name{font-size:.78rem;font-weight:1000;letter-spacing:.04em;text-align:center;pointer-events:none}\n.booster-safe-reveal-fallback{width:100%;aspect-ratio:680/1000;border:1px solid rgba(255,255,255,.18);border-radius:14px;background:linear-gradient(155deg,#171b24,#090b10);display:grid;place-content:center;gap:7px;text-align:center;padding:20px}\n.booster-safe-reveal-fallback strong{font-size:1rem}.booster-safe-reveal-fallback span{font-size:.58rem;letter-spacing:.16em;color:#aeb8c8}\nbody.booster-modal-open .booster-safe-reveal-card *{pointer-events:none}\n'''
    css.write_text(cs)

print('v1.1.127 lightweight pack reveal patch applied')
