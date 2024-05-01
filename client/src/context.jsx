import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const loginAsStudent = (userData) => {
    setUser(userData);
    setUserType("student");
  };

  const loginAsMentor = (userData) => {
    setUser(userData);
    setUserType("mentor");
  };

  const logout = () => {
    localStorage.removeItem("mentorLogin");
    localStorage.removeItem("studentLogin");
    setUser(null);
    setUserType(null);
    window.location.href = "/";
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
