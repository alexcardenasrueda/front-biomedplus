import './create-equipments.css';
import { useState } from "react";

function CreateEquipmentsModal(){

    const [name, setName] = useState([]);
    const [provider, setProvider] = useState([]);
    const [brand, setBrand] = useState([]);
    const [model, setModel] = useState([]);
    const [series, setSeries] = useState([]);
    const [area, setArea] = useState([]);
    const [activeNumber, setActiveNumber] = useState([]);
    const [service, setService] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [type, setType] = useState([]);

    return (
    
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Equipo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type='hidden' id='id'></input>
                        <div>
                            <span ></span>
                            <input type='text' id='inputName' className='form-control' placeholder='Nombre del equipo' value={name}></input>
                            <input type='text' id='inputBrand' className='form-control' placeholder='Marca' value={brand}></input>
                            <input type='text' id='inputMode' className='form-control' placeholder='Modelo' value={model}></input>
                            <input type='text' id='inputSeries' className='form-control' placeholder='Serie' value={series}></input>
                            <input type='text' id='inputArea' className='form-control' placeholder='Área' value={area}></input>
                            <input type='text' id='inputActiveNumber' className='form-control' placeholder='Numero de activo' value={activeNumber}></input>
                            <input type='text' id='inputService' className='form-control' placeholder='Servicio' value={service}></input>
                            <input type='text' id='inputAccessories' className='form-control' placeholder='Accesorios' value={accessories}></input>
                            <input type='text' id='inputType' className='form-control' placeholder='Tipo de equipo' value={type}></input>
                        </div>
                    </div> 
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary">Agregar</button>
                </div>
                </div>
        );
}
export default CreateEquipmentsModal;