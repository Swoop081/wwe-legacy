import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createProfile, ownedCount } from '../js/data/profile.js?v=1.1.108';
import { activeLiveEventTowers, startLiveEventTower, recordLiveEventTowerMatch, LIVE_EVENT_LENGTH } from '../js/data/live-events.js?v=1.1.108';
import { awardMatchSeasonXp, claimAllSeasonTiers, seasonTier, tierReward, SEASON_TIER_COUNT, MAX_SEASON_XP } from '../js/data/seasons.js?v=1.1.108';
import { challengeState, recordChallengeMetric, claimChallenge } from '../js/data/challenges.js?v=1.1.108';
import { LAUNCH_LIVE_SET_IDS } from '../js/data/release.js?v=1.1.108';
import { superstars } from '../js/data/superstars.js?v=1.1.108';

const eligible = Object.values(superstars).filter(star => !star.developmentOnly && LAUNCH_LIVE_SET_IDS.includes(star.setId)).map(star => star.id);
const DAY = 86400000;
const START = new Date('2026-08-22T12:00:00');

function completeChallenges(profile, now) {
  for (const [metric, amount] of [['matches',30],['wins',20],['finishers',5],['counters',12],['packs',5],['ladderRungs',4],['championshipWins',3]]) recordChallengeMetric(profile, metric, amount, now);
  const state = challengeState(profile, now);
  for (const c of [...state.daily, ...state.weekly]) if (!c.claimed && (c.progress ?? 0) >= c.target) claimChallenge(profile, c.id, now, () => .25);
}

test('v0.16.00 Season booster tiers cycle evenly through all five live launch sets', () => {
  const rewards = Array.from({length: SEASON_TIER_COUNT}, (_, i) => tierReward(i + 1, START)).filter(reward => reward.kind === 'booster');
  assert.equal(rewards.length, 16);
  const counts = Object.fromEntries(LAUNCH_LIVE_SET_IDS.map(setId => [setId, rewards.filter(reward => reward.setId === setId).length]));
  assert.deepEqual(counts, {
    'summerslam-series-1': 4,
    'evolution-series-1': 3,
    'new-generation-series-1': 3,
    'golden-era-series-1': 3,
    'attitude-era-series-1': 3
  });
  assert.ok(rewards.every(reward => LAUNCH_LIVE_SET_IDS.includes(reward.setId)));
});

test('v0.16.00 30-match target cadence with all Daily Live Events reaches Cena inside the 30-day Season', () => {
  const profile = createProfile('roman-reigns');
  let tier50Day = null;
  for (let day = 1; day <= 30; day += 1) {
    const now = new Date(START.getTime() + (day - 1) * DAY);
    for (const tower of activeLiveEventTowers(now, profile)) {
      startLiveEventTower(profile, tower.key, 'roman-reigns', eligible, () => .31, now);
      for (let i = 0; i < LIVE_EVENT_LENGTH; i += 1) {
        awardMatchSeasonXp(profile, 'win');
        recordLiveEventTowerMatch(profile, tower.key, 'win', now, () => .41);
      }
    }
    // Remaining 15 matches alternate 8/7 wins: effectively a 50% non-Live-Event win rate.
    for (let i = 0; i < 15; i += 1) awardMatchSeasonXp(profile, ((i + day) % 2 === 0) ? 'win' : 'loss');
    completeChallenges(profile, now);
    claimAllSeasonTiers(profile, now);
    if (!tier50Day && seasonTier(profile) >= 50) tier50Day = day;
  }
  assert.equal(seasonTier(profile), 50);
  assert.equal(profile.seasons['season-1'].xp, MAX_SEASON_XP);
  assert.ok(tier50Day && tier50Day <= 29, `Tier 50 day ${tier50Day}`);
  assert.ok(profile.unlockedSuperstars.includes('john-cena'));
  for (const id of ['john-cena-protobomb','john-cena-five-knuckle-shuffle','john-cena-stf','john-cena-attitude-adjustment']) assert.equal(ownedCount(profile, id, 'ruby'), 5, id);
  assert.equal(ownedCount(profile, 'entrance-john-cena', 'ruby'), 1);
  assert.equal(ownedCount(profile, 'superstar-john-cena', 'ruby'), 1);
});

test('v0.16.00 first-month certification tool covers rewards, pity, printing tiers and collection milestones', () => {
  const source = fs.readFileSync(new URL('../tools/first-month-economy-certification.mjs', import.meta.url), 'utf8');
  assert.match(source, /claimFreeSeasonBooster/);
  assert.match(source, /clearDailyLiveEvents/);
  assert.match(source, /claimMilestoneCascade/);
  assert.match(source, /finalizePackUniversePoints/);
  assert.match(source, /maxPity/);
  assert.match(source, /tierPulls/);
  assert.match(source, /structured30MatchCeiling/);
  assert.match(source, /certifyCena/);
});
