import { usegetDatos, setDatos } from "./hooks/firebase-config";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function BotonGuardarBD({ cotiza, fbid }) {
  const [data9, error] = usegetDatos(fbid);

  const [guardadoCotizacion, setguardadoCotizacion] = useState([]);
  const [longitudDato, setlongitudDato] = useState(0);
  const [demora, setDemora] = useState(true);

  useEffect(() => {
    setDemora(false);
    const df = async () => {
      const datoso = await data9;

      if (datoso.length > 0) {
        localStorage.setItem("items", JSON.stringify(datoso));
        setlongitudDato((set) => (set = datoso.length));
        setDemora(true);
      }
    };
    df();
  }, [fbid, data9]);

  const posDescarga = async (guardado, local) => {
    const lista = [...local, guardado];
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
    posDescarga(cotiza, local);
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
