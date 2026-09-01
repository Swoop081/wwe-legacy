import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { collectionCards } from '../js/data/collection.js?v=1.1.96';
import { buildPlayableDeck } from '../js/data/deck-assistant.js?v=1.1.96';
import {
  STARTER_CHOICES,
  WELCOME_SUPERSTAR_SET_IDS,
  createProfile,
  claimWelcomeSuperstar,
  ownedCount,
  DEFAULT_PLAYER_ENTRANCE_ID,
  STARTING_MOMENTUM_COPIES
} from '../js/data/profile.js?v=1.1.96';
import { claimAllSeasonTiers, seasonState } from '../js/data/seasons.js?v=1.1.96';

const CENA_MOVES = ['john-cena-protobomb','john-cena-five-knuckle-shuffle','john-cena-stf','john-cena-attitude-adjustment'];
const CENA_ONE_OFS = ['john-cena-hustle-loyalty-respect','special-john-cena','entrance-john-cena','superstar-john-cena'];

test('v0.18.00 both starter paths are immediately playable and onboarding-ready', () => {
  for (const sid of STARTER_CHOICES) {
    const p = createProfile(sid);
    assert.equal(p.onboarding.complete, false, sid);
    assert.equal(p.welcomeSuperstar.claimed, false, sid);
    assert.equal(buildPlayableDeck(p, sid).length, 60, `${sid} playable deck`);
    assert.equal(ownedCount(p, DEFAULT_PLAYER_ENTRANCE_ID, 'normal'), 1, `${sid} Amazing Entrance`);
    for (const method of ['strength','strike','technical','agility']) {
      assert.equal(ownedCount(p, `momentum-${method}`, 'normal'), STARTING_MOMENTUM_COPIES, `${sid}:${method}`);
    }
  }
});

test('v0.18.00 every Welcome era produces a second complete playable Normal deck', () => {
  for (const setId of WELCOME_SUPERSTAR_SET_IDS) {
    const p = createProfile('cm-punk');
    const result = claimWelcomeSuperstar(p, setId, () => 0);
    assert.equal(result.claimed, true, setId);
    assert.notEqual(result.superstarId, 'cm-punk', setId);
    assert.equal(buildPlayableDeck(p, result.superstarId).length, 60, `${setId}:${result.superstarId}`);
    assert.equal(p.savedDecks[result.superstarId].length, 60);
    assert.ok(p.savedDecks[result.superstarId].every(entry => entry.tier === 'normal'));
    assert.equal(p.deckNeedsCards[result.superstarId], 0);
  }
});

test('v0.18.00 Tier 50 raises a persistent dedicated Season completion celebration without generic unlock duplication', () => {
  const p = createProfile('roman-reigns');
  p.seasons['season-1'].xp = 5000;
  claimAllSeasonTiers(p, new Date('2026-08-25T12:00:00'));
  const state = seasonState(p);
  assert.equal(state.completionRewardClaimed, true);
  assert.equal(state.completionCelebrationPending, true);
  assert.equal(state.completionCelebrationSeen, false);
  assert.ok(p.unlockedSuperstars.includes('john-cena'));
  assert.equal((p.pendingUnlockCelebrations ?? []).some(event => event?.superstarId === 'john-cena'), false);
  for (const id of CENA_MOVES) assert.equal(ownedCount(p,id,'ruby'),5,id);
  for (const id of CENA_ONE_OFS) assert.equal(ownedCount(p,id,'ruby'),1,id);
  assert.equal(p.savedDecks['john-cena'].length,60);
});

test('v0.18.00 Season completion and onboarding UI communicate the certified launch flow', () => {
  const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
  const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');
  assert.match(app, /SEASON 1 COMPLETE · TIER 50/);
  assert.match(app, /24 \/ 24 COPIES READY/);
  assert.match(app, /PLAY AS JOHN CENA/);
  assert.match(app, /OPEN CENA IN DECK LAB/);
  assert.match(app, /MATCH BASICS/);
  assert.match(app, /FIRST MATCH · \$\{step\}/);
  assert.match(app, /BUILD MOMENTUM/);
  assert.match(app, /DEFEND WITH COUNTERS/);
  assert.match(app, /FINISH THE MATCH/);
  assert.match(css, /\.season-completion-screen/);
  assert.match(css, /\.onboarding-basics-rail/);
});

test('v0.18.00 all eight Cena Season identities remain Ruby-only', () => {
  const cards = collectionCards.filter(card => card.setId === 'season-1-last-time-is-now');
  assert.equal(cards.length, 8);
  assert.ok(cards.every(card => card.fixedPrintingTier === 'ruby'));
});
