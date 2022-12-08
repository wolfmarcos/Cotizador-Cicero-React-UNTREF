const Tabla = ({ data, ide }) => {
    const { costoM2, propiedad, ubicaciones, metros2, fecha } = data

    return (

        <tbody>
            <tr key={ide}>

                <td>{fecha}</td>
                <td>{propiedad}</td>
                <td>{ubicaciones}</td>
                <td>{metros2}</td>
                <td>$ {costoM2} </td>

            </tr>

        </tbody >
    );
}

export default Tabla;