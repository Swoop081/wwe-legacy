import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));
const pkg=JSON.parse(fs.readFileSync(new URL("../package.json",import.meta.url),"utf8"));
const pngUrl=new URL("../assets/images/branding-new-generation-series-1-new-generation-logo.png",import.meta.url);

function pngDimensions(buffer){
  assert.equal(buffer.toString("ascii",1,4),"PNG");
  return {width:buffer.readUInt32BE(16),height:buffer.readUInt32BE(20)};
}

test("v1.1.10-or-later markers retain the New Generation hotfix contract",()=>{
  const parts=String(build.version).split(".").map(Number);
  assert.ok(parts[0]>1 || (parts[0]===1 && (parts[1]>1 || (parts[1]===1 && parts[2]>=10))));
  assert.equal(pkg.version,build.version);
  assert.match(build.physicalIphoneSmoke,/^pending-v1\.1\.\d+-user-smoke$/);
});

test("New Generation runtime logo is a packaged high-resolution PNG in Studio and live UI",()=>{
  const png=fs.readFileSync(pngUrl);
  const {width,height}=pngDimensions(png);
  assert.ok(width>=1000 && height>=900,{width,height});
  assert.match(studio,/"new-generation-series-1":"assets\/images\/branding-new-generation-series-1-new-generation-logo\.png"/);
  assert.match(app,/"new-generation-series-1": assetUrl\("assets\/images\/branding-new-generation-series-1-new-generation-logo\.png"\)/);
});

test("New Generation file-mode Studio fallback is raster, not the partial-rendering SVG data URI",()=>{
  assert.match(studio,/EXPORT_SAFE_SET_LOGOS\["new-generation-series-1"\] = "data:image\/png;base64,/);
  assert.doesNotMatch(studio,/EXPORT_SAFE_SET_LOGOS\["new-generation-series-1"\] = "data:image\/svg\+xml;base64,/);
});

test("New Generation keeps its approved apparent size and protected corner anchor",()=>{
  assert.match(studio,/"new-generation-series-1":\{maxW:\.235,maxH:\.105\}/);
  assert.match(studio,/const safeRight=w\*\(1-\.075\),safeTop=h\*\.052/);
});
