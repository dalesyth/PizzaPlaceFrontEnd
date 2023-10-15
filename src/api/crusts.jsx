import axiosInstance from "./axios";

export async function getAllCrusts() {
  try {
    const response = await axiosInstance.get(`/crusts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting all crusts: ", error);
    throw error;
  }
}
