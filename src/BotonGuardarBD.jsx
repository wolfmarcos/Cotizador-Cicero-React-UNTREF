import { usegetDatos, setDatos } from "./hooks/firebase-config";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./hooks/UserContext";
// import { UserProvider } from "./hooks/UserProvaider"


function BotonGuardarBD({ cotiza={}, fbid="" }) {
  const { userF , setUserF } = useContext(UserContext);
  const user2= {...userF,cotiza}
  // const user2= {...userF,cotiza:{...cotiza}}
  console.log("🚀 ~ file: BotonGuardarBD.jsx:14 ~ BotonGuardarBD ~ user2", user2)
  console.log("🚀 ~ file: BotonGuardarBD.jsx:13 ~ BotonGuardarBD ~ userF", userF)
  // setUser(user2)

  // console.log("🚀 ~ file: BotonGuardarBD.jsx:13 ~ BotonGuardarBD ~ user2", user2)
if (true) {
  
  return (
  
    <h1>Usuario:
      { userF.cotiza?.fecha}
    </h1>
    )
    

     
}
else{






  const [data9, error] = usegetDatos(fbid);
  // console.log("🚀 ~ file: BotonGuardarBD.jsx:12 ~ BotonGuardarBD ~ user", user)
  // setUser(set=>user["cotiza22"]=cotiza)
  // setUser((set)=>(set={...set.cotiza22,...cotiza}))
  // const setUser2=user.map(user=>user["cotiza22"]=cotiza)
  // const setUser2=user.map(user=>user.cotiza22=cotiza)
  // const setUser2={...user,cotiza22:cotiza}
  // setUser((set)=>(set={...set.cotiza22,}))

  // setUser((set)=>({...set,cotiza22:{...cotiza}}))
  //  const user2= {...user,cotiza22:cotiza}
//  const user2= {...user,cotiza22:{...cotiza}}
  // console.log("🚀 ~ file: BotonGuardarBD.jsx:15 ~ BotonGuardarBD ~ setUser2", user2)

  // console.log("🚀 ~ file: BotonGuardarBD.jsx:12 ~ BotonGuardarBD ~ userrrrrr", user)
  // setUser((set)=>({...set.primerCotizacion,cotiza:"bbbbb"}))
  // const [guardadoCotizacion, setguardadoCotizacion] = useContext(UserProvider);
  // setguardadoCotizacion("hola")
  const [longitudDato, setlongitudDato] = useState(0);
  const [demora, setDemora] = useState(true);

  useEffect(() => {
    const local2 = JSON.parse(localStorage.getItem("items")) || [];
    
     
    const df = async () => {
        
        const datoso = await data9;
        
        if (datoso.length >= 0) {
          localStorage.setItem("items", JSON.stringify(datoso));
          setlongitudDato((set) => (set = datoso.length));
          setDemora(true);
        }
   
        };
        if (local2 == 0) {
           setDemora(false) 
           df()
          }else{
            
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

}

export default BotonGuardarBD;