// WWE Legacy v1.1.48 presentation hotfix — solid-white move names + slightly wider Method-dot spacing.
// This wrapper is intentionally data-only: it preserves all existing plaque Y positions and the shared vector glyph renderer.
(function (global) {
  "use strict";
  const base = global.WWELegacyCardFaceRenderer;
  if (!base || base.__moveReadabilityHotfix) return;

  const BASE_W = Number(base.BASE_W || 680);
  const BASE_H = Number(base.BASE_H || 1000);

  function requirementCount(card) {
    if (card?.kind !== "move" || card?.finisher) return 0;
    return Object.values(card?.requirements || {}).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  }

  function withWiderRequirementDots(ctx, card, width, height, draw) {
    const count = requirementCount(card);
    if (count < 2 || typeof ctx?.arc !== "function") return draw();

    const s = width / BASE_W;
    const r = 17.4 * s;
    const oldGap = 10 * s;
    const newGap = 14 * s;
    const y = height * .866;
    const oldTotal = count * (r * 2) + (count - 1) * oldGap;
    const newTotal = count * (r * 2) + (count - 1) * newGap;
    const oldStart = width * .5 - oldTotal / 2 + r;
    const newStart = width * .5 - newTotal / 2 + r;
    const shifts = Array.from({ length: count }, (_, i) => ({
      oldX: oldStart + i * (r * 2 + oldGap),
      delta: (newStart + i * (r * 2 + newGap)) - (oldStart + i * (r * 2 + oldGap))
    }));

    const originalArc = ctx.arc;
    ctx.arc = function (x, yy, rr, ...rest) {
      let adjustedX = x;
      for (const item of shifts) {
        const mainDot = Math.abs(x - item.oldX) <= .8 * s && Math.abs(yy - y) <= .8 * s && Math.abs(rr - r) <= .8 * s;
        const highlight = Math.abs(x - (item.oldX - r * .26)) <= .8 * s && Math.abs(yy - (y - r * .28)) <= .8 * s && Math.abs(rr - r * .28) <= .8 * s;
        if (mainDot || highlight) { adjustedX = x + item.delta; break; }
      }
      return originalArc.call(this, adjustedX, yy, rr, ...rest);
    };
    try { return draw(); }
    finally { ctx.arc = originalArc; }
  }

  function drawFace(ctx, card, opts = {}) {
    const width = Number(opts.width || BASE_W);
    const height = Number(opts.height || BASE_H);
    const result = withWiderRequirementDots(ctx, card, width, height, () => base.drawFace(ctx, card, opts));

    // Repaint only the move-name band with the same shared vector glyph renderer,
    // forcing both ends of the existing title gradient to white. Nothing else moves.
    if (card?.kind === "move" && opts.drawInk !== false) {
      const originalTheme = opts.theme || base.themeForSet?.(card?.setId) || {};
      const whiteTitleTheme = { ...originalTheme, nameBottom: "#ffffff" };
      ctx.save();
      ctx.beginPath();
      ctx.rect(width * .08, height * .752, width * .84, height * .067);
      ctx.clip();
      base.drawFace(ctx, card, {
        ...opts,
        theme: whiteTitleTheme,
        drawPlaque: false,
        drawInk: true,
        drawStars: false
      });
      ctx.restore();
    }
    return result;
  }

  global.WWELegacyCardFaceRenderer = Object.freeze({
    ...base,
    drawFace,
    __moveReadabilityHotfix: true
  });
})(globalThis);
