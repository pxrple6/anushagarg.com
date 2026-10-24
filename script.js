// ── Theme toggle (dark/light, persistent) ──────────────────
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

// ── Scroll reveal ──────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Mobile menu ────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── Active nav link ────────────────────────────────────────
document.querySelectorAll('nav ul a, .mobile-menu a').forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});

// ── Init on DOM ready ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcon();

  // Contact form (static fallback)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('formSuccess').style.display = 'block';
      form.reset();
    });
  }
});

// ── Bookmark ribbon: grows as you read down the page ───────
(function () {
  const ribbon = document.createElement('div');
  ribbon.className = 'bookmark';
  ribbon.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ribbon);
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    ribbon.style.setProperty('--read', max > 0 ? Math.min(1, window.scrollY / max).toFixed(3) : 0);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

// ── Hero book leans toward the cursor ──────────────────────
(function () {
  const hero = document.querySelector('.home-hero');
  const book = document.querySelector('.hb');
  if (!hero || !book || window.matchMedia('(hover: none)').matches) return;
  hero.addEventListener('mousemove', e => {
    const r = book.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
    const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
    book.style.setProperty('--ry', (-18 + dx * 30).toFixed(1) + 'deg');
    book.style.setProperty('--rx', (-dy * 16).toFixed(1) + 'deg');
  });
  hero.addEventListener('mouseleave', () => {
    book.style.removeProperty('--ry');
    book.style.removeProperty('--rx');
  });
})();

// ── Project shelf: pull a book to read about it ────────────
(function () {
  const tabs = [...document.querySelectorAll('.ps-row [role="tab"]')];
  if (!tabs.length) return;
  const select = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  };
  tabs.forEach((tab, i) => {
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', e => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const next = tabs[(i + step + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });
})();
