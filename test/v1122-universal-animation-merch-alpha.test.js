import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=(p)=>fs.readFileSync(path.join(root,p),"utf8");

test("v1.1.22 enables optional animation for every card identity",()=>{
  const src=read("js/data/animated-card-art.js");
  assert.match(src,/return Boolean\(card && card\.id\)/);
  const studio=read("js/tools/card-art-studio.js");
  assert.match(studio,/function isAnimationEligible\(card=currentCard\(\)\)\{return !!card&&!!card\.id;\}/);
  assert.doesNotMatch(studio,/static-only/);
});

test("v1.1.22 animated media cannot replace the full physical card shell",()=>{
  const css=read("css/game.css");
  assert.match(css,/left:4\.2%!important;right:4\.2%!important;top:3\.6%!important;bottom:24\.2%!important/);
  assert.match(css,/ccg-animation-set-logo/);
  const app=read("js/ui/app.js");
  assert.match(app,/function animatedCardSurfaceMarkup\(card\).*setLogoMarkup\(card\.setId, "ccg-animation-set-logo"\)/s);
});

test("v1.1.22 Merch base plate alpha is enforced after final composition",()=>{
  const studio=read("js/tools/card-art-studio.js");
  assert.match(studio,/function clearMerchPlaqueFootprint\(\)/);
  assert.match(studio,/globalCompositeOperation="destination-out"/);
  assert.match(studio,/drawFrameOverlay\(\);clearMerchPlaqueFootprint\(\);/);
});
