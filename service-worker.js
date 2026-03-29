const CACHE_NAME = "nyt-books-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js"
];

// instalar
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// activar
self.addEventListener("activate", event => {
  console.log("Service Worker activated");
});

// fetch (offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});