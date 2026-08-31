import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.48";
import { CARD_NUMBER_BY_ID } from "../js/data/card-number-manifest.js?v=1.1.48";
import { canCounter } from "../js/engine/rules.js?v=1.1.48";

const byId=id=>allGameplayCards.find(c=>c.id===id);
const family=[
  "leaping-clothesline","roman-reigns-corner-clotheslines","springboard-clothesline","gunther-burning-lariat","lariat","clothesline","short-arm-clothesline","flying-clothesline","mankind-clothesline","leaping-rope-clothesline","flipping-lariat","running-clothesline","clothesline-over-the-top-rope","corner-clothesline","kane-flying-clothesline","ultimate-warrior-clothesline","jake-roberts-short-arm-clothesline","jbl-clothesline-from-hell","ra1-turnbuckle-clothesline"
];

test("v1.1.37 Matrix Slide is the new SmackDown shared Common reversal",()=>{
  const c=byId("matrix-slide");
  assert.ok(c);
  assert.equal(c.setId,"smackdown-series-1");
  assert.equal(c.rarity,1);
  assert.equal(c.cost,1);
  assert.equal(c.damage,0);
  assert.equal(c.method,null);
  assert.deepEqual(c.requirements,{});
  assert.equal(c.boosterOnly,true);
  assert.equal(c.defensiveOnly,true);
  assert.equal(c.counterState,"arm-extended");
  assert.deepEqual(c.counterStates,["arm-extended"]);
  assert.equal(CARD_NUMBER_BY_ID[c.id].cardCode,"SD1-072");
});

test("v1.1.37 Matrix Slide catches the full high Clothesline/Lariat family",()=>{
  const matrix=byId("matrix-slide");
  for(const id of family){
    const incoming=byId(id);
    assert.ok(incoming,id);
    assert.equal(canCounter(incoming,matrix),true,`${id} should be Matrix Slide legal`);
  }
  assert.equal(matrix.countersCardIds.includes("leg-lariat"),false);
  assert.equal(canCounter(byId("leg-lariat"),matrix),false,"Leg Lariat is deliberately excluded");
});

test("v1.1.37 Matrix Slide image remains an unbundled Card Studio target",()=>{
  assert.equal(byId("matrix-slide").imageKey,undefined);
});
