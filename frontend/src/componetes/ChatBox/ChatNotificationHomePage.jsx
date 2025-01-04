import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "..//../Responsive.css"

const ChatNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectMessage, setSelectMessage] = useState(null);
  const accessToken = useSelector((state) => state.auth.user?.accessToken);


  // chat notification time set
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 3000); // Check for new messages every 30 seconds
    return () => clearInterval(interval);
  }, []);



  // fatch chat notifications api
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://printrest-clone-api.onrender.com/api/chatMessage/chatnotifications",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const newNotifications = response.data.data.chatNotify;

      // Update saved users with new notifications
      newNotifications.forEach((notification) => {
        saveUser({
          _id: notification.from._id,
          fullName: notification.from.fullname,
          latestMessage: notification.message,
          createdAt: notification.createdAt,
        });
      });

      // console.log(
      //   "response.data.data.chatNotify",
      //   response.data.data.chatNotify
      // );
      
      setNotifications(response.data.data.chatNotify);

    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };



  // latest message only showig using useMemo
  const latestNotifications = useMemo(() => {
    const map = new Map();
    notifications.forEach((notification) => {
      const { from } = notification;
      if (
        !map.has(from._id) ||
        map.get(from._id).createdAt < notification.createdAt
      ) {
        map.set(from._id, notification);
      }
    });
    return Array.from(map.values());
  }, [notifications]);



  // Handle message click butten
  const handleNotificationClick = async (notification) => {
    setSelectMessage(notification);

    // Save user details for easy access in the future
    saveUser({
      _id: notification.from._id,
      fullName: notification.from.fullname,
      latestMessage: notification.message,
      createdAt: notification.createdAt,
    });

    // Mark the message as read Api
    try {
      await axios.put(
        `https://printrest-clone-api.onrender.com/api/chatMessage/readchat/${notification.from._id}/${notification.to}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // console.log("read succefully");
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };



  // headling save user localStorage
  const saveUser = (user) => {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];

    // Find the index of the user in the saved users list
    const existingUserIndex = savedUsers.findIndex(
      (savedUser) => savedUser._id === user._id
    );

    if (existingUserIndex > -1) {
      // Update the existing user's latest message and timestamp
      savedUsers[existingUserIndex].latestMessage = user.latestMessage;
      savedUsers[existingUserIndex].createdAt = user.createdAt;
    } else {
      // Save the new user
      savedUsers.push(user);
    }

    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
  };

 

  // Handle user removal
  const handleRemoveUser = (userId) => {
    setUserMessages((prevState) => {
      const newState = { ...prevState };
      delete newState[userId];
      return newState;
    });
  };



  // time format
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };




  return (
    <div className="notification-container overflow-y-auto w-full h-[calc(30vh-50px)]">
      {latestNotifications.length > 0 ? (
        <div className="notifications">
          {/* <h2>New Messages:</h2> */}
          {latestNotifications.map((notification, index) => (
            <div
              key={index}
              onClick={() => handleNotificationClick(notification)}
              className="notification cursor-pointer flex items-start justify-between gap-10 rounded-lg py-5 mb-3 mt-5 hover:bg-green-300"
            >
              <Link
                key={index}
                to={`/otherUser/${notification.to}/${notification.from._id}`}
              >
                <div id="NotificationChatitem" className="flex items-center justify-start gap-5">
                  <h1 className="bg-blue-600 py-2 px-5 rounded-full ml-2">
                    {notification.from.fullname[0]}
                  </h1>
                  <div>
                    <h1 className="font-semibold text-xl">
                      {notification.from.fullname}
                    </h1>
                    <p className="text-justify">
                      {notification.message}......{" "}
                    </p>
                  </div>
                </div>{" "}
              </Link>
              <div className="flex items-center flex-col justify-center gap-3 mr-5">
                <span>{formatDate(new Date(notification.createdAt))}m</span>
                <button
                  onClick={() => handleRemoveUser(notification.from._id)}
                  className="remove-button bg-red-500 text-white p-1 rounded opacity-0 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-400 mt-5">No messages</p>
      )}
    </div>
  );
};

export default ChatNotification;

