import React, { useContext, useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context.jsx";
import Sidebar from "../Layout/Sidebar";
import StudentStatisticsCard from "./StudentStatisticsCard.jsx";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

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

  return (
    <>
      <Sidebar active={0} />
      <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[10vh]">
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
                <div className="min-h-32 bg-[#56c36115] p-4 rounded-[16px] flex flex-row gap-5 shadow-md shadow-[#00000052] items-center justify-center hover:bg-gray-200 duration-300 cursor-pointer">
                  <h1 className="text-2xl text-[#1c1c1c] font-medium font-Eczar">
                    Total Mentees:
                  </h1>
                  <h1 className="text-2xl text-[#1c1c1c] font-medium font-Eczar">
                    {user.mentees.length}
                  </h1>
                </div>
              </>
            )}
            {isStudent && (
              <>
                <DashboardPageCard
                  link="/my-learning/"
                  title="My Learning"
                  icon={<FaTasks size={30} />}
                />
                <DashboardPageCard
                  link="/mentors"
                  title="Mentors"
                  icon={<FaTasks size={30} />}
                />
                <DashboardPageCard
                  link="/profile"
                  title="Profile"
                  icon={<IoPersonOutline size={30} />}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <StudentStatisticsCard />
    </>
  );
};

export default DashboardPage;

const DashboardPageCard = ({ link, title }) => {
  return (
    <Link to={link}>
      <div className="min-h-32 bg-[#56c36115] p-[24px] rounded-[16px] min-w-[261px] flex flex-row shadow-md shadow-[#00000052] items-center justify-center hover:bg-gray-200 duration-300 cursor-pointer">
        <h1 className="text-2xl text-[#1c1c1c] font-medium font-Eczar w-[190px] text-center">
          {title}
        </h1>
      </div>
    </Link>
  );
};
