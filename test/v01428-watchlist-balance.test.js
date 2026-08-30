import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.1.23';
import { superstars } from '../js/data/superstars.js?v=1.1.23';

const card=id=>allGameplayCards.find(c=>c.id===id);
const star=id=>Object.values(superstars).find(s=>s.id===id);

test('v0.15.00 moves Shawn Michaels into the healthy band without pruning his archetype',()=>{
  const shawn=star('shawn-michaels');
  assert.equal(shawn.hp,64);
  assert.equal(card('shawn-michaels-flying-forearm').damage,7);
  assert.equal(card('shawn-michaels-flying-forearm').cost,4);
  assert.equal(card('shawn-michaels-sweet-chin-music').damage,17);
});

test('v0.15.00 strengthens Kurt Angle through durability and Ankle Lock pressure',()=>{
  const kurt=star('kurt-angle');
  const ankle=card('kurt-angle-ankle-lock');
  assert.equal(kurt.hp,66);
  assert.equal(ankle.submission?.pressure,7);
  assert.match(ankle.rulesText,/\+7 persistent Leg damage/i);
  assert.equal(ankle.cost,9);
});

test('v0.15.00 gives IYO SKY a minimal durability correction while preserving her fragile identity',()=>{
  const iyo=star('iyo-sky');
  assert.equal(iyo.hp,58);
  assert.equal(card('iyo-sky-over-the-moonsault').damage,17);
  assert.equal(iyo.ability.trigger.maxUses,3);
});

test('v0.15.00 leaves the prior elite reference package untouched',()=>{
  assert.equal(star('john-cena').hp,68);
  assert.equal(card('john-cena-attitude-adjustment').damage,18);
  assert.equal(star('roman-reigns').hp,67);
});
