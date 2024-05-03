import React, { useEffect, useState } from "react";
import { MdClose, MdDeleteOutline, MdOutlineMode } from "react-icons/md";
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
      <div className="w-full flex flex-row bg-[#161616]">
        <Sidebar active={3} />
        <div
          className={`bg-[#161616] min-h-full w-full font-Poppins flex items-end flex-col px-10 pt-5`}
        >
          <div className="flex flex-row items-center justify-between w-full my-8">
            <h3 className="text-white text-2xl font-Poppins ml-10">
              All Roadmaps
            </h3>
            <button
              onClick={() => {
                setNewRoadmap({ title: "", description: "" });
                setCreatingRoadmap(true);
                setEditingRoadmapId(null);
              }}
              className={`bg-[#fefefe] text-black p-2 rounded-md cursor-pointer font-Poppins`}
            >
              Create Roadmap
            </button>
          </div>
          <div className="w-full flex justify-center pt-2">
            <div className="w-[97%]">
              <div className="flex flex-wrap gap-9">
                {roadmapData.map((roadmap) => (
                  <div
                    className={`w-[350px] min-h-[380px] border-gray-700 border-[3px] shadow-[#0000006c] shadow-md rounded-[35px] flex flex-col py-10 px-8 items-start justify-between bg-[#2e2e2e]`}
                    key={roadmap.id}
                  >
                    <div>
                      <h1 className="text-white text-2xl font-medium mb-8 cursor-pointer">
                        <Link
                          to={`/task/${roadmap.id}`}
                          roadmapData={roadmapData}
                          setRoadmapData={setRoadmapData}
                        >
                          {roadmap.title}
                        </Link>
                      </h1>
                      <p className="text-white font-Roboto">
                        {roadmap.description.length > 50
                          ? `${roadmap.description.slice(0, 190)}...`
                          : roadmap.description}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[5px]">
                      <button
                        onClick={() => handleEditRoadmap(roadmap.id)}
                        className="bg-[#fefefe] p-2 h-9 min-w-[80px] text-black rounded-md duration-300 hover:bg-blue-800 flex items-center justify-center gap-2"
                      >
                        Edit
                        <span>
                          <MdOutlineMode size={18} />
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteRoadmap(roadmap.id)}
                        className="bg-[#fefefe] p-2 h-9 min-w-[80px] text-black rounded-md duration-300 hover:bg-red-800 hover:text-white flex items-center justify-center"
                      >
                        <span>
                          <MdDeleteOutline size={20} />
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {creatingRoadmap && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
              <div className={`bg-[#2e2e2e] w-[80vh] p-5 rounded-lg fixed`}>
                <MdClose
                  className="cursor-pointer right-2 absolute"
                  size={25}
                  color="#fefefe"
                  onClick={() => setCreatingRoadmap(false)}
                />
                <h3 className="text-white font-Poppins text-2xl font-semibold mb-6 text-center">
                  {editingRoadmapId ? "Edit Roadmap" : "Create New Roadmap"}
                </h3>
                <form
                  className="flex flex-col items-end"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="mb-3 flex flex-row w-full justify-between items-center">
                    <label className="text-white mr-2">Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={newRoadmap.title}
                      onChange={handleChange}
                      className="p-2 rounded-md border-gray-700 w-[80%]"
                    />
                  </div>
                  <div className="mb-3 flex flex-row w-full justify-between items-center">
                    <label className="text-white mr-2">Description:</label>
                    <input
                      type="text"
                      name="description"
                      value={newRoadmap.description}
                      onChange={handleChange}
                      className="p-2 rounded-md border-gray-700 w-[80%]"
                    />
                  </div>
                  <button
                    onClick={
                      editingRoadmapId
                        ? handleUpdateRoadmap
                        : handleCreateRoadmap
                    }
                    className="bg-[#fefefe] text-black p-2 rounded-md cursor-pointer font-Poppins w-[20%] mt-5 hover:bg-gray-400 duration-300"
                  >
                    {editingRoadmapId ? "Update" : "Create"}
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
