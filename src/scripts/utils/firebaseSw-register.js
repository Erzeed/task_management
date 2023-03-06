import CONFIG from "../globals/config";

const firebaseRegister = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported in the browser");
    return;
  }else {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
      console.log('fcm registered: ', registration);
      navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
        serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: CONFIG.VAPIDKEY
        }).then((subscription) => {
          console.log('Push subscription successful: ', subscription);
        }).catch((error) => {
          console.log('Push subscription error: ', error);
        });
      });
    }, (err) => {
      console.log('SW registration failed: ', err);
    });
  }
};

 

export default firebaseRegister;
