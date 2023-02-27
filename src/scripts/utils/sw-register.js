import * as WorkboxWindow from "workbox-window";

const swRegister = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported in the browser");
    return;
  }else {
      const wb = new WorkboxWindow.Workbox("./sw.bundle.js");
    
      try {
        await wb.register();
        // await navigator.serviceWorker.register("./firebase-messaging-sw.js");
    } catch (error) {
      console.log("Failed to register service worker", error);
    }
  }

};

export default swRegister;
