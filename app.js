/* ============================================================
   SMP HUB — App Logic
   PWA • Semester Selection (S1 / S2) • Group Filtering • Drive API v3 • PDF Viewer
   ============================================================ */

'use strict';

/* ── Google Drive API Key ─────────────────────────────────────
   The Drive API must have "Google Drive API" enabled.
   ─────────────────────────────────────────────────────────── */
const GOOGLE_DRIVE_API_KEY = 'AIzaSyCjr83gMlMO2_6PD6-HjX_-EMHF1pMx48U';

/* ── Data Store by Semester & Group ─────────────────────────── */
const SEMESTER_RESOURCES = {
  S1: {
    tag: 'Physics · SMP S1 · 2025–2026',
    title: 'SMP Semester 1 (S1) Portal',
    heroHighlight: 'SMP S1',
    aboutTitle: 'Built for SMP S1 Students',
    aboutBody: 'This platform is your centralized academic hub for the Physics SMP Semester 1 program at Faculté des Sciences de Meknès. All resources are organized by group and category — no more searching through shared drives.',
    aboutPill: 'SMP · S1',
    rootFolderId: '15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
    groups: {
      A: {
        courses:   'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        summaries: 'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        tp:        'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        td:        'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        timetables: [
          'timetable-a.jpg',
        ]
      },
      B: {
        courses:   'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        summaries: 'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        tp:        'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        td:        'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        timetables: [
          'timetable-b.jpg',
        ]
      },
      C: {
        courses:   'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        summaries: 'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        tp:        'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        td:        'https://drive.google.com/drive/folders/15QcztTMH-GcdTMJgMQPPm69eXmphVvzF',
        timetables: [
          'timetable-c.jpg',
        ]
      }
    }
  },
  S2: {
    tag: 'Physics · SMP S2 · 2025–2026',
    title: 'SMP Semester 2 (S2) Portal',
    heroHighlight: 'SMP S2',
    aboutTitle: 'Built for SMP S2 Students',
    aboutBody: 'This platform is your centralized academic hub for the Physics SMP Semester 2 program at Faculté des Sciences de Meknès. All resources are organized by group and category — no more searching through shared drives.',
    aboutPill: 'SMP · S2',
    rootFolderId: '1-NTsNc9gVbZOwkktwTVFoPW9VcTMkqJ6',
    groups: {
      A: {
        courses:   'https://drive.google.com/drive/folders/1-NTsNc9gVbZOwkktwTVFoPW9VcTMkqJ6',
        summaries: 'https://drive.google.com/drive/folders/1ySqvGQktA7cPiSbBYsublrXRS333tktj?usp=drive_link',
        tp:        'https://drive.google.com/drive/folders/1OjtbFPkgr2TEUIamicX64zTEIb8rEdsx?usp=drive_link',
        td:        'https://drive.google.com/drive/folders/10vHiPPSf93ZUGL7EQOCwu9Tg17Op3dWT?usp=drive_link',
        timetables: [
          'timetable-a.jpg?v=4',
          'timetable-extra-1.jpg?v=4',
          'timetable-extra-2.png?v=4'
        ]
      },
      B: {
        courses:   'https://drive.google.com/drive/folders/1-NTsNc9gVbZOwkktwTVFoPW9VcTMkqJ6',
        summaries: 'https://drive.google.com/drive/folders/1ySqvGQktA7cPiSbBYsublrXRS333tktj?usp=drive_link',
        tp:        'https://drive.google.com/drive/folders/1OjtbFPkgr2TEUIamicX64zTEIb8rEdsx?usp=drive_link',
        td:        'https://drive.google.com/drive/folders/10vHiPPSf93ZUGL7EQOCwu9Tg17Op3dWT?usp=drive_link',
        timetables: [
          'timetable-b.jpg?v=4',
          'timetable-extra-1.jpg?v=4',
          'timetable-extra-2.png?v=4'
        ]
      },
      C: {
        courses:   'https://drive.google.com/drive/folders/1-NTsNc9gVbZOwkktwTVFoPW9VcTMkqJ6',
        summaries: 'https://drive.google.com/drive/folders/1ySqvGQktA7cPiSbBYsublrXRS333tktj?usp=drive_link',
        tp:        'https://drive.google.com/drive/folders/1OjtbFPkgr2TEUIamicX64zTEIb8rEdsx?usp=drive_link',
        td:        'https://drive.google.com/drive/folders/10vHiPPSf93ZUGL7EQOCwu9Tg17Op3dWT?usp=drive_link',
        timetables: [
          'timetable-c.jpg?v=4',
          'timetable-extra-1.jpg?v=4',
          'timetable-extra-2.png?v=4'
        ]
      }
    }
  }
};

/* Category display config */
const CATEGORY_CONFIG = {
  courses:   { label: 'Courses',   sub: 'Lecture PDFs & Notes',  color: '--blue'   },
  summaries: { label: 'Summaries', sub: 'Revision Notes',        color: '--green'  },
  tp:        { label: 'TP',        sub: 'Practical Lab Work',    color: '--purple' },
  td:        { label: 'TD',        sub: 'Tutorial Exercises',    color: '--orange' },
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
const tpGroupTag     = document.getElementById('tp-group-tag');
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

/* Files explorer modal */
const filesModal     = document.getElementById('files-modal');
const filesModalTitleText = document.getElementById('files-modal-title-text');
const filesModalSub  = document.getElementById('files-modal-sub');
const filesList      = document.getElementById('files-list');
const filesFallback  = document.getElementById('files-fallback');
const filesFallbackLink = document.getElementById('files-fallback-link');
const modalClose     = document.getElementById('modal-close');
const filesBackBtn   = document.getElementById('files-back-btn');
const filesBreadcrumb = document.getElementById('files-breadcrumb');

/* Semester welcome modal */
const semWelcomeModal = document.getElementById('semester-welcome-modal');

/* PDF viewer */
const pdfViewerModal  = document.getElementById('pdf-viewer-modal');
const pdfFilename     = document.getElementById('pdf-filename');
const pdfDriveLink    = document.getElementById('pdf-drive-link');
const pdfDownloadLink = document.getElementById('pdf-download-link');
const pdfViewerClose  = document.getElementById('pdf-viewer-close');
const pdfIframe       = document.getElementById('pdf-iframe');
const pdfLoading      = document.getElementById('pdf-loading');

/* ── State ───────────────────────────────────────────────────── */
let activeSemester = localStorage.getItem('smp_semester') || null;
let activeGroup    = localStorage.getItem('smp_group') || 'A';
let deferredPrompt = null;
let toastTimer     = null;

/** Folder Navigation Stack: Array of { id, name, sub, url } */
let folderStack = [];

/** In-memory folder cache: folderId → items[] */
const folderCache = {};

/* ── Helpers ─────────────────────────────────────────────────── */

/**
 * Extract Google Drive folder ID from a Drive URL.
 * Handles both /folders/ID and ?id=ID formats.
 */
function getFolderId(url) {
  if (!url) return null;
  const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) return folderMatch[1];
  try {
    const u = new URL(url);
    return u.searchParams.get('id') || null;
  } catch {
    return null;
  }
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Toast Notification System ──────────────────────────────── */
function showToast(message, duration = 2800) {
  if (!toastEl) return;
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('visible');
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('visible');
  }, duration);
}

/* ── Splash & App Reveal ────────────────────────────────────── */
function revealApp() {
  if (splash) {
    splash.classList.add('gone');
    splash.setAttribute('aria-hidden', 'true');
  }
  if (appEl) {
    appEl.removeAttribute('aria-hidden');
    appEl.classList.add('visible');
  }
  checkSemesterOnStartup();
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

/* ── Semester System ────────────────────────────────────────── */
function applySemester(sem) {
  activeSemester = sem;
  localStorage.setItem('smp_semester', sem);

  const semData = SEMESTER_RESOURCES[sem] || SEMESTER_RESOURCES.S2;

  // Update hero tag
  const heroTagText = document.getElementById('hero-tag-text');
  if (heroTagText) heroTagText.textContent = semData.tag;

  // Update hero title highlight
  const heroHighlight = document.getElementById('hero-highlight-text');
  if (heroHighlight) heroHighlight.textContent = semData.heroHighlight;

  // Update page title
  document.title = `${semData.title} — FS Meknès`;

  // Update about section
  const aboutTitle = document.getElementById('about-title');
  if (aboutTitle) aboutTitle.textContent = semData.aboutTitle;

  const aboutBody = document.getElementById('about-body');
  if (aboutBody) aboutBody.textContent = semData.aboutBody;

  const aboutPillSem = document.getElementById('about-pill-sem');
  if (aboutPillSem) aboutPillSem.textContent = semData.aboutPill;

  // Sync header sem tabs
  document.querySelectorAll('.sem-tab').forEach(tab => {
    const isActive = tab.dataset.sem === sem;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Re-apply current group to update timetables & folder references
  applyGroup(activeGroup);
}

function checkSemesterOnStartup() {
  if (!activeSemester) {
    // Show Welcome Modal on first visit
    openSemesterWelcomeModal();
    applySemester('S2'); // Default to S2 background until chosen
  } else {
    applySemester(activeSemester);
  }
}

function openSemesterWelcomeModal() {
  if (!semWelcomeModal) return;
  semWelcomeModal.classList.add('open');
  semWelcomeModal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeSemesterWelcomeModal() {
  if (!semWelcomeModal) return;
  semWelcomeModal.classList.remove('open');
  semWelcomeModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* Bind Welcome Modal Options */
document.querySelectorAll('.sem-option-card').forEach(btn => {
  btn.addEventListener('click', () => {
    const sem = btn.dataset.sem;
    applySemester(sem);
    closeSemesterWelcomeModal();
    showToast(`Loaded Semester ${sem === 'S1' ? '1 (S1)' : '2 (S2)'} resources! 📚`);
  });
});

/* Bind Header Navbar Semester Switch Tabs */
document.querySelectorAll('.sem-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const sem = tab.dataset.sem;
    if (sem !== activeSemester) {
      applySemester(sem);
      showToast(`Switched to Semester ${sem === 'S1' ? '1 (S1)' : '2 (S2)'}`);
    }
  });
});

/* ── Group System ───────────────────────────────────────────── */
function applyGroup(group) {
  activeGroup = group;
  localStorage.setItem('smp_group', group);

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

  if (tpGroupTag) tpGroupTag.textContent = `Group ${group}`;

  groupTabs.forEach(btn => {
    const isActive = btn.dataset.group === group;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  renderTimetables(group);
}

function renderTimetables(group) {
  if (!timetableGrid) return;
  timetableGrid.innerHTML = '';
  
  const semKey = activeSemester || 'S2';
  const semData = SEMESTER_RESOURCES[semKey] || SEMESTER_RESOURCES.S2;
  const groupRes = semData.groups[group] || semData.groups.A;
  const images = groupRes.timetables || [];

  images.forEach(src => {
    const card = document.createElement('div');
    card.className = 'timetable-card';

    const img = document.createElement('img');
    img.className = 'timetable-img';
    img.src = src;
    img.loading = 'lazy';
    img.alt = `Timetable for ${semKey} Group ${group}`;

    // Graceful onerror fallback for loading delays or network issues
    img.onerror = () => {
      img.onerror = null;
      const cleanSrc = src.split('?')[0];
      if (img.src !== cleanSrc) {
        img.src = cleanSrc; // Retry without cache buster
      } else {
        img.style.display = 'none';
        const fallbackMsg = document.createElement('div');
        fallbackMsg.className = 'timetable-fallback-placeholder';
        fallbackMsg.style.cssText = 'padding: 2.5rem 1rem; text-align: center; color: rgba(255,255,255,0.7); font-size: 0.9rem; font-weight: 500;';
        fallbackMsg.innerHTML = `<span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">📅</span>Schedule for Group ${group} (Tap to view)`;
        card.appendChild(fallbackMsg);
      }
    };

    card.addEventListener('click', () => openLightbox(src));

    card.appendChild(img);
    timetableGrid.appendChild(card);
  });
}

// Bind group tab clicks
groupTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    applyGroup(btn.dataset.group);
  });
});

/* ── Google Drive API v3 — Fetch files & subfolders ───────────
   Returns all items (subfolders and files) inside a folder.
   ─────────────────────────────────────────────────────────────*/
async function fetchFolderFiles(folderId) {
  // Check memory cache
  if (folderCache[folderId]) return folderCache[folderId];

  // Check persistent localStorage cache (valid for 1 hour)
  try {
    const cached = localStorage.getItem(`smp_drive_cache_v3_${folderId}`);
    if (cached) {
      const { timestamp, files } = JSON.parse(cached);
      if (Date.now() - timestamp < 3600000 && Array.isArray(files)) {
        folderCache[folderId] = files;
        return files;
      }
    }
  } catch (e) {}

  if (!GOOGLE_DRIVE_API_KEY) {
    throw new Error('NO_API_KEY');
  }

  const query = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
  const fields = encodeURIComponent('files(id,name,mimeType,webViewLink)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=folder,name&key=${GOOGLE_DRIVE_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const files = data.files || [];

  // Store in memory & localStorage cache
  folderCache[folderId] = files;
  try {
    localStorage.setItem(`smp_drive_cache_v3_${folderId}`, JSON.stringify({
      timestamp: Date.now(),
      files: files
    }));
  } catch (e) {}

  return files;
}

function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/* Category keyword matchers for auto-filtering */
const CATEGORY_KEYWORDS = {
  courses:   ['cour', 'lecture'],
  summaries: ['resume', 'summary', 'fiche', 'revision'],
  td:        ['td', 'dirige', 'exercice', 'tutorial'],
  tp:        ['tp', 'pratique', 'lab']
};

function matchesCategory(folderName, category) {
  if (!folderName) return false;
  const norm = normalizeText(folderName);
  const keywords = CATEGORY_KEYWORDS[category] || [];
  return keywords.some(kw => norm.includes(kw));
}

/* ── Files Explorer Modal & Folder Navigation ───────────────── */
async function openFilesModal(category) {
  if (!filesModal) return;

  const config = CATEGORY_CONFIG[category] || { label: category, sub: '' };
  const semKey = activeSemester || 'S2';
  const semData = SEMESTER_RESOURCES[semKey] || SEMESTER_RESOURCES.S2;
  const groupRes = semData.groups[activeGroup] || semData.groups.A;
  const rootId = semData.rootFolderId;
  const categoryLabel = config.label;

  filesModal.classList.add('open');
  filesModal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';

  // Display skeletons & loading breadcrumb
  if (filesModalTitleText) filesModalTitleText.textContent = `${categoryLabel} · Group ${activeGroup}`;
  if (filesModalSub) filesModalSub.textContent = `Loading ${categoryLabel} for Group ${activeGroup}…`;
  if (filesBreadcrumb) {
    filesBreadcrumb.textContent = `📁 ${semKey} / Group ${activeGroup} / ${categoryLabel}`;
    filesBreadcrumb.style.display = 'inline-flex';
  }
  if (filesBackBtn) filesBackBtn.style.display = 'none';

  renderSkeletons(4);

  try {
    const configuredUrl = groupRes[category];
    let initialFolderId = getFolderId(configuredUrl) || rootId;

    // Fetch items of initial target folder
    const rootItems = await fetchFolderFiles(initialFolderId);
    let activeItems = rootItems;
    let baseFolderId = initialFolderId;

    // 1. Check if items contain Group subfolders ("Group A", "Group B", "Group C")
    const groupFolders = activeItems.filter(i => i.mimeType === 'application/vnd.google-apps.folder');
    const matchedGroupFolder = groupFolders.find(f => {
      const norm = normalizeText(f.name);
      const targetGrp = activeGroup.toLowerCase();
      return norm.includes(`group ${targetGrp}`) || 
             norm.includes(`groupe ${targetGrp}`) || 
             norm === targetGrp;
    });

    if (matchedGroupFolder) {
      baseFolderId = matchedGroupFolder.id;
      activeItems = await fetchFolderFiles(matchedGroupFolder.id);
    }

    // 2. Check for Category subfolders ("Cours", "Résumés", "Travaux Dirigés - TD", "Travaux Pratiques - TP")
    const categorySubfolders = activeItems.filter(i => i.mimeType === 'application/vnd.google-apps.folder');
    const matchedCategoryFolder = categorySubfolders.find(f => matchesCategory(f.name, category));

    if (matchedCategoryFolder) {
      folderStack = [{
        id: matchedCategoryFolder.id,
        name: `${categoryLabel} · Group ${activeGroup}`,
        breadcrumb: `📁 ${semKey} / Group ${activeGroup} / ${categoryLabel}`,
        sub: `Documents for ${categoryLabel}`,
        url: matchedCategoryFolder.webViewLink || `https://drive.google.com/drive/folders/${matchedCategoryFolder.id}`
      }];
    } else {
      folderStack = [{
        id: baseFolderId,
        name: `${categoryLabel} · Group ${activeGroup}`,
        breadcrumb: `📁 ${semKey} / Group ${activeGroup} / ${categoryLabel}`,
        sub: config.sub,
        url: `https://drive.google.com/drive/folders/${baseFolderId}`
      }];
    }

    loadCurrentFolderContent();

  } catch (err) {
    const fallbackUrl = groupRes[category] || `https://drive.google.com/drive/folders/${rootId}`;
    if (err.message === 'NO_API_KEY') {
      renderFallback(fallbackUrl, 'API key not configured — open folder in Drive to view files.');
    } else {
      renderFallback(fallbackUrl, `Couldn't fetch files: ${err.message}`);
    }
  }
}

function loadCurrentFolderContent() {
  if (folderStack.length === 0) return;
  const currentFolder = folderStack[folderStack.length - 1];

  // Update header title & subtitle
  if (filesModalTitleText) filesModalTitleText.textContent = currentFolder.name;
  if (filesModalSub) filesModalSub.textContent = currentFolder.sub || 'Browsing files…';

  // Back button visibility (show when stack length > 1)
  if (filesBackBtn) {
    filesBackBtn.style.display = folderStack.length > 1 ? 'flex' : 'none';
  }

  // Breadcrumb path display
  if (filesBreadcrumb) {
    if (currentFolder.breadcrumb) {
      filesBreadcrumb.textContent = currentFolder.breadcrumb;
      filesBreadcrumb.style.display = 'inline-flex';
    } else if (folderStack.length > 1) {
      const semKey = activeSemester || 'S2';
      const pathText = folderStack.map(f => f.name).join(' / ');
      filesBreadcrumb.textContent = `📁 ${semKey} / ${pathText}`;
      filesBreadcrumb.style.display = 'inline-flex';
    } else {
      filesBreadcrumb.style.display = 'none';
    }
  }

  // Reset list
  if (filesList) filesList.innerHTML = '';
  if (filesFallback) filesFallback.style.display = 'none';
  if (filesFallbackLink) filesFallbackLink.href = currentFolder.url || '#';

  if (!currentFolder.id) {
    renderFallback(currentFolder.url, 'No folder configured yet.');
    return;
  }

  renderSkeletons(4);

  fetchFolderFiles(currentFolder.id)
    .then(items => {
      if (items.length === 0) {
        renderEmpty('No files or subfolders found in this directory.');
      } else {
        renderFileItems(items);
      }
    })
    .catch(err => {
      if (err.message === 'NO_API_KEY') {
        renderFallback(currentFolder.url, 'API key not configured — open folder in Drive to view files.');
      } else {
        renderFallback(currentFolder.url, `Couldn't fetch files: ${err.message}`);
      }
    });
}

function closeFilesModal() {
  if (!filesModal) return;
  filesModal.classList.remove('open');
  filesModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* Handle Back Button in Files Modal */
filesBackBtn?.addEventListener('click', () => {
  if (folderStack.length > 1) {
    folderStack.pop();
    loadCurrentFolderContent();
  }
});

function renderSkeletons(count = 4) {
  if (!filesList) return;
  filesList.innerHTML = '';
  for (let i = 0; i < count; i++) {
    filesList.insertAdjacentHTML('beforeend', `
      <div class="file-skeleton">
        <div class="skel-icon"></div>
        <div class="skel-lines">
          <div class="skel-line"></div>
          <div class="skel-line"></div>
        </div>
      </div>
    `);
  }
}

function renderEmpty(message) {
  if (!filesList) return;
  filesList.innerHTML = `
    <div class="files-empty">
      <div class="files-empty-icon">📂</div>
      <p>${message}</p>
    </div>
  `;
}

function renderFallback(folderUrl, message) {
  if (!filesList) return;
  filesList.innerHTML = `
    <div class="files-empty">
      <div class="files-empty-icon">⚠️</div>
      <p>${message}</p>
    </div>
  `;
  if (filesModalSub) filesModalSub.textContent = 'Unable to load files automatically';
  if (filesFallback) filesFallback.style.display = 'block';
  if (filesFallbackLink) filesFallbackLink.href = folderUrl || '#';
}

function renderFileItems(items) {
  if (!filesList) return;
  filesList.innerHTML = '';

  // Separate subfolders from files
  const folders = items.filter(i => i.mimeType === 'application/vnd.google-apps.folder');
  const files   = items.filter(i => i.mimeType !== 'application/vnd.google-apps.folder');

  const totalCount = items.length;
  if (filesModalSub) {
    if (folders.length > 0 && files.length > 0) {
      filesModalSub.textContent = `${folders.length} subject${folders.length !== 1 ? 's' : ''}, ${files.length} file${files.length !== 1 ? 's' : ''}`;
    } else if (folders.length > 0) {
      filesModalSub.textContent = `${folders.length} subject folder${folders.length !== 1 ? 's' : ''} found`;
    } else {
      filesModalSub.textContent = `${files.length} file${files.length !== 1 ? 's' : ''} found`;
    }
  }

  // 1. Render Subfolders (Subjects)
  folders.forEach(folder => {
    const btn = document.createElement('button');
    btn.className = 'file-item folder-item';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Open subject folder ${folder.name}`);
    btn.innerHTML = `
      <div class="file-folder-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="file-item-info">
        <div class="file-item-name">${escapeHtml(folder.name)}</div>
        <div class="file-item-meta">Subject Folder · Tap to view documents</div>
      </div>
      <div class="file-item-chevron">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;

    btn.addEventListener('click', () => {
      const parentBreadcrumb = folderStack[folderStack.length - 1]?.breadcrumb || `📁 ${activeSemester} / Group ${activeGroup}`;
      folderStack.push({
        id: folder.id,
        name: folder.name,
        sub: `Subject: ${folder.name}`,
        breadcrumb: `${parentBreadcrumb} / ${folder.name}`,
        url: folder.webViewLink || `https://drive.google.com/drive/folders/${folder.id}`
      });
      loadCurrentFolderContent();
    });

    filesList.appendChild(btn);
  });

  // 2. Render PDF / Files
  files.forEach(file => {
    const btn = document.createElement('button');
    btn.className = 'file-item';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Open ${file.name}`);
    btn.innerHTML = `
      <div class="file-pdf-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="14 2 14 8 20 8" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="16" y1="13" x2="8" y2="13" stroke-linecap="round"/>
          <line x1="16" y1="17" x2="8" y2="17" stroke-linecap="round"/>
          <polyline points="10 9 9 9 8 9" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="file-item-info">
        <div class="file-item-name">${escapeHtml(file.name)}</div>
        <div class="file-item-meta">PDF · Tap to preview</div>
      </div>
      <div class="file-item-chevron">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;

    btn.addEventListener('click', () => {
      closeFilesModal();
      openPdfViewer(file.id, file.name, file.webViewLink);
    });

    filesList.appendChild(btn);
  });
}

/* ── PDF Viewer ───────────────────────────────────────────────
   Opens full-screen modal with preview URL:
   https://drive.google.com/file/d/${fileId}/preview
   ─────────────────────────────────────────────────────────────*/
let pdfSpinnerTimer = null;

function openPdfViewer(fileId, fileName, webViewLink) {
  if (!pdfViewerModal) return;

  if (pdfFilename) pdfFilename.textContent = fileName || 'Document.pdf';

  // Open in Drive link
  const driveUrl = webViewLink || `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
  if (pdfDriveLink) pdfDriveLink.href = driveUrl;

  // Direct Download link
  const downloadUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;
  if (pdfDownloadLink) pdfDownloadLink.href = downloadUrl;

  // Show loading spinner initially
  clearTimeout(pdfSpinnerTimer);
  if (pdfLoading) pdfLoading.classList.remove('hidden');
  if (pdfIframe)  pdfIframe.classList.add('loading');

  let spinnerDismissed = false;
  const dismissSpinner = () => {
    if (spinnerDismissed) return;
    spinnerDismissed = true;
    clearTimeout(pdfSpinnerTimer);
    if (pdfLoading) pdfLoading.classList.add('hidden');
    if (pdfIframe)  pdfIframe.classList.remove('loading');
  };

  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  if (pdfIframe) {
    pdfIframe.src = '';
    pdfIframe.src = previewUrl;

    // Dismiss on iframe load
    pdfIframe.onload = dismissSpinner;

    // Fallback timer: max 2.5s wait so user isn't stuck behind spinner
    pdfSpinnerTimer = setTimeout(dismissSpinner, 2500);
  }

  pdfViewerModal.classList.add('open');
  pdfViewerModal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closePdfViewer() {
  if (!pdfViewerModal) return;
  pdfViewerModal.classList.remove('open');
  pdfViewerModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  setTimeout(() => {
    if (pdfIframe) pdfIframe.src = '';
    if (pdfLoading) pdfLoading.classList.remove('hidden');
    if (pdfIframe)  pdfIframe.classList.add('loading');
  }, 300);
}

pdfViewerClose?.addEventListener('click', closePdfViewer);

/* ── Wire up resource cards ─────────────────────────────────── */
const CARDS = {
  'card-courses':   'courses',
  'card-summaries': 'summaries',
  'card-tp':        'tp',
  'card-td':        'td',
};
Object.entries(CARDS).forEach(([id, category]) => {
  document.getElementById(id)?.addEventListener('click', () => {
    openFilesModal(category);
  });
});

/* ── Files modal close button & backdrop click ───────────────── */
modalClose?.addEventListener('click', closeFilesModal);
filesModal?.addEventListener('click', e => {
  if (e.target === filesModal) closeFilesModal();
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
    if (pdfViewerModal?.classList.contains('open')) closePdfViewer();
    else if (filesModal?.classList.contains('open'))  closeFilesModal();
    else if (lightbox?.classList.contains('open'))    closeLightbox();
    else if (contactModal?.classList.contains('open')) closeContactModal();
    else if (semWelcomeModal?.classList.contains('open')) closeSemesterWelcomeModal();
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
      if (e.target === sections.home)      setNavActive('home');
      if (e.target === sections.timetable) setNavActive('timetable');
      if (e.target === sections.about)     setNavActive('about');
    }
  });
}, { threshold: 0.3 });

Object.values(sections).forEach(s => s && observer.observe(s));
