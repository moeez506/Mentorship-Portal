/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import profile_pic from "../../assets/Profile Icon.png";
import Sidebar from "../Layout/Sidebar";
import { server } from "../../apiEndPoint/apiEndPoint";
import { AuthContext } from "../../context";
import Loader from "../Layout/Loader";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${server}/mentor/students-request?mentorId=${user._id}`,
        {
          withCredentials: true,
        }

      );
      if (response.data && response.data.requests) {
        setRequests(response.data.requests);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error(error.response.data.message || "Failed to Fetch Requests");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, studentId) => {
    try {
      const response = await axios.patch(`${server}/mentor/handle-request`, {
        mentorId: user._id,
        studentId,
        action: "accept",
      });
      if (response.data.success) {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
        toast.success("Request Accepted Successfully");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error(error.response.data.message || "Failed to accept request");
    }
  };

  const handleRejectRequest = async (requestId, studentId) => {
    try {
      const response = await axios.patch(`${server}/mentor/handle-request`, {
        mentorId: user._id,
        studentId,
        action: "decline",
      });
      if (response.data.success) {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
        toast.success("Request Rejected Successfully");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error(error.response.data.message || "Failed to reject request");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar active={1} />
          <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[10vh]">
            <div className="container w-[80%] mx-auto">
              <br />
              <br />
              <h2 className="font-Eczar font-medium text-2xl">
                Pending Requests
              </h2>
              <br />

              <div className="flex flex-wrap gap-5">
                {requests && requests.length === 0 ? (
                  <div className="font-Eczar text-center w-full text-4xl">
                    <p>No requests found</p>
                  </div>
                ) : (
                  requests.map((request, index) => (
                    <div
                      className="min-w-[202px] min-h-[244px] shadow-md shadow-[#00000040] rounded-[12px] flex flex-col items-center bg-[#29affd13] py-6 px-4"
                      key={index}
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src={profile_pic}
                          alt="Student"
                          className="w-[90px] h-[90px] rounded-full mx-auto mb-4"
                        />
                        <h1 className="text-[18px] font-Eczar font-medium mb-1">
                          {request.firstName} {request.lastName}
                        </h1>
                        <p className="text-sm text-[#666666]">
                          {request.email}
                        </p>
                      </div>
                      <div className="flex justify-center space-x-4 mt-5">
                        <button
                          className="bg-[#56C361] p-2 h-[30px] w-[60px] text-white text-[15px] rounded-[5px] flex items-center justify-center"
                          onClick={() =>
                            handleAcceptRequest(request._id, request._id)
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="bg-[#a81616cf] p-2 h-[30px] w-[60px] text-white text-[15px] rounded-[5px] flex items-center justify-center"
                          onClick={() =>
                            handleRejectRequest(request._id, request._id)
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RequestsPage;
