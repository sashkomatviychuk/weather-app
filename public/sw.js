const dataCacheName = 'weather-app-api-v1';

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);

  const dataUrl = 'https://query.yahooapis.com/v1/public/yql';

  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  }
});