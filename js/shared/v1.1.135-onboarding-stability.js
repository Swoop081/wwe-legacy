/* v1.1.135 — preload onboarding brand logos without ever gating screen visibility. */
(() => {
  const BRAND_LOGOS = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/WWERaw2025.svg/1280px-WWERaw2025.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/WWE_SmackDown_%282024%29_Logo.svg/1280px-WWE_SmackDown_%282024%29_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/WWE_NXT_2019.png/1024px-WWE_NXT_2019.png'
  ];

  const preloaders = BRAND_LOGOS.map(src => {
    const image = new Image();
    image.decoding = 'async';
    image.loading = 'eager';
    try { image.fetchPriority = 'high'; } catch {}
    image.src = src;
    return image;
  });
  window.__WWE_LEGACY_STARTER_BRAND_PRELOADERS__ = preloaders;

  const promoteBrandImage = img => {
    if (!(img instanceof HTMLImageElement)) return;
    img.loading = 'eager';
    img.decoding = 'async';
    try { img.fetchPriority = 'high'; } catch {}
    if (typeof img.decode === 'function' && img.complete) img.decode().catch(() => {});
  };

  const decorateSummary = root => {
    if (!root || root.dataset.v11135Decorated === '1') return;
    root.dataset.v11135Decorated = '1';

    const title = root.querySelector('h1');
    if (!root.querySelector('.starter-roster-summary-brand')) {
      const brand = document.createElement('div');
      brand.className = 'starter-roster-summary-brand';
      brand.innerHTML = '<img class="starter-roster-summary-logo" src="./assets/images/app-icon-192.png?v=1.1.135" alt="WWE Legacy"><span class="starter-roster-summary-wordmark">WWE LEGACY</span>';
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
    if (node.matches?.('.starter-onboarding-brand img')) promoteBrandImage(node);
    node.querySelectorAll?.('.starter-onboarding-brand img').forEach(promoteBrandImage);

    if (node.matches?.('.starter-roster-summary')) decorateSummary(node);
    node.querySelectorAll?.('.starter-roster-summary').forEach(decorateSummary);
  };

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(inspect);
      if (mutation.type === 'attributes' && mutation.target?.matches?.('.starter-onboarding-brand img')) {
        promoteBrandImage(mutation.target);
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'srcset']
  });

  document.querySelectorAll('.starter-onboarding-brand img').forEach(promoteBrandImage);
  document.querySelectorAll('.starter-roster-summary').forEach(decorateSummary);
})();
