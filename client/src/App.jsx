// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUpPage, LoginPage, HomePage, ProfilePage } from "./Routes/Routes";
import Navbar from "./components/Layout/Navbar";
import PrivateRoute from "./components/Routes/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <PrivateRoute
          path="/mentor-dashboard"
          element={<ProfilePage />}
          userType="mentor"
        />
        <PrivateRoute
          path="/student-dashboard"
          element={<ProfilePage />}
          userType="student"
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
