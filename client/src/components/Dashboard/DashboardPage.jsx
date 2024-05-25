import React from "react";
import { FaTasks } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";

const DashboardPage = () => {
  const isMentor = localStorage.getItem("mentorLogin");
  const isStudent = localStorage.getItem("studentLogin");

  return (
    <div className="w-full flex flex-row bg-gray-100 p-5 pl-[20vw] pt-[10vh] border border-gray-300">
      <Sidebar active={0} />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-screen-lg p-5 grid grid-cols-3 gap-4">
          {isMentor && (
            <>
              <DashboardPageCard
                link="/mentees"
                title="My Mentees"
                icon={<FaUserGroup size={30} />}
              />
              <DashboardPageCard
                link="/roadmaps"
                title="Roadmaps"
                icon={<FaTasks size={30} />}
              />
            </>
          )}
          {isStudent && (
            <DashboardPageCard
              link="/tasks"
              title="Tasks"
              icon={<FaTasks size={30} />}
            />
          )}
          {(isMentor || isStudent) && (
            <DashboardPageCard
              link="/profile"
              title="Profile"
              icon={<IoPersonOutline size={30} />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

const DashboardPageCard = ({ link, icon, title }) => {
  return (
    <Link to={link}>
      <div className="min-h-32 bg-white p-4 shadow rounded flex flex-row gap-5 items-center hover:bg-gray-200 duration-300 cursor-pointer">
        <div className="p-3 bg-gray-300 rounded-full">{icon}</div>
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>
    </Link>
  );
};
