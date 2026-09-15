// WWE Legacy Card Art Studio — production text cleanup
// Keep URL/export handling owned by the proven Card Studio core runtime.
// This file intentionally does not intercept, disable, or replace export controls.
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

  globalThis.WWE_LEGACY_CARD_STUDIO_PRODUCTION_HOTFIX = Object.freeze({
    version: '1.1.201',
    exportGuardInterceptionRemoved: true,
    personalWorkflowNamesRemoved: true
  });
})();
