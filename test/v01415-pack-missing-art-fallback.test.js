import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync(new URL("../js/ui/app.js", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../css/game.css", import.meta.url), "utf8");

test("v0.14.15 runtime card-art failures expose the canonical rules face directly", () => {
  const runtimeFallbacks = app.match(/classList\.add\('uses-rules-fallback','force-rules-face'\)/g) ?? [];
  assert.ok(runtimeFallbacks.length >= 3, `expected >=3 runtime fallback paths, got ${runtimeFallbacks.length}`);
  assert.match(app, /missingCustomFront \? "uses-rules-fallback force-rules-face"/);
  assert.match(css, /\.ccg-card\.force-rules-face \.ccg-card-front\{[\s\S]*?display:none!important/);
  assert.match(css, /\.ccg-card\.force-rules-face \.ccg-card-rules\{[\s\S]*?transform:none!important/);
});

test("v0.14.15 pack reveal and summary continue to use the canonical collectible renderer", () => {
  assert.match(app, /extraClass:"booster-ccg"/);
  assert.match(app, /extraClass:"pack-summary-ccg"/);
  assert.match(app, /Tap any card to inspect it\./);
});
