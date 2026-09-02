/* WWE Legacy v1.1.104 — player-facing hotfixes.
   1) Retire Daily Spin surfaces.
   2) Correct the fifth-slot merch reveal being presented as +0 UP.
      The core pack data already retains the merch correctly; this fixes the
      reveal-state presentation until the summary shows the exact merch card. */
(() => {
  const retireDailySpin = root => {
    root.querySelectorAll?.('.daily-spin-ready-card,.daily-spin-home,.daily-spin-modal').forEach(node => node.remove());
  };

  const repairZeroUpReveal = root => {
    const reward = root.querySelector?.('.single-card-reveal-stage .up-card-replacement');
    if (!reward) return;
    const amount = reward.querySelector('strong')?.textContent?.replace(/\s+/g, '').trim();
    if (amount !== '+0' && amount !== '0') return;

    reward.setAttribute('aria-label', 'Merch added to collection');
    reward.classList.add('zero-up-merch-repair');
    reward.innerHTML = '<span>MERCH PULL</span><strong>ADDED</strong><b>TO COLLECTION</b><small>SEE PACK SUMMARY FOR ITEM</small>';

    const stage = reward.closest('.single-card-reveal-stage');
    const rarity = stage?.querySelector('.booster-reveal-rarity');
    const flags = stage?.querySelector('.booster-reveal-flags');
    const progress = stage?.querySelector('.reveal-progress');
    if (rarity) rarity.textContent = 'MERCH';
    if (flags) flags.innerHTML = '<b>ADDED TO COLLECTION</b>';
    if (progress) progress.textContent = 'TAP CARD · PACK SUMMARY';
  };

  const apply = () => {
    retireDailySpin(document);
    repairZeroUpReveal(document);
  };

  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
