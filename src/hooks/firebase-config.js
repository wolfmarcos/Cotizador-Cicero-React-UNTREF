import {
  initializeApp
} from "firebase/app";

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
  getDocs,

} from "firebase/firestore";



import {
  useEffect,
  useState
} from "react";



const firebaseConfig = {
  apiKey: "AIzaSyAq9AOg-sxa35Z2EflWYSg6AJb6NSXR2gU",
  authDomain: "cotizador-616a3.firebaseapp.com",
  projectId: "cotizador-616a3",
  storageBucket: "cotizador-616a3.appspot.com",
  messagingSenderId: "657272668279",
  appId: "1:657272668279:web:cc6f0fa016682995d00672",
  measurementId: "G-FDG9SJ15XN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();

export const setDatos = async (datos) => {


  onAuthStateChanged(auth, (user) => {
    if (user) {


      setDoc(doc(db, "Cotiza", user.uid), {
        datos
      });

      return user;
    } else {
      setusuario(2);

      return user;
    }
  });

}

export const getDatos = () => {

  const [tomarDatos, setTomandoDatos] = useState([]);
  useEffect(() => {
    console.log("primera");

    const fff = async () => {

      let list = []
      const querySnapshot = await getDocs(collection(db, "Cotiza"));
      querySnapshot.forEach((doc) => {

        list.push(doc.data())
        console.log(doc.data());
        console.log("lista", list);
      });

      console.log(list);
    }
    setTomandoDatos(set => set = list)
    fff()

    return [tomarDatos]
  }, [])
  return [tomarDatos]
}



export const setCities = async (dato) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      dato
    });

  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const desLogoGoogle = async () => {


  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.console.log(

    console.log(error);
  });
};

export const actualUser = async () => {
  const [usuario, setusuario] = useState(3);
  onAuthStateChanged(auth, (user) => {
    if (user) {

      // console.log(user.displayName);

      // console.log(auth.currentUser.displayName);
      setusuario(1);

      return user;
    } else {
      setusuario(2);

      return user;
    }
  });

  return usuario;
};

export const gle = async () => {
  //  let result=""

  // signInWithRedirect(auth, provider);
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user.uid);

      // ...
    })
    .catch((error) => {
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
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      // ...
    })


}