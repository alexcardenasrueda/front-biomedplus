
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
    const responseJSON = await response.json()
    if (!response.ok) {
        show_alert('Error creando el usuario: ' + responseJSON.errorMessage, 'error')
        return null
    }
    show_alert('Usuario creado', 'success')
    return responseJSON
};

export const getUserByEmailService = async (email, pass) => {
    try {
        const response = await fetch(BASE_API + '/email/' + email + '/' + pass)
        const responseJSON = await response.json()
        if (!response.ok) {
            show_alert('Error autenticando el usuario ' + responseJSON.errorMessage, 'error')
        }
        return responseJSON
    } catch (error) {
        show_alert('Error autenticando el usuario', 'error')
    }
};

