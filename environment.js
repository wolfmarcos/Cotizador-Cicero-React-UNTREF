// const fbMarcos=import.meta.env.VITE_APP_FB;
// console.log("🚀 ~ file: firebase-config.js:27 ~ fbMarcos", fbMarcos)
// const fbMarcosOB=JSON.parse(fbMarcos);
// console.log(fbMarcosOB);
// const firebaseConfig = fbMarcosOB



export const environment = {
  
  firebaseConfig:JSON.parse(import.meta.env.VITE_APP_FB)
};
// firebaseConfig: {
  //   apiKey: "AIzaSyAq9AOg-sxa35Z2EflWYSg6AJb6NSXR2gU",

  //   authDomain: "cotizador-616a3.firebaseapp.com",
  //   projectId: "cotizador-616a3",
  //   storageBucket: "cotizador-616a3.appspot.com",
  //   messagingSenderId: "657272668279",
  //   appId: "1:657272668279:web:cc6f0fa016682995d00672",
  //   measurementId: "G-FDG9SJ15XN",
  // }
// production:true,
  // apiKey: import.meta.env.VITE_APP_APIKEY,
    // ain: "cotizador-616a3.firebaseapp.com",
    //   authDomimport { environment } from './../../.history/environment.prod_20230123191635';
// console.log("(!!!!!!!!!!!!!!!!!!!!!!!!!!22",import.meta.env.VITE_APP_APIKEY);