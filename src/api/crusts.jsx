import axios from "axios";

const APIURL = "http://localhost:3000/api";

export async function getAllCrusts() {
    try {
        const response = await axios.get(`${APIURL}/crusts`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data
    } catch (error) {
        console.error('Error getting all crusts: ', error)
        throw error;
    }
}