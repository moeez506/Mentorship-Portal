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
    <div className="w-full flex flex-row bg-[#161616]">
      <Sidebar active={0} />
      <div className={`bg-[#161616] min-h-full font-Poppins px-10 pt-5 w-full`}>
        <div className="flex flex-row justify-center pt-7 gap-7">
          {isMentor && (
            <>
              <DashboardPageCard
                link={"/mentees"}
                title={"My Mentees"}
                icon={<FaUserGroup size={30} />}
              />
              <DashboardPageCard
                link={"/roadmaps"}
                title={"Roadmaps"}
                icon={<FaTasks size={30} />}
              />
            </>
          )}
          {isStudent && (
            <DashboardPageCard
              link={"/tasks"}
              title={"Tasks"}
              icon={<FaTasks size={30} />}
            />
          )}
          {(isMentor || isStudent) && (
            <DashboardPageCard
              link={"/profile"}
              title={"Profile"}
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
      <div className="min-w-[300px] min-h-32 bg-[#2f3136] rounded-md border-[#636363] border-[1px] p-5 flex flex-row gap-5 text-white items-center hover:bg-[#202226] duration-300 cursor-pointer">
        <div className="p-3 bg-[#24262a] rounded-full">{icon}</div>
        <h1 className="text-2xl font-medium font-Roboto">{title}</h1>
      </div>
    </Link>
  );
};
