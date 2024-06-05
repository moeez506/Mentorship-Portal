import React, { useContext, useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context.jsx";
import Sidebar from "../Layout/Sidebar";
import StudentStatisticsCard from "./StudentStatisticsCard.jsx";
import Loader from "../Layout/Loader.jsx";
import axios from "axios";
import { server } from "../../apiEndPoint/apiEndPoint.js";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const { user, loading, isAdmin, setIsAdmin } = useContext(AuthContext);
  console.log("------------dash", isAdmin);
  const [isMentor, setIsMentor] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [roadmapList, setRoadmapList] = useState([]);
  const [mentorList, setMentorList] = useState([]);

  useEffect(() => {
    if (user) setIsAdmin(user.email === "mentor@gmail.com" ? true : false);
    if (user && user.role === "mentor") {
      setIsMentor(true);
    }
    if (user && user.role === "student") {
      setIsStudent(true);
    }
    fetchStudents();
    if (user) fetchRoadmaps();
    fetchMentors();
  }, [user]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${server}/mentor/all-students`);
      setStudentData(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error(error.response.data.message || "Failed to fetch students");
    }
  };

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get(`${server}/roadmap/`);

      setRoadmapList(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
      toast.error(error.response.data.message || "Error fetching roadmaps");
    }
  };

  const fetchMentors = async () => {
    try {
      const response = await axios.get(`${server}/student/all-mentors`);

      if (response.data && response.data.mentors)
        setMentorList(response.data.mentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      toast.error("Failed to fetch mentors");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                    <DashboardPageCard
                      link={!isAdmin ? "/mentees" : undefined}
                      title={
                        isAdmin
                          ? `Total Students: ${studentData.length}`
                          : "My Mentees"
                      }
                    />
                    <DashboardPageCard
                      link={!isAdmin ? "/roadmaps" : undefined}
                      title={
                        isAdmin
                          ? `Total Roadmaps: ${roadmapList.length}`
                          : "My Roadmpas"
                      }
                    />
                    <div className="min-h-32 bg-[#56c36115] p-4 rounded-[16px] flex flex-row gap-5 shadow-md shadow-[#00000052] items-center justify-center hover:bg-gray-200 duration-300 cursor-pointer">
                      <h1 className="text-2xl text-[#1c1c1c] font-medium font-Eczar">
                        {isAdmin ? "Total Mentors" : "Total Mentees:"}
                      </h1>
                      <h1 className="text-2xl text-[#1c1c1c] font-medium font-Eczar">
                        {isAdmin ? mentorList.length : user.mentees.length}
                      </h1>
                    </div>
                  </>
                )}
                {isStudent && (
                  <>
                    <DashboardPageCard
                      link={!isAdmin ? "/my-learning/" : undefined}
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
      )}
    </>
  );
};

export default DashboardPage;

const DashboardPageCard = ({ link, title }) => {
  return (
    <Link to={link}>
      <div className="min-h-32 bg-[#56c36115] p-[24px] rounded-[16px] min-w-[261px] flex flex-row shadow-md shadow-[#00000052] items-center justify-center hover:bg-gray-200 duration-300 cursor-pointer">
        <h1 className="text-2xl text-[#1c1c1c] font-medium font-Eczar w-[250px] text-center">
          {title}
        </h1>
      </div>
    </Link>
  );
};
