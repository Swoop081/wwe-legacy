import { assetUrl } from "../config/build.js?v=1.1.112";
import { superstars } from "./superstars.js?v=1.1.112";

const ROOT="assets/images";
const slug=value=>String(value??"").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const starIds=Object.values(superstars).map(s=>s.id);
// Rare same-name collector identities need a readable disambiguator while the
// normal rule stays human-friendly (e.g. cody-cutter-cody-rhodes.webp).
const CARD_IMAGE_KEY_OVERRIDES=Object.freeze({
  "entrance-trick-williams":"whoop-that-trick-entrance-trick-williams",
  "running-powerslam":"running-powerslam-raw",
  "ra1-running-powerslam":"running-powerslam-ruthless-aggression",
  "springboard-crossbody":"springboard-crossbody-raw",
  "nxt1-springboard-crossbody":"springboard-crossbody-nxt"
});
export const canonicalImageKeyForCard=card=>{
  if(!card)return null;
  if(CARD_IMAGE_KEY_OVERRIDES[card.id])return CARD_IMAGE_KEY_OVERRIDES[card.id];
  if(card.kind==="superstar") return `${card.superstarId??String(card.id??"").replace(/^superstar-/,"")}-superstar`;
  const name=slug(card.name||card.id);
  if(card.kind==="action") return card.superstarId ? `${name}-action-${card.superstarId}` : `${name}-action`;
  return card.superstarId ? `${name}-${card.superstarId}` : name;
};
export const canonicalCardImagePath=card=>{const key=canonicalImageKeyForCard(card);return key?`${ROOT}/${key}.webp`:null;};
export const canonicalBasePlatePath=card=>{const key=canonicalImageKeyForCard(card);return key?`${ROOT}/${key}-base-plate.webp`:null;};
export const canonicalSuperstarPath=(id,type="superstar")=>`${ROOT}/${id}-${type}.webp`;

export const superstarArtwork=Object.freeze(Object.fromEntries(starIds.map(id=>[id,assetUrl(canonicalSuperstarPath(id,"superstar"))])));
export const menuSuperstarArtwork=Object.freeze(Object.fromEntries(starIds.map(id=>[id,assetUrl(canonicalSuperstarPath(id,"menu"))])));
export function menuSuperstarPhotoFor(superstarId){return superstarId?assetUrl(canonicalSuperstarPath(superstarId,"menu")):null;}
export const finalBossRockMenuArtwork=assetUrl(`${ROOT}/the-rock-final-boss-menu.webp`);
export const superstarCardArtwork=Object.freeze(Object.fromEntries(starIds.map(id=>[id,assetUrl(canonicalSuperstarPath(id,"superstar"))])));
export function superstarCardArtFor(superstarId){return superstarId?assetUrl(canonicalSuperstarPath(superstarId,"superstar")):null;}
export const superstarHeadshotArtwork=Object.freeze(Object.fromEntries(starIds.map(id=>[id,assetUrl(canonicalSuperstarPath(id,"headshot"))])));
export function superstarHeadshotFor(superstarId){return superstarId?assetUrl(canonicalSuperstarPath(superstarId,"headshot")):null;}
export function layeredCardArtFor(card){if(!card||card.kind==="momentum")return null;const path=canonicalBasePlatePath(card);return path?assetUrl(path):null;}
export function finishedCardArtFor(card){if(!card)return null;const path=canonicalCardImagePath(card);return path?assetUrl(path):null;}
export function legacyFinishedCardArtFor(card){
  if(!card)return null;
  if(card.kind==="superstar"){
    const id=card.superstarId??String(card.id??"").replace(/^superstar-/,"");
    return id?assetUrl(`${ROOT}/card-custom-superstar-${id}.webp`):null;
  }
  const kind=slug(card.kind||"card"),id=slug(card.id||"");
  return kind&&id?assetUrl(`${ROOT}/card-custom-${kind}-${id}.webp`):null;
}
export function moveCardArtFor(cardId){return cardId?assetUrl(`${ROOT}/${slug(cardId)}.webp`):null;}
export const cardArtwork=Object.freeze({});
export function artworkFor(card){if(!card)return null;const path=canonicalCardImagePath(card);return path?assetUrl(path):null;}
export function artworkRequirement(card){if(card?.kind==="superstar")return"unique-superstar-photo";if(card?.kind==="entrance")return"unique-entrance-photo";if(card?.kind==="momentum")return"graphic-momentum-art";if(card?.superstarId&&card?.kind==="move")return"unique-move-photo";return"generic-wwe-concept-photo";}
export function isTemporaryArtwork(_card){return false;}
