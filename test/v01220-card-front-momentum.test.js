import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allGameplayCards } from '../js/data/content.js?v=1.1.108';
import { canCounter } from '../js/engine/rules.js?v=1.1.108';

const byId=id=>allGameplayCards.find(c=>c.id===id);

test('v0.12.20 Leapfrog is an Agility-1 Running Aerial reversal without broad-type leakage',()=>{
  const leapfrog=byId('leapfrog');
  assert.ok(leapfrog);
  assert.deepEqual(leapfrog.requirements,{agility:1});
  assert.deepEqual(leapfrog.counterStates,['running-aerial']);
  assert.deepEqual(leapfrog.counters,[]);
  const running=allGameplayCards.find(c=>c.counterState==='running-aerial'&&!c.defensiveOnly);
  const diving=allGameplayCards.find(c=>c.counterState==='diving-aerial'&&!c.defensiveOnly);
  assert.ok(running&&diving);
  assert.equal(canCounter(running,leapfrog),true);
  assert.equal(canCounter(diving,leapfrog),false);
});

test('v0.12.57 finished Move fronts trust the printed Card Art Studio Cost and Damage',()=>{
  const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
  const css=fs.readFileSync(new URL('../css/game.css',import.meta.url),'utf8');
  assert.ok(app.includes('moveFront && (finishedFront || layeredFront) ? "is-full-art-move"'));
  assert.match(app,/: finishedFront\s*\n\s*\? `<span class="ccg-card-art/,'legacy flat finished fronts still render without live overlay');
  assert.match(css,/\.ccg-card\.is-full-art-finished \.ccg-card-stats[\s\S]*display:none!important/);
  assert.match(app,/ccg-rules-statline/,'Cost and Damage remain available on the rules back');
});

test('v0.12.57 Momentum cards retain canonical colours while retiring the fire motif',()=>{
  const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
  const css=fs.readFileSync(new URL('../css/game.css',import.meta.url),'utf8');
  const studio=fs.readFileSync(new URL('../js/tools/card-art-studio.js',import.meta.url),'utf8');
  assert.ok(app.includes('class="momentum-arena-lines"'));
  assert.ok(app.includes('<em>MOMENTUM</em>'));
  assert.doesNotMatch(app,/class="momentum-flames"/);
  for(const [method,color] of Object.entries({strength:'#ff8a1f',strike:'#ef3f4e',technical:'#36c86f',agility:'#2fa8ff'})){
    assert.ok(css.includes(`--momentum-${method}:${color}`),`${method} live colour`);
    assert.ok(studio.includes(`color:"${color}"`),`${method} Studio colour`);
  }
  assert.ok(css.includes('.momentum-arena-lines i{'));
  assert.ok(css.includes('font-size:38cqw!important'));
  assert.ok(studio.includes('function drawMomentumArenaBeam('));
  assert.doesNotMatch(studio,/function drawMomentumFlame\(/);
});

test('Card Art Studio keeps Cost and Damage dominant and mobile-readable without nested boxes',()=>{
  const studio=fs.readFileSync(new URL('../js/tools/card-art-studio.js',import.meta.url),'utf8');
  const shared=fs.readFileSync(new URL('../js/shared/card-face-renderer.js',import.meta.url),'utf8');
  assert.ok(!studio.includes('const statBox=(cx,label,value)=>'));
  assert.match(shared,/size:64\*s/);
  assert.match(shared,/stat\(width\*\.16,"COST",card\.cost\?\?0\)/);
  assert.match(shared,/stat\(width\*\.84,"DAMAGE",card\.damage\?\?0\)/);
  assert.match(shared,/ctx\.fillRect\(left,top,pw,bottom-top\)/);
});
