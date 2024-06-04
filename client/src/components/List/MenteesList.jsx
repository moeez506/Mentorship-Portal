import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";
import axios from "axios"; // Import Axios
import { AuthContext } from "../../context";
import { server } from "../../apiEndPoint/apiEndPoint";

const MenteesList = () => {
  const { user } = useContext(AuthContext);
  const [mentees, setMentees] = useState([]);

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

  const handleDeleteMentee = async (index, studentId) => {
    try {
      await axios.delete(`${server}/student/delete/${studentId}`);
      const updatedMentees = [
        ...mentees.slice(0, index),
        ...mentees.slice(index + 1),
      ];
      setMentees(updatedMentees);
      toast.success("Mentee Removed");
    } catch (error) {
      console.error("Error deleting mentee:", error);
      toast.error("Failed to delete mentee");
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
                  {/* <div className="flex justify-center space-x-3 mt-5">
                    <button
                      className="bg-red-500 p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-red-700 flex items-center justify-center"
                      onClick={() => handleDeleteMentee(index, mentee._id)}
                    >
                      <MdDelete size={18} />
                    </button>
                  </div> */}
                </div>
              ))
            ) : (
              <div className="font-Eczar text-center w-full text-2xl">
                <p>No Mentees Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteesList;
