import './spare.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useState } from "react";
import { getSparesService, createSpareService, updateSpareService, deleteSpareService } from '../../../services/sparesService'
import { getProviders } from '../../../services/providerService';
import { show_alert } from '../../../services/functions'

function Spare() {

    const [dataInitial] = useState();
    const [sparesData, setSparesData] = useState([]);
    const [providers, setProviders] = useState([]);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState(1);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [provider, setProvider] = useState(0);
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [item, setItem] = useState();
    const [codeReference, setCodeReference] = useState();
    const [series, setSeries] = useState();
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState(0);
    const [service, setService] = useState(0);

        // Function to decide kind of operation to open modal
        const openModal = (op, spareElement) => {
            setId('')
            setName('');
            setProvider();
            setBrand();
            setModel('');
            setItem('');
            setCodeReference('');
            setSeries('');
            setQuantity('');
            setPrice('');
            setService('');
    
            if (op === 1) {
                setTitle('Agregar Repuesto')
                setOperation(1)
            } else if (op === 2) {
                setTitle('Editar Repuesto');
                setId(spareElement.id)
                setName(spareElement.name);
                setProvider(spareElement.provider.id);
                setBrand(spareElement.brand)
                setModel(spareElement.model);
                setItem(spareElement.item);
                setCodeReference(spareElement.codeReference);
                setQuantity(spareElement.quantity);
                setSeries(spareElement.series);
                setPrice(spareElement.price);
                setService(spareElement.service);
                setOperation(2)
            }
            window.setTimeout(function () {
                document.getElementById('inputName').focus();
            }, 500);
        }
    
        // Function to get spares data from API
        const fetchDataSpare = () => {
            (async () => {
                setSparesData(await getSparesService());
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
            fetchDataSpare()
        }, [dataInitial]);
    
    
        useEffect(() => {
            getProvidersData()
        }, []);
    
        // Function to valid not null parameters
        const valid = () => {
            var parameters;
            var method;
    
            if (name.trim() === '') {
                show_alert('Escriba el nombre del repuesto', 'warning');
            } else if (provider === 0) {
                show_alert('Seleccione un proveedor', 'warning');
            } else if (brand.trim() === '') {
                show_alert('Escriba la marca del repuesto', 'warning');
            }else if (model.trim() === '') {
                show_alert('Escriba el modelo del repuesto', 'warning');
            } else if (series.trim() === '') {
                show_alert('Escriba la serie del repuesto', 'warning');
            } else if (item.trim() === '') {
                show_alert('Escriba el item del repuesto', 'warning');
            } else if (codeReference.trim() === '') {
                show_alert('Escribala referencia del repuesto', 'warning');
            } else if (quantity === '') {
                show_alert('Escriba la cantidad', 'warning');
            } else if (price === '') {
                show_alert('Escriba el precio del repuesto', 'warning');
            } else {
                if (operation === 1) {
                    parameters = {
                        name: name,
                        provider: {
                            id: parseInt(provider)
                        },
                        brand: brand,
                        model: model,
                        item: item,
                        codeReference: codeReference,
                        series: series,
                        quantity: quantity,
                        price: price,
                        service: service
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
                        item: item,
                        codeReference: codeReference,
                        series: series,
                        quantity: quantity,
                        price: price,
                        service: service
                    };
                    method = ('PUT');
                }
                // Call to service
                callService(parameters, method);
            }
        }
    
        // Function that call SpareService request
        const callService = async (parameters, method) => {
            if (method === 'POST') {
                (async () => {
                    await createSpareService(parameters);
                    fetchDataSpare();
                    document.getElementById('btnCerrar').click();
                })();
            } else if (method === 'PUT') {
                (async () => {
                    await updateSpareService(id, parameters);
                    fetchDataSpare();
                    document.getElementById('btnCerrar').click();
                })();
    
            }
        }
    
        const deleteSpare = (id, name) => {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
                title: 'Está seguro de eliminar el repuesto ' + name + ' ?',
                icon: 'question',
                text: 'No se podrá recuperar la información',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    setId(id)
                    console.log("Voy a eliminar el repuesto");
                    (async () => {
                        await deleteSpareService(id);
                        fetchDataSpare();
                    })();
                } else {
                    show_alert('El repuesto no fue eliminado', 'info')
                }
            });
        }

     // This information will be draw in the screen
     return (
        <div className="container mb-3">
            <br></br>

            <div className="d-flex justify-content-center mb-3">
                <button onClick={() => openModal(1)} type="button"
                    className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalSpare">
                    <i className='fa-solid fa-circle-plus'></i> Agregar Repuesto
                </button>
            </div>
            <br></br>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Repuesto</th>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Item</th>
                        <th scope="col">Referencia</th>
                        <th scope="col">Serie</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sparesData && sparesData.map((spareElement) => (
                        <tr key={spareElement.id}>
                            <td>{spareElement.name}</td>
                            <td>{spareElement.provider.name}</td>
                            <td>{spareElement.brand}</td>
                            <td>{spareElement.model}</td>
                            <td>{spareElement.item}</td>
                            <td>{spareElement.codeReference}</td>
                            <td>{spareElement.series}</td>
                            <td>{spareElement.quantity}</td>
                            <td>{spareElement.price}</td>
                            <td>{spareElement.service}</td>
                            <td>
                                <button type="button"
                                    onClick={() => openModal(2, spareElement)}
                                    className="btn btn-warning btn-floating"s
                                    data-bs-toggle="modal" data-bs-target="#modalSpare">
                                    <i className='fa-solid fa-edit'></i>
                                </button>
                                &nbsp;
                                <button type="button"
                                    className="btn btn-danger btn-floating"
                                    onClick={() => deleteSpare(spareElement.id, spareElement.name)}>
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div id='modalSpare' className="modal fade"
                tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden='true'>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title col-6 mx-auto">
                                <div className='row'>
                                <i class="fa-solid fa-screwdriver-wrench col-2"></i>
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
                                    <label for="nameLabel">Nombre del repuesto</label>
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
                                    <input type='text' id='inputItem' className='form-control' value={item}
                                        onChange={(e) => setItem(e.target.value)}></input>
                                    <label for="itemLabel">Item</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputCodeReference' className='form-control' value={codeReference}
                                        onChange={(e) => setCodeReference(e.target.value)}></input>
                                    <label for="areaLabel">Código Referencia</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputSeries' className='form-control' value={series}
                                        onChange={(e) => setSeries(e.target.value)}></input>
                                    <label for="activeNumberLabel">Serie</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputQuantity' className='form-control' value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}></input>
                                    <label for="serviceLabel">Cantidad</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputPrice' className='form-control' value={price}
                                        onChange={(e) => setPrice(e.target.value)}></input>
                                    <label for="priceLabel">Precio</label>
                                </div>
                                <div className='form-floating mb-3 col-md-6'>
                                    <input type='text' id='inputService' className='form-control' value={service}
                                        onChange={(e) => setService(e.target.value)}></input>
                                    <label for="equipmentTypeLabel">Servicio</label>
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
export default Spare;