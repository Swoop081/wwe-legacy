import test from 'node:test';
import assert from 'node:assert/strict';
import { collectionCards } from '../js/data/collection.js?v=1.1.99';
import { addOwnedCard, totalOwnedCopies, underTierOwnershipCap, cardTotalOwnershipCap } from '../js/data/profile.js?v=1.1.99';
import { CARD_TIERS } from '../js/data/variants.js?v=1.1.99';

const ordinary = collectionCards.find(card => !['superstar','entrance'].includes(card.kind) && !card.fixedPrintingTier);
const superstar = collectionCards.find(card => card.kind === 'superstar');
const entrance = collectionCards.find(card => card.kind === 'entrance');
const blank = () => ({ ownedCards: {} });

test('v1.1.78 ordinary cards hold five copies of every printing tier for 25 total', () => {
  assert.ok(ordinary);
  const p = blank();
  for (const tier of CARD_TIERS) {
    const result = addOwnedCard(p, ordinary.id, { tier, amount: 6 });
    assert.equal(result.added, 5, `${tier} stores copies 1-5`);
    assert.equal(result.overflowed, 1, `${tier} copy 6 overflows`);
  }
  assert.equal(totalOwnedCopies(p, ordinary.id), 25);
  assert.equal(cardTotalOwnershipCap(ordinary), 25);
});

test('v1.1.78 Superstar identity is unique across all printing tiers', () => {
  assert.ok(superstar);
  const p = blank();
  const first = addOwnedCard(p, superstar.id, { tier: 'emerald' });
  assert.equal(first.tier, 'amethyst');
  const second = addOwnedCard(p, superstar.id, { tier: 'amethyst' });
  assert.equal(first.added, 1);
  assert.equal(second.added, 0);
  assert.equal(second.overflowed, 1);
  assert.equal(totalOwnedCopies(p, superstar.id), 1);
  assert.equal(cardTotalOwnershipCap(superstar), 1);
  assert.equal(underTierOwnershipCap(p, superstar, 'ruby'), false);
});

test('v1.1.78 Entrance identity is unique across all printing tiers', () => {
  assert.ok(entrance);
  const p = blank();
  const first = addOwnedCard(p, entrance.id, { tier: 'sapphire' });
  assert.equal(first.tier, 'amethyst');
  const second = addOwnedCard(p, entrance.id, { tier: 'normal' });
  assert.equal(first.added, 1);
  assert.equal(second.added, 0);
  assert.equal(second.overflowed, 1);
  assert.equal(totalOwnedCopies(p, entrance.id), 1);
  assert.equal(cardTotalOwnershipCap(entrance), 1);
  assert.ok(CARD_TIERS.every(tier => !underTierOwnershipCap(p, entrance, tier)));
});
