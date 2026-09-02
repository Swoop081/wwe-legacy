/* WWE Legacy v1.1.64 — Play page portrait replacements.
   v1.1.63 targeted a class that does not exist on the live Play banners.
   Target the actual legacy-mode-superstar images rendered by app.js. */
(() => {
  const IYO_SKY_WWE = "https://www.wwe.com/f/styles/talent_champion_lg/public/all/2024/07/IyoSky_01282024RF_2393_Profile--57f7b2018f8d8b3f8e8407cfa6fc3f7c.png";
  const BRET_HART_WWE = "https://www.wwe.com/f/styles/talent_champion_lg/public/rd-talent/Profile/Bret_Hart_pro.png";
  const OBSOLETE_STARTER_READY_MESSAGE = "Your RAW, SmackDown and NXT starters are ready.";

  const replacePortrait = (selector, src, alt, key) => {
    const image = document.querySelector(selector);
    if (!image || image.dataset.playPortraitV1164 === key) return;

    const fallback = image.currentSrc || image.src;
    image.dataset.playPortraitV1164 = key;
    image.alt = alt;
    image.removeAttribute("data-portrait-fallbacks");
    image.onerror = () => {
      image.onerror = null;
      if (fallback) image.src = fallback;
    };
    image.src = src;
  };

  const removeObsoleteStarterReadyMessage = () => {
    document.querySelectorAll(".legacy-home-message").forEach(node => {
      if (node.textContent.trim() === OBSOLETE_STARTER_READY_MESSAGE) node.remove();
    });
  };

  const patch = () => {
    replacePortrait("#play-exhibition .legacy-mode-superstar img", IYO_SKY_WWE, "IYO SKY", "iyo-sky");
    replacePortrait("#play-kotr .legacy-mode-superstar img", BRET_HART_WWE, "Bret Hart", "bret-hart");
    removeObsoleteStarterReadyMessage();
  };

  patch();
  const observer = new MutationObserver(patch);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
