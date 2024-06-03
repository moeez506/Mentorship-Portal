/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdDoneAll } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile_pic from "../../assets/Profile Icon.png";
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
        </div>
      </div>
    </>
  );
};

export default StudentsList;
