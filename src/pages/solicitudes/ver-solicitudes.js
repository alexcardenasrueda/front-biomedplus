import './ver-solicitudes.css';
import { useEffect, useState } from "react";
import { getTickets } from '../../services/ticketService'

function VerSolicitudes() {
    const [dataInitial, setDataInitial] = useState();
    const [tickets, setTickets] = useState();

    const fetchData = () => {
        (async () => {
            const data = await getTickets();
            setTickets(data);
        })();
    }

    useEffect(() => {
        fetchData()
    }, [dataInitial]);
    return (
        <div class="container">
            Modulo ver solicitudes
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID Solicitud</th>
                        <th scope="col">Estado solicitud</th>
                        <th scope="col">Descripción solicitud</th>
                        <th scope="col">Fecha creación</th>
                        <th scope="col">Solicitante</th>
                        <th scope="col">Equipo</th>
                    </tr>
                </thead>
                <tbody>
                {tickets && tickets.map((ticket, index) => (
                        <tr>
                            <td>{ticket.id}</td>
                            <td>{ticket.status.name}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.creationDate}</td>
                            <td>{ticket.user.name}</td>
                            <td>{ticket.equipment.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default VerSolicitudes;