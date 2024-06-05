import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../../apiEndPoint/apiEndPoint";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context";

const SignUp = () => {
  const navigate = useNavigate();
  const [isMentor, setIsMentor] = useState(true);
  const { user } = useContext(AuthContext);

  const [mentorData, setMentorData] = useState({
    firstName: "",
    lastName: "",
    experience: "",
    company: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    semester: "",
    phoneNumber: "",
    shift: "",
    program: "",
  });

  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    phoneNumber: "",
    semester: "",
    shift: "",
    program: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isMentor) {
      setMentorData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phoneNumber) => /^\d+$/.test(phoneNumber);
  const validatePassword = (password) => password.length >= 6; // You can add more complex validation if needed
  const validateDOB = (dob) => {
    const date = new Date(dob);
    const today = new Date();
    return !isNaN(date.getTime()) && date < today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = isMentor ? { ...mentorData } : { ...studentData };

    const isEmpty = Object.values(formData).some((value) => value === "");

    if (isEmpty) {
      toast.error(
        `Please fill up all the ${isMentor ? "Mentor" : "Student"} fields`,
        { autoClose: 2000 }
      );
      return;
    }

    if (!validateName(formData.firstName) || !validateName(formData.lastName)) {
      toast.error("Name should only contain letters and spaces.", {
        autoClose: 2000,
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Invalid email address.", { autoClose: 2000 });
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Phone number should only contain numbers.", {
        autoClose: 2000,
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Password should be at least 6 characters long.", {
        autoClose: 2000,
      });
      return;
    }

    if (!validateDOB(formData.dob)) {
      toast.error("Invalid date of birth.", { autoClose: 2000 });
      return;
    }

    const url = isMentor
      ? `${server}/mentor/register`
      : `${server}/student/register`;

    try {
      const response = await axios.post(url, formData);

      if (response.status !== 201) {
        throw new Error(response.data.message || "Failed to register");
      }

      toast.success(
        `${isMentor ? "Mentor" : "Student"} Registration Successful!`
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <>
      <div className="flex flex-row h-screen w-full bg-[#66c871cb]">
        <div className="w-[50%] p-10 flex flex-col justify-center items-center relative">
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl font-bold mb-10 text-center">
              Welcome to Struggle.io
            </h1>
            <img src={logo} alt="Logo" className="mt-6 h-60 w-60" />
          </div>
        </div>

        <div className="w-full bg-[#F2F9FF] flex flex-col justify-center items-center rounded-tl-[50px] rounded-bl-[50px]">
          <div className="w-full h-full mx-auto flex flex-col items-center justify-center">
            <div className="flex flex-col items-start w-[70%] h-[80vh]">
              <div className="flex flex-row w-full border-b-2 border-[#fff] gap-2 p-3 mb-2 bg-[#c3e9ff] rounded-[8px]">
                <button
                  className={`w-full cursor-pointer p-[6px] text-[16px] font-medium rounded-[12px] font-Eczar flex justify-around ${
                    isMentor
                      ? `bg-[#56c361] text-[#ffff] shadow-md shadow-[#00000037]`
                      : `text-[#1c1c1c] bg-[#d5efff]`
                  }`}
                  onClick={() => setIsMentor(true)}
                >
                  Mentor
                </button>
                <button
                  className={`w-full cursor-pointer p-[6px] text-[16px] font-medium rounded-[12px] font-Eczar flex justify-around ${
                    !isMentor
                      ? `bg-[#56c361] text-[#ffff] shadow-md shadow-[#00000037]`
                      : `text-[#1c1c1c] bg-[#d5efff]`
                  }`}
                  onClick={() => setIsMentor(false)}
                >
                  Student
                </button>
              </div>
              <h2 className=" text-3xl font-medium font-Eczar mb-8">Sign-up</h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col overflow-y-auto no-scrollbar gap-8 w-[100%]"
              >
                {isMentor ? (
                  <>
                    <div className="flex flex-row items-center justify-center w-full gap-5">
                      <FormInput
                        label="First Name"
                        name="firstName"
                        value={mentorData.firstName}
                        onChange={handleChange}
                      />
                      <FormInput
                        label="Last Name"
                        name="lastName"
                        value={mentorData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <FormInput
                      label="Email"
                      name="email"
                      value={mentorData.email}
                      onChange={handleChange}
                      type="email"
                    />
                    <div className="flex flex-row items-center justify-between w-full gap-5">
                      <FormInput
                        label="Company"
                        name="company"
                        value={mentorData.company}
                        onChange={handleChange}
                      />
                      <FormInput
                        label="Experience (years)"
                        type="number"
                        name="experience"
                        value={mentorData.experience}
                        onChange={handleChange}
                      />
                    </div>
                    <FormInput
                      label="Password"
                      name="password"
                      value={mentorData.password}
                      onChange={handleChange}
                      type="password"
                    />
                    <FormInput
                      label="Phone Number"
                      name="phoneNumber"
                      value={mentorData.phoneNumber}
                      onChange={handleChange}
                      type="tel"
                    />
                    <div className="flex flex-row items-center justify-center w-full gap-5">
                      <FormInput
                        label="Date of Birth"
                        name="dob"
                        value={mentorData.dob}
                        onChange={handleChange}
                        type="date"
                      />
                      <FormSelect
                        label="Gender"
                        name="gender"
                        value={mentorData.gender}
                        onChange={handleChange}
                        options={["Gender", "Male", "Female", "Other"]}
                      />
                    </div>
                    <FormInput
                      label="Program"
                      name="program"
                      value={mentorData.program}
                      onChange={handleChange}
                    />
                    <div className="flex flex-row items-center justify-center w-full gap-5">
                      <FormInput
                        label="Semester"
                        name="semester"
                        type="number"
                        value={mentorData.semester}
                        onChange={handleChange}
                      />
                      <FormSelect
                        label="Shift"
                        name="shift"
                        value={mentorData.shift}
                        onChange={handleChange}
                        options={["Shift", "Morning", "Evening"]}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row items-center justify-center w-full gap-5">
                      <FormInput
                        label="First Name"
                        name="firstName"
                        value={studentData.firstName}
                        onChange={handleChange}
                      />
                      <FormInput
                        label="Last Name"
                        name="lastName"
                        value={studentData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <FormInput
                      label="Email"
                      name="email"
                      value={studentData.email}
                      onChange={handleChange}
                      type="email"
                    />
                    <FormInput
                      label="Password"
                      name="password"
                      value={studentData.password}
                      onChange={handleChange}
                      type="password"
                    />
                    <div className="flex flex-row items-center justify-center w-full gap-5">
                      <FormInput
                        label="Date of Birth"
                        name="dob"
                        value={studentData.dob}
                        onChange={handleChange}
                        type="date"
                      />
                      <FormSelect
                        label="Gender"
                        name="gender"
                        value={studentData.gender}
                        onChange={handleChange}
                        options={["Gender", "Male", "Female", "Other"]}
                      />
                    </div>
                    <FormInput
                      label="Phone Number"
                      name="phoneNumber"
                      value={studentData.phoneNumber}
                      onChange={handleChange}
                      type="tel"
                    />

                    <div className="flex flex-row items-center justify-center w-full gap-5">
                      <FormInput
                        label="Program"
                        name="program"
                        value={studentData.program}
                        onChange={handleChange}
                      />
                      <FormInput
                        label="Semester"
                        name="semester"
                        type="number"
                        value={studentData.semester}
                        onChange={handleChange}
                      />
                      <FormSelect
                        label="Shift"
                        name="shift"
                        value={studentData.shift}
                        onChange={handleChange}
                        options={["Shift", "Morning", "Evening"]}
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-2 pb-5">
                  <button
                    type="submit"
                    className="w-full rounded-[8px] cursor-pointer self-center bg-[#56c361] text-white py-2 font-Eczar font-medium text-[20px]"
                  >
                    Register as {isMentor ? "Mentor" : "Student"}
                  </button>
                  <p className="mt-4 self-center font-Eczar">
                    Already have an Account?{" "}
                    <span
                      onClick={() => navigate("/login")}
                      className="text-[#5884e9] cursor-pointer"
                    >
                      Login
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

const FormInput = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <>
      <input
        className="w-full p-3 rounded-[15px] border-[1px] border-b-[3px] h-[40px] border-[#66C871] placeholder:font-Eczar font-Eczar placeholder:text-[#9d9d9d] bg-[#66c8712b]"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
    </>
  );
};

const FormSelect = ({ label, name, value, onChange, options }) => {
  return (
    <>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="p-[10px] rounded-[15px] border h-[40px] border-b-[3px] border-[#66C871] w-full placeholder:font-Eczar font-Eczar placeholder:text-[#9d9d9d] bg-[#56c36129] appearance-none pr-10"
      >
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
