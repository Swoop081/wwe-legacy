import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.0.2';
import { autoCounterEligibility } from '../js/engine/rules.js?v=1.0.2';
import { applyCardTier } from '../js/data/variants.js?v=1.0.2';
import { allGameplayCards } from '../js/data/content.js?v=1.0.2';
import { superstars } from '../js/data/superstars.js?v=1.0.2';
import { decks } from '../js/data/decks.js?v=1.0.2';
import { reconstructCurrentPlayPile } from '../js/ui/play-pile.js?v=1.0.2';

const stars=Object.values(superstars);
const filler=i=>({id:`v10002-fill-${i}`,name:`Filler ${i}`,kind:'momentum',method:'strength',amount:1,tier:'normal'});
const hold=(over={})=>({id:'v10002-hold',name:'Regression Hold',kind:'move',cost:0,damage:0,method:'technical',requirements:{},moveType:'submission',counterState:'front-control',submissionTarget:'neck-head',submission:{bodyPart:'head',pressure:3},tier:'normal',...over});

test('v1.0.2 submission pressure draws one defender page before every response window',()=>{
  const game=new MatchEngine({p1:stars[0],p2:stars[1],decks,rng:()=>0.42});
  const s=game.state(),a=s.players.p1,d=s.players.p2;
  d.hp=50; d.hand=[filler(1)]; a.hand=[filler(10),filler(11),filler(12)];
  s.playerInControl='p1';s.phase='RESOLVE_MOVE';s.proposedMove={attackerId:'p1',defenderId:'p2',card:hold()};
  game._connect();
  assert.equal(s.phase,'SUBMISSION_RESPONSE'); assert.equal(d.hand.length,2);
  assert.equal(s.log.filter(e=>e.type==='SUBMISSION_DEFENDER_DRAW').length,1);
  game.passSubmissionResponse('p2'); game.maintainSubmission('p1',0);
  assert.equal(s.phase,'SUBMISSION_RESPONSE'); assert.equal(d.hand.length,3);
  assert.equal(s.log.filter(e=>e.type==='SUBMISSION_DEFENDER_DRAW').length,2);
});

test('v1.0.2 locked non-Finisher submissions can be Auto Countered but Finishers cannot',()=>{
  const game=new MatchEngine({p1:stars[0],p2:stars[1],decks,rng:()=>0.42});
  const s=game.state(),d=s.players.p2; d.hp=50; d.hand=Array.from({length:6},(_,i)=>filler(i));
  s.playerInControl='p1';s.phase='RESOLVE_MOVE';s.proposedMove={attackerId:'p1',defenderId:'p2',card:hold()}; game._connect();
  assert.equal(d.hand.length,7); assert.equal(autoCounterEligibility(s,'p2').legal,true);
  assert.equal(game.autoCounter('p2',[0,1,2,3,4]),true);
  assert.equal(s.submission,null); assert.equal(s.playerInControl,'p2'); assert.equal(s.phase,'ACTION'); assert.equal(s.players.p2.autoCounterUses,1);
  const fin=hold({id:'v10002-fin',name:'Finisher Hold',finisher:true});
  s.phase='SUBMISSION_RESPONSE'; s.submission={attackerId:'p1',defenderId:'p2',cardId:fin.id,card:fin,cardTier:'normal',bodyPart:'head',damage:3,finisher:true,holdTurn:1};
  s.players.p2.hand=Array.from({length:12},(_,i)=>filler(30+i));
  assert.equal(autoCounterEligibility(s,'p2').legal,false); assert.match(autoCounterEligibility(s,'p2').reason,/Finishers cannot be Auto Countered/);
});

test('v1.0.2 play pile retains the actual physical printing tier',()=>{
  const base=allGameplayCards.find(c=>c.id==='roman-reigns-guillotine'); assert.ok(base);
  const byId=new Map([[base.id,base]]);
  const state={log:[{type:'MOVE_DECLARED',playerId:'p1',cardId:base.id,cardTier:'normal'},{type:'MOVE_CONNECTED',playerId:'p1',attackerId:'p1',defenderId:'p2',cardId:base.id,cardTier:'normal'}],proposedMove:null};
  const pile=reconstructCurrentPlayPile(state,{cardById:byId});
  assert.equal(pile[0].cardTier,'normal');
  const actual=applyCardTier(pile[0].card,pile[0].cardTier); assert.equal(actual.submission.pressure,1); assert.equal(actual.tier,'normal');
});

test('v1.0.2 UI fixes are wired for tier text, pack inspection, live timer, submission overlay, and full-screen tier up',()=>{
  const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
  const css=fs.readFileSync(new URL('../css/game.css',import.meta.url),'utf8');
  assert.ok(app.includes('damage\\\\s+each'));
  assert.match(app,/data-pack-summary-inspect/); assert.match(app,/openPackSummaryInspector/);
  assert.match(app,/function formatLiveEventCountdown/); assert.match(app,/return `\$\{hours\}h:/);
  assert.match(app,/renderSubmissionResponseOverlay/); assert.match(app,/submission-auto-counter/);
  assert.match(css,/\.submission-defense-overlay\{position:fixed!important/);
  assert.match(css,/\.streamlined-pack-summary\{display:grid!important/); assert.match(css,/overflow:hidden!important/);
  assert.match(css,/booster-card-inspect-modal[\s\S]*60svh/);
  assert.match(css,/#tier-up-layer \.tier-up-celebration\{width:100%!important;min-height:100svh!important;height:100svh!important/);
  assert.match(css,/\.play-pile-modal-card\{width:min\(100%,calc\(72svh \* \.68\),380px\)!important;height:auto!important/);
});
