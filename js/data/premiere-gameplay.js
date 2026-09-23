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
  "flat of the foot":"flat of foot"
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
["PREM33","ROMAN'S SPEAR","roman-reigns"],["PREM34","CROSS RHODES","cody-rhodes"],["PREM35","GTS","cm-punk"],["PREM36","CURB STOMP","seth-rollins"],["PREM37","RKO","randy-orton"],["PREM38","HELLUVA KICK","sami-zayn"],["PREM39","STONE COLD STUNNER","stone-cold-steve-austin"],["PREM40","ATTITUDE ADJUSTMENT","john-cena"],["PREM41","RIPTIDE","rhea-ripley"],["PREM42","OBLIVION","liv-morgan"],["PREM43","DIS-ARM-HER","becky-lynch"],["PREM44","FIGURE 8","charlotte-flair"],["PREM45","PRETTIEST MOONSAULT EVER","tiffany-stratton"],["PREM46","OVER THE MOONSAULT","iyo-sky"],["PREM47","SISTER ABIGAIL","alexa-bliss"],["PREM48","STRATUSFACTION","trish-stratus"],
["PREM49","SUPERMAN PUNCH","roman-reigns"],["PREM50","GUILLOTINE","roman-reigns"],["PREM51","DRIVE-BY","roman-reigns"],["PREM52","CODY CUTTER","cody-rhodes"],["PREM53","DISASTER KICK","cody-rhodes"],["PREM54","BIONIC ELBOW","cody-rhodes"],["PREM55","ANACONDA VISE","cm-punk"],["PREM56","RUNNING HIGH KNEE","cm-punk"],["PREM57","DIVING ELBOW DROP","cm-punk"],["PREM58","PEDIGREE","seth-rollins"],["PREM59","PHOENIX SPLASH","seth-rollins"],["PREM60","FALCON ARROW","seth-rollins"],["PREM61","THE PUNT","randy-orton"],["PREM62","DRAPING DDT","randy-orton"],["PREM63","SCOOP POWERSLAM","randy-orton"],["PREM64","BLUE THUNDER BOMB","sami-zayn"],["PREM65","EXPLODER SUPLEX","sami-zayn"],["PREM66","YAKUZA KICK","sami-zayn"],["PREM67","LOU THESZ PRESS","stone-cold-steve-austin"],["PREM68","STOMP A MUDHOLE","stone-cold-steve-austin"],["PREM69","POINTED ELBOW DROP","stone-cold-steve-austin"],["PREM70","FIVE KNUCKLE SHUFFLE","john-cena"],["PREM71","STF","john-cena"],["PREM72","DIVING SHOULDER TACKLE","john-cena"],["PREM73","PRISM TRAP","rhea-ripley"],["PREM74","RAZOR'S EDGE","rhea-ripley"],["PREM75","MISSILE DROPKICK","rhea-ripley"],["PREM76","JERSEY CODEBREAKER","liv-morgan"],["PREM77","COMPLETE SHOT","liv-morgan"],["PREM78","BACKSTABBER","liv-morgan"],["PREM79","THE MAN SLAM","becky-lynch"],["PREM80","BEXPLODER","becky-lynch"],["PREM81","DIVING LEG DROP","becky-lynch"],["PREM82","NATURAL SELECTION","charlotte-flair"],["PREM83","CHARLOTTE'S MOONSAULT","charlotte-flair"],["PREM84","FLAIR CHOP","charlotte-flair"],["PREM85","ROLLING FIREMAN'S CARRY SLAM","tiffany-stratton"],["PREM86","HANDSPRING CORNER SPLASH","tiffany-stratton"],["PREM87","CARTWHEEL ALABAMA SLAM","tiffany-stratton"],["PREM88","SPANISH FLY","iyo-sky"],["PREM89","METEORA","iyo-sky"],["PREM90","ASAI MOONSAULT","iyo-sky"],["PREM91","TWISTED BLISS","alexa-bliss"],["PREM92","SNAP DDT","alexa-bliss"],["PREM93","INSULT TO INJURY","alexa-bliss"],["PREM94","STRATUSPHERE","trish-stratus"],["PREM95","CHICK KICK","trish-stratus"],["PREM96","AIR-CANADA","trish-stratus"]
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
 const exactLegacySourceIds=Object.freeze({"PREM33":"roman-reigns-spear","PREM35":"cm-punk-g-t-s","PREM44":"charlotte-flair-figure-eight-leglock","PREM56":"cm-punk-corner-running-knee"});
 for(const [id,name,sid] of SPECIFIC){let base=exactLegacySourceIds[id]?sourceById.get(exactLegacySourceIds[id]):find(name,sid);if(!base&&id==="PREM58")base=find("Seth Rollins Pedigree",sid)||find("Pedigree");if(!base)continue;out.push({...structuredClone(base),id,name,setId:"premiere",superstarId:sid,cardCode:id,source:"premiere"});}
 for(const [id,name,sid] of ACTIONS){const base=source.find(card=>card.kind==="action"&&card.superstarId===sid)||source.find(card=>card.id===`special-${sid}`);if(!base)continue;out.push({...structuredClone(base),id,name,kind:"action",setId:"premiere",superstarId:sid,cardCode:id,source:"premiere"});}
 for(const [id,name] of SHARED){const base=find(name);if(!base)continue;out.push({...structuredClone(base),id,name,setId:"premiere",superstarId:null,cardCode:id,source:"premiere"});}
 out.push(...UNIVERSAL_ACTIONS);
 return out;
}
