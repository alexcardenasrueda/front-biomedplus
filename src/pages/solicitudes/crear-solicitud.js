import './crear-solicitud.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../../services/functions'
import { useEffect, useState } from "react";
import { getTickets } from '../../services/ticketService';
import {createTicketsService, updateTicketsService, deleteTicketsService } from '../../services/ticketService';
import { getEquipos } from '../../services/equiposService';
import { getRolesService } from '../../services/rolService';
import { getUserByEmailService } from '../../services/userService';


function CrearSolicitud() {

    const [tickets, setTickets] = useState([]);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState(1);
    const [id, setId] = useState();
    const [description, setDescription] = useState();
    const [equipos, setEquipos] = useState([]);
    const [equipments, setEquipments] = useState(0);
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [series, setSeries] = useState();
    const [area, setArea] = useState();
    const [service, setService] = useState();
    const [activeNumber, setActiveNumber] = useState();
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [creationDate, setCreationDate] = useState('');
    const [closeDate, setCloseDate] = useState ('');
    const [image, setImage] = useState (null);
    const [imageSelected, setImageSelected] = useState(false);
    const [status, setStatus] = useState('CREATED');


    const openModal = (op, ticket) => {
        setId('')
        setDescription('');
        setEquipments();
        setBrand('');
        setModel('');
        setSeries('');
        setArea('');
        setService('');
        setActiveNumber('');
        setRoles();
        setCreationDate('');
        setCloseDate('');
        setImage(null);
        setImageSelected(false);
        setUser(null);

        if (op === 1) {
            setTitle('Agregar Solicitud')
            setOperation(1)
            setStatus('CREATED');
         } 
         else if (op === 2) {
            setTitle('Editar Solicitud');
            setId(ticket.id)
            setDescription(ticket.description);
            setEquipments(ticket.equipments.id);
            setBrand(ticket.brand);
            setModel(ticket.model);
            setSeries(ticket.series);
            setArea(ticket.area);
            setService(ticket.service);
            setActiveNumber(ticket.activeNumber);
            setUser(ticket.user);
            setRoles(ticket.roles.id);
            setCreationDate(ticket.creationDate);
            setCloseDate(ticket.closeDate);
            setImage(ticket.image);
            setImageSelected(!!ticket.image);
            setStatus(ticket.status);
            setOperation(2)
        }
        window.setTimeout(function () {
            document.getElementById('inputDescription').focus();
        }, 500);
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        setImageSelected(true);
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
    
    const getRolesData = () => {
        (async () => {
            setRoles(await getRolesService());
        })();
    }

     useEffect(() => {
        getEquiposData() 
     }, []);

     useEffect(() => {
        getRolesData() 
     }, []);

     useEffect(() =>{
        const authenticatedUser = getUserByEmailService();
        setUser(authenticatedUser);
     }, []);


     const valid = () => {
        var parameters;
        var method;
        if (description.trim() === '') {
            show_alert('Escriba la descripción del daño de la solicitud', 'warning');
        } else if (equipments === 0) {
            show_alert('Escriba el nombre del equipo afectado', 'warning');
        } else if (brand.trim() === '') {
            show_alert('Escriba la marca del equipo afectado', 'warning');
        } else if (model.trim() === '') {
            show_alert('Escriba el modelo del equipo afectado', 'warning');
        } else if (series.trim() === '') {
            show_alert('Escriba la serie del equipo afectado', 'warning');
        } else if (area.trim() === '') {
            show_alert('Escriba el area donde esta ubicado el equipo afectado', 'warning');
        } else if (service.trim() === '') {
            show_alert('Escriba el servicio donde esta ubicado el equipo afectado', 'warning');
        } else if (activeNumber.trim() === '') {
            show_alert('Escriba el numero de activo del equipo afectado', 'warning');
        } else if (roles === 0) {
            show_alert('Escriba el cargo del solicitante', 'warning');
        } else if (isNaN(Date.parse(creationDate))) {
            show_alert('Escriba la fecha de creación', 'warning');
        } else if (isNaN(Date.parse(closeDate))) {
            show_alert('Escriba la fecha de cierre', 'warning');
        } else if (!imageSelected) {
            show_alert('Cargue una imagen del daño', 'warning');
        } else {
            if (operation === 1) {
                parameters = {
                    decription: description,
                    equipments: {
                      id: parseInt(equipments)
                    },
                    brand: brand,
                    model: model,
                    series: series,
                    area: area,
                    service: service,
                    activeNumber: activeNumber,
                    user: user,
                    roles: roles,
                    creationDate: creationDate,
                    closeDate: closeDate,
                    image: image,
                    status: status,
                };
                method = ('POST');
            } else {
                parameters = {
                    decription: description,
                    equipments: {
                        id: parseInt(equipments)
                    },
                    brand: brand,
                    model: model,
                    series: series,
                    area: area,
                    service: service,
                    activeNumber: activeNumber,
                    user: user,
                    roles: roles,
                    creationDate: creationDate,
                    closeDate: closeDate,
                    image: image,
                    status: status,
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
                await createTicketsService(parameters);
                fetchData();
                document.getElementById('btnCerrar').click();
            })();
        } else if (method === 'PUT') {
            (async () => {
                await updateTicketsService(id, parameters);
                fetchData();
                document.getElementById('btnCerrar').click();
            })();
        }
    }

    const deleteTickets = (id, description) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Está seguro de eliminar la solicitud ' + description + ' ?',
            icon: 'question',
            text: 'No se podrá recuperar la información',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id);
                (async () => {
                    await deleteTicketsService(id);
                    fetchData();
                })();
            } else {
                show_alert('La solicitud no fue eliminada', 'info')
            }
        });
    }

function getStatusColor(status){
    switch (status){
        case 'CREATED':
            return 'blue';
        case 'IN_PROCESS':
            return 'yellow';
        case 'FINISHED':
            return 'green';
        default:
            return 'gray';
    }
}

//pantalla principal

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

            <table className="table table-hover">
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
                        <th scope="col">Cargo solicitante</th>
                        <th scope="col">Fecha de creación</th>
                        <th scope="col">Fecha de cierre</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets && tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.description}</td>
                            <td>{ticket.equipments.name}</td>
                            <td>{ticket.brand}</td>
                            <td>{ticket.model}</td>
                            <td>{ticket.series}</td>
                            <td>{ticket.activeNumber}</td>
                            <td>{ticket.area}</td>
                            <td>{ticket.service}</td>
                            <td>{ticket.user}</td>
                            <td>{ticket.roles}</td>
                            <td>{ticket.creationDate}</td>
                            <td>{ticket.closeDate}</td>
                            <td>
                                {ticket.image &&(
                                    <img src={URL.createObjectURL(ticket.image)}alt='Preview'/>
                                )}
                            </td>
                            <td>
                                <div
                                className='status-indicator'
                                style={{ backgroundColor: getStatusColor(ticket.status)}}
                                ></div>
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
                                    onClick={() => deleteTickets(ticket.id, ticket.description)}>
                                    <i className='fa-solid fa-trash'></i>
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
                                        onChange={(e) => setDescription(e.target.value)}></input>
                                    <label for="nameLabel">Descripcion del daño</label>                                    
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <select name='equipmentSelect' className='form-select' value={equipments}
                                        onChange={(e) => setEquipments(e.target.value)}>
                                        <option selected>Seleccione un equipo</option>
                                        {equipos && equipos.map(equipmentsElement => (
                                            <option key={equipmentsElement.id} value={equipmentsElement.id}>{equipmentsElement.name}</option>
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
                                    <input type='text' id='inputActiveNumber' className='form-control' value={activeNumber}
                                        onChange={(e) => setActiveNumber(e.target.value)}></input>
                                    <label for="activeNumberLabel">N° del activo</label>
                                </div>
                            </div>
                
                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputArea' className='form-control' value={area}
                                        onChange={(e) => setArea(e.target.value)}></input>
                                    <label for="areaLabel">Área</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                        <input type='text' id='inputService' className='form-control' value={service}
                                        onChange={(e) => setService(e.target.value)}></input>
                                        <label for="serviceLabel">Servicio</label>                                    
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                        <input type='text' id='inputUser' className='form-control' value={user}
                                        onChange={(e) => setUser(e.target.value)}></input>
                                        <label for="userLabel">Solicitante</label>                                    
                                </div>   
                                    <div className='form-floating mb-3 col-md-6'>                            
                                    <select name='roleSelect' className='form-select' value={roles}
                                        onChange={(e) => setRoles(e.target.value)}>
                                        <option selected>Seleccione un rol</option>
                                        {roles && roles.map(rolesElement => (
                                            <option key={rolesElement.id} value={rolesElement.id}>{rolesElement.name}</option>
                                        ))}
                                    </select>
                                    </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='date' id='inputCreationDate' className='form-control' value={creationDate}
                                        onChange={(e) => setCreationDate(e.target.value)}></input>
                                    <label for="creationDateLabel">Fecha de creación</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='date' id='inputCloseDate' className='form-control' value={closeDate}
                                        onChange={(e) => setCloseDate(e.target.value)}></input>
                                    <label for="closeDatelabel">Fecha de cierre</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='file' id='inputImage' className='form-control'
                                        onChange={handleImageChange} accept="image/*"></input>                                    
                                </div>                                
                                {imageSelected ? (
                                    <div className='preview-image'>
                                        <img src={URL.createObjectURL(image)} alt='Preview'/>
                                    </div>
                                ) : (
                                    <div className='preview-image'>
                                        <img src='https://planetcode.in/assets/images/default-image-png-9-300x200.png' alt='Imagen predeterminada' />
                                    </div>
                                )}
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
export default CrearSolicitud;