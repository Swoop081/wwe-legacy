// v1.1.158 — explicit drag-to-scroll fallback for the fixed premium bottom rail on iPhone Safari.
(() => {
  const nav = document.getElementById('mobile-game-nav');
  if (!nav || nav.dataset.swipeHardfix === '1') return;
  nav.dataset.swipeHardfix = '1';

  let active = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let startScroll = 0;

  nav.addEventListener('touchstart', event => {
    const touch = event.touches?.[0];
    if (!touch) return;
    active = true;
    moved = false;
    startX = touch.clientX;
    startY = touch.clientY;
    startScroll = nav.scrollLeft;
  }, { passive: true });

  nav.addEventListener('touchmove', event => {
    if (!active) return;
    const touch = event.touches?.[0];
    if (!touch) return;
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (Math.abs(dx) <= Math.abs(dy) || Math.abs(dx) < 3) return;
    moved = true;
    nav.scrollLeft = startScroll - dx;
    event.preventDefault();
  }, { passive: false });

  nav.addEventListener('touchend', () => { active = false; }, { passive: true });
  nav.addEventListener('touchcancel', () => { active = false; }, { passive: true });

  nav.addEventListener('click', event => {
    if (!moved) return;
    moved = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
})();
