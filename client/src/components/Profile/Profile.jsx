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

      let mentorUserData = null;
      mentorData.forEach((mentor) => {
        if (mentor.mentorEmail === email) {
          mentorUserData = mentor;
        }
      });

      let studentUserData = null;
      studentData.forEach((student) => {
        if (student.studentEmail === email) {
          studentUserData = student;
        }
      });

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
    <div className="flex flex-row h-full bg-[#161616]">
      <Sidebar />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full bg-[#2e2e2e] p-8 rounded-lg">
          <div className="mb-8 flex justify-center">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.keys(user).map(
              (key) =>
                key !== "profilePic" && (
                  <div key={key} className="mb-4">
                    <label className="block mb-2 text-white">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#d3d3d3] rounded-md px-1 py-2 text-black"
                      name={key}
                      value={user[key]}
                      onChange={handleChange}
                    />
                  </div>
                )
            )}
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
