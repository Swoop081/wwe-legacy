import { assetUrl } from "../config/build.js?v=1.1.37";
import { canonicalImageKeyForCard } from "./artwork.js?v=1.1.37";

// v1.1.22 — Every collectible card may optionally use animated artwork.
// Animation is opt-in per card; the existing static front/base plate is always the fallback.
export function isAnimatedCardEligible(card){
  return Boolean(card && card.id);
}

export const LINKED_ANIMATION_STORAGE_KEY="wweLegacyAnimatedCardLinks.v1";

function linkedAnimationMap(){
  try{
    const raw=globalThis.localStorage?.getItem(LINKED_ANIMATION_STORAGE_KEY);
    if(!raw) return {};
    const parsed=JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  }catch{return {};}
}

export function linkedAnimatedCardUrl(card){
  if(!isAnimatedCardEligible(card) || !card?.id) return "";
  const value=String(linkedAnimationMap()[card.id]||"").trim();
  if(!/^https?:\/\//i.test(value)) return "";
  return value;
}

export function setLinkedAnimatedCardUrl(card,url){
  if(!isAnimatedCardEligible(card) || !card?.id) return false;
  const value=String(url||"").trim();
  try{
    const map=linkedAnimationMap();
    if(value) map[card.id]=value; else delete map[card.id];
    globalThis.localStorage?.setItem(LINKED_ANIMATION_STORAGE_KEY,JSON.stringify(map));
    return true;
  }catch{return false;}
}

export function canonicalAnimatedCardPaths(card){
  if(!isAnimatedCardEligible(card)) return null;
  const key=canonicalImageKeyForCard(card);
  if(!key) return null;
  const root=`assets/images/${key}-animated`;
  return {
    linked: linkedAnimatedCardUrl(card),
    webp: assetUrl(`${root}.webp`),
    gif: assetUrl(`${root}.gif`),
    relativeWebp: `${root}.webp`,
    relativeGif: `${root}.gif`,
  };
}
