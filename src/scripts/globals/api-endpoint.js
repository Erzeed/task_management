import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
  remove,
} from "firebase/database";
import { doc, setDoc , getFirestore, getDoc} from "firebase/firestore"; 

import app from "./config/firebase";

export const registerPage = (data) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
        const errorMessage = error.code;
        reject(errorMessage);
      });
  });
};
export const registerPageWithGogle = () => {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        resolve(user, token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        reject(errorCode, email, credential);
      });
  });
};

export const loginByEmailPass = (data) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        reject(errorCode);
      });
  });
};
export const createNewUser = (data) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // resolve(user);
        const db = getFirestore(app);
        const userId = user.uid;
        setDoc(doc(db, "Mahasiswa", userId),{
            username: data.username,
            iddosen: data.idDosen,
            role: data.role
          }).then(() => {
            alert("Username added to user document in Cloud Firestore.");
          }).catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        const errorMessage = error.code;
        alert(error)
        reject(errorMessage);
      });
  });
};

export const getDataUser = (id) => {
  return new Promise((resolve , reject) => {
    const db = getFirestore(app);
      getDoc(doc(db, "Mahasiswa", id))
      .then(docSnap => {
        if (docSnap.exists()) {
          resolve(docSnap.data())
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        reject(error)
      });
  });
};

export const updateProfileUser = (id, data) => {
  return new Promise((resolve , reject) => {
    const db = getFirestore(app);
    setDoc(doc(db, "Mahasiswa", id), data)
      .then(() => {
        alert("Username added to user document in Cloud Firestore.");
      }).catch((error) => {
        alert(error);
      });
  });
};