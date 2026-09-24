import { superstars } from "./superstars.js?v=1.1.296";
import { decks } from "./decks.js?v=1.1.296";
import { PREMIERE_STARTER_MALES, PREMIERE_STARTER_FEMALES } from "./profile.js?v=1.1.296";

const PREMIERE_EXHIBITION_ROSTER = new Set([...PREMIERE_STARTER_MALES, ...PREMIERE_STARTER_FEMALES, "la-knight"]);

export function exhibitionOpponentIds(playerSuperstarId) {
  return Object.values(superstars)
    .filter(star => !star.developmentOnly && PREMIERE_EXHIBITION_ROSTER.has(star.id) && star.id !== playerSuperstarId && (decks[star.id]?.length ?? 0) === 60)
    .map(star => star.id);
}

export function randomExhibitionOpponent(playerSuperstarId, rng = Math.random) {
  const pool = exhibitionOpponentIds(playerSuperstarId);
  if (!pool.length) return null;
  const roll = Math.max(0, Math.min(0.999999999, Number(rng()) || 0));
  return pool[Math.floor(roll * pool.length)];
}
