// import React, { createContext, useState, useContext, useEffect } from "react";
// import PropTypes from "prop-types";
// import Cookies from "js-cookie";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userType, setUserType] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get("token");
//     const userType = Cookies.get("userType");

//     if (token && userType) {
//       setUser(token);
//       setUserType(userType);
//     }
//   }, []);

//   const loginAsStudent = (token) => {
//     Cookies.set("token", token, { expires: 7 });
//     Cookies.set("userType", "student", { expires: 7 });
//     setUser(token);
//     setUserType("student");
//   };

//   const loginAsMentor = (token) => {
//     Cookies.set("token", token, { expires: 7 });
//     Cookies.set("userType", "mentor", { expires: 7 });
//     setUser(token);
//     setUserType("mentor");
//   };

//   const logout = () => {
//     Cookies.remove("token");
//     Cookies.remove("userType");
//     setUser(null);
//     setUserType(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         userType,
//         loginAsStudent,
//         loginAsMentor,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useAuth = () => useContext(AuthContext);

// // src/context/AuthContext.js
// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [mentor, setMentor] = useState(null);
//     const [student, setStudent] = useState(null);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const mentorResponse = await axios.get('/api/mentor'); // Endpoint to get mentor data
//                 setMentor(mentorResponse.data);
//             } catch (error) {
//                 console.error('Failed to fetch mentor:', error);
//             }

//             try {
//                 const studentResponse = await axios.get('/api/student'); // Endpoint to get student data
//                 setStudent(studentResponse.data);
//             } catch (error) {
//                 console.error('Failed to fetch student:', error);
//             }
//         };

//         fetchUser();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ mentor, student }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


// src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { server } from "./apiEndPoint/apiEndPoint.js";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         // Fetch user data from API
//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get(`${server}/auth/get-user`); // Your endpoint to get user data
//                 setUser(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch user:', error);
//             }
//         };

//         fetchUser();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { server } from './apiEndPoint/apiEndPoint';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${server}/auth/get-user`); // Replace with your endpoint
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password, userType) => {
    try {
      const response = await axios.post(`${server}/auth/${userType}-login`, { email, password });
      toast.success(response.data.message);
      console.log(response)
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

