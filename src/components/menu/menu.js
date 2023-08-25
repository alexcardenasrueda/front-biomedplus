import './menu.css';

function Menu() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img className="card-img" src="./logo.jpeg" alt="img"></img>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/inventario">Inventario</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/solicitudes">Solicitudes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/providers">Proveedores</a>
            </li>
          </ul>
        </div>
      </nav>
      <br /> <br />
    </div>
  );
}
export default Menu;