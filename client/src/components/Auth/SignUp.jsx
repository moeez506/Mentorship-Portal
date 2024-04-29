import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../../styles/theme";

const SignUp = () => {
  const navigate = useNavigate();
  const [isMentor, setIsMentor] = useState(true);

  const [mentorData, setMentorData] = useState({
    mentorFirstName: "",
    mentorLastName: "",
    mentorExperience: "",
    mentorCompany: "",
    mentorDob: "",
    mentorGender: "",
    mentorEmail: "",
    mentorPassword: "",
    mentorSemester: "",
    mentorPhoneNumber: "",
    mentorShift: "",
    mentorProgram: "",
  });

  const [studentData, setStudentData] = useState({
    studentFirstName: "",
    studentLastName: "",
    studentDob: "",
    studentGender: "",
    studentEmail: "",
    studentPassword: "",
    studentPhoneNumber: "",
    studentSemester: "",
    studentShift: "",
    studentProgram: "",
  });

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

  const handleSubmit = (e) => {
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

    // Retrieve existing data from localStorage
    const existingData = JSON.parse(
      localStorage.getItem(isMentor ? "mentorData" : "studentData") || "[]"
    );

    // Append new data to existing data array
    const updatedData = [...existingData, formData];

    // Save updated data array back to localStorage
    localStorage.setItem(
      isMentor ? "mentorData" : "studentData",
      JSON.stringify(updatedData)
    );

    // Reset form data
    if (isMentor) {
      setMentorData({
        mentorFirstName: "",
        mentorLastName: "",
        mentorExperience: "",
        mentorCompany: "",
        mentorDob: "",
        mentorGender: "",
        mentorEmail: "",
        mentorPassword: "",
        mentorSemester: "",
        mentorPhoneNumber: "",
        mentorShift: "",
        mentorProgram: "",
      });
    } else {
      setStudentData({
        studentFirstName: "",
        studentLastName: "",
        studentDob: "",
        studentGender: "",
        studentEmail: "",
        studentPassword: "",
        studentPhoneNumber: "",
        studentSemester: "",
        studentShift: "",
        studentProgram: "",
      });
    }

    toast.success("Signup Successful!", {
      onClose: () => {
        navigate("/login");
      },
    });
  };

  return (
    <>
      <div
        className={`bg-[#161616] fixed top-8 left-0 w-full h-full flex justify-center items-center font-Poppins`}
      >
        <div className="h-[90%] w-[30%] p-10 rounded-lg flex flex-col bg-[#2e2e2e]">
          <div className="flex mb-5 items-center justify-center">
            <h2
              className={`mr-5 cursor-pointer ${
                isMentor ? `text-[#000000]` : `text-[#fefefe]`
              }`}
              onClick={() => setIsMentor(true)}
            >
              Mentor
            </h2>
            <h2
              className={`cursor-pointer ${
                !isMentor ? `text-${theme.buttons} pb-1` : `text-[#fefefe]`
              } transition-colors transition-padding`}
              onClick={() => setIsMentor(false)}
            >
              Student
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col overflow-y-auto no-scrollbar"
          >
            {isMentor ? (
              // Mentor Form
              <>
                <FormInput
                  label="First Name"
                  name="mentorFirstName"
                  value={mentorData.mentorFirstName}
                  onChange={handleChange}
                />
                <FormInput
                  label="Last Name"
                  name="mentorLastName"
                  value={mentorData.mentorLastName}
                  onChange={handleChange}
                />
                <FormInput
                  label="Experience (years)"
                  name="mentorExperience"
                  value={mentorData.mentorExperience}
                  onChange={handleChange}
                />
                <FormInput
                  label="Company"
                  name="mentorCompany"
                  value={mentorData.mentorCompany}
                  onChange={handleChange}
                />
                <FormInput
                  label="Date of Birth"
                  name="mentorDob"
                  value={mentorData.mentorDob}
                  onChange={handleChange}
                  type="date"
                />
                <FormSelect
                  label="Gender"
                  name="mentorGender"
                  value={mentorData.mentorGender}
                  onChange={handleChange}
                  options={["Select", "Male", "Female", "Other"]}
                />
                <FormInput
                  label="Email"
                  name="mentorEmail"
                  value={mentorData.mentorEmail}
                  onChange={handleChange}
                  type="email"
                />
                <FormInput
                  label="Password"
                  name="mentorPassword"
                  value={mentorData.mentorPassword}
                  onChange={handleChange}
                  type="password"
                />
                <FormInput
                  label="Semester"
                  name="mentorSemester"
                  value={mentorData.mentorSemester}
                  onChange={handleChange}
                />
                <FormInput
                  label="Phone Number"
                  name="mentorPhoneNumber"
                  value={mentorData.mentorPhoneNumber}
                  onChange={handleChange}
                  type="tel"
                />
                <FormSelect
                  label="Shift"
                  name="mentorShift"
                  value={mentorData.mentorShift}
                  onChange={handleChange}
                  options={["Shift", "Morning", "Evening"]}
                />
                <FormInput
                  label="Program"
                  name="mentorProgram"
                  value={mentorData.mentorProgram}
                  onChange={handleChange}
                />
              </>
            ) : (
              // Student Form
              <>
                <FormInput
                  label="First Name"
                  name="studentFirstName"
                  value={studentData.studentFirstName}
                  onChange={handleChange}
                />
                <FormInput
                  label="Last Name"
                  name="studentLastName"
                  value={studentData.studentLastName}
                  onChange={handleChange}
                />
                <FormInput
                  label="Date of Birth"
                  name="studentDob"
                  value={studentData.studentDob}
                  onChange={handleChange}
                  type="date"
                />
                <FormSelect
                  label="Gender"
                  name="studentGender"
                  value={studentData.studentGender}
                  onChange={handleChange}
                  options={["Select", "Male", "Female", "Other"]}
                />
                <FormInput
                  label="Email"
                  name="studentEmail"
                  value={studentData.studentEmail}
                  onChange={handleChange}
                  type="email"
                />
                <FormInput
                  label="Password"
                  name="studentPassword"
                  value={studentData.studentPassword}
                  onChange={handleChange}
                  type="password"
                />
                <FormInput
                  label="Phone Number"
                  name="studentPhoneNumber"
                  value={studentData.studentPhoneNumber}
                  onChange={handleChange}
                  type="tel"
                />
                <FormInput
                  label="Semester"
                  name="studentSemester"
                  value={studentData.studentSemester}
                  onChange={handleChange}
                />
                <FormSelect
                  label="Shift"
                  name="studentShift"
                  value={studentData.studentShift}
                  onChange={handleChange}
                  options={["Shift", "Morning", "Evening"]}
                />
                <FormInput
                  label="Program"
                  name="studentProgram"
                  value={studentData.studentProgram}
                  onChange={handleChange}
                />
              </>
            )}

            <button
              type="submit"
              className={`bg-[#fefefe] w-full text-${theme.buttons} p-2 mt-4 rounded cursor-pointer`}
            >
              Sign Up
            </button>
            <div className="mt-4 flex flex-col items-center">
              <p className={`mb-2 text-[#fefefe]`}>
                Already have an Account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-[whitesmoke] cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default SignUp;

const FormInput = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div className="mb-5 flex justify-between">
      <label className={`text-[#fefefe] min-w-[45%]`} htmlFor={name}>
        {label}:
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`p-2 rounded border border-[#000000] min-w-[50%] w-[100%]`}
      />
    </div>
  );
};

const FormSelect = ({ label, name, value, onChange, options }) => {
  return (
    <div className="mb-5 flex justify-between">
      <label className={`text-[#fefefe] min-w-[45%]`} htmlFor={name}>
        {label}:
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`p-3 rounded border border-[#000000] min-w-[50%] w-[100%]`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
