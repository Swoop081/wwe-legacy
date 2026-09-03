// v1.1.163 — refresh selected menu/mode imagery from official WWE Superstar pages.
const PAIGE_WWE = "https://www.wwe.com/f/styles/talent_champion_lg/public/2026/07/paige_PROFILE.png";
const TIFFANY_WWE = "https://www.wwe.com/f/styles/talent_champion_lg/public/2026/05/Tiffany_Stratton_PROFILE%202.png";

function setImage(container, src, alt, extraClass = "") {
  if (!container) return;
  let img = container.querySelector("img");
  if (!img) {
    img = document.createElement("img");
    container.replaceChildren(img);
  }
  img.src = src;
  img.alt = alt;
  img.loading = "eager";
  img.decoding = "async";
  img.referrerPolicy = "no-referrer-when-downgrade";
  img.className = `${img.className || ""} ${extraClass}`.trim();
}

function applyWwePhotoRefresh(root = document) {
  const collectionTile = root.querySelector?.("#menu-owned-collection") || document.querySelector("#menu-owned-collection");
  if (collectionTile) {
    const photo = collectionTile.querySelector(".legacy-command-photo");
    setImage(photo, PAIGE_WWE, "Paige", "v1163-paige-menu-photo");
  }

  const mitb = root.querySelector?.("#play-ladder") || document.querySelector("#play-ladder");
  if (mitb) {
    const photo = mitb.querySelector(".legacy-mode-superstar");
    if (photo) {
      photo.classList.remove("legacy-mode-set-logo");
      setImage(photo, TIFFANY_WWE, "Tiffany Stratton", "official-menu-superstar-photo v1163-tiffany-mitb-photo");
    }
  }
}

function start() {
  applyWwePhotoRefresh(document);
  new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node.nodeType === 1) applyWwePhotoRefresh(node);
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
