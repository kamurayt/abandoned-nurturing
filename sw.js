const CACHE_NAME = 'nyanko-kingdom-v2';
const BASE = '/abandoned-nurturing/';
const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'images/001.png',
  BASE + 'images/002.png',
  BASE + 'images/003.png',
  BASE + 'images/004.png',
  BASE + 'images/005.png',
  BASE + 'images/006.png',
  BASE + 'images/007.png',
  BASE + 'images/008.png',
  BASE + 'images/009.png',
  BASE + 'images/010.png',
  BASE + 'images/011.png',
  BASE + 'images/012.png',
  BASE + 'images/013.png',
  BASE + 'images/014.png',
  BASE + 'images/015.png',
  BASE + 'images/016.png',
  BASE + 'images/017.png',
  BASE + 'images/018.png',
  BASE + 'images/019.png',
  BASE + 'images/020.png',
  BASE + 'images/021.png',
  BASE + 'images/022.png',
  BASE + 'images/023.png',
  BASE + 'images/024.png',
  BASE + 'images/025.png',
  BASE + 'images/026.png',
  BASE + 'images/027.png',
  BASE + 'images/028.png',
  BASE + 'images/029.png',
  BASE + 'images/030.png',
  BASE + 'images/031.png',
  BASE + 'images/032.png',
  BASE + 'images/033.png',
  BASE + 'images/034.png',
  BASE + 'images/035.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .catch(err => console.log('キャッシュ失敗:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(cached => cached || fetch(e.request))
      .catch(() => caches.match(BASE + 'index.html'))
  );
});
