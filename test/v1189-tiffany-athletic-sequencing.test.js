import test from "node:test";
import assert from "node:assert/strict";
import { superstars } from "../js/data/superstars.js?v=1.1.126";
import { allGameplayCards } from "../js/data/content.js?v=1.1.126";
test("v1.1.89 preserves Tiffany physical hierarchy and upgrades Tiffany Epiphany sequencing",()=>{
 const t=Object.values(superstars).find(s=>s.id==="tiffany-stratton");
 const a=allGameplayCards.find(c=>c.id==="special-tiffany-stratton");
 assert.equal(t.hp,62); assert.equal(t.methodLimits.technical,2); assert.equal(t.starterMomentum.technical,2);
 assert.match(a.rulesText,/Draw both/); assert.equal(a.special.type,"tiffanyEpiphany");
});
