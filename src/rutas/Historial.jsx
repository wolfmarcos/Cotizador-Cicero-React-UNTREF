import Tabla from "../Tabla";
import { Link } from "react-router-dom";
import { useState } from "react";

const Historial = () => {
  const items = JSON.parse(localStorage.getItem("items")) || [];

  const [guardadoCotizacion, setguardadoCotizacion] = useState(items);
  return (
    <>
      <h1 className="center separador">Historial 📋</h1>

      <div className=" center div-cotizador">
        Historial
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
            </tr>
          </thead>
          {guardadoCotizacion.map((data, i) => {
            return (
              <Tabla data={data} key={i} ide={i}>
                {/* <Link
                  style={{ position: "absolute" }}
                  to={"/" + i}
                  className="center div-cotizado"
                >
                  {"->"}
                </Link> */}
              </Tabla>
            );
          })}
        </table>
        <div className="center separador">
          <Link to="/cotizador">
            <button className="button button-outline">volver</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Historial;
