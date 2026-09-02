import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.111";

const brainbuster=allGameplayCards.find(c=>c.id==="brainbuster");

test("v0.13.63 Brainbuster core profile remains intact; v1.0.3 adds approved Head-damage identity",()=>{
  assert.ok(brainbuster);
  assert.deepEqual({
    name:brainbuster.name,cost:brainbuster.cost,damage:brainbuster.damage,rarity:brainbuster.rarity,
    method:brainbuster.method,requirements:brainbuster.requirements,moveType:brainbuster.moveType,counter:brainbuster.counterState,
    ground:brainbuster.groundOpponent,boosterOnly:brainbuster.boosterOnly,effects:brainbuster.effects
  },{
    name:"Brainbuster",cost:6,damage:10,rarity:2,
    method:"technical",requirements:{technical:2},moveType:"grapple",counter:"body-elevated",
    ground:true,boosterOnly:true,effects:[]
  });
  assert.equal(brainbuster.superstarId,null);
  assert.equal(brainbuster.rulesText,"Shared. Grounds opponent. On Connect: +1 persistent Head damage.");
  assert.deepEqual(brainbuster.bodyDamage,{bodyPart:"head",pressure:1});
});
