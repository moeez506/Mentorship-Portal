import React from "react";
import { IoPersonSharp, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
    <div className="fixed top-0 left-0 right-0 h-[10vh] bg-white border border-gray-200 flex justify-end items-center px-4 ml-[20vw] gap-16">
      <div className="flex flex-end justify-center min-w-[350px]">
        <div>
          <div className="fixed">
            <div className="h-full flex item-center justify-center">
            <IoSearch className="text-[#00000052] absolute left-3 top-3" />
            </div>
          </div>
        </div>

        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          className="placeholder:text-[#00000052] bg-[#29affd18] p-2 rounded-[8px] pl-9 w-full font-Eczar"
        />
      </div>
      <IoPersonSharp
        className="cursor-pointer hover:text-green-500"
        size={24}
        onClick={handleUserIconClick}
      />
    </div>
  );
};

export default Navbar;
