import { superstars } from '../js/data/superstars.js';
import { deckIds } from '../js/data/decks.js';
import { allGameplayCards } from '../js/data/content.js';
import { isPlayerReleasedSetId } from '../js/data/release.js';
import { COUNTER_STATES, SUBMISSION_TARGETS } from '../js/data/counter-states.js';

const byId = new Map(allGameplayCards.map(c => [c.id, c]));
const stars = Object.values(superstars)
  .filter(s => !s.developmentOnly && isPlayerReleasedSetId(s.setId))
  .sort((a,b)=>a.name.localeCompare(b.name));

const arr = v => Array.isArray(v) ? v : [];
const hasStructuralCounter = c => !!c && c.kind === 'move' && (
  arr(c.counterStates).length || arr(c.counterSubmissionTargets).length ||
  arr(c.countersCardIds).length || arr(c.counters).length || c.defensiveOnly
);
const isDedicatedCounter = c => hasStructuralCounter(c) && !!c.defensiveOnly;
const isOffensiveReversal = c => hasStructuralCounter(c) && !c.defensiveOnly;
const isRepeatReactive = c => c?.id === 'once-too-often' || c?.effect?.type === 'onceTooOften';
const isPinEscape = c => !!c?.pinEscape;

const rows = stars.map(star => {
  const ids = deckIds[star.id] ?? [];
  const cards = ids.map(id => byId.get(id)).filter(Boolean);
  const structural = cards.filter(hasStructuralCounter);
  const dedicated = cards.filter(isDedicatedCounter);
  const offensive = cards.filter(isOffensiveReversal);
  const repeatReactive = cards.filter(isRepeatReactive);
  const pinEscapes = cards.filter(isPinEscape);
  const stateSet = new Set(structural.flatMap(c => arr(c.counterStates)));
  const subSet = new Set(structural.flatMap(c => arr(c.counterSubmissionTargets)));
  return {
    id: star.id,
    name: star.name,
    deckPages: cards.length,
    structuralCounterPages: structural.length,
    dedicatedCounterPages: dedicated.length,
    offensiveReversalPages: offensive.length,
    repeatReactivePages: repeatReactive.length,
    effectiveReactiveDefensePages: structural.length + repeatReactive.length,
    pinEscapePages: pinEscapes.length,
    stateCoverage: stateSet.size,
    submissionTargetCoverage: subSet.size,
    missingStates: COUNTER_STATES.filter(s => !stateSet.has(s)),
    missingSubmissionTargets: SUBMISSION_TARGETS.filter(s => !subSet.has(s)),
  };
});
const mean = key => Number((rows.reduce((s,r)=>s+r[key],0)/Math.max(1,rows.length)).toFixed(2));
const range = key => ({min:Math.min(...rows.map(r=>r[key])),max:Math.max(...rows.map(r=>r[key]))});
const byDensity = [...rows].sort((a,b)=>b.effectiveReactiveDefensePages-a.effectiveReactiveDefensePages || b.structuralCounterPages-a.structuralCounterPages || a.name.localeCompare(b.name));
const lowDensity = [...rows].sort((a,b)=>a.effectiveReactiveDefensePages-b.effectiveReactiveDefensePages || a.name.localeCompare(b.name));
const stateCoverageCounts = Object.fromEntries(COUNTER_STATES.map(s=>[s,rows.filter(r=>!r.missingStates.includes(s)).length]));
const submissionCoverageCounts = Object.fromEntries(SUBMISSION_TARGETS.map(s=>[s,rows.filter(r=>!r.missingSubmissionTargets.includes(s)).length]));
const report = {
  releasedSuperstars: rows.length,
  definitions: {
    structuralCounterPages:'Move pages with defensiveOnly or explicit counterStates/counterSubmissionTargets/countersCardIds/legacy counters.',
    effectiveReactiveDefensePages:'Structural counter pages plus Once Too Often; pin escapes are reported separately and excluded from Counter density.',
  },
  averages: {
    structuralCounterPages:mean('structuralCounterPages'),
    dedicatedCounterPages:mean('dedicatedCounterPages'),
    offensiveReversalPages:mean('offensiveReversalPages'),
    repeatReactivePages:mean('repeatReactivePages'),
    effectiveReactiveDefensePages:mean('effectiveReactiveDefensePages'),
    pinEscapePages:mean('pinEscapePages'),
    stateCoverage:mean('stateCoverage'),
    submissionTargetCoverage:mean('submissionTargetCoverage'),
  },
  ranges: {
    structuralCounterPages:range('structuralCounterPages'),
    effectiveReactiveDefensePages:range('effectiveReactiveDefensePages'),
    stateCoverage:range('stateCoverage'),
    submissionTargetCoverage:range('submissionTargetCoverage'),
  },
  stateCoverageCounts,
  submissionCoverageCounts,
  highestDensity:byDensity.slice(0,10),
  lowestDensity:lowDensity.slice(0,10),
  rows,
};
console.log(JSON.stringify(report,null,2));
