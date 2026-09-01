import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.1.96';
import { deckIds } from '../js/data/decks.js?v=1.1.96';

const byId = new Map(allGameplayCards.map(card => [card.id, card]));
const topLevelIdentityKeys = new Set([
  'id','name','setId','superstarId','allowedSuperstarIds','rarity','rulesText',
  'boosterOnly','rewardOnly','linkedOnly','oneUse','fixedPrintingTier'
]);
const stable = value => {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => [k, stable(v)]));
  }
  return value;
};
const mechanicsSignature = card => JSON.stringify(stable(Object.fromEntries(
  Object.entries(card).filter(([key]) => !topLevelIdentityKeys.has(key))
)));

test('v1.0.3 Brainbuster is no longer an Alabama Slam clone', () => {
  const brainbuster = byId.get('brainbuster');
  const alabama = byId.get('alabama-slam');
  assert.ok(brainbuster && alabama);
  assert.deepEqual(brainbuster.bodyDamage, { bodyPart: 'head', pressure: 1 });
  assert.match(brainbuster.rulesText, /\+1 persistent Head damage/);
  assert.notEqual(mechanicsSignature(brainbuster), mechanicsSignature(alabama));
});

test('v1.0.3 approved Doink and Piper deck swaps preserve 60 pages', () => {
  const doink = deckIds['doink-the-clown'];
  assert.equal(doink.length, 60);
  assert.equal(doink.filter(id => id === 'reverse-chinlock').length, 0);
  assert.equal(doink.filter(id => id === 'alabama-slam').length, 2);

  const piper = deckIds['rowdy-roddy-piper'];
  assert.equal(piper.length, 60);
  assert.equal(piper.filter(id => id === 'running-knee').length, 4);
  assert.equal(piper.filter(id => id === 'running-big-boot').length, 1);
  assert.equal(piper.filter(id => id === 'atomic-drop').length, 4);
  assert.equal(piper.filter(id => id === 'neckbreaker').length, 0);
  assert.equal(piper.filter(id => id === 'alabama-slam').length, 2);
});

test('v1.0.3 priority duplicate rule has no remaining different-name exact clones', () => {
  const moves = allGameplayCards.filter(card => card.kind === 'move');
  const groups = new Map();
  for (const card of moves) {
    const sig = mechanicsSignature(card);
    if (!groups.has(sig)) groups.set(sig, []);
    groups.get(sig).push(card);
  }

  const violations = [];
  for (const group of groups.values()) {
    if (group.length < 2 || new Set(group.map(card => card.name)).size < 2) continue;
    const sameSet = new Set(group.map(card => card.setId)).size === 1;
    const rarityMismatch = new Set(group.map(card => card.rarity)).size > 1;
    const hasExclusive = group.some(card => card.superstarId || card.allowedSuperstarIds?.length);
    if (sameSet || rarityMismatch || hasExclusive) {
      violations.push(group.map(card => `${card.name} (${card.id})`).join(' = '));
    }
  }
  assert.deepEqual(violations, []);
});

test('v1.0.3 signature identity effects are present on representative finishers', () => {
  assert.deepEqual(byId.get('cody-rhodes-cross-rhodes').bodyDamage, { bodyPart: 'back', pressure: 1 });
  assert.deepEqual(byId.get('kevin-owens-stunner').bodyDamage, { bodyPart: 'head', pressure: 1 });
  assert.deepEqual(byId.get('brock-lesnar-f-5').bodyDamage, { bodyPart: 'back', pressure: 1 });
  assert.deepEqual(byId.get('tombstone-piledriver').bodyDamage, { bodyPart: 'head', pressure: 1 });
  assert.deepEqual(byId.get('rhea-ripley-riptide').bodyDamage, { bodyPart: 'back', pressure: 1 });
  assert.deepEqual(byId.get('roxanne-perez-pop-rox').bodyDamage, { bodyPart: 'arms', pressure: 1 });
  assert.equal(byId.get('dragon-lee-dragon-driver').effects.some(e => e.type === 'gainAdrenaline' && e.amount === 1), true);
  assert.equal(byId.get('rowdy-roddy-piper-sleeper-hold').effects.some(e => e.type === 'loseOpponentAdrenaline' && e.amount === 1), true);
});
