import React, { useState } from "react";

function UserProfile() {
  const [user, setUser] = useState({
    profilePic:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    firstName: "Haris",
    lastName: "Baig",
    experience: "2",
    company: "Freelance",
    dob: "01/20/2004",
    gender: "male",
    email: "harisbaig7081@gmail.com",
    password: "seeker47",
    semester: "2nd",
    phoneNumber: "03217207623",
    shift: "Evening",
    program: "BSCS",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Data saved:", user);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[#161616] text-white`}
    >
      <div className={`max-w-4xl w-[100%] bg-[#2e2e2e] p-8 rounded-lg`}>
        <div className="mb-8 flex justify-center">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.keys(user).map(
            (key) =>
              key !== "profilePic" && (
                <div key={key} className="mb-4">
                  <label className="block mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </label>
                  <input
                    type="text"
                    className={`w-[100%] bg-[#d3d3d3] rounded-md px-1 py-2 text-black`}
                    name={key}
                    value={user[key]}
                    onChange={handleChange}
                  />
                </div>
              )
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
