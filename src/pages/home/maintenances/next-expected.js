import { useEffect, useState } from "react";
import { getMaintenancesNextExpected } from '../../../services/maintenanceService'

function ViewMaintenancesNextExpected() {
    const [dataInitial] = useState();
    const [maintenances, setMaintenances] = useState();

    const fetchData = () => {
        (async () => {
            const data = await getMaintenancesNextExpected();
            setMaintenances(data);
        })();
    }

    useEffect(() => {
        fetchData()
    }, [dataInitial]);
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
                                <a href="#" class="btn btn-primary">Ver Equipo</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ViewMaintenancesNextExpected;