import './crear-solicitud.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../../services/functions'
import { useEffect, useState } from "react";
import { getTickets, createTicketsService, updateTicketsService, deleteTicketsService } from '../../services/ticketService';
import Menu from '../../components/menu/menu';


function CrearSolicitud() {

    const [dataInitial] = useState();
    const [tickets, setTickets] = useState([]);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState(1);
    const [id, setId] = useState();
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [series, setSeries] = useState();
    const [area, setArea] = useState();
    const [service, setService] = useState();
    const [activeNumber, setActiveNumber] = useState();
    const [applicant, setApplicant] = useState();
    const [position, setPosition] = useState();


    const openModal = (op, ticket) => {
        setId('')
        setDescription('');
        setName('');
        setBrand('');
        setModel('');
        setSeries('');
        setArea('');
        setService('');
        setActiveNumber('');
        setApplicant('');
        setPosition('');

        if (op === 1) {
            setTitle('Agregar Solicitud')
            setOperation(1)
         } 
         else if (op === 2) {
            setTitle('Editar Solicitud');
            setId(ticket.id)
            setDescription(ticket.description)
            setName(ticket.name);
            setBrand(ticket.brand);
            setModel(ticket.model);
            setSeries(ticket.series);
            setArea(ticket.area);
            setService(ticket.service);
            setActiveNumber(ticket.activeNumber);
            setApplicant(ticket.applicant);
            setPosition(ticket.position);
            setOperation(2)
        }
        window.setTimeout(function () {
            document.getElementById('inputName').focus();
        }, 500);
    }

    const fetchData = () => {
        (async () => {
            setTickets(await getTickets());
        })();
    }

    useEffect(() => {
        fetchData()
    },
     [dataInitial]);

     const valid = () => {
        var parameters;
        var method;
        if (description.trim() === '') {
            show_alert('Escriba la descripción del daño de la solicitud', 'warning');
        } else if (name.trim() === '') {
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
        } else if (applicant.trim() === '') {
            show_alert('Escriba el nombre del solicitante', 'warning');
        } else if (position.trim() === '') {
            show_alert('Escriba el cargo del solicitante', 'warning');
        } else {
            if (operation === 1) {
                parameters = {
                    decription: description,
                    name: name,
                    brand: brand,
                    model: model,
                    series: series,
                    area: area,
                    service: service,
                    activeNumber: activeNumber,
                    applicant: applicant,
                    position: position,
                };
                method = ('POST');
            } else {
                parameters = {
                    decription: description,
                    name: name,
                    brand: brand,
                    model: model,
                    series: series,
                    area: area,
                    service: service,
                    activeNumber: activeNumber,
                    applicant: applicant,
                    position: position,
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

    const deleteTickets = (id, name) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Está seguro de eliminar la solicitud ' + name + ' ?',
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
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets && tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.description}</td>
                            <td>{ticket.name}</td>
                            <td>{ticket.brand}</td>
                            <td>{ticket.model}</td>
                            <td>{ticket.series}</td>
                            <td>{ticket.activeNumber}</td>
                            <td>{ticket.area}</td>
                            <td>{ticket.service}</td>
                            <td>{ticket.applicant}</td>
                            <td>{ticket.position}</td>
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
                                    onClick={() => deleteTickets(ticket.id, ticket.name)}>
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
                                    <input type='text' id='inputName' className='form-control' value={name}
                                        onChange={(e) => setName(e.target.value)}></input>
                                    <label for="nameLabel">Descripcion del daño</label>
                                </div>
                                <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputBrand' className='form-control' value={brand}
                                        onChange={(e) => setBrand(e.target.value)}></input>
                                    <label for="brandLabel">Nombre del equipo</label>
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
                                <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputActiveNumber' className='form-control' value={activeNumber}
                                        onChange={(e) => setActiveNumber(e.target.value)}></input>
                                    <label for="activeNumberLabel">N° del activo</label>
                                </div>

                            </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputArea' className='form-control' value={area}
                                        onChange={(e) => setArea(e.target.value)}></input>
                                    <label for="areaLabel">Área</label>

                                    <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputArea' className='form-control' value={area}
                                        onChange={(e) => setArea(e.target.value)}></input>
                                    <label for="areaLabel">Servicio</label>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputType' className='form-control' value={equipmentType}
                                        onChange={(e) => setEquipmentType(e.target.value)}></input>
                                    <label for="equipmentTypeLabel">Solicitante</label>
                                </div>
                            </div>
                            </div>
                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputType' className='form-control' value={equipmentType}
                                        onChange={(e) => setEquipmentType(e.target.value)}></input>
                                    <label for="equipmentTypeLabel">Cargo</label>
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
export default CrearSolicitud;