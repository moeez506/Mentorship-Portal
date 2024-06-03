import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server } from "./apiEndPoint/apiEndPoint";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${server}/auth/get-user`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setUser(null);
        } else {
          console.error("Failed to fetch user", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password, userType) => {
    try {
      await axios
        .post(
          `${server}/auth/${userType}-login`,
          { email, password },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          console.log(res);
          setUser(res.data.user);
        });
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios
        .get(`${server}/auth/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setUser(null);
        });
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

