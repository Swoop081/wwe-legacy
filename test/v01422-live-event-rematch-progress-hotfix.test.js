import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');

const between = (text, start, end) => {
  const a = text.indexOf(start);
  const b = text.indexOf(end, a + start.length);
  return a >= 0 && b > a ? text.slice(a, b) : '';
};

test('v0.14.22 snapshots the launch mode and Live Event tower for the lifetime of a match', () => {
  const startMatch = between(app, 'function startMatch(', 'function createPendingMatchEngine');
  assert.match(startMatch, /activeMatchContext = Object\.freeze\(\{/);
  assert.match(startMatch, /mode,/);
  assert.match(startMatch, /liveEventTowerKey: mode === "live-event" \? \(eventMeta\?\.towerKey \?\? activeLiveEventTowerKey \?\? null\) : null/);
  assert.match(app, /function currentMatchMode\(\) \{ return activeMatchContext\?\.mode \?\? activeMode \?\? "exhibition"; \}/);
  assert.match(app, /function currentLiveEventMatchTowerKey\(\) \{ return activeMatchContext\?\.liveEventTowerKey \?\? activeLiveEventTowerKey \?\? null; \}/);
});

test('v0.14.22 completed-match rewards and progression use the immutable match snapshot, not mutable hub mode state', () => {
  const completed = between(app, 'function handleCompletedMatch()', 'function queueTierUps');
  assert.match(completed, /const matchMode = currentMatchMode\(\);/);
  assert.match(completed, /const liveEventTowerKey = currentLiveEventMatchTowerKey\(\);/);
  assert.match(completed, /recordCompletedMatchChallenges\(profile, state, HUMAN, matchMode\)/);
  assert.match(completed, /recordCareerMatch\(profile, \{ result, superstarId: state\.players\[HUMAN\]\.superstar\.id, mode: matchMode/);
  assert.match(completed, /if \(matchMode === "live-event"\)/);
  assert.match(completed, /const towerKey = liveEventTowerKey;/);
  assert.match(completed, /recordLiveEventTowerMatch\(profile, towerKey, result/);
  assert.doesNotMatch(completed, /recordCompletedMatchChallenges\(profile, state, HUMAN, activeMode\)/);
});

test('v0.14.22 Live Event results cannot expose the Exhibition REMATCH action', () => {
  const results = between(app, 'function renderMatchResults()', 'function render()');
  assert.match(results, /const matchMode = currentMatchMode\(\);/);
  assert.match(results, /const isLiveEvent = matchMode === "live-event";/);
  assert.match(results, /isLiveEvent \? "RETURN TO TOWER" : "CONTINUE"/);
  assert.match(results, /matchMode === "exhibition" \? '<button id="results-rematch" class="nav-button">REMATCH<\/button>' : ""/);
});

test('v0.14.22 defensive restart routing can never turn a Live Event retry into an Exhibition match', () => {
  const restart = between(app, 'function restartMatch()', 'function showSetup()');
  assert.match(restart, /const matchMode = currentMatchMode\(\);/);
  assert.match(restart, /if \(matchMode === "live-event"\)/);
  assert.match(restart, /startCurrentLiveEventMatch\(towerKey\)/);
  assert.doesNotMatch(restart, /if \(activeMode === "live-event"\)/);
});
