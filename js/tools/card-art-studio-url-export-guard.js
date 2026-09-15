// WWE Legacy Card Art Studio — production URL export + text cleanup
// URL artwork is converted to a same-page File before the established Studio
// artwork handler sees it. This prevents a remote image from tainting the
// finished-front canvas while preserving the normal local-file export path.
(() => {
  const cleanText = value => String(value || '')
    .replace(/Darby[’']s\s+/gi, '')
    .replace(/Darby\s*·\s*/gi, '')
    .replace(/\bDarby\b/gi, '');

  const scrub = root => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const next = cleanText(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    }
  };

  scrub(document.body);
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') {
        const next = cleanText(record.target.nodeValue);
        if (next !== record.target.nodeValue) record.target.nodeValue = next;
      }
      for (const node of record.addedNodes || []) {
        if (node.nodeType === Node.TEXT_NODE) {
          const next = cleanText(node.nodeValue);
          if (next !== node.nodeValue) node.nodeValue = next;
        } else if (node.nodeType === Node.ELEMENT_NODE) scrub(node);
      }
    }
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true });

  const urlInput = document.getElementById('art-url');
  const loadButton = document.getElementById('load-art-url');
  const fileInput = document.getElementById('art-file');
  const urlStatus = document.getElementById('url-status');

  const setStatus = (text, state = '') => {
    if (!urlStatus) return;
    urlStatus.textContent = text;
    if (state) urlStatus.dataset.exportSafety = state;
  };

  const proxyCandidates = sourceUrl => {
    const raw = String(sourceUrl || '').trim();
    const noScheme = raw.replace(/^https?:\/\//i, '');
    return [
      `https://images.weserv.nl/?url=${encodeURIComponent(noScheme)}&output=webp`,
      `https://images.weserv.nl/?url=${encodeURIComponent(raw)}&output=webp`
    ];
  };

  async function fetchExportSafeBlob(sourceUrl) {
    let lastError = null;
    for (const proxyUrl of proxyCandidates(sourceUrl)) {
      try {
        const response = await fetch(proxyUrl, {
          mode: 'cors',
          credentials: 'omit',
          cache: 'no-store'
        });
        if (!response.ok) throw new Error(`proxy HTTP ${response.status}`);
        const blob = await response.blob();
        if (!blob.size || !String(blob.type || '').startsWith('image/')) {
          throw new Error('proxy did not return an image');
        }
        return blob;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error('URL artwork proxy failed');
  }

  async function loadUrlAsLocalArtwork(event) {
    const sourceUrl = String(urlInput?.value || '').trim();
    if (!/^https?:\/\//i.test(sourceUrl) || !fileInput) return;

    // This handler runs in capture phase so the old URL loader never gets a
    // chance to place the cross-origin source into the export canvas.
    event.preventDefault();
    event.stopImmediatePropagation();
    loadButton.disabled = true;
    setStatus('Preparing URL artwork for export…', 'checking');

    try {
      const blob = await fetchExportSafeBlob(sourceUrl);
      const filename = `url-artwork-${Date.now()}.webp`;
      const file = new File([blob], filename, { type: blob.type || 'image/webp' });
      const transfer = new DataTransfer();
      transfer.items.add(file);
      fileInput.files = transfer.files;
      fileInput.dispatchEvent(new Event('change', { bubbles: true }));
      setStatus('URL artwork loaded as an export-safe local copy.', 'safe');
    } catch (error) {
      console.error('[Card Studio] URL artwork proxy failed', error);
      setStatus('URL artwork could not be converted for export. Try the URL again or choose the image file directly.', 'error');
    } finally {
      loadButton.disabled = false;
    }
  }

  if (urlInput && loadButton && fileInput) {
    loadButton.addEventListener('click', loadUrlAsLocalArtwork, true);
  }

  globalThis.WWE_LEGACY_CARD_STUDIO_PRODUCTION_HOTFIX = Object.freeze({
    version: '1.1.202',
    urlArtworkConvertedToLocalBlob: true,
    personalWorkflowNamesRemoved: true
  });
})();
