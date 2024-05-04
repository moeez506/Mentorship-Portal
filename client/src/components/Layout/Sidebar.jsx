import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { MdImportContacts, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context";

const Sidebar = ({ active }) => {
  const { logout } = useAuth();
  console.log(active);

  const isMentorLogin = localStorage.getItem("mentorLogin");
  const isStudentLogin = localStorage.getItem("studentLogin");

  const handleLogout = () => {
    logout();
    toast.success("Logged Out Successfully!", {
      position: "bottom-center",
    });
  };

  return (
    <>
      <div className="w-[300px] h-[90vh] sticky overflow-x-hidden z-10 flex flex-col bg-[#161616] py-[1%]">
        <div className="fixed flex flex-col shadow-lg bg-[#2a2a2a] text-[#fefefe] h-[85%] justify-between rounded-tr-[8px] rounded-br-[8px]">
          <div className="p-5 flex flex-col gap-2">
            <Link
              to="/dashboard"
              className={`flex items-center ${
                active === 0 ? "bg-[#161616]" : ""
              } hover:bg-[#161616] rounded-full p-2 no-underline`}
            >
              <HiUserGroup className="mr-2" />
              Dashboard
            </Link>
            {isMentorLogin && (
              <Link
                to="/requests"
                className={`flex items-center ${
                  active === 1 ? "bg-[#161616]" : ""
                } hover:bg-[#161616] rounded-full p-2 no-underline`}
              >
                <MdImportContacts className="mr-2" />
                Requests
              </Link>
            )}
            {isMentorLogin && (
              <Link
                to="/unassigned-students"
                className={`flex items-center ${
                  active === 2 ? "bg-[#161616]" : ""
                } hover:bg-[#161616] rounded-full p-2 no-underline`}
              >
                <FaCheckCircle className="mr-2" />
                Unassigned Students
              </Link>
            )}
            {isStudentLogin && (
              <Link
                to="/mentors"
                className={`flex items-center ${
                  active === 2 ? "bg-[#161616]" : ""
                } hover:bg-[#161616] rounded-full p-2 no-underline`}
              >
                <FaUserGroup className="mr-2" />
                Mentors
              </Link>
            )}
            <Link
              to="/roadmaps"
              className={`flex items-center ${
                active === 3 ? "bg-[#161616]" : ""
              } hover:bg-[#161616] rounded-full p-2 no-underline`}
            >
              <FaUserGroup className="mr-2" />
              Roadmaps
            </Link>
            <Link
              to="/messaging"
              className={`flex items-center ${
                active === 4 ? "bg-[#161616]" : ""
              } hover:bg-[#161616] rounded-full p-2 no-underline`}
            >
              <MdImportContacts className="mr-2" />
              Messaging
            </Link>
          </div>
          <div className="p-5 bottom-6 w-64">
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
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default Sidebar;
