import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");

test("v1.1.15 Card Art Studio draws no shade behind the lower plaque",()=>{
  const start=studio.indexOf("function drawBottomIdentity()");
  const end=studio.indexOf("function drawRarityStars", start);
  const block=studio.slice(start,end>start?end:studio.length);
  assert.doesNotMatch(block,/createLinearGradient\(0,h\*\.58,0,panelTop\)/);
  assert.doesNotMatch(block,/fillRect\(0,h\*\.58,w,panelTop-h\*\.58\)/);
  assert.match(block,/ctx\.shadowColor="transparent";ctx\.shadowBlur=0;ctx\.shadowOffsetX=0;ctx\.shadowOffsetY=0/);
});

test("v1.1.15 live layered plaque has no outer shadow or pseudo-element bleed",()=>{
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-data::before\{[\s\S]*?box-shadow:none/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-data::after\{display:none!important;content:none!important\}/);
});
