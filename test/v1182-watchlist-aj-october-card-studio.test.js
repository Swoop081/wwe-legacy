import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js?v=1.1.116';
import { allGameplayCards } from '../js/data/content.js?v=1.1.116';
import { isScheduledSetReleased, setReleaseAt } from '../js/data/release.js?v=1.1.116';
import { boosterMerchSuperstarIds } from '../js/data/merch.js?v=1.1.116';

const byId=id=>Object.values(superstars).find(s=>s.id===id);
const card=id=>allGameplayCards.find(c=>c.id===id);

test('Card Studio defaults to a Darby-first Normal Cards workflow with animation separated',()=>{
  const html=fs.readFileSync(new URL('../tools/card-art-studio.html',import.meta.url),'utf8');
  const js=fs.readFileSync(new URL('../js/tools/card-art-studio.js',import.meta.url),'utf8');
  assert.match(html,/id="studio-tab-normal"[^>]*is-active|class="studio-mode-tab is-active"[^>]*data-studio-mode="normal"/);
  assert.match(html,/data-studio-mode="animated"/);
  assert.match(html,/id="animated-workflow-group"[^>]*studio-animated-only/);
  assert.match(html,/id="normal-artwork-group"[^>]*studio-normal-only/);
  assert.match(js,/studioMode:"normal"/);
  assert.match(js,/setStudioMode\("normal"\)/);
  assert.match(js,/animatedMode=state\.studioMode==="animated"/);
});

test('AJ Styles October reward gate and merch gate are explicit',()=>{
  assert.equal(setReleaseAt('rewards-october-2026'),'2026-10-01T00:00:00Z');
  assert.equal(isScheduledSetReleased('rewards-october-2026',new Date('2026-09-30T23:59:59Z')),false);
  assert.equal(isScheduledSetReleased('rewards-october-2026',new Date('2026-10-01T00:00:00Z')),true);
  assert.equal(boosterMerchSuperstarIds(new Date('2026-09-30T23:59:59Z')).includes('aj-styles'),false);
  assert.equal(boosterMerchSuperstarIds(new Date('2026-10-01T00:00:00Z')).includes('aj-styles'),true);
});

test('AJ printed conditional effects carry runtime data',()=>{
  const forearm=card('aj-styles-phenomenal-forearm');
  const house=card('aj-styles-house-that-aj-styles-built');
  assert.equal(forearm.bonusDamageIfDifferentMethodEarlierThisControl,2);
  assert.equal(house.effect.type,'ajHouseBuilt');
  assert.equal(house.effect.draw,1);
  assert.equal(house.effect.discount,1);
});

test('v1.1.82 watchlist identity corrections are locked',()=>{
  const el=byId('el-grande-americano'),brock=byId('brock-lesnar'),montez=byId('montez-ford');
  assert.equal(el.ability.trigger.maxUses,1);
  assert.equal(brock.special.reduce,2);
  assert.equal(montez.hp,62);
  assert.equal(montez.ability.trigger.discount,2);
  assert.equal(montez.ability.trigger.draw,1);
  assert.equal(montez.ability.trigger.drawMaxUses,2);

  const kendalAnkle=card('kendal-grey-ankle-lock'),kendalSlam=card('kendal-grey-olympic-slam');
  assert.equal(kendalAnkle.moveType,'submission');
  assert.equal(kendalAnkle.trademark,true);
  assert.equal(kendalAnkle.submission.pressure,5);
  assert.equal(kendalSlam.moveType,'grapple');
  assert.equal(kendalSlam.finisher,true);
  assert.equal(kendalSlam.damage,15);

  const fiveStar=card('rob-van-dam-five-star-frog-splash'),split=card('rob-van-dam-split-legged-moonsault');
  assert.equal(fiveStar.finisher,true);
  assert.ok(fiveStar.damage>=17);
  assert.equal(split.trademark,true);
  assert.notEqual(split.finisher,true);
});

test('v1.1.82 final deep certification covers the full active 81',()=>{
  const report=JSON.parse(fs.readFileSync(new URL('../balance-reports/v1.1.82-active-81-deep-certification.json',import.meta.url),'utf8'));
  assert.equal(report.superstars,81);
  assert.equal(report.uniquePairings,3240);
  assert.equal(report.gamesPerPair,25);
  assert.equal(report.matches,81000);
  assert.equal(report.stalls,0);
  const rates=Object.fromEntries(report.rows.map(r=>[r.id,r.winRate]));
  assert.equal(rates['aj-styles'],59.95);
  assert.equal(rates['el-grande-americano'],54.7);
  assert.equal(rates['brock-lesnar'],57.6);
  assert.equal(rates['montez-ford'],52.25);
  assert.equal(rates['kendal-grey'],54.7);
  assert.equal(rates['rob-van-dam'],49.35);
});
