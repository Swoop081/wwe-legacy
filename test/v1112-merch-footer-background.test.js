import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=relative=>fs.readFileSync(new URL(`../${relative}`,import.meta.url),'utf8');

test('v1.1.12 Merch art is clipped above the lower identity plaque',()=>{
  const studio=read('js/tools/card-art-studio.js');
  assert.match(studio,/if\(card\?\.kind==="merch"\)\{[\s\S]*?ctx\.rect\(0,0,w,h\*\.772\);[\s\S]*?ctx\.clip\(\);[\s\S]*?ctx\.drawImage\(im,x,y,dw,dh\);/);
});

test('v1.1.12 Merch correction preserves the existing utility plaque geometry',()=>{
  const studio=read('js/tools/card-art-studio.js');
  assert.match(studio,/panelTop=isMove\?h\*\.740:h\*\.772/);
  assert.match(studio,/panelBottom=h\*\.958/);
});

test('v1.1.12 does not add a white footer fill or extra Merch plaque box',()=>{
  const studio=read('js/tools/card-art-studio.js');
  const drawArt=studio.slice(studio.indexOf('function drawArt()'),studio.indexOf('function drawImageContain('));
  assert.doesNotMatch(drawArt,/fillRect\(/);
});
