import axios from "axios";

const APIURL = "http://localhost:3000/api";

export async function getAllSides() {
    try {
        const response = await axios.get(`${APIURL}/sides`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error getting sides: ", error);
        throw error;
    }
}