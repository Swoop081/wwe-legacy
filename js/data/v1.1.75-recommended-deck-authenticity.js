// v1.1.75 — recommended deck authenticity additions.
// Adds only moves that were genuinely missing from the canonical library.
export const V1175_AUTHENTICITY_CARDS = [
  {
    id:"jade-cargill-reverse-alabama-slam", name:"Reverse Alabama Slam", kind:"move",
    setId:"survivor-series-series-1", superstarId:"jade-cargill", rarity:3,
    cost:6, damage:10, requirements:{strength:2}, moveType:"grapple", method:"strength",
    rulesText:"Jade Cargill Trademark. Grounds opponent. +1 persistent Back damage on Connect.",
    trademark:true, groundOpponent:true, groundedOnly:false, stun:0, selfDamage:0,
    bodyDamage:{back:1}, effects:[], counterState:"body-elevated"
  },
  {
    id:"jade-cargill-eye-of-the-storm", name:"Eye of the Storm", kind:"move",
    setId:"survivor-series-series-1", superstarId:"jade-cargill", rarity:3,
    cost:7, damage:11, requirements:{strength:2}, moveType:"grapple", method:"strength",
    rulesText:"Jade Cargill Trademark. Grounds opponent. If Pump Kick connected earlier this Control sequence, +1 Damage.",
    trademark:true, groundOpponent:true, groundedOnly:false, stun:0, selfDamage:0,
    bonusDamageAfterNamed:{name:"Pump Kick",damage:1}, effects:[], counterState:"body-elevated"
  },
  {
    id:"logan-paul-prime-splash", name:"Prime Splash", kind:"move",
    setId:"raw-series-1", superstarId:"logan-paul", rarity:3,
    cost:7, damage:11, requirements:{agility:2}, moveType:"aerial", method:"agility",
    rulesText:"Logan Paul Trademark. Grounded opponent only. If One Lucky Punch connected earlier this Control sequence, draw 1 page.",
    trademark:true, groundOpponent:true, groundedOnly:true, stun:0, selfDamage:0,
    effects:[{type:"drawSelf",amount:1,condition:"priorNamedConnect",name:"One Lucky Punch"}], counterState:"diving-aerial"
  }
];
