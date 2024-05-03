import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import DashboardPage from "./components/Dashboard/DashboardPage";
import Navbar from "./components/Layout/Navbar";
import MentorsList from "./components/List/MentorsList";
import StudentsList from "./components/List/StudentsList";
import Profile from "./components/Profile/Profile";
import RequestsPage from "./components/Requests/RequestsPage";
import RoadmapPage from "./components/Roadmap/RoadmapPage";
import TaskPage from "./components/Roadmap/TaskPage";
import Hero from "./components/Route/Hero/Hero";

const App = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const isMentorLoggedIn = localStorage.getItem("mentorLogin");
  const isStudentLoggedIn = localStorage.getItem("studentLogin");

  useEffect(() => {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/sign-up"
    ) {
      setIsNavbarActive(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        {isNavbarActive && <Navbar />}
        <Routes>
          {isMentorLoggedIn || isStudentLoggedIn ? (
            <Route path="/" element={<Navigate to="/dashboard" />} />
          ) : (
            <Route path="/" element={<Hero />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/roadmaps" element={<RoadmapPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentors" element={<MentorsList />} />
          <Route path="/unassigned-students" element={<StudentsList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
