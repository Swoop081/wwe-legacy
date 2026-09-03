// v1.1.153 — rejected move purge + onboarding deck integrity + merch scope/profile cleanup.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import { collectionCards, collectionCardsBySet, setCollections } from "../data/collection.js?v=1.1.132";
import { decks } from "../data/decks.js?v=1.1.132";
import { superstars } from "../data/superstars.js?v=1.1.132";
import "./v1.1.188-diving-shotgun-dropkick.js?v=1.1.188";

const PROFILE_KEY = "wa-modern-profile-v3";
const placeholderRule = /^Shared\s+[^.]+\s+move\b/i;
const explicitlyDeletedIds = new Set(["sd1-ringside-knee-lift"]);
const removed = [];
const seen = new Set();

function shouldDelete(card) {
  if (!card) return false;
  if (explicitlyDeletedIds.has(card.id)) return true;
  return placeholderRule.test(String(card.rulesText ?? ""));
}

function purge(list) {
  if (!Array.isArray(list)) return;
  for (let i = list.length - 1; i >= 0; i -= 1) {
    const card = list[i];
    if (!shouldDelete(card)) continue;
    if (card?.id && !seen.has(card.id)) {
      seen.add(card.id);
      removed.push({ id: card.id, name: card.name, setId: card.setId, rulesText: card.rulesText });
    }
    list.splice(i, 1);
  }
}

purge(allGameplayCards);
purge(collectionCards);
for (const list of Object.values(collectionCardsBySet ?? {})) purge(list);
for (const [setId, meta] of Object.entries(setCollections ?? {})) {
  const list = collectionCardsBySet?.[setId] ?? [];
  if (meta && typeof meta === "object") {
    meta.cardCount = list.length;
    meta.superstarCount = list.filter(card => card?.kind === "superstar").length;
  }
}

const deletedIds = new Set(removed.map(card => card.id));
function repairThreeStarterDecks(profile) {
  if (!profile || !Array.isArray(profile.starterIds) || profile.starterIds.length !== 3) return profile;
  profile.ownedCards ??= {};
  profile.savedDecks ??= {};
  profile.deckNeedsCards ??= {};
  profile.unlockedSuperstars ??= [];

  for (const sid of profile.starterIds) {
    const source = (decks[sid] ?? []).filter(card => card && !deletedIds.has(card.id));
    if (source.length !== 60) continue;
    const wanted = new Map();
    for (const card of source) wanted.set(card.id, (wanted.get(card.id) ?? 0) + 1);
    for (const [id, amount] of wanted) {
      profile.ownedCards[id] ??= { normal: 0, emerald: 0, sapphire: 0, ruby: 0, amethyst: 0 };
      profile.ownedCards[id].normal = Math.max(Number(profile.ownedCards[id].normal) || 0, amount);
    }
    profile.savedDecks[sid] = source.map(card => ({ id: card.id, tier: "normal" }));
    profile.deckNeedsCards[sid] = 0;
    if (!profile.unlockedSuperstars.includes(sid)) profile.unlockedSuperstars.push(sid);
  }
  return profile;
}

const originalSetItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value) {
  if (key === PROFILE_KEY) {
    try {
      const parsed = JSON.parse(String(value));
      value = JSON.stringify(repairThreeStarterDecks(parsed));
    } catch {}
  }
  return originalSetItem.call(this, key, value);
};

try {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (raw) {
    const profile = repairThreeStarterDecks(JSON.parse(raw));
    originalSetItem.call(localStorage, PROFILE_KEY, JSON.stringify(profile));
  }
} catch {}

const starByName = new Map(Object.values(superstars).map(star => [star.name, star.id]));
function currentProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null"); } catch { return null; }
}

function cleanRenderedMerchUI() {
  const root = document.querySelector("#game");
  if (!root) return;

  // My Legacy is career/settings only. Merch management belongs in Deck Lab.
  root.querySelectorAll(".profile-screen .merch-loadout-panel").forEach(panel => panel.remove());

  const deck = root.querySelector(".deck-builder-screen.deck-lab-screen:not(.deck-lab-picker-screen)");
  const merch = deck?.querySelector(".deck-merch-loadout");
  const heading = deck?.querySelector(".deck-lab-editor-head h2")?.textContent?.trim();
  if (!deck || !merch || !heading || merch.dataset.scopeFixed === "1") return;

  const sid = starByName.get(heading);
  const profile = currentProfile();
  const active = profile?.activeMerch;
  if (!active?.id || !active.superstarId || active.superstarId === sid) return;

  const ownerName = Object.values(superstars).find(star => star.id === active.superstarId)?.name ?? "another Superstar";
  merch.dataset.scopeFixed = "1";
  merch.classList.remove("has-active-merch");
  merch.classList.add("is-empty");
  merch.innerHTML = `<div class="section-title"><div><h3>Merch Slot</h3><small>Merch is equipped per Superstar and never copies across decks</small></div><span>NONE EQUIPPED</span></div><div class="deck-merch-empty"><div><span>NO MERCH FOR ${heading.toUpperCase()}</span><strong>${heading} has no active Merch</strong><p>The currently active Merch is assigned only to ${ownerName}. Its bonus does not apply to ${heading}.</p></div></div>`;
}

let merchUiQueued = false;
const observer = new MutationObserver(() => {
  if (merchUiQueued) return;
  merchUiQueued = true;
  queueMicrotask(() => {
    merchUiQueued = false;
    cleanRenderedMerchUI();
  });
});
observer.observe(document.documentElement, { childList: true, subtree: true });
queueMicrotask(cleanRenderedMerchUI);

globalThis.WWE_LEGACY_PLACEHOLDER_PURGE_153 = Object.freeze({
  removedCount: removed.length,
  removed: Object.freeze(removed.map(item => Object.freeze({ ...item }))),
  keptIds: Object.freeze(["nxt1-springboard-crossbody"]),
  onboardingThreeDeckRepair: true,
  merchDeckScopePresentation: true,
  legacyMerchPanelRemoved: true
});
