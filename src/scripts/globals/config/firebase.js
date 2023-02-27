// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  enableIndexedDbPersistence,
  synchronizeTabs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDepmw5_xfFkgf1WpmlwFyoye3MzAgM_eE",
  authDomain: "wgther-b4fc3.firebaseapp.com",
  databaseURL:
    "https://wgther-b4fc3-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "wgther-b4fc3",
  storageBucket: "wgther-b4fc3.appspot.com",
  messagingSenderId: "661573276889",
  appId: "1:661573276889:web:767d9f9b9cfbc797681ac8",
  measurementId: "G-8LMVZ23X32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// if ((typeof window !== 'undefined')) {
//   const analytics = getAnalytics(app);
// }

const db = getFirestore(app);

enableIndexedDbPersistence(db, { forceOwnership: true }) // forceOwnership for web worker
.then(() => console.log("Offline persistence enabled"))
.catch(error => {
    switch (error.code) {
        case 'failed-precondition':
            console.log("Offline persistence already enabled in another tab")
            break
        case 'unimplemented':
            console.log("Offline persistence not supported by browser")
            break
        default:
            console.error(error)
    }
})

export default app;
