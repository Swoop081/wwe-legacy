import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { runRulesInteractionMatrix } from '../tools/rules-interaction-matrix.mjs';
import { superstars } from '../js/data/superstars.js?v=1.1.36';

test('v0.15.00 Rules Interaction Matrix certifies the core gameplay combinations',()=>{
  const report=runRulesInteractionMatrix();
  assert.ok(report.cases>=20,`expected >=20 matrix cases, got ${report.cases}`);
  assert.equal(report.failed,0,JSON.stringify(report.failures,null,2));
});

test('v0.15.00 core MatchEngine has a single canonical Pin implementation',()=>{
  const src=fs.readFileSync(new URL('../js/engine/MatchEngine.js',import.meta.url),'utf8');
  assert.equal((src.match(/\battemptPin\(pid\)\{/g)||[]).length,1);
  assert.equal((src.match(/\b_pinChance\(pid\)\{/g)||[]).length,1);
});

test('v0.15.00 final balance floor moves Becky Lynch to HP 69',()=>{
  assert.equal(superstars.beckyLynch.hp,69);
});
