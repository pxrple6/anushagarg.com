// ── Bookshelf intro (index.html only) ──────────────────────
// A shelf of books; one is pulled out, turned to its cover, opened,
// and the first page becomes the home page.
(function () {
  const root = document.documentElement;
  const intro = document.getElementById('shelfIntro');
  if (!intro || root.classList.contains('no-intro')) {
    if (intro) intro.remove();
    return;
  }

  // Small seeded random so the shelf looks the same on every visit
  let seed = 11;
  const rand = () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pick = arr => arr[Math.floor(rand() * arr.length)];

  const cloth = [
    '#8E1F4F', '#2C4234', '#22304A', '#C7708F', '#6B3A5B', '#F1CFDB',
    '#335A5C', '#4E3142', '#A34A72', '#454E57', '#7D5A86', '#5E1F3E',
    '#1D2722', '#D9A3B8', '#3A2236', '#6E2648', '#283A2C'
  ];
  const lightCloth = ['#F1CFDB', '#D9A3B8', '#C7708F'];
  const titles = [
    'Poems', 'Annadatri', 'Geneva', 'Field Notes', 'Deutsch A2', 'Code Craft',
    'Constellations', 'Letters', 'Air Guitar', 'Ahaar', 'Climate', 'Essays',
    'Sketchbook', 'Orations', 'IBDP', 'Night Sky', 'Margins', 'Drafts'
  ];

  // each title used once; the rest of the spines stay blank
  const titlePool = titles.slice();
  const nextTitle = () => titlePool.length ? titlePool.splice(Math.floor(rand() * titlePool.length), 1)[0] : '';

  const bookcase = intro.querySelector('.bookcase');
  const caseW = bookcase.clientWidth - 36;
  const small = window.innerWidth < 600;
  const shelfH = Math.round(Math.max(130, Math.min(210, (window.innerHeight - 150) / 3 - 16)));
  bookcase.style.setProperty('--shelf-h', shelfH + 'px');

  function makeSpine(h, w, color, title, variant) {
    const el = document.createElement('div');
    el.className = 'spine';
    el.style.setProperty('--h', h + 'px');
    el.style.setProperty('--w', w + 'px');
    el.style.setProperty('--c', color);
    if (rand() < 0.55) el.style.setProperty('--band', (3 + Math.floor(rand() * 5)) + 'px');
    if (lightCloth.includes(color)) {
      el.style.setProperty('--t', 'rgba(50,18,36,0.75)');
      el.style.setProperty('--foil', 'rgba(70,25,50,0.45)');
    }
    if (variant !== false) {
      const r = rand();
      if (w >= 26 && r < 0.22) el.classList.add('ribbed');
      else if (title && w >= 26 && r < 0.42) el.classList.add('labelled');
      else if (w < 26 && r < 0.6) el.classList.add('paper');
    }
    if (title && w >= 24) {
      const s = document.createElement('span');
      s.textContent = title;
      el.style.setProperty('--fs', Math.min(15, Math.max(10, w * 0.42)) + 'px');
      el.appendChild(s);
    }
    return el;
  }

  function decor(kind) {
    const el = document.createElement('div');
    if (kind === 'bookend') el.className = 'bookend';
    if (kind === 'plant') {
      el.className = 'plant';
      el.innerHTML = '<div class="leaf"></div><div class="leaf"></div><div class="leaf"></div><div class="leaf"></div><div class="leaf"></div><div class="pot"></div>';
    }
    if (kind === 'stack') {
      el.className = 'stack';
      const n = 3 + Math.floor(rand() * 2);
      for (let i = 0; i < n; i++) {
        const b = makeSpine(Math.round(14 + rand() * 8), Math.round((small ? 70 : 100) + rand() * 30 - i * 6), pick(cloth));
        b.classList.add('flat');
        el.appendChild(b);
      }
    }
    return el;
  }

  // Three shelves; the middle one holds the book that gets pulled
  const layouts = [
    { decorAt: 0.72, decor: 'plant' },
    { decorAt: 0.12, decor: 'bookend', target: 0.52 },
    { decorAt: 0.3, decor: 'stack' }
  ];
  let target = null;

  layouts.forEach(cfg => {
    const shelf = document.createElement('div');
    shelf.className = 'shelf';
    bookcase.appendChild(shelf);
    let used = 0, placedDecor = false, placedTarget = !cfg.target;
    const decorW = { plant: 72, bookend: 22, stack: small ? 120 : 150 }[cfg.decor];

    while (true) {
      const frac = used / caseW;
      if (!placedDecor && frac >= cfg.decorAt) {
        shelf.appendChild(decor(cfg.decor));
        used += decorW;
        placedDecor = true;
        continue;
      }
      if (!placedTarget && frac >= cfg.target) {
        target = makeSpine(Math.round(shelfH * 0.9), small ? 30 : 38, '#8E1F4F', 'Anusha Garg', false);
        target.style.setProperty('--band', '4px');
        target.classList.add('target');
        shelf.appendChild(target);
        used += (small ? 30 : 38) + 2;
        placedTarget = true;
        continue;
      }
      const w = Math.round((small ? 14 : 18) + rand() * (small ? 18 : 24));
      if (used + w + 2 > caseW - 4) break;
      const h = Math.round(shelfH * (0.6 + rand() * 0.3));
      const spine = makeSpine(h, w, pick(cloth), rand() < 0.5 ? nextTitle() : '');
      shelf.appendChild(spine);
      used += w + 2;
    }
    // last book on a shelf sometimes leans against the side
    const last = shelf.lastElementChild;
    if (last && last.classList.contains('spine') && rand() < 0.7) last.style.setProperty('--lean', '-7deg');
  });

  root.classList.add('intro-on');
  // the book opens on the first page, so always start at the top
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  const siteBg = getComputedStyle(document.body).backgroundColor;

  // ── The pulled book ──
  const book = document.createElement('div');
  book.className = 'book3d';
  book.innerHTML = `
    <div class="face b-back"></div>
    <div class="face b-spine"><span>Anusha Garg</span></div>
    <div class="face b-edge"></div>
    <div class="face b-top"></div>
    <div class="b-page"><div class="p-inner">
      <div class="p-kicker">Chapter one</div>
      <div class="p-name">Anusha<br>Garg</div>
      <div class="p-sub">Developer, researcher, poet. New Delhi.</div>
    </div></div>
    <div class="b-front-wrap"><div class="b-cover">
      <div class="b-cover-out">
        <div class="c-sub">Portfolio · 2026</div>
        <div><div class="c-title">Anusha<br>Garg</div><div class="c-rule"></div></div>
      </div>
      <div class="b-cover-in"></div>
    </div></div>`;

  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    try { sessionStorage.setItem('shelfSeen', '1'); } catch (e) {}
    intro.classList.add('done');
    root.classList.remove('intro-on');
    window.scrollTo(0, 0);
    setTimeout(() => intro.remove(), 800);
  }

  intro.querySelector('.intro-skip').addEventListener('click', finish);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' || e.key === 'Enter') finish(); });

  const wait = ms => new Promise(r => setTimeout(r, ms));

  async function play() {
    await wait(1100);
    if (finished) return;

    const r = target.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    const BH = Math.min(440, vh * 0.62, (vw - 48) / 0.68);
    const BW = BH * 0.68;
    const s = r.height / BH;
    const BD = Math.max(BW * 0.12, Math.min(BW * 0.3, r.width / s));
    book.style.setProperty('--bw', BW + 'px');
    book.style.setProperty('--bh', BH + 'px');
    book.style.setProperty('--bd', BD + 'px');
    intro.appendChild(book);

    const sx = r.left + r.width / 2 - BW / 2;
    const sy = r.top + r.height / 2 - BH / 2;
    const cx = vw / 2 - BW / 2;
    const cy = vh / 2 - BH / 2;
    const at = (x, y, extra) => `translate3d(${x}px, ${y}px, 0) ${extra}`;

    target.classList.add('pulled');

    // 1. finger on top of the spine, tip it out
    await book.animate([
      { transform: at(sx, sy, `scale(${s}) rotateY(90deg)`) },
      { transform: at(sx, sy, `scale(${s}) translateZ(30px) rotateY(90deg) rotateZ(0deg) rotateX(0deg)`), offset: 0.35 },
      { transform: at(sx, sy - 6, `scale(${s}) translateZ(40px) rotateY(90deg) rotateZ(-8deg)`) }
    ], { duration: 650, easing: 'ease-in-out', fill: 'forwards' }).finished;
    if (finished) return;

    // neighbours slump into the gap
    const next = target.nextElementSibling;
    if (next && next.classList.contains('spine')) next.style.setProperty('--lean', '-5deg');

    // 2. slide it out toward us
    await book.animate([
      { transform: at(sx, sy - 6, `scale(${s}) translateZ(40px) rotateY(90deg) rotateZ(-8deg)`) },
      { transform: at(sx, sy - 24, `scale(${s}) translateZ(260px) rotateY(80deg) rotateZ(-2deg)`) }
    ], { duration: 700, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }).finished;
    if (finished) return;

    // 3. bring it to the middle and turn it to its cover
    bookcase.animate([{ opacity: 1 }, { opacity: 0.18 }],
      { duration: 900, easing: 'ease-out', fill: 'forwards' });
    await book.animate([
      { transform: at(sx, sy - 24, `scale(${s}) translateZ(260px) rotateY(80deg) rotateZ(-2deg)`) },
      { transform: at((sx + cx) / 2, (sy + cy) / 2 - 20, `scale(${(s + 1) / 2}) translateZ(160px) rotateY(40deg) rotateX(6deg)`), offset: 0.5 },
      { transform: at(cx, cy, 'scale(1) translateZ(0px) rotateY(-6deg) rotateX(2deg)'), offset: 0.85 },
      { transform: at(cx, cy, 'scale(1) rotateY(0deg)') }
    ], { duration: 1200, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'forwards' }).finished;
    if (finished) return;
    await wait(250);

    // 4. open the cover, sliding the spread to centre
    const cover = book.querySelector('.b-cover');
    const shift = Math.min(BW / 2, Math.max(0, vw / 2 - BW / 2 - 8));
    book.animate([
      { transform: at(cx, cy, 'scale(1)') },
      { transform: at(cx + shift, cy, 'scale(1)') }
    ], { duration: 1100, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'forwards' });
    await cover.animate([
      { transform: 'rotateY(0deg)' },
      { transform: 'rotateY(-168deg)' }
    ], { duration: 1100, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'forwards' }).finished;
    if (finished) return;
    await wait(500);

    // 5. the words fade, the page fills the screen, the site is underneath
    book.querySelector('.p-inner').style.opacity = '0';
    book.querySelector('.b-page').animate(
      [{ backgroundColor: '#FBF1F4' }, { backgroundColor: siteBg }],
      { duration: 800, easing: 'ease-in', fill: 'forwards' });
    const Z = Math.max(vw / BW, vh / BH) * 1.2;
    await book.animate([
      { transform: at(cx + shift, cy, 'scale(1)') },
      { transform: at(cx, cy, `scale(${Z})`) }
    ], { duration: 800, easing: 'cubic-bezier(.6,0,.3,1)', fill: 'forwards' }).finished;
    finish();
  }

  play();
})();
