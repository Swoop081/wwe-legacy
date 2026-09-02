import { addUniversePoints } from "./profile.js?v=1.1.130";
import { grantBooster, randomReleasedBoosterSetId } from "./boosters.js?v=1.1.130";
import { grantMerch, rollMerch } from "./merch.js?v=1.1.130";
export const DAILY_SPIN_COOLDOWN_MS=24*60*60*1000;
export const DAILY_SPIN_WEDGES=Object.freeze([
 {id:"up-50",label:"50 UP",type:"up",amount:50},
 {id:"xp-15",label:"15 SEASON XP",type:"season-xp",amount:15},
 {id:"pack",label:"BOOSTER",type:"booster",amount:1},
 {id:"up-150",label:"150 UP",type:"up",amount:150},
 {id:"merch",label:"PREMIUM MERCH",type:"merch",amount:1},
 {id:"xp-30",label:"30 SEASON XP",type:"season-xp",amount:30}
]);
export function dailySpinState(profile,now=new Date()){const s=profile?.dailySpin??{};const next=s.nextSpinAt?new Date(s.nextSpinAt).getTime():0;const msRemaining=Math.max(0,next-now.getTime());return {available:msRemaining<=0,msRemaining,lastSpinAt:s.lastSpinAt??null,nextSpinAt:s.nextSpinAt??null,totalSpins:Number(s.totalSpins)||0,lastReward:s.lastReward??null};}
export function spinDaily(profile,rng=Math.random,now=new Date()){if(!profile)throw new Error("Profile required.");const state=dailySpinState(profile,now);if(!state.available)throw new Error("Daily Spin is not ready yet.");const index=Math.max(0,Math.min(DAILY_SPIN_WEDGES.length-1,Math.floor(rng()*DAILY_SPIN_WEDGES.length))),reward={...DAILY_SPIN_WEDGES[index],index};if(reward.type==="up")addUniversePoints(profile,reward.amount);if(reward.type==="season-xp"){profile.seasons??={};profile.seasons["season-1"]??={xp:0,claimedTiers:[]};profile.seasons["season-1"].xp=Math.max(0,Number(profile.seasons["season-1"].xp)||0)+reward.amount;}if(reward.type==="booster"){const setId=randomReleasedBoosterSetId(now,rng);grantBooster(profile,1,setId);reward.setId=setId;}if(reward.type==="merch"){const setId=randomReleasedBoosterSetId(now,rng);const item=rollMerch(setId,rng);grantMerch(profile,item);reward.merchId=item.id;reward.merchName=item.name;reward.setId=setId;}profile.dailySpin={lastSpinAt:now.toISOString(),nextSpinAt:new Date(now.getTime()+DAILY_SPIN_COOLDOWN_MS).toISOString(),totalSpins:(Number(state.totalSpins)||0)+1,lastReward:reward};return reward;}
