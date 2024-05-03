import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    const { email, password, userType } = loginData;
    const storedUserData = JSON.parse(localStorage.getItem(`${userType}Data`));
    const mentorLogin = localStorage.getItem("mentorLogin");
    const studentLogin = localStorage.getItem("studentLogin");

    console.log("Login Data:", loginData);
    console.log("Stored User Data:", storedUserData);

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
          onClose: () => {
            navigate("/dashboard");
          },
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
          onClose: () => {
            navigate("/dashboard");
          },
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
      <div
        className={`bg-[#161616] fixed left-0 w-full h-full font-Poppins flex items-center justify-center`}
      >
        <div className="bg-[#24262a] w-[50%] max-h-[90vh] rounded-md border-[#636363] border-[1px] shadow-sm shadow-[#202427]">
          <div className="w-[80%] h-full mx-auto mb-8 flex flex-col items-center gap-5 m-6">
            <h1 className=" text-3xl font-Roboto text-[#f9faff] mb-2">Login</h1>

            <form
              onSubmit={handleLogin}
              className="flex flex-col overflow-y-auto no-scrollbar gap-8 w-[88%]"
            >
              <FormInput
                label="Email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
              />
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <FormSelect
                label="User Type"
                name="userType"
                value={loginData.userType}
                onChange={handleChange}
                id="userType"
                options={["Mentor", "Student"]}
              />
              <div className="flex flex-col gap-2 pb-5">
                <button
                  type="submit"
                  className={`bg-[#40485a] w-full text-[#ffff] p-2 rounded cursor-pointer`}
                >
                  Login
                </button>
                <p className={`text-[#fefefe]`}>
                  Don't have any Account?{" "}
                  <span
                    onClick={() => navigate("/sign-up")}
                    className="text-[#5884e9] cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </div>
            </form>
          </div>
          <ToastContainer position="bottom-left" />
        </div>
      </div>
    </>
  );
};

export default Login;

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <>
      <div>
        <label className="text-[#fefefe]" htmlFor={name}>
          {label}
        </label>
        <input
          className={`w-full px-5 py-3 rounded-lg no-scrollbar font-medium border-2 border-transparent placeholder-gray-400 text-sm focus:outline-none  focus:border-2  focus:outline bg-[#302E30] text-white focus:border-white`}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

const FormSelect = ({ label, name, value, onChange, options }) => {
  return (
    <>
      <div>
        <label className="text-[#fefefe] mr-2" htmlFor={name}>
          {label}:
        </label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-400 text-sm focus:outline-none  focus:border-2  focus:outline bg-[#302E30] text-white focus:border-white`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
