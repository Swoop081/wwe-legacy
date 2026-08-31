import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createProfile } from '../js/data/profile.js?v=1.1.48';
import { GENERIC_MERCH, grantMerch, equipMerch, activeMerchItem, merchEligibilityForSuperstar, merchMatchModifier } from '../js/data/merch.js?v=1.1.48';
import { findPackUpgrades, applyUpgrade, bestMerchTarget } from '../js/data/deck-assistant.js?v=1.1.48';
import { superstars } from '../js/data/superstars.js?v=1.1.48';

const appSource = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const rulesSource = fs.readFileSync(new URL('../js/data/game-rules.js', import.meta.url), 'utf8');
const starById = new Map(Object.values(superstars).map(star => [star.id, star]));
const genericByMethod = method => GENERIC_MERCH.find(item => item.effect?.type === 'momentum' && item.effect?.method === method);

test('Generic Merch produces one best-fit suggestion and is not cloned across unlocked decks', () => {
  const p = createProfile('cm-punk');
  p.unlockedSuperstars = ['cm-punk', 'seth-rollins', 'kane'];
  const item = genericByMethod('strength');
  assert.ok(item);
  grantMerch(p, item.id);
  const pull = { card: item, ownershipBefore: 0, isMerch: true };
  const suggestions = findPackUpgrades(p, [pull]).filter(row => row.type === 'merch');
  assert.equal(suggestions.length, 1);
  assert.equal(suggestions[0].superstarId, 'kane');
  assert.match(suggestions[0].reason, /best legal fit|best fit/i);
  assert.equal(applyUpgrade(p, suggestions[0]), true);
  assert.equal(p.activeMerch?.id, item.id);
  assert.equal(p.activeMerch?.superstarId, 'kane');
  assert.equal(activeMerchItem(p, 'kane')?.id, item.id);
  assert.equal(activeMerchItem(p, 'cm-punk'), null);
  assert.equal(activeMerchItem(p, 'seth-rollins'), null);
});

test('Method-zero Superstar cannot equip matching Momentum Merch manually or through match modifier', () => {
  const p = createProfile('cm-punk');
  p.unlockedSuperstars.push('mankind');
  const item = genericByMethod('agility');
  assert.ok(item);
  grantMerch(p, item.id);
  const eligibility = merchEligibilityForSuperstar(starById.get('mankind'), item);
  assert.equal(eligibility.legal, false);
  assert.match(eligibility.reason, /cannot use Agility Momentum/i);
  assert.throws(() => equipMerch(p, item.id, 'mankind'), /cannot use Agility Momentum/i);
  assert.equal(p.ownedMerch[item.id], 1, 'illegal equip must not consume the Merch card');
  assert.equal(merchMatchModifier(p, 'mankind'), null);
});

test('Finite Method limits reject a Merch bonus larger than the Superstar can legally use', () => {
  const kane = starById.get('kane');
  assert.equal(kane.methodLimits.agility, 1);
  const fake = { id: 'test-plus-two-agility', kind: 'merch', effect: { type: 'momentum', method: 'agility', amount: 2 } };
  const result = merchEligibilityForSuperstar(kane, fake);
  assert.equal(result.legal, false);
  assert.match(result.reason, /limit 1/i);
});

test('Upgrade Assistant suppresses Generic Momentum Merch when nobody unlocked can legally use its Method', () => {
  const p = createProfile('cm-punk');
  p.unlockedSuperstars = ['cm-punk', 'seth-rollins'];
  const item = genericByMethod('strength');
  assert.ok(item);
  assert.equal(starById.get('cm-punk').methodLimits.strength, 0);
  assert.equal(starById.get('seth-rollins').methodLimits.strength, 0);
  grantMerch(p, item.id);
  assert.equal(bestMerchTarget(p, item), null);
  const suggestions = findPackUpgrades(p, [{ card: item, ownershipBefore: 0, isMerch: true }]);
  assert.equal(suggestions.some(row => row.type === 'merch'), false);
});

test('Deck Lab uses the same hard Merch eligibility function for manual equip and directs Generic Merch assignment through Deck Lab', () => {
  assert.match(appSource, /merchEligibilityForSuperstar\(star,card\)/);
  assert.match(appSource, /equipMerch\(profile, btn\.dataset\.pickMerch, deckBuilderStarId\)/);
  assert.match(appSource, /USE DECK LAB/);
  assert.match(rulesSource, /Generic Merch is assigned to one eligible unlocked Superstar/);
  assert.match(rulesSource, /0 limit for the Method/);
});
