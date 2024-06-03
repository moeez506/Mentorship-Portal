import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import { AuthContext } from "../context";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  } else {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;
