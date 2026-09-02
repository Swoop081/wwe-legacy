/* WWE Legacy v1.1.105 — player-facing pack cleanup.
   Daily Spin remains retired. Pack presentation is intentionally concise. */
(() => {
  const SUMMERSLAM_2026_LOGO = "https://raw.githubusercontent.com/Swoop081/wwe-legacy/6f0c7b74a51112624f3172670bd8ca76c810971f/assets/images/art-summerslam-series-1-summerslam-2026-logo.png";

  const retireDailySpin = root => {
    root.querySelectorAll?.('.daily-spin-ready-card,.daily-spin-home,.daily-spin-modal').forEach(node => node.remove());
  };

  const simplifyPack = root => {
    root.querySelectorAll?.('.physical-booster-pack').forEach(pack => {
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
    root.querySelectorAll?.('.booster-rip-note').forEach(el => el.remove());
  };

  const repairMerchReveal = root => {
    const reward = root.querySelector?.('.single-card-reveal-stage .up-card-replacement');
    if (reward) {
      const amount = reward.querySelector('strong')?.textContent?.replace(/\s+/g, '').trim();
      if (amount === '+0' || amount === '0' || /MERCH PULL|ADDED TO COLLECTION/i.test(reward.textContent || '')) {
        const stage = reward.closest('.single-card-reveal-stage');
        reward.remove();
        stage?.classList.remove('is-converted');
        const card = stage?.querySelector('.ccg-card');
        const hasFrontImage = !!card?.querySelector('img');
        if (card && hasFrontImage) card.classList.remove('flipped', 'is-flipped');
        const rarity = stage?.querySelector('.booster-reveal-rarity');
        const flags = stage?.querySelector('.booster-reveal-flags');
        if (rarity) rarity.textContent = 'MERCH';
        if (flags) flags.innerHTML = '';
      }
    }
    root.querySelectorAll?.('.single-card-reveal-hint,.reveal-progress').forEach(el => {
      el.textContent = (el.textContent || '').replace(/^TAP CARD\s*·\s*/i, '');
    });
  };

  const apply = () => {
    retireDailySpin(document);
    simplifyPack(document);
    repairMerchReveal(document);
  };

  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
