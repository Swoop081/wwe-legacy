import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.1.132';
import { applyCardTier, CARD_TIERS, fixedPrintingTierFor } from '../js/data/variants.js?v=1.1.132';

const moveSig=c=>JSON.stringify({cost:c.cost,damage:c.damage,rarity:c.rarity,method:c.method,moveType:c.moveType,requirements:c.requirements,groundOpponent:!!c.groundOpponent,groundedOnly:!!c.groundedOnly,standingOnly:!!c.standingOnly,stun:c.stun||0,selfDamage:c.selfDamage||0,effects:c.effects||[],submission:c.submission||null,bodyDamage:c.bodyDamage||null,counterState:c.counterState||null,counterStates:[...(c.counterStates||[])].sort(),defensiveOnly:!!c.defensiveOnly,finisher:!!c.finisher,trademark:!!c.trademark});
const tierSig=c=>JSON.stringify({cost:c.cost,damage:c.damage,effects:c.effects,submission:c.submission,drawOnCounter:c.drawOnCounter,drawOnCounterTypes:c.drawOnCounterTypes});

test('v1.1.69 authored Move shells are mechanically distinct',()=>{
 const moves=allGameplayCards.filter(c=>c.kind==='move');
 const seen=new Set();
 for(const card of moves){const sig=moveSig(card);assert.equal(seen.has(sig),false,`duplicate Move shell: ${card.id}`);seen.add(sig);}
});

test('v1.1.69 variable Moves have five distinct printings',()=>{
 const moves=allGameplayCards.filter(c=>c.kind==='move'&&!fixedPrintingTierFor(c));
 assert.equal(moves.length,599);
 for(const card of moves){
  const sigs=CARD_TIERS.map(t=>tierSig(applyCardTier(card,t)));
  assert.equal(new Set(sigs).size,5,`${card.id}: tier collision`);
 }
});

test('v1.1.69 authored Move damage uses the full low-number vocabulary',()=>{
 const values=new Set(allGameplayCards.filter(c=>c.kind==='move').map(c=>Number(c.damage)));
 for(const n of [1,2,3,4,5,6,7,8,9,10,11,12]) assert.ok(values.has(n),`missing authored damage ${n}`);
});
