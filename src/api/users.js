import axiosInstance from "./axios";

export const registerUser = async (firstName, lastName, email, password) => {
  try {
    const response = await axiosInstance.post("/register", {
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
