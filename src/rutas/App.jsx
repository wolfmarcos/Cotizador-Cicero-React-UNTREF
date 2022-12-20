import "../App.css";
import FormCotizador from "../FormCotizador2";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useAjax } from "../hooks/useAjax";
import { Link } from "react-router-dom";
import DataTime from "../hooks/Datatime";
import { actualUser } from "../hooks/firebase-config";
import BotonGuardarBD from "../BotonGuardarBD";

function App() {
  const [enCarga, usuario, fbid] = actualUser();
  const [Logeo, setLogeo] = useState(null);

  useEffect(() => {
    setLogeo((set) => (set = usuario));
  }, [usuario]);

  const url2 = "https://api.npoint.io/2c789c463f2951308811";

  const [data, isLoading] = useAjax(url2);

  const objetoCotizar = {
    costoM2: null,
    propiedad: null,
    ubicaciones: null,
    metros2: null,
    fecha: DataTime(),
  };
  const [cotiza, setcotiza] = useState(objetoCotizar);

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
    } else if (
      cotiza.ubicaciones == " " ||
      cotiza.ubicaciones == null ||
      isNaN(cotiza.ubicaciones)
    ) {
      console.log(cotiza.ubicaciones, typeof cotiza.ubicaciones);
      Swal.fire({ title: "no ingreso la ubicaciones", icon: "warning" });
      return false;
    } else if (
      cotiza.metros2 == " " ||
      cotiza.metros2 == null ||
      isNaN(cotiza.metros2)
    ) {
      Swal.fire({
        title: "no ingreso metros2 ,no modifique la pagina, gracis",
        icon: "warning",
      });
      return false;
    } else {
      return true;
    }
  };
  const deslogeado = () =>
    Swal.fire({ title: "Aun no esta registrado", icon: "warning" });

  const recargaDatos = () => {
    let propiedad = data.propiedades.filter((props) => {
      if (props.factor == cotiza.propiedad) {
        return props;
      }
    });

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
    const datosCompletados = sertifica();
    console.log(datosCompletados);
    if (datosCompletados) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cotización realizada con éxito.",
        showConfirmButton: false,
        timer: 1000,
      });
      const resultado = (
        +data.costoM2 *
        +cotiza.propiedad *
        +cotiza.ubicaciones *
        +cotiza.metros2
      ).toFixed(2);
      setcotiza((set) => ({ ...set, costoM2: resultado }));
      recargaDatos();
    }
  };

  return (
    <div className="App">
      <h1 o className="center separador">
        Seguros del hogar 🏡
      </h1>

      <div className=" center div-cotizador">
        <FormCotizador
          tomarData={tomarData}
          data={data}
          funcionCotizar={funcionCotizar}
          // demora={demora}
          cotiza={cotiza}
        />

        <div className="center separador">
          <p className="importe">
            Precio estimado: ${" "}
            <span id="valorPoliza">{cotiza.costoM2 || "00.0"}</span>
          </p>
          {/* (typeof usuario)!="String" */}
          {Logeo == null ? (
            <div onClick={deslogeado}>
              <h1 button class="button guardado">
                💾
              </h1>
              <label>
                "Para guardatodas sus cotizacionse debe estar registrado"{" "}
              </label>
            </div>
          ) : (
            <BotonGuardarBD cotiza={cotiza} fbid={fbid} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
