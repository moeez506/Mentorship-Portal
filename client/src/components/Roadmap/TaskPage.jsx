import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
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
    setCreatingTask(false);
  };

  const handleEditTask = (index) => {
    setCreatingTask(true);
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
        <div className="flex flex-row justify-center items-center p-3 cursor-pointer gap-5">
          <div onClick={() => handleEditTask(params.row.index)}>
            <MdEdit color="white" size={20} />
          </div>
          <div onClick={() => handleDeleteTask(params.row.index)}>
            <MdDelete color="white" size={20} />
          </div>
        </div>
      ),
    },
  ];

  const rows = [
    // {
    //   id: 1,
    //   title: "What is Software Engineering?",
    //   link: "https://example.com/projects",
    //   status: "pending",
    //   dueDate: "23-12-2024",
    // },
  ];

  taskData &&
    taskData.forEach((item, index) => {
      rows.push({
        id: item.id,
        title: item.title,
        link: item.link,
        status: item.status,
        dueDate: item.dueDate,
        index: index,
      });
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
        {creatingTask && (
          <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm`}
          >
            <div
              className={`bg-[#2e2e2e] max-h-[90%] w-[30%] p-5 rounded-lg ml-5 flex flex-col items-center fixed`}
            >
              <MdClose
                className="cursor-pointer right-2 absolute"
                size={25}
                color="#fefefe"
                onClick={() => setCreatingTask(false)}
              />
              <h3
                className={`text-[#fefefe] font-Poppins text-[20px] font-semibold mb-6 text-center`}
              >
                New Task
              </h3>
              <form
                className="flex flex-col justify-between"
                onSubmit={(e) => e.preventDefault()}
              >
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
          </div>
        )}
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default TaskPage;
