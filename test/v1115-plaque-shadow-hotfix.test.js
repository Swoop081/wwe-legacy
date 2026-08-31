import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const shared=fs.readFileSync(new URL("../js/shared/card-face-renderer.js",import.meta.url),"utf8");

test("v1.1.15 Card Art Studio draws no shade behind the lower plaque",()=>{
  assert.doesNotMatch(shared,/createLinearGradient\(0,height\*\.58/);
  assert.match(shared,/ctx\.save\(\);ctx\.shadowColor="transparent";ctx\.fillStyle=plate/);
  assert.match(studio,/renderer\.drawFace\(ctx,card,/);
});

test("v1.1.15 live layered plaque has no outer shadow or pseudo-element bleed",()=>{
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-data::before\{[\s\S]*?box-shadow:none/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-data::after\{display:none!important;content:none!important\}/);
});
