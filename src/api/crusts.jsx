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

export async function getCrustByTitle(title) {
  try {
    const response = await axiosInstance.get(`/crusts/title/${title}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return response.data.crust_id;
  } catch (error) {
    console.error("Error getting crust by title: ", error)
    throw error;
  }
}
