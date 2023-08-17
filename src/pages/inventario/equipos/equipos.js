import './equipos.css';
import { useEffect, useState } from "react";
import { getEquipos } from '../../../services/equiposService'
import CreateEquipment from '../../../pages/inventario/equipos/create-equipment'


function Equipos() {
    const [dataInitial] = useState();
    const [equipments, setEquipments] = useState([]);
    const fetchData = () => {
        (async () => {
            setEquipments(await getEquipos());
        })();
    }

    useEffect(() => {
        fetchData()
    }, [dataInitial]);


    return (
        <div className="container">
            <br></br>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCreateEquipment">
                    + Agregar equipo
                </button>

                <div id='modalCreateEquipment' className="modal fade" 
                    tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden='true'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <CreateEquipment />
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <table className="table table-hover">
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
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {equipments && equipments.map((equipment, index) => (
                        <tr key={equipment.id}>
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
                            <td>
                            <button type="button" className="btn btn-success btn-floating">
                                    Editar
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
export default Equipos;
