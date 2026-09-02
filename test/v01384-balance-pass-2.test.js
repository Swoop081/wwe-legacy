import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.1.132';
import { superstars } from '../js/data/superstars.js?v=1.1.132';
import { decks } from '../js/data/decks.js?v=1.1.132';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.1.132';
import { counterEligibility } from '../js/engine/rules.js?v=1.1.132';

const card=id=>allGameplayCards.find(c=>c.id===id);
const star=id=>Object.values(superstars).find(s=>s.id===id);
const rng=()=>0.41;

function engineFor(p1Id,p2Id='cm-punk'){
  return new MatchEngine({p1:star(p1Id),p2:star(p2Id),decks,rng});
}
function moveExistingCardToHand(player,id){
  for(const zone of ['deck','discard','outOfPlay']){
    const idx=player[zone].findIndex(c=>c.id===id);
    if(idx>=0){player.hand.push(player[zone].splice(idx,1)[0]);return player.hand.at(-1);}
  }
  const existing=player.hand.find(c=>c.id===id);
  if(existing)return existing;
  throw new Error(`Card ${id} is not present in player zones`);
}

test('v0.13.84 locks Balance Pass 2 numerical changes',()=>{
  assert.equal(card('andre-the-giant-sitdown-splash').cost,12);
  assert.equal(star('randy-savage').ability.trigger.maxUses,2);
  assert.equal(card('chyna-bomb').damage,16);
  assert.equal(star('penta').ability.trigger.adrenaline,0);
  assert.equal(star('penta').ability.trigger.bonusDamage,2);
  assert.equal(card('mr-perfect-perfect-plex').cost,7);
  assert.equal(card('mr-perfect-perfect-plex').damage,15);
  assert.equal(card('ted-dibiase-million-dollar-dream').cost,8);
  assert.equal(card('lola-vice-305').cost,8);
  assert.equal(card('lola-vice-305').damage,16);
  assert.equal(card('paige-paige-turner').damage,10);
  assert.equal(card('entrance-paige').preMatchAdrenaline,2);
  assert.equal(star('paige').entrance.preMatchAdrenaline,2);
  assert.equal(card('special-rowdy-roddy-piper').special.nextControlAdrenalineDrain,1); // superseded by v0.14.20
});

test('v0.14.20 Piper Pit shuts down one Counter this Control sequence and drains 1 Adrenaline on the opponent’s next Control',()=>{
  const g=engineFor('rowdy-roddy-piper','hulk-hogan');
  const s=g.state(),p=s.players.p1,d=s.players.p2;
  moveExistingCardToHand(p,'special-rowdy-roddy-piper');
  const known=moveExistingCardToHand(d,'punch');
  d.hand=[known,...d.hand.filter(c=>c!==known)];
  d.adrenaline=3; d.events.entranceAdrenalineGranted=true;
  s.phase='ACTION'; s.playerInControl='p1';
  const special=p.hand.find(c=>c.id==='special-rowdy-roddy-piper');
  assert.equal(g.playSpecial('p1',special),true);
  assert.equal(d.events.pipersPitLockedCounterId,'punch');
  assert.equal(d.events.pipersPitNextControlAdrenalineDrain,1);

  s.phase='COUNTER'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:card('body-slam'),isCounterAttack:false,counterDepth:0};
  const blocked=counterEligibility(s,'p2',s.proposedMove.card,known);
  assert.equal(blocked.legal,false);
  assert.match(blocked.reason,/Piper’s Pit/);

  g._setControl('p2');
  assert.equal(d.adrenaline,2);
  assert.equal(d.events.pipersPitLockedCounterId,undefined);
  assert.equal(d.events.pipersPitNextControlAdrenalineDrain,undefined);
  assert.ok(s.log.some(x=>x.effect==='pipers-pit-next-control-drain'&&x.adrenaline===-1));
});
