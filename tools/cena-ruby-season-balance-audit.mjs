import { superstars } from '../js/data/superstars.js?v=1.1.116';
import { decks } from '../js/data/decks.js?v=1.1.116';
import { applyCardTier } from '../js/data/variants.js?v=1.1.116';
import { isPlayerReleasedSetId } from '../js/data/release.js?v=1.1.116';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.1.116';
import { decisionOwner, cpuDecision, executeCpuDecision } from '../js/ai/WrestlingAI.js?v=1.1.116';

const N = Math.max(20, Number(process.env.MATCHES_PER_OPP ?? 80));
const stars = Object.values(superstars).filter(star => isPlayerReleasedSetId(star.setId));
const cena = stars.find(star => star.id === 'john-cena');
const cenaDeck = decks['john-cena'].map(card => applyCardTier(card, card.fixedPrintingTier ?? 'sapphire'));
const auditDecks = { ...decks, 'john-cena': cenaDeck };
function rng(seed){ let x=seed>>>0; return()=>{ x=(x*1664525+1013904223)>>>0; return x/4294967296; }; }
let matches=0,wins=0,stalls=0,totalTurns=0;
for(let j=0;j<stars.length;j++){
  const opponent=stars[j]; if(opponent.id==='john-cena') continue;
  for(let k=0;k<N;k++){
    const cenaP1=k%2===0, p1=cenaP1?cena:opponent, p2=cenaP1?opponent:cena;
    const game=new MatchEngine({p1,p2,decks:auditDecks,rng:rng(0xC3A100+j*10007+k*97)});
    let steps=0;
    while(game.state().phase!=='MATCH_OVER'&&steps++<2500){
      const pid=decisionOwner(game.state()); if(!pid) break;
      const decision=cpuDecision(game,pid); if(!decision||!executeCpuDecision(game,decision,pid)) break;
    }
    matches++; totalTurns+=game.state().turnNumber;
    if(game.state().phase!=='MATCH_OVER'||!game.state().winner){ stalls++; continue; }
    if(game.state().players[game.state().winner].superstar.id==='john-cena') wins++;
  }
}
const exclusiveStats=Object.fromEntries(cenaDeck.filter(card=>card.fixedPrintingTier).map(card=>[card.id,{tier:card.tier,damage:card.damage,pressure:card.submission?.pressure??null}]));
console.log(JSON.stringify({version:'0.17.01',matches,wins,winRate:+(100*wins/matches).toFixed(2),stalls,avgTurns:+(totalTurns/matches).toFixed(2),exclusiveStats},null,2));
if(stalls) process.exitCode=1;
