import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isStudentLogin = localStorage.getItem("studentLogin");
  const isMentorLogin = localStorage.getItem("mentorLogin");

  const handleUserIconClick = () => {
    if (!isStudentLogin && !isMentorLogin) {
      navigate("/sign-up");
    } else if (isStudentLogin || isMentorLogin) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-[10vh] bg-white border border-gray-200 flex justify-between items-center px-4 z-50 ml-[20vw]">
      <Link
        to="/"
        className="text-black text-xl no-underline transition-colors duration-300 hover:text-green-500"
      >
        MentorConnect
      </Link>
      <div className="flex items-center gap-8">
        <Link
          to="/dashboard"
          className="text-black text-xl no-underline transition-colors duration-300 hover:text-green-500"
        >
          Dashboard
        </Link>
        {isMentorLogin && (
          <Link
            to="/mentees"
            className="text-black text-xl no-underline transition-colors duration-300 hover:text-green-500"
          >
            My Mentees
          </Link>
        )}
        <Link
          to="/reports"
          className="text-black text-xl no-underline transition-colors duration-300 hover:text-green-500"
        >
          Reports
        </Link>
        <IoPersonSharp
          className="cursor-pointer hover:text-green-500"
          size={24}
          onClick={handleUserIconClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
