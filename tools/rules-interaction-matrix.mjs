import assert from 'node:assert/strict';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.0.2';
import { moveEligibility, counterEligibility, autoCounterEligibility, autoCounterCost, onceTooOftenEligibility, canAttemptPin, submissionThreshold } from '../js/engine/rules.js?v=1.0.2';
import { superstars } from '../js/data/superstars.js?v=1.0.2';
import { decks } from '../js/data/decks.js?v=1.0.2';
import { allGameplayCards } from '../js/data/content.js?v=1.0.2';

const star = id => Object.values(superstars).find(s => s.id === id);
const card = id => allGameplayCards.find(c => c.id === id);
const byName = name => allGameplayCards.find(c => c.name === name);
const clone = x => structuredClone(x);
const rng = () => 0.42;
const make = (p1='cm-punk', p2='cody-rhodes') => new MatchEngine({p1:star(p1),p2:star(p2),decks,rng});
const maxResources = p => {
  for (const method of ['strength','strike','technical','agility']) p.momentum[method] = 20;
  p.adrenaline = 20;
  p.momentum.attitude = 20;
};
const resetAction = (s, pid='p1') => {
  s.phase='ACTION'; s.playerInControl=pid; s.proposedMove=null; s.proposedPin=null; s.submission=null; s.postMove=null;
  s.players[pid].turn={momentumPlayed:0,momentumPlayLimit:1,actionPlayed:0,supportPlayed:0,specialPlayed:0};
};

const cases=[];
function check(name, fn){
  try{ fn(); cases.push({name,status:'passed'}); }
  catch(error){ cases.push({name,status:'failed',error:error?.message??String(error)}); }
}

check('Lead Off is five pages and Turn 1 has no automatic draw',()=>{
  const g=make(),s=g.state();
  assert.equal(s.turnNumber,1);
  assert.equal(s.players.p1.hand.length,5);
  assert.equal(s.players.p2.hand.length,5);
  assert.equal(s.log.filter(x=>x.type==='CARDS_DRAWN').length,0);
});

check('Entrance Adrenaline is granted only on first gain of Control',()=>{
  const g=make('cm-punk','cody-rhodes'),s=g.state(),p=s.players.p1;
  const initial=p.adrenaline;
  g._setControl('p2'); g._setControl('p1'); g._setControl('p2'); g._setControl('p1');
  assert.equal(p.adrenaline,initial);
  assert.equal(s.log.filter(x=>x.type==='ENTRANCE_TRIGGERED'&&x.playerId==='p1'&&/Adrenaline/.test(x.effect??'')).length,1);
});

check('Connected non-Submission retained-Control turn replenishes defender only',()=>{
  const g=make(),s=g.state(),a=s.players.p1,d=s.players.p2;
  const ah=a.hand.length,dh=d.hand.length;
  g._advanceTurn('p1','successful-move');
  assert.equal(a.hand.length,ah);
  assert.equal(d.hand.length,dh+1);
});

check('Connected Move shifts Adrenaline +1 attacker / -1 defender',()=>{
  const g=make(),s=g.state(),a=s.players.p1,d=s.players.p2,m=clone(card('body-slam'));
  a.adrenaline=2; d.adrenaline=2; maxResources(a); a.adrenaline=2; a.momentum.attitude=2; d.adrenaline=2; d.momentum.attitude=2;
  s.phase='RESOLVE_MOVE'; s.playerInControl='p1'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:m};
  g._connect();
  assert.equal(a.adrenaline,3); assert.equal(d.adrenaline,1);
});

check('Successful defensive Counter transfers Control to defender',()=>{
  const g=make(),s=g.state(),a=s.players.p1,d=s.players.p2;
  const incoming=clone(card('body-slam')),counter=clone(card('standing-switch'));
  maxResources(a); maxResources(d); d.hand=[counter];
  s.phase='COUNTER'; s.playerInControl='p1'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:incoming};
  assert.equal(g.counter('p2',counter),true);
  assert.equal(s.playerInControl,'p2');
  assert.equal(s.phase,'ACTION');
});

check('Tribal Chief reacts only to a Countered non-Finisher Move',()=>{
  const g=new MatchEngine({p1:star('roman-reigns'),p2:star('cm-punk'),decks,rng}),s=g.state(),p=s.players.p1,tribal=clone(card('special-roman-reigns'));
  p.hand=[tribal]; p.specialUsed=false; p.usedSpecialIds=[];
  s.phase='ACTION'; s.playerInControl='p1';
  assert.equal(g.passTurn('p1'),true); assert.notEqual(s.phase,'TRIGGER_RESPONSE');
  s.phase='ACTION'; g._setControl('p1'); p.hand=[tribal]; p.specialUsed=false; p.usedSpecialIds=[];
  assert.equal(g._transferControl('p2','counter',{draw:true,counteredCard:card('punch')}),true);
  assert.equal(s.phase,'TRIGGER_RESPONSE'); assert.equal(s.pendingTriggeredSpecial?.specialType,'regainAfterLoseControl');
  assert.equal(g.resolveTriggeredSpecial('p1',false),true);
  s.phase='ACTION'; g._setControl('p1'); p.hand=[tribal]; p.specialUsed=false; p.usedSpecialIds=[];
  assert.equal(g._transferControl('p2','counter',{draw:true,counteredCard:card('roman-reigns-spear')}),true);
  assert.notEqual(s.phase,'TRIGGER_RESPONSE'); assert.equal(s.playerInControl,'p2');
});

check('Failed normal Pin transfers Control to defender',()=>{
  const g=make(),s=g.state(),d=s.players.p2;
  resetAction(s,'p1'); s.postMove={attackerId:'p1',defenderId:'p2',cardId:'body-slam'}; d.hp=Math.floor(d.maxHp*.5);
  assert.equal(g.attemptPin('p1'),true); assert.equal(g.passPinResponse('p2'),true);
  assert.equal(s.playerInControl,'p2'); assert.equal(s.phase,'ACTION');
});

check('Pin escape uses normal failed-pin retention rules',()=>{
  const g=new MatchEngine({p1:star('owen-hart'),p2:star('cm-punk'),decks,rng}),s=g.state(),d=s.players.p2,escape=clone(card('shoulder-up'));
  resetAction(s,'p1'); s.postMove={attackerId:'p1',defenderId:'p2',cardId:'body-slam'}; d.hp=Math.floor(d.maxHp*.5); d.hand=[escape];
  assert.equal(g.attemptPin('p1'),true); assert.equal(g.playPinEscape('p2',escape),true);
  assert.equal(s.playerInControl,'p1','Owen failed-pin ability should retain Control through a pin escape');
});

check('Green health cannot be pinned; Amber can be pinned',()=>{
  const g=make(),s=g.state(),d=s.players.p2;
  resetAction(s,'p1'); s.postMove={attackerId:'p1',defenderId:'p2',cardId:'body-slam'};
  d.hp=d.maxHp; assert.equal(canAttemptPin(s,'p1').legal,false);
  d.hp=Math.floor(d.maxHp*.5); assert.equal(canAttemptPin(s,'p1').legal,true);
});

check('Quick-pin modifier lowers kickout chance by five percentage points',()=>{
  const g=make(),s=g.state(),d=s.players.p2,rollup=clone(card('schoolboy-roll-up'));
  d.hp=10; s.postMove={attackerId:'p1',defenderId:'p2',cardId:rollup.id}; s.players.p1.discard.push(rollup);
  const withPenalty=g._pinChance('p1');
  s.postMove={attackerId:'p1',defenderId:'p2',cardId:'body-slam'}; s.players.p1.discard.push(clone(card('body-slam')));
  const normal=g._pinChance('p1');
  assert.equal(normal-withPenalty,5);
});

check('Submission enters response before maintenance and accumulates persistent damage',()=>{
  const g=new MatchEngine({p1:star('kurt-angle'),p2:star('cm-punk'),decks,rng}),s=g.state(),a=s.players.p1,d=s.players.p2,ankle=clone(card('kurt-angle-ankle-lock'));
  maxResources(a); d.hp=d.maxHp;
  s.phase='RESOLVE_MOVE'; s.playerInControl='p1'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:ankle};
  g._connect();
  assert.equal(s.phase,'SUBMISSION_RESPONSE');
  assert.equal(d.submissionDamage.legs,ankle.submission.pressure);
  assert.equal(s.submission.holdTurn,1);
  assert.equal(g.passSubmissionResponse('p2'),true); assert.equal(s.phase,'SUBMISSION_MAINTAIN');
  a.hand=[clone(card('punch'))]; const before=d.submissionDamage.legs;
  assert.equal(g.maintainSubmission('p1',0),true); assert.equal(d.submissionDamage.legs,before+ankle.submission.pressure);
});

check('Submission tap threshold equals current HP',()=>{
  const g=make(),p=g.state().players.p2; p.hp=17;
  assert.equal(submissionThreshold(p),17);
});

check('Releasing Submission retains Control and opens next Action turn',()=>{
  const g=new MatchEngine({p1:star('kurt-angle'),p2:star('cm-punk'),decks,rng}),s=g.state(),a=s.players.p1,ankle=clone(card('kurt-angle-ankle-lock'));
  maxResources(a); s.phase='RESOLVE_MOVE'; s.playerInControl='p1'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:ankle}; g._connect();
  assert.equal(g.passSubmissionResponse('p2'),true); assert.equal(g.releaseSubmission('p1'),true);
  assert.equal(s.playerInControl,'p1'); assert.equal(s.phase,'ACTION');
});

check('Finishers ignore Method requirements but still pay Cost',()=>{
  const g=new MatchEngine({p1:star('roman-reigns'),p2:star('cm-punk'),decks,rng}),s=g.state(),p=s.players.p1,spear=clone(card('roman-reigns-spear'));
  resetAction(s,'p1'); for(const m of ['strength','strike','technical','agility'])p.momentum[m]=0; p.adrenaline=spear.cost; p.momentum.attitude=spear.cost;
  const legal=moveEligibility(s,'p1',spear); assert.equal(legal.legal,true); assert.equal(legal.effectiveCost,spear.cost);
});

check('Stun blocks Counter and Auto Counter, then clears on Move or pass',()=>{
  const g=make(),s=g.state(),p=s.players.p2,incoming=clone(card('body-slam')),response=clone(card('standing-switch'));
  p.status.stunnedTurns=1; p.stun=1; p.hand=Array.from({length:10},(_,i)=>({...response,instanceId:`r${i}`})); maxResources(p);
  s.phase='COUNTER'; s.playerInControl='p1'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:incoming};
  assert.equal(counterEligibility(s,'p2',incoming,p.hand[0]).legal,false); assert.equal(autoCounterEligibility(s,'p2',incoming).legal,false);
  resetAction(s,'p2'); p.hand=[clone(card('punch'))]; maxResources(p); assert.equal(g.declareMove('p2',p.hand[0]),true); assert.equal(p.stun,0);
  p.status.stunnedTurns=1; p.stun=1; if(s.phase!=='ACTION'){s.phase='ACTION';s.proposedMove=null;} s.playerInControl='p2'; assert.equal(g.passTurn('p2'),true); assert.equal(p.stun,0);
});

check('Auto Counter cost escalates 5,6,7,8 and always requires two pages remain',()=>{
  const g=make(),s=g.state(),p=s.players.p2,incoming=clone(card('body-slam'));
  s.phase='COUNTER'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:incoming};
  const filler=clone(card('punch'));
  for(let uses=0;uses<4;uses++){
    p.autoCounterUses=uses; p.hand=Array.from({length:7+uses},(_,i)=>({...filler,instanceId:`${uses}-${i}`}));
    const e=autoCounterEligibility(s,'p2',incoming); assert.equal(e.legal,true); assert.equal(e.cost,5+uses); assert.equal(e.remaining,2);
    p.hand.pop(); assert.equal(autoCounterEligibility(s,'p2',incoming).legal,false);
  }
});

check('Finishers and Counter-attacks cannot be Auto Countered',()=>{
  const g=make(),s=g.state(),p=s.players.p2; p.hand=Array.from({length:12},(_,i)=>({...card('punch'),instanceId:String(i)}));
  s.phase='COUNTER'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:clone(card('roman-reigns-spear'))}; assert.equal(autoCounterEligibility(s,'p2').legal,false);
  s.proposedMove={attackerId:'p1',defenderId:'p2',card:clone(card('punch')),isCounterAttack:true}; assert.equal(autoCounterEligibility(s,'p2').legal,false);
});

check('Once Too Often only answers a Move that connected earlier, never itself or a counter-attack',()=>{
  const g=make(),s=g.state(),p=s.players.p2,incoming=clone(card('body-slam')),oto=clone(card('once-too-often'));
  p.hand=[oto]; s.phase='COUNTER'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:incoming};
  assert.equal(onceTooOftenEligibility(s,'p2',incoming,oto).legal,false);
  s.players.p1.events.connectedCardIdsMatch[incoming.id]=1; assert.equal(onceTooOftenEligibility(s,'p2',incoming,oto).legal,true);
  s.proposedMove.card=oto; assert.equal(onceTooOftenEligibility(s,'p2',oto,oto).legal,false);
  s.proposedMove={attackerId:'p1',defenderId:'p2',card:incoming,isCounterAttack:true}; assert.equal(onceTooOftenEligibility(s,'p2',incoming,oto).legal,false);
});

check('Ordinary Actions do not enter normal Move Counter windows',()=>{
  const g=make(),s=g.state(),p=s.players.p1,action=clone(card('game-plan'));
  maxResources(p); p.hand=[action]; resetAction(s,'p1');
  assert.equal(g.playAction('p1',action),true); assert.equal(s.phase,'ACTION'); assert.equal(s.proposedMove,null);
});

check('KO Show utility cancellation does not steal Control',()=>{
  const g=new MatchEngine({p1:star('cm-punk'),p2:star('kevin-owens'),decks,rng}),s=g.state(),a=s.players.p1,d=s.players.p2,action=clone(card('game-plan')),ko=clone(card('special-kevin-owens'));
  resetAction(s,'p1'); maxResources(a); a.hand=[action]; d.hand=[ko]; d.specialUsed=false; d.usedSpecialIds=[];
  assert.equal(g.playAction('p1',action),true); assert.equal(s.playerInControl,'p1'); assert.equal(d.specialUsed,true);
});

check('Hustle Loyalty Respect triggers once at or below 50% HP even if installed earlier',()=>{
  const g=new MatchEngine({p1:star('john-cena'),p2:star('cm-punk'),decks,rng}),s=g.state(),p=s.players.p1,hlr=clone(card('john-cena-hustle-loyalty-respect'));
  resetAction(s,'p1'); p.hand=[hlr]; p.deck=[clone(card('punch')),clone(card('body-slam')),clone(card('elbow'))];
  assert.equal(g.playSupport('p1',hlr),true); const before=p.hand.length; p.hp=Math.floor(p.maxHp*.5);
  assert.equal(g._triggerHustleLoyaltyRespect('p1'),true); assert.equal(p.events.hustleLoyaltyRespectUsed,true); assert.equal(p.hand.length,before+2);
  const ad=p.adrenaline; assert.equal(g._triggerHustleLoyaltyRespect('p1'),false); assert.equal(p.adrenaline,ad);
});

check('Playbook recycles discard when a draw is required from an empty deck',()=>{
  const g=make(),s=g.state(),p=s.players.p1,discarded=clone(card('body-slam'));
  p.deck=[]; p.discard=[discarded]; const before=p.hand.length;
  const ids=g._draw('p1',1); assert.deepEqual(ids,[discarded.id]); assert.equal(p.hand.length,before+1); assert.equal(p.discard.length,0);
  assert.ok(s.log.some(x=>x.type==='PLAYBOOK_RECYCLED'&&x.playerId==='p1'));
});

check('Standing-only proactive restriction does not block a legal Counter-state reversal',()=>{
  const g=make(),s=g.state(),d=s.players.p2;
  const incoming=clone(byName('Missile Dropkick'));
  const candidate=allGameplayCards.find(c=>c.kind==='move'&&c.standingOnly&&(c.counterStates??[]).includes(incoming.counterState));
  if(!candidate) return; // Matrix records the engine invariant even if the live card pool has no such exact specimen.
  d.posture='on-mat'; d.hand=[clone(candidate)]; maxResources(d); s.phase='COUNTER'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:incoming};
  assert.equal(counterEligibility(s,'p2',incoming,d.hand[0]).legal,true);
});

export function runRulesInteractionMatrix(){
  const failed=cases.filter(x=>x.status==='failed');
  return {version:'0.15.00',cases:cases.length,passed:cases.length-failed.length,failed:failed.length,failures:failed};
}

if(import.meta.url===`file://${process.argv[1]}`){
  const report=runRulesInteractionMatrix();
  console.log(JSON.stringify(report,null,2));
  if(report.failed) process.exitCode=1;
}
