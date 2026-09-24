// WWE Legacy Card Studio — set presentation + Premiere Superstar base-plate export v1.1.226
(() => {
  const SET_ID = "money-in-the-bank";
  const BACKGROUND = "assets/images/money-in-the-bank-background.jpg";
  const LOGO = "assets/images/money-in-the-bank-logo.png";
  const PREMIERE_BACKGROUND = "assets/images/premiere-background.jpg";

  // Match the Premiere set-logo footprint exactly.
  SET_LOGO_ASSETS[SET_ID] = LOGO;
  SET_LOGO_SAFE_PROFILES[SET_ID] = {
    maxW: SET_LOGO_SAFE_PROFILES.premiere.maxW,
    maxH: SET_LOGO_SAFE_PROFILES.premiere.maxH
  };

  // Lift the MITB overlay logo only; leave shared Card Studio rendering untouched.
  SET_LOGO_SAFE_PROFILES[SET_ID].top = .018;

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

  // Premiere Superstar cards return to the original production workflow:
  // Card Studio bakes the Premiere background + positioned Superstar artwork
  // into the saved base plate. Runtime overlays (stars, text and set logo) remain
  // outside that saved image.
  const previousDrawTemplateWithMitb = drawTemplate;
  drawTemplate = function () {
    const card = currentCard();
    if (card?.setId !== "premiere" || card?.kind !== "superstar") {
      return previousDrawTemplateWithMitb();
    }

    const w = canvas.width, h = canvas.height;
    const im = state.setBackgrounds.get("premiere");
    if (!im) return previousDrawTemplateWithMitb();

    const iw = im.naturalWidth || im.width;
    const ih = im.naturalHeight || im.height;
    const k = Math.max(w / iw, h / ih);
    const dw = iw * k, dh = ih * k;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  async function loadMoneyInTheBankPresentation() {
    try {
      const [background, logo, premiereBackground] = await Promise.all([
        loadImage(assetUrl(BACKGROUND)),
        loadStudioSetLogo(assetUrl(LOGO), SET_ID),
        loadImage(assetUrl(PREMIERE_BACKGROUND))
      ]);
      if (background) state.setBackgrounds.set(SET_ID, background);
      if (logo) state.setLogos.set(SET_ID, logo);
      if (premiereBackground) state.setBackgrounds.set("premiere", premiereBackground);
      draw();
    } catch (error) {
      console.warn("[WWE Legacy Card Studio] Money in the Bank presentation failed to load", error);
      draw();
    }
  }

  loadMoneyInTheBankPresentation();
})();
