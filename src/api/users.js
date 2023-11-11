import axiosInstance from "./axios";
import useAuth from "../hooks/useAuth";



export async function getAllUsers() {
  try {
    const response = await axiosInstance.get("/users", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response.data from getAllUsers api call:", response.data)
    return response.data;
  } catch (error) {
    console.error("Error getting all users:", error)
  }
}

export const guestUser = async (firstName, lastName, email) => {
  try {
    const response = await axiosInstance.post("/users/guest", {
      first_name: firstName,
      last_name: lastName,
      email: email,
    });
    console.log("response.data from guestUser function:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating guest user:", error);
  }
};

export const registerUser = async (firstName, lastName, email, password) => {
  try {
    const response = await axiosInstance.post("/users/register", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    console.log("response.data from registerUser function: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering new user: ", error);
  }
};

export const loginUser = async (email, password) => {
  console.log("email from loginUser: ", email);
  console.log("password from loginUser: ", password);
  try {
    const response = await axiosInstance.post("/users/login", {
      email: email,
      password: password,
    });
    console.log("response.data from loginUser function: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user: ", error);
  }
};

export const deleteUser = async ({ userId, token }) => {
  


  try {
    const response = await axiosInstance.delete(`/users/delete/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error)
  }
}
