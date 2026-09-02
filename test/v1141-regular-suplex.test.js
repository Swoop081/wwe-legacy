import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.123";
import { CARD_NUMBER_BY_ID } from "../js/data/card-number-manifest.js?v=1.1.123";
import { decks } from "../js/data/decks.js?v=1.1.123";

const suplex=allGameplayCards.find(card=>card.id==="suplex");

test("v1.1.41 adds the foundational shared Suplex",()=>{
  assert.ok(suplex);
  assert.equal(suplex.name,"Suplex");
  assert.equal(suplex.setId,"summerslam-series-1");
  assert.equal(suplex.rarity,1);
  assert.equal(suplex.cost,3);
  assert.equal(suplex.damage,4);
  assert.deepEqual(suplex.requirements,{technical:1});
  assert.equal(suplex.method,"technical");
  assert.equal(suplex.moveType,"grapple");
  assert.equal(suplex.groundOpponent,true);
  assert.equal(suplex.counterState,"body-elevated");
  assert.equal(suplex.boosterOnly,true);
});

test("v1.1.41 Suplex is SS1-150",()=>{
  assert.equal(CARD_NUMBER_BY_ID.suplex?.cardCode,"SS1-150");
});

test("v1.1.41 Suplex expands the shared pool without silently rewriting authored decks",()=>{
  assert.equal(Object.values(decks).flat().filter(id=>id==="suplex").length,0);
});
