// // src/components/ProtectedRoute.js
// import React, { useContext } from 'react';
// import { Redirect, Route } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
//     const { mentor, student } = useContext(AuthContext);

//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 const user = mentor || student;

//                 if (!user) {
//                     // User is not logged in
//                     return <Redirect to="/login" />;
//                 }

//                 if (roles && roles.indexOf(user.role) === -1) {
//                     // User does not have the required role
//                     return <Redirect to="/dashboard" />;
//                 }

//                 // User is authenticated and has the required role
//                 return <Component {...props} />;
//             }}
//         />
//     );
// };

// export default ProtectedRoute;

// src/components/ProtectedRoute.js
// import React, { useContext } from 'react';
// import { Navigate, Route } from 'react-router-dom';
// import AuthContext from '../context';

// const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
//     const { user } = useContext(AuthContext);

//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 if (!user) {
//                     // User is not logged in
//                     return <Navigate to="/login" />;
//                 }

//                 if (roles && roles.indexOf(user.role) === -1) {
//                     // User does not have the required role
//                     return <Navigate to="/unauthorized" />;
//                 }

//                 // User is authenticated and has the required role
//                 return <Component {...props} />;
//             }}
//         />
//     );
// };

// export default ProtectedRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import { AuthContext } from "../context";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  } else {
    if(!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
  // const { user, loading } = useContext(AuthContext);

  // if (loading) {
  //   return (
  //     <div>
  //       <Loader />
  //     </div>
  //   );
  // }

  // return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
