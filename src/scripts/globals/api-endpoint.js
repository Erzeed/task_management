import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
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
import { doc, setDoc , getFirestore, getDoc, updateDoc, arrayUnion, addDoc,collection, getDocs, orderBy, query, deleteDoc, arrayRemove, deleteField} from "firebase/firestore"; 
import { getStorage, ref as refStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {loadingProggresUploadFile, loadingUploadError} from "../utils/customToast.js";
import { deleteToken, getMessaging, getToken } from "firebase/messaging";
import CONFIG from './config';
import app from "./config/firebase";
import axios from "axios";
import QueryString from "qs";


export const registerPage = (data) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const db = getFirestore(app);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
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
        const db = getFirestore(app);
        const userId = user.uid;
        setDoc(doc(db, "Mahasiswa", userId),{
            id: userId,
            nim: data.nim,
            email: user.email,
            id_dosen: data.idDosen,
            role_status: data.role,
            createdAt: + new Date(),
            dosen_pembimbing: data.dosen_pembimbing
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
        }else {
          resolve(false)
        }
      })
      .catch((error) => {
        reject(error)
      });
  });
};

export const getDataDosen = (id) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore(app);
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
  })
}

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
          const {id_mhs_bimbingan} = docSnap.data();
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
  console.log(nim)
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

export const updateStatusAndCreateDataBimbingan = (status,
  userId,todoId, data) =>  {
  return new Promise((resolve , reject) => {
      const dbRealtime = getDatabase()
      const db = getFirestore();
      update(ref(dbRealtime, `users/${userId}/todo/${todoId}`),{
          status: status,
          deskripsi: data.deskripsi
      }).then(() => {
        addDoc(collection(db, `data_bimbingan/${userId}/bimbingan`), data)
          .then(() => {
            resolve(true)
          }).catch((error) => {
            reject(error);
          });
      })
      .catch((error => {
          reject(error)
      }))
  })
}

export const getDataRiwayatBimbingan = (userId) => {
  return new Promise((resolve , reject) => {
    const db = getFirestore(app);
    const data = []
    getDocs(query(collection(db, `data_bimbingan/${userId}/bimbingan`), orderBy('tgl_selesai', 'asc')))
      .then(querySnapshot => {
        if(!querySnapshot.empty){
          querySnapshot.forEach(doc => {
            data.push({
              ... doc.data(),
              id: doc.id
            })
            resolve(data)
          });
        }else {
          console.log("data kosong")
          resolve(false)
        }
      })
      .catch((error) => {
        reject(error)
      });
  });
};

export const getAllMhsData = () => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    getDocs(collection(db, "Mahasiswa"))
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          resolve(doc.data().nim)
        });  
      })
      .catch((error) => {
        reject(error)
      });
  })
}

export const initializPush = () => {
  return new Promise((resolve, reject) => {
    const messaging = getMessaging(app);
    getToken(messaging, { vapidKey: CONFIG.VAPIDKEY }).then((currentToken) => {
      if (currentToken) {
        resolve(currentToken)
      } 
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      reject(err.code)
    });;
  })
}

export const unRegisterToken = () => {
  return new Promise((resolve,reject) => {
    const messaging = getMessaging(app);
    getToken(messaging, { vapidKey: CONFIG.VAPIDKEY }).then((currentToken) => {
      console.log(currentToken)
      deleteToken(messaging, currentToken).then(() => {
        resolve(true)
      }).catch((err) => {
        console.log('Unable to delete token. ', err);
      })
    }).catch((err) => {
      console.log('Error retrieving registration token. ', err);
    })
  })
}

export const sendNotif = (message) => {
  return new Promise((resolve,reject) => {
    // Send the HTTP request to the FCM server
    axios.post(`https://firebase-push-message-git-main-erzeed.vercel.app/api/send`, QueryString.stringify(message), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      console.log('Notification sent successfully:', response);
      resolve(true)
    })
    .catch(error => {
      console.error('Error sending notification:', error.response.data.error);
      reject(error)
    });
  })
}

export const deleteAccountBimbingan = (userId, idDosen) => {
  return new Promise((resolve,reject) => {
    const db = getFirestore();
    updateDoc(doc(db, "Dosen", idDosen), {
      id_mhs_bimbingan: arrayRemove(userId) 
    }, { merge: true })
    .then(() => {
      deleteDoc(doc(db, "Mahasiswa", userId)).then(() => {
        getDataTodo(userId).then((resp) => {
          remove(ref(db, `users`, userId ))
          .then(() => {
            resolve(true)
          })
        })
        resolve(true)
      })
    }).catch((error) => {
      reject(error.code);
    });
  })
}

export const deleteFieldToken = (role,id) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    updateDoc(doc(db, `${role}`, id), {
      token_notif: deleteField()
    }, { merge: true })
    .then(() => {
      resolve(true)
    }).catch(error => {
      console.log(error)
    })
  })
}

export const updatePasswordUser = (data) => {
  return new Promise ((resolve,reject) => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      data.email, 
      data.password_lama
    );
    auth.onAuthStateChanged((user) => {
      if (user) {
        reauthenticateWithCredential(user, credential).then(() => {
          // User re-authenticated.
            updatePassword(user, data.password_baru).then((resp) => {
              // Update successful.
              resolve("succes")
            }).catch((error) => {
              console.log(error)
            });
        }).catch((error) => {
          const errorCode = error.code;
          reject(errorCode);
        });
      } else {
        console.log("signout")
      }
    });
  })
}