import "../App.css";

import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className=" center div-cotizador">
      <div className="historial">
        {" "}
        <span title="Ver Historial"></span>
      </div>
      <h2 className="center separador">Seguros del hogar 🏡</h2>

      <h1>Louding...</h1>

      <Link to="/historial">📋</Link>
      <Link to="/">
        <button class="button button-outline">volver</button>
      </Link>
      <img
        style={{ width: "500px", objectFit: "cover" }}
        src="cargamdop.gif"
        alt="page not found"
      />
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
}
