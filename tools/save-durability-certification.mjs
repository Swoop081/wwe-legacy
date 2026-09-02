import assert from 'node:assert/strict';
import {
  PROFILE_KEY, PROFILE_RECOVERY_KEY,
  createProfile, loadProfile, saveProfile, resetProfile, profilePersistenceStatus
} from '../js/data/profile.js?v=1.1.102';
import { serializeSave, parseSaveText } from '../js/data/save-backup.js?v=1.1.102';

class MemoryStorage {
  constructor(){ this.map=new Map(); }
  getItem(k){ return this.map.has(k)?this.map.get(k):null; }
  setItem(k,v){ this.map.set(k,String(v)); }
  removeItem(k){ this.map.delete(k); }
}
class FailOnceStorage extends MemoryStorage {
  constructor(){ super(); this.failKey=null; this.failed=false; }
  setItem(k,v){ if(!this.failed && this.failKey===k){this.failed=true;throw Object.assign(new Error('simulated write rejection'),{name:'QuotaExceededError'});} super.setItem(k,v); }
}

const checks=[];
const check=(name,fn)=>{fn();checks.push({name,passed:true});};

check('normal save keeps primary + recovery in sync',()=>{
  const s=new MemoryStorage(),p=createProfile('cm-punk');p.universePoints=1250;saveProfile(p,s);
  assert.equal(JSON.parse(s.getItem(PROFILE_KEY)).universePoints,1250);
  assert.equal(JSON.parse(s.getItem(PROFILE_RECOVERY_KEY)).universePoints,1250);
});
check('corrupt primary auto-recovers from last-known-good copy',()=>{
  const s=new MemoryStorage(),p=createProfile('roman-reigns');p.universePoints=2222;saveProfile(p,s);s.setItem(PROFILE_KEY,'{"truncated":');
  const r=loadProfile(s);assert.equal(r.universePoints,2222);assert.equal(profilePersistenceStatus(s).recovered,true);
});
check('rejected primary write cannot destroy prior durable save',()=>{
  const s=new FailOnceStorage(),p=createProfile('cm-punk');p.universePoints=10;saveProfile(p,s);const before=s.getItem(PROFILE_KEY);
  p.universePoints=999;s.failKey=PROFILE_KEY;saveProfile(p,s);assert.equal(s.getItem(PROFILE_KEY),before);assert.equal(profilePersistenceStatus(s).mode,'volatile');
});
check('volatile fallback preserves current session when browser storage is unavailable',()=>{
  const p=createProfile('roman-reigns');p.universePoints=333;saveProfile(p,null);assert.equal(loadProfile(null).universePoints,333);
});
check('external backup round-trip remains compatible',()=>{
  const p=createProfile('cm-punk');p.universePoints=4444;const r=parseSaveText(serializeSave(p,new Date('2026-08-25T00:00:00Z')));assert.equal(r.profile.universePoints,4444);
});
check('reset clears durable profile state',()=>{
  const s=new MemoryStorage();saveProfile(createProfile('cm-punk'),s);resetProfile(s);assert.equal(s.getItem(PROFILE_KEY),null);assert.equal(s.getItem(PROFILE_RECOVERY_KEY),null);
});

console.log(JSON.stringify({version:'0.19.00',checks:checks.length,passed:checks.length,failures:0,results:checks},null,2));
