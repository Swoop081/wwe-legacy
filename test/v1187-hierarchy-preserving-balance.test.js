import test from "node:test";
import assert from "node:assert/strict";
import { superstars } from "../js/data/superstars.js?v=1.1.125";
import { decks } from "../js/data/decks.js?v=1.1.125";
const star=id=>Object.values(superstars).find(s=>s.id===id);
test("v1.1.87 preserves authored HP hierarchy while retaining Tiffany structural access",()=>{
 const t=star("tiffany-stratton"),k=star("kurt-angle");
 assert.equal(t.hp,62); assert.equal(k.hp,66);
 assert.equal(t.methodLimits.technical,2); assert.equal(t.starterMomentum.technical,2);
 assert.equal(decks[t.id].filter(c=>c.id==="momentum-technical").length,2);
});
test("v1.1.87 does not convert Kurt balance into a durability buff",()=>{
 const k=star("kurt-angle"); assert.equal(k.ability.name,"Olympic Gold Medalist"); assert.equal(k.hp,66);
});
