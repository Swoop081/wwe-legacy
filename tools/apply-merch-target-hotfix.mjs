import fs from 'node:fs';

const merchPath='js/data/merch.js';
const appPath='js/ui/app.js';

let merch=fs.readFileSync(merchPath,'utf8');
const oldModifier='export function merchMatchModifier(profile,superstarId=""){ const item=activeMerchItem(profile,superstarId); if(!item)return null;';
const newModifier='export function merchMatchModifier(profile,superstarId=""){ const targetId=String(superstarId??"").trim(); if(!targetId)return null; const item=activeMerchItem(profile,targetId); if(!item)return null;';
if(!merch.includes(oldModifier)) throw new Error('Expected merchMatchModifier source not found');
merch=merch.replace(oldModifier,newModifier);
fs.writeFileSync(merchPath,merch);

let app=fs.readFileSync(appPath,'utf8');
const oldBlock=`      ${'${'}activeMerchRecord ? \`<div class="deck-merch-active">
        <div class="deck-merch-card">${'${'}collectibleCardMarkup(activeMerchRecord,{tier:'normal',extraClass:'deck-merch-ccg',flipAttr:\`data-deck-lab-inspect="${'${'}activeMerchRecord.id}"\`})}</div>
        <div class="deck-merch-copy"><span>${'${'}activeMerchForStar ? 'ACTIVE FOR THIS SUPERSTAR' : \`SLOT OCCUPIED · ${'${'}superstarById[activeMerchTargetId]?.name ?? activeMerchTargetId ?? 'ASSIGNED SUPERSTAR'}\`}</span><strong>${'${'}activeMerchRecord.name}</strong><p>${'${'}activeMerchRecord.rulesText}</p><small>${'${'}activeMerchRecord.duration} match card · ${'${'}activeMerchMatches} remaining · assigned only to ${'${'}superstarById[activeMerchTargetId]?.name ?? 'one Superstar'} · one use consumed after each completed eligible match.</small></div>
        <button id="discard-deck-merch" type="button" class="secondary">DISCARD ACTIVE MERCH</button>
      </div>\` : \`<div class="deck-merch-empty"><div><span>FREE MERCH SLOT</span><strong>Add a temporary match boost</strong><p>Equip eligible Generic Merch or ${'${'}star.name}-specific Merch. Generic Merch is assigned to this Superstar only. Method boosts are blocked when this Superstar cannot legally use that Method.</p></div><button id="change-merch" type="button" class="primary">ADD MERCH</button></div>\`}`;
const newBlock=`      ${'${'}activeMerchForStar ? \`<div class="deck-merch-active">
        <div class="deck-merch-card">${'${'}collectibleCardMarkup(activeMerchForStar,{tier:'normal',extraClass:'deck-merch-ccg',flipAttr:\`data-deck-lab-inspect="${'${'}activeMerchForStar.id}"\`})}</div>
        <div class="deck-merch-copy"><span>ACTIVE FOR THIS SUPERSTAR</span><strong>${'${'}activeMerchForStar.name}</strong><p>${'${'}activeMerchForStar.rulesText}</p><small>${'${'}activeMerchForStar.duration} match card · ${'${'}activeMerchMatches} remaining · assigned only to ${'${'}star.name} · one use consumed after each completed eligible match.</small></div>
        <button id="discard-deck-merch" type="button" class="secondary">DISCARD ACTIVE MERCH</button>
      </div>\` : activeMerchRecord ? \`<div class="deck-merch-empty deck-merch-occupied"><div><span>SLOT OCCUPIED</span><strong>Merch assigned to ${'${'}superstarById[activeMerchTargetId]?.name ?? 'another Superstar'}</strong><p>The active Merch card and its match bonus apply only to ${'${'}superstarById[activeMerchTargetId]?.name ?? 'the assigned Superstar'}. It is not equipped to ${'${'}star.name}.</p></div></div>\` : \`<div class="deck-merch-empty"><div><span>FREE MERCH SLOT</span><strong>Add a temporary match boost</strong><p>Equip eligible Generic Merch or ${'${'}star.name}-specific Merch. Generic Merch is assigned to this Superstar only. Method boosts are blocked when this Superstar cannot legally use that Method.</p></div><button id="change-merch" type="button" class="primary">ADD MERCH</button></div>\`}`;
if(!app.includes(oldBlock)) throw new Error('Expected Deck Lab merch block not found');
app=app.replace(oldBlock,newBlock);
fs.writeFileSync(appPath,app);

console.log('Applied Superstar-targeted Merch hotfix.');
