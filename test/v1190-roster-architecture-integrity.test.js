import test from "node:test";
import assert from "node:assert/strict";
import { superstars } from "../js/data/superstars.js?v=1.1.112";
import { decks } from "../js/data/decks.js?v=1.1.112";
import { allGameplayCards } from "../js/data/content.js?v=1.1.112";

const star=id=>Object.values(superstars).find(s=>s.id===id);
const momentum=(id,method)=>decks[id].filter(c=>c.id===`momentum-${method}`).length;

test("v1.1.90 repairs Bret and AJ Method reachability",()=>{
  assert.equal(decks["bret-hart"].length,60);
  assert.equal(momentum("bret-hart","agility"),2);
  assert.equal(decks["aj-styles"].length,60);
  assert.equal(momentum("aj-styles","strength"),1);
});

test("v1.1.90 restores physical HP hierarchy without generic win-rate HP buffs",()=>{
  assert.equal(star("becky-lynch").hp,65);
  assert.equal(star("roman-reigns").hp,67);
  assert.equal(star("randy-orton").hp,67);
  assert.equal(star("trish-stratus").hp,62);
  assert.equal(star("chad-gable").hp,64);
  assert.equal(star("ted-dibiase").hp,67);
  assert.equal(star("lola-vice").hp,62);
});

test("v1.1.90 resolves audited exact ability-template duplicates",()=>{
  const vaquer=star("stephanie-vaquer").ability.trigger;
  const blake=star("blake-monroe").ability.trigger;
  const hbk=star("shawn-michaels").ability.trigger;
  const shinsuke=star("shinsuke-nakamura").ability.trigger;
  const ega=star("el-grande-americano").ability.trigger;
  const trish=star("trish-stratus").ability.trigger;
  assert.notDeepEqual(blake,vaquer);
  assert.notDeepEqual(shinsuke,hbk);
  assert.notDeepEqual(trish,ega);
});

test("v1.1.90 expresses watchlist fixes through mechanics",()=>{
  assert.equal(star("chad-gable").ability.trigger.drawAfterStrengthTechnical,2);
  assert.equal(star("owen-hart").ability.trigger.draw,2);
  assert.equal(star("lola-vice").ability.trigger.draw,2);
  assert.equal(star("rowdy-roddy-piper").ability.trigger.draw,1);
  assert.equal(star("ted-dibiase").special.trademarkDiscount,3);
  const dream=allGameplayCards.find(c=>c.id==="ted-dibiase-million-dollar-dream");
  assert.equal(dream.submission.pressure,8);
});
