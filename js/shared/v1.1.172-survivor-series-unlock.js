// v1.1.172 — Survivor Series unlock gate + one-time mode-unlocked presentation.
(() => {
  const PROFILE_KEY = "wa-modern-profile-v3";
  const OVERLAY_ID = "v1172-survivor-mode-unlocked";

  function readProfile() {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null"); }
    catch { return null; }
  }

  function rosterCount(profile = readProfile()) {
    return new Set(Array.isArray(profile?.unlockedSuperstars) ? profile.unlockedSuperstars.filter(Boolean) : []).size;
  }

  function seenKey(profile) {
    const identity = String(profile?.createdAt || "legacy-profile");
    return `wwe-legacy-survivor-series-unlock-v1:${identity}`;
  }

  function hasSeen(profile) {
    try { return localStorage.getItem(seenKey(profile)) === "1"; }
    catch { return false; }
  }

  function markSeen(profile) {
    try { localStorage.setItem(seenKey(profile), "1"); } catch {}
  }

  function decorateSurvivorPanel() {
    const panel = document.querySelector("#play-survivor-series");
    if (!panel) return;
    const locked = rosterCount() < 4;
    panel.classList.toggle("v1172-survivor-locked", locked);
    panel.setAttribute("aria-disabled", locked ? "true" : "false");
    let lock = panel.querySelector(":scope > .v1172-survivor-lock");
    if (locked) {
      if (!lock) {
        lock = document.createElement("span");
        lock.className = "v1172-survivor-lock";
        lock.innerHTML = "<strong>REQUIRES 4</strong><b>SUPERSTARS</b>";
        panel.appendChild(lock);
      }
    } else {
      lock?.remove();
    }
  }

  function showModeUnlocked(profile) {
    if (document.getElementById(OVERLAY_ID) || rosterCount(profile) !== 4 || hasSeen(profile)) return;
    markSeen(profile);
    const overlay = document.createElement("section");
    overlay.id = OVERLAY_ID;
    overlay.className = "v1172-mode-unlock-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Survivor Series unlocked");
    overlay.innerHTML = `
      <div class="v1172-mode-unlock-card">
        <small>NEW MODE UNLOCKED</small>
        <h2><span>SURVIVOR</span><b>SERIES</b></h2>
        <p>Your roster has reached 4 Superstars.</p>
        <strong>SURVIVOR SERIES IS NOW PLAYABLE</strong>
        <button type="button" id="v1172-mode-unlock-continue">CONTINUE</button>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById("v1172-mode-unlock-continue")?.addEventListener("click", () => {
      overlay.remove();
      decorateSurvivorPanel();
    }, { once: true });
  }

  // The Superstar celebration is already the first presentation. Queue the mode
  // presentation immediately after the user dismisses that celebration, and only
  // for the exact transition state where the roster contains four Superstars.
  document.addEventListener("click", event => {
    const button = event.target?.closest?.("#unlock-continue, #unlock-deck-lab");
    if (!button) return;
    const profile = readProfile();
    if (rosterCount(profile) !== 4 || hasSeen(profile)) return;
    setTimeout(() => showModeUnlocked(readProfile()), 90);
  }, true);

  const observer = new MutationObserver(decorateSurvivorPanel);
  const start = () => {
    decorateSurvivorPanel();
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
