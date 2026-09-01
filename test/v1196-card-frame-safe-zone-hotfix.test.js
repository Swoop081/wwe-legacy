import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const css=fs.readFileSync(new URL("../css/v1.1.96-card-frame-safe-zone-hotfix.css",import.meta.url),"utf8");
const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const shared=fs.readFileSync(new URL("../js/shared/card-face-renderer.js",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");

test("v1.1.96 rules backs sit inside the physical printing frame",()=>{
  assert.ok(css.includes("padding:calc(var(--print-frame-width) + 1.05cqw)!important"));
  assert.ok(css.includes("-webkit-line-clamp:11!important"));
});

test("v1.1.96 removes the retired Card Studio frame from new exports",()=>{
  const start=studio.indexOf("function drawFrameOverlay()");
  const end=studio.indexOf("function drawHeadshot()",start);
  const overlay=studio.slice(start,end);
  assert.ok(overlay.includes("drawPhysicalPrintingFrame()"));
  assert.equal(overlay.includes("frame(ctx"),false);
});

test("v1.1.96 stars and set logo use the enlarged physical safe zone",()=>{
  assert.ok(studio.includes("safeRight=w*(1-.088),safeTop=h*.072"));
  assert.ok(studio.includes("const x=65*s,y=80*s+i*31*s"));
  assert.ok(shared.includes("const cx=65*s,cy=(80+i*31)*s"));
  assert.ok(css.includes("left:9.55%!important"));
  assert.ok(css.includes("top:7.1%!important"));
});

test("v1.1.96 legacy corner border is covered by the new frame geometry",()=>{
  assert.ok(css.includes("--print-frame-width:6.25cqw!important"));
  assert.ok(css.includes("--print-frame-radius:4.45cqw"));
  assert.ok(css.includes("width:98.5%!important"));
  assert.ok(css.includes("height:98.5%!important"));
});

test("v1.1.96 hotfix stylesheet loads after the physical-frame stylesheet",()=>{
  const physical=html.indexOf("v1.1.76-five-tier-physical-frame.css");
  const hotfix=html.indexOf("v1.1.96-card-frame-safe-zone-hotfix.css");
  assert.ok(physical>=0 && hotfix>physical);
});
