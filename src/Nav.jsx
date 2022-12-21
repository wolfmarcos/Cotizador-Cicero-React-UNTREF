import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useReft, useEffect } from "react";
import Login2 from "./Login2";
import { desLogGoogle } from "./hooks/firebase-config";
import Swal from "sweetalert2";
// import { redirect ,useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom"

function Nav() {
  const [isUsername, setisUsername] = useState(false);
  const [userInfo, setuserInfo] = useState(null);
  const logeo = JSON.parse(sessionStorage.getItem("usuario")) || null;
  useEffect(() => {
    if (logeo) {
      setuserInfo((set) => (set = logeo));
    } else {
      localStorage.clear();
      desLogGoogle();
      sessionStorage.clear();
      setuserInfo((set) => (set = logeo));
    }
  }, [isUsername]);

  // let history = useHistory();
  const desLogo = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn--2:",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Menu Usuario",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "<h4>Deslogear!</h4>",
        cancelButtonText: " <h4>Informacion Usuario</h4>",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deslogeo exitoso!",
            "vuelca cuando quiera",
            "success"
          );
          // history.push("/cotizador:1");
          localStorage.clear();
          desLogGoogle();
          sessionStorage.clear();
          setisUsername((set) => !set);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            `
          ${("nombre", userInfo?.email, "email", userInfo?.nombre)}
          `,
            // userInfo.token

            "Puede navegar  por nuestra web  de cotizacion :)",
            "error"
          );
        }
      });
  };

  const [activa, setactiva] = useState(false);

  const activarVentanaLogeo = () => {
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
        {userInfo?.nombre ? (
          <div onClick={desLogo} className="button button-outline ">
            {" "}
            {userInfo.nombre}{" "}
          </div>
        ) : (
          <div
            onClick={activarVentanaLogeo}
            className="button button-outline   "
          >
            {" "}
            Login{" "}
          </div>
        )}
        {activa ? (
          <Login2 activa={activarVentanaLogeo} setisUsername={setisUsername} />
        ) : null}
      </div>
      <div> </div>
    </nav>
  );
}

export default Nav;
