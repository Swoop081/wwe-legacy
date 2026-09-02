import test from "node:test";
import assert from "node:assert/strict";
import { MatchEngine } from "../js/engine/MatchEngine.js?v=1.1.101";
import { autoCounterEligibility, submissionThreshold } from "../js/engine/rules.js?v=1.1.101";
import { healthOnlyPinChance } from "../js/engine/health.js?v=1.1.101";
import { superstars } from "../js/data/superstars.js?v=1.1.101";
import { decks } from "../js/data/decks.js?v=1.1.101";
import { allGameplayCards } from "../js/data/content.js?v=1.1.101";

const star=id=>Object.values(superstars).find(s=>s.id===id);
const filler=i=>({id:`lock-fill-${i}`,name:`Filler ${i}`,kind:"momentum",method:"strength",amount:1});
const hold=(over={})=>({id:"lock-hold",name:"Locked Hold",kind:"move",cost:0,damage:0,method:"technical",requirements:{},moveType:"submission",counterState:"front-control",submissionTarget:"neck-head",submission:{bodyPart:"head",pressure:4},...over});

test("v1.1.93 Lead Off is five pages each and Turn 1 has no automatic draw",()=>{
  const g=new MatchEngine({p1:star("roman-reigns"),p2:star("cody-rhodes"),decks,rng:()=>0.42});
  const s=g.state();
  assert.equal(s.turnNumber,1);
  assert.equal(s.players.p1.hand.length,5);
  assert.equal(s.players.p2.hand.length,5);
  assert.equal(s.phase,"ACTION");
  assert.equal(s.playerInControl,"p1");
  assert.equal(s.log.filter(e=>e.type==="CARDS_DRAWN").length,0);
});

test("v1.1.93 passing transfers Control and performs the normal global draw",()=>{
  const g=new MatchEngine({p1:star("roman-reigns"),p2:star("cody-rhodes"),decks,rng:()=>0.42});
  const s=g.state(),h1=s.players.p1.hand.length,h2=s.players.p2.hand.length;
  assert.equal(g.passTurn("p1"),true);
  assert.equal(s.playerInControl,"p2");
  assert.equal(s.players.p1.hand.length,h1+1);
  assert.equal(s.players.p2.hand.length,h2+1);
});

test("v1.1.93 retained Control after a successful non-submission Move draws only the defender",()=>{
  const g=new MatchEngine({p1:star("roman-reigns"),p2:star("cody-rhodes"),decks,rng:()=>0.42});
  const s=g.state(),a=s.players.p1,d=s.players.p2,ah=a.hand.length,dh=d.hand.length;
  assert.equal(g._advanceTurn("p1","successful-move"),true);
  assert.equal(a.hand.length,ah);
  assert.equal(d.hand.length,dh+1);
  assert.equal(s.playerInControl,"p1");
});

test("v1.1.93 Momentum is permanent across turns and limited to one placement per normal turn",()=>{
  const g=new MatchEngine({p1:star("roman-reigns"),p2:star("cody-rhodes"),decks,rng:()=>0.42});
  const s=g.state(),p=s.players.p1;
  const m1={id:"lock-m1",name:"Strength Momentum",kind:"momentum",method:"strength",amount:1};
  const m2={id:"lock-m2",name:"Strength Momentum 2",kind:"momentum",method:"strength",amount:1};
  p.hand.push(m1,m2);
  const before=p.momentum.strength;
  assert.equal(g.playMomentum("p1",m1),true);
  assert.equal(g.playMomentum("p1",m2),false);
  assert.equal(p.momentum.strength,before+1);
  g.passTurn("p1"); g.passTurn("p2");
  assert.equal(p.momentum.strength,before+1,"Momentum threshold persists after Control cycles");
  assert.equal(p.turn.momentumPlayed,0);
});

test("v1.1.93 failed ordinary pin transfers Control to the defender",()=>{
  const g=new MatchEngine({p1:star("roman-reigns"),p2:star("cody-rhodes"),decks,rng:()=>0.99});
  const s=g.state(),d=s.players.p2;
  s.phase="ACTION"; s.playerInControl="p1"; s.postMove={attackerId:"p1",defenderId:"p2",cardId:null};
  s.players.p1.turn={momentumPlayed:0,momentumPlayLimit:1,actionPlayed:0,supportPlayed:0,specialPlayed:0};
  d.hp=Math.floor(d.maxHp*.5);
  assert.equal(g.attemptPin("p1"),true);
  assert.equal(g.passPinResponse("p2"),true);
  assert.equal(s.playerInControl,"p2");
  assert.equal(s.phase,"ACTION");
});

test("v1.1.93 pin chance table retains locked actual-HP values",()=>{
  const p={hp:0,maxHp:70}; assert.equal(healthOnlyPinChance(p),75);
  p.hp=4; assert.equal(healthOnlyPinChance(p),75);
  p.hp=5; assert.equal(healthOnlyPinChance(p),70);
  p.hp=10; assert.equal(healthOnlyPinChance(p),45);
  p.hp=15; assert.equal(healthOnlyPinChance(p),20);
  p.hp=16; assert.equal(healthOnlyPinChance(p),5);
});

test("v1.1.93 submissions use current HP, persist body-part damage, and draw defender on pressure",()=>{
  const g=new MatchEngine({p1:star("roman-reigns"),p2:star("cody-rhodes"),decks,rng:()=>0.42});
  const s=g.state(),a=s.players.p1,d=s.players.p2;
  d.hp=30; a.hand=[filler(1),filler(2),filler(3)];
  assert.equal(submissionThreshold(d),30);
  s.playerInControl="p1"; s.phase="RESOLVE_MOVE"; s.proposedMove={attackerId:"p1",defenderId:"p2",card:hold()};
  const dh=d.hand.length; g._connect();
  assert.equal(d.submissionDamage.head,4);
  assert.equal(d.hand.length,dh+1);
  g.passSubmissionResponse("p2"); g.maintainSubmission("p1",0);
  assert.equal(d.submissionDamage.head,8);
  g.passSubmissionResponse("p2"); g.releaseSubmission("p1");
  assert.equal(d.submissionDamage.head,8,"release does not heal worked body part");
});

test("v1.1.93 Auto Counter cost escalates 5,6,7,8; requires two pages remaining; Finishers and Stun block it",()=>{
  const g=new MatchEngine({p1:star("roman-reigns"),p2:star("cody-rhodes"),decks,rng:()=>0.42});
  const s=g.state(),d=s.players.p2;
  const incoming={id:"lock-incoming",name:"Incoming",kind:"move",cost:4,damage:6,method:"strength",requirements:{},counterState:"torso-trapped"};
  s.phase="COUNTER"; s.playerInControl="p1"; s.proposedMove={attackerId:"p1",defenderId:"p2",card:incoming};
  for(let uses=0;uses<4;uses++){
    d.autoCounterUses=uses; d.hand=Array.from({length:7+uses},(_,i)=>filler(i));
    const e=autoCounterEligibility(s,"p2");
    assert.equal(e.cost,5+uses); assert.equal(e.legal,true);
    d.hand=d.hand.slice(0,6+uses); assert.equal(autoCounterEligibility(s,"p2").legal,false);
  }
  d.autoCounterUses=0; d.hand=Array.from({length:10},(_,i)=>filler(i));
  s.proposedMove.card={...incoming,finisher:true};
  assert.equal(autoCounterEligibility(s,"p2").legal,false);
  s.proposedMove.card=incoming; d.status.stunnedTurns=1; d.stun=1;
  assert.equal(autoCounterEligibility(s,"p2").legal,false);
});

test("v1.1.93 Stun clears on pass or committed Move, and grounded wrestler stands on Control gain",()=>{
  const g=new MatchEngine({p1:star("roman-reigns"),p2:star("cody-rhodes"),decks,rng:()=>0.42});
  const s=g.state(),p=s.players.p1,d=s.players.p2;
  p.status.stunnedTurns=1;p.stun=1;
  assert.equal(g.passTurn("p1"),true);
  assert.equal(p.stun,0); assert.equal(p.status.stunnedTurns,0);
  d.posture="on-mat";
  g._setControl("p1"); g._setControl("p2");
  assert.equal(d.posture,"standing");
});
