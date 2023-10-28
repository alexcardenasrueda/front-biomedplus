import Menu from '../../components/menu/menu';
import CrearSolicitud from './crear-solicitud';
import VerSolicitudes from './ver-solicitudes';


function Solicitudes() {
    return (
        <>
            <Menu />
            <div class="container">
                <nav>
                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Crear Solicitud</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Ver Solicitudes</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        <CrearSolicitud />
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                        <VerSolicitudes />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Solicitudes;