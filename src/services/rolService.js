
import { show_alert } from "./functions";


const BASE_API = "http://localhost:8080/roles";

export const getRolesService = async () => {
    try {
        const response = await fetch(BASE_API)
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};

