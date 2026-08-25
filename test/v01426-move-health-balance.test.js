import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.0.1';
import { superstars } from '../js/data/superstars.js?v=1.0.1';
import { decks } from '../js/data/decks.js?v=1.0.1';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.0.1';
import { moveEligibility, canCounter, counterEligibility } from '../js/engine/rules.js?v=1.0.1';
import { applyCardTier } from '../js/data/variants.js?v=1.0.1';

const card=id=>allGameplayCards.find(c=>c.id===id);
const star=id=>Object.values(superstars).find(s=>s.id===id);

test('v0.14.26 repairs confirmed printed move effects and restrictions',()=>{
  assert.deepEqual(card('bulldog').effects,[{type:'discardOpponent',amount:1}]);
  assert.deepEqual(card('cody-rhodes-disaster-kick').effects,[{type:'gainAdrenaline',amount:1}]);
  assert.equal(card('swanton-bomb').groundedOnly,true);
  assert.equal(card('swanton-bomb').moveType,'aerial');
  assert.deepEqual(card('running-uppercut').counterStates,['rear-control']);
  assert.deepEqual(card('running-uppercut').counterSubmissionTargets,['neck-head']);
  assert.deepEqual(card('oba-femi-one-handed-backbreaker').bodyDamage,{bodyPart:'back',amount:3});
  for(const id of ['owen-hart-missile-dropkick','corner-clothesline','dropkick-to-the-back','elbow']) assert.equal(card(id).standingOnly,true,id);
  assert.deepEqual(card('bron-breakker-breakkers-spear').discountIfMethodConnectedThisControl,{method:'agility',amount:2});
  assert.equal(card('bron-breakker-breakkers-spear').discountIfPriorAgility,undefined);
});

test('v0.14.26 printed effects execute in the match engine',()=>{
  const g=new MatchEngine({p1:star('cody-rhodes'),p2:star('cm-punk'),decks,rng:()=>0.5});
  const s=g.state(), p=s.players.p1, d=s.players.p2;
  d.hand=[card('punch'),card('dropkick')];
  g._effects('p1',card('bulldog'));
  assert.equal(d.hand.length,1,'Bulldog ditches one opponent page');
  const before=p.adrenaline;
  g._effects('p1',card('cody-rhodes-disaster-kick'));
  assert.equal(p.adrenaline,before+1,'Disaster Kick executes its additional Adrenaline');

  const oba=new MatchEngine({p1:star('oba-femi'),p2:star('cm-punk'),decks,rng:()=>0.5});
  const os=oba.state(); os.phase='RESOLVE_MOVE';os.playerInControl='p1';os.proposedMove={attackerId:'p1',defenderId:'p2',card:card('oba-femi-one-handed-backbreaker')};
  oba._connect();
  assert.equal(os.players.p2.submissionDamage.back,3,'One-Handed Backbreaker applies persistent Back damage');
});

test('v0.14.26 enforces Standing-only on ordinary Moves and restores Running Uppercut reversal text',()=>{
  const g=new MatchEngine({p1:star('owen-hart'),p2:star('cm-punk'),decks,rng:()=>0.5}); const s=g.state();
  s.phase='ACTION';s.playerInControl='p1';s.players.p1.momentum.agility=10;s.players.p1.adrenaline=20;
  s.players.p2.posture='on-mat';
  assert.equal(moveEligibility(s,'p1',card('owen-hart-missile-dropkick')).legal,false);
  s.players.p2.posture='standing';
  assert.equal(moveEligibility(s,'p1',card('owen-hart-missile-dropkick')).legal,true);
  const upper=card('running-uppercut');
  assert.equal(canCounter({kind:'move',counterState:'rear-control',moveType:'grapple'},upper),true);
  assert.equal(canCounter({kind:'move',counterState:'rear-control',moveType:'submission',submissionTarget:'neck-head'},upper),true);
});

test('v0.14.26 quick-pin cards receive a real -5 percentage-point kickout modifier',()=>{
  for(const id of ['schoolboy-roll-up','bridging-german-suplex','british-bulldog-crucifix']){
    const move=card(id);assert.equal(move.pinKickoutPenalty,5,id);
    const g=new MatchEngine({p1:star('owen-hart'),p2:star('cm-punk'),decks,rng:()=>0.5});const s=g.state();
    s.players.p2.hp=10;s.postMove={attackerId:'p1',defenderId:'p2',cardId:move.id};s.players.p1.discard.push(move);
    assert.equal(g._pinChance('p1'),40,id); // 45% at 10 HP, reduced by 5pp.
  }
});

test('v0.14.26 four-tier Damage and Submission Pressure scaling remains Normal/Emerald/Sapphire/Ruby = -2/-1/0/+1',()=>{
  const move={...card('bulldog')};
  assert.deepEqual(['normal','emerald','sapphire','ruby'].map(t=>applyCardTier(move,t).damage),[6,7,8,9]);
  const hold=card('rowdy-roddy-piper-sleeper-hold');
  assert.deepEqual(['normal','emerald','sapphire','ruby'].map(t=>applyCardTier(hold,t).submission.pressure),[5,6,7,8]);
});

test('v0.14.26 locks the approved lower-roster balance package',()=>{
  assert.equal(card('rowdy-roddy-piper-sleeper-hold').submission.pressure,7);
  assert.equal(star('rowdy-roddy-piper').ability.trigger.maxUses,3);
  assert.equal(star('owen-hart').hp,65);assert.equal(card('owen-hart-sharpshooter').submission.pressure,7);
  assert.equal(star('charlotte-flair').hp,66);assert.equal(star('charlotte-flair').ability.trigger.maxUses,3);
  assert.equal(star('iyo-sky').ability.trigger.maxUses,3);assert.equal(card('iyo-sky-over-the-moonsault').damage,17);
  assert.equal(star('stone-cold-steve-austin').entrance.preMatchAdrenaline,2);assert.equal(card('entrance-stone-cold-steve-austin').preMatchAdrenaline,2);
  assert.equal(star('jake-roberts').hp,66);assert.equal(card('jake-roberts-ddt').damage,17);
  assert.equal(star('triple-h').hp,68);assert.equal(star('triple-h').ability.trigger.damage,3);
});

test('v0.14.26/27 Cerebral Assassin current Grapple damage is executed, not text-only',()=>{
  const g=new MatchEngine({p1:star('triple-h'),p2:star('cm-punk'),decks,rng:()=>0.5});const s=g.state(), move=card('triple-h-spinebuster');
  s.playerInControl='p1';s.phase='RESOLVE_MOVE';s.players.p1.events.connectedMethodsThisControl.technical=true;s.proposedMove={attackerId:'p1',defenderId:'p2',card:move};
  const before=s.players.p2.hp;g._connect();
  assert.equal(before-s.players.p2.hp,move.damage+3);
});

test('v0.14.26 Bron Breakker prior-Agility Finisher discount uses the live runtime field',()=>{
  const g=new MatchEngine({p1:star('bron-breakker'),p2:star('cm-punk'),decks,rng:()=>0.5});const s=g.state(), spear=card('bron-breakker-breakkers-spear');
  s.playerInControl='p1';s.phase='ACTION';s.players.p1.adrenaline=99;s.players.p1.momentum.strength=99;
  assert.equal(moveEligibility(s,'p1',spear).effectiveCost,10);
  s.players.p1.events.connectedMethodsThisControl.agility=true;
  assert.equal(moveEligibility(s,'p1',spear).effectiveCost,8);
});


test('v0.14.26 standing-only setup chains stay playable while Counter windows ignore stale posture flags',()=>{
  const sami=new MatchEngine({p1:star('sami-zayn'),p2:star('cm-punk'),decks,rng:()=>0.5});
  const ss=sami.state(), hell=card('sami-zayn-helluva-kick');
  ss.phase='ACTION';ss.playerInControl='p1';ss.players.p1.adrenaline=99;for(const m of ['strength','strike','technical','agility'])ss.players.p1.momentum[m]=99;
  ss.players.p2.posture='on-mat';ss.players.p1.events.connectedCardNamesThisControl['Exploder Suplex Into Turnbuckle']=true;
  assert.equal(moveEligibility(ss,'p1',hell).legal,true,'Helluva remains usable after its authored Exploder setup');

  const jade=new MatchEngine({p1:star('jade-cargill'),p2:star('cm-punk'),decks,rng:()=>0.5});
  const js=jade.state(), jaded=card('jade-cargill-jaded');js.phase='ACTION';js.playerInControl='p1';js.players.p1.adrenaline=99;for(const m of ['strength','strike','technical','agility'])js.players.p1.momentum[m]=99;
  js.players.p2.posture='grounded';js.players.p1.events.connectedCardNamesThisControl['Pump Kick']=true;
  assert.equal(moveEligibility(js,'p1',jaded).legal,true,'Jaded remains usable after Pump Kick');

  const gold=new MatchEngine({p1:star('goldberg'),p2:star('cm-punk'),decks,rng:()=>0.5});
  const gs=gold.state();gs.phase='ACTION';gs.playerInControl='p1';gs.players.p1.adrenaline=99;for(const m of ['strength','strike','technical','agility'])gs.players.p1.momentum[m]=99;gs.players.p2.posture='on-mat';
  gs.players.p1.events.connectedCardNamesThisControl['Military Press Powerslam']=true;
  assert.equal(moveEligibility(gs,'p1',card('goldberg-spear')).legal,true);
  gs.players.p1.events.connectedCardNamesThisControl['Goldberg’s Spear']=true;
  assert.equal(moveEligibility(gs,'p1',card('goldberg-jackhammer')).legal,true);

  const randy=new MatchEngine({p1:star('cm-punk'),p2:star('randy-orton'),decks,rng:()=>0.5});
  const rs=randy.state(), incoming=card('punch'), rko=card('randy-orton-rko'), special=card('special-randy-orton');
  rs.phase='COUNTER';rs.playerInControl='p1';rs.proposedMove={attackerId:'p1',defenderId:'p2',card:incoming};rs.players.p1.posture='on-mat';rs.players.p2.hand=[rko,special];rs.players.p2.specialUsed=false;for(const m of ['strength','strike','technical','agility'])rs.players.p2.momentum[m]=99;
  assert.equal(counterEligibility(rs,'p2',incoming,rko).legal,true,'RKO Counter legality is driven by the incoming Move, not a stale attacker posture flag');
});
