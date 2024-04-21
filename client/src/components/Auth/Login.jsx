import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import theme from "../../styles/theme";
import { useAuth } from "../../context";

const useStyles = makeStyles((muiTheme) => ({
  root: {
    backgroundColor: theme.prominent,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontFamily: theme.fontfamily,
  },
  paper: {
    maxHeight: "90%",
    width: "30%",
    backgroundColor: theme.primary,
    padding: muiTheme.spacing(3),
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
  },
  form: {
    backgroundColor: theme.primary,
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    marginBottom: muiTheme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.text,
    width: "100%",
    color: theme.prominent,
    padding: muiTheme.spacing(2),
    marginTop: muiTheme.spacing(4),
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: theme.fontfamily,
    "&:hover": {
      backgroundColor: theme.text,
    },
  },
  label: {
    color: theme.text,
    width: "200px",
    marginRight: muiTheme.spacing(2),
  },
  input: {
    flex: 1,
    backgroundColor: theme.text,
    color: theme.buttons,
    padding: muiTheme.spacing(1),
    borderRadius: "5px",
    border: `1px solid ${theme.buttons}`,
    outline: "none",
    "&::placeholder": {
      color: theme.buttons,
    },
    "&:focus": {
      border: `2px solid ${theme.buttons}`,
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loginAsStudent, loginAsMentor } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "mentor",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (loginData.userType === "mentor") {
      const storedMentorData = JSON.parse(localStorage.getItem("mentorData"));
      if (
        storedMentorData &&
        storedMentorData.mentorEmail === loginData.email &&
        storedMentorData.mentorPassword === loginData.password
      ) {
        loginAsMentor();
        toast.success("Mentor Login Successful!", {
          position: "bottom-left",
          onClose: () => {
            navigate("/mentor-dashboard");
          },
        });
      } else {
        toast.error("Invalid Email or Password. Please Try Again.", {
          position: "bottom-left",
        });
      }
    } else if (loginData.userType === "student") {
      const storedStudentData = JSON.parse(localStorage.getItem("studentData"));
      if (
        storedStudentData &&
        storedStudentData.studentEmail === loginData.email &&
        storedStudentData.studentPassword === loginData.password
      ) {
        loginAsStudent();
        toast.success("Student Login Successful!", {
          position: "bottom-left",
          onClose: () => {
            navigate("/student-dashboard");
          },
        });
      } else {
        toast.error("Invalid Email or Password. Please Try Again.", {
          position: "bottom-left",
        });
      }
    }

    setLoginData({ email: "", password: "", userType: "mentor" });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={handleLogin} className={classes.form}>
          <div>
            <div className={classes.formControl}>
              <InputLabel className={classes.label}>Email:</InputLabel>
              <Input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className={classes.input}
                disableUnderline={true}
              />
            </div>
            <div className={classes.formControl}>
              <InputLabel className={classes.label}>Password:</InputLabel>
              <Input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className={classes.input}
                disableUnderline={true}
              />
            </div>
            <div className={classes.formControl}>
              <InputLabel className={classes.label}>User Type:</InputLabel>
              <Select
                name="userType"
                value={loginData.userType}
                onChange={handleChange}
                className={classes.input}
                disableUnderline={true}
              >
                <MenuItem value="mentor">Mentor</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </div>
            <Button className={classes.button} type="submit">
              Login
            </Button>
          </div>
        </form>
      </Paper>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default Login;
