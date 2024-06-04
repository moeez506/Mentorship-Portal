/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";
import axios from "axios";
import { server } from "../../apiEndPoint/apiEndPoint";

const TaskPage = () => {
  const { id: roadmapId } = useParams();
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
    fetchRoadmapById();
  }, []);

  const fetchRoadmapById = async () => {
    try {
      const response = await axios.get(`${server}/roadmap/${roadmapId}`);
      setRoadmapData(response.data.data);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
      toast.error(error.response.data.message || "Error fetching roadmaps");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.link || !newTask.dueDate) {
      toast.error("Please enter all fields to create a new task", {
        position: "bottom-center",
      });
      return;
    }

    if (updateTask && editIndex !== null) {
    } else {
      console.log("newTask", newTask);
      try {
        const response = await axios.post(`${server}/roadmap/task/create`, {
          roadmapId: roadmapId,
          task: newTask,
        });
        if (response.data) {
          setRoadmapData(response.data.data);

          toast.success("Task created successfully");
        }
      } catch (error) {
        console.error("Error creating task:", error);
        toast.error(error.response.data.message || "Error creating task");
      }
    }

    setCreatingTask(false);
    setUpdateTask(false);
  };

  const handleEditTask = (id) => {
    setUpdateTask(true);
    setCreatingTask(true);

    const updatingTask = taskData && taskData.find((task) => task.id === id);
    setNewTask(updatingTask);

    if (updatingTask) {
      setEditIndex(taskData.indexOf(updatingTask));
    } else {
      console.error("Task not found in taskData");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = taskData.filter((_, i) => i !== index);
    setTaskData(updatedTasks);
    toast.success("Task Deleted Successfully", { position: "bottom-center" });
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
        <div className="text-[#000000]">{params.row.id}</div>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div className="text-[#000000]">{params.row.title}</div>
      ),
    },
    {
      field: "link",
      headerName: "Link",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div className="text-[#000000]">{params.row.link}</div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div className="text-[#000000]">{params.row.status}</div>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div className="text-[#000000]">{params.row.dueDate}</div>
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
            color="green"
            size={20}
            onClick={() => handleEditTask(params.row.id)}
            style={{ cursor: "pointer" }}
          />
          <MdDelete
            color="red"
            size={20}
            onClick={() => handleDeleteTask(params.row.index)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const rows = [];

  const task1Data = roadmapData?.tasks;
  task1Data &&
    task1Data.forEach((item, index) => {
      rows.push({
        id: item._id,
        title: item.title,
        link: item.link,
        status: item.status,
        dueDate: item.dueDate,
        index: task1Data.indexOf(item),
      });
    });

  return (
    <>
      <Sidebar active={3} />
      <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[10vh]">
        <div className="container w-[80%] mx-auto">
          <br />
          <br />
          <div className="flex flex-row justify-between">
            <h2 className="font-Eczar font-medium text-2xl">
              Complete Roadmap
            </h2>
            <button
              onClick={handleCreateTask}
              className="p-2 rounded-md cursor-pointer font-Eczar bg-[#56C361] text-white shadow-sm shadow-[#00000070]"
            >
              New Task
            </button>
          </div>
          <br />
          <div className="text-[black]">
            <DataGrid
              rows={rows}
              columns={columns}
              autoPageSize
              autoHeight={true}
              sx={{
                "& .MuiDataGrid-columnHeader--sortable": {
                  backgroundColor: "#56C361",
                  color: "#ffffff",
                },
              }}
              componentsProps={{
                columnHeaders: {
                  className: "custom-header-class",
                },
              }}
            />
          </div>
          {(creatingTask || updateTask) && (
            <div
              className={`fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm bg-[#29affd36]`}
            >
              <div
                className={`bg-[white] max-h-[90%] w-[40%] px-16 p-5 rounded-lg ml-5 flex flex-col items-center fixed shadow-md shadow-[#0000006b]`}
              >
                <button
                  className="cursor-pointer absolute top-4 right-4 text-[#1c1c1c] hover:text-[#56C361]"
                  onClick={handleClose}
                >
                  <MdClose size={22} />
                </button>
                <h3 className="text-[#56C361] font-Eczar font-semibold text-[32px] mb-6 text-center">
                  New Task
                </h3>
                <form
                  className="flex flex-col justify-between w-full font-Eczar"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col mb-4">
                    <div className="mb-4 flex items-center">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title of the task"
                        value={newTask.title}
                        onChange={handleChange}
                        className="p-3 rounded-[12px] border border-gray-700 w-full shadow-md shadow-[#66C871] placeholder:text-gray-500 border-none bg-[#56c36129]"
                      />
                    </div>
                    <div className="mb-4 flex items-center">
                      <input
                        type="text"
                        id="link"
                        name="link"
                        placeholder="Link of the task"
                        value={newTask.link}
                        onChange={handleChange}
                        className="p-3 rounded-[12px] border border-gray-700 w-full shadow-md shadow-[#66C871] placeholder:text-gray-500 border-none bg-[#56c36129]"
                      />
                    </div>
                    <div className="mb-4 flex items-center relative">
                      <select
                        id="status"
                        name="status"
                        placeholder="Status"
                        value={newTask.status}
                        onChange={handleChange}
                        className="p-3 rounded-[12px] border border-gray-700 w-full shadow-md shadow-[#66C871] placeholder:text-gray-500 bg-[#56c36129] appearance-none pr-10"
                      >
                        <option value="status">Status</option>
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FiChevronDown className="text-green-500" />
                      </div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        placeholder="dd/mm/yyyy"
                        value={newTask.dueDate}
                        onChange={handleChange}
                        className="p-3 rounded-[12px] border border-gray-700 w-full shadow-md shadow-[##66C871] placeholder:text-gray-500 border-none bg-[#56c36129]"
                      />
                    </div>
                    <button
                      onClick={handleAddTask}
                      className="rounded-md text-[20px] cursor-pointer self-center px-[30px] py-2 mt-4 font-Eczar bg-[#56C361] text-white shadow-sm shadow-[#66C871]"
                      type="button"
                    >
                      {updateTask ? "Update Task" : "Add Task"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskPage;
