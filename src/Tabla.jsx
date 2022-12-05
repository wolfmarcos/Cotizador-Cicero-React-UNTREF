const Tabla = ({ data, ide }) => {
    const { costoM2, propiedad, ubicaciones, metros2, fecha } = data

    return (

        <tbody>
            <tr key={ide}>

                <td>fecha:{fecha}</td> 
                <td>propiedad: {propiedad}</td>
                <td>ubicaciones: {ubicaciones}</td>
                <td>metros2: {metros2}</td>
                <td>cotizaciones:$ {costoM2} </td>

            </tr>

        </tbody >
    );
}

export default Tabla;