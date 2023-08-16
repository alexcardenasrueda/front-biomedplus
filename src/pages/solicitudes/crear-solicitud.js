import './crear-solicitud.css';
import { useEffect, useState } from "react";


function CrearSolicitud() {

    const [state, setState] = useState("")

    const handleChange = (event) => {
        setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    return (

        <div class="container">
            Modulo crear solicitud
            <div class="mb-3">
                <label for="exampleFormControlSelect1">Descripción del daño</label>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlSelect2">Nombre del equipo</label>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlSelect2">Marca</label>
            </div>            
            <div class="mb-3">
                <label for="exampleFormControlSelect2">Modelo</label>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlSelect2">Serie</label>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlSelect2">Numero de activo</label>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlSelect2">Servicio</label>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlSelect2">Nombre del solicitante</label>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlSelect2">Cargo</label>
            </div>
                <input type="file" onChange={handleChange} accept='image/*' />
                <img class="img-uploaded" src={state.file} />
            </div>
    );
}
export default CrearSolicitud;
