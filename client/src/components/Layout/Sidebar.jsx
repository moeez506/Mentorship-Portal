import React from "react";
import { FaCheckCircle, FaUsers } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { MdImportContacts, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context";

const Sidebar = ({ active }) => {
  const { logout } = useAuth();

  const isMentorLogin = localStorage.getItem("mentorLogin");
  const isStudentLogin = localStorage.getItem("studentLogin");

  const handleLogout = () => {
    logout();
    toast.success("Logged Out Successfully!", {
      position: "bottom-center",
    });
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 w-[20vw] flex flex-col bg-gray-100 py-4 border-r border-gray-300 rounded-lg">
      <div className="flex flex-col flex-shrink-0 items-center gap-2.5 self-stretch pl-4 pr-4 p-0">
        <Link
          to="/dashboard"
          className={`content flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-20 rounded-2xl ${
            active === 0
              ? "bg-green-500 hover:bg-green-500"
              : "bg-gray-200 hover:bg-gray-200"
          }`}
        >
          <div className="icontext flex flex-wrap items-center content-center rounded-lg">
            <div className="flex justify-center items-center rounded-lg">
              <HiUserGroup size={24} />
            </div>
            <div className="text flex flex-col justify-center items-start rounded-lg text-black ml-4">
              Dashboard
            </div>
          </div>
        </Link>
        {isMentorLogin && (
          <Link
            to="/requests"
            className={`content-1 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-20 rounded-2xl ${
              active === 1
                ? "bg-green-500 hover:bg-green-500"
                : "bg-gray-200 hover:bg-gray-200"
            }`}
          >
            <div className="icontext-1 flex flex-wrap items-center content-center rounded-lg">
              <div className="flex justify-center items-center rounded-lg">
                <FaCheckCircle size={24} />
              </div>
              <div className="text-2 flex flex-col justify-center items-start rounded-lg text-black ml-4">
                Requests
              </div>
            </div>
          </Link>
        )}
        {isMentorLogin && (
          <Link
            to="/unassigned-students"
            className={`content-2 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-20 rounded-2xl ${
              active === 2
                ? "bg-green-500 hover:bg-green-500"
                : "bg-gray-200 hover:bg-gray-200"
            }`}
          >
            <div className="icontext-2 flex flex-wrap items-center content-center rounded-lg">
              <div className="flex justify-center items-center rounded-lg">
                <FaUsers size={24} />
              </div>
              <div className="flex flex-col justify-center items-start rounded-lg text-black ml-4">
                Unassigned Students
              </div>
            </div>
          </Link>
        )}
        {isStudentLogin && (
          <Link
            to="/mentors"
            className={`content-3 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-20 rounded-2xl ${
              active === 2
                ? "bg-green-500 hover:bg-green-500"
                : "bg-gray-200 hover:bg-gray-200"
            }`}
          >
            <div className="icontext-3 flex flex-wrap items-center content-center rounded-lg">
              <div className="flex justify-center items-center rounded-lg">
                <FaUsers size={24} />
              </div>
              <div className="text-6 flex flex-col justify-center items-start rounded-lg text-black ml-4">
                Mentors
              </div>
            </div>
          </Link>
        )}
        <Link
          to="/roadmaps"
          className={`content-4 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-20 rounded-2xl ${
            active === 3
              ? "bg-green-500 hover:bg-green-500"
              : "bg-gray-200 hover:bg-gray-200"
          }`}
        >
          <div className="icontext-4 flex flex-wrap items-center content-center rounded-lg">
            <div className="flex justify-center items-center rounded-lg">
              <FaUsers size={24} />
            </div>
            <div className="text-8 flex flex-col justify-center items-start rounded-lg text-black ml-4">
              Roadmaps
            </div>
          </div>
        </Link>
        <Link
          to="/messaging"
          className={`content-5 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-20 rounded-2xl ${
            active === 5
              ? "bg-green-500 hover:bg-green-500"
              : "bg-gray-200 hover:bg-gray-200"
          }`}
        >
          <div className="icontext-5 flex flex-wrap items-center content-center rounded-lg">
            <div className="flex justify-center items-center rounded-lg">
              <MdImportContacts size={24} />
            </div>
            <div className="text-10 flex flex-col justify-center items-start rounded-lg text-black ml-4">
              Messaging
            </div>
          </div>
        </Link>
        <Link
          to="/"
          className={`content-6 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-20 rounded-2xl bg-gray-200 ${
            active === 6
              ? "bg-green-500 hover:bg-green-500"
              : "hover:bg-gray-200"
          }`}
          onClick={handleLogout}
        >
          <div className="icontext-6 flex flex-wrap items-center content-center rounded-lg">
            <div className="flex justify-bottom items-center rounded-lg">
              <MdLogout size={24} />
            </div>
            <div className="text-12 flex flex-col justify-center items-start rounded-lg text-black ml-4">
              Logout
            </div>
          </div>
        </Link>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Sidebar;
