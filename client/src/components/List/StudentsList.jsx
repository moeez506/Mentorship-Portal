import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDoneAll } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
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
    <div className="w-full flex flex-row bg-[#161616]">
      <Sidebar active={2} />
      <div
        className={`bg-[#161616] min-h-full w-full font-Poppins flex items-start flex-col px-10 pt-5`}
      >
        <h3 className="text-white text-2xl font-Poppins">Students</h3>
        <div className="w-full flex justify-center pt-2">
          <div className="w-[97%]">
            <div className="flex flex-wrap gap-9">
              {studentData.map(
                (student, index) =>
                  !addedStudents.includes(student) && (
                    <div
                      className="w-[350px] min-h-[380px] border-gray-700 border-[3px] shadow-[#0000006c] shadow-md rounded-[35px] flex flex-col items-center justify-between bg-[#2e2e2e] text-white py-10 px-8"
                      key={index}
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                          alt="Mentor"
                          className="w-40 h-40 rounded-full mx-auto mb-4"
                        />
                        <h1 className="text-2xl font-medium mb-1">
                          {student.studentFirstName} {student.studentLastName}
                        </h1>
                        <p className="text-sm">Email: {student.studentEmail}</p>
                      </div>
                      <div className="flex justify-center space-x-5 mt-5">
                        {isStudentAssigned(student.studentEmail) ? (
                          <MdDoneAll
                            size={18}
                            title="Mentor Already Assigned"
                          />
                        ) : (
                          <button
                            className="bg-[#fefefe] p-2 h-9 min-w-[80px] text-black rounded-md duration-300 hover:bg-red-800 hover:text-white flex items-center justify-center"
                            onClick={() => addToMentor(student)}
                          >
                            <IoMdPersonAdd size={18} />
                          </button>
                        )}
                        <button
                          className="bg-[#fefefe] p-2 h-9 min-w-[80px] text-black rounded-md duration-300 hover:bg-red-800 hover:text-white flex items-center justify-center"
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
          <div className="fixed top-0 left-0 w-full h-full bg-[#161616] bg-opacity-90 flex justify-center items-center z-50">
            <div className="bg-[#fff3] text-white p-8 rounded-lg flex flex-col items-center">
              <h2 className="text-3xl font-bold mb-4">
                {selectedStudent.studentFirstName}{" "}
                {selectedStudent.studentLastName}
              </h2>
              <div>
                <p className="text-lg">
                  <b>Email:</b> {selectedStudent.studentEmail}
                </p>
                <p className="text-lg">
                  <b>Date of Birth:</b> {selectedStudent.studentDob}
                </p>
                <p className="text-lg">
                  <b>Gender:</b> {selectedStudent.studentGender}
                </p>
                <p className="text-lg">
                  <b>Phone Number:</b> {selectedStudent.studentPhoneNumber}
                </p>
                <p className="text-lg">
                  <b>Program:</b> {selectedStudent.studentProgram}
                </p>
                <p className="text-lg">
                  <b>Semester:</b> {selectedStudent.studentSemester}
                </p>
                <p className="text-lg">
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
    </div>
  );
};

export default StudentsList;
