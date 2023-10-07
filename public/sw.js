const CACHE_NAME = 'v1'
const CACHE_ASSETS = ['/', '/img-01.jpg', '/img-02.jpg']

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

/**
 * インストール時：アセットをキャッシュに追加する
 */
self.addEventListener("install", (e) => {
  e.waitUntil(
    addResourcesToCache(CACHE_ASSETS),
  );
});

/**
 * リクエスト時：キャッシュが存在する場合はキャッシュから取得し、存在しない場合はネットワークから取得し、結果をキャッシュに保存する
 */
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if(response){
        return response
      } else {
        return fetch(e.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      }
    }),
  );
});

/**
 * アクティブ時：現在のキャッシュ名以外の古いキャッシュをすべて削除する
 */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});
