import axiosInstance from "./axios";

export async function getOrderByUserId(user_id) {
  try {
    const response = await axiosInstance.get(`/${user_id}/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting order by userId: ", error);
    throw error;
  }
}
