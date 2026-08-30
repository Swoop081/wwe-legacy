import { superstars } from '../js/data/superstars.js';
import { decks } from '../js/data/decks.js';
import { isPlayerReleasedSetId } from '../js/data/release.js';
import { MatchEngine } from '../js/engine/MatchEngine.js';
import { decisionOwner, cpuDecision, executeCpuDecision } from '../js/ai/WrestlingAI.js';

const shardIndex = Number(process.argv[2] ?? 0);
const shardCount = Number(process.argv[3] ?? 1);
const stars = Object.values(superstars).filter(star => isPlayerReleasedSetId(star.setId));
function seededRng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
const stats=Object.fromEntries(stars.map(star=>[star.id,{id:star.id,name:star.name,wins:0,losses:0,draws:0,turns:0}]));
const finishes={};let matches=0,stalls=0,totalTurns=0,pairIndex=0;
for(let i=0;i<stars.length;i++) for(let j=i+1;j<stars.length;j++,pairIndex++){
  if(pairIndex%shardCount!==shardIndex) continue;
  for(let gameIndex=0;gameIndex<20;gameIndex++){
    const flip=gameIndex%2===1,p1=flip?stars[j]:stars[i],p2=flip?stars[i]:stars[j];
    const engine=new MatchEngine({p1,p2,decks,rng:seededRng(1300000+i*100003+j*1009+gameIndex*37)});
    let steps=0;
    while(engine.state().phase!=='MATCH_OVER'&&steps++<2000){const pid=decisionOwner(engine.state()),d=cpuDecision(engine,pid);if(!d||!executeCpuDecision(engine,d,pid))break;}
    const state=engine.state();matches++;totalTurns+=state.turnNumber;stats[p1.id].turns+=state.turnNumber;stats[p2.id].turns+=state.turnNumber;
    if(state.phase!=='MATCH_OVER'){stalls++;continue;}
    const finish=state.finish?.type??'unknown';finishes[finish]=(finishes[finish]??0)+1;
    if(!state.winner){stats[p1.id].draws++;stats[p2.id].draws++;continue;}
    const winnerId=state.players[state.winner].superstar.id,loserPid=state.winner==='p1'?'p2':'p1',loserId=state.players[loserPid].superstar.id;
    stats[winnerId].wins++;stats[loserId].losses++;
  }
}
console.log(JSON.stringify({shardIndex,shardCount,releasedSuperstars:stars.length,matches,stalls,totalTurns,finishes,stats}));
