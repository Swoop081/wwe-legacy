from pathlib import Path
import json

app_path = Path('js/ui/app.js')
s = app_path.read_text()
old = '''function processPack(kind = "standard") {
  try {
    screen = "boosters";
    currentPackType = "standard";
    lastPack = openBooster(profile, Math.random, activeBoosterSetId);
    if (lastPack?.[0]?.card?.setId) activeBoosterSetId = lastPack[0].card.setId;
    pendingUpgrades = []; appliedPackUpgrades = []; revealedPackCards = new Set(lastPack.map((_, index) => index)); boosterRulesFlipped = new Set(); boosterInspectIndex = null; boosterInspectFlipped = false; convertedPackCards = new Set(); boosterFocusIndex = 0; packFinalized = false; packStage = "reveal";
    const setName = setCollections[activeBoosterSetId]?.displayName ?? activeBoosterSetId;
    message = `${setName} pack open — Card 1 of ${lastPack.length}.`;
    saveProfile(profile); renderBoosters();
    scheduleFocusedDuplicateConversion();
    maybeCelebrateFocusedSuperstarPull(220);
  } catch (error) { message = error.message; renderBoosters(); }
}
'''
new = '''function renderSafePackFlow() {
  const root = $("#game");
  const pulls = lastPack ?? [];
  if (!root || !pulls.length) { packStage = "idle"; renderBoosters(); return; }
  document.body.classList.add("booster-modal-open");
  const mobileNav = document.querySelector("#mobile-game-nav");
  if (mobileNav) mobileNav.hidden = true;
  const setInfo = setCollections[activeBoosterSetId] ?? setCollection;
  const setName = setInfo?.displayName ?? setInfo?.name ?? activeBoosterSetId;
  const rarityName = pull => pull?.card?.ultraRare ? "ULTRA RARE" : ((setCollections[pull?.card?.setId]?.rarityLabels ?? setInfo?.rarityLabels)?.[pull?.card?.rarity ?? 1] ?? "CARD").toUpperCase();

  if (packStage === "safe-summary") {
    const converted = finalizePackUniversePoints(profile, pulls);
    if (converted) saveProfile(profile);
    const rows = pulls.map((pull, index) => `<article style="display:grid;grid-template-columns:36px 1fr auto;gap:12px;align-items:center;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.12)"><b style="font-size:18px;color:#f0bf54">${index + 1}</b><div><strong style="display:block;font-size:16px">${escapeHtml(pull.card?.name ?? 'Card')}</strong><small style="opacity:.7">${escapeHtml(rarityName(pull))}${pull.tier ? ` · ${escapeHtml(tierLabel(pull.tier).toUpperCase())}` : ''}</small></div><span style="font-weight:900;color:${pull.isNewCard ? '#60e79a' : '#fff'}">${pull.universePointsValue ? `+${pull.universePointsValue} UP` : pull.isNewCard ? 'NEW' : ''}</span></article>`).join("");
    root.innerHTML = `<section style="position:fixed;inset:0;z-index:9000;background:#05070b;color:#fff;padding:max(24px,env(safe-area-inset-top)) 22px max(24px,env(safe-area-inset-bottom));box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden"><header style="display:flex;justify-content:space-between;align-items:end;padding:8px 0 18px;border-bottom:1px solid rgba(255,255,255,.15)"><span style="font-size:13px;font-weight:900;letter-spacing:.22em;color:#f0bf54">PACK COMPLETE</span><b style="font-size:15px;letter-spacing:.08em">${escapeHtml(setName)}</b></header><div style="flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0"><div style="width:100%;max-width:560px;margin:0 auto">${rows}</div></div><button id="safe-pack-finish" type="button" class="start-match" style="width:100%;min-height:58px;font-size:18px">CONTINUE</button></section>`;
    $("#safe-pack-finish")?.addEventListener("click", finishSafePackFlow, { once: true });
    return;
  }

  const index = Math.max(0, Math.min(boosterFocusIndex, pulls.length - 1));
  const pull = pulls[index];
  const art = finishedCardArtFor(pull.card) || layeredCardArtFor(pull.card) || artworkFor(pull.card) || "";
  const artMarkup = art ? `<img src="${assetUrl(art)}" alt="${escapeHtml(pull.card?.name ?? 'Card')}" style="display:block;width:auto;height:auto;max-width:min(74vw,360px);max-height:58dvh;object-fit:contain" decoding="async">` : `<div style="width:min(74vw,360px);aspect-ratio:680/1000;border:2px solid #d8b34b;border-radius:12px;display:grid;place-items:center;background:#111722"><strong style="padding:20px;text-align:center;font-size:24px">${escapeHtml(pull.card?.name ?? 'Card')}</strong></div>`;
  const action = index === pulls.length - 1 ? "PACK SUMMARY" : "NEXT CARD";
  root.innerHTML = `<section style="position:fixed;inset:0;z-index:9000;background:radial-gradient(circle at 50% 34%,rgba(95,63,24,.28),transparent 46%),#05070b;color:#fff;padding:max(24px,env(safe-area-inset-top)) 20px max(22px,env(safe-area-inset-bottom));box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden"><header style="display:flex;justify-content:space-between;align-items:end;padding:8px 0 16px;border-bottom:1px solid rgba(255,255,255,.15)"><span style="font-size:13px;font-weight:900;letter-spacing:.22em;color:#f0bf54">PACK OPENING</span><b style="font-size:15px;letter-spacing:.08em">${escapeHtml(setName)}</b></header><div style="flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px"><small style="font-weight:900;letter-spacing:.18em;opacity:.72">CARD ${index + 1} OF ${pulls.length}</small>${artMarkup}<strong style="font-size:22px;text-align:center;line-height:1.05">${escapeHtml(pull.card?.name ?? 'Card')}</strong><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><span style="font-size:12px;font-weight:900;letter-spacing:.12em;color:#f0bf54">${escapeHtml(rarityName(pull))}</span>${pull.tier ? `<span style="font-size:12px;font-weight:900;letter-spacing:.12em">${escapeHtml(tierLabel(pull.tier).toUpperCase())}</span>` : ''}${pull.isNewCard ? '<span style="font-size:12px;font-weight:900;letter-spacing:.12em;color:#60e79a">NEW</span>' : ''}${pull.superstarUnlocked ? '<span style="font-size:12px;font-weight:900;letter-spacing:.12em;color:#68d9ff">SUPERSTAR</span>' : ''}</div></div><button id="safe-pack-next" type="button" class="start-match" style="width:100%;min-height:58px;font-size:18px">${action}</button></section>`;
  $("#safe-pack-next")?.addEventListener("click", () => {
    if (boosterFocusIndex < pulls.length - 1) { boosterFocusIndex += 1; renderSafePackFlow(); }
    else { packStage = "safe-summary"; renderSafePackFlow(); }
  }, { once: true });
}

function finishSafePackFlow() {
  const returnScreen = boosterReturnScreen;
  boosterReturnScreen = null;
  pendingUpgrades = findPackUpgrades(profile, lastPack ?? []);
  appliedPackUpgrades = [];
  if (profile.deckAssistance === "auto") {
    for (const upgrade of pendingUpgrades) if (applyUpgrade(profile, upgrade)) appliedPackUpgrades.push(upgrade);
  }
  saveProfile(profile);
  lastPack = null; revealedPackCards = new Set(); boosterRulesFlipped = new Set(); boosterInspectIndex = null; boosterInspectFlipped = false; convertedPackCards = new Set(); boosterFocusIndex = 0; pendingUpgrades = []; appliedPackUpgrades = []; packStage = "idle"; currentPackType = "standard"; message = "";
  document.body.classList.remove("booster-modal-open");
  const mobileNav = document.querySelector("#mobile-game-nav");
  if (mobileNav) mobileNav.hidden = false;
  if (returnScreen === "launch-daily-rewards") { continueLaunchDailyRewards(); return; }
  if (returnScreen === "seasons") { screen = "seasons"; renderSeasons(); return; }
  screen = "boosters"; renderBoosters();
}

function processPack(kind = "standard") {
  try {
    screen = "boosters";
    currentPackType = "standard";
    lastPack = openBooster(profile, Math.random, activeBoosterSetId);
    if (lastPack?.[0]?.card?.setId) activeBoosterSetId = lastPack[0].card.setId;
    pendingUpgrades = []; appliedPackUpgrades = []; revealedPackCards = new Set(lastPack.map((_, index) => index)); boosterRulesFlipped = new Set(); boosterInspectIndex = null; boosterInspectFlipped = false; convertedPackCards = new Set(); boosterFocusIndex = 0; packFinalized = false; packStage = "safe-reveal";
    const setName = setCollections[activeBoosterSetId]?.displayName ?? activeBoosterSetId;
    message = `${setName} pack open — Card 1 of ${lastPack.length}.`;
    saveProfile(profile);
    renderSafePackFlow();
  } catch (error) {
    message = error?.message ?? "Unable to open pack.";
    packStage = "idle";
    document.body.classList.remove("booster-modal-open");
    const mobileNav = document.querySelector("#mobile-game-nav");
    if (mobileNav) mobileNav.hidden = false;
    renderBoosters();
  }
}
'''
if old not in s:
    raise SystemExit('processPack block not found')
s = s.replace(old, new, 1)
app_path.write_text(s)

pkg_path = Path('package.json')
pkg = json.loads(pkg_path.read_text())
pkg['version'] = '1.1.129'
pkg_path.write_text(json.dumps(pkg, indent=2) + '\n')

build_path = Path('build.json')
b = json.loads(build_path.read_text())
b['version'] = '1.1.129'
b['releasedAt'] = '2026-09-02'
b['name'] = 'v1.1.129 — Safe Pack Flow Recovery'
b['physicalIphoneSmoke'] = 'pending-v1.1.129'
build_path.write_text(json.dumps(b, indent=2) + '\n')
print('Applied v1.1.129 safe pack flow recovery')
