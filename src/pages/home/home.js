import './home.css';
import Menu from '../../components/menu/menu';


function Home() {
  return (
    <div>

      <div class="container">
        <p><strong>Próximos mantenimientos</strong></p>

        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
            <div class="row">
              <div class="col-1 col-calendar">
                25 MAY
              </div>
              <div class="col col-content">
                <div class="d-flex w-100 p-1 justify-content-between">
                  <h5 class="mb-1">Serie: 122334</h5>
                </div>
                <p class="mb-1">Biomédico</p>
                <small>Bomba de dolor</small>
              </div>
            </div>
          </a>
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
            <div class="row">
              <div class="col-1 col-calendar">
                25 MAY
              </div>
              <div class="col col-content">
                <div class="d-flex w-100 p-1 justify-content-between">
                  <h5 class="mb-1">Serie: 122334</h5>
                </div>
                <p class="mb-1">Biomédico</p>
                <small>Bomba de dolor</small>
              </div>
            </div>
          </a>
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
            <div class="row">
              <div class="col-1 col-calendar">
                25 MAY
              </div>
              <div class="col col-content">
                <div class="d-flex w-100 p-1 justify-content-between">
                  <h5 class="mb-1">Serie: 122334</h5>
                </div>
                <p class="mb-1">Biomédico</p>
                <small>Bomba de dolor</small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Home;