const cacheName = 'weather-app-v1';
const dataCacheName = 'weather-app-api-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/dist/bundle.js',
  '/images/wi-cloudy.svg',
  '/images/wi-day-cloudy-high.svg',
  '/images/wi-day-cloudy.svg',
  '/images/wi-day-fog.svg',
  '/images/wi-day-rain.svg',
  '/images/wi-day-sunny.svg',
  '/images/wi-rain.svg',
  '/images/wi-showers.svg',
  '/images/wi-sleet.svg',
  '/images/wi-snow.svg',
  '/images/wi-thunderstorm.svg',
  '/images/wi-windy.svg',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');

  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});

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
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});