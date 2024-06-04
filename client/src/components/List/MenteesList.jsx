/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";
import axios from "axios"; // Import Axios
import { AuthContext } from "../../context";
import { server } from "../../apiEndPoint/apiEndPoint";
import { PiGlobe } from "react-icons/pi";
import { Link } from "react-router-dom";

const MenteesList = () => {
  const { user } = useContext(AuthContext);
  const [roadmapList, setRoadmapList] = useState([]);
  useEffect(() => {
    if (user) fetchRoadmaps();
  }, [user]);

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get(
        `${server}/roadmap/get-mentor-roadmaps/${user._id}`
      );

      setRoadmapList(response.data.data);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
      toast.error(error.response.data.message || "Error fetching roadmaps");
    }
  };
  const [mentees, setMentees] = useState([]);
  const [showAssignRoadmap, setShowAssignRoadmap] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState(null);

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const response = await axios.get(
          `${server}/mentor/all-mentees?mentorId=${user._id}`
        );
        console.log(response);
        setMentees(response.data.students);
      } catch (error) {
        console.error("Error fetching mentees:", error);
        toast.error("Failed to fetch mentees");
      }
    };

    if (user && user.role === "mentor") {
      fetchMentees();
    }
  }, [user]);

  const handleAssignRoadmap = async (roadmapId) => {
    console.log("🚀 ~ handleAssignRoadmap ~ roadmapId:", roadmapId);
    console.log("🚀 ~ handleAssignRoadmap ~ roadmapId:", selectedMentee);

    try {
      const response = await axios.post(`${server}/roadmap/assign`, {
        roadmapId,
        studentId: selectedMentee,
      });

      if (response.data) {
        toast.success(response.data.message);
        setShowAssignRoadmap(false);
      }
    } catch (error) {
      console.error("Error assigning roadmap:", error);
      toast.error(error.response.data.message || "Error assigning roadmap");
      setShowAssignRoadmap(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[10vh]">
        <div className="container w-[80%] mx-auto">
          <br />
          <br />
          <h2 className="font-Eczar font-medium text-2xl">My Mentees</h2>
          <br />
          <div className="flex flex-wrap gap-5">
            {mentees && mentees.length > 0 ? (
              mentees.map((mentee, index) => (
                <div
                  className="w-[300px] min-h-[250px] border-gray-300 border-[1px] shadow-sm rounded-[10px] flex flex-col items-center justify-between bg-white text-black py-6 px-4"
                  key={index}
                >
                  <div className="flex flex-col items-center">
                    <img
                      src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                      alt="Mentee"
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h1 className="text-xl font-medium mb-1">
                      {mentee.firstName} {mentee.lastName}
                    </h1>
                    <p className="text-sm text-gray-600">
                      Email: {mentee.email}
                    </p>
                  </div>

                  <div className="flex justify-center space-x-3 mt-5">
                    <button
                      className="bg-[#56C361] p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-[#56c361a5] flex items-center justify-center"
                      onClick={() => {
                        setShowAssignRoadmap(true);
                        setSelectedMentee(mentee._id);
                      }}
                    >
                      Assign roadmap
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="font-Eczar text-center w-full text-2xl">
                <p>No Mentees Found</p>
              </div>
            )}
          </div>
          {showAssignRoadmap && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm pt-[10vh]">
              <div className="bg-white border-black border-[3px] w-[80vh] p-5 rounded-lg fixed">
                <MdClose
                  className="cursor-pointer right-2 absolute"
                  size={25}
                  color="#2e2e2e"
                  onClick={() => setShowAssignRoadmap(false)}
                />
                <h3 className="text-green-600 font-Poppins text-2xl font-semibold mb-6 text-center">
                  Assign Roadmap
                </h3>
                <div className="flex flex-col flex-wrap w-full gap-5">
                  {Array.isArray(roadmapList) &&
                    roadmapList.map((roadmap, index) => (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAssignRoadmap(roadmap._id);
                        }}
                        className="h-[100px] w-full bg-[#29affd13] rounded-[12px] flex flex-row justify-left items-center py-4 px-6 shadow-md shadow-[#0000004a] duration-150 hover:scale-[1.01] gap-x-5"
                      >
                        <div className="rounded-full bg-[#56C361] text-[white] flex items-center justify-center">
                          <PiGlobe size={45} className="p-[4px]" />
                        </div>
                        <div className="font-Eczar text-[#1c1c1c] flex flex-col px-2 items-start">
                          <h1 className="font-medium text-[14px]">
                            {roadmap.title}
                          </h1>
                          <p className="">
                            {roadmap.description.length > 50
                              ? `${roadmap.description.slice(0, 50)}...`
                              : roadmap.description}
                          </p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenteesList;
