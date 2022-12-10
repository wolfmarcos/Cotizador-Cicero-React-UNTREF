import { initializeApp } from "firebase/app";

import {
  onAuthStateChanged,
  getRedirectResult,
  signOut,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  getFirestore,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs
} from "firebase/firestore";

import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAq9AOg-sxa35Z2EflWYSg6AJb6NSXR2gU",
  authDomain: "cotizador-616a3.firebaseapp.com",
  projectId: "cotizador-616a3",
  storageBucket: "cotizador-616a3.appspot.com",
  messagingSenderId: "657272668279",
  appId: "1:657272668279:web:cc6f0fa016682995d00672",
  measurementId: "G-FDG9SJ15XN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();


export const actualUser = async () => {
  const [enCarga, setenCarga] = useState(3);
  const [fbid, setfbid] = useState(false);
  const [usuario, setusuario] = useState(false);

  onAuthStateChanged(auth, user => {
    if (user) {
      setenCarga(1);
      setusuario(set => (set = user.displayName));
      setfbid(set => (set = user.uid));
    } else {
      setenCarga(2);
    }
  });

  return [enCarga, usuario, fbid];
};

export const setDatos = async datos => {
  try {
    const User = await getAuth().currentUser.uid;
    if (User) {
      setDoc(doc(db, "Cotiza", User), {
        datos
      });
    } else {
    }
  } catch (error) {}
};

export const usegetDatos = (longitud) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  // const [user, setUser] = useState("p");

  const getDatos = async () => {
    

    try {
      const User = await getAuth().currentUser.uid;
      

      const docRef = doc(db, "Cotiza", User);

      const docSnap = await getDoc(docRef);

      let lista = [];
      console.log(lista);
      if (docSnap.exists()) {
        lista.push(docSnap.data());
        console.log("lista", docSnap.data());
      } else {
        console.log("No such document!");
      }

      setData(lista[0]);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getDatos();
  }, [longitud]);
  return [data, error];
};

export const desLogoGoogle = async () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};

export const gle = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user.uid);

      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const logeo = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
    window.localStorage.setItem("emailForSignIn", email);
    // ...
  });
};

//  const [ids, setids] = useState(second)
//   useEffect(() => {
//     [enCarga, usuario,fbid]=   actualUser()
//     // console.log("iiiiiiiiiiiiiiiiiiiiidddddddddddd",fbid);
//     setids((set)=>set=fbid)

//   }, [datos])

// userr= await auth.currentUser
// console.log(userr);
// userr=undefined?null:userr.id
// console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",userr);6qJK25xnFuMsUDAouVR9wjU1uYc2
// const datoo = onAuthStateChanged(auth, user => {
//   if (user) {        return user;
//   } else {

//     return "noooooooooooo";
//   }})

// setUser((set)=>set = user.uid)
// /* return datos  */
// console.log("useruser",user);
// console.log("useeseses;",datos);
//////////////////////////////////////////////////

// export const getDatos = async d => {
//   console.log("entroooooooooooooooooooooooooo", d);

//   const [usuario4, setusuario4] = useState(5);
//   // const [tomarDatos, setTomandoDatos] = useState(0);
//   // useEffect(() => {
//   //   console.log("primera");
//   console.log(usuario4);
//   const fff = () => {
//     //     let list = [];
//     //     const querySnapshot = await getDocs(collection(db, "Cotiza"));
//     //     querySnapshot.forEach(doc => {
//     //       list.push(doc.data());
//     //       console.log(doc.data());
//     //       console.log("lista", list);
//     //     });

//     //     console.log(list);
//     setusuario4(d++);
//     console.log(usuario4);
//   };
//   fff();

//   //   // return [tomarDatos];
//   // }, [d]);
//   return usuario4;
// };

// export const useGet = () => {
//   const [data, setData] = useState(0);
//   // const [usuario4, setusuario4] = useState(5);
//   const [error, setError] = useState(false);
//   const getDatos =  () => {
//     console.log("2 hook");
//     try {
//       // const { data } = await API.get(endpoint);

//       setTimeout(() => {
//         setData("d");
//         // setusuario4(d);
//       }, 2000);
//     } catch (error) {
//       setError(true);
//     }
//   };

//   // useEffect(() => {
//     getDatos();
//   // }, []);
//   return [data, error];
// };

// export const usegetDatos = (()) => {
//   const [data, setData] = useState([]);
//   // const [usuario4, setusuario4] = useState(5);
//   const [error, setError] = useState(false);

//   const getDatos = async (arrays) => {
//     console.log("2 hook");
//     try {

//               let lista = [];
//               const querySnapshot = await getDocs(collection(db, "Cotiza"));
//               querySnapshot.forEach(doc => {
//                 lista.push(doc.data());
//                 console.log(doc.data());
//                 console.log("lista", lista);
//               });
//         setData(lista[1] );
//       } catch (error) {
//         setError(true);
//       }
//     };

//   useEffect(() => {
//     getDatos(arrays);
//   }, [arrays]);
//   return [data, error];
// };
// const [idTotal, setidTotal] = useState()

// useEffect(() => {

//  const id = auth.currentUser.displayName
//  console.log("aaaaaaaaaaaau",id);
// }, [])

// const dd=() => {

// }

// dd()



///////////////

// export const setCities = async dato => {
//   try {
//     const User = await getAuth().currentUser.uid;
//     // console.log(
//     //   "3333333333333333333333333333333333333333333333333333333333333333",
//     //   User
//     // );
//     const docRef = await addDoc(collection(db, "users", User), {
//       dato
//     });
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };
