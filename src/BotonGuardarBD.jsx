import { usegetDatos, setDatos } from "./hooks/firebase-config";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function BotonGuardarBD({ cotiza={}, fbid="" }) {
  
  
  const [data9, error] = usegetDatos(fbid);

  const [guardadoCotizacion, setguardadoCotizacion] = useState([]);
  const [longitudDato, setlongitudDato] = useState(0);
  const [demora, setDemora] = useState(true);

 useEffect(() => {
    const local2 = JSON.parse(localStorage.getItem("items")) || [];
  

    const df = async () => {
      const colecionCotizacion = (await data9) || null;
      
      
       if (colecionCotizacion.length > 0) {
        localStorage.setItem("items", JSON.stringify(colecionCotizacion));
        setlongitudDato((set) => (set = colecionCotizacion.length));
        setDemora(true);
        // setUserF((prev) =>({...prev, colecionCotizacion}))
        } else if (colecionCotizacion.length == 0) {
         // setTimeout(() => {
        setDemora(true);
        setlongitudDato((set) => (set = local2.length));
        // }, 400);
      }
    };
    if (local2.length == 0) {
      setDemora(false);
      df();
    } else {
      setlongitudDato((set) => (set = local2.length));
    }
  }, [data9]);

  const posDescarga = async (lista=[]) => {
    
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

      localStorage.setItem("items", JSON.stringify(lista));

      setlongitudDato((set) => (set = lista.length));
    }
  };

  const realizarGuardado = async () => {
    setDemora((set) => (set = false));
    const local = JSON.parse(localStorage.getItem("items")) || [];
    const lista = [...local, cotiza];
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
