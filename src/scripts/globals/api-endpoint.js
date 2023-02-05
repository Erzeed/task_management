import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
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
import { doc, setDoc , getFirestore, getDoc, updateDoc, arrayUnion, Timestamp} from "firebase/firestore"; 
import { getStorage, ref as refStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {loadingProggresUploadFile, loadingUploadError} from "../utils/customToast.js";
import app from "./config/firebase";


export const registerPage = (data) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const db = getFirestore(app);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // cekRoleUser(user);
        setDoc(doc(db, "Dosen", user.uid), {
          nama: data.username,
          iddosen: user.uid,
          role_status: "dosen",
          email: user.email
        })
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
        cekRoleUser(user)
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
                    console.log("haii")
                    validasiCreateUser("succes");
                  }).catch((error) => {
                    reject(error.code);
                  });
              } else {
                  setDoc(doc(db, "Dosen", id), {
                    id_mhs_bimbingan: [userId]
                  }, { merge: true })
                  .then(() => {
                    validasiCreateUser("succes");
                  }).catch((error) => {
                    reject(error.code);
                  });
              }
            })
          }).catch((error) => {
            reject(error.code);
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
              console.log("hai")
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
        resolve(true)
      }).catch((error) => {
        reject(error)
        console.log(error)
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
          const {id_mhs_bimbingan} = docSnap.data()
          if(id_mhs_bimbingan !== undefined){
            id_mhs_bimbingan.forEach(e => {
              getDataUser(e).then(e => {
                dataUser.push(e)
                if(id_mhs_bimbingan.length == dataUser.length) {
                    resolve(dataUser)
                  }
              })
            })
          }
        } else {
          resolve("data kosong")
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
          reject(error)
      }))
  })
}

export const getDataTodo = (id) => {
  return new Promise((resolve , reject) => {
      const db = getDatabase();
      const starCountRef = ref(db,`users/${id}/todo`)
      onValue(starCountRef, (snapshot) => {
        const data = []
          try {
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

export const uploadFile = (nim, namaFolder, filePdf, idMhs, idCard) =>  {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const uploadTask = uploadBytesResumable(refStorage(storage, `${nim}/${namaFolder}/${filePdf.name}`), filePdf )
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      loadingProggresUploadFile(progress, filePdf.name , "Upload completed")
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      reject(error)
      loadingUploadError(filePdf.name )
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        const db = getDatabase()
        update(ref(db, `users/${idMhs}/todo/${idCard}`),{
            link_file: downloadURL
        }).then(() => {
          resolve(true)
        })
        .catch((error => {
            console.log(error)
        }))
      });
    }
  );
  })
}

export const addLinkBimbingan = (idMhs, idCard, url) =>  {
  return new Promise((resolve , reject) => {
      const db = getDatabase()
      update(ref(db, `users/${idMhs}/todo/${idCard}`),{
          url_file: url
      }).then(() => {
          resolve(true)
      })
      .catch((error => {
          reject(error)
      }))
  })
}

export const getDataBimbingan = (userId, todoId) => {
  console.log(userId)
  return new Promise((resolve , reject) => {
      const db = getDatabase()
      const starCountRef = ref(db,`users/${userId}/todo/${todoId}`)
      onValue(starCountRef, (snapshot) => {
          try {
            if(snapshot.val() != null){
              resolve(snapshot.val())
            }
          } catch (error) {
            reject(error)
          }
      })
  })
}