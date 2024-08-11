/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../Layout/Sidebar";
import { AuthContext } from "../../context";
import { server } from "../../apiEndPoint/apiEndPoint";
import { Button } from "@material-tailwind/react";
import { MenuItem, Select } from "@mui/material";
import { toast } from "react-hot-toast";
import Loader from "../Layout/Loader";
import { useParams } from "react-router-dom";

const StudentLearning = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});
  const [roadmap, setRoadmap] = useState({});

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get(
          `${server}/roadmap/get-student-roadmaps/${id}`
        );
        setRoadmap(response.data.data);
      } catch (error) {
        console.error("Error Fetching Roadmap:", error);
        toast.error(error.response.data.message || "Error fetching Roadmap");
      }
    };
    fetchRoadmap();
  }, [id]);

  const handleSave = async (taskId) => {
    try {
      const data = {
        roadmapId: roadmap._id,
        taskId,
        task: {
          status: updatedStatus[taskId],
        },
      };

      const response = await axios.patch(`${server}/roadmap/task/update`, data);
      setTasks(response.data);
      toast.success(response.data.message || "Task Updated Successfully");
    } catch (error) {
      console.error("Error updating tasks:", error);
      toast.error(error.response.data.message || "Error Updating Tasks");
    }
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
        <div className="text-[#000000]">
          <Select
            value={updatedStatus[params.row.id] || params.row.status}
            onChange={(e) => {
              const value = e.target.value;
              setUpdatedStatus((prevStatus) => ({
                ...prevStatus,
                [params.row.id]: value,
              }));
            }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </div>
      ),
    },
    // {
    //   field: "save",
    //   headerName: "",
    //   type: "text",
    //   flex: 0.5,
    //   renderCell: (params) => (
    //     <div className="flex h-[80%] justify-center items-center mt-[5%] w-full">
    //       <button
    //         className="bg-[#56C361] p-2 h-[30px] w-[60px] text-white text-[15px] rounded-[5px] flex items-center justify-center"
    //         onClick={() => handleSave(params.row.id)}
    //       >
    //         Save
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  let rows = [];
  if (roadmap?.tasks) {
    rows = roadmap?.tasks.map((task) => ({
      id: task._id,
      title: task.title,
      link: task.link,
      status: task.status,
    }));
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[10vh]">
            <div className="container w-[80%] mx-auto">
              <br />
              <br />
              <div className="flex flex-row justify-between">
                <h2 className="font-Eczar font-medium text-2xl">Task Status</h2>
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
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentLearning;
