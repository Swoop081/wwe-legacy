import test from 'node:test';
import assert from 'node:assert/strict';

import { allGameplayCards } from '../js/data/content.js?v=1.1.48';
import { collectionCards } from '../js/data/collection.js?v=1.1.48';
import { CARD_NUMBER_BY_ID } from '../js/data/card-number-manifest.js?v=1.1.48';
import { decks } from '../js/data/decks.js?v=1.1.48';
import { superstars } from '../js/data/superstars.js?v=1.1.48';
import { buildBestOwnedRecommendedDraft, cardEligibilityForSuperstar, autoBuildEligibilityForSuperstar } from '../js/data/deck-builder.js?v=1.1.48';
import { createProfile, migrateProfile, PROFILE_VERSION } from '../js/data/profile.js?v=1.1.48';

const RHEA_CARD_ID = 'razor-s-edge';
const byId = new Map(collectionCards.map(card => [card.id, card]));
const starById = new Map(Object.values(superstars).map(star => [star.id, star]));
const idOf = entry => typeof entry === 'string' ? entry : entry?.id;

function ownExact(profile, entries) {
  const counts = new Map();
  for (const raw of entries) {
    const id = idOf(raw);
    if (!id) continue;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  profile.ownedCards ??= {};
  for (const [id, count] of counts) profile.ownedCards[id] = { normal: count, emerald: 0, sapphire: 0, ruby: 0 };
}

test('v0.14.19 Rhea’s Crucifix Powerbomb is reserved to Rhea for Auto Build without changing its shared Uncommon card data', () => {
  const gameplay = allGameplayCards.find(card => card.id === RHEA_CARD_ID);
  const collector = byId.get(RHEA_CARD_ID);
  assert.ok(gameplay && collector);
  assert.equal(gameplay.superstarId, null);
  assert.equal(collector.superstarId, null);
  assert.deepEqual(gameplay.autoBuildSuperstarIds, ['rhea-ripley']);
  assert.equal(CARD_NUMBER_BY_ID[RHEA_CARD_ID]?.cardCode, 'EVO1-004');
  assert.deepEqual(
    { name: gameplay.name, cost: gameplay.cost, damage: gameplay.damage, rarity: gameplay.rarity, method: gameplay.method, requirements: gameplay.requirements, state: gameplay.counterState },
    { name: 'Rhea’s Crucifix Powerbomb', cost: 7, damage: 11, rarity: 2, method: 'strength', requirements: { strength: 3 }, state: 'body-elevated' }
  );
  assert.equal(cardEligibilityForSuperstar(starById.get('rhea-ripley'), gameplay).legal, true);
  assert.equal(cardEligibilityForSuperstar(starById.get('kane'), gameplay).legal, true, 'manual Deck Lab legality stays shared');
  assert.equal(autoBuildEligibilityForSuperstar(starById.get('rhea-ripley'), gameplay).legal, true);
  const kaneAuto = autoBuildEligibilityForSuperstar(starById.get('kane'), gameplay);
  assert.equal(kaneAuto.legal, false);
  assert.match(kaneAuto.reason, /Reserved for another Superstar/);
});

test('v0.14.19 Auto Build never uses Rhea’s Crucifix Powerbomb as Kane filler', () => {
  const profile = createProfile('roman-reigns');
  profile.unlockedSuperstars.push('kane');
  const kaneBlueprint = decks.kane.map(card => ({ id: card.id, tier: 'normal' }));
  const missingIndex = kaneBlueprint.findIndex((entry, index) => index >= 5 && byId.get(entry.id)?.kind === 'move' && Number(byId.get(entry.id)?.cost) >= 6);
  assert.ok(missingIndex >= 5);
  const missingId = kaneBlueprint[missingIndex].id;
  const owned = kaneBlueprint.filter((_, index) => index !== missingIndex);
  ownExact(profile, owned);
  profile.ownedCards[RHEA_CARD_ID] = { normal: 1, emerald: 0, sapphire: 0, ruby: 0 };

  const built = buildBestOwnedRecommendedDraft(profile, 'kane');
  assert.equal(built.some(entry => idOf(entry) === RHEA_CARD_ID), false);
  const authoredMissingCount = kaneBlueprint.filter(entry => entry.id === missingId).length;
  const builtMissingCount = built.filter(entry => idOf(entry) === missingId).length;
  assert.equal(builtMissingCount, authoredMissingCount - 1, 'the unavailable authored copy remains unavailable');
  assert.ok(built.every(entry => autoBuildEligibilityForSuperstar(starById.get('kane'), byId.get(idOf(entry))).legal), 'every Auto Build page must be valid for Kane Auto Build');
});

test('v0.14.19 migration repairs an existing leaked Rhea card in Kane’s saved deck without shrinking the deck', () => {
  const profile = createProfile('roman-reigns');
  profile.version = 39;
  profile.unlockedSuperstars.push('kane');
  const original = decks.kane.map(card => ({ id: card.id, tier: 'normal' }));
  ownExact(profile, original);
  profile.ownedCards[RHEA_CARD_ID] = { normal: 1, emerald: 0, sapphire: 0, ruby: 0 };
  const replaceIndex = original.findIndex((entry, index) => index >= 5 && byId.get(entry.id)?.kind === 'move' && Number(byId.get(entry.id)?.cost) >= 6);
  assert.ok(replaceIndex >= 5);
  const displacedId = original[replaceIndex].id;
  const leaked = original.map(entry => ({ ...entry }));
  leaked[replaceIndex] = { id: RHEA_CARD_ID, tier: 'normal' };
  profile.savedDecks.kane = leaked;

  const migrated = migrateProfile(profile);
  assert.equal(migrated.version, PROFILE_VERSION);
  assert.equal(migrated.savedDecks.kane.length, 60);
  assert.equal(migrated.savedDecks.kane.some(entry => idOf(entry) === RHEA_CARD_ID), false);
  assert.equal(migrated.savedDecks.kane.filter(entry => idOf(entry) === displacedId).length, original.filter(entry => idOf(entry) === displacedId).length);
  assert.deepEqual(migrated.savedDecks.kane.slice(0, 5).map(idOf), leaked.slice(0, 5).map(idOf), 'unrelated Lead Off order is preserved');
});

test('v0.14.19 migration leaves Rhea’s own authored Crucifix Powerbomb untouched', () => {
  const profile = createProfile('roman-reigns');
  profile.version = 39;
  profile.unlockedSuperstars.push('rhea-ripley');
  const rheaDeck = decks['rhea-ripley'].map(card => ({ id: card.id, tier: 'normal' }));
  ownExact(profile, rheaDeck);
  profile.savedDecks['rhea-ripley'] = rheaDeck;
  const before = rheaDeck.filter(entry => idOf(entry) === RHEA_CARD_ID).length;
  assert.equal(before, 1);
  const migrated = migrateProfile(profile);
  assert.equal(migrated.savedDecks['rhea-ripley'].filter(entry => idOf(entry) === RHEA_CARD_ID).length, 1);
});
