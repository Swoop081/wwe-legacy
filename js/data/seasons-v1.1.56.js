// WWE Legacy v1.1.56 — canonical Season 1 deadline wrapper.
// app.js still imports the historical v1.1.48 module specifier. index.html maps
// that specifier here so the corrected local deadline is supplied at module
// level instead of being rewritten by a DOM timer/observer after render.
export * from "./seasons.js?v=1.1.98-base";
import { SEASON_1 as BASE_SEASON_1 } from "./seasons.js?v=1.1.98-base";

export const SEASON_END = "2026-10-01T00:00:00";
export const SEASON_1 = Object.freeze({ ...BASE_SEASON_1, end: SEASON_END });

export function seasonTimeRemaining(now = new Date()) {
  const end = new Date(SEASON_END);
  const ms = Math.max(0, end.getTime() - now.getTime());
  return { ms, days: Math.ceil(ms / 86400000), ended: ms <= 0, end };
}
