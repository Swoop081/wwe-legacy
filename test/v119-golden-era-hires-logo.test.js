import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));
const pkg=JSON.parse(fs.readFileSync(new URL("../package.json",import.meta.url),"utf8"));
const source="https://loodibee.com/wp-content/uploads/World-Wrestling-Federation-WWF-Logo-1985-1998-3D.png";

test("v1.1.9-or-later markers retain the Golden Era hi-res contract",()=>{
  assert.ok(Number(build.version.split(".").join(""))>=119);
  assert.ok(Number(pkg.version.split(".").join(""))>=119);
  assert.match(build.physicalIphoneSmoke,/^pending-v1\.1\.\d+-user-smoke$/);
});

test("Golden Era prefers the approved high-resolution 1985-1998 3D WWF source in Studio and live UI",()=>{
  assert.ok(studio.includes(`"golden-era-series-1":"${source}"`));
  assert.ok(app.includes(`"golden-era-series-1": "${source}"`));
});

test("Golden Era keeps the v1.1.8 transparent local asset as a source-failure fallback without changing layout",()=>{
  assert.match(studio,/SET_LOGO_FALLBACK_ASSETS=\{"golden-era-series-1":"assets\/images\/set-logos\/golden-era-set-logo\.png"\}/);
  assert.match(studio,/if\(!image&&SET_LOGO_FALLBACK_ASSETS\[id\]\)image=await loadStudioSetLogo/);
  assert.match(app,/data-fallback-src/);
  assert.match(studio,/"golden-era-series-1":\{maxW:\.235,maxH:\.105\}/);
  assert.match(studio,/const safeRight=w\*\(1-\.075\),safeTop=h\*\.052/);
});
