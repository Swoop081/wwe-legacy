import { superstars } from '../js/data/superstars.js?v=1.1.110';
import { decks } from '../js/data/decks.js?v=1.1.110';
import { isPlayerReleasedSetId } from '../js/data/release.js?v=1.1.110';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.1.110';
import { decisionOwner, cpuDecision, executeCpuDecision } from '../js/ai/WrestlingAI.js?v=1.1.110';

const gamesPerPairPerSeed=Math.max(10,Number(process.env.GAMES_PER_PAIR_PER_SEED||10));
const seedBases=(process.env.BALANCE_SEEDS||'1300000,15000000').split(',').map(Number).filter(Number.isFinite);
const stars=Object.values(superstars).filter(s=>isPlayerReleasedSetId(s.setId));
function rng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
const stats=Object.fromEntries(stars.map(s=>[s.id,{id:s.id,name:s.name,wins:0,losses:0,turns:0,pins:0,submissions:0}]));
let matches=0,stalls=0,totalTurns=0;const finishes={};
for(const base of seedBases)for(let i=0;i<stars.length;i++)for(let j=i+1;j<stars.length;j++)for(let k=0;k<gamesPerPairPerSeed;k++){
  const flip=k%2===1,p1=flip?stars[j]:stars[i],p2=flip?stars[i]:stars[j];
  const g=new MatchEngine({p1,p2,decks,rng:rng(base+i*100003+j*1009+k*37)});
  let steps=0;
  while(g.state().phase!=='MATCH_OVER'&&steps++<2000){const pid=decisionOwner(g.state());if(!pid)break;const d=cpuDecision(g,pid);if(!d||!executeCpuDecision(g,d,pid))break;}
  const s=g.state();matches++;totalTurns+=s.turnNumber;stats[p1.id].turns+=s.turnNumber;stats[p2.id].turns+=s.turnNumber;
  if(s.phase!=='MATCH_OVER'||!s.winner){stalls++;continue;}
  const wp=s.winner,lp=wp==='p1'?'p2':'p1',w=s.players[wp].superstar.id,l=s.players[lp].superstar.id,finish=s.finish?.type??'unknown';
  stats[w].wins++;stats[l].losses++;finishes[finish]=(finishes[finish]??0)+1;if(finish==='pin')stats[w].pins++;if(finish==='submission')stats[w].submissions++;
}
function wilson(w,n,z=1.96){if(!n)return[0,0];const ph=w/n,z2=z*z,den=1+z2/n,mid=(ph+z2/(2*n))/den,half=z*Math.sqrt((ph*(1-ph)+z2/(4*n))/n)/den;return [100*(mid-half),100*(mid+half)];}
const rows=Object.values(stats).map(r=>{const n=r.wins+r.losses,[lo,hi]=wilson(r.wins,n),rate=100*r.wins/Math.max(1,n);return {...r,played:n,winRate:+rate.toFixed(2),ci95:[+lo.toFixed(2),+hi.toFixed(2)],avgTurns:+(r.turns/Math.max(1,n)).toFixed(2),hardOutlier:hi<42||lo>62,watch:rate<44.5?'low':rate>61.5?'high':null};}).sort((a,b)=>b.winRate-a.winRate||a.name.localeCompare(b.name));
const report={version:'0.15.00',releasedSuperstars:stars.length,seeds:seedBases,gamesPerPairPerSeed,matches,stalls,averageTurns:+(totalTurns/Math.max(1,matches)).toFixed(2),finishes,hardOutliers:rows.filter(r=>r.hardOutlier),watchlist:rows.filter(r=>r.watch),rows};
console.log(JSON.stringify(report,null,2));
if(stalls||report.hardOutliers.length)process.exitCode=1;
