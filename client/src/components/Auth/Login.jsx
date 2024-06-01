import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context";
import { FiChevronDown } from "react-icons/fi";
import logo from "../../assets/logo.png"; // Import the logo image

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

    const { email, password, userType } = loginData;
    const storedUserData = JSON.parse(localStorage.getItem(`${userType}Data`));
    const mentorLogin = localStorage.getItem("mentorLogin");
    const studentLogin = localStorage.getItem("studentLogin");

    if (userType === "mentor") {
      if (studentLogin) {
        localStorage.removeItem("studentLogin");
      }

      const isValidMentor = storedUserData.some(
        (mentor) =>
          mentor.mentorEmail === email && mentor.mentorPassword === password
      );

      if (isValidMentor) {
        loginAsMentor();
        localStorage.setItem("mentorLogin", email);
        toast.success("Mentor Login Successful!", {
          position: "bottom-center",
          autoClose: 1000,
          onClose: () => navigate("/dashboard"),
        });
      } else {
        toast.error("Invalid Email or Password. Please Try Again.", {
          position: "bottom-center",
        });
      }
    } else if (userType === "student") {
      if (mentorLogin) {
        localStorage.removeItem("mentorLogin");
      }

      const isValidStudent = storedUserData.some(
        (student) =>
          student.studentEmail === email && student.studentPassword === password
      );

      if (isValidStudent) {
        loginAsStudent();
        localStorage.setItem("studentLogin", email);
        toast.success("Student Login Successful!", {
          position: "bottom-center",
          autoClose: 1000,
          onClose: () => navigate("/dashboard"),
        });
      } else {
        toast.error("Invalid Email or Password. Please Try Again.", {
          position: "bottom-center",
        });
      }
    }

    setLoginData({ email: "", password: "", userType: "mentor" });
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/2 bg-green-200 p-10 flex flex-col justify-center items-center relative">
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl font-bold mb-10 text-center">
              Welcome to Struggle.io
            </h1>
            <img src={logo} alt="Logo" className="mt-6 h-60 w-60" />{" "}
          </div>
        </div>
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-8">Sign-in</h2>
          <form onSubmit={handleLogin} className="w-3/4">
            <div className="mb-4">
              <input
                className="w-full p-3 rounded-[12px] shadow-md shadow-[#66C871] placeholder:text-[#ABABAB] border-none bg-[#56c36129]"
                type="email"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full p-3 rounded-[12px] shadow-md shadow-[#66C871] placeholder:text-gray-500 border-none bg-[#56c36129]"
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="mb-6 flex items-center relative">
              <select
                placeholder="Status"
                id="userType"
                name="userType"
                value={loginData.userType}
                onChange={handleChange}
                className="p-3 rounded-[12px] border border-gray-700 w-full shadow-md shadow-[#66C871] placeholder:text-gray-500 bg-[#56c36129] appearance-none pr-10"
              >
                <option value="mentor">Mentor</option>
                <option value="student">Student</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="text-green-500" />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md text-[20px] cursor-pointer self-center px-[17.5vw] py-2 mt-4 font-Eczar bg-[#56C361] text-white shadow-sm shadow-[#00000070]"
            >
              Login
            </button>
          </form>
          <p className="mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/sign-up")}
              className="text-blue-600 cursor-pointer"
            >
              Signup Here
            </span>
          </p>
        </div>
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default Login;
