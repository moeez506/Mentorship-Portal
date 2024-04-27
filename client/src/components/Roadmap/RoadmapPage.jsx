import React, { useEffect, useState } from "react";
import { MdClose, MdDeleteOutline, MdOutlineMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoadmapPage = () => {
  const [roadmapData, setRoadmapData] = useState([]);
  const [newRoadmap, setNewRoadmap] = useState({
    title: "",
    description: "",
  });
  const [creatingRoadmap, setCreatingRoadmap] = useState(false);

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
      toast.error("Please Fill in All Fields", { position: "bottom-left" });
      return;
    }

    const newRoadmapData = {
      title: newRoadmap.title,
      description: newRoadmap.description,
      id: Date.now(),
      tasks: [],
    };

    const updatedRoadmapData = [...roadmapData, newRoadmapData];
    setRoadmapData(updatedRoadmapData);
    localStorage.setItem("roadmapData", JSON.stringify(updatedRoadmapData));
    setCreatingRoadmap(false);
    setNewRoadmap({ title: "", description: "" });
  };

  return (
    <>
      <div
        className={`bg-[#161616] min-h-[100vh] font-Poppins flex items-end flex-col px-10 pt-5`}
      >
        <div className="flex flex-row items-center justify-between w-full my-8">
          <h3 className="text-[22px] text-[white] font-Poppins ml-10">
            All Roadmaps
          </h3>
          <button
            onClick={() => setCreatingRoadmap(true)}
            className={`bg-[#fefefe] text-[#000000] p-2 rounded-md cursor-pointer font-Poppins`}
          >
            Create Roadmap
          </button>
        </div>
        <div className="w-full flex justify-center pt-2">
          <div className="w-[97%]">
            <div className="flex flex-wrap gap-9">
              {roadmapData &&
                roadmapData.map((i, index) => (
                  <div
                    className="w-[350px] min-h-[380px] border-[#2e2e2e] border-[3px] shadow-[#0000006c] shadow-md rounded-[35px] flex flex-col py-10 px-8 items-start justify-between"
                    key={index}
                  >
                    <div>
                      <h1 className="text-[#fefefe] text-[22px] font-Roboto font-medium mb-8">
                        {i.title}
                      </h1>
                      <p className="text-[#fefefe] text-[18px] font-Roboto">
                        {i.description.length > 50
                          ? `${i.description.slice(0, 190)}...`
                          : i.description}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[5px]">
                      <Link to={"/tasks"}>
                        <button className="bg-[#fefefe] p-2 h-9 min-w-20 text-[#121212] rounded-md duration-300 hover:bg-[#dedede] flex flex-row justify-center items-center gap-2">
                          Edit
                          <span>
                            <MdOutlineMode size={18} />
                          </span>
                        </button>
                      </Link>
                      <button className="bg-[#fefefe] p-2 h-9 w-10 text-[#494949] rounded-md duration-300 hover:bg-[#ff0000d5] hover:text-[black] flex justify-center items-center">
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
          <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm`}
          >
            <div className={`bg-[#2e2e2e] w-[80vh] p-5 rounded-lg fixed`}>
              <MdClose
                className="cursor-pointer right-2 absolute"
                size={25}
                color="#fefefe"
                onClick={() => setCreatingRoadmap(false)}
              />
              <h3
                className={`text-[#fefefe] font-Poppins text-[20px] font-semibold mb-6 text-center`}
              >
                Create New Roadmap
              </h3>
              <form
                className="flex flex-col items-end"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="mb-3 flex flex-row w-[100%] justify-between items-center">
                  <label className={`text-[#fefefe] mr-2`}>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={newRoadmap.title}
                    onChange={handleChange}
                    className={`p-2 rounded-md border-[#000000] w-[70%]`}
                  />
                </div>
                <div className="mb-3 flex flex-row w-[100%] justify-between items-center">
                  <label className={`text-[#fefefe] mr-2`}>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={newRoadmap.description}
                    onChange={handleChange}
                    className={`p-2 rounded-md border-[#000000] w-[70%]`}
                  />
                </div>
                <button
                  onClick={handleCreateRoadmap}
                  className={`bg-[#fefefe] text-[#000000] p-2 rounded-md cursor-pointer font-Poppins w-[20%] mt-5 hover:bg-[#dedede] duration-300`}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        )}
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default RoadmapPage;
