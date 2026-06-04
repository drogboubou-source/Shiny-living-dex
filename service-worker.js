const CACHE_NAME = 'shiny-living-dex-v8';
const RUNTIME_CACHE = 'shiny-living-dex-runtime-v8';
const OFFLINE_URL = './index.html';
const APP_SHELL = [
  './',
  './index.html',
  './pokedex.html',
  './pokemon.json',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './region-kanto.jpg',
  './region-johto.jpg',
  './region-hoenn.jpg',
  './region-sinnoh.jpg',
  './region-unova.jpg',
  './region-kalos.jpg',
  './region-alola.jpg',
  './region-galar.jpg',
  './region-paldea.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => ![CACHE_NAME, RUNTIME_CACHE].includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(OFFLINE_URL, copy));
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  if (event.request.url.includes('raw.githubusercontent.com/PokeAPI/sprites/')) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request).then(response => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, copy));
          return response;
        }))
        .catch(() => caches.match('./icon-192.png'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, copy));
        return response;
      }))
      .catch(() => caches.match(event.request))
  );
});
