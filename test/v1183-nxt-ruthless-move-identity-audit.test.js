import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allGameplayCards } from '../js/data/content.js?v=1.1.117';
import { superstars } from '../js/data/superstars.js?v=1.1.117';

const card=id=>allGameplayCards.find(c=>c.id===id);
const star=id=>Object.values(superstars).find(s=>s.id===id);

test('NXT identity corrections are locked',()=>{
  assert.equal(card('kendal-grey-olympic-slam').name,'Shades of Grey');
  assert.equal(card('kendal-grey-olympic-slam').finisher,true);
  assert.equal(card('kendal-grey-ankle-lock').moveType,'submission');
  assert.equal(card('tony-dangelo-forget-about-it').name,'Dead to Rights');
  assert.equal(card('tony-dangelo-fisherman-buster').moveType,'grapple');
  assert.equal(card('jaida-parker-corner-spinebuster').name,'Deja Vu');
  assert.equal(card('jaida-parker-running-hip-attack').moveType,'strike');
  assert.equal(card('kelani-jordan-split-legged-moonsault').finisher,true);
  assert.equal(card('kelani-jordan-split-legged-moonsault').moveType,'aerial');
  assert.equal(card('kelani-jordan-450-splash').trademark,true);
  assert.equal(card('tatum-paxley-cemetery-drive').finisher,true);
  assert.equal(card('lexis-king-coronation-neckbreaker').name,'Coronation DDT');
  assert.equal(card('lexis-king-coronation-neckbreaker').finisher,true);
  assert.equal(card('lexis-king-king-s-landing').trademark,true);
  assert.equal(card('zilla-fatu-island-driver').moveType,'grapple');
  assert.equal(card('zilla-fatu-island-driver').groundedOnly,false);
});

test('Ruthless Aggression identity corrections are locked',()=>{
  assert.equal(card('randy-orton-rko').method,null);
  assert.equal(card('randy-orton-punt-kick').method,null);
  assert.equal(card('jbl-clothesline-from-hell').moveType,'strike');
  assert.equal(card('eddie-guerrero-frog-splash').moveType,'aerial');
  assert.equal(card('eddie-guerrero-frog-splash').finisher,true);
  assert.equal(card('eddie-guerrero-frog-splash').submission,undefined);
  assert.equal(card('eddie-guerrero-lasso-from-el-paso').moveType,'submission');
  assert.equal(card('eddie-guerrero-lasso-from-el-paso').trademark,true);
  assert.equal(card('jeff-hardy-whisper-in-the-wind').moveType,'aerial');
  assert.equal(card('jeff-hardy-swanton-bomb').moveType,'aerial');
  assert.equal(card('rob-van-dam-five-star-frog-splash').moveType,'aerial');
  assert.equal(card('rob-van-dam-five-star-frog-splash').finisher,true);
  assert.equal(card('rob-van-dam-rolling-thunder').moveType,'aerial');
  assert.equal(card('rob-van-dam-van-daminator').moveType,'strike');
  assert.equal(star('rob-van-dam').ability.trigger.maxUses,2);
});

test('audited NXT/Ruthless finishers have no Method and proper rarity',()=>{
  const sets=new Set(['nxt-series-1','ruthless-aggression-series-1']);
  const finishers=allGameplayCards.filter(c=>sets.has(c.setId)&&c.superstarId&&c.kind==='move'&&c.finisher);
  assert.ok(finishers.length>=16);
  for(const c of finishers){
    assert.equal(c.method,null,`${c.id} should have no Method`);
    assert.equal(c.rarity,4,`${c.id} should use Finisher rarity`);
  }
});

test('v1.1.83 deep certification covers 81,000 matches with zero stalls',()=>{
  const report=JSON.parse(fs.readFileSync(new URL('../balance-reports/v1.1.83-active-81-deep-certification.json',import.meta.url),'utf8'));
  assert.equal(report.superstars,81);
  assert.equal(report.uniquePairings,3240);
  assert.equal(report.gamesPerPair,25);
  assert.equal(report.matches,81000);
  assert.equal(report.stalls,0);
  const rates=Object.fromEntries(report.rows.map(r=>[r.id,r.winRate]));
  assert.equal(rates['rob-van-dam'],58.45);
  assert.equal(rates['kendal-grey'],53.85);
  assert.equal(rates['tony-dangelo'],54.4);
  assert.equal(rates['jaida-parker'],54.6);
  assert.equal(rates['kelani-jordan'],53.05);
  assert.equal(rates['tatum-paxley'],51.55);
  assert.equal(rates['lexis-king'],58.85);
  assert.equal(rates['eddie-guerrero'],49.3);
});
