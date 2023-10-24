import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts/AuthProvider";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  console.log("auth from useAuth: ", auth);
  // useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  

  // return useContext(AuthContext);
  return { auth, setAuth };
};

export default useAuth;
