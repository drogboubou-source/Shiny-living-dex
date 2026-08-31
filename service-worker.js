const CACHE_NAME = 'shiny-living-dex-v298';
const RUNTIME_CACHE = 'shiny-living-dex-runtime-v298';
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
  './type-eau.png?v293',
  './type-plante.png?v294',
  './type-feu.png?v295',
  './type-electrik.png?v296',
  './type-normal.png?v297',
  './type-dragon.png?v297',
  './type-acier.png?v297',
  './type-t%C3%A9n%C3%A8bres.png?v297',
  './type-combat.png?v297',
  './type-psy.png?v297',
  './type-f%C3%A9e.png?v298',
  './type-sol.png?v298',
  './type-poison.png?v298',
  './type-spectre.png?v298',
  './type-roche.png?v298',
  './type-vol.png?v298',
  './type-glace.png?v298',
  './type-insecte.png?v298',
  './sprites/acier.png',
  './sprites/combat.png',
  './sprites/dragon.png',
  './sprites/electric.png',
  './sprites/f%C3%A9e.png',
  './sprites/feu.png',
  './sprites/glace.png',
  './sprites/insecte.png',
  './sprites/normal.png',
  './sprites/plante.png',
  './sprites/poison.png',
  './sprites/roche.png',
  './sprites/sol.png',
  './sprites/spectre.png',
  './sprites/vol.png',
  './sprites/types/Miniature_Type_Acier_LPZA.png',
  './sprites/types/Miniature_Type_Combat_LPZA.png',
  './sprites/types/Miniature_Type_Dragon_LPZA.png',
  './sprites/types/Miniature_Type_Eau_LPZA.png',
  './sprites/types/Miniature_Type_Feu_LPZA.png',
  './sprites/types/Miniature_Type_F%C3%A9e_LPZA.png',
  './sprites/types/Miniature_Type_Glace_LPZA.png',
  './sprites/types/Miniature_Type_Insecte_LPZA.png',
  './sprites/types/Miniature_Type_Normal_LPZA.png',
  './sprites/types/Miniature_Type_Plante_LPZA.png',
  './sprites/types/Miniature_Type_Poison_LPZA.png',
  './sprites/types/Miniature_Type_Psy_LPZA.png',
  './sprites/types/Miniature_Type_Roche_LPZA.png',
  './sprites/types/Miniature_Type_Sol_LPZA.png',
  './sprites/types/Miniature_Type_Spectre_LPZA.png',
  './sprites/types/Miniature_Type_T%C3%A9n%C3%A8bres_LPZA.png',
  './sprites/types/Miniature_Type_Vol_LPZA.png',
  './sprites/types/Miniature_Type_%C3%89lectrik_LPZA.png',
  './sprites/types/Icône_Type_Acier_LPZA.png',
  './sprites/types/Icône_Type_Combat_LPZA.png',
  './sprites/types/Icône_Type_Dragon_LPZA.png',
  './sprites/types/Icône_Type_Eau_LPZA.png',
  './sprites/types/Icône_Type_Feu_LPZA.png',
  './sprites/types/Icône_Type_F%C3%A9e_LPZA.png',
  './sprites/types/Icône_Type_Glace_LPZA.png',
  './sprites/types/Icône_Type_Insecte_LPZA.png',
  './sprites/types/Icône_Type_Normal_LPZA.png',
  './sprites/types/Icône_Type_Plante_LPZA.png',
  './sprites/types/Icône_Type_Poison_LPZA.png',
  './sprites/types/Icône_Type_Psy_LPZA.png',
  './sprites/types/Icône_Type_Roche_LPZA.png',
  './sprites/types/Icône_Type_Sol_LPZA.png',
  './sprites/types/Icône_Type_Spectre_LPZA.png',
  './sprites/types/Icône_Type_T%C3%A9n%C3%A8bres_LPZA.png',
  './sprites/types/Icône_Type_Vol_LPZA.png',
  './sprites/types/Icône_Type_%C3%89lectrik_LPZA.png',
  './sprites/pok%C3%A9ball.png',
  './sprites/super%20ball.png',
  './sprites/hyper%20ball.png',
  './sprites/honor%20bal.png',
  './sprites/luxe%20ball.png',
  './sprites/scuba%20ball.png',
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
      .then(cache => Promise.allSettled(APP_SHELL.map(url =>
        fetch(url, { cache: 'reload' }).then(response => {
          if (response.ok) return cache.put(url, response);
        })
      )))
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
          if (response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, copy));
          }
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
        if (response.ok) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      }))
      .catch(() => caches.match(event.request))
  );
});
