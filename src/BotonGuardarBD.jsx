import { usegetDatos, setDatos } from "./hooks/firebase-config";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { async } from "@firebase/util";
function BotonGuardarBD({ cotiza, fbid }) {
  const [data9, error] = usegetDatos(fbid);

  const [guardadoCotizacion, setguardadoCotizacion] = useState([]);
  const [longitudDato, setlongitudDato] = useState(0);
  const [demora, setDemora] = useState(true);
  // const arru =[];
  // const autenticador =  async() => {

  //   return fbid
  // };

  // const local = JSON.parse(localStorage.getItem("items")) || [];

  // const[enCarga,usuario]=actualUser;
 

  useEffect(() => {
    setDemora(false)
    const df = async () => {
      const datoso = await data9;
   

      if (datoso.length > 0) {
        
        // setguardadoCotizacion( set=>set=datoso )
        // console.log("🚀 ~ file: setei :36 ~ df ~ setguardadoCotizacion", guardadoCotizacion)
        // localStorage.setItem("items", JSON.stringify("datoso"));
        localStorage.setItem("items", JSON.stringify(datoso));
        setlongitudDato((set)=>set=datoso.length )
        setDemora(true)
      }
    };
    df();
  }, [fbid, data9]);

  const posDescarga = async (guardado,local) => {
  
const lista =[...local, guardado]
    // setguardadoCotizacion((set) =>set=[...local, guardado]);
    // if (guardadoCotizacion.length >= 0 ) {
      // const exito = await setDatos(guardadoCotizacion, fbid);


    if (lista.length >= 0 ) {



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
    posDescarga(cotiza,local);
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
     <div className="historial">
          <span title="Ver Historial">
            {/* <Link to="/historial"> */}
            📋
            <div className="btn btn--1">{longitudDato}</div>
            {/* </Link> */}
          </span>
        </div>)
      )
      : ( <div className="historial">

          <img
            className="button button-outline"
            src="/DEMORA.gif"
            alt="page not found"
            />
            </div>
        )}
     



      {/* {guardadoCotizacion &&
        guardadoCotizacion.map((char) => <p> {char.propiedad}</p>)}
      <h1> guardadoCotizacion</h1> */}
      {/* {data9 && data9.map((char) => <p> {char.propiedad}</p>)} */}
    </>
  );
}

export default BotonGuardarBD;
