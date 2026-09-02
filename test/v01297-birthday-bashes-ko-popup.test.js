import test from 'node:test';
import assert from 'node:assert/strict';
import { BIRTHDAY_TOWERS, RELEASED_BIRTHDAY_ROSTER_IDS, activeLiveEventTowers, startLiveEventTower } from '../js/data/live-events.js?v=1.1.99';
import { allGameplayCards } from '../js/data/content.js?v=1.1.99';
import { decks } from '../js/data/decks.js?v=1.1.99';
import { superstars } from '../js/data/superstars.js?v=1.1.99';
import { isLaunchLiveSetId } from '../js/data/release.js?v=1.1.99';
import { createProfile } from '../js/data/profile.js?v=1.1.99';

const released = Object.values(superstars).filter(s=>!s.developmentOnly && isLaunchLiveSetId(s.setId)).map(s=>s.id).sort();
const byId = id => allGameplayCards.find(c=>c.id===id);

test.skip('v0.13.82 Birthday Bash calendar contains the complete authored 32-Superstar launch roster',()=>{
  assert.equal(BIRTHDAY_TOWERS.length,32);
  assert.deepEqual([...RELEASED_BIRTHDAY_ROSTER_IDS].sort(),released);
  assert.deepEqual(BIRTHDAY_TOWERS.map(t=>t.bossId).sort(),released);
  assert.ok(BIRTHDAY_TOWERS.every(t=>t.name.endsWith('Birthday Bash')));
});

test('v1.1.20 legacy Birthday definitions are retained only for save compatibility and never enter the active rotation',()=>{
  assert.ok(BIRTHDAY_TOWERS.length>0);
  for (const event of BIRTHDAY_TOWERS.slice(0,8)) {
    const now=new Date(2027,event.month-1,event.day,10,0,0);
    assert.equal(activeLiveEventTowers(now).some(t=>t.event.id===event.id),false,event.id);
  }
});
test('v0.12.97 Pop-Up Powerbomb is Kevin Owens-exclusive Rare Trademark with rewritten KO rules',()=>{
  const card=byId('pop-up-powerbomb');
  assert.equal(card.superstarId,'kevin-owens');
  assert.equal(card.rarity,3);
  assert.equal(card.trademark,true);
  assert.match(card.rulesText,/Kevin Owens-exclusive Trademark/);
  assert.match(card.rulesText,/search\/draw Stunner/);
  assert.equal(card.effects.find(e=>e.type==='search'&&e.name==='Stunner')?.discount,4);
  assert.equal(card.effects.find(e=>e.type==='search')?.ifSuperstarIds,undefined);
  assert.equal(decks['kevin-owens'].filter(card=>card.id==='pop-up-powerbomb').length,3);
  assert.equal(decks['oba-femi'].some(card=>card.id==='pop-up-powerbomb'),false);
});
