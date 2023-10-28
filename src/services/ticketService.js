import { show_alert } from "./functions";

const BASE_API = "http://localhost:8080/tickets";


export const getTickets = async () => {
    try {
        const data = await fetch(BASE_API)
        console.log('responseGetTicket', data.statusText)
        const dataJSON = await data.json()
        return dataJSON
    } catch (error) {
        show_alert('Error al consultar las solicitudes', 'error')
        console.error(error);
    }
};

export const createTicket = async (parameters, image) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(parameters));
    formData.append("image", image.img);

    const response = await fetch(BASE_API, {
        method: 'POST',
        body: formData,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });

    if (!response.ok) {
        console.log('Error al crear la solicitud status', response.status)
        console.log('Error al crear la solicitud message', response.statusText)
        show_alert('Error creando la solicitud', 'error')
        throw new Error("WARN", response.status);
    }

    console.log('createTicketResponsePost', response.statusText);
    const responseJSON = await response.json()
    show_alert('Solicitud creada', 'success')
    return responseJSON
};

export const updateTicket = async (idTicket, parameters, image) => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(parameters));
        formData.append("image", image.img);

        const response = await fetch(BASE_API + "/" + idTicket, {
            method: 'PUT',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
        console.log('responseUpdateTicket', response.statusText)
        const responseJSON = await response.json()
        show_alert('Solicitud actualizada', 'success')
        return responseJSON
    } catch (error) {
        show_alert('Error al actualizar la solicitud, intente nuevamente', 'error')
        console.log(error)
    }
};

export const deleteTicket = async (idTicket) => {
    try {
        const response = await fetch(BASE_API + "/" + idTicket, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responseDeleteTicket', response.statusText)
        const responseText = await response.text()
        show_alert('Solicitud eliminada', 'success')
        return responseText
    } catch (error) {
        show_alert('Error al eliminar la solicitud', 'error')
        console.log(error)
    }
};
