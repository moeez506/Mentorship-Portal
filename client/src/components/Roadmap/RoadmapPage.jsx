/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { FaFilePen } from "react-icons/fa6";
import { MdClose, MdDelete } from "react-icons/md";
import { PiGlobe } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";
import { AuthContext } from "../../context";
import { server } from "../../apiEndPoint/apiEndPoint";
import axios from "axios";

const RoadmapPage = () => {
  const { user } = useContext(AuthContext);
  const [roadmapList, setRoadmapList] = useState([]);
  const [newRoadmap, setNewRoadmap] = useState({
    title: "",
    description: "",
  });
  const [creatingRoadmap, setCreatingRoadmap] = useState(false);
  const [editingRoadmapId, setEditingRoadmapId] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoadmap((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateRoadmap = async () => {
    if (!newRoadmap.title || !newRoadmap.description) {
      toast.error("Please Fill in All Fields", { position: "bottom-center" });
      return;
    }

    const newRoadmapData = {
      title: newRoadmap.title,
      description: newRoadmap.description,
      mentorId: user._id,
    };

    try {
      const response = await axios.post(
        `${server}/roadmap/create`,
        newRoadmapData
      );

      setRoadmapList([...roadmapList, response.data.data]);
      toast.success("Roadmap Created Successfully");
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
      toast.error(error.response.data.message || "Error fetching roadmaps");
    }
    setCreatingRoadmap(false);
  };

  const handleDeleteRoadmap = async (id) => {
    try {
      await axios.delete(`${server}/roadmap/${id}`);

      setRoadmapList((prevState) =>
        prevState.filter((roadmap) => roadmap._id !== id)
      );

      toast.success("Roadmap Deleted Successfully");
    } catch (error) {
      console.error("Error deleting roadmaps:", error);
      toast.error(error.response.data.message || "Error deleting roadmaps");
    }
  };

  const handleEditRoadmap = (id) => {
    const roadmapToEdit = roadmapList.find((roadmap) => roadmap.id === id);
    if (roadmapToEdit) {
      setNewRoadmap({
        title: roadmapToEdit.title,
        description: roadmapToEdit.description,
      });
      setEditingRoadmapId(id);
      setCreatingRoadmap(true);
    }
  };

  const handleUpdateRoadmap = () => {
    if (!newRoadmap.title || !newRoadmap.description) {
      toast.error("Please Fill in All Fields", { position: "bottom-center" });
      return;
    }

    const updatedRoadmapData = roadmapList.map((roadmap) =>
      roadmap.id === editingRoadmapId ? { ...roadmap, ...newRoadmap } : roadmap
    );

    setRoadmapList(updatedRoadmapData);
    localStorage.setItem("roadmapData", JSON.stringify(updatedRoadmapData));
    setCreatingRoadmap(false);
    setNewRoadmap({ title: "", description: "" });
    setEditingRoadmapId(null);
    toast.success("Roadmap Updated Successfully", {
      position: "bottom-center",
    });
  };

  return (
    <>
      <Sidebar active={3} />
      <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[10vh]">
        <div className="container w-[80%] mx-auto">
          <br />
          <br />
          <div className="flex flex-row justify-between">
            <h2 className="font-Eczar font-medium text-2xl">All Roadmaps</h2>
            <button
              onClick={() => {
                setNewRoadmap({ title: "", description: "" });
                setCreatingRoadmap(true);
                setEditingRoadmapId(null);
              }}
              className="p-2 rounded-md cursor-pointer font-Eczar bg-[#56C361] text-white shadow-sm shadow-[#00000070]"
            >
              Create New Roadmap
            </button>
          </div>
          <br />
          <div className="flex flex-wrap gap-5">
            {Array.isArray(roadmapList) &&
              roadmapList.map((roadmap, index) => (
                <Link
                  key={index}
                  to={`/task/${roadmap._id}`}
                  className="h-[100px] w-[48%] bg-[#29affd13] rounded-[12px] flex flex-row justify-evenly items-center py-4 px-6 shadow-md shadow-[#0000004a] duration-150 hover:scale-[1.01]"
                >
                  <div className="rounded-full bg-[#56C361] text-[white] flex items-center justify-center">
                    <PiGlobe size={45} className="p-[4px]" />
                  </div>
                  <div className="font-Eczar text-[#1c1c1c] flex flex-col px-2 items-start">
                    <h1 className="font-medium text-[14px]">{roadmap.title}</h1>
                    <p className="">
                      {roadmap.description.length > 50
                        ? `${roadmap.description.slice(0, 50)}...`
                        : roadmap.description}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    {/* <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditRoadmap(roadmap._id);
                      }}
                      className="text-[#56c361] cursor-pointer"
                    >
                      <FaFilePen size={30} />
                    </button> */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteRoadmap(roadmap._id);
                      }}
                      className="text-[#a81616e0] cursor-pointer"
                    >
                      <MdDelete size={30} />
                    </button>
                  </div>
                </Link>
              ))}
          </div>
          {creatingRoadmap && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm pt-[10vh]">
              <div className="bg-white border-black border-[3px] w-[80vh] p-5 rounded-lg fixed">
                <MdClose
                  className="cursor-pointer right-2 absolute"
                  size={25}
                  color="#2e2e2e"
                  onClick={() => setCreatingRoadmap(false)}
                />
                <h3 className="text-green-600 font-Poppins text-2xl font-semibold mb-6 text-center">
                  {editingRoadmapId ? "Edit Roadmap" : "New Roadmap"}
                </h3>
                <form
                  className="flex flex-col items-center"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    name="title"
                    placeholder="Title of the roadmap"
                    value={newRoadmap.title}
                    onChange={handleChange}
                    className="mb-3 p-2 rounded-md border-gray-400 w-full bg-[#e0f7e9] text-black"
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description of the roadmap"
                    value={newRoadmap.description}
                    onChange={handleChange}
                    className="mb-3 p-2 rounded-md border-gray-400 w-full bg-[#e0f7e9] text-black"
                  />
                  <button
                    onClick={
                      editingRoadmapId
                        ? handleUpdateRoadmap
                        : handleCreateRoadmap
                    }
                    className="rounded-md text-[20px] cursor-pointer self-center px-[30px] py-2 mt-4 font-Eczar bg-[#56C361] text-white shadow-sm shadow-[#00000070]"
                    type="button"
                  >
                    {editingRoadmapId ? "Update Roadmap" : "Create Roadmap"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoadmapPage;
