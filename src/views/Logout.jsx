import { useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../api/users";
import useAuth from "../hooks/useAuth";


const Logout = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    

    const handleLogout = async () => {
      // Clear the token on the client side
      setAuth({});

      // Logout on the server side
      try {
        await logoutUser();
        console.log("Logout successful");
      } catch (error) {
        console.error("Error logging out user:", error);
      }

      // Remove the token from localStorage if you are using it for persistent storage
      localStorage.removeItem("auth");
    };

    handleLogout();
  }, [setAuth]);

  return (
    <>
      <div className="bg-gray-500/50 fixed top-0 left-0 w-full h-screen">
        <div className="flex justify-center items-center py-24">
          <div className="mx-auto max-w-[450px] h-100 rounded-lg bg-gray-200">
            <div className="font-bold max-w-[320px] mx-auto py-6 px-3">
              <div className="text-center">
                <label className="text-3xl">You have been logged out!</label>
              </div>
              <div className="flex justify-center mt-6 underline text-blue-500 hover:text-blue-600">
                
                <Link to={`/home`} className="hover:text-blue-600">
                  Home
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
