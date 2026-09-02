import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { collectionCards } from '../js/data/collection.js?v=1.1.126';
import { MERCH_ITEMS } from '../js/data/merch.js?v=1.1.126';
import { SUPERSTAR_VARIANTS } from '../js/data/superstar-variants.js?v=1.1.126';
import { canonicalCardImagePath, canonicalBasePlatePath } from '../js/data/artwork.js?v=1.1.126';

const root = new URL('../', import.meta.url);
const read = relative => fs.readFileSync(new URL(relative, root), 'utf8');

function studioData() {
  const source = read('js/tools/card-art-studio-data.js');
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${source}\nglobalThis.__studio={cards:STUDIO_CARDS,stars:STUDIO_SUPERSTARS,sets:STUDIO_SETS};`, context);
  return context.__studio;
}

function parseCsvLine(line) {
  const out=[]; let cur=''; let quoted=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(ch==='"'){
      if(quoted && line[i+1]==='"'){cur+='"';i++;}
      else quoted=!quoted;
    } else if(ch===',' && !quoted){out.push(cur);cur='';}
    else cur+=ch;
  }
  out.push(cur); return out;
}
function assetRows(){
  const lines=read('ASSET-MIGRATION.csv').trim().split(/\r?\n/);
  const headers=parseCsvLine(lines[0]);
  return lines.slice(1).map(line=>Object.fromEntries(parseCsvLine(line).map((value,index)=>[headers[index],value])));
}

test('v1.1.2 Card Studio contains collector cards, Merch and Superstar Variants', () => {
  const studio=studioData();
  assert.equal(studio.cards.length, collectionCards.length + MERCH_ITEMS.length + SUPERSTAR_VARIANTS.length);
  assert.equal(studio.cards.filter(card=>card.kind==='merch').length, 515);
  assert.equal(studio.cards.filter(card=>card.kind==='variant').length, 95);
  assert.equal(studio.stars.length, 95);
  assert.ok(studio.sets.some(set=>set.id==='nxt-series-1'));
  assert.ok(studio.sets.some(set=>set.id==='ruthless-aggression-series-1'));
});

test('v1.1.2 Superstar complete library joins deck cards, exclusives, Actions, Merch and Variants', () => {
  const {cards}=studioData();
  const cena=cards.filter(card=>card.librarySuperstarIds?.includes('john-cena'));
  assert.ok(cena.some(card=>card.id==='superstar-john-cena'));
  assert.ok(cena.some(card=>card.kind==='action'));
  assert.ok(cena.some(card=>card.kind==='move'));
  assert.equal(cena.filter(card=>card.kind==='merch').length, 5);
  assert.equal(cena.filter(card=>card.kind==='variant').length, 1);
  assert.ok(cena.some(card=>card.deckSuperstarIds?.includes('john-cena')));
  assert.ok(cena.some(card=>card.specificSuperstarIds?.includes('john-cena')));
});

test('v1.1.2 every collectible, Merch and Variant has a unique base-plate target', () => {
  const all=[...collectionCards,...MERCH_ITEMS,...SUPERSTAR_VARIANTS];
  const plates=all.map(card=>canonicalBasePlatePath(card));
  assert.equal(all.length, 1546);
  assert.equal(plates.filter(Boolean).length, all.length);
  assert.equal(new Set(plates).size, all.length);
  assert.equal(canonicalBasePlatePath(collectionCards.find(card=>card.id==='superstar-john-cena')), 'assets/images/john-cena-superstar-base-plate.webp');
  assert.equal(canonicalBasePlatePath(collectionCards.find(card=>card.id==='momentum-strength')), 'assets/images/strength-momentum-base-plate.webp');
});

test('v1.1.2 migration manifest has matching primary and base-plate paths for all 1,540 card-like items', () => {
  const rows=assetRows().filter(row=>['collectible-card','merch-card','superstar-variant'].includes(row.asset_type));
  const byId=new Map(rows.map(row=>[row.entity_id,row]));
  const all=[...collectionCards,...MERCH_ITEMS,...SUPERSTAR_VARIANTS];
  assert.equal(rows.length, 1540);
  for(const card of all){
    const row=byId.get(card.id);
    assert.ok(row, `manifest row ${card.id}`);
    assert.equal(row.primary_image_path, canonicalCardImagePath(card), `primary ${card.id}`);
    assert.equal(row.base_plate_path, canonicalBasePlatePath(card), `plate ${card.id}`);
  }
});

test('v1.1.2 Card Studio uses canonical readable export paths and no Support filter', () => {
  const html=read('tools/card-art-studio.html');
  const js=read('js/tools/card-art-studio.js');
  assert.match(html, /Complete Superstar Library/);
  assert.match(html, /value="merch"/);
  assert.match(html, /value="variant"/);
  assert.doesNotMatch(html, /value="support"/);
  assert.match(js, /card\.basePlatePath/);
  assert.match(js, /card\.finishedPath/);
  assert.doesNotMatch(js, /card-layered-/);
  assert.doesNotMatch(js, /card-custom-/);
});
