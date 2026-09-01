
import { createProfile } from "../js/data/profile.js";
import { grantBooster, openBooster, randomReleasedBoosterSetId } from "../js/data/boosters.js";
import { spinDaily } from "../js/data/daily-spin.js";
import { awardMatchSeasonXp, awardSeasonXp, seasonTier, DAILY_CHALLENGE_XP, WEEKLY_CHALLENGE_XP } from "../js/data/seasons.js";

function rngFactory(seed){let x=seed>>>0;return ()=>{x=(Math.imul(1664525,x)+1013904223)>>>0;return x/4294967296;};}
const N=1000, days=30;
const rows=[];
for(let seed=1;seed<=N;seed++){
  const rng=rngFactory(seed);
  const p=createProfile("roman-reigns");
  let opened=0, superstarHits=0, merch=0, upFromDuplicates=0;
  const startUP=p.universePoints??0;
  let prevUnlocked=p.unlockedSuperstars.length;
  for(let day=0;day<days;day++){
    const now=new Date(Date.UTC(2026,7,22+day,12));
    // Daily spin
    const sr=spinDaily(p,rng,now);
    // 15 live-event wins/day, plus all 7 daily challenge XP and daily set completion.
    for(let i=0;i<15;i++) awardMatchSeasonXp(p,"win");
    awardSeasonXp(p,7*DAILY_CHALLENGE_XP,"challenge");
    awardSeasonXp(p,25,"live-event-daily-set");
    // 3 live-event clear boosters/day
    for(let b=0;b<3;b++){
      const setId=randomReleasedBoosterSetId(now,rng);
      grantBooster(p,1,setId);
      const before=p.universePoints??0;
      const pack=openBooster(p,rng,setId,now);
      opened++;
      merch += pack.filter(x=>x.isMerch).length;
      if(p.unlockedSuperstars.length>prevUnlocked){superstarHits += p.unlockedSuperstars.length-prevUnlocked;prevUnlocked=p.unlockedSuperstars.length;}
      upFromDuplicates += Math.max(0,(p.universePoints??0)-before);
    }
  }
  // Weekly challenges: seven at 25 XP each, four weeks.
  awardSeasonXp(p,4*7*WEEKLY_CHALLENGE_XP,"challenge");
  rows.push({tier:seasonTier(p),xp:p.seasons["season-1"].xp,opened,unlocked:p.unlockedSuperstars.length,superstarHits,merch,up:p.universePoints??0,dupUP:upFromDuplicates,pity:p.packsSinceSuperstarUnlock});
}
const avg=k=>rows.reduce((a,r)=>a+r[k],0)/N;
const sorted=(k)=>rows.map(r=>r[k]).sort((a,b)=>a-b);
const pct=(k,p)=>sorted(k)[Math.floor((N-1)*p)];
console.log(JSON.stringify({N,days,avg:Object.fromEntries(["tier","xp","opened","unlocked","superstarHits","merch","up","dupUP","pity"].map(k=>[k,+avg(k).toFixed(2)])),p10:{unlocked:pct("unlocked",.1),up:pct("up",.1)},median:{unlocked:pct("unlocked",.5),up:pct("up",.5)},p90:{unlocked:pct("unlocked",.9),up:pct("up",.9)}},null,2));
