import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { allGameplayCards } from "../js/data/content.js?v=1.1.98";
import { deckIds } from "../js/data/decks.js?v=1.1.98";
import { CARD_NUMBER_BY_ID } from "../js/data/card-number-manifest.js?v=1.1.98";

const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");

const arm=allGameplayCards.find(c=>c.id==="arm-drag");

test("v1.1.44 merges Arm Drag Counter into the normal Arm Drag card",()=>{
  assert.ok(arm);
  assert.equal(allGameplayCards.some(c=>c.id==="arm-drag-counter"),false);
  assert.deepEqual(arm.counterStates,["front-control"]);
  assert.deepEqual(arm.counterSubmissionTargets,["arms"]);
  assert.equal(arm.groundOpponent,true);
  assert.match(arm.rulesText,/counter-attack/i);
  assert.equal(CARD_NUMBER_BY_ID["arm-drag-counter"],undefined);
  assert.equal(CARD_NUMBER_BY_ID["arm-drag"]?.cardCode,"EVO1-007");
});

test("v1.1.44 migrates every authored deck off the retired Arm Drag Counter id",()=>{
  for(const [sid,ids] of Object.entries(deckIds)){
    assert.equal(ids.includes("arm-drag-counter"),false,sid);
    assert.ok(ids.filter(id=>id==="arm-drag").length<=5,`${sid} exceeds five Arm Drag copies`);
    assert.equal(ids.length,60,`${sid} deck must remain 60 pages`);
  }
});

test("v1.1.44 live collectible fronts use Card Studio's exact shared geometry and font stacks globally",()=>{
  assert.match(app,/function collectibleCardMarkup\(card,/);
  assert.match(app,/layeredFrontOverlayMarkup\(card\)/);
  assert.match(css,/v1\.1\.44 — Global Card Studio visual parity/);
  assert.match(css,/--studio-display-font:"Bahnschrift Condensed"/);
  assert.match(css,/--studio-meta-font:"Bahnschrift SemiCondensed"/);
  assert.match(css,/--studio-number-font:"DIN Alternate"/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-data::before\{[\s\S]*left:5\.2%[\s\S]*bottom:4\.2%[\s\S]*height:21\.8%/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-move \.ccg-live-name\{top:78\.7%/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-stat small\{[\s\S]*top:82\.9%/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-stat b\{[\s\S]*top:88\.4%/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-requirement\{[\s\S]*top:86\.6%/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-move \.ccg-live-type\.has-requirement\{top:92\.9%/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-utility \.ccg-live-name\{top:85\.2%/);
});
