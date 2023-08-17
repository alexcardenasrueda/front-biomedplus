
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

export const getTicketsCreted = async () => {
    try {
        const response = await fetch(BASE_API + '/created')
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};