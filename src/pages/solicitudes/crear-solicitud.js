import './crear-solicitud.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../../services/functions'
import { useEffect, useState } from "react";
import { getTickets, updateTicket, createTicket} from '../../services/ticketService';
import { deleteTicket } from '../../services/ticketService';
import { getEquipos } from '../../services/equiposService';
import { getuserById, getUsers } from '../../services/userService';
import { getStatus } from '../../services/statusService';
import UploadImage from '../../components/images/upload-image';

function CrearSolicitud() {

    const [ticket, setTicket] = useState([]);
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
    const [users, setUsers] = useState([]);
    const [creationDate, setCreationDate] = useState('');
    const [closeDate, setCloseDate] = useState ('');
    const [image, setImage] = useState ("");
    const [status, setStatus] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [isOnlyView, setIsOnlyView] = useState(false);


    const openModal = (op, ticket) => {
        setId('')
        setDescription('');
        setEquipments();
        setUsers(loggedInUserId);
        setBrand('');
        setModel('');
        setSeries('');
        setArea('');
        setService('');
        setActiveNumber('');
        setCreationDate(new Date().toISOString().split('T')[0]);
        setCloseDate('');
        setStatus();
        setImage('');


        if (op === 1) {
            setTitle('Agregar Solicitud')
            setOperation(1)
            setIsOnlyView(false)
         } 
         else if (op === 2) {
            setTitle('Editar Solicitud');
            setId(ticket.id)
            setDescription(ticket.description);
            setEquipments(ticket.equipments.id);
           // setUsers(ticket.users.id);
            setBrand(ticket.brand);
            setModel(ticket.model);
            setSeries(ticket.series);
            setArea(ticket.area);
            setService(ticket.service);
            setActiveNumber(ticket.activeNumber);
            setCreationDate(ticket.creationDate);
            setCloseDate(ticket.closeDate);
            setStatus(ticket.status);
            setOperation(2)

            if (ticket.equipments) {
                const { brand, model, series } = ticket.equipments;
                setSelectedEquipment(ticket.equipments);
                setBrand(brand);
                setModel(model);
                setSeries(series);
              }
        }

        window.setTimeout(function () {
            document.getElementById('inputDescription').focus();
        }, 500);
    }

    const handleEquipmentChange = (event) => {
        console.log("Event!!! " + event.target.value)
        const equipmentId = event.target.value;
        const selected = equipos.find((equipment) => equipment.id == equipmentId);
        console.log("EquipmentLIst !!! " + equipos)
        setSelectedEquipment(selected);
        console.log("selected!!! " + selected)
        if (selected) {
          setBrand(selected.brand);
          setModel(selected.model);
          setSeries(selected.series);
          setActiveNumber(selected.activeNumber)
          setArea(selected.area)
          setService(selected.service)
        } else {
          setBrand('');
          setModel('');
          setSeries('');
          setActiveNumber('')
          setArea('')
          setService(selected.service)
        }
      };


    const fetchData = () => {
        (async () => {
            setTicket(await getTickets());
        })();
    }

    const getEquiposData = () => {
        (async () => {
            setEquipos(await getEquipos());
        })();
    }

    const getStatusData = async () => {
        try{
            const StatusData = await getStatus();
            setStatus(StatusData);
        } catch (error){
            console.error('error mostrando status data', error);
        }
    }
    
    
  const getUsersData = () => {
   (async () => {
 setUsers(await getUsers());
 })();
  }

   //  useEffect(() => {
//    getEquiposData() 
  //   }, []);

  
  //   useEffect(() => {
  //      getUsersData() 
  //   }, []);
  

    // useEffect(() => {
    //    getStatusData() 
    // }, []);


     useEffect(() => {
        const user = getuserById
        if (user) {
            setLoggedInUserId(user.id);
        }
        getEquiposData();
        getUsersData();
        getStatusData();

     }, []);



     const valid = () => {
        var parameters;
        var method;
        if (description.trim() === '') {
            show_alert('Escriba la descripción del daño de la solicitud', 'warning');
        } else if (equipments === 0) {
            show_alert('Escriba el nombre del equipo afectado', 'warning');
        }  else {
            if (operation === 1) {
                parameters = {
                    decription: description,
                    creationDate: new Date().now(),
                    equipments: {
                      id: parseInt(equipments)
                    },
                    user: {
                        id: parseInt(users)
                    },
                    status: {
                        id: parseInt(status)
                    },
                };
                method = ('POST');
            } else {
                parameters = {
                    decription: description,
                    equipments: {
                        id: parseInt(equipments)
                    },
                    users: {
                        id: parseInt(users)
                    },
                    brand: brand,
                    model: model,
                    series: series,
                    area: area,
                    service: service,
                    activeNumber: activeNumber,
                    creationDate: creationDate,
                    closeDate: closeDate,
                    status: {
                        id: parseInt(status)
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
                    await deleteTicket(id);
                    fetchData();
                })();
            } else {
                show_alert('La solicitud no fue eliminada', 'info')
            }
        });
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
                        <th scope="col">Fecha de creación</th>
                        <th scope="col">Fecha de cierre</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {ticket && ticket.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.description}</td>
                            <td>{ticket.equipments.id}</td>
                            <td>{ticket.brand}</td>
                            <td>{ticket.model}</td>
                            <td>{ticket.series}</td>
                            <td>{ticket.activeNumber}</td>
                            <td>{ticket.area}</td>
                            <td>{ticket.service}</td>
                            <td>{ticket.users.id}</td>
                            <td>{ticket.creationDate}</td>
                            <td>{ticket.closeDate}</td>
                            <td>{ticket.status.id}</td>
                            <td>
                                {ticket.image &&(
                                    <img src={URL.createObjectURL(ticket.image)}alt='Preview'/>
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
                                        onChange={handleEquipmentChange}>
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
                                <UploadImage title={"Imagen del daño"} image={image} setImage={setImage} isOnlyView={isOnlyView} />
                            </div>
                            <br></br>

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