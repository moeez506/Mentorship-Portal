import React, { useContext, useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";
import axios from "axios";
import { server } from "../../apiEndPoint/apiEndPoint";
import { AuthContext } from "../../context";
import Loader from "../Layout/Loader";

const MentorsList = () => {
  const [mentorList, setMentorList] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    fetchMentors();
  }, []);

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

  const handleMentorRequest = async (mentorId) => {
    try {
      if (user?.mentorId)
        return toast.error("You already have a mentor assigned");

      const response = await axios.post(`${server}/student/request-mentor`, {
        mentorId,
        studentId: user._id,
      });

      if (response.data && response.data.message) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error requesting mentors:", error);
      toast.error(error.response.data.message || "Failed to request mentors");
    }
  };

  const handleViewDetails = (mentorId) => {
    // will get the mentor ID and redirect to profile/:id page to view details
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-row bg-[#f0f4f8] min-h-screen">
          <Sidebar active={2} />
          <div
            className={`min-h-full w-full font-Poppins flex items-start flex-col px-10 pt-5`}
            style={{ marginLeft: "20vw", marginTop: "10vh" }}
          >
            {user?.mentorId ? (
              <h3 className="text-black text-2xl font-Poppins">
                Available Mentors (You have been already assigned a mentor )
              </h3>
            ) : (
              <h3 className="text-black text-2xl font-Poppins">
                Available Mentors
              </h3>
            )}
            <div className="w-full flex justify-center pt-8">
              <div className="w-[97%]">
                <div className="grid grid-cols-3 gap-6">
                  {mentorList.map((mentor, index) => (
                    <div
                      className="w-[300px] min-h-[350px] border-gray-300 border-[1px] shadow-sm rounded-[10px] flex flex-col items-center justify-between bg-white text-black py-6 px-4"
                      key={index}
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                          alt="Mentor"
                          className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h1 className="text-xl font-medium mb-1">
                          {mentor.firstName} {mentor.lastName}
                        </h1>
                        <p className="text-sm text-gray-600">
                          Email: {mentor.email}
                        </p>
                      </div>
                      <div className="flex justify-center space-x-3 mt-5">
                        <button
                          className="bg-green-500 p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-green-700 flex items-center justify-center"
                          onClick={() => handleMentorRequest(mentor._id)}
                        >
                          Send Request
                        </button>
                        <button
                          className="bg-blue-500 p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-blue-700 flex items-center justify-center"
                          onClick={() => handleViewDetails(mentor._id)}
                        >
                          <FiEye size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorsList;
