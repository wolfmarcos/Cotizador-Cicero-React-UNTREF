import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Historial from "./rutas/Historial";
import ErrorPage from "./rutas/ErrorPage";
import App from "./rutas/App";

import Nav from "./Nav";
import RutaProtegida from "./rutas/RutaProtegida";
// import firebaseConfig from './hooks/firebase-config'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/ErrorPage" element={<ErrorPage />}></Route>
        <Route path="*" element={<Navigate to="/cotizador" />}></Route>
        <Route path="/cotizador" element={<App />}></Route>

        <Route element={<RutaProtegida />}>
          <Route path="/historial" element={<Historial />}>
            {/* <Route path=":id" element={<ErrorPage />}></Route> */}
            {/* <Route path=":*" element={<ErrorPage />}></Route> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
