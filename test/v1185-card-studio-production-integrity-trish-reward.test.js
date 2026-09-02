import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allGameplayCards } from '../js/data/content.js?v=1.1.129';
import { superstars } from '../js/data/superstars.js?v=1.1.129';

const card=id=>allGameplayCards.find(c=>c.id===id);
const star=Object.values(superstars).find(s=>s.id==='trish-stratus');

test('Trish first Reward package is premium and identity-correct',()=>{
  assert.equal(star.hp,62);
  assert.equal(star.archetype,'reward-technical-agility-striker');
  assert.equal(star.ability.trigger.type,'differentMethod');
  assert.equal(star.ability.trigger.maxUses,1);
  assert.match(star.ability.text,/first time each match/i);
  assert.doesNotMatch(star.ability.text,/starter identity/i);

  assert.equal(card('trish-stratus-stratusfaction').finisher,true);
  assert.equal(card('trish-stratus-stratusfaction').method,null);
  assert.equal(card('trish-stratus-chick-kick').moveType,'strike');
  assert.equal(card('trish-stratus-air-canada').moveType,'aerial');
  assert.equal(card('trish-stratus-stratusphere').moveType,'aerial');
});

test('future Finishers exposed by production audit also obey no-Method rule',()=>{
  for(const id of [
    'bron-breakker-breakkers-spear','drew-mcintyre-claymore','sami-zayn-helluva-kick',
    'jacob-fatu-moonsault','jacob-fatu-tongan-death-grip','solo-sikoa-samoan-spike',
    'jade-cargill-jaded','nia-jax-annihilator'
  ])assert.equal(card(id).method,null,id);
});

test('Card Studio production integrity audit has zero hard issues',()=>{
  const report=JSON.parse(fs.readFileSync(new URL('../reports/v1.1.85-card-studio-production-integrity.json',import.meta.url),'utf8'));
  assert.equal(report.cards,1299);
  assert.equal(report.summary.issueCount,0);
  assert.equal(report.summary.missingNames,0);
  assert.equal(report.summary.pathCollisions,0);
  assert.equal(report.summary.fixedTierErrors,0);
  assert.equal(report.summary.brokenAttribution,0);
  assert.equal(report.summary.logoWarnings,0);
});

test('Trish is now part of the certified active-82 balance field',()=>{
  const report=JSON.parse(fs.readFileSync(new URL('../balance-reports/v1.1.85-active-82-deep-certification.json',import.meta.url),'utf8'));
  assert.equal(report.superstars,82);
  assert.equal(report.uniquePairings,3321);
  assert.equal(report.gamesPerPair,25);
  assert.equal(report.matches,83025);
  assert.equal(report.stalls,0);
  const trish=report.rows.find(r=>r.id==='trish-stratus');
  assert.ok(trish);
  assert.equal(trish.winRate,57.88);
  assert.ok(trish.winRate>=57&&trish.winRate<=60);
});
