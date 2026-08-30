import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");

test("all Studio set logos use the protected top-right safe zone",()=>{
  assert.match(studio,/safeRight=w\*\(1-\.075\),safeTop=h\*\.052/);
  assert.match(studio,/drawImageContainTopRight/);
  assert.match(studio,/"nxt-series-1":\{maxW:\.235,maxH:\.105\}/);
  assert.match(studio,/"smackdown-series-1":\{maxW:\.255,maxH:\.10\}/);
  assert.doesNotMatch(studio,/isNxt.*maxW=w\*\.40/);
  assert.doesNotMatch(studio,/isSmackdown.*maxW=w\*\.42/);
});

test("every Reward family uses the WWE Legacy REWARD logo, including Trish",()=>{
  for(const setId of ["season-1-final-boss","season-1-last-time-is-now","season-2-whos-next","parked-chyna"]){
    assert.ok(studio.includes(`SET_LOGO_ASSETS["${setId}"]="assets/images/branding-wwe-legacy-reward-logo.png"`) || studio.includes(`"${setId}":"assets/images/branding-wwe-legacy-reward-logo.png"`), `${setId} must use the Reward logo source`);
    assert.ok(studio.includes(`EXPORT_SAFE_SET_LOGOS["${setId}"] = "data:image/png;base64,`), `${setId} must have the export-safe Reward mark`);
  }
  assert.ok(!studio.includes('"season-1-last-time-is-now":"assets/images/art-season-1-final-boss-rewards-logo.png"'));
});

test("front requirements render Momentum-colour dots instead of method words",()=>{
  assert.match(app,/layeredFrontRequirementDotsMarkup/);
  assert.match(app,/ccg-method-dot-group method-\$\{key\}/);
  assert.match(css,/method-strength\{--method-dot:#ff8a1f\}/);
  assert.match(css,/method-strike\{--method-dot:#ef3f4e\}/);
  assert.match(css,/method-technical\{--method-dot:#36c86f\}/);
  assert.match(css,/method-agility\{--method-dot:#2fa8ff\}/);
  assert.match(studio,/drawRequirementDots\(card,w\*\.5,h\*\.(?:875|866)\)/);
  assert.doesNotMatch(studio,/fittedMetaFont\(req,w\*\.47,23,16\)/);
});
