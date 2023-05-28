import './home.css';
import Menu from '../../components/menu/menu';


function Home() {
  return (
    <div>
    <Menu />

    <div class="container">
    <p>Próximos mantenimientos</p>

    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
      <div class="row">
        <div class="col-1 col-calendar">
            25 MAY
        </div>
        <div class="col col-content">
            <div class="d-flex w-100 p-1 justify-content-between">
              <h5 class="mb-1">Serie: 122334</h5>
              <small>3 days ago</small>
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
              <small>3 days ago</small>
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
                    <small>3 days ago</small>
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