import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js?v=1.1.97';
import { decks } from '../js/data/decks.js?v=1.1.97';

test('v1.1.79 balance lab covers the complete 97-Superstar recommendation roster',()=>{
  const ids=Object.values(superstars).filter(s=>s.id!=='aj-styles'&&Array.isArray(decks[s.id])&&decks[s.id].length===60);
  assert.equal(ids.length,97);
  assert.ok(ids.every(s=>decks[s.id].length===60));
});
test('v1.1.79 permanent baseline report covers every unique pairing without stalls',()=>{
  const r=JSON.parse(fs.readFileSync(new URL('../reports/v1.1.79-full-roster-balance-lab.json',import.meta.url)));
  assert.equal(r.superstars,97); assert.equal(r.uniquePairings,4656); assert.equal(r.matches,18624); assert.equal(r.stalls,0);
  assert.equal(r.rows.length,97); assert.ok(r.rows.every(x=>Number.isFinite(x.winRate)));
});
test('v1.1.79 is diagnostic only and records actionable outliers',()=>{
  const r=JSON.parse(fs.readFileSync(new URL('../reports/v1.1.79-full-roster-balance-lab.json',import.meta.url)));
  assert.ok(r.highOutliers.some(x=>x.id==='jade-cargill'));
  assert.ok(r.lowOutliers.some(x=>x.id==='giulia'));
  assert.ok(fs.readFileSync(new URL('../tools/full-roster-balance-lab.mjs',import.meta.url),'utf8').includes('BALANCE_GAMES_PER_PAIR'));
});
