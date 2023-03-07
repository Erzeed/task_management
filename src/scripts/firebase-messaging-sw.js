import app from "./globals/config/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";
import CONFIG from "./globals/config";

// Get the messaging instance
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: payload.notification.click_action,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("install", () => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});
