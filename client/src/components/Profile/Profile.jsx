import React, { useContext } from "react";
import Sidebar from "../Layout/Sidebar";
import { AuthContext } from "../../context";
import Loader from "../Layout/Loader";

function UserProfile() {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-row bg-[white] p-5 pl-[20vw] pt-[15vh]">
          <Sidebar />
          <div className="container w-[80%] mx-auto">
            <h2 className="font-Eczar font-medium text-4xl">Profile</h2>
            <br />
            <br />
            <div className="max-w-6xl w-full bg-[#E9F5FE] p-12 rounded-xl shadow-lg mt-[8vh]">
              <div className="flex">
                <div className="w-1/3 flex flex-col items-center mt-10">
                  <img
                    src={
                      user.profilePic ||
                      "https://thumbs.dreamstime.com/b/user-profile-avatar-icon-134114292.jpg"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full mb-6"
                  />
                  <div className="text-center">
                    <div className="flex flex-row justify-center">
                      <p className="mb-2 mr-2 font-semibold text-blue-600 text-2xl font-Eczar">
                        {user.firstName}
                      </p>
                      <p className="mb-2 font-semibold text-blue-600 text-2xl font-Eczar">
                        {user.lastName}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      {/* <p className="mr-2 font-semibold text-blue-600 text-xl font-Eczar">
                        Email:{" "}
                      </p> */}
                      <p className="mb-2 text-lg font-Eczar">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-6 text-gray-700 text-xl font-Eczar">
                  <div>
                    <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                      Date of Birth
                    </p>
                    <p className="mb-2 text-xl font-Eczar">
                      {user.dob.slice(0, 10)}
                    </p>
                    <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                      Gender
                    </p>
                    <p className="mb-2 text-xl font-Eczar">{user.gender}</p>
                    <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                      Experience
                    </p>
                    <p className="mb-2 text-xl font-Eczar">
                      {user.experience || "N/A"}
                    </p>
                    <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                      Phone Number
                    </p>
                    <p className="mb-2 text-xl font-Eczar">
                      {user.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                      Company
                    </p>
                    <p className="mb-2 text-xl font-Eczar">
                      {user.company || "N/A"}
                    </p>
                    <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                      Program
                    </p>
                    <p className="mb-2 text-xl font-Eczar">{user.program}</p>
                    <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                      Semester
                    </p>
                    <p className="mb-2 text-xl font-Eczar">{user.semester}</p>
                    <p className="font-semibold text-blue-600 text-2xl font-Eczar">
                      Shift
                    </p>
                    <p className="mb-2 text-xl font-Eczar">{user.shift}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
