import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    try {
      const existingData = JSON.parse(
        localStorage.getItem(isMentor ? "mentorData" : "studentData") || "[]"
      );

      const updatedData = [...existingData, formData];

      localStorage.setItem(
        isMentor ? "mentorData" : "studentData",
        JSON.stringify(updatedData)
      );

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

        toast.success("Mentor Registration Successful!");
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

        toast.success("Student Registration Successful!");
      }
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-center" />
      <div
        className={`bg-[#1b1b1d] fixed left-0 w-full h-full font-Poppins flex items-center justify-center`}
      >
        <div className="bg-[#24262a] w-[50%] h-[90vh] rounded-md border-[#636363] border-[1px] shadow-sm shadow-[#202427]">
          <div className="w-full h-full mx-auto mb-8 flex flex-col items-center gap-5">
            <div className="flex flex-row justify-center bg-[#2a2a30] w-full border-b-2 border-[#fff]">
              <div className="cursor-pointer w-[50%]">
                <h2
                  className={`cursor-pointer p-3 flex justify-around ${
                    isMentor ? `bg-[#ffff] text-[#161616]` : `text-[#fefefe]`
                  }`}
                  onClick={() => setIsMentor(true)}
                >
                  Mentor
                </h2>
              </div>
              <div className="cursor-pointer w-[50%]">
                <h2
                  className={`cursor-pointer p-3 flex justify-around ${
                    !isMentor ? `bg-[#ffff] text-[#161616]` : `text-[#fefefe]`
                  }`}
                  onClick={() => setIsMentor(false)}
                >
                  Student
                </h2>
              </div>
            </div>
            <h1 className=" text-3xl font-Roboto text-[#f9faff] mb-2">
              Register as {isMentor ? "Mentor" : "Student"}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col overflow-y-auto no-scrollbar gap-8 w-[88%]"
            >
              {isMentor ? (
                <>
                  <div className="flex flex-row items-center justify-center w-full gap-5">
                    <FormInput
                      label="First Name"
                      name="mentorFirstName"
                      value={mentorData.mentorFirstName}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Last Name"
                      name={isMentor ? "mentorLastName" : "studentLastName"}
                      value={
                        isMentor
                          ? mentorData.mentorLastName
                          : studentData.studentLastName
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between w-full gap-5">
                    <FormInput
                      label="Company"
                      name="mentorCompany"
                      value={mentorData.mentorCompany}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Experience (years)"
                      type="number"
                      name="mentorExperience"
                      value={mentorData.mentorExperience}
                      onChange={handleChange}
                    />
                  </div>
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
                  <div className="flex flex-row items-center justify-center w-full gap-5">
                    <FormInput
                      label="Date of Birth"
                      name="mentorDob"
                      value={mentorData.mentorDob}
                      onChange={handleChange}
                      type="date"
                    />
                    <FormSelect
                      label="Gender"
                      name={isMentor ? "mentorGender" : "studentGender"}
                      value={
                        isMentor
                          ? mentorData.mentorGender
                          : studentData.studentGender
                      }
                      onChange={handleChange}
                      options={["Select", "Male", "Female", "Other"]}
                    />
                  </div>
                  <FormInput
                    label="Phone Number"
                    name="mentorPhoneNumber"
                    value={mentorData.mentorPhoneNumber}
                    onChange={handleChange}
                    type="tel"
                  />
                  <div className="flex flex-row items-center justify-center w-full gap-5">
                    <FormInput
                      label="Program"
                      name="mentorProgram"
                      value={mentorData.mentorProgram}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Semester"
                      name="mentorSemester"
                      value={mentorData.mentorSemester}
                      onChange={handleChange}
                    />
                    <FormSelect
                      label="Shift"
                      name="mentorShift"
                      value={mentorData.mentorShift}
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
                  </div>
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
                  <div className="flex flex-row items-center justify-center w-full gap-5">
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
                  </div>
                  <FormInput
                    label="Phone Number"
                    name="studentPhoneNumber"
                    value={studentData.studentPhoneNumber}
                    onChange={handleChange}
                    type="tel"
                  />

                  <div className="flex flex-row items-center justify-center w-full gap-5">
                    <FormInput
                      label="Program"
                      name="studentProgram"
                      value={studentData.studentProgram}
                      onChange={handleChange}
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
                  </div>
                </>
              )}

              <div className="flex flex-col gap-2 pb-5">
                <button
                  type="submit"
                  className={`bg-[#40485a] w-full text-[#ffff] p-2 rounded cursor-pointer`}
                >
                  Register as {isMentor ? "Mentor" : "Student"}
                </button>
                <p className={`text-[#fefefe]`}>
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
    </>
  );
};

export default SignUp;

const FormInput = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <>
      <input
        className={`w-full px-5 py-3 rounded-lg no-scrollbar font-medium border-2 border-transparent placeholder-gray-400 text-sm focus:outline-none  focus:border-2  focus:outline bg-[#302E30] text-white focus:border-white`}
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
        className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-400 text-sm focus:outline-none  focus:border-2  focus:outline bg-[#302E30] text-white focus:border-white`}
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
