import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import {
  LoginPage,
  ProfilePage,
  RequestPage,
  RoadmapPage,
  SignUpPage,
  TaskPage,
  MentorsList,
  StudentsList,
  Hero,
} from "./Routes/Routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/roadmaps" element={<RoadmapPage />} />
          <Route path="/requests" element={<RequestPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/mentors" element={<MentorsList />} />
          <Route path="/students" element={<StudentsList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
