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

/* v1.1.133 — onboarding brand readiness + immersive roster reveal. */
(() => {
  const LEGACY_LOGO = './assets/images/branding-wwe-legacy-series-logo.png?v=1.1.133';
  try { const image = new Image(); image.decoding = 'async'; image.src = LEGACY_LOGO; } catch {}

  let releaseToken = 0;

  const releaseBrandScreenWhenReady = async () => {
    const body = document.body;
    if (!body?.dataset?.starterOnboarding || body.dataset.starterOnboarding === 'summary') {
      body?.classList.remove('starter-brand-ready');
      return;
    }
    const token = ++releaseToken;
    body.classList.remove('starter-brand-ready');
    const shell = document.querySelector('.starter-onboarding-shell');
    if (!shell) return;
    const images = Array.from(shell.querySelectorAll('img')).filter(img => {
      const box = img.getBoundingClientRect();
      return box.top < Math.max(innerHeight * .48, 360);
    });
    if (!images.length) {
      requestAnimationFrame(() => { if (token === releaseToken) body.classList.add('starter-brand-ready'); });
      return;
    }
    const ready = images.map(img => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      if (typeof img.decode === 'function') return img.decode().catch(() => undefined);
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    });
    await Promise.race([Promise.allSettled(ready), new Promise(resolve => setTimeout(resolve, 900))]);
    if (token !== releaseToken) return;
    requestAnimationFrame(() => body.classList.add('starter-brand-ready'));
  };

  const decorateSummary = () => {
    const summary = document.querySelector('.starter-roster-summary');
    if (!summary || summary.dataset.legacyReveal === '1') return;
    summary.dataset.legacyReveal = '1';
    const brand = document.createElement('div');
    brand.className = 'starter-roster-summary-brand';
    brand.innerHTML = `<img src="${LEGACY_LOGO}" alt="WWE Legacy">`;
    summary.prepend(brand);
    const title = summary.querySelector('.starter-roster-summary-title');
    if (title) title.innerHTML = '<span class="starter-roster-summary-kicker">STARTING ROSTER · COMPLETE</span><span class="starter-roster-summary-heading">HERE’S YOUR<br>STARTING ROSTER</span>';
  };

  const sync = () => {
    if (document.body?.dataset?.starterOnboarding === 'summary') {
      document.body.classList.add('starter-brand-ready');
      decorateSummary();
    } else {
      releaseBrandScreenWhenReady();
    }
  };

  const start = () => {
    new MutationObserver(sync).observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-starter-onboarding']
    });
    sync();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
