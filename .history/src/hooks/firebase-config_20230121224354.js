import { initializeApp } from "firebase/app";

import {
  onAuthStateChanged,
  getRedirectResult,
  signOut,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth" ;

import {
  getFirestore,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";

import { useEffect, useState } from "react";

const fbMarcos=import.meta.env.VITE_APP_FB;
console.log("🚀 ~ file: firebase-config.js:27 ~ fbMarcos", fbMarcos)
console.log(import.meta.env.VITE_APP_APIKEY);
// const fbMarcosOB=JSON.parse(fbMarcos);
// console.log(fbMarcosOB);
// const firebaseConfig = fbMarcosOB
const firebaseConfig = {

  apiKey:import.meta.env.VITE_APP_APIKEY,
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
const uids = null;

export const googleLogeo = async () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const users = result.user;

      // ...
      return {
        nombre: users.displayName,
        email: users.email,
        token: credential.accessToken,
      };
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const actualUser = () => {
  const [enCarga, setenCarga] = useState(3);
  const [fbid, setfbid] = useState(null);
  // const [usuario, setusuario] = useState(null);
  useEffect(() => {
    const fff = async () => {
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setenCarga(1);
          // setusuario((set) => (set = user.displayName));
          setfbid((set) => (set = user.uid));
        } else {
          setenCarga(2);
        }
      });
    };

    fff();
  }, []);

  return [enCarga, fbid];
};

export const setDatos = async (datos, usid) => {
  try {
    if (usid) {
      await setDoc(doc(db, "Cotiza", usid), { datos });
      return true;
    } else {
    }
  } catch (error) {}

  return;
};

export const usegetDatos = (fbid1 = null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const getDatos = async () => {
    try {
      const docRef = doc(db, "Cotiza", fbid1);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(async (set) => (set = await docSnap.data().datos));
      
      } else {
   
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getDatos();
  }, [fbid1]);
  return [data, error];
};

export const desLogGoogle = async () => {
  const auth = getAuth();
  return signOut(auth)
    .then((desLog) => desLog)
    .catch((error) => {
      console.log(error);
    });
};

export const correoLogeo = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
    window.localStorage.setItem("emailForSignIn", email);
    // ...
  });
};
