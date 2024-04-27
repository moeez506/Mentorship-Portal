import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    </div> */}
      <div
        className={`bg-[#161616] fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden font-Poppins`}
      >
        {taskData.length === 0 && !creatingTask ? (
          <button
            onClick={handleCreateTask}
            className={`bg-[#fefefe] text-[black] p-2 rounded-md cursor-pointer font-Poppins`}
          >
            Create Task
          </button>
        ) : (
          <>
            <div
              className={`bg-[#161616] max-h-[80%] w-[60%] p-5 rounded-lg flex flex-col overflow-y-auto no-scroll`}
            >
              {taskData.map((task, index) => (
                <div
                  key={index}
                  className={`mb-4 border-1 border-[#000000] rounded-10 p-2 bg-[#2e2e2e]`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`text-[#fefefe]`}>{task.title}</h3>
                    <div>
                      <button
                        onClick={() => handleEditTask(index)}
                        className={`bg-[#fefefe] text-[black] p-1 rounded-lg cursor-pointer mr-1 transition duration-300 hover:bg-[#dedede]`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className={`bg-[#ff0000] text-[black] p-1 rounded-lg cursor-pointer transition duration-300 hover:bg-[#8b0000]`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className={`text-[#fefefe]`}>
                    <strong>Link:</strong> {task.link}
                  </p>
                  <p className={`text-[#fefefe]`}>
                    <strong>Status:</strong> {task.status}
                  </p>
                  <p className={`text-[#fefefe]`}>
                    <strong>Due Date:</strong> {task.dueDate}
                  </p>
                </div>
              ))}
            </div>
            <div
              className={`bg-[#2e2e2e] max-h-[90%] w-[30%] p-5 rounded-lg ml-5 flex flex-col`}
            >
              <form className="flex flex-col justify-between" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col mb-4">
                  <div className="mb-2 flex items-center">
                    <label className={`text-[#fefefe] min-w-[45%] text-[16px]`}>
                      Title:
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newTask.title}
                      onChange={handleChange}
                      className={`p-3 rounded border border-[#000000] min-w-[50%] w-[100%]`}
                    />
                  </div>
                  <div className="mb-2 flex items-center">
                    <label className={`text-[#fefefe] min-w-[45%] text-[16px]`}>
                      Link:
                    </label>
                    <input
                      type="text"
                      name="link"
                      value={newTask.link}
                      onChange={handleChange}
                      className={`p-3 rounded border border-[#000000] min-w-[50%] w-[100%]`}
                    />
                  </div>
                  <div className="mb-2 flex items-center">
                    <label className={`text-[#fefefe] min-w-[45%] text-[16px]`}>
                      Status:
                    </label>
                    <select
                      name="status"
                      value={newTask.status}
                      onChange={handleChange}
                      className={`p-3 rounded border border-[#000000] min-w-[50%] w-[100%]`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-2 flex items-center">
                    <label className={`text-[#fefefe] min-w-[45%] text-[16px]`}>
                      Due Date:
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleChange}
                      className={`p-3 rounded border border-[#000000] min-w-[50%] w-[100%]`}
                    />
                  </div>
                  <button
                    onClick={handleAddTask}
                    className={`bg-[#fefefe] w-full text-[black] p-2 mt-4 rounded-md cursor-pointer font-Poppins`}
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
    </>
  );
};

export default TaskPage;
