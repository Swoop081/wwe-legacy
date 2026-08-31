import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { allGameplayCards } from "../js/data/content.js?v=1.1.48";
import { CARD_NUMBER_BY_ID, CARD_IDS_BY_SET } from "../js/data/card-number-manifest.js?v=1.1.48";
import { deckIds } from "../js/data/decks.js?v=1.1.48";

const card=allGameplayCards.find(c=>c.id==="seated-shotgun-dropkick");

test("v1.1.34 adds Seated Shotgun Dropkick as EVO1-076 shared Evolution Uncommon",()=>{
  assert.ok(card);
  assert.equal(card.name,"Seated Shotgun Dropkick");
  assert.equal(card.setId,"evolution-series-1");
  assert.equal(card.superstarId,null);
  assert.equal(card.rarity,2);
  assert.equal(card.boosterOnly,true);
  assert.equal(card.cost,4);
  assert.equal(card.damage,7);
  assert.equal(card.method,"agility");
  assert.deepEqual(card.requirements,{agility:2});
  assert.equal(card.moveType,"strike");
  assert.equal(card.groundedOnly,true);
  assert.equal(card.stun,1);
  assert.equal(card.counterState,"leg-extended");
  assert.equal(CARD_NUMBER_BY_ID[card.id].cardCode,"EVO1-076");
  assert.equal(CARD_IDS_BY_SET["evolution-series-1"].length,75);
});

test("v1.1.34 seeds two copies into IYO, Liv and Tiffany while preserving 60 pages and a basic Dropkick",()=>{
  for(const sid of ["iyo-sky","liv-morgan","tiffany-stratton"]){
    const ids=deckIds[sid];
    assert.equal(ids.length,60,sid);
    assert.equal(ids.filter(id=>id==="seated-shotgun-dropkick").length,2,sid);
    assert.ok(ids.includes("dropkick"),`${sid} keeps basic Dropkick`);
  }
});

test("v1.1.34 leaves the reference image out and exposes the card in Card Studio",()=>{
  assert.equal(fs.existsSync(new URL("../assets/images/seated-shotgun-dropkick.webp",import.meta.url)),false);
  const studio=fs.readFileSync(new URL("../js/tools/card-art-studio-data.js",import.meta.url),"utf8");
  assert.match(studio,/"id":"seated-shotgun-dropkick","name":"Seated Shotgun Dropkick","kind":"move","source":"collector","setId":"evolution-series-1","cardNumber":76,"cardCode":"EVO1-076"/);
});
