import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/game.css',import.meta.url),'utf8');
const studio=fs.readFileSync(new URL('../js/tools/card-art-studio.js',import.meta.url),'utf8');
const build=JSON.parse(fs.readFileSync(new URL('../build.json',import.meta.url),'utf8'));
const pkg=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8'));

test('v1.1.5-or-later markers remain aligned',()=>{
  assert.equal(build.version,pkg.version);
  const parts=build.version.split('.').map(Number);
  assert.ok(parts[0]>1 || (parts[0]===1 && (parts[1]>1 || (parts[1]===1 && parts[2]>=5))));
  assert.equal(build.physicalIphoneSmoke,`pending-v${build.version}-user-smoke`);
});

test('v1.1.5 uses one clean rectangular lower band with no nested stat boxes',()=>{
  const block=css.slice(css.indexOf('/* v1.1.5 — Clean collectible information band'),css.indexOf('/* v0.13.5 — Save backup'));
  assert.match(block,/clip-path:none/);
  assert.match(block,/border-radius:0/);
  assert.match(block,/\.ccg-live-stat\{[\s\S]*?border:0;[\s\S]*?background:none/);
  assert.match(block,/\.ccg-live-front-data::after\{display:none/);
  assert.doesNotMatch(studio,/const statBox=/);
  assert.match(studio,/fillRect\(panelLeft,panelTop,panelWidth/);
  assert.match(studio,/strokeRect\(panelLeft,panelTop,panelWidth/);
});

test('Reward cards use the new WWE Legacy REWARD logo and no extra bottom source text',()=>{
  assert.match(app,/season-1-last-time-is-now.*branding-wwe-legacy-reward-logo\.png/s);
  assert.doesNotMatch(app,/SEASON 1 REWARD|SEASON 2 REWARD|LEGACY REWARD/);
  assert.doesNotMatch(studio,/WWE LEGACY  •  REWARD/);
  assert.match(studio,/branding-wwe-legacy-reward-logo\.png/);
  assert.ok(fs.existsSync(new URL('../assets/images/branding-wwe-legacy-reward-logo.png',import.meta.url)));
});

test('exact approved NXT and Ruthless Aggression logo sources remain canonical with no invented fallback logos',()=>{
  assert.match(app,/https:\/\/corporate\.wwe\.com\/f\/inline-images\/NXT-logo\.png/);
  assert.match(app,/images\.hobbydb\.com[\s\S]*WWE_20Ruthless_20Aggression_20logo_large\.png/);
  assert.match(studio,/https:\/\/corporate\.wwe\.com\/f\/inline-images\/NXT-logo\.png/);
  assert.match(studio,/images\.hobbydb\.com[\s\S]*WWE_20Ruthless_20Aggression_20logo_large\.png/);
  assert.match(studio,/function studioFallbackLogoData\(id\)\{return "";\}/);
  assert.doesNotMatch(studio,/font-style="italic" fill="#e8ecef"/);
  assert.doesNotMatch(studio,/>RUTHLESS<\/text>/);
});
