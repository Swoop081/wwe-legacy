/* WWE Legacy v1.1.63 — Play page portrait replacements only.
   Exhibition: IYO SKY (official WWE.com Superstar profile art)
   King of the Ring: Bret Hart (official WWE.com Superstar profile art)
   Live Events Cody Rhodes remains unchanged. */
(() => {
  const IYO_SKY_WWE = "https://www.wwe.com/f/styles/talent_champion_lg/public/all/2024/07/IyoSky_01282024RF_2393_Profile--57f7b2018f8d8b3f8e8407cfa6fc3f7c.png";
  const BRET_HART_WWE = "https://www.wwe.com/f/styles/talent_champion_lg/public/rd-talent/Profile/Bret_Hart_pro.png";

  const replacePortrait = (selector, src, alt, key) => {
    const image = document.querySelector(selector);
    if (!image || image.dataset.playPortraitV1163 === key) return;

    const fallback = image.currentSrc || image.src;
    image.dataset.playPortraitV1163 = key;
    image.alt = alt;
    image.removeAttribute("data-portrait-fallbacks");
    image.onerror = () => {
      image.onerror = null;
      if (fallback) image.src = fallback;
    };
    image.src = src;
  };

  const patch = () => {
    replacePortrait("#play-exhibition .play-path-image", IYO_SKY_WWE, "IYO SKY", "iyo-sky");
    replacePortrait("#play-kotr .play-path-image", BRET_HART_WWE, "Bret Hart", "bret-hart");
  };

  patch();
  const observer = new MutationObserver(patch);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
