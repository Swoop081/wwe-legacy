import { collectionCards } from "./collection.js?v=1.1.40";
import { superstars } from "./superstars.js?v=1.1.40";
import { decks } from "./decks.js?v=1.1.40";
import { isPlayerVisibleSuperstar } from "./release.js?v=1.1.40";

export const SUPERSTAR_PACK_SIZE = 5;
export const SUPERSTAR_PACK_TYPE = "superstar-pack";

const specificTo = (card, sid) => card?.superstarId === sid || (Array.isArray(card?.allowedSuperstarIds) && card.allowedSuperstarIds.includes(sid));
const byId = new Map(collectionCards.map(card => [card.id, card]));

export function superstarPackContentsFor(superstarId) {
  const star = superstars[superstarId] ?? Object.values(superstars).find(item => item?.id === superstarId);
  if (!star || star.developmentOnly || !isPlayerVisibleSuperstar(star) || (decks[superstarId] ?? []).length !== 60) return null;
  const authored = collectionCards.filter(card => specificTo(card, superstarId));
  const superstar = byId.get(`superstar-${superstarId}`) ?? authored.find(card => card.kind === "superstar");
  const entrance = authored.find(card => card.kind === "entrance");
  const finisher = authored.find(card => card.kind === "move" && card.finisher === true);
  const trademark = authored.find(card => card.kind === "move" && card.trademark === true);
  const action = authored.find(card => card.kind === "action");
  if (![superstar, entrance, finisher, trademark, action].every(Boolean)) return null;
  return Object.freeze({
    type: SUPERSTAR_PACK_TYPE,
    superstarId,
    setId: star.setId,
    cardIds: Object.freeze([superstar.id, entrance.id, finisher.id, trademark.id, action.id]),
    slots: Object.freeze({ superstar: superstar.id, entrance: entrance.id, finisher: finisher.id, trademark: trademark.id, action: action.id })
  });
}

export function superstarPackCandidates({ excludeSuperstarIds = [] } = {}) {
  const excluded = new Set(excludeSuperstarIds);
  return Object.values(superstars)
    .filter(star => star && !excluded.has(star.id))
    .map(star => superstarPackContentsFor(star.id))
    .filter(Boolean);
}

export function drawRandomSuperstarPack(rng = Math.random, options = {}) {
  const candidates = superstarPackCandidates(options);
  if (!candidates.length) throw new Error("No eligible Superstar Packs are available.");
  const value = Math.max(0, Math.min(0.999999999, Number(rng()) || 0));
  return candidates[Math.floor(value * candidates.length)];
}
