import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.97";
import { CARD_NUMBER_BY_ID } from "../js/data/card-number-manifest.js?v=1.1.97";
import { decks } from "../js/data/decks.js?v=1.1.97";

const topRopeNeckbreaker=allGameplayCards.find(card=>card.id==="top-rope-neckbreaker");
const rearNakedChoke=allGameplayCards.find(card=>card.id==="rear-naked-choke");

test("v1.1.42 adds shared Rare Top Rope Neckbreaker",()=>{
  assert.ok(topRopeNeckbreaker);
  assert.equal(topRopeNeckbreaker.name,"Top Rope Neckbreaker");
  assert.equal(topRopeNeckbreaker.setId,"summerslam-series-1");
  assert.equal(topRopeNeckbreaker.rarity,3);
  assert.equal(topRopeNeckbreaker.cost,7);
  assert.equal(topRopeNeckbreaker.damage,11);
  assert.deepEqual(topRopeNeckbreaker.requirements,{technical:2,agility:1});
  assert.equal(topRopeNeckbreaker.method,"technical");
  assert.equal(topRopeNeckbreaker.moveType,"grapple");
  assert.equal(topRopeNeckbreaker.groundOpponent,true);
  assert.equal(topRopeNeckbreaker.stun,1);
  assert.equal(topRopeNeckbreaker.counterState,"body-elevated");
  assert.equal(topRopeNeckbreaker.boosterOnly,true);
  assert.equal(CARD_NUMBER_BY_ID["top-rope-neckbreaker"]?.cardCode,"SS1-151");
});

test("v1.1.42 adds shared Uncommon Rear Naked Choke",()=>{
  assert.ok(rearNakedChoke);
  assert.equal(rearNakedChoke.name,"Rear Naked Choke");
  assert.equal(rearNakedChoke.setId,"summerslam-series-1");
  assert.equal(rearNakedChoke.rarity,2);
  assert.equal(rearNakedChoke.cost,6);
  assert.equal(rearNakedChoke.damage,0);
  assert.deepEqual(rearNakedChoke.requirements,{technical:2});
  assert.equal(rearNakedChoke.method,"technical");
  assert.equal(rearNakedChoke.moveType,"submission");
  assert.equal(rearNakedChoke.standingOnly,true);
  assert.deepEqual(rearNakedChoke.submission,{bodyPart:"head",pressure:5});
  assert.equal(rearNakedChoke.counterState,"rear-control");
  assert.equal(rearNakedChoke.submissionTarget,"neck-head");
  assert.equal(rearNakedChoke.boosterOnly,true);
  assert.equal(CARD_NUMBER_BY_ID["rear-naked-choke"]?.cardCode,"SS1-152");
});

test("v1.1.42 shared additions expand boosters without silently rewriting authored decks",()=>{
  const pages=Object.values(decks).flat();
  assert.equal(pages.filter(id=>id==="top-rope-neckbreaker").length,0);
  assert.equal(pages.filter(id=>id==="rear-naked-choke").length,0);
});
