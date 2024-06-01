import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png"; // Import the logo image

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

      const id = Math.random().toString(36).substr(2, 9);

      const updatedFormData = { ...formData, id };

      if (isMentor) {
        updatedFormData.mentees = [];
      }

      const updatedData = [...existingData, updatedFormData];

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
            <div className="flex flex-row w-full gap-2 p-3 mb-2 bg-[#e1f4ff] rounded-[8px]">
                <button
                  className={`w-full cursor-pointer p-[6px] text-[16px] font-medium rounded-[12px] font-Eczar flex justify-around ${
                    isMentor ? `bg-[#56c361] text-[#ffff] shadow-md shadow-[#00000037]` : `text-[#1c1c1c] bg-[#f3fbff]`
                  }`}
                  onClick={() => setIsMentor(true)}
                >
                  Mentor
                </button>
                <button
                  className={`w-full cursor-pointer p-[6px] text-[16px] font-medium rounded-[12px] font-Eczar flex justify-around ${
                    !isMentor ? `bg-[#56c361] text-[#ffff] shadow-md shadow-[#00000037]` : `text-[#1c1c1c] bg-[#f3fbff]`
                  }`}
                  onClick={() => setIsMentor(false)}
                >
                  Student
                </button>
            </div>
            <div className="flex flex-col items-start w-[80%] h-[80vh]">
              <h2 className=" text-3xl font-medium font-Eczar mb-8">
                {/* Register as {isMentor ? "Mentor" : "Student"} */}
                Sign-up
              </h2>
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
                    <FormInput
                      label="Email"
                      name="mentorEmail"
                      value={mentorData.mentorEmail}
                      onChange={handleChange}
                      type="email"
                    />
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
                      label="Password"
                      name="mentorPassword"
                      value={mentorData.mentorPassword}
                      onChange={handleChange}
                      type="password"
                    />
                    <FormInput
                      label="Phone Number"
                      name="mentorPhoneNumber"
                      value={mentorData.mentorPhoneNumber}
                      onChange={handleChange}
                      type="tel"
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
                        label="Program"
                        name="mentorProgram"
                        value={mentorData.mentorProgram}
                        onChange={handleChange}
                      />
                    <div className="flex flex-row items-center justify-center w-full gap-5">
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
                    // className={`bg-[#40485a] w-full text-[#ffff] p-2 rounded cursor-pointer`}
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
        // className={`w-full px-5 py-3 rounded-lg no-scrollbar font-medium border-2 border-transparent placeholder-gray-400 text-sm focus:outline-none  focus:border-2  focus:outline bg-[#302E30] text-white focus:border-white`}
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
        // className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-400 text-sm focus:outline-none  focus:border-2  focus:outline bg-[#302E30] text-white focus:border-white`}
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
