// v1.1.203 — shared ordinary Move family balance pass.
// Scope: shared IDs only. Finishers, Trademarks, Submissions and wrestler-specific IDs are excluded.
// Curves are authored by move-family hierarchy; Diving Leg Drop is the progression philosophy, not a numeric template.

export const SHARED_MOVE_FAMILY_CURVES_V11203 = Object.freeze({
  suplex: Object.freeze({
    'snap-suplex': Object.freeze({base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:5}}),
    'back-suplex': Object.freeze({base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:5},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}),
    'side-suplex': Object.freeze({base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}),
    'belly-to-belly-suplex': Object.freeze({base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}),
    'northern-lights-suplex': Object.freeze({base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:6},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}),
    'butterfly-suplex': Object.freeze({base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}),
    'reverse-suplex': Object.freeze({base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}),
    'german-suplex': Object.freeze({base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:6},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}),
    'fisherman-suplex': Object.freeze({base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}),
    'overhead-belly-to-belly-suplex': Object.freeze({base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}),
    'superplex': Object.freeze({base:{cost:8,damage:7},emerald:{cost:8,damage:8},sapphire:{cost:7,damage:9},ruby:{cost:7,damage:10},amethyst:{cost:7,damage:11}})
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
      card.balanceAuditVersion = 'v1.1.203';
      applied += 1;
    }
  }
  if(applied !== expected) throw new Error(`v1.1.203 shared family application incomplete: ${applied}/${expected}`);
  return applied;
}
