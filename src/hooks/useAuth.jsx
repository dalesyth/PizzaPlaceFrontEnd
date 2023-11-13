import { useContext, useDebugValue, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthProvider";
import Cookies from "js-cookie";

// const getTokenFromCookie = () => {
//   return Cookies.get("token") || null;
// };

const getTokenFromCookie = () => {
  const tokenRow = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return tokenRow ? tokenRow.split("=")[1] : null;
};

const useAuth = () => {
  const { auth, setAuth, isLoggedIn } = useContext(AuthContext);
  const [token, setToken] = useState(getTokenFromCookie());

  useDebugValue(auth, (auth) => (isLoggedIn ? "Logged In" : "Logged Out"));

  useEffect(() => {
    // Update the token when the component mounts and whenever auth changes
    setToken(getTokenFromCookie());
  }, [auth]); // Add auth as a dependency

  console.log("token from useAuth:", token);
  return { auth, token, setAuth, isLoggedIn };
};

export default useAuth;
