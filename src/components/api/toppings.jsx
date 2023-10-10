import axios from "axios";

const APIURL = "http://localhost:3000/api";


export async function getAllToppings() {
    try {
        const response = await axios.get(`${APIURL}/toppings`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting toppings: ', error);
        throw error;
    }
}
