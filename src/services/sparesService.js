import { show_alert } from "./functions";

const BASE_API = "http://localhost:8080/spares";

export const getSparesService = async () => {
    try {
        const data = await fetch(BASE_API)
        console.log('responseGetSpare', data.statusText)
        const dataJSON = await data.json()
        return dataJSON
    } catch (error) {
        show_alert('Error al consultar los repuestos', 'error')
        console.error(error);
    }
};

export const createSpareService = async (parameters) => {
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
        console.log('Error al crear el repuesto status', response.status)
        console.log('Error al crear el repuesto message', response.statusText)
        show_alert('Error creando el repuesto', 'error')
        throw new Error("WARN", response.status);
    }

    console.log('createSpareResponsePost', response.statusText);
    const responseJSON = await response.json()
    show_alert('Repuesto creado', 'success')
    return responseJSON
};

export const updateSpareService = async (idSpare, parameters) => {
    try {
        const response = await fetch(BASE_API + "/" + idSpare, {
            method: 'PUT',
            body: JSON.stringify(parameters),
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responseUpdateSpare', response.statusText)
        const responseJSON = await response.json()
        show_alert('Repuesto actualizado', 'success')
        return responseJSON
    } catch (error) {
        show_alert('Error al actualizar el repuesto', 'error')
        console.log(error)
    }
};

export const deleteSpareService = async (idSpare) => {
    try {
        const response = await fetch(BASE_API + "/" + idSpare, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responseDeleteSpare', response.statusText)
        const responseText = await response.text()
        show_alert('Repuesto eliminado', 'success')
        return responseText
    } catch (error) {
        show_alert('Error al eliminar el repuesto', 'error')
        console.log(error)
    }
};