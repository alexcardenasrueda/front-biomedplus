import { show_alert } from "./functions";

const BASE_API = "http://localhost:8080/providers";


export const getProviders = async () => {
    try {
        const data = await fetch(BASE_API)
        console.log('response from /providers', data.statusText)
        const dataJSON = await data.json()
        return dataJSON
    } catch (error) {
        show_alert('Se ha presentado un error al consultar los proveedores', 'error')
        console.error(error);
    }
};

export const createProviderService = async (parameters) => {
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
        console.log('Error al crear el proveedor status', response.status)
        console.log('Error al crear el proveedor message', response.statusText)
        show_alert('Error creando el proveedor', 'error')
        throw new Error("WARN", response.status);
    }

    console.log('createProviderResponsePost', response.statusText);
    const responseJSON = await response.json()
    show_alert('Proveedor creado', 'success')
    return responseJSON
};

export const updateProviderService = async (idProvider, parameters) => {
    try {
        const response = await fetch(BASE_API + "/" + idProvider, {
            method: 'PUT',
            body: JSON.stringify(parameters),
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responseUpdateProvider', response.statusText)
        const responseJSON = await response.json()
        show_alert('Proveedor actualizado', 'success')
        return responseJSON
    } catch (error) {
        show_alert('Error al actualizar el proveedor', 'error')
        console.log(error)
    }
};

export const deleteProviderService = async (idProvider) => {
    try {
        const response = await fetch(BASE_API + "/" + idProvider, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        console.log('responseDeleteProvider', response.statusText)
        const responseText = await response.text()
        show_alert('Proveedor eliminado', 'success')
        return responseText
    } catch (error) {
        show_alert('Error al eliminar el proveedor', 'error')
        console.log(error)
    }
};