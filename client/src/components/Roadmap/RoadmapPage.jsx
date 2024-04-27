import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoadmapPage = () => {
  const [roadmapData, setRoadmapData] = useState([]);
  const [newRoadmap, setNewRoadmap] = useState({
    title: "",
    description: "",
  });
  const [creatingRoadmap, setCreatingRoadmap] = useState(false);
  const navigate = useNavigate();

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

  // const handleVisitTasks = (roadmapId) => {
  //   navigate(`/tasks/${roadmapId}`);
  // };

  // const handleCreateTasks = (roadmapId) => {
  //   navigate(`/tasks/create/${roadmapId}`);
  // };

  return (
    <>
      {/* <div
      style={{
        backgroundColor: theme.primary,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: theme.fontfamily,
      }}
    >
      {roadmapData.length === 0 && !creatingRoadmap ? (
        <button
          onClick={() => setCreatingRoadmap(true)}
          style={{
            backgroundColor: theme.text,
            color: theme.buttons,
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: theme.fontfamily,
          }}
        >
          Create Roadmap
        </button>
      ) : creatingRoadmap ? (
        <div
          style={{
            backgroundColor: theme.prominent,
            width: "50%",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <h3 style={{ color: theme.text }}>Create New Roadmap</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: theme.text, marginRight: "10px" }}>
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={newRoadmap.title}
                onChange={handleChange}
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.secondary}`,
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: theme.text, marginRight: "10px" }}>
                Description:
              </label>
              <input
                type="text"
                name="description"
                value={newRoadmap.description}
                onChange={handleChange}
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.secondary}`,
                }}
              />
            </div>
            <button
              onClick={handleCreateRoadmap}
              style={{
                backgroundColor: theme.text,
                color: theme.buttons,
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: theme.fontfamily,
              }}
            >
              Create
            </button>
          </form>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            padding: "20px",
            fontFamily: theme.fontfamily,
          }}
        >
          {roadmapData.map((roadmap) => (
            <div
              key={roadmap.id}
              style={{
                backgroundColor: theme.prominent,
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <h3 style={{ color: theme.text }}>{roadmap.title}</h3>
              <p style={{ color: theme.text }}>{roadmap.description}</p>
              <button
                onClick={() => handleCreateTasks(roadmap.id)}
                style={{
                  backgroundColor: theme.editButton,
                  color: theme.buttons,
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  marginBottom: "10px",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.editButtonHover;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = theme.editButton;
                }}
              >
                Create Task
              </button>
              <button
                onClick={() => handleVisitTasks(roadmap.id)}
                style={{
                  backgroundColor: theme.editButton,
                  color: theme.buttons,
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.editButtonHover;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = theme.editButton;
                }}
              >
                Visit Tasks
              </button>
            </div>
          ))}
        </div>
      )}
        <ToastContainer position="bottom-left" />
      </div> */}
      <div
        className={`bg-[#161616] fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden font-Poppins`}
      >
        {roadmapData.length === 0 && !creatingRoadmap ? (
          <button
            onClick={() => setCreatingRoadmap(true)}
            className={`bg-[#fefefe] text-[#000000] p-2 rounded-md cursor-pointer font-Poppins`}
          >
            Create Roadmap
          </button>
        ) : creatingRoadmap ? (
          <div className={`bg-[#2e2e2e] w-[45%] p-5 rounded-lg`}>
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
        ) : (
          <div className="item-center">
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5"> */}
            {roadmapData.map((roadmap) => (
              <div key={roadmap.id} className={`bg-[#2e2e2e] p-5 rounded-lg`}>
                <h3 className={`text-[#fefefe]`}>{roadmap.title}</h3>
                <p className={`text-[#fefefe]`}>{roadmap.description}</p>
                <div className="flex gap-5 mt-5">
                  <button
                    onClick={() => navigate("/tasks")}
                    className={`bg-[#fefefe] text-[black] p-2 rounded-lg cursor-pointer mb-2 transition duration-300 hover:bg-[#dedede]`}
                  >
                    Create Task
                  </button>
                  <button
                    onClick={() => navigate("/tasks")}
                    className={`bg-[#fefefe] text-[black] p-2 rounded-lg cursor-pointer mb-2 transition duration-300 hover:bg-[#dedede]`}
                  >
                    Visit Tasks
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default RoadmapPage;
