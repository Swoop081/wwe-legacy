// WWE Legacy Card Studio — Money in the Bank chase-set presentation v1.1.222
(() => {
  const SET_ID = "money-in-the-bank";
  const BACKGROUND = "assets/images/money-in-the-bank-background.jpg";
  const LOGO = "assets/images/money-in-the-bank-logo.png";

  // Match the Premiere set-logo footprint exactly.
  SET_LOGO_ASSETS[SET_ID] = LOGO;
  SET_LOGO_SAFE_PROFILES[SET_ID] = {
    maxW: SET_LOGO_SAFE_PROFILES.premiere.maxW,
    maxH: SET_LOGO_SAFE_PROFILES.premiere.maxH
  };

  // Keep the existing renderer intact for every other set, but allow this chase
  // set to use its supplied photographic background in preview and export.
  const previousDrawTemplate = drawTemplate;
  drawTemplate = function () {
    const card = currentCard();
    const set = card?.setId || $("#set-select").value;
    if (set !== SET_ID) return previousDrawTemplate();

    const w = canvas.width, h = canvas.height;
    const im = state.setBackgrounds.get(SET_ID);
    if (im) {
      const iw = im.naturalWidth || im.width;
      const ih = im.naturalHeight || im.height;
      const k = Math.max(w / iw, h / ih);
      const dw = iw * k, dh = ih * k;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
      return;
    }

    // Safe fallback while the image is still loading.
    drawMoneyInTheBank(ctx, w, h);
  };

  async function loadMoneyInTheBankPresentation() {
    try {
      const [background, logo] = await Promise.all([
        loadImage(assetUrl(BACKGROUND)),
        loadStudioSetLogo(assetUrl(LOGO), SET_ID)
      ]);
      if (background) state.setBackgrounds.set(SET_ID, background);
      if (logo) state.setLogos.set(SET_ID, logo);
      draw();
    } catch (error) {
      console.warn("[WWE Legacy Card Studio] Money in the Bank presentation failed to load", error);
      draw();
    }
  }

  loadMoneyInTheBankPresentation();
})();
