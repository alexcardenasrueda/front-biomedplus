import './equipos.css';
import { useEffect, useState } from "react";
import { getEquipos } from '../../services/equiposService'


function Equipos() {
    const [dataInitial, setDataInitial] = useState();
    const [equipments, setEquipos] = useState();

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
                    {equipments && equipments.map((equipment, index) => (
                        <tr>
                            <td>{equipment.provider.name}</td>
                            <td>{equipment.service}</td>
                            <td>{equipment.area}</td>
                            <td>{equipment.name}</td>
                            <td>{equipment.series}</td>
                            <td>{equipment.activeNumber}</td>
                            <td>{equipment.accessories}</td>
                            <td>{equipment.brand}</td>
                            <td>{equipment.model}</td>
                            <td>{equipment.equipmentType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Equipos;
