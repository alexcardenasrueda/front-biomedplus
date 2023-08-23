import { show_alert } from "./functions";

const BASE_API = "http://localhost:8080/equipments";


export const getEquipos = async () => {
    try {
        const data = await fetch(BASE_API)
        console.log('response', data.statusText)
        const dataJSON = await data.json()
        return dataJSON
    } catch (error) {
        show_alert('Error al consultar los equipos', 'error')
        console.error(error);
    }
};

export const createEquipment = async (parameters) => {
    try {
        const response = await fetch(BASE_API, {
            method: 'POST',
            body: JSON.stringify(parameters),
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responsePOST', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        show_alert('Error al crear el equipo', 'error')
        console.error(error);
    }
};

export const updateEquipment = async (parameters) => {
    try {
        const response = await fetch(BASE_API + "/{id}", {
            method: 'PUT',
            body: JSON.stringify(parameters),
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responsePUT', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        show_alert('Error al actualizar el equipo', 'error')
        console.log(error)
    }

};
