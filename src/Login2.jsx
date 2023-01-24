import "./cssForm.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { googleLogeo, correoLogeo } from "./hooks/firebase-config";
import { Await } from "react-router";

function Login2({ activa, setisUsername }) {
  const [ususrio, setususrio] = useState({ email: "", password: "", id: "" });
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Usuario, setUsuario] = useState(null);

  const sertifica = () => {
    if (
      !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)
    ) {
      Swal.fire({ title: "Email invalido", icon: "warning" });
      return false;
    }

    if (
      !/(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{4,20}/.test(password)
    ) {
      Swal.fire({ title: "Contraseña invalida", icon: "warning" });
      return false;
    }

    return true;
  };

  const porFormulario = (e) => {
    e.preventDefault();

    if (sertifica()) {
      const id = 1;
      setususrio((set) => ({ ...set, email, password, id }));
      Swal.fire({ title: "Logeado", icon: "success" });

      activa();
      localStorage.clear();
      correoLogeo(email, password);
    }
  };

  const gooogleLog = async () => {
    const logeo = await googleLogeo();
    sessionStorage.setItem("usuario", JSON.stringify(logeo));
    setisUsername((set) => !set);
  };

  return (
    <>
      <div className="contForm">
        <button
          id="google"
          classNames="btn btn--1"
          style={{ marginLeft: "90%" }}
          onClick={activa}
        >
          <p>x</p>
        </button>
        <label onClick={activa} >
          <h4 className="login">Puede iniciar con </h4>
          <h3 className="login btn btn--2" onClick={gooogleLog}>
            Google
          </h3>
        </label>
        <h4 className="login">Logear/registro </h4>
        <form onSubmit={porFormulario}>
          <div>
            <h2>
              <label htmlFor="lN">email :</label>
            </h2>
            <input
              value={email}
              id="lN"
              type="email"
              placeholder=" asd@asd.copm"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div>
            <h2>
              <label htmlFor="lC">contraseña :</label>
            </h2>
            <input
              value={password}
              name="contraseña"
              id="lC"
              placeholder=" contraseña"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <input type="submit" className="btn btn--4" />
        </form>
        <div className="contBtn"> </div>
      </div>
    </>
  );
}

export default Login2;
