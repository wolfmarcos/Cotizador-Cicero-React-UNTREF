export const environment2 = {

  firebaseConfig: {

    apiKey: import.meta.env.VITE_APP_APIKEY,
    authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECTID,
    storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APP_APPID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
  }
};




// firebaseConfig: {
//     apiKey: "AIzaSyAq9AOg-sxa35Z2EflWYSg6AJb6NSXR2gU",
//     authDomain: "cotizador-616a3.firebaseapp.com",
//     projectId: "cotizador-616a3",
//     storageBucket: "cotizador-616a3.appspot.com",
//     messagingSenderId: "657272668279",
//     appId: "1:657272668279:web:cc6f0fa016682995d00672",
//     measurementId: "G-FDG9SJ15XN"
//   }

// if(import.meta.env.MODE === "development"){ console.log("process.env.:",import.meta.env.VITE_APP_APIKEY);}
