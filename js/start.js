'use strict';
(() => {
  const button = document.getElementById('startButton');
  const state = document.getElementById('swipe-btn');
  let navigationTimer = null;
  let starting = false;
  function reset() {
    window.clearTimeout(navigationTimer);
    navigationTimer = null;
    starting = false;
    state.checked = false;
    button.removeAttribute('aria-busy');
    button.setAttribute('aria-label', 'Nice to meet you. 进入个人主页');
  }
  // Restore the initial button state when returning with the browser's Back button.
  window.addEventListener('pageshow', reset);
  window.addEventListener('pagehide', () => window.clearTimeout(navigationTimer));
  button.addEventListener('click', (event) => {
    // Keep native link behavior for modified clicks and new tabs.
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (starting) { event.preventDefault(); return; }
    // Use the native link immediately when reduced motion is requested.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    starting = true;
    state.checked = true;
    button.setAttribute('aria-busy', 'true');
    button.setAttribute('aria-label', '正在进入个人主页');
    navigationTimer = window.setTimeout(() => window.location.assign(button.href), 1100);
  });
})();
