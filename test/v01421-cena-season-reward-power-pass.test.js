import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=0.15.00';
import { superstars } from '../js/data/superstars.js?v=0.15.00';
import { decks } from '../js/data/decks.js?v=0.15.00';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=0.15.00';

const card=id=>allGameplayCards.find(c=>c.id===id);
const cena=superstars.johnCena;

test('v0.14.21 Cena Lead Off guarantees early Strike access without changing the 12-Momentum total',()=>{
  assert.deepEqual(cena.leadOffIds,[
    'momentum-strength','momentum-strike','shoulder-tackle','body-slam','punch'
  ]);
  assert.deepEqual(cena.starterMomentum,{strength:5,technical:4,strike:3});
  const ids=decks['john-cena'].map(c=>c.id);
  assert.deepEqual(ids.slice(0,5),cena.leadOffIds);
  assert.equal(ids.filter(id=>id.startsWith('momentum-')).length,12);
  assert.equal(ids.filter(id=>id==='momentum-strength').length,5);
  assert.equal(ids.filter(id=>id==='momentum-technical').length,4);
  assert.equal(ids.filter(id=>id==='momentum-strike').length,3);
});

test('v0.14.21 Five Knuckle Shuffle is reachable from Cena’s intended signature chain',()=>{
  const five=card('john-cena-five-knuckle-shuffle');
  assert.equal(five.requirements.strike,1);
  assert.equal(five.cost,6);
  assert.equal(five.damage,10);
  const proto=card('john-cena-protobomb');
  assert.equal(proto.effects[0].name,'Five Knuckle Shuffle');
  assert.equal(proto.effects[0].discount,1);
});

test('v0.14.21 Cena finishers preserve elite AA pricing while strengthening STF pressure',()=>{
  const aa=card('john-cena-attitude-adjustment');
  const stf=card('john-cena-stf');
  assert.equal(aa.cost,11);
  assert.equal(aa.damage,18);
  assert.equal(aa.finisher,true);
  assert.equal(stf.cost,9);
  assert.equal(stf.submission.pressure,7);
});

test('v0.14.21 Hustle Loyalty Respect comeback draws two pages exactly once',()=>{
  const hlr=card('john-cena-hustle-loyalty-respect');
  assert.deepEqual(hlr.effect,{type:'hustleLoyaltyRespect',hpPct:0.5,adrenaline:2,draw:2});
  const cm=Object.values(superstars).find(s=>s.id==='cm-punk');
  const g=new MatchEngine({p1:cena,p2:cm,decks,rng:()=>0.41});
  const s=g.state(),p=s.players.p1;
  const support={...hlr,instanceId:'test-hlr'}; p.hand.push(support);
  s.phase='ACTION'; s.playerInControl='p1';
  assert.equal(g.playSupport('p1',support),true);
  p.hp=Math.floor(p.maxHp*.5);
  const before=p.hand.length,ad=p.adrenaline;
  assert.equal(g._triggerHustleLoyaltyRespect('p1'),true);
  assert.equal(p.hand.length,before+2);
  assert.equal(p.adrenaline,ad+2);
  assert.equal(g._triggerHustleLoyaltyRespect('p1'),false);
});
