import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.99";
import { CARD_NUMBER_BY_ID } from "../js/data/card-number-manifest.js?v=1.1.99";
import { decks } from "../js/data/decks.js?v=1.1.99";

const pescado=allGameplayCards.find(card=>card.id==="pescado");

test("v1.1.44 adds shared Uncommon Pescado",()=>{
  assert.ok(pescado);
  assert.equal(pescado.name,"Pescado");
  assert.equal(pescado.setId,"summerslam-series-1");
  assert.equal(pescado.rarity,2);
  assert.equal(pescado.cost,5);
  assert.equal(pescado.damage,8);
  assert.deepEqual(pescado.requirements,{agility:2});
  assert.equal(pescado.method,"agility");
  assert.equal(pescado.moveType,"aerial");
  assert.equal(pescado.groundOpponent,true);
  assert.equal(pescado.selfDamage,1);
  assert.equal(pescado.counterState,"running-aerial");
  assert.equal(pescado.boosterOnly,true);
});

test("v1.1.44 assigns Pescado SS1-153",()=>{
  assert.equal(CARD_NUMBER_BY_ID.pescado?.cardCode,"SS1-153");
  assert.equal(CARD_NUMBER_BY_ID.pescado?.cardNumber,153);
});

test("v1.1.44 Pescado is booster-only and does not silently rewrite authored decks",()=>{
  const pages=Object.values(decks).flat();
  assert.equal(pages.filter(id=>id==="pescado").length,0);
});
