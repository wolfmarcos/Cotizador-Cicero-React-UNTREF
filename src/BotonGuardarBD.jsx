import { useGetDatos, setDatos } from "./hooks/firebase-config";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./hooks/UserContext";
// import { UserProvider } from "./hooks/UserProvaider"

function BotonGuardarBD({ cotiza = {}, fbid = "" }) {
  const { userF, setUserF } = useContext(UserContext);

  // const dupli = { fecha: "ppppp" };

  // useEffect(() => {
  //   setUserF((prev) => ({ ...prev, cotiza }));
  //   // const user2= {...userF,cotiza:[cotiza]}
  // }, []);

  const [data9, error] = useGetDatos(fbid);

  const [longitudDato, setlongitudDato] = useState(0);
  const [demora, setDemora] = useState(true);

  useEffect(() => {
    const local2 = JSON.parse(localStorage.getItem("items")) || [];
    console.log(
      "🚀 ~ file: BotonGuardarBD.jsx:26 ~ useEffect ~ local2",
      local2
    );

    const df = async () => {
      const colecionCotizacion = (await data9) || null;
      console.log(
        "🚀 ~ file: BotonGuardarBD.jsx:31 ~ df ~ colecionCotizacion",
        colecionCotizacion
      );

      if (colecionCotizacion.length > 0) {
        // localStorage.setItem("items", JSON.stringify(colecionCotizacion));
        setUserF((prev) => ({
          ...prev,
          colecionCotizacion: [...colecionCotizacion],
        }));
        setlongitudDato((set) => (set = userF.colecionCotizacion.length));
        setDemora(true);
        // setUserF((prev) =>({...prev, colecionCotizacion}))
        console.log("🚀 ~ file: BotonGuardarBD.jsx:38 ~ df ~ setUserF", userF);
      } else if (colecionCotizacion.length == 0) {
        //  alert("usuario nuevo")
        // setTimeout(() => {

        setDemora(true);
        setlongitudDato((set) => (set = userF.colecionCotizacion.length));
        // }, 2000);
      }
      else{
        console.log("nada = null");
      }
    };
    console.log("🚀 ~ file: BotonGuardarBD.jsx:61 ~ useEffect ~ userF.colecionCotizacion.lengt", userF.colecionCotizacion.length)
    if (userF.colecionCotizacion.length == 0) {
      setDemora(false);
      df();
    } else {
      setlongitudDato((set) => (set = userF.colecionCotizacion.length));
    }
  }, [data9]);

  const posDescarga = async (lista = []) => {
    if (lista.length >= 0) {
      const exito = await setDatos(lista, fbid);

      setDemora((set) => (set = exito));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cotizacion guardada exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });

     
      // localStorage.setItem("items", JSON.stringify(lista));
      setUserF((prev) => ({
        ...prev,
        colecionCotizacion: lista,
      }));

      // setlongitudDato((set) => (set = lista.length));
      setlongitudDato((set) => (set = userF.colecionCotizacion.length));

    }
  };

  const realizarGuardado = async () => {
    setDemora((set) => (set = false));
    // const local = JSON.parse(localStorage.getItem("items")) || [];
    const lista = [...userF.colecionCotizacion, cotiza];
    posDescarga(lista);
  };

  return (
    <>
      {demora ? (
        cotiza.costoM2 && !isNaN(cotiza.costoM2) ? (
          <div onClick={realizarGuardado}>
            <h1 button class="button guardado">
              💾{" "}
            </h1>
            <label> "Guardar la ultima cotizacion" </label>
          </div>
        ) : (
          " realize su cotizacion"
        )
      ) : (
        <img
          className="button button-outline"
          src="/DEMORA.gif"
          alt="page not found"
        />
      )}
      {demora ? (
        longitudDato > 0 && (
          <Link to="/historial">
            <div className="historial">
              <span title="Ver Historial">
                📋
                <div className="btn btn--1">{longitudDato}</div>
              </span>
            </div>
          </Link>
        )
      ) : (
        <div className="historial">
          <img
            className="button button-outline"
            src="/DEMORA.gif"
            alt="page not found"
          />
        </div>
      )}
    </>
  );
}

export default BotonGuardarBD;
