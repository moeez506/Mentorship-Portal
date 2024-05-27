import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";

function UserProfile() {
  const [user, setUser] = useState({});

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
      } else if (studentUserData) {
        setUser(studentUserData);
      }
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const loggedInUser =
      localStorage.getItem("mentorLogin") ||
      localStorage.getItem("studentLogin");
    if (loggedInUser) {
      const email = loggedInUser.trim();
      const mentorData = JSON.parse(localStorage.getItem("mentorData")) || [];
      const studentData = JSON.parse(localStorage.getItem("studentData")) || [];

      let updatedUserData;
      if (user.mentorEmail) {
        updatedUserData = mentorData.map((mentor) =>
          mentor.mentorEmail === email ? { ...user } : mentor
        );
        localStorage.setItem("mentorData", JSON.stringify(updatedUserData));
      } else if (user.studentEmail) {
        updatedUserData = studentData.map((student) =>
          student.studentEmail === email ? { ...user } : student
        );
        localStorage.setItem("studentData", JSON.stringify(updatedUserData));
      }

      const updatedUser = updatedUserData.find(
        (userData) =>
          userData.mentorEmail === email || userData.studentEmail === email
      );
      setUser(updatedUser);

      toast.success("Profile Updated Successfully", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#e0f7fa] flex">
      <Sidebar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg mt-[10vh] ml-[15vw]">
          <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">
            Profile
          </h1>
          <div className="flex justify-center mb-6">
            <img
              src={
                user.profilePic ||
                "https://thumbs.dreamstime.com/b/user-profile-avatar-icon-134114292.jpg"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-gray-700">First Name:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="firstName"
                value={user.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Last Name:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="lastName"
                value={user.lastName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Phone Number:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="phoneNumber"
                value={user.phoneNumber || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Experience:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="experience"
                value={user.experience || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Date of Birth:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="dateOfBirth"
                value={user.dateOfBirth || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Company:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="company"
                value={user.company || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Gender:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="gender"
                value={user.gender || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Program:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="program"
                value={user.program || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Email:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Semester:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="semester"
                value={user.semester || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Shift:</label>
              <input
                type="text"
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-black"
                name="shift"
                value={user.shift || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserProfile;
