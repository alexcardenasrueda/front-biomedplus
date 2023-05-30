import './equipos.css';


function Equipos() {
    return (

        <div class="container">
            Modulo equipos
            <div class="container-button">
                <button type="button" class="btn btn-info">Agregar equipo</button>
                <button type="button" class="btn btn-info">Editar equipo</button>
            </div>

            <table class="table table-hover">
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default Equipos;
