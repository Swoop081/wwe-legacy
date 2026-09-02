/* WWE Legacy v1.1.133 — onboarding brand readiness + roster reveal decoration */
(() => {
  const LEGACY_LOGO = "./assets/images/branding-wwe-legacy-series-logo.png?v=1.1.133";

  // Start the Legacy logo request immediately so the fourth screen is already warm.
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = LEGACY_LOGO;
  } catch {}

  let releaseToken = 0;

  const releaseBrandScreenWhenReady = async () => {
    const body = document.body;
    if (!body?.dataset?.starterOnboarding || body.dataset.starterOnboarding === "summary") {
      body?.classList.remove("starter-brand-ready");
      return;
    }

    const token = ++releaseToken;
    body.classList.remove("starter-brand-ready");
    const shell = document.querySelector(".starter-onboarding-shell");
    if (!shell) return;

    // The selection screen's large brand mark is the only image near the top of
    // the shell. Wait for it (and any immediately-created logo image) to decode,
    // then reveal the complete screen at once. This removes the visible pop-in.
    const images = Array.from(shell.querySelectorAll("img")).filter((img) => {
      const box = img.getBoundingClientRect();
      return box.top < Math.max(innerHeight * .48, 360);
    });

    if (!images.length) {
      requestAnimationFrame(() => {
        if (token === releaseToken) body.classList.add("starter-brand-ready");
      });
      return;
    }

    const ready = images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      if (typeof img.decode === "function") return img.decode().catch(() => undefined);
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    });

    // Never leave onboarding hidden if a remote brand host stalls.
    await Promise.race([
      Promise.allSettled(ready),
      new Promise((resolve) => setTimeout(resolve, 900))
    ]);

    if (token !== releaseToken) return;
    requestAnimationFrame(() => body.classList.add("starter-brand-ready"));
  };

  const decorateSummary = () => {
    const summary = document.querySelector(".starter-roster-summary");
    if (!summary || summary.dataset.legacyReveal === "1") return;
    summary.dataset.legacyReveal = "1";

    const brand = document.createElement("div");
    brand.className = "starter-roster-summary-brand";
    brand.innerHTML = `<img src="${LEGACY_LOGO}" alt="WWE Legacy">`;
    summary.prepend(brand);

    const title = summary.querySelector(".starter-roster-summary-title");
    if (title) {
      title.innerHTML = `
        <span class="starter-roster-summary-kicker">STARTING ROSTER · COMPLETE</span>
        <span class="starter-roster-summary-heading">HERE’S YOUR<br>STARTING ROSTER</span>
      `;
    }
  };

  const sync = () => {
    if (document.body?.dataset?.starterOnboarding === "summary") {
      document.body.classList.add("starter-brand-ready");
      decorateSummary();
    } else {
      releaseBrandScreenWhenReady();
    }
  };

  const observer = new MutationObserver(sync);
  const start = () => {
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-starter-onboarding"]
    });
    sync();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
