import React, { useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar";

function UserProfile() {
  const [user, setUser] = useState({});
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    const loggedInUser =
      localStorage.getItem("mentorLogin") ||
      localStorage.getItem("studentLogin");
    if (loggedInUser) {
      const email = loggedInUser.trim();
      const mentorData = JSON.parse(localStorage.getItem("mentorData")) || [];
      const studentData = JSON.parse(localStorage.getItem("studentData")) || [];

      const mentorUserData = mentorData.find(
        (mentor) => mentor.mentorEmail === email
      );

      const studentUserData = studentData.find(
        (student) => student.studentEmail === email
      );

      if (mentorUserData) {
        setUser(mentorUserData);
        setIsMentor(true);
      } else if (studentUserData) {
        setUser(studentUserData);
        setIsMentor(false);
      }
    }
  }, []);

  return (
    <>
      <Sidebar />
      <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[15vh]">
        <div className="container w-[80%] mx-auto">
          <h2 className="font-Eczar font-medium text-4xl">Profile</h2>
          <br />
          <br />
          <div className="max-w-6xl w-full bg-[#E9F5FE] p-12 rounded-xl shadow-lg mt-[8vh]">
            <div className="flex">
              <div className="w-1/3 flex flex-col items-center mt-10">
                <img
                  src={
                    user.profilePic ||
                    "https://thumbs.dreamstime.com/b/user-profile-avatar-icon-134114292.jpg"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-6"
                />
                <div className="text-center">
                  <div className="flex flex-row justify-center">
                    <p className="mb-2 mr-2 font-semibold text-blue-600 text-2xl font-Eczar">
                      {isMentor ? user.mentorFirstName : user.studentFirstName}
                    </p>
                    <p className="mb-2 font-semibold text-blue-600 text-2xl font-Eczar">
                      {isMentor ? user.mentorLastName : user.studentLastName}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <p className="mr-2 font-semibold text-blue-600 text-xl font-Eczar">
                      Email:{" "}
                    </p>
                    <p className="mb-2 text-xl font-Eczar">
                      {isMentor ? user.mentorEmail : user.studentEmail}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-2/3 grid grid-cols-2 gap-6 text-gray-700 text-xl font-Eczar">
                <div>
                  <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                    Date of Birth
                  </p>
                  <p className="mb-2 text-xl font-Eczar">
                    {isMentor ? user.mentorDob : user.studentDob}
                  </p>
                  <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                    Gender
                  </p>
                  <p className="mb-2 text-xl font-Eczar">
                    {isMentor ? user.mentorGender : user.studentGender}
                  </p>
                  <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                    Experience
                  </p>
                  <p className="mb-2 text-xl font-Eczar">
                    {isMentor
                      ? user.mentorExperience
                      : user.studentExperience || "N/A"}
                  </p>
                  <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                    Phone Number
                  </p>
                  <p className="mb-2 text-xl font-Eczar">
                    {isMentor
                      ? user.mentorPhoneNumber
                      : user.studentPhoneNumber}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                    Company
                  </p>
                  <p className="mb-2 text-xl font-Eczar">
                    {isMentor
                      ? user.mentorCompany
                      : user.studentCompany || "N/A"}
                  </p>
                  <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                    Program
                  </p>
                  <p className="mb-2 text-xl font-Eczar">
                    {isMentor ? user.mentorProgram : user.studentProgram}
                  </p>
                  <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                    Semester
                  </p>
                  <p className="mb-2 text-xl font-Eczar">
                    {isMentor ? user.mentorSemester : user.studentSemester}
                  </p>
                  <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                    Shift
                  </p>
                  <p className="mb-2 text-xl font-Eczar">
                    {isMentor ? user.mentorShift : user.studentShift}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
