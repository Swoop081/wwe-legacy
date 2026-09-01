import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js';
import { decks } from '../js/data/decks.js';
import { MatchEngine } from '../js/engine/MatchEngine.js';
import { decisionOwner, cpuDecision, executeCpuDecision } from '../js/ai/WrestlingAI.js';

const ACTIVE_SET_IDS=new Set(["evolution-series-1","attitude-era-series-1","ruthless-aggression-series-1","golden-era-series-1","summerslam-series-1","raw-series-1","smackdown-series-1","new-generation-series-1","nxt-series-1","worlds-collide-series-1"]);
const stars=Object.values(superstars).filter(s=>Array.isArray(decks[s.id])&&decks[s.id].length===60&&(ACTIVE_SET_IDS.has(s.setId)||s.id==="aj-styles"));
const gamesPerPair=Number(process.env.BALANCE_GAMES_PER_PAIR||25), maxSteps=2000;
const start=Number(process.env.BALANCE_PAIR_START||0), end=Number(process.env.BALANCE_PAIR_END||3240);
const output=process.env.BALANCE_SHARD_OUTPUT;
function seededRng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
function emptyStar(s){return {id:s.id,name:s.name,setId:s.setId,wins:0,losses:0,draws:0,turns:0,matches:0,p1Wins:0,p1Matches:0};}
const all=[];for(let i=0;i<stars.length;i++)for(let j=i+1;j<stars.length;j++)all.push([i,j]);
const pairs=all.slice(start,end);
const stats=Object.fromEntries(stars.map(s=>[s.id,emptyStar(s)])), finishes={};let matches=0,stalls=0,totalTurns=0;
for(const [i,j] of pairs)for(let g=0;g<gamesPerPair;g++){
 const flip=g%2===1,p1=flip?stars[j]:stars[i],p2=flip?stars[i]:stars[j];
 const engine=new MatchEngine({p1,p2,decks,rng:seededRng(117900000+i*100003+j*1009+g*37)});
 let steps=0;while(engine.state().phase!=='MATCH_OVER'&&steps++<maxSteps){const pid=decisionOwner(engine.state());const d=cpuDecision(engine,pid);if(!d||!executeCpuDecision(engine,d,pid))break;}
 const state=engine.state();matches++;totalTurns+=state.turnNumber;stats[p1.id].matches++;stats[p2.id].matches++;stats[p1.id].turns+=state.turnNumber;stats[p2.id].turns+=state.turnNumber;stats[p1.id].p1Matches++;
 if(state.phase!=='MATCH_OVER'){stalls++;continue;}const finish=state.finish?.type??'unknown';finishes[finish]=(finishes[finish]??0)+1;
 if(!state.winner){stats[p1.id].draws++;stats[p2.id].draws++;continue;}const wid=state.players[state.winner].superstar.id,lid=state.players[state.winner==='p1'?'p2':'p1'].superstar.id;stats[wid].wins++;stats[lid].losses++;if(state.winner==='p1')stats[p1.id].p1Wins++;
}
const result={start,end,pairCount:pairs.length,gamesPerPair,matches,stalls,totalTurns,finishes,stats};
if(output)fs.writeFileSync(output,JSON.stringify(result));
console.log(JSON.stringify({start,end,pairs:pairs.length,matches,stalls,avgTurns:+(totalTurns/Math.max(1,matches)).toFixed(2)}));
