import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allGameplayCards } from '../js/data/content.js?v=1.1.103';
import { decks } from '../js/data/decks.js?v=1.1.103';

const card=id=>allGameplayCards.find(c=>c.id===id);

test('v1.1.83 NXT identity corrections are locked',()=>{
  assert.equal(card('kendal-grey-ankle-lock').moveType,'submission');
  assert.equal(card('kendal-grey-olympic-slam').finisher,true);

  assert.equal(card('tony-dangelo-fisherman-buster').moveType,'grapple');
  assert.equal(card('tony-dangelo-forget-about-it').name,'Dead to Rights');

  assert.equal(card('jaida-parker-running-hip-attack').moveType,'strike');
  assert.equal(card('jaida-parker-corner-spinebuster').name,'Deja Vu');

  assert.equal(card('kelani-jordan-split-legged-moonsault').finisher,true);
  assert.equal(card('kelani-jordan-split-legged-moonsault').moveType,'aerial');
  assert.equal(card('kelani-jordan-450-splash').trademark,true);
  assert.equal(card('kelani-jordan-450-splash').moveType,'aerial');

  assert.equal(card('lexis-king-coronation-neckbreaker').name,'Coronation DDT');
  assert.equal(card('lexis-king-coronation-neckbreaker').finisher,true);
  assert.equal(card('lexis-king-king-s-landing').trademark,true);

  assert.equal(card('zilla-fatu-island-driver').moveType,'grapple');
  assert.equal(card('zilla-fatu-island-driver').groundedOnly,false);
});

test('v1.1.83 Ruthless Aggression identity corrections are locked',()=>{
  assert.equal(card('randy-orton-rko').method,null);
  assert.equal(card('randy-orton-punt-kick').method,null);
  assert.equal(card('jbl-clothesline-from-hell').moveType,'strike');

  assert.equal(card('eddie-guerrero-lasso-from-el-paso').moveType,'submission');
  assert.equal(card('eddie-guerrero-lasso-from-el-paso').trademark,true);
  assert.equal(card('eddie-guerrero-frog-splash').moveType,'aerial');
  assert.equal(card('eddie-guerrero-frog-splash').finisher,true);
  assert.equal(card('eddie-guerrero-frog-splash').submission,undefined);

  assert.equal(card('edge-edge-o-matic').moveType,'grapple');
  assert.equal(card('edge-impaler-ddt').moveType,'grapple');

  assert.equal(card('jeff-hardy-whisper-in-the-wind').moveType,'aerial');
  assert.equal(card('jeff-hardy-whisper-in-the-wind').method,'agility');
  assert.equal(card('jeff-hardy-swanton-bomb').moveType,'aerial');

  assert.equal(card('rob-van-dam-five-star-frog-splash').finisher,true);
  assert.equal(card('rob-van-dam-five-star-frog-splash').moveType,'aerial');
  assert.equal(card('rob-van-dam-five-star-frog-splash').cost,11);
  assert.equal(card('rob-van-dam-five-star-frog-splash').damage,17);
  assert.equal(card('rob-van-dam-rolling-thunder').moveType,'aerial');
  assert.equal(card('rob-van-dam-rolling-thunder').method,'agility');
  assert.equal(card('rob-van-dam-van-daminator').moveType,'strike');
  assert.equal(card('rob-van-dam-van-daminator').method,'strike');
});

test('audited NXT/RA sets contain no illegal Finisher Method or broken search targets',()=>{
  const targetSets=new Set(['nxt-series-1','ruthless-aggression-series-1']);
  const names=new Set(allGameplayCards.map(c=>c.name));
  for(const c of allGameplayCards.filter(c=>targetSets.has(c.setId))){
    if(c.finisher)assert.ok(c.method===null||c.method===undefined,`${c.id} retains Finisher Method ${c.method}`);
    const targets=[];
    if(c.searchOnConnectName)targets.push(c.searchOnConnectName);
    for(const e of c.effects??[])if(e.type==='search'&&e.name)targets.push(e.name);
    for(const name of targets)assert.ok(names.has(name),`${c.id} searches missing card ${name}`);
  }
});

test('corrected NXT recommended deck role counts are retained',()=>{
  assert.equal(decks['kelani-jordan'].filter(c=>c.id==='kelani-jordan-split-legged-moonsault').length,2);
  assert.equal(decks['kelani-jordan'].filter(c=>c.id==='kelani-jordan-450-splash').length,3);
  assert.equal(decks['lexis-king'].filter(c=>c.id==='lexis-king-coronation-neckbreaker').length,2);
  assert.equal(decks['lexis-king'].filter(c=>c.id==='lexis-king-king-s-landing').length,5);
});

test('v1.1.83 final certification covers 81,000 matches with no stalls',()=>{
  const report=JSON.parse(fs.readFileSync(new URL('../balance-reports-v1.1.83/active-81-deep-certification.json',import.meta.url),'utf8'));
  assert.equal(report.superstars,81);
  assert.equal(report.uniquePairings,3240);
  assert.equal(report.gamesPerPair,25);
  assert.equal(report.matches,81000);
  assert.equal(report.stalls,0);
  const rates=Object.fromEntries(report.rows.map(r=>[r.id,r.winRate]));
  assert.equal(rates['rob-van-dam'],58.45);
  assert.equal(rates['aj-styles'],59.6);
  assert.equal(rates['lexis-king'],58.85);
});
