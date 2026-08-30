import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.1.44';
import { counterEligibility, autoCounterEligibility } from '../js/engine/rules.js?v=1.1.44';
import { superstars } from '../js/data/superstars.js?v=1.1.44';
import { decks } from '../js/data/decks.js?v=1.1.44';
import { allGameplayCards } from '../js/data/content.js?v=1.1.44';

const star=id=>Object.values(superstars).find(s=>s.id===id);
const card=id=>allGameplayCards.find(c=>c.id===id);
const make=()=>new MatchEngine({p1:star('razor-ramon'),p2:star('mankind'),decks,rng:()=>0.42});
const maxMomentum=p=>{p.momentum.strength=20;p.momentum.strike=20;p.momentum.technical=20;p.momentum.agility=20;p.adrenaline=20;};

test('v0.14.07 grounded Superstar stands automatically when gaining Control',()=>{
  const g=make(),s=g.state();
  s.playerInControl='p1'; s.players.p2.posture='on-mat';
  g._setControl('p2');
  assert.equal(s.players.p2.posture,'standing');
  assert.ok(s.log.some(x=>x.type==='POSTURE_RECOVERED'&&x.playerId==='p2'));
});

test('v0.14.07 Stun blocks both normal Counter and Auto Counter',()=>{
  const g=make(),s=g.state(),d=s.players.p2;
  const incoming={...card('body-slam'),instanceId:'incoming'};
  const response={...card('standing-switch'),instanceId:'response'};
  d.status.stunnedTurns=1; d.stun=1; d.hand=Array(8).fill(null).map((_,i)=>({...response,instanceId:`r${i}`})); maxMomentum(d);
  s.phase='COUNTER'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:incoming};
  const normal=counterEligibility(s,'p2',incoming,d.hand[0]);
  const auto=autoCounterEligibility(s,'p2',incoming);
  assert.equal(normal.legal,false); assert.match(normal.reason,/Stunned/i);
  assert.equal(auto.legal,false); assert.match(auto.reason,/Stunned/i);
});

test('v0.14.07 existing Stun clears after one successful opponent Move',()=>{
  const g=make(),s=g.state(),d=s.players.p2;
  d.status.stunnedTurns=1; d.stun=1;
  s.phase='RESOLVE_MOVE'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:{...card('body-slam'),instanceId:'hit'}};
  g._connect();
  assert.equal(d.status.stunnedTurns,0); assert.equal(d.stun,0);
});

test('v0.14.07 a fresh Stun inflicted by the same connecting Move survives',()=>{
  const g=make(),s=g.state(),d=s.players.p2;
  d.status.stunnedTurns=1; d.stun=1;
  s.phase='RESOLVE_MOVE'; s.proposedMove={attackerId:'p1',defenderId:'p2',card:{...card('powerbomb'),instanceId:'powerbomb'}};
  g._connect();
  assert.equal(d.status.stunnedTurns,1); assert.equal(d.stun,1);
});

test('v0.14.07 Stun clears when the stunned controller commits a legal Move',()=>{
  const g=make(),s=g.state(),p=s.players.p1,d=s.players.p2;
  p.status.stunnedTurns=1; p.stun=1; maxMomentum(p); d.posture='standing';
  const move={...card('body-slam'),instanceId:'body'}; p.hand=[move];
  s.playerInControl='p1'; s.phase='ACTION';
  assert.equal(g.declareMove('p1',move),true);
  assert.equal(p.status.stunnedTurns,0); assert.equal(p.stun,0);
});

test('v0.14.07 Stun clears when the stunned controller passes',()=>{
  const g=make(),s=g.state(),p=s.players.p1;
  p.status.stunnedTurns=1; p.stun=1; s.playerInControl='p1'; s.phase='ACTION';
  assert.equal(g.passTurn('p1'),true);
  assert.equal(p.status.stunnedTurns,0); assert.equal(p.stun,0);
});

test('v0.14.11 launch splash keeps the 50-tier Cena reward but removes redundant tier fact boxes',()=>{
  const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
  assert.match(app,/season-one-splash-v2/);
  assert.match(app,/50-tier Season Road/);
  assert.match(app,/TIER 50/);
  assert.match(app,/seasonOneCenaCardMarkup\("season-ad-cena"\)/);
  assert.doesNotMatch(app,/Climb the 100-tier Season Road/);
  assert.doesNotMatch(app,/season-splash-facts" aria-label="Season 1 details/);
});
