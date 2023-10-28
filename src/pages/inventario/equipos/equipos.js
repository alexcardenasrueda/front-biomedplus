import './equipos.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useState } from "react";
import { getEquipos } from '../../../services/equiposService'
import { getProviders } from '../../../services/providerService';
import { createEquipment, updateEquipment, deleteEquipmentService } from '../../../services/equiposService'
import { show_alert } from '../../../services/functions'
import MaintenanceForm from '../../../components/maintenances/maintenance-form';
import { MdOutlineEditCalendar } from "react-icons/md"
import { LuCalendarPlus, LuCalendarCheck } from "react-icons/lu"
import { updateMaintenanceService } from '../../../services/maintenanceService';
import UploadImage from '../../../components/images/upload-image';



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
    const [image, setImage] = useState("");
    
    const [maintenanceToEdit, setMaintenanceToEdit] = useState();

    const [isOnlyView, setIsOnlyView] = useState(false);

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
        setImage('');

        if (op === 1) {
            setTitle('Agregar Equipo')
            setOperation(1)
            setIsOnlyView(false)
            setImage('')
        } else if (op === 2 || op === 3) {
            setId(equipment.id)
            setName(equipment.name);
            setProvider(equipment.provider?.id);
            setBrand(equipment.brand);
            setModel(equipment.model);
            setSeries(equipment.series);
            setArea(equipment.area);
            setActiveNumber(equipment.activeNumber);
            setService(equipment.service);
            setAccessories(equipment.accessories);
            setEquipmentType(equipment.equipmentType);
            setImage(equipment.image)

            if (op === 2) {
                setTitle('Editar Equipo');
                setIsOnlyView(false)
                setOperation(2)
            }
            if (op === 3) {
                setTitle('Ver Equipo');
                setIsOnlyView(true)
                setOperation(3)
            }
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

    // Function to get providers data from API
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
        } else if (provider === 0) {
            show_alert('Seleccione un proveedor', 'warning');
        } else if (brand.trim() === '') {
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
    // Function that call EquipmentService request
    const callService = async (parameters, method) => {
        if (method === 'POST') {
            (async () => {
                await createEquipment(parameters, image);
                fetchData();
                document.getElementById('btnCerrar').click();
            })();
        } else if (method === 'PUT') {
            (async () => {
                await updateEquipment(id, parameters, image);
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
                setId(id);
                (async () => {
                    await deleteEquipmentService(id);
                    fetchData();
                })();
            } else {
                show_alert('El equipo no fue eliminado', 'info')
            }
        });
    }

    const setMaintenance = (equipment) => {
        var maintenance = {
            id: equipment.nextMaintenance?.id,
            nextMaintenanceDate: equipment.nextMaintenance?.estimatedDate,
            idEquipment: equipment.id
        }
        setMaintenanceToEdit(maintenance);
    }

    //  Begin maintenance
    const updateMaintenanceInit = (equipment) => {
        var dataToSave = {
            estimatedDate: equipment.nextMaintenance.estimatedDate,
            equipment: {
                id: equipment.id
            },
            status: {
                id: 2,
            }
        }
        updateData(equipment.nextMaintenance.id, dataToSave)
    };

    //  End manteinance
    const updateMaintenanceFinish = (equipment) => {
        var dataToSave = {
            estimatedDate: equipment.nextMaintenance.estimatedDate,
            equipment: {
                id: equipment.id
            },
            status: {
                id: 3,
            }
        }
        updateData(equipment.nextMaintenance.id, dataToSave)
    };

    // Services update data
    const updateData = (id, dataToSave) => {
        (async () => {
            const data = await updateMaintenanceService(id, dataToSave);
            fetchData()
        })();
    };

    // Services update data
    const getMaintenance = (id, dataToSave) => {
        (async () => {
            const data = await updateMaintenanceService(id, dataToSave);
            fetchData()
        })();
    };

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

            <table className="table table-hover  table-striped table-sm">
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
                        <th scope="col">Próximo mantenimiento</th>
                        <th scope="col">Estado mantenimiento</th>
                        <th scope="col">Acciones mantenimiento</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {equipments && equipments.map((equipment) => (
                        <tr key={equipment.id}>
                            <td>{equipment.name}</td>
                            <td>{equipment.provider?.name}</td>
                            <td>{equipment.service}</td>
                            <td>{equipment.area}</td>
                            <td>{equipment.series}</td>
                            <td>{equipment.activeNumber}</td>
                            <td>{equipment.accessories}</td>
                            <td>{equipment.brand}</td>
                            <td>{equipment.model}</td>
                            <td>{equipment.equipmentType}</td>
                            <td>{equipment.nextMaintenance?.estimatedDate}</td>
                            <td>{equipment.nextMaintenance?.status.name === 'CREATED' ? "Creado" :
                                equipment.nextMaintenance?.status.name === 'IN_PROCESS' ? "Iniciado" :
                                    equipment.nextMaintenance?.status.name}
                            </td>
                            <td>
                                {equipment.nextMaintenance == null ?
                                    (
                                        <>
                                            <button type="button"
                                                onClick={() => setMaintenance(equipment)}
                                                className="btn btn-info btn-floating btn-sm"
                                                data-toggle="tooltip" title="Programar prox mantenimineto" data-placement="top"
                                                data-bs-toggle="modal" data-bs-target="#modalMaintenance">
                                                <LuCalendarPlus size={22} />
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
                                        </>
                                    ) : null}
                                {equipment.nextMaintenance?.status.name === 'CREATED' ?
                                    (
                                        <>
                                            <button type="button"
                                                onClick={() => updateMaintenanceInit(equipment)}
                                                className="btn btn-outline-success btn-floating btn-sm"
                                                data-toggle="tooltip" title="Iniciar mantenimineto" data-placement="top">
                                                <LuCalendarCheck size={22} />
                                            </button>
                                            <button type="button"
                                                onClick={() => setMaintenance(equipment)}
                                                className="btn btn-primary btn-floating btn-sm"
                                                data-toggle="tooltip" title="Reprogramar mantenimineto"
                                                data-bs-toggle="modal" data-bs-target="#modalMaintenance">
                                                <MdOutlineEditCalendar size={22} />
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
                                        </>
                                    ) : null}

                                {equipment.nextMaintenance?.status.name === 'IN_PROCESS' ?
                                    (
                                        <>
                                            <button type="button"
                                                onClick={() => updateMaintenanceFinish(equipment)}
                                                className="btn btn-success btn-floating btn-sm"
                                                data-toggle="tooltip" title="Finalizar mantenimineto" data-placement="top">
                                                <LuCalendarCheck size={22} />
                                            </button>
                                        </>
                                    ) : null}
                            </td>
                            <td>
                                <button type="button"
                                    onClick={() => openModal(2, equipment)}
                                    className="btn btn-warning btn-floating"
                                    data-bs-toggle="modal" data-bs-target="#modalEquipment">
                                    <i className='fa-solid fa-edit'></i>
                                </button>
                                &nbsp;
                                <button type="button"
                                    className="btn btn-danger btn-floating"
                                    onClick={() => deleteEquipment(equipment.id, equipment.name)}>
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                                <button type="button"
                                    onClick={() => openModal(3, equipment)}
                                    className="btn btn-success btn-floating"
                                    data-bs-toggle="modal" data-bs-target="#modalEquipment">
                                    <i className='fa-solid fa-eye'></i>
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
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isOnlyView}></input>
                                    <label for="nameLabel">Nombre del equipo</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <select name='providersSelect' className='form-select' value={provider}
                                        onChange={(e) => setProvider(e.target.value)} disabled={isOnlyView}>
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
                                        onChange={(e) => setBrand(e.target.value)} disabled={isOnlyView}></input>
                                    <label for="brandLabel">Marca</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputModel' className='form-control' value={model}
                                        onChange={(e) => setModel(e.target.value)} disabled={isOnlyView}></input>
                                    <label for="floatingInput">Modelo</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputSeries' className='form-control' value={series}
                                        onChange={(e) => setSeries(e.target.value)} disabled={isOnlyView}></input>
                                    <label for="seriesLabel">Serie</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputArea' className='form-control' value={area}
                                        onChange={(e) => setArea(e.target.value)} disabled={isOnlyView}></input>
                                    <label for="areaLabel">Área</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputActiveNumber' className='form-control' value={activeNumber}
                                        onChange={(e) => setActiveNumber(e.target.value)} disabled={isOnlyView}></input>
                                    <label for="activeNumberLabel">N° del activo</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputService' className='form-control' value={service}
                                        onChange={(e) => setService(e.target.value)} disabled={isOnlyView}></input>
                                    <label for="serviceLabel">Servicio</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputAccessories' className='form-control' value={accessories}
                                        onChange={(e) => setAccessories(e.target.value)} disabled={isOnlyView}></input>
                                    <label for="accessoriesLabel">Accesorios</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputType' className='form-control' value={equipmentType}
                                        onChange={(e) => setEquipmentType(e.target.value)} disabled={isOnlyView}></input>
                                    <label for="equipmentTypeLabel">Tipo de equipo</label>
                                </div>
                            </div>

                            <div className='row'>
                                <UploadImage title={"Imagen del equipo"} image={image} setImage={setImage} isOnlyView={isOnlyView} />
                            </div>
                            <br></br>

                            {!isOnlyView ?
                                <div show='false' className='d-grid col-3 mx-auto'>
                                    <button type="button" className="btn btn-success"
                                        onClick={() => valid()}>
                                        <i className='fa-solid fa-floppy-disk'></i> Guardar</button>
                                </div>
                                : null
                            }

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
