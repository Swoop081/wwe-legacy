/* v1.1.134 — do not reveal onboarding until final rendered images are ready. */
(() => {
  const ROOT_SELECTOR = '.three-brand-starter-onboarding,.starter-roster-summary';
  const timers = new WeakMap();
  const revisions = new WeakMap();

  const nextFrames = () => new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  const waitForImage = img => {
    const decode = () => typeof img.decode === 'function'
      ? img.decode().catch(() => {})
      : Promise.resolve();
    if (img.complete) return decode();
    return new Promise(resolve => {
      const finish = () => resolve();
      img.addEventListener('load', finish, { once: true });
      img.addEventListener('error', finish, { once: true });
    }).then(decode);
  };

  const decorateSummary = root => {
    if (!root.matches('.starter-roster-summary')) return;

    if (!root.querySelector('.starter-roster-summary-logo')) {
      const logo = document.createElement('img');
      logo.className = 'starter-roster-summary-logo';
      logo.src = './assets/images/app-icon-192.png?v=1.1.134';
      logo.alt = 'WWE Legacy';
      logo.decoding = 'async';
      const title = root.querySelector('h1');
      root.insertBefore(logo, title || root.firstChild);
    }

    root.querySelector('h1')?.classList.add('starter-roster-summary-title');
    const button = root.querySelector('#open-starter-support');
    if (button && !button.classList.contains('starter-roster-continue')) {
      button.classList.add('starter-roster-continue');
      button.innerHTML = 'CONTINUE <span aria-hidden="true">›</span>';
      button.setAttribute('aria-label', 'Continue');
    }
  };

  const settleImages = async root => {
    let previousSignature = '';
    let stablePasses = 0;
    for (let pass = 0; pass < 14; pass += 1) {
      await nextFrames();
      const images = [...root.querySelectorAll('img')];
      await Promise.all(images.map(waitForImage));
      await nextFrames();

      const currentImages = [...root.querySelectorAll('img')];
      const signature = currentImages.map(img =>
        `${img.currentSrc || img.src}|${img.complete}|${img.naturalWidth}|${img.naturalHeight}`
      ).join('||');
      const allSettled = currentImages.every(img => img.complete && (img.naturalWidth > 0 || img.naturalHeight > 0));

      if (allSettled && signature === previousSignature) stablePasses += 1;
      else stablePasses = 0;
      if (stablePasses >= 1) return true;

      previousSignature = signature;
      await new Promise(resolve => setTimeout(resolve, 90));
    }
    return false;
  };

  const prepare = async root => {
    if (!root?.isConnected) return;
    const revision = (revisions.get(root) || 0) + 1;
    revisions.set(root, revision);
    root.classList.remove('starter-assets-ready');
    decorateSummary(root);

    const ready = await settleImages(root);
    await new Promise(resolve => setTimeout(resolve, 120));
    await nextFrames();

    if (!root.isConnected || revisions.get(root) !== revision) return;
    const images = [...root.querySelectorAll('img')];
    const finalReady = ready && images.every(img => img.complete && (img.naturalWidth > 0 || img.naturalHeight > 0));
    if (finalReady) root.classList.add('starter-assets-ready');
    else queue(root, 120);
  };

  function queue(root, delay = 0) {
    if (!root) return;
    const existing = timers.get(root);
    if (existing) clearTimeout(existing);
    timers.set(root, setTimeout(() => prepare(root), delay));
  }

  const rootsFrom = node => {
    if (!node || node.nodeType !== 1) return [];
    const roots = new Set();
    if (node.matches?.(ROOT_SELECTOR)) roots.add(node);
    node.querySelectorAll?.(ROOT_SELECTOR).forEach(root => roots.add(root));
    const ancestor = node.closest?.(ROOT_SELECTOR);
    if (ancestor) roots.add(ancestor);
    return [...roots];
  };

  const observer = new MutationObserver(mutations => {
    const roots = new Set();
    for (const mutation of mutations) {
      const targetRoot = mutation.target?.closest?.(ROOT_SELECTOR);
      if (targetRoot) roots.add(targetRoot);
      mutation.addedNodes?.forEach(node => rootsFrom(node).forEach(root => roots.add(root)));
    }
    roots.forEach(root => queue(root));
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'srcset']
  });

  document.querySelectorAll(ROOT_SELECTOR).forEach(root => queue(root));
})();
