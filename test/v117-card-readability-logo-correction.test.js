import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));
const pkg=JSON.parse(fs.readFileSync(new URL("../package.json",import.meta.url),"utf8"));
const shared=fs.readFileSync(new URL("../js/shared/card-face-renderer.js",import.meta.url),"utf8");

test("v1.1.7-or-later markers retain the v1.1.7 presentation contract",()=>{
  assert.ok(Number(build.version.split(".").join(""))>=117);
  assert.ok(Number(pkg.version.split(".").join(""))>=117);
  assert.match(build.physicalIphoneSmoke,/^pending-v1\.1\.\d+-user-smoke$/);
});

test("Attitude Era uses New Generation apparent-size profile and trims transparent logo padding",()=>{
  assert.match(studio,/"new-generation-series-1":\{maxW:\.235,maxH:\.105\}/);
  assert.match(studio,/"attitude-era-series-1":\{maxW:\.235,maxH:\.105\}/);
  assert.match(studio,/function visibleLogoBounds\(im\)/);
  assert.match(studio,/drawImageContainTopRight\(im,\{right,top,maxW,maxH\}\)/);
  assert.match(studio,/const safeRight=w\*\(1-\.075\),safeTop=h\*\.052/);
});

test("Golden Era uses the approved blue-white-orange classic WWF mark",()=>{
  assert.match(studio,/golden-era-series-1[^\n]*assets\/images\/set-logos\/golden-era-set-logo\.png/);
  assert.match(app,/golden-era-series-1[^\n]*assets\/images\/set-logos\/golden-era-set-logo\.png/);
  assert.match(studio,/delete EXPORT_SAFE_SET_LOGOS\["golden-era-series-1"\]/,"file-protocol Studio must not resurrect the obsolete Golden Era fallback");
});

test("Method dots are doubled and every dot uses identical spacing regardless of colour group",()=>{
  assert.match(shared,/r=17\.4\*s,gap=10\*s,dots=groups\.flatMap/);
  assert.doesNotMatch(studio,/within=6\.2\*s,between=12\.5\*s/);
  assert.match(css,/\.ccg-method-dots\{display:flex;align-items:center;justify-content:center;gap:1\.15cqw;width:100%\}/);
  assert.match(css,/\.ccg-method-dot-group\{display:contents\}/);
  assert.match(css,/width:6\.1cqw;height:6\.1cqw/);
  assert.match(css,/\.ccg-method-dot-group\+\.ccg-method-dot-group\{margin-left:0\}/);
});

test("move plaque sits clear of the bottom border with no panel shadow bleed",()=>{
  assert.match(css,/bottom:4\.2%;height:21\.8%/);
  assert.match(css,/\.ccg-live-front-data::before\{[\s\S]*?box-shadow:none/);
  assert.match(shared,/bottom=height\*\.958,top=isMove\?height\*\.740:height\*\.772/);
  assert.match(shared,/ctx\.shadowColor="transparent"/);
});

test("COST DAMAGE and move type are larger while move type wraps only when it cannot fit",()=>{
  assert.match(shared,/size:29\*s/);
  assert.match(css,/ccg-live-stat small\{[^}]*font-size:4\.7cqw/);
  assert.match(shared,/vectorMeasure\(line,fontSize,1\*s,1\)<=maxW/);
  assert.match(shared,/fontSize=\(hasReq\?34:40\)\*s/);
  assert.match(css,/ccg-live-front-move \.ccg-live-type\.has-requirement\{[^}]*font-size:5\.3cqw/);
  assert.match(css,/white-space:normal;font-size:5\.3cqw/);
});
