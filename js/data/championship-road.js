import { superstars } from "./superstars.js?v=1.1.132";
import { grantBooster } from "./boosters.js?v=1.1.132";
import { isPlayerVisibleSuperstar } from "./release.js?v=1.1.132";

export const CHAMPIONSHIP_ROAD_LENGTH = 72;
export const LEGACY_CHAMPIONSHIP_ROAD_LENGTH = 40;
export const CHAMPIONSHIP_SET_ID = "nxt-series-1";
export const WORLD_CHAMPIONS = ["cm-punk", "roman-reigns"];
export const CHAMPIONSHIP_DIFFICULTY_ORDER = ["easy", "normal", "hard", "hardcore"];
export const CHAMPIONSHIP_DIFFICULTIES = Object.freeze({
  easy: { id: "easy", label: "Easy", hpModifier: -5, description: "Opponents start with 5 less HP." },
  normal: { id: "normal", label: "Normal", hpModifier: 0, description: "Opponents use their normal HP." },
  hard: { id: "hard", label: "Hard", hpModifier: 5, description: "Opponents start with 5 extra HP." },
  hardcore: { id: "hardcore", label: "Hardcore", hpModifier: 10, description: "Opponents start with 10 extra HP." }
});

export const CHAMPIONSHIP_ROAD_SECTIONS = Object.freeze([
  { id:"nxt-a", label:"NXT · Part I", start:1, end:4, accent:"gold", setId:"nxt-series-1" },
  { id:"smackdown-a", label:"SmackDown · Part I", start:5, end:8, accent:"blue", setId:"smackdown-series-1" },
  { id:"raw-a", label:"RAW · Part I", start:9, end:12, accent:"red", setId:"raw-series-1" },
  { id:"nxt-b", label:"NXT · Part II", start:13, end:16, accent:"gold", setId:"nxt-series-1" },
  { id:"smackdown-b", label:"SmackDown · Part II", start:17, end:20, accent:"blue", setId:"smackdown-series-1" },
  { id:"raw-b", label:"RAW · Part II", start:21, end:24, accent:"red", setId:"raw-series-1" },
  { id:"evolution-a", label:"Evolution · Part I", start:25, end:28, accent:"violet", setId:"evolution-series-1" },
  { id:"summerslam-a", label:"SummerSlam · Part I", start:29, end:32, accent:"blue", setId:"summerslam-series-1" },
  { id:"evolution-b", label:"Evolution · Part II", start:33, end:36, accent:"violet", setId:"evolution-series-1" },
  { id:"summerslam-b", label:"SummerSlam · Part II", start:37, end:40, accent:"blue", setId:"summerslam-series-1" },
  { id:"golden-era-a", label:"Golden Era · Part I", start:41, end:44, accent:"gold", setId:"golden-era-series-1" },
  { id:"new-generation-a", label:"New Generation · Part I", start:45, end:48, accent:"blue", setId:"new-generation-series-1" },
  { id:"attitude-era-a", label:"Attitude Era · Part I", start:49, end:52, accent:"red", setId:"attitude-era-series-1" },
  { id:"ruthless-aggression-a", label:"Ruthless Aggression · Part I", start:53, end:56, accent:"gold", setId:"ruthless-aggression-series-1" },
  { id:"golden-era-b", label:"Golden Era · Part II", start:57, end:60, accent:"gold", setId:"golden-era-series-1" },
  { id:"new-generation-b", label:"New Generation · Part II", start:61, end:64, accent:"blue", setId:"new-generation-series-1" },
  { id:"attitude-era-b", label:"Attitude Era · Part II", start:65, end:68, accent:"red", setId:"attitude-era-series-1" },
  { id:"ruthless-aggression-b", label:"Ruthless Aggression · Part II", start:69, end:72, accent:"gold", setId:"ruthless-aggression-series-1" }
]);

const ROAD_NAMES = Object.freeze([
  "Jaida Parker","Tatum Paxley","Lexis King","Tony D'Angelo",
  "Shinsuke Nakamura","Blake Monroe","Trick Williams","Chelsea Green",
  "Austin Theory","Sol Ruca","Chad Gable","Raquel Rodriguez",
  "Mason Rook","Zilla Fatu","Kelani Jordan","Kendall Grey",
  "Danhausen","Jacy Jayne","Damian Priest","Tiffany Stratton",
  "Montez Ford","Joe Hendry","Roxanne Perez","Logan Paul",
  "Bayley","Paige","Charlotte Flair","Becky Lynch",
  "Kevin Owens","Oba Femi","Gunther","Brock Lesnar",
  "Stephanie Vaquer","IYO SKY","Liv Morgan","Rhea Ripley",
  "Seth Rollins","Cody Rhodes","CM Punk","Roman Reigns",
  "Ted DiBiase","Jake Roberts","Mr. Perfect","Rowdy Roddy Piper",
  "Doink the Clown","British Bulldog","Owen Hart","Yokozuna",
  "Chris Jericho","Kurt Angle","Mankind","Kane",
  "Jeff Hardy","JBL","Rob Van Dam","Eddie Guerrero",
  "Randy Savage","Ultimate Warrior","Andre the Giant","Hulk Hogan",
  "Razor Ramon","Diesel","Shawn Michaels","Bret Hart",
  "Triple H","The Undertaker","The Rock","Stone Cold Steve Austin",
  "Edge","Batista","Randy Orton","John Cena"
]);

const ROAD_ID_FALLBACKS = Object.freeze({
  "Tony D'Angelo":"tony-dangelo","Raquel Rodriguez":"raquel-rodriguez","Kendall Grey":"kendall-grey",
  "Damian Priest":"damian-priest","Joe Hendry":"joe-hendry","IYO SKY":"iyo-sky","CM Punk":"cm-punk",
  "Ted DiBiase":"ted-dibiase","Mr. Perfect":"mr-perfect","Rowdy Roddy Piper":"rowdy-roddy-piper",
  "Doink the Clown":"doink-the-clown","British Bulldog":"british-bulldog","Rob Van Dam":"rob-van-dam",
  "Randy Savage":"randy-savage","Andre the Giant":"andre-the-giant","Stone Cold Steve Austin":"stone-cold-steve-austin",
  "The Rock":"the-rock-attitude"
});
const normalizeRoadName = value => String(value ?? "").toLowerCase().normalize("NFKD").replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"");
const resolveRoadSuperstarId = name => {
  const wanted = normalizeRoadName(name);
  const match = Object.values(superstars).find(star => normalizeRoadName(star?.name) === wanted);
  if (match?.id) return match.id;
  return ROAD_ID_FALLBACKS[name] ?? String(name).toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
};

export const CHAMPIONSHIP_ROAD_OPPONENTS = Object.freeze(ROAD_NAMES.map(resolveRoadSuperstarId));

export const CHAMPIONSHIP_BRANCHES = Object.freeze({
  season1: { id:"season1", label:"Championship Road", setId:CHAMPIONSHIP_SET_ID, finals:["randy-orton","john-cena"] }
});
export const CHAMPIONSHIP_STAGES = Object.freeze(CHAMPIONSHIP_ROAD_OPPONENTS.map((_,i)=>`Match ${i+1}`));

export function championshipRoadOpponentsForSuperstar(_superstarId) {
  // Mirror matches are intentional. The canonical order never changes for the selected Superstar.
  return [...CHAMPIONSHIP_ROAD_OPPONENTS];
}

function championshipRoadPlayerEligible(profile, superstarId, now=new Date()) {
  const star=Object.values(superstars).find(item=>item.id===superstarId)??null;
  return !!star && !!profile?.unlockedSuperstars?.includes(superstarId) && isPlayerVisibleSuperstar(star,profile,now);
}
function blankSuperstarRoad(){return{activeRun:null,clears:0,bestStage:0,clearsByDifficulty:{},bestStageByDifficulty:{},completedByDifficulty:{},unlockedDifficulties:["easy"],selectedDifficulty:"easy"};}
function normalizeRoad(road){
  road??=blankSuperstarRoad(); road.activeRun??=null; road.clears??=0; road.bestStage??=0; road.clearsByDifficulty??={}; road.bestStageByDifficulty??={}; road.completedByDifficulty??={}; road.unlockedDifficulties??=["easy"]; road.selectedDifficulty??="easy";
  if(road.activeRun){
    if(!Array.isArray(road.activeRun.opponents)){road.activeRun=null;}
    else if(road.activeRun.opponents.length!==CHAMPIONSHIP_ROAD_LENGTH){
      const previousLength=road.activeRun.opponents.length;
      const wasPreviousClear=road.activeRun.status==="cleared"&&Number(road.activeRun.stage??0)>=previousLength;
      road.activeRun.opponents=championshipRoadOpponentsForSuperstar(road.activeRun.superstarId);
      road.activeRun.stage=Math.max(0,Math.min(Number(road.activeRun.stage??0),CHAMPIONSHIP_ROAD_LENGTH));
      if(wasPreviousClear&&previousLength<CHAMPIONSHIP_ROAD_LENGTH)road.activeRun.status="active";
    } else if(road.activeRun.superstarId&&CHAMPIONSHIP_ROAD_OPPONENTS.includes(road.activeRun.superstarId)&&!road.activeRun.opponents.includes(road.activeRun.superstarId)){
      road.activeRun.opponents=[...CHAMPIONSHIP_ROAD_OPPONENTS];
    }
  }
  road.unlockedDifficulties=CHAMPIONSHIP_DIFFICULTY_ORDER.filter(id=>id==="easy"||road.unlockedDifficulties.includes(id));
  if(!road.unlockedDifficulties.includes("easy"))road.unlockedDifficulties.unshift("easy");
  return road;
}
function ensure(profile){
  profile.championshipRoad??={activeRun:null,clears:0,bestStage:0,championshipPackCredits:0,completedBy:[]};
  const state=profile.championshipRoad;
  state.clearsByDifficulty??={}; state.bestStageByDifficulty??={}; state.completedByDifficulty??={}; state.unlockedDifficulties??=["easy"]; state.selectedDifficulty??="easy"; state.championshipPackCreditsBySet??={}; state.championshipPackQueue??=[]; state.completedBy??=[]; state.roadsBySuperstar??={}; state.selectedSuperstarId??=null;
  if(!state.perSuperstarRoadsMigrated){
    if(state.activeRun&&Array.isArray(state.activeRun.opponents)&&state.activeRun.superstarId){
      const id=state.activeRun.superstarId,road=normalizeRoad(state.roadsBySuperstar[id]??blankSuperstarRoad());
      road.activeRun={...state.activeRun,opponents:[...state.activeRun.opponents]}; road.bestStage=Math.max(road.bestStage,Number(state.bestStage??state.activeRun.stage??0)); road.clearsByDifficulty={...(state.clearsByDifficulty??{})}; road.bestStageByDifficulty={...(state.bestStageByDifficulty??{})}; road.completedByDifficulty=Object.fromEntries(Object.entries(state.completedByDifficulty??{}).map(([key,value])=>[key,[...value]])); road.unlockedDifficulties=[...(state.unlockedDifficulties??["easy"])]; road.selectedDifficulty=state.selectedDifficulty??state.activeRun.difficultyId??"easy"; state.roadsBySuperstar[id]=road; state.selectedSuperstarId=id;
    }
    for(const id of state.completedBy??[]){const road=normalizeRoad(state.roadsBySuperstar[id]??blankSuperstarRoad()); road.clears=Math.max(road.clears,1); road.bestStage=Math.max(road.bestStage,CHAMPIONSHIP_ROAD_LENGTH); road.clearsByDifficulty.easy=Math.max(road.clearsByDifficulty.easy??0,1); road.bestStageByDifficulty.easy=Math.max(road.bestStageByDifficulty.easy??0,CHAMPIONSHIP_ROAD_LENGTH); road.completedByDifficulty.easy??=[]; if(!road.completedByDifficulty.easy.includes(id))road.completedByDifficulty.easy.push(id); if(!road.unlockedDifficulties.includes("normal"))road.unlockedDifficulties.push("normal"); state.roadsBySuperstar[id]=road;}
    state.perSuperstarRoadsMigrated=true;
  }
  for(const[id,road]of Object.entries(state.roadsBySuperstar))state.roadsBySuperstar[id]=normalizeRoad(road);
  return state;
}
function difficultyIndex(id){return CHAMPIONSHIP_DIFFICULTY_ORDER.indexOf(id);}
export function championshipRoadForSuperstar(profile,superstarId){const state=ensure(profile);if(!superstarId)return null;state.roadsBySuperstar[superstarId]=normalizeRoad(state.roadsBySuperstar[superstarId]??blankSuperstarRoad());return state.roadsBySuperstar[superstarId];}
export function selectChampionshipRoadSuperstar(profile,superstarId){const state=ensure(profile);if(!championshipRoadPlayerEligible(profile,superstarId))throw new Error("Choose an unlocked Superstar for Championship Road");state.selectedSuperstarId=superstarId;const road=championshipRoadForSuperstar(profile,superstarId);state.activeRun=road.activeRun;state.selectedDifficulty=road.selectedDifficulty;state.unlockedDifficulties=[...road.unlockedDifficulties];return road;}
export function championshipDifficultyUnlocked(profile,difficultyId,superstarId=null){const state=ensure(profile),idx=difficultyIndex(difficultyId);if(idx<=0)return difficultyId==="easy";const id=superstarId??state.selectedSuperstarId??state.activeRun?.superstarId,road=id?championshipRoadForSuperstar(profile,id):null,previous=CHAMPIONSHIP_DIFFICULTY_ORDER[idx-1];return(road?.clearsByDifficulty?.[previous]??0)>0;}
export function championshipRoadState(profile){const state=ensure(profile),id=state.selectedSuperstarId??state.activeRun?.superstarId??null;if(id){const road=championshipRoadForSuperstar(profile,id);for(const difficultyId of CHAMPIONSHIP_DIFFICULTY_ORDER)if(championshipDifficultyUnlocked(profile,difficultyId,id)&&!road.unlockedDifficulties.includes(difficultyId))road.unlockedDifficulties.push(difficultyId);state.activeRun=road.activeRun;state.selectedDifficulty=road.selectedDifficulty;state.unlockedDifficulties=[...road.unlockedDifficulties];}return state;}
export function championshipRoadDifficultyModifier(difficultyId="easy"){const difficulty=CHAMPIONSHIP_DIFFICULTIES[difficultyId]??CHAMPIONSHIP_DIFFICULTIES.easy,modifier={name:`Championship Road · ${difficulty.label}`,ruleText:difficulty.description};if(difficulty.hpModifier<0)modifier.startingHpLoss={p2:Math.abs(difficulty.hpModifier)};if(difficulty.hpModifier>0)modifier.startingHpBonus={p2:difficulty.hpModifier};return modifier;}
export function championshipRoadSectionForStage(stage=0){const match=Math.max(1,Math.min(CHAMPIONSHIP_ROAD_LENGTH,Number(stage)+1));return CHAMPIONSHIP_ROAD_SECTIONS.find(section=>match>=section.start&&match<=section.end)??CHAMPIONSHIP_ROAD_SECTIONS[0];}
export function startChampionshipRoad(profile,superstarId,_opponentIds=[],_rng=Math.random,difficultyId="easy"){const state=ensure(profile);if(!championshipRoadPlayerEligible(profile,superstarId))throw new Error("Choose an unlocked Superstar for Championship Road");if(!CHAMPIONSHIP_DIFFICULTIES[difficultyId])throw new Error("Unknown Championship Road difficulty");selectChampionshipRoadSuperstar(profile,superstarId);if(!championshipDifficultyUnlocked(profile,difficultyId,superstarId))throw new Error(`Complete ${CHAMPIONSHIP_DIFFICULTIES[CHAMPIONSHIP_DIFFICULTY_ORDER[difficultyIndex(difficultyId)-1]]?.label??"the previous difficulty"} first`);const road=championshipRoadForSuperstar(profile,superstarId);road.selectedDifficulty=difficultyId;road.activeRun={superstarId,difficultyId,branchId:"season1",setId:CHAMPIONSHIP_SET_ID,opponents:championshipRoadOpponentsForSuperstar(superstarId),stage:0,status:"active",startedAt:new Date().toISOString()};state.selectedDifficulty=difficultyId;state.activeRun=road.activeRun;return road.activeRun;}
export function currentChampionshipOpponent(profile,superstarId=null){const state=ensure(profile),id=superstarId??state.selectedSuperstarId??state.activeRun?.superstarId,run=id?championshipRoadForSuperstar(profile,id)?.activeRun:null;return!run||run.status!=="active"?null:run.opponents[run.stage]??null;}
export function recordChampionshipMatch(profile,result,matchSuperstarId=null){const state=ensure(profile),superstarId=matchSuperstarId??state.selectedSuperstarId??state.activeRun?.superstarId,road=superstarId?championshipRoadForSuperstar(profile,superstarId):null,run=road?.activeRun;if(!run||run.status!=="active")throw new Error("No active Championship Road run");if(result==="loss")return{status:"retry",run};if(result!=="win")throw new Error("Invalid Championship Road result");run.stage+=1;road.bestStage=Math.max(road.bestStage??0,run.stage);road.bestStageByDifficulty[run.difficultyId]=Math.max(road.bestStageByDifficulty[run.difficultyId]??0,run.stage);state.bestStage=Math.max(state.bestStage??0,run.stage);state.bestStageByDifficulty[run.difficultyId]=Math.max(state.bestStageByDifficulty[run.difficultyId]??0,run.stage);const completedSection=run.stage%4===0?CHAMPIONSHIP_ROAD_SECTIONS.find(section=>section.end===run.stage)??null:null,packSetId=completedSection?.setId??null;if(packSetId)grantBooster(profile,1,packSetId);if(run.stage>=run.opponents.length){run.status="cleared";road.clears=(road.clears??0)+1;road.clearsByDifficulty[run.difficultyId]=(road.clearsByDifficulty[run.difficultyId]??0)+1;road.completedByDifficulty[run.difficultyId]??=[];if(!road.completedByDifficulty[run.difficultyId].includes(run.superstarId))road.completedByDifficulty[run.difficultyId].push(run.superstarId);state.clears=(state.clears??0)+1;state.clearsByDifficulty[run.difficultyId]=(state.clearsByDifficulty[run.difficultyId]??0)+1;state.completedByDifficulty[run.difficultyId]??=[];if(!state.completedByDifficulty[run.difficultyId].includes(run.superstarId))state.completedByDifficulty[run.difficultyId].push(run.superstarId);const firstWithSuperstar=!state.completedBy.includes(run.superstarId);if(firstWithSuperstar)state.completedBy.push(run.superstarId);const idx=difficultyIndex(run.difficultyId),next=CHAMPIONSHIP_DIFFICULTY_ORDER[idx+1];if(next&&!road.unlockedDifficulties.includes(next))road.unlockedDifficulties.push(next);if(state.selectedSuperstarId===superstarId)state.unlockedDifficulties=[...road.unlockedDifficulties];return{status:"cleared",run,packAwarded:!!packSetId,packSetId,firstWithSuperstar,unlockedDifficulty:next??null,sectionCleared:completedSection};}if(state.selectedSuperstarId===superstarId)state.activeRun=run;return{status:"advance",run,sectionCleared:completedSection,packAwarded:!!packSetId,packSetId};}
export function resetChampionshipRoad(profile,superstarId=null){const state=ensure(profile),id=superstarId??state.selectedSuperstarId??state.activeRun?.superstarId;if(id)championshipRoadForSuperstar(profile,id).activeRun=null;state.activeRun=null;return state;}
