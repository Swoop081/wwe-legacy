import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/game.css',import.meta.url),'utf8');
const artwork=fs.readFileSync(new URL('../js/data/artwork.js',import.meta.url),'utf8');
const build=JSON.parse(fs.readFileSync(new URL('../build.json',import.meta.url),'utf8'));

test('v1.1.38 saved Card Studio base plates are the runtime source of truth',()=>{
  assert.ok(Number(build.version.split('.')[2])>=38,`expected v1.1.38+ build, got ${build.version}`);
  assert.match(artwork,/canonicalBasePlatePath/);
  assert.match(app,/Card Studio layered\/base-plate exports are the canonical saved card/);
  assert.match(app,/class="ccg-layered-card-plate ccg-load-guard" src="\$\{layered\}"/);
  assert.match(app,/const layeredFront = card\.kind !== "momentum" && Boolean\(layeredCardArtFor\(card\)\)/);
  assert.match(app,/const finishedFront = !layeredFront/);
  assert.doesNotMatch(app,/const forcedFinishedFront = finishedFront/);
});

test('v1.1.38 no animation leaves the saved static card untouched',()=>{
  const at=app.indexOf('function loadAnimatedCardPlate(img)');
  const end=app.indexOf('function unloadAnimatedCardPlate(img)',at);
  const block=app.slice(at,end);
  assert.match(block,/linked \|\| webp \|\| gif/);
  assert.match(block,/leave the saved static Card Studio front/);
  assert.doesNotMatch(block,/animation-fell-back-to-finished/);
  assert.doesNotMatch(block,/dataset\.flatFinishedArt/);
  assert.doesNotMatch(block,/querySelector\("\.ccg-layered-card-plate"\)/);
});

test('v1.1.38 animated cards use full set field and centre video between top border and plaque',()=>{
  assert.match(app,/ccg-animated-set-background/);
  assert.match(app,/ccg-animated-set-logo/);
  assert.match(css,/\.ccg-card\.has-active-animation \.ccg-animated-set-background\{[\s\S]*left:4\.8%!important;right:4\.8%!important;top:4\.4%!important;bottom:4\.4%!important/);
  assert.match(css,/\.ccg-card\.has-active-animation \.ccg-animated-card-surface\{[\s\S]*top:4\.8%!important;[\s\S]*bottom:22\.8%!important/);
  assert.match(css,/\.ccg-card\.type-move\.has-active-animation \.ccg-animated-card-surface\{bottom:26%!important\}/);
  assert.match(css,/object-fit:contain!important;object-position:center center!important/);
  assert.match(css,/\.ccg-card\.set-summerslam-series-1 \.ccg-animated-set-background\{[\s\S]*#07172b[\s\S]*#153d70[\s\S]*#8d2c58[\s\S]*#ee6f32/);
  assert.doesNotMatch(css,/set-summerslam-series-1\.type-move \.ccg-animated-card-surface\{background:/);
});

test('v1.1.38 plaque and set logo remain above animated artwork',()=>{
  assert.match(css,/\.ccg-card\.has-active-animation \.ccg-animated-card-surface\{[\s\S]*z-index:3!important/);
  assert.match(css,/\.ccg-card\.has-active-animation \.ccg-live-front-data,[\s\S]*z-index:4!important/);
  assert.match(css,/\.ccg-card\.has-active-animation \.ccg-animated-set-logo\{[\s\S]*z-index:5!important/);
});

