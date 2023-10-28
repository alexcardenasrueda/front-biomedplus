import './crear-solicitud.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../../services/functions'
import { useEffect, useState } from "react";
import { getTickets, updateTicket, createTicket} from '../../services/ticketService';
import { getEquipos } from '../../services/equiposService';
import { deleteTicketService } from '../../services/ticketService';
import { getuserById, getUsers } from '../../services/userService';
import { getStatus } from '../../services/statusService';
import UploadImage from '../../components/images/upload-image';
import { useAuth } from "../../auth/AuthProvider";

function CrearSolicitud() {
    const auth = useAuth();
    const [dataInitial] = useState();
    const [tickets, setTickets] = useState([]);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState(1);
    const [id, setId] = useState();
    const [description, setDescription] = useState();
    const [equipos, setEquipos] = useState([]);
    const [equipment, setEquipment] = useState(0);
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [series, setSeries] = useState();
    const [area, setArea] = useState();
    const [service, setService] = useState();
    const [activeNumber, setActiveNumber] = useState();
    const [creationDate, setCreationDate] = useState('');
    const [closeDate, setCloseDate] = useState('');
    const [image, setImage] = useState("");
    const [status, setStatus] = useState([]);
    const [statusInitial, setStatusInitial] = useState();

    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [isOnlyView, setIsOnlyView] = useState(false);


    const openModal = (op, ticket) => {
        setId('')
        setDescription('');
        setEquipment();
        setBrand('');
        setModel('');
        setSeries('');
        setArea('');
        setService('');
        setActiveNumber('');
        setCreationDate('');
        setCloseDate('');
        setStatus();
        setImage('');


        if (op === 1) {
            setTitle('Agregar Solicitud')
            setOperation(1)
            setIsOnlyView(false)
        }
        else if (op === 2 || op === 3) {
            setId(ticket.id)
            setDescription(ticket.description);
            setEquipment(ticket.equipment.id);
            setBrand(ticket.equipment.brand);
            setModel(ticket.equipment.model);
            setSeries(ticket.equipment.series);
            setArea(ticket.equipment.area);
            setService(ticket.equipment.service);
            setActiveNumber(ticket.equipment.activeNumber);
            setCreationDate(ticket.creationDate);
            setCloseDate(ticket.closeDate);
            setStatus(ticket.status);
            setStatusInitial(ticket.status.id);
            setImage(ticket.image);

            console.log('status', status)

            if (op === 2) {
                setTitle('Editar Solicitud');
                setIsOnlyView(false)
                setOperation(2)
            }
            if (op === 3) {
                setTitle('Ver Solicitud');
                setIsOnlyView(true)
                setOperation(3)
            }

            /* if (ticket.equipments) {
                 const { brand, model, series } = ticket.equipments;
                 setSelectedEquipment(ticket.equipments);
                 setBrand(brand);
                 setModel(model);
                 setSeries(series);
             }*/
        }

        window.setTimeout(function () {
            document.getElementById('inputDescription').focus();
        }, 500);
    }

    const handleStatusChange = (op) => {
        console.log("status init----", statusInitial)
        console.log("status+++++", op)
        if (statusInitial != op) {
            setStatus({ id: op })
            if (op == 3) {
                setCloseDate(new Date().toISOString().split('T')[0])
            } else {
                setCloseDate('')
            }
        } else {
            setStatus({ id: statusInitial })
            setCloseDate('')
        }
        console.log("Status----- " + status.id)

    }

    const handleEquipmentChange = (event) => {
        const selectedEquipmentId = event.target.value;
        const selected = equipos.find((equip) => equip.id == selectedEquipmentId);
        setEquipment(selectedEquipmentId);

        if (selected) {
            setBrand(selected.brand);
            setModel(selected.model);
            setSeries(selected.series);
            setActiveNumber(selected.activeNumber);
            setArea(selected.area);
            setService(selected.service);
        } else {
            setBrand('');
            setModel('');
            setSeries('');
            setActiveNumber('');
            setArea('');
            setService('');
        }
    };

    const fetchData = () => {
        (async () => {
            setTickets(await getTickets());
        })();
    }

    
    const getEquiposData = () => {
        (async () => {
            setEquipos(await getEquipos());
        })();
    }

    // Show data from above function
    useEffect(() => {
        fetchData()
    }, [dataInitial]);

    
    useEffect(() => {
        getEquiposData();
    }, []);


    /*const getStatusData = async () => {
        try {
            const StatusData = await getStatus();
            setStatus(StatusData);
        } catch (error) {
            console.error('error mostrando status data', error);
        }
    }*/


    //  useEffect(() => {
    //    getEquiposData() 
    //   }, []);


    //   useEffect(() => {
    //      getUsersData() 
    //   }, []);


    // useEffect(() => {
    //    getStatusData() 
    // }, []);


    const valid = () => {
        var parameters;
        var method;
        if (description.trim() === '') {
            show_alert('Escriba la descripción del daño de la solicitud', 'warning');
        } else if (equipment === 0) {
            show_alert('Escriba el nombre del equipo afectado', 'warning');
        } else {
            if (operation === 1) {
                parameters = {
                    description: description,
                    creationDate: new Date().toISOString().split('T')[0],
                    equipment: {
                        id: equipment
                    },
                    user: {
                        id: auth.user.id
                    },
                    status: {
                        id: 1
                    },
                };
                method = ('POST');
            } else {
                parameters = {
                    description: description,
                    equipment: {
                        id: parseInt(equipment)
                    },
                    user: {
                        id: auth.user.id
                    },
                    creationDate: creationDate,
                    closeDate: closeDate,
                    status: {
                        id: status.id
                    },
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
                await createTicket(parameters, image);
                fetchData();
                document.getElementById('btnCerrar').click();
            })();
        } else if (method === 'PUT') {
            (async () => {
                await updateTicket(id, parameters, image);
                fetchData();
                document.getElementById('btnCerrar').click();
            })();
        }
    }

    const deleteTicket = (id, description) => {
        const MySwal = withReactContent(Swal);
        setId(id)
        MySwal.fire({
            title: 'Está seguro de eliminar el repuesto ' + description + ' ?',
            icon: 'question',
            text: 'No se podrá recuperar la información',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                (async () => {
                    await deleteTicketService(id);
                    fetchData();
                })();
            } else {
                show_alert('El repuesto no fue eliminado', 'info')
            }
        });
    }

    return (

        <div className="container">
            <br></br>

            <div className="d-flex justify-content-center">
                <button onClick={() => openModal(1)} type="button"
                    className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTickets">
                    <i className='fa-solid fa-circle-plus'></i> Agregar solicitud
                </button>
            </div>
            <br></br>

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">Descripción del daño</th>
                        <th scope="col">Nombre del equipo</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Serie</th>
                        <th scope="col">N° Activo</th>
                        <th scope="col">Area</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">Solicitante</th>
                        <th scope="col">Fecha de creación</th>
                        <th scope="col">Fecha de cierre</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets && tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.description}</td>
                            <td>{ticket.equipment.name}</td>
                            <td>{ticket.equipment.brand}</td>
                            <td>{ticket.equipment.model}</td>
                            <td>{ticket.equipment.series}</td>
                            <td>{ticket.equipment.activeNumber}</td>
                            <td>{ticket.equipment.area}</td>
                            <td>{ticket.equipment.service}</td>
                            <td>{ticket.user.name}</td>
                            <td>{ticket.creationDate}</td>
                            <td>{ticket.closeDate}</td>
                            <td>
                                {ticket.status.id === 1 ? (
                                <button
                                 className="created-state-button"
                                 onClick={() => handleStatusChange(2)}
                                 >
                                    Creada
                                    </button>
                                ) : (
                                    <button
                                    className="in-progress-state-button"
                                    onClick={() => handleStatusChange(3)}
                                    >
                                    En proceso
                                    </button>
                                )}
                            </td>
                            <td>
                                <button type="button"
                                    onClick={() => openModal(2, ticket)}
                                    className="btn btn-warning btn-floating"
                                    data-bs-toggle="modal" data-bs-target="#modalTickets">
                                    <i className='fa-solid fa-edit'></i>
                                </button>
                                &nbsp;
                                <button type="button"
                                    className="btn btn-danger btn-floating"
                                    onClick={() => deleteTicket(ticket.id, ticket.description)}>
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                                <button type="button"
                                    onClick={() => openModal(3, ticket)}
                                    className="btn btn-success btn-floating"
                                    data-bs-toggle="modal" data-bs-target="#modalTickets">
                                    <i className='fa-solid fa-eye'></i>
                                </button>                              
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div id='modalTickets' className="modal fade"
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
                                    <input type='text' id='inputDescription' className='form-control' value={description}
                                        onChange={(e) => setDescription(e.target.value)} disabled={isOnlyView}></input>
                                    <label for="nameLabel">Descripcion del daño</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <select name='equipmentSelect' className='form-select' value={equipment}
                                        onChange={handleEquipmentChange} disabled={isOnlyView}>
                                        <option value="">Seleccione un equipo</option>
                                        {equipos && equipos.map(equipmentsElement => (
                                            <option key={equipmentsElement.id} value={equipmentsElement.id}>{equipmentsElement.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputBrand' className='form-control' value={brand}
                                        onChange={(e) => setBrand(e.target.value)} disabled></input>
                                    <label for="brandLabel">Marca</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputModel' className='form-control' value={model}
                                        onChange={(e) => setModel(e.target.value)} disabled></input>
                                    <label for="floatingInput">Modelo</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputSeries' className='form-control' value={series}
                                        onChange={(e) => setSeries(e.target.value)} disabled></input>
                                    <label for="seriesLabel">Serie</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputActiveNumber' className='form-control' value={activeNumber}
                                        onChange={(e) => setActiveNumber(e.target.value)} disabled></input>
                                    <label for="activeNumberLabel">N° del activo</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputArea' className='form-control' value={area}
                                        onChange={(e) => setArea(e.target.value)} disabled></input>
                                    <label for="areaLabel">Área</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputService' className='form-control' value={service}
                                        onChange={(e) => setService(e.target.value)} disabled></input>
                                    <label for="serviceLabel">Servicio</label>
                                </div>
                            </div>

                            <div className='row'>
                                {operation == 2 || operation == 3 ?
                                    <>
                                        <div className='form-floating mb-3 col-md-6'>
                                            <input type='date' id='inputCreationDate' className='form-control' value={creationDate}
                                                onChange={(e) => setCreationDate(e.target.value)} disabled></input>
                                            <label for="creationDateLabel">Fecha de creación</label>
                                        </div>
                                        <div className='form-floating mb-3 col-md-6'>
                                            <input type='date' id='inputCloseDate' className='form-control' value={closeDate}
                                                onChange={(e) => setCloseDate(e.target.value)} disabled></input>
                                            <label for="closeDatelabel">Fecha de cierre</label>
                                        </div>
                                    </> : null}
                            </div>

                            {statusInitial == 1 ?
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"
                                        onChange={(e) => handleStatusChange(2)} disabled={isOnlyView} />
                                    <label class="form-check-label" for="defaultCheck1">
                                        Iniciar solicitud
                                    </label>
                                </div>
                                : null}

                            {statusInitial == 2 ?
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"
                                        onChange={(e) => handleStatusChange(3)} disabled={isOnlyView} />
                                    <label class="form-check-label" for="defaultCheck1">
                                        Cerrar solcitud
                                    </label>
                                </div>
                                : null}

                            <div className='row'>
                                <UploadImage title={"Imagen del daño"} image={image} setImage={setImage} isOnlyView={isOnlyView} />
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
export default CrearSolicitud;