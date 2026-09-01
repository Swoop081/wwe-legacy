
import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js';
import { decks } from '../js/data/decks.js';
import { MatchEngine } from '../js/engine/MatchEngine.js';
import { decisionOwner, cpuDecision, executeCpuDecision } from '../js/ai/WrestlingAI.js';

const ACTIVE_SET_IDS=new Set(["evolution-series-1","attitude-era-series-1","ruthless-aggression-series-1","golden-era-series-1","summerslam-series-1","raw-series-1","smackdown-series-1","new-generation-series-1","nxt-series-1","worlds-collide-series-1"]);
const active=Object.values(superstars).filter(s=>Array.isArray(decks[s.id])&&decks[s.id].length===60&&(ACTIVE_SET_IDS.has(s.setId)||s.id==="aj-styles"));
const trish=Object.values(superstars).find(s=>s.id==="trish-stratus");
if(!trish||!decks[trish.id])throw new Error("Trish package missing");
const gamesPerOpponent=Number(process.env.BALANCE_GAMES_PER_PAIR||25),maxSteps=2000;
function rng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
let wins=0,losses=0,stalls=0,totalTurns=0,pins=0,subs=0;
const matchups=[];
for(let i=0;i<active.length;i++){
 const opp=active[i];let tw=0,ow=0,ps=0;
 for(let g=0;g<gamesPerOpponent;g++){
  const flip=g%2===1,p1=flip?opp:trish,p2=flip?trish:opp;
  const e=new MatchEngine({p1,p2,decks,rng:rng(118500000+i*1009+g*37)}); e._log=()=>{};
  let steps=0;
  while(e.state().phase!=="MATCH_OVER"&&steps++<maxSteps){
   const pid=decisionOwner(e.state()),d=cpuDecision(e,pid);
   if(!d||!executeCpuDecision(e,d,pid))break;
  }
  const s=e.state();totalTurns+=s.turn??0;
  if(s.phase!=="MATCH_OVER"){stalls++;ps++;continue;}
  const wid=s.players[s.winner]?.superstar?.id;
  if(wid==="trish-stratus"){wins++;tw++;}else{losses++;ow++;}
  if(s.winReason==="submission"||s.finishType==="submission")subs++;else pins++;
 }
 const decided=tw+ow;
 matchups.push({opponent:opp.name,opponentId:opp.id,wins:tw,losses:ow,stalls:ps,winRate:+(100*tw/Math.max(1,decided)).toFixed(2)});
}
const report={version:"1.1.85",opponents:active.length,gamesPerOpponent,matches:active.length*gamesPerOpponent,wins,losses,stalls,winRate:+(100*wins/Math.max(1,wins+losses)).toFixed(2),averageTurns:+(totalTurns/Math.max(1,active.length*gamesPerOpponent)).toFixed(2),pins,submissions:subs,matchups:matchups.sort((a,b)=>a.winRate-b.winRate)};
fs.writeFileSync("balance-reports/v1.1.85-trish-reward-benchmark.json",JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({opponents:report.opponents,matches:report.matches,stalls:report.stalls,winRate:report.winRate,worst:report.matchups.slice(0,8),best:report.matchups.slice(-8).reverse()},null,2));
