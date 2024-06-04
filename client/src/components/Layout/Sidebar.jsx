import React, { useContext } from "react";
import { FaUsers } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { PiChartPieSliceFill, PiShoppingBagOpenDuotone } from "react-icons/pi";
import { RiFolder6Line } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/Struggle.png";
import { AuthContext } from "../../context";

const Sidebar = ({ active }) => {
  const isMentorLogin = localStorage.getItem("mentorLogin");
  const isStudentLogin = localStorage.getItem("studentLogin");

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 w-[20vw] flex flex-col bg-[#F2F9FF] py-4 border-r border-gray-300 rounded-lg font-Eczar text-[18px]">
      <Link to="/">
        <div className="mb-[28px] mx-[8px] h-[86px] flex justify-center items-start">
          <img src={logo} alt="" width="210px" />
        </div>
      </Link>
      <div className="flex flex-col flex-shrink-0 items-center gap-2.5 self-stretch pl-4 pr-4 p-0">
        <Link
          to="/dashboard"
          className={`w-full px-5 h-[66px] rounded-2xl ${
            active === 0 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
          }`}
        >
          <div className="flex flex-row items-center content-center rounded-lg w-full h-full">
            <div>
              <PiChartPieSliceFill size={24} />
            </div>
            <div className="flex flex-col justify-center items-start rounded-lg ml-4 hover:translate-x-2 hover:justify-center duration-200 w-full h-full">
              Dashboard
            </div>
          </div>
        </Link>

        {isMentorLogin && (
          <Link
            to="/requests"
            className={`w-full px-5 h-[66px] rounded-2xl ${
              active === 1 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
            }`}
          >
            <div className="flex flex-row items-center content-center rounded-lg w-full h-full">
              <div>
                <PiShoppingBagOpenDuotone size={24} />
              </div>
              <div className="flex flex-col justify-center items-start rounded-lg ml-4 hover:translate-x-2 hover:justify-center duration-200 w-full h-full">
                Requests
              </div>
            </div>
          </Link>
        )}
        {isMentorLogin && (
          <Link
            to="/unassigned-students"
            className={`content-2 w-full px-5 h-[66px] rounded-2xl ${
              active === 2 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
            }`}
          >
            <div className="flex flex-row items-center content-center rounded-lg w-full h-full">
              <div>
                <RiFolder6Line size={24} />
              </div>
              <div className="flex flex-col justify-center items-start rounded-lg ml-4 hover:translate-x-2 hover:justify-center duration-200 w-full h-full">
                Unassigned Students
              </div>
            </div>
          </Link>
        )}
        {isStudentLogin && (
          <Link
            to="/mentors"
            className={`content-3 w-full px-5 h-[66px] rounded-2xl ${
              active === 2 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
            }`}
          >
            <div className="flex flex-row items-center content-center rounded-lg w-full h-full">
              <div>
                <FaUsers size={24} />
              </div>
              <div className="flex flex-col justify-center items-start rounded-lg ml-4 hover:translate-x-2 hover:justify-center duration-200 w-full h-full">
                Mentors
              </div>
            </div>
          </Link>
        )}
        <Link
          to="/roadmaps"
          className={`content-4 w-full px-5 h-[66px] rounded-2xl ${
            active === 3 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
          }`}
        >
          <div className="flex flex-row items-center content-center rounded-lg w-full h-full">
            <div>
              <IoBookOutline size={24} />
            </div>
            <div className="flex flex-col justify-center items-start rounded-lg ml-4 hover:translate-x-2 hover:justify-center duration-200 w-full h-full">
              Roadmaps
            </div>
          </div>
        </Link>
        <Link
          to="/messaging"
          className={`content-5 w-full px-5 h-[66px] rounded-2xl ${
            active === 5 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
          }`}
        >
          <div className="flex flex-row items-center content-center rounded-lg w-full h-full">
            <div>
              <TiMessages size={24} />
            </div>
            <div className="flex flex-col justify-center items-start rounded-lg ml-4 hover:translate-x-2 hover:justify-center duration-200 w-full h-full">
              Messages
            </div>
          </div>
        </Link>
        <Link
          to="/notifications"
          className={`content-5 w-full px-5 h-[66px] rounded-2xl ${
            active === 6 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
          }`}
        >
          <div className="flex flex-row items-center content-center rounded-lg w-full h-full">
            <div>
              <TiMessages size={24} />
            </div>
            <div className="flex flex-col justify-center items-start rounded-lg ml-4 hover:translate-x-2 hover:justify-center duration-200 w-full h-full">
              Notifications
            </div>
          </div>
        </Link>
        <div
          className={`w-full px-5 h-[66px] rounded-2xl`}
          onClick={handleLogout}
        >
          <div className="flex flex-row items-center content-center rounded-lg w-full h-full">
            <div>
              <MdLogout size={24} />
            </div>
            <div className="flex flex-col justify-center items-start rounded-lg ml-4 hover:translate-x-2 hover:justify-center duration-200 w-full h-full">
              Logout
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Sidebar;
