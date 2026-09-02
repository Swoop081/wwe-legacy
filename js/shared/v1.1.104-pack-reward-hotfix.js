/* WWE Legacy pack presentation compatibility hotfix.
   Daily Spin remains retired. Pack reveals are now handled entirely by the
   core renderer so Merch pulls display their actual collectible card. */
(() => {
  const retireDailySpin = root => {
    root.querySelectorAll?.('.daily-spin-ready-card,.daily-spin-home,.daily-spin-modal').forEach(node => node.remove());
  };

  const apply = () => retireDailySpin(document);
  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
