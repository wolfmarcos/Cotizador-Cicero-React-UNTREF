import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useReft, useEffect } from "react";
import Login2 from "./Login2";
import { desLogGoogle } from "./hooks/firebase-config";
import Swal from "sweetalert2";
// import { redirect ,useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom"


function Nav() {
  const [isUsername, setisUsername] = useState(false)
  const [userInfo, setuserInfo] = useState(null);
  const logeo=JSON.parse(sessionStorage.getItem("usuario"))||"ninguno"
  useEffect(() => {
    
  if (logeo) {
    
    setuserInfo( (set)=>set=logeo)
  }
}, [isUsername])


// let history = useHistory();
  const desLogo = () => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Menu Usuario',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<h3>Deslogear!</h3>',
      cancelButtonText:' <h3>Informacion Usuario</h3>',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deslogeo exitoso!',
          'vuelca cuando quiera',
          'success'
        )
        // history.push("/cotizador:1");
        localStorage.clear();
        desLogGoogle();
        sessionStorage.clear()
        setisUsername(set=>!set)
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          `
          ${"nombre",userInfo?.email ,"email",userInfo?.nombre  }
          `,
          // userInfo.token
          
        
           'Puede navegar  por nuestra web  de cotizacion :)',
          'error'
        )
      }
    })
  
  
  };


 

  // const [users, setuser] = useState("")

  
  // const users = JSON.parse(sessionStorage.getItem("usuario"))||{nombre:"n"}
  // console.log("🚀 ~ file: Nav.jsx:18 ~ Nav ~ users2", users)
  
  // useEffect(() => {
  //   setTimeout(() => {
      
  //     const usersJSON = sessionStorage.getItem("usuario")
  //     if (usersJSON) {
  //      const users =JSON.parse(usersJSON)
  //      setNombreUsuario(users)
        
  //     }
  //   }, 3000);

  
 
  // }, [])




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
     { userInfo?.nombre?
      <div onClick={desLogo} className="button button-outline ">  {userInfo.nombre}    </div>
      :
      <div onClick={activarVentanaLogeo} className="button button-outline   ">       Login      </div>

}
      {activa ? <Login2 activa={activarVentanaLogeo}  setisUsername={setisUsername} /> : null}
    </div>
    <div> </div>
    
  </nav>
);
}

export default Nav;
