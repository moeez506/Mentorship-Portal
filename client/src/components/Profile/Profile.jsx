// eslint-disable-next-line no-unused-vars
import React from "react";
import { useAuth } from "../../context";

const Profile = () => {
  const { user, userType } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <h2>{userType === "student" ? "Student Profile" : "Mentor Profile"}</h2>
      <div>
        <p>
          First Name:{" "}
          {userType === "student"
            ? user.studentFirstName
            : user.mentorFirstName}
        </p>
        <p>
          Last Name:{" "}
          {userType === "student" ? user.studentLastName : user.mentorLastName}
        </p>
        <p>
          Date of Birth:{" "}
          {userType === "student" ? user.studentDob : user.mentorDob}
        </p>
        <p>
          Gender:{" "}
          {userType === "student" ? user.studentGender : user.mentorGender}
        </p>
        <p>
          Email: {userType === "student" ? user.studentEmail : user.mentorEmail}
        </p>
        <p>
          Password:{" "}
          {userType === "student" ? user.studentPassword : user.mentorPassword}
        </p>
        <p>
          Phone Number:{" "}
          {userType === "student"
            ? user.studentPhoneNumber
            : user.mentorPhoneNumber}
        </p>
        <p>
          Semester:{" "}
          {userType === "student" ? user.studentSemester : user.mentorSemester}
        </p>
        <p>
          Shift: {userType === "student" ? user.studentShift : user.mentorShift}
        </p>
        <p>
          Program:{" "}
          {userType === "student" ? user.studentProgram : user.mentorProgram}
        </p>
        {userType === "mentor" && (
          <>
            <p>Experience: {user.mentorExperience} years</p>
            <p>Company: {user.mentorCompany}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
