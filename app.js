/* ============================================================
   SMP S2 HUB — App Logic
   PWA • Group Filtering • TD Modal • Group Persistence
   ============================================================ */

'use strict';

/* ── Data Store ──────────────────────────────────────────────
   Replace '#' values with real Google Drive folder URLs.
   ─────────────────────────────────────────────────────────── */
const RESOURCES = {
  A: {
    courses:   'https://drive.google.com/drive/folders/1VNs_3MZTCHjzMtOcIhQemL2VUYcGlS8R?usp=drive_link',
    summaries: 'https://drive.google.com/drive/folders/1ySqvGQktA7cPiSbBYsublrXRS333tktj?usp=drive_link',
    tp:        'https://drive.google.com/drive/folders/1OjtbFPkgr2TEUIamicX64zTEIb8rEdsx?usp=drive_link',
    td:        'https://drive.google.com/drive/folders/10vHiPPSf93ZUGL7EQOCwu9Tg17Op3dWT?usp=drive_link',
    timetables: [
      'timetable-a.jpg',
      'CamScanner 04-14-2026 22.37_1 (1).jpg',
      'CamScanner 04-14-2026 22.37_2.jpg'
    ]
  },
  B: {
    courses:   'https://drive.google.com/drive/folders/1VNs_3MZTCHjzMtOcIhQemL2VUYcGlS8R?usp=drive_link',
    summaries: 'https://drive.google.com/drive/folders/1ySqvGQktA7cPiSbBYsublrXRS333tktj?usp=drive_link',
    tp:        'https://drive.google.com/drive/folders/1OjtbFPkgr2TEUIamicX64zTEIb8rEdsx?usp=drive_link',
    td:        'https://drive.google.com/drive/folders/10vHiPPSf93ZUGL7EQOCwu9Tg17Op3dWT?usp=drive_link',
    timetables: [
      'timetable-b.jpg',
      'CamScanner 04-14-2026 22.37_1 (1).jpg',
      'CamScanner 04-14-2026 22.37_2.jpg'
    ]
  },
  C: {
    courses:   'https://drive.google.com/drive/folders/1VNs_3MZTCHjzMtOcIhQemL2VUYcGlS8R?usp=drive_link',
    summaries: 'https://drive.google.com/drive/folders/1ySqvGQktA7cPiSbBYsublrXRS333tktj?usp=drive_link',
    tp:        'https://drive.google.com/drive/folders/1OjtbFPkgr2TEUIamicX64zTEIb8rEdsx?usp=drive_link',
    td:        'https://drive.google.com/drive/folders/10vHiPPSf93ZUGL7EQOCwu9Tg17Op3dWT?usp=drive_link',
    timetables: [
      'timetable-c.jpg',
      'CamScanner 04-14-2026 22.37_1 (1).jpg',
      'CamScanner 04-14-2026 22.37_2.jpg'
    ]
  }
};

/* ── PWA Service Worker ─────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

/* ── DOM References ──────────────────────────────────────────── */
const splash         = document.getElementById('splash');
const appEl          = document.getElementById('app');
const groupTabs      = document.querySelectorAll('.group-tab');
const cardCourses    = document.getElementById('card-courses');
const cardSummaries  = document.getElementById('card-summaries');
const cardTP         = document.getElementById('card-tp');
const cardTD         = document.getElementById('card-td');
const tpGroupTag     = document.getElementById('tp-group-tag');
const tdModal        = document.getElementById('td-modal');
const tdGrid         = document.getElementById('td-grid');
const modalClose     = document.getElementById('modal-close');
const modalGroupLbl  = document.getElementById('modal-group-label');
const installBtn     = document.getElementById('install-btn');
const exploreCta     = document.getElementById('explore-cta');

const timetableGrid  = document.getElementById('timetable-grid');
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightbox-img');
const lightboxClose  = document.getElementById('lightbox-close');

const contactHubBtn  = document.getElementById('contact-hub-btn');
const contactModal   = document.getElementById('contact-modal');
const contactClose   = document.getElementById('contact-modal-close');

const toastEl        = document.getElementById('toast');

/* ── State ───────────────────────────────────────────────────── */
let activeGroup = localStorage.getItem('smp_group') || 'A';
let deferredPrompt = null;
let toastTimer = null;

/* ── Toast Notification System ────────────────────────────────
   Shows a non-intrusive notification pill at the bottom.
   ─────────────────────────────────────────────────────────────*/
function showToast(message, duration = 2800) {
  if (!toastEl) return;
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('visible');
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('visible');
  }, duration);
}

/* ── Splash → App ─────────────────────────────────────────────
   Show splash for at least 1.2s, then fade out and reveal app.
   ─────────────────────────────────────────────────────────────*/
function revealApp() {
  splash.classList.add('gone');
  appEl.removeAttribute('aria-hidden');
  appEl.classList.add('visible');
  splash.setAttribute('aria-hidden', 'true');
}
const splashMinTime = new Promise(r => setTimeout(r, 1300));
const domReady      = new Promise(r => {
  if (document.readyState === 'complete') r();
  else window.addEventListener('load', r);
});
Promise.all([splashMinTime, domReady]).then(revealApp);

/* ── Smooth scroll for CTA ──────────────────────────────────── */
exploreCta?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ── Group System ─────────────────────────────────────────────
   Switching groups replaces the href on the main cards.
   ─────────────────────────────────────────────────────────────*/
function applyGroup(group) {
  activeGroup = group;
  localStorage.setItem('smp_group', group);
  const res = RESOURCES[group];

  // Update card hrefs
  if (cardCourses)  cardCourses.href  = res.courses;
  if (cardSummaries) cardSummaries.href = res.summaries;
  if (cardTP)       cardTP.href       = res.tp;
  if (cardTD)       cardTD.href       = res.td;

  // Add a small fade animation to the grid for feedback
  const grid = document.getElementById('cards-grid');
  if (grid) {
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      });
    });
  }

  // Update TP tag label
  if (tpGroupTag) tpGroupTag.textContent = `Group ${group}`;

  // Update group tab UI
  groupTabs.forEach(btn => {
    const isActive = btn.dataset.group === group;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Render timetables
  renderTimetables(group);
}

function renderTimetables(group) {
  if (!timetableGrid) return;
  timetableGrid.innerHTML = '';
  const images = RESOURCES[group].timetables || [];
  
  images.forEach(src => {
    const card = document.createElement('div');
    card.className = 'timetable-card';
    
    const img = document.createElement('img');
    img.className = 'timetable-img';
    img.src = src;
    img.loading = 'lazy';
    img.alt = `Timetable for Group ${group}`;
    
    // Lightbox trigger
    card.addEventListener('click', () => openLightbox(src));
    
    card.appendChild(img);
    timetableGrid.appendChild(card);
  });
}

// Initialize with stored/default group
applyGroup(activeGroup);

// Bind tab clicks
groupTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    applyGroup(btn.dataset.group);
  });
});

/* ── Guard: placeholder link click ──────────────────────────── */
[cardCourses, cardSummaries, cardTP, cardTD].forEach(card => {
  if (!card) return;
  card.addEventListener('click', e => {
    const href = card.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      showToast('Link coming soon — check back later!');
    }
  });
});

/* ── PWA Install Prompt ─────────────────────────────────────── */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = 'flex';
  }
});
installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  if (outcome === 'accepted') {
    installBtn.style.display = 'none';
    showToast('App installed! 🎉');
  }
});
window.addEventListener('appinstalled', () => {
  if (installBtn) installBtn.style.display = 'none';
  deferredPrompt = null;
});

/* ── Contact Hub Logic ───────────────────────────────────────── */
function openContactModal() {
  if (!contactModal) return;
  contactModal.classList.add('open');
  contactModal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}
function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove('open');
  contactModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

contactHubBtn?.addEventListener('click', openContactModal);
contactClose?.addEventListener('click', closeContactModal);
contactModal?.addEventListener('click', e => {
  if (e.target === contactModal) closeContactModal();
});

/* ── Lightbox Logic ─────────────────────────────────────────── */
function openLightbox(src) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.add('open');
  lightbox.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => {
  if (e.target === lightbox || e.target.closest('#lightbox-wrapper')) {
    closeLightbox();
  }
});

/* ── Global Keyboard Handler ───────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (lightbox?.classList.contains('open')) closeLightbox();
    else if (contactModal?.classList.contains('open')) closeContactModal();
  }
});

/* ── Bottom Nav: active state on scroll ─────────────────────── */
const navBtns = {
  home:       document.getElementById('nav-home'),
  timetable:  document.getElementById('nav-timetable'),
  about:      document.getElementById('nav-about'),
};
const sections = {
  home:       document.getElementById('dashboard'),
  timetable:  document.getElementById('timetable'),
  about:      document.getElementById('about'),
};

const setNavActive = id => {
  Object.entries(navBtns).forEach(([k, btn]) => btn?.classList.toggle('active', k === id));
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      if (e.target === sections.home)  setNavActive('home');
      if (e.target === sections.timetable) setNavActive('timetable');
      if (e.target === sections.about) setNavActive('about');
    }
  });
}, { threshold: 0.3 });

Object.values(sections).forEach(s => s && observer.observe(s));
