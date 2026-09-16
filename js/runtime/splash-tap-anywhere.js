// Launch splash interaction: the poster itself is the only visible UI.
// Preserve the app's existing launch action, but expand its hit target to the full viewport.
function armLaunchSplash() {
  const splash = document.querySelector('.launch-poster-splash, .boot-launch-poster');
  if (!splash || splash.dataset.tapAnywhereArmed === '1') return;

  const action = splash.querySelector('button, [role="button"], a');
  if (!action) return;

  splash.dataset.tapAnywhereArmed = '1';
  splash.style.cursor = 'pointer';
  action.setAttribute('aria-label', 'Enter WWE Legacy');
  Object.assign(action.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    margin: '0',
    padding: '0',
    border: '0',
    background: 'transparent',
    opacity: '0',
    zIndex: '20',
    cursor: 'pointer'
  });
}

armLaunchSplash();
const observer = new MutationObserver(armLaunchSplash);
observer.observe(document.querySelector('#game') ?? document.body, { childList: true, subtree: true });
