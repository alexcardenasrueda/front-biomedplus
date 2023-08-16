
const BASE_API = "http://localhost:8080/equipments";


export const getEquipos = async () => {
    try {
        const data = await fetch(BASE_API)
        console.log('response', data.statusText)
        const dataJSON = await data.json()
        return dataJSON
    } catch (error) {
        console.error(error);
    }
};

export const getEquiposProximosMantenimientos = async () => {
    try {
        const response = await fetch(BASE_API + '/next-maintenancesadasd')
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};
