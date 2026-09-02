import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

await import('../js/data/superstar-nameplates.js?v=1.1.125');
const profiles=globalThis.WWE_LEGACY_SUPERSTAR_NAMEPLATES;
const read=relative=>fs.readFileSync(new URL(`../${relative}`,import.meta.url),'utf8');

test('v1.1.11 every authored Superstar nameplate profile is non-italic',()=>{
  assert.ok(Object.keys(profiles).length>=95);
  for(const [id,p] of Object.entries(profiles)) assert.equal(p.italic,false,`${id} must be upright`);
});

test('v1.1.11 live Superstar name renderer hard-forces upright typography',()=>{
  const app=read('js/ui/app.js');
  const css=read('css/game.css');
  assert.match(app,/`--np-style:normal`/);
  assert.doesNotMatch(app,/p\.italic\s*\?\s*['"]italic/);
  assert.match(css,/\.ccg-superstar-nameplate strong\{[^}]*font-style:normal;/s);
});

test('v1.1.11 Card Art Studio draws Superstar names without italic font prefix',()=>{
  const studio=read('js/tools/card-art-studio.js');
  assert.match(studio,/const weight=Number\(p\.weight\?\?900\),style="",family=/);
  assert.doesNotMatch(studio,/p\.italic\?"italic "/);
});

test('v1.1.11 generated Superstar previews and Cena splash are upright',()=>{
  const css=read('css/game.css');
  assert.match(css,/\.generated-superstar-preview>strong\{[^}]*font-style:normal;/s);
  assert.match(css,/\.clean-launch-splash \.season-one-cena-name-text strong\{[^}]*font-style:normal!important;/s);
});
