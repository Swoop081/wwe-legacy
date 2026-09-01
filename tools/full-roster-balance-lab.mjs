import { isMainThread, parentPort, workerData, Worker } from 'node:worker_threads';
import os from 'node:os';
import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js';
import { decks } from '../js/data/decks.js';
import { MatchEngine } from '../js/engine/MatchEngine.js';
import { decisionOwner, cpuDecision, executeCpuDecision } from '../js/ai/WrestlingAI.js';

const ACTIVE_SET_IDS=new Set(["evolution-series-1","attitude-era-series-1","ruthless-aggression-series-1","golden-era-series-1","summerslam-series-1","raw-series-1","smackdown-series-1","new-generation-series-1","nxt-series-1","worlds-collide-series-1"]);
const stars=Object.values(superstars).filter(s=>Array.isArray(decks[s.id])&&decks[s.id].length===60&&(ACTIVE_SET_IDS.has(s.setId)||s.id==="aj-styles"));
const gamesPerPair=Number(process.env.BALANCE_GAMES_PER_PAIR||20);
const maxSteps=2000;
function seededRng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
function emptyStar(s){return {id:s.id,name:s.name,setId:s.setId,wins:0,losses:0,draws:0,turns:0,matches:0,p1Wins:0,p1Matches:0};}
function simulatePairs(pairs){
 const stats=Object.fromEntries(stars.map(s=>[s.id,emptyStar(s)])); const finishes={}; let matches=0,stalls=0,totalTurns=0;
 for(const [i,j] of pairs){for(let g=0;g<gamesPerPair;g++){
   const flip=g%2===1, p1=flip?stars[j]:stars[i], p2=flip?stars[i]:stars[j];
   const engine=new MatchEngine({p1,p2,decks,rng:seededRng(117900000+i*100003+j*1009+g*37)});
   let steps=0; while(engine.state().phase!=='MATCH_OVER'&&steps++<maxSteps){const pid=decisionOwner(engine.state()); const d=cpuDecision(engine,pid); if(!d||!executeCpuDecision(engine,d,pid))break;}
   const state=engine.state(); matches++; totalTurns+=state.turnNumber; stats[p1.id].matches++;stats[p2.id].matches++;stats[p1.id].turns+=state.turnNumber;stats[p2.id].turns+=state.turnNumber;stats[p1.id].p1Matches++;
   if(state.phase!=='MATCH_OVER'){stalls++;continue;} const finish=state.finish?.type??'unknown';finishes[finish]=(finishes[finish]??0)+1;
   if(!state.winner){stats[p1.id].draws++;stats[p2.id].draws++;continue;} const wid=state.players[state.winner].superstar.id; const lid=state.players[state.winner==='p1'?'p2':'p1'].superstar.id;stats[wid].wins++;stats[lid].losses++;if(state.winner==='p1')stats[p1.id].p1Wins++;
 }} return {stats,finishes,matches,stalls,totalTurns};
}
function deckMetrics(s){const deck=decks[s.id];const moves=deck.filter(c=>c?.kind==='move');const momentum=deck.filter(c=>c?.kind==='momentum');const actions=deck.filter(c=>c?.kind==='action'||c?.kind==='special');const counters=deck.filter(c=>c?.counterStates?.length||/counter|reverse|reversal|shoulder up|kick out|dodge|duck|block|switch|jawbreaker/i.test(`${c?.name} ${c?.rulesText}`));const req={strength:0,strike:0,technical:0,agility:0};for(const c of moves)for(const k of Object.keys(req))if((c.requirements?.[k]??0)>0)req[k]++;
 const costs=moves.map(c=>Number(c.cost)||0), dmg=moves.map(c=>Number(c.damage)||0);const unique=new Set(deck.map(c=>c.id)).size;const starSpecific=moves.filter(c=>c.superstarId===s.id).length;
 return {deckSize:deck.length,uniqueCards:unique,moves:moves.length,momentum:momentum.length,actions:actions.length,counters:counters.length,avgMoveCost:+(costs.reduce((a,b)=>a+b,0)/Math.max(1,costs.length)).toFixed(2),avgMoveDamage:+(dmg.reduce((a,b)=>a+b,0)/Math.max(1,dmg.length)).toFixed(2),damagePerCost:+(dmg.reduce((a,b)=>a+b,0)/Math.max(1,costs.reduce((a,b)=>a+b,0))).toFixed(3),highCostMoves:costs.filter(x=>x>=7).length,lowCostMoves:costs.filter(x=>x<=3).length,groundingMoves:moves.filter(c=>c.groundOpponent).length,groundedOnly:moves.filter(c=>c.groundedOnly).length,starSpecificMoves:starSpecific,methodMoveCounts:req};}
if(!isMainThread){parentPort.postMessage(simulatePairs(workerData.pairs));}
else{
 const pairs=[];for(let i=0;i<stars.length;i++)for(let j=i+1;j<stars.length;j++)pairs.push([i,j]);
 const workers=Math.max(1,Math.min(Number(process.env.BALANCE_WORKERS||Math.min(8,os.cpus().length)),pairs.length));
 const shards=Array.from({length:workers},()=>[]);pairs.forEach((p,i)=>shards[i%workers].push(p));
 const results=await Promise.all(shards.map(p=>new Promise((resolve,reject)=>{const w=new Worker(new URL(import.meta.url),{workerData:{pairs:p}});w.on('message',resolve);w.on('error',reject);w.on('exit',c=>{if(c)reject(new Error(`worker exit ${c}`));});})));
 const merged=Object.fromEntries(stars.map(s=>[s.id,emptyStar(s)]));const finishes={};let matches=0,stalls=0,totalTurns=0;
 for(const r of results){matches+=r.matches;stalls+=r.stalls;totalTurns+=r.totalTurns;for(const [k,v] of Object.entries(r.finishes))finishes[k]=(finishes[k]??0)+v;for(const [id,v] of Object.entries(r.stats)){for(const k of ['wins','losses','draws','turns','matches','p1Wins','p1Matches'])merged[id][k]+=v[k];}}
 const rows=stars.map(s=>{const v=merged[s.id],played=v.wins+v.losses+v.draws;return {...v,winRate:+(100*v.wins/Math.max(1,played)).toFixed(2),avgTurns:+(v.turns/Math.max(1,v.matches)).toFixed(2),p1WinRate:+(100*v.p1Wins/Math.max(1,v.p1Matches)).toFixed(2),...deckMetrics(s)};}).sort((a,b)=>b.winRate-a.winRate);
 const mean=rows.reduce((a,r)=>a+r.winRate,0)/rows.length;const sd=Math.sqrt(rows.reduce((a,r)=>a+(r.winRate-mean)**2,0)/rows.length);for(const r of rows){r.winRateZ=+((r.winRate-mean)/Math.max(.001,sd)).toFixed(2);r.balanceFlag=r.winRate>=58?'HIGH':r.winRate<=42?'LOW':Math.abs(r.winRateZ)>=1.5?'WATCH':'OK';}
 const report={version:'1.1.80',generatedAt:new Date().toISOString(),superstars:stars.length,uniquePairings:pairs.length,gamesPerPair,matches,stalls,averageTurns:+(totalTurns/Math.max(1,matches)).toFixed(2),finishes,meanWinRate:+mean.toFixed(2),winRateStdDev:+sd.toFixed(2),highOutliers:rows.filter(r=>r.balanceFlag==='HIGH').map(r=>({id:r.id,name:r.name,winRate:r.winRate})),lowOutliers:rows.filter(r=>r.balanceFlag==='LOW').map(r=>({id:r.id,name:r.name,winRate:r.winRate})),rows};
 fs.writeFileSync('reports/v1.1.80-active-81-balance-lab.json',JSON.stringify(report,null,2)+'\n');
 const top=rows.slice(0,12),bottom=rows.slice(-12).reverse();const md=[];md.push('# WWE Legacy v1.1.80 — Active 81 Balance Laboratory','',`- Superstars: **${stars.length}**`,`- Unique pairings: **${pairs.length.toLocaleString()}**`,`- Matches simulated: **${matches.toLocaleString()}** (${gamesPerPair} per pairing, alternating first player)`,`- Stalls: **${stalls}**`,`- Average turns: **${report.averageTurns}**`,`- Finish mix: ${Object.entries(finishes).map(([k,v])=>`${k} ${v}`).join(', ')}`,'','## Interpretation','','This is a diagnostic baseline. v1.1.80 deliberately does **not** rebalance card values. HIGH/LOW flags identify where v1.2 tuning should investigate card composition, shared-card interactions, Superstar abilities and matchup spread before changing numbers.','','## Highest simulated win rates','','| Superstar | Win rate | Avg turns | Move C/D | Momentum | Counters |','|---|---:|---:|---:|---:|---:|',...top.map(r=>`| ${r.name} | ${r.winRate}% | ${r.avgTurns} | ${r.avgMoveCost}/${r.avgMoveDamage} | ${r.momentum} | ${r.counters} |`),'','## Lowest simulated win rates','','| Superstar | Win rate | Avg turns | Move C/D | Momentum | Counters |','|---|---:|---:|---:|---:|---:|',...bottom.map(r=>`| ${r.name} | ${r.winRate}% | ${r.avgTurns} | ${r.avgMoveCost}/${r.avgMoveDamage} | ${r.momentum} | ${r.counters} |`),'','## Full deck-health matrix','','| Superstar | Win% | Moves | Momentum | Counters | Avg C | Avg D | D/C | Low C | High C | Ground | Specific | Flag |','|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|',...rows.map(r=>`| ${r.name} | ${r.winRate} | ${r.moves} | ${r.momentum} | ${r.counters} | ${r.avgMoveCost} | ${r.avgMoveDamage} | ${r.damagePerCost} | ${r.lowCostMoves} | ${r.highCostMoves} | ${r.groundingMoves} | ${r.starSpecificMoves} | ${r.balanceFlag} |`));fs.writeFileSync('reports/v1.1.80-active-81-balance-lab.md',md.join('\n')+'\n');console.log(JSON.stringify({superstars:report.superstars,uniquePairings:report.uniquePairings,gamesPerPair,matches,stalls,averageTurns:report.averageTurns,finishes,highOutliers:report.highOutliers,lowOutliers:report.lowOutliers,top:top.slice(0,5).map(r=>[r.name,r.winRate]),bottom:bottom.slice(0,5).map(r=>[r.name,r.winRate])},null,2));
}
