

const FormCotizador = ({ tomarData, cotiza, data, demora, funcionCotizar }) => {
  const { propiedad, ubicaciones, metros2 } = cotiza;

  return (
    <form onSubmit={funcionCotizar}>
      <h2 className="center separador">Completa los datos solicitados</h2>
      <label htmlFor="propiedad">Selecciona el tipo de propiedad </label>
      <select name="propiedad" value={propiedad} onChange={tomarData}>
        <option>...</option>
        {data.propiedades.map((prop, i) => {
          return (
            <option key={i} className="option" value={prop.factor}>
              {prop.tipo}
            </option>
          );
        })}
      </select>

      <label htmlFor="ubicacion">Selecciona su ubicación</label>
      <select value={ubicaciones} name="ubicaciones" onChange={tomarData}>
        <option>...</option>
        {data.ubicaciones.map((prop, i) => {
          return (
            <option key={i} className="option" value={prop.factor}>
              {prop.tipo}
            </option>
          );
        })}
      </select>
      <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
      <input
        list="browses"
        onChange={tomarData}
        type="number"
        name="metros2"
        min="20"
        max="500"
        value={metros2}
        required
      />

      <div className="center separador">
        
          <button className="button button-outline">Cotizar</button>
  
      </div>
    </form>
  );
};

export default FormCotizador;
