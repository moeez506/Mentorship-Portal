// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../../styles/theme";
import { useAuth } from "../../context";

const Login = () => {
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
    <div
      style={{
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
      }}
    >
      <div
        style={{
          maxHeight: "90%",
          width: "30%",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "20px",
          ...(theme.primary && { backgroundColor: theme.primary }),
          display: "flex",
          flexDirection: "column",
        }}
      >
        <form onSubmit={handleLogin} style={{ backgroundColor: theme.primary }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "10px", display: "flex" }}>
              <label
                style={{
                  color: theme.text,
                  marginRight: "10px",
                  flex: "1",
                  fontSize: "16px",
                }}
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                style={{
                  flex: "2",
                  padding: "8px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.secondary}`,
                }}
              />
            </div>
            <div style={{ marginBottom: "10px", display: "flex" }}>
              <label
                style={{
                  color: theme.text,
                  marginRight: "10px",
                  flex: "1",
                  fontSize: "16px",
                }}
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                style={{
                  flex: "2",
                  padding: "8px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.secondary}`,
                }}
              />
            </div>
            <div style={{ marginBottom: "10px", display: "flex" }}>
              <label
                style={{
                  color: theme.text,
                  marginRight: "10px",
                  flex: "1",
                  fontSize: "16px",
                }}
              >
                User Type:
              </label>
              <select
                name="userType"
                value={loginData.userType}
                onChange={handleChange}
                style={{
                  flex: "2",
                  padding: "8px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.secondary}`,
                }}
              >
                <option value="mentor">Mentor</option>
                <option value="student">Student</option>
              </select>
            </div>
            <button
              style={{
                backgroundColor: theme.secondary,
                width: "100%",
                color: theme.buttons,
                padding: "10px",
                marginTop: "20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: theme.fontfamily,
              }}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default Login;
