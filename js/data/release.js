import { sets } from "./sets.js?v=1.1.132";

// v1.1.200 — launch-facing slate. NXT Series 1 remains authored but is banked for later release.
export const LAUNCH_LIVE_SET_IDS = Object.freeze(["premiere","money-in-the-bank"]);

// Season 1 Last Time Is Now was scrapped; keep no player-facing reward-set release here.
export const LIVE_SEASON_REWARD_SET_IDS = Object.freeze([]);

export const BANKED_PLAYER_SET_IDS = Object.freeze([]);

export const PLAYER_COLLECTIBLE_SET_IDS = Object.freeze([
  ...LAUNCH_LIVE_SET_IDS,
  ...BANKED_PLAYER_SET_IDS
]);

export const SCHEDULED_SET_RELEASES = Object.freeze({});
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
export const SCHEDULED_REWARD_SET_IDS = Object.freeze([]);
export function playerReleaseCalendar() {
  return [...PLAYER_COLLECTIBLE_SET_IDS,...SCHEDULED_REWARD_SET_IDS].map(setId => ({ setId, releaseDate: setReleaseAt(setId), launch: LAUNCH_LIVE_SET_IDS.includes(setId) }));
}

export const PRE_RELEASE_TEST_SET_IDS = Object.freeze([]);
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
