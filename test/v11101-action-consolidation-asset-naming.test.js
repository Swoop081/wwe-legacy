import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.1.34';
import { canonicalCardImagePath, canonicalBasePlatePath } from '../js/data/artwork.js?v=1.1.34';
import { canPlaySupport } from '../js/engine/rules.js?v=1.1.34';
import { decks } from '../js/data/decks.js?v=1.1.34';
import { superstars } from '../js/data/superstars.js?v=1.1.34';
import { isPlayerReleasedSetId } from '../js/data/release.js?v=1.1.34';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.1.34';

const byId = new Map(allGameplayCards.map(card => [card.id, card]));
const migratedIds = ['crowd-support','what','people-championship','john-cena-hustle-loyalty-respect'];

test('v1.1.1 retires Support as a collectible card type', () => {
  assert.equal(allGameplayCards.filter(card => card.kind === 'support').length, 0);
  for (const id of migratedIds) {
    const card = byId.get(id);
    assert.ok(card, id);
    assert.equal(card.kind, 'action');
    assert.equal(card.oncePerMatch, true);
  }
  assert.equal(canPlaySupport({}, 'p1', {}), false);
});

test('v1.1.1 action artwork naming starts with the real card name, then action, then Superstar', () => {
  assert.equal(canonicalCardImagePath(byId.get('what')), 'assets/images/what-action-stone-cold-steve-austin.webp');
  assert.equal(canonicalBasePlatePath(byId.get('what')), 'assets/images/what-action-stone-cold-steve-austin-base-plate.webp');
  assert.equal(canonicalCardImagePath(byId.get('crowd-support')), 'assets/images/crowd-support-action.webp');
  assert.equal(canonicalCardImagePath(byId.get('john-cena-hustle-loyalty-respect')), 'assets/images/hustle-loyalty-respect-action-john-cena.webp');
});

test('v1.1.1 Trick action and Entrance have distinct searchable identities', () => {
  const action = byId.get('special-trick-williams');
  const entrance = byId.get('entrance-trick-williams');
  assert.equal(action.name, 'Trick Willy');
  assert.equal(entrance.name, 'Whoop That Trick');
  assert.equal(canonicalCardImagePath(action), 'assets/images/trick-willy-action-trick-williams.webp');
  assert.equal(canonicalCardImagePath(entrance), 'assets/images/whoop-that-trick-entrance-trick-williams.webp');
});

test('v1.1.1 identifies every released recommended deck affected by Support-to-Action migration', () => {
  const migrated = new Set(migratedIds);
  const affected = [];
  const superstarById = new Map(Object.values(superstars).map(star => [star.id, star]));
  for (const [superstarId, deck] of Object.entries(decks)) {
    const star = superstarById.get(superstarId);
    if (!star || !isPlayerReleasedSetId(star.setId)) continue;
    const hits = deck.filter(card => migrated.has(card.id));
    if (hits.length) affected.push({ superstarId, ids: hits.map(card => card.id) });
  }
  assert.deepEqual(affected.map(x => x.superstarId).sort(), ['jacy-jayne','jake-roberts','john-cena','oba-femi','rowdy-roddy-piper','stone-cold-steve-austin','ted-dibiase','the-rock-attitude','triple-h']);
});

test('v1.1.1 migrated persistent Actions coexist instead of replacing one another', () => {
  const superstarById = new Map(Object.values(superstars).map(star => [star.id, star]));
  const game = new MatchEngine({ p1: superstarById.get('stone-cold-steve-austin'), p2: superstarById.get('the-rock-attitude'), decks, rng: () => 0.5 });
  const state = game.state();
  const player = state.players.p1;
  state.phase = 'ACTION';
  state.playerInControl = 'p1';
  const crowd = { ...byId.get('crowd-support'), instanceId: 'v1111-crowd' };
  player.hand.push(crowd);
  assert.equal(game.playAction('p1', crowd), true);
  player.turn.actionPlayed = 0;
  const what = { ...byId.get('what'), instanceId: 'v1111-what' };
  player.hand.push(what);
  assert.equal(game.playAction('p1', what), true);
  assert.equal(player.persistentActions.crowdSupport.id, 'crowd-support');
  assert.equal(player.persistentActions.what.id, 'what');
});

test('v1.1.1 balance correction keeps André and Montez inside the certified roster band', () => {
  const counts = id => decks[id].reduce((map, card) => map.set(card.id, (map.get(card.id) ?? 0) + 1), new Map());
  const andre = counts('andre-the-giant');
  const montez = counts('montez-ford');
  assert.equal(andre.get('andre-the-giant-double-underhook-suplex'), 2);
  assert.equal(andre.get('military-press-slam'), 2);
  assert.equal(montez.get('dropkick'), 1);
  assert.equal(montez.get('running-big-boot'), 2);
  assert.equal(decks['andre-the-giant'].length, 60);
  assert.equal(decks['montez-ford'].length, 60);
});
