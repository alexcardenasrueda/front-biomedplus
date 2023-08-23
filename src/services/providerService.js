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