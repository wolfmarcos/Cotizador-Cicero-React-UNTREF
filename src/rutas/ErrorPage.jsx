// import { useNavigate } from "react-router";

import "../App.css";
// import FormCotizador from './FormCotizador2'
// import Historial from './Historial'

// import { useState ,useEffect } from 'react';
// import { useAjax } from './hooks/useAjax';
import { Link } from "react-router-dom";

export default function ErrorPage() {
  // const navigate = useNavigate();

  return (
    <div className=" center div-cotizador">
      <div className="historial">
        {" "}
        <span title="Ver Historial">
          <Link to="/">
            <button class="button button-outline">volver</button>
          </Link>

          <Link to="/historial">📋</Link>
        </span>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>

      <h1>Epa!</h1>
      <p>Lo sentimos, ocurrió un error inesperado.</p>

      <img
        style={{ width: "500px" }}
        src="/jungle-404.gif"
        alt="page not found"
      />
      {/* <button onClick={() => navigate(-1)}>Volver</button> */}
    </div>
  );
}
