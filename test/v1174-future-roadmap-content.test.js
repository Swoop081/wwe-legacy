import test from "node:test";
import assert from "node:assert/strict";
import { superstars } from "../js/data/superstars.js?v=1.1.120";
import { deckIds } from "../js/data/decks.js?v=1.1.120";
import { allGameplayCards } from "../js/data/content.js?v=1.1.120";
import { isPlayerReleasedSetId, setReleaseAt } from "../js/data/release.js?v=1.1.120";

const SETS={
  "worlds-collide-series-1":["rey-mysterio","dominik-mysterio","penta","el-grande-americano","lola-vice","dragon-lee","hijo-del-vikingo","mr-iguana"],
  "money-in-the-bank-series-1":["jey-uso","la-knight","alexa-bliss","finn-balor","giulia","carmelo-hayes","baron-corbin","rey-fenix"],
  "survivor-series-series-1":["bron-breakker","drew-mcintyre","sami-zayn","jacob-fatu","solo-sikoa","jade-cargill","nia-jax","jimmy-uso"]
};

test("v1.1.74 future event sets are 8-Superstar roadmaps",()=>{
  for(const [setId,ids] of Object.entries(SETS)){
    const actual=Object.values(superstars).filter(s=>s.setId===setId).map(s=>s.id);
    assert.deepEqual(actual.sort(),[...ids].sort(),setId);
  }
});
test("v1.1.74 all 24 future Superstars have complete 60-page decks and resolved signatures",()=>{
  for(const ids of Object.values(SETS)) for(const id of ids){
    const star=Object.values(superstars).find(s=>s.id===id);
    assert.ok(star,id);
    assert.equal(deckIds[id]?.length,60,`${id} deck`);
    for(const sig of star.signatures??[]) assert.ok(allGameplayCards.some(c=>c.id===sig),`${id} missing ${sig}`);
    assert.ok(allGameplayCards.some(c=>c.id===star.entranceId),`${id} entrance`);
    assert.ok(allGameplayCards.some(c=>c.id===star.specialId),`${id} action`);
  }
});
test("v1.1.74 newly authored five each include trademarks and a finisher",()=>{
  for(const id of ["giulia","carmelo-hayes","baron-corbin","rey-fenix","jimmy-uso"]){
    const cards=allGameplayCards.filter(c=>c.superstarId===id);
    assert.ok(cards.some(c=>c.trademark),`${id} trademark`);
    assert.ok(cards.some(c=>c.finisher),`${id} finisher`);
  }
});
test("v1.1.74 release roadmap stays hidden before event dates",()=>{
  const before=new Date("2026-09-01T00:00:00Z");
  for(const setId of Object.keys(SETS)) assert.equal(isPlayerReleasedSetId(setId,before),false,setId);
  assert.match(setReleaseAt("worlds-collide-series-1"),/^2026-09-26/);
  assert.match(setReleaseAt("money-in-the-bank-series-1"),/^2026-10-10/);
  assert.match(setReleaseAt("survivor-series-series-1"),/^2026-11-28/);
});
