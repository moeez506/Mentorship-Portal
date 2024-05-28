import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { PiChartPieSliceFill, PiShoppingBagOpenDuotone } from "react-icons/pi";
import { RiFolder6Line } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/Struggle.png";
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
    <div className="fixed top-0 bottom-0 left-0 w-[20vw] flex flex-col bg-[#F2F9FF] py-4 border-r border-gray-300 rounded-lg font-Eczar text-[18px]">
      <Link to="/">
        <div className="mb-[28px] mx-[8px] h-[86px] flex justify-center items-start">
          <img src={logo} alt="" width="210px" />
        </div>
      </Link>
      <div className="flex flex-col flex-shrink-0 items-center gap-2.5 self-stretch pl-4 pr-4 p-0">
        <Link
          to="/dashboard"
          className={`content flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-[66px] rounded-2xl ${
            active === 0 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
          }`}
        >
          <div className="icontext flex flex-wrap items-center content-center rounded-lg">
            <div className="flex justify-center items-center rounded-lg">
              <PiChartPieSliceFill size={24} />
            </div>
            <div className="text flex flex-col justify-center items-start rounded-lg ml-4">
              Dashboard
            </div>
          </div>
        </Link>
        {isMentorLogin && (
          <Link
            to="/requests"
            className={`content-1 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-[66px] rounded-2xl ${
              active === 1 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
            }`}
          >
            <div className="icontext-1 flex flex-wrap items-center content-center rounded-lg">
              <div className="flex justify-center items-center rounded-lg">
                <PiShoppingBagOpenDuotone size={24} />
              </div>
              <div className="text-2 flex flex-col justify-center items-start rounded-lg ml-4">
                Requests
              </div>
            </div>
          </Link>
        )}
        {isMentorLogin && (
          <Link
            to="/unassigned-students"
            className={`content-2 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-[66px] rounded-2xl ${
              active === 2 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
            }`}
          >
            <div className="icontext-2 flex flex-wrap items-center content-center rounded-lg">
              <div className="flex justify-center items-center rounded-lg">
                <RiFolder6Line size={24} />
              </div>
              <div className="flex flex-col justify-center items-start rounded-lg ml-4">
                Unassigned Students
              </div>
            </div>
          </Link>
        )}
        {isStudentLogin && (
          <Link
            to="/mentors"
            className={`content-3 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-[66px] rounded-2xl ${
              active === 2 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
            }`}
          >
            <div className="icontext-3 flex flex-wrap items-center content-center rounded-lg">
              <div className="flex justify-center items-center rounded-lg">
                <FaUsers size={24} />
              </div>
              <div className="text-6 flex flex-col justify-center items-start rounded-lg ml-4">
                Mentors
              </div>
            </div>
          </Link>
        )}
        <Link
          to="/roadmaps"
          className={`content-4 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-[66px] rounded-2xl ${
            active === 3 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
          }`}
        >
          <div className="icontext-4 flex flex-wrap items-center content-center rounded-lg">
            <div className="flex justify-center items-center rounded-lg">
              <IoBookOutline size={24} />
            </div>
            <div className="text-8 flex flex-col justify-center items-start rounded-lg ml-4">
              Roadmaps
            </div>
          </div>
        </Link>
        <Link
          to="/messaging"
          className={`content-5 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-[66px] rounded-2xl ${
            active === 5 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
          }`}
        >
          <div className="icontext-5 flex flex-wrap items-center content-center rounded-lg">
            <div className="flex justify-center items-center rounded-lg">
              <TiMessages size={24} />
            </div>
            <div className="text-10 flex flex-col justify-center items-start rounded-lg ml-4">
              Messages
            </div>
          </div>
        </Link>
        <Link
          to="/"
          className={`content-6 flex flex-shrink-0 flex-wrap items-center content-center self-stretch pt-4 pl-4 pr-4 py-3 px-5 h-[66px] rounded-2xl bg-[#F2F9FF]`}
          onClick={handleLogout}
        >
          <div className="icontext-6 flex flex-wrap items-center content-center rounded-lg">
            <div className="flex justify-bottom items-center rounded-lg">
              <MdLogout size={24} />
            </div>
            <div className="text-12 flex flex-col justify-center items-start rounded-lg ml-4">
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
