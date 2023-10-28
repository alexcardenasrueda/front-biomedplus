
const BASE_API = "http://localhost:8080/status";


export const getStatus = async () => {
    try {
        const response = await fetch(BASE_API)
        console.log('responseGetStatus', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};