import React, { useContext, useEffect, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { PiChartPieSliceFill, PiShoppingBagOpenDuotone } from "react-icons/pi";
import { RiFolder6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/Struggle.png";
import { AuthContext } from "../../context";
import Loader from "./Loader";

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);

  const [isMentor, setIsMentor] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    if (user && user.role === "mentor") {
      setIsMentor(true);
    }
    if (user && user.role === "student") {
      setIsStudent(true);
    }
  }, [user]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error(error.response.data.message || "Logout Failed");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
            {isMentor && (
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
            {isMentor && (
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
            {isStudent && (
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
            {isMentor && (
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
            )}
            <Link
              to="/messaging"
              className={`content-5 w-full px-5 h-[66px] rounded-2xl ${
                active === 5 ? "bg-[#56C361] text-[white]" : "bg-[#F2F9FF]"
              }`}
            >
              <div className="flex flex-row items-center content-center rounded-lg w-full h-full">
                <div>
                  <BiMessageSquareDetail size={24} />
                </div>
                <div className="flex flex-col justify-center items-start rounded-lg ml-4 hover:translate-x-2 hover:justify-center duration-200 w-full h-full">
                  Messages
                </div>
              </div>
            </Link>
            <div
              className={`w-full px-5 h-[66px] rounded-2xl cursor-pointer`}
              aria-readonly
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
        </div>
      )}
    </>
  );
};

export default Sidebar;
