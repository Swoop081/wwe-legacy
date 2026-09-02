
import test from "node:test";
import assert from "node:assert/strict";
import { superstars } from "../js/data/superstars.js?v=1.1.118";
import { allGameplayCards } from "../js/data/content.js?v=1.1.118";
import { sets } from "../js/data/sets.js?v=1.1.118";
import { seasonExclusiveSuperstars, ACTIVE_REWARD_SUPERSTAR_IDS, REWARD_PRINTING_TIER } from "../js/data/season-exclusive.js?v=1.1.118";
import { cardPrintingTiers } from "../js/data/variants.js?v=1.1.118";

test("v1.1.71 active Rewards registry contains only Trish Stratus",()=>{
  assert.deepEqual(ACTIVE_REWARD_SUPERSTAR_IDS,["trish-stratus"]);
  assert.deepEqual(Object.keys(seasonExclusiveSuperstars),["trish-stratus"]);
  assert.equal(REWARD_PRINTING_TIER,"amethyst");
});
test("v1.1.71 retired reward identities and sets are absent",()=>{
  for(const id of ["the-rock","chyna","goldberg"]) assert.equal(Object.values(superstars).some(s=>s.id===id),false,id);
  for(const setId of ["season-1-final-boss","parked-chyna","season-2-whos-next"]){
    assert.equal(sets[setId],undefined,setId);
    assert.equal(allGameplayCards.some(c=>c.setId===setId),false,setId);
  }
});
test("v1.1.71 Trish reward package is Amethyst-only",()=>{
  const trish=Object.values(superstars).find(s=>s.id==="trish-stratus");
  assert.ok(trish);
  assert.deepEqual(cardPrintingTiers(trish.entrance),["amethyst"]);
  const trishCards=allGameplayCards.filter(c=>c.setId==="season-1-last-time-is-now");
  assert.ok(trishCards.length>0);
  for(const c of trishCards) assert.deepEqual(cardPrintingTiers(c),["amethyst"],c.id);
});
test("v1.1.71 keeps distinct Attitude Rock and Ruthless Aggression Cena",()=>{
  assert.ok(Object.values(superstars).some(s=>s.id==="the-rock-attitude"));
  assert.ok(Object.values(superstars).some(s=>s.id==="john-cena" && s.setId==="ruthless-aggression-series-1"));
});
