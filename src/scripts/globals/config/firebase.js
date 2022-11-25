// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDepmw5_xfFkgf1WpmlwFyoye3MzAgM_eE",
  authDomain: "wgther-b4fc3.firebaseapp.com",
  projectId: "wgther-b4fc3",
  storageBucket: "wgther-b4fc3.appspot.com",
  messagingSenderId: "661573276889",
  appId: "1:661573276889:web:767d9f9b9cfbc797681ac8",
  measurementId: "G-8LMVZ23X32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;