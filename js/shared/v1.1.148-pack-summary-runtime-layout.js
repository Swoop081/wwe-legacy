/* v1.1.150 — deterministic five-card Pack Complete 2 / 1 / 2 layout + prestige-centre ranking. */
(() => {
  const important = (el, property, value) => {
    if (el instanceof HTMLElement) el.style.setProperty(property, value, "important");
  };

  const rarityScore = card => {
    for (let rarity = 5; rarity >= 1; rarity -= 1) {
      if (card.classList.contains(`rarity-${rarity}`)) return rarity;
    }
    return 0;
  };

  const tierScore = card => {
    if (card.classList.contains("tier-amethyst")) return 4;
    if (card.classList.contains("tier-ruby")) return 3;
    if (card.classList.contains("tier-sapphire")) return 2;
    if (card.classList.contains("tier-emerald")) return 1;
    return 0;
  };

  // Within the same star rarity, card identity decides the showcase pull.
  // Merch is intentionally always the weakest tie-breaker.
  const identityScore = card => {
    const face = card.querySelector(".ccg-card");
    if (!face) return card.querySelector(".up-card-replacement") ? 50 : 0;
    if (face.classList.contains("is-finisher")) return 900;
    if (face.classList.contains("type-superstar")) return 850;
    if (face.classList.contains("is-trademark")) return 800;
    if (face.classList.contains("is-signature")) return 750;
    if (face.classList.contains("type-entrance")) return 700;
    if (face.classList.contains("type-action")) return 600;
    if (face.classList.contains("type-manager")) return 500;
    if (face.classList.contains("type-move")) return 400;
    if (face.classList.contains("type-momentum")) return 300;
    if (face.classList.contains("type-merch")) return 100;
    return 200;
  };

  const centreScore = card => {
    const isNew = card.querySelector(".new-card-symbol") ? 1 : 0;
    return rarityScore(card) * 100000 + identityScore(card) * 100 + tierScore(card) * 10 + isNew;
  };

  const normalizeGrid = grid => {
    if (!(grid instanceof HTMLElement)) return;
    const cards = Array.from(grid.children).filter(
      el => el instanceof HTMLElement && el.classList.contains("pack-summary-card")
    );
    if (cards.length !== 5) return;

    important(grid, "display", "grid");
    important(grid, "grid-template-columns", "repeat(2,minmax(0,1fr))");
    important(grid, "grid-template-rows", "auto auto auto");
    important(grid, "grid-template-areas", "none");
    important(grid, "width", "100%");
    important(grid, "max-width", "390px");
    important(grid, "height", "auto");
    important(grid, "min-height", "0");
    important(grid, "column-gap", "12px");
    important(grid, "row-gap", "7px");
    important(grid, "align-items", "start");
    important(grid, "justify-items", "center");
    important(grid, "justify-content", "center");
    important(grid, "margin", "4px auto 0");
    important(grid, "padding", "0");
    important(grid, "overflow", "visible");

    const centreCard = cards.reduce((best, card) => !best || centreScore(card) > centreScore(best) ? card : best, null);
    const outerCards = cards.filter(card => card !== centreCard);
    const ordered = [outerCards[0], outerCards[1], centreCard, outerCards[2], outerCards[3]];
    const positions = [
      ["1", "1"],
      ["2", "1"],
      ["1 / span 2", "2"],
      ["1", "3"],
      ["2", "3"]
    ];

    ordered.forEach((card, index) => {
      if (!(card instanceof HTMLElement)) return;
      const [column, row] = positions[index];
      important(card, "display", "block");
      card.style.removeProperty("grid-area");
      important(card, "grid-column", column);
      important(card, "grid-row", row);
      important(card, "width", "min(31vw,126px)");
      important(card, "min-width", "0");
      important(card, "max-width", "126px");
      important(card, "height", "auto");
      important(card, "min-height", "0");
      important(card, "margin", "0");
      important(card, "padding", "0");
      important(card, "position", "relative");
      important(card, "inset", "auto");
      important(card, "top", "auto");
      important(card, "right", "auto");
      important(card, "bottom", "auto");
      important(card, "left", "auto");
      important(card, "transform", "none");
      important(card, "translate", "none");
      important(card, "scale", "1");
      important(card, "justify-self", "center");
      important(card, "align-self", "start");

      const face = card.querySelector(".pack-summary-actual-card");
      important(face, "display", "block");
      important(face, "width", "100%");
      important(face, "max-width", "100%");
      important(face, "height", "auto");
      important(face, "aspect-ratio", "0.68");
      important(face, "margin", "0");
      important(face, "transform", "none");

      card.querySelectorAll(".pack-summary-badges").forEach(el => important(el, "display", "none"));
    });

    grid.closest(".streamlined-pack-summary")
      ?.querySelectorAll(".pack-summary-key")
      .forEach(el => important(el, "display", "none"));
  };

  const scan = root => {
    if (!(root instanceof Element)) return;
    if (root.matches(".streamlined-pack-summary .pack-summary-grid")) normalizeGrid(root);
    root.querySelectorAll(".streamlined-pack-summary .pack-summary-grid").forEach(normalizeGrid);
  };

  const start = () => {
    scan(document.documentElement);
    new MutationObserver(records => {
      for (const record of records) {
        record.addedNodes.forEach(node => {
          if (node instanceof Element) scan(node);
        });
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();