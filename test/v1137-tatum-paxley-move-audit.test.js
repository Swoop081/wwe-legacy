import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.1.100';
import { deckIds } from '../js/data/decks.js?v=1.1.100';
import { superstars } from '../js/data/superstars.js?v=1.1.100';

const byId = Object.fromEntries(allGameplayCards.map(card => [card.id, card]));
const count = id => deckIds['tatum-paxley'].filter(cardId => cardId === id).length;

test('v1.1.37 Cemetery Drive is Tatum Paxley finisher, not a submission', () => {
  const card = byId['tatum-paxley-cemetery-drive'];
  assert.ok(card);
  assert.equal(card.finisher, true);
  assert.equal(card.trademark, undefined);
  assert.equal(card.rarity, 4);
  assert.equal(card.cost, 9);
  assert.equal(card.damage, 17);
  assert.equal(card.moveType, 'grapple');
  assert.equal(card.method, null);
  assert.deepEqual(card.requirements, {});
  assert.equal(card.submission, undefined);
  assert.equal(card.submissionTarget, undefined);
  assert.equal(card.groundedOnly, false);
  assert.equal(card.groundOpponent, true);
  assert.equal(card.counterState, 'front-control');
  assert.deepEqual(card.bodyDamage, { bodyPart: 'back', pressure: 1 });
});

test('v1.1.37 Tatum supporting exclusives are trademarks in NXT trademark balance bands', () => {
  const psycho = byId['tatum-paxley-psycho-trap'];
  assert.equal(psycho.trademark, true);
  assert.equal(psycho.finisher, undefined);
  assert.equal(psycho.rarity, 3);
  assert.equal(psycho.cost, 5);
  assert.equal(psycho.damage, 8);
  assert.deepEqual(psycho.requirements, { technical: 1 });
  assert.equal(psycho.moveType, 'grapple');
  assert.equal(psycho.counterState, 'front-control');
  assert.equal(psycho.searchOnConnectName, 'Cemetery Drive');
  assert.equal(psycho.searchOnConnectDiscount, 1);

  const german = byId['tatum-paxley-bridging-german-suplex'];
  assert.equal(german.trademark, true);
  assert.equal(german.finisher, undefined);
  assert.equal(german.rarity, 3);
  assert.equal(german.cost, 5);
  assert.equal(german.damage, 8);
  assert.deepEqual(german.requirements, { technical: 2 });
  assert.equal(german.moveType, 'grapple');
  assert.equal(german.method, 'technical');
  assert.equal(german.counterState, 'rear-control');
  assert.equal(german.groundedOnly, false);
  assert.equal(german.groundOpponent, true);

  const knee = byId['tatum-paxley-diving-knee-drop'];
  assert.equal(knee.trademark, true);
  assert.equal(knee.finisher, undefined);
  assert.equal(knee.rarity, 3);
  assert.equal(knee.cost, 6);
  assert.equal(knee.damage, 10);
  assert.deepEqual(knee.requirements, { agility: 2 });
  assert.equal(knee.moveType, 'aerial');
  assert.equal(knee.method, 'agility');
  assert.equal(knee.counterState, 'diving-aerial');
  assert.equal(knee.groundedOnly, true);
});

test('v1.1.37 Tatum deck uses standard three-trademark / two-finisher authored counts', () => {
  assert.equal(deckIds['tatum-paxley'].length, 60);
  assert.equal(count('tatum-paxley-psycho-trap'), 3);
  assert.equal(count('tatum-paxley-bridging-german-suplex'), 3);
  assert.equal(count('tatum-paxley-diving-knee-drop'), 3);
  assert.equal(count('tatum-paxley-cemetery-drive'), 2);
  assert.deepEqual(superstars.tatumPaxley.signatures, [
    'tatum-paxley-cemetery-drive',
    'tatum-paxley-psycho-trap',
    'tatum-paxley-bridging-german-suplex',
    'tatum-paxley-diving-knee-drop'
  ]);
});
