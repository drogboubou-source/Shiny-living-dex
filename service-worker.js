const CACHE_NAME = 'shiny-living-dex-v7';
const APP_SHELL = [
  './',
  './index.html',
  './pokedex.html',
  './pokemon.json',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
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
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
