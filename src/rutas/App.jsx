

import '../App.css'
import FormCotizador from '../FormCotizador2'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { useAjax } from '../hooks/useAjax';
import { Link } from "react-router-dom";
import DataTime from '../hooks/Datatime';

// fecha=new Data();
// console.log(fecha)

function App() {



  const [demora, setDemora] = useState(true);
  const objetoCotizar = {
    costoM2: "",
    propiedad: "",
    ubicaciones: "",
    metros2: "",
    fecha:""
  }

  const [cotiza, setcotiza] = useState(objetoCotizar);

  const items = JSON.parse(localStorage.getItem('items')) || [];

  const [guardadoCotizacion, setguardadoCotizacion] = useState(items)

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(guardadoCotizacion));
  }, [guardadoCotizacion]);

  const url2 = "https://api.npoint.io/2c789c463f2951308811"

  const [data, isLoading] = useAjax(url2)

  if (isLoading) return (<h3>Loading...</h3>)

  // console.log(data);

  const realizarGuardado = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cotizacion guardada exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

    setguardadoCotizacion((set) => [...set, cotiza])
    console.log(guardadoCotizacion);

    limipiar()
  }


  function tomarData(e) {
    setcotiza((set) => ({ ...set, [e.target.name]: e.target.value }))
  }

  const sertifica = () => {
    console.log(cotiza.propiedad);
    if (cotiza.propiedad == "" || cotiza.propiedad == null || isNaN(cotiza.propiedad)) {
      Swal.fire({ title: 'No ingreso tipo de propiedad', icon: 'warning' })
        ; return (false)
    }

    if (cotiza.ubicaciones == "" || cotiza.ubicaciones == null || isNaN(cotiza.ubicaciones)) {
      Swal.fire({ title: 'no ingreso la ubicaciones', icon: 'warning' })
        ; return (false)
    }


    if (cotiza.metros2 == "" || cotiza.metros2 == null || isNaN(cotiza.metros2)) {
      Swal.fire({ title: 'no ingreso metros2 ,no modifique la pagina, gracis', icon: 'warning' })
        ; return (false)
    }



    return true
  }

  const recargaDatos = (fecha) => {
    let propiedad = data.propiedades.filter((props) => { if (props.factor == cotiza.propiedad) { return props } });
    console.log(propiedad[0].tipo);
    let ubicaciones = data.ubicaciones.filter((props) => { if (props.factor == cotiza.ubicaciones) { return props } });

    log
    setcotiza((set) => ({ ...set, propiedad: propiedad[0].tipo, ubicaciones: ubicaciones[0].tipo,fecha }))
    console.log("alta mierda", cotiza);
  }


  const funcionCotizar = (e) => {
    e.preventDefault();
    if (sertifica()) {
      setDemora((set) => set = false)
        setTimeout(() => {
         setDemora((set) => set = true)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cotización realizada con éxito.',
          showConfirmButton: false,
          timer: 1000
        })
      }, 1000)


      const resultado = ((+data.costoM2) * (+cotiza.propiedad) * (+cotiza.ubicaciones) * (+cotiza.metros2)).toFixed(2);
      setcotiza((set) => ({ ...set, costoM2: resultado }))
      
 let fecha = DataTime();

      recargaDatos(fecha)

    }
  };

  console.log(guardadoCotizacion.length);
  const limipiar = () => { setcotiza(objetoCotizar) }
  return (
    <div className="App">
      {(guardadoCotizacion.length > 0) && <div className="historial"> <span title="Ver Historial"> <Link to="/historial" >📋</Link></span></div>}
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className=' center div-cotizador'>

        <FormCotizador tomarData={tomarData} data={data} funcionCotizar={funcionCotizar} demora={demora} cotiza={cotiza} />

        <div className="center separador">
          <p className="importe">Precio estimado: $ <span id="valorPoliza">{cotiza.costoM2 || "00.0"}</span></p>
          {cotiza.costoM2 && !isNaN(cotiza.costoM2) ? <div onClick={realizarGuardado}><h1 button class="button guardado" >💾 </h1>
            <label > "Guardar la ultima cotizacion" </label></div> : <Link to="/historial"><button class="button ">Gracioas por confiar en nosotros</button></Link>} </div>
      </div>

      {/* <Historial guardadoCotizacion={guardadoCotizacion} /> */}

    </div>
  )
}

export default App
