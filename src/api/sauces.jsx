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

export async function getSauceByTitle(title) {
  try {
    const response = await axiosInstance.get(`/crusts/title/${title}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.crust_id;
  } catch (error) {
    console.error("Error getting crust by title: ", error);
    throw error;
  }
}
