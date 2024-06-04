import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context";
import { server } from "../../apiEndPoint/apiEndPoint";
import Sidebar from "../Layout/Sidebar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${server}/noti/notifications/${user._id}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    if (user && user._id) {
      fetchNotifications();
    }
  }, [user]);
  return (
    <>
      <Sidebar active={6} />
      <div className="w-full flex justify-center items-center pt-[12vh] ml-[12vh]">
        <div className="w-[50%] bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-center">No notifications</p>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification._id}
                  className={`p-4 mb-2 rounded ${
                    notification.read
                      ? "bg-gray-100 text-gray-600"
                      : "bg-blue-50 text-black"
                  }`}
                >
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
