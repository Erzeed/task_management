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
  update
} from "firebase/database";
import { validasiCreateUser } from "../utils/validasiLoginRegister";
import { doc, setDoc , getFirestore, getDoc, updateDoc, arrayUnion} from "firebase/firestore"; 

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

const cekRoleUser = (user) => {
  return new Promise((resolve, reject) => {
    const userId = user.uid;
    const db = getFirestore(app);
    getDoc(doc(db, "Dosen", userId))
    .then(docSnap => {
      if (docSnap.exists()) {
        // resolve(docSnap.data())
        console.log("ada")
      } else {
        getDoc(doc(db, "Mahasiswa", userId))
        .then(docSnap => {
          if (docSnap.exists()) {
            console.log(docSnap.data())
          } else {
            setDoc(doc(db, "Dosen", userId), {
              nama: user.displayName,
              iddosen: userId,
              role_status: "dosen",
              email: user.email
            })
            .then(() => {
              console.log("data update");
            }).catch((error) => {
              console.log(error);
            });
          }
        })
        .catch((error) => {
          console.log(error)
        });
      }
    })
    .catch((error) => {
      reject(error)
    });

  })
}
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
        cekRoleUser(user)
        resolve(user, token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
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
export const createNewUser = (data, id) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // resolve(user);
        const db = getFirestore(app);
        const userId = user.uid;
        setDoc(doc(db, "Mahasiswa", userId),{
            id: userId,
            nim: data.nim,
            email: user.email,
            id_dosen: data.idDosen,
            role_status: data.role
          }).then(() => {
            getDoc(doc(db, "Dosen", id))
            .then(docSnap => {
              if (docSnap.exists() && docSnap.data().id_mhs_bimbingan) {
                resolve(docSnap.data())
                updateDoc(doc(db, "Dosen", id), {
                    id_mhs_bimbingan: arrayUnion(userId) 
                  }, { merge: true })
                  .then(() => {
                    validasiCreateUser("succes");
                  }).catch((error) => {
                    console.log(error.code);
                  });
              } else {
                  setDoc(doc(db, "Dosen", id), {
                    id_mhs_bimbingan: [userId]
                  }, { merge: true })
                  .then(() => {
                    validasiCreateUser("succes");
                  }).catch((error) => {
                    console.log(error.code);
                  });
              }
            })
          }).catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorMessage = error.code;
        validasiCreateUser(errorMessage);
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
          getDoc(doc(db, "Dosen", id))
          .then(docSnap => {
            if (docSnap.exists()) {
              resolve(docSnap.data())
            } else {
              resolve("Data Kosong");
            }
          })
          .catch((error) => {
            reject(error)
          });
        }
      })
      .catch((error) => {
        reject(error)
      });
  });
};

export const updateProfileUser = (id, data, role) => {
  return new Promise((resolve , reject) => {
    const db = getFirestore(app);
    setDoc(doc(db, role, id), data, { merge: true })
      .then(() => {
        alert("Username added to user document in Cloud Firestore.");
      }).catch((error) => {
        alert(error);
      });
  });
};

export const getAllDataMhsBmbngan = (id) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore(app);
    getDoc(doc(db, "Dosen", id))
      .then(docSnap => {
        if (docSnap.exists()) {
          let dataUser = [];
          console.log(docSnap.data())
          const {id_mhs_bimbingan} = docSnap.data()
          id_mhs_bimbingan.forEach(e => {
            getDataUser(e).then(e => {
              dataUser.push(e)
              if(id_mhs_bimbingan.length == dataUser.length) {
                  resolve(dataUser)
                }
            })
          })
        } else {
          console.log("data kosong")
        }
      })
      .catch((error) => {
        reject(error)
      });
  })
}

export const saveDataInTodo = (data, id) => {
  return new Promise((resolve , reject) => {
      const db = getDatabase()
      push(ref(db, `users/${id}/todo`),data)
      .then(() => {
          resolve(true)
      })
      .catch((error => {
          console.log(error);
          reject(false)
      }))
  })
}

export const getDataTodo = (id) => {
  return new Promise((resolve , reject) => {
      const db = getDatabase();
      const starCountRef = ref(db,`users/${id}/todo`)
      onValue(starCountRef, (snapshot) => {
          try {
            const data = []
            if(snapshot.val() != null){
                Object.keys(snapshot.val()).forEach(e => {
                  data.push({
                    ... snapshot.val()[e],
                    id: e
                })
              })
              resolve(data)
            }
          } catch (error) {
            reject(error)
          }
      });
  })
}

export const updateCardStatus = (status,userId,todoId) =>  {
  return new Promise((resolve , reject) => {
      const db = getDatabase()
      update(ref(db, `users/${userId}/todo/${todoId}`),{
          status: status
      }).then(() => {
          resolve(true)
      })
      .catch((error => {
          reject(error)
      }))
  })
}

export const deleteCard = (idMhs, idCard) =>  {
  return new Promise((resolve, reject) => {
    const db = getDatabase()
    remove(ref(db, `users/${idMhs}/todo/${idCard}` ))
    .then(() => {
        resolve(true)
    })
    .catch(error => {
        reject(error)
    })
  })
}