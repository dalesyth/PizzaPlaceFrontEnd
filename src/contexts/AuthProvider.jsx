import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    // Check for the presence of the token in cookies
    const tokenRow = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (tokenRow) {
      const token = tokenRow.split("=")[1];
      

      setAuth((prevAuth) => ({ ...prevAuth, token: token }));
    }
    
  }, [setAuth, auth]); // Include setAuth and auth as dependencies

  const isLoggedIn = () => {
    // Check if auth has a token and is not an empty object
    return Object.keys(auth).length > 0;
  };


  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
