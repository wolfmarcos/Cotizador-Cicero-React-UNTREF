import "../App.css";
import FormCotizador from "../FormCotizador2";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useAjax } from "../hooks/useAjax";
import { Link } from "react-router-dom";
import DataTime from "../hooks/Datatime";
import { usegetDatos, setDatos } from "../hooks/firebase-config";





//         docSnap.data().datos.forEach(element => {
// docs.push()
          
//         });



function App() {
  const [longitudDato, setlongitudDato] = useState(1);
  const [data9, error] = usegetDatos(longitudDato);
  ////////////
  const objetoCotizar = {
    costoM2: "",
    propiedad: "",
    ubicaciones: "",
    metros2: "",
    fecha: DataTime(),
  };
  const [cotiza, setcotiza] = useState(objetoCotizar);
  const [inicial, setinicial] = useState([])

  console.log(longitudDato,"🚀 ~ file: App.jsx:23 ~ App ~ data9", data9)
// const data8= [...data9]
  const local = JSON.parse(localStorage.getItem("items")) || [];
  console.log(data9.length >0,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",data9);

 
 
  if (data9.length > 0 ) {
    console.log("22222!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    try {
      console.log("tendria que tomar lo de la bd");
      // local = [...local, ...data9];
      setinicial([...local, ...data9])
      console.log("22222!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",inicial);
    } catch (error) { }
  }
  

  
  ////
  const [guardadoCotizacion, setguardadoCotizacion] = useState(inicial);
  ////
 
 
 
 
  //  setguardadoCotizacion((set)=>set = data9);
  // tendria que analizar el tiempo que toma el producto y el tiempo de respuesta al localo la  aplicacion carga toma parametro por defecto en nullo y catga el local
  // let [n, setn] = useState(1)
  // let i=1

  // const inicial=[]
  // if (data9==[] || data9==" ") {inicial=local
  //   console.log("data9==[]")

  // }else if(local==[] || local==" "){inicial=data9
  //       console.log("local==[]")
  // }
  // console.log(inicial);

useEffect(() => {
  setlongitudDato(set=>set+1)
  localStorage.setItem("items", JSON.stringify(guardadoCotizacion));
}, [])


  const guardasBD = async (guarda) => {
    
    try {
      console.log(guardadoCotizacion, "=3=", typeof guardadoCotizacion);
      console.log(guarda, "=33=", typeof guarda);
      setDatos(await guarda);
    } catch (error) { }
  };

  // localStorage.setItem("items", JSON.stringify([...data9,...guardadoCotizacion]));
  //   useEffect(() => {

  //   // console.log("setguardadoCotizacionsetguardadoCotizacionsetguardadoCotizacionsetguardadoCotizacion",guardadoCotizacion);

  // //   setguardadoCotizacion((set)=>set = data9);
  // // try {
  // // const datosPerdidos=[...local,...guardadoCotizacion]

  console.log("las suma de los datros que se pieden", [...data9]);
  //  localStorage.setItem("items", JSON.stringify([...data9,...guardadoCotizacion]));
  // // } catch (error) {

  // // }
  // //   console.log("cargandodododododododododododododododododododododododododododododododododododo");
  // //   // setguardadoCotizacion((set) => [...set, ...data9]);
  // //   localStorage.setItem("items", JSON.stringify(guardadoCotizacion));
  // //   // setlongitudDato((set) => (set = guardadoCotizacion.length));
  //   }, [guardadoCotizacion]);

  const [demora, setDemora] = useState(true);

  const url2 = "https://api.npoint.io/2c789c463f2951308811";

  const [data, isLoading] = useAjax(url2);

  const realizarGuardado = () => {
    console.log("111111:", cotiza, " = cotiza 1 guarda = ", typeof cotiza);
    console.log(
      "111111:",
      cotiza,
      " = cotiza 1.2 guarda = ",
      guardadoCotizacion
    );

    setguardadoCotizacion((set) => [...set, cotiza]);
    // console.log("conchaaaaaaaaaaaaaa");
    const datoto = [{a:"a"},{b:"b"}]

    console.log(datoto,"esese", typeof datoto );
    console.log(guardadoCotizacion, "2", typeof guardadoCotizacion);

    if (guardadoCotizacion != null || guardadoCotizacion !=" ") {
      // alert(guardadoCotizacion)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cotizacion guardada exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });

      guardasBD(guardadoCotizacion);
    }
    // const [data9, error] = usegetDatos();
    // console.log(guardadoCotizacion, data9);
    // setDatos(guardadoCotizacion);
    // setguardadoCotizacion((set) => [...set, ...data9]);
    // setDatos(guardadoCotizacion);

    // useEffect(() => {
    //     const ff=()=>{try {
    //       setn(set=>set+1)
    // console.log(n,"cargandodododododododododododododododododododododododododododododododododododo",i=i+i);
    // console.log(data9,"cargandodododododododododododododododododododododododododododododododododododo",i=i+i);
    //      ;
    // setDatos(guardadoCotizacion);
    //       // setguardadoCotizacion((set) => [...set, ...data9.datos]);
    //       // console.log(guardadoCotizacion);
    //     } catch (error) {      }
    //   }
    //   ff()
    // }, [guardadoCotizacion])

    // console.log("2longg:", longitudDato);
    // console.log("esssssssssss2", guardadoCotizacion);

    // try {
    // setguardadoCotizacion((set) => [...set, ...data9]);
    // useEffect(() => {
    // setDatos(guardadoCotizacion);

    // localStorage.setItem("items", JSON.stringify(guardadoCotizacion));
    // setlongitudDato((set) => (set = guardadoCotizacion.length ));
    // setDatos(guardadoCotizacion);
    // }, [guardadoCotizacion]);

    // } catch (error) {}

    // console.log("esssssssssss3", guardadoCotizacion);
  };
  

  if (isLoading) return <h3>Loading...</h3>;

  function tomarData(e) {
    setcotiza((set) => ({ ...set, [e.target.name]: e.target.value }));
  }

  const sertifica = () => {
    console.log(cotiza.propiedad);
    if (
      cotiza.propiedad == "" ||
      cotiza.propiedad == null ||
      isNaN(cotiza.propiedad)
    ) {
      Swal.fire({ title: "No ingreso tipo de propiedad", icon: "warning" });
      return false;
    }

    if (
      cotiza.ubicaciones == "" ||
      cotiza.ubicaciones == null ||
      isNaN(cotiza.ubicaciones)
    ) {
      Swal.fire({ title: "no ingreso la ubicaciones", icon: "warning" });
      return false;
    }

    if (
      cotiza.metros2 == "" ||
      cotiza.metros2 == null ||
      isNaN(cotiza.metros2)
    ) {
      Swal.fire({
        title: "no ingreso metros2 ,no modifique la pagina, gracis",
        icon: "warning",
      });
      return false;
    }

    return true;
  };

  const recargaDatos = () => {
    let propiedad = data.propiedades.filter((props) => {
      if (props.factor == cotiza.propiedad) {
        return props;
      }
    });
    console.log(propiedad[0].tipo);
    let ubicaciones = data.ubicaciones.filter((props) => {
      if (props.factor == cotiza.ubicaciones) {
        return props;
      }
    });

    setcotiza((set) => ({
      ...set,
      propiedad: propiedad[0].tipo,
      ubicaciones: ubicaciones[0].tipo,
    }));
    console.log("alta mierda", cotiza);
  };

  const funcionCotizar = (e) => {
    e.preventDefault();
    if (sertifica()) {
      setDemora((set) => (set = false));
      setTimeout(() => {
        setDemora((set) => (set = true));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cotización realizada con éxito.",
          showConfirmButton: false,
          timer: 1000,
        });
      }, 1000);

      const resultado = (
        +data.costoM2 *
        +cotiza.propiedad *
        +cotiza.ubicaciones *
        +cotiza.metros2
      ).toFixed(2);
      setcotiza((set) => ({ ...set, costoM2: resultado }));
    }
    recargaDatos();
  };

  return (
    <div className="App">
      {guardadoCotizacion.length > 0 && (
        <div className="historial">
          <span title="Ver Historial">
            <Link to="/historial">
              📋
              <div className="btn btn--1">{longitudDato}</div>
            </Link>
          </span>
        </div>
      )}
      <h1> sin descarga de gitH</h1>
      {guardadoCotizacion &&
        guardadoCotizacion.map((char) => <p> {char.propiedad}</p>)}
      <h1 o className="center separador">
        Seguros del hogar 🏡
      </h1>

      {data9 && data9.map((char) => <p> {char.propiedad}</p>)}

      <div className=" center div-cotizador">
        <FormCotizador
          tomarData={tomarData}
          data={data}
          funcionCotizar={funcionCotizar}
          demora={demora}
          cotiza={cotiza}
        />

        <div className="center separador">
          <p className="importe">
            Precio estimado: ${" "}
            <span id="valorPoliza">{cotiza.costoM2 || "00.0"}</span>
          </p>
          {cotiza.costoM2 && !isNaN(cotiza.costoM2) ? (
            <div onClick={realizarGuardado}>
              <h1 button class="button guardado">
                💾{" "}
              </h1>
              <label> "Guardar la ultima cotizacion" </label>
            </div>
          ) : (
            // <Link to="/historial">
            <button class="button">Gracias</button>
            // </Link>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
