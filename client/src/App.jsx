import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import DashboardPage from "./components/Dashboard/DashboardPage";
import Navbar from "./components/Layout/Navbar";
import MenteesList from "./components/List/MenteesList";
import MentorsList from "./components/List/MentorsList";
import StudentsList from "./components/List/StudentsList";
import Message from "./components/Messaging/Message";
import Profile from "./components/Profile/Profile";
import RequestsPage from "./components/Requests/RequestsPage";
import RoadmapPage from "./components/Roadmap/RoadmapPage";
import TaskPage from "./components/Roadmap/TaskPage";
import ProtectedRoute from "./Routes/ProtectedRoute";

const App = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/sign-up" &&
      window.location.pathname !== "/"
    ) {
      setIsNavbarActive(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        {isNavbarActive && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/roadmaps" element={<RoadmapPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentors" element={<MentorsList />} />
          <Route path="/unassigned-students" element={<StudentsList />} />
          <Route path="/mentees" element={<MenteesList />} />
          <Route path="/messaging" element={<Message />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </BrowserRouter>
    </>
  );
};

export default App;
