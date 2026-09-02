import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.112";
import { CARD_NUMBER_BY_ID } from "../js/data/card-number-manifest.js?v=1.1.112";
import { decks } from "../js/data/decks.js?v=1.1.112";

const card=allGameplayCards.find(card=>card.id==="top-rope-bulldog");

test("v1.1.44 adds shared Rare Top Rope Bulldog",()=>{
  assert.ok(card);
  assert.equal(card.name,"Top Rope Bulldog");
  assert.equal(card.setId,"summerslam-series-1");
  assert.equal(card.rarity,3);
  assert.equal(card.cost,6);
  assert.equal(card.damage,9);
  assert.deepEqual(card.requirements,{technical:2,agility:1});
  assert.equal(card.method,"technical");
  assert.equal(card.moveType,"grapple");
  assert.equal(card.groundOpponent,true);
  assert.equal(card.counterState,"body-elevated");
  assert.equal(card.boosterOnly,true);
  assert.deepEqual(card.effects,[{type:"discardOpponent",amount:1}]);
});

test("v1.1.44 assigns Top Rope Bulldog SS1-154",()=>{
  assert.equal(CARD_NUMBER_BY_ID["top-rope-bulldog"]?.cardCode,"SS1-154");
  assert.equal(CARD_NUMBER_BY_ID["top-rope-bulldog"]?.cardNumber,154);
});

test("v1.1.44 Top Rope Bulldog is booster-only and does not silently rewrite authored decks",()=>{
  const pages=Object.values(decks).flat();
  assert.equal(pages.filter(id=>id==="top-rope-bulldog").length,0);
});
