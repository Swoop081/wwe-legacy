/* WWE Legacy v1.1.105 — concise pack presentation + direct merch reveal. */
(() => {
  const SUMMERSLAM_2026_LOGO = "https://raw.githubusercontent.com/Swoop081/wwe-legacy/6f0c7b74a51112624f3172670bd8ca76c810971f/assets/images/art-summerslam-series-1-summerslam-2026-logo.png";

  const cleanPack = () => {
    document.querySelectorAll('.physical-booster-pack').forEach(pack => {
      const logo = pack.querySelector('.physical-booster-logo');
      const isSummerSlam = /summerslam/i.test(logo?.alt || '') || /summerslam/i.test(pack.textContent || '');
      if (isSummerSlam && logo) {
        logo.src = SUMMERSLAM_2026_LOGO;
        logo.hidden = false;
      }
      pack.querySelector('.physical-booster-set-line')?.remove();
      pack.querySelectorAll('small').forEach(el => {
        if (/4 CARDS|MERCH|AMETHYST CHASE|SERIES 1/i.test(el.textContent || '')) el.remove();
      });
    });
    document.querySelectorAll('.booster-rip-note').forEach(el => el.remove());
  };

  const cleanReveal = () => {
    const stage = document.querySelector('.single-card-reveal-stage');
    if (!stage) return;
    const overlay = stage.querySelector('.single-card-reward-overlay');
    if (overlay && /\+0\s*UP|MERCH PULL|ADDED/i.test(overlay.textContent || '')) {
      overlay.remove();
      stage.classList.remove('is-converted');
      const card = stage.querySelector('.ccg-card');
      const hasFrontImage = !!card?.querySelector('img');
      if (hasFrontImage) card.classList.remove('flipped', 'is-flipped');
      const meta = document.querySelector('.single-card-reveal-meta');
      if (meta) meta.innerHTML = '<strong>MERCH</strong>';
    }
    document.querySelectorAll('.single-card-reveal-hint').forEach(el => {
      el.textContent = (el.textContent || '').replace(/^TAP CARD\s*·\s*/i, '');
    });
  };

  const patch = () => { cleanPack(); cleanReveal(); };
  patch();
  new MutationObserver(patch).observe(document.documentElement, { childList:true, subtree:true });
})();
