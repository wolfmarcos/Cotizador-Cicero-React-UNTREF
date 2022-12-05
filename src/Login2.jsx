import './cssForm.css'
import { useState } from 'react';
import Swal from 'sweetalert2';

function Login2({ activa }) {

  const [ususrio, setususrio] = useState({ email: "", pas: "", id: "" })
  const [email, setemail] = useState("")
  const [pas, setpas] = useState("")


  const sertifica = () => {
    console.log(ususrio);
    if (email == "" || email == null) {
      Swal.fire({ title: 'Email invalido', icon: 'warning' })
        ; return (false)
    }

    if (pas == "" || pas == null) {
      Swal.fire({ title: 'Contraseña invalida', icon: 'warning' })
        ; return (false)
    }

    return true
  }



  const login = (e) => {
    e.preventDefault();
    if (sertifica()) {
      const id = 1
      setususrio(set => ({ ...set, email, pas, id }))
      console.log(ususrio);
      activa()
    }
  }


  return (
    <>
      <div className="contForm">
      <h1 className="login btn btn--2" onClick={activa}>x</h1>
        <h1 className="login">logear </h1>

        <form onSubmit={login} >
          
          <div>
            <h2>
              <label for="lN">
                email
              </label>
            </h2>{" "}
            <input value={email} id="lN" type="email" onChange={(e) => setemail(e.target.value)} />
          </div>
          <div>
            <h2>
              <label for="lC">
                contraseña
              </label>
            </h2>
            <input value={pas} name="contraseña" id="lC" type="password" onChange={(e) => setpas(e.target.value)} />
          </div>
          <input type="submit" class=" btn btn--4" />
        </form>
        <div class="contBtn">
          {" "}
          <button id="google" class="btn btn--1">
            Google
          </button>
        </div>
      </div>
    </>
  );
}

export default Login2;