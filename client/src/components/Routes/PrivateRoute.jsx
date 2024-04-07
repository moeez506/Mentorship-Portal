// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../context";

const PrivateRoute = ({ component: Component, userType, ...rest }) => {
  const { isMentorLoggedIn, isStudentLoggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        (userType === "mentor" && isMentorLoggedIn) ||
        (userType === "student" && isStudentLoggedIn) ? (
          <Component {...props} />
        ) : (
          <Navigate to="/sign-up" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  userType: PropTypes.oneOf(["mentor", "student"]).isRequired,
};

export default PrivateRoute;
