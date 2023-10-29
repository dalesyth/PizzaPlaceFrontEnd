import axiosInstance from "./axios";



export async function getAllToppings() {
  try {
    const response = await axiosInstance.get(`/toppings`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
   
    return response.data;
  } catch (error) {
    console.error("Error getting toppings: ", error);
    throw error;
  }
}
