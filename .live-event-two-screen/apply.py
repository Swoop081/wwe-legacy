from pathlib import Path
p = Path('js/ui/app.js')
s = p.read_text()

anchor = 'let liveEventSuperstarSwapTowerKey = null;'
if 'let liveEventMatchupOpen = false;' not in s:
    if anchor not in s:
        raise SystemExit('state anchor missing')
    s = s.replace(anchor, anchor + '\nlet liveEventMatchupOpen = false;', 1)

old = 'function showLiveEvents() { if (!profile) { screen = "starter"; renderStarter(); return; } selectedLiveEventKey = null; liveEventSuperstarSwapTowerKey = null; screen = "live-events"; message = ""; setChrome(); renderLiveEvents(); }'
new = 'function showLiveEvents() { if (!profile) { screen = "starter"; renderStarter(); return; } selectedLiveEventKey = null; liveEventSuperstarSwapTowerKey = null; liveEventMatchupOpen = false; screen = "live-events"; message = ""; setChrome(); renderLiveEvents(); }'
if old in s:
    s = s.replace(old, new, 1)
old = 'function showLiveEventTower(towerKey) { if (!profile) { screen = "starter"; renderStarter(); return; } selectedLiveEventKey = towerKey; liveEventSuperstarSwapTowerKey = null; screen = "live-events"; message = ""; setChrome(); renderLiveEvents(); }'
new = 'function showLiveEventTower(towerKey) { if (!profile) { screen = "starter"; renderStarter(); return; } selectedLiveEventKey = towerKey; liveEventSuperstarSwapTowerKey = null; liveEventMatchupOpen = false; screen = "live-events"; message = ""; setChrome(); renderLiveEvents(); }'
if old in s:
    s = s.replace(old, new, 1)

old = '''  const previewThemed = [...new Set(event.opponentPool.filter(id => id !== chosenId && superstarById[id]))];
  const previewFallback = roster.map(star => star.id).filter(id => id !== chosenId && !previewThemed.includes(id));
  const previewPool = [...previewThemed, ...previewFallback];'''
new = '''  const previewThemed = [...new Set(event.opponentPool.filter(id => id !== chosenId && superstarById[id]))];
  const previewPool = previewThemed;'''
if old not in s:
    raise SystemExit('preview pool block missing')
s = s.replace(old, new, 1)

marker = "  wireSelectionCarousel('live-event-select', id => { selection.p1 = id; renderLiveEvents(); });"
if marker not in s:
    raise SystemExit('selector wiring marker missing')
block = r'''  if (liveEventMatchupOpen && !cleared) {
    const matchupStageIndex = active ? Math.max(0, Math.min(LIVE_EVENT_LENGTH - 1, Number(run?.stage ?? 0))) : 0;
    const matchupOpponentId = opponentIds[matchupStageIndex];
    const matchupOpponent = superstarById[matchupOpponentId];
    const matchupStage = liveEventStage(event, matchupStageIndex);
    const canChooseForThisMatch = !active || matchupStageIndex === 0;
    const playerCards = canChooseForThisMatch
      ? selectionCarouselMarkup(unlocked, chosenId, 'live-event-select')
      : `<div class="live-event-locked-player-card"><span class="live-tower-route-card-frame">${superstarPreviewCardMarkup(chosenId,"live-tower-opponent-card")}</span></div>`;
    root.innerHTML = `<section class="live-event-matchup-screen premium-screen" style="--tower-accent:${detailAccent}">
      <header class="live-event-matchup-head"><button type="button" id="back-live-event-route" class="live-event-matchup-back">‹</button><div><span>MATCH ${matchupStageIndex + 1} OF ${LIVE_EVENT_LENGTH}</span><h2>${event.name}</h2></div></header>
      <section class="live-event-matchup-player"><span>YOUR SUPERSTAR${canChooseForThisMatch ? ' · SWIPE TO CHANGE' : ' · LOCKED'}</span>${playerCards}</section>
      <div class="live-event-matchup-vs">VS</div>
      <section class="live-event-matchup-opponent"><span>OPPONENT</span><div class="live-event-matchup-opponent-card"><span class="live-tower-route-card-frame">${superstarPreviewCardMarkup(matchupOpponentId,"live-tower-opponent-card")}</span></div><strong>${matchupOpponent?.name ?? 'Opponent'}</strong><small>${matchupStage.label}</small></section>
      <button type="button" id="live-event-matchup-fight" class="start-match live-event-matchup-fight">FIGHT MATCH ${matchupStageIndex + 1}</button>
    </section>`;
    if (canChooseForThisMatch) {
      wireSelectionCarousel('live-event-select', id => {
        selection.p1 = id;
        if (active && Number(run?.stage ?? 0) === 0 && id !== run?.superstarId) {
          try { changeLiveEventTowerSuperstar(profile, towerKey, id, new Date()); saveProfile(profile); }
          catch (error) { message = error.message; }
        }
        renderLiveEvents();
      });
    }
    $("#back-live-event-route")?.addEventListener("click", () => { liveEventMatchupOpen = false; renderLiveEvents(); });
    $("#live-event-matchup-fight")?.addEventListener("click", () => { if (active) startCurrentLiveEventMatch(towerKey); else beginLiveEventTower(); });
    return;
  }

  const routeCards = [...root.querySelectorAll('.live-tower-route-card')];
  const currentRouteIndex = active ? Math.max(0, Math.min(LIVE_EVENT_LENGTH - 1, Number(run?.stage ?? 0))) : 0;
  routeCards.forEach((card,index) => {
    const isCurrent = !cleared && index === currentRouteIndex;
    card.classList.toggle('is-current-selectable', isCurrent);
    if (!isCurrent) return;
    card.setAttribute('role','button');
    card.setAttribute('tabindex','0');
    const openMatchup = () => { liveEventMatchupOpen = true; renderLiveEvents(); };
    card.addEventListener('click', openMatchup);
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openMatchup(); } });
  });
  requestAnimationFrame(() => routeCards[currentRouteIndex]?.scrollIntoView?.({ block:'center', inline:'nearest' }));
'''
if 'const routeCards = [...root.querySelectorAll(\'.live-tower-route-card\')];' not in s:
    s = s.replace(marker, block + marker, 1)

p.write_text(s)
