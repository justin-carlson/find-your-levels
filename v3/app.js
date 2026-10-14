(() => {
  const pages = [...document.querySelectorAll('.page')];
  const sidebar = document.querySelector('.sidebar');
  const menuButton = document.querySelector('.menu-toggle');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const themeButton = document.querySelector('.theme-toggle');
  const main = document.querySelector('main');
  const progress = document.querySelector('.reading-progress');
  const chapterLinks = [...document.querySelectorAll('[data-chapter]')];
  const mobile = matchMedia('(max-width: 899px)');
  const sectionAliases = new Map([
    ['setup-4-the-curl', 'setup-1-the-curl'],
    ['setup-1-break-and-retest', 'setup-2-break-and-retest'],
    ['setup-2-failed-breakdown-and-reclaim', 'setup-3-failed-breakdown-and-reclaim'],
    ['setup-3-the-ema-pullback', 'setup-4-the-ema-pullback'],
    ['confluence-trend-lines-channels', 'where-references-overlap'],
    ['m5-confluence-trend-lines-and-channels', 'where-references-overlap'],
    ['m7-compression-and-expansion-the-cycle-behind-the-setups', 'understanding-compression-and-expansion'],
    ['m7-understanding-compression-and-expansion', 'understanding-compression-and-expansion'],
    ['m5-ascending-and-descending-trend-lines', 'ascending-and-descending-trend-lines'],
    ['m5-reading-a-channel', 'reading-a-channel'],
    ['m5-compression-and-expansion-the-cycle-behind-the-setups', 'understanding-compression-and-expansion'],
    ['m5-understanding-compression-and-expansion', 'understanding-compression-and-expansion'],
    ['m5-how-the-trading-day-changes', 'how-the-trading-day-changes'],
  ]);
  let sectionLinks = [];
  let sectionHeadings = [];
  let scrollFramePending = false;

  function updateSection() {
    let current = sectionHeadings[0];
    for (const heading of sectionHeadings) {
      if (heading.getBoundingClientRect().top > 150) break;
      current = heading;
    }
    sectionLinks.forEach(link => {
      if (link.hash === `#${current?.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${scrollable > 0 ? Math.min(100, scrollY / scrollable * 100) : 0}%`;
  }

  function closeMenu(restoreFocus = false) {
    sidebar.removeAttribute('data-open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
    main.inert = false;
    if (restoreFocus) menuButton.focus();
  }

  // Preserve renamed or moved sections before falling back to legacy chapter links.
  function legacyTarget(id) {
    const alias = sectionAliases.get(id);
    if (alias) return document.getElementById(alias);
    const chapter = /^(m\d)(?:-|$)/.exec(id)?.[1];
    if (!chapter) return null;
    return document.querySelector(`[data-legacy="${CSS.escape(id)}"]`) || document.querySelector(`.page[data-legacy="${chapter}"]`);
  }

  function showPage(moveFocus = false) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { id = ''; }
    if (id === 'main') { main.focus({ preventScroll: true }); return; }
    let target = document.getElementById(id);
    if (!target && (target = legacyTarget(id))) history.replaceState(null, '', `#${target.id}`);
    const active = target?.closest('.page') || pages.find(page => page.id !== 'overview');
    pages.forEach(page => page.toggleAttribute('data-active', page === active));
    chapterLinks.forEach(link => {
      if (link.dataset.chapter === active.id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = `${active.dataset.title} · Find Your Levels`;
    closeMenu();
    document.querySelectorAll('.mobile-toc[open]').forEach(toc => { toc.open = false; });
    const heading = target && target !== active ? target : active.querySelector('h1');
    if (heading === active.querySelector('h1')) window.scrollTo(0, 0);
    else heading.scrollIntoView({ block: 'start' });
    if (moveFocus) heading.focus({ preventScroll: true });
    sectionLinks = [...active.querySelectorAll('.page-toc a')];
    sectionHeadings = sectionLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
    updateSection();
    updateProgress();
  }

  window.addEventListener('scroll', () => {
    if (scrollFramePending) return;
    scrollFramePending = true;
    requestAnimationFrame(() => { updateSection(); updateProgress(); scrollFramePending = false; });
  }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  menuButton.addEventListener('click', () => {
    if (sidebar.hasAttribute('data-open')) return closeMenu(true);
    sidebar.setAttribute('data-open', '');
    document.body.classList.add('menu-open');
    menuButton.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
    main.inert = true;
    (sidebar.querySelector('[aria-current]') || chapterLinks[0]).focus();
  });
  backdrop.addEventListener('click', () => closeMenu(true));
  document.addEventListener('keydown', event => {
    if (!sidebar.hasAttribute('data-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
    if (event.key === 'Tab') {
      const first = chapterLinks[0];
      const last = chapterLinks.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobile.addEventListener('change', () => closeMenu());

  function syncTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton.querySelector('span').textContent = dark ? 'Light' : 'Dark';
  }
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('fyl-v3-theme', theme); } catch { /* Reading remains available without storage. */ }
    syncTheme();
  });
  window.addEventListener('hashchange', () => showPage(true));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hash === '#main') return;
    if (link.hash === location.hash) { event.preventDefault(); showPage(true); }
  });
  syncTheme();
  showPage();
})();
