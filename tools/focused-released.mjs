import { superstars } from '../js/data/superstars.js';
import { decks } from '../js/data/decks.js';
import { isPlayerReleasedSetId } from '../js/data/release.js';
import { MatchEngine } from '../js/engine/MatchEngine.js';
import {decisionOwner,cpuDecision,executeCpuDecision} from '../js/ai/WrestlingAI.js';
const id=process.env.STAR_ID||'oba-femi', N=Number(process.env.MATCHES_PER_OPP||20); const stars=Object.values(superstars).filter(s=>isPlayerReleasedSetId(s.setId)), target=stars.find(s=>s.id===id);if(!target)throw Error('missing '+id);
function rng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
let w=0,m=0,stalls=0,turns=0;
for(let j=0;j<stars.length;j++){const opp=stars[j];if(opp.id===id)continue; for(let k=0;k<N;k++){const targetP1=k%2===0;const a=targetP1?target:opp,b=targetP1?opp:target;const g=new MatchEngine({p1:a,p2:b,decks,rng:rng(0x51f15e ^ j*10007 ^ k*97)});let steps=0;while(g.state().phase!=='MATCH_OVER'&&steps++<3500){const pid=decisionOwner(g.state()),d=cpuDecision(g,pid);if(!d||!executeCpuDecision(g,d,pid))break;}m++;turns+=g.state().turnNumber;if(g.state().phase!=='MATCH_OVER'){stalls++;continue;}if(g.state().players[g.state().winner].superstar.id===id)w++;}}
console.log(JSON.stringify({id,hp:target.hp,m,w,wr:+(100*w/m).toFixed(2),avgTurns:+(turns/m).toFixed(2),stalls},null,2));
