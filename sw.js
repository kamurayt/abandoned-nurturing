// キャッシュを使わず常にネットワークから取得
// → GitHub更新が即全ユーザーに反映される

self.addEventListener('install', e => {
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    // 古いキャッシュを全削除
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    // 常にネットワークから取得、失敗時のみキャッシュ
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
