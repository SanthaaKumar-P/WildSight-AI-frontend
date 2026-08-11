import axios from "axios";


const API =
"http://localhost:8080/api/dashboard";


export const getWildlifeLocations = async () => {

    const response =
        await axios.get(
            `${API}/map`
        );

    return response.data;

};