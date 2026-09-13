/* ============================================================
   SMP HUB — Service Worker
   Cache-first strategy for UI shell (offline support)
   ============================================================ */

const CACHE_NAME = 'smp-hub-v9';
const SHELL_ASSETS = [
  './',
  './index.html?v=5',
  './style.css?v=5',
  './app.js?v=5',
  './manifest.json',
  './LOGO 2.jpeg',
  './A.jpg?v=4',
  './B.jpg?v=4',
  './C.jpg?v=4',
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
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Pass through Google Drive, Docs, and APIs (always network)
  if (
    url.hostname === 'drive.google.com' ||
    url.hostname === 'docs.google.com'  ||
    url.hostname === 'www.googleapis.com'
  ) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (response && response.status === 200 && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
