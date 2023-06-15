
const BASE_API = "http://localhost:8080/equipos";


export const getEquipos = async () => {
    try {
        const response = await fetch(BASE_API)
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};

export const getEquiposProximosMantenimientos = async () => {
    try {
        const response = await fetch(BASE_API + '/proximos-mantenimientos')
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};
