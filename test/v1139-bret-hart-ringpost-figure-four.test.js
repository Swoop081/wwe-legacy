import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.112";
import { deckIds } from "../js/data/decks.js?v=1.1.112";
import { superstars } from "../js/data/superstars.js?v=1.1.112";
import { CARD_NUMBER_BY_ID, CARD_IDS_BY_SET } from "../js/data/card-number-manifest.js?v=1.1.112";

const byId=id=>allGameplayCards.find(card=>card.id===id);

test("v1.1.39 Ringpost Figure Four is Bret Hart's Rare Trademark submission",()=>{
  const card=byId("bret-hart-ringpost-figure-four");
  assert.ok(card);
  assert.equal(card.name,"Ringpost Figure Four");
  assert.equal(card.superstarId,"bret-hart");
  assert.equal(card.setId,"new-generation-series-1");
  assert.equal(card.rarity,3);
  assert.equal(card.trademark,true);
  assert.equal(card.finisher,undefined);
  assert.equal(card.moveType,"submission");
  assert.equal(card.cost,6);
  assert.equal(card.damage,0);
  assert.deepEqual(card.requirements,{technical:2});
  assert.equal(card.groundedOnly,true);
  assert.deepEqual(card.submission,{bodyPart:"legs",pressure:5});
  assert.equal(card.submissionTarget,"legs");
  assert.equal(card.counterState,"leg-extended");
  assert.deepEqual(card.effects,[{type:"discountNextByName",name:"Sharpshooter",amount:1}]);
});

test("v1.1.39 Bret deck carries three Ringpost Figure Four pages and stays 60 pages",()=>{
  const deck=deckIds["bret-hart"];
  assert.equal(deck.length,60);
  assert.equal(deck.filter(id=>id==="bret-hart-ringpost-figure-four").length,3);
  assert.equal(deck.filter(id=>id==="boston-crab").length,0);
  assert.equal(deck.filter(id=>id==="bret-hart-sharpshooter").length,2);
  assert.ok(superstars.bretHart.signatures.includes("bret-hart-ringpost-figure-four"));
});

test("v1.1.39 Ringpost Figure Four extends New Generation to NG1-081",()=>{
  assert.equal(CARD_NUMBER_BY_ID["bret-hart-ringpost-figure-four"]?.cardCode,"NG1-081");
  assert.equal(CARD_IDS_BY_SET["new-generation-series-1"].length,81);
  assert.equal(CARD_IDS_BY_SET["new-generation-series-1"].at(-1),"bret-hart-ringpost-figure-four");
});
