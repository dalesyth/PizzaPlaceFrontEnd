import axiosInstance from "./axios";

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
    console.log("email from loginUser: ", email)
    console.log("password from loginUser: ", password)
    try {
        const response = await axiosInstance.post("/users/login", {
            email: email,
            password: password,
        });
        console.log("response.data from loginUser function: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in user: ", error)
    }
}
