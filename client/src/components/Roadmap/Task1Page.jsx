import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task1Page = () => {
  const { id } = useParams();
  const [roadmapData, setRoadmapData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    link: "",
    status: "pending",
    dueDate: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [creatingTask, setCreatingTask] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);

  useEffect(() => {
    const storedTaskData = JSON.parse(localStorage.getItem("taskData"));
    if (storedTaskData) {
      setTaskData(storedTaskData);
    }

    const storedRoadmapData = JSON.parse(localStorage.getItem("roadmapData"));
    if (storedRoadmapData) {
      setRoadmapData(storedRoadmapData);
    }
    const roadmapItem1 =
      roadmapData && roadmapData.find((item) => item.id === id);

    const roadmap1Tasks = roadmapItem1 && roadmapItem1.tasks;
    if (roadmap1Tasks) {
      setTaskData(roadmap1Tasks);
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
      toast.error("Please enter a all fields to create a new task", {
        position: "bottom-left",
      });
      return;
    }

    const updatedRoadmapData = roadmapData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          tasks: [...item.tasks, newTask],
        };
      }
      return item;
    });

    setRoadmapData(updatedRoadmapData);
    localStorage.setItem("roadmapData", JSON.stringify(updatedRoadmapData));
    toast.success("Task created successfully", { position: "bottom-left" });
    setCreatingTask(false);
  };

  const handleEditTask = (id) => {
    setUpdateTask(true);
    setCreatingTask(true);

    const updatingTask = taskData && taskData.find((task) => task.id === id);
    setNewTask(updatingTask);
    console.log(newTask);

    const taskToUpdate = taskData && taskData.find((item) => item.id === id);
    console.log("🚀 ~ handleEditTask ~ taskToUpdate:", taskToUpdate);

    if (taskToUpdate) {
      Object.assign(taskToUpdate, updatingTask);

      localStorage.setItem("roadmapData", JSON.stringify(roadmapData));
    } else {
      console.error("Task not found in roadmapData");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = taskData.filter((_, i) => i !== index);
    setTaskData(updatedTasks);
    localStorage.setItem("taskData", JSON.stringify(updatedTasks));
    toast.success("Task Deleted Successfully", { position: "bottom-left" });
  };

  const handleCreateTask = () => {
    setCreatingTask(true);
    setNewTask({
      title: "",
      link: "",
      status: "pending",
      dueDate: "",
      id: Date.now(),
    });
    setEditIndex(null);
  };

  const handleClose = () => {
    setCreatingTask(false);
    setUpdateTask(false);
    setNewTask({
      title: "",
      link: "",
      status: "pending",
      dueDate: "",
      id: Date.now(),
    });
    setEditIndex(null);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 30,
      flex: 0.5,
      renderCell: (params) => (
        <div className="text-[#fefefe]">{params.row.id}</div>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div className="text-[#fefefe]">{params.row.title}</div>
      ),
    },
    {
      field: "link",
      headerName: "Link",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div className="text-[#fefefe]">{params.row.link}</div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div className="text-[#fefefe]">{params.row.status}</div>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div className="text-[#fefefe]">{params.row.dueDate}</div>
      ),
    },
    {
      field: "edit",
      headerName: "",
      type: "text",
      flex: 0.5,
      renderCell: (params) => (
        <div className="flex flex-row justify-center items-center p-3 gap-5">
          <MdEdit
            color="white"
            size={20}
            // onClick={() => handleEditTask(params.row.index)}
            onClick={() => handleEditTask(params.row.id)}
            style={{ cursor: "pointer" }}
          />
          <MdDelete
            color="white"
            size={20}
            onClick={() => handleDeleteTask(params.row.index)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const rows = [];

  roadmapData.map((item) => {
    if (item.id === id) {
      console.log("🚀 ~ Task1Page ~ task1Data:", item.tasks);
      const task1Data = item.tasks;
      task1Data &&
        task1Data.forEach((item) => {
          rows.push({
            id: item.id,
            title: item.title,
            link: item.link,
            status: item.status,
            dueDate: item.dueDate,
            index: task1Data.indexOf(item),
          });
        });
    }
    return item;
  });

  return (
    <>
      <div
        className={`bg-[#161616] min-h-[100vh] font-Poppins flex items-end flex-col p-10`}
      >
        <button
          onClick={handleCreateTask}
          className={`bg-[#fefefe] text-[#000000] p-2 rounded-md cursor-pointer font-Poppins`}
        >
          Create Task
        </button>
        <div className="w-full flex justify-center pt-5">
          <div className="w-[97%]">
            <h3 className="text-[22px] text-[white] font-Poppins pb-2">
              Complete Roadmap
            </h3>
            <div className="bg-[#2e2e34] rounded w-full">
              <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize
                autoHeight={true}
              />
            </div>
          </div>
        </div>
        {(creatingTask || updateTask) && (
          <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm`}
          >
            <div
              className={`bg-[#2e2e2e] max-h-[90%] w-[40%] p-5 rounded-lg ml-5 flex flex-col items-center fixed`}
            >
              <button
                className="cursor-pointer absolute top-4 right-4 text-gray-300 hover:text-white"
                onClick={handleClose}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <h3 className="text-white font-semibold text-2xl mb-6 text-center">
                New Task
              </h3>
              <form
                className="flex flex-col justify-between w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col mb-4">
                  <div className="mb-4 flex items-center">
                    <label
                      htmlFor="title"
                      className="text-white text-sm w-[20%]"
                    >
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newTask.title}
                      onChange={handleChange}
                      className="p-3 rounded border border-gray-700 w-full"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label
                      htmlFor="link"
                      className="text-white text-sm w-[20%]"
                    >
                      Link:
                    </label>
                    <input
                      type="text"
                      id="link"
                      name="link"
                      value={newTask.link}
                      onChange={handleChange}
                      className="p-3 rounded border border-gray-700 w-full"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label
                      htmlFor="status"
                      className="text-white text-sm w-[20%]"
                    >
                      Status:
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={newTask.status}
                      onChange={handleChange}
                      className="p-3 rounded border border-gray-700 w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-4 flex items-center">
                    <label
                      htmlFor="dueDate"
                      className="text-white text-sm w-[20%]"
                    >
                      Due Date:
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleChange}
                      className="p-3 rounded border border-gray-700 w-full"
                    />
                  </div>
                  <button
                    onClick={handleAddTask}
                    className="bg-gray-100 text-black p-2 rounded-md cursor-pointer self-center w-[20%]"
                    type="button"
                  >
                    {updateTask ? "Update Task" : "Add Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default Task1Page;
