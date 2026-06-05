const CACHE_NAME = 'nyanko-kingdom-v1';
const ASSETS = [
  './',
  './index.html',
  './images/001.png',
  './images/002.png',
  './images/003.png',
  './images/004.png',
  './images/005.png',
  './images/006.png',
  './images/007.png',
  './images/008.png',
  './images/009.png',
  './images/010.png',
  './images/011.png',
  './images/012.png',
  './images/013.png',
  './images/014.png',
  './images/015.png',
  './images/016.png',
  './images/017.png',
  './images/018.png',
  './images/019.png',
  './images/020.png',
  './images/021.png',
  './images/022.png',
  './images/023.png',
  './images/024.png',
  './images/025.png',
  './images/026.png',
  './images/027.png',
  './images/028.png',
  './images/029.png',
  './images/030.png',
  './images/031.png',
  './images/032.png',
  './images/033.png',
  './images/034.png',
  './images/035.png'
];

// インストール時：全アセットをキャッシュ
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 古いキャッシュを削除
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// キャッシュ優先・なければネット
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
