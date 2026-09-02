import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js?v=1.1.102';
import { decks } from '../js/data/decks.js?v=1.1.102';
import { allGameplayCards } from '../js/data/content.js?v=1.1.102';

const byId=id=>Object.values(superstars).find(s=>s.id===id);
const card=id=>allGameplayCards.find(c=>c.id===id);

test('Penta/Rey/Jacy v1.1.81 corrections remain locked',()=>{
  const p=byId('penta'),rey=byId('rey-mysterio'),jacy=byId('jacy-jayne');
  assert.ok(p); assert.ok(rey); assert.ok(jacy);
  assert.equal(p.ability.trigger.bonusDamage,1);
  assert.equal(p.special.discount,1);
  assert.equal(rey.ability.trigger.maxUses,2);
  assert.equal(rey.ability.trigger.draw,1);
  assert.equal(rey.ability.trigger.adrenaline,1);
  const encore=card('jacy-jayne-rolling-encore'),knee=card('jacy-jayne-running-knee-smash'),action=card('special-jacy-jayne');
  assert.equal(encore.finisher,true);
  assert.notEqual(encore.trademark,true);
  assert.equal(knee.trademark,true);
  assert.notEqual(knee.finisher,true);
  assert.equal(knee.moveType,'strike');
  assert.equal(knee.method,'strike');
  assert.equal(knee.submission,undefined);
  assert.equal(action.special.agilityDraw,0);
  assert.equal(jacy.ability.trigger.draw,undefined);
  assert.equal(jacy.ability.trigger.discardOpponent,1);
  assert.equal(jacy.ability.trigger.maxUses,2);
  assert.equal(decks['jacy-jayne'].filter(c=>c.id==='jacy-jayne-rolling-encore').length,2);
  assert.equal(decks['jacy-jayne'].filter(c=>c.id==='jacy-jayne-running-knee-smash').length,5);
});

test('six primary outlier corrections are locked',()=>{
  const aj=byId('aj-styles'),roman=byId('roman-reigns'),yoko=byId('yokozuna');
  const lola=byId('lola-vice'),owen=byId('owen-hart'),chad=byId('chad-gable');
  assert.equal(aj.hp,62);
  assert.equal(aj.ability.trigger.maxUses,1);
  assert.equal(aj.special.discount,1);
  assert.equal(roman.hp,64);
  assert.equal(yoko.hp,70);
  assert.equal(yoko.ability.trigger.maxUses,1);
  assert.equal(lola.hp,62);
  assert.equal(lola.ability.trigger.draw,1);
  assert.equal(lola.ability.trigger.discount,2);
  assert.equal(lola.ability.trigger.damage,2);
  assert.equal(owen.ability.trigger.adrenaline,1);
  assert.equal(card('owen-hart-sharpshooter').submission.pressure,9);
  assert.equal(chad.ability.trigger.adrenalineAfterStrengthTechnical,1);
  assert.equal(card('chad-gable-ankle-lock').submission.pressure,8);
});

test('final v1.1.81 deep report certifies 81,000 matches and focus band movement',()=>{
  const report=JSON.parse(fs.readFileSync(new URL('../balance-reports/v1.1.81-active-81-deep-balance-lab.json',import.meta.url),'utf8'));
  assert.equal(report.superstars,81);
  assert.equal(report.uniquePairings,3240);
  assert.equal(report.gamesPerPair,25);
  assert.equal(report.matches,81000);
  assert.equal(report.stalls,0);
  const rates=Object.fromEntries(report.rows.map(r=>[r.id,r.winRate]));
  assert.equal(rates['aj-styles'],59.45);
  assert.equal(rates['roman-reigns'],58.2);
  assert.equal(rates.yokozuna,57.95);
  assert.equal(rates['lola-vice'],43.35);
  assert.equal(rates['owen-hart'],42.9);
  assert.equal(rates['chad-gable'],41.8);
  assert.equal(rates.penta,56.65);
  assert.equal(rates['rey-mysterio'],45.2);
  assert.equal(rates['jacy-jayne'],50.15);
});
