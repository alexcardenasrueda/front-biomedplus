import { useEffect, useState } from "react";
import { getTickets } from '../../../services/ticketService'

function ViewTicketsCreated() {
    const [dataInitial, setDataInitial] = useState();
    const [ticketsCreated, setTicketsCreated] = useState();

    const fetchData = () => {
        (async () => {
            const data = await getTickets();
            setTicketsCreated(data);
        })();
    }

    useEffect(() => {
        fetchData()
    }, [dataInitial]);
    return (
        <div>
            <div class="row">
                {ticketsCreated && ticketsCreated.map((ticket, index) => (
                    <div class="col-sm-4 mb-3 mb-sm-0">

                        <div class="card" style={{ marginBottom: "5px" }}>
                            <div class="card-header" style={{ backgroundColor: "#D5F5E3" }}>
                                <b>#{ticket.id}</b> <b>Fecha de creación:</b> {ticket.creationDate}
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">{ticket.description}</h5>
                            </div>

                            <ul class="list-group list-group">
                                <div class="card-body">
                                    <h5 class="card-text"> Equipo:</h5>
                                    <ul>
                                        <li><b>Nombre:</b> {ticket.equipment.name}</li>
                                        <li><b>Serie:</b> {ticket.equipment.series}</li>
                                        <li><b>Area:</b> {ticket.equipment.area}</li>
                                    </ul>
                                </div>
                            </ul>

                            <ul class="list-group list-group">
                                <div class="card-body">
                                    <h5 class="card-text">  Usuario resposanble:</h5>

                                    <ul>
                                        <li><b>Nombre:</b> {ticket.user.name}</li>
                                        <li><b>Email:</b> {ticket.user.email}</li>
                                    </ul>
                                </div>
                            </ul>

                            <div class="card-body">
                                <a href="#" class="btn btn-primary">Ver solicitud</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/*<div class="list-group">
                {ticketsCreated && ticketsCreated.map((ticket, index) => (
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
                        <div class="row">
                            <div class="col-1 col-calendar">
                                {ticket.creationDate}
                            </div>
                            <div class="col col-content">
                                <div class="d-flex w-100 p-1 justify-content-between">
                                    <h5 class="mb-1">Serie: {ticket.equipment.series}</h5>
                                </div>
                                <p class="mb-1">{ticket.equipment.equipmentType}</p>
                                <small>{ticket.equipment.name}</small>
                            </div>
                        </div>
                    </a>
                ))}
            </div>*/}
        </div>
    );
}
export default ViewTicketsCreated;