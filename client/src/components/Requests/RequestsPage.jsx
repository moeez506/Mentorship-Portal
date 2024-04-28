import React from "react";

const RequestsPage = () => {
  // Dummy data for static rendering
  const requests = [
    {
      id: 1,
      profilePic: "https://via.placeholder.com/150",
      name: "John Doe",
      email: "john@example.com",
    },
    {
      id: 2,
      profilePic: "https://via.placeholder.com/150",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    {
      id: 3,
      profilePic: "https://via.placeholder.com/150",
      name: "Bob Johnson",
      email: "bob@example.com",
    },
  ];

  return (
    <div className={`bg-[#161616] h-screen flex justify-center items-center`}>
      <div
        className={`container mx-auto p-5 bg-[#2e2e2e] text-white rounded-lg`}
      >
        <h1 className="text-2xl font-bold mb-5">Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
};

const RequestCard = ({ request }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <img
        src={request.profilePic}
        alt="Profile"
        className="w-16 h-16 rounded-full mx-auto"
      />
      <div className="text-center mt-2">
        <h2 className="text-lg font-semibold">{request.name}</h2>
        <p className="text-sm text-gray-500">{request.email}</p>
        <div className="flex justify-center mt-4 space-x-4">
          {/* Icons for actions */}
          <button className="text-blue-500 hover:text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          <button className="text-red-500 hover:text-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;