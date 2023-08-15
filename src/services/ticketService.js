
const BASE_API = "http://localhost:8080/tickets";


export const getTickets = async () => {
    try {
        const response = await fetch(BASE_API)
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};
