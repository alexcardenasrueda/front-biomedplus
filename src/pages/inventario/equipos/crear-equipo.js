import './crear-equipo.css';
import { useEffect, useState } from "react";
import { createEquipment } from '../../../services/equiposService'

function CreateEquipmentsModal(){
    const [dataInitial] = useState();    

    return (
        <div id='mod' className="modal fade" 
            tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden='true'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Equipo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
        );
}
export default CreateEquipmentsModal;