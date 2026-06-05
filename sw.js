// キャッシュ完全無効化 - 常にネットワークから取得
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    // キャッシュを一切使わずネットワークのみ
    e.respondWith(fetch(e.request));
});
