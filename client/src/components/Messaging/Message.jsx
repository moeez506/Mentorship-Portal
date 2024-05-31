import React from "react";
import Sidebar from "../Layout/Sidebar";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { FaSquarePlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";

const Message = () => {
  return (
    <>
      <Sidebar active={5} />
      <div className="w-full flex flex-row bg-white p-5 pl-[13vw] pt-[7vh]">
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
                  />
                  <FiSearch className="absolute top-3 left-3 text-gray-500" />
                </div>
                <FaSquarePlus className="text-[#56C361] text-4xl" />
              </div>
              <div className="p-4 overflow-auto h-[70vh] bg-blue-50">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    className="flex items-center p-3 hover:bg-gray-200 cursor-pointer"
                    key={index}
                  >
                    <div className="relative">
                      <img
                        src="https://media.licdn.com/dms/image/D4D03AQEoUlbVH8FU_w/profile-displayphoto-shrink_800_800/0/1716205933498?e=1722470400&v=beta&t=6xh-WMI97RB1ctXiuO0ywahyguuWhFfDVTykyCxKwO0"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
                    </div>
                    <div className="ml-3">
                      <p className="font-bold">Moeez Ahmad</p>
                      <p className="text-gray-500 text-sm">
                        Hey! Do you wanna see new robotics?
                      </p>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">10:32am</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-2/3 flex flex-col bg-blue-50 shadow-lg rounded-lg border border-gray-200">
              <div className="flex items-center justify-between p-4 border-b border-gray-300">
                <div className="flex items-center">
                  <img
                    src="https://media.licdn.com/dms/image/D4D03AQEoUlbVH8FU_w/profile-displayphoto-shrink_800_800/0/1716205933498?e=1722470400&v=beta&t=6xh-WMI97RB1ctXiuO0ywahyguuWhFfDVTykyCxKwO0"
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <h2 className="font-bold text-lg">Moeez Ahmad</h2>
                    <p className="text-sm text-gray-500">Tying...</p>
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
              </div>
              <div className="flex-grow overflow-auto p-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-2">
                    <img
                      src="https://media.licdn.com/dms/image/D4D03AQEoUlbVH8FU_w/profile-displayphoto-shrink_800_800/0/1716205933498?e=1722470400&v=beta&t=6xh-WMI97RB1ctXiuO0ywahyguuWhFfDVTykyCxKwO0"
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="bg-[#56C361] p-4 max-w-xs shadow-md border border-gray-300 rounded-[20px]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam.
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 items-end">
                    <div className="text-sm text-gray-500">1:30 PM</div>
                    <div className="bg-[#29B0FD] rounded-[20px] p-4 max-w-xs shadow-md border border-gray-300">
                      Where are you located?
                    </div>
                    <div className="bg-[#29B0FD] rounded-[20px] p-4 max-w-xs shadow-md border border-gray-300">
                      How else can I contact you?
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-300">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-full"
                  />
                  <button className="ml-2 bg-[#29B0FD] text-white p-3 rounded-full">
                    <AiOutlineSend className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
