import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app=fs.readFileSync(new URL('../js/ui/app.js', import.meta.url),'utf8');
const artwork=fs.readFileSync(new URL('../js/data/artwork.js', import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/game.css', import.meta.url),'utf8');

function finalBlock(){
  const marker='v1.1.35 — clean Play cards + exact Card Studio runtime fronts + Trish fix.';
  const at=css.lastIndexOf(marker);
  assert.ok(at>=0,'v1.1.35 CSS marker');
  return css.slice(at);
}

test('v1.1.35 removes chamfered/cut corners from Play mode cards and page buttons',()=>{
  const block=finalBlock();
  assert.match(block,/\.legacy-mode-banner,[\s\S]*\.play-mode-page-arrow,[\s\S]*\.legacy-mode-copy>b\{[\s\S]*clip-path:none!important/);
  assert.match(block,/\.legacy-mode-banner\{border-radius:6px!important\}/);
  assert.match(block,/\.play-mode-page-arrow\{border-radius:6px!important\}/);
});

test('v1.1.35 finished Card Studio fronts are authoritative before layered reconstruction',()=>{
  assert.match(app,/Finished Card Studio exports are authoritative on every game surface/);
  assert.match(app,/const finishedFront = card\.kind !== "momentum" && Boolean\(finishedCardArtFor\(card\)\)/);
  assert.match(app,/const layeredFront = !finishedFront && Boolean\(layeredCardArtFor\(card\)\)/);
  assert.match(app,/const layeredFallbackData = finishedFront && layeredCardArtFor\(card\)/);
  assert.match(app,/cardArtFace\(card,\{eager:eagerArt\}\)/);
  assert.match(app,/const animatedSurface = preferFinished \? "" : animatedCardSurfaceMarkup\(card\)/);
  assert.match(artwork,/card-custom-superstar-\$\{id\}\.webp/);
  assert.match(artwork,/card-custom-\$\{kind\}-\$\{id\}\.webp/);
});

test('v1.1.35 keeps exact authored fronts fully contained and moves Trish back inside the Home tile',()=>{
  const block=finalBlock();
  assert.match(block,/ccg-finished-card-art-image\{[\s\S]*object-fit:contain!important/);
  assert.match(block,/\.legacy-season-rock:has\(img\.legacy-season-cena\)\{[\s\S]*right:-1%!important;[\s\S]*width:47%!important/);
  assert.match(block,/\.legacy-season-rock img\.legacy-season-cena\{[\s\S]*transform:scale\(1\.62\)!important/);
  assert.doesNotMatch(block,/right:-20%!important/);
});
