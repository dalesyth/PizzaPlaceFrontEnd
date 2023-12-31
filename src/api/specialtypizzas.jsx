import axiosInstance from "./axios";

export async function getAllSpecialtyPizzas() {
   
  try {
    const response = await axiosInstance.get("/specialty-pizza", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    
    return response.data;
  } catch (error) {
    console.error("Error getting specialty pizzas: ", error);
    throw error;
  }
}
