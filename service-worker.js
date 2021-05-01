importScripts("/precache-manifest.a0766a03158bead04a73f7c934a0d5f2.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");


if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
  // workbox.precaching.precacheAndRoute(self.__precacheManifest);
  // workbox.routing.registerRoute('/static/', workbox.strategies.cacheFirst({
  //   cacheName: 'placeholder-cache',
  // }));
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setCacheNameDetails({prefix: "lite-bdfi-app"});

self.addEventListener('message', (event) => {

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', function (event) {
  self.skipWaiting();
});


workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin &&
             url.pathname.startsWith('/static/data/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
  })
);


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
