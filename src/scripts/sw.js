import {precacheAndRoute} from 'workbox-precaching';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
//   self.skipWaiting();
});

self.addEventListener('fetch', async (e) => {
//   console.log(e);
});