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
    <>
      <div className="bg-[#2e2e2e] sticky flex justify-between items-center w-full h-20 font-Poppins top-0 left-0 right-0 z-50 px-4">
        <Link to="/" className="text-[#fefefe] text-2xl no-underline">
          MentorConnect
        </Link>
        <div className="flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-[#fefefe] text-xl no-underline"
          >
            Dashboard
          </Link>
          {isMentorLogin && (
            <Link
              to="/mentees"
              className="text-[#fefefe] text-xl no-underline"
            >
              My Mentees
            </Link>
          )}
          <Link to="/reports" className="text-[#fefefe] text-xl no-underline">
            Reports
          </Link>
          <IoPersonSharp
            className="text-[#fefefe] cursor-pointer"
            size={24}
            onClick={handleUserIconClick}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
