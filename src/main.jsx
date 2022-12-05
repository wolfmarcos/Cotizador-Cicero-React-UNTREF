import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Historial from './rutas/Historial'
import ErrorPage from './rutas/ErrorPage'
import App from './rutas/App'
import Tabla from './Tabla'
import Nav from './Nav'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path='*' element={<Navigate to="cotizador" />}></Route>
        <Route path='Cotizador' element={<App />}></Route>
        <Route path='historial' element={<Historial />}>
          <Route path=':id' element={<ErrorPage />}></Route>
          {/* <Route path=':*'element={   <ErrorPage/>    }></Route> */}
        </Route>


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
