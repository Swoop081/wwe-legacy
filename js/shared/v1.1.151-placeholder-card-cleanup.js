// v1.1.152 — permanently exclude the rejected placeholder move set from every active/player-facing card pool.
// Keep Springboard Crossbody. Intentional canonical shared cards (for example rules text beginning "Shared canonical" or "Shared.") are untouched.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import { collectionCards, collectionCardsBySet, setCollections } from "../data/collection.js?v=1.1.132";

const placeholderRule = /^Shared\s+[^.]+\s+move\b/i;
const explicitlyDeletedIds = new Set([
  "sd1-ringside-knee-lift"
]);
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

globalThis.WWE_LEGACY_PLACEHOLDER_PURGE_152 = Object.freeze({
  removedCount: removed.length,
  removed: Object.freeze(removed.map(item => Object.freeze({ ...item }))),
  keptIds: Object.freeze(["nxt1-springboard-crossbody"])
});
