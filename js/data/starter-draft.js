// WWE Legacy v1.1.351 — retired legacy Starter Draft compatibility module.
// Current onboarding is the two-pack Premiere flow in app.js/profile.js.
export const STARTER_DRAFT_SETS = Object.freeze([]);
export function rollStarterDraft(){ return []; }
export function validateStarterDraft(){ return false; }
export function createStarterDraftProfile(){ throw new Error("Legacy Starter Draft is retired. Start a new Premiere game."); }
