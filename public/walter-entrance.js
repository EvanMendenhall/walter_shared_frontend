(() => {
  const entrance = document.getElementById('walter-entrance');
  const bell = document.getElementById('entrance-bell');
  const skip = document.getElementById('entrance-skip');
  if (!entrance || !bell || !skip) return;
  const counterBell = document.getElementById('bell');
  counterBell?.addEventListener('click', () => {
    counterBell.classList.remove('ring-once');
    void counterBell.offsetWidth;
    counterBell.classList.add('ring-once');
    window.setTimeout(() => counterBell.classList.remove('ring-once'), 560);
  });

  let finished = false;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function finish() {
    if (finished) return;
    finished = true;
    document.documentElement.classList.add('walter-site-visible');
    document.documentElement.classList.remove('walter-entering');
    entrance.hidden = true;
    document.querySelector('#landing h1')?.focus({ preventScroll: true });
  }
  function enter() {
    if (finished || entrance.classList.contains('is-opening')) return;
    if (reduced.matches) { finish(); return; }
    entrance.classList.add('is-opening');
    window.setTimeout(finish, 950);
  }
  bell.addEventListener('click', enter);
  skip.addEventListener('click', finish);
  window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
  window.setTimeout(() => { if (!document.documentElement.classList.contains('walter-entrance-ready')) finish(); }, 4500);
  document.documentElement.classList.add('walter-entrance-ready');
  if (new URLSearchParams(location.search).has('page')) finish();
})();
