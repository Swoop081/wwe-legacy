import test from 'node:test';
import assert from 'node:assert/strict';
import { allGameplayCards } from '../js/data/content.js?v=1.1.29';
import { collectionCards } from '../js/data/collection.js?v=1.1.29';
import { superstars } from '../js/data/superstars.js?v=1.1.29';
import { decks } from '../js/data/decks.js?v=1.1.29';
import { LAUNCH_LIVE_SET_IDS, isPlayerVisibleSuperstar } from '../js/data/release.js?v=1.1.29';
import { sets } from '../js/data/sets.js?v=1.1.29';
import { rewardPrintingTierForSet } from '../js/data/reward-printings.js?v=1.1.29';
import { PROFILE_VERSION } from '../js/data/profile.js?v=1.1.29';

test('v0.99 certified launch-content freeze carries forward into v1.0',()=>{
  assert.equal(Object.keys(superstars).length,76); assert.equal(Object.keys(decks).length,76);
  assert.equal(allGameplayCards.length,706); assert.equal(collectionCards.length,782); assert.equal(LAUNCH_LIVE_SET_IDS.length,5);
  const visible=Object.values(superstars).filter(s=>isPlayerVisibleSuperstar(s,{unlockedSuperstars:['john-cena']})); assert.equal(visible.length,41);
});

test('v0.99 reward-only Ruby policy carries forward into v1.0',()=>{
  const rewardSets=Object.values(sets).filter(s=>s?.type==='season-exclusive'||s?.type==='future-reward'); assert.ok(rewardSets.length>0);
  for(const s of rewardSets) assert.equal(rewardPrintingTierForSet(s.id),'ruby',s.id);
});

test('v0.99 certified v42 profile schema carries forward into v1.0',()=>{ assert.equal(PROFILE_VERSION,42); });
