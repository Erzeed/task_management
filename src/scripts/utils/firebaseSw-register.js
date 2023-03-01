
const firebaseRegister = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported in the browser");
    return;
  }else {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
      console.log('SW registered: ', registration);
    }, (err) => {
      console.log('SW registration failed: ', err);
    });
  }

};

export default firebaseRegister;
