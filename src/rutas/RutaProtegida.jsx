import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import Swal from "sweetalert2";
import { actualUser } from "../hooks/firebase-config";
import ErrorPage from "./ErrorPage";

function RutaProtegida() {
  const [isAuth, setisAuth] = useState(3);
  const [usuarios, setusuarios] = useState(3);

  // useEffect(() => {
      const autenticador = async () => {
      
      const [enCarga, usuario] = await actualUser();
      setusuarios(set=>(set=usuario))
      setisAuth(set => (set = enCarga));
    };
    // }, [])
    


  autenticador();

  if (isAuth == 1) {
 
   
    // let timerInterval
    // Swal.fire({
    //   title: 'Gracias '+usuarios +" pongame un 10",
      
    //   imageUrl: "/bienvenido2.gif",
    //   imageWidth: 400,
    //   html: 'I will close in <b></b> milliseconds.',
    //   imageHeight: 200,
    //   imageAlt: "Custom image",
    //   timer: 1000,
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading()
    //     const b = Swal.getHtmlContainer().querySelector('b')
    //     timerInterval = setInterval(() => {
    //       b.textContent = Swal.getTimerLeft()
    //     }, 100)
    //   },
    //   willClose: () => {
    //     clearInterval(timerInterval)
    //   }
    // }).then((result) => {
    //   /* Read more about handling dismissals below */
    //   if (result.dismiss === Swal.DismissReason.timer) {
    //     console.log('I was closed by the timer')
    //   }
    // })
   
   
    
   
   
    return <Outlet />;



  } else if (isAuth == 2) {
    Swal.fire({
      title: "Denegado!",
      text: "Realise su login",
      imageUrl: "/denegado.gif",

      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });

    return <Navigate to="/cotizador" />;
  } else if (isAuth == 3) {
    console.log("CARGANDO.................");
    return <ErrorPage />;
  }
}

export default RutaProtegida;
