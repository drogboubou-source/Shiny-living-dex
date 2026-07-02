const CACHE_NAME = 'shiny-living-dex-v220';
const RUNTIME_CACHE = 'shiny-living-dex-runtime-v220';
const OFFLINE_URL = './index.html';
const APP_SHELL = [
  './',
  './index.html',
  './pokedex.html',
  './manifest.json',
  './Assets/icon-192.png',
  './Assets/icon-512.png',
  './Assets/icon-maskable-192.png',
  './Assets/icon-maskable-512.png',
  './Assets/targets-header.png',
  './Assets/fonts/pokemon-gb-ffonts.ttf',
  './Assets/fonts/pokemon-gb.ttf',
  './Assets/fonts/press-start-2p.ttf',
  './Assets/fonts/logo-retro-pixel-v70.ttf',
  './Assets/fonts/region-gameboy-v70.ttf',
  './Assets/fonts/pokemon-classic.ttf',
  './Assets/fonts/pokemon_x_and_y.woff2',
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
      .then(cache => Promise.allSettled(APP_SHELL.map(url => cache.add(url))))
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

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
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

  if (new URL(event.request.url).pathname.endsWith('/pokemon.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
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
        .catch(() => caches.match('./Assets/icon-192.png'))
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
