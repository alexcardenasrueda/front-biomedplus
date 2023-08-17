
const BASE_API = "http://localhost:8080/maintenances";


export const getMaintenancesNextExpected = async () => {
    try {
        const response = await fetch(BASE_API + '/next-expected')
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};
