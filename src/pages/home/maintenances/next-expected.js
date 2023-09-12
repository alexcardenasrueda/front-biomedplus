import { useEffect, useState } from "react";
import { getMaintenancesNextExpected, updateMaintenanceService } from '../../../services/maintenanceService'
import MaintenanceForm from '../../../components/maintenances/maintenance-form'


function ViewMaintenancesNextExpected() {
    const [dataInitial, setDataInitial] = useState();
    const [maintenances, setMaintenances] = useState();
    const [maintenanceToEdit, setMaintenanceToEdit] = useState();


    const fetchData = () => {
        (async () => {
            const data = await getMaintenancesNextExpected();
            setMaintenances(data);
        })();
    }

    useEffect(() => {
        fetchData()
    }, [dataInitial]);

    const setMaintenance = (maintenance) => {
        setMaintenanceToEdit(maintenance);
    }

    // Services update data
    const updateMaintenance = (maintenance) => {
        console.log('entrooooo')
        console.log('maintenance', maintenance)

        var dataToSave = {
            estimatedDate: maintenance.nextMaintenanceDate,
            equipment: {
                id: maintenance.idEquipment
            },
            status: {
                id: 2,
            }
        }
        updateData(maintenance.id, dataToSave)
    };

    const updateData = (id, dataToSave) => {
        (async () => {
            const data = await updateMaintenanceService(id, dataToSave);
            fetchData()
        })();
    };

    return (
        <div>
            <div class="row">
                {maintenances && maintenances.map((maintenance, index) => (
                    <div class="col-sm-4 mb-3 mb-sm-0">

                        <div class="card" style={{ marginBottom: "5px" }}>
                            <div class="card-header" style={{ backgroundColor: "#ABEBC6" }}>
                                <b>#{maintenance.id}</b> <b>Fecha mantenimiento:</b> {maintenance.nextMaintenanceDate}
                            </div>

                            <div class="card-body">
                                <h5 class="card-text"> Equipo:</h5>
                                <ul>
                                    <li><b>Nombre:</b> {maintenance.name}</li>
                                    <li><b>Tipo de equipo:</b> {maintenance.equipmentType}</li>
                                    <li><b>Serie:</b> {maintenance.series}</li>
                                    <li><b>Area:</b> {maintenance.area}</li>
                                    <li><b>Modelo:</b> {maintenance.model}</li>
                                </ul>
                            </div>

                            <div class="card-body">
                                <button type="button" onClick={() => setMaintenance(maintenance)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalMaintenance">
                                    + Reprogramar mantenimiento
                                </button>
                                <div id='modalMaintenance' className="modal fade"
                                    tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden='true'>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <MaintenanceForm maintenance={maintenanceToEdit} setDataInitial={setDataInitial} />
                                        </div>
                                    </div>
                                </div>

                                <button type="button" onClick={() => updateMaintenance(maintenance)} className="btn btn-success">
                                    + Mantenimiento iniciado
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ViewMaintenancesNextExpected;