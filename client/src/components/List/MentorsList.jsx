// import React, { useState } from "react";
// import { IoMdPersonAdd } from "react-icons/io";
// import { FiEye } from "react-icons/fi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MentorsList = () => {
//   const mentorData = JSON.parse(localStorage.getItem("mentorData")) || [];
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedMentor, setSelectedMentor] = useState(null);

//   const handleAddMentor = (mentor) => {
//     const requestData = JSON.parse(localStorage.getItem("requestData")) || [];

//     const existingRequest = requestData.find((req) => req.id === mentor.id);
//     if (existingRequest) {
//       toast.error("Request Already Sent!");
//       return;
//     }

//     requestData.push(mentor);
//     localStorage.setItem("requestData", JSON.stringify(requestData));
//     toast.success("Request Sent!");
//   };

//   const handleViewDetails = (mentor) => {
//     const mentorDetails = JSON.parse(localStorage.getItem("mentorData")) || [];
//     const selectedMentorDetails = mentorDetails.find(
//       (m) => m.mentorEmail === mentor.mentorEmail
//     );
//     setSelectedMentor(selectedMentorDetails);
//     setShowPopup(true);
//   };

//   return (
//     <div className="bg-[#161616] min-h-screen font-Poppins flex items-end flex-col px-10 pt-5">
//       <h3 className="text-white text-2xl font-Poppins">Mentors</h3>
//       <div className="w-full flex justify-center pt-2">
//         <div className="w-[97%]">
//           <div className="flex flex-wrap gap-9">
//             {mentorData.map((mentor, index) => (
//               <div
//                 className="w-[350px] min-h-[380px] border-gray-700 border-[3px] shadow-[#0000006c] shadow-md rounded-[35px] flex flex-col items-center justify-between bg-[#2e2e2e] text-white py-10 px-8"
//                 key={index}
//               >
//                 <div className="flex flex-col items-center">
//                   <img
//                     src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
//                     alt="Mentor"
//                     className="w-40 h-40 rounded-full mx-auto mb-4"
//                   />
//                   <h1 className="text-2xl font-medium mb-1">
//                     {mentor.mentorFirstName} {mentor.mentorLastName}
//                   </h1>
//                   <p className="text-sm">Email: {mentor.mentorEmail}</p>
//                 </div>
//                 <div className="flex justify-center space-x-5 mt-5">
//                   <button
//                     className="bg-[#fefefe] p-2 h-9 min-w-[80px] text-black rounded-md duration-300 hover:bg-blue-800 flex items-center justify-center"
//                     onClick={() => handleAddMentor(mentor)}
//                   >
//                     <IoMdPersonAdd size={18} />
//                   </button>
//                   <button
//                     className="bg-[#fefefe] p-2 h-9 min-w-[80px] text-black rounded-md duration-300 hover:bg-red-800 hover:text-white flex items-center justify-center"
//                     onClick={() => handleViewDetails(mentor)}
//                   >
//                     <FiEye size={18} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {showPopup && selectedMentor && (
//         <div className="fixed top-0 left-0 w-full h-full bg-[#161616] bg-opacity-90 flex justify-center items-center z-50">
//           <div className="bg-[#fff3] text-white p-8 rounded-lg">
//             <h2 className="text-3xl font-bold mb-4">
//               {selectedMentor.mentorFirstName} {selectedMentor.mentorLastName}
//             </h2>
//             <p className="text-lg">
//               Experience: {selectedMentor.mentorExperience} Years
//             </p>
//             <p className="text-lg">Company: {selectedMentor.mentorCompany}</p>
//             <p className="text-lg">Date of Birth: {selectedMentor.mentorDob}</p>
//             <p className="text-lg">Gender: {selectedMentor.mentorGender}</p>
//             <p className="text-lg">Email: {selectedMentor.mentorEmail}</p>
//             <p className="text-lg">Semester: {selectedMentor.mentorSemester}</p>
//             <p className="text-lg">Phone: {selectedMentor.mentorPhoneNumber}</p>
//             <p className="text-lg">Shift: {selectedMentor.mentorShift}</p>
//             <button
//               className="mt-6 bg-red-500 text-white px-6 py-3 rounded-md"
//               onClick={() => setShowPopup(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//       <ToastContainer position="bottom-left" />
//     </div>
//   );
// };

// export default MentorsList;

import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { FiEye } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MentorsList = () => {
  const mentorData = JSON.parse(localStorage.getItem("mentorData")) || [];
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const handleAddMentor = (mentor) => {
    const requestData = JSON.parse(localStorage.getItem("requestData")) || [];

    const existingRequest = requestData.find((req) => req.id === mentor.id);
    if (existingRequest) {
      toast.error("Request Already Sent!");
      return;
    }

    requestData.push(mentor);
    localStorage.setItem("requestData", JSON.stringify(requestData));
    toast.success("Request Sent!");
  };

  const handleViewDetails = (mentor) => {
    const mentorDetails = JSON.parse(localStorage.getItem("mentorData")) || [];
    const selectedMentorDetails = mentorDetails.find(
      (m) => m.mentorEmail === mentor.mentorEmail
    );
    setSelectedMentor(selectedMentorDetails);
    setShowPopup(true);
  };

  return (
    <div className="bg-[#161616] min-h-screen font-Poppins flex items-end flex-col px-10 pt-5">
      <h3 className="text-white text-2xl font-Poppins">Mentors</h3>
      <div className="w-full flex justify-center pt-2">
        <div className="w-[97%]">
          <div className="flex flex-wrap gap-9">
            {mentorData.map((mentor, index) => (
              <div
                className="w-[350px] min-h-[380px] border-gray-700 border-[3px] shadow-[#0000006c] shadow-md rounded-[35px] flex flex-col items-center justify-between bg-[#2e2e2e] text-white py-10 px-8"
                key={index}
              >
                <div className="flex flex-col items-center">
                  <img
                    src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                    alt="Mentor"
                    className="w-40 h-40 rounded-full mx-auto mb-4"
                  />
                  <h1 className="text-2xl font-medium mb-1">
                    {mentor.mentorFirstName} {mentor.mentorLastName}
                  </h1>
                  <p className="text-sm">Email: {mentor.mentorEmail}</p>
                </div>
                <div className="flex justify-center space-x-5 mt-5">
                  <button
                    className="bg-[#fefefe] p-2 h-9 min-w-[80px] text-black rounded-md duration-300 hover:bg-blue-800 flex items-center justify-center"
                    onClick={() => handleAddMentor(mentor)}
                  >
                    <IoMdPersonAdd size={18} />
                  </button>
                  <button
                    className="bg-[#fefefe] p-2 h-9 min-w-[80px] text-black rounded-md duration-300 hover:bg-red-800 hover:text-white flex items-center justify-center"
                    onClick={() => handleViewDetails(mentor)}
                  >
                    <FiEye size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && selectedMentor && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#161616] bg-opacity-90 flex justify-center items-center z-50">
          <div className="bg-[#fff3] text-white p-8 rounded-lg flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">
              {selectedMentor.mentorFirstName} {selectedMentor.mentorLastName}
            </h2>
            <p className="text-lg">
              <b>Experience:</b> {selectedMentor.mentorExperience} Years
            </p>
            <p className="text-lg">
              <b>Company:</b> {selectedMentor.mentorCompany}
            </p>
            <p className="text-lg">
              <b>Date of Birth:</b> {selectedMentor.mentorDob}
            </p>
            <p className="text-lg">
              <b>Gender</b>: {selectedMentor.mentorGender}
            </p>
            <p className="text-lg">
              <b>Email:</b> {selectedMentor.mentorEmail}
            </p>
            <p className="text-lg">
              <b>Semester:</b> {selectedMentor.mentorSemester}
            </p>
            <p className="text-lg">
              <b>Phone:</b> {selectedMentor.mentorPhoneNumber}
            </p>
            <p className="text-lg">
              <b>Shift:</b> {selectedMentor.mentorShift}
            </p>
            <button
              className="mt-6 bg-red-500 text-white px-6 py-3 rounded-md"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default MentorsList;