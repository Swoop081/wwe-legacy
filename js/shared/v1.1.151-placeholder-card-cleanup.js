// v1.1.151 — remove brand-labelled shared placeholder moves from every player-facing card pool.
// Intentional canonical shared cards (for example rules text beginning "Shared canonical" or "Shared.") are untouched.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import { collectionCards, collectionCardsBySet, setCollections } from "../data/collection.js?v=1.1.132";

const placeholderRule = /^Shared\s+[^.]+\s+move\b/i;
const removed = [];
const seen = new Set();

function purge(list) {
  if (!Array.isArray(list)) return;
  for (let i = list.length - 1; i >= 0; i -= 1) {
    const card = list[i];
    if (!placeholderRule.test(String(card?.rulesText ?? ""))) continue;
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

globalThis.WWE_LEGACY_PLACEHOLDER_PURGE_151 = Object.freeze({
  removedCount: removed.length,
  removed: Object.freeze(removed.map(item => Object.freeze({ ...item })))
});
