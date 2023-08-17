
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

