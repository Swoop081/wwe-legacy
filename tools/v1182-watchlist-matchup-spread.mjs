import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js';
import { decks } from '../js/data/decks.js';
import { MatchEngine } from '../js/engine/MatchEngine.js';
import { decisionOwner, cpuDecision, executeCpuDecision } from '../js/ai/WrestlingAI.js';

const ACTIVE_SET_IDS=new Set(["evolution-series-1","attitude-era-series-1","ruthless-aggression-series-1","golden-era-series-1","summerslam-series-1","raw-series-1","smackdown-series-1","new-generation-series-1","nxt-series-1","worlds-collide-series-1"]);
const stars=Object.values(superstars).filter(s=>Array.isArray(decks[s.id])&&decks[s.id].length===60&&(ACTIVE_SET_IDS.has(s.setId)||s.id==="aj-styles"));
const WATCHLIST=new Set([
  "el-grande-americano","aj-styles","jbl","brock-lesnar","randy-orton","diesel","mason-rook","roman-reigns",
  "montez-ford","kurt-angle","kendal-grey","tiffany-stratton","rob-van-dam","chad-gable"
]);
const gamesPerPair=Number(process.env.BALANCE_GAMES_PER_PAIR||25),maxSteps=2000;
function seededRng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
const results=[];
for(let i=0;i<stars.length;i++)for(let j=i+1;j<stars.length;j++){
  if(!WATCHLIST.has(stars[i].id)&&!WATCHLIST.has(stars[j].id))continue;
  const pair={a:stars[i].id,b:stars[j].id,aName:stars[i].name,bName:stars[j].name,aWins:0,bWins:0,draws:0,stalls:0,matches:0};
  for(let g=0;g<gamesPerPair;g++){
    const flip=g%2===1,p1=flip?stars[j]:stars[i],p2=flip?stars[i]:stars[j];
    const engine=new MatchEngine({p1,p2,decks,rng:seededRng(118200000+i*100003+j*1009+g*37)});
    engine._log=()=>{};
    let steps=0;
    while(engine.state().phase!=='MATCH_OVER'&&steps++<maxSteps){
      const pid=decisionOwner(engine.state()),d=cpuDecision(engine,pid);
      if(!d||!executeCpuDecision(engine,d,pid))break;
    }
    const state=engine.state();pair.matches++;
    if(state.phase!=='MATCH_OVER'){pair.stalls++;continue;}
    if(!state.winner){pair.draws++;continue;}
    const wid=state.players[state.winner].superstar.id;
    if(wid===pair.a)pair.aWins++; else if(wid===pair.b)pair.bWins++;
  }
  const decided=pair.aWins+pair.bWins;
  pair.aWinRate=+(100*pair.aWins/Math.max(1,decided)).toFixed(2);
  pair.bWinRate=+(100*pair.bWins/Math.max(1,decided)).toFixed(2);
  results.push(pair);
}
const summaries=[...WATCHLIST].map(id=>{
  const s=stars.find(x=>x.id===id),pairs=results.filter(p=>p.a===id||p.b===id);
  const rows=pairs.map(p=>({opponent:p.a===id?p.bName:p.aName,winRate:p.a===id?p.aWinRate:p.bWinRate}));
  const wins=rows.filter(r=>r.winRate>=60).sort((a,b)=>b.winRate-a.winRate);
  const losses=rows.filter(r=>r.winRate<=40).sort((a,b)=>a.winRate-b.winRate);
  const rates=rows.map(r=>r.winRate);
  return {id,name:s?.name??id,pairings:rows.length,mean:+(rates.reduce((a,b)=>a+b,0)/Math.max(1,rates.length)).toFixed(2),median:+rates.sort((a,b)=>a-b)[Math.floor(rates.length/2)].toFixed(2),dominantMatchups:wins.length,badMatchups:losses.length,worst:losses.slice(0,8),best:wins.slice(0,8)};
});
const report={version:"1.1.82",gamesPerPair,watchlist:[...WATCHLIST],matches:results.reduce((a,p)=>a+p.matches,0),stalls:results.reduce((a,p)=>a+p.stalls,0),summaries,pairs:results};
fs.writeFileSync('balance-reports/v1.1.82-watchlist-matchup-spread.json',JSON.stringify(report,null,2)+'\n');
const md=['# WWE Legacy v1.1.82 — Watchlist Matchup Spread','',`- Watchlist Superstars: **${summaries.length}**`,`- Games per watched pairing: **${gamesPerPair}**`,`- Matches: **${report.matches.toLocaleString()}**`,`- Stalls: **${report.stalls}**`,'','## Summary','','| Superstar | Mean pair rate | Dominant ≥60% | Bad ≤40% |','|---|---:|---:|---:|',...summaries.map(s=>`| ${s.name} | ${s.mean}% | ${s.dominantMatchups} | ${s.badMatchups} |`),'','## Matchup notes',''];
for(const s of summaries){md.push(`### ${s.name}`,'',`- Strongest: ${s.best.length?s.best.map(x=>`${x.opponent} ${x.winRate}%`).join('; '):'none ≥60%'}`,`- Weakest: ${s.worst.length?s.worst.map(x=>`${x.opponent} ${x.winRate}%`).join('; '):'none ≤40%'}`,'');}
fs.writeFileSync('balance-reports/v1.1.82-watchlist-matchup-spread.md',md.join('\n')+'\n');
console.log(JSON.stringify({matches:report.matches,stalls:report.stalls,summaries},null,2));
