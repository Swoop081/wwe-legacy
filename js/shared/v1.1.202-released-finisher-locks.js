// Canonical implementation of the completed released-roster Finisher audit.
// This is implementation only: classifications/ceilings were already approved.
const damagingCurves={15:[11,12,13,14,15],16:[12,13,14,15,16],17:[13,14,15,16,17]};
const lock=(card,max,{submission=false,name=null,allowed=null}={})=>{
  card.finisher=true; delete card.trademark;
  card.requirements={}; card.method=null; card.rarity=4;
  if(name) card.name=name;
  if(allowed){card.superstarId=null;card.allowedSuperstarIds=[...allowed];}
  if(submission){card.damage=0;card.moveType="submission";card.finisherCeiling=max;card.finisherDamageCurve=[0,0,0,0,0];}
  else {card.damage=max;card.finisherCeiling=max;card.finisherDamageCurve=[...damagingCurves[max]];card.effects=[];}
};
const specs=[
 ["summerslam-series-1","roman-reigns","Spear",17],["summerslam-series-1","cm-punk","GTS",16],["summerslam-series-1","brock-lesnar","F-5",17],["summerslam-series-1","the-undertaker","Tombstone Piledriver",17],["summerslam-series-1","liv-morgan","ObLIVion",16],["summerslam-series-1","john-cena","Attitude Adjustment",17],["summerslam-series-1","randy-orton","RKO",16],["summerslam-series-1","cody-rhodes","Cross Rhodes",16],
 ["raw-series-1","joe-hendry","Standing Ovation",16],["raw-series-1","roxanne-perez","Pop Rox",16],["raw-series-1","austin-theory","A-Town Down",16],["raw-series-1","montez-ford","From the Heavens",16],["raw-series-1","sol-ruca","Sol Snatcher",16],["raw-series-1","logan-paul","Paulverizer",16],["raw-series-1","chad-gable","Gable’s Ankle Lock",16,true],["raw-series-1","raquel-rodriguez","Tejana Bomb",16],
 ["smackdown-series-1","danhausen","Triple D",16],["smackdown-series-1","tiffany-stratton","Prettiest Moonsault Ever",16],["smackdown-series-1","chelsea-green","Un-Pretty-Her",16],["smackdown-series-1","damian-priest","South of Heaven",16],["smackdown-series-1","shinsuke-nakamura","Kinshasa",16],["smackdown-series-1","blake-monroe","Top-Rope Double Stomp",16],["smackdown-series-1","trick-williams","Trick Shot",16],["smackdown-series-1","jacy-jayne","Rolling Encore",16],
 ["evolution-series-1","iyo-sky","Over the Moonsault",16],["evolution-series-1","bayley","Rose Plant",16],["evolution-series-1","paige","Paige Turner",15],["evolution-series-1","stephanie-vaquer","Vaquer Inferno",16],["evolution-series-1","charlotte-flair","Natural Selection",15],["evolution-series-1","rhea-ripley","Riptide",16],["evolution-series-1","liv-morgan","ObLIVion",16],["evolution-series-1","becky-lynch","Manhandle Slam",15],
 ["golden-era-series-1","hulk-hogan","Atomic Leg Drop",16],["golden-era-series-1","andre-the-giant","Sitdown Splash",17],["golden-era-series-1","randy-savage","Flying Elbow Drop",16],["golden-era-series-1","ultimate-warrior","Warrior Splash",17],["golden-era-series-1","rod-dy-piper","Piper’s Sleeper",16,true],["golden-era-series-1","ted-dibiase","Million Dollar Dream",16,true],["golden-era-series-1","jake-roberts","Jake’s DDT",16],["golden-era-series-1","mr-perfect","Perfect-Plex",16],
 ["new-generation-series-1","shawn-michaels","Sweet Chin Music",16],["new-generation-series-1","diesel","Jackknife",17],["new-generation-series-1","razor-ramon","Razor’s Edge",16],["new-generation-series-1","doink-the-clown","Whoopee Cushion",15],["new-generation-series-1","yokozuna","Banzai",17],["new-generation-series-1","british-bulldog","Running Powerslam",16],
 ["attitude-era-series-1","stone-cold-steve-austin","Stone Cold Stunner",16],["attitude-era-series-1","mankind","Double-Arm DDT",15],["attitude-era-series-1","triple-h","The Pedigree",16],["attitude-era-series-1","chris-jericho","Walls of Jericho",16,true],["attitude-era-series-1","kurt-angle","Angle Slam",15],["attitude-era-series-1","the-rock-attitude","Rock Bottom",16],
 ["ruthless-aggression-series-1","john-cena","Attitude Adjustment",17],["ruthless-aggression-series-1","randy-orton","RKO",16],["ruthless-aggression-series-1","batista","Batista Bomb",16],["ruthless-aggression-series-1","jbl","Clothesline from Hell",17],["ruthless-aggression-series-1","eddie-guerrero","Frog Splash",16],["ruthless-aggression-series-1","edge","Spear",16],["ruthless-aggression-series-1","jeff-hardy","Swanton",16],["ruthless-aggression-series-1","rob-van-dam","Five-Star Frog Splash",17]
];
const norm=s=>String(s??"").toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9]+/g," ").trim();
export function applyReleasedFinisherLocks(cards){
  for(const [setId,sid,name,max,submission=false] of specs){const card=cards.find(c=>c.setId===setId&&(c.superstarId===sid||c.allowedSuperstarIds?.includes(sid))&&norm(c.name)===norm(name));if(card)lock(card,max,{submission});}
  // Undertaker/Kane share one Tombstone identity in Attitude Era.
  const tomb=cards.find(c=>c.setId==="attitude-era-series-1"&&norm(c.name)==="tombstone piledriver");if(tomb)lock(tomb,17,{allowed:["the-undertaker","kane"]});
  // Kane's Chokeslam From Hell is his second Finisher; the old Trademark tutor/effect is retired.
  const kane=cards.find(c=>c.id==="kane-chokeslam-from-hell");if(kane){lock(kane,17);kane.rulesText="Kane-exclusive Finisher. No Method requirement.";}
  // Mankind's damaging Finisher sits at 15 alongside Mandible Claw submission.
  const mankind=cards.find(c=>c.id==="mankind-double-arm-ddt");if(mankind){lock(mankind,15);mankind.rulesText="Mankind-exclusive Finisher. No Method requirement.";}
  const claw=cards.find(c=>c.id==="mankind-mandible-claw");if(claw)lock(claw,16,{submission:true});
  // Attitude Jericho uses Walls only; Codebreaker is not an Attitude Finisher.
  for(const c of cards.filter(c=>c.setId==="attitude-era-series-1"&&c.superstarId==="chris-jericho"&&norm(c.name)==="codebreaker")){delete c.finisher;}
  const walls=cards.find(c=>c.setId==="attitude-era-series-1"&&c.superstarId==="chris-jericho"&&norm(c.name)==="walls of jericho");if(walls)lock(walls,16,{submission:true});
  const angle=cards.find(c=>c.id==="kurt-angle-slam");if(angle)lock(angle,15);
  // Bayley structural correction.
  const rose=cards.find(c=>c.setId==="evolution-series-1"&&c.superstarId==="bayley"&&norm(c.name)==="rose plant");if(rose)lock(rose,16);
  const b2b=cards.find(c=>c.setId==="evolution-series-1"&&c.superstarId==="bayley"&&norm(c.name)==="bayley to belly");if(b2b){delete b2b.finisher;b2b.trademark=true;}
  // Gable: Ankle Lock is the Finisher; Chaos Theory is not.
  for(const c of cards.filter(c=>c.superstarId==="chad-gable"&&norm(c.name)==="chaos theory")){delete c.finisher;}
  const gable=cards.find(c=>c.superstarId==="chad-gable"&&norm(c.name).includes("ankle lock"));if(gable)lock(gable,16,{submission:true,name:"Gable’s Ankle Lock"});
  // Piper/Jake approved display identities.
  const piper=cards.find(c=>c.setId==="golden-era-series-1"&&c.superstarId==="roddy-piper"&&norm(c.name).includes("sleeper"));if(piper)lock(piper,16,{submission:true,name:"Piper’s Sleeper"});
  const jake=cards.find(c=>c.setId==="golden-era-series-1"&&c.superstarId==="jake-roberts"&&norm(c.name).includes("ddt"));if(jake)lock(jake,16,{name:"Jake’s DDT"});
  // Owen's diving leg drop is an ordinary Move.
  for(const c of cards.filter(c=>c.superstarId==="owen-hart"&&norm(c.name)==="diving leg drop")){delete c.finisher;delete c.trademark;}
  // One shared Hart-family Sharpshooter identity. Remove Owen duplicate and authorize both Harts.
  const bret=cards.find(c=>c.id==="bret-hart-sharpshooter"),oi=cards.findIndex(c=>c.id==="owen-hart-sharpshooter");
  if(bret){lock(bret,16,{submission:true,name:"Sharpshooter",allowed:["bret-hart","owen-hart"]});bret.submissionTarget="legs";if(oi>=0)cards.splice(oi,1);}
  // Explicit current locks outside the eight launch sets.
  const seth=cards.find(c=>c.superstarId==="seth-rollins"&&norm(c.name)==="curb stomp");if(seth)lock(seth,16);
  const aj=cards.find(c=>c.superstarId==="aj-styles"&&norm(c.name)==="styles clash");if(aj)lock(aj,16);
  const trish=cards.find(c=>c.superstarId==="trish-stratus"&&norm(c.name)==="stratusfaction");if(trish)lock(trish,16);
  return cards;
}
