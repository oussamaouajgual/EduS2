/* ============================================================
   SMP S2 HUB — Service Worker
   Cache-first strategy for UI shell (offline support)
   ============================================================ */

const CACHE_NAME = 'smp-s2-hub-v5';
const SHELL_ASSETS = [
  './',
  './index.html?v=2',
  './style.css?v=2',
  './app.js?v=2',
  './manifest.json',
  './logo.jpg',
  './timetable-extra-1.jpg?v=2',
  './timetable-extra-2.png?v=2',
];

/* ── Install: pre-cache the shell ────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: clean up old caches ──────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first, fallback to network ─────────────────── */
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Pass through Google Drive and external URLs
  if (url.hostname === 'drive.google.com' || url.hostname === 'docs.google.com') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Cache valid responses for same-origin
        if (response && response.status === 200 && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback — return cached homepage
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
