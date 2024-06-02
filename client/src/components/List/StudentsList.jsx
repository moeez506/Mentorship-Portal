/* eslint-disable no-unused-vars */
import profile_pic from "../../assets/Profile Icon.png";
import React, { useState } from "react";
import { MdDoneAll } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";

const StudentsList = () => {
  const studentData = JSON.parse(localStorage.getItem("studentData")) || [];
  const mentorEmail = localStorage.getItem("mentorLogin");
  const mentorData = JSON.parse(localStorage.getItem("mentorData")) || [];

  const [addedStudents, setAddedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const isStudentAssigned = (studentEmail) => {
    return mentorData.some((mentor) =>
      mentor.mentees.some((mentee) => mentee.studentEmail === studentEmail)
    );
  };

  const addToMentor = (student) => {
    const mentorIndex = mentorData.findIndex(
      (mentor) => mentor.mentorEmail === mentorEmail
    );

    if (mentorIndex !== -1) {
      const existingMentee = mentorData[mentorIndex].mentees.find(
        (mentee) => mentee.studentEmail === student.studentEmail
      );

      if (existingMentee) {
        toast.error("Mentor Assigned Already!");
        return;
      }

      const newMentee = {
        id: student.id,
        studentEmail: student.studentEmail,
        studentFirstName: student.studentFirstName,
        studentLastName: student.studentLastName,
      };

      mentorData[mentorIndex].mentees.push(newMentee);

      localStorage.setItem("mentorData", JSON.stringify(mentorData));

      setAddedStudents([...addedStudents, student]);

      toast.success("Student Added to Mentees Successfully!");
    } else {
      console.log("Mentor Not Found.");
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  return (
    <>
      <Sidebar active={2} />
      <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[10vh]">
        <div className="container w-[80%] mx-auto">
          <br />
          <br />
          <h2 className="font-Eczar font-medium text-2xl">
            Unassigned Students
          </h2>
          <br />

          <div className="flex flex-wrap gap-5">
            {studentData.map(
              (student, index) =>
                !addedStudents.includes(student) && (
                  <div
                    key={index}
                    className="min-w-[202px] min-h-[244px] shadow-md shadow-[#00000040] rounded-[12px] flex flex-col items-center bg-[#29affd13] py-6 px-4"
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={profile_pic}
                        alt="Student"
                        className="w-[90px] h-[90px] rounded-full mx-auto mb-4"
                      />
                      <h1 className="text-[18px] font-Eczar font-medium mb-1">
                        {student.studentFirstName} {student.studentLastName}
                      </h1>
                      <p className="text-sm text-[#666666]">
                        {student.studentEmail}
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4 mt-5">
                      {isStudentAssigned(student.studentEmail) ? (
                        <MdDoneAll size={18} title="Mentor Already Assigned" />
                      ) : (
                        <button
                          className="bg-[#56C361] p-2 h-[30px] w-[60px] text-white text-[15px] rounded-[5px] flex items-center justify-center"
                          onClick={() => addToMentor(student)}
                        >
                          Add
                        </button>
                      )}
                      <button
                        className="bg-[#a81616cf] p-2 h-[30px] w-[60px] text-white text-[15px] rounded-[5px] flex items-center justify-center"
                        onClick={() => handleViewDetails(student)}
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
          {/* <div className="w-full flex flex-row min-h-screen">
      <Sidebar active={2} />
      <div
        className={`min-h-full w-full font-Poppins flex items-start flex-col px-10 pt-5`}
        style={{
          marginLeft: "20vw",
          marginTop: "10vh",
          backgroundColor: "#f0f4f8",
        }}
      >
        <h3 className="text-black text-2xl font-Poppins">Available Students</h3>
        <div className="w-full flex justify-center pt-2">
          <div className="w-[97%]">
            <div className="grid grid-cols-3 gap-6">
              {studentData.map(
                (student, index) =>
                  !addedStudents.includes(student) && (
                    <div
                      className="w-[300px] min-h-[350px] border-gray-300 border-[1px] shadow-sm rounded-[10px] flex flex-col items-center justify-between bg-white text-black py-6 px-4"
                      key={index}
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                          alt="Student"
                          className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h1 className="text-xl font-medium mb-1">
                          {student.studentFirstName} {student.studentLastName}
                        </h1>
                        <p className="text-sm text-gray-600">
                          Email: {student.studentEmail}
                        </p>
                      </div>
                      <div className="flex justify-center space-x-3 mt-5">
                        {isStudentAssigned(student.studentEmail) ? (
                          <MdDoneAll
                            size={18}
                            title="Mentor Already Assigned"
                          />
                        ) : (
                          <button
                            className="bg-green-500 p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-green-700 flex items-center justify-center"
                            onClick={() => addToMentor(student)}
                          >
                            <IoMdPersonAdd size={18} />
                          </button>
                        )}
                        <button
                          className="bg-blue-500 p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-blue-700 flex items-center justify-center"
                          onClick={() => handleViewDetails(student)}
                        >
                          <FiEye size={18} />
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        {showPopup && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-8 rounded-lg w-[90%] max-w-[600px] shadow-lg overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4">
                {selectedStudent.studentFirstName}{" "}
                {selectedStudent.studentLastName}
              </h2>
              <div className="text-lg space-y-2 text-left">
                <p>
                  <b>Email:</b> {selectedStudent.studentEmail}
                </p>
                <p>
                  <b>Date of Birth:</b> {selectedStudent.studentDob}
                </p>
                <p>
                  <b>Gender:</b> {selectedStudent.studentGender}
                </p>
                <p>
                  <b>Phone Number:</b> {selectedStudent.studentPhoneNumber}
                </p>
                <p>
                  <b>Program:</b> {selectedStudent.studentProgram}
                </p>
                <p>
                  <b>Semester:</b> {selectedStudent.studentSemester}
                </p>
                <p>
                  <b>Shift:</b> {selectedStudent.studentShift}
                </p>
              </div>
              <button
                className="mt-6 bg-red-500 text-white px-6 py-3 rounded-md"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <ToastContainer position="bottom-center" />
      </div>
    </div> */}
        </div>
      </div>
    </>
  );
};

export default StudentsList;
