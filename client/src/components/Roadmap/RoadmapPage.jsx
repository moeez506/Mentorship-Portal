import React, { useEffect, useState } from "react";
import {
  MdClose,
  MdDeleteOutline,
  MdOutlineMode,
  MdPlayCircleOutline,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
      <div className="w-full flex flex-row bg-white min-h-screen">
        <Sidebar active={3} />
        <div className="min-h-full w-full font-Poppins flex items-start flex-col px-10 pt-[15vh] ml-[20vw] text-black">
          <div className="flex flex-row items-center justify-between w-full mb-8">
            <h3 className="text-2xl font-Poppins">All Roadmaps</h3>
            <button
              onClick={() => {
                setNewRoadmap({ title: "", description: "" });
                setCreatingRoadmap(true);
                setEditingRoadmapId(null);
              }}
              className="p-2 rounded-md cursor-pointer font-Poppins bg-[#29b0fd] text-white"
            >
              Create Roadmap
            </button>
          </div>
          <div className="w-full flex justify-center pt-2">
            <div className="w-[97%]">
              <div className="flex flex-wrap gap-6">
                {roadmapData.map((roadmap) => (
                  <div
                    className="w-[350px] min-h-[120px] border-gray-200 border-[1px] shadow-sm rounded-lg flex items-center justify-between bg-[#f0f4f8] p-4"
                    key={roadmap.id}
                  >
                    <div className="flex items-center">
                      <div className="bg-green-500 text-white rounded-full p-3 mr-4">
                        <MdPlayCircleOutline size={30} />
                      </div>
                      <div>
                        <h1 className="text-black text-lg font-medium mb-2">
                          <Link to={`/task/${roadmap.id}`}>
                            {roadmap.title}
                          </Link>
                        </h1>
                        <p className="text-black font-Roboto text-sm">
                          {roadmap.description.length > 50
                            ? `${roadmap.description.slice(0, 50)}...`
                            : roadmap.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditRoadmap(roadmap.id)}
                        className="p-2 rounded-full duration-300 bg-blue-500 text-white hover:bg-blue-600"
                      >
                        <MdOutlineMode size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteRoadmap(roadmap.id)}
                        className="p-2 rounded-full duration-300 bg-red-500 text-white hover:bg-red-600"
                      >
                        <MdDeleteOutline size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                    className="bg-green-600 text-white p-2 rounded-md cursor-pointer font-Poppins w-full mt-5 hover:bg-green-700 duration-300"
                  >
                    {editingRoadmapId ? "Update" : "Add Roadmap"}
                  </button>
                </form>
              </div>
            </div>
          )}
          <ToastContainer position="bottom-center" />
        </div>
      </div>
    </>
  );
};

export default RoadmapPage;
