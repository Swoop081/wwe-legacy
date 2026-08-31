import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.1.48';
import { superstars } from '../js/data/superstars.js?v=1.1.48';
import { decks } from '../js/data/decks.js?v=1.1.48';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.1.48';

const card=id=>allGameplayCards.find(c=>c.id===id);
const star=id=>Object.values(superstars).find(s=>s.id===id);
const rng=()=>0.41;
function engineFor(p1Id,p2Id='cm-punk'){return new MatchEngine({p1:star(p1Id),p2:star(p2Id),decks,rng});}

function injectHand(player,c,id=`test-${c.id}`){const x={...c,instanceId:id};player.hand.push(x);return x;}

test('v0.14.20 locks the roster audit numerical changes',()=>{
  assert.equal(star('andre-the-giant').ability.trigger.maxUses,1);
  assert.equal(star('andre-the-giant').ability.trigger.adrenaline??0,0);
  assert.equal(star('andre-the-giant').ability.trigger.discount,1);
  assert.equal(star('andre-the-giant').ability.trigger.damage,2);
  assert.equal(card('diesel-jackknife-powerbomb').cost,12);
  assert.equal(card('diesel-jackknife-powerbomb').damage,18);

  assert.equal(star('doink-the-clown').hp,63);
  assert.deepEqual(star('doink-the-clown').ability.trigger,{type:'counterDraw',maxUses:2,draw:2,adrenaline:1});
  assert.equal(card('doink-drop-toe-hold').searchOnConnectName,'Stump Puller');
  assert.equal(card('doink-drop-toe-hold').searchOnConnectDiscount,1);
  assert.equal(card('doink-stump-puller').submission.pressure,7);

  assert.equal(card('ted-dibiase-million-dollar-dream').submission.pressure,7);
  assert.equal(star('ted-dibiase').ability.trigger.maxUses,3);
  assert.equal(card('mr-perfect-perfect-plex').pinKickoutPenalty,15);
  assert.equal(star('mr-perfect').ability.trigger.draw,1);
  assert.equal(star('mr-perfect').ability.trigger.drawMaxUses,3);
  assert.equal(star('mr-perfect').ability.trigger.adrenaline,1);

  assert.equal(star('becky-lynch').hp,69);
  assert.equal(card('becky-lynch-dis-arm-her').submission.pressure,7);
  assert.equal(card('becky-lynch-manhandle-slam').damage,17);
  assert.equal(star('owen-hart').hp,65); // superseded by v0.14.26
  assert.equal(card('special-owen-hart').special.maxRarity,3);

  assert.equal(star('randy-savage').ability.trigger.maxUses,2);
  assert.equal(star('randy-savage').ability.trigger.adrenaline,1);
  assert.equal(star('randy-savage').ability.trigger.draw??0,0);

  assert.equal(star('penta').entrance.preMatchAdrenaline,0);
  assert.equal(card('entrance-penta').preMatchAdrenaline,0);
  assert.equal(star('lola-vice').hp,61);
  assert.equal(card('lola-vice-triangle-choke').submission.pressure,6);

  assert.deepEqual(card('john-cena-hustle-loyalty-respect').effect,{type:'hustleLoyaltyRespect',hpPct:0.5,adrenaline:2,draw:2});
  assert.deepEqual(card('special-rowdy-roddy-piper').special,{type:'pipersPit',nextControlAdrenalineDrain:1});
});

test('v0.14.20 Doink Joke’s on You draws 2 and gains 1 Adrenaline for each of its first two Counter triggers',()=>{
  const g=engineFor('doink-the-clown'); const p=g.state().players.p1;
  p.deck.push(card('body-slam'),card('dropkick'),card('bulldog'),card('vertical-suplex'));
  const hand0=p.hand.length,ad0=p.adrenaline;
  assert.equal(g._ability('p1','counter',{incoming:card('body-slam'),counter:card('punch')}),true);
  assert.equal(p.hand.length,hand0+2); assert.equal(p.adrenaline,ad0+1);
  assert.equal(g._ability('p1','counter',{incoming:card('body-slam'),counter:card('punch')}),true);
  assert.equal(p.hand.length,hand0+4); assert.equal(p.adrenaline,ad0+2);
  assert.equal(g._ability('p1','counter',{incoming:card('body-slam'),counter:card('punch')}),false);
});

test('Perfect Execution keeps its once-per-Control discount and grants draw + Adrenaline on the first three successful Counters each match',()=>{
  const g=engineFor('mr-perfect'); const p=g.state().players.p1;
  p.deck.push(card('body-slam'),card('dropkick'),card('bulldog'),card('vertical-suplex'),card('headlock-takeover'));
  const ad0=p.adrenaline;
  for(let use=1;use<=3;use++){
    const before=p.hand.length,adBefore=p.adrenaline;
    assert.equal(g._ability('p1','counter',{incoming:card('body-slam'),counter:card('punch')}),true);
    assert.equal(p.hand.length,before+1);
    assert.equal(p.adrenaline,adBefore+1);
    assert.equal(p.events.perfectExecutionPending,2);
    delete p.events.perfectExecutionPending; g._resetControlSequenceState('p1');
  }
  const before=p.hand.length,adBefore=p.adrenaline;
  assert.equal(g._ability('p1','counter',{incoming:card('body-slam'),counter:card('punch')}),true);
  assert.equal(p.hand.length,before);
  assert.equal(p.adrenaline,adBefore);
  assert.equal(p.events.perfectExecutionDrawUses,3);
  assert.equal(p.adrenaline,ad0+3);
});

test('v0.14.20 Hustle, Loyalty, Respect is persistent and fires exactly once when Cena reaches 50% HP or less',()=>{
  const g=engineFor('john-cena'); const s=g.state(),p=s.players.p1;
  const support=injectHand(p,card('john-cena-hustle-loyalty-respect'));
  s.phase='ACTION'; s.playerInControl='p1';
  const ad0=p.adrenaline,handBeforePlay=p.hand.length;
  assert.equal(g.playAction('p1',support),true);
  assert.equal(p.events.hustleLoyaltyRespectUsed,undefined);
  assert.equal(p.adrenaline,ad0);
  p.hp=Math.floor(p.maxHp*.5);
  const beforeTrigger=p.hand.length;
  assert.equal(g._triggerHustleLoyaltyRespect('p1'),true);
  assert.equal(p.adrenaline,ad0+2);
  assert.equal(p.hand.length,beforeTrigger+2);
  p.hp=Math.max(1,p.hp-5);
  assert.equal(g._triggerHustleLoyaltyRespect('p1'),false);
  assert.equal(p.adrenaline,ad0+2);
  assert.ok(handBeforePlay>=1);
});

test('v0.14.20 Hustle, Loyalty, Respect also fires immediately if Cena installs it after already reaching the threshold',()=>{
  const g=engineFor('john-cena'); const s=g.state(),p=s.players.p1;
  const support=injectHand(p,card('john-cena-hustle-loyalty-respect'));
  p.hp=Math.floor(p.maxHp*.5); s.phase='ACTION'; s.playerInControl='p1';
  const ad0=p.adrenaline;
  assert.equal(g.playAction('p1',support),true);
  assert.equal(p.events.hustleLoyaltyRespectUsed,true);
  assert.equal(p.adrenaline,ad0+2);
});
