import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = fs.readFileSync(path.join(root, "js/ui/app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "css/game.css"), "utf8");

test("Play hub is split into requested two-page mode groups", () => {
  assert.match(app, /const firstPageCards = `[\s\S]*play-exhibition[\s\S]*play-live-event[\s\S]*play-kotr/);
  assert.match(app, /const secondPageCards = `[\s\S]*play-championship[\s\S]*play-survivor-series/);
  assert.match(app, /play-page-\$\{page === 1 \? 'next' : 'back'\}/);
  assert.match(css, /\.legacy-mode-stack-featured\{grid-template-rows:repeat\(2,minmax\(224px,1fr\)\)!important\}/);
});

test("Live Events and Survivor Series use requested WWE.com profile renders", () => {
  assert.match(app, /"cody-rhodes": "https:\/\/www\.wwe\.com\/f\/styles\/talent_champion_lg\/public\/2026\/06\/CODY_RHODES_PROFILE\.png"/);
  assert.match(app, /"hulk-hogan": "https:\/\/www\.wwe\.com\/f\/styles\/talent_champion_lg\/public\/rd-talent\/Profile\/Hulk_Hogan_pro\.png"/);
  assert.match(app, /play-live-event[\s\S]*portraitMarkup\("cody-rhodes","Cody Rhodes"\)/);
  assert.match(app, /play-survivor-series[\s\S]*portraitMarkup\("hulk-hogan","Hulk Hogan"\)/);
});

test("Survivor Series shares the standard mode-logo typography system", () => {
  assert.match(app, /"survivor-series": \{ kicker: "4 VS 4 · CAPTURE THE ROSTER", top: "SURVIVOR", bottom: "SERIES" \}/);
  assert.match(app, /play-survivor-series[\s\S]*modeLogoMarkup\("survivor-series",true\)/);
  assert.doesNotMatch(app, /play-survivor-series[\s\S]{0,500}<strong class="mode-text-logo">/);
  assert.match(css, /\.mode-survivor-series\{--mode-banner-accent:#45d8ff/);
});
