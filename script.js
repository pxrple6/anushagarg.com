(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀︎' : '☽';
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

/* ─── "COME BACK" TAB TITLE + FAVICON ────────────────────────
   Swaps the tab title and favicon whenever someone tabs away,
   and restores both the moment they return. */
(function () {
  const ORIGINAL_TITLE = document.title;
  const AWAY_TITLE = ':( im still here';

  function drawFavicon(paint) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx || !ctx.roundRect) return null;
    paint(ctx);
    return canvas.toDataURL('image/png');
  }

  const NORMAL_FAVICON = drawFavicon((ctx) => {
    ctx.fillStyle = '#c53e7f';
    ctx.beginPath();
    ctx.roundRect(4, 4, 56, 56, 14);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 32px Manrope, Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', 32, 35);
  });

  const AWAY_FAVICON = drawFavicon((ctx) => {
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.roundRect(4, 4, 56, 56, 14);
    ctx.fill();
    ctx.font = '34px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🥺', 32, 36);
  });

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  if (NORMAL_FAVICON) favicon.href = NORMAL_FAVICON;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = AWAY_TITLE;
      if (AWAY_FAVICON) favicon.href = AWAY_FAVICON;
    } else {
      document.title = ORIGINAL_TITLE;
      if (NORMAL_FAVICON) favicon.href = NORMAL_FAVICON;
    }
  });
})();

/* ─── SCROLL-TRIGGERED REVEALS ────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── READING PROGRESS BAR ────────────────────────────────── */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

function updateScrollProgress() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
let progressTicking = false;
window.addEventListener('scroll', () => {
  if (!progressTicking) {
    progressTicking = true;
    requestAnimationFrame(() => { updateScrollProgress(); progressTicking = false; });
  }
}, { passive: true });
updateScrollProgress();

/* ─── SEAMLESS PAGE TRANSITIONS ───────────────────────────────
   Fades the page out before internal navigation instead of the
   usual instant white flash of a static multi-page site. Leaves
   external links, downloads, mailto/tel, and anchors untouched. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function isTransitionableLink(link) {
  const href = link.getAttribute('href');
  if (!href) return false;
  if (link.hasAttribute('download')) return false;
  if (link.target && link.target !== '_self') return false;
  if (/^([a-z]+:)?\/\//i.test(href)) return false;
  if (/^(mailto:|tel:|#)/i.test(href)) return false;
  if (/\.(pdf|png|jpe?g|zip|gif|svg)$/i.test(href)) return false;
  return true;
}

if (!reducedMotion) {
  document.querySelectorAll('a[href]').forEach(link => {
    if (!isTransitionableLink(link)) return;
    link.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const dest = link.getAttribute('href');
      e.preventDefault();
      document.body.classList.add('page-exit');
      window.setTimeout(() => { window.location.href = dest; }, 260);
    });
  });
}
window.addEventListener('pageshow', () => {
  document.body.classList.remove('page-exit');
});

/* ─── POINTER-ONLY MICRO-INTERACTIONS ─────────────────────────
   Magnetic buttons, tilting cards, and an ambient cursor
   spotlight in the hero/flagship panels. Skipped entirely on
   touch devices and when reduced motion is requested. */
function rafThrottle(fn) {
  let ticking = false;
  return function (...args) {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { fn.apply(this, args); ticking = false; });
    }
  };
}

if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {

  document.querySelectorAll('.btn').forEach(btn => {
    const onMove = rafThrottle((e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.2;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  document.querySelectorAll('.proj-card, .poem-card, .card').forEach(card => {
    const onMove = rafThrottle((e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * 6;
      const ry = (px - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    });
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  document.querySelectorAll('.home-hero, .page-hero, .flagship').forEach(el => {
    el.classList.add('spotlight');
    const onMove = rafThrottle((e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', ((e.clientX - r.left) / r.width) * 100 + '%');
      el.style.setProperty('--spot-y', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
    el.addEventListener('mousemove', onMove);
  });
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

document.querySelectorAll('nav ul a, .mobile-menu a').forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});

document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcon();

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('formSuccess').style.display = 'block';
      form.reset();
    });
  }
});
