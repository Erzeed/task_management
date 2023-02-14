import { precacheAndRoute } from 'workbox-precaching';
// import { registerRoute } from 'workbox-routing';
// import {StaleWhileRevalidate} from 'workbox-strategies';
// Do precaching

// registerRoute(
//     /\.(?:js|css|html)$/,
//     new StaleWhileRevalidate({
//       cacheName: 'static-resources',
//     })
//   );

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});
 
self.addEventListener('push', () => {
  console.log('Service Worker: Pushed');
})