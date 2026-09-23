// Premiere relaunch gameplay bridge.
// Reuses the already-audited production gameplay definition for the same move/action,
// but gives the relaunch card its canonical PREM identity. This preserves approved
// five-tier curves, requirements, counters and effects instead of inventing new stats.
const norm=s=>String(s??"").toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g," ").trim();
const aliases=Object.freeze({
  "gts":"go to sleep",
  "figure 8":"figure eight leglock",
  "roman's spear":"spear",
  "the punt":"punt kick",
  "stomp a mudhole":"stomp a mudhole",
  "air canada":"air canada",
  "flat of the foot":"flat of foot",
 "PREM212":{id:"PREM212",name:"SINGLE LEG CRAB",kind:"move",setId:"premiere",cost:4,damage:0,requirements:{technical:1},moveType:"submission",method:"technical",superstarId:null,rarity:1,rulesText:"Grounded opponent only. Submission. +3 persistent Leg damage per successful turn.",groundOpponent:false,groundedOnly:true,stun:0,selfDamage:0,submission:{bodyPart:"legs",pressure:3},effects:[],counterState:"leg-extended",submissionTarget:"legs",cardCode:"PREM212",source:"premiere"},
 "PREM211":{id:"PREM211",name:"SIDE WALK SLAM",kind:"move",setId:"premiere",cost:4,damage:7,requirements:{strength:2},moveType:"grapple",method:"strength",superstarId:null,rarity:1,rulesText:"Grounds opponent.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"torso-trapped",cardCode:"PREM211",source:"premiere"},
 "PREM208":{id:"PREM208",name:"SHOVE",kind:"move",setId:"premiere",cost:1,damage:1,requirements:{},moveType:"grapple",method:"strength",superstarId:null,rarity:1,rulesText:"",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"torso-trapped",cardCode:"PREM208",source:"premiere"},
 "PREM207":{id:"PREM207",name:"SHOULDER THRUSTS",kind:"move",setId:"premiere",cost:3,damage:5,requirements:{strength:1},moveType:"strike",method:"strength",superstarId:null,rarity:1,rulesText:"Standing opponent only.",standingOnly:true,groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"torso-trapped",cardCode:"PREM207",source:"premiere"},
 "PREM204":{id:"PREM204",name:"SHOTGUN DROPKICK",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{strike:2,agility:1},moveType:"strike",method:"strike",superstarId:null,rarity:2,rulesText:"Grounds opponent. Stun 1.",groundOpponent:true,groundedOnly:false,stun:1,selfDamage:0,effects:[],counterState:"leg-extended",cardCode:"PREM204",source:"premiere"},
 "PREM200":{id:"PREM200",name:"SENTON BOMB",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{agility:2},moveType:"aerial",method:"agility",superstarId:null,rarity:2,rulesText:"Grounded opponent only.",groundOpponent:true,groundedOnly:true,stun:0,selfDamage:0,effects:[],counterState:"diving-aerial",cardCode:"PREM200",source:"premiere"},
 "PREM198":{id:"PREM198",name:"SEATED DROPKICK",kind:"move",setId:"premiere",cost:3,damage:5,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:1,rulesText:"Grounded opponent only.",groundOpponent:false,groundedOnly:true,stun:0,selfDamage:0,effects:[],counterState:"leg-extended",cardCode:"PREM198",source:"premiere"},
 "PREM197":{id:"PREM197",name:"SCISSOR KICK",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{strike:2},moveType:"strike",method:"strike",superstarId:null,rarity:2,rulesText:"Standing opponent only. Grounds opponent.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"leg-extended",cardCode:"PREM197",source:"premiere"},
 "PREM192":{id:"PREM192",name:"ROPE-ASSISTED ARMBAR",kind:"move",setId:"premiere",cost:5,damage:0,requirements:{technical:2},moveType:"submission",method:"technical",superstarId:null,rarity:2,rulesText:"Standing opponent only. Submission. +4 persistent Arm damage per successful turn.",standingOnly:true,groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,submission:{bodyPart:"arms",pressure:4},effects:[],counterState:"arm-extended",submissionTarget:"arms",cardCode:"PREM192",source:"premiere"},
 "PREM191":{id:"PREM191",name:"ROARING ELBOW",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{strike:2},moveType:"strike",method:"strike",superstarId:null,rarity:2,rulesText:"Stun 1.",groundOpponent:false,groundedOnly:false,stun:1,selfDamage:0,effects:[],counterState:"arm-extended",cardCode:"PREM191",source:"premiere"},
 "PREM190":{id:"PREM190",name:"POISONRANA",kind:"move",setId:"premiere",cost:6,damage:9,requirements:{agility:2},moveType:"grapple",method:"agility",superstarId:null,rarity:2,rulesText:"Standing opponent only. Grounds opponent. Stun 1.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:1,selfDamage:0,effects:[],counterState:"body-elevated",cardCode:"PREM190",source:"premiere"},
 "PREM189":{id:"PREM189",name:"REMOVE THE TURNBUCKLE",kind:"move",setId:"premiere",cost:2,damage:0,requirements:{},moveType:"action",method:"technical",superstarId:null,rarity:2,rulesText:"Your next damaging Move gets +3 Damage.",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[{type:"bonusNextDamagingMove",amount:3}],cardCode:"PREM189",source:"premiere"},
 "PREM186":{id:"PREM186",name:"PULL OUT OF THE RING",kind:"move",setId:"premiere",cost:2,damage:0,requirements:{technical:1},moveType:"grapple",method:"technical",superstarId:null,rarity:1,rulesText:"Move the opponent outside the ring. Your next damaging Move gets +2 Damage.",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[{type:"bonusNextDamagingMove",amount:2}],counterState:"front-control",cardCode:"PREM186",source:"premiere"},
 "PREM185":{id:"PREM185",name:"PULL DOWN THE ROPES",kind:"move",setId:"premiere",cost:2,damage:2,requirements:{},moveType:"counter",method:"technical",superstarId:null,rarity:1,defensiveOnly:true,counters:["strike"],rulesText:"Counter a Strike Move. On success, your next damaging Move gets +2 Damage.",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[{type:"bonusNextDamagingMove",amount:2}],cardCode:"PREM185",source:"premiere"},
 "PREM182":{id:"PREM182",name:"PLANCHA",kind:"move",setId:"premiere",cost:6,damage:9,requirements:{agility:2},moveType:"aerial",method:"agility",superstarId:null,rarity:2,rulesText:"Standing opponent only. Grounds opponent. On Connect: your next damaging Move gets +2 Damage.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[{type:"bonusNextDamagingMove",amount:2}],counterState:"diving-aerial",cardCode:"PREM182",source:"premiere"},
 "PREM180":{id:"PREM180",name:"OVER THE BARRICADE",kind:"move",setId:"premiere",cost:5,damage:7,requirements:{strength:1},moveType:"grapple",method:"strength",superstarId:null,rarity:2,rulesText:"On Connect: your next damaging Move gets +2 Damage.",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[{type:"bonusNextDamagingMove",amount:2}],counterState:"front-control",cardCode:"PREM180",source:"premiere"},
 "PREM177":{id:"PREM177",name:"MOONSAULT",kind:"move",setId:"premiere",cost:6,damage:8,requirements:{agility:2},moveType:"aerial",method:"agility",superstarId:null,rarity:2,rulesText:"Grounded opponent only.",groundOpponent:true,groundedOnly:true,stun:0,selfDamage:0,effects:[],counterState:"diving-aerial",cardCode:"PREM177",source:"premiere"},
 "PREM178":{id:"PREM178",name:"MOONSAULT TO THE OUTSIDE",kind:"move",setId:"premiere",cost:7,damage:10,requirements:{agility:2},moveType:"aerial",method:"agility",superstarId:null,rarity:2,rulesText:"Standing opponent only. Grounds opponent.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"diving-aerial",cardCode:"PREM178",source:"premiere"},
 "PREM169":{id:"PREM169",name:"KNEELING SHOTGUN DROPKICK",kind:"move",setId:"premiere",cost:4,damage:7,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:2,rulesText:"Grounded opponent only.",groundOpponent:false,groundedOnly:true,stun:0,selfDamage:0,effects:[],counterState:"leg-extended",cardCode:"PREM169",source:"premiere"},
 "PREM167":{id:"PREM167",name:"KICK TO THE GUT",kind:"move",setId:"premiere",cost:3,damage:4,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:1,rulesText:"",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"leg-extended",cardCode:"PREM167",source:"premiere"},
 "PREM166":{id:"PREM166",name:"JUMPING DDT",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{technical:2},moveType:"grapple",method:"technical",superstarId:null,rarity:2,rulesText:"Grounds opponent.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"front-control",cardCode:"PREM166",source:"premiere"},
 "PREM165":{id:"PREM165",name:"INVERTED SUPLEX",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{strength:2},moveType:"grapple",method:"strength",superstarId:null,rarity:2,rulesText:"Grounds opponent.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"rear-control",cardCode:"PREM165",source:"premiere"},
 "PREM164":{id:"PREM164",name:"INTO THE RINGPOST",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{strength:1},moveType:"grapple",method:"strength",superstarId:null,rarity:2,rulesText:"On Connect: opponent loses 1 Adrenaline.",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[{type:"loseOpponentAdrenaline",amount:1}],counterState:"front-control",cardCode:"PREM164",source:"premiere"},
 "PREM160":{id:"PREM160",name:"GROUNDED PUNCHES",kind:"move",setId:"premiere",cost:3,damage:5,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:1,rulesText:"Grounded opponent only.",groundOpponent:false,groundedOnly:true,stun:0,selfDamage:0,effects:[],counterState:"arm-extended",cardCode:"PREM160",source:"premiere"},
 "PREM159":{id:"PREM159",name:"GROUNDED ELBOWS",kind:"move",setId:"premiere",cost:3,damage:5,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:1,rulesText:"Grounded opponent only.",groundOpponent:false,groundedOnly:true,stun:0,selfDamage:0,effects:[],counterState:"arm-extended",cardCode:"PREM159",source:"premiere"},
 "PREM156":{id:"PREM156",name:"FRONT FACEBUSTER",kind:"move",setId:"premiere",cost:4,damage:6,requirements:{technical:1},moveType:"grapple",method:"technical",superstarId:null,rarity:1,rulesText:"Standing opponent only. Grounds opponent.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"front-control",cardCode:"PREM156",source:"premiere"},
 "PREM154":{id:"PREM154",name:"FOREARM STRIKE",kind:"move",setId:"premiere",cost:2,damage:4,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:1,rulesText:"",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"arm-extended",cardCode:"PREM154",source:"premiere"},
 "PREM153":{id:"PREM153",name:"FLYING FOREARM",kind:"move",setId:"premiere",cost:4,damage:7,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:2,rulesText:"Running Aerial. Grounds opponent.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"running-aerial",cardCode:"PREM153",source:"premiere"},
 "PREM152":{id:"PREM152",name:"FLAT OF THE FOOT",kind:"move",setId:"premiere",cost:1,damage:3,requirements:{},moveType:"strike",method:"strike",superstarId:null,rarity:1,rulesText:"May only Counter a Leg Extended Move.",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterStates:["leg-extended"],cardCode:"PREM152",source:"premiere"},
 "PREM149":{id:"PREM149",name:"FEET ON THE ROPES",kind:"move",setId:"premiere",cost:2,damage:0,requirements:{},moveType:"action",method:"technical",superstarId:null,rarity:2,rulesText:"Immediately Pin your opponent. +1/+2/+3/+4/+5 Pin Chance by Base/Emerald/Sapphire/Ruby/Amethyst printing.",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[{type:"pin",pinChanceBonus:1}],printingStats:{base:{pinChanceBonus:1},emerald:{pinChanceBonus:2},sapphire:{pinChanceBonus:3},ruby:{pinChanceBonus:4},amethyst:{pinChanceBonus:5}},cardCode:"PREM149",source:"premiere"},
 "PREM147":{id:"PREM147",name:"FACE GRIP",kind:"move",setId:"premiere",cost:2,damage:0,requirements:{technical:1},moveType:"submission",method:"technical",superstarId:null,rarity:1,rulesText:"Standing opponent only. Submission. +2 persistent Head damage per successful turn.",standingOnly:true,groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,submission:{bodyPart:"head",pressure:2},effects:[],counterState:"front-control",submissionTarget:"neck-head",cardCode:"PREM147",source:"premiere"},
 "PREM145":{id:"PREM145",name:"ENZIGURI",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{strike:2},moveType:"strike",method:"strike",superstarId:null,rarity:2,rulesText:"",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"leg-extended",cardCode:"PREM145",source:"premiere"},
 "PREM144":{id:"PREM144",name:"ELECTRIC CHAIR DROP",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{strength:2},moveType:"grapple",method:"strength",superstarId:null,rarity:2,rulesText:"",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"front-control",cardCode:"PREM144",source:"premiere"},
 "PREM141":{id:"PREM141",name:"DROP-DOWN UPPERCUT",kind:"move",setId:"premiere",cost:3,damage:5,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:2,rulesText:"",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"arm-extended",cardCode:"PREM141",source:"premiere"},
 "PREM138":{id:"PREM138",name:"DOUBLE CLOTHESLINE",kind:"move",setId:"premiere",cost:3,damage:5,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:1,rulesText:"Both Superstars take 5 damage and are grounded. May only Counter Clothesline-family Moves.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:5,effects:[],countersMoveFamily:"clothesline",cardCode:"PREM138",source:"premiere"},
 "PREM137":{id:"PREM137",name:"DIVING SHOTGUN DROPKICK",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{agility:2},moveType:"aerial",method:"agility",superstarId:null,rarity:2,rulesText:"Standing opponent only. Ground opponent.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"diving-aerial",cardCode:"PREM137",source:"premiere"},
 "PREM136":{id:"PREM136",name:"DIVING KNEE",kind:"move",setId:"premiere",cost:5,damage:7,requirements:{agility:1,strike:1},moveType:"aerial",method:"strike",superstarId:null,rarity:1,rulesText:"Standing opponent only. Ground opponent.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"diving-aerial",cardCode:"PREM136",source:"premiere"},
 "PREM135":{id:"PREM135",name:"DIVING FOREARM SMASH",kind:"move",setId:"premiere",cost:4,damage:6,requirements:{agility:1,strike:1},moveType:"aerial",method:"strike",superstarId:null,rarity:1,rulesText:"Standing opponent only. Ground opponent.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"diving-aerial",cardCode:"PREM135",source:"premiere"},
 "PREM134":{id:"PREM134",name:"DIVING DOUBLE AXE HANDLE",kind:"move",setId:"premiere",cost:4,damage:6,requirements:{agility:1},moveType:"aerial",method:"agility",superstarId:null,rarity:1,rulesText:"Standing opponent only. Ground opponent.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"diving-aerial",cardCode:"PREM134",source:"premiere"},
 "PREM133":{id:"PREM133",name:"DIVING CROSS BODY",kind:"move",setId:"premiere",cost:4,damage:5,requirements:{agility:1},moveType:"aerial",method:"agility",superstarId:null,rarity:1,rulesText:"Standing opponent only. Ground opponent.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"diving-aerial",cardCode:"PREM133",source:"premiere"},
 "PREM132":{id:"PREM132",name:"DIVING CLOTHESLINE",kind:"move",setId:"premiere",cost:4,damage:6,requirements:{agility:1},moveType:"aerial",method:"agility",superstarId:null,rarity:1,rulesText:"Standing opponent only. Ground opponent.",standingOnly:true,groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"diving-aerial",cardCode:"PREM132",source:"premiere"},
 "PREM127":{id:"PREM127",name:"CHOKESLAM",kind:"move",setId:"premiere",cost:5,damage:9,requirements:{strength:2},moveType:"grapple",method:"strength",superstarId:null,rarity:2,rulesText:"Ground opponent.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"body-elevated",cardCode:"PREM127",source:"premiere"},
 "PREM122":{id:"PREM122",name:"BOOTS IN THE CORNER",kind:"move",setId:"premiere",cost:3,damage:5,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:1,rulesText:"",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"leg-extended",cardCode:"PREM122",source:"premiere"},
 "PREM121":{id:"PREM121",name:"BODYSLAM",kind:"move",setId:"premiere",cost:3,damage:5,requirements:{strength:1},moveType:"grapple",method:"strength",superstarId:null,rarity:1,rulesText:"Ground opponent.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"body-elevated",cardCode:"PREM121",source:"premiere"},
 "PREM119":{id:"PREM119",name:"BELT SHOT",kind:"move",setId:"premiere",cost:4,damage:7,requirements:{},moveType:"strike",method:"strike",superstarId:null,rarity:2,rulesText:"On Connect: opponent loses 1 Adrenaline.",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[{type:"loseOpponentAdrenaline",amount:1}],counterState:"arm-extended",cardCode:"PREM119",source:"premiere"},
 "PREM117":{id:"PREM117",name:"BACK KICK",kind:"move",setId:"premiere",cost:3,damage:5,requirements:{strike:1},moveType:"strike",method:"strike",superstarId:null,rarity:1,rulesText:"",groundOpponent:false,groundedOnly:false,stun:0,selfDamage:0,effects:[],counterState:"leg-extended",cardCode:"PREM117",source:"premiere"},
 "PREM97":{id:"PREM97",name:"ACKNOWLEDGE ME",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"roman-reigns",maxCopies:1,rulesText:"Roman Reigns-exclusive Action. Gain +1 Adrenaline. Your next Roman Trademark this Control sequence cannot be Countered.",effect:{type:"premiereRomanAcknowledge",adrenaline:1,protectTrademark:true},cardCode:"PREM97",source:"premiere"},
 "PREM98":{id:"PREM98",name:"FINISH THE STORY",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"cody-rhodes",maxCopies:1,rulesText:"Cody Rhodes-exclusive Action. Draw 2 pages. Your next Cody Trademark this Control sequence costs 2 less.",effect:{type:"premiereCodyFinishStory",draw:2,discountNextTrademark:2},cardCode:"PREM98",source:"premiere"},
 "PREM99":{id:"PREM99",name:"BEST IN THE WORLD",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"cm-punk",maxCopies:1,rulesText:"CM Punk-exclusive Action. Draw 1 page and gain +1 Adrenaline. Your next Technical Move this Control sequence costs 2 less.",effect:{type:"premierePunkBestInWorld",draw:1,adrenaline:1,discountNextMethod:{method:"technical",amount:2}},cardCode:"PREM99",source:"premiere"},
 "PREM100":{id:"PREM100",name:"THE ARCHITECT",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"seth-rollins",maxCopies:1,rulesText:"Seth Rollins-exclusive Action. Draw 2 pages. The next Move you play this Control sequence costs 2 less.",effect:{type:"premiereSethArchitect",draw:2,discountNextMove:2},cardCode:"PREM100",source:"premiere"},
 "PREM101":{id:"PREM101",name:"THE VIPER",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"randy-orton",maxCopies:1,rulesText:"Randy Orton-exclusive Action. Search/draw RKO. It costs 3 less this Control sequence.",effect:{type:"search",name:"RKO",discount:3},cardCode:"PREM101",source:"premiere"},
 "PREM102":{id:"PREM102",name:"UNDERDOG FROM THE UNDERGROUND",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"sami-zayn",maxCopies:1,rulesText:"Sami Zayn-exclusive Action. Draw 2 pages. If Sami has less HP than his opponent, gain +1 Adrenaline.",effect:{type:"premiereSamiUnderdog",draw:2,adrenalineIfBehind:1},cardCode:"PREM102",source:"premiere"},
 "PREM103":{id:"PREM103",name:"OPEN A CAN OF WHOOP ASS",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"stone-cold-steve-austin",maxCopies:1,rulesText:"Stone Cold Steve Austin-exclusive Action. Your next Strike Move this Control sequence gets +3 Damage and cannot be Countered.",effect:{type:"premiereAustinWhoopAss",method:"strike",damage:3,uncounterable:true},cardCode:"PREM103",source:"premiere"},
 "PREM104":{id:"PREM104",name:"YOU CAN'T SEE ME",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"john-cena",maxCopies:1,rulesText:"John Cena-exclusive Action. Search/draw Five Knuckle Shuffle. It costs 2 less this Control sequence. Gain +1 Adrenaline.",effect:{type:"premiereCenaCantSeeMe",name:"Five Knuckle Shuffle",discount:2,adrenaline:1},cardCode:"PREM104",source:"premiere"},
 "PREM105":{id:"PREM105",name:"MAMI KNOWS BEST",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"rhea-ripley",maxCopies:1,rulesText:"Rhea Ripley-exclusive Action. Draw 1 page and gain +1 Adrenaline. Your next Strength Move this Control sequence costs 2 less.",effect:{type:"premiereRheaMami",draw:1,adrenaline:1,discountNextMethod:{method:"strength",amount:2}},cardCode:"PREM105",source:"premiere"},
 "PREM106":{id:"PREM106",name:"LIV & DOM",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"liv-morgan",maxCopies:1,rulesText:"Liv Morgan-exclusive Action. Draw 2 pages, then ditch 1. Gain +1 Adrenaline.",effect:{type:"premiereLivAndDom",draw:2,discard:1,adrenaline:1},cardCode:"PREM106",source:"premiere"},
 "PREM107":{id:"PREM107",name:"BIG TIME BECKS",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"becky-lynch",maxCopies:1,rulesText:"Becky Lynch-exclusive Action. Your next Trademark this Control sequence costs 2 less and gets +2 Damage.",effect:{type:"premiereBeckyBigTime",discountNextTrademark:2,damageNextTrademark:2},cardCode:"PREM107",source:"premiere"},
 "PREM108":{id:"PREM108",name:"WOOO",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"charlotte-flair",maxCopies:1,rulesText:"Charlotte Flair-exclusive Action. Gain +1 Adrenaline. Your next Technical Move this Control sequence gets +2 Damage.",effect:{type:"premiereCharlotteWooo",adrenaline:1,method:"technical",damage:2},cardCode:"PREM108",source:"premiere"},
 "PREM109":{id:"PREM109",name:"THE CENTER OF THE UNIVERSE",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"tiffany-stratton",maxCopies:1,rulesText:"Tiffany Stratton-exclusive Action. Draw 1 page. Your next Aerial Move this Control sequence costs 2 less and gets +2 Damage.",effect:{type:"premiereTiffanyCenter",draw:1,moveType:"aerial",discount:2,damage:2},cardCode:"PREM109",source:"premiere"},
 "PREM110":{id:"PREM110",name:"POINT TO THE SKY",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"iyo-sky",maxCopies:1,rulesText:"IYO SKY-exclusive Action. Search/draw an Aerial Move. That Move costs 2 less this Control sequence.",effect:{type:"premiereIyoSky",searchMoveType:"aerial",discount:2},cardCode:"PREM110",source:"premiere"},
 "PREM111":{id:"PREM111",name:"LITTLE MISS BLISS",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"alexa-bliss",maxCopies:1,rulesText:"Alexa Bliss-exclusive Action. Stun the opponent for 1. Your next Move this Control sequence costs 1 less.",effect:{type:"premiereAlexaBliss",stunOpponent:1,discountNextMove:1},cardCode:"PREM111",source:"premiere"},
 "PREM112":{id:"PREM112",name:"CANADA'S GREATEST EXPORT",kind:"action",setId:"premiere",cost:0,rarity:3,superstarId:"trish-stratus",maxCopies:1,rulesText:"Trish Stratus-exclusive Action. Draw 1 page and gain +1 Adrenaline. Your next Trademark this Control sequence costs 2 less.",effect:{type:"premiereTrishCanada",draw:1,adrenaline:1,discountNextTrademark:2},cardCode:"PREM112",source:"premiere"}
});

const ENTRANCES=[
 ["PREM17","I AM GREATNESS","roman-reigns","entrance-roman-reigns"],
 ["PREM18","KINGDOM","cody-rhodes","entrance-cody-rhodes"],
 ["PREM19","CULT OF PERSONALITY","cm-punk","entrance-cm-punk"],
 ["PREM20","BURN IT DOWN","seth-rollins","entrance-seth-rollins"],
 ["PREM21","I HEAR VOICES","randy-orton","entrance-randy-orton"],
 ["PREM22","WORLDS APART","sami-zayn","entrance-sami-zayn"],
 ["PREM23","AUSTIN 3:16","stone-cold-steve-austin","entrance-stone-cold-steve-austin"],
 ["PREM24","THE TIME IS NOW","john-cena","entrance-john-cena"],
 ["PREM25","THIS IS MY BRUTALITY","rhea-ripley","entrance-rhea-ripley"],
 ["PREM26","WATCH ME LIV","liv-morgan","entrance-liv-morgan"],
 ["PREM27","THE MAN","becky-lynch","entrance-becky-lynch"],
 ["PREM28","ALL HAIL THE QUEEN","charlotte-flair","entrance-charlotte-flair"],
 ["PREM29","IT'S TIFFY TIME","tiffany-stratton","entrance-tiffany-stratton"],
 ["PREM30","TOKYO SHOCK","iyo-sky","entrance-iyo-sky"],
 ["PREM31","THE GODDESS","alexa-bliss","entrance-alexa-bliss"],
 ["PREM32","IT'S TIME TO ROCK AND ROLL","trish-stratus","entrance-trish-stratus"]
];

const SPECIFIC=[
["PREM33","ROMAN'S SPEAR","roman-reigns"],["PREM34","CROSS RHODES","cody-rhodes"],["PREM35","GTS","cm-punk"],["PREM36","CURB STOMP","seth-rollins"],["PREM37","RKO","randy-orton"],["PREM38","HELLUVA KICK","sami-zayn"],["PREM39","STONE COLD STUNNER","stone-cold-steve-austin"],["PREM40","ATTITUDE ADJUSTMENT","john-cena"],["PREM41","RIPTIDE","rhea-ripley"],["PREM42","OBLIVION","liv-morgan"],["PREM43","DIS-ARM-HER","becky-lynch"],["PREM44","FIGURE EIGHT","charlotte-flair"],["PREM45","PRETTIEST MOONSAULT EVER","tiffany-stratton"],["PREM46","OVER THE MOONSAULT","iyo-sky"],["PREM47","SISTER ABIGAIL","alexa-bliss"],["PREM48","STRATUSFACTION","trish-stratus"],
["PREM49","SUPERMAN PUNCH","roman-reigns"],["PREM50","GUILLOTINE","roman-reigns"],["PREM51","DRIVE-BY","roman-reigns"],["PREM52","CODY CUTTER","cody-rhodes"],["PREM53","DISASTER KICK","cody-rhodes"],["PREM54","BIONIC ELBOW","cody-rhodes"],["PREM55","ANACONDA VISE","cm-punk"],["PREM56","RUNNING HIGH KNEE","cm-punk"],["PREM57","DIVING ELBOW DROP","cm-punk"],["PREM58","PEDIGREE","seth-rollins"],["PREM59","PHOENIX SPLASH","seth-rollins"],["PREM60","FALCON ARROW","seth-rollins"],["PREM61","THE PUNT","randy-orton"],["PREM62","DRAPING DDT","randy-orton"],["PREM63","SCOOP POWERSLAM","randy-orton"],["PREM64","BLUE THUNDER BOMB","sami-zayn"],["PREM65","EXPLODER SUPLEX","sami-zayn"],["PREM66","YAKUZA KICK","sami-zayn"],["PREM67","LOU THESZ PRESS","stone-cold-steve-austin"],["PREM68","STOMP A MUDHOLE","stone-cold-steve-austin"],["PREM69","POINTED ELBOW DROP","stone-cold-steve-austin"],["PREM70","FIVE KNUCKLE SHUFFLE","john-cena"],["PREM71","STF","john-cena"],["PREM72","DIVING SHOULDER TACKLE","john-cena"],["PREM73","PRISM TRAP","rhea-ripley"],["PREM74","RAZOR'S EDGE","rhea-ripley"],["PREM75","MISSILE DROPKICK","rhea-ripley"],["PREM76","JERSEY CODEBREAKER","liv-morgan"],["PREM77","COMPLETE SHOT","liv-morgan"],["PREM78","BACKSTABBER","liv-morgan"],["PREM79","THE MAN SLAM","becky-lynch"],["PREM80","BEXPLODER","becky-lynch"],["PREM81","DIVING LEG DROP","becky-lynch"],["PREM82","NATURAL SELECTION","charlotte-flair"],["PREM83","CHARLOTTE'S MOONSAULT","charlotte-flair"],["PREM84","FLAIR CHOP","charlotte-flair"],["PREM85","ROLLING FIREMAN'S CARRY SLAM","tiffany-stratton"],["PREM86","HANDSPRING BACK ELBOW","tiffany-stratton"],["PREM87","CARTWHEEL ALABAMA SLAM","tiffany-stratton"],["PREM88","SPANISH FLY","iyo-sky"],["PREM89","METEORA","iyo-sky"],["PREM90","ASAI MOONSAULT","iyo-sky"],["PREM91","TWISTED BLISS","alexa-bliss"],["PREM92","SNAP DDT","alexa-bliss"],["PREM93","INSULT TO INJURY","alexa-bliss"],["PREM94","STRATUSPHERE","trish-stratus"],["PREM95","CHICK KICK","trish-stratus"],["PREM96","AIR-CANADA","trish-stratus"]
];
const ACTIONS=[
["PREM97","ACKNOWLEDGE ME","roman-reigns"],["PREM98","FINISH THE STORY","cody-rhodes"],["PREM99","BEST IN THE WORLD","cm-punk"],["PREM100","THE ARCHITECT","seth-rollins"],["PREM101","THE VIPER","randy-orton"],["PREM102","UNDERDOG FROM THE UNDERGROUND","sami-zayn"],["PREM103","OPEN A CAN OF WHOOP ASS","stone-cold-steve-austin"],["PREM104","YOU CAN'T SEE ME","john-cena"],["PREM105","MAMI KNOWS BEST","rhea-ripley"],["PREM106","LIV & DOM","liv-morgan"],["PREM107","BIG TIME BECKS","becky-lynch"],["PREM108","WOOO","charlotte-flair"],["PREM109","THE CENTER OF THE UNIVERSE","tiffany-stratton"],["PREM110","POINT TO THE SKY","iyo-sky"],["PREM111","LITTLE MISS BLISS","alexa-bliss"],["PREM112","CANADA'S GREATEST EXPORT","trish-stratus"]
];
const SHARED=`PREM113 ATOMIC DROP
PREM114 BACK BODY DROP
PREM115 BACKBREAKER
PREM116 BACK ELBOW
PREM117 BACK KICK
PREM118 BACK SUPLEX
PREM119 BELT SHOT
PREM120 BIG BOOT
PREM121 BODYSLAM
PREM122 BOOTS IN THE CORNER
PREM123 BOSTON CRAB
PREM124 BULLDOG
PREM125 CANNONBALL
PREM126 CHOKE ON THE ROPES
PREM127 CHOKESLAM
PREM128 CHOP
PREM129 CLOTHESLINE
PREM130 CLOTHESLINE OVER THE TOP ROPE
PREM131 DDT
PREM132 DIVING CLOTHESLINE
PREM133 DIVING CROSS BODY
PREM134 DIVING DOUBLE AXE HANDLE
PREM135 DIVING FOREARM SMASH
PREM136 DIVING KNEE
PREM137 DIVING SHOTGUN DROPKICK
PREM138 DOUBLE CLOTHESLINE
PREM139 DOUBLE FOOT STOMP
PREM140 DOUBLE UNDERHOOK FACEBUSTER
PREM141 DROP-DOWN UPPERCUT
PREM142 DUCK
PREM143 ELBOW
PREM144 ELECTRIC CHAIR DROP
PREM145 ENZIGURI
PREM146 EUROPEAN UPPERCUT
PREM147 FACE GRIP
PREM148 FALLAWAY SLAM
PREM149 FEET ON THE ROPES
PREM150 FIREMAN'S CARRY
PREM151 FLAPJACK
PREM152 FLAT OF THE FOOT
PREM153 FLYING FOREARM
PREM154 FOREARM STRIKE
PREM155 FROG SPLASH
PREM156 FRONT FACEBUSTER
PREM157 FRONT KICK
PREM158 GERMAN SUPLEX
PREM159 GROUNDED ELBOWS
PREM160 GROUNDED PUNCHES
PREM161 HEADBUTT
PREM162 HIP TOSS
PREM163 HURRICANRANA
PREM164 INTO THE RINGPOST
PREM165 INVERTED SUPLEX
PREM166 JUMPING DDT
PREM167 KICK TO THE GUT
PREM168 KNEE DROP
PREM169 KNEELING SHOTGUN DROPKICK
PREM170 KNEES UP
PREM171 LARIAT
PREM172 LEAPFROG
PREM173 LEAPING CLOTHESLINE
PREM174 LEG KICK
PREM175 LEG LARIAT
PREM176 LOW BLOW
PREM177 MOONSAULT
PREM178 MOONSAULT TO THE OUTSIDE
PREM179 NECKBREAKER
PREM180 OVER THE BARRICADE
PREM181 PILEDRIVER
PREM182 PLANCHA
PREM183 POWERBOMB
PREM184 POWERSLAM
PREM185 PULL DOWN THE ROPES
PREM186 PULL OUT OF THE RING
PREM187 PUNCH
PREM188 PUNCHES IN THE CORNER
PREM189 REMOVE THE TURNBUCKLE
PREM190 POISONRANA
PREM191 ROARING ELBOW
PREM192 ROPE-ASSISTED ARMBAR
PREM193 RUNNING CLOTHESLINE
PREM194 RUNNING KNEE STRIKE
PREM195 RUSSIAN LEG SWEEP
PREM196 SAMOAN DROP
PREM197 SCISSOR KICK
PREM198 SEATED DROPKICK
PREM199 SENTON
PREM200 SENTON BOMB
PREM201 SENTON SPLASH
PREM202 SHINING WIZARD
PREM203 SHORT-ARM CLOTHESLINE
PREM204 SHOTGUN DROPKICK
PREM205 SHOULDER BLOCK
PREM206 SHOULDER TACKLE
PREM207 SHOULDER THRUSTS
PREM208 SHOVE
PREM209 SIDE HEADLOCK
PREM210 SIDE KICK
PREM211 SIDE WALK SLAM
PREM212 SINGLE LEG CRAB
PREM213 SLAP
PREM214 SLEEPER HOLD
PREM215 SLING BLADE
PREM216 SLINGSHOT CROSSBODY
PREM217 SNAP POWERSLAM
PREM218 SPEAR
PREM219 SPINEBUSTER
PREM220 SPINNING BACK KICK
PREM221 STALLING SUPLEX
PREM222 STANDING BOSTON CRAB
PREM223 STANDING MOONSAULT
PREM224 STANDING SWITCH
PREM225 STEEL CHAIR TO THE BACK
PREM226 STOMP
PREM227 SUICIDE DIVE
PREM228 SUNSET FLIP
PREM229 SUPERPLEX
PREM230 SUPLEX
PREM231 SURFBOARD STRETCH
PREM232 SWINGING NECKBREAKER
PREM233 THROAT THRUST
PREM234 THROW INTO THE RING STEPS
PREM235 TILT-A-WHIRL BACKBREAKER
PREM236 TOP ROPE POISONRANA
PREM237 TOP-ROPE SPLASH
PREM238 TORNADO DDT
PREM239 VERTICAL SUPLEX
PREM240 WRISTLOCK`.split("\n").map(line=>{const [id,...p]=line.split(" ");return [id,p.join(" ")];});

const UNIVERSAL_ACTIONS=[
 {id:"PREM242",name:"ARGUE WITH THE REFEREE",kind:"action",rulesText:"Reaction — after an opponent's Move connects, reduce that Move's damage. Base −2 / Emerald −3 / Sapphire −4 / Ruby −5 / Amethyst −6.",effects:[{type:"reduceIncomingMoveDamage",printingAmounts:{base:2,emerald:3,sapphire:4,ruby:5,amethyst:6}}]},
 {id:"PREM243",name:"CAUGHT 'EM",kind:"counter",defensiveOnly:true,cost:0,damage:0,counterState:"diving-aerial",counterStates:["diving-aerial"],rulesText:"Counter a Diving Move.",effects:[]},
 {id:"PREM244",name:"C'MON",kind:"action",rulesText:"Your next Move this turn deals bonus damage. Base +1 / Emerald +2 / Sapphire +3 / Ruby +4 / Amethyst +5.",effects:[{type:"bonusNextMoveDamage",printingAmounts:{base:1,emerald:2,sapphire:3,ruby:4,amethyst:5}}]},
 {id:"PREM245",name:"DISTRACT THE REFEREE",kind:"action",rulesText:"Your next illegal Move this turn cannot be countered.",effects:[{type:"nextIllegalMoveUncounterable"}]},
 {id:"PREM246",name:"FACE TO FACE",kind:"action",rulesText:"Both Superstars' next Move deals bonus damage. Base +1 / Emerald +2 / Sapphire +3 / Ruby +4 / Amethyst +5.",effects:[{type:"bonusBothNextMoveDamage",printingAmounts:{base:1,emerald:2,sapphire:3,ruby:4,amethyst:5}}]},
 {id:"PREM247",name:"FIGHT FOREVER",kind:"action",oneUse:true,rulesText:"Once per match, when a Move would reduce your Superstar to 0 HP, survive instead. Base 1 / Emerald 2 / Sapphire 3 / Ruby 4 / Amethyst 5 HP.",effects:[{type:"surviveLethalMove",printingAmounts:{base:1,emerald:2,sapphire:3,ruby:4,amethyst:5}}]},
 {id:"PREM248",name:"GENERAL MANAGER ADAM PEARCE",kind:"action",rulesText:"Reset both players' Momentum to 0.",effects:[{type:"resetBothMomentum"}]},
 {id:"PREM249",name:"GENERAL MANAGER NICK ALDIS",kind:"action",oneUse:true,rulesText:"Once per match, when the match would end, restart it. Both Superstars return with the printed restart HP and 0 Momentum.",effects:[{type:"restartMatch",restartHpByPrinting:{base:1,emerald:2,sapphire:3,ruby:4,amethyst:5},resetBothMomentum:true}]},
 {id:"PREM250",name:"GOT ALL OF IT",kind:"action",rulesText:"Reaction — after your Move connects, that Move deals bonus damage. Base +1 / Emerald +2 / Sapphire +3 / Ruby +4 / Amethyst +5.",effects:[{type:"bonusConnectedMoveDamage",printingAmounts:{base:1,emerald:2,sapphire:3,ruby:4,amethyst:5}}]},
 {id:"PREM251",name:"LET'S GO",kind:"action",rulesText:"Gain Adrenaline. Base +1 / Emerald +2 / Sapphire +3 / Ruby +4 / Amethyst +5.",effects:[{type:"gainAdrenaline",printingAmounts:{base:1,emerald:2,sapphire:3,ruby:4,amethyst:5}}]},
 {id:"PREM252",name:"RESPECT",kind:"action",rulesText:"Both Superstars recover HP. Base +2 / Emerald +3 / Sapphire +4 / Ruby +5 / Amethyst +6.",effects:[{type:"healBoth",printingAmounts:{base:2,emerald:3,sapphire:4,ruby:5,amethyst:6}}]},
 {id:"PREM253",name:"STRETCH IT OUT",kind:"action",rulesText:"Recover permanent Submission damage. Base 2 / Emerald 3 / Sapphire 4 / Ruby 5 / Amethyst 6.",effects:[{type:"recoverPermanentSubmissionDamage",printingAmounts:{base:2,emerald:3,sapphire:4,ruby:5,amethyst:6}}]},
 {id:"PREM254",name:"THAT WAS THREE",kind:"action",rulesText:"After your opponent kicks out of your pin attempt, gain Adrenaline. Base +1 / Emerald +2 / Sapphire +3 / Ruby +4 / Amethyst +5.",effects:[{type:"gainAdrenalineAfterOpponentKickout",printingAmounts:{base:1,emerald:2,sapphire:3,ruby:4,amethyst:5}}]}
].map(card=>({setId:"premiere",cardCode:card.id,source:"premiere",superstarId:null,cost:card.cost??0,damage:card.damage??0,requirements:{},printingStats:{base:{cost:card.cost??0,damage:card.damage??0},emerald:{cost:card.cost??0,damage:card.damage??0},sapphire:{cost:card.cost??0,damage:card.damage??0},ruby:{cost:card.cost??0,damage:card.damage??0},amethyst:{cost:card.cost??0,damage:card.damage??0}},...card}));

export function buildPremiereGameplayCards(cards=[]){
 const source=[...cards], byName=new Map();
 for(const card of source){const k=norm(card.name); if(!byName.has(k))byName.set(k,[]);byName.get(k).push(card);}
 const find=(name,sid=null)=>{const key=norm(aliases[norm(name)]??name);const pool=byName.get(key)??[];return pool.find(c=>sid&&c.superstarId===sid)||pool.find(c=>!c.superstarId)||pool[0]||null;};
 const out=[];
 const sourceById=new Map(source.map(card=>[card.id,card]));
 for(const [id,name,sid,sourceId] of ENTRANCES){const base=sourceById.get(sourceId);if(!base)continue;out.push({...structuredClone(base),id,name,kind:"entrance",setId:"premiere",superstarId:sid,cardCode:id,source:"premiere",fixedPrintingTier:"amethyst"});}
 const genericEntrance=sourceById.get("entrance-amazing"); if(genericEntrance)out.push({...structuredClone(genericEntrance),id:"PREM241",name:"AMAZING ENTRANCE",kind:"entrance",setId:"premiere",superstarId:null,cardCode:"PREM241",source:"premiere",fixedPrintingTier:"amethyst",boosterEligible:false});
 const exactLegacySourceIds=Object.freeze({"PREM33":"roman-reigns-spear","PREM35":"cm-punk-g-t-s","PREM44":"charlotte-flair-figure-eight-leglock","PREM56":"cm-punk-corner-running-knee","PREM58":"pedigree","PREM61":"randy-orton-punt-kick","PREM64":"sami-zayn-blue-thunder-bomb","PREM67":"stone-cold-steve-austin-lou-thesz-press","PREM68":"stone-cold-steve-austin-mudhole-stomps","PREM69":"stone-cold-steve-austin-pointed-elbow-drop","PREM70":"john-cena-five-knuckle-shuffle","PREM71":"john-cena-stf","PREM73":"rhea-ripley-prism-trap","PREM74":"razor-s-edge","PREM76":"liv-morgan-jersey-codebreaker","PREM81":"becky-lynch-diving-leg-drop","PREM82":"charlotte-flair-natural-selection","PREM83":"charlotte-flair-moonsault","PREM84":"flair-chop","PREM86":"tiffany-stratton-handspring-back-elbow","PREM88":"spanish-fly","PREM90":"asai-moonsault","PREM94":"trish-stratus-stratusphere","PREM95":"trish-stratus-chick-kick","PREM96":"trish-stratus-air-canada"});
 const authoredSpecific=Object.freeze({
 "PREM63":{id:"PREM63",name:"SCOOP POWERSLAM",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{technical:2},moveType:"grapple",method:"technical",superstarId:"randy-orton",rarity:3,rulesText:"Randy Orton-exclusive Trademark. Grounds opponent. On Connect: draw 1 page and gain +1 Adrenaline.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,effects:[{type:"drawSelf",amount:1},{type:"gainAdrenaline",amount:1}],counterState:"torso-trapped",cardCode:"PREM63",source:"premiere"},
 "PREM65":{id:"PREM65",name:"EXPLODER SUPLEX",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{strength:2},moveType:"grapple",method:"strength",superstarId:"sami-zayn",rarity:3,rulesText:"Sami Zayn-exclusive Trademark. Grounds opponent. On Connect: draw 1 page.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,effects:[{type:"drawSelf",amount:1}],counterState:"torso-trapped",cardCode:"PREM65",source:"premiere"},
 "PREM66":{id:"PREM66",name:"YAKUZA KICK",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{strike:2},moveType:"strike",method:"strike",superstarId:"sami-zayn",rarity:3,rulesText:"Sami Zayn-exclusive Trademark. Standing opponent only. Grounds opponent. On Connect: opponent loses 1 Adrenaline.",groundOpponent:true,groundedOnly:false,standingOnly:true,stun:0,selfDamage:0,trademark:true,effects:[{type:"loseOpponentAdrenaline",amount:1}],counterState:"leg-extended",cardCode:"PREM66",source:"premiere"},
 "PREM72":{id:"PREM72",name:"DIVING SHOULDER TACKLE",kind:"move",setId:"premiere",cost:5,damage:8,requirements:{strength:1,agility:1},moveType:"aerial",method:"strength",superstarId:"john-cena",rarity:3,rulesText:"John Cena-exclusive Trademark. Standing opponent only. Grounds opponent. On Connect: search/draw Five Knuckle Shuffle; it costs 1 less this Control sequence.",groundOpponent:true,groundedOnly:false,standingOnly:true,stun:0,selfDamage:0,trademark:true,effects:[{type:"search",name:"Five Knuckle Shuffle",discount:1}],counterState:"diving-aerial",cardCode:"PREM72",source:"premiere"},
 "PREM75":{id:"PREM75",name:"MISSILE DROPKICK",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{agility:2},moveType:"aerial",method:"agility",superstarId:"rhea-ripley",rarity:3,rulesText:"Rhea Ripley-exclusive Trademark. Standing opponent only. Grounds opponent. On Connect: gain +1 Adrenaline.",groundOpponent:true,groundedOnly:false,standingOnly:true,stun:0,selfDamage:0,trademark:true,effects:[{type:"gainAdrenaline",amount:1}],counterState:"diving-aerial",cardCode:"PREM75",source:"premiere"},
 "PREM77":{id:"PREM77",name:"COMPLETE SHOT",kind:"move",setId:"premiere",cost:5,damage:9,requirements:{technical:2},moveType:"grapple",method:"technical",superstarId:"liv-morgan",rarity:3,rulesText:"Liv Morgan-exclusive Trademark. Flatliner-style takedown. Grounds opponent. On Connect: draw 1 page.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,effects:[{type:"drawSelf",amount:1}],counterState:"front-control",cardCode:"PREM77",source:"premiere"},
 "PREM78":{id:"PREM78",name:"BACKSTABBER",kind:"move",setId:"premiere",cost:6,damage:9,requirements:{agility:1,technical:1},moveType:"grapple",method:"agility",superstarId:"liv-morgan",rarity:3,rulesText:"Liv Morgan-exclusive Trademark. Grounds opponent. May Counter a Diving Aerial Move. When used as a successful Counter, +3 Damage.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,counters:["aerial"],counterBonusDamage:3,effects:[],counterState:"rear-control",counterStates:["diving-aerial"],cardCode:"PREM78",source:"premiere"},
 "PREM79":{id:"PREM79",name:"THE MAN SLAM",kind:"move",setId:"premiere",cost:7,damage:12,requirements:{strength:2},moveType:"grapple",method:"strength",superstarId:"becky-lynch",rarity:3,rulesText:"Becky Lynch-exclusive Trademark. Grounds opponent.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,effects:[],counterState:"body-elevated",cardCode:"PREM79",source:"premiere"},
 "PREM80":{id:"PREM80",name:"BEXPLODER",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{strength:2},moveType:"grapple",method:"strength",superstarId:"becky-lynch",rarity:3,rulesText:"Becky Lynch-exclusive Trademark. Grounds opponent. On Connect: draw 1 page.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,effects:[{type:"drawSelf",amount:1}],counterState:"torso-trapped",cardCode:"PREM80",source:"premiere"},
 "PREM85":{id:"PREM85",name:"ROLLING FIREMAN\'S CARRY SLAM",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{strength:2},moveType:"grapple",method:"strength",superstarId:"tiffany-stratton",rarity:3,rulesText:"Tiffany Stratton-exclusive Trademark. Grounds opponent. On Connect: your next Aerial Move costs 2 less this Control sequence.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,effects:[{type:"discountNextMoveType",moveType:"aerial",amount:2}],counterState:"body-elevated",cardCode:"PREM85",source:"premiere"},
 "PREM87":{id:"PREM87",name:"CARTWHEEL ALABAMA SLAM",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{agility:1,technical:1},moveType:"grapple",method:"agility",superstarId:"tiffany-stratton",rarity:3,rulesText:"Tiffany Stratton-exclusive Trademark. Grounds opponent. On Connect: gain +1 Adrenaline.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,effects:[{type:"gainAdrenaline",amount:1}],counterState:"body-elevated",cardCode:"PREM87",source:"premiere"},
 "PREM89":{id:"PREM89",name:"METEORA",kind:"move",setId:"premiere",cost:5,damage:9,requirements:{strike:1,agility:1},moveType:"aerial",method:"agility",superstarId:"iyo-sky",rarity:3,rulesText:"IYO SKY-exclusive Trademark. Grounds opponent. On Connect: gain +1 Adrenaline.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,effects:[{type:"gainAdrenaline",amount:1}],counterState:"running-aerial",cardCode:"PREM89",source:"premiere"},
 "PREM91":{id:"PREM91",name:"TWISTED BLISS",kind:"move",setId:"premiere",cost:7,damage:12,requirements:{agility:2},moveType:"aerial",method:"agility",superstarId:"alexa-bliss",rarity:3,rulesText:"Alexa Bliss-exclusive Trademark. Grounded opponent only. If played immediately after Sister Abigail in the same Control sequence, +2 Damage.",groundOpponent:false,groundedOnly:true,stun:0,selfDamage:0,trademark:true,effects:[],bonusDamageAfterNamed:{name:"Sister Abigail",damage:2},counterState:"diving-aerial",cardCode:"PREM91",source:"premiere"},
 "PREM92":{id:"PREM92",name:"SNAP DDT",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{technical:2},moveType:"grapple",method:"technical",superstarId:"alexa-bliss",rarity:3,rulesText:"Alexa Bliss-exclusive Trademark. Grounds opponent. On Connect: your next Insult to Injury costs 2 less this Control sequence.",groundOpponent:true,groundedOnly:false,stun:0,selfDamage:0,trademark:true,effects:[{type:"discountNextByName",name:"Insult to Injury",amount:2}],counterState:"front-control",cardCode:"PREM92",source:"premiere"},
 "PREM93":{id:"PREM93",name:"INSULT TO INJURY",kind:"move",setId:"premiere",cost:6,damage:10,requirements:{agility:2},moveType:"aerial",method:"agility",superstarId:"alexa-bliss",rarity:3,rulesText:"Alexa Bliss-exclusive Trademark. Double-stomp combination. Grounded opponent only. If played immediately after Snap DDT in the same Control sequence, +2 Damage.",groundOpponent:false,groundedOnly:true,stun:0,selfDamage:0,trademark:true,effects:[],bonusDamageAfterNamed:{name:"Snap DDT",damage:2},counterState:"diving-aerial",cardCode:"PREM93",source:"premiere"}
});
 for(const [id,name,sid] of SPECIFIC){if(authoredSpecific[id]){out.push(structuredClone(authoredSpecific[id]));continue;}let base=exactLegacySourceIds[id]?sourceById.get(exactLegacySourceIds[id]):find(name,sid);if(!base&&id==="PREM58")base=find("Seth Rollins Pedigree",sid)||find("Pedigree");if(!base)continue;const cloned={...structuredClone(base),id,name,setId:"premiere",superstarId:sid,cardCode:id,source:"premiere"};if(id==="PREM71"){cloned.rarity=3;cloned.trademark=true;delete cloned.finisher;cloned.rulesText=cloned.rulesText.replace("John Cena-exclusive Finisher.","John Cena-exclusive Trademark.");}if(id==="PREM74"){cloned.rarity=3;cloned.trademark=true;cloned.rulesText="Rhea Ripley-exclusive Trademark.";cloned.groundOpponent=true;}out.push(cloned);}
 for(const [id,name,sid] of ACTIONS){const base=source.find(card=>card.kind==="action"&&card.superstarId===sid)||source.find(card=>card.id===`special-${sid}`);if(!base)continue;out.push({...structuredClone(base),id,name,kind:"action",setId:"premiere",superstarId:sid,cardCode:id,source:"premiere"});}
 for(const [id,name] of SHARED){const base=find(name);if(!base)continue;out.push({...structuredClone(base),id,name,setId:"premiere",superstarId:null,cardCode:id,source:"premiere"});}
 out.push(...UNIVERSAL_ACTIONS);
 return out;
}
