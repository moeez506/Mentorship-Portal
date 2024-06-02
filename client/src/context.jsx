import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const userType = Cookies.get("userType");

    if (token && userType) {
      setUser(token);
      setUserType(userType);
    }
  }, []);

  const loginAsStudent = (token) => {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("userType", "student", { expires: 7 });
    setUser(token);
    setUserType("student");
  };

  const loginAsMentor = (token) => {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("userType", "mentor", { expires: 7 });
    setUser(token);
    setUserType("mentor");
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userType");
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        loginAsStudent,
        loginAsMentor,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
