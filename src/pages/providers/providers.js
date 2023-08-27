import './provider.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../../services/functions'
import { useEffect, useState } from "react";
import { getProviders, createProviderService, updateProviderService, deleteProviderService} from '../../services/providerService';


function Providers() {

    const [dataInitial] = useState();
    const [providers, setProviders] = useState([]);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState(1);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();

    // Function to decide kind of operation to open modal
    const openModal = (op, providerElement) => {
        setId('')
        setName('');
        setPhone();
        setCity();
        setAddress('');

        if (op === 1) {
            setTitle('Agregar Proveedor')
            setOperation(1)
        } else if (op === 2) {
            setTitle('Editar Proveedor');
            setId(providerElement.id)
            setName(providerElement.name);
            setPhone(providerElement.phone);
            setCity(providerElement.city)
            setAddress(providerElement.address);
            setOperation(2)
        }
        window.setTimeout(function () {
            document.getElementById('inputName').focus();
        }, 500);
    }

// Function to get providers data from API
const fetchData = () => {
    (async () => {
        setProviders(await getProviders());
    })();
}


    // Show data from above function
    useEffect(() => {
        fetchData()
    }, [dataInitial]);


// Function to valid not null parameters
const valid = () => {
    var parameters;
    var method;
    if (name.trim() === '') {
        show_alert('Escriba el nombre del proveedor', 'warning');
    } else if (phone.trim() === '') {
        show_alert('Escriba el teléfono del proveedor', 'warning');
    } else if (city.trim() === '') {
        show_alert('Escriba el city del proveedor', 'warning');
    } else if (address.trim() === '') {
        show_alert('Escriba la dirección del proveedor', 'warning');
    } else {
        if (operation === 1) {
            parameters = {
                name: name,
                phone: phone,
                city: city,
                address: address
            };
            method = ('POST');
        } else {
            parameters = {
                name: name,
                phone: phone,
                city: city,
                address: address
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
            await createProviderService(parameters);
            fetchData();
            document.getElementById('btnCerrar').click();
        })();
    } else if (method === 'PUT') {
        (async () => {
            await updateProviderService(id, parameters);
            fetchData();
            document.getElementById('btnCerrar').click();
        })();
    }
}

const deleteProvider = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: 'Está seguro de eliminar el proveedor ' + name + ' ?',
        icon: 'question',
        text: 'No se podrá recuperar la información',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            setId(id);
            (async () => {
                await deleteProviderService(id);
                fetchData();
            })();
        } else {
            show_alert('El proveedor no fue eliminado', 'info')
        }
    });
}

    // This information will be draw in the screen
    return (
        <div className="container">
            <br></br>

            <div className="d-flex justify-content-center">
                <button onClick={() => openModal(1)} type="button"
                    className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProvider">
                    <i className='fa-solid fa-circle-plus'></i> Agregar proveedor
                </button>
            </div>
            <br></br>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {providers && providers.map((providerElement) => (
                        <tr key={providerElement.id}>
                            <td>{providerElement.name}</td>
                            <td>{providerElement.phone}</td>
                            <td>{providerElement.city}</td>
                            <td>{providerElement.address}</td>
                            <td>
                                <button type="button"
                                    onClick={() => openModal(2, providerElement)}
                                    className="btn btn-warning btn-floating"s
                                    data-bs-toggle="modal" data-bs-target="#modalProvider">
                                    <i className='fa-solid fa-edit'></i>
                                </button>
                                &nbsp;
                                <button type="button"
                                    className="btn btn-danger btn-floating"
                                    onClick={() => deleteProvider(providerElement.id, providerElement.name)}>
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div id='modalProvider' className="modal fade"
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
                                    <label for="nameLabel">Nombre del proveedor</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputPhone' className='form-control' value={phone}
                                        onChange={(e) => setPhone(e.target.value)}></input>
                                    <label for="brandLabel">Teléfono</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputCity' className='form-control' value={city}
                                        onChange={(e) => setCity(e.target.value)}></input>
                                    <label for="brandLabel">Ciudad</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputAddress' className='form-control' value={address}
                                        onChange={(e) => setAddress(e.target.value)}></input>
                                    <label for="floatingInput">Dirección</label>
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
export default Providers;