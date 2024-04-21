import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context";
import { toast, ToastContainer } from "react-toastify";
import theme from "../../styles/theme";

const useStyles = makeStyles({
  sidebar: {
    backgroundColor: theme.primary,
    color: theme.text,
    width: "260px",
    height: "100vh",
    position: "fixed",
    top: "70px",
    left: 0,
    overflowX: "hidden",
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
  },
  linkContainer: {
    padding: "20px",
  },
  link: {
    color: theme.text,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "20px",
    fontSize: "1rem",
    fontFamily: theme.fontfamily,
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.prominent,
    },
  },
  activeLink: {
    backgroundColor: theme.prominent,
  },
  logoutContainer: {
    marginTop: "400px",
  },
});

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const classes = useStyles();
  const { isStudentLoggedIn, isMentorLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    if (!isStudentLoggedIn && !isMentorLoggedIn) {
      toast.info("No user is logged in", {
        position: "bottom-left",
      });
    } else {
      logout().then(() =>
        toast.success("Logged out successfully!", {
          position: "bottom-left",
        })
      );
    }
    toggleSidebar();
  };

  return (
    <>
      {isOpen && (
        <div className={classes.sidebar}>
          <div className={classes.linkContainer}>
            <Link
              to="/dashboard"
              className={`${classes.link} ${
                window.location.pathname === "/dashboard" && classes.activeLink
              }`}
            >
              <GroupsIcon style={{ marginRight: "10px" }} />
              Dashboard
            </Link>
            <Link
              to="/requests"
              className={`${classes.link} ${
                window.location.pathname === "/requests" && classes.activeLink
              }`}
            >
              <ImportContactsIcon style={{ marginRight: "10px" }} />
              Requests
            </Link>
            <Link
              to="/unassigned-students"
              className={`${classes.link} ${
                window.location.pathname === "/unassigned-students" &&
                classes.activeLink
              }`}
            >
              <CheckCircleIcon style={{ marginRight: "10px" }} />
              Unassigned Students
            </Link>
            <Link
              to="/roadmaps"
              className={`${classes.link} ${
                window.location.pathname === "/roadmaps" && classes.activeLink
              }`}
            >
              <PeopleAltIcon style={{ marginRight: "10px" }} />
              Roadmaps
            </Link>
            <Link
              to="/messaging"
              className={`${classes.link} ${
                window.location.pathname === "/messaging" && classes.activeLink
              }`}
            >
              <ImportContactsIcon style={{ marginRight: "10px" }} />
              Messaging
            </Link>
          </div>
          <div
            className={`${classes.linkContainer} ${classes.logoutContainer}`}
          >
            <Link
              to="/"
              className={`${classes.link} ${classes.activeLink}`}
              onClick={handleLogout}
            >
              <LogoutIcon style={{ marginRight: "10px" }} />
              Logout
            </Link>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default Sidebar;
