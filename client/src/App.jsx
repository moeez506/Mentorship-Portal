import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Navbar from "./components/Layout/Navbar";
import MentorsList from "./components/List/MentorsList";
import StudentsList from "./components/List/StudentsList";
import Profile from "./components/Profile/Profile";
import RequestsPage from "./components/Requests/RequestsPage";
import RoadmapPage from "./components/Roadmap/RoadmapPage";
import TaskPage from "./components/Roadmap/TaskPage";
import Hero from "./components/Route/Hero/Hero";

const App = () => {
  const isMentorLoggedIn = localStorage.getItem("mentorLogin");
  const isStudentLoggedIn = localStorage.getItem("studentLogin");

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <Sidebar /> */}
        <Routes>
          {isMentorLoggedIn || isStudentLoggedIn ? (
            <Route path="/" element={<Navigate to="/dashboard" />} />
          ) : (
            <Route path="/" element={<Hero />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/roadmaps" element={<RoadmapPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentors" element={<MentorsList />} />
          <Route path="/students" element={<StudentsList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
