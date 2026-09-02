import test from 'node:test';
import assert from 'node:assert/strict';
import { superstars } from '../js/data/superstars.js?v=1.1.99';

test('v1.1.88 strengthens Kurt Angle through technical identity without HP inflation',()=>{
 const k=superstars.kurtAngle;
 assert.equal(k.hp,66);
 assert.equal(k.ability.name,'Olympic Gold Medalist');
 assert.equal(k.ability.trigger.type,'angleOlympicGold');
 assert.equal(k.ability.trigger.draw,2);
 assert.match(k.ability.text,/draw 2 pages/i);
 assert.equal(k.starterMomentum.technical,8);
});
