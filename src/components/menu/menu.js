import './menu.css';
import * as Constants from '../../utils/constants'
import * as Auth from '../../pages/login/login'
import { useEffect, useState } from 'react';
import { useAuth } from "../../auth/AuthProvider";
import { Link } from "react-router-dom";
import { FcVoicePresentation } from "react-icons/fc";


function Menu() {
  const auth = useAuth();
  const [user, setUSer] = useState(auth.getUerInfo())

  useEffect(() => {
    //setUSer(auth.user)
    console.log('user log menu', auth.getUerInfo())
  }, [auth]);

  const signOut = () => {
    auth.signOut()
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img className="card-img" src="./logo.jpeg" alt="img"></img>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {auth.user && auth.user.rol && auth.user.rol.id == Constants.USER_ROLES.idAdmin ?
              (
                <>
                  <li className="nav-item">
                    <Link class="item" to="/home">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link class="item" to="/inventario">Inventario</Link>
                  </li>
                  <li className="nav-item">
                    <Link class="item" to="/solicitudes">Solicitudes</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="item" to="/providers">Proveedores</Link>
                  </li>
                </>
              ) : null}

            {auth.user && auth.user.rol && auth.user.rol.id === Constants.USER_ROLES.idClient ?
              (
                <>
                  <li className="nav-item">
                    <Link class="item" to="/solicitudes">Solicitudes</Link>
                  </li>
                </>
              ) : null}

            {auth.user && auth.user.rol ?
              (
                <div>
                  <FcVoicePresentation size={40} />
                  <b>{'Usuario: '}</b>  {auth.user.name + '-' + auth.user.email}
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={signOut}>Cerrar sesión</button>
                </div>
              ) : null}
          </ul>
        </div>
      </nav>
      <br /> <br />
    </div>
  );
}
export default Menu;