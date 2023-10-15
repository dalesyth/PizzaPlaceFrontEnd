import axiosInstance from "./axios";

export async function getAllSauces() {
  try {
    const response = await axiosInstance.get(`/sauces`, {
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
