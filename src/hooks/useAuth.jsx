import { useContext, useDebugValue, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthProvider";
import Cookies from "js-cookie";

const useAuth = () => {
  const { auth, setAuth, isLoggedIn } = useContext(AuthContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    const token = Cookies.get("token");

   

    setToken(token);
  }, []); 

  useDebugValue(auth, (auth) => (isLoggedIn ? "Logged In" : "Logged Out"));

  return { auth, token, setAuth, isLoggedIn };
};

export default useAuth;
