import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useReft } from "react";
import Login2 from "./Login2";
import {  desLogoGoogle } from "./hooks/firebase-config";


function Nav() {
  const desLogo = () => {
    localStorage.clear();
    
    // storage.removeItem('items');
    desLogoGoogle();
  };
  const [activa, setactiva] = useState(false);
  const activar = () => {
    setactiva(!activa);
  };

  return (
    <nav>
      <div></div>

      <div>
        <NavLink
          className={({ isActive }) =>
            isActive ? "button " : "button blanco "
          }
          to="./cotizador"
        >
          Cotizador
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "button " : "button blanco "
          }
          to="./historial"
        >
          Historial
        </NavLink>
      </div>
      <div className="contenedor">
        <div onClick={activar} className="button button-outline   ">
          Login
        </div>

        <div onClick={desLogo} className="button button-outline ">
          {" "}
          deslogeo
        </div>

        {activa ? <Login2 activa={activar} /> : null}
      </div>
      <div></div>
    </nav>
  );
}

export default Nav;
