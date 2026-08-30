import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.1.37';
import { superstars } from '../js/data/superstars.js?v=1.1.37';
import { deckIds, decks } from '../js/data/decks.js?v=1.1.37';
import { COUNTER_STATES, SUBMISSION_TARGETS } from '../js/data/counter-states.js?v=1.1.37';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.1.37';

const card=id=>allGameplayCards.find(c=>c.id===id);
const star=id=>Object.values(superstars).find(s=>s.id===id);
const byId=new Map(allGameplayCards.map(c=>[c.id,c]));
const arr=v=>Array.isArray(v)?v:[];
const hasStructuralCounter=c=>!!c&&c.kind==='move'&&(
  arr(c.counterStates).length||arr(c.counterSubmissionTargets).length||
  arr(c.countersCardIds).length||arr(c.counters).length||c.defensiveOnly
);
function density(sid){
  const cards=(deckIds[sid]??[]).map(id=>byId.get(id)).filter(Boolean);
  const structural=cards.filter(hasStructuralCounter);
  const states=new Set(structural.flatMap(c=>arr(c.counterStates)));
  const subs=new Set(structural.flatMap(c=>arr(c.counterSubmissionTargets)));
  return {
    structural:structural.length,
    effective:structural.length+cards.filter(c=>c.id==='once-too-often').length,
    states,subs
  };
}

test('v0.14.27 prunes only the approved redundant high-density Counter pages',()=>{
  const expected={
    'liv-morgan':17,
    'mankind':17,
    'stephanie-vaquer':18,
    'gunther':17,
    'iyo-sky':18,
    'oba-femi':17,
    'paige':18,
    'rhea-ripley':18,
  };
  for(const [sid,effective] of Object.entries(expected)){
    const d=density(sid);
    assert.equal(d.effective,effective,sid);
    assert.equal(d.states.size,COUNTER_STATES.length,`${sid} keeps all Counter states`);
    assert.equal(d.subs.size,SUBMISSION_TARGETS.length,`${sid} keeps all Submission targets`);
    assert.equal((deckIds[sid]??[]).length,60,`${sid} stays at 60 pages`);
  }
});

test('v0.14.27 deliberately preserves Shawn Michaels Counter density as archetype-critical',()=>{
  const d=density('shawn-michaels');
  assert.equal(d.effective,20);
  assert.equal(d.states.size,8);
  assert.equal(d.subs.size,4);
});

test('v0.14.27 locks the focused Austin, DiBiase, Perfect and Triple H balance package',()=>{
  const austin=star('stone-cold-steve-austin');
  assert.equal(austin.hp,67);
  assert.equal(austin.ability.trigger.maxUses,3);
  assert.match(austin.ability.text,/first 3 times/i);

  const ted=star('ted-dibiase');
  assert.equal(ted.hp,67);
  assert.equal(ted.special.finisherDiscount,1,'Million Dollar Championship is unchanged');

  const perfect=star('mr-perfect');
  assert.equal(perfect.hp,66);
  assert.equal(perfect.entrance.preMatchAdrenaline,2);
  assert.equal(card('entrance-mr-perfect').preMatchAdrenaline,2);
  assert.match(card('entrance-mr-perfect').rulesText,/\+2 Adrenaline/);

  const hhh=star('triple-h');
  assert.equal(hhh.hp,68);
  assert.equal(hhh.ability.trigger.damage,3);
  assert.match(hhh.ability.text,/\+3 Damage/);
});

test('v0.14.27 Austin can receive the Bottom Line reward three times',()=>{
  const game=new MatchEngine({p1:star('stone-cold-steve-austin'),p2:star('cm-punk'),decks,rng:()=>0.5});
  const s=game.state(), p=s.players.p1;
  p.deck=[card('running-forearm'),card('body-slam'),card('stomp'),card('clothesline')];
  p.hand=[];p.adrenaline=0;p.abilityUses=0;
  for(let i=0;i<3;i++) assert.equal(game._ability('p1','moveCountered',{card:card('punch')}),true);
  assert.equal(p.abilityUses,3);
  assert.equal(p.adrenaline,3);
  assert.equal(p.hand.length,3);
  assert.equal(game._ability('p1','moveCountered',{card:card('punch')}),false);
});

test('v0.14.27 Cerebral Assassin executes +3 damage, not text-only',()=>{
  const game=new MatchEngine({p1:star('triple-h'),p2:star('cm-punk'),decks,rng:()=>0.5});
  const s=game.state(), move=card('triple-h-spinebuster');
  s.playerInControl='p1';s.phase='RESOLVE_MOVE';
  s.players.p1.events.connectedMethodsThisControl.technical=true;
  s.proposedMove={attackerId:'p1',defenderId:'p2',card:move};
  const before=s.players.p2.hp;
  game._connect();
  assert.equal(before-s.players.p2.hp,move.damage+3);
});
