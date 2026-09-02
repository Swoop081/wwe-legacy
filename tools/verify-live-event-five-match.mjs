import { activeLiveEventTowers, LIVE_EVENT_LENGTH } from '../js/data/live-events.js';

const start = new Date(2026, 8, 1, 12, 0, 0);
for (let day = 0; day < 180; day += 1) {
  const d = new Date(start.getTime());
  d.setDate(d.getDate() + day);
  const towers = activeLiveEventTowers(d, null);
  if (towers.length !== 3) throw new Error(`${d.toDateString()}: expected 3 daily towers, got ${towers.length}`);
  for (const tower of towers) {
    const unique = [...new Set(tower.event.opponentPool ?? [])];
    if (unique.length < LIVE_EVENT_LENGTH) {
      throw new Error(`${d.toDateString()} ${tower.event.id}: expected at least 5 themed opponents, got ${unique.length}`);
    }
    const five = unique.slice(0, LIVE_EVENT_LENGTH);
    if (five.length !== 5) throw new Error(`${tower.event.id}: five-match invariant failed`);
  }
}
console.log('Verified exactly 3 daily Live Events and five opponents per tower across 180 days');
