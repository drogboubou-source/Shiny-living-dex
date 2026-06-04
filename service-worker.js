const CACHE_NAME = 'shiny-living-dex-v7';
const APP_SHELL = [
  './',
  './index.html',
  './pokedex.html',
  './pokemon.json',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './assets/region-maps/kanto.jpg',
  './assets/region-maps/johto.jpg',
  './assets/region-maps/hoenn.jpg',
  './assets/region-maps/sinnoh.jpg',
  './assets/region-maps/unova.jpg',
  './assets/region-maps/kalos.jpg',
  './assets/region-maps/alola.jpg',
  './assets/region-maps/galar.jpg',
  './assets/region-maps/paldea.jpg'
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
