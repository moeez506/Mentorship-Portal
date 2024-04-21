// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../../styles/theme";

const TaskPage = () => {
  const [taskData, setTaskData] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    link: "",
    status: "pending",
    dueDate: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [creatingTask, setCreatingTask] = useState(false);

  useEffect(() => {
    const storedTaskData = JSON.parse(localStorage.getItem("taskData"));
    if (storedTaskData) {
      setTaskData(storedTaskData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.link || !newTask.dueDate) {
      toast.error("Please Fill in All Fields", { position: "bottom-left" });
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...taskData];
      updatedTasks[editIndex] = newTask;
      setTaskData(updatedTasks);
      setEditIndex(null);
    } else {
      const updatedTaskData = [...taskData, newTask];
      setTaskData(updatedTaskData);
      localStorage.setItem("taskData", JSON.stringify(updatedTaskData));
    }

    toast.success("Task Added Successfully", { position: "bottom-left" });
    setNewTask({ title: "", link: "", status: "pending", dueDate: "" });
  };

  const handleEditTask = (index) => {
    setNewTask(taskData[index]);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = taskData.filter((_, i) => i !== index);
    setTaskData(updatedTasks);
    localStorage.setItem("taskData", JSON.stringify(updatedTasks));
    toast.success("Task Deleted Successfully", { position: "bottom-left" });
  };

  const handleCreateTask = () => {
    setCreatingTask(true);
    setNewTask({ title: "", link: "", status: "pending", dueDate: "" });
    setEditIndex(null);
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
      {taskData.length === 0 && !creatingTask ? (
        <button
          onClick={handleCreateTask}
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
          Create Task
        </button>
      ) : (
        <>
          <div
            style={{
              backgroundColor: theme.prominent,
              maxHeight: "80%",
              width: "60%",
              padding: "20px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {taskData.map((task, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "20px",
                  border: `1px solid ${theme.secondary}`,
                  borderRadius: "10px",
                  padding: "10px",
                  backgroundColor: theme.cardBackground,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ color: theme.text }}>{task.title}</h3>
                  <div>
                    <button
                      onClick={() => handleEditTask(index)}
                      style={{
                        backgroundColor: theme.editButton,
                        color: theme.buttons,
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "20px",
                        cursor: "pointer",
                        marginRight: "5px",
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = theme.editButtonHover;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = theme.editButton;
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      style={{
                        backgroundColor: theme.deleteButton,
                        color: theme.buttons,
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "20px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor =
                          theme.deleteButtonHover;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = theme.deleteButton;
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p style={{ color: theme.text }}>
                  <strong>Link:</strong> {task.link}
                </p>
                <p style={{ color: theme.text }}>
                  <strong>Status:</strong> {task.status}
                </p>
                <p style={{ color: theme.text }}>
                  <strong>Due Date:</strong> {task.dueDate}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: theme.prominent,
              maxHeight: "90%",
              width: "30%",
              padding: "20px",
              borderRadius: "20px",
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                  <label
                    style={{
                      color: theme.text,
                      marginRight: "10px",
                      flex: "1",
                      fontSize: "16px",
                    }}
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    style={{
                      flex: "2",
                      padding: "8px",
                      borderRadius: "5px",
                      border: `1px solid ${theme.secondary}`,
                    }}
                  />
                </div>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                  <label
                    style={{
                      color: theme.text,
                      marginRight: "10px",
                      flex: "1",
                      fontSize: "16px",
                    }}
                  >
                    Link:
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={newTask.link}
                    onChange={handleChange}
                    style={{
                      flex: "2",
                      padding: "8px",
                      borderRadius: "5px",
                      border: `1px solid ${theme.secondary}`,
                    }}
                  />
                </div>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                  <label
                    style={{
                      color: theme.text,
                      marginRight: "10px",
                      flex: "1",
                      fontSize: "16px",
                    }}
                  >
                    Status:
                  </label>
                  <select
                    name="status"
                    value={newTask.status}
                    onChange={handleChange}
                    style={{
                      flex: "2",
                      padding: "8px",
                      borderRadius: "5px",
                      border: `1px solid ${theme.secondary}`,
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                  <label
                    style={{
                      color: theme.text,
                      marginRight: "10px",
                      flex: "1",
                      fontSize: "16px",
                    }}
                  >
                    Due Date:
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleChange}
                    style={{
                      flex: "2",
                      padding: "8px",
                      borderRadius: "5px",
                      border: `1px solid ${theme.secondary}`,
                    }}
                  />
                </div>
                <button
                  onClick={handleAddTask}
                  style={{
                    backgroundColor: theme.text,
                    width: "100%",
                    color: theme.buttons,
                    padding: "10px",
                    marginTop: "20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontFamily: theme.fontfamily,
                  }}
                  type="button"
                >
                  {editIndex !== null ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default TaskPage;
