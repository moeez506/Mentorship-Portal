import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import MyLearning from "./components/Roadmap/MyLearning";
import { AuthContext } from "./context";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Loader from "./components/Layout/Loader";
import Notifications from "./components/Notifications/Notification";

const App = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Loader />
        ) : (
          <>
            {user && <Navbar />}
            <Routes>
              {user ? (
                <>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/roadmaps" element={<RoadmapPage />} />
                  <Route path="/task/:id" element={<TaskPage />} />
                  <Route path="/requests" element={<RequestsPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/mentors" element={<MentorsList />} />
                  <Route
                    path="/unassigned-students"
                    element={<StudentsList />}
                  />
                  <Route path="/mentees" element={<MenteesList />} />
                  <Route path="/messaging" element={<Message />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/my-learning" element={<MyLearning />} />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              )}
            </Routes>
          </>
        )}
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
