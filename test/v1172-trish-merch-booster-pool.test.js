
import test from "node:test";
import assert from "node:assert/strict";
import { SUPERSTAR_MERCH, BOOSTER_MERCH_SUPERSTAR_IDS, boosterSuperstarMerchPool } from "../js/data/merch.js?v=1.1.131";
import { SEASON_1_CHASE_TIER_REWARDS } from "../js/data/seasons.js?v=1.1.131";

test("v1.1.72 boosters retain exactly one Merch slot", async ()=>{
  const source=await (await import("node:fs/promises")).readFile(new URL("../js/data/boosters.js",import.meta.url),"utf8");
  assert.match(source,/export const BOOSTER_MERCH_SLOTS = 1;/);
});
test("v1.1.72 Trish merch is in every released-set booster merch candidate pool",()=>{
  assert.deepEqual(BOOSTER_MERCH_SUPERSTAR_IDS,["trish-stratus"]);
  const trish=SUPERSTAR_MERCH.filter(m=>m.superstarId==="trish-stratus");
  assert.ok(trish.length>=2);
  for(const setId of ["raw-series-1","summerslam-series-1","nxt-series-1"]){
    const ids=new Set(boosterSuperstarMerchPool(setId).map(m=>m.id));
    for(const merch of trish) assert.ok(ids.has(merch.id),`${setId} missing ${merch.name}`);
  }
});
test("v1.1.72 no Trish merch appears on the 50-tier reward road",()=>{
  for(const reward of Object.values(SEASON_1_CHASE_TIER_REWARDS)){
    assert.notEqual(reward.rewardType,"merch");
    assert.ok(!String(reward.cardId??"").startsWith("merch-"));
  }
});
