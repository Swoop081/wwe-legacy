import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createProfile } from '../js/data/profile.js?v=1.1.103';
import { superstars } from '../js/data/superstars.js?v=1.1.103';
import { seasonState, awardMatchSeasonXp } from '../js/data/seasons.js?v=1.1.103';
import {
  activeLiveEventTowers,
  startLiveEventTower,
  recordLiveEventTowerMatch,
  dailyLiveEventSetStatus,
  DAILY_LIVE_EVENT_SET_XP,
  LIVE_EVENT_LENGTH
} from '../js/data/live-events.js?v=1.1.103';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');
const eligible = Object.values(superstars).map(star => star.id);

function clearTower(profile, tower, now) {
  startLiveEventTower(profile, tower.key, 'roman-reigns', eligible, () => 0.37, now);
  let outcome = null;
  for (let i = 0; i < LIVE_EVENT_LENGTH; i += 1) outcome = recordLiveEventTowerMatch(profile, tower.key, 'win', now, () => 0.41);
  return outcome;
}

test('v0.14.11 awards +25 Season XP exactly once after all three Daily Live Events clear', () => {
  const now = new Date('2026-08-23T11:00:00');
  const profile = createProfile('roman-reigns');
  const towers = activeLiveEventTowers(now, profile);
  assert.equal(towers.length, 3);
  assert.equal(DAILY_LIVE_EVENT_SET_XP, 25);
  clearTower(profile, towers[0], now);
  clearTower(profile, towers[1], now);
  assert.equal(seasonState(profile).xp, 0);
  const third = clearTower(profile, towers[2], now);
  assert.equal(third.dailySetXpAwarded, 25);
  assert.equal(seasonState(profile).xp, 25);
  assert.equal(dailyLiveEventSetStatus(profile, now).claimed, true);
  const duplicate = dailyLiveEventSetStatus(profile, now);
  assert.equal(duplicate.completed, 3);
  assert.equal(seasonState(profile).liveEventBonusXpEarned, 25);
});


test('v0.14.11 full three-tower daily routine is exactly 100 Season XP from 15 wins plus the completion bonus', () => {
  const now = new Date('2026-08-23T11:00:00');
  const profile = createProfile('roman-reigns');
  const towers = activeLiveEventTowers(now, profile);
  for (const tower of towers) {
    startLiveEventTower(profile, tower.key, 'roman-reigns', eligible, () => 0.31, now);
    for (let i = 0; i < LIVE_EVENT_LENGTH; i += 1) {
      awardMatchSeasonXp(profile, 'win');
      recordLiveEventTowerMatch(profile, tower.key, 'win', now, () => 0.43);
    }
  }
  assert.equal(seasonState(profile).matchXpEarned, 75);
  assert.equal(seasonState(profile).liveEventBonusXpEarned, 25);
  assert.equal(seasonState(profile).xp, 100);
});

test('v0.14.11 Season splash removes redundant tier boxes and explicitly disables Cena right-edge mask', () => {
  assert.doesNotMatch(app, /season-splash-facts" aria-label="Season 1 details/);
  assert.ok(css.includes('mask-image:none!important'));
  assert.ok(css.includes('-webkit-mask-image:none!important'));
  assert.ok(css.includes('filter:none!important'));
});

test('v0.14.11 Live Event route centers the current stage on entry and final card when complete', () => {
  const detail = app.slice(app.indexOf('function renderLiveEventTowerDetail'), app.indexOf('function renderLiveEvents()'));
  assert.ok(detail.includes("root.querySelector('.live-tower-route-strip')"));
  assert.ok(detail.includes('run?.stage ?? 0'));
  assert.ok(detail.includes('opponentIds.length - 1'));
  assert.ok(detail.includes('rail.scrollLeft = left'));
});

test('v0.14.11 Live Events hub surfaces 3-event +25 XP daily completion progress', () => {
  assert.ok(app.includes('DAILY LIVE EVENT SET'));
  assert.ok(app.includes('CLEAR ALL 3 DAILY LIVE EVENTS'));
  assert.ok(app.includes('dailyLiveEventSetStatus(profile, now)'));
  assert.ok(css.includes('.daily-live-set-progress'));
});
