/* v1.1.143 — pack/store branding must use the approved set identities, never generic substitutes. */
(() => {
  const V = '1.1.143';
  const LOGOS = {
    'raw-series-1': `./assets/images/onboarding-raw-logo.svg?v=${V}`,
    'smackdown-series-1': `./assets/images/onboarding-smackdown-logo.svg?v=${V}`,
    'nxt-series-1': `./assets/images/onboarding-nxt-logo.svg?v=${V}`,
    'evolution-series-1': `./assets/images/art-evolution-series-1-evolution-logo.png?v=${V}`,
    'summerslam-series-1': `./assets/images/art-summerslam-series-1-summerslam-2026-logo.png?v=${V}`,
    'golden-era-series-1': `./assets/images/set-logos/golden-era-set-logo.png?v=${V}`,
    'new-generation-series-1': `./assets/images/branding-new-generation-series-1-new-generation-logo.png?v=${V}`,
    'attitude-era-series-1': `./assets/images/branding-attitude-era-series-1-wwf-scratch-logo-card.png?v=${V}`,
    // This is the exact approved Card Studio source until its binary is mirrored into the repo.
    'ruthless-aggression-series-1': 'https://images.hobbydb.com/processed_uploads/subject_photo/subject_photo/image/39850/1526513686-11744-2621/WWE_20Ruthless_20Aggression_20logo_large.png'
  };

  globalThis.__WWE_LEGACY_PACK_LOGOS__ = Object.freeze({ ...LOGOS });
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

  const applyApprovedLogo = pack => {
    if (!(pack instanceof Element) || !pack.classList.contains('physical-booster-pack')) return;
    const setId = setIdForPack(pack);
    const src = LOGOS[setId];
    if (!src) return;

    let logo = pack.querySelector('.pack-set-logo');
    if (!logo) {
      logo = document.createElement('img');
      logo.className = 'set-brand-logo pack-set-logo pack-approved-set-logo';
      logo.alt = `${setId.replace(/-series-1$/, '').replaceAll('-', ' ')} logo`;
      const textFallback = pack.querySelector('.pack-text-logo');
      if (textFallback) textFallback.replaceWith(logo);
      else pack.prepend(logo);
    }

    if (logo.getAttribute('src') !== src) logo.setAttribute('src', src);
    logo.classList.add('pack-approved-set-logo');
    logo.loading = 'eager';
    logo.decoding = 'async';
    logo.style.display = '';
    logo.style.opacity = '1';
    logo.removeAttribute('referrerpolicy');
    logo.removeAttribute('data-fallback-src');
    logo.classList.remove('is-source-logo-unavailable');
    try { logo.fetchPriority = 'high'; } catch {}
  };

  const keepSummaryTapTarget = root => {
    if (!(root instanceof Element)) return;
    root.querySelectorAll('.pack-summary-card').forEach(card => {
      card.style.pointerEvents = 'auto';
      card.style.touchAction = 'manipulation';
      card.querySelectorAll('.pack-summary-actual-card, .pack-summary-actual-card *').forEach(child => {
        child.style.pointerEvents = 'none';
      });
    });
  };

  const inspect = node => {
    if (!(node instanceof Element)) return;
    if (node.matches('.physical-booster-pack')) applyApprovedLogo(node);
    node.querySelectorAll?.('.physical-booster-pack').forEach(applyApprovedLogo);
    if (node.matches('.streamlined-pack-summary')) keepSummaryTapTarget(node);
    node.querySelectorAll?.('.streamlined-pack-summary').forEach(keepSummaryTapTarget);
  };

  const start = () => {
    inspect(document.documentElement);
    new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(inspect)))
      .observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
