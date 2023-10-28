import Menu from '../../components/menu/menu';
import CrearSolicitud from './crear-solicitud';


function Solicitudes() {
    return (
        <>
            <Menu />
            <div class="container">
                <nav>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        <CrearSolicitud />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Solicitudes;