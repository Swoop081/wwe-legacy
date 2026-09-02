import test from 'node:test';
import assert from 'node:assert/strict';
import { superstars } from '../js/data/superstars.js?v=1.1.128';
import { GENERIC_MERCH, SUPERSTAR_MERCH } from '../js/data/merch.js?v=1.1.128';

test('v1.1.68 every Superstar has a T-shirt and action figure', () => {
  for (const star of Object.values(superstars)) {
    const pool=SUPERSTAR_MERCH.filter(item=>item.superstarId===star.id);
    assert.ok(pool.some(item=>item.category==='t-shirt'), `${star.name}: missing T-shirt`);
    assert.ok(pool.some(item=>item.category==='action-figure'), `${star.name}: missing action figure`);
    assert.ok(pool.length>=2, `${star.name}: merch pool below minimum`);
  }
});

test('v1.1.68 generic pool is WWE-branded merchandise rather than fake Superstar filler', () => {
  assert.equal(GENERIC_MERCH.length,8);
  assert.ok(GENERIC_MERCH.every(item=>item.name.startsWith('WWE ') || item.name.startsWith('Undisputed WWE ')));
});

test('v1.1.68 signature exceptions are present for deep-merch Superstars', () => {
  const names=new Set(SUPERSTAR_MERCH.map(item=>item.name));
  for (const name of ['John Cena WrestleMania 42 Wristband Set','John Cena Hustle Loyalty Respect Towel','Stone Cold Beer Can','Bret Hart Sunglasses','Trish Stratus 8x10 Entrance Photo','Rey Mysterio Replica Mask']) assert.ok(names.has(name), `missing ${name}`);
});
