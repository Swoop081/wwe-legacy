import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createProfile } from '../js/data/profile.js?v=1.1.44';
import { superstars } from '../js/data/superstars.js?v=1.1.44';
import { isPlayerVisibleSuperstar, isUnreleasedSetId, isLaunchLiveSetId } from '../js/data/release.js?v=1.1.44';
import { boosterCreditsFor } from '../js/data/boosters.js?v=1.1.44';
import {
  CHAMPIONSHIP_ROAD_LENGTH,
  CHAMPIONSHIP_ROAD_OPPONENTS,
  CHAMPIONSHIP_ROAD_SECTIONS,
  CHAMPIONSHIP_DIFFICULTY_ORDER,
  championshipRoadOpponentsForSuperstar,
  championshipRoadForSuperstar,
  championshipDifficultyUnlocked,
  selectChampionshipRoadSuperstar,
  startChampionshipRoad,
  recordChampionshipMatch
} from '../js/data/championship-road.js?v=1.1.44';
import {
  LIVE_EVENT_LENGTH,
  DAILY_LIVE_EVENT_SET_XP,
  BIRTHDAY_TOWERS, RELEASED_BIRTHDAY_ROSTER_IDS,
  activeLiveEventTowers,
  liveEventTowerState,
  startLiveEventTower,
  changeLiveEventTowerSuperstar,
  recordLiveEventTowerMatch,
  dailyLiveEventSetStatus
} from '../js/data/live-events.js?v=1.1.44';
import { seasonState } from '../js/data/seasons.js?v=1.1.44';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const now = new Date('2026-08-25T12:00:00');
const allUnlocked = Object.values(superstars).filter(star => !star.developmentOnly).map(star => star.id);
const releasedVisibleIds = profile => Object.values(superstars)
  .filter(star => isPlayerVisibleSuperstar(star, profile, now))
  .map(star => star.id);
const fixedRng = () => 0.371;

function richProfile(starter = 'cm-punk') {
  const profile = createProfile(starter);
  profile.unlockedSuperstars = [...new Set(allUnlocked)];
  return profile;
}

function totalCredits(profile) {
  const ids = ['summerslam-series-1','evolution-series-1','new-generation-series-1','golden-era-series-1','attitude-era-series-1'];
  return ids.reduce((sum, setId) => sum + boosterCreditsFor(profile, setId), 0);
}

test('v0.17.01 Championship Road preserves the canonical mirror match', () => {
  const profile = richProfile();
  const ids = releasedVisibleIds(profile);
  assert.equal(ids.length, 41);
  for (const superstarId of ids) {
    const opponents = championshipRoadOpponentsForSuperstar(superstarId);
    assert.equal(opponents.length, CHAMPIONSHIP_ROAD_LENGTH, superstarId);
    assert.equal(new Set(opponents).size, CHAMPIONSHIP_ROAD_LENGTH, `${superstarId} route is unique`);
    assert.deepEqual(opponents, CHAMPIONSHIP_ROAD_OPPONENTS, `${superstarId} uses the canonical route`);
    const mirrorCount = opponents.filter(id => id === superstarId).length;
    assert.equal(mirrorCount, CHAMPIONSHIP_ROAD_OPPONENTS.includes(superstarId) ? 1 : 0, `${superstarId} mirror count`);
    const run = startChampionshipRoad(profile, superstarId, [], fixedRng, 'easy');
    assert.deepEqual(run.opponents, opponents, `${superstarId} starts the canonical route`);
  }
});

test('v0.17.01 Championship Road loss/reward/clear/difficulty flow is deterministic and per-Superstar', () => {
  const profile = richProfile();
  const roman = startChampionshipRoad(profile, 'roman-reigns', [], fixedRng, 'easy');
  const firstOpponent = roman.opponents[0];
  const beforeCredits = totalCredits(profile);
  const loss = recordChampionshipMatch(profile, 'loss', 'roman-reigns');
  assert.equal(loss.status, 'retry');
  assert.equal(roman.stage, 0);
  assert.equal(roman.opponents[0], firstOpponent);
  assert.equal(totalCredits(profile), beforeCredits);

  const sectionRewards = [];
  for (let match = 1; match <= CHAMPIONSHIP_ROAD_LENGTH; match += 1) {
    const outcome = recordChampionshipMatch(profile, 'win', 'roman-reigns');
    if (outcome.packAwarded) sectionRewards.push(outcome.packSetId);
  }
  assert.equal(roman.status, 'cleared');
  assert.deepEqual(sectionRewards, CHAMPIONSHIP_ROAD_SECTIONS.map(section => section.setId));
  assert.equal(sectionRewards.length, 10);
  assert.equal(totalCredits(profile), beforeCredits + 10);
  assert.equal(championshipDifficultyUnlocked(profile, 'normal', 'roman-reigns'), true);
  assert.equal(championshipDifficultyUnlocked(profile, 'normal', 'cm-punk'), false, 'difficulty unlock stays per Superstar');
});

test('v0.17.01 Championship result routing can target the originating Road even if selected Road changes', () => {
  const profile = richProfile();
  startChampionshipRoad(profile, 'roman-reigns', [], fixedRng, 'easy');
  selectChampionshipRoadSuperstar(profile, 'cm-punk');
  startChampionshipRoad(profile, 'cm-punk', [], fixedRng, 'easy');
  assert.equal(championshipRoadForSuperstar(profile, 'roman-reigns').activeRun.stage, 0);
  assert.equal(championshipRoadForSuperstar(profile, 'cm-punk').activeRun.stage, 0);
  recordChampionshipMatch(profile, 'win', 'roman-reigns');
  assert.equal(championshipRoadForSuperstar(profile, 'roman-reigns').activeRun.stage, 1);
  assert.equal(championshipRoadForSuperstar(profile, 'cm-punk').activeRun.stage, 0);
});

test('v0.17.01 Championship Road data layer rejects unowned or unreleased player selections', () => {
  const profile = createProfile('cm-punk');
  assert.throws(() => startChampionshipRoad(profile, 'roman-reigns', [], fixedRng, 'easy'), /unlocked Superstar/i);
  assert.throws(() => selectChampionshipRoadSuperstar(profile, 'roman-reigns'), /unlocked Superstar/i);
  const future = Object.values(superstars).find(star => isUnreleasedSetId(star.setId, now));
  if (future) {
    profile.unlockedSuperstars.push(future.id);
    assert.throws(() => startChampionshipRoad(profile, future.id, [], fixedRng, 'easy'), /unlocked Superstar/i);
  }
});

test('v0.17.01 Championship restores mirror matches for saves migrated by v0.17.00', () => {
  const profile = richProfile('roman-reigns');
  const noSelfRoute = CHAMPIONSHIP_ROAD_OPPONENTS.map(id => id === 'roman-reigns' ? 'john-cena' : id);
  profile.championshipRoad.roadsBySuperstar = {
    'roman-reigns': {
      activeRun: { superstarId:'roman-reigns', difficultyId:'easy', opponents:noSelfRoute, stage:14, status:'active' },
      clears:0, bestStage:14, clearsByDifficulty:{}, bestStageByDifficulty:{easy:14}, completedByDifficulty:{}, unlockedDifficulties:['easy'], selectedDifficulty:'easy'
    }
  };
  profile.championshipRoad.selectedSuperstarId = 'roman-reigns';
  profile.championshipRoad.perSuperstarRoadsMigrated = true;
  const road = championshipRoadForSuperstar(profile, 'roman-reigns');
  assert.equal(road.activeRun.stage, 14);
  assert.equal(road.activeRun.opponents.includes('roman-reigns'), true);
  assert.equal(road.activeRun.opponents[14], 'roman-reigns');
  assert.equal(road.activeRun.opponents.includes('john-cena'), false);
});


test('v0.17.01 Birthday Bash coverage matches the complete 40-Superstar released launch roster', () => {
  const profile = richProfile();
  const launchIds = Object.values(superstars).filter(star => !star.developmentOnly && isLaunchLiveSetId(star.setId)).map(star => star.id).sort();
  assert.deepEqual([...RELEASED_BIRTHDAY_ROSTER_IDS].sort(), launchIds);
  const liveBirthdayIds = BIRTHDAY_TOWERS.filter(event => launchIds.includes(event.bossId)).map(event => event.bossId).sort();
  assert.deepEqual(liveBirthdayIds, launchIds);
  for (const event of BIRTHDAY_TOWERS.filter(item => launchIds.includes(item.bossId))) {
    const date = new Date(2027, event.month - 1, event.day, 12, 0, 0);
    const tower = activeLiveEventTowers(date, profile).find(item => item.event.id === event.id);
    assert.ok(tower, `${event.id} is visible on its birthday`);
    const playerId = event.bossId === 'cm-punk' ? 'roman-reigns' : 'cm-punk';
    const run = startLiveEventTower(profile, tower.key, playerId, releasedVisibleIds(profile), fixedRng, date);
    assert.equal(run.opponents.at(-1), event.bossId, `${event.id} keeps the birthday Superstar as Challenger 5`);
  }
});

test('v0.17.01 Live Event calendar exposes exactly three distinct valid 24-hour towers for every day in a year', () => {
  const profile = richProfile();
  const start = new Date('2026-08-25T12:00:00');
  for (let offset = 0; offset < 365; offset += 1) {
    const date = new Date(start.getTime());
    date.setDate(date.getDate() + offset);
    const towers = activeLiveEventTowers(date, profile);
    assert.equal(towers.length, 3, date.toDateString());
    assert.equal(new Set(towers.map(tower => tower.key)).size, 3, `${date.toDateString()} unique keys`);
    assert.equal(new Set(towers.map(tower => tower.event.id)).size, 3, `${date.toDateString()} unique events`);
    for (const tower of towers) {
      assert.equal(tower.length, LIVE_EVENT_LENGTH);
      assert.ok(tower.msRemaining > 0 && tower.msRemaining <= 24 * 60 * 60 * 1000);
      assert.equal(isUnreleasedSetId(tower.event.rewardSetId, date), false, `${tower.event.id} cannot expose unreleased reward set`);
    }
  }
});

test('v0.17.01 Live Event start rejects unowned players and filters unreleased opponents before the run exists', () => {
  const profile = createProfile('cm-punk');
  const tower = activeLiveEventTowers(now, profile)[0];
  assert.throws(() => startLiveEventTower(profile, tower.key, 'roman-reigns', allUnlocked, fixedRng, now), /unlocked Superstar/i);
  const run = startLiveEventTower(profile, tower.key, 'cm-punk', allUnlocked, fixedRng, now);
  assert.equal(run.opponents.length, LIVE_EVENT_LENGTH);
  assert.equal(new Set(run.opponents).size, LIVE_EVENT_LENGTH);
  assert.equal(run.opponents.includes('cm-punk'), false);
  for (const id of run.opponents) {
    const star = Object.values(superstars).find(item => item.id === id);
    assert.ok(star && isPlayerVisibleSuperstar(star, profile, now), `${id} is player-visible/released`);
  }
});

test('v0.17.01 Live Event opening swap, loss retry, lock, clear reward and daily set XP are all idempotent', () => {
  const profile = richProfile();
  const eligible = releasedVisibleIds(profile);
  const towers = activeLiveEventTowers(now, profile);
  const beforeCredits = totalCredits(profile);
  let dailyBonusCount = 0;

  for (let towerIndex = 0; towerIndex < towers.length; towerIndex += 1) {
    const tower = towers[towerIndex];
    const run = startLiveEventTower(profile, tower.key, 'cm-punk', eligible, fixedRng, now);
    if (towerIndex === 0) {
      const alternate = eligible.find(id => id !== run.superstarId && !run.opponents.includes(id));
      changeLiveEventTowerSuperstar(profile, tower.key, alternate, now);
      const loss = recordLiveEventTowerMatch(profile, tower.key, 'loss', now, fixedRng);
      assert.equal(loss.status, 'retry');
      assert.equal(run.stage, 0);
    }
    const firstWin = recordLiveEventTowerMatch(profile, tower.key, 'win', now, fixedRng);
    assert.equal(firstWin.status, 'advance');
    assert.equal(run.stage, 1);
    assert.throws(() => changeLiveEventTowerSuperstar(profile, tower.key, 'roman-reigns', now), /locked after Match 1/i);
    let outcome = firstWin;
    for (let i = 1; i < LIVE_EVENT_LENGTH; i += 1) outcome = recordLiveEventTowerMatch(profile, tower.key, 'win', now, fixedRng);
    assert.equal(outcome.status, 'cleared');
    assert.equal(outcome.packCount, 1);
    if (outcome.dailySetXpAwarded) dailyBonusCount += 1;
    assert.throws(() => recordLiveEventTowerMatch(profile, tower.key, 'win', now, fixedRng), /No active Live Event run/i);
  }

  assert.equal(totalCredits(profile), beforeCredits + 3);
  assert.equal(dailyBonusCount, 1);
  assert.equal(dailyLiveEventSetStatus(profile, now).claimed, true);
  assert.equal(seasonState(profile).liveEventBonusXpEarned, DAILY_LIVE_EVENT_SET_XP);
});

test('v0.17.01 expired Live Event keys cannot consume results or leak progress into the next day', () => {
  const profile = richProfile();
  const late = new Date('2026-08-25T23:59:00');
  const eligible = releasedVisibleIds(profile);
  const oldTower = activeLiveEventTowers(late, profile)[0];
  const run = startLiveEventTower(profile, oldTower.key, 'cm-punk', eligible, fixedRng, late);
  recordLiveEventTowerMatch(profile, oldTower.key, 'win', late, fixedRng);
  assert.equal(run.stage, 1);
  const nextDay = new Date('2026-08-26T00:01:00');
  assert.equal(liveEventTowerState(profile, oldTower.key, nextDay), null);
  assert.throws(() => recordLiveEventTowerMatch(profile, oldTower.key, 'win', nextDay, fixedRng), /expired/i);
  const newTower = activeLiveEventTowers(nextDay, profile)[0];
  assert.notEqual(newTower.key, oldTower.key);
  const newRun = startLiveEventTower(profile, newTower.key, 'cm-punk', eligible, fixedRng, nextDay);
  assert.equal(newRun.stage, 0);
});

test('v0.17.01 UI snapshots Championship origin and routes structured restarts without falling into Exhibition', () => {
  assert.match(app, /championshipSuperstarId: mode === "championship" \? p1Id : null/);
  assert.match(app, /function currentChampionshipMatchSuperstarId\(\)/);
  assert.match(app, /recordChampionshipMatch\(profile, result, championshipSuperstarId\)/);
  assert.match(app, /if \(matchMode === "championship"\)[\s\S]*startCurrentChampionshipMatch\(\)/);
  assert.match(app, /const roadOpponentIds = run\?\.opponents \?\? championshipRoadOpponentsForSuperstar\(chosenId\)/);
  assert.match(app, /const mode = currentMatchMode\(\)/);
});
