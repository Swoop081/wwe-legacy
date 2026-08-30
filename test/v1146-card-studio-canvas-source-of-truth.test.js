import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));

test("v1.1.46 uses a 680x1000 Canvas ink layer instead of the SVG approximation",()=>{
  assert.equal(build.version,"1.1.46");
  assert.match(app,/class="ccg-card-studio-ink" width="680" height="1000"/);
  assert.match(app,/function paintCardStudioInk\(canvas,card\)/);
  assert.match(app,/function renderCardStudioInkLayers\(scope=document\)/);
  assert.match(app,/layeredCardStudioInkMarkup\(card\)/);
  assert.match(css,/v1\.1\.46 — Card Studio Canvas is the live printed face/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-svg,[\s\S]*display:none!important/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-card-studio-ink\{[\s\S]*z-index:4!important/);
});

test("v1.1.46 copies Card Studio move coordinates and tracked-text routines exactly",()=>{
  assert.match(app,/const nameY=isMove\?787:852/);
  assert.match(app,/statFigure\(108\.8,"COST",card\.cost\?\?0\)/);
  assert.match(app,/statFigure\(571\.2,"DAMAGE",card\.damage\?\?0\)/);
  assert.match(app,/cardStudioDrawRequirementDots\(ctx,card,340,866\)/);
  assert.match(app,/hasReq\?929:895/);
  assert.match(app,/const r=17\.4,gap=10/);
  assert.match(app,/const x=51,y=62\+i\*31/);
  assert.match(app,/cardStudioDrawTrackedText\(ctx,label,cx,829,1\.1\)/);
  assert.match(app,/cardStudioRuntimeFont\(CARD_STUDIO_RUNTIME_NUMBER_STACK,64,1000\)/);
});

test("v1.1.46 removes the separate live CSS/SVG method-dot transform that displaced dots on iPhone",()=>{
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-svg,[\s\S]*\.ccg-superstar-nameplate\{\s*display:none!important/);
  assert.match(app,/ctx\.arc\(x,y,r,0,Math\.PI\*2\)/);
  assert.doesNotMatch(css,/v1\.1\.46[\s\S]*ccg-card-studio-ink[\s\S]*transform:translate\(-50%,-50%\)/);
});
