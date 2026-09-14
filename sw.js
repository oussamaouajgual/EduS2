/* ============================================================
   SMP HUB — Service Worker
   Cache-first strategy for UI shell (offline support)
   ============================================================ */

const CACHE_NAME = 'smp-hub-v11';
const SHELL_ASSETS = [
  './',
  './index.html?v=5',
  './style.css?v=5',
  './app.js?v=5',
  './manifest.json',
  './logo2.jpeg',
  './timetable-a.jpg?v=5',
  './timetable-b.jpg?v=5',
  './timetable-c.jpg?v=5',
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

/* ── Fetch: Cache-first, fallback to network ─────────────────── */
self.addEventListener('fetch', event => {
  // Only intercept GET requests for same-origin shell assets
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Don't cache Google Drive API calls or cross-origin requests in SW shell cache
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('drive.google.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached asset, fetch update in background (stale-while-revalidate for html/js/css)
        fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => { /* Offline fallback, ignore error */ });
        return cachedResponse;
      }

      // Not in cache: fetch network
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        return networkResponse;
      });
    })
  );
});