import './menu.css';

function Menu() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img class="card-img" src="./logo.jpeg" alt="Card image"></img>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Inventario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Solicitudes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Alertas
               <img class="notification" src="./notification.png" alt="Card image"></img></a>
            </li>
          </ul>
        </div>
      </nav>
      <br /> <br />
    </div>
  );
}
export default Menu;