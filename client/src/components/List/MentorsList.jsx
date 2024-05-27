import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { MdDoneAll } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";

const MentorsList = () => {
  const mentorData = JSON.parse(localStorage.getItem("mentorData")) || [];
  const studentData = JSON.parse(localStorage.getItem("studentData")) || [];
  const requestData = JSON.parse(localStorage.getItem("requestData")) || [];
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const studentEmail = localStorage.getItem("studentLogin");

  const isMentee = mentorData.some(
    (m) =>
      m.mentees &&
      m.mentees.some((mentee) => mentee.studentEmail === studentEmail)
  );

  const canSendRequest = mentorData.every(
    (m) =>
      !m.mentees ||
      !m.mentees.some((mentee) => mentee.studentEmail === studentEmail)
  );

  const handleAddMentor = (mentor) => {
    if (!canSendRequest) {
      toast.error("You are Already a Mentee of One of the Mentors");
      return;
    }

    const existingRequest = requestData.find(
      (request) => request.studentEmail === studentEmail
    );

    if (existingRequest) {
      toast.error("Request Already Sent");
      return;
    }

    const student = studentData.find(
      (student) => student.studentEmail === studentEmail
    );

    if (!student) {
      toast.error("Student data not found");
      return;
    }

    const newRequest = {
      mentorId: mentor.id,
      mentorEmail: mentor.mentorEmail,
      studentId: student.id,
      studentEmail: student.studentEmail,
      studentFirstName: student.studentFirstName,
      studentLastName: student.studentLastName,
    };

    const updatedRequests = [...requestData, newRequest];
    localStorage.setItem("requestData", JSON.stringify(updatedRequests));
    toast.success("Request Sent!");
  };

  const handleViewDetails = (mentor) => {
    const mentorDetails = JSON.parse(localStorage.getItem("mentorData")) || [];
    const selectedMentorDetails = mentorDetails.find(
      (m) => m.mentorEmail === mentor.mentorEmail
    );
    setSelectedMentor(selectedMentorDetails);
    setShowPopup(true);
  };

  return (
    <div className="w-full flex flex-row bg-[#f0f4f8] min-h-screen">
      <Sidebar active={2} />
      <div
        className={`min-h-full w-full font-Poppins flex items-start flex-col px-10 pt-5`}
        style={{ marginLeft: "20vw", marginTop: "10vh" }}
      >
        <h3 className="text-black text-2xl font-Poppins">Available Mentors</h3>
        <div className="w-full flex justify-center pt-2">
          <div className="w-[97%]">
            <div className="grid grid-cols-3 gap-6">
              {mentorData.map((mentor, index) => (
                <div
                  className="w-[300px] min-h-[350px] border-gray-300 border-[1px] shadow-sm rounded-[10px] flex flex-col items-center justify-between bg-white text-black py-6 px-4"
                  key={index}
                >
                  <div className="flex flex-col items-center">
                    <img
                      src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                      alt="Mentor"
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h1 className="text-xl font-medium mb-1">
                      {mentor.mentorFirstName} {mentor.mentorLastName}
                    </h1>
                    <p className="text-sm text-gray-600">
                      Email: {mentor.mentorEmail}
                    </p>
                  </div>
                  <div className="flex justify-center space-x-3 mt-5">
                    <button
                      className="bg-green-500 p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-green-700 flex items-center justify-center"
                      onClick={() => handleAddMentor(mentor)}
                    >
                      {isMentee ? <MdDoneAll size={18} /> : "Send Request"}
                    </button>
                    <button
                      className="bg-blue-500 p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-blue-700 flex items-center justify-center"
                      onClick={() => handleViewDetails(mentor)}
                    >
                      <FiEye size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {showPopup && selectedMentor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-8 rounded-lg w-[90%] max-w-[600px] shadow-lg overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4">
                {selectedMentor.mentorFirstName} {selectedMentor.mentorLastName}
              </h2>
              <div className="text-lg space-y-2 text-left">
                <p>
                  <b>Experience:</b> {selectedMentor.mentorExperience} Years
                </p>
                <p>
                  <b>Company:</b> {selectedMentor.mentorCompany}
                </p>
                <p>
                  <b>Date of Birth:</b> {selectedMentor.mentorDob}
                </p>
                <p>
                  <b>Gender:</b> {selectedMentor.mentorGender}
                </p>
                <p>
                  <b>Email:</b> {selectedMentor.mentorEmail}
                </p>
                <p>
                  <b>Semester:</b> {selectedMentor.mentorSemester}
                </p>
                <p>
                  <b>Phone:</b> {selectedMentor.mentorPhoneNumber}
                </p>
                <p>
                  <b>Shift:</b> {selectedMentor.mentorShift}
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

export default MentorsList;
