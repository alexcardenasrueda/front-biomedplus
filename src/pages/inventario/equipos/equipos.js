import './equipos.css';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { getEquipos } from '../../../services/equiposService'
import { getProviders } from '../../../services/providerService';
import { createEquipment } from '../../../services/equiposService'
import { updateEquipment } from '../../../services/equiposService'
import { show_alert } from '../../../services/functions'


function Equipos() {

    const [dataInitial] = useState();
    const [equipments, setEquipments] = useState([]);
    const [providers, setProviders] = useState([]);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState(1);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [provider, setProvider] = useState();
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [series, setSeries] = useState();
    const [area, setArea] = useState();
    const [activeNumber, setActiveNumber] = useState();
    const [service, setService] = useState();
    const [accessories, setAccessories] = useState();
    const [type, setType] = useState();

    // Function to decide kind of operation to open modal
    const openModal = (op, id, name, provider, brand, model, series, area, activeNumber, service, accessories, type) => {
        setId('')
        setName('');
        setProvider();
        setBrand('');
        setModel('');
        setSeries('');
        setArea('');
        setActiveNumber('');
        setService('');
        setAccessories('');
        setType('');

        if (op === 1) {
            setTitle('Agregar Equipo')
        } else if (op === 2) {
            setTitle('Editar Equipo');
            setId(id)
            setName(name);
            setProvider(provider);
            setBrand(brand);
            setModel(model);
            setSeries(series);
            setArea(area);
            setActiveNumber(activeNumber);
            setService(service);
            setAccessories(accessories);
            setType(type);
        }
        window.setTimeout(function () {
            document.getElementById('inputName').focus();
        }, 500);
    }

    // Function to get equipment data from API
    const fetchData = () => {
        (async () => {
            setEquipments(await getEquipos());
        })();
    }

    const getProvidersData = () => {
        (async () => {
            setProviders(await getProviders());
        })();
    }

    // Show data from above function
    useEffect(() => {
        fetchData()
    }, [dataInitial]);


    useEffect(() => {
        getProvidersData()
    }, []);



    // Function to valid not null parameters
    const valid = () => {
        var parameters;
        var method;

        console.log('Povider to create', provider.id)

        if (name.trim() === '') {
            show_alert('Escriba el nombre del equipo', 'warning');
        } else if (brand.trim() === '') {
            show_alert('Escribala marca del equipo', 'warning');
        } else if (model.trim() === '') {
            show_alert('Escriba el modelo del equipo', 'warning');
        } else if (series.trim() === '') {
            show_alert('Escriba la serie del equipo', 'warning');
        } else if (area.trim() === '') {
            show_alert('Escriba el área del equipo', 'warning');
        } else if (activeNumber.trim() === '') {
            show_alert('Escriba el número activo del equipo', 'warning');
        } else if (service.trim() === '') {
            show_alert('Escriba el servicio del equipo', 'warning');
        } else if (accessories.trim() === '') {
            show_alert('Escriba los accesorios del equipo', 'warning');
        } else if (type.trim() === '') {
            show_alert('Escriba el tipo del equipo', 'warning');
        } else {
            if (operation === 1) {
                parameters = {
                    name: name.trim(),
                    provider: {
                        id: parseInt(provider)
                    },
                    brand: brand.trim(),
                    model: model.trim(),
                    series: series.trim(),
                    area: area.trim(),
                    activeNumber: activeNumber.trim(),
                    service: service.trim(),
                    accessories: accessories.trim(),
                    equipmentType: type.trim()
                };
                method = ('POST');
            } else {
                parameters = {};
                method = ('PUT');
            }
            // Call to service
            callService(parameters, method);
        }
    }

    const callService = async (parameters, method) => {
        if (method === 'POST') {
            (async () => {
                await createEquipment(parameters);
            })();
        } else if (method === 'PUT') {
            (async () => {
                await updateEquipment(parameters);
            })();
        }
    }


    // This information will be draw in the screen
    return (
        <div className="container">
            <br></br>

            <div className="d-flex justify-content-center">
                <button onClick={() => openModal(1)} type="button"
                    className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEquipment">
                    <i className='fa-solid fa-circle-plus'></i> Agregar equipo
                </button>
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
                    {equipments && equipments.map((equipment) => (
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
                                <button type="button"
                                    onClick={() => openModal(2,
                                        equipment.id,
                                        equipment.name,
                                        equipment.provider,
                                        equipment.brand,
                                        equipment.model,
                                        equipment.series,
                                        equipment.area,
                                        equipment.activeNumber,
                                        equipment.service,
                                        equipment.accessories,
                                        equipment.type
                                    )}
                                    className="btn btn-success btn-floating"
                                    data-bs-toggle="modal" data-bs-target="#modalEquipment">
                                    <i className='fa-solid fa-edit'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div id='modalEquipment' className="modal fade"
                tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type='hidden' id='id'></input>
                            <div className='form-floating mb-3'>
                                <input type='text' id='inputName' className='form-control' value={name}
                                    onChange={(e) => setName(e.target.value)}></input>
                                <label for="floatingInput">Nombre del equipo</label>
                            </div>
                            <div className='form-floating mb-3'>
                               <select name='providersSelect' className='form-select' 
                               onChange={(e) => setProvider(e.target.value)}>
                                    <option selected>Seleccione un proveedor</option>
                                    {providers && providers.map(providerElement => (
                                        <option key={providerElement.id} value={providerElement.id}>{providerElement.name}</option>
                                    ))}
                               </select>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='text' id='inputBrand' className='form-control' value={brand}
                                    onChange={(e) => setBrand(e.target.value)}></input>
                                <label for="floatingInput">Marca</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='text' id='inputModel' className='form-control' value={model}
                                    onChange={(e) => setModel(e.target.value)}></input>
                                <label for="floatingInput">Modelo</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='text' id='inputSeries' className='form-control' value={series}
                                    onChange={(e) => setSeries(e.target.value)}></input>
                                <label for="floatingInput">Serie</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='text' id='inputArea' className='form-control' value={area}
                                    onChange={(e) => setArea(e.target.value)}></input>
                                <label for="floatingInput">Área</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='text' id='inputActiveNumber' className='form-control' value={activeNumber}
                                    onChange={(e) => setActiveNumber(e.target.value)}></input>
                                <label for="floatingInput">Número del activo</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='text' id='inputService' className='form-control' value={service}
                                    onChange={(e) => setService(e.target.value)}></input>
                                <label for="floatingInput">Servicio</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='text' id='inputAccessories' className='form-control' value={accessories}
                                    onChange={(e) => setAccessories(e.target.value)}></input>
                                <label for="floatingInput">Accesorios</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='text' id='inputType' className='form-control' value={type}
                                    onChange={(e) => setType(e.target.value)}></input>
                                <label for="floatingInput">Tipo de equipo</label>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button type="button" className="btn btn-success"
                                    onClick={() => valid()}>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id='btnCerrar'
                                className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Equipos;
