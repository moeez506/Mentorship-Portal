import React, { useState, useEffect, useRef, useContext } from "react";
import Sidebar from "../Layout/Sidebar";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { FaSquarePlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import io from "socket.io-client";
import { AuthContext } from "../../context";
import axios from "axios";
import { server } from "../../apiEndPoint/apiEndPoint";

const socket = io("http://localhost:5000");

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [selectedUser, setSelectedUser] = useState(null);
  const messageEndRef = useRef(null);

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const studentResponse = await axios.get(
          `${server}/mentor/all-students`
        );
        const mentorResponse = await axios.get(`${server}/student/all-mentors`);

        const combinedUsers = [
          ...studentResponse.data.students,
          ...mentorResponse.data.mentors,
        ];

        setUsers(combinedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${server}/chat/history/${user._id}/${selectedUser._id}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedUser]);

  const sendMessage = () => {
    if (input.trim() && selectedUser) {
      const newMessage = {
        sender: { id: user._id, role: user.role },
        receiver: { id: selectedUser._id, role: selectedUser.role },
        content: input,
      };
      socket.emit("sendMessage", newMessage);
      setInput(""); // Clear input after sending
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Sidebar active={5} />
      <div className="w-full flex flex-row bg-white p-5 pl-[20vw] pt-[7vh]">
        <div className="container w-[80%] mx-auto">
          <br />
          <br />
          <h2 className="font-Eczar font-medium text-2xl">All Messages</h2>
          <br />
          <div className="flex shadow-lg h-[79vh] rounded-lg overflow-hidden space-x-4">
            <div className="w-1/3 bg-blur-50 shadow-lg rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-300 flex items-center bg-blue-50">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search chat"
                    className="w-[95%] px-3 py-2 border border-gray-300 rounded-xl pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Handle search input change
                  />
                  <FiSearch className="absolute top-3 left-3 text-gray-500" />
                </div>
                <FaSquarePlus className="text-[#56C361] text-4xl" />
              </div>
              <div className="p-4 overflow-auto h-[70vh] bg-blue-50">
                {filteredUsers.map((user, index) => (
                  <div
                    className="flex items-center p-3 hover:bg-gray-200 cursor-pointer"
                    key={user._id || index}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="relative">
                      <img
                        src={
                          user.profilePicture ||
                          "https://media.licdn.com/dms/image/D4D03AQEoUlbVH8FU_w/profile-displayphoto-shrink_800_800/0/1716205933498?e=1722470400&v=beta&t=6xh-WMI97RB1ctXiuO0ywahyguuWhFfDVTykyCxKwO0"
                        }
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
                    </div>
                    <div className="ml-3">
                      <p className="font-bold">{user.firstName || "Unknown"}</p>
                      <p className="text-gray-500 text-sm">
                        {user.lastMessage || "Hey! Let's Chat?"}
                      </p>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      {user.lastActive || "10:32am"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-2/3 flex flex-col bg-blue-50 shadow-lg rounded-lg border border-gray-200">
              <div className="flex items-center justify-between p-4 border-b border-gray-300">
                {selectedUser ? (
                  <>
                    <div className="flex items-center">
                      <img
                        src={
                          selectedUser.profilePicture ||
                          "https://media.licdn.com/dms/image/D4D03AQEoUlbVH8FU_w/profile-displayphoto-shrink_800_800/0/1716205933498?e=1722470400&v=beta&t=6xh-WMI97RB1ctXiuO0ywahyguuWhFfDVTykyCxKwO0"
                        }
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <h2 className="font-bold text-lg">
                          {selectedUser.firstName || "Unknown"}
                        </h2>
                        <p className="text-sm text-gray-500">Typing...</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MdClose className="w-6 h-6" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FiMoreHorizontal className="w-6 h-6" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500">
                    Select a user to start chat
                  </div>
                )}
              </div>
              <div className="flex-grow overflow-auto p-4">
                <div className="flex flex-col space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-2 ${
                        msg.sender.id === user._id
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      {/* <img
                        src={
                          msg.sender.id === user._id
                            ? user.profilePicture
                            : selectedUser.profilePicture
                        }
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      /> */}
                      <div
                        className={`p-4 max-w-xs shadow-md border border-gray-300 rounded-[20px] ${
                          msg.sender.id === user._id
                            ? "bg-[#56C361] text-black"
                            : "bg-[#29B0FD] text-white"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              </div>
              {selectedUser && (
                <div className="p-4 border-t border-gray-300">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Ask a question..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-full"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") sendMessage();
                      }}
                    />
                    <button
                      className="ml-2 bg-[#29B0FD] text-white p-3 rounded-full"
                      onClick={sendMessage}
                    >
                      <AiOutlineSend className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
