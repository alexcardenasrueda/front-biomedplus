import { show_alert } from '../services/functions'
const BASE_API = "http://localhost:8080/tickets";


export const getTickets = async () => {
    try {
        const data = await fetch(BASE_API)
        console.log('response from /ver-solicitudes', data.statusText)
        const dataJSON = await data.json()
        return dataJSON
    } catch (error) {
        show_alert('Error al consultar las solicitudes', 'error')
        console.error(error);
    }
};

export const getTicketsCreted = async () => {
    try {
        const response = await fetch(BASE_API + '/created')
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};

export const createTicketsService = async (parameters) => {
    const response = await fetch(BASE_API, {
        method: 'POST',
        body: JSON.stringify(parameters),
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    if (!response.ok) {
        console.log('Error al crear solicitud', response.status)
        console.log('Error al crear solicitud', response.statusText)
        show_alert('Error creando la solicitud, intente nuevamente', 'error')
        throw new Error("WARN", response.status);
    }

    console.log('createTicketsResponsePost', response.statusText);
    const responseJSON = await response.json()
    show_alert('Solicitud creada', 'success')
    return responseJSON
};

export const updateTicketsService = async (idTickets, parameters) => {
    try {
        const response = await fetch(BASE_API + "/" + idTickets, {
            method: 'PUT',
            body: JSON.stringify(parameters),
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responseUpdateTickets', response.statusText)
        const responseJSON = await response.json()
        show_alert('Solicitud actualizada', 'success')
        return responseJSON
    } catch (error) {
        show_alert('Error al actualizar la solicitud, intente nuevamente', 'error')
        console.log(error)
    }
};

export const deleteTicketsService = async (idTickets) => {
    try {
        const response = await fetch(BASE_API + "/" + idTickets, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responseDeleteTickets', response.statusText)
        const responseText = await response.text()
        show_alert('Solicitud eliminada', 'success')
        return responseText
    } catch (error) {
        show_alert('Error al eliminar la solicitud', 'error')
        console.log(error)
    }
};
