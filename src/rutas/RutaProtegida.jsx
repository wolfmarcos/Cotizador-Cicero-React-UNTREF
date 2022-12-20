import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import Swal from "sweetalert2";
import { actualUser } from "../hooks/firebase-config";
import ErrorPage from "./ErrorPage";

function RutaProtegida() {
  const [isAuth, setisAuth] = useState(3);

  const autenticador = async () => {
    const [enCarga, usuario] = await actualUser();

    setisAuth((set) => (set = enCarga));
  };

  autenticador();

  if (isAuth == 1) {
    return <Outlet />;
  } else if (isAuth == 2) {
    // alert("entro en 2",isAuth)
    Swal.fire({
      title: "Denegado!",
      text: "Realise su login",
      imageUrl: "/denegado.gif",

      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });

    return <Navigate to="/cotizador" />;
  } else if (isAuth == 3) {
    console.log("CARGANDO.................");
    return <ErrorPage />;
  }
}

export default RutaProtegida;
