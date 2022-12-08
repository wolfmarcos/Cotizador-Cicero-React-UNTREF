import "./cssForm.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { setCities, gle ,logeo} from "./hooks/firebase-config";

function Login2({ activa }) {
  const [ususrio, setususrio] = useState({ email: "", password: "", id: "" });
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const sertifica = () => {
    console.log(ususrio);

    
    if ((!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email))) {
      Swal.fire({ title: "Email invalido", icon: "warning" });
      return false;
    }

    if ((!/(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{4,20}/.test(password))) {
      Swal.fire({ title: "Contraseña invalida", icon: "warning" });
      return false;
    }

    return true;
  };

  const login = (e) => {
    e.preventDefault();

    if (sertifica()) {
      const id = 1;
      setususrio((set) => ({ ...set, email, password, id }));
      Swal.fire({ title: "Logeado", icon: 'success' });
      activa();
      logeo(email, password)
    }
  };

  return (
    <>
      <div className="contForm">
        <button
          id="google"
          class="btn btn--1"
          style={{ marginLeft: "90%" }}
          onClick={activa}
        >
          <p>x</p>
        </button>
        <label onClick={activa}>
          <h1 className="login">logear </h1>
          <h1 className="login btn btn--2" onClick={gle}>
            Google{" "}
          </h1>
        </label>

        <form onSubmit={login}>
          <div>
            <h2>
              <label for="lN">email :</label>
            </h2>{" "}
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
              <label for="lC">contraseña :</label>
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
          <input type="submit" class=" btn btn--4" />
        </form>
        <div class="contBtn"> </div>
      </div>
    </>
  );
}

export default Login2;
