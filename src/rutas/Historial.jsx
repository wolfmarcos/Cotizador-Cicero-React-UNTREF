import Tabla from "../Tabla";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../hooks/UserContext"; 

const Historial = () => {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const { userF, setUserF } = useContext(UserContext);


  const [guardadoCotizacion, setguardadoCotizacion] = useState(items);
  return (
    <>
      <h1>
      {userF}
    </h1>
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
            return <Tabla data={data} key={i} ide={i}></Tabla>;
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
