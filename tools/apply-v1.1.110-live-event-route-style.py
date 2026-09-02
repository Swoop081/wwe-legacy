from pathlib import Path
import re

p = Path('js/ui/app.js')
s = p.read_text()
pattern = r'''function selectionCarouselMarkup\(stars, selectedId, context, labelFor = null\) \{.*?\n\}\n\nfunction wireSelectionCarousel'''
replacement = '''function selectionCarouselMarkup(stars, selectedId, context, labelFor = null) {
  const liveRouteStyle = context === "live-event-select" || context === "live-event-swap";
  if (liveRouteStyle) {
    return `<div class="superstar-select-carousel live-event-route-choice-carousel" data-carousel="${context}">${stars.map(star => {
      const selected = star.id === selectedId;
      return `<button type="button" class="select-superstar-card live-event-route-choice ${selected?'selected':''}" data-select-context="${context}" data-select-star="${star.id}" aria-label="${star.name}. ${selected ? 'Selected.' : 'Tap to select.'}"><span class="live-tower-route-card-frame live-event-player-choice-frame">${superstarPreviewCardMarkup(star.id,"live-tower-opponent-card")}</span></button>`;
    }).join('')}</div>`;
  }
  const fav = new Set(profile?.favouriteSuperstars ?? []);
  return `<div class="superstar-select-carousel" data-carousel="${context}">${stars.map(star => {
    const key = `${context}:${star.id}`;
    const flipped = selectDetailKeys.has(key);
    const selected = star.id === selectedId;
    return `<button type="button" class="select-superstar-card ${selected?'selected':''} ${flipped?'is-flipped':''}" data-select-context="${context}" data-select-star="${star.id}" aria-label="${star.name}. ${selected ? 'Tap again for details.' : 'Tap to select.'}"><span class="select-card-inner"><span class="select-card-face select-card-front"><span class="select-favourite">${fav.has(star.id)?'★':''}</span><span class="selection-owned-card">${superstarPreviewCardMarkup(star.id,"selection-owned-superstar-card",{preferFinished:context==="deck-lab-select"})}</span></span><span class="select-card-face select-card-back"><strong>${star.name}</strong><span>${star.nickname}</span><b>${star.hp} HP</b><small>${star.archetype.replaceAll('-', ' ')}</small><em>${star.ability?.name ?? ''}</em><p>${star.ability?.text ?? ''}</p><i>TAP AGAIN FOR CARD</i></span></span></button>`;
  }).join('')}</div>`;
}

function wireSelectionCarousel'''
ns, n = re.subn(pattern, replacement, s, count=1, flags=re.S)
if n != 1:
    raise SystemExit(f'selectionCarouselMarkup replacement count {n}')
old = '''    const starId = btn.dataset.selectStar;
    const key = `${context}:${starId}`;
    const wasSelected = btn.classList.contains('selected');
'''
new = '''    const starId = btn.dataset.selectStar;
    const key = `${context}:${starId}`;
    const liveRouteStyle = context === "live-event-select" || context === "live-event-swap";
    if (liveRouteStyle) {
      onPick(starId);
      restoreScroll();
      return;
    }
    const wasSelected = btn.classList.contains('selected');
'''
if old not in ns:
    raise SystemExit('wire selection insertion point not found')
p.write_text(ns.replace(old, new, 1))

css = Path('css/game.css')
text = css.read_text()
marker = '/* v1.1.110 — Live Event owned choices are literally scaled route cards. */'
if marker not in text:
    text += '''\n\n/* v1.1.110 — Live Event owned choices are literally scaled route cards. */
body[data-screen="live-events"][data-live-view="detail"] .live-event-route-choice-carousel{align-items:center!important;gap:10px!important;overflow-x:auto!important;overflow-y:hidden!important;padding:4px 2px 8px!important}
body[data-screen="live-events"][data-live-view="detail"] .live-event-route-choice{appearance:none!important;-webkit-appearance:none!important;flex:0 0 min(31vw,122px)!important;width:min(31vw,122px)!important;height:auto!important;aspect-ratio:680/1000!important;padding:0!important;border:0!important;border-radius:10px!important;background:transparent!important;box-shadow:none!important;perspective:none!important;overflow:visible!important;scroll-snap-align:center!important}
body[data-screen="live-events"][data-live-view="detail"] .live-event-route-choice .live-event-player-choice-frame,body[data-screen="live-events"][data-live-view="detail"] .live-event-route-choice .live-tower-opponent-card{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;margin:0!important}
body[data-screen="live-events"][data-live-view="detail"] .live-event-route-choice.selected .live-event-player-choice-frame{border-radius:10px!important;outline:2px solid var(--tower-accent,#45d8ff)!important;outline-offset:2px!important;filter:drop-shadow(0 0 7px color-mix(in srgb,var(--tower-accent,#45d8ff) 70%,transparent))!important}
'''
css.write_text(text)
