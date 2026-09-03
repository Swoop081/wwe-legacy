/* v1.1.142 — repo-hosted booster set logos + reliable pack summary inspection. */
(() => {
  const V = '1.1.142';
  const LOGOS = {
    'raw-series-1': `./assets/images/onboarding-raw-logo.svg?v=${V}`,
    'smackdown-series-1': `./assets/images/onboarding-smackdown-logo.svg?v=${V}`,
    'nxt-series-1': `./assets/images/onboarding-nxt-logo.svg?v=${V}`,
    'evolution-series-1': `./assets/images/wwe-evolution-logo-white.svg?v=${V}`,
    'summerslam-series-1': `./assets/images/summerslam-2025-logo.png?v=${V}`,
    'golden-era-series-1': `./assets/images/golden-era-pack-logo.svg?v=${V}`,
    'new-generation-series-1': `./assets/images/new-generation-pack-logo.svg?v=${V}`,
    'attitude-era-series-1': `./assets/images/attitude-era-logo.svg?v=${V}`,
    'ruthless-aggression-series-1': `./assets/images/ruthless-aggression-logo.png?v=${V}`
  };

  // Warm every active set logo before the pack UI is rendered. No external runtime dependency.
  globalThis.__WWE_LEGACY_PACK_LOGOS__ = LOGOS;
  globalThis.__WWE_LEGACY_PACK_LOGO_PRELOADERS__ = Object.values(LOGOS).map(src => {
    const img = new Image();
    img.loading = 'eager';
    img.decoding = 'async';
    try { img.fetchPriority = 'high'; } catch {}
    img.src = src;
    return img;
  });

  const setIdForPack = pack => {
    for (const cls of pack.classList) if (cls.startsWith('pack-set-')) return cls.slice(9);
    return '';
  };

  const promotePackLogo = pack => {
    if (!(pack instanceof Element) || !pack.classList.contains('physical-booster-pack')) return;
    const setId = setIdForPack(pack);
    const src = LOGOS[setId];
    if (!src) return;
    let logo = pack.querySelector('.pack-set-logo');
    if (!logo) {
      logo = document.createElement('img');
      logo.className = 'set-brand-logo pack-set-logo pack-local-set-logo';
      logo.alt = `${setId.replace(/-series-1$/, '').replaceAll('-', ' ')} logo`;
      const fallbackText = pack.querySelector('.pack-text-logo');
      if (fallbackText) fallbackText.replaceWith(logo);
      else {
        const title = pack.querySelector('.pack-title, .pack-copy, .pack-center');
        (title || pack).prepend(logo);
      }
    }
    if (logo.getAttribute('src') !== src) logo.setAttribute('src', src);
    logo.loading = 'eager';
    logo.decoding = 'async';
    logo.removeAttribute('referrerpolicy');
    logo.style.display = '';
    logo.classList.remove('is-source-logo-unavailable');
    try { logo.fetchPriority = 'high'; } catch {}
  };

  const inspect = node => {
    if (!(node instanceof Element)) return;
    if (node.matches('.physical-booster-pack')) promotePackLogo(node);
    node.querySelectorAll?.('.physical-booster-pack').forEach(promotePackLogo);
  };

  const start = () => {
    inspect(document.documentElement);
    new MutationObserver(records => records.forEach(r => r.addedNodes.forEach(inspect)))
      .observe(document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
