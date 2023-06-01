import './ver-solicitudes.css';

function VerSolicitudes() {
    return (

        <div class="container">
            Modulo ver solicitudes
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Estado solicitud</th>
                        <th scope="col">Descripción solicitud</th>
                        <th scope="col">Dias abierto</th>
                        <th scope="col">Solicitante</th>
                        <th scope="col">ID Solicitud</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <button type="button" class="btn btn-success btn-sm">Abierta</button>
                        </td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" class="btn btn-primary btn-sm">En ejecución</button>
                        </td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" class="btn btn-secondary btn-sm">Cerrada</button>
                        </td>
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
export default VerSolicitudes;