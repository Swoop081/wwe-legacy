import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));
const pkg=JSON.parse(fs.readFileSync(new URL("../package.json",import.meta.url),"utf8"));
const golden=fs.readFileSync(new URL("../assets/images/set-logos/golden-era-set-logo.png",import.meta.url));

test("v1.1.8-or-later markers retain the v1.1.8 presentation contract",()=>{
  assert.ok(Number(build.version.split(".").join(""))>=118);
  assert.ok(Number(pkg.version.split(".").join(""))>=118);
  assert.match(build.physicalIphoneSmoke,/^pending-v1\.1\.\d+-user-smoke$/);
});

test("all non-move Studio card families receive doubled secondary/type typography",()=>{
  assert.match(studio,/const KIND_LABELS=\{superstar:"SUPERSTAR",variant:"SUPERSTAR VARIANT",move:"MOVE",entrance:"ENTRANCE",manager:"MANAGER",action:"ACTION",momentum:"MOMENTUM",merch:"MERCH"\}/);
  assert.match(studio,/ctx\.font=cardFont\(META_STACK,29,950\);drawTrackedText\(type,w\*\.5,h\*\.909,1\.0\*s\)/);
  assert.doesNotMatch(studio,/cardFont\(META_STACK,14\.5,900\);drawTrackedText\(type/);
});

test("live layered utility and Superstar secondary labels match the enlarged treatment",()=>{
  assert.match(css,/ccg-live-front-utility \.ccg-live-type\{top:92\.5%;font-size:4\.7cqw\}/);
  assert.match(css,/ccg-superstar-nameplate small\{font-size:clamp\(8px,5\.2cqw,16px\);font-weight:950/);
  assert.doesNotMatch(css,/ccg-live-front-utility \.ccg-live-type\{top:92\.5%;font-size:2\.35cqw\}/);
});

test("Golden Era retains a local transparent fallback and the same apparent-size envelope as Attitude/New Generation",()=>{
  assert.match(studio,/SET_LOGO_FALLBACK_ASSETS=\{"golden-era-series-1":"assets\/images\/set-logos\/golden-era-set-logo\.png"\}/);
  assert.match(app,/SET_LOGO_FALLBACK_ASSETS = \{ "golden-era-series-1": assetUrl\("assets\/images\/set-logos\/golden-era-set-logo\.png"\) \}/);
  assert.match(studio,/const CARD_STUDIO_SET_LOGO_OVERRIDES=\{\};/);
  assert.match(studio,/"new-generation-series-1":\{maxW:\.235,maxH:\.105\}/);
  assert.match(studio,/"golden-era-series-1":\{maxW:\.235,maxH:\.105\}/);
  assert.match(studio,/"attitude-era-series-1":\{maxW:\.235,maxH:\.105\}/);
  assert.match(studio,/function visibleLogoBounds\(im\)/);
});

test("Golden Era runtime asset is an RGBA PNG rather than an opaque pasted square",()=>{
  assert.equal(golden.subarray(1,4).toString("ascii"),"PNG");
  // PNG IHDR colour type byte: 6 = truecolour with alpha.
  assert.equal(golden[25],6);
});
