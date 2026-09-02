import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createProfile, STARTER_CHOICES, claimWelcomeSuperstarPack, welcomeSuperstarState, ownedCount } from "../js/data/profile.js?v=1.1.129";
import { superstarPackCandidates, SUPERSTAR_PACK_SIZE } from "../js/data/superstar-packs.js?v=1.1.129";
import { collectionCards } from "../js/data/collection.js?v=1.1.129";

const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));
const cardById=new Map(collectionCards.map(card=>[card.id,card]));

test("v1.1.25 keeps the CM Punk / Roman Reigns starter choice",()=>{
  assert.match(build.version,/^1\.1\.(?:2[5-9]|[3-9]\d)$/);
  assert.deepEqual(STARTER_CHOICES,["cm-punk","roman-reigns"]);
  assert.match(app,/Choose Your Champion/);
});

test("v1.1.25 reusable Superstar Packs contain exactly five identity cards",()=>{
  const packs=superstarPackCandidates();
  assert.equal(packs.length,72);
  for(const pack of packs){
    assert.equal(pack.cardIds.length,SUPERSTAR_PACK_SIZE,pack.superstarId);
    assert.equal(cardById.get(pack.slots.superstar)?.kind,"superstar");
    assert.equal(cardById.get(pack.slots.entrance)?.kind,"entrance");
    assert.equal(cardById.get(pack.slots.finisher)?.finisher,true);
    assert.equal(cardById.get(pack.slots.trademark)?.trademark,true);
    assert.equal(cardById.get(pack.slots.action)?.kind,"action");
  }
});

test("v1.1.25 welcome Superstar Pack grants five cards without manufacturing a full second deck",()=>{
  const p=createProfile("cm-punk");
  const result=claimWelcomeSuperstarPack(p,()=>0);
  assert.equal(result.claimed,true);
  assert.equal(result.cardIds.length,5);
  assert.notEqual(result.superstarId,"cm-punk");
  for(const id of result.cardIds) assert.ok(ownedCount(p,id,"normal")>=1,id);
  assert.equal(Array.isArray(p.savedDecks?.[result.superstarId]) ? p.savedDecks[result.superstarId].length : 0,0);
  assert.ok((p.deckNeedsCards?.[result.superstarId]??0)>0);
  assert.deepEqual(welcomeSuperstarState(p).cardIds,result.cardIds);
});

test("v1.1.25 onboarding UI uses one Superstar Pack instead of choosing an era",()=>{
  assert.match(app,/Open Your Superstar Pack/);
  assert.match(app,/SUPERSTAR[\s\S]*PACK/);
  assert.match(app,/claimWelcomeSuperstarPack\(profile, Math\.random\)/);
  const renderBlock=app.slice(app.indexOf("function renderWelcomeSuperstar()"),app.indexOf("function renderStarter()"));
  assert.doesNotMatch(renderBlock,/WELCOME_SUPERSTAR_SET_IDS\.map/);
  assert.doesNotMatch(renderBlock,/Choose Your Era/);
});

test("v1.1.25 Home destination portraits use WWE.com profile imagery with local fallback",()=>{
  for(const id of ["roman-reigns","cm-punk","trish-stratus","seth-rollins","becky-lynch","rhea-ripley","stone-cold-steve-austin","liv-morgan"]){
    assert.match(app,new RegExp(`"${id}": "https://www\\.wwe\\.com/f/styles/talent_champion_lg/`));
  }
  assert.match(app,/const fallback = localMenu \|\| localHeadshot \|\| localSuperstar \|\| placeholder/);
});

test("v1.1.25 Season tiers are large visual reward rectangles",()=>{
  assert.match(app,/function seasonTierRewardVisualMarkup\(reward\)/);
  assert.match(app,/season-reward-card/);
  assert.match(app,/season-reward-pack/);
  assert.match(app,/season-reward-up/);
  assert.match(css,/min-height:128px!important/);
  assert.match(css,/grid-template-columns:82px 82px minmax\(0,1fr\)!important/);
  assert.match(css,/\.season-road-tier b\{font-size:2\.2rem!important/);
});
