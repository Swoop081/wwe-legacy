import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  PROFILE_KEY, PROFILE_RECOVERY_KEY, PROFILE_RECOVERY_META_KEY,
  createProfile, loadProfile, saveProfile, resetProfile, profilePersistenceStatus
} from '../js/data/profile.js?v=1.1.43';

class MemoryStorage {
  constructor(){ this.map=new Map(); }
  getItem(k){ return this.map.has(k)?this.map.get(k):null; }
  setItem(k,v){ this.map.set(k,String(v)); }
  removeItem(k){ this.map.delete(k); }
}

class FailingPrimaryStorage extends MemoryStorage {
  constructor(){ super(); this.failPrimary=false; }
  setItem(k,v){ if(this.failPrimary && k===PROFILE_KEY) throw Object.assign(new Error('quota'),{name:'QuotaExceededError'}); super.setItem(k,v); }
}

test('v0.19.00 keeps a rolling local recovery copy and restores a corrupt primary automatically',()=>{
  const storage=new MemoryStorage();
  const p=createProfile('cm-punk'); p.universePoints=777;
  saveProfile(p,storage);
  assert.ok(storage.getItem(PROFILE_RECOVERY_KEY));
  storage.setItem(PROFILE_KEY,'{"broken":');
  const recovered=loadProfile(storage);
  assert.equal(recovered.universePoints,777);
  assert.equal(recovered.starterId,'cm-punk');
  assert.equal(JSON.parse(storage.getItem(PROFILE_KEY)).universePoints,777);
  assert.equal(profilePersistenceStatus(storage).recovered,true);
});

test('v0.19.00 a rejected primary write leaves the prior durable save recoverable and keeps the new profile alive in-session',()=>{
  const storage=new FailingPrimaryStorage();
  const p=createProfile('roman-reigns'); p.universePoints=100;
  saveProfile(p,storage);
  const durableBefore=storage.getItem(PROFILE_KEY);
  p.universePoints=999;
  storage.failPrimary=true;
  assert.doesNotThrow(()=>saveProfile(p,storage));
  assert.equal(storage.getItem(PROFILE_KEY),durableBefore);
  assert.equal(profilePersistenceStatus(storage).mode,'volatile');
  assert.equal(loadProfile(null).universePoints,999);
});


test('v0.19.00 a browser that throws while exposing localStorage still stays playable in volatile mode',()=>{
  Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw Object.assign(new Error('blocked'),{name:'SecurityError'});}});
  try {
    assert.doesNotThrow(()=>saveProfile(createProfile('cm-punk')));
    assert.doesNotThrow(()=>loadProfile());
    assert.equal(profilePersistenceStatus().mode,'volatile');
  } finally { delete globalThis.localStorage; }
});

test('v0.19.00 reset clears primary, recovery and recovery metadata',()=>{
  const storage=new MemoryStorage();
  saveProfile(createProfile('cm-punk'),storage);
  assert.ok(storage.getItem(PROFILE_KEY));
  assert.ok(storage.getItem(PROFILE_RECOVERY_KEY));
  resetProfile(storage);
  assert.equal(storage.getItem(PROFILE_KEY),null);
  assert.equal(storage.getItem(PROFILE_RECOVERY_KEY),null);
  assert.equal(storage.getItem(PROFILE_RECOVERY_META_KEY),null);
});

test('v0.19.00 page lifecycle flushes the profile before background/close and My Legacy exposes local save health',()=>{
  const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
  const css=fs.readFileSync(new URL('../css/game.css',import.meta.url),'utf8');
  assert.match(app,/pagehide.*flushLocalProfile/);
  assert.match(app,/beforeunload.*flushLocalProfile/);
  assert.match(app,/visibilityState === "hidden"\) flushLocalProfile/);
  assert.match(app,/LOCAL SAVE PROTECTED/);
  assert.match(css,/\.save-local-health/);
});

test('v0.19.00 coalesces global action-row scans and pauses one-second UI clock work while backgrounded',()=>{
  const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
  assert.match(app,/pairedActionScanPending/);
  assert.match(app,/requestAnimationFrame\(run\)/);
  assert.match(app,/visibilityState !== "hidden"\) refreshSeasonClocks/);
});

test('v0.19.00 final iPhone guardrails prevent root horizontal overflow and include 320px fallback layout',()=>{
  const css=fs.readFileSync(new URL('../css/game.css',import.meta.url),'utf8');
  assert.match(css,/@media\(max-width:600px\)[\s\S]*html,body,main,#game[\s\S]*overflow-x:hidden/);
  assert.match(css,/min-height:100dvh/);
  assert.match(css,/@media\(max-width:340px\)/);
  assert.match(css,/\.save-backup-actions\{grid-template-columns:1fr!important\}/);
});
