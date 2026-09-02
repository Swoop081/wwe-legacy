import test from 'node:test';
import assert from 'node:assert/strict';
import { superstars } from '../js/data/superstars.js?v=1.1.102';
import { decks } from '../js/data/decks.js?v=1.1.102';
import { allGameplayCards } from '../js/data/content.js?v=1.1.102';

const activeSetIds=new Set(['evolution-series-1','attitude-era-series-1','ruthless-aggression-series-1','golden-era-series-1','summerslam-series-1','raw-series-1','smackdown-series-1','new-generation-series-1','nxt-series-1','worlds-collide-series-1']);

test('AJ Styles October Reward package is fully authored and Amethyst-only',()=>{
  const aj=Object.values(superstars).find(s=>s.id==='aj-styles'); assert.ok(aj); assert.equal(aj.setId,'rewards-october-2026'); assert.equal(decks['aj-styles'].length,60);
  assert.deepEqual(aj.signatures,['aj-styles-pele-kick','aj-styles-ushigoroshi','aj-styles-calf-crusher','aj-styles-phenomenal-forearm','aj-styles-styles-clash']);
  for(const id of [...aj.signatures,'special-aj-styles','aj-styles-house-that-aj-styles-built','entrance-aj-styles']) { const c=allGameplayCards.find(x=>x.id===id); assert.ok(c,id); assert.equal(c.fixedPrintingTier,'amethyst',id); }
  assert.equal(allGameplayCards.find(c=>c.id==='aj-styles-phenomenal-forearm').trademark,true);
  assert.equal(allGameplayCards.find(c=>c.id==='aj-styles-styles-clash').finisher,true);
});

test('active balance certification pool is exactly 81',()=>{
 const pool=Object.values(superstars).filter(s=>decks[s.id]?.length===60&&(activeSetIds.has(s.setId)||s.id==='aj-styles'));
 assert.equal(pool.length,81);
 assert.ok(pool.some(s=>s.id==='aj-styles'));
 assert.ok(!pool.some(s=>['giulia','carmelo-hayes','baron-corbin','rey-fenix','jimmy-uso'].includes(s.id)));
});
