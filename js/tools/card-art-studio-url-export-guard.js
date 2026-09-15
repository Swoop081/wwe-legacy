// WWE Legacy Card Art Studio — URL artwork export guard
// URL artwork may preview even when its origin does not permit canvas export.
(() => {
  const urlInput = document.getElementById('art-url');
  const loadButton = document.getElementById('load-art-url');
  const fileInput = document.getElementById('art-file');
  const currentButton = document.getElementById('use-current-art');
  const clearButton = document.getElementById('clear-art');
  const status = document.getElementById('url-status');
  const exportButton = document.getElementById('export-webp');
  const shareButton = document.getElementById('share-card');
  if (!urlInput || !loadButton || !status) return;

  let urlExportState = 'none'; // none | checking | safe | preview-only
  let checkedUrl = '';

  const setExportButtons = blocked => {
    for (const button of [exportButton, shareButton]) {
      if (!button) continue;
      button.disabled = !!blocked;
      button.setAttribute('aria-disabled', blocked ? 'true' : 'false');
      if (blocked) button.title = 'URL artwork is preview-only because its source does not permit canvas export. Choose the artwork as a local file to export.';
      else button.removeAttribute('title');
    }
  };

  const resetGuard = () => {
    urlExportState = 'none';
    checkedUrl = '';
    setExportButtons(false);
  };

  const markPreviewOnly = () => {
    urlExportState = 'preview-only';
    setExportButtons(true);
    status.textContent = 'Preview only — this image host does not allow browser canvas export. The artwork can still be positioned and previewed here. To export the finished card, save the image locally and choose it with the artwork file picker.';
    status.dataset.exportSafety = 'preview-only';
  };

  const markSafe = () => {
    urlExportState = 'safe';
    setExportButtons(false);
    status.textContent = 'URL artwork loaded · export-safe';
    status.dataset.exportSafety = 'safe';
  };

  async function testCors(url) {
    try {
      const response = await fetch(url, { mode: 'cors', credentials: 'omit', cache: 'no-store' });
      if (!response.ok || response.type === 'opaque') return false;
      const type = String(response.headers.get('content-type') || '').toLowerCase();
      if (type && !type.startsWith('image/')) return false;
      const blob = await response.blob();
      if (!blob.size) return false;
      const objectUrl = URL.createObjectURL(blob);
      try {
        await new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = objectUrl;
        });
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  loadButton.addEventListener('click', async () => {
    const url = String(urlInput.value || '').trim();
    if (!/^https?:\/\//i.test(url)) return;
    checkedUrl = url;
    urlExportState = 'checking';
    setExportButtons(true);
    status.textContent = 'Checking URL export permission…';
    status.dataset.exportSafety = 'checking';
    const safe = await testCors(url);
    if (checkedUrl !== url) return;
    if (safe) markSafe(); else markPreviewOnly();
  });

  fileInput?.addEventListener('change', () => {
    if (!fileInput.files?.length) return;
    resetGuard();
    status.textContent = 'Local artwork selected · export-safe';
    status.dataset.exportSafety = 'safe';
  });
  currentButton?.addEventListener('click', resetGuard);
  clearButton?.addEventListener('click', resetGuard);

  // Hard guard as well as disabled buttons, so keyboard/programmatic activation
  // cannot reach the old late canvas-security failure.
  document.addEventListener('click', event => {
    const target = event.target?.closest?.('#export-webp, #share-card');
    if (!target || urlExportState !== 'preview-only') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    markPreviewOnly();
  }, true);
})();
