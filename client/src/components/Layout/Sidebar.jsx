// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdPeople } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../../context";
import { toast, ToastContainer } from "react-toastify";
import theme from "../../styles/theme";

const Sidebar = ({ isOpen, onClose }) => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const { isStudentLoggedIn, isMentorLoggedIn, logout } = useAuth();
  const sidebarRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      setActiveLink("");
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleMouseEnter = (e) => {
    if (e.target.pathname !== activeLink) {
      e.target.style.backgroundColor = theme.prominent;
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.pathname !== activeLink) {
      e.target.style.backgroundColor = "transparent";
    }
  };

  const handleLogout = () => {
    if (!isStudentLoggedIn && !isMentorLoggedIn) {
      toast.info("No user is logged in", {
        position: "bottom-left",
      });
    } else {
      logout().then(
        toast.success("Logged out successfully!", {
          position: "bottom-left",
        })
      );
      onClose(); // Close sidebar after successful logout
    }
    setActiveLink("");
  };

  const handleOutsideClick = (e) => {
    if (!sidebarRef.current.contains(e.target) && isOpen) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="sidebar"
        ref={sidebarRef}
        style={{
          backgroundColor: theme.primary,
          color: theme.text,
          width: isOpen ? "260px" : "0",
          height: "100vh",
          position: "fixed",
          top: "70px",
          left: 0,
          transition: "0.5s",
          overflowX: "hidden",
          zIndex: 999,
        }}
      >
        <div style={{ padding: "20px", fontFamily: theme.fontFamily }}>
          <Link
            to="/dashboard"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveLink("/dashboard")}
            className="sidebar-link"
            style={{
              color: theme.text,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "20px",
              transition: "background-color 0.3s",
              fontSize: "1rem",
              backgroundColor:
                activeLink === "/dashboard" ? theme.prominent : "transparent",
              fontFamily: theme.fontfamily,
            }}
          >
            <IoIosPeople style={{ marginRight: "10px" }} />
            Dashboard
          </Link>
          <Link
            to="/request"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveLink("/request")}
            className="sidebar-link"
            style={{
              color: theme.text,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "20px",
              transition: "background-color 0.3s",
              fontSize: "1rem",
              backgroundColor:
                activeLink === "/request" ? theme.prominent : "transparent",
              fontFamily: theme.fontfamily,
            }}
          >
            <FaBookOpen style={{ marginRight: "10px" }} />
            Request
          </Link>
          <Link
            to="/unassigned-students"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveLink("/unassigned-students")}
            className="sidebar-link"
            style={{
              color: theme.text,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "20px",
              transition: "background-color 0.3s",
              fontSize: "1rem",
              backgroundColor:
                activeLink === "/unassigned-students"
                  ? theme.prominent
                  : "transparent",
              fontFamily: theme.fontfamily,
            }}
          >
            <IoIosCheckmarkCircle style={{ marginRight: "10px" }} />
            Unassigned Students
          </Link>
          <Link
            to="/roadmaps"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveLink("/roadmaps")}
            className="sidebar-link"
            style={{
              color: theme.text,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "20px",
              transition: "background-color 0.3s",
              fontSize: "1rem",
              backgroundColor:
                activeLink === "/roadmaps" ? theme.prominent : "transparent",
              fontFamily: theme.fontfamily,
            }}
          >
            <MdPeople style={{ marginRight: "10px" }} />
            Roadmaps
          </Link>
          <Link
            to="/messaging"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveLink("/messaging")}
            className="sidebar-link"
            style={{
              color: theme.text,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "20px",
              transition: "background-color 0.3s",
              fontSize: "1rem",
              backgroundColor:
                activeLink === "/messaging" ? theme.prominent : "transparent",
              fontFamily: theme.fontfamily,
            }}
          >
            <FaBookOpen style={{ marginRight: "10px" }} />
            Messaging
          </Link>
          <Link
            to="/"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleLogout}
            className="sidebar-link"
            style={{
              color: theme.text,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "20px",
              transition: "background-color 0.3s",
              fontSize: "1rem",
              backgroundColor: theme.prominent,
              fontFamily: theme.fontfamily,
              marginTop: "20px",
            }}
          >
            <HiOutlineLogout style={{ marginRight: "10px" }} />
            Logout
          </Link>
        </div>
      </div>
      <ToastContainer position="bottom-left" />
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
