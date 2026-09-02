import test from 'node:test';
import assert from 'node:assert/strict';
import { superstars } from '../js/data/superstars.js?v=1.1.102';
import { decks } from '../js/data/decks.js?v=1.1.102';
const star=id=>Object.values(superstars).find(s=>s.id===id);
test('v1.1.86 repairs Tiffany Stratton technical access without abandoning Strength/Agility identity',()=>{
 const t=star('tiffany-stratton');
 assert.equal(t.hp,63); assert.equal(t.methodLimits.technical,2); assert.equal(t.starterMomentum.technical,2); assert.equal(t.starterMomentum.agility,6);
 const ids=decks[t.id].map(c=>c.id); assert.equal(ids.filter(id=>id==='momentum-technical').length,2); assert.ok(ids.includes('alabama-slam')); assert.ok(ids.includes('falcon-arrow'));
});
test('v1.1.86 gives Kurt Angle a narrow durability correction only',()=>{
 const k=star('kurt-angle'); assert.equal(k.hp,68); assert.equal(k.ability.name,'Olympic Gold Medalist');
});
