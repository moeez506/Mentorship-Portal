import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import profile_pic from "../../assets/Profile Icon.png";
import Sidebar from "../Layout/Sidebar";
import { server } from "../../apiEndPoint/apiEndPoint";
import { AuthContext } from "../../context";

const StudentsList = () => {
  const { user } = useContext(AuthContext);
  const [studentData, setStudentData] = useState([]);
  const [mentorData, setMentorData] = useState([]);

  useEffect(() => {
    if (user && user.role === "mentor") {
      setMentorData(user);
    }
    fetchStudents();
  }, [user]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${server}/mentor/all-students?unassigned=true`
      );
      setStudentData(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students");
    }
  };

  const addToMentor = async (studentId) => {
    try {
      await axios.post(`${server}/mentor/add-mentee`, {
        mentorId: mentorData._id,
        studentId,
      });
      setStudentData((prevData) =>
        prevData.filter((student) => student._id !== studentId)
      );
      toast.success("Student added to mentor successfully");
    } catch (error) {
      console.error("Error adding student to mentor:", error);
      toast.error(
        error.response.data.message || "Failed to add student to mentor"
      );
    }
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
            {studentData.map((student, index) => (
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
                    {student.firstName} {student.lastName}
                  </h1>
                  <p className="text-sm text-[#666666]">{student.email}</p>
                </div>
                <div className="flex justify-center space-x-4 mt-5">
                  <button
                    className="bg-[#56C361] p-2 h-[30px] w-[60px] text-white text-[15px] rounded-[5px] flex items-center justify-center"
                    onClick={() => addToMentor(student._id)}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsList;
