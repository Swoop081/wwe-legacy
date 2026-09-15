export const COUNTER_STATES = Object.freeze([
  'arm-extended',
  'leg-extended',
  'running-aerial',
  'diving-aerial',
  'body-elevated',
  'torso-trapped',
  'front-control',
  'rear-control',
]);

export const COUNTER_STATE_LABELS = Object.freeze({
  'arm-extended': 'Arm Extended',
  'leg-extended': 'Leg Extended',
  'running-aerial': 'Running Aerial',
  'diving-aerial': 'Diving Aerial',
  'body-elevated': 'Body Elevated',
  'torso-trapped': 'Torso Trapped',
  'front-control': 'Front Control',
  'rear-control': 'Rear Control',
});

export const SUBMISSION_TARGETS = Object.freeze(['arms','legs','back','neck-head']);
export const SUBMISSION_TARGET_LABELS = Object.freeze({
  arms: 'Arm',
  legs: 'Leg',
  back: 'Back',
  'neck-head': 'Neck / Head',
});

const textOf = card => `${card?.id ?? ''} ${card?.name ?? ''}`.toLowerCase();
const has = (text, words) => words.some(word => text.includes(word));

const explicitStateById = Object.freeze({
  'enzuigiri': 'leg-extended',
  'short-arm-clothesline': 'arm-extended',
  'big-boot': 'leg-extended',
  'hogans-big-boot': 'leg-extended',
  'running-big-boot': 'leg-extended',
  'roman-reigns-spear': 'torso-trapped',
  'bron-breakker-breakkers-spear': 'torso-trapped',
  'goldberg-spear': 'torso-trapped',
  'spear': 'torso-trapped',
  'shoulder-tackle': 'torso-trapped',
  'shoulder-block': 'torso-trapped',
  'stone-cold-steve-austin-lou-thesz-press': 'torso-trapped',
  'drop-toe-hold': 'front-control',
  'dragon-screw': 'front-control',
  'arm-drag': 'front-control',
  'hip-toss': 'front-control',
  'back-elbow': 'arm-extended',
  'hurricanrana': 'body-elevated',
  'chain-wrestling': 'front-control',
  'sidestep': 'running-aerial',
  'duck': 'arm-extended',
  'no-sell': 'torso-trapped',
  'leapfrog': 'running-aerial',
  'knees-up': 'diving-aerial',
  'dodge': 'arm-extended',
  'block': 'arm-extended',
  'up-and-over': 'running-aerial',
  'standing-switch': 'rear-control',
  'rollover-counter': 'front-control',
  'backflip-counter': 'diving-aerial',
  'catch-the-foot': 'leg-extended',
  'jawbreaker': 'front-control',
  '619': 'leg-extended',
  'ultimate-warrior-diving-shoulder-block': 'diving-aerial',
  'blockbuster': 'diving-aerial',
  'the-undertaker-old-school': 'diving-aerial',
  'cody-rhodes-cody-cutter': 'running-aerial',
  'sol-ruca-sol-snatcher': 'running-aerial',
  'middle-rope-stunner': 'diving-aerial',
  'becky-lynch-diamond-dust': 'diving-aerial',
  'liv-morgan-jersey-codebreaker': 'leg-extended',
  'iyo-sky-bullet-train-attack': 'leg-extended',
  'nia-jax-annihilator': 'diving-aerial',
  'standing-moonsault': 'diving-aerial',
  'standing-shooting-star-press': 'diving-aerial',
  'forearm-smash': 'arm-extended',
  'running-forearm': 'arm-extended',
  'dropkick-to-the-back': 'leg-extended',
  'elbow-to-back-of-head': 'arm-extended',
  'reverse-elbow': 'arm-extended',
  'steel-chair-to-back': 'arm-extended',
  'cannonball': 'running-aerial',
  'senton': 'diving-aerial',
});

export function counterStateForCard(card){
  const id = String(card?.id ?? '').toLowerCase();
  if(explicitStateById[id]) return explicitStateById[id];
  const text = textOf(card);
  if(has(text,['springboard','running aerial','cannonball'])) return 'running-aerial';
  if(has(text,['diving','moonsault','shooting star','frog splash','senton','top rope'])) return 'diving-aerial';
  if(has(text,['kick','boot','dropkick','knee'])) return 'leg-extended';
  if(has(text,['clothesline','forearm','elbow','punch'])) return 'arm-extended';
  if(has(text,['suplex','slam','powerbomb','piledriver'])) return 'body-elevated';
  return null;
}
