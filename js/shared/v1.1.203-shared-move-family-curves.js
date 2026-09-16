// v1.1.203 — shared ordinary Move family balance pass.
// Scope: shared IDs only. Finishers, Trademarks, Submissions and wrestler-specific IDs are excluded.
// Ordinary Moves are authored by actual impact. Every higher rarity is a strict gameplay upgrade through damage, cost, or both.

export const SHARED_MOVE_FAMILY_CURVES_V11203 = Object.freeze({
  suplex: Object.freeze({
    'snap-suplex': Object.freeze({base:{cost:5,damage:2},emerald:{cost:4,damage:2},sapphire:{cost:4,damage:3},ruby:{cost:3,damage:3},amethyst:{cost:3,damage:4}}),
    'back-suplex': Object.freeze({base:{cost:5,damage:2},emerald:{cost:5,damage:3},sapphire:{cost:4,damage:3},ruby:{cost:4,damage:4},amethyst:{cost:3,damage:4}}),
    'side-suplex': Object.freeze({base:{cost:5,damage:2},emerald:{cost:5,damage:3},sapphire:{cost:4,damage:3},ruby:{cost:4,damage:4},amethyst:{cost:3,damage:4}}),
    'belly-to-belly-suplex': Object.freeze({base:{cost:6,damage:3},emerald:{cost:5,damage:3},sapphire:{cost:5,damage:4},ruby:{cost:4,damage:4},amethyst:{cost:4,damage:5}}),
    'northern-lights-suplex': Object.freeze({base:{cost:6,damage:3},emerald:{cost:5,damage:3},sapphire:{cost:5,damage:4},ruby:{cost:4,damage:4},amethyst:{cost:4,damage:5}}),
    'butterfly-suplex': Object.freeze({base:{cost:6,damage:3},emerald:{cost:5,damage:3},sapphire:{cost:5,damage:4},ruby:{cost:4,damage:4},amethyst:{cost:4,damage:5}}),
    'reverse-suplex': Object.freeze({base:{cost:6,damage:3},emerald:{cost:5,damage:3},sapphire:{cost:5,damage:4},ruby:{cost:4,damage:4},amethyst:{cost:4,damage:5}}),
    'german-suplex': Object.freeze({base:{cost:6,damage:3},emerald:{cost:5,damage:3},sapphire:{cost:5,damage:4},ruby:{cost:4,damage:4},amethyst:{cost:4,damage:5}}),
    'fisherman-suplex': Object.freeze({base:{cost:7,damage:3},emerald:{cost:6,damage:3},sapphire:{cost:6,damage:4},ruby:{cost:5,damage:4},amethyst:{cost:5,damage:5}}),
    'overhead-belly-to-belly-suplex': Object.freeze({base:{cost:7,damage:3},emerald:{cost:6,damage:3},sapphire:{cost:6,damage:4},ruby:{cost:5,damage:4},amethyst:{cost:5,damage:5}}),
    'superplex': Object.freeze({base:{cost:9,damage:5},emerald:{cost:8,damage:6},sapphire:{cost:7,damage:7},ruby:{cost:7,damage:8},amethyst:{cost:6,damage:9}})
  }),
  batch4Impact: Object.freeze({
    'sidewalk-slam': Object.freeze({base:{cost:6,damage:3},emerald:{cost:5,damage:3},sapphire:{cost:5,damage:4},ruby:{cost:4,damage:4},amethyst:{cost:4,damage:5}}),
    'sling-blade': Object.freeze({base:{cost:6,damage:3},emerald:{cost:5,damage:3},sapphire:{cost:5,damage:4},ruby:{cost:4,damage:4},amethyst:{cost:4,damage:5}}),
    'knee-strike': Object.freeze({base:{cost:4,damage:2},emerald:{cost:3,damage:2},sapphire:{cost:3,damage:3},ruby:{cost:2,damage:3},amethyst:{cost:2,damage:4}}),
    'short-arm-clothesline': Object.freeze({base:{cost:5,damage:2},emerald:{cost:4,damage:2},sapphire:{cost:4,damage:3},ruby:{cost:3,damage:3},amethyst:{cost:3,damage:4}}),
    'standing-moonsault': Object.freeze({base:{cost:7,damage:4},emerald:{cost:6,damage:4},sapphire:{cost:6,damage:5},ruby:{cost:5,damage:5},amethyst:{cost:5,damage:6}}),
    'tope-con-hilo': Object.freeze({base:{cost:8,damage:4},emerald:{cost:7,damage:5},sapphire:{cost:6,damage:6},ruby:{cost:6,damage:7},amethyst:{cost:5,damage:8}}),
    '450-splash': Object.freeze({base:{cost:10,damage:6},emerald:{cost:9,damage:7},sapphire:{cost:8,damage:8},ruby:{cost:7,damage:9},amethyst:{cost:6,damage:10}}),
    'atomic-drop': Object.freeze({base:{cost:4,damage:2},emerald:{cost:3,damage:2},sapphire:{cost:3,damage:3},ruby:{cost:2,damage:3},amethyst:{cost:2,damage:4}}),
    'backstabber': Object.freeze({base:{cost:8,damage:4},emerald:{cost:7,damage:4},sapphire:{cost:7,damage:5},ruby:{cost:6,damage:6},amethyst:{cost:5,damage:7}}),
    'chop': Object.freeze({base:{cost:3,damage:1},emerald:{cost:2,damage:1},sapphire:{cost:2,damage:2},ruby:{cost:1,damage:2},amethyst:{cost:1,damage:3}}),
    'fallaway-slam': Object.freeze({base:{cost:7,damage:3},emerald:{cost:6,damage:3},sapphire:{cost:6,damage:4},ruby:{cost:5,damage:4},amethyst:{cost:5,damage:5}}),
    'firemans-carry': Object.freeze({base:{cost:4,damage:1},emerald:{cost:3,damage:1},sapphire:{cost:3,damage:2},ruby:{cost:2,damage:2},amethyst:{cost:2,damage:3}}),
    'frog-splash': Object.freeze({base:{cost:9,damage:5},emerald:{cost:8,damage:6},sapphire:{cost:7,damage:7},ruby:{cost:7,damage:8},amethyst:{cost:6,damage:9}}),
    'hip-toss': Object.freeze({base:{cost:3,damage:1},emerald:{cost:2,damage:1},sapphire:{cost:2,damage:2},ruby:{cost:1,damage:2},amethyst:{cost:1,damage:3}}),
    'lariat': Object.freeze({base:{cost:6,damage:3},emerald:{cost:5,damage:3},sapphire:{cost:5,damage:4},ruby:{cost:4,damage:4},amethyst:{cost:4,damage:5}}),
    'running-clothesline': Object.freeze({base:{cost:5,damage:2},emerald:{cost:4,damage:2},sapphire:{cost:4,damage:3},ruby:{cost:3,damage:3},amethyst:{cost:3,damage:4}}),
    'running-knee-strike': Object.freeze({base:{cost:6,damage:3},emerald:{cost:5,damage:3},sapphire:{cost:5,damage:4},ruby:{cost:4,damage:4},amethyst:{cost:4,damage:5}}),
    'standing-dropkick': Object.freeze({base:{cost:5,damage:2},emerald:{cost:4,damage:2},sapphire:{cost:4,damage:3},ruby:{cost:3,damage:3},amethyst:{cost:3,damage:4}})
  })
});

const EXCLUDED = card => !card || card.kind !== 'move' || !!card.superstarId || !!card.finisher || !!card.trademark || !!card.submission || card.moveType === 'submission';

export function applySharedMoveFamilyCurvesV11203(cards=[]){
  const byId = new Map(cards.map(card => [card?.id, card]));
  let expected = 0;
  let applied = 0;
  for(const [family, curves] of Object.entries(SHARED_MOVE_FAMILY_CURVES_V11203)){
    for(const [id, printingStats] of Object.entries(curves)){
      expected += 1;
      const card = byId.get(id);
      if(!card) throw new Error(`v1.1.203 shared ${family} family missing production card ${id}`);
      if(EXCLUDED(card)) throw new Error(`v1.1.203 shared ${family} family attempted excluded card ${id}`);
      card.printingStats = structuredClone(printingStats);
      card.cost = printingStats.amethyst.cost;
      card.damage = printingStats.amethyst.damage;
      card.balanceFamily = family;
      card.balanceAuditVersion = 'v1.1.203-impact-rebalance';
      applied += 1;
    }
  }
  if(applied !== expected) throw new Error(`v1.1.203 shared family application incomplete: ${applied}/${expected}`);
  return applied;
}
