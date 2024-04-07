// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context";
import Sidebar from "./Sidebar";
import theme from "../../styles/theme";

const Navbar = () => {
  const { isStudentLoggedIn, isMentorLoggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserIconClick = () => {
    if (!isStudentLoggedIn && !isMentorLoggedIn) {
      // Not logged in, redirect to sign-up
      navigate("/sign-up");
    } else if (isMentorLoggedIn) {
      // Mentor logged in, redirect to mentor dashboard
      navigate("/mentor-dashboard");
    } else if (isStudentLoggedIn) {
      // Student logged in, redirect to student dashboard
      navigate("/student-dashboard");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: theme.primary,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "70px",
          fontFamily: theme.fontfamily,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <div
          style={{
            color: theme.text,
            fontSize: 25,
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
            cursor: "pointer",
          }}
        >
          {isSidebarOpen ? (
            <FaTimes style={{ marginRight: "10px" }} onClick={toggleSidebar} />
          ) : (
            <FaBars style={{ marginRight: "10px" }} onClick={toggleSidebar} />
          )}
          <Link to="/" style={{ textDecoration: "none", color: theme.text }}>
            MentorConnect
          </Link>
        </div>
        <div>
          <Link
            to="/dashboard"
            style={{
              color: theme.text,
              fontSize: 25,
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/mentees"
            style={{
              color: theme.text,
              fontSize: 25,
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            My Mentees
          </Link>
          <Link
            to="/reports"
            style={{
              color: theme.text,
              fontSize: 25,
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            Reports
          </Link>
          <FaUser
            size={24}
            style={{
              color: theme.text,
              marginRight: "20px",
              cursor: "pointer",
            }}
            onClick={handleUserIconClick}
          />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
