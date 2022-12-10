import "../App.css";
import FormCotizador from "../FormCotizador2";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useAjax } from "../hooks/useAjax";
import { Link } from "react-router-dom";
import DataTime from "../hooks/Datatime";
import { usegetDatos ,setDatos } from "../hooks/firebase-config";

function App() {
  
  ////////////
  const objetoCotizar = {
    costoM2: "",
    propiedad: "",
    ubicaciones: "",
    metros2: "",
    fecha: DataTime()
  };
  const [cotiza, setcotiza] = useState(objetoCotizar);

  const items = JSON.parse(localStorage.getItem('items')) || [];

  const [guardadoCotizacion, setguardadoCotizacion] = useState(items)

  useEffect(() => {
    setDatos(guardadoCotizacion)
    localStorage.setItem('items', JSON.stringify(guardadoCotizacion));
  }, [guardadoCotizacion]);
////////////////////////////////



// const [cotiza, setcotiza] = useState(objetoCotizar);
  
  
  
  // const [ep, setEp] = useState(1)
  const repe = () => {
    setEp(set => (set = 2));
  };
  //  const items2 = JSON.parse(localStorage.getItem("items")) || [];
  //  const items = data9 || JSON.parse(localStorage.getItem("items")) ||[objetoCotizar];
  
  // const [guardadoCotizacion, setguardadoCotizacion] = useState(items2);
  
  // if (error) return <h3>WTF 😫</h3>;
  
  
  
  //   // useEffect(() => {
    //   //   localStorage.setItem("items", JSON.stringify(guardadoCotizacion));
    //   // }, [guardadoCotizacion]);
    // }
    
    // if (error) return <h3>WTF 😫</h3>
    //   // setguardadoCotizacion(...set, tomarDatos);
    
    
    const [demora, setDemora] = useState(true);
    
    
    
    // useEffect(() => {
  //   setDatos(guardadoCotizacion)
  //   localStorage.setItem("items", JSON.stringify(guardadoCotizacion));
  // }, [guardadoCotizacion]);
  
  const url2 = "https://api.npoint.io/2c789c463f2951308811";
  
  const [data, isLoading] = useAjax(url2);
  const longitud=guardadoCotizacion.length
  // const [data9, error] = usegetDatos(longitud);
  // console.log("esssssssssss1",data9)
  const [longitudDato, setlongitudDato] = useState(0)
  console.log(longitudDato);
  const realizarGuardado = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cotizacion guardada exitosamente",
      showConfirmButton: false,
      timer: 1500
    });
    try {
      const [data9, error] = usegetDatos(longitudDato);
      
      
      console.log("esssssssssss2",guardadoCotizacion)
      // setguardadoCotizacion(set => [...[...set, cotiza],...data9]);
      setguardadoCotizacion(set => [...set, cotiza]);
      const longitud=guardadoCotizacion.length
      console.log(longitud);
      setlongitudDato(longitud)
      setguardadoCotizacion(set => [...set,...data9]);
      console.log("esssssssssss3",guardadoCotizacion)
    } catch (error) {
      
    }
  };
  if (isLoading) return <h3>Loading...</h3>;

  function tomarData(e) {
    setcotiza(set => ({ ...set, [e.target.name]: e.target.value }));
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!", cotiza);
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
        icon: "warning"
      });
      return false;
    }

    return true;
  };

  const recargaDatos = () => {
    let propiedad = data.propiedades.filter(props => {
      if (props.factor == cotiza.propiedad) {
        return props;
      }
    });
    console.log(propiedad[0].tipo);
    let ubicaciones = data.ubicaciones.filter(props => {
      if (props.factor == cotiza.ubicaciones) {
        return props;
      }
    });

    setcotiza(set => ({
      ...set,
      propiedad: propiedad[0].tipo,
      ubicaciones: ubicaciones[0].tipo
    }));
    console.log("alta mierda", cotiza);
  };

  const funcionCotizar = e => {
    e.preventDefault();
    if (sertifica()) {
      setDemora(set => (set = false));
      setTimeout(() => {
        setDemora(set => (set = true));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cotización realizada con éxito.",
          showConfirmButton: false,
          timer: 1000
        });
      }, 1000);

      const resultado = (
        +data.costoM2 *
        +cotiza.propiedad *
        +cotiza.ubicaciones *
        +cotiza.metros2
      ).toFixed(2);
      setcotiza(set => ({ ...set, costoM2: resultado }));
    }
    recargaDatos();
  };

  // const limipiar = () => {
  //   setcotiza(objetoCotizar);
  // };
  return (
    <div className="App">
      {/* <div>
        <button onClick={repe}>changeee ep</button>
        {data9.datos && data9.datos.map(char => <p> {char.propiedad}</p>)}
      </div> */}

      {guardadoCotizacion.length > 0 && (
        <div className="historial">
          <span title="Ver Historial">
            <Link to="/historial">📋 </Link>
          </span>
        </div>
      )}
      <h1 o className="center separador">
        Seguros del hogar 🏡
      </h1>

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
            <button class="button" onClick={repe}>
              Traer su ingormacion de la Base de datos
            </button>
            // </Link>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
