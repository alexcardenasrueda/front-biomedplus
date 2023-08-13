import './equipos.css';
import { useEffect, useState } from "react";
import { getEquipos } from '../../services/equiposService'


function Equipos() {
    const [dataInitial, setDataInitial] = useState();
    const [equipos, setEquipos] = useState();

    const fetchData = () => {
        (async () => {
            const data = await getEquipos();
            setEquipos(data);
        })();
    }

    useEffect(() => {
        fetchData()
    }, [dataInitial]);
    return (
        <div class="container">
            Modulo equipos
            <div class="container-button">
                <button type="button" class="btn btn-info">Agregar equipo</button>
                <button type="button" class="btn btn-info">Editar equipo</button>
            </div>

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">Area</th>
                        <th scope="col">Item</th>
                        <th scope="col">Serie</th>
                        <th scope="col">No. Activo</th>
                        <th scope="col">Accesorios</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Tipo de equipo</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos && equipos.map((equipo, index) => (
                        <tr>
                            <td>{equipo.proveedor.nombre}</td>
                            <td>{equipo.servicio}</td>
                            <td>{equipo.area}</td>
                            <td>{equipo.nombre}</td>
                            <td>{equipo.serie}</td>
                            <td>{equipo.numeroActivo}</td>
                            <td>{equipo.accesorios}</td>
                            <td>{equipo.marca}</td>
                            <td>{equipo.modelo}</td>
                            <td>{equipo.tipoEquipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Equipos;
