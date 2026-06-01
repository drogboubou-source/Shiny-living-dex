const CACHE_NAME = "shiny-living-dex-v1";

// On utilise des chemins relatifs (./) pour éviter les bugs selon l'endroit où est hébergé le site
const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"
];

// Installation : Mise en cache
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log("Mise en cache des fichiers capitaux");
            return cache.addAll(urlsToCache);
        })
        .then(() => self.skipWaiting()) // Force le SW à s'activer immédiatement
    );
});

// fetch : Stratégie Réseau, puis Cache en cas de panne
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
