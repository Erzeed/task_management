import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { Workbox } from "workbox-window";
// Do precaching

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

const firestoreUrl =
  "https://wgther-b4fc3-default-rtdb.asia-southeast1.firebasedatabase.app/";


registerRoute(
  ({ url }) => url.origin === location.origin,
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

registerRoute(
  ({ url }) => url.origin === firestoreUrl,
  new StaleWhileRevalidate()
);

self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  event.waitUntil(
    self.skipWaiting()
    );
});


self.addEventListener("activate", (event) => {
  if (event.isUpdate) {
      console.log("Service worker updated");
  } else {
    console.log("Service worker activated");
}
});


self.addEventListener("fetch", (event) => {
    event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Cache hit");
        return response;
      }

      console.log("Cache miss");
      return fetch(event.request);
    })
  );
});
