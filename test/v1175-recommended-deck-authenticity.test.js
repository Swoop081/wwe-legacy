import test from "node:test";
import assert from "node:assert/strict";
import { superstars } from "../js/data/superstars.js?v=1.1.111";
import { deckIds } from "../js/data/decks.js?v=1.1.111";
import { allGameplayCards } from "../js/data/content.js?v=1.1.111";

const byId=new Map(allGameplayCards.map(c=>[c.id,c]));

test("v1.1.75 all 97 recommendations remain 60 pages with resolved declared signatures",()=>{
  assert.equal(Object.values(superstars).length,97);
  for(const s of Object.values(superstars)){
    assert.equal(deckIds[s.id]?.length,60,`${s.id} deck length`);
    for(const id of s.signatures??[]){
      assert.ok(byId.has(id),`${s.id} missing signature card ${id}`);
      assert.ok(deckIds[s.id].includes(id),`${s.id} recommendation missing ${id}`);
    }
  }
});

test("v1.1.75 Jade authenticity additions are in her recommendation",()=>{
  for(const id of ["jade-cargill-reverse-alabama-slam","jade-cargill-eye-of-the-storm"]){
    assert.ok(byId.has(id));
    assert.ok(deckIds["jade-cargill"].includes(id));
  }
});

test("v1.1.75 Logan Prime Splash is a RAW booster identity and recommended card",()=>{
  const c=byId.get("logan-paul-prime-splash");
  assert.equal(c?.setId,"raw-series-1");
  assert.equal(c?.superstarId,"logan-paul");
  assert.ok(deckIds["logan-paul"].includes(c.id));
});

test("v1.1.75 Tiffany recommendation includes Alabama Slam and Falcon Arrow",()=>{
  assert.ok(deckIds["tiffany-stratton"].includes("alabama-slam"));
  assert.ok(deckIds["tiffany-stratton"].includes("falcon-arrow"));
});

test("v1.1.75 Chelsea uses current Un-Pretty-Her display identity",()=>{
  assert.equal(byId.get("chelsea-green-im-prettier")?.name,"Un-Pretty-Her");
});
