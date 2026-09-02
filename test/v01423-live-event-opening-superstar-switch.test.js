import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js?v=1.1.118';
import { isPlayerVisibleSuperstar } from '../js/data/release.js?v=1.1.118';
import { activeLiveEventTowers, startLiveEventTower, changeLiveEventTowerSuperstar, currentLiveEventTowerOpponent, recordLiveEventTowerMatch } from '../js/data/live-events.js?v=1.1.118';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');

function releasedIds(profile, now) {
  return Object.values(superstars).filter(star => isPlayerVisibleSuperstar(star, profile, now)).map(star => star.id);
}

function makeRun() {
  const now = new Date('2026-08-25T12:00:00');
  const profile = { unlockedSuperstars: Object.values(superstars).map(star => star.id) };
  const rosterIds = releasedIds(profile, now);
  const tower = activeLiveEventTowers(now, profile)[0];
  const run = startLiveEventTower(profile, tower.key, 'cm-punk', rosterIds, () => 0.37, now);
  return { now, profile, rosterIds, tower, run };
}

test('v0.14.23 lets the player change owned Superstar while Match 1 is still unbeaten and preserves the route', () => {
  const { now, profile, rosterIds, tower, run } = makeRun();
  const before = [...run.opponents];
  const nextId = rosterIds.find(id => id !== run.superstarId && !before.includes(id));
  assert.ok(nextId, 'found a released owned Superstar outside the current route');
  const changed = changeLiveEventTowerSuperstar(profile, tower.key, nextId, now);
  assert.equal(changed.superstarId, nextId);
  assert.equal(changed.stage, 0);
  assert.deepEqual(changed.opponents, before, 'changing Superstar does not reroll the tower route when no self-match exists');
  assert.equal(currentLiveEventTowerOpponent(profile, tower.key, now), before[0]);
});

test('v0.14.23 a Match 1 loss keeps the Superstar switch available, but the first win locks it', () => {
  const { now, profile, rosterIds, tower, run } = makeRun();
  const firstSwitch = rosterIds.find(id => id !== run.superstarId && !run.opponents.includes(id));
  changeLiveEventTowerSuperstar(profile, tower.key, firstSwitch, now);
  const loss = recordLiveEventTowerMatch(profile, tower.key, 'loss', now);
  assert.equal(loss.status, 'retry');
  assert.equal(run.stage, 0);
  const secondSwitch = rosterIds.find(id => id !== run.superstarId && !run.opponents.includes(id));
  assert.doesNotThrow(() => changeLiveEventTowerSuperstar(profile, tower.key, secondSwitch, now));
  const win = recordLiveEventTowerMatch(profile, tower.key, 'win', now);
  assert.equal(win.status, 'advance');
  assert.equal(run.stage, 1);
  const lockedChoice = rosterIds.find(id => id !== run.superstarId);
  assert.throws(() => changeLiveEventTowerSuperstar(profile, tower.key, lockedChoice, now), /locked after Match 1 is complete/i);
});

test('v0.14.23 switching to an owned Superstar who is on the route repairs only the invalid self-match', () => {
  const { now, profile, tower, run } = makeRun();
  const routeStar = run.opponents[0];
  assert.ok(profile.unlockedSuperstars.includes(routeStar));
  changeLiveEventTowerSuperstar(profile, tower.key, routeStar, now);
  assert.equal(run.superstarId, routeStar);
  assert.equal(run.stage, 0);
  assert.equal(run.opponents.length, 5);
  assert.equal(new Set(run.opponents).size, 5);
  assert.ok(!run.opponents.includes(routeStar), 'the player can never be scheduled against themself');
});

test('v0.14.23 refuses locked or unowned Superstar swaps at the data layer', () => {
  const { now, profile, tower } = makeRun();
  profile.unlockedSuperstars = ['cm-punk'];
  assert.throws(() => changeLiveEventTowerSuperstar(profile, tower.key, 'roman-reigns', now), /unlocked Superstar/i);
});

test('v0.14.23 Live Event detail exposes a compact Change Superstar action only at stage zero', () => {
  assert.match(app, /const canChangeOpeningSuperstar = active && Number\(run\?\.stage \?\? 0\) === 0 && !cleared;/);
  assert.match(app, /id="change-live-event-superstar" class="live-tower-inline-change">CHANGE SUPERSTAR/);
  assert.match(app, /You can switch to any Superstar you own until Match 1 is won/);
  assert.match(app, /Locks after Match 1 is won/);
  assert.doesNotMatch(app, /Locked for this tower once started/);
  assert.match(app, /changeLiveEventTowerSuperstar\(profile, towerKey, nextId, new Date\(\)\)/);
  assert.match(css, /\.live-event-superstar-swap-modal\{position:fixed!important/);
  assert.match(css, /\.live-tower-inline-change\{[\s\S]*min-height:0!important/);
});
