import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allGameplayCards } from '../js/data/content.js?v=1.1.107';

const card=id=>allGameplayCards.find(c=>c.id===id);
const SETS=new Set([
  'raw-series-1','smackdown-series-1','evolution-series-1','summerslam-series-1',
  'golden-era-series-1','new-generation-series-1','attitude-era-series-1'
]);

test('all audited released-set Finishers ignore Method',()=>{
  for(const c of allGameplayCards.filter(c=>SETS.has(c.setId)&&c.finisher)){
    assert.ok(c.method===null||c.method===undefined,`${c.id} still has Finisher Method ${c.method}`);
  }
});

test('remaining released-set hard move-type corrections are locked',()=>{
  assert.equal(card('iyo-sky-bullet-train-attack').moveType,'strike');
  assert.equal(card('raquel-rodriguez-big-boot').moveType,'strike');
  assert.equal(card('hogans-big-boot').moveType,'strike');
  assert.equal(card('hulk-hogan-atomic-leg-drop').moveType,'aerial');
  assert.equal(card('ultimate-warrior-diving-shoulder-block').moveType,'strike');
  assert.equal(card('bret-hart-second-rope-elbow-drop').moveType,'aerial');
  assert.equal(card('bret-hart-second-rope-elbow-drop').method,'agility');
  assert.match(card('razor-ramon-bulldog').rulesText,/Razor Ramon-exclusive/);
});

test('Chelsea Green authentic finisher hierarchy is locked',()=>{
  const unpretty=card('chelsea-green-im-prettier');
  const envy=card('chelsea-green-green-with-envy');
  assert.equal(unpretty.name,'Un-Pretty-Her');
  assert.equal(unpretty.finisher,true);
  assert.notEqual(unpretty.trademark,true);
  assert.equal(unpretty.method,null);
  assert.equal(unpretty.cost,10);
  assert.equal(envy.trademark,true);
  assert.notEqual(envy.finisher,true);
  assert.equal(envy.method,'technical');
  const search=envy.effects.find(e=>e.type==='search');
  assert.equal(search.name,'Un-Pretty-Her');
  assert.equal(search.discount,1);
});

test('SmackDown physical move classifications are corrected without breaking Method lanes',()=>{
  const exploder=card('shinsuke-nakamura-inverted-exploder');
  const german=card('shinsuke-nakamura-sliding-german-suplex');
  assert.equal(exploder.moveType,'grapple');
  assert.equal(exploder.method,'strike');
  assert.equal(german.moveType,'grapple');
  assert.equal(german.method,'agility');
  assert.equal(german.groundedOnly,false);

  const monroeKick=card('blake-monroe-monroe-kick');
  const stomp=card('blake-monroe-top-rope-double-stomp');
  assert.equal(monroeKick.moveType,'strike');
  assert.equal(monroeKick.method,'technical');
  assert.equal(stomp.moveType,'aerial');

  assert.equal(card('trick-williams-cyclone-boot').moveType,'strike');
  assert.equal(card('trick-williams-trick-knee').moveType,'strike');
  assert.equal(card('trick-williams-trick-shot').moveType,'strike');
  assert.equal(card('jacy-jayne-cannonball-senton').moveType,'aerial');
});

test('no broken named search target remains in seven-set audit scope',()=>{
  const names=new Set(allGameplayCards.map(c=>c.name));
  for(const c of allGameplayCards.filter(c=>SETS.has(c.setId))){
    if(c.searchOnConnectName)assert.ok(names.has(c.searchOnConnectName),`${c.id} searches missing ${c.searchOnConnectName}`);
    for(const e of c.effects??[])if(e.type==='search'&&e.name)assert.ok(names.has(e.name),`${c.id} searches missing ${e.name}`);
  }
});

test('v1.1.84 deep certification covers active 81 after identity corrections',()=>{
  const report=JSON.parse(fs.readFileSync(new URL('../balance-reports/v1.1.84-active-81-deep-certification.json',import.meta.url),'utf8'));
  assert.equal(report.superstars,81);
  assert.equal(report.uniquePairings,3240);
  assert.equal(report.gamesPerPair,25);
  assert.equal(report.matches,81000);
  assert.equal(report.stalls,0);
  const rates=Object.fromEntries(report.rows.map(r=>[r.id,r.winRate]));
  assert.equal(rates['chelsea-green'],55);
  assert.equal(rates['shinsuke-nakamura'],46.9);
  assert.equal(rates['trick-williams'],47.35);
  assert.equal(rates['jacy-jayne'],48.8);
});
