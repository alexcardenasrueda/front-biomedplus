import './home.css';
import ViewTicketsCreated from './tickets/view-tickets';
import ViewMaintenancesNextExpected from './maintenances/next-expected';
import { useAuth } from '../../auth/AuthProvider';
import Menu from '../../components/menu/menu';



function Home() {

  const auth = useAuth();


  return (
    <div>
      < Menu />


      <div class="container">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Equipos con próximos mantenimientos programados
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <ViewMaintenancesNextExpected />
              </div>
            </div>
          </div>
          <br></br>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Nuevas solicitudes
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <ViewTicketsCreated />
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
export default Home;