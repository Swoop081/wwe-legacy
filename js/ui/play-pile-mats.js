// v1.1.43 — Every WWE Legacy set receives a self-contained play-pile mat.
// The mat is CSS-rendered so it cannot disappear when an optional artwork asset is absent.
export const PLAY_PILE_MAT_THEMES = Object.freeze({
  "raw-series-1":                    { canvas:"#1d070b", accent:"#e31b2f", secondary:"#7c0a18" },
  "smackdown-series-1":              { canvas:"#06182c", accent:"#1597ff", secondary:"#074c9e" },
  "nxt-series-1":                    { canvas:"#12110b", accent:"#f2d44f", secondary:"#8c7424" },
  "evolution-series-1":              { canvas:"#17091f", accent:"#d45cff", secondary:"#71328e" },
  "summerslam-series-1":             { canvas:"#07172b", accent:"#2eb5ff", secondary:"#ee6f32" },
  "golden-era-series-1":             { canvas:"#211307", accent:"#f0c64c", secondary:"#b74627" },
  "new-generation-series-1":         { canvas:"#071a1d", accent:"#35d9e8", secondary:"#da48d5" },
  "attitude-era-series-1":           { canvas:"#151515", accent:"#e33c3c", secondary:"#bfc4c8" },
  "ruthless-aggression-series-1":    { canvas:"#160a0d", accent:"#c5243a", secondary:"#aeb7c0" },
  "worlds-collide-series-1":         { canvas:"#07191a", accent:"#54e6df", secondary:"#ff4fce" },
  "money-in-the-bank-series-1":      { canvas:"#0d1b08", accent:"#68e436", secondary:"#d9c447" },
  "survivor-series-series-1":        { canvas:"#07162d", accent:"#ff6b1b", secondary:"#2ca8ff" },
  "season-1-last-time-is-now":       { canvas:"#160d18", accent:"#f0c95d", secondary:"#cf4a9d" },
  "season-1-final-boss":             { canvas:"#170b0b", accent:"#f0c95d", secondary:"#bd2b34" },
  "season-2-whos-next":              { canvas:"#0f1218", accent:"#f0c95d", secondary:"#7f93b4" },
  "parked-chyna":                    { canvas:"#140d1b", accent:"#b774ff", secondary:"#e0c5ff" }
});

const FALLBACK_PLAY_PILE_MAT = Object.freeze({ canvas:"#10131a", accent:"#d7b95b", secondary:"#5c6f86" });

export function playPileMatTheme(setId) {
  return PLAY_PILE_MAT_THEMES[setId] ?? FALLBACK_PLAY_PILE_MAT;
}

export function playPileMatStyle(setId) {
  const theme = playPileMatTheme(setId);
  return `--ring-mat-canvas:${theme.canvas};--ring-mat-accent:${theme.accent};--ring-mat-secondary:${theme.secondary}`;
}
