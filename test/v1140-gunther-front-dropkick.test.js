import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.129";
import { deckIds } from "../js/data/decks.js?v=1.1.129";
import { superstars } from "../js/data/superstars.js?v=1.1.129";
import { CARD_NUMBER_BY_ID, CARD_IDS_BY_SET } from "../js/data/card-number-manifest.js?v=1.1.129";

const byId=id=>allGameplayCards.find(card=>card.id===id);

test("v1.1.40 Gunther's Front Dropkick is his Rare Trademark",()=>{
  const card=byId("gunther-front-dropkick");
  assert.ok(card);
  assert.equal(card.name,"Gunther's Front Dropkick");
  assert.equal(card.superstarId,"gunther");
  assert.equal(card.setId,"summerslam-series-1");
  assert.equal(card.rarity,3);
  assert.equal(card.trademark,true);
  assert.equal(card.finisher,undefined);
  assert.equal(card.moveType,"strike");
  assert.equal(card.cost,5);
  assert.equal(card.damage,9);
  assert.deepEqual(card.requirements,{strike:2});
  assert.equal(card.counterState,"leg-extended");
});

test("v1.1.40 Gunther deck replaces shared Front Dropkick with his exclusive Trademark",()=>{
  const deck=deckIds.gunther;
  assert.equal(deck.length,60);
  assert.equal(deck.filter(id=>id==="gunther-front-dropkick").length,2);
  assert.equal(deck.filter(id=>id==="front-dropkick").length,0);
  assert.equal(deck.filter(id=>id==="gunther-gojira-clutch").length,2);
  assert.ok(superstars.gunther.signatures.includes("gunther-front-dropkick"));
});

test("v1.1.40 Gunther's Front Dropkick extends SummerSlam to SS1-149",()=>{
  assert.equal(CARD_NUMBER_BY_ID["gunther-front-dropkick"]?.cardCode,"SS1-149");
  assert.ok(CARD_IDS_BY_SET["summerslam-series-1"].length>=149);
  assert.equal(CARD_IDS_BY_SET["summerslam-series-1"][148],"gunther-front-dropkick");
});
