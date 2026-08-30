import test from 'node:test';
import assert from 'node:assert/strict';
import { collectionCards } from '../js/data/collection.js?v=1.1.25';
import { addOwnedCard, createProfile, migrateProfile, ownedCount, PROFILE_VERSION } from '../js/data/profile.js?v=1.1.25';
import { claimAllSeasonTiers, SEASON_1_CHASE_TIER_REWARDS } from '../js/data/seasons.js?v=1.1.25';
import { applyCardTier } from '../js/data/variants.js?v=1.1.25';

const CENA_SET = 'season-1-last-time-is-now';
const MOVE_IDS = ['john-cena-protobomb','john-cena-five-knuckle-shuffle','john-cena-stf','john-cena-attitude-adjustment'];
const ALL_CENA_REWARDS = [...MOVE_IDS,'john-cena-hustle-loyalty-respect','special-john-cena','entrance-john-cena','superstar-john-cena'];

function finishSeason(profile) {
  profile.seasons['season-1'].xp = 5000;
  claimAllSeasonTiers(profile, new Date('2026-08-25T12:00:00'));
  return profile;
}

test('v0.17.01 every Season 1 Cena collectible is Ruby-only', () => {
  const cards = collectionCards.filter(card => card.setId === CENA_SET);
  assert.equal(cards.length, 8);
  for (const card of cards) {
    assert.equal(card.fixedPrintingTier, 'ruby', card.id);
    assert.equal(applyCardTier(card, 'normal').tier, 'ruby', `${card.id} cannot materialize as Normal`);
    assert.equal(applyCardTier(card, 'emerald').tier, 'ruby', `${card.id} cannot materialize as Emerald`);
    assert.equal(applyCardTier(card, 'sapphire').tier, 'ruby', `${card.id} cannot materialize as Sapphire`);
  }
});

test('v0.17.01 Season 1 awards the complete Cena package only as Ruby', () => {
  for (const reward of Object.values(SEASON_1_CHASE_TIER_REWARDS)) assert.equal(reward.printingTier, 'ruby', reward.cardId);
  for (const id of MOVE_IDS) assert.equal(Object.values(SEASON_1_CHASE_TIER_REWARDS).filter(reward => reward.cardId === id).length, 5, id);
  for (const id of ALL_CENA_REWARDS.slice(4)) assert.equal(Object.values(SEASON_1_CHASE_TIER_REWARDS).filter(reward => reward.cardId === id).length, 1, id);
});

test('v0.17.01 Tier 50 leaves Cena with his complete Ruby reward package and best owned authored deck', () => {
  const profile = finishSeason(createProfile('roman-reigns'));
  for (const id of MOVE_IDS) assert.equal(ownedCount(profile, id, 'ruby'), 5, id);
  for (const id of ALL_CENA_REWARDS.slice(4)) assert.equal(ownedCount(profile, id, 'ruby'), 1, id);
  for (const id of ALL_CENA_REWARDS) {
    assert.equal(ownedCount(profile, id, 'normal'), 0, `${id} Normal`);
    assert.equal(ownedCount(profile, id, 'emerald'), 0, `${id} Emerald`);
    assert.equal(ownedCount(profile, id, 'sapphire'), 0, `${id} Sapphire`);
  }
  assert.ok(profile.unlockedSuperstars.includes('john-cena'));
  assert.equal(profile.selectedEntrances['john-cena'], 'entrance-john-cena');
  assert.equal(profile.savedDecks['john-cena'].length, 60);
  const cenaEntries = profile.savedDecks['john-cena'].filter(entry => ALL_CENA_REWARDS.includes(entry.id));
  assert.ok(cenaEntries.length >= 1);
  assert.ok(cenaEntries.every(entry => entry.tier === 'ruby'));
});

test('v0.17.01 ownership cannot create a non-Ruby Cena Season printing', () => {
  const profile = createProfile('cm-punk');
  addOwnedCard(profile, 'john-cena-protobomb', { tier: 'normal', amount: 1 });
  assert.equal(ownedCount(profile, 'john-cena-protobomb', 'normal'), 0);
  assert.equal(ownedCount(profile, 'john-cena-protobomb', 'ruby'), 1);
  const byId = new Map(collectionCards.map(card => [card.id, card]));
  assert.equal(applyCardTier(byId.get('john-cena-protobomb'), 'normal').damage, 11);
  assert.equal(applyCardTier(byId.get('john-cena-five-knuckle-shuffle'), 'normal').damage, 11);
  assert.equal(applyCardTier(byId.get('john-cena-stf'), 'normal').submission.pressure, 8);
  assert.equal(applyCardTier(byId.get('john-cena-attitude-adjustment'), 'normal').damage, 19);
});

test('v0.17.01 migration collapses legacy Cena printings into Ruby', () => {
  const old = createProfile('cm-punk');
  old.version = 40;
  old.ownedCards['john-cena-protobomb'] = { normal: 3, emerald: 1, sapphire: 0, ruby: 1 };
  old.ownedCards['john-cena-hustle-loyalty-respect'] = { normal: 1, emerald: 0, sapphire: 0, ruby: 0 };
  const migrated = migrateProfile(old);
  assert.equal(migrated.version, PROFILE_VERSION);
  assert.deepEqual(migrated.ownedCards['john-cena-protobomb'], { normal: 0, emerald: 0, sapphire: 0, ruby: 5 });
  assert.deepEqual(migrated.ownedCards['john-cena-hustle-loyalty-respect'], { normal: 0, emerald: 0, sapphire: 0, ruby: 1 });
});
