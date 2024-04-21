import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import theme from "../../styles/theme";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context";

const useStyles = makeStyles({
  navbar: {
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
  },
  titleContainer: {
    color: theme.text,
    fontSize: 25,
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    cursor: "pointer",
  },
  link: {
    color: theme.text,
    fontSize: 25,
    marginRight: "20px",
    textDecoration: "none",
  },
});

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isStudentLoggedIn, isMentorLoggedIn } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserIconClick = () => {
    if (!isStudentLoggedIn && !isMentorLoggedIn) {
      navigate("/sign-up");
    } else if (isMentorLoggedIn) {
      navigate("/mentor-dashboard");
    } else if (isStudentLoggedIn) {
      navigate("/student-dashboard");
    }
  };

  return (
    <>
      <div className={classes.navbar}>
        <div className={classes.titleContainer}>
          {isSidebarOpen ? (
            <CloseIcon
              style={{ marginRight: "10px" }}
              onClick={toggleSidebar}
            />
          ) : (
            <KeyboardArrowRightIcon
              style={{ marginRight: "10px" }}
              onClick={toggleSidebar}
            />
          )}
          <Link to="/" className={classes.link}>
            MentorConnect
          </Link>
        </div>
        <div>
          <Link to="/dashboard" className={classes.link}>
            Dashboard
          </Link>
          <Link to="/mentees" className={classes.link}>
            My Mentees
          </Link>
          <Link to="/reports" className={classes.link}>
            Reports
          </Link>
          <PersonIcon
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
