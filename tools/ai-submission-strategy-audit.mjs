import { superstars } from '../js/data/superstars.js';
import { decks } from '../js/data/decks.js';
import { MatchEngine } from '../js/engine/MatchEngine.js';
import { decisionOwner,cpuDecision,executeCpuDecision } from '../js/ai/WrestlingAI.js';
import { submissionThreshold } from '../js/engine/rules.js';
function rng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
const stars=Object.values(superstars);let starts=0,repeatApplicationRequired=0,handLimitedStarts=0,maintains=0,releases=0,releaseEmpty=0,releaseNextPass=0;let current={p1:null,p2:null};const holds=[];
for(let i=0;i<stars.length;i++)for(let j=0;j<stars.length;j++)if(i!==j){const g=new MatchEngine({p1:stars[i],p2:stars[j],decks,rng:rng(92117+i*443+j*41)});let z=0,pendingRelease=null;while(g.state().phase!=='MATCH_OVER'&&z++<1800){const s=g.state(),pid=decisionOwner(s);if(!pid)break;const d=cpuDecision(g,pid);if(!d)break;
 if(s.phase==='SUBMISSION_MAINTAIN'){
   const sub=s.submission,a=s.players[sub.attackerId],def=s.players[sub.defenderId],threshold=submissionThreshold(def),need=Math.max(0,threshold-def.submissionDamage[sub.bodyPart]),pressure=Math.max(1,sub.damage??1),holdsNeeded=Math.ceil(need/pressure); 
   if(!current[pid]||current[pid].cardId!==sub.cardId||current[pid].seq!==s.controlSequence){starts++;current[pid]={cardId:sub.cardId,seq:s.controlSequence,m:0};const holdTurn=Math.max(1,sub.holdTurn??1),cap=(sub.finisher||sub.trademark)?3:2,remainingTicks=Math.max(0,cap-holdTurn);if(holdsNeeded>remainingTicks)repeatApplicationRequired++;if(holdsNeeded>a.hand.length)handLimitedStarts++;}
   if(d.type==='maintain'){maintains++;current[pid].m++;}
   if(d.type==='release'){releases++;if(!a.hand.length)releaseEmpty++;holds.push(current[pid]?.m??0);pendingRelease={pid,seq:s.controlSequence};current[pid]=null;}
 }
 if(s.phase==='ACTION'&&d.type==='pass'&&pendingRelease&&pendingRelease.pid===pid){releaseNextPass++;pendingRelease=null;}
 if(s.phase==='ACTION'&&d.type==='move'&&pendingRelease&&pendingRelease.pid===pid)pendingRelease=null;
 if(!executeCpuDecision(g,d,pid))break;}}
holds.sort((a,b)=>a-b);const avg=holds.reduce((a,b)=>a+b,0)/Math.max(1,holds.length);console.log(JSON.stringify({starts,repeatApplicationRequired,repeatApplicationPct:+(100*repeatApplicationRequired/Math.max(1,starts)).toFixed(1),handLimitedStarts,handLimitedPct:+(100*handLimitedStarts/Math.max(1,starts)).toFixed(1),maintains,releases,releaseEmpty,releaseNextPass,avgMaintainsBeforeRelease:+avg.toFixed(2),holdsDist:Object.fromEntries([...new Set(holds)].map(n=>[n,holds.filter(x=>x===n).length]))},null,2));
