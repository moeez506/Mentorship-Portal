import React from "react";
import { FaTasks } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";

const DashboardPage = () => {
  const isMentor = localStorage.getItem("mentorLogin");
  const isStudent = localStorage.getItem("studentLogin");

  return (
    <>
      <div className="w-full flex flex-row bg-gray-100 p-5 pl-[20vw] pt-[10vh] border border-gray-300">
        <Sidebar active={0} />
        <div className="container w-[80%] mx-auto">
          <br />
          <br />
          <h2 className="font-Eczar font-medium text-2xl">Overview</h2>
          <br />
          <div className="w-full flex flex-row justify-between">
            {isMentor && (
              <>
                <DashboardPageCard link="/mentees" title="My Mentees" />
                <DashboardPageCard link="/roadmaps" title="My Roadmaps" />
                <div className="min-h-32 bg-[#56c36103] p-4 rounded-[16px] flex flex-row gap-5 shadow-md shadow-[#00000052] items-center justify-center hover:bg-gray-200 duration-300 cursor-pointer">
                  <h1 className="text-2xl text-[#1c1c1c] font-medium font-Eczar">
                    Total Mentees
                  </h1>
                  <h1 className="text-2xl text-[#1c1c1c] font-medium font-Eczar">
                    10
                  </h1>
                </div>
              </>
            )}
            {isStudent && (
              <>
                <DashboardPageCard
                  link="/tasks"
                  title="Tasks"
                  icon={<FaTasks size={30} />}
                />
                <DashboardPageCard
                  link="/profile"
                  title="Profile"
                  icon={<IoPersonOutline size={30} />}
                />
              </>
            )}
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

const DashboardPageCard = ({ link, title }) => {
  return (
    <Link to={link}>
      <div className="min-h-32 bg-[#56c36103] p-[24px] rounded-[16px] min-w-[261px] flex flex-row shadow-md shadow-[#00000052] items-center justify-center hover:bg-gray-200 duration-300 cursor-pointer">
        <h1 className="text-2xl text-[#1c1c1c] font-medium font-Eczar w-[190px] text-center">
          {title}
        </h1>
      </div>
    </Link>
  );
};
