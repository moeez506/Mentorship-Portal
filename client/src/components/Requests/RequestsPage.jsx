// import React, { useState, useEffect } from "react";
// import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "../Layout/Sidebar";

// const RequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const mentorEmail = localStorage.getItem("mentorLogin");
//   const mentorData = JSON.parse(localStorage.getItem("mentorData")) || [];
//   const mentor = mentorData.find(
//     (mentor) => mentor.mentorEmail === mentorEmail
//   );
//   const mentorId = mentor ? mentor.id : null;

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const fetchData = () => {
//     const requestData = JSON.parse(localStorage.getItem("requestData")) || [];
//     const mentorRequests = requestData.filter(
//       (request) => request.mentorId === mentorId
//     );
//     setRequests(mentorRequests);
//   };

//   const handleAcceptRequest = (
//     studentId,
//     studentFirstName,
//     studentLastName,
//     studentEmail
//   ) => {
//     if (mentor) {
//       const mentorIndex = mentorData.findIndex((m) => m.id === mentorId);
//       mentorData[mentorIndex].mentees.push({
//         studentId,
//         studentFirstName,
//         studentLastName,
//         studentEmail,
//       });
//       localStorage.setItem("mentorData", JSON.stringify(mentorData));
//     }

//     const updatedRequests = requests.filter(
//       (request) => request.studentId !== studentId
//     );
//     localStorage.setItem("requestData", JSON.stringify(updatedRequests));
//     setRequests(updatedRequests);

//     toast.success("Request Accepted");
//   };

//   const handleRejectRequest = (studentId) => {
//     const updatedRequests = requests.filter(
//       (request) => request.studentId !== studentId
//     );
//     localStorage.setItem("requestData", JSON.stringify(updatedRequests));
//     setRequests(updatedRequests);

//     toast.error("Request Rejected");
//   };

//   return (
//     <>
//       <div className="w-full flex flex-row bg-[#161616]">
//         <Sidebar active={1} />
//         <div
//           className={`min-h-full w-full font-Poppins flex items-start flex-col px-10 pt-5`}
//           style={{ marginLeft: "20vw", marginTop: "10vh", position: "fixed" }}
//         >
//           <h3 className="text-black text-2xl font-Poppins">Requests</h3>
//           <div className="w-full flex justify-center pt-2">
//             <div className="w-[97%]">
//               <div className="flex flex-wrap gap-9">
//                 {requests.map((request, index) => (
//                   <div
//                     className="request_card w-[350px] min-h-[380px] border-gray-700 border-[3px] shadow-[#0000006c] shadow-md rounded-[35px] flex flex-col items-center justify-between bg-[#29b0fd]/[.5] text-black py-10 px-8"
//                     key={index}
//                   >
//                     <div className="flex flex-col items-center">
//                       <img
//                         src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
//                         alt="Mentor"
//                         className="w-40 h-40 rounded-full mx-auto mb-4"
//                       />
//                       <h1 className="text-2xl font-medium mb-1">
//                         {request.studentFirstName} {request.studentLastName}
//                       </h1>
//                       <p className="text-sm">Email: {request.studentEmail}</p>
//                     </div>
//                     <div className="flex justify-center space-x-5 mt-5">
//                       <button
//                         className="bg-[#56c361]/[.90] p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-green-800 flex items-center justify-center"
//                         onClick={() =>
//                           handleAcceptRequest(
//                             request.studentId,
//                             request.studentFirstName,
//                             request.studentLastName,
//                             request.studentEmail
//                           )
//                         }
//                       >
//                         <FaRegThumbsUp size={18} />
//                       </button>
//                       <button
//                         className="bg-[#a81616]/[.70] p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-red-800 hover:text-white flex items-center justify-center"
//                         onClick={() => handleRejectRequest(request.studentId)}
//                       >
//                         <FaRegThumbsDown size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <ToastContainer position="bottom-center" />
//       </div>
//     </>
//   );
// };

// export default RequestsPage;

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile_pic from "../../assets/Profile Icon.png";
import Sidebar from "../Layout/Sidebar";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const mentorEmail = localStorage.getItem("mentorLogin");
  const mentorData = JSON.parse(localStorage.getItem("mentorData")) || [];
  const mentor = mentorData.find(
    (mentor) => mentor.mentorEmail === mentorEmail
  );
  const mentorId = mentor ? mentor.id : null;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    const requestData = JSON.parse(localStorage.getItem("requestData")) || [];
    const mentorRequests = requestData.filter(
      (request) => request.mentorId === mentorId
    );
    setRequests(mentorRequests);
  };

  const handleAcceptRequest = (
    studentId,
    studentFirstName,
    studentLastName,
    studentEmail
  ) => {
    if (mentor) {
      const mentorIndex = mentorData.findIndex((m) => m.id === mentorId);
      mentorData[mentorIndex].mentees.push({
        studentId,
        studentFirstName,
        studentLastName,
        studentEmail,
      });
      localStorage.setItem("mentorData", JSON.stringify(mentorData));
    }

    const updatedRequests = requests.filter(
      (request) => request.studentId !== studentId
    );
    localStorage.setItem("requestData", JSON.stringify(updatedRequests));
    setRequests(updatedRequests);

    toast.success("Request Accepted");
  };

  const handleRejectRequest = (studentId) => {
    const updatedRequests = requests.filter(
      (request) => request.studentId !== studentId
    );
    localStorage.setItem("requestData", JSON.stringify(updatedRequests));
    setRequests(updatedRequests);

    toast.error("Request Rejected");
  };

  return (
    <>
      <Sidebar active={1} />
      <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[10vh]">
        <div className="container w-[80%] mx-auto">
          <br />
          <br />
          <h2 className="font-Eczar font-medium text-2xl">Pending Requests</h2>
          <br />

          <div className="flex flex-wrap gap-5">
          {requests.map((request, index) => (
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
                        {request.studentFirstName} {request.studentLastName}
                      </h1>
                      <p className="text-sm text-[#666666]">
                        {request.studentEmail}
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4 mt-5">
                      <button
                        className="bg-[#56C361] p-2 h-[30px] w-[60px] text-white text-[15px] rounded-[5px] flex items-center justify-center"
                        onClick={() =>
                          handleAcceptRequest(
                            request.studentId,
                            request.studentFirstName,
                            request.studentLastName,
                            request.studentEmail
                          )
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-[#a81616cf] p-2 h-[30px] w-[60px] text-white text-[15px] rounded-[5px] flex items-center justify-center"
                        onClick={() => handleRejectRequest(request.studentId)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <ToastContainer position="bottom-center" />
      </div>
    </>
  );
};

export default RequestsPage;
