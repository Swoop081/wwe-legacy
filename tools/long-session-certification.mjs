import assert from 'node:assert/strict';
import { superstars } from '../js/data/superstars.js?v=1.1.113';
import { decks } from '../js/data/decks.js?v=1.1.113';
import { isPlayerReleasedSetId } from '../js/data/release.js?v=1.1.113';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.1.113';
import { decisionOwner,cpuDecision,executeCpuDecision } from '../js/ai/WrestlingAI.js?v=1.1.113';
import { createProfile, saveProfile, loadProfile, PROFILE_KEY } from '../js/data/profile.js?v=1.1.113';
import { recordCareerMatch } from '../js/data/career.js?v=1.1.113';

class MemoryStorage { constructor(){this.map=new Map();} getItem(k){return this.map.has(k)?this.map.get(k):null;} setItem(k,v){this.map.set(k,String(v));} removeItem(k){this.map.delete(k);} }
const released=Object.values(superstars).filter(s=>isPlayerReleasedSetId(s.setId));
const MATCHES=Math.max(120,Number(process.env.LONG_SESSION_MATCHES||600));
function rng(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
const storage=new MemoryStorage();let profile=createProfile('cm-punk');saveProfile(profile,storage);
global.gc?.();const heapStart=process.memoryUsage().heapUsed;
let stalls=0,totalTurns=0,maxTurns=0,maxLogEntries=0,pins=0,subs=0;
for(let i=0;i<MATCHES;i++){
  const a=released[i%released.length],b=released[(i*7+11)%released.length];
  const p2=b.id===a.id?released[(i*7+12)%released.length]:b;
  let g=new MatchEngine({p1:a,p2,decks,rng:rng(0x190000+i*7919)});let steps=0;
  while(g.state().phase!=='MATCH_OVER'&&steps++<2500){const pid=decisionOwner(g.state());if(!pid)break;const d=cpuDecision(g,pid);if(!d||!executeCpuDecision(g,d,pid))break;}
  const s=g.state(); if(s.phase!=='MATCH_OVER'||!s.winner){stalls++;continue;}
  totalTurns+=s.turnNumber;maxTurns=Math.max(maxTurns,s.turnNumber);maxLogEntries=Math.max(maxLogEntries,s.log?.length??0);
  if(s.finish?.type==='pin')pins++; if(s.finish?.type==='submission')subs++;
  recordCareerMatch(profile,{result:s.winner==='p1'?'win':'loss',superstarId:a.id,mode:'exhibition',finishType:s.finish?.type??'match'});
  saveProfile(profile,storage);
  if(i%25===24){profile=loadProfile(storage);assert.ok(profile);assert.ok(storage.getItem(PROFILE_KEY));}
  g=null;
  if(i%50===49)global.gc?.();
}
global.gc?.();const heapEnd=process.memoryUsage().heapUsed;
const delta=heapEnd-heapStart;
assert.equal(stalls,0,'long-session match stalls detected');
assert.ok(maxLogEntries<1200,`single-match log unexpectedly large: ${maxLogEntries}`);
assert.ok(storage.getItem(PROFILE_KEY)?.length<2_500_000,'profile grew beyond expected long-session bound');
// With explicit GC the sequential-session harness should not retain prior MatchEngine graphs.
assert.ok(delta<24*1024*1024,`heap retained more than 24 MiB after ${MATCHES} sequential matches: ${delta}`);
console.log(JSON.stringify({version:'0.19.00',matches:MATCHES,stalls,averageTurns:+(totalTurns/MATCHES).toFixed(2),maxTurns,maxLogEntries,finishes:{pin:pins,submission:subs},profileBytes:storage.getItem(PROFILE_KEY).length,heapStartBytes:heapStart,heapEndBytes:heapEnd,heapDeltaBytes:delta},null,2));
