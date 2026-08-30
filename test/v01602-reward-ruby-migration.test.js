import test from 'node:test';
import assert from 'node:assert/strict';
import { collectionCards } from '../js/data/collection.js?v=1.1.29';
import { sets } from '../js/data/sets.js?v=1.1.29';
import { addOwnedCard, createProfile, migrateProfile, ownedCount, PROFILE_VERSION } from '../js/data/profile.js?v=1.1.29';
import { applyCardTier, cardPrintingTiers, fixedPrintingTierFor } from '../js/data/variants.js?v=1.1.29';

const rewardSetIds = Object.values(sets)
  .filter(set => set.type === 'season-exclusive' || set.type === 'future-reward')
  .map(set => set.id);

test('v0.17.01 every major reward-exclusive set is Ruby-only', () => {
  assert.ok(rewardSetIds.includes('season-1-last-time-is-now'));
  assert.ok(rewardSetIds.includes('season-1-final-boss'));
  assert.ok(rewardSetIds.includes('season-2-whos-next'));
  assert.ok(rewardSetIds.includes('parked-chyna'));
  for (const setId of rewardSetIds) {
    const cards = collectionCards.filter(card => card.setId === setId);
    assert.ok(cards.length > 0, setId);
    for (const card of cards) {
      assert.equal(fixedPrintingTierFor(card), 'ruby', card.id);
      assert.deepEqual(cardPrintingTiers(card), ['ruby'], card.id);
      assert.equal(applyCardTier(card, 'normal').tier, 'ruby', card.id);
      assert.equal(applyCardTier(card, 'emerald').tier, 'ruby', card.id);
      assert.equal(applyCardTier(card, 'sapphire').tier, 'ruby', card.id);
    }
  }
});

test('v0.17.01 reward-exclusive ownership grants resolve to Ruby even when an old caller requests a lower tier', () => {
  const profile = createProfile('cm-punk');
  for (const id of ['the-rock-rock-bottom','goldberg-jackhammer','chyna-bomb']) {
    addOwnedCard(profile, id, { tier: 'normal', amount: 1 });
    assert.equal(ownedCount(profile, id, 'normal'), 0, id);
    assert.equal(ownedCount(profile, id, 'ruby'), 1, id);
  }
});

test('v0.17.01 migration converts already-earned reward cards to Ruby and preserves grandfathered rewards', () => {
  const old = createProfile('roman-reigns');
  old.version = 41;
  old.ownedCards['john-cena-protobomb'] = { normal: 2, emerald: 1, sapphire: 1, ruby: 0 };
  old.ownedCards['john-cena-hustle-loyalty-respect'] = { normal: 1, emerald: 0, sapphire: 0, ruby: 0 };
  old.ownedCards['the-rock-rock-bottom'] = { normal: 2, emerald: 1, sapphire: 1, ruby: 0 };
  old.ownedCards['superstar-the-rock'] = { normal: 1, emerald: 0, sapphire: 0, ruby: 0 };
  old.ownedCards['entrance-the-rock'] = { normal: 1, emerald: 0, sapphire: 0, ruby: 0 };
  old.unlockedSuperstars.push('the-rock');
  old.selectedEntrances['the-rock'] = 'entrance-the-rock';
  const migrated = migrateProfile(old);
  assert.equal(migrated.version, PROFILE_VERSION);
  assert.deepEqual(migrated.ownedCards['john-cena-protobomb'], { normal: 0, emerald: 0, sapphire: 0, ruby: 4 });
  assert.deepEqual(migrated.ownedCards['john-cena-hustle-loyalty-respect'], { normal: 0, emerald: 0, sapphire: 0, ruby: 1 });
  assert.deepEqual(migrated.ownedCards['the-rock-rock-bottom'], { normal: 0, emerald: 0, sapphire: 0, ruby: 4 });
  assert.ok(migrated.ownedCards['superstar-the-rock'].ruby >= 1);
  assert.equal(migrated.ownedCards['superstar-the-rock'].normal, 0);
  assert.ok(migrated.ownedCards['entrance-the-rock'].ruby >= 1);
  assert.equal(migrated.ownedCards['entrance-the-rock'].normal, 0);
  assert.ok(migrated.unlockedSuperstars.includes('the-rock'));
  assert.equal(migrated.selectedEntrances['the-rock'], 'entrance-the-rock');
});

test('v0.17.01 normal released booster-set cards keep all four printing tiers', () => {
  const regular = collectionCards.find(card => card.setId === 'summerslam-series-1' && card.kind === 'move');
  assert.ok(regular);
  assert.equal(fixedPrintingTierFor(regular), null);
  assert.deepEqual(cardPrintingTiers(regular), ['normal','emerald','sapphire','ruby']);
});
