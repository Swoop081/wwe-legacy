/* v1.1.136 — repo-hosted onboarding brands, eager same-origin rendering, premium starter summary. */
(() => {
  const LOCAL = {
    raw: './assets/images/onboarding-raw-logo.svg?v=1.1.136',
    smackdown: './assets/images/onboarding-smackdown-logo.svg?v=1.1.136',
    nxt: './assets/images/onboarding-nxt-logo.svg?v=1.1.136'
  };

  const REMOTE_TO_LOCAL = new Map([
    ['https://commons.wikimedia.org/wiki/Special:Redirect/file/WWE_RAW_Logo_2025.svg', LOCAL.raw],
    ['https://commons.wikimedia.org/wiki/Special:Redirect/file/WWE_SmackDown_%282024%29_Logo.svg', LOCAL.smackdown],
    ['https://corporate.wwe.com/f/inline-images/NXT-logo.png', LOCAL.nxt]
  ]);

  // Warm all three same-origin assets before app.js can render the first starter screen.
  window.__WWE_LEGACY_STARTER_BRAND_PRELOADERS__ = Object.values(LOCAL).map(src => {
    const image = new Image();
    image.loading = 'eager';
    image.decoding = 'async';
    try { image.fetchPriority = 'high'; } catch {}
    image.src = src;
    return image;
  });

  // app.js builds onboarding with root.innerHTML. Rewrite its three known remote brand
  // URLs to same-origin assets before the browser parses the markup, so no third-party
  // image request is needed for the starter screens and lazy loading cannot cause pop-in.
  const innerHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  if (innerHTMLDescriptor?.get && innerHTMLDescriptor?.set && !window.__WWE_LEGACY_LOCAL_BRAND_INNERHTML_PATCH__) {
    window.__WWE_LEGACY_LOCAL_BRAND_INNERHTML_PATCH__ = true;
    Object.defineProperty(Element.prototype, 'innerHTML', {
      configurable: innerHTMLDescriptor.configurable,
      enumerable: innerHTMLDescriptor.enumerable,
      get: innerHTMLDescriptor.get,
      set(value) {
        let html = String(value ?? '');
        for (const [remote, local] of REMOTE_TO_LOCAL) html = html.split(remote).join(local);
        if (html.includes('starter-onboarding-set-logo')) {
          html = html.replace(
            /<img loading="lazy" decoding="async" referrerpolicy="no-referrer" class="set-brand-logo starter-onboarding-set-logo"/g,
            '<img loading="eager" decoding="async" fetchpriority="high" class="set-brand-logo starter-onboarding-set-logo"'
          );
        }
        innerHTMLDescriptor.set.call(this, html);
      }
    });
  }

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
    if (!root || root.dataset.v11136Decorated === '1') return;
    root.dataset.v11136Decorated = '1';
    const title = root.querySelector('h1');
    if (!root.querySelector('.starter-roster-summary-brand')) {
      const brand = document.createElement('div');
      brand.className = 'starter-roster-summary-brand';
      brand.innerHTML = '<img class="starter-roster-summary-logo" src="./assets/images/app-icon-192.png?v=1.1.136" alt="WWE Legacy"><span class="starter-roster-summary-wordmark">WWE LEGACY</span>';
      root.insertBefore(brand, title || root.firstChild);
    }
    const button = root.querySelector('#starter-summary-continue');
    if (button) {
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
  observer.observe(document.documentElement, { childList: true, subtree: true });

  document.querySelectorAll('.starter-onboarding-set-logo').forEach(promoteStarterBrand);
  document.querySelectorAll('.starter-roster-summary').forEach(decorateSummary);
})();
