
import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.128";
import { CARD_TIERS, applyCardTier } from "../js/data/variants.js?v=1.1.128";

const sig=c=>JSON.stringify({
  cost:c.cost??null,damage:c.damage??null,effects:c.effects??null,effect:c.effect??null,special:c.special??null,
  submission:c.submission??null,preMatchMomentum:c.preMatchMomentum??null,preMatchAdrenaline:c.preMatchAdrenaline??null,
  preMatchCounterDiscount:c.preMatchCounterDiscount??null,amount:c.amount??null,tierUtilityDraw:c.tierUtilityDraw??null,
  tierManagerDraw:c.tierManagerDraw??null,tierEntranceRank:c.tierEntranceRank??null,tierActionRank:c.tierActionRank??null,drawOnCounter:c.drawOnCounter??null
});
for(const kind of ["action","entrance","manager","momentum"]){
  test(`v1.1.70 ${kind} cards have five distinct printings`,()=>{
    for(const card of allGameplayCards.filter(c=>c.kind===kind && !c.fixedPrintingTier)){
      const versions=CARD_TIERS.map(t=>applyCardTier(card,t));
      assert.equal(new Set(versions.map(sig)).size,5,`${card.id} collapses a printing`);
    }
  });
}
test("v1.1.70 complete variable gameplay library has distinct adjacent printings",()=>{
 for(const card of allGameplayCards.filter(c=>!c.fixedPrintingTier)){
   const versions=CARD_TIERS.map(t=>applyCardTier(card,t));
   for(let i=1;i<versions.length;i++) assert.notEqual(sig(versions[i-1]),sig(versions[i]),`${card.id}: ${CARD_TIERS[i-1]} = ${CARD_TIERS[i]}`);
 }
});
