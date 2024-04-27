import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { MdImportContacts, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isStudentLoggedIn, isMentorLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    if (!isStudentLoggedIn && !isMentorLoggedIn) {
      toast.info("No user is logged in", {
        position: "bottom-left",
      });
    } else {
      logout().then(() =>
        toast.success("Logged out successfully!", {
          position: "bottom-left",
        })
      );
    }
    toggleSidebar();
  };

  return (
    <>
      {isOpen && (
        <div className="bg-[#2e2e2e] text-[#fefefe] w-64 h-screen fixed top-20 left-0 overflow-x-hidden z-50 flex flex-col">
          <div className="p-5 flex flex-col gap-2">
            <Link
              to="/dashboard"
              className={`flex items-center ${
                window.location.pathname === "/dashboard" ? "bg-[#161616]" : ""
              } hover:bg-[#161616] rounded-full p-2 no-underline`}
            >
              <HiUserGroup className="mr-2" />
              Dashboard
            </Link>
            <Link
              to="/requests"
              className={`flex items-center ${
                window.location.pathname === "/requests" ? "bg-[#161616]" : ""
              } hover:bg-[#161616] rounded-full p-2 no-underline`}
            >
              <MdImportContacts className="mr-2" />
              Requests
            </Link>
            <Link
              to="/unassigned-students"
              className={`flex items-center ${
                window.location.pathname === "/unassigned-students"
                  ? "bg-[#161616]"
                  : ""
              } hover:bg-[#161616] rounded-full p-2 no-underline`}
            >
              <FaCheckCircle className="mr-2" />
              Unassigned Students
            </Link>
            <Link
              to="/roadmaps"
              className={`flex items-center ${
                window.location.pathname === "/roadmaps" ? "bg-[#161616]" : ""
              } hover:bg-[#161616] rounded-full p-2 no-underline`}
            >
              <FaUserGroup className="mr-2" />
              Roadmaps
            </Link>
            <Link
              to="/messaging"
              className={`flex items-center ${
                window.location.pathname === "/messaging" ? "bg-[#161616]" : ""
              } hover:bg-[#161616] rounded-full p-2 no-underline`}
            >
              <MdImportContacts className="mr-2" />
              Messaging
            </Link>
          </div>
          <div className="p-5 fixed bottom-5 w-64">
            <Link
              to="/"
              className={`flex items-center bg-[#161616] rounded-full p-2 no-underline`}
              onClick={handleLogout}
            >
              <MdLogout className="mr-2" />
              Logout
            </Link>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default Sidebar;
