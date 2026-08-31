import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));
const shared=fs.readFileSync(new URL("../js/shared/card-face-renderer.js",import.meta.url),"utf8");

test("v1.1.46 uses a 680x1000 Canvas ink layer instead of the SVG approximation",()=>{
  assert.ok(Number(build.version.split(".")[2]) >= 46, `expected v1.1.46+, got ${build.version}`);
  assert.match(app,/class="ccg-card-studio-ink" width="680" height="1000"/);
  assert.match(app,/function paintCardStudioInk\(canvas,card\)/);
  assert.match(app,/function renderCardStudioInkLayers\(scope=document\)/);
  assert.match(app,/layeredCardStudioInkMarkup\(card\)/);
  assert.match(css,/v1\.1\.46 — Card Studio Canvas is the live printed face/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-svg,[\s\S]*display:none!important/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-card-studio-ink\{[\s\S]*z-index:4!important/);
});

test("v1.1.46+ keeps the Card Studio move coordinates in the active Canvas source of truth",()=>{
  const source=Number(build.version.split(".")[2])>=48?shared:app;
  assert.match(source,/nameY=\(isMove\?height\*\.787:height\*\.852\)|const nameY=isMove\?787:852/);
  assert.match(source,/stat\(width\*\.16,"COST",card\.cost\?\?0\)|statFigure\(108\.8,"COST",card\.cost\?\?0\)/);
  assert.match(source,/stat\(width\*\.84,"DAMAGE",card\.damage\?\?0\)|statFigure\(571\.2,"DAMAGE",card\.damage\?\?0\)/);
  assert.match(source,/height\*\.866|cardStudioDrawRequirementDots\(ctx,card,340,866\)/);
  assert.match(source,/hasReq\?\.929:\.895|hasReq\?929:895/);
  assert.match(source,/r=17\.4\*s,gap=10\*s|const r=17\.4,gap=10/);
});

test("v1.1.46 removes the separate live CSS/SVG method-dot transform that displaced dots on iPhone",()=>{
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-svg,[\s\S]*\.ccg-superstar-nameplate\{\s*display:none!important/);
  assert.match(shared,/ctx\.arc\(x,y,r,0,Math\.PI\*2\)/);
  assert.doesNotMatch(css,/v1\.1\.46[\s\S]*ccg-card-studio-ink[\s\S]*transform:translate\(-50%,-50%\)/);
});
