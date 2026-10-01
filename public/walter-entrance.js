(() => {
  const entrance = document.getElementById('walter-entrance');
  const frame = document.getElementById('intro-frame');
  if (!entrance || !frame) return;

  const counterBell = document.getElementById('bell');
  counterBell?.addEventListener('click', () => {
    counterBell.classList.remove('ring-once');
    void counterBell.offsetWidth;
    counterBell.classList.add('ring-once');
    window.setTimeout(() => counterBell.classList.remove('ring-once'), 560);
  });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;
  let finished = false;
  const timers = [];
  const later = (fn, ms) => timers.push(window.setTimeout(fn, ms));

  function reveal() {
    if (finished) return;
    document.documentElement.classList.add('walter-site-visible');
    entrance.classList.add('done');
  }

  function finish({ focus = false } = {}) {
    if (finished) return;
    reveal();
    finished = true;
    timers.forEach(window.clearTimeout);
    document.documentElement.classList.remove('walter-entering');
    entrance.hidden = true;
    if (focus) document.querySelector('#landing h1')?.focus({ preventScroll: true });
  }

  function begin() {
    if (started || finished) return;
    started = true;
    if (reduced.matches) {
      frame.contentWindow?.postMessage({ type: 'walter-freeze' }, location.origin);
      frame.contentWindow?.postMessage({ type: 'walter-bell-dissolve' }, location.origin);
      later(() => finish({ focus: true }), 90);
      return;
    }
    later(() => {
      frame.contentWindow?.postMessage({ type: 'walter-freeze' }, location.origin);
      frame.contentWindow?.postMessage({ type: 'walter-bell-dissolve' }, location.origin);
    }, 390);
    later(reveal, 660);
    later(() => finish({ focus: true }), 1650);
  }

  window.addEventListener('message', event => {
    if (event.source !== frame.contentWindow || event.origin !== location.origin) return;
    if (event.data?.type === 'walter-intro-start') begin();
    if (event.data?.type === 'walter-intro-ready' && !started) finish();
  });
  frame.addEventListener('error', () => finish());
  window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
  document.documentElement.classList.add('walter-entrance-ready');
  if (new URLSearchParams(location.search).has('page')) finish();
  later(() => finish(), 10000);
})();
