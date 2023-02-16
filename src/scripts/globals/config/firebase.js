// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDepmw5_xfFkgf1WpmlwFyoye3MzAgM_eE",
  authDomain: "wgther-b4fc3.firebaseapp.com",
  databaseURL : "https://wgther-b4fc3-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "wgther-b4fc3",
  storageBucket: "wgther-b4fc3.appspot.com",
  messagingSenderId: "661573276889",
  appId: "1:661573276889:web:767d9f9b9cfbc797681ac8",
  measurementId: "G-8LMVZ23X32"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore(app);

enableIndexedDbPersistence(db)
    .then(() => console.log("Enabled offline persistence"))
    .catch((error) => {
      if (error.code == "failed-precondition") {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
        console.log("eroro")
      } else if (error.code == "unimplemented") {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
        console.log("eror guys ")
      }
    });


export default app;