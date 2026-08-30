import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createProfile } from '../js/data/profile.js?v=1.1.37';
import { MERCH_ITEMS, grantMerch, equipMerch, activeMerchItem, consumeActiveMerchMatch } from '../js/data/merch.js?v=1.1.37';
import { findPackUpgrades, applyUpgrade } from '../js/data/deck-assistant.js?v=1.1.37';

const appSource = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const rulesSource = fs.readFileSync(new URL('../js/data/game-rules.js', import.meta.url), 'utf8');

test('Deck Lab exposes a dedicated single non-stackable Merch slot and picker', () => {
  assert.match(appSource, /<h3>Merch Slot<\/h3>/);
  assert.match(appSource, /1 active item · non-stackable · expires after completed eligible matches/);
  assert.match(appSource, /deckLabPicker = \{ type: "merch" \}/);
  assert.match(appSource, /card\.scope === "generic" \|\| card\.superstarId === deckBuilderStarId/);
  assert.match(appSource, /ADD MERCH/);
  assert.match(rulesSource, /Each Merch card lasts 1, 3 or 5 completed eligible matches/);
});

test('Merch remains one active slot, does not stack, and expires by completed eligible matches', () => {
  const p = createProfile('cm-punk');
  const items = MERCH_ITEMS.filter(m => m.scope === 'superstar' && m.superstarId === 'cm-punk');
  const first = items.find(m => m.duration === 3) ?? items[0];
  const second = items.find(m => m.id !== first.id) ?? items[1];
  grantMerch(p, first.id);
  grantMerch(p, second.id);
  equipMerch(p, first.id);
  assert.equal(activeMerchItem(p, 'cm-punk')?.id, first.id);
  assert.throws(() => equipMerch(p, second.id), /active Merch|Finish or discard/i);
  const starting = first.duration;
  for (let i = 0; i < starting; i += 1) consumeActiveMerchMatch(p);
  assert.equal(p.activeMerch, null);
});

test('Deck Assistance suggests newly pulled Superstar-specific Merch only when the Superstar is unlocked and slot is free', () => {
  const p = createProfile('cm-punk');
  const item = MERCH_ITEMS.find(m => m.scope === 'superstar' && m.superstarId === 'cm-punk');
  assert.ok(item);
  grantMerch(p, item.id);
  const pull = { card: item, ownershipBefore: 0, isMerch: true };
  const suggestions = findPackUpgrades(p, [pull]);
  const merch = suggestions.find(u => u.type === 'merch');
  assert.ok(merch, 'expected Merch equip suggestion');
  assert.equal(merch.superstarId, 'cm-punk');
  assert.equal(merch.cardId, item.id);
  assert.equal(merch.removeName, 'Empty Merch Slot');

  assert.equal(applyUpgrade(p, merch), true);
  assert.equal(p.activeMerch?.id, item.id);
  assert.equal(findPackUpgrades(p, [pull]).some(u => u.type === 'merch'), false, 'occupied slot should suppress another Merch suggestion');
});

test('Deck Assistance does not suggest specific Merch for a Superstar the player has not unlocked', () => {
  const p = createProfile('cm-punk');
  const item = MERCH_ITEMS.find(m => m.scope === 'superstar' && m.superstarId !== 'cm-punk' && !p.unlockedSuperstars.includes(m.superstarId));
  assert.ok(item);
  grantMerch(p, item.id);
  const suggestions = findPackUpgrades(p, [{ card: item, ownershipBefore: 0, isMerch: true }]);
  assert.equal(suggestions.some(u => u.type === 'merch'), false);
});
