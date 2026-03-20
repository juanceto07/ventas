const CACHE_NAME = 'v1_cache_app_luces';
const urlsToCache = [
  './',
  './index.html',
  './style.css', // Asegúrate de que estos nombres coincidan con los tuyos
  './script.js',
  './manifest.json'
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Hacer que funcione sin internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if (res) return res; // Si está en caché, lo devuelve
      return fetch(e.request); // Si no, lo busca en internet
    })
  );
});
