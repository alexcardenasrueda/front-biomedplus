import './equipos.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useState } from "react";
import { getEquipos } from '../../../services/equiposService'
import { getProviders } from '../../../services/providerService';
import { createEquipment, updateEquipment, deleteEquipmentService } from '../../../services/equiposService'
import { show_alert } from '../../../services/functions'


function Equipos() {

    const [dataInitial, setDataInitial] = useState();
    const [equipments, setEquipments] = useState([]);
    const [providers, setProviders] = useState([]);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState(1);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [provider, setProvider] = useState(0);
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [series, setSeries] = useState();
    const [area, setArea] = useState();
    const [activeNumber, setActiveNumber] = useState();
    const [service, setService] = useState();
    const [accessories, setAccessories] = useState();
    const [equipmentType, setEquipmentType] = useState();

    // Function to decide kind of operation to open modal
    const openModal = (op, equipment) => {
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
        setEquipmentType('');

        if (op === 1) {
            setTitle('Agregar Equipo')
            setOperation(1)
        } else if (op === 2) {
            setTitle('Editar Equipo');
            setId(equipment.id)
            setName(equipment.name);
            setProvider(equipment.provider.id);
            setBrand(equipment.brand);
            setModel(equipment.model);
            setSeries(equipment.series);
            setArea(equipment.area);
            setActiveNumber(equipment.activeNumber);
            setService(equipment.service);
            setAccessories(equipment.accessories);
            setEquipmentType(equipment.equipmentType);
            setOperation(2)
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
        if (name.trim() === '') {
            show_alert('Escriba el nombre del equipo', 'warning');
        } else if (provider === 0){
            show_alert('Seleccione un proveedor', 'warning');
        }else if (brand.trim() === '') {
            show_alert('Escriba la marca del equipo', 'warning');
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
        } else if (equipmentType.trim() === '') {
            show_alert('Escriba el tipo del equipo', 'warning');
        } else {
            if (operation === 1) {
                parameters = {
                    name: name,
                    provider: {
                        id: parseInt(provider)
                    },
                    brand: brand,
                    model: model,
                    series: series,
                    area: area,
                    activeNumber: activeNumber,
                    service: service,
                    accessories: accessories,
                    equipmentType: equipmentType
                };
                method = ('POST');
            } else {
                parameters = {
                    name: name,
                    provider: {
                        id: parseInt(provider)
                    },
                    brand: brand,
                    model: model,
                    series: series,
                    area: area,
                    activeNumber: activeNumber,
                    service: service,
                    accessories: accessories,
                    equipmentType: equipmentType
                };
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
                fetchData();
                document.getElementById('btnCerrar').click();
            })();
        } else if (method === 'PUT') {
            (async () => {
                await updateEquipment(id, parameters);
                fetchData();
                document.getElementById('btnCerrar').click();
            })();
        }
    }

    const deleteEquipment = (id, name) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Está seguro de eliminar el equipo ' + name + ' ?',
            icon: 'question',
            text: 'No se podrá recuperar la información',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id)
                (async () => {
                    await deleteEquipmentService(id);
                    fetchData();
                })();
            } else {
                show_alert('El equipo no fue eliminado', 'info')
            }
        });
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
                        <th scope="col">Equipo</th>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">Area</th>
                        <th scope="col">Serie</th>
                        <th scope="col">N° Activo</th>
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
                            <td>{equipment.name}</td>
                            <td>{equipment.provider.name}</td>
                            <td>{equipment.service}</td>
                            <td>{equipment.area}</td>
                            <td>{equipment.series}</td>
                            <td>{equipment.activeNumber}</td>
                            <td>{equipment.accessories}</td>
                            <td>{equipment.brand}</td>
                            <td>{equipment.model}</td>
                            <td>{equipment.equipmentType}</td>
                            <td>
                                <button type="button"
                                    onClick={() => openModal(2, equipment)}
                                    className="btn btn-warning btn-floating"s
                                    data-bs-toggle="modal" data-bs-target="#modalEquipment">
                                    <i className='fa-solid fa-edit'></i>
                                </button>
                                &nbsp;
                                <button type="button"
                                    className="btn btn-danger btn-floating"
                                    onClick={() => deleteEquipment(equipment.id, equipment.name)}>
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div id='modalEquipment' className="modal fade"
                tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden='true'>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title col-6 mx-auto">
                                <div className='row'>
                                    <i class="fa-solid fa-stethoscope col-2"></i>
                                    {title}
                                </div>
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body text-capitalize">
                            <input type='hidden' id='id'></input>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputName' className='form-control' value={name}
                                        onChange={(e) => setName(e.target.value)}></input>
                                    <label for="nameLabel">Nombre del equipo</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <select name='providersSelect' className='form-select' value={provider}
                                        onChange={(e) => setProvider(e.target.value)}>
                                        <option selected>Seleccione un proveedor</option>
                                        {providers && providers.map(providerElement => (
                                            <option key={providerElement.id} value={providerElement.id}>{providerElement.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputBrand' className='form-control' value={brand}
                                        onChange={(e) => setBrand(e.target.value)}></input>
                                    <label for="brandLabel">Marca</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputModel' className='form-control' value={model}
                                        onChange={(e) => setModel(e.target.value)}></input>
                                    <label for="floatingInput">Modelo</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputSeries' className='form-control' value={series}
                                        onChange={(e) => setSeries(e.target.value)}></input>
                                    <label for="seriesLabel">Serie</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputArea' className='form-control' value={area}
                                        onChange={(e) => setArea(e.target.value)}></input>
                                    <label for="areaLabel">Área</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputActiveNumber' className='form-control' value={activeNumber}
                                        onChange={(e) => setActiveNumber(e.target.value)}></input>
                                    <label for="activeNumberLabel">N° del activo</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputService' className='form-control' value={service}
                                        onChange={(e) => setService(e.target.value)}></input>
                                    <label for="serviceLabel">Servicio</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputAccessories' className='form-control' value={accessories}
                                        onChange={(e) => setAccessories(e.target.value)}></input>
                                    <label for="accessoriesLabel">Accesorios</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputType' className='form-control' value={equipmentType}
                                        onChange={(e) => setEquipmentType(e.target.value)}></input>
                                    <label for="equipmentTypeLabel">Tipo de equipo</label>
                                </div>
                            </div>


                            <div className='d-grid col-3 mx-auto'>
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
