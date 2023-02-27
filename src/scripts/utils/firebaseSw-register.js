
const firebaseRegister = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported in the browser");
    return;
  }else {

    try {
        await navigator.serviceWorker.register("./firebase-messaging-sw.js");
    } catch (error) {
      console.log("Failed to register service worker", error);
    }
  }

};

export default firebaseRegister;
