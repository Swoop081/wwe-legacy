import { createProfile, addOwnedCard, grantSuperstarUnlockPackage } from "./profile.js?v=1.1.132";

export const STARTER_DRAFT_SETS = Object.freeze([
  { id:"summerslam-series-1", label:"SummerSlam", rivalries:[["cody-rhodes","roman-reigns"],["seth-rollins","cm-punk"]] },
  { id:"evolution-series-1", label:"Evolution", rivalries:[["liv-morgan","rhea-ripley"],["becky-lynch","charlotte-flair"]] },
  { id:"golden-era-series-1", label:"Golden Era", rivalries:[["hulk-hogan","andre-the-giant"],["ultimate-warrior","randy-savage"]] },
  { id:"new-generation-series-1", label:"New Generation", rivalries:[["bret-hart","shawn-michaels"],["razor-ramon","diesel"]] },
  { id:"attitude-era-series-1", label:"Attitude Era", rivalries:[["stone-cold-steve-austin","the-rock-attitude"],["the-undertaker","kane"]] },
  { id:"ruthless-aggression-series-1", label:"Ruthless Aggression", rivalries:[["john-cena","randy-orton"],["rob-van-dam","jeff-hardy"]] }
]);

function shuffled(values,rng=Math.random){const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
export function rollStarterDraft(rng=Math.random){return shuffled(STARTER_DRAFT_SETS,rng).slice(0,4).map(set=>{const rivalry=set.rivalries[Math.floor(rng()*set.rivalries.length)];return {setId:set.id,setLabel:set.label,choices:[...rivalry]};});}
export function validateStarterDraft(route,selections){if(!Array.isArray(route)||route.length!==4||!Array.isArray(selections)||selections.length!==4)return false;const sets=new Set(route.map(r=>r.setId));return sets.size===4&&route.every((round,i)=>round.choices.includes(selections[i]));}

// Transitional profile constructor for the permanent rivalry onboarding. It uses
// the existing fresh-profile initializer for progression defaults, then removes
// the retired three-brand starter grant before installing exactly the four draft
// identities. No old RAW/SmackDown/NXT starter survives this transaction.
export function createStarterDraftProfile(route,selections){
  if(!validateStarterDraft(route,selections))throw new Error("Complete all four Starter Draft choices.");
  const p=createProfile(["roman-reigns","cm-punk","tony-dangelo"]);
  p.unlockedSuperstars=[];p.ownedCards={};p.savedDecks={};p.selectedEntrances={};p.deckNeedsCards={};p.pendingUnlockCelebrations=[];
  p.starterId=selections[0];p.starterIds=[...selections];
  p.starterDraft={version:1,route:route.map(r=>({setId:r.setId,choices:[...r.choices]})),selections:[...selections],complete:true};
  addOwnedCard(p,"entrance-amazing",{tier:"normal",amount:1});
  for(const id of ["momentum-strength","momentum-strike","momentum-technical","momentum-agility"])addOwnedCard(p,id,{tier:"normal",amount:5});
  for(const sid of selections)grantSuperstarUnlockPackage(p,sid,{celebrate:false});
  p.onboarding={complete:false,step:0};
  return p;
}
