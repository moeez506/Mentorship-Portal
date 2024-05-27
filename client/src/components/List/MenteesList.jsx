// import React, { useState, useEffect } from "react";
// import { MdDelete } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "../Layout/Sidebar";

// const MenteesList = () => {
//   const mentorEmail = localStorage.getItem("mentorLogin");
//   const mentorData = JSON.parse(localStorage.getItem("mentorData"));
//   const [mentees, setMentees] = useState([]);

//   useEffect(() => {
//     const mentorIndex = mentorData.findIndex(
//       (mentor) => mentor.mentorEmail === mentorEmail
//     );
//     const mentor = mentorIndex !== -1 ? mentorData[mentorIndex] : null;
//     setMentees(mentor?.mentees || []);
//   }, [mentorData, mentorEmail]);

//   const handleDeleteMentee = (index) => {
//     if (mentorData.length === 0) {
//       return;
//     }
//     const updatedMentees = [
//       ...mentees.slice(0, index),
//       ...mentees.slice(index + 1),
//     ];
//     mentorData.forEach((mentor) => {
//       if (mentor.mentorEmail === mentorEmail) {
//         mentor.mentees = updatedMentees;
//         localStorage.setItem("mentorData", JSON.stringify(mentorData));
//         toast.success("Mentee Removed");
//         setMentees(updatedMentees);
//       }
//     });
//   };

//   return (
//     <div className="w-full flex flex-row bg-[#161616]">
//       <Sidebar />
//       <div
//         className={`bg-[#161616] min-h-full w-full font-Poppins flex items-start flex-col px-10 pt-5`}
//       >
//         <h3 className="text-white text-2xl font-Poppins">Mentees</h3>
//         <div className="w-full flex justify-center pt-2">
//           <div className="w-[97%]">
//             <div className="flex flex-wrap gap-9">
//               {mentees.map((mentee, index) => (
//                 <div
//                   className="w-[350px] min-h-[380px] border-gray-700 border-[3px] shadow-[#0000006c] shadow-md rounded-[35px] flex flex-col items-center justify-between bg-[#2e2e2e] text-white py-10 px-8"
//                   key={index}
//                 >
//                   <div className="flex flex-col items-center">
//                     <img
//                       src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
//                       alt="Mentee"
//                       className="w-40 h-40 rounded-full mx-auto mb-4"
//                     />
//                     <h1 className="text-2xl font-medium mb-1">
//                       {mentee.studentFirstName} {mentee.studentLastName}
//                     </h1>
//                     <p className="text-sm">Email: {mentee.studentEmail}</p>
//                   </div>
//                   <div className="flex justify-center space-x-5 mt-5">
//                     <button
//                       className="bg-[#fefefe] p-2 h-9 min-w-[80px] text-black rounded-md duration-300 hover:bg-red-800 hover:text-white flex items-center justify-center"
//                       onClick={() => handleDeleteMentee(index)}
//                     >
//                       <MdDelete size={18} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="bottom-center" />
//     </div>
//   );
// };

// export default MenteesList;

import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";

const MenteesList = () => {
  const mentorEmail = localStorage.getItem("mentorLogin");
  const mentorData = JSON.parse(localStorage.getItem("mentorData"));
  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    const mentorIndex = mentorData.findIndex(
      (mentor) => mentor.mentorEmail === mentorEmail
    );
    const mentor = mentorIndex !== -1 ? mentorData[mentorIndex] : null;
    setMentees(mentor?.mentees || []);
  }, [mentorData, mentorEmail]);

  const handleDeleteMentee = (index) => {
    if (mentorData.length === 0) {
      return;
    }
    const updatedMentees = [
      ...mentees.slice(0, index),
      ...mentees.slice(index + 1),
    ];
    mentorData.forEach((mentor) => {
      if (mentor.mentorEmail === mentorEmail) {
        mentor.mentees = updatedMentees;
        localStorage.setItem("mentorData", JSON.stringify(mentorData));
        toast.success("Mentee Removed");
        setMentees(updatedMentees);
      }
    });
  };

  return (
    <div className="w-full flex flex-row min-h-screen">
      <Sidebar />
      <div
        className={`min-h-full w-full font-Poppins flex items-start flex-col px-10 pt-5`}
        style={{
          marginLeft: "20vw",
          marginTop: "10vh",
          backgroundColor: "#f0f4f8",
        }}
      >
        <h3 className="text-black text-2xl font-Poppins">Mentees</h3>
        <div className="w-full flex justify-center pt-2">
          <div className="w-[97%]">
            <div className="grid grid-cols-3 gap-6">
              {mentees.map((mentee, index) => (
                <div
                  className="w-[300px] min-h-[350px] border-gray-300 border-[1px] shadow-sm rounded-[10px] flex flex-col items-center justify-between bg-white text-black py-6 px-4"
                  key={index}
                >
                  <div className="flex flex-col items-center">
                    <img
                      src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                      alt="Mentee"
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h1 className="text-xl font-medium mb-1">
                      {mentee.studentFirstName} {mentee.studentLastName}
                    </h1>
                    <p className="text-sm text-gray-600">
                      Email: {mentee.studentEmail}
                    </p>
                  </div>
                  <div className="flex justify-center space-x-3 mt-5">
                    <button
                      className="bg-red-500 p-2 h-9 min-w-[80px] text-white rounded-md duration-300 hover:bg-red-700 flex items-center justify-center"
                      onClick={() => handleDeleteMentee(index)}
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default MenteesList;
