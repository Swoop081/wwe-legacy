from pathlib import Path

p = Path('js/data/live-events.js')
s = p.read_text()
old = """    // Theme eligibility is absolute. Variety/recency may reorder an event's authored
    // opponent pool, but must never widen it (for example Evolution is women-only).
    const candidates = [...new Set(themed)].filter(id => !usedToday.has(id));
    candidates.sort((a,b) => {
      const aLast = recentUse.get(a) ?? -Infinity, bLast = recentUse.get(b) ?? -Infinity;
      if (aLast !== bLast) return aLast - bLast;
      const seed = `${dateKey(localDayStart(now))}:${event.id}:`;
      return `${seed}${a}`.localeCompare(`${seed}${b}`);
    });
    const selected = candidates.slice(0, LIVE_EVENT_LENGTH);
    selected.forEach(id => usedToday.add(id));
    return { ...event, opponentPool: selected };"""
new = """    // Theme eligibility and five-match tower length are absolute. Daily variety is
    // only a preference: unused Superstars lead the pool, but already-used themed
    // opponents backfill when necessary so a tower can never collapse below five.
    const candidates = [...new Set(themed)];
    candidates.sort((a,b) => {
      const aLast = recentUse.get(a) ?? -Infinity, bLast = recentUse.get(b) ?? -Infinity;
      if (aLast !== bLast) return aLast - bLast;
      const seed = `${dateKey(localDayStart(now))}:${event.id}:`;
      return `${seed}${a}`.localeCompare(`${seed}${b}`);
    });
    const unused = candidates.filter(id => !usedToday.has(id));
    const reused = candidates.filter(id => usedToday.has(id));
    const ordered = [...unused, ...reused];
    if (ordered.length < LIVE_EVENT_LENGTH) {
      throw new Error(`Live Event ${event.id} has only ${ordered.length} released themed opponents; five are required.`);
    }
    ordered.slice(0, LIVE_EVENT_LENGTH).forEach(id => usedToday.add(id));
    return { ...event, opponentPool: ordered };"""
if old not in s:
    raise SystemExit('dailyVarietyEvents target block not found')
p.write_text(s.replace(old, new))
