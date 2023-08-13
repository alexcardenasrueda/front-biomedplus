import './home.css';
import { useEffect, useState } from "react";
import { getEquiposProximosMantenimientos } from '../../services/equiposService'


function Home() {
  const [dataInitial, setDataInitial] = useState();
  const [proxMantenimientos, setProxMantenimientos] = useState();

  const fetchData = () => {
    (async () => {
      const data = await getEquiposProximosMantenimientos();
      setProxMantenimientos(data);
    })();
  }

  useEffect(() => {
    fetchData()
  }, [dataInitial]);

  return (
    <div>

      <div class="container">
        <p><strong>Próximos mantenimientos</strong></p>

        <div class="list-group">
          {proxMantenimientos && proxMantenimientos.map((mant, index) => (
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
              <div class="row">
                <div class="col-1 col-calendar">
                  {mant.fechaProximoMantenimiento}
                </div>
                <div class="col col-content">
                  <div class="d-flex w-100 p-1 justify-content-between">
                    <h5 class="mb-1">Serie: {mant.serie}</h5>
                  </div>
                  <p class="mb-1">{mant.tipoEquipo}</p>
                  <small>{mant.nombre}</small>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;