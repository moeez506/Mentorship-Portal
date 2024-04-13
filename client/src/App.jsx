// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SignUpPage,
  LoginPage,
  HomePage,
  RoadmapPage,
  TaskPage,
} from "./Routes/Routes";
import Navbar from "./components/Layout/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/roadmaps" element={<RoadmapPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
