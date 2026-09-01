import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js';
import { decks } from '../js/data/decks.js';
import { MatchEngine } from '../js/engine/MatchEngine.js';
import { decisionOwner,cpuDecision,executeCpuDecision } from '../js/ai/WrestlingAI.js';

const ACTIVE_SET_IDS=new Set(["evolution-series-1","attitude-era-series-1","ruthless-aggression-series-1","golden-era-series-1","summerslam-series-1","raw-series-1","smackdown-series-1","new-generation-series-1","nxt-series-1","worlds-collide-series-1"]);
const stars=Object.values(superstars).filter(s=>Array.isArray(decks[s.id])&&decks[s.id].length===60&&(ACTIVE_SET_IDS.has(s.setId)||s.id==="aj-styles"||s.id==="trish-stratus"));
const gamesPerPair=Number(process.env.GAMES||8),maxSteps=2000;
function rng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
const stats=Object.fromEntries(stars.map(s=>[s.id,{id:s.id,name:s.name,matches:0,wins:0,pinWins:0,submissionWins:0,submissionStarts:0,submissionMaintains:0,submissionReleases:0,bodyDamageEvents:0,bodyDamage:0,submissionCards:new Set()}]));
let matches=0,stalls=0,totalTurns=0,finishes={pin:0,submission:0},starts=0,maintains=0,releases=0,autoCounters=0,submissionResponses=0;
for(let i=0;i<stars.length;i++)for(let j=i+1;j<stars.length;j++)for(let g=0;g<gamesPerPair;g++){
 const flip=g%2===1,p1=flip?stars[j]:stars[i],p2=flip?stars[i]:stars[j];
 const e=new MatchEngine({p1,p2,decks,rng:rng(119100000+i*100003+j*1009+g*37)});
 let z=0;while(e.state().phase!=='MATCH_OVER'&&z++<maxSteps){const pid=decisionOwner(e.state());if(!pid)break;const d=cpuDecision(e,pid);if(!d||!executeCpuDecision(e,d,pid))break;}
 const s=e.state();matches++;totalTurns+=s.turnNumber;stats[p1.id].matches++;stats[p2.id].matches++;
 if(s.phase!=='MATCH_OVER'){stalls++;continue;}
 const finish=s.finish?.type??'unknown';finishes[finish]=(finishes[finish]??0)+1;
 if(s.winner){const wid=s.players[s.winner].superstar.id;stats[wid].wins++;if(finish==='pin')stats[wid].pinWins++;if(finish==='submission')stats[wid].submissionWins++;}
 for(const ev of s.log){
  if(ev.type==='SUBMISSION_RESPONSE_READY' && (ev.holdTurn??1)===1){starts++; const id=s.players[ev.attackerId]?.superstar?.id; if(id)stats[id].submissionStarts++; if(id&&ev.cardId)stats[id].submissionCards.add(ev.cardId);}
  else if(ev.type==='SUBMISSION_MAINTAINED'){maintains++;const id=s.players[ev.attackerId]?.superstar?.id;if(id)stats[id].submissionMaintains++;}
  else if(ev.type==='SUBMISSION_RELEASED'){releases++;const id=s.players[ev.attackerId]?.superstar?.id;if(id)stats[id].submissionReleases++;}
  else if(ev.type==='SUBMISSION_RESPONSE_READY')submissionResponses++;
  else if(ev.type==='SUBMISSION_AUTO_COUNTERED')autoCounters++;
  else if(ev.type==='BODY_PART_DAMAGE'||ev.type==='SUBMISSION_DAMAGE'){
    const id=s.players[ev.attackerId]?.superstar?.id;
    if(id){stats[id].bodyDamageEvents++;stats[id].bodyDamage+=Number(ev.amount??0);}
  }
 }
}
for(const x of Object.values(stats)){x.submissionCards=[...x.submissionCards];x.winRate=100*x.wins/Math.max(1,x.matches);x.submissionShareOfWins=100*x.submissionWins/Math.max(1,x.wins);x.submissionWinPerStart=100*x.submissionWins/Math.max(1,x.submissionStarts);}
const ranking=Object.values(stats).sort((a,b)=>b.submissionWins-a.submissionWins||b.submissionStarts-a.submissionStarts);
const result={version:'1.1.90',gamesPerPair,matches,stalls,avgTurns:totalTurns/matches,finishes,submissionFinishPct:100*(finishes.submission??0)/matches,starts,maintains,releases,submissionResponses,autoCounters,stats,ranking};
fs.writeFileSync('balance-reports/v1.1.91-submission-ecosystem-audit.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({matches,stalls,avgTurns:+result.avgTurns.toFixed(2),finishes,submissionFinishPct:+result.submissionFinishPct.toFixed(2),starts,maintains,releases,top:ranking.slice(0,12).map(x=>({name:x.name,subWins:x.submissionWins,starts:x.submissionStarts,subShare:+x.submissionShareOfWins.toFixed(1),winRate:+x.winRate.toFixed(1)}))},null,2));
