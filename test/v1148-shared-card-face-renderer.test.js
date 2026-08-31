import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = rel => fs.readFileSync(new URL(`../${rel}`, import.meta.url), "utf8");
const build = JSON.parse(read("build.json"));
const renderer = read("js/shared/card-face-renderer.js");
const app = read("js/ui/app.js");
const studio = read("js/tools/card-art-studio.js");
const index = read("index.html");
const studioHtml = read("tools/card-art-studio.html");

test("v1.1.48 gives Card Studio and the live game one shared dynamic face renderer", () => {
  assert.equal(build.version, "1.1.48");
  assert.match(index, /js\/shared\/card-face-renderer\.js\?v=1\.1\.48[\s\S]*js\/ui\/app\.js/);
  assert.match(studioHtml, /js\/shared\/card-face-renderer\.js\?v=1\.1\.48[\s\S]*js\/tools\/card-art-studio\.js/);
  assert.match(app, /const renderer=globalThis\.WWELegacyCardFaceRenderer;[\s\S]*renderer\.drawFace\(ctx,card,/);
  assert.match(studio, /const renderer=globalThis\.WWELegacyCardFaceRenderer;[\s\S]*renderer\.drawFace\(ctx,card,/);
  assert.match(studio, /renderer\.drawRarityStars\(ctx,card,/);
});

test("shared renderer keeps all printed move fields data-driven", () => {
  assert.match(renderer, /String\(card\.name\|\|""\)\.toUpperCase\(\)/);
  assert.match(renderer, /stat\(width\*\.16,"COST",card\.cost\?\?0\)/);
  assert.match(renderer, /stat\(width\*\.84,"DAMAGE",card\.damage\?\?0\)/);
  assert.match(renderer, /Object\.entries\(card\.requirements\|\|\{\}\)/);
  assert.match(renderer, /rarity=Math\.max\(1,Math\.min\(4,Number\(card\?\.rarity\)\|\|1\)\)/);
  assert.match(renderer, /String\(card\.moveType\|\|card\.method\|\|"move"\)\.toUpperCase\(\)/);
  assert.doesNotMatch(renderer, /finishedCardArtFor|\.webp["']/);
});

test("shared renderer owns the exact Card Studio plaque geometry and method-dot geometry", () => {
  assert.match(renderer, /bottom=height\*\.958,top=isMove\?height\*\.740:height\*\.772,left=width\*\.052,pw=width\*\.896/);
  assert.match(renderer, /nameY=\(isMove\?height\*\.787:height\*\.852\)/);
  assert.match(renderer, /height\*\.829/);
  assert.match(renderer, /height\*\.884/);
  assert.match(renderer, /height\*\.866/);
  assert.match(renderer, /hasReq\?\.929:\.895/);
  assert.match(renderer, /r=17\.4\*s,gap=10\*s/);
});

test("typography is deterministic vector geometry rather than an iPhone/Desktop font fallback", () => {
  assert.match(renderer, /const FONT=\{upm:2048,ascent:1900,descent:-500,glyphs:/);
  assert.match(renderer, /new Path2D\(g\.p\)/);
  assert.match(renderer, /function drawVectorText\(/);
  assert.doesNotMatch(renderer, /Bahnschrift|Avenir Next Condensed|DIN Alternate|Arial Narrow/);
});
