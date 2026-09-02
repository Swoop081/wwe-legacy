/* v1.1.138 — safe repo-hosted onboarding assets + corrected roster branding. */
(() => {
  const LOCAL = {
    raw: './assets/images/onboarding-raw-logo.svg?v=1.1.138',
    smackdown: './assets/images/onboarding-smackdown-logo.svg?v=1.1.138',
    nxt: './assets/images/onboarding-nxt-logo.svg?v=1.1.138'
  };

  window.__WWE_LEGACY_STARTER_BRAND_PRELOADERS__ = Object.values(LOCAL).map(src => {
    const image = new Image();
    image.loading = 'eager';
    image.decoding = 'async';
    try { image.fetchPriority = 'high'; } catch {}
    image.src = src;
    return image;
  });

  const localForStarterImage = img => {
    const screen = img.closest?.('.three-brand-starter-onboarding');
    if (!screen) return null;
    if (screen.classList.contains('starter-brand-raw')) return LOCAL.raw;
    if (screen.classList.contains('starter-brand-smackdown')) return LOCAL.smackdown;
    if (screen.classList.contains('starter-brand-nxt')) return LOCAL.nxt;
    return null;
  };

  const promoteStarterBrand = img => {
    if (!(img instanceof HTMLImageElement)) return;
    const local = localForStarterImage(img);
    if (local && img.getAttribute('src') !== local) img.setAttribute('src', local);
    img.loading = 'eager';
    img.decoding = 'async';
    try { img.fetchPriority = 'high'; } catch {}
  };

  const decorateSummary = root => {
    if (!root || root.dataset.v11138Decorated === '1') return;
    root.dataset.v11138Decorated = '1';
    const title = root.querySelector('h1');
    const existingBrand = root.querySelector('.starter-roster-summary-brand');
    if (existingBrand) existingBrand.remove();
    const brand = document.createElement('div');
    brand.className = 'starter-roster-summary-brand';
    brand.innerHTML = '<img class="starter-roster-summary-logo" src="./assets/images/branding-wwe-legacy-logo.png?v=1.1.138" alt="WWE Legacy">';
    root.insertBefore(brand, title || root.firstChild);
    const button = root.querySelector('#open-starter-support, #starter-summary-continue');
    if (button) {
      button.id = 'starter-summary-continue';
      button.classList.add('starter-roster-continue');
      button.innerHTML = 'CONTINUE <span aria-hidden="true">›</span>';
      button.setAttribute('aria-label', 'Continue');
    }
  };

  const inspect = node => {
    if (!node || node.nodeType !== 1) return;
    if (node.matches?.('.starter-onboarding-set-logo')) promoteStarterBrand(node);
    node.querySelectorAll?.('.starter-onboarding-set-logo').forEach(promoteStarterBrand);
    if (node.matches?.('.starter-roster-summary')) decorateSummary(node);
    node.querySelectorAll?.('.starter-roster-summary').forEach(decorateSummary);
  };

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) mutation.addedNodes.forEach(inspect);
  });
  const start = () => {
    observer.observe(document.documentElement, { childList: true, subtree: true });
    document.querySelectorAll('.starter-onboarding-set-logo').forEach(promoteStarterBrand);
    document.querySelectorAll('.starter-roster-summary').forEach(decorateSummary);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
