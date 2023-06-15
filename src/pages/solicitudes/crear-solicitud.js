import './crear-solicitud.css';
import { useState } from "react";


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
            <div>
                <input type="file" onChange={handleChange} accept='image/*' />
                <img class="img-uploaded" src={state.file} />
            </div>
        </div>
    );
}
export default CrearSolicitud;
