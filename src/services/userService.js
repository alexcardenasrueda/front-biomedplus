
import { show_alert } from "./functions";


const BASE_API = "http://localhost:8080/users";

export const createUserService = async (parameters) => {
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
        //console.log('Error al crear usuario', response.status)
        //console.log('Error al crear usuario', response.statusText)
        show_alert('Error creando el usuario', 'error')
        throw new Error("WARN", response.status);
    }

    //const responseJSON = await response.json()
    show_alert('Usuario creado', 'success')
    return
};

export const getUserByEmailService = async (email) => {
    try {
        const response = await fetch(BASE_API + '/email/' + email)
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};

