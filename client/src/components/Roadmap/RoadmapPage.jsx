import React, { useEffect, useState } from "react";
import { FaFilePen } from "react-icons/fa6";
import { MdClose, MdDelete } from "react-icons/md";
import { PiGlobe } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";

const RoadmapPage = () => {
  const [roadmapData, setRoadmapData] = useState([]);
  const [newRoadmap, setNewRoadmap] = useState({
    title: "",
    description: "",
  });
  const [creatingRoadmap, setCreatingRoadmap] = useState(false);
  const [editingRoadmapId, setEditingRoadmapId] = useState(null);

  useEffect(() => {
    const storedRoadmapData = JSON.parse(localStorage.getItem("roadmapData"));
    if (storedRoadmapData) {
      setRoadmapData(storedRoadmapData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoadmap((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateRoadmap = () => {
    if (!newRoadmap.title || !newRoadmap.description) {
      toast.error("Please Fill in All Fields", { position: "bottom-center" });
      return;
    }

    const newRoadmapData = {
      title: newRoadmap.title,
      description: newRoadmap.description,
      id: Date.now().toString(),
      tasks: [],
    };

    const updatedRoadmapData = [...roadmapData, newRoadmapData];
    setRoadmapData(updatedRoadmapData);
    localStorage.setItem("roadmapData", JSON.stringify(updatedRoadmapData));
    setCreatingRoadmap(false);
    setNewRoadmap({ title: "", description: "" });
    toast.success("Roadmap Created Successfully", {
      position: "bottom-center",
    });
  };

  const handleDeleteRoadmap = (id) => {
    const updatedRoadmapData = roadmapData.filter(
      (roadmap) => roadmap.id !== id
    );
    setRoadmapData(updatedRoadmapData);
    localStorage.setItem("roadmapData", JSON.stringify(updatedRoadmapData));
    toast.success("Roadmap Deleted Successfully", {
      position: "bottom-center",
    });
  };

  const handleEditRoadmap = (id) => {
    const roadmapToEdit = roadmapData.find((roadmap) => roadmap.id === id);
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

    const updatedRoadmapData = roadmapData.map((roadmap) =>
      roadmap.id === editingRoadmapId ? { ...roadmap, ...newRoadmap } : roadmap
    );

    setRoadmapData(updatedRoadmapData);
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
            {roadmapData.map((roadmap) => (
              <Link
                key={roadmap.id}
                to={`/task/${roadmap.id}`}
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditRoadmap(roadmap.id);
                    }}
                    className="text-[#56c361] cursor-pointer"
                  >
                    <FaFilePen size={30} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteRoadmap(roadmap.id);
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
