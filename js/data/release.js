import { sets } from "./sets.js?v=1.1.107";

// v1.1.0 — player-facing set slate: five current-brand/event sets plus four Legends sets.
export const LAUNCH_LIVE_SET_IDS = Object.freeze([
  "raw-series-1",
  "smackdown-series-1",
  "nxt-series-1",
  "evolution-series-1",
  "summerslam-series-1",
  "golden-era-series-1",
  "new-generation-series-1",
  "attitude-era-series-1",
  "ruthless-aggression-series-1"
]);

export const LIVE_SEASON_REWARD_SET_IDS = Object.freeze(["season-1-last-time-is-now"]);

export const BANKED_PLAYER_SET_IDS = Object.freeze([
  "worlds-collide-series-1",
  "money-in-the-bank-series-1",
  "survivor-series-series-1"
]);

export const PLAYER_COLLECTIBLE_SET_IDS = Object.freeze([
  ...LAUNCH_LIVE_SET_IDS,
  ...BANKED_PLAYER_SET_IDS
]);

export const SCHEDULED_SET_RELEASES = Object.freeze({
  "worlds-collide-series-1": "2026-09-26T00:00:00-05:00",
  "money-in-the-bank-series-1": "2026-10-10T00:00:00-05:00",
  "survivor-series-series-1": "2026-11-28T00:00:00-06:00",
  "rewards-october-2026": "2026-10-01T00:00:00Z"
});
export function setReleaseAt(setId) { return SCHEDULED_SET_RELEASES[setId] ?? null; }
export function isLaunchLiveSetId(setId) { return LAUNCH_LIVE_SET_IDS.includes(setId); }
export function isScheduledSetReleased(setId, now = new Date()) {
  const releaseAt=setReleaseAt(setId);
  return !!releaseAt && new Date(now).getTime()>=new Date(releaseAt).getTime();
}
export function isPlayerReleasedSetId(setId, now = new Date()) {
  return LAUNCH_LIVE_SET_IDS.includes(setId) || LIVE_SEASON_REWARD_SET_IDS.includes(setId) || isScheduledSetReleased(setId,now);
}
export function playerReleasedCollectibleSetIds(now = new Date()) {
  return PLAYER_COLLECTIBLE_SET_IDS.filter(setId=>isPlayerReleasedSetId(setId,now));
}
export const SCHEDULED_REWARD_SET_IDS = Object.freeze(["rewards-october-2026"]);
export function playerReleaseCalendar() {
  return [...PLAYER_COLLECTIBLE_SET_IDS,...SCHEDULED_REWARD_SET_IDS].map(setId => ({ setId, releaseDate: setReleaseAt(setId), launch: LAUNCH_LIVE_SET_IDS.includes(setId) }));
}

export const PRE_RELEASE_TEST_SET_IDS = Object.freeze([
  "worlds-collide-series-1",
  "money-in-the-bank-series-1",
  "survivor-series-series-1"
]);
export function isInternalTestSetId(setId, now = new Date()) {
  return isPlayerReleasedSetId(setId, now) || PRE_RELEASE_TEST_SET_IDS.includes(setId);
}
export function isUnreleasedSetId(setId, now = new Date()) {
  const set = sets[setId];
  return !!set && !isPlayerReleasedSetId(setId, now);
}
export function isLaunchRosterSuperstar(star) {
  return !!star && !star.developmentOnly && isLaunchLiveSetId(star.setId);
}
export function isPlayerVisibleSuperstar(star, profile = null, now = new Date()) {
  if (!star || isUnreleasedSetId(star.setId, now)) return false;
  if (star.developmentOnly && !isScheduledSetReleased(star.setId,now)) return false;
  if (PLAYER_COLLECTIBLE_SET_IDS.includes(star.setId)) return true;
  return !!profile?.unlockedSuperstars?.includes(star.id);
}
