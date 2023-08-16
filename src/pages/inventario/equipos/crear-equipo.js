import './crearEquipos.css';
import { useEffect, useState } from "react";
import { createEquipment } from '../../../services/equiposService'

function CreateEquipmentsPage(){
    const [dataInitial, setDataInitial] = useState();
    const [equipments, setEquipos] = useState();

    return (
        <div class="container">
            Modulo crear equipo

            
        </div>
    );
}
export default createEquipment;