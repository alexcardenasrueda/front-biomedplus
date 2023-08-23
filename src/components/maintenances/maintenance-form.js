import { useEffect, useState } from "react";
import { updateMaintenanceService } from '../../services/maintenanceService'



const initialForm = {
    nextMaintenanceDate: '',
};
function MaintenanceForm({ maintenance, setDataInitial }) {
    const [form, setForm] = useState(initialForm)

    // Setea los valores iniciales en el form
    useEffect(() => {
        if (maintenance) {
            setForm(maintenance)
        }
    }, [maintenance])

    // Se llama cada vez que cambia un valor en el form
    const handleChange = (event) => {
        console.log('event', event.target.name, ' ', event.target.value)
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    // Services update data
    const updateData = (dataToSave) => {
        (async () => {
            const data = await updateMaintenanceService(maintenance.id, dataToSave);
            //fetchData()
            setDataInitial(Date.now)
        })();
    };

    // Validations before save or edit data
    const handleClick = (event) => {
        event.preventDefault();
        if (!form.nextMaintenanceDate) {
            alert("Datos incompletos");
            return;
        }
        /* if (form.id === null) {
             console.log('Agregar libro')
             createData(form)
         } else {*/
        var dataToSave = {
            estimatedDate: form.nextMaintenanceDate,
            equipment: {
                id: maintenance.idEquipment
            }
        }
        updateData(dataToSave)
        document.getElementById('close-btn').click()
    }

    return (
        <div>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Mantenimiento</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Fecha programada</label>
                        <input type="date" class="form-control" id="nextMaintenanceDate" name="nextMaintenanceDate" value={form.nextMaintenanceDate} onChange={handleChange}></input>
                    </div>
                </div>
                <div className="modal-footer">
                    <button id='close-btn' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Editar</button>
                </div>
            </div>
        </div>
    );
}
export default MaintenanceForm;