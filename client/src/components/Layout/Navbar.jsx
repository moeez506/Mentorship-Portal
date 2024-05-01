// import React, { useState } from "react";
// import { FaBars } from "react-icons/fa6";
// import { IoClose, IoPersonSharp } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context";
// import Sidebar from "./Sidebar";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { isStudentLoggedIn, isMentorLoggedIn } = useAuth();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleUserIconClick = () => {
//     if (!isStudentLoggedIn && !isMentorLoggedIn) {
//       navigate("/sign-up");
//     } else if (isMentorLoggedIn || isStudentLoggedIn) {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <>
//       <div className="bg-[#2e2e2e] sticky flex justify-between items-center w-full h-20 font-Poppins top-0 left-0 right-0 z-50 px-4">
//         <div className="text-[#fefefe] text-2xl flex items-center cursor-pointer">
//           {isSidebarOpen ? (
//             <IoClose className="mr-2" onClick={toggleSidebar} />
//           ) : (
//             <FaBars className="mr-2" onClick={toggleSidebar} />
//           )}
//           <Link to="/" className="text-[#fefefe] text-2xl no-underline">
//             MentorConnect
//           </Link>
//         </div>
//         <div className="flex items-center gap-8">
//           <Link
//             to="/dashboard"
//             className="text-[#fefefe] text-2xl no-underline"
//           >
//             Dashboard
//           </Link>
//           <Link to="/mentees" className="text-[#fefefe] text-2xl no-underline">
//             My Mentees
//           </Link>
//           <Link to="/reports" className="text-[#fefefe] text-2xl no-underline">
//             Reports
//           </Link>
//           <IoPersonSharp
//             className="text-[#fefefe] cursor-pointer"
//             size={24}
//             onClick={handleUserIconClick}
//           />
//         </div>
//       </div>
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//     </>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { IoPersonSharp } from "react-icons/io5";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const { isStudentLoggedIn, isMentorLoggedIn } = useAuth();

  const handleUserIconClick = () => {
    if (!isStudentLoggedIn && !isMentorLoggedIn) {
      navigate("/sign-up");
    } else if (isMentorLoggedIn || isStudentLoggedIn) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="bg-[#2e2e2e] sticky flex justify-between items-center w-full h-20 font-Poppins top-0 left-0 right-0 z-50 px-4">
        <Link to="/" className="text-[#fefefe] text-2xl no-underline">
          MentorConnect
        </Link>
        <div className="flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-[#fefefe] text-2xl no-underline"
          >
            Dashboard
          </Link>
          <Link to="/mentees" className="text-[#fefefe] text-2xl no-underline">
            My Mentees
          </Link>
          <Link to="/reports" className="text-[#fefefe] text-2xl no-underline">
            Reports
          </Link>
          <IoPersonSharp
            className="text-[#fefefe] cursor-pointer"
            size={24}
            onClick={handleUserIconClick}
          />
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default Navbar;
