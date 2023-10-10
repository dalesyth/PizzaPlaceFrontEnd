import axios from "axios";

const APIURL = "http://localhost:3000/api";

export async function getAllSauces() {
  try {
    const response = await axios.get(`${APIURL}/sauces`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting sauces: ", error);
    throw error;
  }
}
