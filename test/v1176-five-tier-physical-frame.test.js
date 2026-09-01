import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/v1.1.76-five-tier-physical-frame.css',import.meta.url),'utf8');
const studioHtml=fs.readFileSync(new URL('../tools/card-art-studio.html',import.meta.url),'utf8');
const studioJs=fs.readFileSync(new URL('../js/tools/card-art-studio.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('collectible fronts and rules backs carry the physical printing frame',()=>{
  assert.match(app,/ccg-card-front[^\n]*ccg-print-frame/);
  assert.match(app,/ccg-card-rules[\s\S]*ccg-print-frame/);
});

test('all five printing tiers have explicit physical frame identities',()=>{
  for(const [tier,color] of Object.entries({normal:'#f4f3ef',emerald:'#16b85c',sapphire:'#176fe2',ruby:'#d92b42',amethyst:'#8238d4'})){
    assert.match(css,new RegExp(`(?:tier-${tier}|data-card-tier=\\"${tier}\\")[\\s\\S]*${color}`,'i'));
  }
  assert.match(css,/--print-frame-width:5\.1cqw/);
  assert.match(css,/physical frame is the primary rarity read/i);
});

test('Card Studio previews all five physical printing tiers',()=>{
  assert.match(studioHtml,/id="printing-tier-preview"/);
  for(const label of ['Base · White','Emerald · Green','Sapphire · Blue','Ruby · Red','Amethyst · Purple']) assert.ok(studioHtml.includes(label));
  assert.match(studioJs,/PRINTING_TIER_FRAMES/);
  assert.match(studioJs,/drawPhysicalPrintingFrame/);
  assert.match(studioJs,/Base Plate exports remain tier-neutral/);
});

test('v1.1.76 physical frame stylesheet is loaded after existing presentation styles',()=>{
  const old=index.indexOf('v1.1.63-play-path-portraits.css');
  const frame=index.indexOf('v1.1.76-five-tier-physical-frame.css');
  assert.ok(old>=0 && frame>old);
});
