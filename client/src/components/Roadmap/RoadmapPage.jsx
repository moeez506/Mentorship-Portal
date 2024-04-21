// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme";

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

  const handleVisitTasks = (roadmapId) => {
    navigate(`/tasks/${roadmapId}`);
  };

  const handleCreateTasks = (roadmapId) => {
    navigate(`/tasks/create/${roadmapId}`);
  };

  return (
    <div
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
    </div>
  );
};

export default RoadmapPage;
