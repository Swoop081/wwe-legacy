import { isUnreleasedSetId, isPlayerVisibleSuperstar } from "./release.js?v=1.1.132";
import { superstars } from "./superstars.js?v=1.1.132";
import { grantRandomBoosters } from "./boosters.js?v=1.1.132";
import { awardSeasonXp } from "./seasons.js?v=1.1.132";

export const LIVE_EVENT_LENGTH = 5;
export const LIVE_EVENT_WIN_UP = 0;
export const LIVE_EVENT_CLEAR_BOOSTERS = 1;
export const DAILY_LIVE_EVENT_SET_XP = 25;
export const LIVE_EVENT_COOLDOWN_DAYS = 1;

const METHOD_LABELS = Object.freeze({ strength:"Strength", strike:"Strike", technical:"Technical", agility:"Agility" });
const DAY_MS = 86400000;
const ROTATION_EPOCH = new Date(2026, 8, 3, 0, 0, 0);
const REWARD_FALLBACKS = Object.freeze(["summerslam-series-1","golden-era-series-1","attitude-era-series-1","evolution-series-1"]);

const E = (id,name,kicker,method,heroId,rewardSetId,logoMode,opponentPool,accent) => Object.freeze({id,name,kicker,description:`Five matches in today's ${name} Live Event.`,method,heroId,rewardSetId,logoMode,opponentPool,accent});

export const LIVE_EVENT_ROTATION_POOL = Object.freeze([
  E("daily-raw","Daily RAW","RAW · ONE DAY ONLY","strike","logan-paul","raw-series-1","raw",["logan-paul","seth-rollins","roman-reigns","bron-breakker","austin-theory","montez-ford","chad-gable","joe-hendry"],"raw"),
  E("daily-smackdown","Daily SmackDown","SMACKDOWN · ONE DAY ONLY","technical","chelsea-green","smackdown-series-1","smackdown",["chelsea-green","cody-rhodes","randy-orton","charlotte-flair","tiffany-stratton","kevin-owens","cm-punk","trick-williams"],"smackdown"),
  E("daily-nxt","Daily NXT","NXT · ONE DAY ONLY","agility","kelani-jordan","nxt-series-1","nxt",["kelani-jordan","kendal-grey","tony-dangelo","jaida-parker","mason-rook","tatum-paxley","lexis-king","zilla-fatu"],"nxt"),
  E("womens-evolution","Women’s Evolution","WOMEN'S DIVISION","technical","becky-lynch","evolution-series-1","legacy",["becky-lynch","rhea-ripley","charlotte-flair","iyo-sky","bayley","paige","liv-morgan","chelsea-green","kelani-jordan"],"evolution"),
  E("ruthless-aggression","Ruthless Aggression","RUTHLESS AGGRESSION","strength","randy-orton","ruthless-aggression-series-1","legacy",["randy-orton","john-cena","batista","jbl","eddie-guerrero","edge","jeff-hardy","rob-van-dam"],"ruthless"),
  E("golden-era","Golden Era","GOLDEN ERA","strength","ultimate-warrior","golden-era-series-1","legacy",["ultimate-warrior","hulk-hogan","andre-the-giant","randy-savage","rowdy-roddy-piper","ted-dibiase","jake-roberts","mr-perfect"],"golden"),
  E("attitude-era","Attitude Era","ATTITUDE ERA","strike","the-rock-attitude","attitude-era-series-1","legacy",["the-rock-attitude","stone-cold-steve-austin","mankind","kane","the-undertaker","triple-h","chris-jericho","kurt-angle"],"attitude"),
  E("new-generation","New Generation","NEW GENERATION","technical","shawn-michaels","new-generation-series-1","legacy",["shawn-michaels","bret-hart","razor-ramon","diesel","doink-the-clown","yokozuna","owen-hart","british-bulldog"],"newgen"),
  E("submission-specialists","Submission Specialists","SUBMISSION SPECIALISTS","technical","kurt-angle","attitude-era-series-1","legacy",["kurt-angle","bret-hart","becky-lynch","cm-punk","gunther","rowdy-roddy-piper","eddie-guerrero","tony-dangelo"],"submission"),
  E("high-flyers","High Flyers","HIGH FLYERS","agility","rob-van-dam","ruthless-aggression-series-1","legacy",["rob-van-dam","jeff-hardy","rey-mysterio","iyo-sky","seth-rollins","logan-paul","kelani-jordan","liv-morgan"],"flyers"),
  E("power-houses","Power Houses","POWER HOUSES","strength","brock-lesnar","summerslam-series-1","legacy",["brock-lesnar","roman-reigns","gunther","batista","ultimate-warrior","diesel","zilla-fatu","kane"],"power"),
  E("monster-mayhem","Monster Mayhem","MONSTER MAYHEM","strength","kane","attitude-era-series-1","legacy",["kane","the-undertaker","brock-lesnar","andre-the-giant","yokozuna","diesel","zilla-fatu","batista"],"monster")
]);

export const DAILY_LIVE_EVENTS = Object.freeze({});
export const THREE_DAY_TOWERS = Object.freeze([]);
export const WEEKLY_TOWERS = Object.freeze([]);
export const WEEKLY_LIVE_EVENTS = Object.freeze([]);
export const RAW_LIVE_EVENT = LIVE_EVENT_ROTATION_POOL[0];

function localDayStart(now=new Date()){const d=now instanceof Date?new Date(now):new Date(now);d.setHours(0,0,0,0);return d;}
function dateKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function daySerial(now=new Date()){return Math.max(0,Math.floor((localDayStart(now)-localDayStart(ROTATION_EPOCH))/DAY_MS));}
function superstarRecord(id){return superstars[id]??Object.values(superstars).find(s=>s.id===id)??null;}
function releasedRewardSet(id,index=0,now=new Date()){return id&&!isUnreleasedSetId(id,now)?id:REWARD_FALLBACKS[index%REWARD_FALLBACKS.length];}
export function releasedLiveEventOpponentIds(event,profile=null,now=new Date()){return [...new Set(event?.opponentPool??[])].filter(id=>isPlayerVisibleSuperstar(superstarRecord(id),profile,now));}
function cloneEvent(template,index,profile,now){return {...template,rewardSetId:releasedRewardSet(template.rewardSetId,index,now),opponentPool:releasedLiveEventOpponentIds(template,profile,now)};}
function descriptor(event,index,now){const start=localDayStart(now),nextAt=new Date(start);nextAt.setDate(nextAt.getDate()+1);return {key:`daily:${dateKey(start)}:slot-${index+1}:${event.id}`,event,startsAt:start,nextAt,cadence:"daily",cadenceLabel:"24 HOURS ONLY",winUp:0,clearBoosters:1,length:5,msRemaining:Math.max(0,nextAt-now)};}

export function rotatingLiveEventTemplates(now=new Date()){
  const start=(daySerial(now)*3)%LIVE_EVENT_ROTATION_POOL.length;
  return [0,1,2].map(i=>LIVE_EVENT_ROTATION_POOL[(start+i)%LIVE_EVENT_ROTATION_POOL.length]);
}
export function activeLiveEventTowers(now=new Date(),profile=null){return rotatingLiveEventTemplates(now).map((t,i)=>descriptor(cloneEvent(t,daySerial(now)+i,profile,now),i,now));}
export function liveEventTowerByKey(key,now=new Date(),profile=null){return activeLiveEventTowers(now,profile).find(t=>t.key===key)??null;}
export function liveEventRotation(now=new Date()){const tower=activeLiveEventTowers(now,null)[0];return {weekKey:dateKey(localDayStart(now)),dayKey:dateKey(localDayStart(now)),dayIndex:localDayStart(now).getDay(),event:tower.event,startsAt:tower.startsAt,nextAt:tower.nextAt,msRemaining:tower.msRemaining};}

function ensureStore(profile){profile.liveEventTowers??={states:{},totalClears:profile.weeklyLiveEvents?.totalClears??0,completedKeys:[],dailySetXpClaimedDays:[]};profile.liveEventTowers.states??={};profile.liveEventTowers.completedKeys??=[];profile.liveEventTowers.dailySetXpClaimedDays??=[];profile.weeklyLiveEvents??={weekKey:null,eventId:null,activeRun:null,clearedThisWeek:false,totalClears:profile.liveEventTowers.totalClears??0,bestStage:0,completedWeeks:[]};return profile.liveEventTowers;}
function stateFor(profile,tower){const store=ensureStore(profile);store.states[tower.key]??={towerKey:tower.key,eventId:tower.event.id,activeRun:null,cleared:false,bestStage:0};return store.states[tower.key];}
export function liveEventTowerState(profile,key,now=new Date()){const tower=liveEventTowerByKey(key,now,profile);if(!tower)return null;return {tower,state:stateFor(profile,tower),aggregate:ensureStore(profile)};}

export function liveEventStage(event,stageIndex){const i=Math.max(0,Math.min(4,Number(stageIndex)||0)),m=event?.method??"strength",label=METHOD_LABELS[m]??m;const stages=[{label:"Opening Bout",ruleName:"Standard Rules",ruleText:"No event modifier.",modifier:null},{label:"Hot Start",ruleName:`${label} Advantage`,ruleText:`Opponent begins with +1 ${label} Momentum.`,modifier:{startingMomentum:{p2:{[m]:1}}}},{label:"Main Event Pressure",ruleName:"Crowd Momentum",ruleText:"Opponent begins with +1 Adrenaline.",modifier:{startingAdrenaline:{p2:1}}},{label:"Against the Odds",ruleName:"Pre-Match Damage",ruleText:"You begin the match 4 HP down.",modifier:{startingHpLoss:{p1:4}}},{label:"Tower Final",ruleName:"Final Boss Pressure",ruleText:`Opponent begins with +1 ${label} Momentum and +1 Adrenaline.`,modifier:{startingMomentum:{p2:{[m]:1}},startingAdrenaline:{p2:1}}}];return {index:i,...stages[i]};}
function shuffle(v,rng=Math.random){const a=[...v];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function eligiblePlayer(profile,id,now){const star=superstarRecord(id);return !!star&&profile?.unlockedSuperstars?.includes(id)&&isPlayerVisibleSuperstar(star,profile,now);}
function chooseOpponents(profile,tower,playerId,eligibleIds,rng,now){const allowed=new Set((eligibleIds??[]).filter(id=>isPlayerVisibleSuperstar(superstarRecord(id),profile,now)));const themed=tower.event.opponentPool.filter(id=>allowed.has(id)&&id!==playerId);const fallback=[...allowed].filter(id=>id!==playerId&&!themed.includes(id));return [...shuffle(themed,rng),...shuffle(fallback,rng)].slice(0,5);}
export function startLiveEventTower(profile,key,superstarId,eligibleIds,rng=Math.random,now=new Date()){const entry=liveEventTowerState(profile,key,now);if(!entry)throw new Error("That Live Event has expired.");const {tower,state}=entry;if(state.cleared)throw new Error("This Live Event is already complete.");if(state.activeRun?.status==="active")return state.activeRun;if(!eligiblePlayer(profile,superstarId,now))throw new Error("Choose an unlocked Superstar for this Live Event.");const opponents=chooseOpponents(profile,tower,superstarId,eligibleIds,rng,now);if(opponents.length!==5)throw new Error("Not enough eligible opponents for this Live Event.");state.activeRun={towerKey:key,eventId:tower.event.id,superstarId,rewardSetId:tower.event.rewardSetId,opponents,stage:0,status:"active",startedAt:new Date(now).toISOString()};return state.activeRun;}
export function changeLiveEventTowerSuperstar(profile,key,id,now=new Date()){const e=liveEventTowerState(profile,key,now);if(!e)throw new Error("That Live Event has expired.");const run=e.state.activeRun;if(!run||run.status!=="active")throw new Error("No active Live Event run");if(e.state.cleared||Number(run.stage)!==0)throw new Error("Your Superstar is locked after Match 1 is complete.");if(!eligiblePlayer(profile,id,now))throw new Error("Choose an unlocked Superstar.");run.superstarId=id;return run;}
export function currentLiveEventTowerOpponent(profile,key,now=new Date()){const run=liveEventTowerState(profile,key,now)?.state?.activeRun;return !run||run.status!=="active"?null:run.opponents[run.stage]??null;}
export function currentLiveEventTowerStage(profile,key,now=new Date()){const e=liveEventTowerState(profile,key,now);return e?liveEventStage(e.tower.event,e.state.activeRun?.stage??0):null;}
export function dailyLiveEventSetStatus(profile,now=new Date()){const day=dateKey(localDayStart(now)),towers=activeLiveEventTowers(now,profile),store=ensureStore(profile),completed=towers.filter(t=>stateFor(profile,t).cleared).length,required=3,claimed=store.dailySetXpClaimedDays.includes(day);return {dayKey:day,completed,required,complete:towers.length===3&&completed===3,claimed,xpReward:25};}
export function awardDailyLiveEventSetCompletionXp(profile,now=new Date()){const s=dailyLiveEventSetStatus(profile,now);if(!s.complete||s.claimed)return {...s,awarded:0,seasonXp:null};const store=ensureStore(profile),seasonXp=awardSeasonXp(profile,25,"live-event-daily-set");store.dailySetXpClaimedDays.push(s.dayKey);return {...s,claimed:true,awarded:seasonXp.awarded,seasonXp};}
export function recordLiveEventTowerMatch(profile,key,result,now=new Date(),rng=Math.random){const e=liveEventTowerState(profile,key,now);if(!e)throw new Error("That Live Event has expired.");const {tower,state,aggregate}=e,run=state.activeRun;if(!run||run.status!=="active")throw new Error("No active Live Event run");if(result==="loss")return {status:"retry",run,tower,stage:liveEventStage(tower.event,run.stage)};if(result!=="win")throw new Error("Invalid Live Event result");run.stage++;state.bestStage=Math.max(state.bestStage??0,run.stage);if(run.stage>=5){run.status="cleared";state.cleared=true;state.completedAt=new Date(now).toISOString();aggregate.totalClears=(aggregate.totalClears??0)+1;if(!aggregate.completedKeys.includes(tower.key))aggregate.completedKeys.push(tower.key);profile.weeklyLiveEvents.totalClears=aggregate.totalClears;const rewardSetIds=grantRandomBoosters(profile,1,rng,now);run.rewardSetIds=rewardSetIds;const bonus=awardDailyLiveEventSetCompletionXp(profile,now);return {status:"cleared",run,tower,event:tower.event,packAwarded:true,packCount:rewardSetIds.length,rewardSetIds,dailySetXpAwarded:bonus.awarded??0,dailySetXpReward:bonus.seasonXp??null,dailySetStatus:bonus};}return {status:"advance",run,tower,stage:liveEventStage(tower.event,run.stage)};}

function primary(now=new Date(),profile=null){return activeLiveEventTowers(now,profile)[0];}
export function weeklyLiveEventState(profile,now=new Date()){const t=primary(now,profile),e=liveEventTowerState(profile,t.key,now);profile.weeklyLiveEvents.weekKey=dateKey(localDayStart(now));profile.weeklyLiveEvents.eventId=t.event.id;profile.weeklyLiveEvents.activeRun=e.state.activeRun;profile.weeklyLiveEvents.clearedThisWeek=!!e.state.cleared;profile.weeklyLiveEvents.bestStage=Math.max(profile.weeklyLiveEvents.bestStage??0,e.state.bestStage??0);return profile.weeklyLiveEvents;}
export function currentWeeklyLiveEvent(now=new Date()){return primary(now).event;}
export function startWeeklyLiveEvent(profile,id,eligible,rng=Math.random,now=new Date()){const t=primary(now,profile);return startLiveEventTower(profile,t.key,id,eligible,rng,now);}
export function currentWeeklyLiveEventOpponent(profile,now=new Date()){const t=primary(now,profile);return currentLiveEventTowerOpponent(profile,t.key,now);}
export function currentWeeklyLiveEventStage(profile,now=new Date()){const t=primary(now,profile);return currentLiveEventTowerStage(profile,t.key,now);}
export function recordWeeklyLiveEventMatch(profile,result,now=new Date(),rng=Math.random){const t=primary(now,profile);return recordLiveEventTowerMatch(profile,t.key,result,now,rng);}
