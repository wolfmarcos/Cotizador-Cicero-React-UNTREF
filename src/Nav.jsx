import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
 import Login2 from "./Login2";

function Nav() {

    const [activa, setactiva] = useState(false)
    const activar = () => {
        setactiva(!activa)

    }


    return (
        <nav>
            <div>

            </div>

            <div>
                <NavLink className={({ isActive }) => isActive ? "button " : "button blanco "} to="./cotizador">
                    Cotizador
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "button " : "button blanco "} to="./historial">
                    Historial
                </NavLink>


            </div>
            <div className="contenedor">
                <div onClick={activar} className="button button-outline   " >Login</div>

                {activa? <Login2 activa={activar}/> : null}
            </div>
            <div>

            </div>
        </nav>




    );
}

export default Nav;
{/* <NavLink isactive={ ()=>activar(isActive) }>
to={"./cotizador"}
</NavLink> */}