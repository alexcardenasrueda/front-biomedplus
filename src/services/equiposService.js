import { show_alert } from "./functions";

const BASE_API = "http://localhost:8080/equipments";


export const getEquipos = async () => {
    try {
        const data = await fetch(BASE_API)
        console.log('responseGetEquipos', data.statusText)
        const dataJSON = await data.json()
        return dataJSON
    } catch (error) {
        show_alert('Error al consultar los equipos', 'error')
        console.error(error);
    }
};

export const createEquipment = async (parameters) => {
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
        console.log('Error al crear el equipo status', response.status)
        console.log('Error al crear el equipo message', response.statusText)
        show_alert('Error creando el equipo', 'error')
        throw new Error("WARN", response.status);
    }

    console.log('createEquipmentResponsePost', response.statusText);
    const responseJSON = await response.json()
    show_alert('Equipo creado', 'success')
    return responseJSON
};

export const updateEquipment = async (idEquipment, parameters) => {
    try {
        const response = await fetch(BASE_API + "/" + idEquipment, {
            method: 'PUT',
            body: JSON.stringify(parameters),
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responseUpdateEquipment', response.statusText)
        const responseJSON = await response.json()
        show_alert('Equipo actualizado', 'success')
        return responseJSON
    } catch (error) {
        show_alert('Error al actualizar el equipo', 'error')
        console.log(error)
    }
};

export const deleteEquipmentService = async (idEquipment) => {
    try {
        const response = await fetch(BASE_API + "/" + idEquipment, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responseDeleteEquipment', response.statusText)
        const responseText = await response.text()
        show_alert('Equipo eliminado', 'success')
        return responseText
    } catch (error) {
        show_alert('Error al eliminar el equipo', 'error')
        console.log(error)
    }
};